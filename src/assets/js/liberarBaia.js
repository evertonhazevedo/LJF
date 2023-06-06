//Função para fazer o checkout da baia
document.getElementById('btnLiberar')
  .addEventListener('click', function liberarBaia() {

    let selectBaia = document.getElementById('selectBaia');
    let optionBaia = selectBaia.options[selectBaia.selectedIndex].value;
    let optionBaiaSeparado = optionBaia.split(' ');
    let cd_baia = optionBaiaSeparado[0];
    let cd_ordem_servico = optionBaiaSeparado[1];

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

        var baseUrl = localStorage.getItem('baseUrl');

        const options = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cd_ordem_servico,
            cd_baia
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

              window.location.reload(true);

            } else {

              await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Erro ao liberar a baia ' + cd_baia
              })

            }

          })
          .catch(err => console.error(err));

      } else {
        window.location.reload(true);
      }
    })

  });
