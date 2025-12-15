module.exports = () => {
    return async (req, res, next) => {
        const data = {
            title: 'Dashboard',
            layout:'admin'
        };
        try {
            res.render('page_umum/dashboard', data);
        } catch (error) {
            console.error('Error in .' + data + ':', error);
            res.status(500).render('error', {
                title: 'Error',
                message: 'Internal server error',
                error: error.message
            });
        }
    }
}