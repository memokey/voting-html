var multilang;
function setLanguage() {
	if(localStorage.langcode){
		multilang = new MultiLang('languages.json', localStorage.langcode, this.initList);
	} else {
		multilang = new MultiLang('languages.json', 'swedish', this.initList);
		localStorage.langcode = 'swedish';
	}
}
function ChangeLanguage(selected) {
	window.localStorage.langcode = selected.data('value');
	multilang.setLanguage(selected.data('value'));
	$('.lang-img').prop('src', '../img/' + localStorage.langcode + '.png');
	refreshLabels();
}

function refreshLabels() {

	// Basically do the following for all document elements:
	var allnodes = document.querySelectorAll('*[id$=text]');

	for (var i=0, max=allnodes.length; i < max; i++) {
		// get id current elements
		// console.log(allnodes)
		if(allnodes[i] !== undefined)
		{
			var idname = allnodes[i].id;
			// if id exists, set get id current elements
			if (idname != '') {
				allnodes[i].textContent = multilang.get(idname);
			};
		}
	};
}

$(this).ready(function () {
	setLanguage()
})