let mdlClienteVeiculo = document.getElementById('mdlClienteVeiculo');

// Função para carregar o conteúdo do modal

window.addEventListener('DOMContentLoaded', function() {

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        mdlClienteVeiculo.innerHTML = xhr.responseText;
      }
    }
  };
  xhr.open("GET", "mdlClienteVeiculo.html", true);
  xhr.send();

});