    //default canvas size is 690x480
    //all numbers are in base 0, including variable names and documentation
    //seat position 0 is top middle and proceeds clockwise

    holdemCanvas = {
        canvas: document.getElementById('canvas'),
        images: {

            table: {},
            pot:{},
            fold: {messages:[]},
            call: {messages:[]},
            bet: {messages:[]},
            raise: {messages:[]},
            check: {messages:[]},
            bottom: {},
            seats: [{ card0: {}, card1: {} }, { card0: {}, card1: {} }, { card0: {}, card1: {} }, { card0: {}, card1: {} }, { card0: {}, card1: {} }, { card0: {}, card1: {} }, { card0: {}, card1: {} }, { card0: {}, card1: {} }, { card0: {}, card1: {} }, { card0: {}, card1: {}}],
            community: [{}, {}, {}, {}, {}]
        }
    }
    for (i=0;i<holdemCanvas.images.seats.length;i=i+1){
        holdemCanvas.images.seats[i].messages = []
    }
    holdemCanvas.context = holdemCanvas.canvas.getContext('2d')
   holdemCanvas.context.textBaseline = 'bottom'

    //call holdemCanvas.images.defaultImages() to set names of images to default
    //seats are empty, hole cards are set to face down cards
    //image positions must have been loaded first! holdemCanvas.images.defaultPositions()
    //WILL NOT DISPLAY
    holdemCanvas.images.defaultImages = function (){

        holdemCanvas.images.sources = {
            table: 'img/table.jpg',
            call: 'img/call.jpg',
            check: 'img/check.jpg',
            raise: 'img/raise.jpg',
            bottom: 'img/bottom.jpg',
            cardBack: 'img/card_back.jpg',
            blankCard: 'img/blank_card.jpg',
            seat: 'img/empty_seat.jpg',
            blankSeat : 'img/blank_seat.jpg',
            bet: 'img/bet.jpg',
            community: 'img/card_back.jpg',
            fold: 'img/fold.jpg'
        }

        //table
        holdemCanvas.images.table.image = new Image()
        holdemCanvas.images.table.image.src = holdemCanvas.images.sources.table

        //bottom divider
        holdemCanvas.images.bottom.image = new Image()
        holdemCanvas.images.bottom.image.src = holdemCanvas.images.sources.bottom

        //seats and corresponding hole cards
        for (var i = 0; i < holdemCanvas.images.seats.length; i = i + 1)
        {

            holdemCanvas.images.seats[i].image = new Image()
            holdemCanvas.images.seats[i].image.src = holdemCanvas.images.sources.seat

            holdemCanvas.images.seats[i].card0.image = new Image()
            holdemCanvas.images.seats[i].card1.image = new Image()
            holdemCanvas.images.seats[i].card0.image.src = holdemCanvas.images.sources.cardBack
            holdemCanvas.images.seats[i].card1.image.src = holdemCanvas.images.sources.cardBack

        }

        //action buttons
        holdemCanvas.images.fold.image = new Image()
        holdemCanvas.images.fold.image.src = holdemCanvas.images.sources.fold

        holdemCanvas.images.call.image = new Image()
        holdemCanvas.images.call.image.src = holdemCanvas.images.sources.call

        holdemCanvas.images.check.image = new Image()
        holdemCanvas.images.check.image.src = holdemCanvas.images.sources.check

        holdemCanvas.images.raise.image = new Image()
        holdemCanvas.images.raise.image.src = holdemCanvas.images.sources.raise

        holdemCanvas.images.bet.image = new Image()
        holdemCanvas.images.bet.image.src = holdemCanvas.images.sources.bet


        //community cards
        for (var i = 0; i < 5; i = i + 1)
        {

            holdemCanvas.images.community[i].image = new Image()
            holdemCanvas.images.community[i].image.src = holdemCanvas.images.sources.blankCard

        }

    }

    holdemCanvas.images.defaultSizes = function(){
        
        holdemCanvas.images.table.size = {
            x: 558,
            y: 244
        }

            holdemCanvas.images.pot.size = {
            x: 110,
            y: 24
        }

        //size of action buttons
        holdemCanvas.images.fold.size = {
            x: 80,
            y: 25
        } 
        
        holdemCanvas.images.check.size = {
            x: 80,
            y: 25
        }
        holdemCanvas.images.raise.size = {
            x: 80,
            y: 25
        }
        holdemCanvas.images.bet.size = {
            x: 80,
            y: 25
        }
        holdemCanvas.images.call.size = {
            x: 80,
            y: 25
        }

        //size of seats and cards
        for (i = 0; i < holdemCanvas.images.seats.length; i = i + 1)
        {
            holdemCanvas.images.seats[i].size = {
            x: 90,
            y: 33
            }
            holdemCanvas.images.seats[i].card0.size = {
                x: 48,
                y: 60
            }
             holdemCanvas.images.seats[i].card1.size = {
                x: 48,
                y: 60
            }
        }

    }


