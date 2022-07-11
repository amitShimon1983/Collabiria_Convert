import {CommonTokenStream, Parser, ParserRuleContext, Token} from 'antlr4';
import {TerminalNode} from 'antlr4/tree/Tree';


export declare class PoolQueryContext extends ParserRuleContext {
    
    freeText(): FreeTextContext;
    
}

export declare class ToAddressContext extends ParserRuleContext {
    
    TO(): TerminalNode;
    
    addressValue(): AddressValueContext;
    
}

export declare class FromAddressContext extends ParserRuleContext {
    
    FROM(): TerminalNode;
    
    addressValue(): AddressValueContext;
    
}

export declare class SubjectContext extends ParserRuleContext {
    
    SUBJECT(): TerminalNode;
    
    subjectValue(): SubjectValueContext;
    
}

export declare class FreeTextContext extends ParserRuleContext {
    
    anyValue(): AnyValueContext;
    
}

export declare class AddressValueContext extends ParserRuleContext {
    
}

export declare class SubjectValueContext extends ParserRuleContext {
    
}

export declare class AnyValueContext extends ParserRuleContext {
    
}


export declare class PoolQueryParser extends Parser {
    readonly ruleNames: string[];
    readonly literalNames: string[];
    readonly symbolicNames: string[];

    constructor(input: CommonTokenStream);
    
    poolQuery(): PoolQueryContext;

    toAddress(): ToAddressContext;

    fromAddress(): FromAddressContext;

    subject(): SubjectContext;

    freeText(): FreeTextContext;

    addressValue(): AddressValueContext;

    subjectValue(): SubjectValueContext;

    anyValue(): AnyValueContext;

}
