import {CommonTokenStream, ParserRuleContext, Token} from 'antlr4';
import {ErrorNode, ParseTreeListener, TerminalNode} from 'antlr4/tree/Tree';

import {PoolQueryContext} from './PoolQueryParser';

import {ToAddressContext} from './PoolQueryParser';

import {FromAddressContext} from './PoolQueryParser';

import {SubjectContext} from './PoolQueryParser';

import {FreeTextContext} from './PoolQueryParser';

import {AddressValueContext} from './PoolQueryParser';

import {SubjectValueContext} from './PoolQueryParser';

import {AnyValueContext} from './PoolQueryParser';


export declare class PoolQueryListener implements ParseTreeListener {
    constructor();
    
    enterPoolQuery(ctx: PoolQueryContext): void;
    
    exitPoolQuery(ctx: PoolQueryContext): void;
    
    enterToAddress(ctx: ToAddressContext): void;
    
    exitToAddress(ctx: ToAddressContext): void;
    
    enterFromAddress(ctx: FromAddressContext): void;
    
    exitFromAddress(ctx: FromAddressContext): void;
    
    enterSubject(ctx: SubjectContext): void;
    
    exitSubject(ctx: SubjectContext): void;
    
    enterFreeText(ctx: FreeTextContext): void;
    
    exitFreeText(ctx: FreeTextContext): void;
    
    enterAddressValue(ctx: AddressValueContext): void;
    
    exitAddressValue(ctx: AddressValueContext): void;
    
    enterSubjectValue(ctx: SubjectValueContext): void;
    
    exitSubjectValue(ctx: SubjectValueContext): void;
    
    enterAnyValue(ctx: AnyValueContext): void;
    
    exitAnyValue(ctx: AnyValueContext): void;
    
    visitTerminal(node: TerminalNode): void;

    visitErrorNode(node: ErrorNode): void;

    enterEveryRule(node: ParserRuleContext): void;

    exitEveryRule(node: ParserRuleContext): void;
}
