import * as vs from 'vscode';
const clipboardy = require('clipboardy');

export class Copy {
  static copyTextOnly(activeTextEditor: vs.TextEditor) {
    if (activeTextEditor) {
      const selection = activeTextEditor.selection;
      if (!selection.isEmpty) {
        clipboardy.write(activeTextEditor.document.getText(selection));
      }
    }
  }

/**
 * Copys text with metadata
 * @param activeTextEditor
 */
static copyTextWithMetadata(activeTextEditor: vs.TextEditor) {
    if (activeTextEditor) {
      const selection = activeTextEditor.selection;
      if (!selection.isEmpty) {
        const sourceFilename = activeTextEditor.document.fileName;
        const date = new Date();
        const selection = activeTextEditor.selection;
        const caret = selection.start;
        const text = `${activeTextEditor.document.getText(selection)}\n(${sourceFilename} line ${caret.line} - ${date.toLocaleDateString()})`;
        clipboardy.write(text);
      }
    }
  }
}
