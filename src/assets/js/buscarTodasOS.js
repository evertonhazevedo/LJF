document.addEventListener('DOMContentLoaded', function () {

  let tabelaBuscarOS = document.getElementById("tabelaBuscarOS");

  const options = { method: 'GET' };

  fetch(baseUrl + '/buscar-todas-os', options)
    .then(response => response.json())
    .then(response => {

      if (response.success == false) {

        tabelaBuscarOS.innerHTML =
          `<tbody style="border-style: none;">
            <th   style="border-style: none;">
              Nenhuma existe nehuma ordem de serviço.
            </th>
          </tbody>`

      } else {

        // Dados para popular a tabela
        const os = [];

        // Percorrendo o objeto response.os e atribuindo um array dentro do array os
        for (let i = 0; i < response.os.length; i++) {

          os[i] = [response.os[i].cd_ordem_servico, response.os[i].placa, response.os[i].nome, response.os[i].previsao, response.os[i].situacao]

        }

        // Função para criar uma Tag Ex: <tr>, <td>
        function criarTag(elemento) {
          return document.createElement(elemento);
        }

        // Criando a tabela
        let thead = criarTag("thead");
        let tbody = criarTag("tbody");

        let indicesTabela = ["Número", "Placa", "Cliente", "Tempo", "Status", "Ação", "Pagamento"];
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
        for (let j = 0, linhaBody = ''; j < os.length; j++) {

          linhaBody = criarTag("tr");

          for (let i = 0, cel = ''; i < os[j].length; i++) {
            cel = criarCelula("td", os[j][i]);
            linhaBody.appendChild(cel);
          }

          // Botão ação
          let tagA = document.createElement('a');
          tagA.setAttribute('href', '/src/pages/gerenciarOS.html');
          tagA.setAttribute('target', '_blank');
          // tagA.setAttribute('onclick', "setarValoresGerenciarOS(" + "'" + response.os[j].valor_total + "'," + "'" + response.os[j].cd_ordem_servico + "'," + "'" + response.os[j].vl_pago + "'," + "'" + response.os[j].troco + "'" + ")");

          let btnAcao = document.createElement('button');
          btnAcao.type = 'button';
          btnAcao.innerHTML = 'Ir para';
          btnAcao.setAttribute('id', 'btnIrPara');
          btnAcao.className = 'btn btn-primary'
          tagA.appendChild(btnAcao);

          let imgBotaoAcao = document.createElement('img');
          imgBotaoAcao.setAttribute('src', '../assets/icon/irpara-icon.svg');
          btnAcao.appendChild(imgBotaoAcao);

          //Criando mais uma celula no final da linha e adicionando o Gerenciar Usuário
          let link = linhaBody.insertCell();
          link.appendChild(tagA);
          tbody.appendChild(linhaBody);

          if (response.os[j].cd_pagamento == null) {

            // Botão Pagamento
            let tagAPagamento = document.createElement('a');
            tagAPagamento.setAttribute('id', 'pagarOS');
            tagAPagamento.setAttribute('data-bs-toggle', 'modal');
            tagAPagamento.setAttribute('data-bs-target', '#mdlPagamento');

            let imgBtnPagamento = document.createElement('img');
            imgBtnPagamento.setAttribute('src', '../assets/icon/pagar-icon.svg');
            imgBtnPagamento.setAttribute('alt', 'Pagar OS');
            tagAPagamento.appendChild(imgBtnPagamento);
            tagAPagamento.setAttribute('onclick', "setarValorTotal(" + "'" + response.os[j].valor_total + "'," + "'" + response.os[j].cd_ordem_servico + "'," + "'" + response.os[j].vl_pago + "'," + "'" + response.os[j].troco + "'" + ")");

            //Criando mais uma celula no final da linha e adicionando o Gerenciar Usuário
            let pagamento = linhaBody.insertCell();
            pagamento.appendChild(tagAPagamento);
            tbody.appendChild(linhaBody);

          } else {

            let tagAPagamento = document.createElement('a');
            tagAPagamento.setAttribute('id', 'pagarOS');
            tagAPagamento.setAttribute('data-bs-toggle', 'modal');
            tagAPagamento.setAttribute('data-bs-target', '#mdlPagamento');

            let textoPagamento = document.createElement('p');
            textoPagamento.innerText = 'Paga';
            textoPagamento.style.color = 'blue';
            textoPagamento.style.textDecoration = 'underline';
            tagAPagamento.appendChild(textoPagamento);
            tagAPagamento.setAttribute('onclick', "setarValorTotal(" + "'" + response.os[j].valor_total + "'," + "'" + response.os[j].cd_ordem_servico + "'," + "'" + response.os[j].vl_pago + "'," + "'" + response.os[j].troco + "'" + ")");

            //Criando mais uma celula no final da linha e adicionando o Gerenciar Usuário
            let pagamento = linhaBody.insertCell();
            pagamento.appendChild(tagAPagamento);
            tbody.appendChild(linhaBody);

          }

        }

        // Atribuindo as tags da tabela na tag <table>
        tabelaBuscarOS.appendChild(thead);
        tabelaBuscarOS.appendChild(tbody);

        // Pesquisa dinâmica
        document.getElementById("inputBuscarOS").addEventListener("keyup", function () {

          let tbody = document.querySelector('tbody')
          let busca = document.getElementById("inputBuscarOS").value.toLowerCase();

          // Percorrendo as linhas do body para encontrar um valor
          for (let i = 0; i < tbody.childNodes.length; i++) {

            let achou = false;
            let tr = tbody.childNodes[i];
            let td = tr.childNodes;

            // Percorrendo as colunas do body para encontrar um valor
            for (let j = 0; j < 5; j++) {
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

});

function setarValorTotal(valorTotal, ordemServico, vl_pago, troco) {

  if (vl_pago == 'null') {

    document.getElementById('iptValorPago').value = '';
    document.getElementById('iptTroco').value = 'R$ 0.00';
    document.getElementById('iptValorPago').removeAttribute('disabled');
    document.getElementById('btnFinalizar').removeAttribute('disabled');
    document.getElementById('btnFinalizar').innerHTML = 'Finalizar';

  } else {

    document.getElementById('iptTroco').value = 'R$ ' + troco;//parseFloat(troco).toFixed(2);
    document.getElementById('iptValorPago').value = 'R$ ' + vl_pago;//parseFloat(vl_pago).toFixed(2);
    document.getElementById('iptValorPago').setAttribute('disabled', ' ');
    document.getElementById('btnFinalizar').setAttribute('disabled', ' ');
    document.getElementById('btnFinalizar').innerHTML = 'PAGA';

  }


  document.getElementById('iptValorTotal').value = valorTotal;
  document.getElementById('spanOS').innerText = ordemServico;
}