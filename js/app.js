"use strict"

/**
 *  TODO: INICIO JAVASCRIPT GENERALES
 */

                                                                                    //*Inicializar variables 
    const botonuno = document.getElementById('botonuno');
    const botondos = document.getElementById('botondos');
    const botontres = document.getElementById('botontres');
    const botoncuatro = document.getElementById('botoncuatro');
    const cuerpo=document.querySelector("body");
    const divPersonajes = document.getElementById("personajes");
    const imgtutoclick = document.getElementById("imgTuto1")
    const imgtutoboss = document.getElementById("imgTuto2")
                                                                                            //*Funciones
    function cambiarPestaña(pestaña){
        contenedor.style.display="none";
        contenedor.style.visibility="hidden";
        ventanaGacha.style.display="none";
        ventanaGacha.style.visibility="hidden"
        boss.style.display="none";
        boss.style.visibility="hidden"
        divPersonajes.style.display="none";
        divPersonajes.style.visibility="hidden";
        imgtutoboss.style.visibility="hidden";
        imgtutoclick.style.visibility="hidden";
        
        switch(pestaña){
        case "uno":
            contenedor.style.display="flex";
            contenedor.style.visibility="visible";
            imgtutoclick.style.visibility="visible";
            break;
        case "dos":
            ventanaGacha.style.display="flex";
            ventanaGacha.style.visibility="visible"
            break;
        case "tres":
            divPersonajes.style.display="flex";
            divPersonajes.style.visibility="visible";
            break;
        case "cuatro":
            boss.style.display="flex";
            boss.style.visibility="visible"
            imgtutoboss.style.visibility = "visible"

            break;
        }

    }
                                                                                        //*Eventos
    //Empezar audio
    cuerpo.addEventListener("click",()=>{
    audioFondo.play();
    });
    
    //Cambiar a pestaña clicker
    botonuno.addEventListener('click',()=>{
        cambiarPestaña("uno");
    });
    //Cambiar a pestaña gacha
    botondos.addEventListener('click',()=>{
        cambiarPestaña("dos");
    });
    //Cambiar a pestaña personajes
    botontres.addEventListener('click',()=>{
        cambiarPestaña("tres");
        resaltarPersonajes();
    });
    //Cambiar a pestaña boss
    botoncuatro.addEventListener('click',()=>{
        cambiarPestaña("cuatro");
    });
/**
 *  TODO: FIN JAVASCRIPT GENERALES
 */


/**
 *  TODO: INICIO JAVASCRIPT CLICKER
 */

                                                                                //*Iniciacion de variables
    let img = document.getElementById("imgClicker");
    let num = document.getElementById("cant");
    let minerales= 0;
    let mineralesGuardados = localStorage.getItem('mineralesLS');
                                            
    llamarMinerales();
                                                                                        //*Funciones
    //funcion para contar los clicks
    function minar(){
        if(mineralesGuardados !== null){
            minerales++;
            actualizarMinerales();
        }else{
            mineralesGuardados=0;
        }
    }
    //funcion para actualizar los clicks
    function actualizarMinerales(){
        num.innerText=minerales;
        localStorage.setItem('mineralesLS',minerales); 
    }  
    //funcion para llamar los datos guardados de los minerales
    function llamarMinerales(){
        if (mineralesGuardados !== null) {
            minerales = parseInt(mineralesGuardados);
            num.innerText = minerales;
        }
        else{
            mineralesGuardados=0;
        }
    }
                                                                                            //*Eventos
    img.addEventListener("click",()=>{
        minar();
        etiquetaAudio.setAttribute("src", "audio/miniminar.mp3");
        etiquetaAudio.play();
    });

/**
 * TODO: FIN JAVASCRIPT CLICKER
 */



