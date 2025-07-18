const express = require('express');
const router = express.Router();

const UserController = require('../../controllers/user-controller');
const PageController = require('../../controllers/page-controller');
const PostController = require('../../controllers/post-controller');
const ServiceController = require('../../controllers/service-controller');
const ContactController = require('../../controllers/contact-controller');

// User routes
router.post('/signup', UserController.signup);
router.post('/login', UserController.login);

// Page routes
router.post('/pages', PageController.createPage);
router.get('/pages', PageController.getAllPages);
router.get('/pages/:slug', PageController.getPageBySlug);
router.put('/pages/:id', PageController.updatePage);
router.delete('/pages/:id', PageController.deletePage);

// Post routes
router.post('/posts',PostController.createPost);
router.get('/posts',PostController.getAllPosts);
router.get('/posts/id/:id',PostController.getPostById);
router.get('/posts/slug/:slug',PostController.getPostBySlug);
router.put('/posts/:id',PostController.updatePost);
router.delete('/posts/:id',PostController.deletePost);

// Service routes
router.post('/services', ServiceController.createService);
router.get('/services', ServiceController.getAllServices);
router.get('/services/:id', ServiceController.getServiceById);
router.put('/services/:id', ServiceController.updateService);
router.delete('/services/:id', ServiceController.deleteService);

// contact routes
router.post('/contacts', ContactController.createContact);
router.get('/contacts', ContactController.getAllContacts);
router.get('/contacts/:id', ContactController.getContactById);
router.delete('/contacts/:id', ContactController.deleteContact);

module.exports = router;

