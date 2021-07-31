var http = require('http'),
	fs = require('fs'),
	ejs = require('ejs'),
	qs = require('querystring'); //フォームからの情報取得
var settings = require('./settings');
var server = http.createServer();
//fs.readFileSyncはブロッキングな命令。ただリクエストを待ち受ける前の処理なので特に問題はなし。
var template = fs.readFileSync(__dirname + '/public_html/bbs.ejs', 'utf-8');
var posts = [];

function renderForm(posts, res) {
	var data = ejs.render(template, {
		posts: posts,
	});
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(data);
	res.end();
}

server.on('request', function(req, res) {
	//この辺りは決まり文句っぽい
	if (req.method === 'POST') {
		req.data = ""; //まず初期化
		//リクエストデータを受信している間、それを追加する
		req.on("readable", function() {
			req.data += req.read();
		});
		req.on("end", function() {
			var query = qs.parse(req.data);
			posts.push(query.name);
			renderForm(posts, res);
		});
	} else {
		renderForm(posts, res);
	}
	
	//fs.readFileでファイルを読み込み
	//__dirnameで現在のディレクトリ名を取得できる
	// fs.readFile(__dirname + '/public_html/hello.html', 'utf-8', function(err, data) {
	// 	if (err) {
	// 		res.writeHead(404, {'Content-Type': 'text/plain'});
	// 		res.write("not found!");
	// 		return res.end();
	// 	}
	// });

	// var data = ejs.render(template, {
	// 	title: "hello",
	// 	content: "<strong>World!</strong>",
	// });
	//text/xxxでファイルの種別を指定

	//urlによる出し分けをすることもできる
	// switch (req.url) {
	// 	case '/about':
	// 		msg = "about this page";
	// 		break;
	// 	case '/profile':
	// 		msg = "about me";
	// 		break;
	// 	default:
	// 		msg = 'wrong page';s
	// 		break;
	// }
});

//ローカル環境のIPアドレスはコンソールからifconfigコマンドでen0を確認
server.listen(settings.port, settings.host);
console.log('server listening...');