const { Log } = require('../models/Log');

class LogController {

    getLogsByProject = async (req, res, next) => {
        try {
            const { user, params } = req;
            const { projectId } = params;

            let query = { projectId };
            // only admin can view all logs
            if (!user.isAdmin()) {
                query = {
                    ...query,
                    userId: user._id,
                };
            }
            const logs = await Log.find(query).exec();
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

}

module.exports = LogController;
