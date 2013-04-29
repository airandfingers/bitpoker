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
  this.imageData = {
      maxChipsPerColumn:5,
      distanceBetweenChipColumns:4
  }
        this.gameState = {}
        this.gameState.displaySize = 'normal'
        this.gameState.secondsToAct
        this.gameState.seatNuseumberToAct
        this.gameState.seats = []
        for(var i = 0;i<maxSeats;i++){
             this.gameState.seats[i]={}
             this.gameState.seats[i].displayMessageType = 'openSeat'
        }
        this.gameState.cashier = {}
        this.gameState.messageBox = {}
        this.gameState.messageBox.activeContainers = []
        this.gameState.containerImageIndexes = {
            
            cashier:5,
            background:0,
            holeCard:1,
            cardAnimation:2,
            chips:2,
            button:3,
            initialMessageBox:7
        }

        this.images = {}
        this.images.containers = []
        for (var i = 0;i<16;i++){
        this.images.containers[i] = new createjs.Container()
        this.stage.addChild(this.images.containers[i])
        
     }

          this.images.sources = {
            call: 'img/call.jpg',
            check: 'img/check.jpg',
            raise: 'img/raise.jpg',
            hiddenCard: 'img/fourColorDeck/back.png',
            hiddenCardSmall:'img/fourColorDeck/resize/back.png',
            seat: 'img/empty_seat.jpg',
            blankSeat : 'img/blank_seat.jpg',
            bet: 'img/bet.jpg',
            community: 'img/card_back.jpg',
            fold: 'img/fold.jpg',
            sideButton :'img/side_button.jpg',
            background: 'img/table_background.jpg',
            fourColorDeck: 'img/4colorsheet.png',
            dealerButton: 'img/dealer_button.png',
            
            chips: {
                red:'img/chips/red_chip.png',
                black: 'img/chips/black_chip.png'
            }
            }

            this.images.background = {}
            this.images.pots = []
            for(var i =0;i<9;i++){
                this.images.pots[i] = {}
                 this.images.pots[i].potSize = {text:{}}
                  this.images.pots[i].chips = []
                  this.images.pots[i].firstChip = {}
                  this.images.pots[i].secondChip = {}
                  this.images.pots[i].secondColumnChip = {}
            }
   
            this.images.fold = {text:{},messages:[]}
            this.images.call = {text:{},messages:[]}
            this.images.bet = {text:{},messages:[]}
            this.images.raise = {text:{},messages:[]}
            this.images.bet = {text:{},messages:[]}
            this.images.check = {text:{},messages:[]}
            this.images.betSlider ={}
            this.images.cashier  = {}
            this.images.messageBox=[]
           

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
        this.images.seats[i].chips = []
        this.images.seats[i].firstChip = {}
        this.images.seats[i].secondChip = {}
        this.images.seats[i].secondColumnChip={}
        this.images.seats[i].messages = []
        this.images.seats[i].hiddenCard0={}
        this.images.seats[i].hiddenCard1={}
        this.images.seats[i].shownCard0={}
        this.images.seats[i].shownCard1={}
        this.images.seats[i].dealerButton={}
        
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
    item.bitmapSource = imageSource
            }

            this.images.cardAsBitmap = function(item,cardText){
                 var cardImage = new Image()
     if(self.gameState.displaySize == 'mobile') {
         var imageSource = 'img/fourColorDeck/resize/'+cardText+'.png'
         }
         else{
              var imageSource = 'img/fourColorDeck/'+cardText+'.png'
         }

  //    parentOfImageObject.image = new createjs.Bitmap(cardImage)
  //    parentOfImageObject.image.x = parentOfImageObject.position.x
  //    parentOfImageObject.image.y = parentOfImageObject.position.y

      this.itemAsBitmap(item,imageSource)

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
parentOfImageObject.text.y=parentOfImageObject.position.y + 1
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

    this.events.onAddChipsClick = function(event){
        if($('#maxRadio').is(':checked'))
        {
            socket.emit('add_chips',self.gameState.cashier.max)

        }
        else if($('#otherAmountRadio').is(':checked')){
            var amount = $('#otherAmount').val()
            if(isNaN(amount)){
                var info = {}
                info.okay = true
                info.message = "amount must be a number"
                self.displayMessageBox(info)
            }
            else{
                
                socket.emit('add_chips',Number(amount))
            }

        }
        else if($('#autoRebuyRadio').is(':checked')){
            var amount = $('#autoRebuy').val()
            if(isNaN(otherAmount)){
                var info = {}
                info.okay = true
                info.message = "Amount must be a number"
                self.displayMessageBox(info)
            }
            else{
                
                socket.emit('auto_rebuy',Number(amount))
            }

        }

        else if(!$("input[name='addChipsRadio']:checked").val()){
            var info = {}
                info.okay = true
                info.message = "Please select either: max, other amount, or auto-rebuy"
                self.displayMessageBox(info)
        }

    }

     //===============START BET SLIDER===================
     this.events.betSliderVerticalMouseDown = function(event){
  
         var roundedBet
         var betSizePercent
         var unRoundedBetAmount

      //set minX and maxX
      var minX = self.images.betSlider.horizontal.position.x
   var maxX = self.images.betSlider.horizontal.position.x +self.images.betSlider.horizontal.size.x

   //if mouse is moved
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
   betSizePercent = (event.stageX-minX)/(maxX-minX)
      unroundedBetAmount =  betSizePercent*(self.gameState.maxBet-self.gameState.minBet)+self.gameState.minBet
      roundedBet = Math.round(unroundedBetAmount/self.gameState.minIncrement)*self.gameState.minIncrement

  }
   self.images.betSlider.betSize.text.text = roundedBet
   if(self.stage.contains(self.images.bet.text)){self.images.bet.text.text = 'Bet '+roundedBet}
    else if(self.stage.contains(self.images.raise.text)){self.images.raise.text.text = 'Raise to '+roundedBet}
  self.stage.update()

 }
 

 }
  //=============END BET SLIDER===================

//--------------END EVENTS----------------------------


