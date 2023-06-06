document.getElementById('btnGerarOs')
  .addEventListener('click', async function () {

    // Dados para popular a tabela
    const servico = [];

    var baseUrl = localStorage.getItem('baseUrl');
    var checkbox = document.querySelectorAll('input:checked');
    var previsaoConvertida = '';

    let placa = document.getElementById("inputMarca").value;
    let nome = document.getElementById("inputNome").value;
    let previsao = document.getElementById('previsaoTotal').innerHTML;
    let arrayPrevisao = previsao.split(' ');
    let cliente = localStorage.getItem('cd_cliente');
    let veiculo = localStorage.getItem('cd_veiculo');
    let valor_total = document.getElementById('valorTotal').innerHTML

    //Convertendo a previsao para o padrão time: 00:00:00
    if (arrayPrevisao.length == 2) {

      let tempo = arrayPrevisao[0];
      let textoTempo = arrayPrevisao[1];

      if (textoTempo == 'Minutos') {

        if (tempo < 10) {
          previsaoConvertida = '00:0' + tempo + ':00';
        } else {
          previsaoConvertida = '00:' + tempo + ':00';
        }

      } else {

        previsaoConvertida = tempo + ':00:00';

      }

    } else {

      var tempoHora = arrayPrevisao[0];
      var tempoMinuto = arrayPrevisao[3];

      if (tempoMinuto < 10) {
        previsaoConvertida = tempoHora + ':0' + tempoMinuto + ':00';
      } else {
        previsaoConvertida = tempoHora + ':' + tempoMinuto + ':00';
      }

    }

    //Valida se alguma informação esta faltando para a ordem ser gerada
    if (nome == "") {

      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Você deve escolher um cliente!'
      })

    } else if (placa == "") {

      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Você deve escolher um veículo!'
      })

    } else if (checkbox.length <= 0) {

      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Você deve escolher pelo menos um serviço!'
      })

    } else {

      for (let i = 0; i < checkbox.length; i++) {

        servico[i] = checkbox[i].value;

      }

      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cliente,
          veiculo,
          servico,
          valor_total,
          previsaoConvertida
        })

      };

      fetch(baseUrl + '/gerar-os', options)
        .then(response => response.json())
        .then(async response => {

          if (response.success == true) {

            if (response.fila == true) {

              Swal.fire({
                icon: 'success',
                title: 'Ordem de Serviço gerada com sucesso!',
                html: 'Número da OS: ' + response.ordemServico.cd_ordem_servico + '<br><br>Posição na fila: '+ response.posicaoFila,
                showDenyButton: true,
                allowOutsideClick: false,
                confirmButtonText: 'Ok',
                denyButtonText: 'Ir para o mapa',
              }).then(async (result) => {

                if (result.isConfirmed) {
                  window.location.reload(true);
                } else {
                  window.location.href = '/src/pages/mapaGeral.html';
                }
              })

            } else {

              Swal.fire({
                icon: 'success',
                title: 'Ordem de Serviço gerada com sucesso!',
                html: 'Número da OS: ' + response.ordemServico.cd_ordem_servico + '<br><br>Baia: '+ response.baia, 
                showDenyButton: true,
                confirmButtonText: 'Ok',
                denyButtonText: 'Ir para o mapa',
              }).then(async (result) => {

                if (result.isConfirmed) {
                  window.location.reload(true);
                } else {
                  window.location.href = '/src/pages/mapaGeral.html';
                }
              })

            }

          } else {

            await Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Erro ao gerar OS'
            })

          }

        })
        .catch(err => console.error(err));
    }
  });