document.getElementById('iptValorPago')
  .addEventListener('focusout', async function () {

    // Converter os valores para números
    let valorTotal = parseFloat(document.getElementById('iptValorTotal').value.replace(/[^\d.,]+/g, ''));
    let valorPago = parseFloat(document.getElementById('iptValorPago').value.replace(/[^\d.,]+/g, ''));

    // Calcular o troco
    let troco = valorPago - valorTotal;
console.log(troco)
    if (isNaN(troco)) {
      document.getElementById('iptTroco').value = 'R$ 0.00'
    }

    if (troco < 0 && !isNaN(troco)) {

      document.getElementById('iptTroco').value = 'R$ 0.00'

      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'O Valor não é suficiente para realizar o pagamento!'
      })


    } else {

      document.getElementById('iptTroco').value = formatarMoedaReal(troco).replace(",", ".");

    }

  })

// Função para formatar um número como moeda em Real
function formatarMoedaReal(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

document.getElementById('btnFinalizar')
  .addEventListener('click', async function () {

    let cd_ordem_servico = document.getElementById('spanOS').innerText;
    let forma_pagamento = 'dinheiro';
    let valor = document.getElementById('iptValorTotal').value.replace(/[^\d.]+/g, '');
    let vl_pago = document.getElementById('iptValorPago').value.replace(/[^\d.]+/g, '');
    let troco = document.getElementById('iptTroco').value.replace(/[^\d.]+/g, '');

    console.log(valor)
    console.log(vl_pago)
    console.log(troco)

    if (valor == null) {

      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'O Valor pago deve ser preenchido!'
      })

    } else {

      const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cd_ordem_servico,
          forma_pagamento,
          valor,
          vl_pago,
          troco
        })
      };

      fetch(baseUrl + '/realizar-pagamento', options)
        .then(response => response.json())
        .then(async response => {

          if (response.success = true) {

            await Swal.fire({
              icon: 'success',
              title: 'Pagamento realizado com sucesso!'
            })

            document.getElementById('iptValorPago').setAttribute('disabled', ' ');
            document.getElementById('btnFinalizar').setAttribute('disabled', ' ');
            document.getElementById('btnFinalizar').innerHTML = 'PAGA';

          }

        })
        .catch(err => console.error(err));

    }


  });