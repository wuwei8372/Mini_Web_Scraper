var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var async   = require('async');


var array = fs.readFileSync('URLs.txt').toString().split("\n");
var q = async.queue(function (task, done) {
    request(task.url, function(err, res, body) {
        if (err) return done(err);
        if (res.statusCode != 200) return done(res.statusCode);

        var $ = cheerio.load(body);
       	$('center').filter(function(){
            var data = $(this);
            SPU = data.children().first().text();
	});
	fs.appendFileSync('output.txt', SPU+'\n'); 
        done();
	});
}, 5);

for(i in array) {
    q.push({url: array[i]});
}
/*for(i in array) {
    num = i;
    url = array[i];
    console.log(url);
    request(url, function(error, response, html){
	if(!error){
	var $ = cheerio.load(html);
	$('center').filter(function(){
                var data = $(this);
                SPU = data.children().first().text();
	});
        }
	fs.appendFileSync('output.txt', SPU+'\n'); 
    });
    console.log(num);
}
console.log('File successfully written! - Check your project directory for the output.json file');*/

