let mascotaSeleccionada;
let tuJugador;
let tuVidas =3;
let jugadorEnemigo;
let ataqueJugador;
let ataqueEnemigo ;
let vidasEnemigo=3;


function iniciarJuego(){
    const seccionAtaque = document.getElementById('escoger_movimiento');
const seccionReiniciar = document.getElementById('reiniciarJuego');
const botonReiniciar =document.getElementById('boton_reiniciar');
botonReiniciar.addEventListener('click',reiniciarJuego);

const seccionJugador = document.getElementById('seccion_escoger_jugador');
    const boton_jugar=document.getElementById('empezar_juego');
    boton_jugar.addEventListener('click',desaparecerIntroducción);

    seccionAtaque.style.display='none';
    seccionReiniciar.style.display='none';
    seccionJugador.style.display= 'none';
    
    const boton_escogerJugador = document.getElementById('boton_escoger_jugador');
    boton_escogerJugador.addEventListener('click', seleccionarJugador);

   const botonesAtaque = document.querySelectorAll('.boton_ataque');
   botonesAtaque.forEach(bton => bton.addEventListener('click', seleccionarAtaqueJugador));

  

    
}
function seleccionarJugador(){
    const seccionAtaque = document.getElementById('escoger_movimiento');
    seccionAtaque.style.display='block';
    // mete en un objeto de nodelist todos los inputs que coincidan con el valor de name=mascota
 const inpuMascota = document.querySelectorAll('input[name="mascota"]')
mascotaSeleccionada=Array.from(inpuMascota).find(input => input.checked);
tuJugador=mascotaSeleccionada.value;

if(mascotaSeleccionada){
 let spanJugadorSeleccionado=document.getElementById('tuJugador');
 spanJugadorSeleccionado.innerHTML=tuJugador;
}else {
    let secciónMensaje = document.getElementById('seccion_escoger_jugador');
    let mensaje = document.createElement('p')
    mensaje.innerHTML='No has escogido ninguna mascota';
    secciónMensaje.appendChild(mensaje);
}
 
enemigoAeatroio();


}
function enemigoAeatroio(){
   let  seccionJugador = document.getElementById('seccion_escoger_jugador');
    seccionJugador.style.display= 'none';
    let mascotaAleatoria = aleatorio(1,3);
    let mascotas =["Ken", "Barie", "Alan"];
     let spanJugadorEnemigo= document.getElementById('enemigoJugador');
     spanJugadorEnemigo.innerHTML=mascotas[mascotaAleatoria-1];
     jugadorEnemigo=mascotas[mascotaAleatoria-1];
}


function seleccionarAtaqueJugador(event){
    ataqueJugador = event.target.id.split('-')[1];
    if(ataqueJugador=='fuego'){
        ataqueJugador='Aliento de Fenix 🐦‍🔥';
    }else if (ataqueJugador=='agua'){
        ataqueJugador='Tormenta Infernal ⛈️';
    }else if (ataqueJugador=='tierra'){
        ataqueJugador='Fauces de Arena 🌱';
    }else if (ataqueJugador=='aire'){
        ataqueJugador='Tornado Devastador 🌪️';
    }
    ataqueEnemigoAleatorio();
        
}
function ataqueEnemigoAleatorio(){
 let ataqueAleatorio = aleatorio(1,4);
 let ataques =["Aliento de Fenix 🐦‍🔥", "Tormenta Infernal ⛈️", "Tornado Devastador 🌪️", "Fauces de Arena 🌱"];
 ataqueEnemigo = ataques[ataqueAleatorio-1];
mensajeCombate();
revisarvidas();

 
}

function mensajeCombate(){


let seleccionMensaje = document.getElementById('mensaje');
let parrafo=document.createElement('p');
parrafo.innerHTML='Tu jugador '+ tuJugador +'ha usado '+ataqueJugador+' El enemigo '+jugadorEnemigo+' ha usado '+ataqueEnemigo+'- '+combate();

seleccionMensaje.appendChild(parrafo);
} 


function combate(){
    let spantuVidas= document.getElementById('tuVidas');
    let spanEnemigoVidas=document.getElementById('enemigoVidas');
    let resultado;
const resultados ={
    EMPATE: ataqueEnemigo == ataqueJugador,
    GANASTE: (ataqueJugador=="Aliento de Fenix 🐦‍🔥" && ataqueEnemigo=="Fauces de Arena 🌱") || (ataqueJugador=="Tormenta Infernal ⛈️" && ataqueEnemigo=="Tornado Devastador 🌪️") 
    || (ataqueJugador=="Fauces de Arena 🌱" && ataqueEnemigo=="Tormenta Infernal ⛈️") || (ataqueJugador=="Tornado Devastador 🌪️" && ataqueEnemigo=="Aliento de Fenix 🐦‍🔥") 

};
    if(resultados.GANASTE){
       resultado="GANASTE 🎉🎉";
        vidasEnemigo--;
       spanEnemigoVidas.innerHTML= vidasEnemigo;
    } else if (resultados.EMPATE){
        resultado="EMPATE";
    }else {
        resultado="PERDISTE 😭😭";
        tuVidas--;
        spantuVidas.innerHTML=tuVidas;
    }
return resultado;


}

function revisarvidas(){
    const seccionReiniciar = document.getElementById('reiniciarJuego');
    let mensajeGanador=document.getElementById('mensaje');
    let parrafo=document.createElement('p');
    if(vidasEnemigo==0){
        parrafo.innerHTML='Has GANADO 🎉🎉, la partida ha terminado REINICIA el juego';
        mensajeGanador.appendChild(parrafo);
       
    }else if(tuVidas==0){
        parrafo.innerHTML='Has PERDIDO 😭😭, la partida ha terminado REINICIA el juego';
        mensajeGanador.appendChild(parrafo);
        

    }
    if (vidasEnemigo==0 ||tuVidas==0){
        seccionReiniciar.style.display='block';
        const botonesAtaque = document.querySelectorAll('.boton_ataque');
         // Deshabilitamos todos los botones
        botonesAtaque.forEach(boton => boton.disabled = true);
    }
    

}
function desaparecerIntroducción(){
    const seccionJugador = document.getElementById('seccion_escoger_jugador');
    let secciónIntro=document.getElementById('intro');
    secciónIntro.style.display = 'none';
    seccionJugador.style.display= 'block';
}

    // escoge un numero de manera aleatoria dentro de un rango
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function reiniciarJuego(){
    location.reload();
}

// para que cuando el códigoo se cargue llame a la función de iniciar juego 
window.addEventListener('load', iniciarJuego);