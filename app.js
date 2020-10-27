
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


var timestamp = Date.now();
var a = new Date(timestamp*1000);
var dayOfWeek = dias[a.getDay()];

console.log(dayOfWeek);

//console.log(date);
//console.log(a);





window.addEventListener('load', ()=>{
    let long;
    let lat;
    let alerts = 'alerts';

    dia.innerHTML = dayOfWeek;

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

                let {temp} = data.current;
                console.log(temp);
                
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
