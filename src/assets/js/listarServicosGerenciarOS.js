var baseUrl = localStorage.getItem('baseUrl');

const options = { method: 'GET' };

fetch(baseUrl + '/listar-servicos', options)
  .then(response => response.json())
  .then(async response => {

    //Caso não possua funcionários para visualizar apresenta erro e retorna para o index.
    if (response.servicos == '') {

      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Nenhum serviço disponível!'
      });

    } else {

      // Dados para popular a tabela
      const servicos = [];

      // Percorrendo o objeto response.servicos e atribuindo um array dentro do array servicos
      for (let i = 0; i < response.servicos.length; i++) {

        servicos[i] = [response.servicos[i].nm_servico, response.servicos[i].valor, response.servicos[i].tempo]
      }

      // Função para criar uma Tag Ex: <tr>, <td>
      function criarTag(elemento) {
        return document.createElement(elemento);
      }

      // Criando a tabela
      let tabela = document.getElementById("tableServicosGerenciarOS");
      let thead = criarTag("thead");
      let tbody = criarTag("tbody");

      let indicesTabela = ["Nome", "Valor", "Tempo", "✓"];
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
      for (let j = 0, linhaBody = ''; j < servicos.length; j++) {

        linhaBody = criarTag("tr");
    
        let checkboxServico = document.createElement('input');
        checkboxServico.type = 'checkbox';
        checkboxServico.className = 'form-check-input';
        checkboxServico.setAttribute('onchange', "somarTotalTempoValorGerenciarOS(this, " + "'" + servicos[j][1] + "'," + "'" + servicos[j][2] + "'" + ")");

        for (let i = 0, cel = ''; i < servicos[j].length; i++) {
          cel = criarCelula("td", servicos[j][i]);
          linhaBody.appendChild(cel);
          checkboxServico.setAttribute('value', servicos[j][0]);
          checkboxServico.setAttribute('id', 'chk' + servicos[j][0]);
        }

        //Criando mais uma celula no final da linha e adicionando o Gerenciar Usuário
        let servico = linhaBody.insertCell();
        servico.appendChild(checkboxServico);
        tbody.appendChild(linhaBody);

      }

      // Atribuindo as tags da tabela na tag <table>
      tabela.appendChild(thead);
      tabela.appendChild(tbody);


      // Pesquisa dinâmica
      document.getElementById("inputServicosGerenciarOS").addEventListener("keyup", function () {

        let tbody = document.querySelector('tbody')
        let busca = document.getElementById("inputServicosGerenciarOS").value.toLowerCase();

        // Percorrendo as linhas do body para encontrar um valor
        for (let i = 0; i < tbody.childNodes.length; i++) {

          let achou = false;
          let tr = tbody.childNodes[i];
          let td = tr.childNodes;

          // Percorrendo as colunas do body para encontrar um valor
          for (let j = 0; j < 3; j++) {
            let value = td[j].childNodes[0].nodeValue.toLowerCase();

            if (value.indexOf(busca) >= 0) {
              achou = true;
            }
          }

          // Se encontrar, adicionar a classe "table-row" para exibir as linhas da pesquisa
          if (achou) {
            tr.style.display = "table-row";
          }
          // Se não encontrar, adicionar a classe "none" para esconder as linhas
          else {
            tr.style.display = "none";
          }
        }
      })
    }
  })
  .catch(err => console.error(err));