import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf.js'
import BookSearch from './BookSearch.js'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <BookSearch />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                    <BookShelf shelf="Reading" books={[
                        {title: 'Lightning Thief', author: 'Rick Riordan', id: 'aaa'},
                        {title: 'Lost Hero', author: 'Rick Riordan', id: 'aab'},
                        {title: 'Blood of Olympus', author: 'Rick Riordan', id: 'aac'},
                      ]}/>
                      <BookShelf shelf="Want" books={[
                        {title: 'Breakfast at Tiffanys', author: 'Truman Capote', id: 'baa'},
                        {title: 'In Cold Blood', author: 'Truman Capote', id: 'bab'}
                      ]} />
                    <BookShelf shelf="Read" books={[
                      {title: 'Charlie and the Chocolate Factory', author: 'Roald Dahl', id: 'caa' },
                      {title: 'James and the Giant Peach', author: 'Roald Dahl', id: 'cab' }
                    ]} />
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
