    //default canvas size is 690x480
    //all numbers are in base 0, including variable names and documentation
    //seat position 0 is top middle and proceeds clockwise
   // var holdemCanvas = new Table(10)
    function Table (maxSeats) {
        this.canvas = document.getElementById('canvas')
        this.stage = new createjs.Stage(canvas)
        this.stage.mouseEventsEnabled = true
        this.stage.enableMouseOver()
       // this.canvas.addEventListener("mouseup", this.filler, false)
  //this.filler=function(){console.log('initial')}
  self = this
  self.asdf = function(event){
      console.log(event)
    //  self.stage.removeChild(self.stage.getObjectUnderPoint(event.stageX,event.stageY))
  }
        this.gameState = {}
        this.gameState.secondsToAct
        this.gameState.seatNumberToAct
        this.images = {}
       
          this.images.sources = {
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

            this.images.pot = {}
            this.images.fold = {messages:[]}
            this.images.call = {messages:[]}
            this.images.bet = {messages:[]}
            this.images.raise = {messages:[]}
            this.images.check = {messages:[]}
            this.images.community = [{}, {}, {}, {}, {}]

            //side buttons
            this.images.leftSideButtons=[]
            this.images.rightSideButtons=[]
             for (var i = 0;i<3;i=i+1){
        this.images.leftSideButtons[i] = {}
        this.images.rightSideButtons[i] = {}
        }

        //seats
            this.images.seats=[]
            for (var i = 0;i<maxSeats;i=i+1){
        this.images.seats[i] = {}
        this.images.seats[i].seat = {}
        this.images.seats[i].bet={}
        this.images.seats[i].messages = []
        this.images.seats[i].hiddenCard0={}
        this.images.seats[i].hiddenCard1={}
        this.images.seats[i].shownCard0={}
        this.images.seats[i].shownCard1={}
        
        }
                
//start constructors
this.images.Item = function (x,y,width,height){
     this.position = {}
this.position.x = x
this.position.y = y
this.size = {}
this.size.x = width
this.size.y = height
            }

 this.images.itemAsBitmap = function (parentOfImageObject,imageSource){

    var tempImage= new Image()
    tempImage.src = imageSource
    parentOfImageObject.image = new createjs.Bitmap(tempImage)
    parentOfImageObject.image.x = parentOfImageObject.position.x
    parentOfImageObject.image.y = parentOfImageObject.position.y
            }
    
             this.images.itemAsRectangle = function (parentOfImageObject,color){
 parentOfImageObject.image = new createjs.Shape();
parentOfImageObject.image.graphics.beginFill(color).drawRect(parentOfImageObject.position.x, parentOfImageObject.position.y, parentOfImageObject.size.x, parentOfImageObject.size.y);

            }

            //for example: (parentOfImageObject, fold, "13px Arial", "#100D08")
            this.images.addItemText = function(parentOfImageObject,text,sizeAndFont,color){
                
                parentOfImageObject.text = new createjs.Text(text, sizeAndFont, color)
parentOfImageObject.text.x=parentOfImageObject.position.x + parentOfImageObject.size.x/2
parentOfImageObject.text.y=parentOfImageObject.position.y
parentOfImageObject.text.baseline = 'top'
parentOfImageObject.text.textAlign = 'center'
parentOfImageObject.text.maxWidth = parentOfImageObject.size.x

            }

            //end constructors
            
//-----------functions below this line ---------------------
  this.images.setDefaultPositions = function (){

            var cardWidth = 46
            var cardHeight = 62
            var sideButtonWidth = 185
            var sideButtonHeight = 16
            var actionButtonWidth = 80
            var actionButtonHeight = 25
            var seatWidth = 90
            var seatHeight = 33

            //initial positions and sizes of graphics of the poker table
            this.pot = new this.Item(290,138,110,24)

            //side buttons
            this.leftSideButtons[0].button = new this.Item(7.5,412,sideButtonWidth,sideButtonHeight)
            this.leftSideButtons[1].button = new this.Item(7.5,433,sideButtonWidth,sideButtonHeight)
            this.leftSideButtons[2].button = new this.Item(7.5,454,sideButtonWidth,sideButtonHeight)
             this.rightSideButtons[0].button = new this.Item(497.5,412,sideButtonWidth,sideButtonHeight)
            this.rightSideButtons[1].button = new this.Item(497.5,433,sideButtonWidth,sideButtonHeight)
            this.rightSideButtons[2].button = new this.Item(497.5,454,sideButtonWidth,sideButtonHeight)

            //seats
           this.seats[0].seat = new this.Item(300,371,seatWidth,seatHeight)
           this.seats[1].seat = new this.Item(170,371,seatWidth,seatHeight)
           this.seats[2].seat = new this.Item(27,301,seatWidth,seatHeight)
           this.seats[3].seat = new this.Item(27,153,seatWidth,seatHeight)
           this.seats[4].seat = new this.Item(170,77,seatWidth,seatHeight)
           this.seats[5].seat = new this.Item(300,77,seatWidth,seatHeight)
           this.seats[6].seat = new this.Item(430,77,seatWidth,seatHeight)
            this.seats[7].seat = new this.Item(573,153,seatWidth,seatHeight)
             this.seats[8].seat = new this.Item(573,301,seatWidth,seatHeight)
     this.seats[9].seat = new this.Item(430,371,seatWidth,seatHeight)
     //corresponding hole cards
        for (var i = 0; i < this.seats.length; i = i + 1){
            this.seats[i].hiddenCard0 = new this.Item(this.seats[i].seat.position.x - 1, this.seats[i].seat.position.y - 68, cardWidth, cardHeight)
            this.seats[i].hiddenCard1 = new this.Item(this.seats[i].seat.position.x + 45, this.seats[i].seat.position.y - 68, cardWidth, cardHeight)

            this.seats[i].shownCard0 = new this.Item(this.seats[i].seat.position.x - 1, this.seats[i].seat.position.y - 68, cardWidth, cardHeight)
            this.seats[i].shownCard1 = new this.Item(this.seats[i].seat.position.x + 45, this.seats[i].seat.position.y - 68, cardWidth, cardHeight)
          }

     // initial positions of player's chips entering pot
     this.seats[0].bet = new this.Item(345,291,20,10)
      this.seats[1].bet = new this.Item(215,291,20,10)
      this.seats[2].bet = new this.Item(137,153,20,10)
      this.seats[3].bet = new this.Item(215,291,20,10)
      this.seats[4].bet = new this.Item(215,121,20,10)
      this.seats[5].bet = new this.Item(345,121,20,10)
      this.seats[6].bet = new this.Item(475,121,20,10)
      this.seats[7].bet = new this.Item(553,153,20,10)
      this.seats[8].bet = new this.Item(553,227,20,10)
      this.seats[9].bet = new this.Item(475,291,20,10)

        // initial positions of action buttons
      this.fold = new this.Item(205,419,actionButtonWidth,actionButtonHeight)
      this.call = new this.Item(305,419,actionButtonWidth,actionButtonHeight)
      this.check = new this.Item(305,419,actionButtonWidth,actionButtonHeight)
      this.raise = new this.Item(405,419,actionButtonWidth,actionButtonHeight)
      this.bet = new this.Item(405,419,actionButtonWidth,actionButtonHeight)
      
        //set initial positions of community cards
        this.community[0] = new this.Item(222,169,cardWidth, cardHeight)
        this.community[1] = new this.Item(272,169,cardWidth, cardHeight)
        this.community[2] = new this.Item(322,169,cardWidth, cardHeight)
        this.community[3] = new this.Item(372,169,cardWidth, cardHeight)
        this.community[4] = new this.Item(422,169,cardWidth, cardHeight)
      }


    this.images.setDefaultImages = function (){
        
        //pot ****no image yet****
        //this.itemAsBitmap(this.pot, this.sources.pot)

        //side buttons
        for (var i = 0; i < 3; i = i + 1){
            this.itemAsRectangle(this.leftSideButtons[i].button, "#000000")
            this.itemAsRectangle(this.rightSideButtons[i].button, "#000000")
         }
         
         //seats and corresponding hole cards
        for (var i = 0; i < this.seats.length; i = i + 1){
            this.itemAsRectangle(this.seats[i].seat, "#000000")
            this.itemAsBitmap(this.seats[i].hiddenCard0, this.sources.hiddenCard)
            this.itemAsBitmap(this.seats[i].hiddenCard1, this.sources.hiddenCard)
            this.itemAsRectangle(this.seats[i].shownCard0, "#00FFFF")
            this.itemAsRectangle(this.seats[i].shownCard1, "#00FFFF")
            
          this.seats[i].seat.image.onMouseOver = self.asdf
        }
        
        //action buttons
        this.itemAsBitmap(this.fold, this.sources.fold)
        this.itemAsBitmap(this.call, this.sources.call)
        this.itemAsBitmap(this.check, this.sources.check)
        this.itemAsBitmap(this.raise, this.sources.raise)
        this.itemAsBitmap(this.bet, this.sources.bet)
            
        //community cards
        for (var i = 0; i < 5; i = i + 1){
 this.itemAsRectangle(this.community[i], "#00FFFF")
 }
    }

this.images.defaultMessages = function(){
    /*
    this.bet.messages[0] = 'act'
    this.bet.messages[1] = 'bet'
    this.call.messages[0] = 'act'
     this.call.messages[1] = 'call'
     this.check.messages[0] = 'act'
      this.check.messages[1] = 'check'
      this.raise.messages[0] = 'act'
       this.raise.messages[1] = 'raise'
       this.fold.messages[0] = 'act'
        this.fold.messages[1] = 'fold'
      for(i=0;i<this.seats.length;i=i+1){
         this.seats[i].seat.messages[0] = 'sit'
         this.seats[i].seat.messages[1] = i
         }   
         */   
}
 
        this.setBackground = function(){     
        jQuery('#body').css("background", "url('img/table_background.jpg') no-repeat")
    }

    this.initialize = function(){
        this.setBackground()
        this.images.setDefaultPositions()
       this.images.setDefaultImages()
      this.images.defaultMessages()
    }
     

    //does not update a player's stack size
    this.playerPutsChipsInPot=function(seatNumber,chips){
        
        if(this.stage.contains(this.images.seats[seatNumber].bet.text)){this.stage.removeChild(this.images.seats[seatNumber].bet.text)}
         this.images.addItemText(this.images.seats[seatNumber].bet,chips, "15px Arial", "#FFFFFF")
           this.stage.addChild(this.images.seats[seatNumber].bet.text)
           this.stage.update()

    }

    this.removeAllBets  = function(){
    for (i=0;i<holdemCanvas.images.seats.length;i=i+1){if(holdemCanvas.stage.contains(holdemCanvas.images.seats[i].bet.text)){holdemCanvas.stage.removeChild(holdemCanvas.images.seats[i].bet.text)}}
    this.stage.update()
    }
    //rotates positions of players seats and their hole cards n times clockwise
    this.images.rotateSeats = function (n){

    }
    
    this.displaySideButton = function (buttonText,parentOfImageObject){

           if(!this.stage.contains(parentOfImageObject.image)){this.stage.addChild(parentOfImageObject.image)}
           if(this.stage.contains(parentOfImageObject.text)){this.stage.removeChild(parentOfImageObject.text)}
           this.images.addItemText(parentOfImageObject, buttonText,"12px Arial", "#100D08")
            this.stage.addChild(parentOfImageObject.text)
            this.stage.update()
    }

    this.displayShownCard = function (cardText,parentOfImageObject){
        if (!this.stage.contains(parentOfImageObject.image)){this.stage.addChild(parentOfImageObject.image)}
        if (this.stage.contains(parentOfImageObject.text)){this.stage.removeChild(parentOfImageObject.image)}
        this.images.addItemText(parentOfImageObject, cardText,"13px Arial", "#100D08")
            this.stage.addChild(parentOfImageObject.text)
            this.stage.update()
    }

    this.displayPot = function (potSize){
   if(this.stage.contains(this.pot.text)){this.stage.removeChild(this.pot.text)}
   this.images.addItemText(this.images.pot, potSize,"14px Arial", "#100D08")
   this.stage.addChild(this.pot.text)
           this.stage.update()
    }

    this.playerSits = function(seatNumber, playerName, chips){
        if (!this.stage.contains(this.images.seats[seatNumber].seat.image)){this.stage.addChild(this.images.seats[seatNumber].seat.image)}
        if(this.stage.contains(this.images.seats[seatNumber].seat.text)){this.stage.removeChild(this.images.seats[seatNumber].seat.text)}
        this.images.addItemText(this.images.seats[seatNumber].seat, playerName+'\n'+chips,"14px Arial", "#FFFFFF")
           this.stage.addChild(this.images.seats[seatNumber].seat.text)
           this.stage.update()

    }

     this.playerStands = function(seatNumber){
        this.stage.removeChild(this.images.seats[seatNumber].seat.text)
        this.stage.update()
    }

    this.displayHoleCards = function (card0,card1){

       //check for and remove face down card images
         if(this.stage.contains(this.images.seats[this.userSeatNumber].hiddenCard0.image)){
            this.stage.removeChild(this.images.seats[this.userSeatNumber].hiddenCard0.image)
            this.stage.removeChild(this.images.seats[this.userSeatNumber].hiddenCard1.image)
            }

        this.displayShownCard(card0, this.images.seats[this.userSeatNumber].shownCard0)
        this.displayShownCard(card1, this.images.seats[this.userSeatNumber].shownCard1)
    }

   this.displayAllCommunity = function(communityArray){

    for (var i = 0; i < 5; i = i + 1) {

    if (communityArray[i] === '' || communityArray[i] === null) {
    
    }
    else{
    this.displayShownCard(communityArray[i], this.images.community[i])
    }
    }
    }
 
    //parameter is parent of the actual Image object
    this.displayImage = function (parentOfImageObject){

            this.stage.addChild(parentOfImageObject.image)
            this.stage.update()

    }
    
    this.displayAll = function () {

        for (var i = 0; i < this.images.seats.length; i = i + 1)
        {

            this.displayImage(this.images.seats[i].seat)
            this.displayImage(this.images.seats[i].hiddenCard0)
            this.displayImage(this.images.seats[i].hiddenCard1)
        }

        for (var i = 0; i < this.images.community.length; i = i + 1)
        {

            this.displayImage(this.images.community[i])
        }

      for (var i in this.images)
        {
            if (typeof this.images[i] === 'object')
            {
                if (this.images[i].image)
                {
                    this.displayImage(this.images[i])
                }
            }
        }
        
    }


   this.activateButton =  function (messages, parentOfImageObject){
    $(document).mousedown(function(e) {
    if((e.offsetX >=parentOfImageObject.position.x && e.offsetX <= parentOfImageObject.position.x + parentOfImageObject.size.x) &&
       (e.offsetY >=parentOfImageObject.position.y && e.offsetY <= parentOfImageObject.position.y + parentOfImageObject.size.y)) {
        console.log(messages);
       socket.emit.apply(socket, messages);
    }
})
}
 this.startCountdown = function(seatNumber, secondsToAct){
     this.gameState.seatNumberToAct = seatNumber
     this.gameState.secondsToAct = secondsToAct
     
     if (this.stage.contains(this.images.seats[this.gameState.seatNumberToAct].seat.text)){
         this.gameState.tempText = this.images.seats[this.gameState.seatNumberToAct].seat.text
         this.stage.removeChild(this.images.seats[this.gameState.seatNumberToAct].seat.text)
         }
          this.gameState.started = true
     }
    
           this.countdown = function(){
   // if (this.stage.contains(this.images.seats[this.gameState.seatNumberToAct].seat.text)){this.stage.removeChild(this.images.seats[this.gameState.seatNumberToAct].seat.text)}
   if (this.gameState.secondsToAct< 0){
        this.gameState.started = false   
        this.images.seats[this.gameState.seatNumberToAct].seat.text = this.gameState.tempText
        this.stage.addChild(this.images.seats[this.gameState.seatNumberToAct].seat.text)
       socket.emit('fold')
     
   }
   else{
       this.images.addItemText(this.images.seats[this.gameState.seatNumberToAct].seat,'Time: '+this.gameState.secondsToAct, '21px Arial', '#FFFFFF')
       this.stage.addChild(this.images.seats[this.gameState.seatNumberToAct].seat.text)
   }
   this.stage.update()
    this.gameState.secondsToAct=this.gameState.secondsToAct-1
    

}
}


jQuery(document).ready(function(){
    holdemCanvas = new Table(10)
     
    holdemCanvas.initialize()
     tick=function(event) {
         if(holdemCanvas.gameState.started) {
       
    // console.log(createjs.Ticker.getMeasuredFPS())
 holdemCanvas.countdown()
    }
}
 
createjs.Ticker.addEventListener("tick", tick)
createjs.Ticker.setInterval(1000)
    
})

    jQuery(window).load(function ()
    {
       
       holdemCanvas.displayAll()
       holdemCanvas.displayAllCommunity(['2c','3c','4c','5c','6c'])
       holdemCanvas.userSeatNumber = 7
       holdemCanvas.displayHoleCards('ac','ad')
       holdemCanvas.displayImage(holdemCanvas.images.fold)
       holdemCanvas.displayImage(holdemCanvas.images.raise)
       holdemCanvas.playerSits(1,'walter',400)
       holdemCanvas.activateButton (['fold'],holdemCanvas.images.fold)
      holdemCanvas.activateButton (['check'],holdemCanvas.images.check)
      holdemCanvas.activateButton (['raise'],holdemCanvas.images.raise)
      for (var i = 0;i<holdemCanvas.images.seats.length;i=i+1){
      holdemCanvas.activateButton (['sit',i],holdemCanvas.images.seats[i].seat)}
      holdemCanvas.playerPutsChipsInPot(4,400)
      holdemCanvas.startCountdown(2,11)
    })

    /*
    	nextImage.onMouseOver = showNextRoll;
	nextRollImage.onMouseOut = showBackRoll;
	nextRollImage.onClick = startBtnClick;
    */