//Deslogar usuario
document.getElementById('btnDeslogar')
    .addEventListener('click', async function () {

        var baseUrl = localStorage.getItem('baseUrl');
        let ordemServico = [];
        let novaPrevisao = [];
        let contadorPosicaoArray = 0;

        for (let i = 0; i < localStorage.length; i++) {

            const chave = localStorage.key(i);

            if (chave.substring(0, 8) == 'previsao') {

                ordemServico[contadorPosicaoArray] = chave.substring(10);
                novaPrevisao[contadorPosicaoArray] = localStorage.getItem(chave);
                contadorPosicaoArray++;

            }
        }

        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ordemServico,
                novaPrevisao
            })
        };

        fetch(baseUrl + '/salvar-nova-previsao', options)
            .then(response => response.json())
            .then(async response => {
                console.log(response)

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

                localStorage.clear();

                window.location.href = "/index.html";
            })
            .catch(err => console.error(err));

    });