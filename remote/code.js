var file = Components.classes["@mozilla.org/file/directory_service;1"]
	.getService(Components.interfaces.nsIProperties)
	.get("ProfD", Components.interfaces.nsIFile);

var ps = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
	.getService(Components.interfaces.nsIPromptService);
ps.alert(null, "This is unvalidated remote code", "Your profile path: " + file.path);
