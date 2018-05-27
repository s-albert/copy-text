import * as vscode from 'vscode';
import { Copy } from './copy';

/**
 * Runs command
 * @param commandName
 * @param implFunc
 */
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
      const commandName = 'Copy without syntax highlighting';

      runCommand(commandName, () => {
        Copy.copyTextOnly(false);
      });
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('copy-text.copyAndAppendText', () => {
      const commandName = 'Copy and append';

      runCommand(commandName, () => {
        Copy.copyTextOnly(true);
      });
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('copy-text.copyTextWithMetadata', () => {
      const commandName = 'Copy with metainfo';

      runCommand(commandName, () => {
        Copy.copyTextWithMetadata(false);
      });
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('copy-text.copyAndAppendTextWithMetadata', () => {
      const commandName = 'Copy and append with metainfo';

      runCommand(commandName, () => {
        Copy.copyTextWithMetadata(true);
      });
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('copy-text.copyCodeForMarkdown', () => {
      const commandName = 'Copy code for markdown';

      runCommand(commandName, () => {
        Copy.copyCodeForMarkdown();
      });
    })
  );
}
