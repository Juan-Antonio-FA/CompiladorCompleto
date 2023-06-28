import peg from "pegjs";
import fs from "fs";
function validacion(input,parser) {
  try {
    if (!Array.isArray(input)) {
      throw new Error(
        "El argumento de entrada debe ser un vector (array)."
      );
    }
    
    const code = input.join("");
    parser.parse(code);
    return true;
  } catch (error) {
    const errorMessage = error.toString();
    const firstLine = errorMessage.split("\n")[0];
    console.log(firstLine);
    return false;
  }
}
export function validate(input, reserved) {
  let parser;
  switch (reserved) {
    case "function":
      const grammar = fs.readFileSync("grammar.pegjs", "utf8");
      parser = peg.generate(grammar);
      return validacion(input,parser);
    case "variables":
      const grammar2 = fs.readFileSync("grammar2.pegjs", "utf8");
      parser = peg.generate(grammar2);
      return validacion(input,parser);
    case "asignacion":
      const grammar3 = fs.readFileSync("grammar3.pegjs", "utf8");
      parser = peg.generate(grammar3);
      return validacion(input,parser);
      
    default:
      break;
  }
}
