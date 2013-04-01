    //default canvas size is 690x480
    //all numbers are in base 0, including variable names and documentation
    //seat position 0 is top middle and proceeds clockwise
    function Table (maxSeats) {
        self = this
        this.canvas = document.getElementById('canvas')
        this.stage = new createjs.Stage(canvas)
        this.stage.eventsEnabled = true
        this.stage.enableMouseOver()
            this.events = {}
       // this.canvas.addEventListener("mouseup", this.filler, false)
    // self.stage.removeChild(self.stage.getObjectUnderPoint(event.stageX,event.stageY))
  
        this.gameState = {}
        this.gameState.secondsToAct
        this.gameState.seatNuseumberToAct
        this.gameState.seats = []
        for(var i = 0;i<maxSeats;i++){
             this.gameState.seats[i]={}
             this.gameState.seats[i].displayMessageType = 'emptySeat'
        }
        this.gameState.cashier = {}

        this.images = {}
        this.images.containers = []
        this.images.containers[0] = new createjs.Container()
       this.images.containers[1] = new createjs.Container()
       this.images.containers[2] = new createjs.Container()
       this.images.containers[3] = new createjs.Container()
       this.images.containers[4] = new createjs.Container()
        this.images.containers[5] = new createjs.Container()
       this.stage.addChild(this.images.containers[0])
       this.stage.addChild(this.images.containers[1])
       this.stage.addChild(this.images.containers[2])
       this.stage.addChild(this.images.containers[3])
        this.stage.addChild(this.images.containers[4])
         this.stage.addChild(this.images.containers[5])
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
            sideButton :'img/side_button.jpg',
            background: 'img/table_background.jpg'
            }

            this.images.background = {}
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
                
