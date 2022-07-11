// Generated from PoolQuery.g4 by ANTLR 4.8
// jshint ignore: start
var antlr4 = require('antlr4/index');
var PoolQueryListener = require('./PoolQueryListener').PoolQueryListener;
var PoolQueryVisitor = require('./PoolQueryVisitor').PoolQueryVisitor;

var grammarFileName = "PoolQuery.g4";


var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003\b8\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t\u0004",
    "\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007\u0004\b",
    "\t\b\u0004\t\t\t\u0003\u0002\u0003\u0002\u0003\u0002\u0007\u0002\u0016",
    "\n\u0002\f\u0002\u000e\u0002\u0019\u000b\u0002\u0003\u0002\u0005\u0002",
    "\u001c\n\u0002\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0004\u0003",
    "\u0004\u0003\u0004\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0006\u0003",
    "\u0006\u0003\u0007\u0006\u0007*\n\u0007\r\u0007\u000e\u0007+\u0003\b",
    "\u0006\b/\n\b\r\b\u000e\b0\u0003\t\u0006\t4\n\t\r\t\u000e\t5\u0003\t",
    "\u0002\u0002\n\u0002\u0004\u0006\b\n\f\u000e\u0010\u0002\u0003\u0003",
    "\u0002\u0007\b\u00026\u0002\u001b\u0003\u0002\u0002\u0002\u0004\u001d",
    "\u0003\u0002\u0002\u0002\u0006 \u0003\u0002\u0002\u0002\b#\u0003\u0002",
    "\u0002\u0002\n&\u0003\u0002\u0002\u0002\f)\u0003\u0002\u0002\u0002\u000e",
    ".\u0003\u0002\u0002\u0002\u00103\u0003\u0002\u0002\u0002\u0012\u0016",
    "\u0005\u0004\u0003\u0002\u0013\u0016\u0005\u0006\u0004\u0002\u0014\u0016",
    "\u0005\b\u0005\u0002\u0015\u0012\u0003\u0002\u0002\u0002\u0015\u0013",
    "\u0003\u0002\u0002\u0002\u0015\u0014\u0003\u0002\u0002\u0002\u0016\u0019",
    "\u0003\u0002\u0002\u0002\u0017\u0015\u0003\u0002\u0002\u0002\u0017\u0018",
    "\u0003\u0002\u0002\u0002\u0018\u001c\u0003\u0002\u0002\u0002\u0019\u0017",
    "\u0003\u0002\u0002\u0002\u001a\u001c\u0005\n\u0006\u0002\u001b\u0017",
    "\u0003\u0002\u0002\u0002\u001b\u001a\u0003\u0002\u0002\u0002\u001c\u0003",
    "\u0003\u0002\u0002\u0002\u001d\u001e\u0007\u0003\u0002\u0002\u001e\u001f",
    "\u0005\f\u0007\u0002\u001f\u0005\u0003\u0002\u0002\u0002 !\u0007\u0004",
    "\u0002\u0002!\"\u0005\f\u0007\u0002\"\u0007\u0003\u0002\u0002\u0002",
    "#$\u0007\u0005\u0002\u0002$%\u0005\u000e\b\u0002%\t\u0003\u0002\u0002",
    "\u0002&\'\u0005\u0010\t\u0002\'\u000b\u0003\u0002\u0002\u0002(*\t\u0002",
    "\u0002\u0002)(\u0003\u0002\u0002\u0002*+\u0003\u0002\u0002\u0002+)\u0003",
    "\u0002\u0002\u0002+,\u0003\u0002\u0002\u0002,\r\u0003\u0002\u0002\u0002",
    "-/\t\u0002\u0002\u0002.-\u0003\u0002\u0002\u0002/0\u0003\u0002\u0002",
    "\u00020.\u0003\u0002\u0002\u000201\u0003\u0002\u0002\u00021\u000f\u0003",
    "\u0002\u0002\u000224\t\u0002\u0002\u000232\u0003\u0002\u0002\u00024",
    "5\u0003\u0002\u0002\u000253\u0003\u0002\u0002\u000256\u0003\u0002\u0002",
    "\u00026\u0011\u0003\u0002\u0002\u0002\b\u0015\u0017\u001b+05"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [  ];

