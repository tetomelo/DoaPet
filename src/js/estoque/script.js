document.addEventListener('DOMContentLoaded', function () {
	carregarAnimais();
});

function carregarAnimais() {
	// Ler dados do localStorage estoque
	let estoqueLS = JSON.parse(localStorage.getItem('estoque')) || [];

	// Normalizar animais do estoque localStorage (suporta nome/idade e name/age)
	const estoqueNormalizado = estoqueLS.map((item, index) => ({
		name: item.name || item.nome || 'Sem nome',
		age: (item.age != null) ? item.age : (item.idade != null ? item.idade : '?'),
		outOfStock: true,  // Todos com outOfStock: true
		index: index  // Guardar índice original para remoção
	}));

	// Remover duplicatas baseado no name (mantém o primeiro)
	const nomesSeen = new Set();
	const estoqueSemDuplicatas = estoqueNormalizado.filter(animal => {
		if (nomesSeen.has(animal.name)) {
			return false; // descarta duplicata
		}
		nomesSeen.add(animal.name);
		return true; // mantém
	});

	const nav = document.querySelector('nav');
	if (!nav) return;
	nav.innerHTML = '';

	if (estoqueSemDuplicatas.length === 0) {
		const msg = document.createElement('p');
		msg.textContent = 'Nenhum animal no estoque.';
		nav.appendChild(msg);
		return;
	}

	// Exibir todos os animais do estoque (sem duplicatas)
	estoqueSemDuplicatas.forEach(function (animal) {
		const card = document.createElement('div');
		card.className = 'card' + (animal.outOfStock ? ' out-of-stock' : '');

		const h = document.createElement('h1');
		h.textContent = animal.name;

		const p = document.createElement('p');
		p.textContent = animal.age + ' anos';

		// Criar botão de remover
		const btnRemover = document.createElement('button');
		btnRemover.className = 'btn-remove';
		btnRemover.textContent = 'Remover';
		btnRemover.onclick = function() {
			removerAnimal(animal.name);
		};

		card.appendChild(h);
		card.appendChild(p);
		card.appendChild(btnRemover);
		nav.appendChild(card);
	});
}

function removerAnimal(nomeAnimal) {
	// Confirmar remoção
	if (!confirm(`Tem certeza que deseja remover ${nomeAnimal} do estoque?`)) {
		return;
	}

	// Ler estoque atual
	let estoqueLS = JSON.parse(localStorage.getItem('estoque')) || [];
	
	// Filtrar removendo o animal pelo nome (remove todas as ocorrências com esse nome)
	const estoqueAtualizado = estoqueLS.filter(animal => {
		const nome = animal.name || animal.nome || '';
		return nome !== nomeAnimal;
	});

	// Salvar de volta no localStorage
	localStorage.setItem('estoque', JSON.stringify(estoqueAtualizado));

	// Recarregar a exibição
	carregarAnimais();

	// Feedback visual
	console.log(`Animal "${nomeAnimal}" removido com sucesso!`);
}
