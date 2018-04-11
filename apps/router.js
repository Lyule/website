module.exports = app => {
    app.get('/', (req, res, err) => {
        return res.render('index');
    });

    app.get('/login', (req, res, err) => {

        if (!req.query.username || !req.query.password) {
            return res.send({
                code: -1,
                data: req.query,
                msg: 'username或者password输入不正确'
            });
        }

        return res.send({
            code: 1,
            data: req.query,
            msg: 'success'
        });
    });


    app.post('/login', (req, res, next) => {
    	if(!req.body.username || !req.body.password){
    		return res.send({
                code: -1,
                data: req.body,
                msg: 'username或者password输入不正确'
            });
    	}

    	return res.send({
            code: 1,
            data: req.body,
            msg: 'success'
        });
    });
}