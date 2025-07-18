let selected = "";

function selection(color){ // enft color c el nom que tu choiosis a lelement quon va prendre dcp avant ct un nombre et tu te bases sur ca pr appliquer cque tu veux aux elements
    let yellow = document.getElementById("yellow");
    let pink = document.getElementById("pink");
    let blue =document.getElementById("blue");
    let random = document.getElementById("random");
    let button = document.getElementById("next-btn");

    

    selected = color;

    if (selected == "yellow"){
        yellow.style.opacity=1;
        pink.style.opacity=0.5;
        blue.style.opacity=0.5;
        random.style.opacity=0.5;
        
    }
    if (selected == "pink"){
        yellow.style.opacity=0.5;
        pink.style.opacity=1;
        blue.style.opacity=0.5;
        random.style.opacity=0.5;
    }

     if (selected == "blue"){
        yellow.style.opacity=0.5;
        pink.style.opacity=0.5;
        blue.style.opacity=1;
        random.style.opacity=0.5;
    }

    if (selected == "random"){
        yellow.style.opacity=0.5;
        pink.style.opacity=0.5;
        blue.style.opacity=0.5;
        random.style.opacity=1;
       
    }

    button.style.opacity=1;

}

function next(){
    if (selected != ""){
        document.location.href="../original/original.html?color="+selected

    }
    // pas besoin de metter de else avec rien dedans psq de toute facon il se passera rien si il ny a pas de selection dcp cv dire que tu peux pas appuyer
   
}

