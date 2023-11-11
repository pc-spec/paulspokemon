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

const pokemons = document.querySelectorAll('li');

pokemons.forEach((pokemon) => {
    const popup = pokemon.querySelector('.popup');
    pokemon.addEventListener('mouseenter', () => {
        const rect = pokemon.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Vérifie s'il y a suffisamment d'espace en dessous
        if (rect.bottom + popup.clientHeight > windowHeight) {
            // Si non, affiche le pop-up vers le haut
            popup.style.bottom = '100%';
        } else {
            // Sinon, affiche le pop-up vers le bas
            popup.style.bottom = '';
        }

        popup.style.display = 'block';
    });

    pokemon.addEventListener('mouseleave', () => {
        popup.style.display = 'none';
    });
});
