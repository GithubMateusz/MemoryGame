const character = ['andre','angar','bezi','diego','gomez','kruk','lares','lee','lester','milten','saturas','thorus','wrzod','xardas','yberion'];

//nowa gra
function start(game_lvl) {
	let character_fill = drawBoards(game_lvl);
	let card = $('.divCard');
	let card_discovered = null;
	let one_visible = false;
	let turn_counter = 0;
	let lock = false;
	let pairs_left = character_fill.length / 2;
	
	//przypisanie zdarzenia
	card.on('click', function() {
		let index_card = card.index(this);
		revealCard(index_card); 
	});
	
	//mieszanie elementów tablicy
	function replace(array, numer_one, numer_two) {
		let tmp = array[numer_one];
		array[numer_one] = array[numer_two];
		array[numer_two] = tmp;
	}
	function mixingCards(array) {
		let length = array.length;
		for(let i = 0; i < length - 2; i++) {
			let j = Math.floor(Math.random() * (length - i)) + i;
			replace(array,i,j);
		}
		return array;	
	}
	
	//wybieranie losowych kart zależnie od poziomu gry
	function fill(array, quantity) {
		let length = array.length;
		let tmp = Array(quantity);
		for(let i = 0; i < quantity; i++) {
			let j = Math.floor(Math.random() * (length - 1));
			tmp[i] = array[j];
			array.splice(j,1);
			length--;
		}
		return tmp.concat(tmp);
	}
	
	//tworzenie planszy
	function drawBoards(quantity) {
		let character_fill = fill(character,quantity);
		character_fill = mixingCards(character_fill);
		let length_character_fill = character_fill.length;
		$('.row').html('<div class = "col-12"><h1>Game of Gothic</h1></div>');
		for(let i = 0; i < length_character_fill; i++) {
			let html_string = $('.row').html();
			$('.row').html(html_string + '<div class = "col-sm-6 col-md-4 col-xl-2 col-md-offset-5"><img src = "img/gothic.png" class = "divCard img-fluid" id = "image' + i + '"/> </div>');
		}
		$('.row').html($('.row').html() + '<div class = "col-12 score"><h3>Turn counter: 0</h3></div>');
		return character_fill;
	}
	
	//zmiana obrazka
	function changeImage(index_card, image){
		$('#image' + index_card).addClass('change');
		setTimeout(function() {$('#image' + index_card).attr('src',image)},300);
	}
	
	
	//sprawdzenie czy odkryte karty do siebie pasuja 
	function revealCard(index_card) {
		if(lock == false && index_card != card_discovered){
			lock = true;
			changeImage(index_card,'img/' + character_fill[index_card] + '.webp');
			$('#image' + index_card).addClass('cardActive');
			if(one_visible == true) {
				if(character_fill[index_card] == character_fill[card_discovered]) {
					setTimeout(function() {hideCards(index_card,card_discovered)}, 500);
					pairs_left--;
				} else {
					setTimeout(function() {restoreCards(index_card, card_discovered)}, 1000);
				}
				one_visible = false;
				turn_counter++;	
				$('.score').html('<h3>Turn counter: ' + turn_counter + '</h3>');
				if(pairs_left == 0) {
					setTimeout(function() {$('.row').html('<div class = "col-sm-12"><h1>You win!</h1> <br/><h2> Done in ' + turn_counter + ' turns<br/> Do you want to try again?<br/></h2><span class = "game" id = "g1" onclick = "start(4)">easy</span><br/><span class = "game" id = "g2" onclick = "start(7)">medium</span><br/><span class = "game" id "g3" onclick = "start(10)">hard</span> <br/><span class = "game" id = "g4" onclick = "start(14)">hardcore</span><br/></div>')}, 1000);
					$('.score').html('');
				}
			} else {
				lock = false;
				card_discovered = index_card;
				one_visible = true;
			}
		}
	}
	
	//ukrycie kart dopasowanych
	function hideCards(cardOne, cardTwo) {
		$('#image' + cardOne).css('opacity', '0');
		$('#image' + cardOne).off( "click");
		$('#image' + cardTwo).css('opacity', '0');
		$('#image' + cardTwo).off( "click");
		lock = false;
	}
	
	//ukrycie kart niedopasowanych
	function restoreCards(cardOne, cardTwo){
		$('#image' + cardOne).removeClass('change');
		$('#image' + cardTwo).removeClass('change');
		setTimeout(function() {$('#image' + cardOne).attr('src','img/gothic.png')},300);
		setTimeout(function() {$('#image' + cardTwo).attr('src','img/gothic.png')},300);
		$('#image' + cardOne).removeClass('cardActive');
		$('#image' + cardTwo).removeClass('cardActive');
		card_discovered = null;
		lock = false;
	}
}


