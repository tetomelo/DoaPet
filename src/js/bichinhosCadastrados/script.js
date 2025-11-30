let animaisPrincipais = [
    { nome: 'Bella', idade: 3, outOfStock: false },
    { nome: 'Rex', idade: 4, outOfStock: false },
    { nome: 'Mimi', idade: 1, outOfStock: false },
    { nome: 'pipoca', idade: 3, outOfStock: false }
];

// Remoções persistidas de animaisPrincipais
let estoque = JSON.parse(localStorage.getItem('estoque')) || [];

let animaisDoLocalStorage = JSON.parse(localStorage.getItem("animais")) || [];

// Combinar animaisPrincipais (filtrando removidos) com animais do localStorage
let animais = [...animaisPrincipais.filter(a => !estoque.includes(a.nome)), ...animaisDoLocalStorage];

function mostrarOsAnimais() {
    const lista = document.getElementById("listaAnimais");
    lista.innerHTML = "";

    animais.forEach(animal => {
        lista.innerHTML += `
            <div class="card">
                <h3>Nome: ${animal.nome}</h3>
                <p>Idade: ${animal.idade}</p>
                <button class="adotarBtn" onclick="adotarAnimal('${animal.nome}')">Adotar</button>
            </div>
        `;
    });
}

function adotarAnimal(nome) {
    // 1) tenta remover do localStorage 'animais'
    let lsAnimais = JSON.parse(localStorage.getItem('animais')) || [];
    const idxLS = lsAnimais.findIndex(a => a.nome === nome);
    let removido = null;

    if (idxLS !== -1) {
        // encontrado em localStorage -> remove e usa este objeto
        [removido] = lsAnimais.splice(idxLS, 1);
        localStorage.setItem('animais', JSON.stringify(lsAnimais));
        animaisDoLocalStorage = lsAnimais;
    } else {
        // 2) se não estiver em 'animais', verificar se é um dos animaisPrincipais exibidos
        const idxPrincipais = animaisPrincipais.findIndex(a => a.nome === nome);
        if (idxPrincipais !== -1 && !estoque.includes(nome)) {
            // marcar como removido dos principais para não reaparecer
            estoque.push(nome);
            localStorage.setItem('estoque', JSON.stringify(estoque));
            const found = animaisPrincipais[idxPrincipais];
            removido = { nome: found.nome, idade: found.idade };
        }
    }

    if (!removido) {
        console.log(`Animal ${nome} não encontrado em 'animais' nem em 'animaisPrincipais'.`);
        return;
    }

    // Atualizar array combinado em memória (filtra principais removidos)
    animais = [...animaisPrincipais.filter(a => !estoque.includes(a.nome)), ...animaisDoLocalStorage];

    // Adicionar apenas o animal removido ao estoque (formato { nome, idade, outOfStock:false })
    let estoqueAtualizado = JSON.parse(localStorage.getItem('estoque')) || [];
    estoqueAtualizado.push({ nome: removido.nome, idade: removido.idade, outOfStock: false });
    localStorage.setItem('estoque', JSON.stringify(estoqueAtualizado));

    // Re-renderizar a lista na página
    mostrarOsAnimais();
}

// render inicial
mostrarOsAnimais();