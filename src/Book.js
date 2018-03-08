import React from "react";
import * as BooksAPI from "./BooksAPI";
class Book extends React.Component {
  // controlled component constructor per https://reactjs.org/docs/forms.html
  constructor(props) {
    super(props);

    // register a change handler for the select menu
    this.handleChange = this.handleChange.bind(this);
  }

  // the selected shelf is passed to setState when the select menu changes
  handleChange(event) {
    // update UI with book's new shelf
    this.props.addBookToShelf(this.props.book, event.target.value);
    // update back-end data with new shelf membership
    BooksAPI.update(this.props.book, event.target.value);
  }

  render() {
    // take in the book and shelf objects from BookShelf
    const book = this.props.book;
    const shelf = this.props.shelf;

    // return UI for a single book
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
              <select defaultValue={shelf.id} onChange={this.handleChange}>
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
