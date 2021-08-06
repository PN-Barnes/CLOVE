const router = require('express').Router();
const { User, Basket, Product } = require('../models');
const withAuth = require('../utils/auth');
const Op = require('sequelize').Op;

router.get('/', async (req, res) => {
  try {
    console.log('Grabbing listings');
  } catch (error) {}
});
