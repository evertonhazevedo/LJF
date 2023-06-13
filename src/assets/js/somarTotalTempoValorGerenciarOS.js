let valorTotal = 0;
let tempoTotal = 0;
let campoValortotal = document.getElementById('valorTotalGerenciarOS');
let campoPrevisaoTotal = document.getElementById('previsaoTotalGerenciarOS');
let controle = false

function somarTotalTempoValorGerenciarOS(checkbox, valor, tempo) {

  let valorCampoValorTotal = parseFloat(document.getElementById('valorTotalGerenciarOS').innerHTML.replace(/[^\d.]+/g, ''));
  let valorCampoPrevisaoTotal = document.getElementById('previsaoTotalGerenciarOS').innerHTML.split(' ');

  if (checkbox.checked == true) {

    if (valorCampoValorTotal > 0 && controle == false) {

      valorTotal = valorCampoValorTotal;


      if ((valorCampoPrevisaoTotal[1] == 'Horas' && valorCampoPrevisaoTotal.length == 2) || (valorCampoPrevisaoTotal[1] == 'Hora' && valorCampoPrevisaoTotal.length == 2)) {

        tempoTotal = parseInt(valorCampoPrevisaoTotal[0]) * 3600

      } else if (valorCampoPrevisaoTotal[1] == 'Minutos') {

        tempoTotal = parseInt(valorCampoPrevisaoTotal[0]) * 60

      } else if (valorCampoPrevisaoTotal[2] == 'e') {

        tempoTotal = parseInt(valorCampoPrevisaoTotal[0]) * 3600 + (parseInt(valorCampoPrevisaoTotal[3]) * 60)

      }

      controle = true;
    }

    //Contador do valor total convertido para float
    valorTotal = valorTotal + parseFloat(valor);

    //Setando valor total da os
    campoValortotal.innerHTML = 'R$ ' + valorTotal.toFixed(2);

    var array1 = tempo.split(':');

    var tempo_seg1 = (parseInt(array1[0]) * 3600) + (parseInt(array1[1]) * 60) + parseInt(array1[2]);

    tempoTotal = tempoTotal + parseInt(tempo_seg1);

    var hours = Math.floor(tempoTotal / (60 * 60));

    var divisorMinutos = tempoTotal % (60 * 60);

    var minutes = Math.floor(divisorMinutos / 60);

    if (hours < 1) {

      campoPrevisaoTotal.innerHTML = minutes + ' Minutos';

    } else if (hours == 1 && minutes == 0) {

      campoPrevisaoTotal.innerHTML = '0' + hours + ' Hora';

    } else if (hours == 1 && minutes > 0) {

      campoPrevisaoTotal.innerHTML = '0' + hours + ' Hora e ' + minutes + ' Minutos';

    } else if (hours > 1 && minutes > 0) {

      campoPrevisaoTotal.innerHTML = '0' + hours + ' Horas e ' + minutes + ' Minutos';

    } else {

      campoPrevisaoTotal.innerHTML = '0' + hours + ' Horas';

    }

  } else {

    if (valorCampoValorTotal > 0 && controle == false) {

      valorTotal = valorCampoValorTotal;

      if ((valorCampoPrevisaoTotal[1] == 'Horas' && valorCampoPrevisaoTotal.length == 2) || (valorCampoPrevisaoTotal[1] == 'Hora' && valorCampoPrevisaoTotal.length == 2)) {

        tempoTotal = parseInt(valorCampoPrevisaoTotal[0]) * 3600

      } else if (valorCampoPrevisaoTotal[1] == 'Minutos') {

        tempoTotal = parseInt(valorCampoPrevisaoTotal[0]) * 60

      } else if (valorCampoPrevisaoTotal[2] == 'e') {

        tempoTotal = parseInt(valorCampoPrevisaoTotal[0]) * 3600 + (parseInt(valorCampoPrevisaoTotal[3]) * 60)

      }

      controle = true;
    }

    valorTotal = valorTotal - parseFloat(valor);

    campoValortotal.innerHTML = 'R$ ' + valorTotal.toFixed(2);

    var array1 = tempo.split(':');

    var tempo_seg1 = (parseInt(array1[0]) * 3600) + (parseInt(array1[1]) * 60) + parseInt(array1[2]);

    tempoTotal = tempoTotal - parseInt(tempo_seg1);

    var hours = Math.floor(tempoTotal / (60 * 60));

    var divisorMinutos = tempoTotal % (60 * 60);

    var minutes = Math.floor(divisorMinutos / 60);

    if (hours < 1) {

      campoPrevisaoTotal.innerHTML = minutes + ' Minutos';

    } else if (hours == 1 && minutes == 0) {

      campoPrevisaoTotal.innerHTML = '0' + hours + ' Hora';

    } else if (hours == 1 && minutes > 0) {

      campoPrevisaoTotal.innerHTML = '0' + hours + ' Hora e ' + minutes + ' Minutos';

    } else if (hours > 1 && minutes > 0) {

      campoPrevisaoTotal.innerHTML = '0' + hours + ' Horas e ' + minutes + ' Minutos';

    } else {

      campoPrevisaoTotal.innerHTML = '0' + hours + ' Horas';

    }
  }
}