async function deletarVeiculo() {

  await Swal.fire({
    icon: 'info',
    title: 'Deseja realmente excluir o veículo?',
    text: 'Esta ação não poderá ser desfeita.',
    showDenyButton: true,
    allowOutsideClick: false,
    confirmButtonText: 'Sim',
    denyButtonText: 'Cancelar',

  }).then(async (result) => {

    if (await result.isConfirmed) {

      let placa = document.getElementById('iptPlacaVeiCad').value;

      const options = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          placa
        })
      };

      fetch(baseUrl + '/deletar-veiculo', options)
        .then(response => response.json())
        .then(async response => {

          if (response.success == true) {

            await Swal.fire({
              icon: 'success',
              title: 'Deletado com sucesso'
            })
            window.location.reload(true);

          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Erro ao deletar veículo' + response.message
            })
          }
        }

        )
        .catch(err => console.error(err));
    }
  })
};