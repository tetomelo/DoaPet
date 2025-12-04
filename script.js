function entrar() {
    //getElement: ele pega o elemento que tem dentro do id; 
    // value:pega o que o usuário digitou dentro do input.
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value; 

    // Buscar usuários no localStorage
    const usuariosStorage = localStorage.getItem("usuarios");

    if (!usuariosStorage) {
        alert("Nenhum usuário cadastrado!");
        return; //não executar mais a função naquele momento
    }

    // Converter JSON para objeto/array
    const usuarios = JSON.parse(usuariosStorage);

    // Caso tenha armazenado UM único usuário como objeto
    if (!Array.isArray(usuarios)) { //Verifica se usuarios é um único usuário, não uma lista
        if (usuarios.email === email && usuarios.senha === senha) { //Compara o email e senha salvo com o digitado
            alert("Usuário logado com sucesso!");
            window.location.href = "src/pages/home/index.html";
        } else {
            alert("Email ou senha incorretos!");
        }
        return;
    }

    // Caso tenha armazenado VÁRIOS usuários como array
    const usuarioEncontrado = usuarios.find( //find: Procura dentro do array
        (u) => u.email === email && u.senha === senha //verifica email e senha
    );

    if (usuarioEncontrado) {
        alert("Usuário logado com sucesso!");
        window.location.href = "src/pages/home/index.html";
    } else {
        alert("Email ou senha incorretos!");
    }
}

function abrirPaginaCadastro() {
    window.location.href = "src/pages/cadastro/index.html";
}
