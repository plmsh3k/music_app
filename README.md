# Music Application
This is Music Application, taht been implemented to provide users with a conviniet to add, share to others their favorite songs!
## Project structure
```
+---controllers
|   |   errorController.js
|   |   homeController.js
|   |   songsController.js
|   |   subscribersController.js
|   \   usersController.js
|   
+---models
|   |   song.js
|   |   subscriber.js
|   \   user.js
|   
+---public
|   |
|   +---css
|   |  bootstrap.css
|   |  music_app.css
|   |
|   +---images
|   |  error.jpg
|   |  logo.png
|   |
|   +---js
|   |  recipeApp.js
|   |
|   \   404.html
|   
+---views
|   |
|   +---partials
|   |   \  navigation.ejs
|   |  
|   +---songs
|   |   |  edit.ejs
|   |   |  index.ejs
|   |   |  new.ejs
|   |   \  edit.ejs
|   |
|   +---subscribers
|   |   |  edit.ejs
|   |   |  index.ejs
|   |   |  new.ejs
|   |   \  edit.ejs
|   |
|   +---users
|   |   |  edit.ejs
|   |   |  index.ejs
|   |   |  login.ejs
|   |   |  new.ejs
|   |   \   show.ejs
|   |   contact.ejs
|   |   error.ejs
|   |   index.ejs
|   |   layout.ejs
|   |   songs.ejs
|   \   thanks.ejs
|
|   .gitignore
|   music_app-1.0.0.tgz
|   main.js
|   package.json
|   README.md
\   package-lock.json
```
## Run Locally

1. Clone the project

```bash
  git clone https://github.com/plmsh3k/music_app.git
```

2. Install dependencies

```bash
  npm install music_app-1.0.0.tgz
```

3. Start the server

```bash
  nodemon
```
