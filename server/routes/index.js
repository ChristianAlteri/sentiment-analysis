const router = require('express').Router();
const audioRoutes = require('./api/audioRoute');

router.use('/api', audioRoutes);

router.use((req, res) => {
  return res.send('Wrong route!');
});

module.exports = router;