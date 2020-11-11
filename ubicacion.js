
window.addEventListener('load', ()=>{

    let proxy = 'https://cors-anywhere.herokuapp.com/';
    const location = `${proxy}https://geolocation-db.com/json/09ba3820-0f88-11eb-9ba6-e1dd7dece2b8`;

    fetch(location)

    .then(response =>{
        return response.json();
    })
    .then(response=>{
        console.log(response);
        document.getElementById('lugar').innerHTML = response.city;
    })
})