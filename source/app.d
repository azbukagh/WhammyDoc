import ddox.ddoc;
import ddox.ddox;
import ddox.entities;
import ddox.htmlgenerator;
import ddox.htmlserver;
import ddox.parsers.dparse;
import ddox.parsers.jsonparser;

import vibe.core.core;
import vibe.core.file;
import vibe.data.json;
import vibe.http.fileserver;
import vibe.http.router;
import vibe.http.server;
import vibe.stream.operations;

import std.array;
import std.exception : enforce;
import std.file;
import std.getopt;
import std.stdio;
import std.string;

int main(string[] args) {
	if(args.length < 2)
		return -1;
	if(args[1] == "gen" && args.length == 4) {
		return cmdGenHTML(args);
	} else if(args[1] == "serve" && args.length == 3) {
		return cmdServeHTML(args);
	}
	return 0;
}

int cmdServeHTML(string[] args) {
	GeneratorSettings gensettings;
	Package pack;
	setupGeneratorInput(args[2], gensettings, pack);

	auto router = new URLRouter;
	registerApiDocs(router, pack, gensettings);

	writefln("Listening on port 4000...");
	auto settings = new HTTPServerSettings;
	settings.port = 4000;
	listenHTTP(settings, router);

	return runEventLoop();
}

int cmdGenHTML(string[] args) {
	GeneratorSettings gensettings;
	Package pack;
	setupGeneratorInput(args[2], gensettings, pack);
	generateHtmlDocs(Path(args[3]), pack, gensettings);
	return 0;
}

void setupGeneratorInput(string file,
	out GeneratorSettings gensettings,
	out Package pack) {
		auto docsettings = new DdoxSettings;
		docsettings.packageOrder = [];
		docsettings.moduleSort = SortMode.protectionName;
		docsettings.declSort = SortMode.protectionInheritanceName;
		pack = parseDocFile(file, docsettings);

		gensettings = new GeneratorSettings;
		gensettings.siteUrl = URL("http://127.0.0.1");
		gensettings.navigationType = NavigationType.ModuleList;
		gensettings.fileNameStyle = MethodStyle.unaltered;
		gensettings.enumMemberPages = false;
}

Package parseDocFile(string filename, DdoxSettings settings) {
	writefln("Reading doc file: %s", filename);
	auto text = readText(filename);
	int line = 1;
	writefln("Parsing JSON...");
	auto json = parseJson(text, &line);
	writefln("Parsing docs...");
	Package root;
	root = parseJsonDocs(json);
	writefln("Finished parsing docs.");

	processDocs(root, settings);
	return root;
}

