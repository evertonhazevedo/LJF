var baseUrl = localStorage.getItem('baseUrl');

let tabelaFila = document.getElementById('tableFila');

const options = { method: 'GET' };

fetch(baseUrl + '/listar-fila', options)
  .then(response => response.json())
  .then(async response => {

    //Caso não possua funcionários para visualizar apresenta erro e retorna para o index.
    if (response.success == false) {

      tabelaFila.innerHTML = 
      `<tbody style="border-style: none;">
        <th   style="border-style: none;">
          Nenhuma ordem de serviço na fila
        </th>
      </tbody>`
  
    } else {

      // Dados para popular a tabela
      const fila = [];

      // Percorrendo o objeto response.fila e atribuindo um array dentro do array fila
      for (let i = 0; i < response.fila.length; i++) {

        fila[i] = [response.fila[i].posicao, response.fila[i].cd_ordem_servico, response.fila[i].placa, response.fila[i].marca, response.fila[i].modelo, 
        response.fila[i].cliente, response.fila[i].entrada, response.fila[i].previsao]
      }

      // Função para criar uma Tag Ex: <tr>, <td>
      function criarTag(elemento) {
        return document.createElement(elemento);
      }

      // Criando a tabela
      let tabela = document.getElementById("tableFila");
      let thead = criarTag("thead");
      let tbody = criarTag("tbody");

      let indicesTabela = ["Posição", "OS", "Placa", "Marca", "Modelo", "Cliente", "Entrada", "Previsão"];
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
        th.setAttribute('align', 'center');
        th.setAttribute('valign', 'middle');
        linhaHead.appendChild(th);
      }

      thead.appendChild(linhaHead);

      // Percorrendo os dados e atribuindo as colunas e adicionando em cada linha
      for (let j = 0, linhaBody = ''; j < fila.length; j++) {

        linhaBody = criarTag("tr");

        // let checkboxServico = document.createElement('input');
        // checkboxServico.type = 'checkbox';
        // checkboxServico.className = 'form-check-input';
        // checkboxServico.setAttribute('onchange', "somarTotalTempoValor(this, " + "'" + fila[j][1] + "'," + "'" + fila[j][2] + "'" + ")");

        for (let i = 0, cel = ''; i < fila[j].length; i++) {
          cel = criarCelula("td", fila[j][i]);
          linhaBody.appendChild(cel);
          // checkboxServico.setAttribute('value', fila[j][0]);
          // checkboxServico.setAttribute('id', 'chk' + fila[j][0]);
        }

        //Criando mais uma celula no final da linha e adicionando o Gerenciar Usuário
        // let servico = linhaBody.insertCell();
        // servico.appendChild(checkboxServico);
        tbody.appendChild(linhaBody);

      }

      // Atribuindo as tags da tabela na tag <table>
      tabela.appendChild(thead);
      tabela.appendChild(tbody);


      // // Pesquisa dinâmica
      // document.getElementById("inputServicos").addEventListener("keyup", function () {

      //   let tbody = document.querySelector('tbody')
      //   let busca = document.getElementById("inputServicos").value.toLowerCase();

      //   // Percorrendo as linhas do body para encontrar um valor
      //   for (let i = 0; i < tbody.childNodes.length; i++) {

      //     let achou = false;
      //     let tr = tbody.childNodes[i];
      //     let td = tr.childNodes;

      //     // Percorrendo as colunas do body para encontrar um valor
      //     for (let j = 0; j < 3; j++) {
      //       let value = td[j].childNodes[0].nodeValue.toLowerCase();

      //       if (value.indexOf(busca) >= 0) {
      //         achou = true;
      //       }
      //     }

      //     // Se encontrar, adicionar a classe "table-row" para exibir as linhas da pesquisa
      //     if (achou) {
      //       tr.style.display = "table-row";
      //     }
      //     // Se não encontrar, adicionar a classe "none" para esconder as linhas
      //     else {
      //       tr.style.display = "none";
      //     }
      //   }
      // })
    }
  })
  .catch(err => console.error(err));