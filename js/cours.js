fetch("data/cours.json")
  .then((reponse) => reponse.json())
  .then((lesCours) => {
    const ulCours = document.querySelector("#listeDesCours");
    // console.log(lesCours)
    var i = 1;
    for (const [indexSession, uneSession] of Object.entries(lesCours)) {
      // console.log(typeof uneSession)
      var nombreCours = 0;
      const elUneSession = document.createElement("div");
      elUneSession.classList = "sessions";
      elUneSession.innerHTML=`
      <div class="fleche ${indexSession}"onclick="montrerSession(${i})" ></div>
      `;
      const elLesCours = document.createElement("div");
      elLesCours.classList = "lesCours";
      elLesCours.dataset.valeur = 0;
      const numeroSession = document.createElement("h1");
      numeroSession.textContent = "Session " + i;
      elUneSession.appendChild(numeroSession);
      var lignes = document.createElement("div");
      lignes.classList = "lignes";
      elUneSession.appendChild(lignes);

      var boutonSession = document.createElement("div");
      boutonSession.classList = "bouton";
      elUneSession.appendChild(boutonSession);

      

      for (const unCours of uneSession) {
        
        if (unCours.length > 1) {
          const elUnCours = document.createElement("div");
          elUnCours.innerHTML = `
                            <div class="interior dropdown"> 
                                <a class="btn" href="#${unCours[0].nom}"><p class="textBtn">${unCours[0].nomCourt}</p></a>
                                <a class="btn cache" href="#${unCours[1].nom}"><p class="textBtn">${unCours[1].nomCourt}</p></a>
                                <div class="dots">
                                <div class="btnChoix active" onclick="changerCours(${i},${nombreCours},${1})"></div>
                                <div class="btnChoix" onclick="changerCours(${i},${nombreCours},${2})"></div> 
                                </div>
                            </div>
                        <div id="${unCours[0].nom}" class="modal-window" id="cover">
                        <div>
                        <a href="# +${unCours[0].nom}" title="Close" class="modal-close">X</a>
                        <div class="container">
                        <div>
                        <h1 class="titre">${unCours[0].nom}<br><p class="ponderation">${unCours[0].ponderation}</p></h1>
                        </div>
                        <p class="description" >${unCours[0].description}</p> 
                        <img src="${unCours[0].photo}" class="imgCours">
                        <div class="prerequis"> <p>Cours prérequis:</p> <br> <p>${unCours[0].prealabe}</p></div>
                        <div class="heures"> <p>Nombres d'heures:</p> <br> <p>${unCours[0].nombreHeure}</p></div>
                        </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div id="${unCours[1].nom}" class="modal-window cache" id="cover">
                <div>
                <a href="# +${unCours[1].nom}" title="Close" class="modal-close">X</a>
                <div class="container">
                <div>
                <h1 class="titre">${unCours[1].nom}<br><p class="ponderation">${unCours[1].ponderation}</p></h1>
                </div>
                <p class="description" >${unCours[1].description}</p>
                <img src="${unCours[1].photo}" class="imgCours">
                <div class="prerequis"> <p>Cours prérequis:</p> <br> <p>${unCours[1].prealabe}</p></div>
                <div class="heures"> <p>Nombres d'heures:</p> <br> <p>${unCours[1].nombreHeure}</p></div>
                </div>
                </div>
                </div>
            </div>
        </div>
                
              </div>`;
          elUnCours.classList = `dropdown ${indexSession}`
          elLesCours.appendChild(elUnCours);
          nombreCours++
        } else {
          const elUnCours = document.createElement("div");
          elUnCours.innerHTML = `
                        <div class="interior dropdown"> 
                            <a class="btn" href="#${unCours[0].nom}"><p class="textBtn">${unCours[0].nomCourt}</p></a>
                        </div>
                        <div id="${unCours[0].nom}" class="modal-window" id="cover">
                        <div>
                        <a href="# +${unCours[0].nom}" title="Close" class="modal-close">X</a>
                        
                        <div class="container">
                        <div>
                        <h1 class="titre">${unCours[0].nom}<br><p class="ponderation">${unCours[0].ponderation}</p></h1>
                        
                        </div>
                        <p class="description" >${unCours[0].description}</p>
                        <img src="${unCours[0].photo}" class="imgCours" >
                        <div class="prerequis"> <p>Cours prérequis:</p> <br> <p>${unCours[0].prealabe}</p></div>
                        <div class="heures"> <p>Nombres d'heures:</p> <br> <p>${unCours[0].nombreHeure}</p></div>
                        </div>
                        </div>
                        </div>
                    </div>
                </div>
              </div>`;
              elUnCours.classList = `dropdown ${indexSession}`
          elLesCours.appendChild(elUnCours);
          nombreCours++
        }
      }
      elUneSession.appendChild(elLesCours);

      let dropdownBtn = document.querySelectorAll(".fleche");
      console.log(dropdownBtn);
      //let menuContent = document.querySelectorAll('.dropdown');

      for (const dropD of dropdownBtn) {
        if (dropD.classList.contains(indexSession)) {
          document.querySelector(`ul ${indexSession}`).display = "block";
        }
      }

      ulCours.appendChild(elUneSession);
      i++;
      
    }


  });
  function montrerSession(session){
   var sessionChoisi = document.getElementsByClassName("sessions")[session-1];
   if(sessionChoisi.getElementsByClassName("lesCours")[0].dataset.valeur==0){
        sessionChoisi.getElementsByClassName("lesCours")[0].style="display:grid;";
        sessionChoisi.getElementsByClassName("lesCours")[0].removeAttribute('data-valeur');
        sessionChoisi.getElementsByClassName("lesCours")[0].dataset.valeur=1;
   }
   else{
    sessionChoisi.getElementsByClassName("lesCours")[0].style="display:none;";
    sessionChoisi.getElementsByClassName("lesCours")[0].removeAttribute('data-valeur');
    sessionChoisi.getElementsByClassName("lesCours")[0].dataset.valeur=0;
   }
}

function changerCours(session,cours,bouton){
  session-=1;
  selectionCours = document.getElementsByClassName("sessions")[session].lastElementChild.children[cours];
  if(bouton == 1){
    selectionCours.firstElementChild.lastElementChild.firstElementChild.classList.add("active");
    selectionCours.firstElementChild.lastElementChild.lastElementChild.classList.remove("active");
    selectionCours.firstElementChild.children[0].classList.remove("cache");
    selectionCours.firstElementChild.children[1].classList.add("cache");
    selectionCours.children[1].classList.remove("cache");
    selectionCours.children[2].classList.add("cache");


  }
  else if(bouton == 2){
    selectionCours.firstElementChild.lastElementChild.firstElementChild.classList.remove("active");
    selectionCours.firstElementChild.lastElementChild.lastElementChild.classList.add("active");
    selectionCours.firstElementChild.children[0].classList.add("cache");
    selectionCours.firstElementChild.children[1].classList.remove("cache");
    selectionCours.children[1].classList.add("cache");
    selectionCours.children[2].classList.remove("cache");
    
  }

}

