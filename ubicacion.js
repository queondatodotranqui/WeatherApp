
window.addEventListener('load', ()=>{

    let proxy = 'https://cors-anywhere.herokuapp.com/'
    const myRequest = new Request(`${proxy}http://ip-api.com/json/`);

    fetch(myRequest)

    .then(function (response) {
            return response.json();
        })
    .then(data=>{
        console.log(data);
        document.getElementById('lugar').innerHTML = data.city;
    })
})