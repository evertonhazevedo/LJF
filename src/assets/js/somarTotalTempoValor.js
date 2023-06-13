var valorTotal = 0;
var tempoTotal = 0;
let campoValortotal = document.getElementById('valorTotal');
let campoPrevisaoTotal = document.getElementById('previsaoTotal');

function somarTotalTempoValor(checkbox, valor, tempo) {

  if (checkbox.checked == true) {

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