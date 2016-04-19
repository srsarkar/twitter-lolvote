
var Twit = require('twit');
var config = require('./config.js');
var twitter = new Twit(config);
/**var twitter = new Twit({
	consumer_key: 'cjyo4tD7o22xhS29PI3RcW5EO',
	consumer_secret: 'MIMmDCsjyWJogp8cIOEBel0KgjJL6KPimf9VPZy648bvssCzZ4',
	access_token: '3875093548-LC2okRvptebpkYrOikRqzUspM7E7Xu0dc9ppURv',
	access_token_secret: '7SDKsOKwAPE8xxVRgzJfI2TVeSlim3oSSTpIJI1Dvw24i'
});**/

var natural = require('natural');
var http = require('http');
//var twitInfo = require('config.js');
//var twitter = new Twit(twitInfo);
var fs = require('fs');



tokenizer = new natural.WordTokenizer();


//search tweets

runLolvote();
setInterval (runLolvote, 30000) 

function search (query) {
    twitter.get('search/tweets', { q: query, count: 1 }, function(err, data, response) {
      console.log(data.statuses[0].text);
    })
}

function post (content) {
  twitter.post('statuses/update', { status: content }, function(err, data, response) {
  })
}

function resp () {
	var resp = "";
	var random = Math.floor((Math.random() * 6));

	switch (random) {
		case 0:
			resp = "Woohoo, you're the best!";
			break;
		case 1:
			resp = "YAS KWEEN!";
			break;
		case 2:
			resp = "Awwwww yeah!";
			break;
		case 3:
			resp = "I could kiss you right now. Tell a friend to vote if you want to avoid my smooches <3";
			break;
		case 4:
			resp = "There is nothing sexier than someone with a voting record";
			break;
		case 5:
			resp = "You are the wind beneath my wings. Also the American peoples' wings. Because we are a country of winged peoples.";
			break;
	}

	return resp;
}

function greeting () {
	var greeting = "";
	var random = Math.floor((Math.random() * 3));

	switch (random) {
		case 0:
			greeting = "Yo";
			break;
		case 1:
			greeting = "Hi";
			break;
		case 2:
			greeting = "Comrade";
			break;
	}

	return greeting;
}

function matchRE (tweetText) {
	//var tweetArray = tokenizer.tokenize(tweetText); 
	//var phraseArr = [/Ivoted, I'm registered/i, I'm going to vote];
	var phraseArray = ["i voted", "i will vote", "i did vote", "i'm registered", "im registered", "#ivoted", "ivoted", ];
	var text = tweetText;

	for (var i=0; i < phraseArray.length; i++) {
		var str = text.toLowerCase();
		if (str == phraseArray[i]){
			return true;
		}
	}
	return false;

	/**for (var i = 0; i < phraseArray.length; i++) {
		var re = new RegExp (phraseArray[i]);
		if (re.test(text)) {
			return true;
		}
	}**/

}


function runLolvote () {
	var stream = twitter.stream('statuses/filter', { track: '@lolvote_bot' })

	stream.on('tweet', function (tweet) {
		var asker = tweet.user.screen_name;
		var text = tweet.text;

		var content = 'gifs/vote/breakingbad.gif';

		/**twitter.post ('statuses/update', params, function (err, data, response) {
			console.log(data)
		})*/
			if (matchRE(text)) {
		  		tweetRes = greeting() + " @" + asker + ". " + response + " #NYPrimary";
		  		var gifArray = ['gifs/karatekid.gif', 'gifs/kidpresident.gif', 'gifs/mericaeagle.gif', 'gifs/waynesworld.gif', 'gifs/yaybey.gif', 'gifs/abby.gif', 'gifs/omgyas.gif', 'gifs/yas.gif', 'gifs/youretheshit.gif'];
				var n = Math.floor(Math.random() * 8);

				content = fs.readFileSync(gifArray[n], {encoding: 'base64'})
	  		} 
	  		else {
		 	 	tweetRes = "Really hope you're planning on voting, @" + asker + ". This might help: http://votersedge.nyccfb.info/ #NYPrimary";
		 	 	var gifArr = ['gifs/vote/breakingbad.gif', 'gifs/vote/leslieknope.gif', 'gifs/vote/voteordie.gif', 'gifs/vote/reginageorge.gif'];
		 	 	var i = Math.floor(Math.random() * 3);

				content = fs.readFileSync(gifArray[i], {encoding: 'base64'})
	  		}

	  		//twitter.post('media/upload', {media_data: content}, function (err, data, response) {
			var mediaIdStr = data.media_id_string;
			var tweetRes = "";
			var response = resp();

	  		var params = { status: tweetRes, media_ids: [mediaIdStr] }

	  		console.log (tweetRes + content);

	  		twitter.post ('statuses/update', params, function (err, data, response) {
	  		})
		})
	};
}



