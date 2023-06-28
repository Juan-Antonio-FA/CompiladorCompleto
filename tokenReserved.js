import * as fs from "fs";

let filename = "AFD.json";
let newADF;

//function that reads a file
function readFile(filename) {
  // const readline = require("readline");

  const ADF = filename;
  const newADF = JSON.parse(fs.readFileSync(ADF, "utf8"));
  return newADF;
}

export function GenerateTokenReserved(word) {
  newADF = readFile(filename);
  let alphabet = newADF.alphabet;
  let initialState = newADF.initialState;
  let transitionsTable = newADF.transitionsTable;
  //delete spaces in word
  /* word = word.replace(/\s/g, ""); */
  //Palabras reservadas
  let reservedWords = ["function","variables", "asignacion"];
  let token = [];
  let simbol = [];
  let number = "";
  let identificador = "";
  let currentState = initialState;
  

  while (word.length > 0) {
    let currentSymbol = word.charAt(0);
    let nextSymbol = word.charAt(1);
    word = word.substring(1);

    if (!alphabet.includes(currentSymbol)) {
      console.log("🛑You have introduced an invalid character🛑");
      currentState = undefined;
      return 0;
    }

    let nextState = transitionsTable[currentState][currentSymbol];
    let nextNextState = transitionsTable[nextState][nextSymbol];
    switch (nextState) {
      case "q1":
        identificador += currentSymbol;
        if(nextNextState!="q5"){
          identificador="";
        }
        break;
      case "q5":
        identificador += currentSymbol;
        if (nextNextState != "q5") {
          if (reservedWords.includes(identificador)) {
            if(identificador=="function"){
              simbol.push(identificador);
              token.push("function");
              identificador = "";
              break;
            }
            else if(identificador=="variables"){
              simbol.push(identificador);
              token.push("variables");
              identificador = "";
              break;
            }
            else if(identificador=="asignacion"){
              simbol.push(identificador);
              token.push("asignacion");
              identificador = "";
              break;
            }
            else{
            simbol.push(identificador);
            token.push("palabrareservada");
            identificador = "";
            break;
            }
          } 
          else {
          simbol.push(identificador);
       /*    token.push("id"); */
          identificador = ""; 
          break;
        }
        }
        break;
      default:
        break;
    }
    currentState = nextState;
  }
  return token;
}