var symbolicNames = [ null, "TO", "FROM", "SUBJECT", "SPACES", "NAME", "ANYTHING" ];

var ruleNames =  [ "poolQuery", "toAddress", "fromAddress", "subject", "freeText", 
                   "addressValue", "subjectValue", "anyValue" ];

function PoolQueryParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

PoolQueryParser.prototype = Object.create(antlr4.Parser.prototype);
PoolQueryParser.prototype.constructor = PoolQueryParser;

Object.defineProperty(PoolQueryParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

PoolQueryParser.EOF = antlr4.Token.EOF;
PoolQueryParser.TO = 1;
PoolQueryParser.FROM = 2;
PoolQueryParser.SUBJECT = 3;
PoolQueryParser.SPACES = 4;
PoolQueryParser.NAME = 5;
PoolQueryParser.ANYTHING = 6;

PoolQueryParser.RULE_poolQuery = 0;
PoolQueryParser.RULE_toAddress = 1;
PoolQueryParser.RULE_fromAddress = 2;
PoolQueryParser.RULE_subject = 3;
PoolQueryParser.RULE_freeText = 4;
PoolQueryParser.RULE_addressValue = 5;
PoolQueryParser.RULE_subjectValue = 6;
PoolQueryParser.RULE_anyValue = 7;


function PoolQueryContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PoolQueryParser.RULE_poolQuery;
    return this;
}

PoolQueryContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
PoolQueryContext.prototype.constructor = PoolQueryContext;

PoolQueryContext.prototype.toAddress = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ToAddressContext);
    } else {
        return this.getTypedRuleContext(ToAddressContext,i);
    }
};

PoolQueryContext.prototype.fromAddress = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(FromAddressContext);
    } else {
        return this.getTypedRuleContext(FromAddressContext,i);
    }
};

PoolQueryContext.prototype.subject = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(SubjectContext);
    } else {
        return this.getTypedRuleContext(SubjectContext,i);
    }
};

PoolQueryContext.prototype.freeText = function() {
    return this.getTypedRuleContext(FreeTextContext,0);
};

PoolQueryContext.prototype.enterRule = function(listener) {
    if(listener instanceof PoolQueryListener ) {
        listener.enterPoolQuery(this);
	}
};

PoolQueryContext.prototype.exitRule = function(listener) {
    if(listener instanceof PoolQueryListener ) {
        listener.exitPoolQuery(this);
	}
};

PoolQueryContext.prototype.accept = function(visitor) {
    if ( visitor instanceof PoolQueryVisitor ) {
        return visitor.visitPoolQuery(this);
    } else {
        return visitor.visitChildren(this);
    }
};




PoolQueryParser.PoolQueryContext = PoolQueryContext;

PoolQueryParser.prototype.poolQuery = function() {

    var localctx = new PoolQueryContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, PoolQueryParser.RULE_poolQuery);
    var _la = 0; // Token type
    try {
        this.state = 25;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case PoolQueryParser.EOF:
        case PoolQueryParser.TO:
        case PoolQueryParser.FROM:
        case PoolQueryParser.SUBJECT:
            this.enterOuterAlt(localctx, 1);
            this.state = 21;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << PoolQueryParser.TO) | (1 << PoolQueryParser.FROM) | (1 << PoolQueryParser.SUBJECT))) !== 0)) {
                this.state = 19;
                this._errHandler.sync(this);
                switch(this._input.LA(1)) {
                case PoolQueryParser.TO:
                    this.state = 16;
                    this.toAddress();
                    break;
                case PoolQueryParser.FROM:
                    this.state = 17;
                    this.fromAddress();
                    break;
                case PoolQueryParser.SUBJECT:
                    this.state = 18;
                    this.subject();
                    break;
                default:
                    throw new antlr4.error.NoViableAltException(this);
                }
                this.state = 23;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            break;
        case PoolQueryParser.NAME:
        case PoolQueryParser.ANYTHING:
            this.enterOuterAlt(localctx, 2);
            this.state = 24;
            this.freeText();
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function ToAddressContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PoolQueryParser.RULE_toAddress;
    return this;
}

ToAddressContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ToAddressContext.prototype.constructor = ToAddressContext;

ToAddressContext.prototype.TO = function() {
    return this.getToken(PoolQueryParser.TO, 0);
};

ToAddressContext.prototype.addressValue = function() {
    return this.getTypedRuleContext(AddressValueContext,0);
};

ToAddressContext.prototype.enterRule = function(listener) {
    if(listener instanceof PoolQueryListener ) {
        listener.enterToAddress(this);
	}
};

ToAddressContext.prototype.exitRule = function(listener) {
    if(listener instanceof PoolQueryListener ) {
        listener.exitToAddress(this);
	}
};

ToAddressContext.prototype.accept = function(visitor) {
    if ( visitor instanceof PoolQueryVisitor ) {
        return visitor.visitToAddress(this);
    } else {
        return visitor.visitChildren(this);
    }
};




PoolQueryParser.ToAddressContext = ToAddressContext;

PoolQueryParser.prototype.toAddress = function() {

    var localctx = new ToAddressContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, PoolQueryParser.RULE_toAddress);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 27;
        this.match(PoolQueryParser.TO);
        this.state = 28;
        this.addressValue();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function FromAddressContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PoolQueryParser.RULE_fromAddress;
    return this;
}

FromAddressContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FromAddressContext.prototype.constructor = FromAddressContext;

FromAddressContext.prototype.FROM = function() {
    return this.getToken(PoolQueryParser.FROM, 0);
};

FromAddressContext.prototype.addressValue = function() {
    return this.getTypedRuleContext(AddressValueContext,0);
};

FromAddressContext.prototype.enterRule = function(listener) {
    if(listener instanceof PoolQueryListener ) {
        listener.enterFromAddress(this);
	}
};

FromAddressContext.prototype.exitRule = function(listener) {
    if(listener instanceof PoolQueryListener ) {
        listener.exitFromAddress(this);
	}
};

FromAddressContext.prototype.accept = function(visitor) {
    if ( visitor instanceof PoolQueryVisitor ) {
        return visitor.visitFromAddress(this);
    } else {
        return visitor.visitChildren(this);
    }
};




PoolQueryParser.FromAddressContext = FromAddressContext;

PoolQueryParser.prototype.fromAddress = function() {

    var localctx = new FromAddressContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, PoolQueryParser.RULE_fromAddress);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 30;
        this.match(PoolQueryParser.FROM);
        this.state = 31;
        this.addressValue();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function SubjectContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PoolQueryParser.RULE_subject;
    return this;
}

SubjectContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
SubjectContext.prototype.constructor = SubjectContext;

SubjectContext.prototype.SUBJECT = function() {
    return this.getToken(PoolQueryParser.SUBJECT, 0);
};

SubjectContext.prototype.subjectValue = function() {
    return this.getTypedRuleContext(SubjectValueContext,0);
};

SubjectContext.prototype.enterRule = function(listener) {
    if(listener instanceof PoolQueryListener ) {
        listener.enterSubject(this);
	}
};

SubjectContext.prototype.exitRule = function(listener) {
    if(listener instanceof PoolQueryListener ) {
        listener.exitSubject(this);
	}
};

SubjectContext.prototype.accept = function(visitor) {
    if ( visitor instanceof PoolQueryVisitor ) {
        return visitor.visitSubject(this);
    } else {
        return visitor.visitChildren(this);
    }
};




