import React from "react";
import Book from "./Book";

class BookShelf extends React.Component {
  render() {
    // take in the book and shelf objects from App
    const books = this.props.books;
    const shelf = this.props.shelf;


    // Map each book in the array to the Book component UI
    return (
      <div className="bookShelf">
        {/* Pass the title of the shelf from the shelf prop */}
        <h2 className="bookshelf-title">{shelf.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              <Book
                // Pass the book and shelf objects to the child Book component
                book={book}
                // Required unique key for this list item
                key={book.id}
                // The addBookToShelfFunction exists in the parent App class.
                // It is passed from App - > Shelf -> Book,
                // then called when a book is moved to a new shelf.
                addBookToShelf={this.props.addBookToShelf}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
