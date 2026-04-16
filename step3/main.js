function goToStep3() {
  // fonction qui est appelée au click de la touche espace et qui vérifie qu'il y a aumoins 1 tapioca de tombé

  h1.textContent = "Step 3";

  h2.textContent = "Choose your straw";

  disableAction = true;

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
}

window.goToStep3 = goToStep3; // "exporte" fin met la fonction pr quelle soit accessible vu que cest un type module
