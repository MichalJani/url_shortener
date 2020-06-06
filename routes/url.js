const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');

const Url = require('../models/Url');

// @route      POST /api/url/shorten
// @desc       Create short URL
router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = config.get('baseUrl');

  // check base url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json('Invalid base url');
  }

  // check long url (if is valid)
  if (validUrl.isUri(longUrl)) {
    try {
      // find if url already exist in a db
      let url = await Url.findOne({ longUrl });
      // if there is url, send back the whole object
      if (url) {
        res.json(url);
      } else {
        const genCodeFun = async () => {
          let genCode = shortid.generate();
          let urlCodeCheck = await Url.findOne({ urlCode: genCode });
          if (urlCodeCheck) {
            genCodeFun();
          } else {
            return genCode;
          }
        };
        // check if urlCode is unique
        const urlCode = await genCodeFun();
        const shortUrl = baseUrl + '/' + urlCode;
        // creates an instance of url
        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });
        await url.save();
        res.json(url);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json('Server error');
    }
    // if long url is not valid
  } else {
    res.status(401).send('Invalid url');
  }
});

module.exports = router;
