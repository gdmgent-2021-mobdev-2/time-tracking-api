const NotFoundError = require('../errors/NotFoundError');
const { Log } = require('../models/Log');

class LogController {

    getLogsByProject = async (req, res, next) => {
        try {
            const { user, params } = req;
            const { projectId } = params;

            let query;
            // only admin can view all logs
            if (!user.isAdmin()) {
                query = Log.find({
                    projectId,
                    userId: user._id,
                });
            } else {
                query = Log.find({ projectId }).populate('user', ['name']);
            }
            const logs = await query.sort({ date: 'asc' }).exec();
            res.status(200).json(logs);
        } catch (e) {
            next(e);
        }
    }

    createLogByProject = async (req, res, next) => {
        try {
            const { user, params } = req;
            const { projectId } = params;

            const log = new Log({
                ...req.body,
                userId: user._id,
                projectId: projectId,
            });
            const c = await log.save();
            res.status(200).json(c);
        } catch (e) {
            next(e);
        }
    }

    updateLogByProject = async (req, res, next) => {
        try {
            const { params } = req;
            const { projectId, id } = params;

            const log = await Log.findById(id).exec();
            console.log(log);
            if (log) {
                // update
                log.overwrite({
                    ...req.body,
                    userId: log.userId,
                    projectId: log.projectId,
                });
                const result = await log.save();
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
