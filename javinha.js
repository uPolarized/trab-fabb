let currentId = 1; // Começa do primeiro Pokémon

async function getPokemon() {
    const input = document.getElementById('pokemonInput').value.trim() || currentId;
    const url = `https://pokeapi.co/api/v2/pokemon/${input}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Pokémon não encontrado');
        }
        const data = await response.json();
        currentId = data.id; // Atualiza o ID atual
        displayPokemonData(data);
    } catch (error) {
        document.getElementById('pokemonData').innerHTML = `<p>${error.message}</p>`;
    }
}

function changePokemon(direction) {
    currentId += direction;
    getPokemonById(currentId);
}

async function getPokemonById(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Pokémon não encontrado');
        }
        const data = await response.json();
        displayPokemonData(data);
    } catch (error) {
        document.getElementById('pokemonData').innerHTML = `<p>${error.message}</p>`;
    }
}

function displayPokemonData(data) {
    const pokemonDataDiv = document.getElementById('pokemonData');
    const type = data.types[0].type.name; // Pega o primeiro tipo
    document.body.style.backgroundColor = getBackgroundColor(type); // Muda a cor do fundo

    pokemonDataDiv.innerHTML = `
        <h2>${capitalizeFirstLetter(data.name)} (#${data.id})</h2>
        <img src="${data.sprites.front_default}" alt="${data.name}">
        <p>Height: ${data.height / 10} m</p>
        <p>Weight: ${data.weight / 10} kg</p>
        <p>Type: ${data.types.map(typeInfo => capitalizeFirstLetter(typeInfo.type.name)).join(', ')}</p>
    `;
}

function getBackgroundColor(type) {
    switch (type) {
        case 'fire':
            return 'red';
        case 'water':
            return 'blue';
        case 'grass':
            return 'green';
        case 'electric':
            return 'yellow';
        case 'psychic':
            return 'pink';
        // Adicione mais tipos conforme necessário
        default:
            return 'bisque';
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
