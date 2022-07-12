import { Router } from 'express';
import ConfigController from '../controllers/ConfigController.js';
import { isAdmin, isAuth } from '../middlewares/auth.js';

const router = new Router();

class configRouter {
    constructor() {
        this.controller = new ConfigController();
    }

    start() {
        router.get('/', isAuth, isAdmin, async (req, res, next) => {
            // get content of config.js file and return it as json
            const data = await this.controller.getConfig()
            res.json({ data });
        });

        return router;
    };
};

export default configRouter;