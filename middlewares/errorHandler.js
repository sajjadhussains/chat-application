const createError = require('http-errors');

function notfoundHandler(req, res, next) {
    next(createError(404, "Your requested url was not found"))
}

function errorHandler(err, req, res, next) {
    res.locals.error =
        process.env.NODE_ENV === "development" ? err : { message: err.message };
    res.status(err.status || 500);

    if (res.locals.html) {
        //html response
        res.render("errro", {
            title: "Error page"
        });
    }
    else {
        //json response
        res.json(res.locals.error);
    }
}

module.exports = {
    notfoundHandler,
    errorHandler,
}