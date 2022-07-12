import config from '../config.js';

export default class ConfigController {
    async getConfig() {
        return config;
    }
}