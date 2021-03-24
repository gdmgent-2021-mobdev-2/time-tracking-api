const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const { Project } = require('../models/Project');

class ProjectController {

    getProjects = async (req, res, next) => {
        try {
            const projects = await Project.find().lean().populate('client', ['company']).exec();
            res.status(200).json(projects);
        } catch (e) {
            next(e);
        }
    }

    getDocumentById = async (id) => {
        return await Project.findById(id).lean().populate('client', ['company']).exec();
    };

    getProjectById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const project = await this.getDocumentById(id);
            if (project) {
                res.status(200).json(project);
            } else {
                next(new NotFoundError());
            }
        } catch (e) {
            next(e);
        }
    }

    createProject = async (req, res, next) => {
        try {
            const project = new Project(req.body);
            const { _id } = await project.save();
            const result = await this.getDocumentById(_id);
            res.status(200).json(result);
        } catch (e) {
            next(e.errors ? new ValidationError(e) : e);
        }
    }

    updateProjectById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const project = await Project.findById(id).exec();
            if (project) {
                // update
                project.overwrite(req.body);
                const { _id } = await project.save();
                const result = await this.getDocumentById(_id);
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
            const project = await Project.findById(id).exec();
            if (project) {
                await project.remove();
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