//-----------functions below this line ---------------------
this.images.setDefaults = function(){
    
    var canvasWidth = document.getElementById('canvas').width
     var canvasHeight = document.getElementById('canvas').height

     //small cards are 37 x 45
     //big cards are 48 x 76
     var cardWidth
     var cardHeight

     if(self.gameState.displaySize == 'mobile'){
         cardWidth = 37
       cardHeight = 45

            }
            else{
                cardWidth = 48
                cardHeight = 76
            }

            //percentage of vertical card to show
            var shownCardY = 0.9

            var sideButtonWidth = 185
            var sideButtonHeight = 16
            var actionButtonWidth = 80
            var actionButtonHeight = 25
            var seatWidth = 90
            var seatHeight = 33
            var distanceBetweenSeatsX = 40
            var distanceBetweenSeatsY = 123

            var firstRowY = 77
            var secondRowY =153
            var thirdRowY = secondRowY + seatHeight + distanceBetweenSeatsY
            var fourthRowY =371

            var firstColumnX = 27
            var fifthColumnX = canvasWidth - firstColumnX - seatWidth

            var secondColumnX = canvasWidth/2 - seatWidth/2 - seatWidth - distanceBetweenSeatsX
            var thirdColumnX = canvasWidth/2 - seatWidth/2 
            var fourthColumnX = thirdColumnX + seatWidth + distanceBetweenSeatsX


            var communityY = 220
            var distanceBetweenCommunityCards = 2

            var dealerButtonWidth = 25
            var dealerButtonHeight = 26

            var topRowSeatDealerButtonX = dealerButtonWidth/2
            var topRowSeatDealerButtonY = seatHeight+dealerButtonHeight*.1

            var leftColumnSeatDealerButtonX = seatWidth+dealerButtonWidth*.1
            var leftColumnSeatDealerButtonY = 0

            var bottomRowSeatDealerButtonX = dealerButtonWidth/2
            var bottomRowSeatDealerButtonY = -dealerButtonHeight*.1

            var rightColumnSeatDealerButtonX = seatWidth-dealerButtonWidth*1.1
            var rightColumnSeatDealerButtonY = 0

            var potHeight = 7
            var potWidth = 100

            var potDistanceToCommunity = -25
            var chipDiameter = 20
            var distanceBetweenChipsY = 3

            var betTextHeight = 7
            var betTextWidth =  20
            var absoluteDistanceBetweenBetTextAndChipImages = 5

            //space between player's cards/seats, and chip images in play, relative to the upper left seat corner
            var bottomChipOffsetX = chipDiameter
            var bottomChipOffsetY = -cardHeight*shownCardY - chipDiameter*1.5
            var leftChipOffsetX =  seatWidth + chipDiameter*1.5
            var leftChipOffsetY = chipDiameter/2
            var topChipOffsetX = seatWidth - chipDiameter
            var topChipOffsetY = seatHeight + chipDiameter*1.5
            var rightChipOffsetX = -chipDiameter*1.5
            var rightChipOffsetY = seatHeight - chipDiameter/2

            //---------pot-------------------

            this.pots[0].potSize = new this.Item(canvasWidth/2-potWidth/2,communityY+cardHeight+potHeight,potWidth,potHeight,self.gameState.containerImageIndexes.chips)
             this.addItemText(this.pots[0].potSize, '',"14px Arial", "#FFFFFF")

             this.pots[0].firstChip = new this.Item(canvasWidth/2-cardWidth/2-cardWidth,communityY+potDistanceToCommunity,chipDiameter,chipDiameter,self.gameState.containerImageIndexes.chips)
              this.pots[0].secondChip = new this.Item(this.pots[0].firstChip.position.x,this.pots[0].firstChip.position.y-distanceBetweenChipsY,chipDiameter,chipDiameter,self.gameState.containerImageIndexes.chips)
              this.pots[0].secondColumnChip = new this.Item(this.pots[0].firstChip.position.x+chipDiameter+self.imageData.distanceBetweenChipColumns,this.pots[0].firstChip.position.y,chipDiameter,chipDiameter,self.gameState.containerImageIndexes.chips)


           //--------side buttons---------------------
            this.leftSideButtons[0].button = new this.Item(7.5,419,sideButtonWidth,sideButtonHeight,self.gameState.containerImageIndexes.button)
            this.leftSideButtons[1].button = new this.Item(7.5,439,sideButtonWidth,sideButtonHeight,self.gameState.containerImageIndexes.button)
            this.leftSideButtons[2].button = new this.Item(7.5,459,sideButtonWidth,sideButtonHeight,self.gameState.containerImageIndexes.button)
            this.rightSideButtons[0].button = new this.Item(497.5,419,sideButtonWidth,sideButtonHeight,self.gameState.containerImageIndexes.button)
            this.rightSideButtons[1].button = new this.Item(497.5,439,sideButtonWidth,sideButtonHeight,self.gameState.containerImageIndexes.button)
            this.rightSideButtons[2].button = new this.Item(497.5,459,sideButtonWidth,sideButtonHeight,self.gameState.containerImageIndexes.button)

        for (var i = 0; i < 3; i = i + 1){
            this.itemAsRectangle(this.leftSideButtons[i].button, "#000000")
            this.addItemText(this.leftSideButtons[i].button, '',"12px Arial", "#FFFFFF")
            this.itemAsRectangle(this.rightSideButtons[i].button, "#000000")
            this.addItemText(this.rightSideButtons[i].button, '',"12px Arial", "#FFFFFF")
         }
         this.rightSideButtons[0].button.text.text = 'fold to any bet'
         this.rightSideButtons[1].button.text.text = 'sit out next hand'
         this.rightSideButtons[2].button.text.text = 'sit out next blind'

           //----------------------seats-------------------------------
           this.seats[0].seat = new this.Item(thirdColumnX,fourthRowY,seatWidth,seatHeight,self.gameState.containerImageIndexes.button)
           this.seats[1].seat = new this.Item(secondColumnX,fourthRowY,seatWidth,seatHeight,self.gameState.containerImageIndexes.button)
           this.seats[2].seat = new this.Item(firstColumnX,thirdRowY,seatWidth,seatHeight,self.gameState.containerImageIndexes.button)
           this.seats[3].seat = new this.Item(firstColumnX,secondRowY,seatWidth,seatHeight,self.gameState.containerImageIndexes.button)
           this.seats[4].seat = new this.Item(secondColumnX,firstRowY,seatWidth,seatHeight,self.gameState.containerImageIndexes.button)
           this.seats[5].seat = new this.Item(thirdColumnX,firstRowY,seatWidth,seatHeight,self.gameState.containerImageIndexes.button)
           this.seats[6].seat = new this.Item(fourthColumnX,firstRowY,seatWidth,seatHeight,self.gameState.containerImageIndexes.button)
            this.seats[7].seat = new this.Item(fifthColumnX,secondRowY,seatWidth,seatHeight,self.gameState.containerImageIndexes.button)
             this.seats[8].seat = new this.Item(fifthColumnX,thirdRowY,seatWidth,seatHeight,self.gameState.containerImageIndexes.button)
     this.seats[9].seat = new this.Item(fourthColumnX,fourthRowY,seatWidth,seatHeight,self.gameState.containerImageIndexes.button)

     //--------------------empty seats and text-----------------
     for(var i=0;i<this.seats.length;i=i+1){
         
         this.seats[i].openSeat = new this.Item(this.seats[i].seat.position.x, this.seats[i].seat.position.y,this.seats[i].seat.size.x,this.seats[i].seat.size.y,self.gameState.containerImageIndexes.button)

          this.seats[i].disabledSeat = new this.Item(this.seats[i].seat.position.x, this.seats[i].seat.position.y,this.seats[i].seat.size.x,this.seats[i].seat.size.y,self.gameState.containerImageIndexes.button)


         this.seats[i].action = new this.Item(this.seats[i].seat.position.x, this.seats[i].seat.position.y,this.seats[i].seat.size.x,this.seats[i].seat.size.y/2,self.gameState.containerImageIndexes.button)
         this.seats[i].countdown = new this.Item(this.seats[i].seat.position.x, this.seats[i].seat.position.y,this.seats[i].seat.size.x,this.seats[i].seat.size.y/2,self.gameState.containerImageIndexes.button)
         this.seats[i].winner = new this.Item(this.seats[i].seat.position.x, this.seats[i].seat.position.y,this.seats[i].seat.size.x,this.seats[i].seat.size.y/2,self.gameState.containerImageIndexes.button)

         this.seats[i].horizontalDivider = new this.Item(this.seats[i].seat.position.x, this.seats[i].seat.position.y+this.seats[i].seat.size.y/2,this.seats[i].seat.size.x,1,self.gameState.containerImageIndexes.button)
         this.seats[i].playerName = new this.Item(this.seats[i].seat.position.x, this.seats[i].seat.position.y,this.seats[i].seat.size.x,this.seats[i].seat.size.y/2,self.gameState.containerImageIndexes.button)
         this.seats[i].status = new this.Item(this.seats[i].horizontalDivider.position.x, this.seats[i].horizontalDivider.position.y,this.seats[i].seat.size.x,this.seats[i].seat.size.y/2,self.gameState.containerImageIndexes.button)

     }
     //------------------hole cards-----------------------------
        for (var i = 0; i < this.seats.length; i = i + 1){
            this.seats[i].hiddenCard0 = new this.Item(this.seats[i].seat.position.x +this.seats[i].seat.size.x/2- cardWidth, this.seats[i].seat.position.y - cardHeight*shownCardY, cardWidth, cardHeight,1)
            this.seats[i].hiddenCard1 = new this.Item(this.seats[i].seat.position.x + this.seats[i].seat.size.x/2, this.seats[i].seat.position.y - cardHeight*shownCardY, cardWidth, cardHeight,1)

            this.seats[i].shownCard0 = new this.Item(this.seats[i].seat.position.x +this.seats[i].seat.size.x/2- cardWidth, this.seats[i].seat.position.y - cardHeight*shownCardY, cardWidth, cardHeight,1)
            this.seats[i].shownCard1 = new this.Item(this.seats[i].seat.position.x + this.seats[i].seat.size.x/2, this.seats[i].seat.position.y - cardHeight*shownCardY, cardWidth, cardHeight,1)
          }


            //------------seat images----------------------
        for (var i = 0; i < this.seats.length; i = i + 1){
            
            //filled seats
this.seats[i].seat.image = new createjs.Shape()
this.seats[i].seat.image.snapToPixel = true
this.seats[i].seat.image.graphics.setStrokeStyle(2,'square').beginStroke("#FFFFFF").beginFill('black').drawRect(this.seats[i].seat.position.x, this.seats[i].seat.position.y, this.seats[i].seat.size.x, this.seats[i].seat.size.y)
            this.seats[i].seat.image.graphics.setStrokeStyle(1).beginStroke("#FFFFFF").moveTo(this.seats[i].horizontalDivider.position.x,this.seats[i].horizontalDivider.position.y).lineTo(this.seats[i].horizontalDivider.position.x+this.seats[i].horizontalDivider.size.x,this.seats[i].horizontalDivider.position.y)
          this.seats[i].seat.image.parentOfImageObject = this.seats[i].seat
            //Empty Seats
            this.seats[i].openSeat.image = new createjs.Shape()
this.seats[i].openSeat.image.snapToPixel = true
this.seats[i].openSeat.image.graphics.setStrokeStyle(2,'square').beginStroke("#FFFFFF").beginFill('black').drawRect(this.seats[i].openSeat.position.x, this.seats[i].openSeat.position.y, this.seats[i].openSeat.size.x, this.seats[i].openSeat.size.y)
this.seats[i].openSeat.image.parentOfImageObject = this.seats[i].openSeat                

                this.seats[i].openSeat.text = new createjs.Text('Open Seat', '15px Arial', "#FFFFFF")
this.seats[i].openSeat.text.x=this.seats[i].openSeat.position.x + this.seats[i].openSeat.size.x/2 
this.seats[i].openSeat.text.y=this.seats[i].openSeat.position.y + 4
this.seats[i].openSeat.text.baseline = 'top'
this.seats[i].openSeat.text.textAlign = 'center'
this.seats[i].openSeat.text.maxWidth = this.seats[i].openSeat.size.x*.9
this.seats[i].openSeat.textColor = "#FFFFFF"       

            //disabled Seats
            this.seats[i].disabledSeat.image = new createjs.Shape()
this.seats[i].disabledSeat.image.snapToPixel = true
this.seats[i].disabledSeat.image.graphics.setStrokeStyle(1,'square').beginStroke("#544E4F").beginFill('black').drawRect(this.seats[i].disabledSeat.position.x, this.seats[i].disabledSeat.position.y, this.seats[i].disabledSeat.size.x, this.seats[i].disabledSeat.size.y)
         this.seats[i].disabledSeat.image.parentOfImageObject = this.seats[i].disabledSeat       


            //hole cards
            if(self.gameState.displaySize == 'mobile'){
                       this.itemAsBitmap(this.seats[i].hiddenCard0, this.sources.hiddenCardSmall)
            this.itemAsBitmap(this.seats[i].hiddenCard1, this.sources.hiddenCardSmall)

            }
            else{
            this.itemAsBitmap(this.seats[i].hiddenCard0, this.sources.hiddenCard)
            this.itemAsBitmap(this.seats[i].hiddenCard1, this.sources.hiddenCard)
            }
         //   this.itemAsRectangle(this.seats[i].shownCard0, "#00FFFF")
          //  this.itemAsRectangle(this.seats[i].shownCard1, "#00FFFF")
            this.addItemText(this.seats[i].shownCard0,'','12px Arial','#000000')
            this.addItemText(this.seats[i].shownCard1,'','12px Arial','#000000')
            //player name
            this.addItemText(this.seats[i].playerName,'','11px arial','#FFFFFF' )
            //player's status
            this.addItemText(this.seats[i].status,'','11px arial','#FFFFFF' )
            //action
            this.addItemText(this.seats[i].action,'','11px Arial','#FFFFFF')
            //countdown
            this.addItemText(this.seats[i].countdown,'','11px Arial','#FFFFFF')
            //winner
             this.addItemText(this.seats[i].winner,'','11px Arial','#FFFFFF')

            
        }

             //---------player's bets-----------------

      for(var i = 0; i < this.seats.length; i = i + 1){
       }


       //----------------------dealer button----Player's bets----------------------------------

for(var i = 0; i < this.seats.length; i = i + 1){

    //check if seat is on top
    if(this.seats[i].seat.position.y == firstRowY){
        
        var dealerButtonX = this.seats[i].seat.position.x+topRowSeatDealerButtonX
        var dealerButtonY = this.seats[i].seat.position.y+topRowSeatDealerButtonY

        this.seats[i].dealerButton = new this.Item(dealerButtonX,dealerButtonY,dealerButtonWidth,dealerButtonHeight,self.gameState.containerImageIndexes.chips)

        this.seats[i].firstChip = new this.Item(this.seats[i].seat.position.x+topChipOffsetX,this.seats[i].seat.position.y+topChipOffsetY,chipDiameter,chipDiameter,self.gameState.containerImageIndexes.chips)
         this.seats[i].secondColumnChip = new this.Item( this.seats[i].firstChip.position.x-chipDiameter-self.imageData.distanceBetweenChipColumns,this.seats[i].firstChip.position.y,chipDiameter,chipDiameter,self.gameState.containerImageIndexes.chips)

        
        //determine location of upper right most chip
        var distanceBetweenChipsY = this.pots[0].secondChip.position.y-this.pots[0].firstChip.position.y
        var upperRightChipX = this.seats[i].firstChip.position.x
        var upperRightChipY = this.seats[i].firstChip.position.y+distanceBetweenChipsY*(self.imageData.maxChipsPerColumn-1)
        var betX = upperRightChipX+betTextWidth+absoluteDistanceBetweenBetTextAndChipImages
        var betY = upperRightChipY
        //bet size
        this.seats[i].bet = new this.Item(betX,betY,betTextWidth,betTextHeight,self.gameState.containerImageIndexes.chips)
    }
    else if(this.seats[i].seat.position.x == firstColumnX){
        
        var dealerButtonX = this.seats[i].seat.position.x+leftColumnSeatDealerButtonX
        var dealerButtonY = this.seats[i].seat.position.y+leftColumnSeatDealerButtonY

        this.seats[i].dealerButton = new this.Item(dealerButtonX,dealerButtonY,dealerButtonWidth,dealerButtonHeight,self.gameState.containerImageIndexes.chips)

        this.seats[i].firstChip = new this.Item(this.seats[i].seat.position.x+leftChipOffsetX,this.seats[i].seat.position.y+leftChipOffsetY,chipDiameter,chipDiameter,self.gameState.containerImageIndexes.chips)
       this.seats[i].secondColumnChip = new this.Item( this.seats[i].firstChip.position.x+chipDiameter+self.imageData.distanceBetweenChipColumns,this.seats[i].firstChip.position.y,chipDiameter,chipDiameter,self.gameState.containerImageIndexes.chips)

       
        //determine location of upperleft
        var distanceBetweenChipsY = this.pots[0].secondChip.position.y-this.pots[0].firstChip.position.y
        var upperLeftChipX = this.seats[i].firstChip.position.x
        var upperLeftChipY = this.seats[i].firstChip.position.y
        var betX = upperLeftChipX
        var betY = this.seats[i].firstChip.position.y+distanceBetweenChipsY*(self.imageData.maxChipsPerColumn-1) - betTextHeight-absoluteDistanceBetweenBetTextAndChipImages
        //bet size
        this.seats[i].bet = new this.Item(betX,betY,betTextWidth,betTextHeight,self.gameState.containerImageIndexes.chips)
    }

    else if(this.seats[i].seat.position.y == fourthRowY){
        
        var dealerButtonX = this.seats[i].seat.position.x+bottomRowSeatDealerButtonX
        var dealerButtonY = this.seats[i].seat.position.y+bottomRowSeatDealerButtonY

        this.seats[i].dealerButton = new this.Item(dealerButtonX,dealerButtonY,dealerButtonWidth,dealerButtonHeight,self.gameState.containerImageIndexes.chips)

        this.seats[i].firstChip = new this.Item(this.seats[i].seat.position.x+bottomChipOffsetX,this.seats[i].seat.position.y+bottomChipOffsetY,chipDiameter,chipDiameter,self.gameState.containerImageIndexes.chips)
        this.seats[i].secondColumnChip = new this.Item( this.seats[i].firstChip.position.x+chipDiameter+self.imageData.distanceBetweenChipColumns,this.seats[i].firstChip.position.y,chipDiameter,chipDiameter,self.gameState.containerImageIndexes.chips)

        
        //determine location of lower left most chip
        var bottomLeftChipX = this.seats[i].firstChip.position.x
        var bottomLeftChipY = this.seats[i].firstChip.position.y
        var betX = bottomLeftChipX - betTextWidth
        var betY = bottomLeftChipY + this.seats[i].firstChip.size.y - betTextHeight  
        //bet size
        this.seats[i].bet = new this.Item(betX,betY,betTextWidth,betTextHeight,self.gameState.containerImageIndexes.chips)
    }
        else if(this.seats[i].seat.position.x == fifthColumnX){
        
        var dealerButtonX = this.seats[i].seat.position.x+rightColumnSeatDealerButtonX
        var dealerButtonY = this.seats[i].seat.position.y+rightColumnSeatDealerButtonY

        this.seats[i].dealerButton = new this.Item(dealerButtonX,dealerButtonY,dealerButtonWidth,dealerButtonHeight,self.gameState.containerImageIndexes.chips)

        this.seats[i].firstChip = new this.Item(this.seats[i].seat.position.x+rightChipOffsetX,this.seats[i].seat.position.y+rightChipOffsetY,chipDiameter,chipDiameter,self.gameState.containerImageIndexes.chips)
        this.seats[i].secondColumnChip = new this.Item( this.seats[i].firstChip.position.x-chipDiameter-self.imageData.distanceBetweenChipColumns,this.seats[i].firstChip.position.y,chipDiameter,chipDiameter,self.gameState.containerImageIndexes.chips)
 
         
         //determine location bottom right most chip
        var bottomRightChipX = this.seats[i].firstChip.position.x
        var bottomRightChipY = this.seats[i].firstChip.position.y
        var betX = bottomRightChipX 
        var betY = bottomRightChipY  +chipDiameter + betTextHeight  
        //bet size
        this.seats[i].bet = new this.Item(betX,betY,betTextWidth,betTextHeight,self.gameState.containerImageIndexes.chips)
    }

    //add second chip (same for all seats relative to first chip)
    var distanceBetweenChipsY = this.pots[0].secondChip.position.y-this.pots[0].firstChip.position.y
    this.seats[i].secondChip = new this.Item(this.seats[i].firstChip.position.x, this.seats[i].firstChip.position.y+distanceBetweenChipsY,chipDiameter,chipDiameter,self.gameState.containerImageIndexes.chips)
    
    // bet size text
     this.addItemText(this.seats[i].bet,'', "12px Arial", "#FFFFFF")
   
    if(this.seats[i].dealerButton instanceof this.Item){
     this.itemAsBitmap(this.seats[i].dealerButton, this.sources.dealerButton)
     }
     else{console.log(i+' is not a seat')}

    
    }

   
       


         //---------------action buttons------------------
      this.fold = new this.Item(205,419,actionButtonWidth,actionButtonHeight,self.gameState.containerImageIndexes.button, ['act','fold'])
      this.call = new this.Item(305,419,actionButtonWidth,actionButtonHeight,self.gameState.containerImageIndexes.button, ['act','call'])
      this.check = new this.Item(305,419,actionButtonWidth,actionButtonHeight,self.gameState.containerImageIndexes.button, ['act','check'])
      this.raise = new this.Item(405,419,actionButtonWidth,actionButtonHeight,self.gameState.containerImageIndexes.button, ['act','raise'])
      this.bet = new this.Item(405,419,actionButtonWidth,actionButtonHeight,self.gameState.containerImageIndexes.button, ['act','bet'])

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

        //-----------------bet slider-----------------------------
              this.betSlider.horizontal = new this.Item (215,458,240,1,self.gameState.containerImageIndexes.button)
      this.betSlider.vertical = new this.Item(215,448,6,13,self.gameState.containerImageIndexes.button)
      this.betSlider.betSize = new this.Item(470,448,30,50,self.gameState.containerImageIndexes.button)

        this.itemAsRectangle(this.betSlider.horizontal, 'black')
        this.itemAsRectangle(this.betSlider.vertical, 'blue')
        this.addItemText(this.betSlider.betSize, 0, '14px Arial', 'black')

  //------------------------------community cards---------------------------
        this.community[0] = new this.Item(canvasWidth/2-cardWidth/2-cardWidth*2-distanceBetweenCommunityCards*2,communityY,cardWidth, cardHeight,self.gameState.containerImageIndexes.button)
        this.community[1] = new this.Item(canvasWidth/2-cardWidth/2-cardWidth-distanceBetweenCommunityCards,communityY,cardWidth, cardHeight,self.gameState.containerImageIndexes.button)
        this.community[2] = new this.Item(canvasWidth/2-cardWidth/2,communityY,cardWidth, cardHeight,self.gameState.containerImageIndexes.button)
        this.community[3] = new this.Item(canvasWidth/2+cardWidth/2+distanceBetweenCommunityCards,communityY,cardWidth, cardHeight,self.gameState.containerImageIndexes.button)
        this.community[4] = new this.Item(canvasWidth/2+cardWidth/2+cardWidth+2*distanceBetweenCommunityCards,communityY,cardWidth, cardHeight,self.gameState.containerImageIndexes.button)

    /*     for (var i = 0; i < 5; i = i + 1){
 this.itemAsRectangle(this.community[i], "#00FFFF")
 this.addItemText(this.community[i],'','12px Arial','black')
 }
 */
  //------------------card spawn location---------------------------------

           this.startingCard = new this.Item(canvas.width/2-this.community[0].size.x/2, this.community[0].position.y+this.community[0].size.y+40 , cardWidth, cardHeight, self.gameState.containerImageIndexes.cardAnimation)


        //--------------upper left side button---------------------
        this.stand = new this.Item(0,0,actionButtonWidth,actionButtonHeight/2,self.gameState.containerImageIndexes.button, ['stand'])
         this.itemAsRectangle(this.stand, 'black')
 this.addItemText(this.stand,'stand up','10px Arial','white')

 //upper right side Buttons

 this.addChips = new this.Item(canvasWidth-actionButtonWidth, 0, actionButtonWidth, actionButtonHeight/2, self.gameState.containerImageIndexes.button, ['get_add_chips_info'])
 this.itemAsRectangle(this.addChips, 'black')
 this.addItemText(this.addChips, 'Get Chips', '10px Arial', 'white')

        //----------------not in hand action buttons------------------
        this.sitIn = new this.Item(205,419,actionButtonWidth,actionButtonHeight,self.gameState.containerImageIndexes.button, ['sit_in'])
        this.getChips = new this.Item(205,419,actionButtonWidth,actionButtonHeight,self.gameState.containerImageIndexes.button, ['get_add_chips_info'])

         this.itemAsRectangle(this.sitIn,'black')
this.addItemText(this.sitIn,'Deal Me In','10px Arial','white')

 this.itemAsRectangle(this.getChips,'black')
this.addItemText(this.getChips,'Get Chips','10px Arial','white')

//========================4 color deck sprite sheet=============================

var fourColorDeckData = {

     images: [this.sources.fourColorDeck],
     frames: {width:37, height:45}

}

this.fourColorSprite = new createjs.SpriteSheet(fourColorDeckData)

//======================CASHIER=======================================

 var cashierImageContainerIndex = self.gameState.containerImageIndexes.cashier


        var cashierWindowWidth = 265
        var cashierWindowHeight = 355
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
        var innerCashierWidth = cashierWindowWidth-2*outerSideWidth -2
        var innerCashierHeight = cashierWindowHeight-outerBottomHeight-outerTopHeight

        var textX = innerCashierX + textLeftOffset
        
        this.cashier.window = new this.Item(cashierWindowX,cashierWindowY,cashierWindowWidth,cashierWindowHeight,cashierImageContainerIndex)
        this.cashier.window.image = new createjs.Shape()
        //outer blue rim
        this.cashier.window.image.graphics.setStrokeStyle(1).beginFill('blue').beginStroke('#FF00FF').rect(cashierWindowX,cashierWindowY,cashierWindowWidth,cashierWindowHeight)
        this.cashier.window.image.graphics.setStrokeStyle(1).beginFill('#C0C0C0').beginStroke('#FF00FF').rect(innerCashierX,innerCashierY,innerCashierWidth,innerCashierHeight)

        this.cashier.windowTitle = new this.Item (cashierWindowX+1,cashierWindowY+1, cashierWindowWidth,outerTopHeight-2,cashierImageContainerIndex)
         this.addItemText(this.cashier.windowTitle, 'Get Chips', '13px arial', '#000000')

        this.cashier.blinds = new this.Item (textX,innerCashierY+15, innerCashierWidth,25,cashierImageContainerIndex)
        this.addItemText(this.cashier.blinds, '', '13px arial', '#000000')

         this.cashier.tableName = new this.Item (textX,this.cashier.blinds.position.y+15, innerCashierWidth,25,cashierImageContainerIndex)
        this.addItemText(this.cashier.tableName, '', '13px arial', '#000000')

        this.cashier.tableMin = new this.Item (textX,this.cashier.tableName.position.y+15, innerCashierWidth,25,cashierImageContainerIndex)
        this.addItemText(this.cashier.tableMin, '', '13px arial', '#000000')

        this.cashier.tableMax = new this.Item (textX, this.cashier.tableMin.position.y+15, innerCashierWidth,25,cashierImageContainerIndex)
        this.addItemText(this.cashier.tableMax, '', '13px arial', '#000000')

        this.cashier.accountBalance = new this.Item (textX,this.cashier.tableMax.position.y +15, innerCashierWidth,25,cashierImageContainerIndex)
        this.addItemText(this.cashier.accountBalance, '', '13px arial', '#000000')

// location of html textboxes for adding chips
     this.cashier.addChipsTextBox = new this.Item (textX,this.cashier.accountBalance.position.y +25, innerCashierWidth,25,cashierImageContainerIndex)

      this.cashier.addChips =  new this.Item (cashierWindowX + 10,cashierWindowY+cashierWindowHeight-40, 50,25,cashierImageContainerIndex) 
        this.itemAsRectangle( this.cashier.addChips, '#0000FF')
        this.addItemText( this.cashier.addChips, 'add chips', '13px arial', '#000000')
        this.cashier.addChips.image.onClick = self.events.onAddChipsClick

        this.cashier.cancel =  new this.Item (cashierWindowX + 100,cashierWindowY+cashierWindowHeight-40, 50,25,cashierImageContainerIndex) 
        this.itemAsRectangle( this.cashier.cancel, '#0000FF')
        this.addItemText( this.cashier.cancel, 'cancel', '13px arial', '#000000')
        this.cashier.cancel.image.onClick = self.hideCashier

         this.cashier.closeWindow =  new this.Item (innerCashierX + innerCashierWidth*.9,cashierWindowY+1, innerCashierWidth*.1,innerCashierY-cashierWindowY-2,cashierImageContainerIndex) 
        this.cashier.closeWindow.image  = new createjs.Shape() 
        this.cashier.closeWindow.image.graphics.beginFill('#CD0000').rect(this.cashier.closeWindow.position.x,this.cashier.closeWindow.position.y, this.cashier.closeWindow.size.x,this.cashier.closeWindow.size.y)
        this.cashier.closeWindow.image.graphics.beginStroke('#FFFFFF').setStrokeStyle(1)
        this.cashier.closeWindow.image.graphics.moveTo(this.cashier.closeWindow.position.x+this.cashier.closeWindow.size.x*.12,this.cashier.closeWindow.position.y+this.cashier.closeWindow.size.y*.12)
        this.cashier.closeWindow.image.graphics.lineTo(this.cashier.closeWindow.position.x+this.cashier.closeWindow.size.x*.88,this.cashier.closeWindow.position.y+this.cashier.closeWindow.size.y*.88)
        this.cashier.closeWindow.image.graphics.beginStroke('#FFFFFF').setStrokeStyle(1)
        this.cashier.closeWindow.image.graphics.moveTo(this.cashier.closeWindow.position.x+this.cashier.closeWindow.size.x*.88,this.cashier.closeWindow.position.y+this.cashier.closeWindow.size.y*.12)
        this.cashier.closeWindow.image.graphics.lineTo(this.cashier.closeWindow.position.x+this.cashier.closeWindow.size.x*.12,this.cashier.closeWindow.position.y+this.cashier.closeWindow.size.y*.88)
        this.cashier.closeWindow.image.onClick = self.hideCashier


   // =============================================SOUNDS========================================

    createjs.Sound.registerSound("sounds/deal_card.swf", "dealCard")
            createjs.Sound.registerSound("sounds/player_checks.swf", "check")

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
         this.seats[i].openSeat.image.onClick = self.events.onButtonClick
        }

        this.rightSideButtons[0].button.image.onClick = self.events.foldToAnyBetClick
        this.stand.image.onPress = self.events.buttonMouseDown
        this.stand.image.onClick = self.events.onButtonClick

    }

    this.images.setDefaultMessages = function(){
        
        for (var i = 0; i < this.seats.length; i = i + 1){
          this.seats[i].openSeat.messages = ['sit',i]
        }
    }

    this.initialize = function(){
        this.setBackground()
        this.images.setDefaults()
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

    for (var i=0;i<this.images.seats.length;i=i+1){
         this.hideBet(i)
        }
        
       
    this.stage.update()
    }

    //rotates positions of players seats and their hole cards n times clockwise
    this.images.rotateSeats = function (n){

    }

    this.displayShownCard = function (cardText,parentOfImageObject){
        
      //  parentOfImageObject.text.text= cardText
      //sprite sheet order numerical first starting with 2, then the same order as bridge suits

      /*
       var suit = cardText.charAt(1)
      var temp = cardText.charAt(0)
      var rank;
      if(isNaN(temp)){

      if(temp == 't' || 'T'){
           rank = 10
      }
      else if(temp == 'j' || 'J'){
           rank = 11
      }
            else if(temp == 'q' || 'Q'){
           rank = 12
      }
      else if(temp == 'k' || 'K'){
           rank = 13
      }
        else if(temp == 'a' || 'A'){
           rank = 14
      }
      }

      var suitOrder
      if(suitOrder == 'c' || 'C'){
           suitOrder = 0
      }
     else if(suitOrder == 'd' || 'D'){
           suitOrder = 1
      }
       else if(suitOrder == 'h' || 'H'){
           suitOrder = 2
      }
             else if(suitOrder == 's' || 'S'){
           suitOrder = 3
      }

      var cardFrameNumber = (rank-2)*4+suitOrder
      var cardImage = this.images.fourColorSprite.getFrame(cardFrameNumber)

      parentOfImageObject.bitmapAnimation = new createjs.BitmapAnimation(this.images.fourColorSprite)
      parentOfImageObject.bitmapAnimation.x = parentOfImageObject.position.x
      parentOfImageObject.bitmapAnimation.y = parentOfImageObject.position.y

      parentOfImageObject.bitmapAnimation.gotoAndStop()

      */
      this.images.cardAsBitmap(parentOfImageObject,cardText)
     
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

    this.updatePotSize = function (potSize, potNumber){
        if(!potNumber){potNumber = 0}
this.images.pots[potNumber].potSize.text.text = 'pot: '+potSize
   this.displayChildren(this.images.pots[potNumber].potSize)
    }

    this.playerSits = function(seatNumber, playerName, chips){

        this.gameState.seats[seatNumber].displayMessageType = 'seat'
        this.images.seats[seatNumber].playerName.text.text =  playerName
        if(typeof chips == 'number' && chips>0){
        this.images.seats[seatNumber].status.text.text =  chips
        }
        else if( chips == 0){
             this.images.seats[seatNumber].status.text.text =  'adding chips'
        }

           
        this.displayCorrectSeatMessage(seatNumber)
        if(this.gameState.userSeatNumber == seatNumber){   
        this.displayChildren(this.images.stand)
        //refresh open seats to disabled seats
        for (var i = 0;i<this.images.seats.length;i++){
            this.displayCorrectSeatMessage(i)
        }
        }

    }

    this.hideBet = function (seatNumber){
   
            this.hideChildren(this.images.seats[seatNumber].bet)
            for(var i = 0;i<this.images.seats[seatNumber].chips.length;i++){
                this.hideChildren(this.images.seats[seatNumber].chips[i])
                
            }
            this.images.seats[seatNumber].chips = []

    }

   //this.images.seats[i] is parent for players bets, this.images.pots[i] is parent for pots
    this.displayChipStack = function(chipAmount,parentOfChipArray, initialX, initialY){
        //remove previous chips
        this.hideChildren(parentOfChipArray.chips)
        //reset chip array from memory
        parentOfChipArray.chips = []
        var x = initialX
        var y = initialY
        var chipIncrementY = this.images.pots[0].secondChip.position.y-this.images.pots[0].firstChip.position.y
        var totalChips = 0
                    var distanceBetweenColumns = parentOfChipArray.secondColumnChip.position.x-parentOfChipArray.firstChip.position.x


        while(chipAmount>=1){
            if(chipAmount>=10000){
            this.displayChip('10k',x,y, parentOfChipArray)
            y =y+chipIncrementY
            chipAmount = chipAmount -10000
        }
           else if(chipAmount>=5000){
            this.displayChip('5k',x,y, parentOfChipArray)
            y =y+chipIncrementY
            chipAmount = chipAmount -5000
        }
        else     if(chipAmount>=1000){
            
            this.displayChip(1000,x,y, parentOfChipArray)
            y =y+chipIncrementY
            chipAmount = chipAmount -1000
        }
              else    if(chipAmount>=500){
            
            this.displayChip(500,x,y, parentOfChipArray)
            y =y+chipIncrementY
            chipAmount = chipAmount -500
        }
           else    if(chipAmount>=100){
            
            this.displayChip(100,x,y, parentOfChipArray)
            y =y+chipIncrementY
            chipAmount = chipAmount -100
        }
        else if(chipAmount>=50){
            
            this.displayChip(50,x,y, parentOfChipArray)
            y =y+chipIncrementY
            chipAmount = chipAmount -50
        }
      else  if(chipAmount>=25){
            
             this.displayChip(25,x,y, parentOfChipArray)
            y =y+chipIncrementY
            chipAmount = chipAmount -25

        }
      else   if(chipAmount >=5){
             this.displayChip(5,x,y, parentOfChipArray)
            y =y+chipIncrementY
            chipAmount = chipAmount -5
        }
      else   if(chipAmount >=1){
             this.displayChip(10,x,y, parentOfChipArray)
            y =y+chipIncrementY
            chipAmount = chipAmount -1
        }

        totalChips++
        if(totalChips%this.imageData.maxChipsPerColumn==0){
            x=x + distanceBetweenColumns
            y = initialY
        }

       
        }
    }

    //this.images.seats[i] is parent for players bets, this.images.pots[i] is parent for pots
    this.displayChip = function(chipValue, x, y, parentOfChipArray){

       var diameter = this.images.pots[0].firstChip.size.x
       
       //different chip values have different colors
        if(chipValue == 1000){
           chipColor = '#CC6600'
           chipValue = "1k"
       }
       else if(chipValue == 500){
           chipColor = 'black'
       }
       else if(chipValue == 100){
           chipColor = 'yellow'
       }
      else if(chipValue == 50){
           chipColor = 'red'
       }
       else if(chipValue == 25){
           chipColor = 'green'
       }
      else  if(chipValue == 5){
           chipColor = '#F52887'
       }
     else {
           chipColor = 'blue'
       }

       if(chipColor == 'red'){
           var chipImageSource = this.images.sources.chips.black
       }
       else if(chipColor == 'black'){
            var chipImageSource = this.images.sources.chips.black

       }
       else{ var chipImageSource = this.images.sources.chips.black}
       parentOfChipArray.chips.push(new this.images.Item(x,y,diameter,diameter,this.gameState.containerImageIndexes.chips))
        this.images.itemAsBitmap(parentOfChipArray.chips[parentOfChipArray.chips.length-1], chipImageSource) 
 
parentOfChipArray.chips[parentOfChipArray.chips.length-1].text =  new createjs.Text(chipValue, '7px Arial', 'white')
parentOfChipArray.chips[parentOfChipArray.chips.length-1].text.x = parentOfChipArray.chips[parentOfChipArray.chips.length-1].position.x + parentOfChipArray.chips[parentOfChipArray.chips.length-1].size.x/2
parentOfChipArray.chips[parentOfChipArray.chips.length-1].text.y = parentOfChipArray.chips[parentOfChipArray.chips.length-1].position.y+4.5
parentOfChipArray.chips[parentOfChipArray.chips.length-1].text.baseline = 'top'
parentOfChipArray.chips[parentOfChipArray.chips.length-1].text.textAlign = 'center'
parentOfChipArray.chips[parentOfChipArray.chips.length-1].text.maxWidth = parentOfChipArray.chips[parentOfChipArray.chips.length-1].size.x*.8

//remove previous text instances UNLESS last one in the column
for(var i   = 0; i<parentOfChipArray.chips.length-1;i++){

    if(i == 0 || (i+1)%this.imageData.maxChipsPerColumn != 0){
    this.hideText(parentOfChipArray.chips[i])
    parentOfChipArray.chips[i].text = null
    }
}
 this.displayChildren(parentOfChipArray.chips[parentOfChipArray.chips.length-1])
 }




 this.animateImage =function(initialX, initialY, totalTime, ticks, parentOfImageObject, finalX, finalY, performOnEnd){

            var fractionDistancePerTick = 1/ticks
            var lastTick = ticks -1 
           var   interval = totalTime/ticks
     
                    var totalDistanceX = finalX - initialX
                     var totalDistanceY = finalY - initialY
                   var distancePerTickX =  totalDistanceX*fractionDistancePerTick
                   var distancePerTickY = totalDistanceY*fractionDistancePerTick

      if( parentOfImageObject.text && parentOfImageObject.image)    {
           var textOffSetX = parentOfImageObject.text.x - parentOfImageObject.image.x
           var textOffSetY = parentOfImageObject.text.y - parentOfImageObject.image.y
          }

          if(parentOfImageObject.image){
              parentOfImageObject.image.x = initialX
parentOfImageObject.image.y = initialY


  if(parentOfImageObject.text){
      parentOfImageObject.text.x = initialX + textOffSetX
parentOfImageObject.text.y = initialY + textOffSetY
}

}

else if(parentOfImageObject.text){
     parentOfImageObject.text.x = initialX
parentOfImageObject.text.y = initialY
}

self.displayChildren(parentOfImageObject)
                   var tick = 0

       var imageAnimation =   setInterval(function() {

       if(  parentOfImageObject.image) {    
       parentOfImageObject.image.x =parentOfImageObject.image.x+distancePerTickX
          parentOfImageObject.image.y =parentOfImageObject.image.y+distancePerTickY
          }

      if( parentOfImageObject.text)    {
           parentOfImageObject.text.x =parentOfImageObject.text.x+distancePerTickX
          parentOfImageObject.text.y =parentOfImageObject.text.y+distancePerTickY
          }
            self.stage.update()

      //    console.log(parentOfImageObject.image.x+', '+parentOfImageObject.image.y)

            if(tick >= lastTick){
   if(parentOfImageObject.image)   {    
    parentOfImageObject.image.x = finalX
parentOfImageObject.image.y = finalY


  if( parentOfImageObject.text){ parentOfImageObject.text.x = finalX + textOffSetX
parentOfImageObject.text.y = finalY +textOffSetY
}
}
else if(parentOfImageObject.text){
     parentOfImageObject.text.x = finalX
parentOfImageObject.text.y = finalY

}
self.stage.update()
clearInterval(imageAnimation)
             if(  performOnEnd){
                 performOnEnd()
             }
                }

            else{tick++}

            
            

}, interval)

 }

 //must include false or undefined slots for already dealt cards
 this.dealCommunity = function (communityArray){
     
     var initialX = this.images.startingCard.position.x
     var initialY = this.images.startingCard.position.y
     var animationTime = 200
     var fractionDistancePerTick = .02
     var lastTick = 1/fractionDistancePerTick -1 
     var   interval = fractionDistancePerTick*animationTime

     //play deal sound
     createjs.Sound.play('dealCard')
     console.log('deal card sound should play now')

     //river animation
if(communityArray.length ==5){
    //create TEMPORARY face down card to animate
    var animatedCard = new this.images.Item(initialX, initialY, this.images.community[0].size.x, this.images.community[0].size.y, this.gameState.containerImageIndexes.cardAnimation)
     this.images.itemAsBitmap(animatedCard, this.images.seats[0].hiddenCard0.bitmapSource)


      async.series([

        function(callback){  
       self.animateImage(initialX,initialY,animationTime, lastTick+1, animatedCard, self.images.community[4].position.x,self.images.community[4].position.y, function(){callback(null, 1)})

 },

    function(callback){
       self.displayShownCard(communityArray[4], self.images.community[4])
       self.hideChildren(animatedCard)
        }   
    ])
}
//turn animation
else if(communityArray.length ==4){
    //create TEMPORARY face down card to animate
    var animatedCard = new this.images.Item(initialX, initialY, this.images.community[0].size.x, this.images.community[0].size.y, this.gameState.containerImageIndexes.cardAnimation)
     this.images.itemAsBitmap(animatedCard, this.images.seats[0].hiddenCard0.bitmapSource)

      async.series([

        function(callback){  
        self.animateImage(initialX,initialY,animationTime, lastTick+1, animatedCard, self.images.community[3].position.x,self.images.community[3].position.y,function(){callback(null, 1)})

 },

    function(callback){
       self.displayShownCard(communityArray[3],self.images.community[3])
       self.hideChildren(animatedCard)
        }   
    ])
    
     
}

//flop animation
else if(communityArray.length == 3){
        //create TEMPORARY face down card to animate to animate to community[0] position
    var animatedCard = new self.images.Item(initialX, initialY, self.images.community[0].size.x, self.images.community[0].size.y, self.gameState.containerImageIndexes.cardAnimation)
     self.images.itemAsBitmap(animatedCard, self.images.seats[0].hiddenCard0.bitmapSource)

      async.series([

        function(callback){  
        self.animateImage(initialX,initialY,animationTime, lastTick+1, animatedCard, self.images.community[0].position.x,self.images.community[0].position.y,function(){callback(null, 1)})

 },

    function(callback){
        //turn cards face up on community [0] position
         for(var i =0;i<=2;i++){
    self.images.cardAsBitmap(self.images.community[i],communityArray[i])
    self.images.community[i].image.x = self.images.community[0].position.x
      self.images.containers[self.images.community[i].position.z].addChild( self.images.community[i].image)
      }
      //update stage to display face up cards
      self.stage.update()
      //hide facedown animated card
      self.hideChildren(animatedCard)

 //move cards from community[0] position to final destinations
     self.animateImage(self.images.community[0].position.x, self.images.community[1].position.y,animationTime, lastTick+1, self.images.community[1],self.images.community[1].position.x, self.images.community[1].position.y)
     self.animateImage(self.images.community[0].position.x, self.images.community[2].position.y,animationTime, lastTick+1, self.images.community[2],self.images.community[2].position.x, self.images.community[2].position.y)      
    }   
    ])
    
}

}
 

 this.dealHoleCards = function(smallBlindSeatNumber, playerArray, holeCardArray){
     
     var initialX = this.images.startingCard.position.x
     var initialY = this.images.startingCard.position.y
     var animationTime = 200
            var fractionDistancePerTick = .02
            var lastTick = 1/fractionDistancePerTick -1 

            var   interval = fractionDistancePerTick*animationTime

            var animatedCards0 = []
             var animatedCards1 = []

            //deal first round of hole cards
            var asyncArray = []
            var callBackNumber = 1

_.each(_.range(playerArray.length * 2), function(cardsDealt) {
    var playerArrayNumber = cardsDealt % playerArray.length
    
    //push dealing facedown card to the player animation function into async array

    asyncArray.push(function(callback){

                    createjs.Sound.play("dealCard")
        if(cardsDealt==playerArrayNumber){
            
                    animatedCards0[cardsDealt] = new self.images.Item(initialX, initialY, self.images.community[0].size.x, self.images.community[0].size.y, self.gameState.containerImageIndexes.cardAnimation)
          self.images.itemAsBitmap(animatedCards0[cardsDealt], self.images.seats[playerArray[playerArrayNumber]].hiddenCard0.bitmapSource)
           self.animateImage(initialX,initialY,animationTime, lastTick+1,  animatedCards0[cardsDealt], self.images.seats[playerArray[playerArrayNumber]].hiddenCard0.position.x,self.images.seats[playerArray[playerArrayNumber]].hiddenCard0.position.y, function(){
               callback(null, callBackNumber)
               self.hideChildren(animatedCards0[cardsDealt])
               })
          }

          else if(cardsDealt>playerArrayNumber){
          animatedCards1[cardsDealt] = new self.images.Item(initialX, initialY, self.images.community[0].size.x, self.images.community[0].size.y, self.gameState.containerImageIndexes.cardAnimation)
          self.images.itemAsBitmap(animatedCards1[cardsDealt], self.images.seats[playerArray[playerArrayNumber]].hiddenCard0.bitmapSource) 
               self.animateImage(initialX,initialY,animationTime, lastTick+1, animatedCards1[cardsDealt], self.images.seats[playerArray[playerArrayNumber]].hiddenCard1.position.x,self.images.seats[playerArray[playerArrayNumber]].hiddenCard1.position.y, function(){
                   callback(null, callBackNumber)
                   
                 self.hideChildren(animatedCards1[cardsDealt])
                   })
              
 }
 
 })
                
 callBackNumber ++
        asyncArray.push( function(callback){

                       if(playerArray[playerArrayNumber] == self.gameState.userSeatNumber){  
                       
                       if(cardsDealt==playerArrayNumber){
                       self.displayShownCard(holeCardArray[0], self.images.seats[playerArray[playerArrayNumber]].shownCard0)  }
                       else if (cardsDealt>playerArrayNumber){
                           self.displayShownCard(holeCardArray[0], self.images.seats[playerArray[playerArrayNumber]].shownCard1)  
                       }
                       }
                    else{ 
                    if(cardsDealt==playerArrayNumber){ self.displayChildren(self.images.seats[playerArray[playerArrayNumber]].hiddenCard0)}
                       else if (cardsDealt>playerArrayNumber){self.displayChildren(self.images.seats[playerArray[playerArrayNumber]].hiddenCard1)}
}
callback(null, callBackNumber)
                   })
                   //push both functions into the async array
                   //   asyncArray.push(function(callback){tempDeal()})
                   //   asyncArray.push(function(callback){tempDisplayHoleCard()})
               })
//run asyncronous array
               async.series(asyncArray)

}

     this.playerStands = function(seatNumber){
          this.gameState.seats[seatNumber].displayMessageType = 'openSeat'

      if(seatNumber === this.gameState.userSeatNumber){
          this.hideSeatedOptions()
          this.gameState.userSeatNumber = null
        
        }
        for (var i=0;i<this.images.seats.length;i++){
            
        this.displayCorrectSeatMessage(i)
        }
    }

    this.hideSeatedOptions=function(){
        this.hideInHandOptions()
        this.hideChildren(this.images.stand)
         this.hideChildren(this.images.getChips)
 this.hideChildren(this.images.sitIn)
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

        this.playerSitsOut=function(seatNumber){
            
            this.images.seats[seatNumber].status.text.text = "Sitting Out"

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
         for(var i=0; i<this.images.pots.length;i++){
        self.hideChildren(self.images.pots[i].potSize)
        self.hideChildren(self.images.pots[i].chips)}

 }

    this.displayopenSeats = function(openSeats){
        
for (var i = 0; i < openSeats.length; i = i + 1)
        {this.displayImage(this.images.seats[openSeats[i]].openSeat)
        this.displayText(this.images.seats[openSeats[i]].openSeat)}
    }

    this.displayInHandOptions=function(){
        
        this.displayButton(this.images.rightSideButtons[0].button)
        
        this.displayButton(this.images.rightSideButtons[2].button,false,['set_flag','post_blind',false])
    }
    this.hideSeatedOptions = function(){
        this.hideChildren(this.images.rightSideButtons[0].button)
         this.hideChildren(this.images.rightSideButtons[1].button)
          this.hideChildren(this.images.rightSideButtons[2].button)
          this.hideChildren(this.images.addChips)
          this.hideChildren(this.images.sitIn)
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
             this.hideChildren(this.images.seats[seatNumber].openSeat)
             this.hideChildren(this.images.seats[seatNumber].disabledSeat)
            break;

            case 'countdown':
              this.displayChildren(this.images.seats[seatNumber].seat)
             this.displayText(this.images.seats[seatNumber].countdown)
            this.displayChildren(this.images.seats[seatNumber].status)

            this.hideChildren(this.images.seats[seatNumber].playerName)
            this.hideText(this.images.seats[seatNumber].action)
            this.hideText(this.images.seats[seatNumber].seat)
            this.hideText(this.images.seats[seatNumber].winner)

             this.hideChildren(this.images.seats[seatNumber].openSeat)
             this.hideChildren(this.images.seats[seatNumber].disabledSeat)
            break;

            case 'action':
             this.displayChildren(this.images.seats[seatNumber].seat)
             this.displayText(this.images.seats[seatNumber].action)
            this.displayChildren(this.images.seats[seatNumber].status)

            this.hideChildren(this.images.seats[seatNumber].playerName)
            this.hideText(this.images.seats[seatNumber].winner)
            this.hideText(this.images.seats[seatNumber].seat)
            this.hideText(this.images.seats[seatNumber].countdown)
             this.hideChildren(this.images.seats[seatNumber].openSeat)
             this.hideChildren(this.images.seats[seatNumber].disabledSeat)
            break;

            case 'winner':
              this.displayChildren(this.images.seats[seatNumber].seat)
            this.displayChildren(this.images.seats[seatNumber].status)
           this.displayChildren(this.images.seats[seatNumber].winner)

           this.hideChildren(this.images.seats[seatNumber].playerName)
            this.hideText(this.images.seats[seatNumber].action)
            this.hideText(this.images.seats[seatNumber].countdown)
            this.hideChildren(this.images.seats[seatNumber].openSeat)
            this.hideChildren(this.images.seats[seatNumber].disabledSeat)
            break;

            case 'openSeat':
            
            if(!this.gameState.userSeatNumber){
                this.hideChildren(this.images.seats[seatNumber].disabledSeat)
            this.displayChildren(this.images.seats[seatNumber].openSeat)
            }
            else if(this.gameState.userSeatNumber){
                this.hideChildren(this.images.seats[seatNumber].openSeat)
                this.displayChildren(this.images.seats[seatNumber].disabledSeat)
            }

            
              this.hideChildren(this.images.seats[seatNumber].seat)
            this.hideChildren(this.images.seats[seatNumber].status)
            this.hideChildren(this.images.seats[seatNumber].playerName)
            this.hideText(this.images.seats[seatNumber].action)
            this.hideText(this.images.seats[seatNumber].winner)
            this.hideText(this.images.seats[seatNumber].countdown)
            break;

            default:
            this.displayChildren(this.images.seats[seatNumber].openSeat)

            this.hideChildren(this.images.seats[seatNumber].disabledSeat)
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

      parentOfImageObject.image.onClick = self.events.onButtonClick
      parentOfImageObject.image.onPress = self.events.buttonMouseDown
     this.displayChildren(parentOfImageObject)
 
    }

    this.hideButton = function (parentOfImageObject, messages){
        this.hideChildren(parentOfImageObject)
        if(messages){parentOfImageObject.messages = messages}
        // parentOfImageObject.image.onClick = null
    }
    
    this.hideCashier = function(){


                self.hideChildren(self.images.cashier)
                var htmlcashier = document.getElementById('cashier')
                htmlcashier.style.display = 'none'

                self.restoreActiveContainers(self.gameState.cashier.activeContainers)

        self.gameState.cashier.visible = false

      
                 $('#maxRadio').prop('checked', false)
          $('#autoRebuyRadio').prop('checked', false)
          $('#otherAmountRadio').prop('checked', false)
          
          $("#otherAmount").val(null)
           $('#autoRebuyAmount').val(null)


    }

    this.hideMessageBox = function(){


        self.hideChildren(self.images.messageBox[self.gameState.messageBox.messageBoxImageContainerIndex])
        if(self.gameState.messageBox.messageBoxImageContainerIndex == self.gameState.containerImageIndexes.initialMessageBox){
            

        if(self.gameState.cashier.display === true){
            var htmlcashier = document.getElementById('cashier')
           htmlcashier.style.display = 'inline'
        }
        }

        

self.restoreActiveContainers(   self.gameState.messageBox.activeContainers[self.gameState.messageBox.messageBoxImageContainerIndex])

        self.gameState.messageBox.messageBoxImageContainerIndex = self.gameState.messageBox.messageBoxImageContainerIndex -2 
    }

    this.displayMessageBox = function(messageInfo){
       
    
       var messageBoxImageContainerIndex = this.gameState.containerImageIndexes.initialMessageBox

           for(var i= this.gameState.containerImageIndexes.initialMessageBox;i<self.images.containers.length;i++){
           if(self.images.containers[i] && self.images.containers[i].isVisible()== false){
                messageBoxImageContainerIndex = i
                i=self.images.containers.length
           }
        }

        self.images.messageBox[messageBoxImageContainerIndex] = {}
        if(messageBoxImageContainerIndex == this.gameState.containerImageIndexes.initialMessageBox){
       //hide html cashier(if visible)
        var htmlcashier = document.getElementById('cashier')

       if( htmlcashier.style.display !== 'none'){
       self.gameState.cashier.display = true
       htmlcashier.style.display = 'none'
       }
       else{self.gameState.cashier.display = false}
       }
       

      //  title,message,okay, okayMessages, cancel, cancelMessages

       
        self.gameState.messageBox.messageBoxImageContainerIndex = messageBoxImageContainerIndex
        self.gameState.messageBox.activeContainers[messageBoxImageContainerIndex] = self.storeActiveContainers()
        var messageBoxWindowWidth = 400
        var messageBoxWindowHeight = 200
        //declare size variables
        var textLeftOffset = 10
         var outerTopHeight = messageBoxWindowHeight*.08
                var outerBottomHeight = messageBoxWindowHeight*.03
        var outerSideWidth = messageBoxWindowWidth*.02

        var asdf = document.getElementById('canvas')
        var stageWidth = asdf.width
        var stageHeight = asdf.height
        var messageBoxWindowX = stageWidth/2 - messageBoxWindowWidth/2
        var messageBoxWindowY = stageHeight/2 - messageBoxWindowHeight/2
        

        var innerMessageBoxX = messageBoxWindowX+outerSideWidth
        var innerMessageBoxY = messageBoxWindowY+outerTopHeight
        var innerMessageBoxWidth = messageBoxWindowWidth-2*outerSideWidth -2
        var innerMessageBoxHeight = messageBoxWindowHeight-outerBottomHeight-outerTopHeight

        var textX = innerMessageBoxX + textLeftOffset
        

        self.images.messageBox[messageBoxImageContainerIndex].window = new self.images.Item(messageBoxWindowX,messageBoxWindowY,messageBoxWindowWidth,messageBoxWindowHeight,messageBoxImageContainerIndex)
        self.images.messageBox[messageBoxImageContainerIndex].window.image = new createjs.Shape()
        //outer blue rim
        self.images.messageBox[messageBoxImageContainerIndex].window.image.graphics.setStrokeStyle(1).beginFill('blue').beginStroke('#FF00FF').rect(messageBoxWindowX,messageBoxWindowY,messageBoxWindowWidth,messageBoxWindowHeight)
        self.images.messageBox[messageBoxImageContainerIndex].window.image.graphics.setStrokeStyle(1).beginFill('#C0C0C0').beginStroke('#FF00FF').rect(innerMessageBoxX,innerMessageBoxY,innerMessageBoxWidth,innerMessageBoxHeight)

        self.images.messageBox[messageBoxImageContainerIndex].windowTitle = new self.images.Item (messageBoxWindowX+1,messageBoxWindowY+1, messageBoxWindowWidth,outerTopHeight-2,messageBoxImageContainerIndex)
         self.images.addItemText(self.images.messageBox[messageBoxImageContainerIndex].windowTitle, 'error', '13px arial', '#000000')

        self.images.messageBox[messageBoxImageContainerIndex].message = new self.images.Item (textX,innerMessageBoxY+15, innerMessageBoxWidth,25,messageBoxImageContainerIndex)
        self.images.addItemText(self.images.messageBox[messageBoxImageContainerIndex].message, messageInfo.message, '13px arial', '#000000')

   

        if(messageInfo.okay){
        self.images.messageBox[messageBoxImageContainerIndex].okay =  new self.images.Item (messageBoxWindowX + 10,messageBoxWindowY+messageBoxWindowHeight-40, 50,25,messageBoxImageContainerIndex) 
        self.images.itemAsRectangle( self.images.messageBox[messageBoxImageContainerIndex].okay, '#0000FF')
        self.images.addItemText( self.images.messageBox[messageBoxImageContainerIndex].okay, 'Okay', '13px arial', '#000000')
                self.images.messageBox[messageBoxImageContainerIndex].okay.messages = messageInfo.okayMessages
        self.images.messageBox[messageBoxImageContainerIndex].okay.image.onClick = self.events.onButtonClick
        self.images.messageBox[messageBoxImageContainerIndex].okay.image.onClick = self.hideMessageBox
        }

        if(messageInfo.cancel){
        self.images.messageBox[messageBoxImageContainerIndex].cancel =  new self.images.Item (messageBoxWindowX + 100,messageBoxWindowY+messageBoxWindowHeight-40, 50,25,messageBoxImageContainerIndex) 
        self.images.itemAsRectangle( self.images.messageBox[messageBoxImageContainerIndex].cancel, '#0000FF')
        self.images.addItemText( self.images.messageBox[messageBoxImageContainerIndex].cancel, 'cancel', '13px arial', '#000000')
          self.images.messageBox[messageBoxImageContainerIndex].cancel.messages = messageInfo.cancelMessages
        self.images.messageBox[messageBoxImageContainerIndex].cancel.image.onClick = self.hidemessageBox}



        if(!messageInfo.okay && !messageInfo.cancel){
            self.images.messageBox[messageBoxImageContainerIndex].okay =  new self.images.Item (messageBoxWindowX + messageBoxWindowWidth/2,messageBoxWindowY+messageBoxWindowHeight-40, 50,25,messageBoxImageContainerIndex) 
        self.images.itemAsRectangle( self.images.messageBox[messageBoxImageContainerIndex].okay, '#0000FF')
        self.images.addItemText( self.images.messageBox[messageBoxImageContainerIndex].okay, 'Okay', '13px arial', '#000000')
                self.images.messageBox[messageBoxImageContainerIndex].okay.messages = messageInfo.okayMessages
        self.images.messageBox[messageBoxImageContainerIndex].okay.image.onClick = self.events.onButtonClick
        self.images.messageBox[messageBoxImageContainerIndex].okay.image.onClick = self.hideMessageBox

        }







         self.images.messageBox[messageBoxImageContainerIndex].closeWindow =  new self.images.Item (innerMessageBoxX + innerMessageBoxWidth*.9,messageBoxWindowY+1, innerMessageBoxWidth*.1,innerMessageBoxY-messageBoxWindowY-2,messageBoxImageContainerIndex) 
        self.images.messageBox[messageBoxImageContainerIndex].closeWindow.image  = new createjs.Shape() 
        self.images.messageBox[messageBoxImageContainerIndex].closeWindow.image.graphics.beginFill('#CD0000').rect(self.images.messageBox[messageBoxImageContainerIndex].closeWindow.position.x,self.images.messageBox[messageBoxImageContainerIndex].closeWindow.position.y, self.images.messageBox[messageBoxImageContainerIndex].closeWindow.size.x,self.images.messageBox[messageBoxImageContainerIndex].closeWindow.size.y)
        self.images.messageBox[messageBoxImageContainerIndex].closeWindow.image.graphics.beginStroke('#FFFFFF').setStrokeStyle(1)
        self.images.messageBox[messageBoxImageContainerIndex].closeWindow.image.graphics.moveTo(self.images.messageBox[messageBoxImageContainerIndex].closeWindow.position.x+self.images.messageBox[messageBoxImageContainerIndex].closeWindow.size.x*.12,self.images.messageBox[messageBoxImageContainerIndex].closeWindow.position.y+self.images.messageBox[messageBoxImageContainerIndex].closeWindow.size.y*.12)
        self.images.messageBox[messageBoxImageContainerIndex].closeWindow.image.graphics.lineTo(self.images.messageBox[messageBoxImageContainerIndex].closeWindow.position.x+self.images.messageBox[messageBoxImageContainerIndex].closeWindow.size.x*.88,self.images.messageBox[messageBoxImageContainerIndex].closeWindow.position.y+self.images.messageBox[messageBoxImageContainerIndex].closeWindow.size.y*.88)
        self.images.messageBox[messageBoxImageContainerIndex].closeWindow.image.graphics.beginStroke('#FFFFFF').setStrokeStyle(1)
        self.images.messageBox[messageBoxImageContainerIndex].closeWindow.image.graphics.moveTo(self.images.messageBox[messageBoxImageContainerIndex].closeWindow.position.x+self.images.messageBox[messageBoxImageContainerIndex].closeWindow.size.x*.88,self.images.messageBox[messageBoxImageContainerIndex].closeWindow.position.y+self.images.messageBox[messageBoxImageContainerIndex].closeWindow.size.y*.12)
        self.images.messageBox[messageBoxImageContainerIndex].closeWindow.image.graphics.lineTo(self.images.messageBox[messageBoxImageContainerIndex].closeWindow.position.x+self.images.messageBox[messageBoxImageContainerIndex].closeWindow.size.x*.12,self.images.messageBox[messageBoxImageContainerIndex].closeWindow.position.y+self.images.messageBox[messageBoxImageContainerIndex].closeWindow.size.y*.88)
        self.images.messageBox[messageBoxImageContainerIndex].closeWindow.image.onClick = self.hideMessageBox


        for(var i = 0; i<messageBoxImageContainerIndex;i++){
            self.images.containers[i].mouseEnabled = false

        }

                self.displayChildren(self.images.messageBox[messageBoxImageContainerIndex])

    }


    this.displayCashier = function(info)
    {
        

      var cashierImageContainerIndex = this.gameState.containerImageIndexes.cashier

        this.gameState.cashier.min = info.min
        this.gameState.cashier.max = info.max
        this.gameState.cashier.balance = info.balance
        this.gameState.cashier.table_name = info.table_name
        this.gameState.cashier.small_blind = info.small_blind
        this.gameState.cashier.big_blind = info.big_blind

       this.images.cashier.windowTitle.text.text ='Get Chips'

       this.images.cashier.blinds.text.text = 'blinds: '+info.small_blind+'/'+info.big_blind

         this.images.cashier.tableName.text.text = 'Table Name: '+info.table_name

        this.images.cashier.tableMin.text.text = 'Minimum Buyin: '+info.min

        this.images.cashier.tableMax.text.text = 'Maximum Buyin: '+info.max

       this.images.cashier.accountBalance.text.text = 'My Available Balance: '+info.balance

//display textboxes for adding chips

    var htmlcashier = document.getElementById('cashier')
    htmlcashier.style.display = 'inline'
    htmlcashier.style.position = 'absolute'
    htmlcashier.style.left = this.images.cashier.addChipsTextBox.position.x + 'px'
    htmlcashier.style.top = this.images.cashier.addChipsTextBox.position.y + 'px'
    
    $("#otherAmount").focus(function() {
                 $('#maxRadio').prop('checked', false)
          $('#autoRebuyRadio').prop('checked', false)
          $('#otherAmountRadio').prop('checked', true)
          if(typeof parseFloat($("#otherAmount").val()) == 'number' &&  parseFloat($("#otherAmount").val()) >self.gameState.cashier.min){}
          else{
          $("#otherAmount").val(self.gameState.cashier.min)

          //select text on clicking
           $("#otherAmount").one('mouseup', function(event){
        event.preventDefault();
       }).select()
          }
        })

            $("#autoRebuy").focus(function() {
        
         $('#maxRadio').prop('checked', false)
          $('#otherAmountRadio').prop('checked', false)
          $('#autoRebuyRadio').prop('checked', true)
        })


  //  this.images.cashier.currency =  new this.images.Item (cashierWindowOffsetLeft,this.images.cashier.accountBalance.position.y+10, cashierWindowWidth,25,4) 
   // this.images.addItemText( this.images.cashier.currency, 'Currency: '+currency, '13px arial', '#000000')
        
       this.images.cashier.addChips.text.text = 'add chips'
     

       this.images.cashier.cancel.text.text = 'cancel'



self.gameState.cashier.activeContainers = this.storeActiveContainers()

        for(var i = 0; i<cashierImageContainerIndex;i++){
            this.images.containers[i].mouseEnabled = false

        }


                this.displayChildren(this.images.cashier)

}


this.storeActiveContainers=function(){
   var activeContainers = []
    for (var i = 0; i<this.images.containers.length;i++){
        
        if(this.images.containers[i].mouseEnabled == true){
            
            activeContainers.push(i)

        }
       
    }
    return activeContainers
}

this.restoreActiveContainers=function(activeContainerArray){

    for(var i = 0;i<this.images.containers.length;i++){
        this.images.containers[i].mouseEnabled = false
    }

    
    for(var i = 0;i<activeContainerArray.length;i++){
        this.images.containers[activeContainerArray[i]].mouseEnabled = true
    }
}
    

   this.displayInitialTableState=function(tableState){
        
        
        if(tableState){table_state = tableState}
        else{var table_state = $('#server_values').data('table_state');
        //console.log(table_state)
        }
        //remove extra seats
        for (var i = 9;i>table_state.max_players;i=i-1){
            
            this.images.seats[i] = null
            this.gameState.seats[i] = null

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
         if(table_state.seats[i].is_you){ 
         this.gameState.userSeatNumber = table_state.seats[i].seat 

         self.displayButton(self.images.addChips)
         

         //show options available if player is user
         self.displayButton(self.images.rightSideButtons[1].button)
         if(table_state.seats[i].sitting_out == true){
             self.displayButton(self.images.sitIn)
         }
         else if(table_state.seats[i].sitting_out == false){

         }
         }

         //seated players
         this.playerSits(table_state.seats[i].seat,table_state.seats[i].username,table_state.seats[i].chips)
        if(table_state.seats[i].sitting_out == true){
            self.images.seats[table_state.seats[i].seat].status.text.text = "Sitting Out"
        }
         }

        //comunity cards
        this.displayAllCommunity(table_state.community)
        //pot
        if(table_state.pot&&table_state.pot>0){this.updatePotSize(table_state.pot)}

         //current bets
         for (var i=0;i<table_state.players.length;i=i+1) { 
         this.playerPutsChipsInPot(table_state.players[i].seat,table_state.players[i].current_bet, table_state.players[i].chips)
         this.displayChipStack(table_state.players[i].current_bet, self.images.seats[table_state.players[i].seat], self.images.seats[table_state.players[i].seat].firstChip.position.x, self.images.seats[table_state.players[i].seat].firstChip.position.y)
         }

          //empty seats
         for (var i = 0; i<table_state.max_players;i++){
             
             this.displayCorrectSeatMessage(i)
         }

    }
    
  //---------------------SOCKET CODE------------------------
    this.receiveTableState = function(){
   socket.once('table_state', function(table_state){
             self.displayInitialTableState(table_state)
             self.activateSockets()
    })
    }
    
    this.activateSockets = function(){
     

    socket.on('street_ends', function (potSize){
        var animationTime = 800
        var ticks = 40
        var chipIntoPotAnimationArray = []
        var callBackNumber = 0
        //push animateImages into an array
        _.each(_.range(self.images.seats.length), function(seatNumber) {

            if(self.images.seats[seatNumber].chips && Array.isArray( self.images.seats[seatNumber].chips) && self.images.seats[seatNumber].chips[0]  && self.images.seats[seatNumber].chips[0].image && self.stage.contains(self.images.seats[seatNumber].chips[0].image) )
            {
                
                var animationDistanceX = self.images.pots[0].firstChip.position.x -  self.images.seats[seatNumber].firstChip.position.x
                var animationDistanceY = self.images.pots[0].firstChip.position.y  - self.images.seats[seatNumber].firstChip.position.y

                 _.each(_.range(self.images.seats[seatNumber].chips.length), function(n)
                 {
chipIntoPotAnimationArray.push(function(callback){
      self.animateImage(self.images.seats[seatNumber].chips[n].position.x, self.images.seats[seatNumber].chips[n].position.y, animationTime, ticks, self.images.seats[seatNumber].chips[n], self.images.seats[seatNumber].chips[n].position.x + animationDistanceX, self.images.seats[seatNumber].chips[n].position.y+ animationDistanceY, function(){callback(null, callBackNumber)})
     
                }) 
                })
                }
                })
            

        
        
async.series([
function(next){
    async.parallel(chipIntoPotAnimationArray, function(err, results){next(null, 1)})
},

function(next){
    self.displayChipStack(potSize, self.images.pots[0], self.images.pots[0].firstChip.position.x, self.images.pots[0].firstChip.position.y)
    self.removeAllBets()
    next(null, 2)
}
  ])

    })

    //error received
       socket.on('error', function(errorString){
           var messageInfo = {}
           messageInfo.message = errorString
           messageInfo.okay = true
            self.displayMessageBox(messageInfo)
                
})
        


    //community cards are dealt
       socket.on('community_dealt', function(community){

      //      self.removeAllBets()
            self.dealCommunity(community)
       //     self.displayAllCommunity(community)
                
})

socket.on('hands_dealt', function(players){
    var playerArray = []
    for(var i = 0; i<players.length;i++){playerArray.push(players[i].seat)}

    if(self.gameState.holeCards) { self.dealHoleCards(playerArray[0],playerArray, self.gameState.holeCards)}
    else{self.dealHoleCards(playerArray[0],playerArray)}
    self.gameState.holeCards = null
})


//hand dealt to user
       socket.on('hole_cards_dealt', function(hand){
         // socket.removeListener('hands_dealt')
         self.gameState.holeCards = hand

     })


//player acts
       socket.on('player_acts', function(player, action, pot){

        self.playerActs(player.seat, action, 2)
    //display updated potsize if necessary
        if(pot){self.updatePotSize(pot)}

        switch(action){
        case 'fold':
        self.hideHoleCards(player.seat)
        self.hideBet(player.seat)
        if(player.seat == self.gameState.userSeatNumber){
            self.hideButton(self.images.rightSideButtons[0].button)
            }
            break;

            case 'check':
             createjs.Sound.play("check")
            break;

            case'bet':
            self.displayChipStack(player.current_bet, self.images.seats[player.seat], self.images.seats[player.seat].firstChip.position.x,self.images.seats[player.seat].firstChip.position.y )
            self.playerPutsChipsInPot(player.seat,player.current_bet, player.chips)
            break;

            case'call':
             self.displayChipStack(player.current_bet, self.images.seats[player.seat], self.images.seats[player.seat].firstChip.position.x,self.images.seats[player.seat].firstChip.position.y )
            self.playerPutsChipsInPot(player.seat,player.current_bet, player.chips)
             break;

            case 'raise':
             self.displayChipStack(player.current_bet, self.images.seats[player.seat], self.images.seats[player.seat].firstChip.position.x,self.images.seats[player.seat].firstChip.position.y )
            self.playerPutsChipsInPot(player.seat,player.current_bet, player.chips)
            break;

            case'post_blind':
            self.displayChipStack(player.current_bet, self.images.seats[player.seat], self.images.seats[player.seat].firstChip.position.x,self.images.seats[player.seat].firstChip.position.y )
            self.playerPutsChipsInPot(player.seat,player.current_bet, player.chips)
            break;

        }
             
})

//user to act 
 socket.on('act_prompt', function(actions, timeout){

     self.startCountdown(self.gameState.userSeatNumber,Math.round(timeout/1000))
     for (var i = 0; i < actions.length; i++){
     if (typeof actions[i].fold !== 'undefined'){
         self.displayButton(self.images.fold, false, ['act','fold'])
        }
       else if (actions[i].check !== undefined){
         self.displayButton(self.images.check,false,['act','check'])
         }
      else   if (actions[i].call){
             self.images.call.text.text = 'Call '+actions[i].call
         self.displayButton(holdemCanvas.images.call,false,['act','call',actions[i].call])
         }
       else  if (actions[i].raise){
         self.displayButton(self.images.raise,'raise to '+actions[i].raise[0],['act','raise', actions[i].raise[0]])
         self.showBetSlider(actions[i].raise[0], actions[i].raise[1], 1)
         }
      else if (actions[i].bet){
         self.displayButton(self.images.bet,'bet '+actions[i].bet[0] ,['act','bet',actions[i].bet[0]])
         self.showBetSlider(actions[i].bet[0], actions[i].bet[1], 1)
         }
         }
})

//player to act (not the user)
 socket.on('player_to_act', function(player, timeout){

     self.startCountdown(player.seat,Math.round(timeout/1000))
     
})
//player sits in
       socket.on('player_sits_in', function(player){
           self.images.seats[player.seat].status.text.text = player.chips
  
        if(player.seat == self.gameState.userSeatNumber){
            self.hideChildren(self.images.sitIn)
            self.hideChildren(self.images.getChips)
            self.displayButton(self.images.rightSideButtons[1].button,false, ['sit_out'])
}
        self.stage.update()
});

//player sits out
       socket.on('player_sits_out', function(player){
           self.images.seats[player.seat].status.text.text = 'Sitting Out'
  
        if(player.seat == self.gameState.userSeatNumber){

            if(player.chips == 0){
                self.displayButton(self.images.getChips)
            }
            else{
            self.displayButton(self.images.sitIn)
            }
}
        self.stage.update()
});


//player sits, checks if player is the user
       socket.on('player_sits', function(player, is_you){
         self.hideChildren(self.images.seats[player.seat].openSeat)
        if(is_you == true){
            self.gameState.userSeatNumber = player.seat
            socket.emit('get_add_chips_info')
            self.displayButton(self.images.stand, false, ['stand'])
            self.displayButton(self.images.addChips)
            //console.log(self.images.leftSideButtons[1].button.image)
                    
}
self.playerSits(player.seat, player.username, player.chips)
});

//player stands, checks if player is the user
       socket.on('player_stands', function(player, seatNumber, is_you){

        
        if(is_you){
            self.gameState.userSeatNumber = false
            self.hideSeatedOptions()
}
           self.playerStands(seatNumber)
})

//player stands, checks if player is the user
       socket.on('player_sits_out', function(player){

           self.playerSitsOut(player.seat)


})

//player receives server message to open cashier
       socket.on('add_chips_info', function(info){
        self.displayCashier(info)
        
        }
  );   
  

//player adds chips to his stack
       socket.on('player_adds_chips', function(player,is_you){
        
           if(player.sitting_out == true){
                          
           self.images.seats[player.seat].status.text.text = 'Sitting Out'
           }
           else if(player.chips>0){
                self.images.seats[player.seat].status.text.text = player.chips
           }


        if(is_you){
            self.hideCashier()
            if(player.chips>0){self.hideChildren(self.images.getChips)
            if (player.sitting_out == true){self.displayButton(self.images.sitIn)}
            }
        }
        self.stage.update()
 }  );   


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
    holdemCanvas.receiveTableState()
     //   socket.emit('get_table_state');
      /*
   for(var i= 0;i<holdemCanvas.images.containers.length;i++){
           console.log( holdemCanvas.images.containers[i].isVisible())
        }
        */
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
