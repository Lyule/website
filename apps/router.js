module.exports = app => {
	app.get('/', (req, res, err) => {
		return res.render('index');
	});
}