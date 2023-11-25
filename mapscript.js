// Sélectionne l'élément de la carte et le conteneur des popups
var map = document.getElementById("map");
var pokemonContainer = document.getElementById("pokemonContainer");

// Définit la structure de données des Pokémon
var pokemonData = [
    { name: "Excelsior", coords: [1350, 460], description: "Un Métalosse fantastique, membre de l'équipe de pokémon blanc 2." },
    { name: "Chrome", coords: [640, 230], description: "Un Magnézone chromatique de pokémon platine." },
    // Ajoute d'autres Pokémon avec leurs coordonnées
];

// Ajoute un gestionnaire d'événements au survol de la carte
map.addEventListener("mousemove", function (event) {
    console.log("Mouse moved over the map!");

    // Récupère les coordonnées de la souris
    var mouseX = event.clientX;
    var mouseY = event.clientY;

    console.log("Mouse coordinates:", mouseX, mouseY);

    // Récupère la position du coin supérieur gauche de la carte dans la fenêtre du navigateur
    var mapRect = map.getBoundingClientRect();
    var mapX = mapRect.left;
    var mapY = mapRect.top;

    // Ajuste les coordonnées de la souris par rapport à la position de la carte
    mouseX -= mapX;
    mouseY -= mapY;

    // Itère sur la structure de données pour vérifier si la souris est sur un Pokémon
    for (var i = 0; i < pokemonData.length; i++) {
        var pokemon = pokemonData[i];
        
        // Ajoute ce log pour voir les coordonnées de chaque Pokémon
        console.log("Pokemon coordinates:", pokemon.coords);


        // Utilise les coordonnées relatives à la carte du Pokémon
        var pokemonX = pokemon.coords[0];
        var pokemonY = pokemon.coords[1];

        if (isMouseOverPokemon(mouseX, mouseY, [pokemonX, pokemonY])) {
            console.log("Mouse over Pokemon:", pokemon.name);
            showPokemonPopup(pokemon.name, mouseX, mouseY);
        }
    }

    // Masque tous les popups s'il n'y a pas de survol
    hidePokemonPopups();
}
);

function isMouseOverPokemon(mouseX, mouseY) {
    var tolerance = 20; // Ajuste cela en fonction de la sensibilité souhaitée

    var mapRect = map.getBoundingClientRect();
    var scrollX = window.scrollX || window.pageXOffset;
    var scrollY = window.scrollY || window.pageYOffset;

    for (var i = 0; i < pokemonData.length; i++) {
        var pokemon = pokemonData[i];
        var pokemonX = pokemon.coords[0] - mapRect.left + scrollX;
        var pokemonY = pokemon.coords[1] - mapRect.top + scrollY;

        if (
            mouseX >= pokemonX - tolerance &&
            mouseX <= pokemonX + tolerance &&
            mouseY >= pokemonY - tolerance &&
            mouseY <= pokemonY + tolerance
        ) {
            // Retourne le Pokémon spécifique si la souris est au-dessus de celui-ci
            return pokemon;
        }
    }

    // Aucun Pokémon n'est survolé
    return false;
}

// Ajoute un gestionnaire d'événements au survol de la carte
map.addEventListener("mousemove", function (event) {
    // Récupère les coordonnées de la souris
    var mouseX = event.clientX;
    var mouseY = event.clientY;

    // Utilise la fonction isMouseOverPokemon pour vérifier si la souris est sur un Pokémon
    var hoveredPokemon = isMouseOverPokemon(mouseX, mouseY);

    if (hoveredPokemon) {
        // Si un Pokémon est survolé, affiche le popup du Pokémon
        console.log("Mouse over Pokemon:", hoveredPokemon.name);
        showPokemonPopup(hoveredPokemon.name, mouseX, mouseY);
    } else {
        // Si aucun Pokémon n'est survolé, masque tous les popups
        hidePokemonPopups();
    }
}
);

function showPokemonPopup(pokemonName, mouseX, mouseY) {
    var pokemonPopup = document.getElementById("popup-" + pokemonName);

    // Vérifie si le popup existe déjà
    if (!pokemonPopup) {
        // Crée l'élément du popup du Pokémon s'il n'existe pas
        pokemonPopup = createPokemonPopupElement(pokemonName);
        pokemonContainer.appendChild(pokemonPopup);
    }

    // Affiche le popup du Pokémon à la position de la souris
    pokemonPopup.style.display = "block";
    pokemonPopup.style.left = mouseX + "px";
    pokemonPopup.style.top = mouseY + "px";
}

// Fonction pour créer l'élément du popup du Pokémon
function createPokemonPopupElement(pokemon) {
    var pokemonPopup = document.createElement("div");
    pokemonPopup.id = "popup-" + pokemon.name;
    pokemonPopup.className = "pokemon-popup";
    pokemonPopup.innerHTML = `<strong>${pokemon.name}</strong><br>${pokemon.description}`;
    return pokemonPopup;
}
