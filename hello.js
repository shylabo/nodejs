// console.log('Hello World');

//non blocking
//時間がかかりそうな処理は次の処理を止めないようにコールバック関数で実装する
setTimeout(function() {
	console.log('hello');
}, 1000);
console.log('world');

//blocking
//スレッドがひとつなので他の処理を止めてしまうとまずい
let start = new Date().getTime();
while (new Date().getTime() < start + 5000);
console.log('world');