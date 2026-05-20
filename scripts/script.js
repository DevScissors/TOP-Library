const cardsWrapper = document.querySelector(".cards-wrapper");
const cardDiv = document.createElement("div");
cardDiv.className = "book-card";
const cardBookTitle = document.createElement("h2");
cardBookTitle.className = "book-title";
const cardBookAuthor = document.createElement("p");
cardBookAuthor.className = "book-author";
const cardBookPages = document.createElement("p");

const myLibrary = [];

function Book(title, author, numPages) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.read = true;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, numPages) {
  // take params, create a book then store it in the array
  const book = new Book(title, author, numPages);
  myLibrary.push(book);
}

function buildCard() {}

function displayBook() {
  myLibrary.forEach((book, index) => {
    cardBookPages.className = "book-num-pages";
    cardBookTitle.textContent = `Title: ${book.title}`;
    cardBookAuthor.textContent = `Author: ${book.author}`;
    cardBookPages.textContent = `Length: ${book.numPages} pages`;

    cardDiv.appendChild(cardBookTitle);
    cardDiv.appendChild(cardBookAuthor);
    cardDiv.appendChild(cardBookPages);
    cardsWrapper.appendChild(cardDiv);
  });
}

addBookToLibrary("The Hobbit", "J.R.R Tolkien", 293);
addBookToLibrary("The Witcher", "Some Guy", 321);
addBookToLibrary("To Kill a Mockingbird", "That other guy", 195);
displayBook();
console.log(myLibrary);
