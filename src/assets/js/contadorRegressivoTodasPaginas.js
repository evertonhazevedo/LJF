
document.addEventListener('DOMContentLoaded', function () {

  var baseUrl = localStorage.getItem('baseUrl');
  let tempo = '';
  let previsao = '';
  let idPRevisao = ''

  const options = { method: 'GET' };

  fetch(baseUrl + '/recuperar-baias-os', options)
    .then(response => response.json())
    .then(async response => {

      if (response.success == true) {

        for (let i = 0; i < response.ordemServico.length; i++) {

          if (localStorage.getItem('previsaoOS' + response.ordemServico[i].cd_ordem_servico)) {

            previsao = localStorage.getItem('previsaoOS' + response.ordemServico[i].cd_ordem_servico);

          } else {

            previsao = response.ordemServico[i].previsao;

          }

          arrayPrevisao = previsao.split(':');
          tempo = (parseInt(arrayPrevisao[0]) * 3600) + (parseInt(arrayPrevisao[1]) * 60) + parseInt(arrayPrevisao[2]);

          timer(tempo, response.ordemServico[i].cd_baia, response.ordemServico[i].cd_ordem_servico, response.ordemServico[i].nome, response.ordemServico[i].telefone);

        }
      }
    })
    .catch(err => console.error(err));
});

// Função para iniciar a contagem regressiva
function timer(tempo, baia, os, nome, telefone) {
  let intervalo = setInterval(async () => {

    if (tempo != 0) {

      tempo--;
      localStorage.setItem('previsaoOS' + os, formatarTempo(tempo));

    } else {

      clearInterval(intervalo);

      var audio = new Audio('/src/assets/audio/buzina.mp3');

      setTimeout(async function () {

        audio.play();

        await Swal.fire({
          icon: 'info',
          title: 'Tempo da baia ' + baia + ' esgotado!',
          html: 'Deseja fazer o checkout?',
          showDenyButton: true,
          allowOutsideClick: false,
          confirmButtonText: 'Checkout',
          denyButtonText: 'Adicionar mais 30 minutos',
        }).then(async (result) => {

          if (await result.isConfirmed) {

            localStorage.setItem('previsaoOS' + os, formatarTempo(tempo));
            localStorage.setItem('osCheckout', os);
            localStorage.setItem('baiaCheckout', baia);
            localStorage.setItem('nomeClienteCheckout', nome);
            localStorage.setItem('telefoneClienteCheckout', telefone);

            liberarBaia();

          } else {

            let novaPrevisao = '00:30:00'

            tempo = 1800;

            let whatsapp = telefone.substring(0, 2) + telefone.substring(3);

            const options = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                os,
                novaPrevisao,
                nome,
                whatsapp
              })
            };

            fetch(baseUrl + '/enviar-mensagem-atraso', options)
              .then(response => response.json())
              .then(async response => {

                if (response.success == true) {

                  timer(tempo, baia, os, nome, telefone);

                  await Swal.fire({
                    icon: 'success',
                    title: 'Tempo adicionado com sucesso!',
                    text: 'A nova previsão foi enviada ao cliente'
                  });

                } else {

                  await Swal.fire({
                    icon: 'info',
                    title: 'Tempo adicionado!',
                    text: 'O tempo foi adicionado, mas ocorreu um erro ao enviar a nova previsão para o cliente'
                  });

                }

                if(window.location.pathname == '/src/pages/mapaGeral.html'){
                  window.location.reload(true);
                }

              })
              .catch(err => console.error(err));

          }
        })
      }, 1000); //Atulizar a buzina a cada segundo

    }
  }, 1000); // Atualizar a cada segundo o timer
}