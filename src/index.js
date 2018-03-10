import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.render(
  // Wrap app in a BrowserRouter to listen for
  // URL changes on behalf of ReactRouter
  <BrowserRouter>
    <App />
  </BrowserRouter>, document.getElementById('root'))
