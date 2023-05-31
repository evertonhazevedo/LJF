let menu = document.querySelector('.menu_principal');

menu.innerHTML = `<div class="container-fluid">
<div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <!-- Item do menu-->
        <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">
                <div>
                    <img src="../assets/icon/inicio_icon.svg" alt="Inicio">
                </div>
                Inicio
            </a>
        </li>
        <!-- Item do menu-->
        <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">
                <div>
                    <img src="../assets/icon/gerar_os_icon.png" alt="Gerar OS">
                </div>
                Gerar OS
            </a>
        </li>
        <!-- Item do menu-->
        <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">
                <div>
                    <img src="../assets/icon/cad_cliente_icon.svg" alt="Cad. Cliente">
                </div>
                Cad. Cliente
            </a>
        </li>
        <!-- Item do menu-->
        <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">
                <div>
                    <img src="../assets/icon/ordem_servico_icon.svg" alt="Gerenciar OS">
                </div>
                Gerenciar OS
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


    <div class="hora">
        <label id="hora">15:42</label>
    </div>
    <div class="data_operador">
        <p id="data">25 de Maio de 2023</p>
        <p id="operador">Operador: Fulano</p>
    </div>

</div>`