/**
 *  TODO: INICIO JAVASCRIPT GACHA
 */
                                                                                    //*Iniciacion de variables

    // Obtener un índice aleatorio basado en las probabilidades
    let indiceAleatorio ;
    // Seleccionar el personaje correspondiente al índice aleatorio
    let personajeSeleccionado;
    //array para guardor los personajes del json.
    let total_p;
    //Aquí se guarda el resultado de getRandomIndex().
    let almacenarProbabilidad;
    

    //variables para sonido:
    let etiquetaAudio= document.createElement("audio");
    etiquetaAudio.setAttribute("preload", "auto");
    let sonidoBoss = document.querySelector(".fondoBoss");
    let divBoss = document.querySelector(".fondoBoss");
    const fondo = document.getElementById('fondo');
    const botonx1 = document.getElementById('uno');
    const botonx10 = document.getElementById('diez');
    const oculto = document.getElementById('oculto');
    const imagenesPrueba = document.querySelectorAll('.oculto img');
    const ventanaGacha = document.getElementById('gachapon');
    const contenedor = document.querySelector('.contenedor');
    const boss = document.getElementById('tremendoBoss');
    //Array para rellenar con id's
    const personajes=[];
    //Array para rellenar con probabilidades desde json
    const pruebaProbabilidades = [];
    //Array para guardar pjs obtenidos en el gacha
    let personajesObtenidos = [];
    let cadenaPjs ="";



                                                                                //* Llamar a los datos del JSON
    llamarDatos();

    //SONIDO DE FONDO:
    const audioFondo= document.createElement("audio");
    audioFondo.setAttribute("preload", "auto");
    audioFondo.setAttribute("src", "audio/efectocueva.mp3");


                                                                                            //*Funciones

    //Función que genera una posición del array de cada personaje, en función a la probabilidad de cada posición.
    function getRandomIndex(indice) {
        // Sumar todas las probabilidades. Reduce hace que todos los elementos del array se sumen en uno solo.
        const probabilidadTotal = indice.reduce((acumulador, probabilidad) => acumulador + probabilidad, 0);
        // Generar un número aleatorio entre 0 y la suma total de probabilidades
        const numeroRandom = Math.random() * probabilidadTotal;
        almacenarProbabilidad = 0;
        // Iterar sobre las probabilidades hasta encontrar el índice correspondiente
        for (let i = 0; i < indice.length; i++) {
            almacenarProbabilidad += indice[i];
            if (numeroRandom < almacenarProbabilidad) {
                return i;
            }
        }
    }
    //Funcion para tirar de un gacha
    function randomizarGacha(){
        //Coge un indice del array aleatorio
        indiceAleatorio = getRandomIndex(pruebaProbabilidades);
        //Cogemos un objeto del array utilizando el indice aleatorio
        personajeSeleccionado = personajes[indiceAleatorio];
        //Generar las imagenes con las rutas
        oculto.innerHTML+=`<img src="img/${personajeSeleccionado}.png" draggable="false"></img>`;
        guardarPersonajes(personajeSeleccionado);
    }
    //Funcion para llamar los datos
    function llamarDatos(){
        total_p = datos.total_personajes;
        //almacenar en un array los personajes con el id
        for(let i=0;i<total_p;i++){
            let almacenar;
            almacenar = datos.personajes[i]["id"];
            personajes.push(almacenar);
        }
        //almacenar en un array la probabilidad sacandola del json
        for(let i = 0;i<total_p;i++){
            let almacenar;
            almacenar = datos.personajes[i]["probabilidad"];
            pruebaProbabilidades.push(almacenar);
        }   
    }
    //Funcion para deshabilitar los botones
    function deshabilitarBotones(){
        botonx10.disabled="disabled";
        botonx1.disabled="disabled";
    }
    function habilitarBotones(){
        botonx10.disabled = "";
        botonx1.disabled = "";
    }
    //Funcion que guarda los personajes en el array vacío
    function guardarPersonajes(personaje){
        let cambiar=true;
        for(let i=0;i<personajesObtenidos.length;i++){
            if(personaje===personajesObtenidos[i]){
                cambiar=false;
                break;
            }
        }
        if(cambiar===true){
            personajesObtenidos.push(personaje); 
            cadenaPjs="";
            for(let p of personajesObtenidos){
                cadenaPjs+=p+",";
            }
            localStorage.setItem('cadenaTemp',cadenaPjs);
        }
    }
    //Personajes obtenidos
    function llamarPersonajes(){
        let pruebita = localStorage.getItem('cadenaTemp'); 
        if(pruebita != null){
        personajesObtenidos=pruebita.split(/,\s*/).map(Number);
      }
      
      for(let i =0; i<personajesObtenidos.length;i++){
        if(personajesObtenidos[i]===0){
          personajesObtenidos.splice(i,1);
        }
      }
    }
    //funcion para cambiar de pestañas
    function deshabilitarVisibility(){
        ventanaGacha.style.display="none";
        ventanaGacha.style.visibility="hidden";
    }
    function habilitarVisibility(){
        contenedor.style.display="flex";
    }


                                                                                                //*Eventos
    llamarPersonajes();
    //Evento para tirar x1 del gacha
    botonx1.addEventListener('click',
    ()=>{
        if(localStorage.getItem('mineralesLS')>29){
            randomizarGacha();
            deshabilitarBotones();
            minerales=minerales - 30;
            actualizarMinerales();
            actualizarDaño();
        }
        else{
            alert("No tienes los minerales necesarios.")
        }
    });
    //Evento para tirar x10 al gacha
    botonx10.addEventListener('click',
        ()=>{
            if(localStorage.getItem('mineralesLS')>=299){
                oculto.style.visibility = "visible";//añadirle la propiedad visibility para que se vea.
                for(let i =0;i<10;i++){
                    randomizarGacha();
                }
                deshabilitarBotones();
                minerales = minerales -300;
                actualizarMinerales();
                actualizarDaño();  
            }
            else{
                alert("No tienes los minerales necesarios.")
            }
    });
    //Evento para volver a habilitar los botones haciendo click en la pantalla
    fondo.addEventListener("click",()=>{
        oculto.innerHTML = "";//borrar imagenes de los personajes.
        habilitarBotones();
    });
