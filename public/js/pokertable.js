    //default canvas size is 690x480
    //all numbers are in base 0, including variable names and documentation
    //seat position 0 is top middle and proceeds clockwise
    function Table (maxSeats) {
        this.canvas = document.getElementById('canvas')
        this.stage = new createjs.Stage(canvas)
        this.stage.eventsEnabled = true
        this.stage.enableMouseOver()
            this.events = {}
       // this.canvas.addEventListener("mouseup", this.filler, false)
  self = this

    // self.stage.removeChild(self.stage.getObjectUnderPoint(event.stageX,event.stageY))
  
        this.gameState = {}
        this.gameState.secondsToAct
        this.gameState.seatNumberToAct
        this.images = {}
       this.images.bottomContainer = new createjs.Container()
       this.images.topContainer = new createjs.Container()

       this.stage.addChild(this.images.bottomContainer)
       this.stage.addChild(this.images.topContainer)
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

            this.images.pot = {text:{}}
            this.images.fold = {text:{},messages:[]}
            this.images.call = {text:{},messages:[]}
            this.images.bet = {text:{},messages:[]}
            this.images.raise = {text:{},messages:[]}
            this.images.bet = {text:{},messages:[]}
            this.images.check = {text:{},messages:[]}
            this.images.betSlider ={}

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
        this.images.seats[i].text = {}
        this.images.seats[i].bet={}
        this.images.seats[i].messages = []
        this.images.seats[i].hiddenCard0={}
        this.images.seats[i].hiddenCard1={}
        this.images.seats[i].shownCard0={}
        this.images.seats[i].shownCard1={}
        
        }
                
//-----------start constructors----------------
this.images.Item = function (x,y,width,height, messages){
     this.position = {}
this.position.x = x
this.position.y = y
this.size = {}
this.size.x = width
this.size.y = height
if(messages){this.messages = messages}
this.drawRoundedRectangle = function(fillColor){
this.image.graphics.beginFill(fillColor).drawRoundRect(this.position.x, this.position.y, this.size.x, this.size.y,this.size.y*.1)
            }
this.drawBitmap=function(imageSource){

    this.image.x = this.position.x
    this.image.y = this.position.y
    
}
}

 this.images.itemAsBitmap = function (item,imageSource){
         var tempImage= new Image()
    tempImage.src = imageSource
    item.image = new createjs.Bitmap()
    item.drawBitmap(imageSource)
    item.image.parentOfImageObject = item
            }
    
            //actually a rectangle with rounded edges
             this.images.itemAsRectangle = function (item,fillColor){
 item.image = new createjs.Shape()
item.drawRoundedRectangle(fillColor)
item.image.parentOfImageObject = item
item.fillColor = fillColor
            }

            //for example: (parentOfImageObject, fold, "13px Arial", "#100D08")
            this.images.addItemText = function(parentOfImageObject,text,sizeAndFont,color){
                
                parentOfImageObject.text = new createjs.Text(text, sizeAndFont, color)
parentOfImageObject.text.x=parentOfImageObject.position.x + parentOfImageObject.size.x/2
parentOfImageObject.text.y=parentOfImageObject.position.y
parentOfImageObject.text.baseline = 'top'
parentOfImageObject.text.textAlign = 'center'
parentOfImageObject.text.maxWidth = parentOfImageObject.size.x*.9
parentOfImageObject.textColor = color

            }

//------------end constructors-------------------
            
