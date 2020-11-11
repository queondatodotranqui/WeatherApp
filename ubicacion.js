
window.addEventListener('load', ()=>{

    const myRequest = new Request('http://ip-api.com/json/')

    fetch(myRequest)

    .then(function (response) {
            return response.json();
        })
    .then(data=>{
        console.log(data);
        document.getElementById('lugar').innerHTML = data.city;
    })
})