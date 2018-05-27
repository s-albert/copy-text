import * as vs from 'vscode';
const clipboardy = require('clipboardy');

export class Copy {
  static copyTextOnly(append = false) {
    const activeTextEditor = vs.window.activeTextEditor;
    if (activeTextEditor) {
      const selection = activeTextEditor.selection;
      if (!selection.isEmpty) {
        let text = activeTextEditor.document.getText(selection);
        if (append) {
          const currentText = clipboardy.readSync();
          text = `${currentText}\n\n${text}`;
        }
        clipboardy.write(text);
      }
    }
  }

  static copyCodeForMarkdown(append = false) {
    const activeTextEditor = vs.window.activeTextEditor;
    if (activeTextEditor) {
      const selection = activeTextEditor.selection;
      if (!selection.isEmpty) {
        let text = activeTextEditor.document.getText(selection);
        if (append) {
          let currentText = clipboardy.readSync();
          if (currentText.endsWith('```')) {
            currentText = currentText.substring(0, currentText.length - 3);
          }
          text = `${currentText}\n\n${text}\n\`\`\``;
        } else {
          text = `\`\`\`\n${text}\n\`\`\``;
        }
        clipboardy.write(text);
      }
    }
  }

  /**
   * Copies text with metadata
   * @param activeTextEditor
   */
  static copyTextWithMetadata(append = false) {
    const activeTextEditor = vs.window.activeTextEditor;
    if (activeTextEditor) {
      const selection = activeTextEditor.selection;
      if (!selection.isEmpty) {
        let text = activeTextEditor.document.getText(selection);
        if (append) {
          const currentText = clipboardy.readSync();
          text = `${currentText}\n\n${text}`;
        }

        let sourceFilename = activeTextEditor.document.fileName;
        if (vs.workspace.getConfiguration().get('copy-text.fullPath', false)) {
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

        if (vs.workspace.getConfiguration().get('copy-text.includeDate', true)) {
          text += ` - ${date.toLocaleDateString()}`;
        }
        if (vs.workspace.getConfiguration().get('copy-text.includeTime', true)) {
          text += ` - ${date.toLocaleTimeString()}`;
        }
        clipboardy.write(text + ')');
      }
    }
  }
}
