browser.contextMenus.create({
  id: "class-jisho-org-open-tab",
  title: "classic.jisho.org Open saved definitions page"
});


browser.contextMenus.onClicked.addListener(function(info, tab) {
	if (info.menuItemId == "class-jisho-org-open-tab") {
			browser.storage.local.get('jisho_definitions')
			.then( (data) => {
				var json = JSON.stringify(data, null, 2);
				var blob = new Blob([json], {type: "application/json"});
				objectURL = URL.createObjectURL(blob);
				browser.downloads.download({
					url: objectURL,
					filename: 'classic-jisho-org-definitions.json'
				});
			});
	}
});




