const express = require('express')
const router = express.Router()
const passport = require('passport')
const catchAsync = require('../utils/catchAsync')
const User = require('../models/user')
const users = require('../controllers/users')

router
  .route('/register')
  .get(users.renderRegister)
  .post(catchAsync(users.register))

router
  .route('/login')
  .get(users.renderLogin)
  .post(
    passport.authenticate('local', {
      failureFlash: true,
      failureRedirect: '/login',
    }),
    users.login
  )

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['email'],
  })
)

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureFlash: true,
    failureRedirect: '/login',
  }),
  (req, res) => {
    const redirectUrl = '/campgrounds'
    res.redirect(redirectUrl)
  }
)

router.get('/logout', users.logout)

module.exports = router
