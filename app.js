var exp = require("express");
var bodyparser = require('body-parser');
var app = exp();
var serverData = [
	{"id": "1", "author": "Willium Shakespeare", "text": "The Tempest"},
	{"id": "3", "author": "Mahatma Gandhi", "text": "My Experiments with Truth"}
];

app.use(exp.static(__dirname + "/public"));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));


app.get("/serverdata", function(req, res){
	console.log("contacted the server: GET ");

	res.json(serverData);
});
app.post("/serverdata", function(req, res){
	console.log("contacted the server: POST ");
	console.log(JSON.stringify(req.body));
	console.log("author=%s text=%s", req.body.author, req.body.text);
	req.body.id = new Date();
	console.log(JSON.stringify(req.body));
	serverData.push(req.body);
	res.json(serverData);
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log("server is listening on port " + port);
});
