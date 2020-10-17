import * as vscode from 'vscode';
import { Copy } from './copy';

/**
 * Runs command
 * @param commandName
 * @param implFunc
 */
function regCommand(commandName: string, implFunc: () => void): vscode.Disposable {
  try {
    return vscode.commands.registerCommand(commandName, implFunc);
  } catch (e) {
    console.error(`${commandName}: ${e}`);
  }
}

export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(regCommand('copy-text.copyTextOnly', () => Copy.copyTextOnly(false)));
  context.subscriptions.push(regCommand('copy-text.copyAndAppendText', () => Copy.copyTextOnly(true)));
  context.subscriptions.push(regCommand('copy-text.copyTextWithMetadata', () => Copy.copyTextWithMetadata(false)));
  context.subscriptions.push(
    regCommand('copy-text.copyAndAppendTextWithMetadata', () => Copy.copyTextWithMetadata(true))
  );
  context.subscriptions.push(regCommand('copy-text.copyCodeForMarkdown', () => Copy.copyCodeForMarkdown()));
}
