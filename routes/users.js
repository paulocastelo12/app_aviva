var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const UserModel = require('../models/user_model')
const Crypt = require('../utils/crypt')


/* GET users listing. */
router.get('/', async function (req, res, next) {

  try {
    const users = await UserModel
      .find({}, {
        _id: 1, name: 1, login: 1
      })
      .exec()

    res.json(users)
  } catch (err) {
    console.error
    res.status(500).json({ error: err.message })

  }

});


router.post('/', async function (req, res, next) {

  try {

    const userModel = new UserModel({
      _id: mongoose.Types.ObjectId(),
      name: req.body.name,
      login: req.body.login,
      password: Crypt.encrypt(req.body.password),
      disciples: [],
    });

    var user = await userModel.save()

    return res.json(user);

  } catch (error) {
    console.error
    res.status(500).json({ error: error.message })
  }

});

router.post('/login', async function (req, res, next) {

  try {

    const user = await UserModel.findOne({ login: req.body.login })

    if (user == null) {
      res.status(403).send({
        "message": "Invalid login or password"
      })
    } else {
      if (Crypt.decrypt(user.password) == req.body.password) {
        return res.send({
          "_id": user._id,
          "login": user.login,
          "name": user.name,
        });
      } else {
        res.status(403).send({
          "message": "Invalid login or password"
        })
      }
    }

  } catch (error) {
    console.error
    res.status(500).json({ error: error.message })
  }

});

router.put('/:id/disciple', async function (req, res, next) {

  try {

    const userUpdate = UserModel.findByIdAndUpdate(req.params['id'], {
      $push: {
        disciples: {
          _id: mongoose.Types.ObjectId(),
          name: req.body.name,
          phone: req.body.phone,
          gender: req.body.gender,
          age_group: req.body.age_group,
          district: req.body.district,
          street: req.body.street,
          number: req.body.number,
        }
      }
    });

    await userUpdate.exec()

    res.status(200).send({
      'message': "Ok"
    })

  } catch (error) {
    console.error
    res.status(500).json({ error: error.message })
  }

});

router.delete('/:id', async function (req, res, next) {
  try {
    await UserModel.findByIdAndRemove(req.params['id']).exec();
    res.send("Ok")
  } catch (error) {
    console.error
    res.status(500).json({ error: error.message });
  }

});


router.delete('/:id/disciple/:iddisciple', function (req, res, next) {

  try {

    const userUpdate = UserModel.findByIdAndUpdate(req.params['id'], {
      $pull: {
        disciples:{
          _id: req.params['iddisciple']
        }
      }
    }).exec();

    res.send("Ok")

  } catch (error) {

    console.error
    res.status(500).json({ error: error.message });
    
  }
});


router.get('/:id/disciples', async function (req, res, next) {

  try {
    const disciples = await UserModel.findOne({ _id: req.params['id'] })

    return res.json(disciples.disciples);
  
  } catch (err) {
    console.error
    res.status(500).json({ error: err.message })
  }

});

module.exports = router;
