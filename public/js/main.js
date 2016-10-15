function WhammyDocOnLoad() {
	var tables = document.getElementsByTagName("table");
	for(var i = 0; i < tables.length; i++) {
		if(tables.item(i).className)
			continue;
		tables.item(i).className = "table table-stripped";
	}

	document.getElementById("search").style.display = 'block';
}

var searchCounter = 0;
var lastSearchString = "";
function symbolSearch() {
	var searchstring = document.getElementById("symbolSearch").value.toLowerCase();

	if(searchstring == lastSearchString) return;
	lastSearchString = searchstring;

	var scnt = ++searchCounter;
	document.getElementById("searchResults").style.display = 'none';
	document.getElementById("searchResults").innerHTML = '';

	var results = [];
	for(i in symbols) {
		var sym = symbols[i];
		if(sym.name.toLowerCase().indexOf(searchstring) < 0) {
			continue;
		}

		results.push(sym);
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

	for (i = 0; i < results.length && i < 100; i++) {
			var sym = results[i];

			var el = document.createElement("li");
			el.className = sym.kind;
			for(j in sym.attributes)
				el.className = el.className + " " + (sym.attributes[j]);

			var name = sym.name;

			// compute a length limited representation of the full name
			var nameparts = name.split(".");
			var np = nameparts.length-1;
			var shortname = "." + nameparts[np];
			while (np > 0 && nameparts[np-1].length + shortname.length <= 20) {
				np--;
				shortname = "." + nameparts[np] + shortname;
			}
			if (np > 0) shortname = ".." + shortname;
			else shortname = shortname.substr(1);

			el.innerHTML = el.innerHTML + '<a href="./'+sym.path+'" title="'+name+'" tabindex="1001">'+shortname+'</a>';
			document.getElementById("searchResults").innerHTML =
				document.getElementById("searchResults").innerHTML + el.outerHTML;
		}

	document.getElementById("symbolSearch").style.display = 'block';
}