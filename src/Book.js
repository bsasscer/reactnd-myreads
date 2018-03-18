import React from "react";
import * as BooksAPI from "./BooksAPI";
class Book extends React.Component {
  // Controlled component constructor per https://reactjs.org/docs/forms.html
  constructor(props) {
    super(props);

    // Register a change handler for the Select menu.
    this.handleChange = this.handleChange.bind(this);
  }

  // Pass selected shelf to setState when the selected item changes.
  handleChange(event) {
    // Update UI with book's new shelf
    this.props.changeShelf(this.props.book, event.target.value);
    // Update back-end data with book's new shelf
    BooksAPI.update(this.props.book, event.target.value);
  }

  // Helper function to set the current shelf in the shelfChanger.
  mapShelf(foundBook) {
    const defaultShelf = "none";
    // On the home screen shelf will never be undefined.
    // Set the default shelf from JSON response.
    if (foundBook.shelf) {
      return foundBook.shelf;
    } else {
      // If a book in search results is on a shelf, set that shelf as
      // the defaultValue for the book in the shelfChanger.
      const match = this.props.shelvedBooks.filter(
        book => book.id === foundBook.id
      );
      // If the match array isn't truthy, the book isn't shelved.
      // Default shelf will be "none"
      if (!Array.isArray(match) || !match.length) {
        return defaultShelf;
        // Else the match array is truthy, return the shelf from the single item array.
      } else {
        return match[0].shelf;
      }
    }
  }

  //Helper function to handle missing thumbnails
  mapImage(book) {
    // Return the book's thumbnail if it is available
    if (book.imageLinks && book.imageLinks.thumbnail) {
      return `url(${book.imageLinks.thumbnail})`;
      // Return no image if the thumbail is absent from JSON response
    } else {
      return "none";
    }
  }

  render() {
    // Take in a Book from BookShelf or BookSearch components
    const book = this.props.book;

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
                backgroundImage: `${this.mapImage(book)}`
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
