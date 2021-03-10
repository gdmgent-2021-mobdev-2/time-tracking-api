const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const { Client } = require('../models/Client');

class ClientController {

    getClients = async (req, res, next) => {
        try {
            const clients = await Client.find().exec();
            res.status(200).json(clients);
        } catch (e) {
            next(e);
        }
    }

    getClientById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const client = await Client.findById(id).exec();
            if (client) {
                res.status(200).json(client);
            } else {
                next(new NotFoundError());
            }
        } catch (e) {
            next(e);
        }
    }

    createClient = async (req, res, next) => {
        try {
            const client = new Client(req.body);
            const c = await client.save();
            res.status(200).json(c);
        } catch (e) {
            next(e.errors ? new ValidationError(e) : e);
        }
    }

    updateClientById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const client = await Client.findById(id).exec();
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

    deleteClientById = async (req, res, next) => {
        // TODO make sure projects are deleted as well
        try {
            const { id } = req.params;
            const client = await Client.findById(id).exec();
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

module.exports = ClientController;
