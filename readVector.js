/*const table = {
    "E": {
        "(": ["T", "Ep"],
        "id": ["T", "Ep"],
        "num": ["T", "Ep"]
    },
    "Ep": {
        "+": ["+", "T", "Ep"],
        "-": ["-", "T", "Ep"],
        ")": ["ε"],
        "$": ["ε"]
    },
    "T": {
        "(": ["F", "Tp"],
        "id": ["F", "Tp"],
        "num": ["F", "Tp"]
    },
    "Tp": {
        "+": ["ε"],
        "-": ["ε"],
        "*": ["*", "F", "Tp"],
        "/": ["/", "F", "Tp"],
        ")": ["ε"],
        "$": ["ε"]
    },
    "F": {
        "(": ["(", "E", ")"],
        "id": ["id"],
        "num": ["num"]
    }
  };
  var terminals = ["(", ")", "+", "*", "id","-","/", "num",";","{","}","="]; //terminals
  export function validate(input){
  let i=0;
  let stack = ['$','E'];
  
  do{
    let a=input[i];
    let x=stack[stack.length-1];
  
    if (x == '$' || terminals.includes(x)) {
        if(a==x){
            stack.pop();
            i++;
        }
        else{
            console.log("error 1 after "+input[i-1]+" expected " + stack[stack.length-1]);
            break;
        }
    } 
    else {
        if (table[x][a]!=undefined) {
        let temp = table[x][a];
        stack.pop();
        for (let j = temp.length - 1; j >= 0; j--) {
            if(temp[j]!='ε'){
            stack.push(temp[j]);
        }
    }
  
        }
        else {
            console.log("error 2 in "+input[i] + " expected " + stack[stack.length-1]);
  
            break;
        }
    }
  //   console.log(stack);
  }while (stack.length > 0);
  
  if (stack.length == 0) {
    return true;
  }
  else {
    return false;
  }
  }*/
  const table = {
    "<programa>": {
      "function": ["<funcion>"]
    },
    "<funcion>": {
      "(": ["function() { <llamada_funcion> };"]
    },
    "<llamada_funcion>": {
      "fun": ["fun()", "<llamada_funcion>"],
      "palabrareservada": ["fun(<argumento>)", "<llamada_funcion>"],
      "id": ["fun(<argumento>)", "<llamada_funcion>"],
      ";": ["ε"],
      "}": ["ε"]
    },
    "<argumento>": {
      "palabrareservada": ["palabrareservada id", "<argumento>"],
      "id": ["id", "<argumento>"],
      ")": ["ε"]
    },
    "<declaraciones>": {
      "variables": ["variables{ <declaracion_variable> }"]
    },
    "<declaracion_variable>": {
      "palabrareservada": ["<palabra_reservada> id ;"]
    },
    "<asignaciones>": {
      "asignacion": ["asignacion{ <asignacion> }"]
    },
    "<asignacion>": {
      "id": ["id = fun()", "<asignacion>"],
      ";": ["ε"]
    },
    "<palabra_reservada>": {
      "palabrareservada": ["palabrareservada"]
    }
  };
  
  const terminals = ["id", ";", "{", "}", "(", ")", "palabrareservada", "function", "variables", "asignacion","$"];
  
  export function validate(input) {
    let i = 0;
    let stack = ["$", "<programa>"];
    
    do {
      let a = input[i];
      let x = stack[stack.length - 1];
    
      if (x == "$" || terminals.includes(x)) {
        if (a == x) {
          stack.pop();
          i++;
        } else {
          console.log("error 1 after " + input[i - 1] + " expected " + stack[stack.length - 1]);
          break;
        }
      } else {
        if (table[x][a] != undefined) {
          let temp = table[x][a];
          stack.pop();
          for (let j = temp.length - 1; j >= 0; j--) {
            if (temp[j] != "ε") {
              stack.push(temp[j]);
            }
          }
        } else {
          console.log("error 2 in " + input[i] + " expected " + stack[stack.length - 1]);
          break;
        }
      }
    } while (stack.length > 0);
    
    if (stack.length == 0) {
      return true;
    } else {
      return false;
    }
  }
  