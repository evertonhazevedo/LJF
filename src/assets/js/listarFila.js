var baseUrl = localStorage.getItem('baseUrl');

let tabelaFila = document.getElementById('tableFila');

const options = { method: 'GET' };

fetch(baseUrl + '/listar-fila', options)
  .then(response => response.json())
  .then(async response => {

    //Caso não possua fila para visualizar apresenta erro e retorna para o index.
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

        for (let i = 0, cel = ''; i < fila[j].length; i++) {
          cel = criarCelula("td", fila[j][i]);
          linhaBody.appendChild(cel);
        }

        //Criando mais uma celula no final da linha e adicionando o Gerenciar Usuário
        tbody.appendChild(linhaBody);

      }

      // Atribuindo as tags da tabela na tag <table>
      tabela.appendChild(thead);
      tabela.appendChild(tbody);

    }
  })
  .catch(err => console.error(err));