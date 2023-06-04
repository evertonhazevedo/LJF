var baseUrl = localStorage.getItem('baseUrl');

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true
})

document.getElementById('btnCadastrar')
  .addEventListener('click', async function () {

    let nome = document.getElementById('inputNome').value;
    let sobrenome = document.getElementById('inputSobrenome').value;
    let cpf = document.getElementById('inputCpf').value;
    let email = document.getElementById('inputEmail').value;
    let nm_usuario = document.getElementById('inputUsuario').value;
    let senha = document.getElementById('inputSenha').value;

    if (validarCampos('input')) {

      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Preencha todos os campos!'
      })

    } else if (!validarEmail(email)) {

      let inputEmail = document.getElementById('inputEmail');

      inputEmail.classList.add('is-invalid');

      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Informe um Email válido!'
      })

    }else {

      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          sobrenome,
          cpf,
          email,
          nm_usuario,
          senha
        })
      };

      fetch(baseUrl + '/cadastrar-funcionario', options)
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
                text: 'Funcionário já cadastrado'
              })
            } else {
              await Toast.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Erro ao cadastrar funcionário' + response.message
              })
            }
          }

        })
        .catch(err => console.error(err));
    }
  });

function validarEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}
