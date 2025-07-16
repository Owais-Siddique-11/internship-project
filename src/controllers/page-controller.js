const PageService = require('../services/page-service');

const createPage = async (req, res) => {
  try {
    const page = await PageService.createPage(req.body);
    return res.status(201).json({
      success: true,
      message: 'Page created successfully',
      data: page,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create page',
      data: {},
      err: error.message,
    });
  }
};

const getAllPages = async (req, res) => {
  try {
    const pages = await PageService.getAllPages();
    return res.status(200).json({
      success: true,
      message: 'Pages fetched successfully',
      data: pages,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch pages',
      data: {},
      err: error.message,
    });
  }
};

const getPageBySlug = async (req, res) => {
  try {
    const page = await PageService.getPageBySlug(req.params.slug);
    return res.status(200).json({
      success: true,
      message: 'Page fetched successfully',
      data: page,
      err: {},
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: 'Page not found',
      data: {},
      err: error.message,
    });
  }
};

const updatePage = async (req, res) => {
  try {
    const result = await PageService.updatePage(req.params.id, req.body);
    return res.status(200).json({
      success: true,
      message: result.message,
      data: {},
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update page',
      data: {},
      err: error.message,
    });
  }
};

const deletePage = async (req, res) => {
  try {
    const result = await PageService.deletePage(req.params.id);
    return res.status(200).json({
      success: true,
      message: result.message,
      data: {},
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete page',
      data: {},
      err: error.message,
    });
  }
};

module.exports = {
  createPage,
  getAllPages,
  getPageBySlug,
  updatePage,
  deletePage,
};
