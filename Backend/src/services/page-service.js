const PageRepository = require('../repository/page-repository');
const slugify = require('slugify');

class PageService {
  async createPage(data) {
    try {
      const slug = slugify(data.title, { lower: true, strict: true });

      const existingPage = await PageRepository.getPageBySlug(slug);
      if (existingPage) {
        throw new Error('Page with this title already exists');
      }

      data.slug = slug;

      const page = await PageRepository.createPage(data);
      return page;
    } catch (error) {
      console.log('Error at Page Service layer - createPage');
      throw error;
    }
  }

  async getAllPages() {
    try {
      const pages = await PageRepository.getAllPages();
      return pages;
    } catch (error) {
      console.log('Error at Page Service layer - getAllPages');
      throw error;
    }
  }

  async getPageBySlug(slug) {
    try {
      const page = await PageRepository.getPageBySlug(slug);
      if (!page) {
        throw new Error('Page not found');
      }
      return page;
    } catch (error) {
      console.log('Error at Page Service layer - getPageBySlug');
      throw error;
    }
  }

  async updatePage(id, data) {
    try {
      if (data.title) {
        const slug = slugify(data.title, { lower: true, strict: true });
        data.slug = slug;
      }

      await PageRepository.updatePage(id, data);
      return { message: 'Page updated successfully' };
    } catch (error) {
      console.log('Error at Page Service layer - updatePage');
      throw error;
    }
  }

  async deletePage(id) {
    try {
      await PageRepository.deletePage(id);
      return { message: 'Page deleted successfully' };
    } catch (error) {
      console.log('Error at Page Service layer - deletePage');
      throw error;
    }
  }
}

module.exports = new PageService();
