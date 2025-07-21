const express = require('express');
const router = express.Router();

const UserController = require('../../controllers/user-controller');
const PageController = require('../../controllers/page-controller');
const PostController = require('../../controllers/post-controller');
const ServiceController = require('../../controllers/service-controller');
const ContactController = require('../../controllers/contact-controller');

const authenticateUser = require('../../middlewares/authMiddleware');
const checkRole = require('../../middlewares/checkRole');

// User routes (public)
router.post('/signup', UserController.signup);
router.post('/login', UserController.login);

// Page routes
router.post('/pages', authenticateUser, checkRole("admin"), PageController.createPage);
router.get('/pages', PageController.getAllPages); // public
router.get('/pages/:slug', PageController.getPageBySlug);
router.put('/pages/:id', authenticateUser, checkRole("admin"), PageController.updatePage);
router.delete('/pages/:id', authenticateUser, checkRole("admin"), PageController.deletePage);

// Post routes
router.post('/posts', authenticateUser, checkRole("admin"), PostController.createPost);
router.get('/posts', PostController.getAllPosts);
router.get('/posts/id/:id', PostController.getPostById);
router.get('/posts/slug/:slug', PostController.getPostBySlug);
router.put('/posts/:id', authenticateUser, checkRole("admin"), PostController.updatePost);
router.delete('/posts/:id', authenticateUser, checkRole("admin"), PostController.deletePost);

// Service routes
router.post('/services', authenticateUser, checkRole("admin"), ServiceController.createService);
router.get('/services', ServiceController.getAllServices);
router.get('/services/:id', ServiceController.getServiceById);
router.put('/services/:id', authenticateUser, checkRole("admin"), ServiceController.updateService);
router.delete('/services/:id', authenticateUser, checkRole("admin"), ServiceController.deleteService);

// Contact routes
router.post('/contacts', ContactController.createContact); // public (for users)
router.get('/contacts', authenticateUser, checkRole("admin"), ContactController.getAllContacts);
router.get('/contacts/:id', authenticateUser, checkRole("admin"), ContactController.getContactById);
router.delete('/contacts/:id', authenticateUser, checkRole("admin"), ContactController.deleteContact);

module.exports = router;
