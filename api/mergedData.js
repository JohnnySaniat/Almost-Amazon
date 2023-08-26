import { deleteBook, getSingleBook } from './bookData';
import { getSingleAuthor, getAuthorBooks, deleteSingleAuthor } from './authorData';

// for merged promises

// TODO: Get data for viewBook
const getBookDetails = (firebaseKey) => new Promise((resolve, reject) => {
  // GET SINGLE BOOK
  getSingleBook(firebaseKey).then((bookObject) => { // returns single book object
    getSingleAuthor(bookObject.author_id) // we nest this promise so that we can use the book object
      .then((authorObject) => resolve({ ...bookObject, authorObject }));
  }).catch(reject);
});

export default getBookDetails;

const getAuthorDetails = async (firebaseKey) => {
  const author = await getSingleAuthor(firebaseKey);
  const books = await getAuthorBooks(author.firebaseKey);

  return { ...author, books };
};

// async example
// const deleteAuthorBooksRelationship = async (firebaseKey) => {
//   const authorBooks = await getAuthorBooks(firebaseKey);
//   const deleteBookPromises = await authorBooks.map((book) => deleteBook(book.firebaseKey));
//   Promise.all(deleteBookPromises).then(() => {
//     deleteSingleAuthor(firebaseKey);
//   });
// };

const deleteAuthorBooksRelationship = (firebaseKey) => new Promise((resolve, reject) => {
  getAuthorBooks(firebaseKey).then((authorsBookArray) => {
    const deleteBookPromises = authorsBookArray.map((book) => deleteBook(book.firebaseKey));

    Promise.all(deleteBookPromises).then(() => {
      deleteSingleAuthor(firebaseKey).then(resolve);
    });
  }).catch(reject);
});

export { getBookDetails, getAuthorDetails, deleteAuthorBooksRelationship };