//pinging itself so that it doesn't fall asleep
//setInterval( function() {http.get("http://lolvote-bot.herokuapp.com");}, 300000; // every 5 minutes (300000)

	/**for (var i=0; i < tweetArray.length; i++) {
		for (var j=0; j < phraseArray.length; j++){
			var re = new RegExp (phraseArray[j]);
			if (re.test(tweetArray[i])) {
				return true;
			}
		}	
	}*/

  /**if (matchRE(text)) {
  	post(greeting() + "@" + asker + ". " + response() + ". #Vote2016");
  	console.log ("positive success!");
  } 
  else {
  	post("Really hope you're planning on voting, @" + asker + ". Here's a link to help: bit.ly/voooote #Vote2016");
  	console.log ("negative success");
  }
})  */

 /** for (var i=0; i < wordArray.length; i++) {
  	if (hillaryRE.test(wordArray[i])) {
  		search("hillary", asker);
  		console.log("found hillary");
  		return;
  	} else if (greetingRE.test(wordArray[i])) {
  		console.log("found hi");
  		post("hey " + "@" + asker + ". Netflix and chill?");
  		return;
  	} else {
  		console.log ("found nothing");
  	}
  }
}) */

  // RegExes
  /** var greetingRE = /^hi$/;
  var musicRE = /^music$/;
  var interactiveRE = /^interactive$/;
  var filmRE = /^film$/;
  var foodRE = /^food$/;
  var drinkRE = /^drink$/;

  if (matchRE(interactiveRE, text)) {
    console.log("interactive")
  } else if (matchRE(filmRE, text)) {
    console.log("film", text)
  } else if (matchRE(musicRE, text)) {
    console.log("music")
  } else if (matchRE(drinkRE, text)) {
    console.log("drink");
  } else if (matchRE(foodRE, text)) {
    console.log("food");
  } else if (matchRE(greetingRE, text)) {
    console.log("greeting");
  } else {
  }
 
}) */

  //RegExes
  /*var greetingRE = /^hi$/;
  var debateRE = /^debate$/;
  var demDebateRE = /^demdebate$/;

  for(var i=0;i < wordArray.length;i++) {
    if (debateRE.test(wordArray[i])) {
    	search("debate", asker);
    	return;
    } else if (greetingRE.test(wordArray[i])) {
    	post("Sup " + "@" + asker + ". Damn right I'm working");
    	return;
    }
      
  }
})*/

//track mentions

/*var stream = twitter.stream('statuses/filter', { track: '@lolvote_bot'});

stream.on('tweet', function (tweet) {
  var asker = tweet.user.screen_name;
  var text = tweet.text;
  var wordArray = tokenizer.tokenize(text);

function matchRE (re, text) {
var wordArray = tokenizer.tokenize(text);
  for(var i=0;i < wordArray.length;i++) {
    if (re.test(wordArray[i])) {
      return true;
    }
  }
  return false; 
}*/





