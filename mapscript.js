var pokemonData = [
    { name: "Excelsior", coords: [1350, 460], description: "Un Pokémon fantastique." },
    { name: "Chrome", coords: [640, 230], description: "Une sentinelle chromatique." },
    // Ajoute d'autres Pokémon avec leurs coordonnées
];

var map = document.getElementById("map");
var pokemonContainer = document.getElementById("pokemonContainer");

map.addEventListener("mousemove", function (event) {
    var mouseX = event.clientX;
    var mouseY = event.clientY;

    var mapRect = map.getBoundingClientRect();

    mouseX -= mapRect.left;
    mouseY -= mapRect.top;

    for (var i = 0; i < pokemonData.length; i++) {
        var pokemon = pokemonData[i];

        var pokemonX = pokemon.coords[0] - mapRect.left;
        var pokemonY = pokemon.coords[1] - mapRect.top;

        if (isMouseOverPokemon(mouseX, mouseY, [pokemonX, pokemonY])) {
            showPokemonPopup(pokemon.name, mouseX, mouseY);
        }
    }

    hidePokemonPopups();
    
}
);

function isMouseOverPokemon(mouseX, mouseY, pokemonCoords) {
    var tolerance = 20;
    return (
        mouseX >= pokemonCoords[0] - tolerance &&
        mouseX <= pokemonCoords[0] + tolerance &&
        mouseY >= pokemonCoords[1] - tolerance &&
        mouseY <= pokemonCoords[1] + tolerance
    );
}

function createPokemonPopupElement(pokemon) {
    var pokemonPopup = document.createElement("div");
    pokemonPopup.id = "popup-" + pokemon.name;
    pokemonPopup.className = "pokemon-popup";
    pokemonPopup.innerHTML = `<strong>${pokemon.name}</strong><br>${pokemon.description}`;
    return pokemonPopup;
}

function showPokemonPopup(pokemonName, mouseX, mouseY) {
    var pokemonPopup = document.getElementById("popup-" + pokemonName) || createPokemonPopupElement({ name: pokemonName });
    
    pokemonPopup.style.display = "block";
    pokemonPopup.style.left = mouseX + "px";
    pokemonPopup.style.top = mouseY + "px";

    pokemonContainer.appendChild(pokemonPopup);
}

function hidePokemonPopups() {
    var popups = document.querySelectorAll(".pokemon-popup");
    popups.forEach(function (popup) {
        popup.style.display = "none";
    });
}

