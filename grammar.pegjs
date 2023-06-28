start = program

program = "function" "{" statements "}" ";"

statements = statement*
statement = id "(" arguments ")" ";"

arguments = argument ("," argument)*
argument = reservedKeyword id / id

id = "id" { return text(); }
reservedKeyword = "palabrareservada" { return text(); }

_ "whitespace" = [ \t\r\n]*
