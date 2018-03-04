import React from 'react'

class BookSearch extends React.Component {
render () {

return <div className="search-books">
  <div className="search-books-bar">
    {/*
      the search page is open. click a button to set showSearchPage state to false
      the click image is arrow-back.svg referenced by the close-search css class
    */}
    <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
    <div className="search-books-input-wrapper">
      {/*
        NOTES: The search from BooksAPI is limited to a particular set of search terms.
        You can find these search terms here:
        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
        you don't find a specific author or title. Every search is limited by search terms.
      */}
      <input type="text" placeholder="Search by title or author"/>
    </div>
  </div>
  <div className="search-books-results">
    <ol className="books-grid"></ol>
  </div>
</div>
}
}

export default BookSearch
