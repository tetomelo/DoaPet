function entrar() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Buscar usuários no localStorage
    const usuariosStorage = localStorage.getItem("usuarios");

    if (!usuariosStorage) {
        alert("Nenhum usuário cadastrado!");
        return;
    }

    // Converter JSON para objeto/array
    const usuarios = JSON.parse(usuariosStorage);

    // Caso tenha armazenado UM único usuário como objeto
    if (!Array.isArray(usuarios)) {
        if (usuarios.email === email && usuarios.senha === senha) {
            alert("Usuário logado com sucesso!");
            window.location.href = "index.html";
        } else {
            alert("Email ou senha incorretos!");
        }
        return;
    }

    // Caso tenha armazenado VÁRIOS usuários como array
    const usuarioEncontrado = usuarios.find(
        (u) => u.email === email && u.senha === senha
    );

    if (usuarioEncontrado) {
        alert("Usuário logado com sucesso!");
        window.location.href = "../ong-pet-andreia/index.html";
    } else {
        alert("Email ou senha incorretos!");
    }
}

function abrirPaginaCadastro() {
    window.location.href = "cadastro.html";
}
