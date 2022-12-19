const express = require('express');
const { validationAuth } = require('../../midd/index.js');
const { getData } = require('../../data/index.js');

const router = express.Router();

router.get('/search',
validationAuth,
async (request, response) => {
  const { q } = request.query;
  const data = await getData();
  const search = data.filter((el) => el.name.includes(q));

  if (q === undefined || q === '') {
    response.status(200).json(search);
  } 
  
  response.status(200).json(search);
});

module.exports = router;