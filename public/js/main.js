function WhammyDocOnLoad() {
	var tables = document.getElementsByTagName("table");
	for(var i = 0; i < tables.length; i++) {
		if(tables.item(i).className)
			continue;
		tables.item(i).className = "table table-stripped";
	}

	document.getElementById("search").style.display = 'table';
}

function hideResults() {
	document.getElementById("searchResults").style.display = 'none';
	document.getElementById("content").style.display = 'block';
}

function showResults() {
	document.getElementById("searchResults").style.display = 'block';
	document.getElementById("content").style.display = 'none';
}

function setResults(v) {
	document.getElementById("searchResults").innerHTML = v;
}

function pushResult(v) {
	document.getElementById("searchResults").innerHTML =
		document.getElementById("searchResults").innerHTML + v;
}

function symbolSearchKey(event) {
	if(event.keyCode == 13)
		symbolSearch();
}

function symbolSearch() {
	var searchstring = document.getElementById("symbolSearch").value.toLowerCase();

	if(!searchstring) return;

	hideResults();
	setResults('');

	var results = [];
	for(i in symbols) {
		var sym = symbols[i];
		if(sym.name.toLowerCase().indexOf(searchstring) < 0)
			continue;

		results.push(sym);
		if(results.length == 100)
			break;
	}

	function compare(a, b) {
		// prefer non-deprecated matches
		var adep = a.attributes.indexOf("deprecated") >= 0;
		var bdep = b.attributes.indexOf("deprecated") >= 0;
		if (adep != bdep) return adep - bdep;

		// normalize the names
		var aname = a.name.toLowerCase();
		var bname = b.name.toLowerCase();

		var anameparts = aname.split(".");
		var bnameparts = bname.split(".");

		var asname = anameparts[anameparts.length-1];
		var bsname = bnameparts[bnameparts.length-1];

		// prefer exact matches
		var aexact = searchstring.indexOf(asname) >= 0;
		var bexact = searchstring.indexOf(bsname) >= 0;
		if (aexact != bexact) return bexact - aexact;

		// prefer elements with less nesting
		if (anameparts.length < bnameparts.length) return -1;
		if (anameparts.length > bnameparts.length) return 1;

		// prefer matches with a shorter name
		if (asname.length < bsname.length) return -1;
		if (asname.length > bsname.length) return 1;

		// sort the rest alphabetically
		if (aname < bname) return -1;
		if (aname > bname) return 1;
		return 0;
	}

	results.sort(compare);

	var ul = document.createElement("ul");
	ul.className = "list-unstyled";
	ul.id = "results-list";
	for(i = 0; i < results.length; i++) {
			var sym = results[i];

			var el = document.createElement("li");
			el.className = sym.kind;
			for(j in sym.attributes)
				el.className = el.className + " " + (sym.attributes[j]);

			var name = sym.name;

			el.innerHTML = el.innerHTML + '<a href="./'+symbolSearchRootDir+sym.path+'" title="'+name+'" tabindex="1001">'+name+'</a>';
			ul.innerHTML =
				ul.innerHTML + el.outerHTML;
	}

	pushResult(ul.outerHTML);
	pushResult("<button onclick='hideResults();' 'type='button' id='results-close' class='close btn-lg' aria-label='Close'><span aria-hidden='true'>&times;</span></button>");
	showResults();
}