//-------------start events--------------------------


  this.events.emptySeatMouseDown = function(event){
      event.target.graphics.clear()
  event.target.graphics.beginFill('red').drawRoundRect(event.target.parentOfImageObject.position.x, event.target.parentOfImageObject.position.y, event.target.parentOfImageObject.size.x, event.target.parentOfImageObject.size.y,event.target.parentOfImageObject.size.y*.15); 
     self.stage.update()
     event.onMouseUp = function(event){
         event.target.graphics.clear()
        event.target.graphics.beginFill(event.target.parentOfImageObject.fillColor).drawRoundRect(event.target.parentOfImageObject.position.x, event.target.parentOfImageObject.position.y, event.target.parentOfImageObject.size.x, event.target.parentOfImageObject.size.y,event.target.parentOfImageObject.size.y*.15); 
     self.stage.update()

     }
     }

     //bet slider to dispay betsize
     this.events.betSliderVerticalMouseDown = function(event){
  
      //set minX and maxX
      var minX = self.images.betSlider.horizontal.position.x
   var maxX = self.images.betSlider.horizontal.position.x +self.images.betSlider.horizontal.size.x
    event.onMouseMove = function(event){
         event.target.graphics.clear()

    //if mouse outside bounds of slider, set betsize to minimum or maximum bet
 if(event.stageX>maxX){
        event.target.graphics.beginFill('red').drawRect(maxX,event.target.parentOfImageObject.position.y,event.target.parentOfImageObject.size.x,event.target.parentOfImageObject.size.y)
        roundedBet = self.gameState.maxBet}
  else if(event.stageX<minX){
      event.target.graphics.beginFill('red').drawRect(minX,event.target.parentOfImageObject.position.y,event.target.parentOfImageObject.size.x,event.target.parentOfImageObject.size.y)
  roundedBet = self.gameState.minBet}

    //if mouse is inside the dimensions of the horizontal slider, proportionally display bet size
        else if(event.stageX>=minX && event.stageX<=maxX) {
     event.target.graphics.beginFill('red').drawRect(event.stageX,event.target.parentOfImageObject.position.y,event.target.parentOfImageObject.size.x,event.target.parentOfImageObject.size.y)
  var betSizePercent = (event.stageX-minX)/(maxX-minX)
     var unroundedBetAmount =  betSizePercent*(self.gameState.maxBet-self.gameState.minBet)+self.gameState.minBet
     var roundedBet = Math.round(unroundedBetAmount/self.gameState.minIncrement)*self.gameState.minIncrement
  }
    self.images.betSlider.betSize.text.text = roundedBet
    if(self.stage.contains(self.images.bet.text)){
        self.images.bet.text.text = 'Bet '+roundedBet
        self.images.bet.messages = ['act','bet',roundedBet]}
    
    else if(self.stage.contains(self.images.raise.text)){
        self.images.raise.text.text = 'Raise to '+roundedBet
    self.images.raise.messages = ['act','raise',roundedBet]}
    
  self.stage.update()
     
  }
 

 event.onMouseUp = function(event){
     event.target.graphics.clear()
     if(event.stageX>maxX){
        event.target.graphics.beginFill('blue').drawRect(maxX,event.target.parentOfImageObject.position.y,event.target.parentOfImageObject.size.x,event.target.parentOfImageObject.size.y)
        roundedBet = self.gameState.maxBet}
  else if(event.stageX<minX){
      event.target.graphics.beginFill('blue').drawRect(minX,event.target.parentOfImageObject.position.y,event.target.parentOfImageObject.size.x,event.target.parentOfImageObject.size.y)
  roundedBet = self.gameState.minBet}

    //if mouse is inside the dimensions of the horizontal slider, proportionally display bet size
        else if(event.stageX>=minX && event.stageX<=maxX) {
     event.target.graphics.beginFill('blue').drawRect(event.stageX,event.target.parentOfImageObject.position.y,event.target.parentOfImageObject.size.x,event.target.parentOfImageObject.size.y)
  var betSizePercent = (event.stageX-minX)/(maxX-minX)
     var unroundedBetAmount =  betSizePercent*(self.gameState.maxBet-self.gameState.minBet)+self.gameState.minBet
     var roundedBet = Math.round(unroundedBetAmount/self.gameState.minIncrement)*self.gameState.minIncrement

  }
   self.images.betSlider.betSize.text.text = roundedBet
   if(self.stage.contains(self.images.bet.text)){self.images.bet.text.text = 'Bet '+roundedBet}
    else if(self.stage.contains(self.images.raise.text)){self.images.raise.text.text = 'Raise to '+roundedBet}
  self.stage.update()

 }
 
 }

 
  this.events.onButtonClick = function(event){
        
        socket.emit.apply(socket, event.target.parentOfImageObject.messages)

    }
  
//--------------end events----------------------------

