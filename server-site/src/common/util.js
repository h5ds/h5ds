const fs = require('fs');
const path = require('path');

module.exports = {
    loadRoutes(app, routeFolder) {
        fs.readdirSync(routeFolder).forEach(name => {
            const routePath = path.join(routeFolder, name);
            if (fs.statSync(routePath).isFile() && path.extname(routePath) === '.js') {
                const { router } = require(routePath);
                app.use('/', router);
            }
        })
    },
    root(...args) {
        return path.join(__dirname, '..', ...args);
    }
};
