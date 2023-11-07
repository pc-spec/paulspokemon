// script.js
const pokemons = document.querySelectorAll('li');

pokemons.forEach((pokemon) => {
    const popup = pokemon.querySelector('.popup');
    const img = pokemon.querySelector('img');

    img.addEventListener('mouseenter', () => {
        popup.style.display = 'block';
    });

    pokemon.addEventListener('mouseleave', () => {
        popup.style.display = 'none';
    });
});

