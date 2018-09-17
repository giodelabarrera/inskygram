import React, { Component } from 'react'
import './CreationPost.sass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class CreationPost extends Component {

  state = {
    image: undefined,
    caption: '',
    modalIsOpen: false,
    error: ''
  }

  handleImage = event => {
    this.setState({ image: event.target.files[0] })
  }

  handleCaption = event => this.setState({ caption: event.target.value })

  handleSubmit = async (event) => {
    event.preventDefault()

    const { image, caption } = this.state

    try {
      await this.props.onSubmit(image, caption)
    } catch ({ message }) {
      this.setState({ error: message })

      this.props.onError(message)
    }
  }

  render() {
    return (
      <div className="CreationPost">
        <form className="CreationPost-form" onSubmit={this.handleSubmit}>
          <div className="CreationPost-imageWrapper">
            <label htmlFor="image">
              <input type="file" name="image" id="image" onChange={this.handleImage} style={{ display: 'none' }} />
              <span className="CreationPost-uploadButton button" type="button">
                <FontAwesomeIcon
                  icon={['fas', 'upload']}
                  className="" />
                <span className="CreationPost-uploadButtonLabel"> Choose a file</span>
              </span>
            </label>
            {this.state.image && <div>File selected! <span role="img" aria-label="yeah!">😎</span></div>}
          </div>
          <div className="CreationPost-fieldsWrapper">
            <div className="CreationPost-field">
              <label htmlFor="caption" className="CreationPost-label">Caption</label>
              <textarea
                id="caption"
                className="CreationPost-textarea"
                onChange={this.handleCaption}
              ></textarea>
            </div>
            <div>
              <button refs="submit-" className="button is-primary" type="submit" >Submit</button>
            </div>
            {
              this.state.error && (
                <div className="CreationPost-formFeedback CreationPost-formFeedback--error">{this.state.error}</div>
              )
            }
          </div>
        </form>
      </div>
    )
  }
}

export default CreationPost