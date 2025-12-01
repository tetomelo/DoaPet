document.addEventListener('DOMContentLoaded', function () {
	// Ler dados do localStorage estoque
	let estoqueLS = JSON.parse(localStorage.getItem('estoque')) || [];

	// Normalizar animais do estoque localStorage (suporta nome/idade e name/age)
	const estoqueNormalizado = estoqueLS.map(item => ({
		name: item.name || item.nome || 'Sem nome',
		age: (item.age != null) ? item.age : (item.idade != null ? item.idade : '?'),
		outOfStock: true  // Todos com outOfStock: true
	}));

	// Remover duplicatas baseado no name
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

		card.appendChild(h);
		card.appendChild(p);
		nav.appendChild(card);
	});
});
