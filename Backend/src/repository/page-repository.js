const { Page } = require('../models');

class PageRepository {
  async createPage(data) {
    try {
      return await Page.create(data);
    } catch (error) {
      console.log('Error in PageRepository - createPage:', error);
      throw error;
    }
  }

  async getAllPages() {
    try {
      return await Page.findAll();
    } catch (error) {
      console.log('Error in PageRepository - getAllPages:', error);
      throw error;
    }
  }

  async getPageBySlug(slug) {
    try {
      return await Page.findOne({ where: { slug } });
    } catch (error) {
      console.log('Error in PageRepository - getPageBySlug:', error);
      throw error;
    }
  }

  async updatePage(id, data) {
    try {
      return await Page.update(data, { where: { id } });
    } catch (error) {
      console.log('Error in PageRepository - updatePage:', error);
      throw error;
    }
  }

  async deletePage(id) {
    try {
      return await Page.destroy({ where: { id } });
    } catch (error) {
      console.log('Error in PageRepository - deletePage:', error);
      throw error;
    }
  }
}

module.exports = new PageRepository();
