import * as model from './model.js'
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime'

const recipeContainer = document.querySelector('.recipe');

const showRecipe = async function() {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    recipeView.renderSpinner();

    //Cargando Receta
    await model.loadRecipe(id);
    
    //Renderizando receta
    recipeView.render(model.state.recipe);

  } catch (err){
    alert(err)
  }
};

['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe));

///////////////////////////////////////
