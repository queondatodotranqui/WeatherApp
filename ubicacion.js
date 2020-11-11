
window.addEventListener('load', ()=>{

    const myRequest = new Request('https://geolocation-db.com/json/09ba3820-0f88-11eb-9ba6-e1dd7dece2b8')

    fetch(myRequest)

    .then(function (response) {
            return response.json();
        })
    .then(data=>{
        console.log(data);
        document.getElementById('lugar').innerHTML = data.city;
    })
})