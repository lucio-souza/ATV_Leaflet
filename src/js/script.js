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
});

map.on('click', l => {
    marker.setLatLng(l.latlng);
    map.setView(l.latlng);
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
    const coordinates=[marker.getLatLng.lng,marker.getLatLng.lat];

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
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok ' + res.statusText);
        }
        return res.json();
    })
    .then(data => console.log(data))
    .catch(e => console.log('There was a problem with the fetch operation:', e)); 
});
