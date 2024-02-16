const express= require('express');
const router = express.Router();

const {handleGenerateShortUrl,handleRedirectUrl,handleGetAnalytics} = require('../controllers/url')

router.post('/',handleGenerateShortUrl);

router.get('/:shortId',handleRedirectUrl);

router.get('/analytics/:shortId',handleGetAnalytics);

module.exports= router