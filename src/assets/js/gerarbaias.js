document.addEventListener('DOMContentLoaded', async function () {

  var baseUrl = localStorage.getItem('baseUrl');

  //Variaveis para criar as tagas dos cards
  let container = document.getElementById('divBaia');
  let col = '';
  let card = '';
  let cardBody = '';
  let cardFooter = '';
  let row = '';
  let col7 = '';
  let h3 = '';
  let placaCard = '';
  let modeloCard = '';
  let pCliente = '';
  let labelCliente = '';
  let col5 = '';
  let h5 = '';
  let labelH5 = '';
  let imgVeiculo = '';
  let imgRelogio = '';
  let tempoRestante = '';

  // Variaveis para preencher as informações dos cards
  let tempo = '';
  let numeroBaia = '';
  let numeroOS = '';
  let previsao = '';
  let placa = '';
  let cliente = '';
  let modelo = '';
  let status = '';
  let textoBaia = '';
  let idOS = ''
  let idPlaca = ''
  let idModelo = ''
  let idCliente = ''
  let idPRevisao = ''

  // Função para criar os cards
  function criarCards(response) {

    // Loop para criar os cards
    for (let i = 0; i < response.baias.length; i++) {

      //Zerando variavéis toda vez que for chamada a função
      tempo = '';
      numeroOS = '';
      previsao = '';
      placa = '';
      cliente = '';
      modelo = '';

      //Pega o numero da baia
      numeroBaia = response.baias[i].cd_baia;

      //Define o status da baia
      if (response.baias[i].status == 0) {

        status = '0';
        textoBaia = 'Livre';

      } else {

        status = 1;
        textoBaia = 'Ocupada';

      }

      // criação de uma div coluna para estrutura do card
      col = document.createElement('div');
      col.classList.add('col');

      // criação do card
      card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('id', 'Baia' + response.baias[i].cd_baia);
      card.classList.add('baias');

      // Criando body do card
      cardBody = document.createElement('div');
      cardBody.classList.add('card-body');

      // Criando footer do card
      cardFooter = document.createElement('div');
      cardFooter.classList.add('card_footer');
      cardFooter.classList.add('text-center');
      cardFooter.setAttribute('data-status', status);
      cardFooter.innerText = textoBaia;

      // criação de uma div linha para estrutura do card
      row = document.createElement('div');
      row.classList.add('row');

      // Criando div col7 e tags que estarão dentro dela
      col7 = document.createElement('div');
      col7.classList.add('col-7');

      h3 = document.createElement('h3');
      h3.classList.add('card-title');
      h3.innerText = `Baia ` + numeroBaia;

      placaCard = document.createElement('p');
      placaCard.setAttribute('id', 'placa' + i);

      modeloCard = document.createElement('p');
      modeloCard.setAttribute('id', 'marca_modelo' + i);

      strong = document.createElement('strong');

      pCliente = document.createElement('p');
      pCliente.innerText = 'Cliente: ';
      pCliente.innerHTML = '<strong>Cliente: </strong>';

      labelCliente = document.createElement('label');
      labelCliente.setAttribute('id', 'cliente' + i);

      // Criando div col5 e tags que estarão dentro dela
      col5 = document.createElement('div');
      col5.classList.add('col-5');
      col5.classList.add('d-flex');
      col5.classList.add('flex-wrap');
      col5.classList.add('align-content-between');
      col5.classList.add('justify-content-center');

      h5 = document.createElement('h5');
      h5.classList.add('card-title');
      h5.innerText = 'OS: ';

      labelH5 = document.createElement('label');
      labelH5.setAttribute('id', 'id_OS' + i);


      imgVeiculo = document.createElement('div');
      imgVeiculo.classList.add('img_veiculo');
      imgVeiculo.setAttribute('data-veiculo', 'carro');

      imgRelogio = document.createElement('img');
      imgRelogio.setAttribute('id', 'relogio-icon');
      imgRelogio.setAttribute('src', '../assets/icon/relogio.svg');
      imgRelogio.setAttribute('alt', 'relogio');

      // Criar elemento para exibir o tempo restante
      tempoRestante = document.createElement('span');
      tempoRestante.setAttribute('id', 'previsao' + i);

      //Criando estrutura das tags hmtl outra
      container.appendChild(col);
      col.appendChild(card);
      card.appendChild(cardBody);
      card.appendChild(cardFooter);
      cardBody.appendChild(row);
      row.appendChild(col7);
      col7.appendChild(h3);
      col7.appendChild(placaCard);
      col7.appendChild(modeloCard);
      col7.appendChild(pCliente);
      pCliente.appendChild(strong);
      pCliente.appendChild(labelCliente);
      row.appendChild(col5);
      col5.appendChild(h5);
      h5.appendChild(labelH5);
      col5.appendChild(imgVeiculo);
      col5.appendChild(imgRelogio);
      col5.appendChild(tempoRestante);

    }
  }

  // Função para iniciar a contagem regressiva
  function iniciarContagemRegressiva(tempo, elementoTempo, baia) {
    const intervalo = setInterval(async () => {
      tempo--;
      elementoTempo.innerText = formatarTempo(tempo);

      if (tempo <= 0) {

        clearInterval(intervalo);

        Swal.fire({
          icon: 'info',
          title: 'Tempo da baia ' + baia + ' esgotado!',
          html: 'Deseja fazer o checkout?',
          showDenyButton: true,
          allowOutsideClick: false,
          confirmButtonText: 'Checkout',
          denyButtonText: 'Adicionar mais 30 minutos',
        }).then(async (result) => {

          if (result.isConfirmed) {
            elementoTempo.innerText = 'Finalizada';

          } else {
            elementoTempo.innerText = 'Atrasada';
          }
        })
      }
    }, 1000); // Atualizar a cada segundo
  }

  // Função para formatar o tempo em horas:minutos:segundos
  function formatarTempo(tempo) {

    // conversões
    const horas = Math.floor(tempo / (60 * 60));
    const divisorMinutos = tempo % (60 * 60);
    const minutos = Math.floor(divisorMinutos / 60);
    const segundos = tempo % 60;

    // formatação
    const hour = horas < 10 ? `0${horas}` : horas
    const minute = minutos < 10 ? `0${minutos}` : minutos
    const seconds = segundos < 10 ? `0${segundos}` : segundos

    return `${hour}:${minute}:${seconds.toString().padStart(2, '0')}`;

  }

  const optionsBaia = { method: 'GET' };

  await fetch(baseUrl + '/recuperar-baia', optionsBaia)
    .then(response => response.json())
    .then(response => {

      if (response.success == true) {
        // Chamar a função para criar os cards
        criarCards(response);
      }
    })
    .catch(err => console.error(err));

  const optionsOS = { method: 'GET' };

  fetch(baseUrl + '/recuperar-os', optionsOS)
    .then(response => response.json())
    .then(response => {

      if (response.success == true) {

        const baias = document.getElementsByClassName('baias');

        for (let j = 0; j < baias.length; j++) {

          let numeroBaia = baias[j].getAttribute('id').charAt(4);

          idOS = document.getElementById('id_OS' + j);
          idPlaca = document.getElementById('placa' + j);
          idModelo = document.getElementById('marca_modelo' + j);
          idCliente = document.getElementById('cliente' + j);
          idPRevisao = document.getElementById('previsao' + j);

          for (let i = 0; i < response.ordemServico.length; i++) {

            if (numeroBaia == response.ordemServico[i].cd_baia) {

              numeroOS = response.ordemServico[i].cd_ordem_servico;
              placa = response.ordemServico[i].placa;
              cliente = response.ordemServico[i].nome;
              modelo = response.ordemServico[i].modelo;

              previsao = response.ordemServico[i].previsao;
              arrayPrevisao = previsao.split(':');
              tempo = (parseInt(arrayPrevisao[0]) * 3600) + (parseInt(arrayPrevisao[1]) * 60) + parseInt(arrayPrevisao[2]);

              idOS.innerText = numeroOS;
              idPlaca.innerText = placa;
              idModelo.innerText = modelo;
              idCliente.innerText = cliente;
              idPRevisao.innerText = formatarTempo(tempo);

              iniciarContagemRegressiva(tempo, idPRevisao, response.ordemServico[i].cd_baia);

              break;

            } else {

              idOS.innerText = '';
              idPlaca.innerText = '';
              idModelo.innerText = '';
              idCliente.innerText = '';
              idPRevisao.innerText = '00:00:00';
            }
          }
        }
      }
    })
    .catch(err => console.error(err));
})