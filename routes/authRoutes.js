const express = require('express');
const ClientController = require('../controllers/ClientController');
const ProjectController = require('../controllers/ProjectController');
const LogController = require('../controllers/LogController');
const { Roles } = require('../models/User');
const { withRole } = require('../services/auth/auth.services');

const clientController = new ClientController();
const projectController = new ProjectController();
const logController = new LogController();

const authRouter = express.Router();
const adminRouter = express.Router();

// clients
authRouter.get('/clients', clientController.getClients);
authRouter.get('/clients/:id', clientController.getClientById);

adminRouter.post('/clients', clientController.createClient);
adminRouter.patch('/clients/:id', clientController.updateClientById);
adminRouter.delete('/clients/:id', clientController.deleteClientById);

// projects
authRouter.get('/projects', projectController.getProjects);
authRouter.get('/projects/:id', projectController.getProjectById);

adminRouter.post('/projects', projectController.createProject);
adminRouter.patch('/projects/:id', projectController.updateProjectById);
adminRouter.delete('/projects/:id', projectController.deleteProjectById);

// logs
authRouter.get('/projects/:projectId/logs', logController.getLogsByProject);
authRouter.post('/projects/:projectId/logs', logController.createLogByProject);

authRouter.use(withRole(Roles.admin), adminRouter);

module.exports = authRouter;
