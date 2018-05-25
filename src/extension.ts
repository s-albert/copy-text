import * as vscode from 'vscode';
import { Copy } from './copy';

function runCommand(commandName: string, implFunc: () => void) {
  try {
    implFunc();
  } catch (e) {
    debugger;
    console.error(`${commandName}: ${e}`);
  }
}

export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.commands.registerCommand('copy-text.copyTextOnly', (forCompletion: boolean) => {
      const commandName = 'Copy without colors';

      runCommand(commandName, () => {
        Copy.copyTextOnly(vscode.window.activeTextEditor);
      });
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('copy-text.copyTextWithMetadata', () => {
      const commandName = 'Copy with metainfo';

      runCommand(commandName, () => {
        Copy.copyTextWithMetadata(vscode.window.activeTextEditor);
      });
    })
  );
}
