//Mascara para CPF
function mascaraCpf(i) {

  var v = i.value;

  if (isNaN(v[v.length - 1])) { // impede entrar outro caractere que não seja número
    i.value = v.substring(0, v.length - 1);
    return;
  }

  i.setAttribute("maxlength", "14");
  if (v.length == 3 || v.length == 7) i.value += ".";
  if (v.length == 11) i.value += "-";

}

const handlePhone = (event) => {
  let input = event.target
  input.value = phoneMask(input.value)
}

const phoneMask = (value) => {
  if (!value) return ""
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d{2})(\d)/, "($1) $2");
  value = value.replace(/(\d)(\d{4})$/, "$1-$2");
  return value
}


// /*Função responsavel por recuperar os dados do cliente e os veiculos vinculados à ele na base 
// de acordo com o cpf informado para montar o campo placa, é chamada após pressionar a tecla enter*/
// document.getElementById('iptPesquisarCliente')
//   .addEventListener('keypress', function (evento) {

//     if (evento.key === 'Enter') {

//       var baseUrl = localStorage.getItem('baseUrl');

//       let cpfCompleto = document.getElementById('iptCpfCli').value;
//       let cpfSemPonto = cpfCompleto.replace('.', '');
//       let cnpfSemPonto1 = cpfSemPonto.replace('.', '');
//       let cpf = cnpfSemPonto1.replace('-', '');

//       const options = { method: 'GET' };

//       fetch(baseUrl + '/buscar-cliente-e-veiculo/' + cpf, options)
//         .then(response => response.json())
//         .then(response => {

//           if (response.success == true) {

//             preencherDadosVeiculo(response.cliente);

//             let selectPlaca = document.getElementById('selectPlaca');

//             selectPlaca.length = 0;

//             let optionPadrao = document.createElement('option');
//             optionPadrao.innerHTML = 'Escolha um veículo';
//             selectPlaca.appendChild(optionPadrao);

//             response.veiculo.forEach(element => {

//               let optionPlaca = document.createElement('option');
//               optionPlaca.innerHTML = element.placa;
//               optionPlaca.value = element.placa;
//               selectPlaca.appendChild(optionPlaca);

//             });

//           } else {

//             mostrarErro(response.codigo);

//           }

//         })
//         .catch(err => console.error(err));
//     }

// /*Função responsavel por recuperar os dados do cliente e os veiculos vinculados à ele na base 
// de acordo com o cpf informado para montar o campo placa, é chamada após pressionar a tecla enter*/
// document.getElementById('iptPesquisarCliente')
//   .addEventListener('keypress', function (evento) {

//     if (evento.key === 'Enter') {

//       var baseUrl = localStorage.getItem('baseUrl');

//       let cpfCompleto = document.getElementById('iptCpfCli').value;
//       let cpfSemPonto = cpfCompleto.replace('.', '');
//       let cnpfSemPonto1 = cpfSemPonto.replace('.', '');
//       let cpf = cnpfSemPonto1.replace('-', '');

//       const options = { method: 'GET' };

//       fetch(baseUrl + '/buscar-cliente-e-veiculo/' + cpf, options)
//         .then(response => response.json())
//         .then(response => {

//           if (response.success == true) {

//             preencherDadosVeiculo(response.cliente);

//             let selectPlaca = document.getElementById('selectPlaca');

//             selectPlaca.length = 0;

//             let optionPadrao = document.createElement('option');
//             optionPadrao.innerHTML = 'Escolha um veículo';
//             selectPlaca.appendChild(optionPadrao);

//             response.veiculo.forEach(element => {

//               let optionPlaca = document.createElement('option');
//               optionPlaca.innerHTML = element.placa;
//               optionPlaca.value = element.placa;
//               selectPlaca.appendChild(optionPlaca);

//             });

//           } else {

//             mostrarErro(response.codigo);

//           }

//         })
//         .catch(err => console.error(err));
//     }
  // });