function apagar(id) {
    fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE'
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Erro ao deletar o usuário');
        }
        console.log("Usuário deletado com sucesso");
        fetchData();
    })
    .catch(e => console.log(e));
}

const button=document.getElementById('btn-enviar');
button.addEventListener('click',()=>{
        const email=document.getElementById('email').value;

        fetch(`http://localhost:3000/users/${email}`)
        .then(res=>res.json())
        .then(res=>{
            displayData([res]);
        })
    })

function fetchData() {
    fetch('http://localhost:3000/users')
        .then(res => res.json())
        .then(res => {
            displayData(res);
        })
        .catch(e => console.log(e));
}

function displayData(data) {
    const dados = document.getElementById('dados');
    dados.innerHTML = '';

    data.forEach(i => {
        const tr = document.createElement('tr');
        
        const id = document.createElement('td');
        const nome = document.createElement('td');
        const email = document.createElement('td');
        const idade = document.createElement('td');
        const latitude = document.createElement('td');
        const longitude = document.createElement('td');
        const apagar = document.createElement('td');
        const button = document.createElement('button');
        const img = document.createElement('img');

        img.classList.add('img-apagar');
        img.src = './imagens/54324.png';
        
        id.textContent = i.id;
        nome.textContent = i.nome;
        email.textContent = i.email;
        idade.textContent = i.idade;
        latitude.textContent = i.localizacao.coordinates[1];
        longitude.textContent = i.localizacao.coordinates[0];
        
        button.appendChild(img);
        button.dataset.id = i.id;
        apagar.appendChild(button);

        tr.appendChild(id);
        tr.appendChild(nome);
        tr.appendChild(email);
        tr.appendChild(idade);
        tr.appendChild(latitude);
        tr.appendChild(longitude);
        tr.appendChild(apagar);

        dados.appendChild(tr);
    });
}
document.getElementById('dados').addEventListener('click', function(event) {
    if (event.target.tagName === 'IMG' && event.target.classList.contains('img-apagar')) {
        const button = event.target.closest('button');
        const userId = button.dataset.id;
        apagar(userId);
    }
});

fetchData();