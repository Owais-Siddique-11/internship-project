const postRepository = require('../repository/post-repository');
const slugify = require('slugify');

class PostService {
  async createPost(data) {
    try {
      data.slug = slugify(data.title, { lower: true });
      const response = await postRepository.createPost(data);
      return response;
    } catch (error) {
      console.log('Error in post service:', error);
      throw error;
    }
  }

  async getAllPosts() {
    try {
      return await postRepository.getAllPosts();
    } catch (error) {
      console.log('Error in post service:', error);
      throw error;
    }
  }

  async getPostById(id) {
    try {
      return await postRepository.getPostById(id);
    } catch (error) {
      console.log('Error in post service:', error);
      throw error;
    }
  }

  async getPostBySlug(slug) {
    try {
      return await postRepository.getPostBySlug(slug);
    } catch (error) {
      console.log('Error in post service:', error);
      throw error;
    }
  }

  async updatePost(id, data) {
    try {
      if (data.title) {
        data.slug = slugify(data.title, { lower: true });
      }
      return await postRepository.updatePost(id, data);
    } catch (error) {
      console.log('Error in post service:', error);
      throw error;
    }
  }

  async deletePost(id) {
    try {
      return await postRepository.deletePost(id);
    } catch (error) {
      console.log('Error in post service:', error);
      throw error;
    }
  }
}

module.exports = new PostService();
