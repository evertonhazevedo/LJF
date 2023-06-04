/*Declaração de Variavéis*/
let menu = document.querySelector('.menu_principal');
let mes = 0;

/*Recuperando nome do operador do localstorage*/
const nomeOperador = localStorage.getItem("nomeFuncionario");

/*Instanciando objeto da classe Date*/
const data = new Date();

/*Descobrindo mês*/
switch (data.getMonth()) {

    case 0:

        mes = 'Janeiro'
        break;

    case 1:

        mes = 'Fevereiro'
        break;

    case 2:

        mes = 'Março'
        break;

    case 3:

        mes = 'Abril'
        break;

    case 4:

        mes = 'Maio'
        break;

    case 5:

        mes = 'Junho'
        break;

    case 6:

        mes = 'Julho'
        break;

    case 7:

        mes = 'Agosto'
        break;

    case 8:

        mes = 'Setembro'
        break;

    case 9:

        mes = 'Outubro'
        break;

    case 10:

        mes = 'Novembro'
        break;

    default:

        mes = 'Dezembro'


}

const getHours = () => {
    const clock = document.getElementById('relogio')[0]
    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const hour = hours < 10 ? `0${hours}` : hours
    const minute = minutes < 10 ? `0${minutes}` : minutes
    relogio.innerHTML = `${hour}:${minute}`
}

setInterval(() => {
    getHours()
}, 1000)

menu.innerHTML = `<div class="container-fluid">
<div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <!-- Item do menu-->
        <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/src/pages/mapaGeral.html">
                <div>
                    <img src="../assets/icon/inicio_icon.svg" alt="Inicio">
                </div>
                Inicio
            </a>
        </li>
        <!-- Item do menu-->
        <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/src/pages/gerarOS.html">
                <div>
                    <img src="../assets/icon/gerar_os_icon.png" alt="Gerar OS">
                </div>
                Gerar OS
            </a>
        </li>
        <!-- Item do menu-->
        <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="" data-bs-toggle="modal" data-bs-target="#mdlClienteVeiculo">
                <div>
                    <img src="../assets/icon/cad_cliente_icon.svg" alt="Cad. Cliente">
                </div>
                Cliente e Veículo
            </a>
        </li>
        <!-- Item do menu-->
        <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/src/pages/buscarOS.html">
                <div>
                    <img src="../assets/icon/ordem_servico_icon.svg" alt="Buscar OS">
                </div>
                Buscar OS
            </a>
        </li>
        <!-- Item do menu-->
        <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="" data-bs-toggle="modal" data-bs-target="#mdlCadastrarBaia">
                <div>
                    <img src="../assets/icon/cadastrar_baia_icon.svg" alt="Cadastrar Baia">
                </div>
                Cadastrar Baia
            </a>
        </li>
        <!-- Item do menu-->
        <li class="nav-item" id="btnDeslogar">
            <a class="nav-link active" aria-current="page" href="#">
                <div>
                    <img src="../assets/icon/deslogar_icon.svg" alt="Deslogar">
                </div>
                Deslogar
            </a>
        </li>
    </ul>


    <div class="relogio">
        <label id="relogio"></label>
    </div>
    <div class="data_operador">
        <p id="data">` + data.getDate() + ` de ` + mes + ` de ` + data.getFullYear() + `</p>
        <p id="operador">Operador: <span style="color: red">` + nomeOperador + ` </span></p>
        
    </div>

</div>`



