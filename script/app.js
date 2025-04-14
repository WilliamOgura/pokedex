// Pegamos a div onde os cards dos pokémons serão inseridos
const pokemonList = document.getElementById("pokemon-list");
const searchInput = document.getElementById("pokemon-search");
let allPokemons=[];

// Função para buscar os 151 pokémons
const fetchPokemons = async () => {
  try {
    for(let i=1; i <=151; i++) {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
      const data = await res.json();

      const pokemon = {
        name: data.name,
        number: data.id.toString().padStart(3,"0"),
        image: data.sprites.front_default,
        types: data.types.map(t => t.type.name)
      } 
      allPokemons.push(pokemon);
    }
    displayPokemons(allPokemons);
    
  } catch (error) {
    console.error("Pokemon não encontrado", error);
    pokemonList.innerHTML = `<p>Erro ao carregar pokémon. Tente novamente mais tarde</p>`
  } 
}

function displayPokemons(pokemons) {
  pokemonList.innerHTML = ""; // Limpa a lista atual

  pokemons.forEach(pokemon => {
    // Cria um card personalizado com os dados simplificados do fetchPokemons()
    const card = document.createElement("div");
    card.classList.add("pokemon-card");

    const typeTags = pokemon.types.map(type => 
    `<span class="type ${type}">${type}</span>`
    ).join("")

    card.innerHTML = `
      <img src="${pokemon.image}" alt="${pokemon.name}" />
      <h3>#${pokemon.number}</h3>
      <p>${capitalize(pokemon.name)}</p>
      <div class="pokemon-types">${typeTags}</div>
    `;

    pokemonList.appendChild(card);
  });
}

// Função para colocar a primeira letra do nome em maiúscula
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

searchInput.addEventListener("input", (event) => {
  const query = event.target.value.toLowerCase();

  const filtered = allPokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(query) ||
    pokemon.number.includes(query)
  );

  displayPokemons(filtered)
})

// Chamamos a função inicial para começar o carregamento dos pokémons
fetchPokemons();
