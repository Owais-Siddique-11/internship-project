const express = require('express');
const router = express.Router();

const UserController = require('../../controllers/user-controller');
const PageController = require('../../controllers/page-controller');
const PostController = require('../../controllers/post-controller');

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

module.exports = router;

