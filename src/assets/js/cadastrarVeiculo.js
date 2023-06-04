document.getElementById('btnCadastrarVei')
  .addEventListener('click', async function () {

    let placa = document.getElementById('iptPlacaCli').value;
    let marca = document.getElementById('iptMarcaCli').value;
    let modelo = document.getElementById('iptModeloCli').value;

    if (validarCampos('input')) {

      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Preencha todos os campos!'
      })

    } else {

      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          placa,
          marca,
          modelo

        })
      };

      fetch(baseUrl + '/cadastrar-veiculo', options)
        .then(response => response.json())
        .then(async response => {
          console.log(response);
          if (response.success == true) {

            await Toast.fire({
              icon: 'success',
              title: 'Cadastrado com sucesso'
            })
            window.location.href = 'mapaGeral.html';

          } else {
            if (response.codigo == 01) {
              await Toast.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Veículo já cadastrado'
              })
            } else {
              await Toast.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Erro ao cadastrar veículo' + response.message
              })
            }
          }

        })
        .catch(err => console.error(err));
    }
  });