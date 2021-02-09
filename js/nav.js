//Quelques variables globales avec des valeurs dynamiques
var estEnHover = false;     // Détermine si la souris survole un bouton (utilisé pour le délai de réinitialisation en enlevant la souris au cas que l'utilisateur re-survole le bouton ou un autre durant le délai)
var aHoverUneFois = false;  // En raison d'un bogue avec l'initialisation des barres au démarrage de la page, on les initialise en boucle tant et aussi longtemps que l'utilisateur n'a pas encore survolé un bouton.
var burgerOuvert = false;   // Détermine si le menu burger est présentement ouvert

// Fonction d'initialisation du menu de naviguation (pour grand écran et pour mobile en même temps)
(function(){
    var barreHaut = document.getElementById("barre-haut");                                                                  // La barre mauve dans la naviguation grand écran
    var barreBas = document.getElementById("barre-bas");                                                                    // La barre jaune dans la naviguation grand écran

    var boutonsNav = document.getElementById("site-navigation").querySelectorAll("li.page_item");                           // Une liste des boutons de la naviguation
    var boutonsNavText = document.getElementById("site-navigation").querySelectorAll("a");                                  // Le texte des boutons de la naviguation
    var boutonsNavMobileBarres = document.getElementById("nav-menu-mobile").querySelectorAll(".barre_nav_mobile_group");    // Les groupes des barres en dessous des boutons de la naviguation version mobile (pour les montrer ou les cacher)
    var boutonsNavArr = Array.from(boutonsNav);                                                                             // On crée un tableau de la NodeList des boutons grand écran pour faciliter l'accès par script
    var boutonNavBurger = document.getElementById("primary-menu-burger");                                                   // On crée un tableau de la NodeList des boutons mobiles pour faciliter l'accès par script
    var boutonNavBurgerBouton = document.getElementById("primary-menu-burger-bouton");                                      // Le bouton burger pour accéder à la naviguation mobile

    var idBoutonOriginal = parseInt(document.getElementById("nav").getAttribute("data-pageid"));                            // Le ID du bouton original (celui de la page présentement active)
    var idBoutonASuivre = 0;                                                                                                // Le ID du bouton présentement à suivre pour les barres

    var timeout;                                                                                                            // Le timeout utilisé pour délayer la réinitialisation des barres lorsque l'utilisateur retire sa souris

    // Le premier bouton à suivre est le bouton original
    idBoutonASuivre = idBoutonOriginal;

    // Initialisation des couleurs des boutons
    boutonsNavText[idBoutonASuivre].style.color = "#6A07D2";
    boutonsNavText[idBoutonASuivre].style.fontWeight = "bold";
    boutonsNavText[idBoutonASuivre+4].style.color = "#DFC516";
    boutonsNavMobileBarres[idBoutonASuivre].style.display = "initial";

    // On ajoute les événements de hover sur tous les boutons (incluant mobile) à partir de leur index dans leur tableau
    for(var i = 0; i < boutonsNavArr.length; i++){

        // Événement de survol commencé
        boutonsNavArr[i].addEventListener("mouseenter", function (){
            estEnHover = true;
            idBoutonASuivre = boutonsNavArr.indexOf(this);
            DeplacerBarres(idBoutonASuivre, "", false, barreHaut, barreBas, boutonsNav);

            // On annule la réinitialisation des barres
            clearTimeout(timeout);
        });
    
        // Événement de fin de survol
        boutonsNavArr[i].addEventListener("mouseleave", function (){
            estEnHover = false;

            // Délai avant de réinitialiser les barres
            timeout = setTimeout(() => { 
                if(estEnHover == false)
                    DeplacerBarres(idBoutonOriginal, "cubic-bezier(.4,0,.45,1)", false, barreHaut, barreBas, boutonsNav);
            }, 500);
        });
    
        // Couleur des barres au clic d'un des boutons
        boutonsNavArr[i].addEventListener("mousedown", function(){
            barreHaut.style.backgroundColor = "#FFFFFF";
            barreBas.style.backgroundColor = "#FFFFFF";
        });
    
        // Couleur des barres à la fin d'un clic d'un des boutons
        boutonsNavArr[i].addEventListener("mouseup", function(){
            barreHaut.style.backgroundColor = "#FF04A1";
            barreBas.style.backgroundColor = "#DFC516";
        });
    
        // Réinitialisation de la couleur des barres si la souris s'en va du bouton avant de relâcher
        boutonsNavArr[i].addEventListener("mouseleave", function(){
            barreHaut.style.backgroundColor = "#FF04A1";
            barreBas.style.backgroundColor = "#DFC516";
        });
    }

    // pour une raison quelconque, il faut ajouter les styles et les events sur les éléments de la nav version burger après un petit délai
    setTimeout(() => { 
        boutonNavBurger.style.transform = "translate(100%, 0px)";
        boutonNavBurger.style.transition = "transform 0.5s";

        // Ajout de l'événement de clic du bouton burger
        boutonNavBurgerBouton.addEventListener("mousedown", function(){
            // console.log("AAAAAAAAAAA");
            // console.log(boutonNavBurger.style.transform.toString());

            //On ouvre ou ferme le menu selon la valeur ouverte ou fermée du menu burger
            if(burgerOuvert == false){
                boutonNavBurger.style.transform = "translate(0%, 0px)";
                boutonNavBurgerBouton.style.transform = "translate(-120%, 0) rotate(90deg)";
                burgerOuvert = true;
            }
            else{
                boutonNavBurger.style.transform = "translate(100%, 0px)";
                boutonNavBurgerBouton.style.transform = "translate(-120%, 0) rotate(0)";
                burgerOuvert = false;
            }
        });
    }, 100);

    // On doit redéplacer les barres si la fenêtre change de taille
    window.onresize = (function(){
        DeplacerBarres(idBoutonASuivre, "", false, barreHaut, barreBas, boutonsNav);

        // On déplace les barres immédiatement, puis une autre fois après un délai au cas où l'on passerai du mode grand écran à tablette ou vice versa (sinon, les barres vont être décalés)
        setTimeout(() => { 
            DeplacerBarres(idBoutonASuivre, "", false, barreHaut, barreBas, boutonsNav);
        }, 300);
    })

    // Fonction asynchronisé qui réinitialise les barres instantanément en boucle tant et aussi longtemps que l'utilisateur n'a pas encore hover sur l'un des boutons ou changer la page de taille
    async function BarresInitiales(){
        var timer = ms => new Promise(res => setTimeout(res, ms));  // Le timer utilisé pour le délai async

        // Réinitialisation des barres en boucle jusqu'au premier hover ou au changement de taille de la page
        while(aHoverUneFois == false){
            DeplacerBarres(idBoutonOriginal, "", true, barreHaut, barreBas, boutonsNav);
            await timer(100);
        }
    }

    BarresInitiales();  // On appelle la fonction async
})();