holdemCanvas.images.defaultMessages = function(){
    
    holdemCanvas.images.bet.messages[0] = 'act'
    holdemCanvas.images.bet.messages[1] = 'bet'
    holdemCanvas.images.call.messages[0] = 'act'
     holdemCanvas.images.call.messages[1] = 'call'
     holdemCanvas.images.check.messages[0] = 'act'
      holdemCanvas.images.check.messages[1] = 'check'
      holdemCanvas.images.raise.messages[0] = 'act'
       holdemCanvas.images.raise.messages[1] = 'raise'
       holdemCanvas.images.fold.messages[0] = 'act'
        holdemCanvas.images.fold.messages[1] = 'fold'
      for(i=0;i<holdemCanvas.images.seats.length;i=i+1){
         holdemCanvas.images.seats[i].messages[0] = 'sit'
         holdemCanvas.images.seats[i].messages[1] = i
         }
         
}

    //call holdemCanvas.images.defaultPositions() to set positions to default of 690x480 table
    //WILL NOT DISPLAY
    holdemCanvas.images.defaultPositions = function ()
    {

        holdemCanvas.images.table.position = {
            x: 66,
            y: 85
        }
        
        holdemCanvas.images.pot.position = {
            x:290,
            y:133

        }

        //initial position of bottom section (buttons, options, etc) of poker table
        holdemCanvas.images.bottom.position = {
            x: 0,
            y: 414
        }

        //seat position starts at 0, which is top middle (and proceeds clockwise), initial seat positions
        holdemCanvas.images.seats[0].position = {
            x: 300,
            y: 77
        }
        holdemCanvas.images.seats[1].position = {
            x: 440,
            y: 77
        }
        holdemCanvas.images.seats[2].position = {
            x: 573,
            y: 153
        }
        holdemCanvas.images.seats[3].position = {
            x: 573,
            y: 301
        }
        holdemCanvas.images.seats[4].position = {
            x: 440,
            y: 371
        }
        holdemCanvas.images.seats[5].position = {
            x: 300,
            y: 371
        }
        holdemCanvas.images.seats[6].position = {
            x: 170,
            y: 371
        }
        holdemCanvas.images.seats[7].position = {
            x: 27,
            y: 301
        }
        holdemCanvas.images.seats[8].position = {
            x: 27,
            y: 153
        }
        holdemCanvas.images.seats[9].position = {
            x: 170,
            y: 77
        }

        //set initial positions of action buttons
        holdemCanvas.images.fold.position = {
            x: 205,
            y: 419
        }
        holdemCanvas.images.call.position = {
            x: 305,
            y: 419
        }
      holdemCanvas.images.check.position = {
            x: 305,
            y: 419
            }
   
        holdemCanvas.images.raise.position = {
            x: 405,
            y: 419
        }

        holdemCanvas.images.bet.position = {
            x: 405,
            y: 419
       }

        //set initial positions of community cards
        holdemCanvas.images.community[0].position = {
            x: 222,
            y: 169
        }

        holdemCanvas.images.community[1].position = {
            x: 272,
            y: 169
        }

        holdemCanvas.images.community[2].position = {
            x: 322,
            y: 169
        }

        holdemCanvas.images.community[3].position = {
            x: 372,
            y: 169
        }

        holdemCanvas.images.community[4].position = {
            x: 422,
            y: 169
        }

        //set intial positions of hole cards for seats at table
        for (i = 0; i < holdemCanvas.images.seats.length; i = i + 1)
        {
            holdemCanvas.images.seats[i].card0.position = {
                x: holdemCanvas.images.seats[i].position.x - 1,
                y: holdemCanvas.images.seats[i].position.y - 68
            }
            holdemCanvas.images.seats[i].card1.position = {
                x: holdemCanvas.images.seats[i].position.x + 45,
                y: holdemCanvas.images.seats[i].position.y + -68
            }
        }
    }

    //cards should be in string format
  /*  holdemCanvas.gameState.updateCommunity = function (card0, card1, card2, card3, card4, startingCardInBase0, endingCardInBase0)
    {

        if ((cards[0] || cards[1] || cards[2] || cards[3] || cards[4]) != string) { alert('card names must be in string format'); return 'invalid card' }

        var asdf = [card0, card1, card2, card3, car4]

        for (var i = 0; i <= endingCardinBase0 - startingCardInBase0; i = i + 1)
        {

            if (asdf[i] != null) { holdemCanvas.gameState.community[i + startingCardInBase0] = asdf[i] }

        }
    }
*/

    //rotates positions of players seats and their hole cards clockwise
    holdemCanvas.images.rotate = function (n)
    {

    }

    holdemCanvas.images.displayShownCard = function (cardText,parentOfImageObject){

         parentOfImageObject.image.src = holdemCanvas.images.sources.blankCard
         parentOfImageObject.image.onload = function(){
            
            holdemCanvas.context.stage.addChild(parentOfImageObject.image, parentOfImageObject.position.x, parentOfImageObject.position.y)
            holdemCanvas.context.fillText(cardText, parentOfImageObject.position.x, parentOfImageObject.position.y+13)
        }
    }

    holdemCanvas.images.playerSits = function(seatNumber, playerName, chips){
        
        holdemCanvas.images.seats[seatNumber].image.src = holdemCanvas.images.sources.blankSeat
        
        holdemCanvas.images.seats[seatNumber].image.onload = function(){
            var asdf = playerName+chips
           holdemCanvas.context.stage.addChild(holdemCanvas.images.seats[seatNumber].image, holdemCanvas.images.seats[seatNumber].position.x, holdemCanvas.images.seats[seatNumber].position.y)
           holdemCanvas.context.fillText(asdf, holdemCanvas.images.seats[seatNumber].position.x, holdemCanvas.images.seats[seatNumber].y+13)
           stage.update()
        }

    }

     holdemCanvas.images.playerStands = function(seatNumber){
        
        holdemCanvas.images.seats[seatNumber].image.src = holdemCanvas.images.sources.blankSeat
        holdemCanvas.images.displayImage(holdemCanvas.images.seats[seatNumber])

    }

    holdemCanvas.images.displayHoleCards = function (card0,card1){

        holdemCanvas.images.displayShownCard(card0, holdemCanvas.images.seats[holdemCanvas.userSeatNumber].card0)
        holdemCanvas.images.displayShownCard(card1, holdemCanvas.images.seats[holdemCanvas.userSeatNumber].card1)

    }

   holdemCanvas.images.displayAllCommunity = function(communityArray){

    for (var i = 0; i < communityArray.length; i = i + 1) {

    if (communityArray[i] === '' || communityArray[i] === null) {
    return false;
    }

    holdemCanvas.images.displayShownCard(communityArray[i], holdemCanvas.images.community[i])

    }
    }
   


  holdemCanvas.images.displayCommunity = function (startingCardInBase0, endingCardinBase0)
    {

        for (var i = startingCardInBase0; i <= endingCardinBase0; i = i + 1)
        {

            if (holdemCanvas.gameState.community[i] === '' || holdemCanvas.gameState.community[i] === null)
            {
                //     return false;
            }

         
            holdemCanvas.images.displayImage(holdemCanvas.images.community[i])

            holdemCanvas.context.fillText(holdemCanvas.gameState.community[i], holdemCanvas.images.community[i].position.x, holdemCanvas.images.community[i].position.y)

        }
    }


    //parameter is parent of the actual Image object
    holdemCanvas.images.displayImage = function (parentOfImageObject)
    {
        parentOfImageObject.image.onload = function ()
        {
            holdemCanvas.context.stage.addChild(parentOfImageObject.image, parentOfImageObject.position.x, parentOfImageObject.position.y)
            stage.update()
        }
    }

    holdemCanvas.images.displayAll = function ()
    {


        for (var i = 0; i < holdemCanvas.images.seats.length; i = i + 1)
        {

            holdemCanvas.images.displayImage(holdemCanvas.images.seats[i])
            holdemCanvas.images.displayImage(holdemCanvas.images.seats[i].card0)
            holdemCanvas.images.displayImage(holdemCanvas.images.seats[i].card1)
        }

        for (var i = 0; i < holdemCanvas.images.community.length; i = i + 1)
        {

            holdemCanvas.images.displayImage(holdemCanvas.images.community[i])
        }

      for (var i in holdemCanvas.images)
        {
            if (typeof holdemCanvas.images[i] === 'object')
            {
                if (holdemCanvas.images[i].position && holdemCanvas.images[i].position.x)
                {
                    holdemCanvas.images.displayImage(holdemCanvas.images[i])
                }
            }
        }
        
    }


   holdemCanvas.images.activateButton =  function (parentOfImageObject){
    $(document).mousedown(function(e) {
    if((e.offsetX >=parentOfImageObject.position.x && e.offsetX <= parentOfImageObject.position.x + parentOfImageObject.size.x) &&
       (e.offsetY >=parentOfImageObject.position.y && e.offsetY <= parentOfImageObject.position.y + parentOfImageObject.size.y)) {
        console.log(socket, parentOfImageObject.messages);
        socket.emit.apply(socket, parentOfImageObject.messages);
    }
});
}




   /* for (var i = 0; i < holdemCanvas.images.community.length; i = i + 1)
    {

        holdemCanvas.images.displayImage(holdemCanvas.images.community[i])

    }

*/

