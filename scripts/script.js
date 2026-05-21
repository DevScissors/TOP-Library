const cardsWrapper = document.querySelector(".cards-wrapper");
const addBookBtn = document.querySelector(".add-book-button");

// form related DOM elements
const modal = document.querySelector("#addBookModal");
const formModal = document.querySelector(".add-to-library-form");
const titleInput = document.querySelector(".book-title-input");
const authorInput = document.querySelector(".book-author-input");
const numPagesInput = document.querySelector(".book-pages-input");
const readCheckbox = document.querySelector(".read-checkbox");
const submitBtn = document.querySelector(".submit-btn");

const myLibrary = [];

function Book(title, author, numPages, isRead) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.isRead = isRead;
  this.id = crypto.randomUUID();
}

function checkFormValues() {
  if (
    titleInput.value !== "" &&
    authorInput.value != "" &&
    numPagesInput.value != ""
  ) {
    return true;
  } else {
    return false;
  }
}

function addBookToLibrary() {
  const titleValue = titleInput.value;
  const authorValue = authorInput.value;
  const numPagesValue = numPagesInput.value;
  const isReadValue = readCheckbox.checked;

  // take params, create a book then store it in the array
  const book = new Book(titleValue, authorValue, numPagesValue, isReadValue);
  myLibrary.push(book);
}

function displayBook() {
  cardsWrapper.innerHTML = ""; // optional: clear existing cards
  myLibrary.forEach((book, index) => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "book-card";
    cardDiv.setAttribute("data-index", book.id);

    const cardBookTitle = document.createElement("h2");
    cardBookTitle.className = "book-title";
    cardBookTitle.textContent = `Title: ${book.title}`;

    const cardBookAuthor = document.createElement("p");
    cardBookAuthor.className = "book-author";
    cardBookAuthor.textContent = `Author: ${book.author}`;

    const cardBookPages = document.createElement("p");
    cardBookPages.className = "book-num-pages";
    cardBookPages.textContent = `Length: ${book.numPages} pages`;

    const cardBookRead = document.createElement("p");
    cardBookRead.className = "book-read";

    const cardBookReadOption = document.createElement("input");
    cardBookReadOption.type = "checkbox";
    cardBookReadOption.className = "read-checkbox-toggle";
    cardBookReadOption.id = "readValue";
    cardBookReadOption.checked = book.isRead;

    const cardBookReadOptionLabel = document.createElement("label");
    cardBookReadOptionLabel.htmlFor = "readValue";
    cardBookReadOptionLabel.appendChild(document.createTextNode(""));
    cardBookReadOptionLabel.textContent = cardBookReadOption.checked
      ? (cardBookReadOptionLabel.textContent = "Yes")
      : (cardBookReadOptionLabel.textContent = "No");
    cardBookRead.textContent = `Have you read the book?`;

    cardDiv.append(cardBookTitle, cardBookAuthor, cardBookPages, cardBookRead);
    cardBookRead.append(cardBookReadOption);
    cardBookRead.append(cardBookReadOptionLabel);
    cardsWrapper.appendChild(cardDiv);
  });
  // toggleReadOption();
}

// function toggleReadOption() {
//   // toggle read option based off of data-index to match the book ID
//   const bookDivs = document.querySelectorAll(".book-card");
//   const checkboxID = myLibrary.filter(
//     (bookID) => (bookID = bookDivs.dataset.dataIndex),
//   );
//   console.log(checkboxID);
// }

addBookBtn.addEventListener("click", () => {
  // open form modal and disable submit button
  modal.showModal();
  submitBtn.disabled = true;
});

cardsWrapper.addEventListener("click", (e) => {
  const readToggle = e.target.type === "checkbox";
  myLibrary.forEach((book) => {
    if (readToggle) {
      book.isRead = true;
    } else {
      book.isRead = false;
    }
  });
});

// Check that each required input has a value, otherwise keep submit button disabled
titleInput.addEventListener("input", () => {
  submitBtn.disabled = !checkFormValues();
});

authorInput.addEventListener("input", () => {
  submitBtn.disabled = !checkFormValues();
});

numPagesInput.addEventListener("input", () => {
  submitBtn.disabled = !checkFormValues();
});

submitBtn.addEventListener("click", (e) => {
  addBookToLibrary();
  displayBook();
  clearFormValues();
  modal.close();
  e.preventDefault();
});

modal.addEventListener("close", () => {
  clearFormValues();
});

function clearFormValues() {
  formModal.reset();
}
