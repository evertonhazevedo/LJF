document.addEventListener('DOMContentLoaded', function () {

  const urlParams = new URLSearchParams(window.location.search);

  let ordemServico = urlParams.get('ordemServico');

  document.getElementById('numeroOS').innerText = ordemServico;

  const options = { method: 'GET' };

  fetch(baseUrl + '/buscar-dados-gerenciarOS/' + ordemServico, options)
    .then(response => response.json())
    .then(response => {

      if (response.success == true) {

        let nome = document.getElementById('inputNomeGerenciarOS');
        let sobrenome = document.getElementById('inputSobrenomeGerenciarOS');
        let email = document.getElementById('inputEmailGerenciarOS');
        let telefone = document.getElementById('inputTelefoneGerenciarOS');
        let valor_total = document.getElementById('valorTotalGerenciarOS');
        let marca = document.getElementById('inputMarcaGerenciarOS');
        let modelo = document.getElementById('inputModeloGerenciarOS');
        let botaoSalvarOS = document.getElementById('btnSalvarOS');
        const checkboxes = document.querySelectorAll('table input[type="checkbox"]');

        telefone.value = response.cliente.telefone;
        email.value = response.cliente.email;
        sobrenome.value = response.cliente.sobrenome;
        nome.value = response.cliente.nome;
        valor_total.innerHTML = response.ordemServico.valor_total;

        let campoPrevisaoTotal = document.getElementById('previsaoTotalGerenciarOS');
        let tempoTotal = 0;

        let array1 = response.ordemServico.previsao.split(':');

        let tempo_seg1 = (parseInt(array1[0]) * 3600) + (parseInt(array1[1]) * 60) + parseInt(array1[2]);

        tempoTotal = tempoTotal + parseInt(tempo_seg1);

        let hours = Math.floor(tempoTotal / (60 * 60));

        let divisorMinutos = tempoTotal % (60 * 60);

        let minutes = Math.floor(divisorMinutos / 60);

        if (hours < 1) {

          campoPrevisaoTotal.innerHTML = minutes + ' Minutos';

        } else if (hours == 1 && minutes == 0) {

          campoPrevisaoTotal.innerHTML = '0' + hours + ' Hora';

        } else if (hours == 1 && minutes > 0) {

          campoPrevisaoTotal.innerHTML = '0' + hours + ' Hora e ' + minutes + ' Minutos';

        } else if (hours > 1 && minutes > 0) {

          campoPrevisaoTotal.innerHTML = '0' + hours + ' Horas e ' + minutes + ' Minutos';

        } else {

          campoPrevisaoTotal.innerHTML = '0' + hours + ' Horas';

        }

        let selectPlaca = document.getElementById('selectPlacaGerenciarOS');

        selectPlaca.length = 0;

        response.veiculos.forEach(element => {

          if (element.placa == response.veiculoOS.placa) {

            let optionPlaca = document.createElement('option');
            optionPlaca.innerHTML = element.placa;
            optionPlaca.value = element.placa;
            optionPlaca.setAttribute('selected', '');
            selectPlaca.appendChild(optionPlaca);
            localStorage.setItem('cdVeiculoGerenciarOS', response.ordemServico.cd_veiculo)
            marca.value = response.veiculoOS.marca;
            modelo.value = response.veiculoOS.modelo;


          } else {

            let optionPlaca = document.createElement('option');
            optionPlaca.innerHTML = element.placa;
            optionPlaca.value = element.placa;
            selectPlaca.appendChild(optionPlaca);

          }

          checkboxes.forEach(checkbox => {
            const valueCheckbox = checkbox.value;

            if (response.servico.includes(valueCheckbox)) {
              checkbox.checked = true;
            }
          });

        });

        if (response.ordemServico.cd_pagamento != null) {

          telefone.setAttribute('disabled', '');
          email.setAttribute('disabled', '');
          sobrenome.setAttribute('disabled', '');
          nome.setAttribute('disabled', '');
          valor_total.setAttribute('disabled', '');
          selectPlaca.setAttribute('disabled', '');
          marca.setAttribute('disabled', '');
          modelo.setAttribute('disabled', '');
          botaoSalvarOS.setAttribute('disabled', '');
          botaoSalvarOS.innerHTML = 'PAGA';

          checkboxes.forEach(checkbox => {
            checkbox.disabled = true;
          });
          
        }
      }
    })
    .catch(err => console.error(err));

});