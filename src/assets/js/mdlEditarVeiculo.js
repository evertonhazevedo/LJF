let mdlEditarVeiculo = document.getElementById('mdlEditarVeiculo');

var elementoId = '';
var elementoTipo = '';
var elementoPlaca = '';
var elementoMarca = '';
var elementoModelo = '';

var elementoIdF = '';
var elementoTipoF = '';
var elementoPlacaF = '';
var elementoMarcaF = '';
var elementoModeloF = '';


// Função para carregar o conteúdo do modal

window.addEventListener('DOMContentLoaded', function () {

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
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

function abrirMdlEditarVeiculo(id, tipo, placa, marca, modelo) {

  let modalVeiculo = new bootstrap.Modal(mdlEditarVeiculo);
  modalVeiculo.show();

  document.getElementById('iptIdEdtVei').innerText = id;
  document.getElementById('iptTipoVeiCad').value = tipo;
  document.getElementById('iptPlacaVeiCad').value = placa;
  document.getElementById('iptMarcaCliVeiCad').value = marca;
  document.getElementById('iptModeloCliVeiCad').value = modelo;

};
