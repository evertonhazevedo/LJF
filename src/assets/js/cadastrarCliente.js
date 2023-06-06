document.getElementById('btnSalvarCliVei')
  .addEventListener('click', async function () {

    let cpfCompleto = document.getElementById('iptCpfCli').value;
    let cpfSemPonto = cpfCompleto.replace('.', '');
    let cnpfSemPonto1 = cpfSemPonto.replace('.', '');
    let cpf = cnpfSemPonto1.replace('-', '');

    let nome = document.getElementById('iptNomeCli').value;
    let sobrenome = document.getElementById('iptSobrenomeCli').value;
    let telefone = document.getElementById('iptTelefoneCli').value;
    let email = document.getElementById('iptEmailCli').value;

    if (validarCampos('inputsCliente')) {

      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Preencha todos os campos!'
      })

    } else if (!validarEmail(email)) {

      let inputEmail = document.getElementById('iptEmailCli');

      inputEmail.classList.add('is-invalid');

      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Informe um Email válido!'
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

          if (response.success == true) {

            localStorage.setItem('idClienteCadastrado', response.cliente.cd_cliente)

            let inputs = document.getElementsByClassName("inputsVeiculo");

            for (let i = 0; i < inputs.length; i++) {
              inputs[i].removeAttribute("disabled");
            }

            let btnCadVeiculo = document.getElementById('btnCadastrarVei');
            btnCadVeiculo.removeAttribute('disabled');
          
            
            await Swal.fire({
              icon: 'success',
              title: 'Cliente cadastrado com sucesso',
              text: 'Cadastre pelo menos um veículo'
            })

          } else {
            if (response.codigo == 01) {
              await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Cliente já cadastrado'
              })
            } else {
              await Swal.fire({
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