PoolQueryParser.SubjectContext = SubjectContext;

PoolQueryParser.prototype.subject = function() {

    var localctx = new SubjectContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, PoolQueryParser.RULE_subject);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 33;
        this.match(PoolQueryParser.SUBJECT);
        this.state = 34;
        this.subjectValue();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function FreeTextContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PoolQueryParser.RULE_freeText;
    return this;
}

FreeTextContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FreeTextContext.prototype.constructor = FreeTextContext;

FreeTextContext.prototype.anyValue = function() {
    return this.getTypedRuleContext(AnyValueContext,0);
};

FreeTextContext.prototype.enterRule = function(listener) {
    if(listener instanceof PoolQueryListener ) {
        listener.enterFreeText(this);
	}
};

FreeTextContext.prototype.exitRule = function(listener) {
    if(listener instanceof PoolQueryListener ) {
        listener.exitFreeText(this);
	}
};

FreeTextContext.prototype.accept = function(visitor) {
    if ( visitor instanceof PoolQueryVisitor ) {
        return visitor.visitFreeText(this);
    } else {
        return visitor.visitChildren(this);
    }
};




PoolQueryParser.FreeTextContext = FreeTextContext;

PoolQueryParser.prototype.freeText = function() {

    var localctx = new FreeTextContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, PoolQueryParser.RULE_freeText);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 36;
        this.anyValue();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function AddressValueContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PoolQueryParser.RULE_addressValue;
    return this;
}

AddressValueContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AddressValueContext.prototype.constructor = AddressValueContext;

AddressValueContext.prototype.ANYTHING = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(PoolQueryParser.ANYTHING);
    } else {
        return this.getToken(PoolQueryParser.ANYTHING, i);
    }
};


AddressValueContext.prototype.NAME = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(PoolQueryParser.NAME);
    } else {
        return this.getToken(PoolQueryParser.NAME, i);
    }
};


AddressValueContext.prototype.enterRule = function(listener) {
    if(listener instanceof PoolQueryListener ) {
        listener.enterAddressValue(this);
	}
};

AddressValueContext.prototype.exitRule = function(listener) {
    if(listener instanceof PoolQueryListener ) {
        listener.exitAddressValue(this);
	}
};

AddressValueContext.prototype.accept = function(visitor) {
    if ( visitor instanceof PoolQueryVisitor ) {
        return visitor.visitAddressValue(this);
    } else {
        return visitor.visitChildren(this);
    }
};




PoolQueryParser.AddressValueContext = AddressValueContext;

PoolQueryParser.prototype.addressValue = function() {

    var localctx = new AddressValueContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, PoolQueryParser.RULE_addressValue);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 39; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 38;
            _la = this._input.LA(1);
            if(!(_la===PoolQueryParser.NAME || _la===PoolQueryParser.ANYTHING)) {
            this._errHandler.recoverInline(this);
            }
            else {
            	this._errHandler.reportMatch(this);
                this.consume();
            }
            this.state = 41; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while(_la===PoolQueryParser.NAME || _la===PoolQueryParser.ANYTHING);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function SubjectValueContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PoolQueryParser.RULE_subjectValue;
    return this;
}

SubjectValueContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
SubjectValueContext.prototype.constructor = SubjectValueContext;

SubjectValueContext.prototype.ANYTHING = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(PoolQueryParser.ANYTHING);
    } else {
        return this.getToken(PoolQueryParser.ANYTHING, i);
    }
};


SubjectValueContext.prototype.NAME = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(PoolQueryParser.NAME);
    } else {
        return this.getToken(PoolQueryParser.NAME, i);
    }
};


SubjectValueContext.prototype.enterRule = function(listener) {
    if(listener instanceof PoolQueryListener ) {
        listener.enterSubjectValue(this);
	}
};

