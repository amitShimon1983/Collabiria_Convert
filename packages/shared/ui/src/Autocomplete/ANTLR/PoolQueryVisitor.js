// Generated from PoolQuery.g4 by ANTLR 4.8
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete generic visitor for a parse tree produced by PoolQueryParser.

function PoolQueryVisitor() {
	antlr4.tree.ParseTreeVisitor.call(this);
	return this;
}

PoolQueryVisitor.prototype = Object.create(antlr4.tree.ParseTreeVisitor.prototype);
PoolQueryVisitor.prototype.constructor = PoolQueryVisitor;

// Visit a parse tree produced by PoolQueryParser#poolQuery.
PoolQueryVisitor.prototype.visitPoolQuery = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by PoolQueryParser#toAddress.
PoolQueryVisitor.prototype.visitToAddress = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by PoolQueryParser#fromAddress.
PoolQueryVisitor.prototype.visitFromAddress = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by PoolQueryParser#subject.
PoolQueryVisitor.prototype.visitSubject = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by PoolQueryParser#freeText.
PoolQueryVisitor.prototype.visitFreeText = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by PoolQueryParser#addressValue.
PoolQueryVisitor.prototype.visitAddressValue = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by PoolQueryParser#subjectValue.
PoolQueryVisitor.prototype.visitSubjectValue = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by PoolQueryParser#anyValue.
PoolQueryVisitor.prototype.visitAnyValue = function(ctx) {
  return this.visitChildren(ctx);
};



exports.PoolQueryVisitor = PoolQueryVisitor;