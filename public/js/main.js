function WhammyDocOnLoad() {
	var tables = document.getElementsByTagName("table");
	for(var i = 0; i < tables.length; i++) {
		if(tables.item(i).className)
			continue;
		tables.item(i).className = "table table-stripped";
	}

	document.getElementById("search").style.display = 'block';
}

function symbolSearch() {


}