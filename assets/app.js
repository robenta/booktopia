// Book Class: Represents a book
class Book{
    constructor(title, author, isbn, genre) {
        this.title = title
        this.author = author
        this.genre = genre
        this.isbn = isbn
    }
}

// UI Class: Handle UI tasks
class UI{

    static addBookToList(book){
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr')
    row.innerHTML = `
    <td><img src="/assets/img/booktopia.png" alt="" class="img-fluid" width="30" height="30"></td>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.genre}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="btn btn-sm delete" style="background: #FF4D6A;color: rgb(244, 226, 229)">X</a></td>
    `

    list.appendChild(row)
   }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove()
        }
    }

    static showAlert(message, className, color){
        const div = document.createElement('div')
        div.className = `alert alert-${className}`
        div.appendChild(document.createTextNode(message))
        const container = document.querySelector('.container')
        const form = document.querySelector('#book-form')

        container.insertBefore(div, form)

        // Make alert vanish is 3 seconds
        setTimeout(()=> document.querySelector('.alert').remove(), 3000)
    }
    static clearFields(){
    document.querySelector('#title').value = ''
    document.querySelector('#author').value = ''
    document.querySelector('#genre').value = ''
    document.querySelector('#isbn').value = ''
    }
}

// Store Class: Handles storage
class Store{

    static displayBooks(){
        const books = Store.getBooks();

        // books.forEach((book) => UI.addBookToList(book))
        books.forEach(function(book){
            const ui = new UI
            ui.addBookToList(book)
        })
    }
   static getBooks(){
    let books;
    if(localStorage.getItem('books') === null){
        books = []
    }else{
        books = JSON.parse(localStorage.getItem('books'))
    }
    return books;
   }
   static addBook(book){
    const books = Store.getBooks()

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books))
   }
   static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach((book, index)=>{
            if(book.isbn === isbn){
                books.splice(index, 1)
            }
        });
        localStorage.setItem('books', JSON.stringify(books))
    }
}

// Event: Display books
document.addEventListener('DOMContentLoaded', UI.displayBooks)


// Event: Add a book
document.querySelector('#book-form').addEventListener('submit', (e)=>{

    // Prevent actual submit
    e.preventDefault()

    // Get form values
   const title = document.querySelector('#title').value 
   const author = document.querySelector('#author').value 
   const isbn = document.querySelector('#isbn').value 
   const genre = document.querySelector('#genre').value 
   

    // Validate
    if(title === '' || author === '' || isbn === '' || genre === ''){
        UI.showAlert('Please fill in all fields', 'danger')
        
    }else{
        // Instantiate book 
        const book = new Book(title, author, isbn, genre)

        // Add book to UI
        UI.addBookToList(book)

        // Add book to store
        Store.addBook(book)

        // Show success message
        UI.showAlert('Book Added', 'success')

        // Clear fields
        UI.clearFields()
    }   
})


// Event: Remove a book

document.querySelector('#book-list').addEventListener('click', (e)=>{
    // Remove book form UI
    UI.deleteBook(e.target);

    // Remove book form UI
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

    // show success message
    UI.showAlert('Book Removed', 'danger')
})

// Event: to hide button when inputs are empty
const myinput = document.querySelectorAll('input');
myinput.forEach((inputs) => {
    // console.log(input);
    inputs.addEventListener('keyup', (e)=>{
        console.log('hello');       
        if([inputs.value !== '']){
            document.querySelector('#book-button').classList.remove('d-none')
        }
    })
})

