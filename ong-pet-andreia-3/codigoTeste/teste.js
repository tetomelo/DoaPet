let livros = JSON.parse(localStorage.getItem("livros")) || [];

function cadastrarLivro(event) {
    event.preventDefault();

    let nomeLivro = document.getElementById("inputLivro").value;
    let autorLivro = document.getElementById("inputAutor").value;
    let generoLivro = document.getElementById("inputGenero").value;
    let paginasLivro = document.getElementById("inputPaginas").value;

    const novoLivro = {
        nome: nomeLivro,
        autor: autorLivro,
        genero: generoLivro,
        paginas: Number(paginasLivro)
    };

    livros.push(novoLivro);

    localStorage.setItem("livros", JSON.stringify(livros));

    limpaLivro();
    mostrarOsLivros();
}

function limpaLivro() {
    document.getElementById("inputLivro").value = "";
    document.getElementById("inputAutor").value = "";
    document.getElementById("inputGenero").value = "";
    document.getElementById("inputPaginas").value = "";

    document.getElementById("inputLivro").focus();
}

function mostrarOsLivros() {
    document.getElementById("listasLivros").innerHTML = "";

    livros.forEach(livro => {
        document.getElementById("listasLivros").innerHTML += `
            <div class="card">
                <h3>${livro.nome}</h3>
                <p>Autor: ${livro.autor}</p>
                <p>Gênero: ${livro.genero}</p>
                <p>Páginas: ${livro.paginas}</p>
            </div>
        `;
    });
}
function navegar() {
    window.location.href = "../Dashboard/menu.html";
}