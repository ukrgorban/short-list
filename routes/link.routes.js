const {Router} = require('express');
const config = require('config');
const shortid = require('shortid');
const Link = require('../models/Link');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.post(
  '/generate',
  auth,
  async (req, res) =>{
    try{

      const baseUrl = config.get('baseUrl');

      const {from} = req.body;

      const code = shortid.generate();

      const existen = await Link.findOne({ from });

      if(existen){
        return res.json({ link: existen })
      }

      const to = baseUrl + '/to/' + code;

      const link = new Link({ from, to, code, owner: req.user.userId});

      await link.save();

      res.status(201).json({link})

    }catch(e){
      res.status(500).json({ message: 'Error' });
    }

  }
);

router.get(
  '/:id',
  auth,
  async (req, res) =>{
    try{
      const link = await Link.findById(req.params.id);
      res.json(link);
    }catch(e){
      res.status(500).json({ message: 'Error' });
    }
  }
);

router.get(
  '/',
  auth,
  async (req, res) => {
    try{
      const links = await Link.find({ owner: req.user.userId });
      res.json(links);
    }catch(e){
      res.status(500).json({ message: 'Error' });
    }
  }
)

module.exports = router;