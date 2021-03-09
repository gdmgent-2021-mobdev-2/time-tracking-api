const ClientController = require('../controllers/ClientController');

const clientController = new ClientController();

const registerRoutes = (app) => {
    app.get('/clients', clientController.getClients);
    app.post('/clients', clientController.createClient);
};

module.exports = {
    registerRoutes,
}