//-----------START CONSTRUCTORS----------------
this.images.Item = function (x,y,width,height, zOfImageEvenIfNoImageExists,messages){
     this.position = {}
this.position.x = x
this.position.y = y
this.position.z = zOfImageEvenIfNoImageExists
this.size = {}
this.size.x = width
this.size.y = height
if(messages){this.messages = messages}
this.drawRoundedRectangle = function(fillColor){
this.image.graphics.beginFill(fillColor).drawRoundRect(this.position.x, this.position.y, this.size.x, this.size.y,this.size.y*.1)
            }
this.positionImage=function(){

    this.image.x = this.position.x
    this.image.y = this.position.y
    
}
}

 this.images.itemAsBitmap = function (item,imageSource){
    var tempImage= new Image()
    tempImage.src = imageSource
    item.image = new createjs.Bitmap(tempImage)
    item.positionImage()
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

//------------END CONSTRUCTORS-------------------
            
//-------------START EVENTS--------------------------
this.events.buttonMouseDown = function(event){
      event.target.graphics.clear()
  event.target.graphics.beginFill('red').drawRoundRect(event.target.parentOfImageObject.position.x, event.target.parentOfImageObject.position.y, event.target.parentOfImageObject.size.x, event.target.parentOfImageObject.size.y,event.target.parentOfImageObject.size.y*.15)
  event.target.parentOfImageObject.text.y = event.target.parentOfImageObject.position.y + 2
     self.stage.update()
     event.onMouseUp = function(event){
         event.target.graphics.clear()       
        event.target.graphics.beginFill(event.target.parentOfImageObject.fillColor).drawRoundRect(event.target.parentOfImageObject.position.x, event.target.parentOfImageObject.position.y, event.target.parentOfImageObject.size.x, event.target.parentOfImageObject.size.y,event.target.parentOfImageObject.size.y*.15); 
event.target.parentOfImageObject.text.y = event.target.parentOfImageObject.position.y
     self.stage.update()

     }
     }
      
  this.events.onButtonClick = function(event){
        socket.emit.apply(socket, event.target.parentOfImageObject.messages)

    }
  
    this.events.foldToAnyBetClick = function(event){
        
        socket.emit('set flag','fold',true)
        socket.emit('set flag','check',true)


    }

     //===============START BET SLIDER===================
     this.events.betSliderVerticalMouseDown = function(event){
  
         var roundedBet
         var betSizePercent
         var unRoundedBetAmount

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
  betSizePercent = (event.stageX-minX)/(maxX-minX)
     unroundedBetAmount =  betSizePercent*(self.gameState.maxBet-self.gameState.minBet)+self.gameState.minBet
     roundedBet = Math.round(unroundedBetAmount/self.gameState.minIncrement)*self.gameState.minIncrement
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
  //=============END BET SLIDER===================

  //===========START ADD CHIPS SLIDER ======================
    this.events.addChipsSliderVerticalMouseDown = function(){
          
          var unRounded
         var addPercent
         var rounded
  
      //set minX and maxX
      var minX = self.images.cashier.horizontalSlider.position.x
   var maxX = self.images.cashier.horizontalSlider.position.x +self.images.cashier.horizontalSlider.size.x
    event.onMouseMove = function(event){
         event.target.graphics.clear()

    //if mouse outside bounds of slider, set addSize to min max
 if(event.stageX>maxX){
        event.target.graphics.beginFill('red').drawRect(maxX,event.target.parentOfImageObject.position.y,event.target.parentOfImageObject.size.x,event.target.parentOfImageObject.size.y)
        rounded = self.gameState.cashier.max}
  else if(event.stageX<minX){
      event.target.graphics.beginFill('red').drawRect(minX,event.target.parentOfImageObject.position.y,event.target.parentOfImageObject.size.x,event.target.parentOfImageObject.size.y)
  rounded = self.gameState.cashier.min}

    //if mouse is inside the dimensions of the horizontal slider, proportionally display add size
        else if(event.stageX>=minX && event.stageX<=maxX) {
     event.target.graphics.beginFill('red').drawRect(event.stageX,event.target.parentOfImageObject.position.y,event.target.parentOfImageObject.size.x,event.target.parentOfImageObject.size.y)
  var addPercent = (event.stageX-minX)/(maxX-minX)
     var unRounded =  addPercent*(self.gameState.maxBet-self.gameState.minBet)+self.gameState.minBet
     var rounded = Math.round(unroundedBetAmount/self.gameState.cashier.minIncrement)*self.gameState.cashier.minIncrement
  }

    self.images.cashier.addChipsAmount.text.text = rounded
       self.images.cashier.addChips.messages = 'Add '+rounded
  self.stage.update()  
  }
 

 event.onMouseUp = function(event){
     event.target.graphics.clear()
     if(event.stageX>maxX){
        event.target.graphics.beginFill('blue').drawRect(maxX,event.target.parentOfImageObject.position.y,event.target.parentOfImageObject.size.x,event.target.parentOfImageObject.size.y)
        addChipsAmount = self.gameState.cashier.max}
  else if(event.stageX<minX){
      event.target.graphics.beginFill('blue').drawRect(minX,event.target.parentOfImageObject.position.y,event.target.parentOfImageObject.size.x,event.target.parentOfImageObject.size.y)
  rounded = self.gameState.minBet}

    //if mouse is inside the dimensions of the horizontal slider, proportionally display bet size
        else if(event.stageX>=minX && event.stageX<=maxX) {
     event.target.graphics.beginFill('blue').drawRect(event.stageX,event.target.parentOfImageObject.position.y,event.target.parentOfImageObject.size.x,event.target.parentOfImageObject.size.y)
   addPercent = (event.stageX-minX)/(maxX-minX)
      unRounded =  addPercent*(self.gameState.cashier.max-self.gameState.cashier.min)+self.gameState.cashier.min
     rounded = Math.round(unroundedBetAmount/self.gameState.minIncrement)*self.gameState.minIncrement

  }
   self.images.cashier.addAmount.text.text = rounded
  self.stage.update()

 }
 


    }
  //===========END ADD CHIPS SLIDER ======================


//--------------END EVENTS----------------------------

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
            this.pot = new this.Item(290,138,110,24,2)

            //side buttons
            this.leftSideButtons[0].button = new this.Item(7.5,419,sideButtonWidth,sideButtonHeight,2)
            this.leftSideButtons[1].button = new this.Item(7.5,439,sideButtonWidth,sideButtonHeight,2)
            this.leftSideButtons[2].button = new this.Item(7.5,459,sideButtonWidth,sideButtonHeight,2)
            this.rightSideButtons[0].button = new this.Item(497.5,419,sideButtonWidth,sideButtonHeight,2)
            this.rightSideButtons[1].button = new this.Item(497.5,439,sideButtonWidth,sideButtonHeight,2)
            this.rightSideButtons[2].button = new this.Item(497.5,459,sideButtonWidth,sideButtonHeight,2)

            //seats
           this.seats[0].seat = new this.Item(300,371,seatWidth,seatHeight,2)
           this.seats[1].seat = new this.Item(170,371,seatWidth,seatHeight,2)
           this.seats[2].seat = new this.Item(27,301,seatWidth,seatHeight,2)
           this.seats[3].seat = new this.Item(27,153,seatWidth,seatHeight,2)
           this.seats[4].seat = new this.Item(170,77,seatWidth,seatHeight,2)
           this.seats[5].seat = new this.Item(300,77,seatWidth,seatHeight,2)
           this.seats[6].seat = new this.Item(430,77,seatWidth,seatHeight,2)
            this.seats[7].seat = new this.Item(573,153,seatWidth,seatHeight,2)
             this.seats[8].seat = new this.Item(573,301,seatWidth,seatHeight,2)
     this.seats[9].seat = new this.Item(430,371,seatWidth,seatHeight,2)

     //empty seats and action
     for(var i=0;i<this.seats.length;i=i+1){
         
         this.seats[i].emptySeat = new this.Item(this.seats[i].seat.position.x, this.seats[i].seat.position.y,this.seats[i].seat.size.x,this.seats[i].seat.size.y,2)

         this.seats[i].action = new this.Item(this.seats[i].seat.position.x, this.seats[i].seat.position.y,this.seats[i].seat.size.x,this.seats[i].seat.size.y/2,2)
         this.seats[i].countdown = new this.Item(this.seats[i].seat.position.x, this.seats[i].seat.position.y,this.seats[i].seat.size.x,this.seats[i].seat.size.y/2,2)
         this.seats[i].winner = new this.Item(this.seats[i].seat.position.x, this.seats[i].seat.position.y,this.seats[i].seat.size.x,this.seats[i].seat.size.y/2,2)

         //horizontal middle divider of the seat box
         this.seats[i].horizontalDivider = new this.Item(this.seats[i].seat.position.x, this.seats[i].seat.position.y+this.seats[i].seat.size.y/2,this.seats[i].seat.size.x,1,2)
         this.seats[i].playerName = new this.Item(this.seats[i].seat.position.x, this.seats[i].seat.position.y,this.seats[i].seat.size.x,this.seats[i].seat.size.y/2,2)
         this.seats[i].status = new this.Item(this.seats[i].horizontalDivider.position.x, this.seats[i].horizontalDivider.position.y,this.seats[i].seat.size.x,this.seats[i].seat.size.y/2,2)

     }
     //corresponding hole cards
        for (var i = 0; i < this.seats.length; i = i + 1){
            this.seats[i].hiddenCard0 = new this.Item(this.seats[i].seat.position.x - 1, this.seats[i].seat.position.y - 48, cardWidth, cardHeight,1)
            this.seats[i].hiddenCard1 = new this.Item(this.seats[i].seat.position.x + 45, this.seats[i].seat.position.y - 48, cardWidth, cardHeight,1)

            this.seats[i].shownCard0 = new this.Item(this.seats[i].seat.position.x - 1, this.seats[i].seat.position.y - 48, cardWidth, cardHeight,1)
            this.seats[i].shownCard1 = new this.Item(this.seats[i].seat.position.x + 45, this.seats[i].seat.position.y - 48, cardWidth, cardHeight,1)
          }

     // initial positions of player's chips entering pot
      this.seats[0].bet = new this.Item(345,291,20,10,2)
      this.seats[1].bet = new this.Item(215,291,20,10,2)
      this.seats[2].bet = new this.Item(137,227,20,10,2)
      this.seats[3].bet = new this.Item(137,153,20,10,2)
      this.seats[4].bet = new this.Item(215,121,20,10,2)
      this.seats[5].bet = new this.Item(345,121,20,10,2)
      this.seats[6].bet = new this.Item(475,121,20,10,2)
      this.seats[7].bet = new this.Item(553,153,20,10,2)
      this.seats[8].bet = new this.Item(553,227,20,10,2)
      this.seats[9].bet = new this.Item(475,291,20,10,2)

        // initial positions of action buttons
      this.fold = new this.Item(205,419,actionButtonWidth,actionButtonHeight,2, ['act','fold'])
      this.call = new this.Item(305,419,actionButtonWidth,actionButtonHeight,2, ['act','call'])
      this.check = new this.Item(305,419,actionButtonWidth,actionButtonHeight,2, ['act','check'])
      this.raise = new this.Item(405,419,actionButtonWidth,actionButtonHeight,2, ['act','raise'])
      this.bet = new this.Item(405,419,actionButtonWidth,actionButtonHeight,2, ['act','bet'])

      this.betSlider.horizontal = new this.Item (215,458,240,1,2)
      this.betSlider.vertical = new this.Item(215,448,4,20,2)
      this.betSlider.betSize = new this.Item(470,448,30,50,2)
      
        //set initial positions of community cards
        this.community[0] = new this.Item(222,169,cardWidth, cardHeight,2)
        this.community[1] = new this.Item(272,169,cardWidth, cardHeight,2)
        this.community[2] = new this.Item(322,169,cardWidth, cardHeight,2)
        this.community[3] = new this.Item(372,169,cardWidth, cardHeight,2)
        this.community[4] = new this.Item(422,169,cardWidth, cardHeight,2)

        //upper left side button
        this.stand = new this.Item(0,0,actionButtonWidth,actionButtonHeight/2,2)

      }


    this.images.setDefaultImages = function (){
      
        //pot ****no image yet****
        this.addItemText(this.pot, '',"14px Arial", "#100D08")
        //this.itemAsBitmap(this.pot, this.sources.pot)

        //side buttons
        for (var i = 0; i < 3; i = i + 1){
            this.itemAsRectangle(this.leftSideButtons[i].button, "#000000")
            this.addItemText(this.leftSideButtons[i].button, '',"12px Arial", "#FFFFFF")
            this.itemAsRectangle(this.rightSideButtons[i].button, "#000000")
            this.addItemText(this.rightSideButtons[i].button, '',"12px Arial", "#FFFFFF")
         }
         this.rightSideButtons[0].button.text.text = 'fold to any bet'
         this.rightSideButtons[1].button.text.text = 'sit out next hand'
         this.rightSideButtons[2].button.text.text = 'sit out next blind'
         //seats 
        for (var i = 0; i < this.seats.length; i = i + 1){
            //filled seats
            this.itemAsRectangle(this.seats[i].seat, "#000000")
            this.seats[i].seat.image.graphics.beginStroke("#FFFFFF").moveTo(this.seats[i].horizontalDivider.position.x,this.seats[i].horizontalDivider.position.y).lineTo(this.seats[i].horizontalDivider.position.x+this.seats[i].horizontalDivider.size.x,this.seats[i].horizontalDivider.position.y)
            //Empty Seats
            this.itemAsRectangle(this.seats[i].emptySeat, "#000000")
            this.addItemText(this.seats[i].emptySeat,'Open Seat','15px arial','#FFFFFF' )
            //hole cards
            this.itemAsBitmap(this.seats[i].hiddenCard0, this.sources.hiddenCard)
            this.itemAsBitmap(this.seats[i].hiddenCard1, this.sources.hiddenCard)
            this.itemAsRectangle(this.seats[i].shownCard0, "#00FFFF")
            this.itemAsRectangle(this.seats[i].shownCard1, "#00FFFF")
            this.addItemText(this.seats[i].shownCard0,'','12px Arial','#000000')
            this.addItemText(this.seats[i].shownCard1,'','12px Arial','#000000')
            //player name
            this.addItemText(this.seats[i].playerName,'','11px arial','#FFFFFF' )
            //player's status
            this.addItemText(this.seats[i].status,'','11px arial','#FFFFFF' )
            //bets
            this.addItemText(this.seats[i].bet,'', "11px Arial", "#FFFFFF")
            //action
            this.addItemText(this.seats[i].action,'','11px Arial','#FFFFFF')
            //countdown
            this.addItemText(this.seats[i].countdown,'','11px Arial','#FFFFFF')
            //winner
             this.addItemText(this.seats[i].winner,'','11px Arial','#FFFFFF')
             //horizontal divider
            
        }
        
        //action buttons
        this.itemAsRectangle(this.fold,  'red')
        this.addItemText(this.fold, 'fold','12px Arial','#000000')
        this.itemAsRectangle(this.call, 'red')
        this.addItemText(this.call, 'call','12px Arial','#000000')
        this.itemAsRectangle(this.check, 'red')
        this.addItemText(this.check, 'check','12px Arial','#000000')
        this.itemAsRectangle(this.raise, 'red')
        this.addItemText(this.raise, 'raise', '12px Arial','#000000')
        this.itemAsRectangle(this.bet, 'red')
        this.addItemText(this.bet, 'bet','12px Arial','#000000')

        //bet slider
        this.itemAsRectangle(this.betSlider.horizontal, 'black')
        this.itemAsRectangle(this.betSlider.vertical, 'blue')
        this.addItemText(this.betSlider.betSize, 0, '14px Arial', 'black')
            
        //community cards
        for (var i = 0; i < 5; i = i + 1){
 this.itemAsRectangle(this.community[i], "#00FFFF")
 this.addItemText(this.community[i],'','12px Arial','black')
 }
 //upper left button
 this.itemAsRectangle(this.stand, 'black')
 this.addItemText(this.stand,'stand up','10px Arial','white')

    }

        this.setBackground = function(){    
        var asdf = new Image ()
        asdf.src  = this.images.sources.background
        this.images.background.image = new createjs.Bitmap(asdf)
        this.images.containers[0].addChild(this.images.background.image)
    }


    this.images.setDefaultEvents = function(){

        //mouse events for changing bet sizes
         this.betSlider.vertical.image.onPress = self.events.betSliderVerticalMouseDown
         //this.betSlider.horizontal.image.onPress 

        //mouse events for clicking on empty seats
             for (var i = 0; i < this.seats.length; i = i + 1){
          this.seats[i].emptySeat.image.onPress = self.events.buttonMouseDown
         this.seats[i].emptySeat.image.onClick = self.events.onButtonClick
        }

        this.rightSideButtons[0].button.image.onClick = self.events.foldToAnyBetClick

    }

    this.images.setDefaultMessages = function(){
        
        for (var i = 0; i < this.seats.length; i = i + 1){
          this.seats[i].emptySeat.messages = ['sit',i, 100+i]
        }
    }

    this.initialize = function(){
        this.setBackground()
        this.images.setDefaultItems()
       this.images.setDefaultImages()
       this.images.setDefaultEvents()
       this.images.setDefaultMessages()
    }
     

    //does not update a player's stack size
    this.playerPutsChipsInPot =function(seatNumber,betSize, stackSize){
        
         this.images.seats[seatNumber].bet.text.text = betSize
         if(stackSize && stackSize <=0){stackSize = 'All In'}
         this.images.seats[seatNumber].status.text.text = stackSize

           this.displayChildren(this.images.seats[seatNumber].bet)
           this.stage.update()


    }

    this.removeAllBets  = function(){
    for (i=0;i<this.images.seats.length;i=i+1){
        if(this.stage.contains(this.images.seats[i].bet.text)){this.hideChildren(this.images.seats[i].bet)}}
    this.stage.update()
    }

    //rotates positions of players seats and their hole cards n times clockwise
    this.images.rotateSeats = function (n){

    }
    
    this.displayShownCard = function (cardText,parentOfImageObject){
        
        parentOfImageObject.text.text= cardText
            this.displayChildren(parentOfImageObject)
    }

        this.displayHoleCards = function (hand,seatNumber){

               //check for and remove face down card images
         if(this.stage.contains(this.images.seats[seatNumber].hiddenCard0.image)){
            this.hideChildren(this.images.seats[seatNumber].hiddenCard0)
            this.hideChildren(this.images.seats[seatNumber].hiddenCard1)
            }

        this.displayShownCard(hand[0], this.images.seats[seatNumber].shownCard0)
        this.displayShownCard(hand[1], this.images.seats[seatNumber].shownCard1)

    }

    this.hideHoleCards = function (seatNumber){
        

            this.hideChildren(this.images.seats[seatNumber].hiddenCard0)
            this.hideChildren(this.images.seats[seatNumber].hiddenCard1)
this.hideChildren(this.images.seats[seatNumber].shownCard0)
            this.hideChildren(this.images.seats[seatNumber].shownCard1)


    }

    this.displayPot = function (potSize){
this.images.pot.text.text = 'pot: '+potSize
   this.displayChildren(this.images.pot)
    }

    this.playerSits = function(seatNumber, playerName, chips){
        this.gameState.seats[seatNumber].displayMessageType = 'seat'
        this.images.seats[seatNumber].playerName.text.text =  playerName
        if(typeof chips == 'number' && chips>0){
        this.images.seats[seatNumber].status.text.text =  chips
        }
        else if(this.stage.contains(this.images.seats[seatNumber].hiddenCard0)||this.stage.contains(this.images.seats[seatNumber].shownCard0)){this.images.seats[seatNumber].status.text.text =  'All In'}
        else{this.images.seats[seatNumber].status.text.text =  'Sitting Out'}
           
        this.displayCorrectSeatMessage(seatNumber)
        if(this.gameState.userSeatNumber == seatNumber){   this.displayChildren(this.images.stand)}

    }

     this.playerStands = function(seatNumber){
          this.gameState.seats[seatNumber].displayMessageType = 'emptySeat'
this.displayCorrectSeatMessage(seatNumber)
        this.hideChildren(this.images.stand)
    }


   this.displayAllCommunity = function(communityArray){

    for (var i = 0; i < communityArray.length; i = i + 1) {

    if (communityArray[i] === '' || communityArray[i] === null) {}
    else{this.displayShownCard(communityArray[i], this.images.community[i])}
    }
    }
 
    //parameter is parent of the actual Image object
    this.displayImage = function (parentOfImageObject){
        if(parentOfImageObject.image){
this.images.containers[parentOfImageObject.position.z].addChild(parentOfImageObject.image)
            this.stage.update()
            }
    }
    
    this.displayText = function (parentOfTextObject){
        if(parentOfTextObject.text){
            this.images.containers[parentOfTextObject.position.z+1].addChild(parentOfTextObject.text)
            this.stage.update()
            }
    }

    this.displayChildren = function(parentOrGrandparent){

        //check if input is parent
        if(parentOrGrandparent instanceof this.images.Item){
            this.displayImage(parentOrGrandparent)
         this.displayText(parentOrGrandparent)
        }

        //input is grandparent object
        else if (typeof parentOrGrandparent === 'object'){
            for(var i in parentOrGrandparent){
    if(parentOrGrandparent[i] instanceof this.images.Item){
            this.displayImage(parentOrGrandparent[i])
         this.displayText(parentOrGrandparent[i])
        }
            }

        }

        else if(typeof parentOrGrandparent === 'array'){
            
            for(var i =0;i<parentOrGrandparent.length;i++){
                    if(parentOrGrandparent[i] instanceof this.images.Item){
            this.displayImage(parentOrGrandparent[i])
         this.displayText(parentOrGrandparent[i])
        }

            }

        }


 }

 this.displayHiddenCards =function(seatNumber){
     this.displayChildren(this.images.seats[seatNumber].hiddenCard0)
     this.displayChildren(this.images.seats[seatNumber].hiddenCard1)

 }
    this.hideText = function(parent){
        if(this.stage.contains(parent.text)){
            this.images.containers[parent.position.z+1].removeChild(parent.text)
        this.stage.update()
        }
        }

 
 this.hideImage = function(parentOfImageObject){
      if(this.stage.contains(parentOfImageObject.image)){
              this.images.containers[parentOfImageObject.position.z].removeChild(parentOfImageObject.image)
              this.stage.update()
          }
        }

 this.hideChildren = function(parentOrGrandparent){

             //check if input is parent
        if(parentOrGrandparent instanceof this.images.Item){
            this.hideImage(parentOrGrandparent)
         this.hideText(parentOrGrandparent)
        }

        //input is grandparent
        else if(typeof parentOrGrandparent === 'object'){
            for(var i in parentOrGrandparent){
    if(parentOrGrandparent[i] instanceof this.images.Item){
            this.hideImage(parentOrGrandparent[i])
         this.hideText(parentOrGrandparent[i])
        }
            }

        }
               else if(typeof parentOrGrandparent === 'array'){
            
            for(var i =0;i<parentOrGrandparent.length;i++){
                    if(parentOrGrandparent[i] instanceof this.images.Item){
            this.hideImage(parentOrGrandparent[i])
         this.hideText(parentOrGrandparent[i])
        }

            }

        }
 }

 this.hideAllActionButtons=function(seatNumber){
this.hideChildren(this.images.fold)
this.hideChildren(this.images.call)
this.hideChildren(this.images.check)
this.hideChildren(this.images.raise)
this.hideChildren(this.images.bet)
this.hideChildren(this.images.betSlider)
     

 }

 this.roundEnds = function(){
     
     //hide community cards
     for(var i=0; i<this.images.community.length;i++){ this.hideChildren(this.images.community[i])}

     //hide players' hands
       for(var i=0; i<this.images.seats.length;i++){
         
        this.hideChildren(this.images.seats[i].hiddenCard0)
        this.hideChildren(this.images.seats[i].hiddenCard1)
        this.hideChildren(this.images.seats[i].shownCard0)
        this.hideChildren(this.images.seats[i].shownCard1)

     }
     //remove all player's bets
        self.removeAllBets()
        //hide the pot
        self.hideChildren(self.images.pot)

 }

    this.displayEmptySeats = function(emptySeats){
        
for (var i = 0; i < emptySeats.length; i = i + 1)
        {this.displayImage(this.images.seats[emptySeats[i]].emptySeat)
        this.displayText(this.images.seats[emptySeats[i]].emptySeat)}
    }

    this.showInHandOptions=function(){
        
        this.displayChildren(this.images.rightSideButtons[0].button)
        this.displayButton(this.images.rightSideButtons[1].button,false, ['set flag', 'receive_hole_cards', false])
        this.displayButton(this.images.rightSideButtons[2].button,false,['set flag','post_blind',false])
    }
    this.hideSeatedOptions = function(){
        this.hideChildren(this.images.rightSideButtons[0].button)
         this.hideChildren(this.images.rightSideButtons[1].button)
          this.hideChildren(this.images.rightSideButtons[2].button)
    }

    this.showBetSlider =function(minBet, maxBet, minIncrement){
       
        this.gameState.minBet = minBet
        this.gameState.maxBet = maxBet
        this.gameState.minIncrement = minIncrement

 //reset slider to original position and color
 this.images.betSlider.vertical.image.graphics.clear()
 this.images.betSlider.vertical.image.graphics.beginFill('blue').drawRect(this.images.betSlider.vertical.position.x,this.images.betSlider.vertical.position.y,this.images.betSlider.vertical.size.x,this.images.betSlider.vertical.size.y)
  this.images.betSlider.betSize.text.text = minBet
  this.displayChildren(this.images.betSlider)

  $("input").keypress(function (e){
      console.log(event)
  })
    }

    this.displayCorrectSeatMessage = function(seatNumber){
        
        switch (this.gameState.seats[seatNumber].displayMessageType){

            case 'seat':
            this.displayChildren(this.images.seats[seatNumber].seat)
            this.displayChildren(this.images.seats[seatNumber].status)
            this.displayChildren(this.images.seats[seatNumber].playerName)
            this.hideText(this.images.seats[seatNumber].action)
            this.hideText(this.images.seats[seatNumber].winner)
            this.hideText(this.images.seats[seatNumber].countdown)
             this.hideChildren(this.images.seats[seatNumber].emptySeat)
            break;

            case 'countdown':
              this.displayChildren(this.images.seats[seatNumber].seat)
             this.displayText(this.images.seats[seatNumber].countdown)
            this.displayChildren(this.images.seats[seatNumber].status)

            this.hideChildren(this.images.seats[seatNumber].playerName)
            this.hideText(this.images.seats[seatNumber].action)
            this.hideText(this.images.seats[seatNumber].seat)
            this.hideText(this.images.seats[seatNumber].winner)

             this.hideChildren(this.images.seats[seatNumber].emptySeat)
            break;

            case 'action':
             this.displayChildren(this.images.seats[seatNumber].seat)
             this.displayText(this.images.seats[seatNumber].action)
            this.displayChildren(this.images.seats[seatNumber].status)

            this.hideChildren(this.images.seats[seatNumber].playerName)
            this.hideText(this.images.seats[seatNumber].winner)
            this.hideText(this.images.seats[seatNumber].seat)
            this.hideText(this.images.seats[seatNumber].countdown)
             this.hideChildren(this.images.seats[seatNumber].emptySeat)
            break;

            case 'winner':
              this.displayChildren(this.images.seats[seatNumber].seat)
            this.displayChildren(this.images.seats[seatNumber].status)
           this.displayChildren(this.images.seats[seatNumber].winner)

           this.hideChildren(this.images.seats[seatNumber].playerName)
            this.hideText(this.images.seats[seatNumber].action)
            this.hideText(this.images.seats[seatNumber].countdown)
            this.hideChildren(this.images.seats[seatNumber].emptySeat)
            break;

            case 'emptySeat':
            
            this.displayChildren(this.images.seats[seatNumber].emptySeat)

              this.hideChildren(this.images.seats[seatNumber].seat)
            this.hideChildren(this.images.seats[seatNumber].status)
            this.hideChildren(this.images.seats[seatNumber].playerName)
            this.hideText(this.images.seats[seatNumber].action)
            this.hideText(this.images.seats[seatNumber].winner)
            this.hideText(this.images.seats[seatNumber].countdown)
            break;

            default:
            this.displayChildren(this.images.seats[seatNumber].emptySeat)

            this.hideChildren(this.images.seats[seatNumber].seat)
            this.hideChildren(this.images.seats[seatNumber].status)
            this.hideChildren(this.images.seats[seatNumber].playerName)

            this.hideText(this.images.seats[seatNumber].action)
            this.hideText(this.images.seats[seatNumber].countdown)
            this.hideText(this.images.seats[seatNumber].winner)
            break;

            

        }

    }


    this.playerActs=function(seatNumber, actionText, fadeTimeInSeconds){
         //if player is current user, hide action buttons
        if(seatNumber === self.gameState.userSeatNumber){this.hideAllActionButtons(this.gameState.userSeatNumber)}
        this.gameState.seats[seatNumber].displayMessageType = 'action'

        self.images.seats[seatNumber].action.text.text = ''

        //hide other messages on the seat box
        self.displayCorrectSeatMessage(seatNumber)

        var interval = 100
        var alpha
        if(typeof fadeTimeInSeconds == 'number'){alpha = fadeTimeInSeconds}
        else{alpha = 2}

      var playerAction =   setInterval(function() {

          if(self.gameState.seats[seatNumber].displayMessageType != 'action'||alpha<=0)
          {
                if(self.gameState.seats[seatNumber].displayMessageType === 'action'){self.gameState.seats[seatNumber].displayMessageType = 'seat'}
                self.displayCorrectSeatMessage(seatNumber)
                clearInterval(playerAction)
            }

        else if(alpha>1){
                self.images.seats[seatNumber].action.text.alpha = 1
                self.images.seats[seatNumber].action.text.text = actionText
                self.stage.update()
                }
            else{
                self.images.seats[seatNumber].action.text.alpha = alpha
            self.images.seats[seatNumber].action.text.text = actionText
            self.stage.update()
            }
            
            alpha = alpha - interval/1000

}, interval)
    }

    this.playerWins =function(seatNumber, chipsWon, fadeTimeInSeconds){
        
        this.gameState.seats[seatNumber].displayMessageType === 'winner'

         self.images.seats[seatNumber].winner.text.text = ''
          //hide other messages on the seat box
self.displayCorrectSeatMessage(seatNumber)

         var interval = 100
         var alpha
        if(typeof fadeTimeInSeconds == 'number'){alpha = fadeTimeInSeconds}
        else{alpha = 2.5}


      var declareWinner =   setInterval(function() {

          if(self.gameState.seats[seatNumber].displayMessageType != 'winner'||alpha<=0)
          {
                if(self.gameState.seats[seatNumber].displayMessageType === 'winner'){self.gameState.seats[seatNumber].displayMessageType = 'seat'}
                self.displayCorrectSeatMessage(seatNumber)
                clearInterval(declareWinner)
            }
            
            else if(alpha>1){
                self.images.seats[seatNumber].winner.text.alpha = 1
                self.images.seats[seatNumber].winner.text.text = 'Wins '+chipsWon
                self.stage.update()
                }
            else{
                self.images.seats[seatNumber].winner.text.alpha = alpha
            self.images.seats[seatNumber].winner.text.text = 'Wins '+chipsWon
            self.stage.update()
            }
            
            alpha = alpha - interval/1000


}, interval)

    }


 this.startCountdown = function(seatNumber, secondsToAct){

      this.gameState.seats[seatNumber].displayMessageType = 'countdown'

         self.images.seats[seatNumber].countdown.text.text = ''
                  //hide other messages on the seat box
self.displayCorrectSeatMessage(seatNumber)

      var countdown = setInterval(function() {
          if(self.gameState.seats[seatNumber].displayMessageType != 'countdown'){clearInterval(countdown)}

   else if ( secondsToAct>= 0){
        self.images.seats[seatNumber].countdown.text.text = 'Time: '+secondsToAct
       secondsToAct=secondsToAct-1
       self.stage.update()
   }

   else{
        if(self.gameState.seats[seatNumber].displayMessageType === 'countdown'){self.gameState.seats[seatNumber].displayMessageType = 'seat'}
        self.displayCorrectSeatMessage(seatNumber)
        clearInterval(countdown)
       }
       

   
}, 1000)

}

    //make sure to set buttonText as FALSE if you want to display the default text
  this.displayButton =  function (parentOfImageObject, buttonText, messages){

      if(buttonText){parentOfImageObject.text.text = buttonText}
      if(messages){parentOfImageObject.messages = messages}

      parentOfImageObject.image.onClick = this.events.onButtonClick
      parentOfImageObject.image.onPress = this.events.buttonMouseDown
     this.displayChildren(parentOfImageObject)
 
    }

    this.hideButton = function (parentOfImageObject, messages){
        this.hideChildren(parentOfImageObject)
        if(messages){parentOfImageObject.messages = messages}
        parentOfImageObject.image.onClick = null
    }
    
    this.hideCashier = function(){

                self.hideChildren(self.images.cashier)

    }

    this.displayCashier = function(min, max, balance,table_name,small_blind, big_blind)
    {
        
        this.images.cashier = {}

        var cashierWindowWidth = 200
        var cashierWindowHeight = 250
        //declare size variables
        var textLeftOffset = 10
         var outerTopHeight = cashierWindowHeight*.08
                var outerBottomHeight = cashierWindowHeight*.03
        var outerSideWidth = cashierWindowWidth*.02

        var asdf = document.getElementById('canvas')
        var stageWidth = asdf.width
        var stageHeight = asdf.height
        var cashierWindowX = stageWidth/2 - cashierWindowWidth/2
        var cashierWindowY = stageHeight/2 - cashierWindowHeight/2
        

        var innerCashierX = cashierWindowX+outerSideWidth
        var innerCashierY = cashierWindowY+outerTopHeight
        var innerCashierWidth = cashierWindowWidth-2*outerSideWidth
        var innerCashierHeight = cashierWindowHeight-outerBottomHeight-outerTopHeight

        var textX = innerCashierX + textLeftOffset
        

        this.images.cashier.window = new this.images.Item(cashierWindowX,cashierWindowY,cashierWindowWidth,cashierWindowHeight,4)
        this.images.cashier.window.image = new createjs.Shape()
        //outer blue rim
        this.images.cashier.window.image.graphics.setStrokeStyle(1).beginFill('blue').beginStroke('#FF00FF').rect(cashierWindowX,cashierWindowY,cashierWindowWidth,cashierWindowHeight)
        this.images.cashier.window.image.graphics.setStrokeStyle(1).beginFill('#C0C0C0').beginStroke('#FF00FF').rect(innerCashierX,innerCashierY,innerCashierWidth,innerCashierHeight)

        this.images.cashier.blinds = new this.images.Item (textX,innerCashierY+15, innerCashierWidth,25,4)
        this.images.addItemText(this.images.cashier.blinds, 'blinds: '+small_blind+'/'+big_blind, '13px arial', '#000000')

         this.images.cashier.tableName = new this.images.Item (textX,this.images.cashier.blinds.position.y+15, innerCashierWidth,25,4)
        this.images.addItemText(this.images.cashier.tableName, 'Table Name: '+table_name, '13px arial', '#000000')

        this.images.cashier.tableMin = new this.images.Item (textX,this.images.cashier.tableName.position.y+15, innerCashierWidth,25,4)
        this.images.addItemText(this.images.cashier.tableMin, 'Minimum Buyin: '+min, '13px arial', '#000000')

        this.images.cashier.tableMax = new this.images.Item (textX, this.images.cashier.tableMin.position.y+15, innerCashierWidth,25,4)
        this.images.addItemText(this.images.cashier.tableMax, 'Maximum Buyin: '+max, '13px arial', '#000000')

        this.images.cashier.accountBalance = new this.images.Item (textX,this.images.cashier.tableMax.position.y +15, innerCashierWidth,25,4)
        this.images.addItemText(this.images.cashier.accountBalance, 'My Available Balance: '+balance, '13px arial', '#000000')

        this.images.cashier.addChipsTextBox = new this.images.Item (textX,this.images.cashier.accountBalance.position.y +25, cashierWindowWidth/2,25,4)
    //    $('<form id = 'cashier'>    <input type = 'radio' name = 'max'>max<br>Other Amount: <input type = 'text'>        </form>')
      //  this.images.cashier.addChipsTextBox.image = new createjs.DOMElement(cashier)
      //  this.images.cashier.addChipsTextBox.positionImage()

    //    this.images.cashier.currency =  new this.images.Item (cashierWindowOffsetLeft,this.images.cashier.accountBalance.position.y+10, cashierWindowWidth,25,4) 
    //    this.images.addItemText( this.images.cashier.currency, 'Currency: '+currency, '13px arial', '#000000')
        
        this.images.cashier.addChips =  new this.images.Item (cashierWindowX + 10,cashierWindowY+cashierWindowHeight-40, 50,25,4) 
        this.images.itemAsRectangle( this.images.cashier.addChips, '#0000FF')
        this.images.addItemText( this.images.cashier.addChips, 'add chips', '13px arial', '#000000')

        this.images.cashier.cancel =  new this.images.Item (cashierWindowX + 100,cashierWindowY+cashierWindowHeight-40, 50,25,4) 
        this.images.itemAsRectangle( this.images.cashier.cancel, '#0000FF')
        this.images.addItemText( this.images.cashier.cancel, 'cancel', '13px arial', '#000000')
        this.images.cashier.cancel.onClick = this.hideCashier()

      this.images.cashier.horizontalSlider = new this.images.Item (this.images.cashier.addChips.position.x,this.images.cashier.addChips.position.y-25,cashierWindowWidth-30,1,4)
      this.images.cashier.verticalSlider = new this.images.Item(this.images.cashier.horizontalSlider.position.x,this.images.cashier.horizontalSlider.position.y-10,5,20,4)
      this.images.cashier.addChipsAmount = new this.images.Item(this.images.cashier.horizontalSlider.position.x+this.images.cashier.horizontalSlider.size.x+20,30,35,30,4)
              this.images.itemAsRectangle(this.images.cashier.horizontalSlider, 'black')
        this.images.itemAsRectangle(this.images.cashier.verticalSlider, 'blue')
        this.images.addItemText(this.images.cashier.addChipsAmount, '0', '14px Arial', 'black')


        this.images.cashier.cancel.image.onClick = this.hideCashier

        this.images.cashier.addChips.image.onClick = this.events.addChipsSliderVerticalMouseDown

                this.displayChildren(this.images.cashier)

}



    

   this.displayInitialTableState=function(){
        
        var table_state = $('#server_values').data('table_state');
        console.log(table_state)

        //remove extra seats
        for (var i = 9;i>table_state.max_players;i=i-1){
            
            this.images.seats[i] = null
            this.gameState.seats[i] = null

        }

                 //empty seats
         for (var i = 0; i<table_state.max_players;i++){
             
             this.displayCorrectSeatMessage(i)
         }

                //display player's cards
         for(var i=0;i<table_state.players.length;i=i+1){
               if(!table_state.players[i].hand)
               {
                   this.displayHiddenCards(table_state.players[i].seat)
                   }
              
                   else if(table_state.players[i].hand)
                   {
        this.displayHoleCards(table_state.players[i].hand, table_state.players[i].seat)
        }
        }
        
                //display seats and assign userSeatNumber
         for (var i in table_state.seats) { 
          //assign userSeatNumber if player is user
         if(table_state.seats[i].is_you){ this.gameState.userSeatNumber = table_state.seats[i].seat }
         //seated players
         this.playerSits(table_state.seats[i].seat,table_state.seats[i].username,table_state.seats[i].chips)
        
         }

        //comunity cards
        this.displayAllCommunity(table_state.community)
        //pot
        if(table_state.pot&&table_state.pot>0){this.displayPot(table_state.pot)}

         //current bets
         for (var i=0;i<table_state.players.length;i=i+1) { 
         this.playerPutsChipsInPot(table_state.players[i].seat,table_state.players[i].current_bet, table_state.players[i].chips)
         }


        
  
    }
    
  //---------------------SOCKET CODE------------------------
  this.loadTableOnConnect =function(){
         socket.on('user_joins', function(user,is_you){
             if(is_you === true){   self.displayInitialTableState()   }
            self.activateSockets()
                
})

  }

    this.activateSockets = function(){

    //community cards are dealt
       socket.on('community_dealt', function(community){
            self.removeAllBets()
            self.displayAllCommunity(community)
                
})
        
//hands dealt to non-user players
       socket.on('hands_dealt', function(players){
           
           for(var i = 0; i<players.length;i++){
               if(players[i].seat!=self.gameState.userSeatNumber){
        self.displayHiddenCards(players[i].seat)
     }
      }
})


//hand dealt to user
       socket.on('hole_cards_dealt', function(hand){
           self.displayHoleCards(hand, self.gameState.userSeatNumber)
                   self.showInHandOptions()
        });
     


//player acts
       socket.on('player_acts', function(player, action, pot){

        self.playerActs(player.seat, action, 2)
    //display updated potsize if necessary
        if(pot){self.displayPot(pot)}

        switch(action){
        case 'fold':
        self.hideHoleCards(player.seat)
        if(player.seat == self.gameState.userSeatNumber){
            self.hideButton(self.images.rightSideButtons[0].button)
            }
            break;

            case 'check':
            break;

            case'bet':
            self.playerPutsChipsInPot(player.seat,player.current_bet, player.chips)
            break;

            case'call':
            self.playerPutsChipsInPot(player.seat,player.current_bet, player.chips)
             break;

            case 'raise':
            self.playerPutsChipsInPot(player.seat,player.current_bet, player.chips)
            break;

            
        }


             
})

//user to act 
 socket.on('act_prompt', function(actions, timeout){

     self.startCountdown(self.gameState.userSeatNumber,Math.round(timeout/1000))
     for (var i = 0; i < actions.length; i++){
     if (typeof actions[i].fold !== 'undefined'){
         self.displayChildren(self.images.fold)
         self.displayButton(self.images.fold, false, ['act','fold'])
        }
       else if (actions[i].check !== undefined){
         self.displayChildren(self.images.check)
         self.displayButton(self.images.check,false,['act','check'])
         }
      else   if (actions[i].call){
             self.images.call.text.text = 'Call '+actions[i].call
         self.displayChildren(holdemCanvas.images.call)
         self.displayButton(holdemCanvas.images.call,false,['act','call',actions[i].call])
         }
       else  if (actions[i].raise){
         self.displayChildren(self.images.raise)
         self.displayButton(self.images.raise,'raise to '+actions[i].raise[0],['act','raise', actions[i].raise[0]])
         self.showBetSlider(actions[i].raise[0], actions[i].raise[1], .01)
         }
      else if (actions[i].bet){
         self.displayChildren(self.images.bet)
         self.displayButton(self.images.bet,'bet '+actions[i].bet[0] ,['act','bet',actions[i].bet[0]])
         self.showBetSlider(actions[i].bet[0], actions[i].bet[1], .01)
         }
         }
})

//player to act (not the user)
 socket.on('player_to_act', function(player, timeout){

     self.startCountdown(player.seat,Math.round(timeout/1000))
     
})



//player sits, checks if player is the user
       socket.on('player_sits', function(player, is_you){
           self.hideChildren(self.images.seats[player.seat].emptySeat)
        self.playerSits(player.seat, player.username, player.chips)
        if(is_you == true){
            socket.emit('get_add_chips_info')
            self.gameState.userSeatNumber = player.seat
            self.displayButton(self.images.stand, false, ['stand'])
            self.displayCashier(1,2,1000,'no limit holdem',.01,.02)
            //console.log(self.images.leftSideButtons[1].button.image)
}});

//player stands, checks if player is the user
       socket.on('player_stands', function(player, seatNumber, is_you){

           self.playerStands(seatNumber)

        
        if(is_you){
            self.gameState.userSeatNumber = false
}
})

//player receives server message to open cashier
       socket.on('add_chips_info', function(min,max, balance,table_name,small_blind, big_blind){
        self.displayCashier(min,max, balance,table_name,small_blind, big_blind)
        }
  );   

  //player adds chips to his stack
       socket.on('add_chips', function(min,max, balance,table_name,small_blind, big_blind){
        self.displayCashier(min,max, balance,table_name,small_blind, big_blind)
        }
  );   
  

//player adds chips to his stack
       socket.on('player_rebuys', function(player,seat_num){
        self.images.playerSits(seat_num, player, player.chips)
        }
  );   


//round ends, all hole cards are shown
       socket.on('winners', function(players){


           for(var i =0;i<players.length;i++){
               self.hideHoleCards(players[i].seat)
        self.displayHoleCards(players[i].hand, players[i].seat)
        self.playerSits(players[i].seat, players[i].username, players[i].chips)
        self.playerWins(players[i].seat, players[i].chips_won)
        }
        

        

})

//reset table
socket.on('reset_table', function(players){
          self.roundEnds()


})
    }

   }

    //---------------END SOCKET CODE----------------------------

jQuery(document).ready(function(){
    holdemCanvas = new Table(10)
    holdemCanvas.initialize()
    
        
})

    jQuery(window).load(function (){
        holdemCanvas.loadTableOnConnect()
 
    })


 /*  
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
