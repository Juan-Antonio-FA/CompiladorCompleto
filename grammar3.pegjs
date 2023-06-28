start = program

program = "asignacion" "{" assignmentStatements "}" ";"

assignmentStatements = assignmentStatement*
assignmentStatement = id "=" assignmentValue ";"

assignmentValue = number / functionCall / operation

number = "num" { return text(); }
functionCall = id "(" arguments ")"
operation = number "op" number

arguments = argument ("," argument)*
argument = reservedKeyword id / id

id = "id" { return text(); }
reservedKeyword = "palabrareservada" { return text(); }

_ "whitespace" = [ \t\r\n]*
