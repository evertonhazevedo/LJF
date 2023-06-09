async function cadastrarVeiculo() {

    let tipo = document.getElementById('iptTipo').value;
    let placa = document.getElementById('iptPlacaCli').value;
    let marca = document.getElementById('iptMarcaCli').value;
    let modelo = document.getElementById('iptModeloCli').value;
    let cd_cliente = localStorage.getItem('idClienteCadastrado');

    
    let nome = document.getElementById('iptNomeCli').value;
    console.log('nome: ' + nome)

    if (validarCampos('inputsVeiculo')) {

      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Preencha todos os campos!'
      })

    } else if (nome == '') {

      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Cadastre ou busque um cliente já cadastrado!'
      })

    } else {

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        
        tipo,
        placa,
        marca,
        modelo,
        cd_cliente

      })
    };

    fetch(baseUrl + '/cadastrar-veiculo', options)
      .then(response => response.json())
      .then(async response => {

        if (response.success == true) {

          let inputs = document.getElementsByClassName("inputsVeiculo");

          for (let i = 0; i < inputs.length; i++) {
            inputs[i].setAttribute('disabled', ' ');
          }

          let btnCadVeiculo = document.getElementById('btnCadastrarVei');
          btnCadVeiculo.setAttribute('disabled', ' ');

          await Swal.fire({
            icon: 'success',
            title: 'Veículo cadastrado com sucesso'
          })

          window.location.reload(true);

        } else {
          if (response.codigo == 01) {
            await Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Veículo já cadastrado'
            })
          } else {
            await Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Erro ao cadastrar veículo' + response.message
            })
          }
        }

      })
      .catch(err => console.error(err));
  }
  };