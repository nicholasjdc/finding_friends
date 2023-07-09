class Card {
    constructor(number, color, suit, id){
        this.number = number
        this.color = color
        this.suit = suit
        this.id = id
    }
}

class Deck{
    constructor(cards){
        this.cards = cards
    }
}

class Player{
    constructor(id, hand, gameData){ //string, list of card objects, map
        this.id = id
        this.hand = hand
        this.gameData = gameData
    }
}
class Team{
    constructor(id, players){ //string, list of Player objects
        this.id = id
        this.player = players
    }
}
function makeCard(number, color, suit){
    id = number.toString() +color +suit
    newCard = new Card(number, color, suit, id)
    return newCard
}

function makeDeck(availNumbers, availSuits, suitColorMap){ //list, list, map
    currDeck = []
    for(let i =0 ; i<availNumbers.length; i++){
        for(let j =0; j <availSuits.length;j++){
            suit = availSuits[j]
            currDeck.push(makeCard(availNumbers[i], suitColorMap[suit], suit))
        }
    }
    newDeck = new Deck(currDeck, currDeck.length)
    return newDeck
}
function modifyDeck(keyword, data, oldDeck){
    if(keyword == 'multiplyDeck'){
        dupDeck = oldDeck.cards
        oldDeck.cards.push.apply(oldDeck.cards, dupDeck)
    }else if(keyword == 'addCards'){
        oldDeck.cards.push.apply(oldDeck.cards, data)
    }else if(keyword == 'removeCards'){
        for(let i = 0;i<data.length; i++){
            searchId = data[i]
            idx = oldDeck.cards.map(e => e.id).indexOf(searchId)
            oldDeck.cards.splice(idx,1)
        }
    }
}
function shallowEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
  
    if (keys1.length !== keys2.length) {
      return false;
    }
  
    for (let key of keys1) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }
  
    return true;
}
function deal(startIdx, endIdx, deck, player){
    console.log(deck.cards.slice(startIdx, endIdx))
    player.hand.push(deck.cards.slice(startIdx, endIdx))
    deck.cards.splice(endIdx, (endIdx-startIdx))
}
function dealTop(deck, player){
    topCard = deck.cards.pop()
    player.hand.push(topCard)
}
numbers = [2,3,4,5,6,7,8,9,10,11,12,13,14] //2 - Ace
suitColorMap = {'d':'r','h':'r','c':'b','s':'b'} //red, black
suits = ['d','h','c','s'] //diamond, heart, club, spade, small joker, big joker
player = new Player('Nick', [], {})
newDeck = makeDeck(numbers, suits, suitColorMap)
deal(0,5,newDeck, player)
console.log(newDeck)
console.log(player)

