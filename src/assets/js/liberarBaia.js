//Função para fazer o checkout da baia
function liberarBaia() {

  var baseUrl = localStorage.getItem('baseUrl');
  var selectBaia = document.getElementById('selectBaia');
  var optionBaia = '';
  var optionBaiaSeparado = '';
  var cd_baia = '';
  var cd_ordem_servico = '';
  var nome = '';
  var whatsapp = '';

  if (selectBaia == null || selectBaia.options.length <= 0) {

      cd_ordem_servico = localStorage.getItem('osCheckout');
      cd_baia = localStorage.getItem('baiaCheckout');
      nome = localStorage.getItem('nomeClienteCheckout');
      whatsapp = localStorage.getItem('telefoneClienteCheckout').substring(0, 2) + localStorage.getItem('telefoneClienteCheckout').substring(3);

  } else {

    optionBaia = selectBaia.options[selectBaia.selectedIndex].value;
    optionBaiaSeparado = optionBaia.split(' ');
    cd_baia = optionBaiaSeparado[0];
    cd_ordem_servico = optionBaiaSeparado[1];
    nome = optionBaiaSeparado[2];
    whatsapp = optionBaiaSeparado[3].substring(0, 2) + optionBaiaSeparado[3].substring(3);

  }

  Swal.fire({
    icon: 'warning',
    title: 'Deseja realmente liberar a baia ' + cd_baia + '?',
    text: 'Esta ação não poderá ser desfeita.',
    showDenyButton: true,
    allowOutsideClick: false,
    confirmButtonText: 'Sim',
    denyButtonText: 'Não',
  }).then(async (result) => {


    if (result.isConfirmed) {

      const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cd_ordem_servico,
          cd_baia,
          nome,
          whatsapp
        })
      };

      fetch(baseUrl + '/liberar-baia', options)
        .then(response => response.json())
        .then(async response => {

          if (response.success) {

            if (response.primeiroFila != null) {

              await Swal.fire({
                icon: 'success',
                title: 'Baia ' + cd_baia + ' liberada com sucesso!',
                text: 'A OS ' + response.primeiroFila.cd_ordem_servico + ' foi automaticamente para a baia ' + cd_baia
              });

            } else {

              await Swal.fire({
                icon: 'success',
                title: 'Baia ' + cd_baia + ' liberada com sucesso!',
              });

            }

            if (localStorage.getItem('osCheckout')) {

              localStorage.removeItem('previsaoOS' + cd_ordem_servico);
              localStorage.removeItem('osCheckout');
              localStorage.removeItem('baiaCheckout');
              localStorage.removeItem('nomeClienteCheckout');
              localStorage.removeItem('telefoneClienteCheckout');

            }

            if(window.location.pathname == '/src/pages/mapaGeral.html'){
              window.location.reload(true);
            }

          } else {

            await Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Erro ao liberar a baia ' + cd_baia
            })

          }

        })
        .catch(err => console.error(err));

    }
  })

};
