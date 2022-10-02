export function errorHandler (err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500).json({
        status: 'failed',
        response: {
            message: 'Internal server error'
        }
    })
}