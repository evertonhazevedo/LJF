//Função responsavel por preencher os inputs com os dados do cliente na tela de Gerar OS
function preencherDadosVeiculo(cliente) {

  document.getElementById('inputNome').value = cliente.nome;
  document.getElementById('inputSobrenome').value = cliente.sobrenome;
  document.getElementById('inputEmail').value = cliente.email;
  document.getElementById('inputTelefone').value = cliente.telefone;
  document.getElementById('inputPesquisar').value = '';

  localStorage.setItem('cd_cliente', cliente.cd_cliente);
}

//Função responsavel por mostrar o erro ocorrido
async function mostrarErro(codigoErro) {

  if (codigoErro == 1) {

    await Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Cliente não cadastrado!'
    });

  } else {

    await Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Não foi possível recuperar os veículos!'
    });

  }

}

/*Função responsavel por recuperar os dados do cliente e os veiculos vinculados à ele na base 
de acordo com o cpf informado para montar o campo placa, é chamada após pressionar a tecla enter*/

document.getElementById('inputPesquisar')
  .addEventListener('keypress', function (evento) {

    var baseUrl = localStorage.getItem('baseUrl');

    if (evento.key === 'Enter') {

      const cpfCompleto = document.getElementById('inputPesquisar').value;

      let cpfSemPonto = cpfCompleto.replace('.', '');
      let cnpfSemPonto1 = cpfSemPonto.replace('.', '');
      let cpf = cnpfSemPonto1.replace('-', '');

      const options = { method: 'GET' };

      fetch(baseUrl + '/buscar-cliente-e-veiculo/' + cpf, options)
        .then(response => response.json())
        .then(response => {

          if (response.success == true) {

            preencherDadosVeiculo(response.cliente);

            let selectPlaca = document.getElementById('selectPlaca');

            selectPlaca.length = 0;

            let optionPadrao = document.createElement('option');
            optionPadrao.innerHTML = 'Escolha um veículo';
            selectPlaca.appendChild(optionPadrao);

            response.veiculo.forEach(element => {

              let optionPlaca = document.createElement('option');
              optionPlaca.innerHTML = element.placa;
              optionPlaca.value = element.placa;
              selectPlaca.appendChild(optionPlaca);

            });

          } else {

            mostrarErro(response.codigo);

          }

        })
        .catch(err => console.error(err));
    }
  });

