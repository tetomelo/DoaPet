function cadastrarAnimal() {
    document.getElementById("listasLivros").innerHTML = "";

    livros.forEach(livro => {
        document.getElementById("listasLivros").innerHTML += `
            <div class="card">
                <h3>${livro.nome}</h3>
                <p>Autor: ${livro.autor}</p>
              
            </div>
        `;
    });
}