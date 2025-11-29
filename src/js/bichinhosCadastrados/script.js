let animais = JSON.parse(localStorage.getItem("animais")) || [];

function mostrarOsAnimais() {
    document.getElementById("listaAnimais").innerHTML = "";

    animais.forEach(animal => {
        document.getElementById("listaAnimais").innerHTML += `
            <div class="card">
                <h3>Nome: ${animal.nome}</h3>
                <p>Idade: ${animal.idade}</p>
            </div>
        `;
    });
}

mostrarOsAnimais();