let lat;
let lng;

let map = L.map('map', {
    center: [-6.887698002563706, -38.56015173326553],
    zoom: 15,
    minZoom: 14,
    maxZoom: 16
});

let marker = L.marker([-6.887698002563706, -38.56015173326553], {
    draggable: true,
}).addTo(map);

map.locate();

map.on('locationfound', e => {
    marker.setLatLng(e.latlng);
    map.setView(e.latlng);
    lat=marker.getLatLng().lat;
    lng=marker.getLatLng().lng;
});


map.on('click', l => {
    marker.setLatLng(l.latlng);
    map.setView(l.latlng);
    lat=marker.getLatLng().lat;
    lng=marker.getLatLng().lng;
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);



const button = document.getElementById("button");

button.addEventListener('click', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const email = document.getElementById('email').value;
    const coordinates=[lat,lng];

    if(!nome || !idade || !email){
        const msg=document.getElementById('msg');
        msg.textContent='Todos os campos são obrigatórios!'
    }else{

    const Pessoa = {
        nome,
        email,
        idade,
        "localizacao": {
            "type": "Point",
            coordinates
        }
    };

    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Pessoa)
    })
    .then(data => {
        const msg=document.getElementById('msg');
        if(data.status===404){
            msg.style.color='#ff0000';
            msg.textContent='Já existe um usuario com esse CPF';
        }else{
        msg.style.color='#057708';
        msg.textContent='Pedido criado com sucesso';
        }
        console.log(`${data} oi`);})
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok ' + res.statusText);
        }
        return res.json();
    })
    
    .catch(e => console.log('There was a problem with the fetch operation:', e)); 
}});
