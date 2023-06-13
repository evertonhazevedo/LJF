async function editarVeiculo() {

  let tipo = document.getElementById('iptTipoVeiCad').value;
  let placa = document.getElementById('iptPlacaVeiCad').value;
  let marca = document.getElementById('iptMarcaCliVeiCad').value;
  let modelo = document.getElementById('iptModeloCliVeiCad').value;
  let cd_veiculo = document.getElementById('iptIdEdtVei').innerText;

  if (validarCampos('inputsVeiculoCad')) {

    await Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Preencha todos os campos!'
    })

  } else {

    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tipo,
        placa,
        marca,
        modelo,
        cd_veiculo
      })
    };

    fetch(baseUrl + '/editar-veiculo', options)
      .then(response => response.json())
      .then(async response => {

        if(response.success == true){

          await Swal.fire({
            icon: 'success',
            title: 'Veículo atualizado com sucesso!'
          })

          window.location.reload(true);
          
        }else{

          await Swal.fire({
            icon: 'error',
            title: 'Erro ao salvar o veículo!',
            text: 'Motivo: ' + response.message
          })      
        }
      })
      .catch(err => console.error(err));
  }
}