/*

    //receive/deal community cards
       socket.on('community_dealt', function(community_cards){
        holdemCanvas.images.displayAllCommunity(community_cards)
     
});



//player sits at table (not necessarily the user)
 socket.on('act_prompt', function(fold, check, call, raise, bet, seat_num){

     if (fold){
         holdemCanvas.images.displayImage(holdemCanvas.images.fold)
         holdemCanvas.images.activateButton(holdemCanvas.images.fold)
        }
        if (check){
         holdemCanvas.images.displayImage(holdemCanvas.images.check)
         holdemCanvas.images.activateButton(holdemCanvas.images.check)
         }
         if (call){
         holdemCanvas.images.displayImage(holdemCanvas.images.call)
         holdemCanvas.images.activateButton(holdemCanvas.images.call)
         }
         if (raise){
         holdemCanvas.images.displayImage(holdemCanvas.images.raise)
         holdemCanvas.images.activateButton(holdemCanvas.images.raise)
         }
         if (bet){
         holdemCanvas.images.displayImage(holdemCanvas.images.bet)
         holdemCanvas.images.activateButton(holdemCanvas.images.bet)
         }

});

//receive hole cards
       socket.on('hands_dealt', function(active_seats, hand_cards){
        holdemCanvas.images.displayShownCard(hand_cards[1],holdemCanvas.images.seats[userSeatNumber])
     holdemCanvas.images.displayShownCard(hand_cards[2],holdemCanvas.images.seats[userSeatNumber])
});

*/
//player sits, checks if player is the user
       socket.on('player_sits', function(player, seat_num, is_you){
        console.log('player_sits', player, seat_num, is_you);
        holdemCanvas.images.playerSits(seat_num, player, 0)
        if(is_you){
            holdemCanvas.userSeatNumber = seat_num
}});



