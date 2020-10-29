
var dias = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
var lugares = ['Mar del Plata', 'CABA', 'Corrientes', 'Bariloche'];

var selectorDias = document.getElementById('dias');
var selectorLugar = document.getElementById('lugares');

var dia = document.getElementById('dia');

selectorDias.addEventListener('change', ()=>{
    dia.innerHTML = dias[selectorDias.selectedOptions[0].value];
})

selectorLugar.addEventListener('change', ()=>{
    document.getElementById('lugar').innerHTML = lugares[selectorLugar.selectedOptions[0].value];
})

var dayOfWeek = '';

//console.log(date);
//console.log(a);

/*

var times = [1603810800, 1603983600, 1604070000, 1604156400, 1604242800, 1604329200, 1604415600];       // array con timestamps de los dias

window.addEventListener('load', ()=>{                       // muestra los dias del arreglo times
    for(let i = 0; i < times.length; i++){
        let b = new Date(times[i]*1000);
        let day = dias[b.getDay()];
        console.log(day);
    }
})

*/

function currentDay(dia){
    var timestamp = dia;
    var a = new Date(timestamp*1000);
    dayOfWeek = dias[a.getDay()];
    dia.innerHTML = dayOfWeek;
}






window.addEventListener('load', ()=>{
    let long;
    let lat;
    let alerts = 'alerts';

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const key = '218a3479ecf608d72cb45674511aa25b'
            const proxy = 'https://cors-anywhere.herokuapp.com/'
            let api = `${proxy}api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=${alerts}&appid=${key}`;

            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data);

                let {temp} = data.daily;
                let {dt} = data.daily;
                console.log(temp);

                currentDay(dt);
                
                var tempCel = temperatureConverter(temp);
                console.log(tempCel.toFixed(2));

                document.getElementById('numero').innerHTML = tempCel.toFixed(1) + '°C';                
            })
            

            function temperatureConverter(valNum) {
                valNum = parseFloat(valNum);
                var celcius=valNum-273.15;
                return celcius;
            }
        });
    }
})
