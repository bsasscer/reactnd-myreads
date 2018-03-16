import React from "react";
import Book from "./Book";

class BookShelf extends React.Component {
  render() {
    // take in the book and shelf objects from App
    const books = this.props.books;
    const shelf = this.props.shelf;

    return (
      <div className="bookShelf">
        {/* Pass the title of the shelf from the shelf prop */}
        <h2 className="bookshelf-title">{shelf.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {/* Map each book in the books array to the Book component UI */}
            {books.map(book => (
              <Book
                // Pass the book and shelf objects to the child Book component
                book={book}
                shelf={shelf}
                // Required unique key for this list item
                key={book.id}
                // The changeShelf function exists in the parent App class.
                // It is passed from App - > Shelf -> Book,
                // then called when a book is moved to a new shelf.
                changeShelf={this.props.changeShelf}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
