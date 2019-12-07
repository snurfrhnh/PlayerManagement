const express = require('express')
const router = express.Router()
const Player = require('../models/player')

// All Players Route
router.get('/', async (req, res) => {
  let searchOptions = {}
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
  try {
    const players = await Player.find(searchOptions)
    res.render('players/index', {
      players: players,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/')
  }
})

// New Player Route
router.get('/new', (req, res) => {
  res.render('players/new', { player: new Player() })
})

// Create Player Route
router.post('/', async (req, res) => {
  const player = new Player({
    name: req.body.name
  })
  try {
    const newplayer = await player.save()
    // res.redirect(`players/${newPlayer.id}`)
    res.redirect(`players`)
  } catch {
    res.render('players/new', {
      player: player,
      errorMessage: 'Error creating Player'
    })
  }
})

module.exports = router