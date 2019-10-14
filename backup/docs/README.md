# Inskygram

The application allows its use by registering users. The user can upload their photos and follow other users to see the photos of them.

You can also interact with your photos, those of users that follow and those of users of public profiles through likes, comments and the possibility of saving a photo as a favorite.

The search engine of the application searches for users.

Each user has a profile page where they can see their data as related to the photos (uploaded photos, saved photos).

The user can have a section where they can edit their personal data, such as activating their profile as private.

## Technologies

### Backend

Typescript, NodeJs, Express, MongoDB, Mongoose, JWT, Webpack, TDD -Jest-

### Frontend

ES6, React, SASS, SUIT CSS, Webpack, Babel, TDD -Jest-

## Functional description

### Description

#### Register

Fields to register:

- username _**required_
- email _**required_
- password  _**required_

#### Login

Fields to login:

- username
- password

#### Wall

Wall where the user can see all the photos with their details that he has uploaded and that of the users that follow.

#### Profile

Page with the user's details:

In the header there must be

- Avatar picture
- Username
- Biography
- Number of posts
- Number of followers
- Number of followings

And in the bottom part separated by tabs

_Posts_
List of photos uploaded by the user

_Saved posts_
Photos that the user has saved

#### Edit profile

Configuration page for user data separated by tabs:

_Edit profile_

- username _disabled_
- name
- website
- biography
- email
- telephone number
- gender
- private account

_Change password_

- current password
- new password

#### Search

Search for users and by selecting one we access your profile

#### Post

_Create_

A user can publish a post with the next fields:

- image
- caption

_Comment_

A user can comment through the comment icon on his photo, a user that follows or a public user.

The comments will be displayed in ascending order of publication, that is, the oldest and below the last.

_Like_

A user can mark / unmark as a favorite a photo using the heart icon.

Under the heart should be seen the number of likes of the photo.

_Saved_

A user can be saved or a photo from the tape icon. At the same time you can stop wanting to save it by marking it again on the icon.

In the user profile you can see from the saved tab the list of saved photos sorted by saving date.

#### Private user

The examples described below are when the user is not following the private user.

- A user will not be able to see the posts of a private user. (with the url of the post for example)
- A user can see the profile of a private user but only the data, not the photos.

### Use case

![Use case](./images/use-case.png)

## Technical description

### Architecture

![Data model](./images/architecture.png)

### API

[API Documentation](https://documenter.getpostman.com/view/2257838/RWaKSo98)

![](./images/api-doc.png)

### Data model

![Data model](./images/data-model.png)