var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();



app.get('/scrape', function(req, res){

    var array = fs.readFileSync('URLs.txt').toString().split("\n");
    var num;
    var SPU;
    for(i in array) {
	num = i;
	url = array[i];
	console.log(url);
	request(url, function(error, response, html){
            if(!error){
		var $ = cheerio.load(html);
		$('center').filter(function(){
                    var data = $(this);
                    SPU = data.children().first().text();
		})
            }
	    fs.appendFileSync('output.txt', SPU+'\n'); 
	})
	console.log(num);
    }
    console.log('File successfully written! - Check your project directory for the output.json file');
})


app.listen('8081');

console.log('Magic happens on port 8081');

exports = module.exports = app;
