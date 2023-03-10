const express = require('express');
const { 
  authController,
  userController,
  categoryController,
  blogPostController,
} = require('./controllers');
const { validateProUser } = require('./midd/validationPropUser');
const { tokenValidate } = require('./midd/auth');

// ...

const app = express();

app.use(express.json());

app.post('/login', validateProUser, authController.login);
app.post('/user', userController.insertUser);
app.post('/categories', tokenValidate, categoryController.insertCategory);
app.post('/post', tokenValidate, blogPostController.insertPost);
app.get('/user', tokenValidate, userController.getUsers);
app.get('/user/:id', tokenValidate, userController.getUser);
app.get('/categories', tokenValidate, categoryController.getCategories);
app.get('/post', tokenValidate, blogPostController.getPosts);
app.get('/post/search', tokenValidate, blogPostController.queryPost);
app.get('/post/:id', tokenValidate, blogPostController.getPostId);
app.put('/post/:id', tokenValidate, blogPostController.updatePost);
app.delete('/post/:id', tokenValidate, blogPostController.removePost);
app.delete('/user/me', tokenValidate, userController.removeUser);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
