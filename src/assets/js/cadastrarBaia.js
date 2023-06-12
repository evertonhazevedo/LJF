async function cadastrarBaia() {

  let quantidadeBaias = document.getElementById('iptQtdBaia').value;


  if (quantidadeBaias<= 0) {

    await Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Cadastre um valor maior que zero!'
    })  

  } else {

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({

        quantidadeBaias

      })
    };

    fetch(baseUrl + '/cadastrar-baia', options)
      .then(response => response.json())
      .then(async response => {

        if (response.success == true) {

          await Swal.fire({
            icon: 'success',
            title: 'Baia(s) cadastrada com sucesso'
          })

        } else {
          await Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Erro ao cadastrar baia' + response.message
          })
        }
      }).catch(err => console.error(err));
  }
};