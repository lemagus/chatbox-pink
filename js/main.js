$.getJSON('wordsdb.json', function(data, status, xhr){
	
	var dbwords = data;
	
	$('form.inputs').submit(function(){
	
		var message = $(this).find('input[name=message]').val();
		$('div.messages').append('<div class="me" >' + message +'</div>');
		
		//fort boyard as passe-partout = Père Fouras
		
		/* for(var i in dbwords){
			var entry = dbwords[i];
		}
		
		for(var entry of dbwords){
			
		} */
		
		var checkType = function(message, type){
			
			switch(type) {
				case 'temperature':
				
					$.getJSON('http://api.openweathermap.org/data/2.5/weather?q=Mons,be&units=metric&appid=f772aa4aebbba4a161b9e1c3e9365ddd', function(data){
						var tp = data.main.temp;
						message = message.replace('[value]', Math.round(tp));
						writeInChat(message);
					});
				
					break;
				default:
					writeInChat(message);
			}
		}
		
		var writeInChat = function(message) {
			$('.wait').removeClass('hidden');
			setTimeout(function(){
				$('.wait').addClass('hidden');
				$('div.messages').append('<div class="bot" >' + message+'</div>');
			}, 2000);	
		}
		
		for(var i = 0; i < dbwords.length; i++){
			
			var entry = dbwords[i];
			var word = entry.word;
			var match = entry.match;
			var type = entry.type;
			
			switch(match){
				
				case "regexp":
					
					var re = new RegExp(word);
					
					if(message.toLowerCase().match(re)) {
						checkType(entry.response, type);
					}
					
					break;
				
				default:
				
					if(message.toLowerCase().indexOf(word.toLowerCase()) >= 0) {
						checkType(entry.response, type);						
					}
			}
			
		}
		
		
		return false;
		
	});
	
});



















