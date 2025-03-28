
import {
  Engine,
  Render,
  Runner,
  Bodies,
  World,
  Body,
  Sleeping,
} from "matter-js";

let params = new URLSearchParams(document.location.search);
let color = params.get("color") ?? "default";
let objectColor = {
  "default":
  {
    "backgroundColor": "#F7F4C8",
    "groundColor": "#E6B143",
    "murGaucheColor": "#E6B143",
    "murDroiteColor": "#E6B143",
  },
  "pink":
  {
    "backgroundColor": "#eb8ed8",
    "groundColor":  "#Df47c9",
    "murGaucheColor":  "#Df47c9",
    "murDroiteColor":  "#Df47c9",
  },
  "blue":
  {
    "backgroundColor": "#8ebfeb",
    "groundColor": "#2328a3",
    "murGaucheColor": "#2328a3",
    "murDroiteColor": "#2328a3",
  },
  "random":
  {
    "backgroundColor": addRandomColor(),
    "groundColor": addRandomColor(),
    "murGaucheColor": addRandomColor(),
    "murDroiteColor": addRandomColor(),
  }
}

let choosenColor = objectColor[color]  // acceder param couleur actu
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
    width: 310,  // 620
    height: 425, // 850 
  },
});

const world = engine.world;

const ground = Bodies.rectangle(155, 410, 310, 30, {  // 310 820 620 60
  isStatic: true,
  render: {
    fillStyle: groundColor,
  },
});

const murGauche = Bodies.rectangle(7.5, 197.5, 15, 395, { // 15 395 30 790
  isStatic: true,
  render: {
    fillStyle: murGaucheColor,
  },
});

const murDroite = Bodies.rectangle(302.5, 197.5, 15, 395, { // 605 395 30 790
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
let bouton = document.getElementById("start-button");
let clique = false;

bouton.addEventListener("click", function () {
  clique = true;
});


function addRandomColor(){
  // recuper r g  b aleatoirement entre 0 et 255
  let R = Math.floor(Math.random() * 255);
  let G = Math.floor(Math.random() * 255);
  let B = Math.floor(Math.random() * 255);

  R = R.toString(16);
  G = G.toString(16);
  B = B.toString(16);

  return "#" + R + G + B;
}

function addFruitDebut() {  // fruit en haut à faire tomber

  const body = Bodies.circle(150, 50, 20, { // pk c render au lieu de options
    isSleeping: true,  // met le fruit en attente, au "dodo"
    render: {
      fillStyle: "black",
    },
  });

  fruitDebut = body;

  World.add(world, body);

}

// if (clique === false){
//   return; // si le bouton n'est pas cliqué ne rien fa
// }


window.onkeydown = (event) => {
  if (clique === false) {
    return;
  }
  switch (event.code) {   // switch choisit la condition possibles Right ou Left
    case "ArrowLeft":
      if (interval) return; // on peut mettre exit ou break ? 
      interval = setInterval(() => {
        if (fruitDebut.position.x + 20 > 70) // postion x > que la largeur du mur
          Body.setPosition(fruitDebut, {
            x: fruitDebut.position.x - 1,  // x postion actuelle -1 eneleve un pixel
            y: fruitDebut.position.y
          })     // y jsp g pas compris ce quil a dit

      }, 5);
      break;
    case "ArrowRight":
      if (interval) return;
      interval = setInterval(() => {
        if (fruitDebut.position.x + 20 < 590)   // postion x < que la largeur du mur
          Body.setPosition(fruitDebut, {
            x: fruitDebut.position.x + 1,       // x postion actuelle +1 ajoute un pixel
            y: fruitDebut.position.y,
          });
      }, 5);
      break;
    case "Space":
      if (disableAction) return;
      disableAction = true;
      Sleeping.set(fruitDebut, false);   // met isSleeping à false
      setTimeout(() => {   // on ajoute un timeout pr que ca fasse un temps dattente avant quil y ait un nv fruit 
        addFruitDebut();
        disableAction = false; // on la remet à false à la fin du timeout
      }, 1_000)
  }
}

window.onkeyup = (event) => {
  //console.log(event.code); // quand on relache la touche dcp up, ca stop l'intervalle dcp ca stop l'objet ca le freeze ca le laisse sur sa position
  switch (event.code) {
    case "ArrowLeft":
    case "ArrowRight": // pk on peut le mettre ici et on doit pas faire un 2eme window.onkeyup  
      clearInterval(interval);
      interval = null;  // on le remet sinon ca marchera plus commme  mon cas avant ca marchait quune seule fois qd jle bougeais
  }
}


function saveTapioca() {
  // remettre exactement les mm tapioca (nombre exact) sur la prochaine page
}

addFruitDebut();

quand jappuie sur la fleche


