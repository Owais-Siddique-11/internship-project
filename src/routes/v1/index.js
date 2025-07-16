const express = require('express');
const router = express.Router();

const UserController = require('../../controllers/user-controller');
const PageController = require('../../controllers/page-controller');

// User routes
router.post('/signup', UserController.signup);
router.post('/login', UserController.login);

//Page routes
router.post('/pages', PageController.createPage);
router.get('/pages', PageController.getAllPages);
router.get('/pages/:slug', PageController.getPageBySlug);
router.put('/pages/:id', PageController.updatePage);
router.delete('/pages/:id', PageController.deletePage);

module.exports = router;
