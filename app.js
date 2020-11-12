
var dias = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
var lugares = ['Mar del Plata', 'CABA', 'Corrientes', 'Bariloche'];

var selectorDias = document.getElementById('dias');
var selectorLugar = document.getElementById('lugares');

var dia = document.getElementById('dia');

selectorLugar.addEventListener('change', ()=>{
    document.getElementById('lugar').innerHTML = lugares[selectorLugar.selectedOptions[0].value];
})



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
    var dayOfWeek = '';
    var timestamp = dia;
    var a = new Date(timestamp*1000);
    dayOfWeek = dias[a.getDay()];
    return dayOfWeek;
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
            //const proxy = 'https://cors-anywhere.herokuapp.com/'
            let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=${alerts}&appid=${key}`;

            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data);

                var diaElegido = 0;

                actualizarSelect(data);

                var dateDaily = data.daily[diaElegido].dt;
                var humed = data.daily[diaElegido].humidity;
                var preci = data.daily[diaElegido].pop;
                var tempDaily = data.daily[diaElegido].temp.day;
                var weather = data.daily[diaElegido].weather[0];

                dia.innerHTML = currentDay(dateDaily);

                //console.log(tempDaily);
                
                var tempCel = temperatureConverter(tempDaily);
                //console.log(tempCel.toFixed(2));

                document.getElementById('numero').innerHTML = tempCel.toFixed(1) + '°C';
                
                document.getElementById('humedad').innerHTML = humed + '%'; 

                document.getElementById('precip').innerHTML = preci*100 + '%';

                var skycons = new Skycons({"color": "black"});

                cambiarIcono(skycons, weather);

                selectorDias.addEventListener('change', ()=>{

                    dia.innerHTML = selectorDias.selectedOptions[0].text;
                    diaElegido = selectorDias.selectedOptions[0].value;

                    dateDaily = data.daily[diaElegido].dt;
                    humed = data.daily[diaElegido].humidity;
                    preci = data.daily[diaElegido].pop;
                    tempDaily = data.daily[diaElegido].temp.day;
                    weather = data.daily[diaElegido].weather[0];

                    tempCel = temperatureConverter(tempDaily);
                    //console.log(tempCel.toFixed(2));
    
                    document.getElementById('numero').innerHTML = tempCel.toFixed(1) + '°C';
                    
                    document.getElementById('humedad').innerHTML = humed + '%'; 
    
                    document.getElementById('precip').innerHTML = preci.toFixed(2)*100 + '%';
    
                    skycons = new Skycons({"color": "black"});
    
                    cambiarIcono(skycons, weather);
                })
            })

            function cambiarIcono(skycons, tiempo){
                var backG = document.getElementById('fondiu');
                if(tiempo.main == 'Clear'){
                    skycons.add(document.getElementById("icon1"), Skycons.CLEAR_DAY);
                    skycons.play();
                    backG.classList = '';
                    backG.classList.add('clear');
                }
                if(tiempo.main == 'Rain'){
                    skycons.add(document.getElementById('icon1'), Skycons.RAIN);
                    skycons.play();
                    backG.classList = '';
                    backG.classList.add('rainy');
                }
                if(tiempo.main == 'Clouds'){
                    skycons.add(document.getElementById('icon1'), Skycons.CLOUDY);
                    skycons.play();
                    backG.classList = '';
                    backG.classList.add('cloudy');
                }
            }

            function temperatureConverter(valNum) {
                valNum = parseFloat(valNum);
                var celcius=valNum-273.15;
                return celcius;
            }

            function actualizarSelect(data){
                var actuaDaily = document.querySelectorAll('.daily');
                for(let i = 0; i < actuaDaily.length; i++){
                    actuaDaily[i].innerHTML = currentDay(data.daily[i].dt);
                }
            }
        });
    }
})
