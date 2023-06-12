//Função responsavel por preencher os inputs com os dados do cliente na tela de Gerar OS
function preencherDadosCliente(cliente) {

  document.getElementById('iptNomeCli').value = cliente.nome;
  document.getElementById('iptSobrenomeCli').value = cliente.sobrenome;
  document.getElementById('iptEmailCli').value = cliente.email;
  document.getElementById('iptCpfCli').value = cliente.cpf;
  document.getElementById('iptTelefoneCli').value = cliente.telefone;
  document.getElementById('iptPesquisarCliente').value = '';

  document.getElementById('iptCpfCli').setAttribute('disabled', ' ');


  localStorage.setItem('idClienteCadastrado', cliente.cd_cliente);
}

//Função responsavel por mostrar o erro ocorrido
async function mostrarErro(codigoErro) {

  if (codigoErro == 1) {

    
    await Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Cliente não cadastrado!',
      showDenyButton: true,
      allowOutsideClick: false,
      confirmButtonText: 'Cadastrar',
      denyButtonText: 'Fechar',
    }).then(async (result) => {

      if (await result.isConfirmed) {
        document.getElementById('iptCpfCli').removeAttribute('disabled');
      }

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
function buscarClienteCadastrado(evento, valorMascara) {

  let tabela = document.getElementById("tblVeiculosCli");

  var baseUrl = localStorage.getItem('baseUrl');

  if (valorMascara != null) {

    var v = valorMascara.value;

    if (isNaN(v[v.length - 1])) { // impede entrar outro caractere que não seja número
      valorMascara.value = v.substring(0, v.length - 1);
      return;
    }

    valorMascara.setAttribute("maxlength", "14");
    if (v.length == 3 || v.length == 7) valorMascara.value += ".";
    if (v.length == 11) valorMascara.value += "-";

  }

  if (evento.key === 'Enter') {

    tabela.innerHTML = '';

    let cpfCompleto = document.getElementById('iptPesquisarCliente').value;
    let cpfSemPonto = cpfCompleto.replace('.', '');
    let cnpfSemPonto1 = cpfSemPonto.replace('.', '');
    let cpf = cnpfSemPonto1.replace('-', '');

    const options = { method: 'GET' };

    fetch(baseUrl + '/buscar-cliente-e-veiculo/' + cpf, options)
      .then(response => response.json())
      .then(response => {

        if (response.success == true) {

          preencherDadosCliente(response.cliente);

          let inputs = document.getElementsByClassName("inputsVeiculo");

          for (let i = 0; i < inputs.length; i++) {
            inputs[i].removeAttribute("disabled");
          }

          document.getElementById('btnCadastrarVei').removeAttribute('disabled');


          // Dados para popular a tabela
          const veiculos = [];

          // Percorrendo o objeto response.veiculo e atribuindo um array dentro do array veiculos
          for (let i = 0; i < response.veiculo.length; i++) {

            veiculos[i] = [response.veiculo[i].cd_veiculo, response.veiculo[i].tipo, response.veiculo[i].placa, response.veiculo[i].marca, response.veiculo[i].modelo]
          }

          // Função para criar uma Tag Ex: <tr>, <td>
          function criarTag(elemento) {
            return document.createElement(elemento);
          }

          // Criando a tabela
          // let tabela = document.getElementById("tblVeiculosCli");
          let thead = criarTag("thead");
          let tbody = criarTag("tbody");

          let indicesTabela = ["ID", "Tipo", "Placa", "Marca", "Modelo", "Ação"];
          let linhaHead = criarTag("tr");

          // Função para criar uma celula Ex <th> + o texto
          function criarCelula(tag, text) {
            tag = criarTag(tag);
            tag.textContent = text;
            return tag;
          }

          // Percorrendo o indice das tabelas e atribuindo a tag <thead>
          for (let j = 0; j < indicesTabela.length; j++) {
            let th = criarCelula("th", indicesTabela[j]);
            th.setAttribute('scope', 'col');
            linhaHead.appendChild(th);
          }

          thead.appendChild(linhaHead);

          // Percorrendo os dados e atribuindo as colunas e adicionando em cada linha
          for (let j = 0, linhaBody = ''; j < veiculos.length; j++) {

            linhaBody = criarTag("tr");

            let botaoAcao = document.createElement('button');
            botaoAcao.type = 'button';
            botaoAcao.className = 'btn btn_editar_veiculo';
            botaoAcao.setAttribute('onclick', "abrirMdlEditarVeiculo(" + "'" + veiculos[j][0] + "'," + "'" + veiculos[j][1] + "'," + "'" + veiculos[j][2] + "'," + "'" + veiculos[j][3] + "'," + "'" + veiculos[j][4] + "'" + ")");

            let imgBotaoAcao = document.createElement('img');
            imgBotaoAcao.setAttribute('src', '../assets/icon/editar-icon.svg');
            imgBotaoAcao.setAttribute('alt', 'Editar');
            botaoAcao.appendChild(imgBotaoAcao);

            for (let i = 0, cel = ''; i < veiculos[j].length; i++) {
              cel = criarCelula("td", veiculos[j][i]);
              linhaBody.appendChild(cel);
            }

            //Criando mais uma celula no final da linha e adicionando o editar veiuclo
            let veiculo = linhaBody.insertCell();
            veiculo.appendChild(botaoAcao);
            tbody.appendChild(linhaBody);

          }

          // Atribuindo as tags da tabela na tag <table>
          tabela.appendChild(thead);
          tabela.appendChild(tbody);

        } else {

          mostrarErro(response.codigo);

        }

      })
      .catch(err => console.error(err));
  }
};

function criarTabela() {


}