/*var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(80);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

*/

/* send to all connections
io.sockets.on('connection', function (socket) {
  socket.on('ferret', function (name, fn) {
    fn('woot');
  });
});
*/
/* send only to person who sent the request
<script>
  var socket = io.connect(); // TIP: .connect with no args does auto-discovery
  socket.on('connect', function () { // TIP: you can avoid listening on `connect` and listen on events directly too!
    socket.emit('ferret', 'tobi', function (data) {
      console.log(data); // data will be 'woot'
    });
  });
</script>
*/

var TABLE = function () {

    this.cardsDealt = 0
    this.deck = []
    this.currentStreet = 0
    this.communityCards = []
    this.currentTurn = -1 //number should correspond to a player, 0 base
    this.dealer = -1   //number should correspond to a player, 0 base


    this.deal = function () {
        this.shuffleDeck()

        //deal hidden aka "hole" cards
        for (i = 0; i < this.streets[currentStreet].hidden; i = i + 1) {
            for (j = 0; j < seats.length; j = j + 1) {
                if (this.seats[i].chips > 0) //this will cause bugs later, leave now 4 ez testing
                    this.seats[i].hiddenCards.push(this.deck[cardsDealt])
                this.cardsDealt = this.cardsDealt + 1
            }
            //deal shown cards
            for (i = 0; i < this.streets[currentStreet].shown; i = i + 1) {
                for (j = 0; j < seats.length; j = j + 1) {
                    if (this.seats[i].chips > 0)  //this will cause bugs later, leave now 4 ez testing
                        this.seats[i].shownCards.push(this.deck[cardsDealt])
                    this.cardsDealt = this.cardsDealt + 1
                }
            }
            //deal community cards

            for (i = 0; i < this.streets[currentStreet].community; i = i + 1) {
                this.communityCards.push(this.deck[cardsDealt])
                this.cardsDealt = this.cardsDealt + 1
            }
        }
    }

    this.makeDeck = function () {
        var i = 1
        var j = 0
        for (i = 1; i <= 13; i++) {
            this.deck[j] = "c" + i
            j = j + 1
            this.deck[j] = "d" + i
            j = j + 1
            this.deck[j] = "h" + i
            j = j + 1
            this.deck[j] = "s" + i
        }
    }


    this.shuffleDeck = function () {
        swap = function (a, b, array) {
            var temp = array[a]
            array[a] = array[b]
            array[b] = temp
        }

        for (i = 0; i <= 51; i = i + 1) {
            var k = Math.floor((Math.random() * 51) + 1)
            swap(i, k, this.deck)
        }
    }

    this.determineDealer=function(){         
         this.dealer = Math.floor((Math.random() * seats.length))
    }

    //takes number in 0 base of player that last acted
    this.nextTurn=function(currentTurn){

        //this is a support function that just cycles around, base 0
        var next = function (currentPosition){
            currentPosition = currentPosition +1
            if(currentPosition >= this.seats.length){
                currentPosition=0
                }
                return currentPosition
            }
        
        currentTurn = next(currentTurn)
        var i = 0
            while (this.seats[currentTurn].dealtIn===false && this.seats[currentTurn].chips === 0 && i < 11){
                currentTurn = next(currentTurn)
                i=i+1
            }
            return currentTurn;
        }
       

        
    }
    
    //this function should make sure players do not go negative, input playerPosition as base 0 as this will edit this.seats[i].chips
    this.bet = function(playerPosition, betSize){
        if(this.seats[playerPosition].chips >=  betSize && betSize =< maxBet)({
            this.seats[playerPosition].chips = this.seats[playerPosition].chips - amount
            this.pot = this.pot + amount
        }


    }


    //posts antes as well as blinds
    this.postBlinds=function(){


        //post antes
        if (ante>0){
        for(i=0;i<seats[i];i=i+1){
        if(this.seats[i].chips>0){//this may cause bugs on super low stacked players, but leave for now for ez testing
            this.pot=this.pot+ante
            this.seats[i].chips = this.seats[i].chips - ante
            this.seats[i].dealtIn=true
        } 
        }
    }

    //post blinds
    if (nextTurn(this.dealer){
        if(this.seats[dealer+1].chips>0){
            
        }
    }
    }


    //sets a TABLE object as a holdem table
    this.holdemTable = function () {
        this.gameType = "Texas Hold'em"
        this.streets = [{ hidden: 2, community: 3, shown: 0 }, { community: 3, shown: 0, hidden: 0 }, { hidden: 0, community: 1, shown: 0 }, { hidden: 0, community: 1, shown: 0}]
        this.maxPlayers = 10
        this.minPlayers = 2
        this.maxCards = 7
        this.potSize = 0

    }

    //so that TABLE can be of any type: play, tourney, cash, etc, etc
    this.setTableVariables = function (currency, sb, bb, ante, maxBuyin, minBuyin, maxBetType, seats) {
        this.currency = currency
        this.bb = bb
        this.ante = ante
        this.maxBBBuyIn = maxBuyin
        this.sb = sb
        this.minBBBuyIn = minBuyin
        this.maxBetType = maxBetType
        this.seats = []
        for (i = 0; i < seats; i = i + 1)
            this.seats[i] = { player: 0, chips: 0, hiddenCards: [], shownCards: [], lastaction: '', dealtIn: false }
    }
}


initializeTable = function (table) {

       
       table.setTableVariables($('#currency').val(), $('#sb').val(), $('#bb').val(),
       $('#ante').val(), $('#maxBuyin').val(), $('#minBuyin').val(), $('#maxBetType input[name=maxBetType]:checked').val(), $('#seats').val())
       customTable.holdemTable()
       customTable.makeDeck()
        jQuery('#tableVariables').hide()
        jQuery('#maxBetType').hide()
        jQuery('#submit').hide()

    }


hideTable = function(){
    jQuery('#playerInfo').hide()
    jQuery('#reset').hide()
    jQuery('#boardInfo').hide()
    
}

showForm = function(){
    jQuery('#tableVariables').show()
        jQuery('#maxBetType').show()
        jQuery('#submit').show()
}

showTable = function (table) {

    jQuery('#playerInfo').show()
    jQuery('#reset').show()
    jQuery('#boardInfo').show()


    for (j = table.seats.length + 1; j < 10; j = j + 1) {
        var emptySeat = 'seat' + j
        jQuery(emptySeat).hide()
    }

}



jQuery(document).ready(function () {    



    hideTable()

    jQuery("#submit").click(function () {
     
    customTable= new TABLE()  
    initializeTable(customTable)
    showTable(customTable)
    }
    )

    jQuery("#reset").click(function () {
    hideTable()
    showForm()
    }
    )

    jQuery("#deal").click(function () {
     
    customTable.deal

    

    }
    )

})