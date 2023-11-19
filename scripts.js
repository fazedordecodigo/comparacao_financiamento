function calculate() {
    const formattingOptions = {
      style: 'currency',
      currency: 'BRL'
    };

    // Obter os valores inseridos no formulário
    const financingTotal = parseFloat(document.getElementById('financingTotal').value);
    const financingInstallments = parseInt(document.getElementById('financingInstallments').value);
    const financingInterestRate = parseFloat(document.getElementById('financingInterestRate').value);

    const consortiumTotal = parseFloat(document.getElementById('consortiumTotal').value);
    const consortiumInstallments = parseInt(document.getElementById('consortiumInstallments').value);
    const consortiumInterestRate = parseFloat(document.getElementById('consortiumInterestRate').value);

    // Calcular valores do financiamento
    const financingInterest = (financingTotal * (financingInterestRate / 100)) / 12;
    const financingTotalPayment = financingTotal + (financingInterest * financingInstallments);
    const financingMonthlyPayment = financingTotalPayment / financingInstallments;
    const totalFinancingInterest = financingTotalPayment - financingTotal;

    // Calcular valores do consórcio
    const consortiumTotalPayment = consortiumTotal * (1 + (consortiumInstallments * consortiumInterestRate / 100));
    const consortiumMonthlyPayment = consortiumTotalPayment / consortiumInstallments;
    const totalConsortiumInterest = consortiumTotalPayment - consortiumTotal

    // Exibir resultados na tela
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
      <h2>Resultados</h2>
      <h3>Financiamento Residencial</h3>
      <p>Total de Juros Pago: R$ ${totalFinancingInterest.toLocaleString('pt-BR', formattingOptions)}</p>
      <p>Valor Total Pago: R$ ${financingTotalPayment.toLocaleString('pt-BR', formattingOptions)}</p>
      <p>Valor por Parcela: R$ ${financingMonthlyPayment.toLocaleString('pt-BR', formattingOptions)}</p>
      <h3>Consórcio</h3>
      <p>Total de Juros Pago: R$ ${totalConsortiumInterest.toLocaleString('pt-BR', formattingOptions)}</p>
      <p>Valor Total Pago: R$ ${consortiumTotalPayment.toLocaleString('pt-BR', formattingOptions)}</p>
      <p>Valor por Parcela: R$ ${consortiumMonthlyPayment.toLocaleString('pt-BR', formattingOptions)}</p>
    `;

    // Comparar e exibir qual é mais vantajoso
    const comparisonDiv = document.getElementById('comparisonResult');
    if (financingTotalPayment < consortiumTotalPayment) {
      comparisonDiv.innerHTML = `O Financiamento Residencial é mais vantajoso.`;
      comparisonDiv.classList.add('highlight');
    } else if (financingTotalPayment > consortiumTotalPayment) {
      comparisonDiv.innerHTML = `O Consórcio é mais vantajoso.`;
      comparisonDiv.classList.add('highlight');
    } else {
      comparisonDiv.innerHTML = `Ambos têm o mesmo custo total.`;
    }
    comparisonDiv.classList.remove('highlight');
  }
  function clearFields() {
  // Limpar os campos do formulário
  const inputs = document.querySelectorAll('input[type="number"]');
  inputs.forEach(input => {
    input.value = '';
  });

  // Limpar os resultados
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  // Limpar a seção de comparação
  const comparisonDiv = document.getElementById('comparisonResult');
  comparisonDiv.innerHTML = '';
}
function validateFields() {
    const inputs = document.querySelectorAll('input[type="number"]');
    let isValid = true;
  
    inputs.forEach(input => {
      if (input.value === '' || isNaN(input.value)) {
        isValid = false;
        input.classList.add('invalid');
        showNotification('Todos os campos numéricos são obrigatórios.');
      } else {
        input.classList.remove('invalid');
      }
    });
  
    if (isValid) {
      calculate();
    }
  }
  
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
  
    document.body.appendChild(notification);
  
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
  
  document.getElementById('calculatorForm').addEventListener('submit', function(event) {
    event.preventDefault();
    validateFields();
  });