document.getElementById('btnGerarOs')
  .addEventListener('click', async function () {

    // Dados para popular a tabela
    const servico = [];


    var baseUrl = localStorage.getItem('baseUrl');
    var checkbox = document.querySelectorAll('input:checked');
    var placa = document.getElementById("inputMarca").value;
    var nome = document.getElementById("inputNome").value;
    var previsao = document.getElementById('previsaoTotal').innerHTML;


    for (let i = 0; i < checkbox.length; i++) {

      console.log('Previsao: ' + checkbox[i]);
      
    }



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

      let cliente = localStorage.getItem('cd_cliente');
      let veiculo = localStorage.getItem('cd_veiculo');

      for (let i = 0; i < checkbox.length; i++) {

        servico[i] = checkbox[i].value;

      }

      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          servico
        })

      };

      fetch(baseUrl + '/gerar-os/' + cliente + '/' + veiculo, options)
        .then(response => response.json())
        .then(async response => {

          if (response.success == true) {

            Swal.fire({
              icon: 'success',
              title: 'Ordem de Serviço gerada com sucesso!',
              text: 'Número da OS: ' + response.ordemServico.cd_ordem_servico,
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