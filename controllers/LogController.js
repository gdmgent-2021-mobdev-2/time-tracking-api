const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const { Log } = require('../models/Log');

class LogController {

    getLogsByProject = async (req, res, next) => {
        try {
            const { user, params } = req;
            const { projectId } = params;

            let query;
            if (user.isAdmin()) {
                // admin is allowed to view all logs
                query = Log.find({ projectId }).populate('user', ['name']);
            } else {
                // user is only allowed to see own logs
                query = Log.find({
                    projectId,
                    userId: user._id,
                });
            }
            const logs = await query.sort({ date: 'asc' }).exec();
            res.status(200).json(logs);
        } catch (e) {
            next(e);
        }
    }

    getDocumentById = async (id) => {
        return await Log.findById(id).lean().populate('user', ['name']).exec();
    };

    createLogByProject = async (req, res, next) => {
        try {
            const { user, params } = req;
            const { projectId } = params;

            // non admin can only make own logs
            const log = new Log({
                ...req.body,
                projectId,
                ...(!user.isAdmin() ? { userId: user._id}: {}),
            });
            const { _id } = await log.save();
            const result = await this.getDocumentById(_id);
            res.status(200).json(result);
        } catch (e) {
            next(e);
        }
    }

    updateLogByProject = async (req, res, next) => {
        try {
            const { user, params } = req;
            const { projectId, id } = params;

            const log = await Log.findOne({
                _id: id,
                projectId,
                ...(!user.isAdmin() ? { userId: user._id } : {}),
            }).exec();

            if (log) {
                log.overwrite({
                    ...log,
                    ...req.body,
                });
                const { _id } = await log.save();
                const result = await this.getDocumentById(_id);
                res.status(200).json(result);
            } else {
                next(new NotFoundError());
            }
        } catch (e) {
            next(e);
        }
    }

}

module.exports = LogController;
