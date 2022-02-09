const cepInput = document.querySelector("#cep");
const cidadeInput = document.querySelector("#cidade");
const ruaInput = document.querySelector("#rua");
const divErroInfo = document.querySelector("#erro-info");
const pErroCepQtdeDigitos = document.querySelector("#erro-qtde-digitos");
const pErroCepInexistente = document.querySelector("#erro-cep-inexistente");

const limparInputValue = () => {
    cidadeInput.value = "";
    ruaInput.value = "";
};

const mostrarDivErro = () => {
    const temEscondidoDiv = divErroInfo.classList.contains("escondido");

    if (temEscondidoDiv) {
        divErroInfo.classList.remove("escondido");
    }
};

const mostrarErroCepQtdeDigitos = () => {
    const temEscondidoP = pErroCepInexistente.classList.contains("escondido");

    mostrarDivErro();

    pErroCepQtdeDigitos.classList.remove("escondido");

    if (!temEscondidoP) {
        pErroCepInexistente.classList.add("escondido");
    }
};

const mostrarErroCepInexistente = () => {
    const temEscondidoP = pErroCepQtdeDigitos.classList.contains("escondido");

    mostrarDivErro();

    if (!temEscondidoP) {
        pErroCepQtdeDigitos.classList.add("escondido");
    }

    pErroCepInexistente.classList.remove("escondido");
};

const obterDados = corpo => {
    console.log(corpo.erro);
    console.log(corpo);
    if (!corpo.erro) {
        divErroInfo.classList.add("escondido");
        
        cidadeInput.value = corpo.localidade;
        ruaInput.value = corpo.logradouro + " - " + corpo.bairro;
        return;
    }

    mostrarErroCepInexistente();

    limparInputValue();
};

const tratarDados = resposta => {
    if (!resposta.ok) {
        console.log("CEP informado é inconsistente.");
    }

    const promessaCorpo = resposta.json();

    promessaCorpo.then(obterDados);
};

const obterInfosCep = () => {
    if (cepInput.value.length === 8) {
        divErroInfo.classList.add("escondido");

        const promessaResposta = fetch(`https://viacep.com.br/ws/${cepInput.value}/json/`);
        
        promessaResposta.then(tratarDados);
        return;
    }
    
    mostrarErroCepQtdeDigitos();

    limparInputValue();
};

cepInput.addEventListener("change", obterInfosCep);

