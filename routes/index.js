const path = require("path");
const router = require("express").Router();
const batchRoutes = require('./batchRoutes');
const lotRoutes =  require('./lotRoutes');
const fs = require('fs')
let ip;
//router.use('*', (req, res) =>{
//	let ip = req.headers['x-forwarded-for']
//	console.log(ip)
//	fs.appendFile('ip_log.txt','ip : ' +  ip + '\n', ()=>{})
//})
//if (ip == '100.8.10.190'){
	router.use("/batch", batchRoutes);
	router.use('/lots', lotRoutes)
	//router.use(function(req, res) {
	//res.sendFile(path.join(__dirname,"../client/build/index.html" ));
	//});
//}

module.exports = router;
