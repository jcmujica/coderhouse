const express = require('express');
const cookieParser = require('cookie-parser');
var cors = require('cors');
const { config: dotEnvConfig } = require('dotenv');
const argv = require('minimist')(process.argv.slice(2));
const PORT = argv.port || 8080;
const MODE = argv.mode || "fork";
const childProcess = require('child_process');
const cluster = require('cluster');
const os = require('os');
const cpus = os.cpus().length;
const iscluster = MODE === 'CLUSTER';

console.log("MODE", argv)
console.log("PORT", argv.port)

dotEnvConfig();

if (iscluster && cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < cpus; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use(cookieParser());

    app.get('/info', (req, res) => {
        const info = {
            args: process.argv.slice(2),
            platform: process.platform,
            version: process.version,
            memoryUsage: process.memoryUsage().rss,
            path: process.cwd(),
            pid: process.pid,
            projectFolder: __dirname,
        };
        res.send(info);
    });

    app.get('/api/randoms', (req, res) => {
        const { cant } = req.query;
        const child = childProcess.fork('./randoms.js');

        child.send({ cant });

        child.on('message', (data) => {
            res.send(data);
        });

    });

};