SubjectValueContext.prototype.exitRule = function(listener) {
    if(listener instanceof PoolQueryListener ) {
        listener.exitSubjectValue(this);
	}
};

SubjectValueContext.prototype.accept = function(visitor) {
    if ( visitor instanceof PoolQueryVisitor ) {
        return visitor.visitSubjectValue(this);
    } else {
        return visitor.visitChildren(this);
    }
};




PoolQueryParser.SubjectValueContext = SubjectValueContext;

PoolQueryParser.prototype.subjectValue = function() {

    var localctx = new SubjectValueContext(this, this._ctx, this.state);
    this.enterRule(localctx, 12, PoolQueryParser.RULE_subjectValue);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 44; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 43;
            _la = this._input.LA(1);
            if(!(_la===PoolQueryParser.NAME || _la===PoolQueryParser.ANYTHING)) {
            this._errHandler.recoverInline(this);
            }
            else {
            	this._errHandler.reportMatch(this);
                this.consume();
            }
            this.state = 46; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while(_la===PoolQueryParser.NAME || _la===PoolQueryParser.ANYTHING);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function AnyValueContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = PoolQueryParser.RULE_anyValue;
    return this;
}

AnyValueContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AnyValueContext.prototype.constructor = AnyValueContext;

AnyValueContext.prototype.ANYTHING = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(PoolQueryParser.ANYTHING);
    } else {
        return this.getToken(PoolQueryParser.ANYTHING, i);
    }
};


AnyValueContext.prototype.NAME = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(PoolQueryParser.NAME);
    } else {
        return this.getToken(PoolQueryParser.NAME, i);
    }
};


AnyValueContext.prototype.enterRule = function(listener) {
    if(listener instanceof PoolQueryListener ) {
        listener.enterAnyValue(this);
	}
};

AnyValueContext.prototype.exitRule = function(listener) {
    if(listener instanceof PoolQueryListener ) {
        listener.exitAnyValue(this);
	}
};

AnyValueContext.prototype.accept = function(visitor) {
    if ( visitor instanceof PoolQueryVisitor ) {
        return visitor.visitAnyValue(this);
    } else {
        return visitor.visitChildren(this);
    }
};




PoolQueryParser.AnyValueContext = AnyValueContext;

PoolQueryParser.prototype.anyValue = function() {

    var localctx = new AnyValueContext(this, this._ctx, this.state);
    this.enterRule(localctx, 14, PoolQueryParser.RULE_anyValue);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 49; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 48;
            _la = this._input.LA(1);
            if(!(_la===PoolQueryParser.NAME || _la===PoolQueryParser.ANYTHING)) {
            this._errHandler.recoverInline(this);
            }
            else {
            	this._errHandler.reportMatch(this);
                this.consume();
            }
            this.state = 51; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while(_la===PoolQueryParser.NAME || _la===PoolQueryParser.ANYTHING);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


exports.PoolQueryParser = PoolQueryParser;
exports.PoolQueryContext = PoolQueryContext;
PoolQueryParser.PoolQueryContext = PoolQueryContext;
exports.ToAddressContext = ToAddressContext;
PoolQueryParser.ToAddressContext = ToAddressContext;
exports.FromAddressContext = FromAddressContext;
PoolQueryParser.FromAddressContext = FromAddressContext;
exports.SubjectContext = SubjectContext;
PoolQueryParser.SubjectContext = SubjectContext;
exports.FreeTextContext = FreeTextContext;
PoolQueryParser.FreeTextContext = FreeTextContext;
exports.AddressValueContext = AddressValueContext;
PoolQueryParser.AddressValueContext = AddressValueContext;
exports.SubjectValueContext = SubjectValueContext;
PoolQueryParser.SubjectValueContext = SubjectValueContext;
exports.AnyValueContext = AnyValueContext;
PoolQueryParser.AnyValueContext = AnyValueContext;
