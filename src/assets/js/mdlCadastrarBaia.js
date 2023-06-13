let mdlCadastrarBaia = document.getElementById('mdlCadastrarBaia');

// Função para carregar o conteúdo do modal

window.addEventListener('DOMContentLoaded', function() {

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        mdlCadastrarBaia.innerHTML = xhr.responseText;
      }
    }
  };
  xhr.open("GET", "mdlCadastrarBaia.html", true);
  xhr.send();

});