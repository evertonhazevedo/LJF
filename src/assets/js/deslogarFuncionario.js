//Deslogar usuario
document.getElementById('btnDeslogar')
    .addEventListener('click', async function () {

        localStorage.clear();

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true
      })     

        await Toast.fire({
            icon: 'warning',
            title: 'Encerrando sessão...'
        })

        window.location.href = "/index.html";
    });