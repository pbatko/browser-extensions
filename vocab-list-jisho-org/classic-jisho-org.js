

function createAndPrependButton(context, value, func) {
    var button = document.createElement("input");
    button.type = "button";
    button.value = value;
    button.onclick = func;
    context.parentElement.prepend(button);
}

function getDataRow(rowNode){
	
	var meanings = rowNode.querySelector('.meanings_column').textContent.replace(/(\d:)/g, '\n' +'$1').trim();
	return {
		kanji: rowNode.querySelector('.kanji').textContent.trim(),
		kana: rowNode.querySelector('.kana_column').textContent.trim(),
		meanings: meanings
	};
}

function storeDefinition(def){
	browser.storage.local.get('jisho_definitions')
	.then( (data) => 
		{
			if (!data.hasOwnProperty('jisho_definitions')){
				data['jisho_definitions'] = {};	
			}
			var defs = data['jisho_definitions'];
			var key = def['kanji'];
			if (!defs.hasOwnProperty(key)){
				defs[key] = def;
				browser.storage.local.set({jisho_definitions: defs});
			}
		})

}

var kanjiCellList = document.querySelectorAll('#word_result tr .kanji_column');


for(let i = 0; i < kanjiCellList.length; i++){
    console.log('ala123: ' + i);
	let kanjiCell = kanjiCellList[i];
	createAndPrependButton(
		kanjiCell,
		'Add',
		function(){
			var data = getDataRow(kanjiCell.parentNode);
			console.log('lol1235 ' + JSON.stringify(data));
			storeDefinition(data);
		}
	);
}




createAndPrependButton(
	document.querySelector('#word_result'),
	'Show all',
	function(){
		browser.storage.local.get('jisho_definitions')
			.then((storedData) => {
				alert(JSON.stringify(storedData))	
			})
	}
);



