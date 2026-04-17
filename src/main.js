import {
  Engine, // moteur qui va calculer la position des elements, aplliquer la gravité, donenr des corrdonnéees qu'il y a dans le World
  Render,
  Runner,
  Bodies,
  World,
  Body,
  Sleeping,
} from "matter-js";

let params = new URLSearchParams(document.location.search);
let color = params.get("color") ?? "yellow"; // le ?? sapelle "nullish coalescing operator" et il sert a donner une valeur par defaut
let objectColor = {
  // "un index" "recupere dcp genre yellow avec tout ce quil y a dans les accolades, recup la valeur de yellow"
  yellow: {
    backgroundColor: "#F7F4C8",
    groundColor: "#E6B143",
    leftWallColor: "#E6B143",
    rightWallColor: "#E6B143",
    h1: "#EB6E00",
    h2: "#EB6E00",
  },
  pink: {
    backgroundColor: "#eb8ed8",
    groundColor: "#Df47c9",
    leftWallColor: "#Df47c9",
    rightWallColor: "#Df47c9",
    h1: "#7F1E65",
    h2: "#7F1E65",
  },
  blue: {
    backgroundColor: "#8ebfeb",
    groundColor: "#2328a3",
    leftWallColor: "#2328a3",
    rightWallColor: "#2328a3",
    h1: "#236CF4",
    h2: "#236CF4",
  },
  random: {
    backgroundColor: addRandomColor(),
    groundColor: addRandomColor(),
    leftWallColor: addRandomColor(),
    rightWallColor: addRandomColor(),
    h1: addRandomColor(),
    h2: addRandomColor(),
  },
};

let choosenColor = objectColor[color]; // acceder param couleur actu
let backgroundColor = choosenColor["backgroundColor"];
let groundColor = choosenColor["groundColor"];
let leftWallColor = choosenColor["leftWallColor"];
let rightWallColor = choosenColor["rightWallColor"];

console.log(objectColor[color]);

const engine = Engine.create();
const render = Render.create({
  engine,
  element: document.body,
  options: {
    wireframes: false,
    background: backgroundColor,
    width: 310, // 620
    height: 425, // 850
  },
});

const world = engine.world;

const ground = Bodies.rectangle(155, 410, 310, 30, {
  // 310 820 620 60
  isStatic: true,
  render: {
    fillStyle: groundColor,
  },
});

const leftWall = Bodies.rectangle(7.5, 197.5, 15, 395, {
  // 15 395 30 790
  isStatic: true,
  render: {
    fillStyle: leftWallColor,
  },
});

const rightWall = Bodies.rectangle(302.5, 197.5, 15, 395, {
  // 605 395 30 790
  isStatic: true,
  render: {
    fillStyle: rightWallColor,
  },
});

World.add(world, [ground, rightWall, leftWall]);

Render.run(render);
Runner.run(engine);

let button = document.getElementById("next-btn");
let tapiocaDebut = null;
let interval = null;
let disableAction = false;
let isButtonDisabled = true;

function addRandomColor() {
  // recuper r g  b aleatoirement entre 0 et 255
  let R = Math.floor(Math.random() * 255); // math random il genre un chiffre entre 0 et 1 dcp tu pexu faire 0,5 x 255
  let G = Math.floor(Math.random() * 255);
  let B = Math.floor(Math.random() * 255);

  R = R.toString(16);
  G = G.toString(16);
  B = B.toString(16); // retourne 16 psq c en héxadécimal mais dcp pk on a besoin de les changer en string

  return "#" + R + G + B; // prend le hasthag ren html
}

function addTapiocaDebut() {
  // booba en haut à faire tomber

  const body = Bodies.circle(150, 50, 20, {
    isSleeping: true, // met le fruit en attente, au "dodo"
    render: {
      fillStyle: "black",
    },
  });

  tapiocaDebut = body;

  World.add(world, body);
}

window.onkeydown = (event) => {
  switch (
    event.code // switch choisit la condition possibles Right ou Left
  ) {
    case "ArrowLeft":
      if (interval) return;
      interval = setInterval(() => {
        if (tapiocaDebut.position.x + 20 > 70)
          // postion x > que la largeur du mur
          Body.setPosition(tapiocaDebut, {
            x: tapiocaDebut.position.x - 1, // x postion actuelle -1 eneleve un pixel
            y: tapiocaDebut.position.y,
          });
      }, 5);
      break;
    case "ArrowRight":
      if (interval) return;
      interval = setInterval(() => {
        if (tapiocaDebut.position.x + 20 < 590)
          // postion x < que la largeur du mur
          Body.setPosition(tapiocaDebut, {
            x: tapiocaDebut.position.x + 1, // x postion actuelle +1 ajoute un pixel
            y: tapiocaDebut.position.y,
          });
      }, 5);
      break;
    case "Space":
      if (disableAction) return;
      disableAction = true;
      Sleeping.set(tapiocaDebut, false); // met isSleeping à false
      // Si le bouton est disabled
      if (isButtonDisabled) {
        button.disabled = false;
        isButtonDisabled = false;
      }
      button.style.opacity = 1; // vu que quand on appuie sur espace ca fait tomber un tapioca donc le bouton se met en opacité 1
      setTimeout(() => {
        // on ajoute un timeout pr que ca fasse un temps dattente avant quil y ait un nv fruit
        addTapiocaDebut();
        disableAction = false; // on la remet à false à la fin du timeout
      }, 1_000);
  }
};

window.onkeyup = (event) => {
  //console.log(event.code); // quand on relache la touche dcp up, ca stop l'intervalle dcp ca stop l'objet ca le freeze ca le laisse sur sa position
  switch (event.code) {
    case "ArrowLeft":
    case "ArrowRight":
      clearInterval(interval);
      interval = null; // on le remet sinon ca marchera plus commme  mon cas avant ca marchait quune seule fois qd jle bougeais
  }
};

function saveBubbleTea() {
  let canvas = document.getElementsByTagName("canvas")[0]; // on choisit celui quon recup (le 1er ct un truc bzr genre la longueur)
  const dataURL = canvas.toDataURL(); // fonction qui va save l'image du bubble tea aevc le bon nombre de tapioca dedans
  console.log(dataURL); // le console.log renvoie des chiffres des lettres et des operateurs bzr
  localStorage.setItem("monImage", dataURL); // met le dataURL dans un element qui sapelle monImage
  document.location.href = "/step3/index.html?color=" + color;
}

addTapiocaDebut();

// let intitule = document.getElementById("regle"); au debut javais mis ca vu que les 2 h sont de la meme couleur mais la je les separent pour changer le texte de chacun des 2
let h1 = document.getElementById("h1");
let h2 = document.getElementById("h2");

h1.style.color = objectColor[color].h1; // recupere la couleur mise dans la classe de la couleur attribue et lapllique en js sur le h1 et h2
h2.style.color = objectColor[color].h2;

window.saveBubbleTea = saveBubbleTea; // exporte la fonction
