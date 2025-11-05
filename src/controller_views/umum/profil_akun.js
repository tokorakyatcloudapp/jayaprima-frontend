module.exports = () => {
    return async (req, res, next) => {
        const data = {
            title: 'Profil Akun',
            layout:'admin'
        };
        try {
            res.render('page_umum/profil_akun', data);
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