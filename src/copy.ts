import * as vscode from 'vscode';

export class Copy {
  static async copyTextOnly(append = false): Promise<void> {
    const activeTextEditor = vscode.window.activeTextEditor;
    if (activeTextEditor) {
      const selection = activeTextEditor.selection;
      if (!selection.isEmpty) {
        let text = activeTextEditor.document.getText(selection);
        if (append) {
          const currentText = await vscode.env.clipboard.readText();
          text = `${currentText}\n\n${text}`;
        }
        vscode.env.clipboard.writeText(text);
      }
    }
  }

  /**
   * TODO: comment copyCodeForMarkdown
   * Copys code for markdown
   * @param [append]
   */
  static async copyCodeForMarkdown(append = false): Promise<void> {
    const activeTextEditor = vscode.window.activeTextEditor;
    if (activeTextEditor) {
      const selection = activeTextEditor.selection;
      if (!selection.isEmpty) {
        let text = activeTextEditor.document.getText(selection);
        if (append) {
          let currentText = await vscode.env.clipboard.readText();
          if (currentText.endsWith('```')) {
            currentText = currentText.substring(0, currentText.length - 3);
          }
          text = `${currentText}\n\n${text}\n\`\`\``;
        } else {
          text = `\`\`\`\n${text}\n\`\`\``;
        }
        vscode.env.clipboard.writeText(text);
      }
    }
  }

  /**
   * Copies text with metadata
   * @param activeTextEditor
   */
  static async copyTextWithMetadata(append = false): Promise<void> {
    const activeTextEditor = vscode.window.activeTextEditor;
    if (activeTextEditor) {
      const selection = activeTextEditor.selection;
      if (!selection.isEmpty) {
        let text = activeTextEditor.document.getText(selection);
        if (append) {
          const currentText = await vscode.env.clipboard.readText();
          text = `${currentText}\n\n${text}`;
        }

        let sourceFilename = activeTextEditor.document.fileName;
        if (vscode.workspace.getConfiguration().get('copy-text.fullPath', false)) {
          let i = sourceFilename.lastIndexOf('/');
          if (i <= 0) {
            i = sourceFilename.lastIndexOf('\\');
          }
          if (i >= 0) {
            sourceFilename = sourceFilename.substring(i + 1);
          }
        }

        const date = new Date();
        const caret = selection.start;
        text = `${text}\n(${sourceFilename} - line ${caret.line}/${activeTextEditor.document.lineCount}`;

        if (vscode.workspace.getConfiguration().get('copy-text.includeDate', true)) {
          text += ` - ${date.toLocaleDateString()}`;
        }
        if (vscode.workspace.getConfiguration().get('copy-text.includeTime', true)) {
          text += ` - ${date.toLocaleTimeString()}`;
        }
        vscode.env.clipboard.writeText(text + ')');
      }
    }
  }
}
