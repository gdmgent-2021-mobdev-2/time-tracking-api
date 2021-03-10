const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const { Project } = require('../models/Project');

class ProjectController {

    getProjects = async (req, res, next) => {
        try {
            const clients = await Project.find().lean().populate('client', ['company']).exec();
            res.status(200).json(clients);
        } catch (e) {
            next(e);
        }
    }

    getProjectById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const client = await Project.findById(id).populate('client').exec();
            if (client) {
                res.status(200).json(client);
            } else {
                next(new NotFoundError());
            }
        } catch (e) {
            next(e);
        }
    }

    createProject = async (req, res, next) => {
        try {
            const client = new Project(req.body);
            const c = await client.save();
            res.status(200).json(c);
        } catch (e) {
            next(e.errors ? new ValidationError(e) : e);
        }
    }

    updateProjectById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const client = await Project.findById(id).exec();
            if (client) {
                // update
                client.overwrite(req.body);
                const result = await client.save();
                res.status(200).json(result);
            } else {
                next(new NotFoundError());
            }
        } catch (e) {
            next(e.errors ? new ValidationError(e) : e);
        }
    };

    deleteProjectById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const client = await Project.findById(id).exec();
            if (client) {
                await client.remove();
                res.status(200).json({});
            } else {
                next(new NotFoundError());
            }
        } catch (e) {
            next(e);
        }
    };

}

module.exports = ProjectController;
