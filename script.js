
    const startButton = document.getElementById('start-button');
    const hitButton = document.getElementById('hit-button');
    const standButton = document.getElementById('stand-button');
    const resetButton = document.getElementById('reset-button');
    const message = document.getElementById('message');
    const playerHand = document.getElementById('player-hand');
    const dealerHand = document.getElementById('dealer-hand');
    const playerScoreDisplay = document.getElementById('player-score');
    const dealerScoreDisplay = document.getElementById('dealer-score');
    let deck = [];
    let playerHandValue = 0;
    let dealerHandValue = 0;
    let playerScore = 0;
    let dealerScore = 0;
    let gameStarted = false;
    let dealerTurn = false;
  
    // Función para iniciar el juego
    function startGame() {
      if (!gameStarted) {
        deck = createDeck();
        shuffleDeck(deck);
        dealCards();
        updateMessage('');
        startButton.disabled = true;
        hitButton.disabled = false;
        standButton.disabled = false;
        resetButton.disabled = true;
        dealerTurn = false;
        gameStarted = true;
      }
    }
  
    // Función para crear la baraja
    function createDeck() {
      const suits = ['♥️', '♦️', '♠️', '♣️'];
      const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
      const deck = [];
      for (let suit of suits) {
        for (let value of values) {
          deck.push({ value, suit });
        }
      } 
      return deck;
    }
  
    // Función para barajar la baraja
    function shuffleDeck(deck) {
      for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
      }
    }
  
    // Función para repartir cartas
    function dealCards() {
      playerHand.innerHTML = '';
      dealerHand.innerHTML = '';
      playerHandValue = 0;
      dealerHandValue = 0;
      for (let i = 0; i < 2; i++) {
        drawCard(playerHand);
        drawCard(dealerHand, true); // Ocultar ambas cartas del crupier
      }
    }
  
    // Función para dibujar una carta
    function drawCard(hand, hidden = false) {
      const card = deck.pop();
      const cardElement = document.createElement('div');
      cardElement.className = 'card';
      cardElement.textContent = hidden ? '🂠' : getCardString(card);
      hand.appendChild(cardElement);
      const value = getCardValue(card);
      if (hand === playerHand) {
        playerHandValue += value;
        playerScoreDisplay.textContent = `Puntos del jugador: ${playerHandValue}`;
      } else {
        if (!hidden) {
          dealerHandValue += value;
          dealerScoreDisplay.textContent = `Puntos del crupier: ${dealerHandValue}`;
        }
      }
      updateMessage('');
    }
  
    // Función para obtener el valor de una carta
    function getCardValue(card) {
      if (['J', 'Q', 'K'].includes(card.value)) {
        return 10;
      } else if (card.value === 'A') {
        return 11;
      } else {
        return parseInt(card.value);
      }
    }
  
    // Función para obtener la cadena de la carta
    function getCardString(card) {
      let valueStr = card.value;
      if (card.value === 'J') valueStr = 'J';
      else if (card.value === 'Q') valueStr = 'Q';
      else if (card.value === 'K') valueStr = 'K';
      else if (card.value === 'A') valueStr = 'A';
      return valueStr + card.suit;
    }
  
    // Función para actualizar el mensaje
    function updateMessage(msg) {
      message.textContent = msg;
    }
  
    // Evento de clic en el botón "Iniciar juego"
    startButton.addEventListener('click', startGame);
  
    // Evento de clic en el botón "Pedir"
    hitButton.addEventListener('click', function() {
      drawCard(playerHand);
      if (playerHandValue > 21) {
        updateMessage('¡Te has pasado! ¡Has perdido!');
        endGame();
      }
    });
  
    // Evento de clic en el botón "Plantarse"
    standButton.addEventListener('click', function() {
      dealerTurn = true;
      while (dealerHandValue < 17) {
        drawCard(dealerHand);
      }
      if (dealerHandValue > 21 || playerHandValue > dealerHandValue) {
        updateMessage('¡Has ganado!');
      } else if (playerHandValue < dealerHandValue) {
        updateMessage('¡Has perdido!');
      } else {
        updateMessage('¡Empate!');
      }

    
      endGame();
    });
  
    // Evento de clic en el botón "Reiniciar"
    resetButton.addEventListener('click', function() {
      startButton.disabled = false;
      resetButton.disabled = true;
      hitButton.disabled = true;
      standButton.disabled = true;
      gameStarted = false;
      dealerTurn = false;
      message.textContent = '';
      playerScoreDisplay.textContent = `Puntos del jugador: ${playerScore}`;
      dealerScoreDisplay.textContent = `Puntos del crupier: ${dealerScore}`;
      playerHand.innerHTML = '';
      dealerHand.innerHTML = '';
    });
  
    // Función para finalizar el juego
    function endGame() {
      hitButton.disabled = true;
      standButton.disabled = true;
      resetButton.disabled = false;
      revealDealerHand();
    }
  
// Función para revelar las cartas del crupier
function revealDealerHand() {
  const dealerCards = dealerHand.children;
  for (let i = 0; i < dealerCards.length; i++) {
    dealerCards[i].textContent = dealerCards[i].textContent.replace('🂠', '');
  }
  hideFirstTwoCards();
}

// Función para ocultar las dos primeras cartas del crupier
function hideFirstTwoCards() {
  const dealerCards = dealerHand.children;
  for (let i = 0; i < 2; i++) {
    dealerCards[i].style.display = 'none';
  }
}

  