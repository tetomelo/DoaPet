let animais = JSON.parse(localStorage.getItem("animais")) || [];

function cadastrarAnimal(event) {
    event.preventDefault();

    let nomeAnimal = document.getElementById("inputNome").value;
    let idade = document.getElementById("inputIdade").value;
    

    const novoAnimal = {
        nome: nomeAnimal,
        idade: Number(idade),
    };

    animais.push(novoAnimal);

    localStorage.setItem("animais", JSON.stringify(animais));
    alert(`o animal ${nomeAnimal} foi cadastrado`)
   window.location.href = "../bichinhosCadastrados/index.html"
}

function limparAnimal() {
    document.getElementById("inputNome").value = "";
    document.getElementById("inputIdade").value = "";

    document.getElementById("inputNome").focus();
}


