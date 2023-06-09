// Função para iniciar a contagem regressiva
function iniciarContagemRegressiva(tempo, elementoTempo, baia, os, nome, telefone) {
  let intervalo = setInterval(async () => {

    if (tempo != 0) {

      tempo--;
      elementoTempo.innerText = formatarTempo(tempo);
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
            elementoTempo.innerText = formatarTempo(tempo);

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

                console.log(response)
                if (response.success == true) {

                  iniciarContagemRegressiva(tempo, elementoTempo, baia, os, nome, telefone);

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

// Função para formatar o tempo em horas:minutos:segundos
function formatarTempo(tempo) {

  // conversões
  const horas = Math.floor(tempo / (60 * 60));
  const divisorMinutos = tempo % (60 * 60);
  const minutos = Math.floor(divisorMinutos / 60);
  const segundos = tempo % 60;

  // formatação
  const hour = horas < 10 ? `0${horas}` : horas
  const minute = minutos < 10 ? `0${minutos}` : minutos
  const seconds = segundos < 10 ? `0${segundos}` : segundos

  return `${hour}:${minute}:${seconds.toString().padStart(2, '0')}`;

}