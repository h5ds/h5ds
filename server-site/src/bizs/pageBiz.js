const { getH5 } = require('../action/getH5');

function renderIndex(req, res, next) {
    res.render('index');
}

function renderH5(req, res, next) {
    getH5(req, res, function (data) {
        data = JSON.parse(data) || {};
        res.render('h5', {
            list: data.rows,
            count: data.count
        });
    });
}

function renderUI(req, res) {
    res.render('ui');
}

function renderLogin(req, res) {
    res.render('login');
}

function renderRegister(req, res) {
    res.render('register');
}

function renderPlugin(req, res) {
    res.render('plus');
}

function renderLicense(req, res) {
    res.render('license');
}

function renderCase(req, res) {
    res.render('case');
}

function renderH5Editor(req, res) {
    res.render('edit');
}

function renderNotFound(req, res) {
    res.render('404');
}

module.exports = {
    renderIndex,
    renderH5,
    renderUI,
    renderLogin,
    renderRegister,
    renderPlugin,
    renderLicense,
    renderCase,
    renderH5Editor,
    renderNotFound
};
