const ClientController = require('../controllers/ClientController');
const NotFoundError = require('../errors/NotFoundError');

const clientController = new ClientController();

const registerRoutes = (app) => {
    app.get('/clients', clientController.getClients);
    app.get('/clients/:id', clientController.getClientById);

    app.post('/clients', clientController.createClient);
    app.patch('/clients/:id', clientController.updateClientById);

    app.delete('/clients/:id', clientController.deleteClientById);


    // default 404
    app.use((req, res, next) => {
        next(new NotFoundError());
    });

    // error handler
    app.use(function (err, req, res, next) {
        res.status(err.statusCode || 500);
        res.json(err);
    });
};

module.exports = {
    registerRoutes,
}
