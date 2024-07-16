const vscode = require("vscode");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const disposable = vscode.commands.registerCommand(
		"code-guard.helloWorld",
		async function () {
			vscode.window.showInformationMessage("Hello World from Code Guard!");
		}
	);

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate,
};
