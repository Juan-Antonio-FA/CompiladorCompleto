import {validate} from './readVector.js';
import promptSync from 'prompt-sync';
import {GenerateTokenVector} from './tokenVector.js';
let buffer=[];
const prompt = promptSync()


 function introduceWord() {
  let word = "";
  word = prompt("Write the string:");
  console.log(`The string is ${word}`);
  return word;
} 

function switchOption(option) {
  switch (option) {
    case "1":
      console.log("Introduce string to generate tokens");
      buffer=GenerateTokenVector(introduceWord());
      if(buffer!=0){
        console.log("El vector generado  es: ");
        console.log(buffer);
        buffer.push('$');
      }
      
       if(validate(buffer)){
        console.log("✅Cadena reconocida✅");
      }
      else{
        if(buffer!=0){
          console.log("🛑Cadena no reconocida🛑");
        }
        
      }
      break;
    case "2":
      console.log("Exit");
      break;
    default:
      console.log("Option not valid");
      break;
  }
}
function menu() {
  console.log("Menu");
  console.log("1. Introduce string to generate tokens");
  console.log("2. Exit");
}
function main() {
  let option;
  do {
    console.log("\n\n\n==================================");
    menu();
    option = prompt("Select an option:");
    console.log(`Your option is ${option}`);
    switchOption(option);
  } while (option != 2);
}


main();
 
