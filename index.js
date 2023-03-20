const express = require('express');
const cors = require('cors');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const bodyParser = require('body-parser');
const axios = require('axios');
const { response } = require('express');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/getAccessToken', async function (req, res) {
  const { clientId, clientSecret, code } = req.body;
  try {
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: clientId,
        client_secret: clientSecret,
        code,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );

    res.send(response.data);
  } catch (error) {
    res.status(error.response.status).send(error.response.data);
  }
});

module.exports = app;

// app.listen(process.env.PORT || 4000, function () {
//   console.log(`Server running on port ${process.env.PORT || 3000}`);
// });
