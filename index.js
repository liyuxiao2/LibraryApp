const body = document.getElementById("container");

const dialog = document.getElementById("dialog-form")

const form = document.getElementById("forms");

const addButton = document.getElementById("add-button");

const confirmButton = document.getElementById("confirmBtn");

const closeButton = document.getElementById("closeBtn")

let book_id = 1;



let myLibrary = []
function Book(book_id, author, title, pages, read){
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
    this.book_id = book_id;
};

function toggleRead(book){
    book.read = !book.read; 
}

function addBookToLibrary(book){
    myLibrary.push(book);
};


function displayBook(){
    const existingTable = document.querySelector('.table');
    if (existingTable) {
        body.removeChild(existingTable);
    }

    let table = document.createElement("div");
    table.classList.add("table");

    for(let book of myLibrary){

        let card = document.createElement("div");
        card.classList.add("card");

        card.dataset.id = book.book_id;

        let title = document.createElement("h2");
        title.textContent = book["title"];

        let author = document.createElement("h3");
        author.textContent = "Author: " +  book["author"];

        let pages = document.createElement("p");
        pages.textContent = "Pages: " +  book["pages"];

        let isRead = document.createElement("p");
        let read = book["read"] ? "yes": "no";

        isRead.textContent = "read: " + read;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";

        const changeRead = document.createElement("button");
        changeRead.textContent = "Toggle read";

        removeButton.addEventListener("click", () => {
            myLibrary = myLibrary.filter((b) => b.book_id != parseInt(card.dataset.id));
            displayBook(); // Refresh display
        });

        changeRead.addEventListener("click", () => {
            // Find the book in the library and toggle its 'read' status
            const bookToToggle = myLibrary.find((b) => b.book_id === parseInt(card.dataset.id));
            if (bookToToggle) {
                toggleRead(bookToToggle);
                // Update the UI
                displayBook();
            }
        });



        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(isRead);
        card.appendChild(removeButton);
        card.appendChild(changeRead);


        table.appendChild(card);
    }

    body.appendChild(table);
};

addButton.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    form.reset(); 
    dialog.close();
});


form.addEventListener("submit", (e) => {
    e.preventDefault()

    const author = document.getElementById("author").value
    const title = document.getElementById("book").value
    const pages = document.getElementById("pages").value
    const read = document.querySelector('input[name="read"]:checked').value;
    const isRead = read === "yes"; 

    const book = new Book(book_id, title, author, pages, isRead)
    book_id++
    
    addBookToLibrary(book);

    displayBook();

    form.reset();
    dialog.close();
})


// Add dummy books to the library
function loadDummyBooks() {
    const dummyBooks = [
        new Book(book_id++, "J.K. Rowling", "Harry Potter and the Sorcerer's Stone", 320, "yes"),
        new Book(book_id++, "George Orwell", "1984", 328, "no"),
        new Book(book_id++, "J.R.R. Tolkien", "The Hobbit", 310, "yes"),
        new Book(book_id++, "F. Scott Fitzgerald", "The Great Gatsby", 180, "no"),
        new Book(book_id++, "Harper Lee", "To Kill a Mockingbird", 281, "yes"),
    ];

    dummyBooks.forEach((book) => addBookToLibrary(book));
    displayBook();
}

// Load dummy books on page load
window.onload = loadDummyBooks;