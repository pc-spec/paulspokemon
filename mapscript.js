var pokemonData = [
    { name: "Excelsior", coords: [450, 80], description: "Un Pokémon fantastique." },
    { name: "Chrome", coords: [640, 230], description: "Une sentinelle chromatique." },
    // Ajoute d'autres Pokémon avec leurs coordonnées
];

// Sélectionne l'élément de la carte et le conteneur des popups
var map = document.getElementById("map");
var pokemonContainer = document.getElementById("pokemonContainer");

// Ajoute un gestionnaire d'événements au survol de la carte
map.addEventListener("mousemove", function (event) {
    console.log("Mouse moved over the map!");
    // Récupère les coordonnées de la souris
    var mouseX = event.clientX;
    var mouseY = event.clientY;

    console.log("Mouse coordinates:", mouseX, mouseY);
    // Itère sur la structure de données pour vérifier si la souris est sur un Pokémon
    for (var i = 0; i < pokemonData.length; i++) {
        var pokemon = pokemonData[i];

        if (isMouseOverPokemon(mouseX, mouseY, pokemon.coords)) {
            console.log("Mouse over Pokemon:", pokemon.name);
            showPokemonPopup(pokemon.name, mouseX, mouseY);
        }
    }

    // Masque tous les popups s'il n'y a pas de survol
    hidePokemonPopups();
 }
);
                     
// Fonction pour vérifier si la souris est sur un Pokémon
function isMouseOverPokemon(mouseX, mouseY, pokemonCoords) {
    console.log("Checking if mouse is over Pokemon...");
    var tolerance = 20; // Ajuste cela en fonction de la sensibilité souhaitée
    return (
        mouseX >= pokemonCoords[0] - tolerance &&
        mouseX <= pokemonCoords[0] + tolerance &&
        mouseY >= pokemonCoords[1] - tolerance &&
        mouseY <= pokemonCoords[1] + tolerance
    );
}

// Fonction pour créer l'élément du popup du Pokémon
function createPokemonPopupElement(pokemon) {
    var pokemonPopup = document.createElement("div");
    pokemonPopup.id = "popup-" + pokemon.name;
    pokemonPopup.className = "pokemon-popup";
    pokemonPopup.innerHTML = `<strong>${pokemon.name}</strong><br>${pokemon.description}`;
    return pokemonPopup;
}

// Fonction pour afficher le popup du Pokémon
function showPokemonPopup(pokemonName, mouseX, mouseY) {
    // Crée ou récupère l'élément du popup du Pokémon
    var pokemonPopup = document.getElementById("popup-" + pokemon.name);
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

