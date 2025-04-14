// Pegamos a div onde os cards dos pokémons serão inseridos
const pokemonList = document.getElementById("pokemon-list");

// Função principal que carrega os 151 pokémons da PokéAPI
async function loadPokemons() {
  try {
    // Faz uma requisição para buscar os 151 primeiros pokémons
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const data = await response.json(); // Converte a resposta em JSON

    const pokemons = data.results; // Aqui temos um array com nome e URL de cada pokémon

    // Percorremos cada pokémon para buscar os dados completos (imagem, tipos, etc.)
    for (const pokemon of pokemons) {
      const res = await fetch(pokemon.url); // Faz uma nova requisição com a URL específica
      const pokeData = await res.json(); // Converte novamente a resposta em JSON

      // Chama a função que vai criar o card e mostrar na tela
      renderPokemonCard(pokeData);
    }
  } catch (error) {
    // Caso aconteça algum erro (ex: sem internet), mostramos no console
    console.error("Erro ao carregar os pokémons:", error);
  }
}

// Função que cria e insere um card de pokémon na tela
function renderPokemonCard(pokemon) {
  const card = document.createElement("div"); // Criamos uma div nova
  card.classList.add("pokemon-card"); // Adicionamos uma classe pra estilizar

  // Mapeamos os tipos do pokémon e criamos spans para cada um com classe e nome
  const types = pokemon.types.map(t => 
    `<span class="type ${t.type.name}">${t.type.name}</span>`
  ).join(""); // Unimos os spans em uma string só

  // Criamos o HTML do card com imagem, número, nome e tipos
  card.innerHTML = `
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
    <h3>#${String(pokemon.id).padStart(3, '0')}</h3>
    <p>${capitalize(pokemon.name)}</p>
    <div class="pokemon-types">${types}</div>
  `;

  // Adicionamos o card na lista principal da Pokédex
  pokemonList.appendChild(card);
}

// Função simples para colocar a primeira letra do nome em maiúscula
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Chamamos a função inicial para começar o carregamento dos pokémons
loadPokemons();