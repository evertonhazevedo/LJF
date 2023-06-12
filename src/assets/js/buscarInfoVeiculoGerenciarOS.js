//Função para preencher o campo marca e modelo de acordo com a placa selecionada
function buscarInfoVeiculoGerenciarOS(placa) {

  var baseUrl = localStorage.getItem('baseUrl');

  const options = { method: 'GET' };

  fetch(baseUrl + '/buscar-info-veiculo/' + placa.value, options)
    .then(response => response.json())
    .then(async response => {

      if (response.success) {

        document.getElementById('inputMarcaGerenciarOS').value = response.infoVeiculo.marca;
        document.getElementById('inputModeloGerenciarOS').value = response.infoVeiculo.modelo;

        localStorage.setItem('cdVeiculoGerenciarOS', response.infoVeiculo.cd_veiculo);

      }

    })
    .catch(err => console.error(err));
}

// window.addEventListener('beforeunload', async function (event) {


    // if (document.getElementById("inputMarca").value != "") {

    //    await Swal.fire({

    //     title: 'Esta OS ainda não foi salva, deseja realmente sair?',
    //     text: 'Todos os dados serão perdidos!',
    //     showDenyButton: true,
    //     confirmButtonText: 'Sair',
    //     denyButtonText: 'Cancelar',

    //   }).then(async (result) => {

    //     if (result.isConfirmed) {

    //       return window.location.reload(true);
        
    //     }
    //   })

    //   event.preventDefault();
    // }
  // });

  