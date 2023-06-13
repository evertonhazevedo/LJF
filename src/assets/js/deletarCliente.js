async function deletarCliente() {

    await Swal.fire({
      icon: 'info',
      title: 'Deseja realmente excluir esse cliente?',
      text: 'Esta ação não poderá ser desfeita.',
      showDenyButton: true,
      allowOutsideClick: false,
      confirmButtonText: 'Sim',
      denyButtonText: 'Cancelar',

    }).then(async (result) => {

      if (await result.isConfirmed) {

        let cpfCompleto = document.getElementById('iptCpfCli').value;
        let cpfSemPonto = cpfCompleto.replace('.', '');
        let cnpfSemPonto1 = cpfSemPonto.replace('.', '');
        let cpf = cnpfSemPonto1.replace('-', '');

        const options = {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cpf
          })
        };

        fetch(baseUrl + '/deletar-cliente', options)
          .then(response => response.json())
          .then(async response => {

            if (response.success == true) {

              await Swal.fire({
                icon: 'success',
                title: 'Cliente excluído com sucesso'
              })

              window.location.reload(true);

            } else {
              
             await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Erro ao deletar cliente' + response.message
              })
            }
          }

          )
          .catch(err => console.error(err));
      }
    })
  };