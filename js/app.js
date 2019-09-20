
const cotizar = new Cotizar();
const ui = new Interfaz(); 


const formulario = document.getElementById("formulario");
formulario.addEventListener("submit",(e)=>{
    e.preventDefault();
    e.stopPropagation();
    
    const selectMoneda = document.getElementById("moneda");
    const monedaSeleccionada = selectMoneda.options[selectMoneda.selectedIndex].value;

    const selectCriptomoneda = document.getElementById("criptomoneda");
    const criptomonedaSeleccionada = selectCriptomoneda.options[selectCriptomoneda.selectedIndex].value;

    if(monedaSeleccionada.trim()==="" && criptomonedaSeleccionada.trim()===""){
        ui.showMessage("error",["No se ha selecciono ninguna moneda.","No se ha selecciono ninguna criptomoneda."]);
    }else if(monedaSeleccionada.trim()==="" && criptomonedaSeleccionada.trim()!==""){
        ui.showMessage("error",["No se ha selecciono ninguna moneda."]);
    }else if(monedaSeleccionada.trim()!=="" && criptomonedaSeleccionada.trim()===""){   
        ui.showMessage("error",["No se ha selecciono ninguna criptomoneda."]);
    }else{
        ui.showMessage("success",["Todo bien."]);
        //console.log(monedaSeleccionada+" | "+criptomonedaSeleccionada);
        cotizar.cotizarMoneda(monedaSeleccionada,criptomonedaSeleccionada)
        .then((res)=>{
            ui.showResults(res.data[0],monedaSeleccionada);
        }).catch((error)=>console.log(error));
    }
});

