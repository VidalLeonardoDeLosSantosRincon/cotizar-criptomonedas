class Interfaz{

    constructor(){
        this.init();
    }

    init(){
        this.setSelectCriptomonedas();
    }

    setSelectCriptomonedas(){
        cotizar.obtenerCriptomonedasApi()
        .then((data)=>{
            const criptomonedas = data.monedas;
            const selectCriptomonedas = document.getElementById("criptomoneda");

            criptomonedas.forEach(criptomoneda => {
                //console.log(`id: ${criptomoneda.id} | name: ${criptomoneda.name}`);
                selectCriptomonedas.innerHTML+=`<option value=${criptomoneda.id}>${criptomoneda.name}</option>`;
            });
        }).catch((error)=>console.log(error));
    }


    //muestra el resultado de la cotizacion
    showResults(resultado,moneda){
        //console.log(resultado);
        //console.log(moneda);

        const etiquetaMoneda = `price_${moneda}`;
        const valor = resultado[etiquetaMoneda];
        const lastUpdated = new Date(resultado.last_updated*1000);

        //console.log(valor);
        const container = document.getElementsByClassName("ctr")[0];
        let templateHTML="";
        templateHTML=`
        <div class="result" id="result">
            <img src="./img/preloader.gif" alt="/"/>
        </div>
        `;
        container.innerHTML+=templateHTML;

        setTimeout(()=>{
            container.removeChild(document.getElementById("result"));
            templateHTML=`
            <div class="result" id="result">
                <h4>Resultado:</h4>
                <h5>El precio de ${resultado.name} a moneda ${moneda.toUpperCase()} es de: ${valor}</h5>
                <h5>Ultima hora: ${resultado.percent_change_1h}</h5>
                <h5>Ultimo dia: ${resultado.percent_change_24h}</h5>
                <h5>Ultima semana: ${resultado.percent_change_7d}</h5>
                <h5>Ultima actulizacion: ${lastUpdated.getHours()}:${lastUpdated.getMinutes()} horas</h5>
            </div>
            `;
            container.innerHTML+=templateHTML;
        },3000);

    } 

    showMessage(type,message){
        if(type && message){
            if(type==="error"){
                let text="";
                let h4="";
                const msgDiv = document.createElement("div");
                msgDiv.classList.add("error-box");
                message.forEach((ms)=>{
                    text = document.createTextNode(ms);
                    h4 = document.createElement("h4");
                    h4.appendChild(text);
                    msgDiv.appendChild(h4);
                }); 
                if(document.getElementsByClassName("error-box")[0]==undefined){
                    document.getElementById("formulario").appendChild(msgDiv);
                }else{
                    document.getElementById("formulario").removeChild(document.getElementById("formulario").lastElementChild);
                    document.getElementById("formulario").appendChild(msgDiv);
                }

                setTimeout(()=>{
                    if(document.getElementsByClassName("error-box")[0]!==undefined){
                        document.getElementById("formulario").removeChild(document.getElementById("formulario").lastElementChild);
                    }
                },3000);
            }
        }
    }

}