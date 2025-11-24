function entrar(){
    // let nome = prompt("email:")
    // let senha = prompt("Senha:")

    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value

    // if(nome == "admin" && senha == "admin"){
    //     window.location.href = 'index.html'
    // }

    if(email === "admin" && senha === "admin"){
        window.location.href = '"/ong-pet-andreia/index.html"' 
    }else if(!email && !senha) {
        alert("preencha os campos")
    } else {
        alert(`Email ${email} não identificado`)
    }
}