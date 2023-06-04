let modalBaia = document.getElementById('mdlCadastrarBaia');

modalBaia.innerHTML = `<div class="modal-dialog">
<div class="modal-content">
  <div class="modal-header">
    <h1 class="modal-title titulo_padrao fs-2" id="modalTitulo">Cadastro de Baias</h1>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-body mt-3">
    <!--Formulário de Gerenciamento de Cliente e Veículo -->
    <form id="formCadBaia" class="row align-items-center g-3">

    <div class="col-md-9 col-sm-9">
      <h4>Informe a quantidade</h4>
      <input type="text" class="form-control mb-3" id="iptQtdBaia" maxlength="14" onkeypress="mascaraCpf(this)">

    </div>
    <div class="col-lg-3">
      <button type="button" class="btn btn-primary btn-cadastrar">Cadastrar<img
          src="../assets/icon/cadastrar-icon.svg"></button>
    </div>
      <!-- Baias -->
      <div class="col-md-12">
        <h5>Baias cadastradas</h5>
      </div>

      <!--Tabela de Baias -->
      <div class="col-12">
        <div class="table-responsive">
          <table id="tblVeiculosCli" class="table">
            <thead>
              <th>Número</th>
              <th>Status</th>
              <th>Ação</th>
            </thead>
            <tbody>
              <tr>
                <td>01</td>
                <td>PCL-4444</td>
                <td><button type="button" class="btn btn_editar_veiculo"><img src="../assets/icon/editar-icon.svg" alt="Editar"></button></td>
              </tr>
              <tr>
                <td>02</td>
                <td>GOL</td>
                <td><button type="button" class="btn btn_editar_veiculo"><img src="../assets/icon/editar-icon.svg" alt="Editar"></button></td>
              </tr>
              <tr>
                <td>03</td>
                <td>NINJA</td>
                <td><button type="button" class="btn btn_editar_veiculo"><img src="../assets/icon/editar-icon.svg" alt="Editar"></button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </form>
  </div>
</div>
</div>`;