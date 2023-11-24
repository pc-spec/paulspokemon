var pokemonData = [
    { name: "Excelsior", coords: [1345, 460], description: "Un Pokémon fantastique." },
    // Ajoute d'autres Pokémon avec leurs coordonnées
];

// Sélectionne l'élément de la carte et le conteneur des popups
var map = document.getElementById("map");
var pokemonContainer = document.getElementById("pokemonContainer");

// Ajoute un gestionnaire d'événements au survol de la carte
map.addEventListener("mousemove", function (event) {
    // Récupère les coordonnées de la souris
    var mouseX = event.clientX;
    var mouseY = event.clientY;

    // Itère sur la structure de données pour vérifier si la souris est sur un Pokémon
    for (var i = 0; i < pokemonData.length; i++) {
        var pokemon = pokemonData[i];

        if (isMouseOverPokemon(mouseX, mouseY, pokemon.coords)) {
            // Affiche le popup du Pokémon à la position de la souris
            showPokemonPopup(pokemon.name, mouseX, mouseY);
        }
    }

    // Masque tous les popups s'il n'y a pas de survol
    hidePokemonPopups();
});

// Fonction pour vérifier si la souris est sur un Pokémon
function isMouseOverPokemon(mouseX, mouseY, pokemonCoords) {
    var tolerance = 20; // Ajuste cela en fonction de la sensibilité souhaitée
    return (
        mouseX >= pokemonCoords[0] - tolerance &&
        mouseX <= pokemonCoords[0] + tolerance &&
        mouseY >= pokemonCoords[1] - tolerance &&
        mouseY <= pokemonCoords[1] + tolerance
    );
}

// Fonction pour afficher le popup du Pokémon
function showPokemonPopup(pokemonName, mouseX, mouseY) {
    // Crée ou récupère l'élément du popup du Pokémon
    var pokemonPopup = document.getElementById("popup-" + pokemonName);
    if (!pokemonPopup) {
        pokemonPopup = createPokemonPopupElement(pokemonName);
        pokemonContainer.appendChild(pokemonPopup);
    }

    // Affiche le popup du Pokémon à la position de la souris
    pokemonPopup.style.display = "block";
    pokemonPopup.style.left = mouseX + "px";
    pokemonPopup.style.top = mouseY + "px";
}

// Fonction pour masquer tous les popups
function hidePokemonPopups() {
    // Itère sur tous les popups et les masque
    var popups = document.querySelectorAll(".pokemon-popup");
    for (var i = 0; i < popups.length; i++) {
        popups[i].style.display = "none";
    }
}

// Fonction pour créer l'élément du popup du Pokémon
function createPokemonPopupElement(pokemon) {
    var pokemonPopup = document.createElement("div");
    pokemonPopup.id = "popup-" + pokemon.name;
    pokemonPopup.className = "pokemon-popup";
    pokemonPopup.innerHTML = `<strong>${pokemon.name}</strong><br>${pokemon.description}`;
    return pokemonPopup;
}

