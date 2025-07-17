const Service = require('../services/service-service');

const createService = async (req, res) => {
  try {
    const response = await Service.createService(req.body);
    return res.status(201).json({
      message: 'Created a Service Successfully',
      data: response,
      err: {},
      success: true
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to create the Service',
      data: {},
      err: error,
      success: false
    });
  }
};

const getAllServices = async (req, res) => {
  try {
    const response = await Service.getAllServices();
    return res.status(200).json({ 
      message: 'Fetched all Services Successfully',
      data: response,
      err: {},
      success: true
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to fetch Services',
      data: {},
      err: error,
      success: false
    });
  }
};

const getServiceById = async (req, res) => {
  try {
    const { id } = req.params; 
    const response = await Service.getServiceById(id);
    return res.status(200).json({
      message: 'Fetched Service Successfully',
      data: response,
      err: {},
      success: true
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to fetch the Service',
      data: {},
      err: error,
      success: false
    });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params; 
    const response = await Service.updateService(id, req.body);
    return res.status(200).json({
      message: 'Updated Service Successfully',
      data: response,
      err: {},
      success: true
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to update the Service',
      data: {},
      err: error,
      success: false
    });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params; 
    const response = await Service.deleteService(id);
    return res.status(200).json({
      message: 'Deleted Service Successfully',
      data: response,
      err: {},
      success: true
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to delete the Service',
      data: {},
      err: error,
      success: false
    });
  }
};

module.exports = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService
};
