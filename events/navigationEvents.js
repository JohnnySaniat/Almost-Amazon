import { signOut } from '../utils/auth';
import { getAuthors } from '../api/authorData';
import { showAuthors } from '../pages/authors';
import { emptyBooks, showBooks } from '../pages/books';
import {
  getBooks, booksOnSale, authorsByFavorite, searchBooks
} from '../api/bookData';

// navigation events
const navigationEvents = (user) => {
  // LOGOUT BUTTON
  document.querySelector('#logout-button')
    .addEventListener('click', signOut);

  // TODO: BOOKS ON SALE
  document.querySelector('#sale-books').addEventListener('click', () => {
    booksOnSale(user.uid).then(showBooks);
  });

  // TODO: AUTHORS BY FAVORITE
  document.querySelector('#favorite-authors').addEventListener('click', () => {
    authorsByFavorite(user.uid).then(showAuthors);
  });

  // TODO: ALL BOOKS
  document.querySelector('#all-books').addEventListener('click', () => {
    getBooks(user.uid).then(showBooks);
  });

  // FIXME: STUDENTS Create an event listener for the Authors
  // 1. When a user clicks the authors link, make a call to firebase to get all authors
  // 2. Convert the response to an array because that is what the makeAuthors function is expecting
  // 3. If the array is empty because there are no authors, make sure to use the emptyAuthor function
  document.querySelector('#authors').addEventListener('click', () => {
    getAuthors(user.uid).then(showAuthors);
  });

  // STRETCH: SEARCH
  document.querySelector('#search').addEventListener('keyup', (e) => {
    const searchValue = document.querySelector('#search').value.toLowerCase();

    // WHEN THE USER PRESSES ENTER, MAKE THE API CALL AND CLEAR THE INPUT
    if (e.keyCode === 13) {
      // MAKE A CALL TO THE API TO FILTER ON THE BOOKS
      // IF THE SEARCH DOESN'T RETURN ANYTHING, SHOW THE EMPTY STORE
      // OTHERWISE SHOW THE STORE
      searchBooks(searchValue)
        .then((search) => {
          if (search.length) {
            showBooks(search);
          } else {
            emptyBooks();
          }
        });
      document.querySelector('#search').value = '';
    }
  });
};

export default navigationEvents;
