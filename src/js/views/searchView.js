class searchView {
  _parentEl = document.querySelector('.search');

  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value;

    //Mostrando SOLO barra de buscador y alerta al usuario
    if (query === '') {
      Swal.fire({
        icon: 'info',
        confirmButtonColor: '#f48982',
        title: 'Welcome!',
        text: 'Start by searching for a recipe or an ingredient. Have fun!',
      })
    } else {
      document.querySelector("body > div.container > header").style.height = 'auto'
      document.querySelector("body > div.container > header").style.justifyContent = 'space-between';
      document.querySelector("body > div.container > div.search-results").style.display = 'block';
      document.querySelector("body > div.container > div.recipe").style.display = 'block';
      document.querySelector("body > div.container > header > nav").style.display = 'block';
      document.querySelector("body > div.container").style.display = 'grid';
      document.querySelector("body > div.container > header").style.background = '#f9f5f3';
      document.querySelector("body > div.container").style.minHeight = 'auto';
      document.querySelector("body > div.container").style.display = 'grid';
      document.querySelector("body > div.container > div.search-results > ul").style.display = 'block';

      this._clearInput();
      return query;
    }
  }

  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    })
  }
}

export default new searchView();