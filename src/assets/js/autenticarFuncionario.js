const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true
});

var baseUrl = localStorage.getItem('baseUrl');

document.getElementById('btnLogin')
  .addEventListener('click', function () {

    let nm_usuario = document.getElementById('inputUsuario').value;
    let senha = document.getElementById('inputSenha').value;

    if (validarCampos('input')) {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Preencha todos os campos!'
      })

    } else {

      const options = { method: 'GET' };

      fetch(baseUrl + '/autenticar-funcionario/' + nm_usuario + '/' + senha, options)
        .then(response => response.json())
        .then(async response => {

          if (response.success == true) {

            await Toast.fire({
              icon: 'success',
              title: 'Bem vindo,',
              text: response.funcionario.nome + ' ' + response.funcionario.sobrenome + '!'
            })

            localStorage.setItem("nomeFuncionario", response.funcionario.nome + ' ' + response.funcionario.sobrenome);
            localStorage.setItem("token", response.token);

            window.location.href = '/src/pages/mapaGeral.html';

          } else {

            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Usuário ou senha incorretos!'
            })
          }

        })
        .catch(err => console.error(err));
    }
  });