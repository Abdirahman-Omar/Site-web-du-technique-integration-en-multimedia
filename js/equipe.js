function poppup()
{
document.getElementById("popup").style.display = "grid";
document.getElementById("cover").style.display = "block";
document.getElementById("popup").style.animation="popupOpen 0.5s"
}

function fermerPopUp()
{       
        document.getElementById("popup").style.animation="popupClose 0.3s"
        setTimeout(function() {
          document.getElementById("popup").style.display = "none";
        }, 300);
        
        document.getElementById("cover").style.display = "none";
}