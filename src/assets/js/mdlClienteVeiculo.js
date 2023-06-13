let mdlClienteVeiculo = document.getElementById('mdlClienteVeiculo');
let btnClienteVeiculo = document.getElementById('btnClienteVeiculo');

// Função para limpar os campos do modal ao abrir

btnClienteVeiculo.addEventListener('click', function () {

  document.getElementById('iptNomeCli').value = "";
  document.getElementById('iptSobrenomeCli').value = "";
  document.getElementById('iptEmailCli').value = "";
  document.getElementById('iptCpfCli').value = "";
  document.getElementById('iptCpfCli').removeAttribute("disabled");
  document.getElementById('iptTelefoneCli').value = "";
  document.getElementById('iptPlacaCli').value = "";
  document.getElementById('iptMarcaCli').value = "";
  document.getElementById('iptModeloCli').value = "";
  document.getElementById('tblVeiculosCli').innerHTML = "";


})


// Função para carregar o conteúdo do modal

window.addEventListener('DOMContentLoaded', function () {

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        mdlClienteVeiculo.innerHTML = xhr.responseText;
      }
    }
  };
  xhr.open("GET", "mdlClienteVeiculo.html", true);
  xhr.send();

});
