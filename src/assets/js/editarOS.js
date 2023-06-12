document.getElementById('btnSalvarOS')
  .addEventListener('click', async function () {

    const servico = [];

    var checkbox = document.querySelectorAll('input:checked');
    var previsaoConvertida = '';

    const urlParams = new URLSearchParams(window.location.search);
    let cd_ordem_servico = urlParams.get('ordemServico');
    let veiculo = localStorage.getItem('cdVeiculoGerenciarOS');
    let valor_total = document.getElementById('valorTotalGerenciarOS').innerHTML;
    let previsao = document.getElementById('previsaoTotalGerenciarOS').innerHTML;
    let arrayPrevisao = previsao.split(' ');

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

    if (checkbox.length <= 0) {

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
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          cd_ordem_servico,
          veiculo,
          servico,
          valor_total,
          previsaoConvertida
        })

      };

      fetch(baseUrl + '/editar-os', options)
        .then(response => response.json())
        .then(async response => {

          console.log(response)

          if(response.success == true){

            await Swal.fire({
              icon: 'success',
              title: 'OS ' + cd_ordem_servico + ' Editada com sucesso!'
            })
          }else{

            await Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Erro ao salvar os!'
            })      

          }
        })
        .catch(err => console.error(err));

    }
  })