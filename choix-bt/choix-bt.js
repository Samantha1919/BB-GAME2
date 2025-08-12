let selected = "";

function selection(color) { // enft color c el nom que tu choiosis a lelement quon va prendre dcp avant ct un nombre et tu te bases sur ca pr appliquer cque tu veux aux elements
    let yellow = document.getElementById("yellow");
    let pink = document.getElementById("pink");
    let blue = document.getElementById("blue");
    let random = document.getElementById("random");
    let button = document.getElementById("next-btn");



    selected = color;

    if (selected == "yellow") {
        yellow.style.opacity = 1;
        pink.style.opacity = 0.5;
        blue.style.opacity = 0.5;
        random.style.opacity = 0.5;

    }
    if (selected == "pink") {
        yellow.style.opacity = 0.5;
        pink.style.opacity = 1;
        blue.style.opacity = 0.5;
        random.style.opacity = 0.5;
    }

    if (selected == "blue") {
        yellow.style.opacity = 0.5;
        pink.style.opacity = 0.5;
        blue.style.opacity = 1;
        random.style.opacity = 0.5;
    }

    if (selected == "random") {
        yellow.style.opacity = 0.5;
        pink.style.opacity = 0.5;
        blue.style.opacity = 0.5;
        random.style.opacity = 1;

    }

    button.style.opacity = 1; // de base en css jai mis le bouton en opacité 0.5 dcp la si tu fais nimporte quel choix ca le change en opacité 1 dcp il se met en 1 car tu as forvement une selection vu que tu es entré dans la fonction

}

function next() { // fonction qui regarde si il y a une selection dcp tu peux appuyer mais tant quil nen pas ca fera rien
    if (selected != "") { // si selected nest pas egal a rien (uen couleur est selectionne ) alors on peut aller sur le bb de la couleur choisie, sinon il se passe rien (dcp quand tu appuies sur le bouton ca fait rien)
        document.location.href = "../original/original.html?color=" + selected

    }
    // pas besoin de metter de else avec rien dedans psq de toute facon il se passera rien si il ny a pas de selection dcp cv dire que tu peux pas appuyer

}

