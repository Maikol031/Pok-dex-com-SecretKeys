
const pokeImg = document.querySelector('.pokemon-img')
const namePokemon = document.querySelector('.name-pokemon')
const idPokemon = document.querySelector('.id-pokemon')
const inputSearch = document.querySelector('.input-search');
const type1 = document.querySelector('.type-1-span');
const type2 = document.querySelector('.type-2-span');
const typeColor = document.querySelector('.type-1');
const typeColor2 = document.querySelector('.type-2');
const typesAndColors = {
    normal: '#a8a878',
    fire: '#f08030',
    water: '#6890f0',
    electric: '#f8d030',
    grass: '#78c850',
    ice: '#98d8d8',
    fighting: '#c03028',
    poison: '#a040a0',
    ground: '#e0c068',
    flying: '#a890f0',
    psychic: '#f85888',
    bug: '#a8b820',
    rock: '#b8a038',
    ghost: '#705898',
    dragon: '#7038f8',
    dark: '#705848',
    steel: '#b8b8d0',
    fairy: '#f0b6bc'
};


inputSearch.style.display = 'none';

let next = 1
let secretUp = 0
let secretDown = 0

async function fetchPokemon(pokemon){
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`, {
            method: "GET"
        })
        
        const data = await response.json()
        return data
    } catch (error) {
        idPokemon.innerHTML = ""
        namePokemon.innerHTML = 'Not Found :('
        pokeImg.src = ""
        typeColor.style.display = 'none';
        typeColor2.style.display = 'none';
    }
}

async function pokeImageRender(pokemon) {
    typeColor.style.display = 'inline';
    typeColor2.style.display = 'inline';
    const data = await fetchPokemon(pokemon)
    idPokemon.innerHTML = data.id
    namePokemon.innerHTML = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    pokeImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    const type1Name = data.types[0].type.name
    type1.innerHTML = type1Name
    typeColor.style.backgroundColor = typesAndColors[type1Name]
    const type2Name = data.types[1].type.name
    type2.innerHTML = type2Name
    typeColor2.style.backgroundColor = typesAndColors[type2Name]
}

pokeImageRender(1)

const nextPoke = () => {
    next++
    pokeImageRender(next)
}

const previusPoke = () => {
    if(next > 1) next--
    pokeImageRender(next)
}

const confirmSecret = () => {
    if(secretUp === 2 && secretDown === 1){
        inputSearch.style.display = 'flex';
    }
    if(secretUp === 1 && secretDown === 2){
        inputSearch.style.display = 'none';
        next = 1
        pokeImageRender(1)
    }
}

const upKey = () => {
    secretUp++
    setTimeout(()=> {
        secretUp = 0
    }, 5000)
}

const downKey = () => {
    secretDown++
    setTimeout(()=> {
        secretDown = 0
    }, 5000)
    if(secretDown === 4){
        pokeImageRender(1)
    }
}

inputSearch.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const inputValue = inputSearch.value;
        const inputValueFormatted = inputValue.toLowerCase()
        pokeImageRender(inputValueFormatted)
        event.preventDefault();
    }
});