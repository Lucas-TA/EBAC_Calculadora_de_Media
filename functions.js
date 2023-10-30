const form = document.getElementById('form');
const imgAprovado = '<img src="assets/aprovado.png" height="24px" alt="Emoji festejando">';
const imgReprovado = '<img src="assets/reprovado.png" height="24px" alt="Emoji decepcionado">';
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';

const notaMinima = parseFloat(prompt('Digite uma nota mínima'));

const atividades = [];
const notas = [];

let linhas = '';

form.addEventListener('submit', (e) => {
    e.preventDefault();
    adicionarAvaliacao() ;
    atualizaTabela();
    atualizaMediaFinal();
})

function adicionarAvaliacao() {
    const nomeAtividade = document.getElementById('atividade');
    const valorNota = document.getElementById('nota');

    if (valorNota.value < 0 || valorNota.value > 10 ) {
        alert('O valor da nota precisa ser entre 0 e 10!')
    } else if (atividades.includes(nomeAtividade.value)) {
        alert(`A atividade ${nomeAtividade.value} já foi inserida`)
    } else {
        atividades.push(nomeAtividade.value);
        notas.push(parseFloat(valorNota.value));
    
        let linha = '<tr>';
        linha += `<td>${nomeAtividade.value}</td>`;
        linha += `<td>${valorNota.value}</td>`
        linha += `<td>${valorNota.value >= notaMinima ? imgAprovado : imgReprovado}</td>`;
        linha += '</tr>';
    
        linhas += linha;
    }
    nomeAtividade.value = '';
    valorNota.value = '';    
}
function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

function atualizaMediaFinal() {
    const mediaFinal = calculaMedia();

    document.getElementById('media_final_valor').innerHTML = mediaFinal.toFixed(2);
    document.getElementById('media_final_resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calculaMedia() {
    let somaDasnotas = 0;

    for (let i = 0; i < notas.length; i++) {
        somaDasnotas += notas[i]
    }

    return somaDasnotas / notas.length
}