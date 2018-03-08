import React from "react";
import Book from "./Book";

class BookShelf extends React.Component {
  render() {
    // take in an array of books
    const books = this.props.books;
    // take in a shelf title
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
                // Pass the book and shelf objects to teh child Book component
                book={book}
                shelf={shelf}
                // Provide a unique key for this list item
                key={book.id}
                // Pass addBookToShelfFunction to child Book component
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
