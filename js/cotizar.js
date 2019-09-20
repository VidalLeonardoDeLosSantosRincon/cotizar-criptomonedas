class Cotizar{
    
    async obtenerCriptomonedasApi(){
        const res =  await fetch("https://api.coinmarketcap.com/v1/ticker/");
        const monedas = await res.json();
        return {
            monedas
        }
    }

    async cotizarMoneda(moneda,criptomoneda){
        const urlConvertir = `https://api.coinmarketcap.com/v1/ticker/${criptomoneda}/?convert=${moneda}`;
        const res = await fetch(urlConvertir);
        const data = await res.json();
        return {data};
    }

}