//-----------functions below this line ---------------------
  this.images.setDefaultItems = function (){

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

     //empty seats and action
     for(var i=0;i<this.seats.length;i=i+1){
         
         this.seats[i].emptySeat = new this.Item(this.seats[i].seat.position.x, this.seats[i].seat.position.y,this.seats[i].seat.size.x,this.seats[i].seat.size.y)
         this.seats[i].action = new this.Item(this.seats[i].seat.position.x, this.seats[i].seat.position.y,this.seats[i].seat.size.x,this.seats[i].seat.size.y)

     }
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
      this.fold = new this.Item(205,412,actionButtonWidth,actionButtonHeight, ['act','fold'])
      this.call = new this.Item(305,412,actionButtonWidth,actionButtonHeight, ['act','call'])
      this.check = new this.Item(305,412,actionButtonWidth,actionButtonHeight, ['act','check'])
      this.raise = new this.Item(405,412,actionButtonWidth,actionButtonHeight, ['act','raise'])
      this.bet = new this.Item(405,412,actionButtonWidth,actionButtonHeight, ['act','bet'])

      this.betSlider.horizontal = new this.Item (215,452,240,1)
      this.betSlider.vertical = new this.Item(215,442,4,20)
      this.betSlider.betSize = new this.Item(470,442,30,50)
      
        //set initial positions of community cards
        this.community[0] = new this.Item(222,169,cardWidth, cardHeight)
        this.community[1] = new this.Item(272,169,cardWidth, cardHeight)
        this.community[2] = new this.Item(322,169,cardWidth, cardHeight)
        this.community[3] = new this.Item(372,169,cardWidth, cardHeight)
        this.community[4] = new this.Item(422,169,cardWidth, cardHeight)
      }


    this.images.setDefaultImages = function (){
        
        //pot ****no image yet****
        this.addItemText(this.pot, '',"14px Arial", "#100D08")
        //this.itemAsBitmap(this.pot, this.sources.pot)

        //side buttons
        for (var i = 0; i < 3; i = i + 1){
            this.itemAsRectangle(this.leftSideButtons[i].button, "#000000")
            this.addItemText(this.rightSideButtons[i].button, '',"12px Arial", "#100D08")
            this.itemAsRectangle(this.rightSideButtons[i].button, "#000000")
            this.addItemText(this.rightSideButtons[i].button, '',"12px Arial", "#100D08")
         }
         
         //seats 
        for (var i = 0; i < this.seats.length; i = i + 1){
            this.itemAsRectangle(this.seats[i].seat, "#000000")
            this.addItemText(this.seats[i].seat,'','13px Arial','#FFFFFF' )
            this.itemAsRectangle(this.seats[i].emptySeat, "#000000")
            this.addItemText(this.seats[i].emptySeat,'click to sit','18px arial','#FFFFFF' )
            //hole cards
            this.itemAsBitmap(this.seats[i].hiddenCard0, this.sources.hiddenCard)
            this.itemAsBitmap(this.seats[i].hiddenCard1, this.sources.hiddenCard)
            this.itemAsRectangle(this.seats[i].shownCard0, "#00FFFF")
            this.itemAsRectangle(this.seats[i].shownCard1, "#00FFFF")
            this.addItemText(this.seats[i].shownCard0,'','12px Arial','#000000')
            this.addItemText(this.seats[i].shownCard1,'','12px Arial','#000000')
            //bets
            this.addItemText(this.seats[i].bet,'', "14px Arial", "#FFFFFF")
            //action
            this.addItemText(this.seats[i].action,'','20px Arial','#FFFFFF')
        }
        
        //action buttons
        this.itemAsRectangle(this.fold,  '#FF0000')
        this.addItemText(this.fold, 'fold','12px Arial','#000000')
        this.itemAsRectangle(this.call, 'red')
        this.addItemText(this.call, 'call','12px Arial','#000000')
        this.itemAsRectangle(this.check, 'red')
        this.addItemText(this.check, 'check','12px Arial','#000000')
        this.itemAsRectangle(this.raise, 'red')
        this.addItemText(this.raise, 'raise', '12px Arial','#000000')
        this.itemAsRectangle(this.bet, 'red')
        this.addItemText(this.bet, 'bet','12px Arial','#000000')

        this.itemAsRectangle(this.betSlider.horizontal, 'black')
        this.itemAsRectangle(this.betSlider.vertical, 'blue')
        this.addItemText(this.betSlider.betSize, 0, '14px Arial', 'black')
            
        //community cards
        for (var i = 0; i < 5; i = i + 1){
 this.itemAsRectangle(this.community[i], "#00FFFF")
 this.addItemText(this.community[i],'','12px Arial','black')
 }
    }

        this.setBackground = function(){     
        jQuery('#body').css("background", "url('img/table_background.jpg') no-repeat")
    }

    this.images.setDefaultEvents = function(){

        //mouse events for changing bet sizes
         this.betSlider.vertical.image.onPress = self.events.betSliderVerticalMouseDown
         //this.betSlider.horizontal.image.onPress 


        //mouse events for clicking on empty seats
             for (var i = 0; i < this.seats.length; i = i + 1){
           
          this.seats[i].emptySeat.image.onPress = self.events.emptySeatMouseDown
          this.seats[i].emptySeat.image.onMouseOut = self.events.emptySeatMouseOut
        }
    }

    this.initialize = function(){
        this.setBackground()
        this.images.setDefaultItems()
       this.images.setDefaultImages()
       this.images.setDefaultEvents()
    }
     

    //does not update a player's stack size
    this.playerPutsChipsInPot=function(seatNumber,chips){
        
         this.images.seats[seatNumber].bet.text.text = chips
           this.displayChildren(this.images.seats[seatNumber].bet)
           this.stage.update()

    }

    this.removeAllBets  = function(){
    for (i=0;i<holdemCanvas.images.seats.length;i=i+1){if(holdemCanvas.images.topContainer.contains(holdemCanvas.images.seats[i].bet.text)){holdemCanvas.removeChildren(holdemCanvas.images.seats[i].bet)}}
    this.stage.update()
    }


    //rotates positions of players seats and their hole cards n times clockwise
    this.images.rotateSeats = function (n){

    }
    
    this.displaySideButton = function (buttonText,parentOfImageObject){

           this.images.rightSideButtons[i].button.text.text = buttonText
            this.displayChildren(parentOfImageObject)
            this.stage.update()
    }

    this.displayShownCard = function (cardText,parentOfImageObject){
        
        parentOfImageObject.text.text= cardText
            this.displayChildren(parentOfImageObject)
            this.stage.update()
    }

    this.displayPot = function (potSize){
this.pot.text.text =potSize
   this.displayChildren(this.pot)
           this.stage.update()
    }

    this.playerSits = function(seatNumber, playerName, chips){
        this.hideChildren(this.images.seats[seatNumber].emptySeat)
        this.images.seats[seatNumber].seat.text.text =  playerName+'\n'+chips
           this.displayChildren(this.images.seats[seatNumber].seat)
           this.stage.update()

    }

     this.playerStands = function(seatNumber){
        this.hideChildren(this.images.seats[seatNumber].seat)
        this.displayChildren(this.images.seats[seatNumber].emptySeat)
        this.stage.update()
    }

    this.displayHoleCards = function (card0,card1){

       //check for and remove face down card images
         if(this.stage.contains(this.images.seats[this.userSeatNumber].hiddenCard0.image)){
            this.hideChildren(this.images.seats[this.userSeatNumber].hiddenCard0)
            this.hideChildren(this.images.seats[this.userSeatNumber].hiddenCard1)
            }

        this.displayShownCard(card0, this.images.seats[this.userSeatNumber].shownCard0)
        this.displayShownCard(card1, this.images.seats[this.userSeatNumber].shownCard1)
    }

   this.displayAllCommunity = function(communityArray){

    for (var i = 0; i < 5; i = i + 1) {

    if (communityArray[i] === '' || communityArray[i] === null) {}
    else{this.displayShownCard(communityArray[i], this.images.community[i])}
    }
    }
 
    //parameter is parent of the actual Image object
    this.displayImage = function (parentOfImageObject){

            this.images.bottomContainer.addChild(parentOfImageObject.image)
            this.stage.update()

    }
    
    this.displayText = function (parentOfTextObject){

            this.images.topContainer.addChild(parentOfTextObject.text)
            this.stage.update()

    }

    this.displayChildren = function(parent){
        if(parent instanceof this.images.Item){
            if(parent.image){this.displayImage(parent)}
            if(parent.text){this.displayText(parent)}
        }
 }
    this.hideText = function(parent){
        if(this.stage.contains(parent.text)){this.images.topContainer.removeChild(parent.text)}
this.stage.update()
        }

 
 this.hideImage = function(parent){
      if(this.stage.contains(parent.image)){this.images.bottomContainer.removeChild(parent.image)}
this.stage.update()
        }

 
 this.hideChildren = function(parent){
            if(this.stage.contains(parent.text)){this.images.topContainer.removeChild(parent.text)}
             if(this.stage.contains(parent.image)){this.images.bottomContainer.removeChild(parent.image)}

 }

    this.displayEmptySeats = function(emptySeats){
        
for (var i = 0; i < emptySeats.length; i = i + 1)
        {this.displayImage(this.images.seats[emptySeats[i]].emptySeat)
        this.displayText(this.images.seats[emptySeats[i]].emptySeat)}
    }

    this.showBetSlider=function(minBet, maxBet, minIncrement){
       
        this.gameState.minBet = minBet
        this.gameState.maxBet = maxBet
        this.gameState.minIncrement = minIncrement

  this.displayChildren(this.images.betSlider.horizontal)
  this.displayChildren(this.images.betSlider.vertical)
  this.images.betSlider.betSize.text.text = minBet
  this.displayText(this.images.betSlider.betSize)

  $("input").keypress(function (e){
      console.log(event)
  })
    }


    this.playerActs=function(seatNumber, actionText, fadeTimeInSeconds){
        var interval = 100
        var alpha = 1.5
       
        
      var playerAction =   setInterval(function() {

            self.hideText(self.images.seats[seatNumber].seat)
            self.images.seats[seatNumber].action.text.text = actionText
            if(alpha>1){self.images.seats[seatNumber].action.text.alpha = 1}
            else{self.images.seats[seatNumber].action.text.alpha = alpha}
            self.displayText(self.images.seats[seatNumber].action)
            alpha = alpha - 1/interval
            if (alpha<=0){clearInterval(playerAction)
            }

}, interval)

    }

 this.startCountdown = function(seatNumber, secondsToAct){

      var countdown =   setInterval(function() {
          
        self.hideText(self.images.seats[seatNumber].seat)
         self.displayText(self.images.seats[seatNumber].action)

   if (secondsToAct< 0){

        self.hideText(self.images.seats[seatNumber].action)
        self.displayText(self.images.seats[seatNumber].seat)
        clearInterval(countdown)

   }
   else{self.images.seats[seatNumber].action.text.text = 'Time: '+secondsToAct}

   self.stage.update()
    secondsToAct=secondsToAct-1
    
}, 1000)

    }
     


  this.activateButton =  function (parentOfImageObject, messages){
if(messages){parentOfImageObject.messages = messages}
        parentOfImageObject.image.onClick = holdemCanvas.events.onButtonClick
    }

    this.deactivateButton = function (parentOfImageObject, messages){
        if(messages){parentOfImageObject.messages = messages}
        parentOfImageObject.image.OnClick = null
    }

    }

