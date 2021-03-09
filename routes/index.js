const ClientController = require('../controllers/ClientController');

const clientController = new ClientController();

const registerRoutes = (app) => {
    app.get('/clients', clientController.getClients);
    app.get('/clients/:id', clientController.getClientById);

    app.post('/clients', clientController.createClient);
    app.patch('/clients/:id', clientController.updateClientById);

    app.delete('/clients/:id', clientController.deleteClientById);
};

module.exports = {
    registerRoutes,
}
