function entrar(){
    let nome = prompt("email:")
    let senha = prompt("Senha:")

    if(nome == "admin" && senha == "admin"){
        window.location.href = 'index.html'
    }
}