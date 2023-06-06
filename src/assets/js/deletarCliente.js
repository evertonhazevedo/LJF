document.getElementById('btnExcluirCli')
  .addEventListener('click', function () {

    let cpf = document.getElementById('iptCpfCli').value;

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
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true
          })
          await Toast.fire({
            icon: 'success',
            title: 'Deletado com sucesso'
          })
          window.location.href = 'mapaGeral.html';

        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Erro ao deletar cliente' + response.message
          })
        }
      }

      )
      .catch(err => console.error(err));
  });