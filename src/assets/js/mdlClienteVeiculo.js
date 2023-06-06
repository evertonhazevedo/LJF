let modal = document.getElementById('mdlClienteVeiculo');

modal.innerHTML = `<div class="modal-dialog">
<div class="modal-content">
  <div class="modal-header">
    <h1 class="modal-title titulo_padrao fs-2" id="modalTitulo">Gerenciar Cliente e Veículos</h1>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-body mt-3">
    <!--Formulário de Gerenciamento de Cliente e Veículo -->
    <form id="formCadCliente" class="row align-items-center g-3">

    <div class="col-md-12 col-sm-12">
    <div id="">
    <h4>Pesquisar Cliente</h4>
    <input type="text" class="form-control mb-3" id="iptPesquisarCliente" maxlength="14" placeholder="Informe o CPF" onkeypress="mascaraCpf(this)">
</div>
      </div>
       <div class="col-md-6 col-sm-12">
        <label for="iptNomeCli" class="form-label">Nome</label>
        <input type="text" class="form-control inputsCliente" id="iptNomeCli">
      </div>
      <div class="col-md-6 col-sm-12">
        <label for="iptSobrenomeCli" class="form-label">Sobrenome</label>
        <input type="text" class="form-control inputsCliente" id="iptSobrenomeCli">
      </div>
      <div class="col-md-12">
        <label for="iptEmailCli" class="form-label">Email</label>
        <input type="email" class="form-control inputsCliente" id="iptEmailCli">
      </div>
      <div class="col-md-6 col-sm-12">
        <label for="iptCpfCli" class="form-label">CPF</label>
        <input type="text" class="form-control inputsCliente" id="iptCpfCli" onkeypress="mascaraCpf(this)" maxlength="14"
          onkeypress="mascaraCpf(this)">
      </div>

      <div class="col-md-6 col-sm-12">
        <label for="iptTelefoneCli" class="form-label" onkeypress="handlePhone(this)">Telefone</label>
        <input type="tel" class="form-control inputsCliente" id="iptTelefoneCli">
      </div>

      <!-- Veículos -->
      <div class="col-md-12">
        <h5>Veículos cadastrados</h5>
      </div>

      <div class="col-lg-3">
        <label for="iptPlacaCli" class="form-label">Placa</label>
        <input type="tel" class="form-control inputsVeiculo" id="iptPlacaCli" disabled>
      </div>

      <div class="col-lg-3">
        <label for="iptMarcaCli" class="form-label">Marca</label>
        <input type="tel" class="form-control inputsVeiculo" id="iptMarcaCli" disabled>
      </div>

      <div class="col-lg-3">
        <label for="iptModeloCli" class="form-label">Modelo</label>
        <input type="tel" class="form-control inputsVeiculo" id="iptModeloCli" disabled>
      </div>

      <div class="col-lg-3">
        <button type="button" class="btn btn-primary btn-cadastrar" id="btnCadastrarVei" disabled>Cadastrar<img
            src="../assets/icon/cadastrar-icon.svg"></button>
      </div>

      <!--Tabela de Veículos -->
      <div class="col-12">
        <div class="table-responsive">
          <table id="tblVeiculosCli" class="table">
            <thead>
              <th>ID</th>
              <th>Placa</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Ação</th>
            </thead>
            <tbody>
              <tr>
                <td>01</td>
                <td>PCL-4444</td>
                <td>FIAT</td>
                <td>PALIO</td>
                <td><button type="button" class="btn btn_editar_veiculo"><img src="../assets/icon/editar-icon.svg" alt="Editar"></button></td>
              </tr>
              <tr>
                <td>02</td>
                <td>PCA-4444</td>
                <td>VOLKSWAGEM</td>
                <td>GOL</td>
                <td><button type="button" class="btn btn_editar_veiculo"><img src="../assets/icon/editar-icon.svg" alt="Editar"></button></td>
              </tr>
              <tr>
                <td>03</td>
                <td>PCB-4444</td>
                <td>KAWASAKI</td>
                <td>NINJA</td>
                <td><button type="button" class="btn btn_editar_veiculo"><img src="../assets/icon/editar-icon.svg" alt="Editar"></button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </form>
  </div>
  <div class="modal-footer justify-content-start">
    <button type="button" class="btn btn-primary" id="btnSalvarCliVei">Salvar</button>
    <button type="button" class="btn btn-danger" id="btnExcluirCli">Excluir</button>
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
  </div>
</div>
</div>`;