start = program

program = "variables" "{" variableDeclarations "}" ";"

variableDeclarations = variableDeclaration*
variableDeclaration = reservedKeyword identifier ("," identifier)* ";"

identifier = "id" { return text(); }
reservedKeyword = "palabrareservada" { return text(); }

_ "whitespace" = [ \t\r\n]*
