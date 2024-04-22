const form = document.getElementById('form-cadastroBusca');
const contatoCC = [];
const numeroTel = [];

form.addEventListener('submit', function (e) {
    e.preventDefault();
    adicionaLinha();
})

const formataTel = (event) => {
    let input = event.target;
    input.value = mascaraTel(input.value);
}

const mascaraTel = (value) => {
    if (!value) return "";
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    return value;
}

function adicionaLinha() {
    const inputNomeContato = document.getElementById('contactName');
    const inputNumeroContato = document.getElementById('telefone-contato');

    if (!inputNomeContato || !inputNumeroContato) {
        console.error("Elementos não encontrados.");
        return;
    }

    if (contatoCC.includes(inputNomeContato.value)) {
        alert(`O contato ${inputNomeContato.value} já foi adicionado`);
    } else {
        contatoCC.push(inputNomeContato.value);
        const numeroFormatado = mascaraTel(inputNumeroContato.value); // Aplicar a máscara antes de adicionar à lista
        numeroTel.push(numeroFormatado);

        const tabela = document.querySelector('table tbody');
        const novaLinha = tabela.insertRow();
        const colunaNome = novaLinha.insertCell(0);
        const colunaNumero = novaLinha.insertCell(1);

        colunaNome.innerText = inputNomeContato.value;
        colunaNumero.innerText = numeroFormatado; // Utilizar o número formatado na exibição na tabela
    }

    inputNomeContato.value = '';
    inputNumeroContato.value = '';
}

const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const tableRows = document.querySelectorAll('table tbody tr');

        tableRows.forEach(row => {
            const nome = row.cells[0].innerText.toLowerCase();
            const telefone = row.cells[1].innerText.toLowerCase();
            if (nome.includes(searchTerm) || telefone.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });