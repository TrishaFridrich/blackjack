

var deck = []; // global deck variable
var dealtDeck = []; // global dealt cards
var dealerCards=[], playerCards=[]; playerSecondHand = [];
var dealerScore = 0;
var playerScore = 0;
var playerSecondScore = 0;
var bet = 0;
var splitBet = 0;
var winnings = 250; 

var newGameButton = document.getElementById("new-game");
var hitButton = document.getElementById("hit-button");
var stayButton = document.getElementById("stay-button");
var splitButton = document.getElementById("split-button");
var hitSecondButton = document.getElementById("hit-second-button");
var staySecondButton = document.getElementById("stay-second-button");
var betButton = document.getElementById("bet-button");
var dealButton = document.getElementById("deal-button");

var dealerArea = document.getElementById('dealer-text-area');
var playerArea = document.getElementById('player-text-area');
var playerSecondArea = document.getElementById('player-second-text-area');
var gameOverArea = document.getElementById('win-or-lose');
var gameOverArea2 = document.getElementById('win-or-lose2');
var betArea = document.getElementById('bet-text');
var splitBetArea = document.getElementById('bet-text2');
var winningsArea = document.getElementById('winnings-text');
var wholeScreen = document.getElementById('whole-screen');


function showNewGameButton() {
	newGameButton.style.display = "inline";
	hitButton.style.display = "none";
	stayButton.style.display = "none";
	splitButton.style.display = "none";
	hitSecondButton.style.display = "none";
	staySecondButton.style.display = "none";
}

function showBetButton() {
	newGameButton.style.display = "none";
	hitButton.style.display = "none";
	stayButton.style.display = "none";
	splitButton.style.display = "none";
	hitSecondButton.style.display = "none";
	staySecondButton.style.display = "none";
	dealButton.style.display = "none";
	betButton.style.display = "inline";
	splitBetArea.innerHTML = "";
}


function showHitStayButton() {
	newGameButton.style.display = "none";
	hitButton.style.display = "inline";
	stayButton.style.display = "inline";
	splitButton.style.display = "none";
	hitSecondButton.style.display = "none";
	staySecondButton.style.display = "none";
}

function showStayButton() {
	newGameButton.style.display = "none";
	hitButton.style.display = "none";
	stayButton.style.display = "inline";
	splitButton.style.display = "none";
	hitSecondButton.style.display = "none";
	staySecondButton.style.display = "none";
}

function showHitStaySplitButton() {
	newGameButton.style.display = "none";
	hitButton.style.display = "inline";
	stayButton.style.display = "inline";
	splitButton.style.display = "inline";
	hitSecondButton.style.display = "none";
	staySecondButton.style.display = "none";
}

function showNoButton() {
	newGameButton.style.display = "none";
	hitButton.style.display = "none";
	stayButton.style.display = "none";
	splitButton.style.display = "none";
	hitSecondButton.style.display = "none";
	staySecondButton.style.display = "none";
}

function showSecondHandButtons() {
	newGameButton.style.display = "none";
	hitButton.style.display = "none";
	stayButton.style.display = "none";
	splitButton.style.display = "none";
	hitSecondButton.style.display = "inline";
	staySecondButton.style.display = "inline";
}

showBetButton();
winningsArea.innerHTML = winnings;

newGameButton.addEventListener("click",function(){
	if (winnings > 0){
		deck = [];
		dealtDeck = [];
		dealerCards = [];
		playerCards = [];
		playerSecondHand = [];
		bet = 0;
		splitBet = 0;
		betArea.innerHTML = "";
		dealerArea.innerHTML = "";
		playerArea.innerHTML = "";
		playerSecondArea.innerHTML = "";
		gameOverArea.innerHTML = "";
		gameOverArea2.innerHTML = "";
		splitBetArea.innerHTML = "";
		betButton.style.display = "inline";
		newGameButton.style.display = "none";
	} else {
		wholeScreen.innerHTML = "Game over."
	}
});


dealButton.addEventListener("click",function(){
	dealButton.style.display = "none";
	betButton.style.display = "none";
	showHitStayButton();
	initialDeal();
	showPlayerCardsScore();
	showDealerCards();
});

hitButton.addEventListener("click",function(){
	playerCards.push(dealCard());
	showPlayerCardsScore();
});


stayButton.addEventListener("click",function(){
	dealerAllCardsScore();
	dealerPlay();
	showNewGameButton(); 
});

hitSecondButton.addEventListener("click",function(){
	playerSecondHand.push(dealCard());
	showPlayerSecondHand();
});


staySecondButton.addEventListener("click",function(){
	showHitStayButton();

});

splitButton.addEventListener("click",function(){
	showHitStayButton();
	playerSecondHand.push(playerCards.pop());
	playerCards.push(dealCard());
	playerSecondHand.push(dealCard());
	showPlayerCardsScore();
	showPlayerSecondHand();
	showSecondHandButtons(); 
});

betButton.addEventListener("click",function(){
	if (winnings > 0) {
		bet += 25;
		winnings -= 25;
		betArea.innerHTML = bet;
		winningsArea.innerHTML = winnings;
		dealButton.style.display = "inline";
	}
});

function createDeck() {
	deck=[];
	for (var i = 0; i < 52; i++) {
		deck.push(i);
	}
};



function dealCard() {
	var dealAgain = false; 

	var cardIndex = Math.floor(Math.random() * deck.length); 
	
	dealAgain = dealtDeck.includes(cardIndex);
	
	
	while (dealAgain) {
		cardIndex = Math.floor(Math.random() * deck.length); 
		dealAgain = dealtDeck.includes(cardIndex);
	}
	
	dealtDeck.push(cardIndex);
	return (cardIndex);		
	
};

function initialDeal() {
	createDeck();
	playerCards.push(dealCard());
	dealerCards.push(dealCard());
	playerCards.push(dealCard());
	dealerCards.push(dealCard());
	console.log(dealerCards);
	var firstCard = 0;
	var secondCard = 0;

	firstCard = playerCards[0] % 13;
	secondCard = playerCards[1] % 13;

	if (firstCard === secondCard && winnings > bet) {
		showHitStaySplitButton();
	}

};

function calcScore(hand) {
	score = 0;
	var hasAce = 0;
	hand.forEach(function(card){
		playingCard = card % 13;
		pointValue = cardValue(playingCard);
		

		if (pointValue == 1) {
			hasAce = 1;
		}
 
		score += pointValue;
	});

	if(hasAce && score + 10 <= 21) {
		score += 10;
	}
	return score;
};

function cardValue(card) {
	switch(card) {
    	case 11: // Jack
		    return 10;
		case 12: // Queen
		    return 10;
		case 0: // King
		    return 10;
		default:
		    return card;
	}
}



function showPlayerCardsScore() {
 	playerScore = calcScore(playerCards);
 	console.log(playerScore);
	var playerCardsStr = '';
	for (var i=0; i<playerCards.length; i++) {
		playerCardsStr += "<img src='images/"+ playerCards[i] + ".png'>"
	}

	playerArea.innerHTML = playerCardsStr + "<br>" + playerScore + " points";
	
	if (playerScore > 21) {
		showNewGameButton();
		dealerAllCardsScore();
		gameOver(playerScore,gameOverArea,bet); 
		gameOver(playerSecondScore,gameOverArea2,splitBet); 
	// } else if (playerScore === 21) {
	// 	showNewGameButton();
	// 	dealerAllCardsScore();
	// 	dealerPlay();
	// 	gameOver(playerScore,gameOverArea); 
	} else {
		console.log("Less than 21");
	}

}

function showPlayerSecondHand() {
 	splitBet = bet;
 	winnings = winnings - splitBet;
 	winningsArea.innerHTML = winnings;
 	playerSecondScore = calcScore(playerSecondHand);
 	console.log(playerSecondScore);
	var playerCardsStr = '';
	for (var i=0; i<playerSecondHand.length; i++) {
		playerCardsStr += "<img src='images/"+ playerSecondHand[i] + ".png'>"
	}

	playerSecondArea.innerHTML = "<h4>Your Second Hand</h4>" + playerCardsStr + "<br>" +playerSecondScore + " points";
	splitBetArea.innerHTML = "<h4>Bet</h4>" + splitBet;
	
	if (playerSecondScore >= 21) {
		showHitStayButton();
	
	} 

}


function showDealerCards() {

	var dealerCardsStr = '';
	for (var i=1; i<dealerCards.length; i++) {
		dealerCardsStr += "<img src='images/facedown.png'><img src='images/"+ dealerCards[i] + ".png'>"
	}

	dealerArea.innerHTML = dealerCardsStr;
}

function dealerAllCardsScore() {
 	dealerScore = calcScore(dealerCards);
	console.log("dealer all cards score");
	console.log(dealerCards);

	var dealerCardsStr = '';
	for (var i=0; i<dealerCards.length; i++) {
		dealerCardsStr += "<img src='images/"+ dealerCards[i] + ".png'>"
	}

	dealerArea.innerHTML = dealerCardsStr + "<br>" + dealerScore + " points";
}

function dealerPlay() {
	aces = [1,14,27,40];

	if (dealerScore === 17 && dealerCards.includes(aces)) {
		dealerCards.push(dealCard());
	}

	while (dealerScore < 17) {
		dealerCards.push(dealCard());
		dealerAllCardsScore();		
	}
	gameOver(playerScore,gameOverArea,bet);

	if (playerSecondScore > 0) {
		gameOver(playerSecondScore,gameOverArea2,splitBet);
		
	}

}

function gameOver(score,textarea,betType) {

	if (score == dealerScore && score <= 21) {
		gameOverText = "Push.<br>Try again!";
		winnings = winnings + betType;

	}

	else if (score <= 21 && (score > dealerScore || dealerScore > 21)) {
		gameOverText = "YOU WIN!";
		winnings = winnings + (betType * 2);
	}

	else if (dealerScore <= 21 && (dealerScore > score || score > 21)) {
		gameOverText = "House wins.";
	}

	else {
		gameOverText = "ERROR.";
	}

	textarea.innerHTML = gameOverText;
	winningsArea.innerHTML = winnings;
	showNewGameButton();
}