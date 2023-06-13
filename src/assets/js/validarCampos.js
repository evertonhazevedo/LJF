function validarCampos(classeCampos) {

  let campoVazio = false;

  //Recuperando classe dos inputs do formulário
  let inputs = document.querySelectorAll(classeCampos);

  if (inputs.length <= 0) {
    inputs = document.getElementsByClassName(classeCampos);
  }

  //Removendo o atributo de erro dos inputs
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].classList.remove("is-invalid");
  }

  //Verificando se algum campo está vazio
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value == "") {
      inputs[i].classList.add("is-invalid");
      campoVazio = true;
    }
  }

  return campoVazio;
}

function validarEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}