// Simple fonction anonyme pour initialiser la flèche à côté du "Commencez à explorer notre programme" de la page d'accueil version grand écran
(function(){
    var flecheProgramme = document.getElementById("fleche-programme-wrapper");
    var lienProgramme = document.getElementById("site-subtitle");

    lienProgramme.addEventListener("mouseenter", function(){
        flecheProgramme.style.transitionTimingFunction = "cubic-bezier(.21,.92,.5,1)";
        flecheProgramme.style.transform = "translateX(5%)";
    });
    lienProgramme.addEventListener("mouseleave", function(){
        flecheProgramme.style.transitionTimingFunction = "cubic-bezier(.5,0,.79,.08)";
        flecheProgramme.style.transform = "translateX(-2%)";
    });
})();

