const body = document.getElementById("container");

const button = document.getElementById("add-button");

const myLibrary = [];

function Book(author, title, pages, read){
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
};


function addBookToLibrary(book){
    myLibrary.push(book);
};


function displayBook(){
    let table = document.createElement("div");
    table.classList.add("table");
    for(book of myLibrary){
        let card = document.createElement("div");
        card.classList.add("card");

        let title = document.createElement("p");
        title.textContent = "Title: " +  book["title"];

        let author = document.createElement("p");
        author.textContent = "Author: " +  book["author"];

        let pages = document.createElement("p");
        pages.textContent = "Pages: " +  book["pages"];

        let isRead = document.createElement("p");
        isRead.textContent = "Read: " +  book["read"];

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(isRead);

        table.appendChild(card);
    }

    body.appendChild(table);
};