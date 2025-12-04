document.addEventListener('DOMContentLoaded', function () { //addEventListener:ele executa uma função quando um evento acontece.
	carregarGraficoPizza();
});

function carregarGraficoPizza() {
	// Ler dados do localStorage
	const animais = JSON.parse(localStorage.getItem('animais')) || [];
	const estoque = JSON.parse(localStorage.getItem('estoque')) || [];

	// Contar quantidade de animais
	const qtdAnimaisCadastrados = animais.length;
	const qtdAnimaisEstoque = estoque.length;
	const totalAnimais = qtdAnimaisCadastrados + qtdAnimaisEstoque;

	// Calcular percentuais
	const percAnimaisCadastrados = totalAnimais > 0 
		? ((qtdAnimaisCadastrados / totalAnimais) * 100).toFixed(1) //quantas casas decimais um número vai ter
		: 0;
	const percAnimaisEstoque = totalAnimais > 0 
		? ((qtdAnimaisEstoque / totalAnimais) * 100).toFixed(1) 
		: 0;

	// Configurar canvas
	const ctx = document.getElementById('chartPizza');
	if (!ctx) {
		console.error('Canvas não encontrado');
		return;
	}

	// Criar o gráfico de pizza
	const chart = new Chart(ctx, { //ele é usado para criar gráficos
		type: 'pie',
		data: {
			labels: [
				`Animais Cadastrados (${qtdAnimaisCadastrados})`,
				`Animais em Estoque (${qtdAnimaisEstoque})`
			],
			datasets: [{
				label: 'Quantidade',
				data: [qtdAnimaisCadastrados, qtdAnimaisEstoque],
				backgroundColor: [
					'rgba(0, 128, 0, 0.8)',      // Verde para animais cadastrados
					'rgba(255, 99, 71, 0.8)'     // Vermelho/laranja para estoque
				],
				borderColor: [
					'rgba(0, 128, 0, 1)',
					'rgba(255, 99, 71, 1)'
				],
				borderWidth: 2
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: true,
			plugins: {
				legend: {
					position: 'bottom',
					labels: {
						padding: 20,
						font: {
							size: 14,
							family: "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif"
						}
					}
				},
				tooltip: {
					callbacks: {
						label: function(context) {
							const label = context.label || '';
							const value = context.parsed || 0;
							const percentage = totalAnimais > 0 
								? ((value / totalAnimais) * 100).toFixed(1) 
								: 0;
							return `${label}: ${percentage}%`;
						}
					}
				}
			}
		}
	});

	// Adicionar informações textuais abaixo do gráfico
	const legendaInfo = document.getElementById('legendaInfo');
	if (legendaInfo) {
		legendaInfo.innerHTML = `
			<div class="info-stats">
				<div class="stat-item">
					<span class="stat-label">Total de Animais:</span>
					<span class="stat-value">${totalAnimais}</span>
				</div>
				<div class="stat-item stat-cadastrados">
					<span class="stat-label">Animais Cadastrados:</span>
					<span class="stat-value">${qtdAnimaisCadastrados} (${percAnimaisCadastrados}%)</span>
				</div>
				<div class="stat-item stat-estoque">
					<span class="stat-label">Animais em Estoque:</span>
					<span class="stat-value">${qtdAnimaisEstoque} (${percAnimaisEstoque}%)</span>
				</div>
			</div>
		`;
	}

	// Se não houver dados, exibir mensagem
	if (totalAnimais === 0) {
		const aviso = document.createElement('p');
		aviso.className = 'aviso-sem-dados';
		aviso.textContent = 'Nenhum animal cadastrado ainda. Cadastre animais para visualizar as estatísticas.';
		legendaInfo.insertBefore(aviso, legendaInfo.firstChild);
	}
}

