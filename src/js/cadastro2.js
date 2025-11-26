let usuarios = []

function cadastraSe(){
    let email = document.getElementById('email').value
    let senha = document.getElementById('senha').value
    
    const cadastro = {
        email: email,
        senha: senha
    }
    usuarios.push(cadastro)
    
    console.log(usuarios);

    // let ongDoaPet = JSON.stringify(cadastro)
    // localStorage.setItem("cadastro" , ongDoaPet)

    localStorage.setItem("usuarios" , JSON.stringify (usuarios))
    
    window.location.href = '/ong-doapet-manu/index.html'
}