// Fonction qui déplace les barres d'un bouton à l'autre
function DeplacerBarres(idBouton, ease, initial, barreHautRef, barreBasRef, boutonsNavRef){

    // La transition est douce si ce n'est pas la réinitialisation initiale. Instantanée si oui.
    if(initial == false){
        barreHautRef.style.transition = "margin-left 1.5s, width 1s, background-color 0.1s";
        barreBasRef.style.transition = "margin-left 2.25s, width 1.5s, background-color 0.1s";
        aHoverUneFois = true;
    }
    else{
        barreHautRef.style.transition = "margin-left 0s, width 0s, background-color 0s";
        barreBasRef.style.transition = "margin-left 0s, width 0s, background-color 0s";
    }

    // Utilisation d'un easing défini par la fonction ou par défaut selon la valeur du paramètre de la fonction (si vide, on utilise par défaut)
    if(ease != ""){
        barreHautRef.style.transitionTimingFunction = ease;
        barreBasRef.style.transitionTimingFunction = ease;
    }
    else{
        barreHautRef.style.transitionTimingFunction = "cubic-bezier(.15,.66,.27,1)";
        barreBasRef.style.transitionTimingFunction = "cubic-bezier(.15,.66,.27,1)";
    }

    // Ajustement finale de la taille et de la position des barres de la naviguation
    barreHautRef.style.width = boutonsNavRef[idBouton].clientWidth + 25;
    barreBasRef.style.width = boutonsNavRef[idBouton].clientWidth -20;
    barreHautRef.style.marginLeft = boutonsNavRef[idBouton].offsetLeft - 25;
    barreBasRef.style.marginLeft = boutonsNavRef[idBouton].offsetLeft + 20;
}