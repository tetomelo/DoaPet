let animais = JSON.parse(localStorage.getItem("animais")) || [];

function cadastrarAnimal(event) {
    event.preventDefault();

    const inputNome = document.getElementById("inputNome").value;
    const inputIdade = document.getElementById("inputIdade").value;
    if (!inputNome || !inputIdade) {
        alert("Por favor, preencha o formulário corretamente.");
        return;
    } else if(inputNome === Number()){

        alert("O nome do animal não pode ser um número.");
        return;
    } else {
        const novoAnimal = {
            nome: inputNome,
            idade: Number(inputIdade),
        };

        animais.push(novoAnimal);

        localStorage.setItem("animais", JSON.stringify(animais));
        alert(`o animal ${inputNome} foi cadastrado`)
        
    }
    window.location.href = "../bichinhosCadastrados/index.html";
}

function limparAnimal() {
    document.getElementById("inputNome").value = "";
    document.getElementById("inputIdade").value = "";

    document.getElementById("inputNome").focus();
}


