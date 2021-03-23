const express = require('express');
const ClientController = require('../controllers/ClientController');
const ProjectController = require('../controllers/ProjectController');
const LogController = require('../controllers/LogController');
const UserController = require('../controllers/UserController');
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

// clients admin only
adminRouter.post('/clients', clientController.createClient);
adminRouter.patch('/clients/:id', clientController.updateClientById);
adminRouter.delete('/clients/:id', clientController.deleteClientById);

// projects
authRouter.get('/projects', projectController.getProjects);
authRouter.get('/projects/:id', projectController.getProjectById);

// projects admin only
adminRouter.post('/projects', projectController.createProject);
adminRouter.patch('/projects/:id', projectController.updateProjectById);
adminRouter.delete('/projects/:id', projectController.deleteProjectById);

// project logs
authRouter.get('/projects/:projectId/logs', logController.getLogsByProject);
authRouter.post('/projects/:projectId/logs', logController.createLogByProject);
authRouter.patch('/projects/:projectId/logs/:id', logController.updateLogByProject);

// users
adminRouter.get('/users', UserController.getUsers);

// set admin routes
authRouter.use(withRole(Roles.admin), adminRouter);

module.exports = authRouter;
