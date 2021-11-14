const logger = (req, res, next) => {
    console.log('Iniciando sesion...');
    next();
}

module.exports = logger