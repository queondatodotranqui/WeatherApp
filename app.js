
var dias = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
var lugares = ['Mar del Plata', 'CABA', 'Corrientes', 'Bariloche'];

var selectorDias = document.getElementById('dias');
var selectorLugar = document.getElementById('lugares');

selectorDias.addEventListener('change', ()=>{
    document.getElementById('dia').innerHTML = dias[selectorDias.selectedOptions[0].value];
})

selectorLugar.addEventListener('change', ()=>{
    document.getElementById('lugar').innerHTML = lugares[selectorLugar.selectedOptions[0].value];
})

window.addEventListener('load', ()=>{
    let long;
    let lat;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const key = 'ad5fd62fe26fee6134467fcefce7a6cf'
            const proxy = 'https://cors-anywhere.herokuapp.com/'
            let api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;

            /*
            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data);

                let {temp} = data.main;
                console.log(temp);
                
                var tempCel = temperatureConverter(temp);
                console.log(tempCel.toFixed(2));

                document.getElementById('numero').innerHTML = tempCel.toFixed(1) + '°C';                
            })
            */
            

            function temperatureConverter(valNum) {
                valNum = parseFloat(valNum);
                var celcius=valNum-273.15;
                return celcius;
            }
        });
    }
})
