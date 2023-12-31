import {validate} from './readVector.js';
import promptSync from 'prompt-sync';
import {GenerateTokenVector} from './tokenVector.js';
import { GenerateTokenReserved } from './tokenReserved.js';
import fs from 'fs';
let buffer=[];
const prompt = promptSync()
let lastReadIndex = 0;
let codeToProcess = '';
let verify1='';
let verify2='';
let verify3='';


function readFileAndRemoveNewlines() {
  try {
    const content = fs.readFileSync('codigo.txt', 'utf-8');
    const code = content.replace(/\r?\n|\r/g, '');
  
    const codeToRead = code.substring(lastReadIndex);
    const nextIndex = codeToRead.indexOf('};');
  
    if (nextIndex !== -1) {
      codeToProcess = codeToRead.substring(0, nextIndex + 2);
      lastReadIndex += nextIndex + 2;
    } else {
      codeToProcess = 'No se encontró el siguiente "};"';
    }
  
  } catch (error) {
    console.error('Error al leer el archivo:', error);
  }
  
  return codeToProcess;
}
buffer=GenerateTokenVector(readFileAndRemoveNewlines());

function readFileAndRemoveNewlines2() {
  try {
    const content = fs.readFileSync('codigo.txt', 'utf-8');
    const code = content.replace(/\r?\n|\r/g, '');
    // Imprimir el código en una sola línea
    return code;
  } catch (error) {
    console.error('Error al leer el archivo:', error);
  }
}

function switchOption(option) {
  const reserved = ["function","variables","asignacion"];
  switch (option) {
    case "1":
      console.log("\n");
      const buffer2=GenerateTokenReserved(readFileAndRemoveNewlines2());
      for(let i=0;i<buffer2.length;i++){
        if(buffer2[i]==reserved[0]){
          if(validate(buffer,reserved[0])){
            verify1="✅Compilación exitosa✅";
          }
          else{
            if(buffer!=0){
              console.log("🛑Falló la compilación en la parte 1🛑");
            }
            
          }
        }
        else if(buffer2[i]==reserved[1]){
           if(validate(buffer,reserved[1])){
            verify2="✅Compilación exitosa✅";
          }
          else{
            if(buffer!=0){
              console.log("🛑Falló la compilación en la parte 2🛑");
            }
            
          } 
        }
        else if(buffer2[i]==reserved[2]){
           if(validate(buffer,reserved[2])){
            verify3="✅Compilación exitosa✅";
          }
          else{
            if(buffer!=0){
              console.log("🛑Falló la compilación en la parte 3🛑");
            }
            
          } 
        }
        if(i<buffer2.length-1){
          buffer=GenerateTokenVector(readFileAndRemoveNewlines());
        }
        if(verify1=="✅Compilación exitosa✅" && verify3=="✅Compilación exitosa✅"
         && verify2=="✅Compilación exitosa✅"){
          console.log("✅Compilación exitosa✅");
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
  console.log("1. Compile previously loaded file");
  console.log("2. Exit");
  console.log("\n==================================");
}
function main() {
  let option;
  do {
    console.log("\n\n\n==================================");
    menu();
    console.log("\n");
    option = prompt("Select an option:");
    console.log("\n");
    console.log(`Your option is ${option}`);
    switchOption(option);
  } while (option != 2);
}


main();