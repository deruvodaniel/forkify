import * as model from './model.js'
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime'
import { async } from 'regenerator-runtime';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // Actualizar resultados para marcar receta seleccionada
    resultsView.update(model.getSearchResultsPage());

    // Actualizando vista de Bookmarks
    bookmarksView.update(model.state.bookmarks);

    //Cargando Receta
    await model.loadRecipe(id);

    //Renderizando receta
    recipeView.render(model.state.recipe);

  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // Obtener search query
    const query = searchView.getQuery();
    if (!query) return;

    // Cargar Search results
    await model.loadSearchResults(query);

    // Render Resultados
    resultsView.render(model.getSearchResultsPage());

    // Render Paginador
    paginationView.render(model.state.search);

  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // Render nuevos resultados
  resultsView.render(model.getSearchResultsPage(goToPage));
  // Render botones paginador
  paginationView.render(model.state.search);
}

const controlServings = function (newServings) {
  // Actualizar ingredientes (state)
  model.updateServings(newServings);

  // Actualizar vista
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // Agregar o quitar Guardados
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);

    // Notification
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: 'Recipe added to Bookmarks'
    })
  } else {
    model.deleteBookmark(model.state.recipe.id);

    // Notification
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'warning',
      title: 'Recipe removed from Bookmarks'
    })
  }

  // Actualizar vista
  recipeView.update(model.state.recipe);

  // Render Guardados
  bookmarksView.render(model.state.bookmarks);
};

// Mostrar modal

const showProgressModal = function (e) {
  const btn = document.querySelector('.nav__btn--add-recipe');
  btn.addEventListener('click', function (e) {
    e.preventDefault;

    Swal.fire({
      icon: 'warning',
      confirmButtonColor: '#f48982',
      title: 'Not Avaliable, Sorry!',
      text: 'We are still developing this functionality',
    })
  })
}

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks)
}

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark)
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  showProgressModal();
};

init();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};

//clearBookmarks();