/**
 *  TODO: FIN JAVASCRIPT GACHA
 */



/**
 *  TODO: INICIO JAVASCRIPT PERSONAJES
 */

let imagenesPersonajes = document.querySelectorAll(".marcoPJ img");
let divImagenesPersonajes = document.querySelectorAll(".marcoPJ");
let info = document.querySelectorAll(".info");

function resaltarPersonajes(){

    for(let i of personajesObtenidos){
        for(let p=1; p<=imagenesPersonajes.length;p++){
            if(p === i){
                divImagenesPersonajes[p-1].classList.remove("oscuro");

            }
        }
    }
}

let salir = [];
for(let i=0;i<=datos["personajes"].length;i++){

    salir[i]=true;
}


function mostrarDatos(ruta){
    
    for(let p of personajesObtenidos){
        for(let i of datos["personajes"]){
            if(p===i["id"] && ruta===i["img"]){            
                for(let o=1; o<=imagenesPersonajes.length;o++){
                    if(o === p){
                        info[o-1].innerText=`Nombre: ${i["nombre"]}\n
                                             Daño: ${i["poder"]}`;
                        if(salir[o-1]===true){
                            info[o-1].style.display="block";
                            salir[o-1]=false;
                        }else{
                            info[o-1].style.display="none";
                            salir[o-1]=true;
                        } 
                    }
                }   
            }
        }
    }
}

for(let m of imagenesPersonajes){
    m.addEventListener("click",()=>{
        mostrarDatos(m.getAttribute("src"));
    })
}

/**
 *  TODO: FIN JAVASCRIPT PERSONAJES
 */



/**
 *  TODO: INICIO JAVASCRIPT BOSS
 */
                                        //Inicializacion variables
    let vida = datos["boss"]["vida"];
    let vidamax = datos["boss"]["vida"];
    let value;
    let max;
    const barraboss = document.getElementById("vidaBoss");
    let bonf=0;
    let potente = document.getElementById("potente")
    let multiplicador = 1.10;
    let comprobador = localStorage.getItem("nivelG");
    var numerodps = document.getElementById("numero");
    // Generar un número aleatorio entre 1 y 10
  
                                                                                            //*Funciones
    function actualizarDaño(){
        bonf = 0;
        for(let i of personajesObtenidos){
            for(let p of datos["personajes"]){
                if(p["id"] === i){
                    bonf=bonf+p["poder"];
                }
            }
        }
    }

    function comprobarVida(){
        if(comprobador===null){
            potente.innerText=`${barraboss.getAttribute("value")}/${barraboss.getAttribute("max")}`;
            localStorage.setItem("vidaG",vida)
            localStorage.setItem("vidaMG",vidamax)
          }
          else{
            potente.innerText=`${localStorage.getItem("vidaG")}/${localStorage.getItem("vidaMG")}`;
            barraboss.setAttribute("value",localStorage.getItem("vidaG"))
            barraboss.setAttribute("max",localStorage.getItem("vidaMG"))
          }
    }
    function cambiarEstilos(event){
        let x = event.clientX;
        let y = event.clientY;
        numerodps.style.left =30 + x + "px";
        numerodps.style.top = -30 + y + "px";
        numerodps.innerText =bonf+1;
        numerodps.style.display = "block";
    }
                                                                                            //* Eventos
    //Comprobar local Storage de la vida
    comprobarVida();
    
    //Audio del boss
    sonidoBoss.addEventListener("click", () => {
        etiquetaAudio.setAttribute("src", "audio/quejarse.mp3");
        etiquetaAudio.play();
    });


    divBoss.addEventListener("click",(event)=>{
        actualizarDaño();
        // Mostrar el número generado
        cambiarEstilos(event);
        // Ocultar el número después de 2 segundos (2000 milisegundos)
        setTimeout(
            ()=> {
                numero.style.display = "none";
        }, 200);

        if(comprobador === null){
            vida=vida-1-bonf;
        }

        else{
            vida =localStorage.getItem("vidaG");    
            vidamax =localStorage.getItem("vidaMG");
            vida=vida-1-bonf;
        }

        if(vida<0){
            vidamax = Math.floor(vidamax*multiplicador); 
            vida = vidamax
            comprobador =  1;
            alert("Nivel Completado.")  
            localStorage.setItem("nivelG",comprobador)
        }

          localStorage.setItem("vidaG",vida)
          localStorage.setItem("vidaMG",vidamax)      
          potente.innerText=`${localStorage.getItem("vidaG")}/${localStorage.getItem("vidaMG")}`;

          barraboss.setAttribute("value",localStorage.getItem("vidaG"))
          barraboss.setAttribute("max",localStorage.getItem("vidaMG"))

        });

/**
 *  TODO: FIN JAVASCRIPT BOSS
 */
