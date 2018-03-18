import React from "react";
import * as BooksAPI from "./BooksAPI";
class Book extends React.Component {
  // controlled component constructor per https://reactjs.org/docs/forms.html
  constructor(props) {
    super(props);

    // Register a change handler for the select menu
    this.handleChange = this.handleChange.bind(this);
  }

  // the selected shelf is passed to setState when the select menu changes
  handleChange(event) {
    // Update UI with book's new shelf
    this.props.changeShelf(this.props.book, event.target.value);
    // Update back-end data with book's new shelf
    BooksAPI.update(this.props.book, event.target.value);
  }

  mapShelf(foundBook) {
    const defaultShelf = "none";
    // On the home screen shelf will never be undefined.
    // Set the default shelf from JSON response
    if (foundBook.shelf) {
      return foundBook.shelf;
    } else {
      // Search results may contain books without a shelf.
      const match = this.props.shelvedBooks.filter(
        book => book.id === foundBook.id
      );
      if (!Array.isArray(match) || !match.length) {
        // If the match array isn't truthy, the book isn't shelved.
        // Default shelf will be "none"
        return defaultShelf;
      } else {
        // If the match array is truthy, return the shelf of the single item array.
        return match[0].shelf;
      }
    }
  }

  render() {
    // Take in a book object
    const book = this.props.book;
    //const shelvedBooks = this.props.shelvedBooks;

    // Return UI for a single book
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${book.imageLinks.thumbnail})`
              }}
            />
            <div className="book-shelf-changer">
              <select
                defaultValue={this.mapShelf(book)}
                onChange={this.handleChange}
              >
                <option value="none" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.author}</div>
        </div>
      </li>
    );
  }
}

export default Book;
