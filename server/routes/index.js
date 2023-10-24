const router = require('express').Router();
const audioRoutes = require('./api/audioRoute');
const dataRoutes = require('./api/dataRoute');

router.use('/api', audioRoutes);
router.use('/api', dataRoutes);

router.use((req, res) => {
  return res.send('Wrong route!');
});

module.exports = router;