const ContactService = require('../services/contact-service');

const createContact = async (req, res) => {
    try {
        const contact = await ContactService.create(req.body);
        return res.status(201).json({
            success: true,
            message: "Contact created successfully",
            data: contact,
            err: {}
        });
    } catch (error) {
        console.log("Controller Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create contact",
            data: {},
            err: error
        });
    }
};

const getAllContacts = async (req, res) => {
    try {
        const contacts = await ContactService.getAll();
        return res.status(200).json({
            success: true,
            message: "All contacts fetched successfully",
            data: contacts,
            err: {}
        });
    } catch (error) {
        console.log("Controller Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch contacts",
            data: {},
            err: error
        });
    }
};

const getContactById = async (req, res) => {
    try {
        const contact = await ContactService.getById(req.params.id);
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact not found",
                data: {},
                err: {}
            });
        }
        return res.status(200).json({
            success: true,
            message: "Contact fetched successfully",
            data: contact,
            err: {}
        });
    } catch (error) {
        console.log("Controller Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch contact",
            data: {},
            err: error
        });
    }
};

const deleteContact = async (req, res) => {
    try {
        const result = await ContactService.delete(req.params.id);
        if (result === 0) {
            return res.status(404).json({
                success: false,
                message: "Contact not found or already deleted",
                data: {},
                err: {}
            });
        }
        return res.status(200).json({
            success: true,
            message: "Contact deleted successfully",
            data: { deleted: true },
            err: {}
        });
    } catch (error) {
        console.log("Controller Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete contact",
            data: {},
            err: error
        });
    }
};

module.exports = {
    createContact,
    getAllContacts,
    getContactById,
    deleteContact
};
