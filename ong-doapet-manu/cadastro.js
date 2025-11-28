let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

function cadastraSe() {
    // A função .trim() remove espaços em branco no início e no fim de uma string.
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();

    // Validar campos vazios
    if (!email || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    // Verificar se email já foi cadastrado
    const existe = usuarios.find(u => u.email === email);
    if (existe) {
        alert("Este email já está cadastrado!");
        return;
    }

    // Criar novo usuário
    const novoUsuario = { email, senha };
    usuarios.push(novoUsuario);

    // Salvar no localStorage
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Usuário cadastrado com sucesso!");
    window.location.href = '../ong-doapet-manu/index.html';
}
