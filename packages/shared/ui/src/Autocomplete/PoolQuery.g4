grammar PoolQuery;

poolQuery
    : (toAddress | fromAddress | subject)* | freeText
    ;

toAddress: TO addressValue;
fromAddress: FROM addressValue;
subject: SUBJECT subjectValue;
freeText: anyValue;

TO: T O (':');
FROM: F R O M (':');
SUBJECT: S U B J E C T (':');
SPACES
    : [ \u000B\t\r\n] -> skip
    ;

addressValue    : (ANYTHING | NAME)+;
subjectValue    : (ANYTHING | NAME)+;
anyValue        : (ANYTHING | NAME)+;
NAME            : ('a'..'z' | 'A'..'Z' | '0'..'9' | '-' | '_' | '@' | '/' | '#' | '.' | '\u0080'..'\uFFFF')+;
ANYTHING        : [A-Za-z][0-9A-Za-z\u0080-\uFFFF_]+;

fragment ALPHA: ( 'A'..'Z' | 'a'..'z' );
fragment ESC: '\\' (["\\/bfnrt] | UNICODE);
fragment UNICODE: 'u' HEX HEX HEX HEX;
fragment HEX : [0-9a-fA-F];
fragment DIGIT : [0-9];
fragment A : [aA];
fragment B : [bB];
fragment C : [cC];
fragment D : [dD];
fragment E : [eE];
fragment F : [fF];
fragment G : [gG];
fragment H : [hH];
fragment I : [iI];
fragment J : [jJ];
fragment K : [kK];
fragment L : [lL];
fragment M : [mM];
fragment N : [nN];
fragment O : [oO];
fragment P : [pP];
fragment Q : [qQ];
fragment R : [rR];
fragment S : [sS];
fragment T : [tT];
fragment U : [uU];
fragment V : [vV];
fragment W : [wW];
fragment X : [xX];
fragment Y : [yY];
fragment Z : [zZ];
