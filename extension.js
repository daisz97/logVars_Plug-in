// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "loggingvars" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('loggingvars.logvars', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		// vscode.window.showInformationMessage('Recommanded variables to log are as followed:','OK!');

		//read selected text
		let editor = vscode.window.activeTextEditor;
		if(!editor){
			return;
		}
		let selection = editor.selection;
		let text = editor.document.getText(selection);
		console.log('selected text:' + text);

		//invocate shell
		var shell = require('shelljs');
		if(!shell.which('git')){
			shell.echo('Sorry, this script requires git');
			shell.exit(1);
		}

		//write string var to txt
		const fs = require('fs');
		fs.writeFile('./sample_text.txt', text, (err)=>{
			if(err){
				console.log('Error while writing')
				throw err;
			}
		})

		// var output = shell.exec('cat sample.txt', {silent: true}).stdout;
		// vscode.window.showInformationMessage('output:'+output);
		let channel = vscode.window.createOutputChannel('LoggingVariables');

		shell.exec('sshpass -p 123456 scp -P 10020 -o StrictHostKeyChecking=no sample_text.txt root@47.105.54.217:/home/dsz/', function(code, stdout, stderr){
			console.log('Exit code:', code);
			console.log('Program output:', stdout);
			console.log('Program Error:', stderr);
		});
		
		//BERT_infer
		shell.exec('sshpass -p \'Buaa1806!(\' ssh -o "StrictHostKeyChecking no" root@47.105.54.217 "docker exec 7453cdc2f4d9 curl -X POST http://127.0.0.1:8080/predictions/BERT_infer -T /home/dsz/sample_text.txt"', function(code, stdout, stderr){
			console.log('Exit code:', code);
			console.log('Program output:', stdout);
			console.log('Program Error:', stderr);
			channel.appendLine("Recommanded varaibles:")
			channel.appendLine(stdout);
			channel.appendLine(' ');
			vscode.window.showInformationMessage('Recommanded variables:\n'+stdout, 'OK!'); //  { modal: true}
		});

		//CodeBert_infer
		shell.exec('sshpass -p \'Buaa1806!(\' ssh -o "StrictHostKeyChecking no" root@47.105.54.217 "docker exec 7453cdc2f4d9 curl -X POST http://127.0.0.1:8080/predictions/CodeBert_infer -T /home/dsz/sample_text.txt"', function(code, stdout, stderr){
			console.log('Exit code:', code);
			console.log('Program output:', stdout);
			console.log('Program Error:', stderr);
			channel.appendLine("Recommanded varaibles by a better model:")
			channel.appendLine(stdout);
			channel.appendLine(' ');
			vscode.window.showInformationMessage('Recommanded variables by a better model:\n'+stdout, 'OK!'); //  { modal: true}
		});
		

		//RNNAttn_infer
		shell.exec('sshpass -p \'Buaa1806!(\' ssh -o "StrictHostKeyChecking no" root@47.105.54.217 "docker exec 7453cdc2f4d9 curl -X POST http://127.0.0.1:8080/predictions/RNNAttn_infer -T /home/dsz/sample_text.txt"', function(code, stdout, stderr){
			console.log('Exit code:', code);
			console.log('Program output:', stdout);
			console.log('Program Error:', stderr);
			channel.appendLine("Recommanded varaibles by a weaker model:")
			channel.appendLine(stdout);
			vscode.window.showInformationMessage('Recommanded variables by a weaker model:\n'+stdout, 'OK!'); //  { modal: true}
		});

	});

	context.subscriptions.push(disposable);// 注册到监听队列中
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
