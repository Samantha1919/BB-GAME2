let params = new URLSearchParams(document.location.search);
let h1 = document.getElementById("h1");
let h2 = document.getElementById("h2");
let color = params.get("color") ?? "yellow"; // le ?? sapelle "nullish coalescing operator" et il sert a donner une valeur par defaut
let objectColor = {
  // "un index" "recupere dcp genre yellow avec tout ce quil y a dans les accolades, recup la valeur de yellow"
  yellow: {
    backgroundColor: "#F7F4C8",
    h1: "#EB6E00",
    h2: "#EB6E00",
  },
  pink: {
    backgroundColor: "#eb8ed8",
    h1: "#7F1E65",
    h2: "#7F1E65",
  },
  blue: {
    backgroundColor: "#8ebfeb",
    h1: "#236CF4",
    h2: "#236CF4",
  },
  random: {
    backgroundColor: addRandomColor(),
    h1: addRandomColor(),
    h2: addRandomColor(),
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

let name = document.getElementById("bubbleTeaName");
name.textContent = localStorage.getItem("bubbleTeaName"); // le texte du h3 cest ca ...
name.style.color = objectColor.pink.h1;
const image = localStorage.getItem("monImage"); // image du verre du bubble tea
const image2 = document.getElementById("image2");
image2.src = image;
image2.style.backgroundColor = objectColor[color].backgroundColor;

const strawColor = localStorage.getItem("colorOfStraw"); // recup la couleur de la paille
const strawImage2 = document.getElementById("strawImage"); // recup lelement dans le html
if (strawColor !== "") {
  strawImage2.src = `/assets/straw-${strawColor}.svg`; // et dcp si c egal a rien bah tu fais rien
}

let imageFrame = document.getElementById("framePhoto");
imageFrame.src = localStorage.getItem("framePhoto"); // ca devrait etre get item

h1.style.color = objectColor[color].h1;
h2.style.color = objectColor[color].h2;

function downloadImage() {
  html2canvas(document.getElementById("global")).then((canvas) => {
    // on dit que le canvas c la div element html avec lid
    const imageFinal = canvas.toDataURL(); // transforme lelement en image base 64
    const link = document.createElement("a"); // a c pr la balise <a> html
    link.href = imageFinal; // le href dans la balise <a> href a linteirur ...
    link.download = "bubbletea.png"; // le nom de limage et son .
    document.body.appendChild(link); // fait apparaitre le lien tt en bas avant la fin du body mais on peut pas le voir
    link.click(); // ca fait un click sur le lien et permet de telcharger limage
    document.body.removeChild(link); // supp le lien mm si on le voit pas
  });
}

window.downloadImage = downloadImage;
