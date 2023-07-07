TRUMP_NUM = 3
BOTTOM_DELAY = 5
DEAL_DELAY = 5
num_decks = 2
num_players = 5

numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14]
suits = [1,2,3,4] #hearts, clubs, spades, diamonds
deck = {}
player_hands = {}
def initHands():
    for i in range(num_players):
        player_hands.append(i, {{-1,-1}})
def createDeck():
    for d in range(num_players):
        for i in range(14):
            for j in range(4):
                deck.append({i,j})
def shuffleDeck():
    return 0
def deal(card, player):
    player_hands(player).append(card)
def setup():
    for i in range(num_players):
        deal(deck.pop(), i)
        delay(DEAL_DELAY)

#Let's just do this in javascript, way easire with event listeners and delays
#Sounds Good


