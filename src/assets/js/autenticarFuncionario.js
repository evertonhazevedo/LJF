document.getElementById('btnLogin')
  .addEventListener('click', function () {

    let nm_usuario = document.getElementById('inputUsuario').value;
    let senha = document.getElementById('inputSenha').value;
    let campoNmUsuario = document.getElementById('inputUsuario');
    let campoSenha = document.getElementById('inputSenha');
    let campo = document.getElementById('campo-erro');
    let erro = document.querySelector(".alert");

    // removendo o elemento da tela sempre que tentar submeter o formulário
    erro.classList.add("d-none");
    $('.is-invalid').removeClass('is-invalid');

    //Validando os campos do formulário de cadastro

    //valida o campo email
    if (campoNmUsuario.value == "") {
      erro.classList.remove("d-none");
      campo.innerHTML = "usuário" // nome do campo que não foi preenchido!
      campoNmUsuario.focus();
      campoNmUsuario.classList.add("is-invalid");

    }

    //valida o campo senha
    else if (campoSenha.value == "") {
      erro.classList.remove("d-none");
      campo.innerHTML = "senha" // nome do campo que não foi preenchido!
      campoSenha.focus();
      campoSenha.classList.add("is-invalid");

    } else {


      const options = { method: 'GET' };

      fetch('http://localhost:5500/autenticar-funcionario/' + nm_usuario + '/' + senha, options)
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