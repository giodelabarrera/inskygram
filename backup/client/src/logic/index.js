
const logic = {

  // url: 'http://localhost:8080/api',
  url: 'https://fierce-stream-12141.herokuapp.com/api',

  /**
   * Converts a parameter object to a string with uri format
   *
   * @param {object} parameters
   * @returns
   */
  _buildUri(parameters) {
    let uri = ''

    for (let key in parameters) {
      if (parameters.hasOwnProperty(key)) {
        const value = parameters[key]
        uri += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&'
      }
    }

    if (uri.length > 0) uri = uri.substring(0, uri.length - 1)

    return uri;
  },

  /**
   * Http client to make requests
   *
   * @param {string} path
   * @param {string} method
   * @param {object|undefined} headers
   * @param {object|undefined} body
   * @param {number} expectedStatus
   * @returns {Promise<object>}
   */
  _httpClient(path, method, headers, body, expectedStatus) {
    const config = { method }

    if (headers) config.headers = headers
    if (body) config.body = body

    return fetch(`${this.url}/${path}`, config)
      .then(res => {
        if (res.status === expectedStatus) {
          return res
        } else
          return res.json()
            .then(({ message }) => {
              throw new Error(message)
            })
      })
  },

  /**
   * Validate that a value has a string format
   *
   * @param {string} fieldName
   * @param {string} fieldValue
   */
  _validateStringField(fieldName, fieldValue) {
    if (typeof fieldValue !== 'string' || !fieldValue.length) throw new Error(`invalid ${fieldName}`)
  },

  /**
   * Validate that a value has a boolean format
   *
   * @param {string} fieldName
   * @param {string} fieldValue
   */
  _validateBooleanField(fieldName, fieldValue) {
    if (typeof fieldValue !== 'boolean') throw new Error(`invalid ${fieldName}`)
  },

  /**
   * Register a user
   *
   * @param {string} username
   * @param {string} email
   * @param {string} password
   * @returns {Promise<boolean>}
   */
  register(username, email, password) {
    return Promise.resolve()
      .then(() => {
        this._validateStringField('username', username)
        this._validateStringField('email', email)
        this._validateStringField('password', password)

        return this._httpClient('register', 'POST', {
          'Content-Type': 'application/json'
        }, JSON.stringify({ username, email, password }), 201)
          .then(() => true)
      })
  },

  /**
   * Authenticate a user
   *
   * @param {string} username
   * @param {string} password
   * @returns {Promise<string>}
   */
  authenticate(username, password) {
    return Promise.resolve()
      .then(() => {
        this._validateStringField('username', username)
        this._validateStringField('password', password)

        return this._httpClient('auth', 'POST', {
          'Content-Type': 'application/json'
        }, JSON.stringify({ username, password }), 200)
          .then(res => res.json())
          .then(({ token }) => token)
      })
  },

  /**
   * Register a user
   *
   * @param {string} [username='']
   * @param {string} [targetUsername='']
   * @param {string} [token='']
   * @returns {Promise<object>}
   */
  retrieveUser(username = '', targetUsername = '', token = '') {
    return Promise.resolve()
      .then(() => {
        if (!username && !targetUsername) throw new Error('invalid username and target username')

        if (username && !targetUsername) {
          this._validateStringField('username', username)
          this._validateStringField('token', token)

          return this._httpClient(`me`, 'GET', { authorization: `bearer ${token}` }, undefined, 200)
            .then(res => res.json())

        } else if (!username && targetUsername) {
          this._validateStringField('target username', targetUsername)

          return this._httpClient(`users/${targetUsername}`, 'GET', undefined, undefined, 200)
            .then(res => res.json())

        } else {
          this._validateStringField('username', username)
          this._validateStringField('target username', targetUsername)
          this._validateStringField('token', token)

          return this._httpClient(`users/${targetUsername}`, 'GET', { authorization: `bearer ${token}` }, undefined, 200)
            .then(res => res.json())
        }
      })
  },

  /**
   * Update a user
   *
   * @param {string} username
   * @param {string} newEmail
   * @param {string} name
   * @param {string} website
   * @param {string} phoneNumber
   * @param {string} gender
   * @param {string} biography
   * @param {boolean} privateAccount
   * @param {string} token
   * @returns {Promise<boolean>}
   */
  updateUser(username, newEmail, name, website, phoneNumber, gender, biography, privateAccount, token) {
    return Promise.resolve()
      .then(() => {
        this._validateStringField('username', username)

        if (newEmail) this._validateStringField('newEmail', newEmail)
        if (name) this._validateStringField('name', name)
        if (website) this._validateStringField('website', website)
        if (phoneNumber) this._validateStringField('phoneNumber', phoneNumber)
        if (gender) {
          this._validateStringField('gender', gender)
          if (['male', 'female'].includes(gender) === false) throw new Error(`invalid gender`);
        }
        if (biography) this._validateStringField('biography', biography)
        if (privateAccount) this._validateBooleanField('privateAccount', privateAccount)

        this._validateStringField('token', token)

        const user = { newEmail, name, website, phoneNumber, gender, biography, privateAccount }

        return this._httpClient('me', 'PUT', {
          authorization: `bearer ${token}`,
          'Content-Type': 'application/json'
        }, JSON.stringify(user), 200)
          .then(() => true)
      })
  },

  /**
   * Update the user's password
   *
   * @param {string} username
   * @param {string} password
   * @param {string} newPassword
   * @param {string} token
   * @returns {Promise<boolean>}
   */
  updateUserPassword(username, password, newPassword, token) {
    return Promise.resolve()
      .then(() => {
        this._validateStringField('username', username)
        this._validateStringField('password', password)
        this._validateStringField('newPassword', newPassword)
        this._validateStringField('token', token)

        const headers = { authorization: `bearer ${token}`, 'Content-Type': 'application/json' }

        const body = JSON.stringify({ password, newPassword })

        return this._httpClient('me/actions/update-password', 'PATCH', headers, body, 200)
          .then(() => true)
      })
  },

  /**
   * Update the user's avatar
   *
   * @param {string} username
   * @param {File} file
   * @param {string} token
   * @returns {Promise<boolean>}
   */
  updateUserAvatar(username, file, token) {
    return Promise.resolve()
      .then(() => {
        this._validateStringField('username', username)
        if (typeof file !== 'object') throw new Error('invalid file')
        this._validateStringField('token', token)

        const body = new FormData()

        body.append('avatar', file)

        return this._httpClient('me/actions/update-avatar', 'PATCH', { authorization: `bearer ${token}` }, body, 200)
          .then(() => true)
      })
  },

  /**
   * Actuate that a user follows or stops following the target user
   *
   * @param {string} token
   * @param {string} username
   * @param {string} targetUsername
   * @returns {Promise<boolean>}
   */
  toggleFollowUser(token, username, targetUsername) {
    return Promise.resolve()
      .then(() => {
        this._validateStringField('token', token)
        this._validateStringField('username', username)
        this._validateStringField('target username', targetUsername)

        const headers = { authorization: `bearer ${token}`, 'Content-Type': 'application/json' }

        const body = JSON.stringify({ targetUsername })

        return this._httpClient(`users/${targetUsername}/actions/follow`, 'POST', headers, body, 200)
          .then(() => true)
      })
  },

  /**
   * Create a post
   *
   * @param {string} username
   * @param {File} file
   * @param {string} [caption='']
   * @param {string} token
   * @returns {Promise<boolean>}
   */
  createPost(username, file, caption = '', token) {
    return Promise.resolve()
      .then(() => {
        this._validateStringField('username', username)
        if (typeof file !== 'object') throw new Error('invalid file')
        if (caption) this._validateStringField('caption', caption)
        this._validateStringField('token', token)

        const body = new FormData()

        body.append('image', file)
        if (caption) body.append('caption', caption)

        return this._httpClient('posts', 'POST', { authorization: `bearer ${token}` }, body, 201)
          .then(() => true)
      })
  },

  /**
   * Retrieve a post
   *
   * @param {string} postId
   * @param {string} [username='']
   * @param {string} [token='']
   * @returns {Promise<object>}
   */
  retrievePost(postId, username = '', token = '') {
    return Promise.resolve()
      .then(() => {
        this._validateStringField('post id', postId)

        const headers = {}

        if (username) {
          this._validateStringField('username', username)
          this._validateStringField('token', token)

          headers.authorization = `bearer ${token}`
        }

        return this._httpClient(`posts/${postId}`, 'GET', headers, undefined, 200)
      })
      .then(res => res.json())
  },

  /**
   * Returns the list of posts of the user
   *
   * @param {string} [username='']
   * @param {string} [targetUsername='']
   * @param {string} [token='']
   * @returns {Promise<Array>}
   */
  listUserPosts(username = '', targetUsername = '', token = '') {
    return Promise.resolve()
      .then(() => {
        if (!username && !targetUsername) throw new Error('invalid username and target username')

        if (username && !targetUsername) {
          this._validateStringField('username', username)
          this._validateStringField('token', token)

          return this._httpClient(`me/posts`, 'GET', { authorization: `bearer ${token}` }, undefined, 200)
            .then(res => res.json())

        } else if (!username && targetUsername) {
          this._validateStringField('target username', targetUsername)

          return this._httpClient(`users/${targetUsername}/posts`, 'GET', undefined, undefined, 200)
            .then(res => res.json())

        } else {
          this._validateStringField('username', username)
          this._validateStringField('target username', targetUsername)
          this._validateStringField('token', token)

          return this._httpClient(`users/${targetUsername}/posts`, 'GET', { authorization: `bearer ${token}` }, undefined, 200)
            .then(res => res.json())
        }
      })
      .catch(() => [])
  },

  /**
   * Returns the list of saved posts of the user
   *
   * @param {string} [username='']
   * @param {string} [targetUsername='']
   * @param {string} [token='']
   * @returns {Promise<Array>}
   */
  listUserSavedPosts(username = '', targetUsername = '', token = '') {
    return Promise.resolve()
      .then(() => {
        if (!username && !targetUsername) throw new Error('invalid username and target username')

        if (username && !targetUsername) {
          this._validateStringField('username', username)
          this._validateStringField('token', token)

          return this._httpClient(`me/saved`, 'GET', { authorization: `bearer ${token}` }, undefined, 200)
            .then(res => res.json())

        } else if (!username && targetUsername) {
          this._validateStringField('target username', targetUsername)

          return this._httpClient(`users/${targetUsername}/saved`, 'GET', undefined, undefined, 200)
            .then(res => res.json())

        } else {
          this._validateStringField('username', username)
          this._validateStringField('target username', targetUsername)
          this._validateStringField('token', token)

          return this._httpClient(`users/${targetUsername}/saved`, 'GET', { authorization: `bearer ${token}` }, undefined, 200)
            .then(res => res.json())
        }
      })
      .catch(() => [])
  },

  /**
   * Returns the list of posts of the user's wall
   *
   * @param {string} token
   * @param {string} username
   * @param {number} [page=0]
   * @param {number} [perPage=10]
   * @returns {Promise<Array>}
   */
  listUserWall(token, username, page = 0, perPage = 10) {
    return Promise.resolve()
      .then(() => {
        this._validateStringField('token', token)
        this._validateStringField('username', username)

        const uri = this._buildUri({ per_page: perPage, page })

        return this._httpClient(`me/wall?${uri}`, 'GET', { authorization: `bearer ${token}` }, undefined, 200)
          .then(res => res.json())
      })
  },

  /**
   * Add comment to a post
   *
   * @param {*} token
   * @param {*} username
   * @param {*} postId
   * @param {*} description
   * @returns
   */
  addCommentToPost(token, username, postId, description) {
    return Promise.resolve()
      .then(() => {
        this._validateStringField('token', token)
        this._validateStringField('username', username)
        this._validateStringField('post id', postId)
        this._validateStringField('description', description)

        const headers = { authorization: `bearer ${token}`, 'Content-Type': 'application/json' }

        const body = JSON.stringify({ description })

        return this._httpClient(`posts/${postId}/actions/add-comment`, 'POST', headers, body, 200)
          .then(() => true)
      })
  },

  /**
   * Actuate that a user likes a post
   *
   * @param {string} token
   * @param {string} username
   * @param {string} postId
   * @returns {Promise<boolean>}
   */
  toggleLikePost(token, username, postId) {
    return Promise.resolve()
      .then(() => {
        this._validateStringField('token', token)
        this._validateStringField('username', username)
        this._validateStringField('post id', postId)

        const headers = { authorization: `bearer ${token}`, 'Content-Type': 'application/json' }

        return this._httpClient(`posts/${postId}/actions/like`, 'POST', headers, {}, 200)
          .then(() => true)
      })
  },

  /**
   * Actuate that a user saves a post in his list of saved posts
   *
   * @param {string} token
   * @param {string} username
   * @param {string} postId
   * @returns {Promise<boolean>}
   */
  toggleSavePost(token, username, postId) {
    return Promise.resolve()
      .then(() => {
        this._validateStringField('token', token)
        this._validateStringField('username', username)
        this._validateStringField('post id', postId)

        const headers = { authorization: `bearer ${token}`, 'Content-Type': 'application/json' }

        return this._httpClient(`posts/${postId}/actions/save`, 'POST', headers, {}, 200)
          .then(() => true)
      })
  },

  /**
   * Returns the list of all posts of users with public profile
   *
   * @param {string} token
   * @param {string} username
   * @param {number} [page=0]
   * @param {number} [perPage=10]
   * @returns {Promise<Array>}
   */
  listExplorePosts(token, username, page = 0, perPage = 10) {
    return Promise.resolve()
      .then(() => {
        this._validateStringField('token', token)
        this._validateStringField('username', username)

        const uri = this._buildUri({ per_page: perPage, page })

        return this._httpClient(`me/explore?${uri}`, 'GET', { authorization: `bearer ${token}` }, undefined, 200)
          .then(res => res.json())
      })
  },

  /**
   * Search for users
   *
   * @param {string} query
   * @returns {Promise<Array>}
   */
  search(query) {
    return Promise.resolve()
      .then(() => {
        this._validateStringField('query', query)

        const uri = this._buildUri({ q: query })

        return this._httpClient(`search?${uri}`, 'GET', undefined, undefined, 200)
          .then(res => res.json())
      })
  },

  /**
   * Returns the statistics of a user
   *
   * @param {string} username
   * @returns {Promise<object>}
   */
  retrieveUserStats(username) {
    return Promise.resolve()
      .then(() => {
        this._validateStringField('username', username)

        return this._httpClient(`users/${username}/stats`, 'GET', undefined, undefined, 200)
          .then(res => res.json())
      })
  },

}

module.exports = logic