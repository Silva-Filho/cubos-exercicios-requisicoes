const pokemonEscolhido = document.querySelector("#pokemons");
const nomePokemon = document.querySelector(".container h2");
const imagemPokemon = document.querySelector(".container img");
const habilidadesPokemon = document.querySelector(".container p");

const obterDados = body => {
    nomePokemon.textContent = body.name[0].toUpperCase() + body.name.slice(1);
    imagemPokemon.src = body.sprites.other["official-artwork"].front_default;
    imagemPokemon.alt = body.name;
    habilidadesPokemon.textContent = "Habilidade primária: " + body.abilities[0].ability.name;
};

const tratarDados = resposta => {
    const promessaDados = resposta.json();

    promessaDados.then(obterDados);
};

const obterInfosPokemon = () => {
    if (!pokemonEscolhido?.value) {
        nomePokemon.style.display = "none";
        imagemPokemon.style.display = "none";
        habilidadesPokemon.style.display = "none";

        return;
    } else {
        nomePokemon.style.display = "block";
        imagemPokemon.style.display = "block";
        habilidadesPokemon.style.display = "block";
    }

    const promessaResposta = fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonEscolhido.value}`);

    /* promessaResposta.ok == true, obteve-se resposta da API, ou seja, foi encontrado. */
    promessaResposta.then(tratarDados);
};

pokemonEscolhido?.addEventListener("change", obterInfosPokemon);
