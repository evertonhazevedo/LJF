//Funcao para criar as baias no select 
document.getElementById('btnCheckout')
  .addEventListener('click', function () {

    var baseUrl = localStorage.getItem('baseUrl');

    let selectBaia = document.getElementById('selectBaia');

    const options = { method: 'GET' };

    fetch(baseUrl + '/preencher-select-baias', options)
      .then(response => response.json())
      .then(async response => {

        if (response.success) {

          selectBaia.length = 0;

          response.baias.forEach(element => {

            let optionBaia = document.createElement('option');
            optionBaia.innerHTML = 'Baia ' + element.cd_baia;
            optionBaia.value = element.cd_baia + ' ' +  element.cd_ordem_servico;
            selectBaia.appendChild(optionBaia);

          });
        }

      })
      .catch(err => console.error(err));
  });
