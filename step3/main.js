let params = new URLSearchParams(document.location.search);
let color = params.get("color") ?? "yellow"; // le ?? sapelle "nullish coalescing operator" et il sert a donner une valeur par defaut
let objectColor = {
  // "un index" "recupere dcp genre yellow avec tout ce quil y a dans les accolades, recup la valeur de yellow"
  yellow: {
    backgroundColor: "#F7F4C8",
  },
  pink: {
    backgroundColor: "#eb8ed8",
  },
  blue: {
    backgroundColor: "#8ebfeb",
  },
  random: {
    backgroundColor: addRandomColor(),
  },
};

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

function goToStep3() {
  const colors = ["pink", "yellow", "blue", "random"];

  const paillesDiv = document.getElementById("step3");

  for (let color of colors) {
    console.log("color", color);
    const nouvellePaille = document.createElement("img"); // cree un element dom et ca cree comme une image img en html fabrique un nouvel element html en js
    nouvellePaille.src = `/assets/${color}-straw.svg`;
    nouvellePaille.onclick = () => chooseStraw(color);
    paillesDiv.appendChild(nouvellePaille); // rend visible limage, l'élément construit dans la div dcp
    nouvellePaille.width = 175;
    nouvellePaille.height = 200;
  }

  const image = localStorage.getItem("monImage");
  const image2 = document.getElementById("image2");
  image2.src = image;
  image2.style.backgroundColor = objectColor[color].backgroundColor;
}

window.goToStep3 = goToStep3; // "exporte" fin met la fonction pr quelle soit accessible vu que cest un type module
