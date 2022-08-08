import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      // Invoke callback with parameters
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.currentPage;

    const numberOfPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, & there are other pages
    if (curPage === 1 && numberOfPages > 1) {
      return this._generateMarkupBtn('', 'next');
    }

    // Last page
    if (curPage === numberOfPages && numberOfPages > 1) {
      return this._generateMarkupBtn('prev');
    }

    // Other page
    if (curPage < numberOfPages) {
      return this._generateMarkupBtn('prev', 'next');
    }

    // Page 1, & NO other pages
    return '';
  }

  _generateMarkupBtn(prevBtn = '', nextBtn = '') {
    let markup;
    if (prevBtn === 'prev' && nextBtn === '') {
      return (markup = `
          <button data-goto="${
            this._data.currentPage - 1
          }" class="btn--inline pagination__btn--${prevBtn}">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.currentPage - 1}</span>
          </button>`);
    }

    if (prevBtn === '' && nextBtn === 'next') {
      return (markup = `
          <button data-goto="${
            this._data.currentPage + 1
          }" class="btn--inline pagination__btn--${nextBtn}">
            <span>Page ${this._data.currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`);
    }

    if (prevBtn === 'prev' && nextBtn === 'next') {
      return (markup = `
          <button data-goto="${
            this._data.currentPage - 1
          }" class="btn--inline pagination__btn--${prevBtn}">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.currentPage - 1}</span>
          </button>

          <button data-goto="${
            this._data.currentPage + 1
          }" class="btn--inline pagination__btn--${nextBtn}">
            <span>Page ${this._data.currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
      `);
    }

    return markup;
  }
}

export default new PaginationView();
