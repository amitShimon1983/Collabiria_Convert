export default class PoolQueryLangErrorListener {
  constructor() {
    this.errors = [];
  }

  syntaxError(
    recognizer,
    offendingSymbol,
    line,
    charPositionInLine,
    message,
    e,
  ) {
    this.errors.push(
      {
        startLineNumber: line,
        endLineNumber: line,
        startColumn: charPositionInLine,
        endColumn: charPositionInLine + 1,
        message,
        code: '1',
      },
    );
  }

  getErrors() {
    return this.errors;
  }
}