jQuery(document).ready(function(){
    holdemCanvas = new Table(10)
    holdemCanvas.initialize()

})

    jQuery(window).load(function (){
       
        for(var i = 0;i<10;i++){
       holdemCanvas.displayChildren(holdemCanvas.images.seats[i].emptySeat)
       holdemCanvas.activateButton(holdemCanvas.images.seats[i].emptySeat)
       }
       holdemCanvas.displayAllCommunity(['2c','3c','4c','5c','6c'])
       holdemCanvas.userSeatNumber = 7
       holdemCanvas.displayHoleCards('ac','ad')
       holdemCanvas.displayChildren(holdemCanvas.images.fold)
       holdemCanvas.displayChildren(holdemCanvas.images.raise)
       
       holdemCanvas.playerSits(1,'walter',400)
      
      holdemCanvas.playerPutsChipsInPot(4,400)
      holdemCanvas.startCountdown(2,11)
  holdemCanvas.stage.addChild(holdemCanvas.images.leftSideButtons[0].button.image)
  holdemCanvas.stage.addChild(holdemCanvas.images.leftSideButtons[1].button.image)
  holdemCanvas.stage.addChild(holdemCanvas.images.leftSideButtons[2].button.image)
holdemCanvas.showBetSlider(1,100,.01)
holdemCanvas.activateButton(holdemCanvas.images.raise,['act','raise'])
holdemCanvas.stage.update()
holdemCanvas.displayAllCommunity(['5c','6c','9c','Tc','Jc'])
holdemCanvas.playerActs(8,'All In')


    })


 /*   this.images.defaultMessages = function(){
    
    this.bet.messages.push('act')
    this.bet.messages.push('bet')
    this.call.messages.push( 'act')
     this.call.messages.push( 'call')
     this.check.messages.push( 'act')
      this.check.messages.push('check')
      this.raise.messages.push( 'act')
       this.raise.messages.push( 'raise')
       this.fold.messages.push( 'act')
        this.fold.messages.push( 'fold')
      for(i=0;i<this.seats.length;i=i+1){
         this.seats[i].seat.messages.push( 'sit')
         this.seats[i].seat.messages.push( i)
         }   
         
}


asdf = new createjs.Container()
holdemCanvas.stage.addChild(asdf)
gjorb = new createjs.Shape()
asdf.addChild(gjorb)
console.log(holdemCanvas.stage.contains(gjorb))
holdemCanvas.stage.removeChild(gjorb)
//holdemCanvas.stage.update()
console.log(holdemCanvas.stage.contains(gjorb))


     tick=function(event) {
         if(holdemCanvas.gameState.countdownOn) {
       
    // console.log(createjs.Ticker.getMeasuredFPS())
 holdemCanvas.countdown()
    }
}
 
createjs.Ticker.addEventListener("tick", tick)
createjs.Ticker.setInterval(1000)
    
*/