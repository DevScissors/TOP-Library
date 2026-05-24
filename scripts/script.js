const myLibrary = [];
let bookCountTotal = 0;
let bookReadCountTotal = 0;
let bookUnreadCountTotal = 0;

const bookCount = document.querySelector(".book-count");
bookCount.textContent = `Number of books: ${bookCountTotal}`;

const bookReadCount = document.querySelector(".book-read-count");
bookReadCount.textContent = `Number of read books: ${bookReadCountTotal}`;

const bookUnreadCount = document.querySelector(".book-unread-count");
bookUnreadCount.textContent = `Number of unread books: ${bookUnreadCountTotal}`;

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

    const deleteBookBtn = document.createElement("button");
    deleteBookBtn.className = "delete-book-btn";
    deleteBookBtn.textContent = "X";
    deleteBookBtn.dataset.tooltip = "Click to delete this book";

    deleteBookBtn.addEventListener("click", () => {
      cardsWrapper.removeChild(cardDiv);
      myLibrary.splice(cardDiv, 1);
      calculateBookLegend();
    });

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
    cardBookRead.textContent = `Have you read the book?`;

    const cardBookReadOptionLabel = document.createElement("label");
    cardBookReadOptionLabel.htmlFor = `readValue-${book.id}`;
    cardBookReadOptionLabel.className = "toggle-label-text";
    cardBookReadOptionLabel.appendChild(document.createTextNode(""));

    const cardBookReadOption = document.createElement("input");
    cardBookReadOption.type = "checkbox";
    cardBookReadOption.className = "read-checkbox-toggle";
    cardBookReadOption.id = `readValue-${book.id}`;
    cardBookReadOption.checked = book.isRead;
    cardBookReadOptionLabel.appendChild(cardBookReadOption);

    const cardBookReadOptionToggle = document.createElement("span");
    cardBookReadOptionToggle.className = "slider round";
    cardBookReadOptionLabel.appendChild(cardBookReadOptionToggle);


    if (cardBookReadOption.checked) {
      cardBookReadOptionToggle.textContent = "Yes";
      cardBookReadOptionToggle.style.cssText = "width: 55px; color: white; font-size: 14px; padding-left: 5px;"
    } else {
      cardBookReadOptionToggle.textContent = "No";
      cardBookReadOptionToggle.style.cssText = "width: 25px; color: black; font-size: 14px; padding-left: 35px;"
    }

    cardDiv.append(
      deleteBookBtn,
      cardBookTitle,
      cardBookAuthor,
      cardBookPages,
      cardBookRead,
    );
    cardBookRead.append(cardBookReadOptionLabel);
    cardsWrapper.appendChild(cardDiv);
  });
  calculateBookLegend();
}

function calculateBookLegend() {
  // recompute totals from current library state
  bookReadCountTotal = myLibrary.filter((b) => b.isRead).length;
  bookUnreadCountTotal = myLibrary.length - bookReadCountTotal;
  bookReadCount.textContent = `Number of read books: ${bookReadCountTotal}`;
  bookUnreadCount.textContent = `Number of unread books: ${bookUnreadCountTotal}`;
  bookCountTotal = myLibrary.length;
  bookCount.textContent = `Number of books: ${bookCountTotal}`;
}

addBookBtn.addEventListener("click", () => {
  // open form modal and disable submit button
  modal.showModal();
  submitBtn.disabled = true;
});

cardsWrapper.addEventListener("click", (e) => {
  // only handle clicks on the read-checkbox-toggle inputs
  if (!e.target.classList.contains("read-checkbox-toggle")) return;
  const checkbox = e.target;
  const slider = checkbox.nextElementSibling;
  const cardDiv = checkbox.closest(".book-card");
  if (!cardDiv) return;
  const bookId = cardDiv.getAttribute("data-index");
  const book = myLibrary.find((b) => b.id === bookId);
  if (!book) return;
  book.isRead = checkbox.checked;
  if (checkbox.checked) {
    slider.textContent = "Yes";
    slider.style.cssText = "width: 55px; color: white; font-size: 14px; padding-left: 5px;"
  } else {
    slider.textContent = "No";
    slider.style.cssText = "width: 25px; color: black; font-size: 14px; padding-left: 35px;"
  }
  calculateBookLegend();
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
