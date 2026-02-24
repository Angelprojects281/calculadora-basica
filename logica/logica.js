let numeros= document.getElementsByClassName("numero"); // la lista de los numero del 0 al 9
let simbolos= document.getElementsByClassName("simbolo");// la lista de los simbolos 
let pantalla= document.getElementById("pantalla"); // la pantalla que muestra el contenido
let resultadoFin= false; // variable que ayuda a limpiar la pantalla despues de mostrar un resultado


//funcion para agregar un numero a la pantalla
function agregarNum() {
    for (let i= 0; i< numeros.length; i++) { //recorre todos los numeros del arreglo
        numeros[i].addEventListener("click",(e) => { //aagrega un evento para tomas el valor del numero segun el boton
            if (resultadoFin) { //valida si ya se mostro el resultado para limpiar la pantalla
                pantalla.textContent= "";
                resultadoFin= false;
            }
            pantalla.textContent += e.target.value; //agrega el numero segun el boton pulsado
    })};
}

//funcion para agregar el simbolo
function agregarSim() {
    for (let i= 0; i< simbolos.length; i++) {//recorre la lista de numeros
        simbolos[i].addEventListener("click",(s) => {
            if (resultadoFin) { //valida si ya se mostro el resultado para limpar la pantalla
                pantalla.textContent= "";
                resultadoFin= false;
            }else if (pantalla.textContent=== "") { //evita que se inicie con un simbolo excepto el negativo
                if (s.target.value === "-"){
                    pantalla.textContent+= "-";
                    return;}
            
            } else if (["+","*","/","-","."].includes(pantalla.textContent.slice(-1))){ //evita que se pongan dos simbolos seguidos excepto los negativos
                if (s.target.value === "-" && pantalla.textContent.slice(-1) !== "-"){
                    pantalla.textContent+= "-";
                    return;}          
            }else {
                pantalla.textContent += s.target.value;} // coloca el simbolo
    })};
}

function calcular() { // calcula el resultado usando el metodo eval
    try{
        let resultado= eval(pantalla.textContent);
        if (resultado== "Infinity"){ // maneja las divisiones por cero
            pantalla.textContent= "error matematico";
            resultadoFin= true;
        } else { // muestra el resultado
            pantalla.textContent= parseFloat(resultado.toFixed(10));
            }
    } catch { // maneja los errores matematicos 
        pantalla.textContent= "error matematico";
        resultadoFin= true;
    }
}

function limpiar() { // limpia la pantalla
    pantalla.textContent= ""
}

function borrar(){
    pantalla.textContent= pantalla.textContent.slice(0,-1);
}

agregarNum()//llama a la funcion para que este activa
agregarSim()
document.querySelector(".calcular").addEventListener("click",calcular)
document.querySelector("#borrar").addEventListener("click",borrar)
document.querySelector("#limpiar").addEventListener("click",limpiar)
