const criptomoedaInput = document.querySelector("#criptomoeda");
const valorMoeda = document.querySelector(".valor-moeda");
const valorQtde = document.querySelector(".valor-qtde");
const valorCompra = document.querySelector(".valor-compra");

const obterDados = body => {
    valorMoeda.textContent = Number(body.ticker.high).toLocaleString("pt-br",{style: "currency", currency: "BRL"});
    valorQtde.textContent = Number(body.ticker.vol).toLocaleString("pt-br", { maximumFractionDigits: 2 });
    valorCompra.textContent = Number(body.ticker.buy).toLocaleString("pt-br",{style: "currency", currency: "BRL"});
};

const tratarDados = resposta => {
    const promessaDados = resposta.json();

    promessaDados.then(obterDados);
};

const obterInfosCriptomoeda = () => {
    if (!criptomoedaInput?.value) {
        valorMoeda.textContent = "";
        valorQtde.textContent = "";
        valorCompra.textContent = "";

        return;
    }

    const promessaResposta = fetch(`https://www.mercadobitcoin.net/api/${criptomoedaInput?.value}/ticker/`);

    promessaResposta.then(tratarDados);
};

criptomoedaInput?.addEventListener("change", obterInfosCriptomoeda);
