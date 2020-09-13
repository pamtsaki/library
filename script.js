//SELECTORS
let container = document.querySelector('.container');
let btnAddNewBook = document.querySelector('#add-new-book');

// GLOBALS
let myLibrary = [];

class Book {
  constructor(title, author, pages, readBoolean) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readBoolean = readBoolean;
  }

  getInputFromUser() {
    this.title = prompt('Title');
    this.author = prompt('Author');
    this.pages = prompt('pages');
    let read = prompt('read?');
    if (read === 'yes') this.readBoolean = true;
    else this.readBoolean = false;
  }

  setInnerBookElements(book) {
    console.log('i WAS CALLED!!');
    let title = document.createElement('div');
    title.classList.add('book-title');
    title.textContent = this.title;
    book.appendChild(title);
    let author = document.createElement('div');
    author.classList.add('book-author');
    author.textContent = this.author;
    book.appendChild(author);
    let pages = document.createElement('div');
    pages.classList.add('book-pages');
    pages.textContent = this.pages;
    book.appendChild(pages);
    let read = document.createElement('div');
    read.classList.add('book-read');
    if (this.readBoolean === true) read.textContent = 'READ';
    else read.textContent = 'NOT READ';
    book.appendChild(read);

    //set a read toggle button for each book
    let rr = `<label for="myCheck"></label><input type="checkbox" id="btn-toggleRead">`;
    let btnRead = document.createElement('button');
    btnRead.classList.add('read-button');
    btnRead.innerHTML = rr;
    btnRead.addEventListener('click', () => {
      if (this.readBoolean === true) {
        this.readBoolean = false;
        read.textContent = 'NOT READ';
      } else {
        this.readBoolean = true;
        read.textContent = 'READ';
      }
    });
    book.appendChild(btnRead);

    //set a remove button for each book.
    let btnRemove = document.createElement('button');
    btnRemove.classList.add('remove-button');
    btnRemove.textContent = 'remove';
    btnRemove.addEventListener('click', () => {
      book.remove(this);
      myLibrary.splice(myLibrary.indexOf(this), 1);
      console.table(myLibrary);
    });
    book.appendChild(btnRemove);
  }

  renderBook() {
    let book = document.createElement('div');
    book.classList.add('book');
    book.setAttribute('data-index', `${myLibrary.indexOf(this)}`);
    this.setInnerBookElements(book);
    console.log('THIS IS THE RENDER BOOK FUNC:');
    console.log(this.title);

    container.appendChild(book);
  }

  addBookToLibrary() {
    myLibrary.push(this);
    this.renderBook();
  }

  createNewBook() {
    this.getInputFromUser();
    this.addBookToLibrary();
  }

  print() {
    console.log(
      `${this.title} ${this.author} ${this.pages} ${this.readBoolean}`
    );
  }
}

/**
 * !HARD CODED BOOKS IN LIBRARY
 */

let book1 = new Book('In Search of', 'Marcel Proust', '743', false);
book1.addBookToLibrary();
let book2 = new Book('Ulysses', 'James Joyce', '465', false);
book2.addBookToLibrary();
let book3 = new Book('Don Quixote', 'Miguel de Cervantes', '643', true);
book3.addBookToLibrary();
let book4 = new Book('The Great ', 'F. Scott Fitzgerald', '995', true);
book4.addBookToLibrary();
let book5 = new Book('Moby Dick', 'Herman Melville', '851', false);
book5.addBookToLibrary();

//LISTENERS FOR BUTTONS
btnAddNewBook.addEventListener('click', () => {
  let newBook = new Book();
  newBook.createNewBook();
  console.table(myLibrary);
  console.log(container);
});

console.table(myLibrary);
console.log(container);
