var Twit = require('twit');
var natural = require('natural');
var twitInfo = require('config.js');
var twitter = new Twit(twitInfo);
var fs = require('fs');

tokenizer = new natural.WordTokenizer();


//search tweets

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
			resp = "YAS QUEEN! Don't forget - NYC Election 11/3!";
			break;
		case 2:
			resp = "YAS QUEEN! Don't forget - NYC Primary Election 4/19/16!";
			break;
		case 3:
			resp = "I could kiss you right now. Tell a friend to vote if you want to avoid my smooches <3";
			break;
		case 4:
			resp = "There is nothing sexier than someone with a voting record";
			break;
		case 5:
			resp = "You make my inner suffragette proud!";
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
			greeting = "Salut";
			break;
	}

	return greeting;
}

function matchRE (tweetText) {
	//var tweetArray = tokenizer.tokenize(tweetText); 
	//var phraseArr = [/Ivoted, I'm registered/i, I'm going to vote];
	var phraseArray = ["I voted", "I'm registered"];
	var text = tweetText;

	/**for (var i=0; i < tweetArray.length; i++) {
		for (var j=0; j < phraseArray.length; j++){
			var re = new RegExp (phraseArray[j]);
			if (re.test(tweetArray[i])) {
				return true;
			}
		}	
	}*/

	for (var i = 0; i < phraseArray.length; i++) {
		var re = new RegExp (phraseArray[i]);
		if (re.test(text)) {
			return true;
		}
	}
	return false;
}



/**function postMedia () {
	var gifArray = ['gifs/leslieknope.gif', 'gifs/karatekid.gif', 'gifs/kidpresident.gif'];
	var gif = '/gifs/leslieknope.gif';
	var n = Math.floor(Math.random() * 3);

	var content = fs.readFileSync(gif, {encoding: 'base64'})

	twitter.post('media/upload', {media_data: content}, function (err, data, response) {
		var mediaIdStr = data.media_id_string;
		var params = { status: 'I work!', media_ids: [mediaIdStr] }

		twitter.post ('statuses/update', params, function (err, data, response) {
			console.log(data)
		})
	})
}*/


var stream = twitter.stream('statuses/filter', { track: '@lolvote_bot' })

stream.on('tweet', function (tweet) {
	var asker = tweet.user.screen_name;
	var text = tweet.text;

  //RegExes
 // var greetingRE = /^hi$/;
  //var hillaryRE = /^hillary$/;
  //var bernieRE = /^bernietest$/

	var gifArray = ['gifs/leslieknope.gif', 'gifs/karatekid.gif', 'gifs/kidpresident.gif', 'gifs/voteordie.gif', 'gifs/reginageorge.gif'];
	var n = Math.floor(Math.random() * 5);

	var content = fs.readFileSync(gifArray[n], {encoding: 'base64'})

	twitter.post('media/upload', {media_data: content}, function (err, data, response) {
		var mediaIdStr = data.media_id_string;
		var tweetRes = "";
		var tryThis = resp();

		/**twitter.post ('statuses/update', params, function (err, data, response) {
			console.log(data)
		})*/
		if (matchRE(text)) {
		  	tweetRes = greeting() + " @" + asker + " " + tryThis + ". #Vote2016";
		  	console.log ("positive success!");
	  	} 
	  	else {
		  	tweetRes = "Really hope you're planning on voting, @" + asker + ". Here's a link to help: bit.ly/voooote #Vote2016";
		  	console.log ("negative success");
	  	}

	  	var params = { status: tweetRes, media_ids: [mediaIdStr] }

	  	twitter.post ('statuses/update', params, function (err, data, response) {
	  	})
	})
})

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





