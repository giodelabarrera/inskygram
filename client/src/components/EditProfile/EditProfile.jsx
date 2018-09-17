import React, { Component } from 'react'
import './EditProfile.sass'
import validator from 'validator'

class EditProfile extends Component {

  state = {
    name: this.props.user.name || '',
    website: this.props.user.website || '',
    biography: this.props.user.biography || '',
    newEmail: this.props.user.email,
    phoneNumber: this.props.user.phoneNumber || '',
    gender: this.props.user.gender || '',
    privateAccount: this.props.user.privateAccount || false,
    nameError: '',
    websiteError: '',
    biographyError: '',
    newEmailError: '',
    phoneNumberError: '',
    genderError: '',
    privateAccountError: '',
  }

  handleNameChange = event => this.setState({ name: event.target.value })

  handleWebsiteChange = event => this.setState({ website: event.target.value })

  handleBiographyChange = event => this.setState({ biography: event.target.value })

  handleNewEmailChange = event => this.setState({ newEmail: event.target.value })

  handlePhoneNumberChange = event => this.setState({ phoneNumber: event.target.value })

  handleGenderChange = event => this.setState({ gender: event.target.value })

  handlePrivateAccountChange = event => this.setState({ privateAccount: event.target.checked })

  handleSubmit = event => {
    event.preventDefault()

    let isValid = true

    this.setState({
      nameError: '',
      websiteError: '',
      biographyError: '',
      newEmailError: '',
      phoneNumberError: '',
      genderError: '',
      privateAccountError: '',
    })

    if (validator.isEmpty(this.state.newEmail)) {
      this.setState({ newEmailError: `Email can't be blank` })
      isValid = false

    } else if (!validator.isEmail(this.state.newEmail)) {
      this.setState({ newEmailError: `Email it must be a valid email` })
      isValid = false
    }

    if (isValid) {
      const {
        name,
        website,
        biography,
        newEmail,
        phoneNumber,
        gender,
        privateAccount,
      } = this.state

      this.props.onSubmit(newEmail, name, website, phoneNumber, gender, biography, privateAccount)
    }
  }

  render() {

    return (
      <div className="EditProfile">
        <form className="EditProfile-form" onSubmit={this.handleSubmit}>
          <div className="EditProfile-field">
            <label htmlFor="name" className="EditProfile-label">Name</label>
            <input
              type="text"
              className="EditProfile-input"
              value={this.state.name}
              id="name"
              onChange={this.handleNameChange} />
            {
              this.state.nameError &&
              <div className="EditProfile-fieldError">{this.state.nameError}</div>
            }
          </div>
          <div className="EditProfile-field">
            <label htmlFor="name" className="EditProfile-label">Username</label>
            <input
              type="text"
              disabled
              className="EditProfile-input"
              value={this.props.user.username}
              id="username" />
          </div>
          <div className="EditProfile-field">
            <label htmlFor="website" className="EditProfile-label">Website</label>
            <input
              type="text"
              className="EditProfile-input"
              value={this.state.website}
              name="website"
              id="website"
              onChange={this.handleWebsiteChange} />
            {
              this.state.websiteError &&
              <div className="EditProfile-fieldError">{this.state.websiteError}</div>
            }
          </div>
          <div className="EditProfile-field">
            <label htmlFor="biography" className="EditProfile-label">Bio</label>
            <textarea
              className="EditProfile-textarea"
              value={this.state.biography}
              name="biography"
              id="biography"
              onChange={this.handleBiographyChange} />
            {
              this.state.biographyError &&
              <div className="EditProfile-fieldError">{this.state.biographyError}</div>
            }
          </div>
          <div className="EditProfile-field">
            <label htmlFor="newEmail" className="EditProfile-label">Email</label>
            <input
              type="text"
              className="EditProfile-input"
              value={this.state.newEmail}
              name="newEmail"
              id="newEmail"
              onChange={this.handleNewEmailChange} />
            {
              this.state.newEmailError &&
              <div className="EditProfile-fieldError">{this.state.newEmailError}</div>
            }
          </div>
          <div className="EditProfile-field">
            <label htmlFor="phoneNumber" className="EditProfile-label">Phone number</label>
            <input
              type="text"
              className="EditProfile-input"
              value={this.state.phoneNumber}
              name="phoneNumber"
              id="phoneNumber"
              onChange={this.handlePhoneNumberChange} />
            {
              this.state.phoneNumberError &&
              <div className="EditProfile-fieldError">{this.state.phoneNumberError}</div>
            }
          </div>
          <div className="EditProfile-field">
            <label htmlFor="gender" className="EditProfile-label">Gender</label>
            <select
              className="EditProfile-select"
              name="gender"
              id="gender"
              value={this.state.gender}
              onChange={this.handleGenderChange}>
              <option value="">Choose gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {
              this.state.genderError &&
              <div className="EditProfile-fieldError">{this.state.genderError}</div>
            }
          </div>
          <div className="EditProfile-field">
            <label htmlFor="privateAccount" className="EditProfile-label">Private account</label>
            <input
              type="checkbox"
              name="privateAccount"
              id="privateAccount"
              checked={this.state.privateAccount}
              onChange={this.handlePrivateAccountChange}
            />
            {
              this.state.privateAccountError &&
              <div className="EditProfile-fieldError">{this.state.privateAccountError}</div>
            }
          </div>
          <div className="EditProfile-field">
            <div></div>
            <div>
              <button type="submit" className="button is-primary">Submit</button>
            </div>
          </div>
          {
            this.props.error && (
              <div className="EditProfile-formFeedback EditProfile-formFeedback--error">{this.props.error}</div>
            )
          }
          {
            this.props.success && (
              <div className="EditProfile-formFeedback EditProfile-formFeedback--success">{this.props.success}</div>
            )
          }
        </form>
      </div>
    )
  }
}

export default EditProfile