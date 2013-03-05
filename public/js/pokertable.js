    //default canvas size is 690x480
    //all numbers are in base 0, including variable names and documentation
    //seat position 0 is top middle and proceeds clockwise

    holdemCanvas = {
        canvas: document.getElementById('canvas'),
        stage : new createjs.Stage(canvas),
        images: {

            pot:{},
            fold: {messages:[]},
            call: {messages:[]},
            bet: {messages:[]},
            raise: {messages:[]},
            check: {messages:[]},
            seats: [],
            community: [{}, {}, {}, {}, {}],
            leftSideButtons:[]
        }
    }
   

    //call holdemCanvas.images.defaultImages() to set names of images to default
    //seats are empty, hole cards are set to face down cards
    //image positions must have been loaded first! holdemCanvas.images.defaultPositions()
    //WILL NOT DISPLAY
    holdemCanvas.images.defaultImages = function (){

        holdemCanvas.images.sources = {
            call: 'img/call.jpg',
            check: 'img/check.jpg',
            raise: 'img/raise.jpg',
            hiddenCard: 'img/hidden_card.jpg',
            shownCard: 'img/shown_card.jpg',
            seat: 'img/empty_seat.jpg',
            blankSeat : 'img/blank_seat.jpg',
            bet: 'img/bet.jpg',
            community: 'img/card_back.jpg',
            fold: 'img/fold.jpg',
            sideButton :'img/side_button.jpg'
        }
       
         for (var i = 0;i<3;i=i+1){
        holdemCanvas.images.leftSideButtons[i] = {}

    }

         for (var i = 0;i<10;i=i+1){
        holdemCanvas.images.seats[i] = {}
        holdemCanvas.images.seats[i].bet={}
        holdemCanvas.images.seats[i].hiddenCard0={}
        holdemCanvas.images.seats[i].hiddenCard1={}
        holdemCanvas.images.seats[i].shownCard0={}
        holdemCanvas.images.seats[i].shownCard1={}
    }
    for (var i=0;i<holdemCanvas.images.seats.length;i=i+1){
        holdemCanvas.images.seats[i].messages = []
    }

        //action buttons
        holdemCanvas.images.fold.image = new Image()
        holdemCanvas.images.fold.image.src = holdemCanvas.images.sources.fold
        holdemCanvas.images.fold.bitmap = new createjs.Bitmap(holdemCanvas.images.fold.image)
        
        holdemCanvas.images.call.image = new Image
        holdemCanvas.images.call.image.src = holdemCanvas.images.sources.call
        holdemCanvas.images.call.bitmap = new createjs.Bitmap(holdemCanvas.images.call.image)
 
        holdemCanvas.images.check.image = new Image()
        holdemCanvas.images.check.image.src =  holdemCanvas.images.sources.check
         holdemCanvas.images.check.bitmap = new createjs.Bitmap( holdemCanvas.images.check.image)

        holdemCanvas.images.raise.image = new Image()
        holdemCanvas.images.raise.image.src =  holdemCanvas.images.sources.raise
        holdemCanvas.images.raise.bitmap = new createjs.Bitmap(holdemCanvas.images.raise.image)
        
        holdemCanvas.images.bet.image = new Image()
        holdemCanvas.images.bet.image.src =  holdemCanvas.images.sources.bet
        holdemCanvas.images.bet.bitmap = new createjs.Bitmap(holdemCanvas.images.bet.image)

         //seats and corresponding hole cards
        for (var i = 0; i < holdemCanvas.images.seats.length; i = i + 1){

            holdemCanvas.images.seats[i].image = new Image()
            holdemCanvas.images.seats[i].image.src = holdemCanvas.images.sources.blankSeat
            holdemCanvas.images.seats[i].bitmap = new createjs.Bitmap(holdemCanvas.images.seats[i].image)

            holdemCanvas.images.seats[i].hiddenCard0.image = new Image()
            holdemCanvas.images.seats[i].hiddenCard1.image = new Image()
            holdemCanvas.images.seats[i].hiddenCard0.image.src = holdemCanvas.images.sources.hiddenCard
            holdemCanvas.images.seats[i].hiddenCard1.image.src = holdemCanvas.images.sources.hiddenCard

            holdemCanvas.images.seats[i].hiddenCard0.bitmap = new createjs.Bitmap(holdemCanvas.images.seats[i].hiddenCard0.image)
            holdemCanvas.images.seats[i].hiddenCard1.bitmap = new createjs.Bitmap(holdemCanvas.images.seats[i].hiddenCard1.image)

            holdemCanvas.images.seats[i].shownCard0.image = new Image()
            holdemCanvas.images.seats[i].shownCard1.image = new Image()
            holdemCanvas.images.seats[i].shownCard0.src = holdemCanvas.images.sources.shownCard
            holdemCanvas.images.seats[i].shownCard1.src = holdemCanvas.images.sources.shownCard

            holdemCanvas.images.seats[i].shownCard0.bitmap = new createjs.Bitmap(holdemCanvas.images.seats[i].shownCard0.image)
            holdemCanvas.images.seats[i].shownCard1.bitmap = new createjs.Bitmap(holdemCanvas.images.seats[i].shownCard1.image)

        }

        for (var i = 0; i < 3; i = i + 1){
         holdemCanvas.images.leftSideButtons[i].image = new Image()
         holdemCanvas.images.leftSideButtons[i].image.src = holdemCanvas.images.sources.sideButton
         holdemCanvas.images.leftSideButtons[i].bitmap = new createjs.Bitmap(holdemCanvas.images.leftSideButtons[i].image)
         }
        //community cards
        for (var i = 0; i < 5; i = i + 1){

            holdemCanvas.images.community[i].image = new Image()
            holdemCanvas.images.community[i].image.src = holdemCanvas.images.sources.shownCard
             holdemCanvas.images.community[i].bitmap = new createjs.Bitmap(holdemCanvas.images.community[i].image)

        }
    }
      
       holdemCanvas.images.defaultPositions = function ()
    {

        holdemCanvas.images.pot.position = {
            x:290,
            y:138

        }

        holdemCanvas.images.leftSideButtons[0].position = {
            
            x:7.5,
            y:412
        }

                holdemCanvas.images.leftSideButtons[1].position = {
            
            x:7.5,
            y:433
        }

        holdemCanvas.images.leftSideButtons[2].position = {
            
            x:7.5,
            y:454
        }


        //initial position of bottom section (buttons, options, etc) of poker table

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

        //initial positions of player's chips entering pot
        holdemCanvas.images.seats[0].bet.position = {
            x: 345,
            y: 121
        }
        holdemCanvas.images.seats[1].bet.position = {
            x: 475,
            y: 121
        }
        holdemCanvas.images.seats[2].bet.position = {
            x: 553,
            y: 153
        }
        holdemCanvas.images.seats[3].bet.position = {
            x: 553,
            y: 227
        }
        holdemCanvas.images.seats[4].bet.position = {
            x: 475,
            y: 291
        }
        holdemCanvas.images.seats[5].bet.position = {
            x: 345,
            y: 291
        }
        holdemCanvas.images.seats[6].bet.position = {
            x: 215,
            y: 291
        }
        holdemCanvas.images.seats[7].bet.position = {
            x: 137,
            y: 153
        }
        holdemCanvas.images.seats[8].bet.position = {
            x: 215,
            y: 291
        }
        holdemCanvas.images.seats[9].bet.position = {
            x: 215,
            y: 121
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
        for (var i = 0; i < holdemCanvas.images.seats.length; i = i + 1)
        {
            holdemCanvas.images.seats[i].hiddenCard0.position = {
                x: holdemCanvas.images.seats[i].position.x - 1,
                y: holdemCanvas.images.seats[i].position.y - 68
            }
            holdemCanvas.images.seats[i].hiddenCard1.position = {
                x: holdemCanvas.images.seats[i].position.x + 45,
                y: holdemCanvas.images.seats[i].position.y + -68
            }
            holdemCanvas.images.seats[i].shownCard0.position= {
                x: holdemCanvas.images.seats[i].position.x - 1,
                y: holdemCanvas.images.seats[i].position.y - 68
            }
            holdemCanvas.images.seats[i].shownCard1.position = {
                x: holdemCanvas.images.seats[i].position.x + 45,
                y: holdemCanvas.images.seats[i].position.y + -68
            }
        }


        //set x and y of easel.js bitmap object
         for (var i in holdemCanvas.images)
        {
            if (typeof holdemCanvas.images[i] === 'object')
            {
                if (holdemCanvas.images[i].bitmap)
                {
                    holdemCanvas.images[i].bitmap.x = holdemCanvas.images[i].position.x
                    holdemCanvas.images[i].bitmap.y = holdemCanvas.images[i].position.y
                }
            }
            }

                for(var i = 0;i<holdemCanvas.images.community.length;i=i+1){
                    holdemCanvas.images.community[i].bitmap.x = holdemCanvas.images.community[i].position.x
                    holdemCanvas.images.community[i].bitmap.y = holdemCanvas.images.community[i].position.y
                    }
                    for(var i = 0; i<holdemCanvas.images.seats.length;i=i+1){
                        holdemCanvas.images.seats[i].bitmap.x = holdemCanvas.images.seats[i].position.x
                        holdemCanvas.images.seats[i].bitmap.y =  holdemCanvas.images.seats[i].position.y

                       holdemCanvas.images.seats[i].hiddenCard0.bitmap.x = holdemCanvas.images.seats[i].hiddenCard0.position.x
                       holdemCanvas.images.seats[i].hiddenCard1.bitmap.x = holdemCanvas.images.seats[i].hiddenCard1.position.x
                       holdemCanvas.images.seats[i].shownCard0.bitmap.x =holdemCanvas.images.seats[i].shownCard0.position.x
                      holdemCanvas.images.seats[i].shownCard1.bitmap.x = holdemCanvas.images.seats[i].shownCard1.position.x

                      holdemCanvas.images.seats[i].hiddenCard0.bitmap.y =  holdemCanvas.images.seats[i].hiddenCard0.position.y
                      holdemCanvas.images.seats[i].hiddenCard1.bitmap.y = holdemCanvas.images.seats[i].hiddenCard1.position.y
                      holdemCanvas.images.seats[i].shownCard0.bitmap.y = holdemCanvas.images.seats[i].shownCard0.position.y
                      holdemCanvas.images.seats[i].shownCard1.bitmap.y = holdemCanvas.images.seats[i].shownCard1.position.y
                      }

                       for (var i = 0;i<holdemCanvas.images.leftSideButtons.length;i=i+1) {
                if (holdemCanvas.images.leftSideButtons[i].bitmap)
                {
                    holdemCanvas.images.leftSideButtons[i].bitmap.x = holdemCanvas.images.leftSideButtons[i].position.x
                    holdemCanvas.images.leftSideButtons[i].bitmap.y = holdemCanvas.images.leftSideButtons[i].position.y
                }
            }
    }


    holdemCanvas.images.defaultSizes = function(){
        

            holdemCanvas.images.pot.size = {
            x: 110,
            y: 24
        }

        for(var i = 0;i<3;i++){
holdemCanvas.images.leftSideButtons[i].size = {
            x: 185,
            y: 16
        }
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
        for (i = 0; i < holdemCanvas.images.seats.length; i = i + 1){
            holdemCanvas.images.seats[i].size = {
            x: 90,
            y: 33
            }
            holdemCanvas.images.seats[i].hiddenCard0.size = {
                x: 48,
                y: 60
            }
             holdemCanvas.images.seats[i].hiddenCard1.size = {
                x: 48,
                y: 60
            }
            holdemCanvas.images.seats[i].shownCard0.size = {
                x: 48,
                y: 60
            }
            holdemCanvas.images.seats[i].shownCard1.size = {
                x: 48,
                y: 60
            }
        }

        for (i = 0; i < holdemCanvas.images.community.length; i = i + 1)
        {
            holdemCanvas.images.community[i].size = {
           x: 48,
            y: 60
            }
            }
          

    }

    //does not update a player's stack size
    holdemCanvas.images.playerPutsChipsInPot=function(seatNumber,chips){
        
        if(holdemCanvas.stage.contains(holdemCanvas.images.seats[seatNumber].bet.text)){
        holdemCanvas.stage.removeChild(holdemCanvas.images.seats[seatNumber].text)}
           holdemCanvas.images.seats[seatNumber].bet.text = new createjs.Text(chips,"15px Arial", "#100D08")
           holdemCanvas.images.seats[seatNumber].bet.text.x = holdemCanvas.images.seats[seatNumber].bet.position.x
            holdemCanvas.images.seats[seatNumber].bet.text.y = holdemCanvas.images.seats[seatNumber].bet.position.y
         holdemCanvas.images.seats[seatNumber].bet.text.textAlign = 'left'
            holdemCanvas.images.seats[seatNumber].text.bet.textBaseline = 'top'
          holdemCanvas.images.seats[seatNumber].text.bet.maxWidth = holdemCanvas.images.seats[seatNumber].bet.size.x
           holdemCanvas.stage.addChild(holdemCanvas.images.seats[seatNumber].bet.text)
           holdemCanvas.stage.update()

    }

    holdemCanvas.images.setBackground = function(){
        
        jQuery('#body').css("background", "url('img/table_background.jpg') no-repeat")

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
 
    //rotates positions of players seats and their hole cards n times clockwise
    holdemCanvas.images.rotateSeats = function (n)
    {

    }

    holdemCanvas.images.displaySideButton = function (buttonText,parentOfImageObject){

           if( holdemCanvas.stage.contains(parentOfImageObject.bitmap)){holdemCanvas.stage.removeChild(parentOfImageObject.bitmap)}
           if( holdemCanvas.stage.contains(parentOfImageObject.text)){holdemCanvas.stage.removeChild(parentOfImageObject.text)}
            parentOfImageObject.text = new createjs.Text(buttonText, "12px Arial", "#100D08")

            parentOfImageObject.text.x = parentOfImageObject.bitmap.x+parentOfImageObject.size.x/2
            parentOfImageObject.text.y = parentOfImageObject.bitmap.y
               parentOfImageObject.text.textAlign ='center'
    parentOfImageObject.text.textBaseline ='top'
           parentOfImageObject.text.maxWidth = parentOfImageObject.size.x
           holdemCanvas.stage.addChild(parentOfImageObject.bitmap)
            holdemCanvas.stage.addChild(parentOfImageObject.text)
            holdemCanvas.stage.update()
    }

    holdemCanvas.images.displayShownCard = function (cardText,parentOfImageObject){

            holdemCanvas.stage.addChild(parentOfImageObject.bitmap)
            parentOfImageObject.text = new createjs.Text(cardText, "13px Arial", "#100D08")
            parentOfImageObject.text.x = parentOfImageObject.bitmap.x
            parentOfImageObject.text.y = parentOfImageObject.bitmap.y
           parentOfImageObject.text.maxWidth = parentOfImageObject.size.x
            holdemCanvas.stage.addChild(parentOfImageObject.text)
            holdemCanvas.stage.update()
    }

    holdemCanvas.images.displayPot = function (potSize){
   if(holdemCanvas.stage.contains(holdemCanvas.images.pot.text)){holdemCanvas.stage.removeChild(holdemCanvas.images.pot.text)}
   holdemCanvas.images.pot.text = new createjs.Text(ptSize,"14px Arial", "#100D08")
    holdemCanvas.images.pot.text.x = holdemCanvas.images.pot.position.x + holdemCanvas.images.pot.size.x/2
     holdemCanvas.images.pot.text.y  = holdemCanvas.images.pot.position.y

   holdemCanvas.images.pot.text.textAlign ='center'
   holdemCanvas.images.pot.text.textBaseline ='top'
   holdemCanvas.images.pot.text.maxWidth = holdemCanvas.images.pot.size
   holdemCanvas.stage.addChild(holdemCanvas.images.pot.text)
           holdemCanvas.stage.update()
    }

    holdemCanvas.images.playerSits = function(seatNumber, playerName, chips){
        if(holdemCanvas.stage.contains(holdemCanvas.images.seats[seatNumber].text)){
        holdemCanvas.stage.removeChild(holdemCanvas.images.seats[seatNumber].text)}
           var asdf = playerName + '\n'+chips
           holdemCanvas.images.seats[seatNumber].text = new createjs.Text(asdf,"15px Arial", "#100D08")
           holdemCanvas.images.seats[seatNumber].text.x = holdemCanvas.images.seats[seatNumber].bitmap.x+holdemCanvas.images.seats[seatNumber].size.x/2
            holdemCanvas.images.seats[seatNumber].text.y = holdemCanvas.images.seats[seatNumber].bitmap.y
         holdemCanvas.images.seats[seatNumber].text.textAlign = 'center'
            holdemCanvas.images.seats[seatNumber].text.textBaseline = 'top'
          holdemCanvas.images.seats[seatNumber].text.maxWidth = holdemCanvas.images.seats[seatNumber].size.x
           holdemCanvas.stage.addChild(holdemCanvas.images.seats[seatNumber].text)
           holdemCanvas.stage.update()

    }

     holdemCanvas.images.playerStands = function(seatNumber){
        
        holdemCanvas.images.displayImage(holdemCanvas.images.seats[seatNumber])

    }

    holdemCanvas.images.displayHoleCards = function (card0,card1){

       //check for and remove face down card images
         if(holdemCanvas.stage.contains(holdemCanvas.images.seats[holdemCanvas.userSeatNumber].hiddenCard0.bitmap)){
            holdemCanvas.stage.removeChild(holdemCanvas.images.seats[holdemCanvas.userSeatNumber].hiddenCard0.bitmap)
            holdemCanvas.stage.removeChild(holdemCanvas.images.seats[holdemCanvas.userSeatNumber].hiddenCard1.bitmap)
            }

        holdemCanvas.images.displayShownCard(card0, holdemCanvas.images.seats[holdemCanvas.userSeatNumber].shownCard0)
        holdemCanvas.images.displayShownCard(card1, holdemCanvas.images.seats[holdemCanvas.userSeatNumber].shownCard1)
    }

   holdemCanvas.images.displayAllCommunity = function(communityArray){

    for (var i = 0; i < 5; i = i + 1) {

    if (communityArray[i] === '' || communityArray[i] === null) {
    
    }
    else{
    holdemCanvas.images.displayShownCard(communityArray[i], holdemCanvas.images.community[i])
    }
    }
    }
   


 
    //parameter is parent of the actual Image object
    holdemCanvas.images.displayImage = function (parentOfImageObject)
    {

            holdemCanvas.stage.addChild(parentOfImageObject.bitmap)
            holdemCanvas.stage.update()

    }

    holdemCanvas.images.displayAll = function ()
    {


        for (var i = 0; i < holdemCanvas.images.seats.length; i = i + 1)
        {

            holdemCanvas.images.displayImage(holdemCanvas.images.seats[i])
            holdemCanvas.images.displayImage(holdemCanvas.images.seats[i].hiddenCard0)
            holdemCanvas.images.displayImage(holdemCanvas.images.seats[i].hiddenCard1)
        }

        for (var i = 0; i < holdemCanvas.images.community.length; i = i + 1)
        {

            holdemCanvas.images.displayImage(holdemCanvas.images.community[i])
        }

      for (var i in holdemCanvas.images)
        {
            if (typeof holdemCanvas.images[i] === 'object')
            {
                if (holdemCanvas.images[i].image)
                {
                    holdemCanvas.images.displayImage(holdemCanvas.images[i])
                }
            }
        }
        
    }

/*
   holdemCanvas.images.activateButton =  function (parentOfImageObject){
    $(document).mousedown(function(e) {
    if((e.offsetX >=parentOfImageObject.position.x && e.offsetX <= parentOfImageObject.position.x + parentOfImageObject.size.x) &&
       (e.offsetY >=parentOfImageObject.position.y && e.offsetY <= parentOfImageObject.position.y + parentOfImageObject.size.y)) {
        console.log(socket, parentOfImageObject.messages);
        socket.emit.apply(socket, parentOfImageObject.messages);
    }
});
}

*/

   holdemCanvas.images.activateButton =  function (messages, parentOfImageObject){
    $(document).mousedown(function(e) {
    if((e.offsetX >=parentOfImageObject.bitmap.x && e.offsetX <= parentOfImageObject.bitmap.x + parentOfImageObject.size.x) &&
       (e.offsetY >=parentOfImageObject.bitmap.y && e.offsetY <= parentOfImageObject.bitmap.y + parentOfImageObject.size.y)) {
        console.log(messages);
       // socket.emit.apply(socket, messages);
    }
});
}
jQuery(document).ready(function(){
    
    holdemCanvas.images.setBackground()
      
        holdemCanvas.images.defaultImages()
          holdemCanvas.images.defaultPositions()
       
       holdemCanvas.images.defaultSizes()
       holdemCanvas.images.defaultMessages()

})

    jQuery(window).load(function ()
    {
       
       holdemCanvas.images.displayAll()
       holdemCanvas.images.displayAllCommunity(['2c','3c','4c','5c','6c'])
       holdemCanvas.userSeatNumber = 7
       holdemCanvas.images.displayHoleCards('ac','ad')
       holdemCanvas.images.displayImage(holdemCanvas.images.fold)
       holdemCanvas.images.playerSits(1,'walter',400)
       holdemCanvas.images.activateButton (['fold'],holdemCanvas.images.fold)
       holdemCanvas.images.activateButton (['check'],holdemCanvas.images.check)
       holdemCanvas.images.activateButton (['raise'],holdemCanvas.images.raise)
       for (var i = 0;i<holdemCanvas.images.seats.length;i=i+1){
       holdemCanvas.images.activateButton (['sit',i],holdemCanvas.images.seats[i])}

    })