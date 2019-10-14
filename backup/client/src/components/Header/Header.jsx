import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './Header.sass'
import Autosuggest from 'react-autosuggest';

// TODO: define env variables
const DEFAULT_AVATAR = 'https://goo.gl/F65XTo'

class Header extends Component {
  state = {
    query: '',
    results: []
  }

  handleHomeClick = event => {
    event.preventDefault()
    this.props.onHomeClick()
  }

  handleExploreClick = event => {
    event.preventDefault()
    this.props.onExploreClick()
  }

  handleProfileClick = event => {
    event.preventDefault()
    this.props.onProfileClick()
  }

  handleNewPostClick = event => {
    event.preventDefault()
    this.props.onNewPostClick()
  }

  onQueryChange = (event, { newValue }) => this.setState({ query: newValue })

  _getSuggestionValue = suggestion => suggestion.username

  _renderSuggestion = suggestion => {
    const user = suggestion
    return (
      <div className="Header-suggestion">
        <div className="Header-suggestionImageWrapper">
          <img
            src={user.imageUrl ? user.imageUrl : DEFAULT_AVATAR}
            alt={user.username}
            className="Header-suggestionImage"
          />
        </div>
        <div className="Header-suggestionUser">
          <div className="Header-suggestionUsername">{user.username}</div>
          {user.name && <div className="Header-suggestionName">{user.name}</div>}
        </div>
      </div>
    )
  }

  onSuggestionsFetchRequested = async ({ value }) => {
    const results = await this.props.onSearch(value)

    this.setState({ results })
  };

  onSuggestionsClearRequested = () => this.setState({ query: '', results: [] })

  onSuggestionSelected = (event, { suggestion: user }) => this.props.onSearchResultClick(user)

  handleLoginClick = event => {
    event.preventDefault()
    this.props.onLoginClick() 
  }

  handleRegisterClick = event => {
    event.preventDefault()
    this.props.onRegisterClick() 
  }

  render() {
    const { query, results } = this.state;

    const inputProps = {
      placeholder: "Search",
      value: query,
      onChange: this.onQueryChange
    };

    return (
      <header className="Header">
        <div className="Header-logoWrapper">
          <a href="#/" className="Header-logoLink" onClick={this.handleHomeClick}>
            <span className="Header-iconLogo"></span>
            <span className="Header-logo"></span>
          </a>
        </div>
        <div className="Header-searchWrapper">
          <Autosuggest
            suggestions={results}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            onSuggestionSelected={this.onSuggestionSelected}
            getSuggestionValue={this._getSuggestionValue}
            renderSuggestion={this._renderSuggestion}
            inputProps={inputProps}
          />
        </div>
        {this.props.isLoggedIn ?
          <div className="Header-nav">
            <a className="Header-navLink" href="#/" onClick={this.handleNewPostClick}>
              <i className="Header-navIcon far fa-plus-square"></i>
            </a>
            <a className="Header-navLink" href="#/" onClick={this.handleExploreClick}>
              <i className="Header-navIcon far fa-compass"></i>
            </a>
            <a className="Header-navLink" href="#/" onClick={this.handleProfileClick}>
              <i className="Header-navIcon far fa-user"></i>
            </a>
          </div>
          :
          <div className="Header-nav">
            <button className="Header-actionLogin button is-primary" onClick={this.handleLoginClick}>
              Entrar
            </button>
            <a href="#/" className="Header-actionRegister text-link push-10-l" onClick={this.handleRegisterClick}>
              Registrarte
            </a>
          </div>
        }
      </header>
    )
  }
}

export default withRouter(Header)