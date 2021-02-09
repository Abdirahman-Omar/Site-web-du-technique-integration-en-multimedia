
Vue.use(httpVueLoader);

//configuration pour utiliser sass, pas obligatoire si vous utilisez juste css
let sass = new Sass();

//configuration de sass, pas besoin d'y toucher c'est juste un copier collé , ca fonctionne tel quel
httpVueLoader.langProcessor.scss = function (scssText) {
  return new Promise(function (resolve, reject) {
    sass.compile(scssText, function (result) {
      if (result.status === 0) resolve(result.text);
      else reject(result);
    });
  });
};

Vue.use(VueMarkdown);

// //initialisation de vue. la seule chose nécéssaire pour que vue fonctionne !
// new Vue({
//   el: "#app",
//   // il faut que je dise quels composant j'utilise dans ma page et leur url
//   components: {
//     "mon-app": httpVueLoader("js/app.vue"),
    
//   },
// });

new Vue({
  el: "#grille-profs",
  // il faut que je dise quels composant j'utilise dans ma page et leur url
  components: {
    "grille-prof" : httpVueLoader("js/grilleEquipe.vue")
    
  },
});