//player stands, checks if player is the user
       socket.on('player_stands', function(player, seat_num, is_you){
        console.log('player_stands', player, seat_num, is_you);
        holdemCanvas.images.seats[seat_num].image.src = holdemCanvas.images.sources.seat
                 holdemCanvas.images.displayImage(holdemCanvas.images.seats[seat_num])
        holdemCanvas.images.activateButton(holdemCanvas.images.seats[seat_num])
        if(is_you){
            delete holdemCanvas.userSeatNumber
}});
 /*   
//round ends, all hole cards are shown
       socket.on('player_stands', function(winner, hands){
        holdemCanvas.images.playerSits(seat_num, player, 0)
        if(is_you){
            delete holdemCanvas.userSeatNumber
});

//player adds chips to his stack
       socket.on('player_rebuys', function(player, num_chips){
        holdemCanvas.images.playerSits(seat_num, player, num_chips)
        }
  );


*/

    jQuery(window).load(function ()
    {
        holdemCanvas.images.defaultPositions()
        holdemCanvas.images.defaultImages()
      // holdemCanvas.images.displayAll()
       holdemCanvas.images.displayAllCommunity(['2c','3c','4c','5c','6c'])
       holdemCanvas.images.defaultSizes()
       holdemCanvas.images.defaultMessages()
       holdemCanvas.images.activateButton(holdemCanvas.images.fold)
       jQuery.each(holdemCanvas.images.seats,function(i,seat) {
        holdemCanvas.images.displayImage(seat)
        holdemCanvas.images.activateButton(seat)
       })
       holdemCanvas.userSeatNumber = 5
       holdemCanvas.images.displayHoleCards('ac','ad')
       holdemCanvas.images.displayImage(holdemCanvas.images.fold)
       holdemCanvas.images.playerSits(1,'walter',400)
    }
                  )


                  /*    holdemCanvas.images.displayCurrentTableState=function(){
        
        holdemCanvas.images.displayImage(holdemCanvas.images.table)
        holdemCanvas.images.displayAllCommunity(['2c','3c','4c','5c','6c'])
        holdemCanvas.context.fillText(pot_size,holdemCanvas.images.pot.position.x,holdemCanvas.images.pot.position.y)
        
        if (to_act === userSeatNumber){
             holdemCanvas.images.displayImage(holdemCanvas.images.fold)
             if(call){
                 holdemCanvas.images.displayImage(holdemCanvas.images.call)
                 holdemCanvas.images.activateButton((holdemCanvas.images.call))
             }
             else{
                 holdemCanvas.images.displayImage(holdemCanvas.images.call.check)
                 holdemCanvas.images.activateButton(holdemCanvas.images.check)}
                 if(bet){
                 holdemCanvas.images.displayImage(holdemCanvas.images.bet)
                 holdemCanvas.images.activateButton((holdemCanvas.images.bet))
             }
             else{
                 holdemCanvas.images.displayImage(holdemCanvas.images.call.raise)
                 holdemCanvas.images.activateButton(holdemCanvas.images.raise)}

        }

        

         for (i = 0; i < holdemCanvas.images.seats.length; i = i + 1)
        {
            if(player)
            {
            holdemCanvas.images.playerSits(i,player,num_chips)
        }
        else(holdemCanvas.images.displayImage(holdemCanvas.images.seats[i]))

        if(user && dealtin){
            holdemCanvas.images.displayShownCard(card0, holdemCanvas.images.seats[i].card0)
            holdemCanvas.images.displayShownCard(card1, holdemCanvas.images.seats[i].card1)}
        else if(dealtin){
            holdemCanvas.images.displayImage(holdemCanvas.images.seats[i]).card0
            holdemCanvas.images.displayImage(holdemCanvas.images.seats[i]).card1
            }
            
            
    }
    */