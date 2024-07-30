let map = L.map('map', {
    center: [-6.887698002563706, -38.56015173326553],
    zoom: 15,
    minZoom: 14,
    maxZoom: 16
});

let marker = L.marker([-6.887698002563706, -38.56015173326553],{
    draggable: true,
}).addTo(map);

map.locate();

const coordinates=[-6.887698002563706, -38.56015173326553];

map.on('locationfound', e=>{
    marker.setLatLng(e.latlng);
    map.setView(e.latlng);

}); 


map.on('click', l =>{
    marker.setLatLng(l.latlng);
    map.setView(l.latlng);
    coordinates.splice(0,2,l.latlng.lat,l.latlng.lng)
});


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const button=document.getElementById("button");
const Pessoa={};

button.addEventListener('click',(e)=>{
    e.preventDefault();
    const nome=document.getElementById('nome').value;
    const idade=document.getElementById('idade').value;
    const email=document.getElementById('email').value;
    Object.assign(Pessoa,{nome,idade,email,localizacao:{
        type:"Point",
        coordinates
    }})
    console.log(Pessoa);
})
