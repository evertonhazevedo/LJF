let mdlEditarVeiculo = document.getElementById('mdlEditarVeiculo');

// Função para carregar o conteúdo do modal

window.addEventListener('DOMContentLoaded', function() {

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        mdlEditarVeiculo.innerHTML = xhr.responseText;
      }
    }
  };
  xhr.open("GET", "mdlEditarVeiculo.html", true);
  xhr.send();

});

/* Função para abrir o modal de editar veículo dentro da tela modal cliente e veiculo */

function abrirMdlEditarVeiculo () {
  let modalVeiculo = new bootstrap.Modal(mdlEditarVeiculo);
  modalVeiculo.show();
}