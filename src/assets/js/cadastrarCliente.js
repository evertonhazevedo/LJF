document.getElementById('btnSalvarCliVei')
  .addEventListener('click', async function () {

    let cpf = document.getElementById('iptCpfCli').value;
    let nome = document.getElementById('iptNomeCli').value;
    let sobrenome = document.getElementById('iptSobrenomeCli').value;
    let telefone = document.getElementById('iptTelefoneCli').value;
    let email = document.getElementById('iptEmailCli').value;

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
          cpf,
          nome,
          sobrenome,
          telefone,
          email

        })
      };

      fetch(baseUrl + '/cadastrar-cliente', options)
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
                text: 'Cliente já cadastrado'
              })
            } else {
              await Toast.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Erro ao cadastrar cliente' + response.message
              })
            }
          }

        })
        .catch(err => console.error(err));
    }
  });