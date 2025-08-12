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
    murGaucheColor: "#E6B143",
    murDroiteColor: "#E6B143",
    intitule: "#EB6E00",
  },
  pink: {
    backgroundColor: "#eb8ed8",
    groundColor: "#Df47c9",
    murGaucheColor: "#Df47c9",
    murDroiteColor: "#Df47c9",
    intitule: "#7F1E65",
  },
  blue: {
    backgroundColor: "#8ebfeb",
    groundColor: "#2328a3",
    murGaucheColor: "#2328a3",
    murDroiteColor: "#2328a3",
    intitule: "#236CF4",
  },
  random: {
    backgroundColor: addRandomColor(),
    groundColor: addRandomColor(),
    murGaucheColor: addRandomColor(),
    murDroiteColor: addRandomColor(),
    intitule: addRandomColor(),
  },
};

let choosenColor = objectColor[color]; // acceder param couleur actu
let backgroundColor = choosenColor["backgroundColor"];
let groundColor = choosenColor["groundColor"];
let murGaucheColor = choosenColor["murGaucheColor"];
let murDroiteColor = choosenColor["murDroiteColor"];

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

const murGauche = Bodies.rectangle(7.5, 197.5, 15, 395, {
  // 15 395 30 790
  isStatic: true,
  render: {
    fillStyle: murGaucheColor,
  },
});

const murDroite = Bodies.rectangle(302.5, 197.5, 15, 395, {
  // 605 395 30 790
  isStatic: true,
  render: {
    fillStyle: murDroiteColor,
  },
});

World.add(world, [ground, murDroite, murGauche]);

Render.run(render);
Runner.run(engine);

let fruitDebut = null;
let interval = null;
let disableAction = false;
let clique = false;

function addRandomColor() {
  // recuper r g  b aleatoirement entre 0 et 255
  let R = Math.floor(Math.random() * 255);
  let G = Math.floor(Math.random() * 255);
  let B = Math.floor(Math.random() * 255);

  R = R.toString(16);
  G = G.toString(16);
  B = B.toString(16);

  return "#" + R + G + B;
}

function addFruitDebut() {
  // fruit en haut à faire tomber

  const body = Bodies.circle(150, 50, 20, {
    // pk c render au lieu de options
    isSleeping: true, // met le fruit en attente, au "dodo"
    render: {
      fillStyle: "black",
    },
  });

  fruitDebut = body;

  World.add(world, body);
}

let aumoinsUnTapioca = false;
let button = document.getElementById("next-btn");

// if (clique === false){
//   return; // si le bouton n'est pas cliqué ne rien fa
// }

// au lieu de metrre les chiffres en dur il faudrait mettre des variables pour que le code soit + explicite

window.onkeydown = (event) => {
  switch (
    event.code // switch choisit la condition possibles Right ou Left
  ) {
    case "ArrowLeft":
      if (interval) return; // on peut mettre exit ou break ?
      interval = setInterval(() => {
        if (fruitDebut.position.x + 20 > 70)
          // postion x > que la largeur du mur
          Body.setPosition(fruitDebut, {
            x: fruitDebut.position.x - 1, // x postion actuelle -1 eneleve un pixel
            y: fruitDebut.position.y,
          }); // y jsp g pas compris ce quil a dit
      }, 5);
      break;
    case "ArrowRight":
      if (interval) return;
      interval = setInterval(() => {
        if (fruitDebut.position.x + 20 < 590)
          // postion x < que la largeur du mur
          Body.setPosition(fruitDebut, {
            x: fruitDebut.position.x + 1, // x postion actuelle +1 ajoute un pixel
            y: fruitDebut.position.y,
          });
      }, 5);
      break;
    case "Space":
      if (disableAction) return;
      disableAction = true;
      Sleeping.set(fruitDebut, false); // met isSleeping à false
      aumoinsUnTapioca = true;
      button.style.opacity = 1; // vu que quand on appuie sur espace ca fait tomber un tapioca donc le bouton se met en opacité 1
      setTimeout(() => {
        // on ajoute un timeout pr que ca fasse un temps dattente avant quil y ait un nv fruit
        addFruitDebut();
        disableAction = false; // on la remet à false à la fin du timeout
      }, 1_000);
  }
};

function xx() {
  // fonction qui est appelée au click de la touche espace et qui vérifie qu'il y a aumoins 1 tapioca de tombé
  console.log("test");

  if (aumoinsUnTapioca == true) {
    saveTapioca();
  }

  h2.textContent = "test";
  console.log(h2);

  // pas besopin de mettre de else vu que si y a pas de tapioca il ne fait rien
}

window.xx = xx; // "exporte" fin met la fonction pr quelle soit accessible vu que cest un type module

window.onkeyup = (event) => {
  //console.log(event.code); // quand on relache la touche dcp up, ca stop l'intervalle dcp ca stop l'objet ca le freeze ca le laisse sur sa position
  switch (event.code) {
    case "ArrowLeft":
    case "ArrowRight":
      clearInterval(interval);
      interval = null; // on le remet sinon ca marchera plus commme  mon cas avant ca marchait quune seule fois qd jle bougeais
  }
};

function saveTapioca() {
  // remettre exactement les mm tapioca (nombre exact) sur la prochaine page
  // recuperer limage du canvas
  let canvas = document.getElementsByTagName("canvas")[0];
  const dataURL = canvas.toDataURL(); // fonction qui va save l'image du bubble tea aevc le bon nombre de tapioca dedans
  console.log(dataURL); // le console.log renvoie des chiffres des lettres et des operateurs bzr
}

addFruitDebut();

let intitule = document.getElementById("regle"); // cest le h1 mais vu que les 2 h sont de la meme couleur g mis une variabke (un id) pr les 2
let h2 = document.getElementById("h2");

intitule.style.color = objectColor[color].intitule; // recupere la couleur mise dans la classe de la couleur attribue et lapllique en js sur le h1 et h2
h2.style.color = objectColor[color].intitule; // dmd pk on doit le mettre en barre 56 et pas parantheses // vu que les 2 h sont de la meme coouleur je pourrais juste mettre un id pr les 2 et dcp changer le nom h2 a la fin
