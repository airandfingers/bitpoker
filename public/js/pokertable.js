   $("#chat_table").css('display','none')
   $("#chat_table").css('top','1000px')
      function onKeyDown(event) {
event.preventDefault() } 

window.onKeydown = onKeyDown

/*function (dtnode, event) { 
        return false; 
    }*/
   
    //default canvas size is 690x480
    //all numbers are in base 0, including variable names and documentation
    //seat position 0 is top middle and proceeds clockwise
    function Table (maxSeats) {
        self = this
        this.canvas = document.getElementById('canvas')
        this.stage = new createjs.Stage(canvas)
        this.stage.eventsEnabled = true
         this.stage.mouseEventsEnabled
        this.stage.enableMouseOver()
            this.events = {}
  this.imageData = {
      maxChipsPerColumn:5,
      distanceBetweenChipColumns:4,
      chatBoxAlpha:0.75
  }
  this.userPreferences = {
      

      bigBlindsPerHorizontalSliderTick : 3,
      timePerHorizontalSliderTick: 500,
      animate: true,
      chatTextColor: '#FFFFFF'

  }
        this.gameState = {}
        this.gameState.displaySize = 'normal'
        this.gameState.secondsToAct
        this.gameState.userSeatNumber = false
        this.gameState.seats = []
        for(var i = 0;i<maxSeats;i++){
             this.gameState.seats[i]={}
             this.gameState.seats[i].displayMessageType = 'openSeat'
             this.gameState.seats[i].toAct = false
        }
        this.gameState.cashier = {}
        this.gameState.tableChatBox = {}
        this.gameState.messageBox = {}
        this.gameState.messageBox.activeContainers = []
        this.gameState.containerImageIndexes = {
            
           
            background:0,
            holeCard:1,
            chips:2,
            cardAnimation:3,
            button:4,
            chat:5,
             cashier:7,
            initialMessageBox:9
        }

        this.images = {}
        this.images.containers = []
        for (var i = 0;i<16;i++){
        this.images.containers[i] = new createjs.Container()
        this.stage.addChild(this.images.containers[i])
        
     }

          this.images.sources = {
       //     call: 'img/call.jpg',
       //     check: 'img/check.jpg',
       //     raise: 'img/raise.jpg',
            hiddenCardFileName: 'back.png',
            seat: 'img/empty_seat.jpg',
      //      blankSeat : 'img/blank_seat.jpg',
       //     bet: 'img/bet.jpg',
            community: 'img/card_back.jpg',
            fold: 'img/fold.jpg',
            sideButton :'img/side_button.jpg',
            background: 'img/table_background.jpg',
            fourColorDeck: 'img/4colorsheet.png',
            dealerButton: 'img/dealer_button.png',
            verticalSlider: 'img/raise_slider.png',
            horizontalSlider: 'img/small_slider_bg.png',
            cashierBackground: 'img/cashier_background.png',
            cashierCloseX: 'img/cashier_closeWindowX.jpg',
            cashierButton: 'img/cashier.png',
            cashierButtonOver: 'img/cashier_over.png',
            cashierButtonPress: 'img/cashier_press.png',
            cashierButtonSprite: 'img/cashier_button_sprite.png',
            getChips: 'img/get_chips.png',
            viewLobby: 'img/view_lobby.png',
            exitTable: 'img/exit_table.png',
            messageBoxBackground: 'img/messagebox.png',
            messageBoxCloseX:'img/messageBox_closeWindowX.jpg',
            checkBox: 'img/check_box.png',
            checkBoxChecked:'img/check_box_clicked.png',
            

            chips: {
                red:'img/chips/red_chip.png',
                black: 'img/chips/black_chip.png'
            }
            }
            if(this.gameState.displaySize == 'mobile'){this.images.sources.cardImageFolder = 'img/fourColorDeck/resize/'}
            else {this.images.sources.cardImageFolder = 'img/fourColorDeck/'}

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
    if(item.messages){
        item.image.onClick = self.events.onButtonClick
    }
            }

            this.images.cardAsBitmap = function(item,cardText){
                 var cardImage = new Image()
         var imageSource = this.sources.cardImageFolder+cardText+'.png'

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
if(item.messages){
    item.image.onClick = self.events.onButtonClick
}
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
     if(event.target instanceof createjs.Shape) {
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
     }
      
  this.events.onButtonClick = function(event){
        socket.emit.apply(socket, event.target.parentOfImageObject.messages)
        if(event.target.parentOfImageObject.otherMessages){socket.emit.apply(socket, event.target.parentOfImageObject.otherMessages)}
    }
  
    this.events.foldToAnyBetClick = function(event){
        
        socket.emit('set flag','fold',true)
        socket.emit('set flag','check',true)

    }

    this.events.foldToAnyBetOnClick =function (event){
        
        socket.emit('set flag','fold',false)
        socket.emit('set flag','check',false)

    }

    this.events.onAddChipsClick = function(event){
        if($('#maxRadio').is(':checked'))
        {
            socket.emit('add_chips',self.gameState.cashier.max, self.gameState.cashier.currency)

        }
        else if($('#otherAmountRadio').is(':checked')){
            var amount = $('#otherAmount').val()
            if(isNaN(amount)){
                var info = {}
                info.okay = true
                var message = "amount must be a number"
                self.displayMessageBox(message,info)
            }
            else{
                
                socket.emit('add_chips',Number(amount), self.gameState.cashier.currency)
            }

        }
        else if($('#autoRebuyRadio').is(':checked')){
            var amount = $('#autoRebuy').val()
            if(isNaN(otherAmount)){
                var info = {}
                info.okay = true
                var message = "Amount must be a number"
                self.displayMessageBox(message, info)
            }
            else{
                
                socket.emit('auto_rebuy',Number(amount), self.gameState.cashier.currency)
            }

        }

        else if(!$("input[name='addChipsRadio']:checked").val()){
            var info = {}
                info.okay = true
                var message = "Please select either: max, other amount, or auto-rebuy"
                self.displayMessageBox(message, info)
        }

    }

    //=======unfocus tableChatBox==================
    this.events.unfocusChatBox = function(event){
        
         $('#chat').blur()

    }

    //==============cashier Button Pressed ==============
    /*
    this.events.cashierButtonMouseOver = function(event){
        
        var cashierOverImage = new Image(self.images.sources.cashierButtonOver)

        self.images.cashierButton.image.image = cashierOverImage
        self.stage.update()

    }

    this.events.cashierButtonMouseOut = function(event){
        
        var cashierDefaultImage = new Image(self.images.sources.cashierButton)

        self.images.cashierButton.image.image = cashierOverImage
        self.stage.update()

    }

    this.events.cashierButtonMouseDown = function(event){
        
        var cashierDownImage = new Image(self.images.sources.cashierButtonPress)

        self.images.cashierButton.image.image = cashierOverImage
        self.stage.update()

        onMouseUp = function(event){
            
        }

    }
    */

    this.events.exitTableClick = function(event){
       var  messageInfo = {}
       messageInfo.cancel = true
       messageInfo.okayEvent = self.events.exit
        self.displayMessageBox("Are you sure you want to leave?",messageInfo)

    }

     this.events.viewLobbyClick = function(event){

         window.open('/lobby')

    }

    this.events.exit = function(event){
        socket.emit('stand')
          var win = window.open('', '_self')
          win.close()
    }

     //===============START BET SLIDER===================

     this.events.horizontalSliderMouseDown = function(event){

        var minX = self.images.betSlider.horizontal.position.x
         var maxX = self.images.betSlider.horizontal.position.x + self.images.betSlider.horizontal.size.x-self.images.betSlider.vertical.size.x
         var pixelsPerTick = self.gameState.maxBet*self.userPreferences.bigBlindsPerHorizontalSliderTick/(maxX-minX)
         
         //takes vertical slider location and proportionaly shows bet size
           var adjustBetSize = function (){

      betSizePercent = (self.images.betSlider.vertical.image.x-minX)/(maxX-minX)
     unroundedBetAmount =  betSizePercent*(self.gameState.maxBet-self.gameState.minBet)+self.gameState.minBet
     roundedBet = Math.round(unroundedBetAmount/self.gameState.minIncrement)*self.gameState.minIncrement

    self.images.betSlider.betSize.text.text = roundedBet
    if(self.stage.contains(self.images.bet.text)){
        self.images.bet.text.text = 'Bet '+roundedBet
        self.images.bet.messages = ['act','bet',roundedBet]}
    
    else if(self.stage.contains(self.images.raise.text)){
        self.images.raise.text.text = 'Raise to '+roundedBet
    self.images.raise.messages = ['act','raise',roundedBet]}
    self.stage.update()
         }


         //define function that moves slider one tick
         var moveSlider = function (event){
             //remove any existing tweens on vertical bet slider
             createjs.Tween.removeTweens(self.images.betSlider.vertical.image)
             var pixelDirection
         //check if click is to the right of the vertical slider
         if(event.stageX>self.images.betSlider.vertical.image.x+self.images.betSlider.vertical.size.x){
             pixelDirection = 1 
             //move slider to the right
            self.images.betSlider.vertical.image.x = self.images.betSlider.vertical.image.x+pixelsPerTick
             //if slider is too far to the right adjust to maximum
             if(self.images.betSlider.vertical.image.x>maxX){
                 self.images.betSlider.vertical.image.x=maxX
             }
             adjustBetSize()

             self.stage.update()
         }
         //check if click is to the left of the vertical slider
        else  if(event.stageX<self.images.betSlider.vertical.image.x){
            pixelDirection = -1
             //move slider to the left
             self.images.betSlider.vertical.image.x-pixelsPerTick
             //if slider is too far to the left adjust to minimum
             if(self.images.betSlider.vertical.image.x<minX){
                 self.images.betSlider.vertical.image.x=minX

             }
             adjustBetSize()
             self.stage.update()
         }
         else{pixelDirection = 0}
         if(pixelDirection>0||pixelDirection<0)
         {
             createjs.Tween.get(self.images.betSlider.vertical.image,{override:true, loop:true})
.wait(self.userPreferences.timePerHorizontalSliderTick)
.call(moveSlider, [event])
         }
         }

       moveSlider(event)

       event.onMouseMove=function(event){
           moveSlider(event)

       }

       event.onMouseUp=function(event){
           //remove any existing tweens on vertical bet slider
             createjs.Tween.removeTweens(self.images.betSlider.vertical.image)
       }

 
     }

     this.events.betSliderVerticalMouseDown = function(event){
  
         var roundedBet
         var betSizePercent
         var unRoundedBetAmount

      //set minX and maxX
      var minX = self.images.betSlider.horizontal.position.x
   var maxX = self.images.betSlider.horizontal.position.x +self.images.betSlider.horizontal.size.x-self.images.betSlider.vertical.size.x

   //if mouse is moved
    event.onMouseMove = function(event){

    //if mouse outside bounds of slider, set betsize to minimum or maximum bet
 if(event.stageX>maxX){
     event.target.x = maxX
        roundedBet = self.gameState.maxBet}
  else if(event.stageX<minX){
      event.target.x = minX
  roundedBet = self.gameState.minBet}

    //if mouse is inside the dimensions of the horizontal slider, proportionally display bet size
        else if(event.stageX>=minX && event.stageX<=maxX) {
            event.target.x = event.stageX
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
     if(event.stageX>maxX){
         event.target.x = maxX
         roundedBet = self.gameState.maxBet}
  else if(event.stageX<minX){
      event.target.x = minX
  roundedBet = self.gameState.minBet}

    //if mouse is inside the dimensions of the horizontal slider, proportionally display bet size
        else if(event.stageX>=minX && event.stageX<=maxX) {
    event.target.x = event.stageX
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
this.initialize= function(){

    var fileSourceArray = []

    for(var i in this.images.sources){
        for(var n in this.images.sources[i][n]){
            if(typeof this.images.sources[i][n] == 'string'){
                fileSourceArray.push({src: this.images.sources[i][n], id:fileSourceArray.length-1})
            }
        }
       if((typeof this.images.sources[i] == 'string') && (this.images.sources[i].indexOf('fourColorDeck') == -1)){
           fileSourceArray.push({src: this.images.sources[i], id:fileSourceArray.length-1})
    }
    }
    for(var i = 2;i<=14;i++){
        var cardRank
           if(i==10){cardRank = 't'}
      else  if(i==11){cardRank = 'j'}
     else   if(i==12){cardRank = 'q'}
else if(i==13){cardRank = 'k'}
    else    if(i==14){cardRank = 'a'}
    else{cardRank = i}
        fileSourceArray.push({src: this.images.sources.cardImageFolder+cardRank+'c.png', id: fileSourceArray.length-1})
        fileSourceArray.push({src:this.images.sources.cardImageFolder+cardRank+'d.png', id: fileSourceArray.length-1})
        fileSourceArray.push({src:this.images.sources.cardImageFolder+cardRank+'h.png', id: fileSourceArray.length-1})
        fileSourceArray.push({src:this.images.sources.cardImageFolder+cardRank+'s.png', id: fileSourceArray.length-1})
    }
    console.log(fileSourceArray)
    // must set to false or wo't work.  dont know whay...
                var preload = new createjs.LoadQueue(false)
  //  preload.addEventListener("complete", handleComplete)
  //   preload.addEventListener("fileload", handleFileLoad)
   preload.loadManifest(fileSourceArray)
 //  createjs.Ticker.setFPS(30)

   var handleFileLoad=  function  (event){
       console.log(event.item.src)
   }

           function handleComplete(event) {
               console.log('loading completed')
          //  self.createAllItems()
        }
}


this.images.setDefaults = function(){
    
    var canvasWidth = document.getElementById('canvas').width
     var canvasHeight = document.getElementById('canvas').height

     //small cards are 37 x 45
     //big cards are 48 x 76
     var cardWidth
     var cardHeight

     if(this.sources.cardImageFolder.indexOf('resize') >= 0){
         cardWidth = 37
       cardHeight = 45

            }
            else{
                cardWidth = 48
                cardHeight = 76
            }

            var spaceBetweenHoleCards = -10

            //percentage of vertical card to show
            var shownCardY = 0.85

            var sideButtonWidth = 100
            var sideButtonHeight = 13
            var sideButtonDistanceFromChat = 20
            var sideButtonOffSetLeft = 2
           var  sideButtonDistanceY = 3
           var sideButtonCheckBoxWidth = sideButtonHeight
           var sideButtonDistanceFromBoxToText = 5
           var sideButtonDistanceFromEdgeToInteriorHitAreaY = 1
           var sideButtonSizeAndFont = '10px arial'
           var sideButtonTextColor = '#FFFFFF'

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

            var rightColumnSeatDealerButtonX = -dealerButtonWidth*1.1
            var rightColumnSeatDealerButtonY = 0

            var potHeight = 7
            var potWidth = 100

            var potDistanceToCommunity = -25
            var chipDiameter = 20
            var distanceBetweenChipsY = 3

            var betTextHeight = 7
            var betTextWidth =  20
            var absoluteDistanceBetweenBetTextAndChipImages = 5

            var htmlTableChatBoxLeftOffset = 10
            var htmlTableChatBoxBottomOffset = 10
            var htmlTableChatBoxWidth = 135
            var htmlTableChatBorderSize = $('#chat').css('border').substring(0,$('#chat').css('border').indexOf('p'))
            var htmlTableChatBoxHeight = 20
            var htmlTableChatBoxReminderTextColor = 'rgb(165,165,165)'

            var verticalBetSliderWidth = 6
            var verticalBetSliderHeight = 13            
            var horizontalBetSliderWidth = 200
            var horizontalBetSliderHeight = 7
            var horizontalBetSliderX = 215
            var horizontalBetSliderOffsetBottom =  19
            var distanceBetweenBetSizeAndHorizontalSlider = 35
            var betSizeWidth = 35
            var betSizeHeight = 20

            
         
            //space between player chat and seat
            var chatBoxWidth = seatWidth*1.4
            var chatBoxHeight = seatHeight/2.3
            var absoluteabsoluteChatDistanceFromSeatY = seatHeight/5
             var chatBoxBorderColor = '#FFFFFF'

            //space between player's cards/seats, and chip images in play, relative to the upper left seat corner
            var bottomChipOffsetX = chipDiameter
            var bottomChipOffsetY = -cardHeight*shownCardY - chipDiameter*1.5
            var leftChipOffsetX =  seatWidth + chipDiameter*1.5
            var leftChipOffsetY = chipDiameter/2
            var topChipOffsetX = seatWidth - chipDiameter
            var topChipOffsetY = seatHeight + chipDiameter*1.5
            var rightChipOffsetX = -chipDiameter*1.5
            var rightChipOffsetY = seatHeight - chipDiameter/2

            //cashier Button width and height
            var cashierButtonWidth = 132
            var cashierButtonHeight = 52

            //define dimensions for upper right and upper left buttons
            var viewLobbyWidth = 169
            var viewLobbyHeight = 26
            var viewLobbyHitAreaUpperLeftOffsetX  = 10 //distance from left of viewlobby image and mouse events
            var viewLobbyHitAreaLowerLeftOffsetX = 37
            var viewLobbyHitAreaTopOffset  = 3 // distance from top of viewlobby image and mouse event clicks
            var viewLobbyHitAreaBottomOffset  = 3 
            var viewLobbyHitAreaRightOffset  = 2  // distance from rightside of image and hit area

            var exitTableWidth = 150
            var exitTableHeight = 32

             var exitTableHitAreaUpperLeftOffsetX  = 25 //distance from left of ExitTable image and mouse events
            var exitTableHitAreaLowerLeftOffsetX = 52
            var exitTableHitAreaTopOffset  = 2 // distance from top of ExitTable image and mouse event clicks
             var exitTableHitAreaBottomOffset  = 8
            var exitTableHitAreaRightOffset  = 2  // distance from ExitTable of image and hit area
            
            var getChipsWidth = 153
            var getChipsHeight = 42

             var getChipsHitAreaLeftOffset  = 2 //distance from left of getChips image and mouse events
            var getChipsHitAreaTopOffset  = 2 // distance from top of getChips image and mouse event clicks
             var getChipsHitAreaBottomOffset  = 10
            var getChipsHitAreaUpperRightOffset  = 12  
            var getChipsHitAreaLowerRightOffset  = 41

            //dealerButton
           this.dealerButton = new this.Item(0,0,dealerButtonWidth, dealerButtonHeight,self.gameState.containerImageIndexes.chips)
            this.itemAsBitmap(this.dealerButton, this.sources.dealerButton)

            //---------pot-------------------

            this.pots[0].potSize = new this.Item(canvasWidth/2-potWidth/2,communityY+cardHeight+potHeight,potWidth,potHeight,self.gameState.containerImageIndexes.chips)
             this.addItemText(this.pots[0].potSize, '',"14px Arial", "#FFFFFF")

             this.pots[0].firstChip = new this.Item(canvasWidth/2-cardWidth/2-cardWidth,communityY+potDistanceToCommunity,chipDiameter,chipDiameter,self.gameState.containerImageIndexes.chips)
              this.pots[0].secondChip = new this.Item(this.pots[0].firstChip.position.x,this.pots[0].firstChip.position.y-distanceBetweenChipsY,chipDiameter,chipDiameter,self.gameState.containerImageIndexes.chips)
              this.pots[0].secondColumnChip = new this.Item(this.pots[0].firstChip.position.x+chipDiameter+self.imageData.distanceBetweenChipColumns,this.pots[0].firstChip.position.y,chipDiameter,chipDiameter,self.gameState.containerImageIndexes.chips)

              //---------------------player chat input---------------
              this.htmlTableChatBox = new this.Item(htmlTableChatBoxLeftOffset,canvasHeight - htmlTableChatBoxBottomOffset-htmlTableChatBoxHeight-htmlTableChatBorderSize*2,htmlTableChatBoxWidth,htmlTableChatBoxHeight,self.gameState.containerImageIndexes.button)
var defaultMessage = 'Type here to chat'
$('#chat').val(defaultMessage)
$('#chat').css('color', htmlTableChatBoxReminderTextColor)

//remove reminder text when clicked
$('#chat').focusin(function(){
    if($('#chat').val() == defaultMessage){
    $('#chat').val('')
$('#chat').css('color', self.userPreferences.chatTextColor)}
})

//redisplay reminder text ONLY if text value is only spaces or nothing
$('#chat').focusout(function(){
    if (/\S/.test($('#chat').val())){}
   else{
   $('#chat').val('Type here to chat')
$('#chat').css('color', htmlTableChatBoxReminderTextColor)
 }
})



$('#chat').css({
 'position' :  'absolute',
 'left'  : this.htmlTableChatBox.position.x + 'px',
'top'  : this.htmlTableChatBox.position.y + 'px',
'width' : this.htmlTableChatBox.size.x + 'px',
'height' : this.htmlTableChatBox.size.y +'px',
'padding': '0px',
'margin':'0px'
 // 'background-color': 'rgb(200,200,200)'
})

    //emit chat if user pressed enter
 $('#chat').keypress(function(event){
      var keycode = (event.keyCode ? event.keyCode : event.which)
    if(keycode == '13') {    
        socket.emit('chat', $("#chat").val())
        $("#chat").val('')
        $('#chat').focus()
        }
    })

           //--------standard pre-action buttons---------------------
          this.foldToAnyBet = new  this.Item(sideButtonOffSetLeft,this.htmlTableChatBox.position.y-  sideButtonDistanceFromChat - 3*sideButtonHeight-2*sideButtonDistanceY,sideButtonWidth,sideButtonHeight,self.gameState.containerImageIndexes.button, ['set_flag','check',true])
         this.foldToAnyBet.otherMessages = ['set_flag','fold',true]
          this.sitOutNextHand = new  this.Item(sideButtonOffSetLeft,this.htmlTableChatBox.position.y -  sideButtonDistanceFromChat- 2*sideButtonHeight - sideButtonDistanceY,sideButtonWidth,sideButtonHeight,self.gameState.containerImageIndexes.button, ['sit_out'])
        this.sitOutNextBigBlind =  new this.Item(sideButtonOffSetLeft,this.htmlTableChatBox.position.y-  sideButtonDistanceFromChat- sideButtonHeight,sideButtonWidth,sideButtonHeight,self.gameState.containerImageIndexes.button, ['set_flag', 'receive_hole_cards', false])
               
               
                //define on versions
                  this.foldToAnyBetOn =  new this.Item(this.foldToAnyBet.position.x,this.foldToAnyBet.position.y, this.foldToAnyBet.size.x,this.foldToAnyBet.size.y,self.gameState.containerImageIndexes.button, ['set_flag','fold',false])
                   this.foldToAnyBet.otherMessages = ['set_flag','check',false]
          this.sitOutNextHandOn = new  this.Item(this.sitOutNextHand.position.x,this.sitOutNextHand.position.y, this.sitOutNextHand.size.x,this.sitOutNextHand.size.y,self.gameState.containerImageIndexes.button, ['sit_in'])
        this.sitOutNextBigBlindOn = new  this.Item(this.sitOutNextBigBlind.position.x,this.sitOutNextBigBlind.position.y, this.sitOutNextBigBlind.size.x,this.sitOutNextBigBlind.size.y,self.gameState.containerImageIndexes.button, ['set_flag', 'receive_hole_cards', true])
        
        this.itemAsBitmap(this.foldToAnyBet, this.sources.checkBox)
this.itemAsBitmap(this.sitOutNextHand, this.sources.checkBox)
this.itemAsBitmap(this.sitOutNextBigBlind, this.sources.checkBox)

        this.itemAsBitmap(this.foldToAnyBetOn, this.sources.checkBoxChecked)
this.itemAsBitmap(this.sitOutNextHandOn, this.sources.checkBoxChecked)
this.itemAsBitmap(this.sitOutNextBigBlindOn, this.sources.checkBoxChecked)
//function for creating text from all fast
    var addSideButtonText = function(parentOfImageObject, text){
                parentOfImageObject.text = new createjs.Text(text, sideButtonSizeAndFont, sideButtonTextColor)
parentOfImageObject.text.x=parentOfImageObject.position.x + sideButtonCheckBoxWidth + sideButtonDistanceFromBoxToText
parentOfImageObject.text.y=parentOfImageObject.position.y + 1
parentOfImageObject.text.baseline = 'top'
parentOfImageObject.text.textAlign = 'left'
parentOfImageObject.textColor = sideButtonTextColor
}
//off state
      addSideButtonText( this.foldToAnyBet, 'Fold to any bet' )
      addSideButtonText(this.sitOutNextHand, 'Sit out next hand')
      addSideButtonText (  this.sitOutNextBigBlind,'Sit out next big blind' )
      
      //on state
      addSideButtonText( this.foldToAnyBetOn, 'Fold to any bet' )
      addSideButtonText(this.sitOutNextHandOn, 'Sit out next hand')
      addSideButtonText (  this.sitOutNextBigBlindOn,'Sit out next big blind' )

      //hitAreas for buttons
      
      var drawHitArea = function(parent){
          //get width of text
        var textWidth =   self.getTextWidthAndFontSize(parent)[0]
        var totalWidth = sideButtonCheckBoxWidth + sideButtonDistanceFromBoxToText + textWidth
        //draw rectangular shape
        var hitSquare = new createjs.Shape()
        hitSquare.graphics.beginFill('#FFFFFF').beginStroke(0)
        .drawRect(0, sideButtonDistanceFromEdgeToInteriorHitAreaY, totalWidth, parent.size.y - sideButtonDistanceFromEdgeToInteriorHitAreaY)
        return hitSquare
      }

                    //hit areas
      this.foldToAnyBet.image.hitArea =  drawHitArea(this.foldToAnyBet)
        this.sitOutNextHand.image.hitArea = drawHitArea(this.sitOutNextHand)
          this.sitOutNextBigBlind.image.hitArea  = drawHitArea(this.sitOutNextBigBlind)
     
                  this.foldToAnyBetOn.image.hitArea  = drawHitArea(this.foldToAnyBetOn)
                  this.sitOutNextHandOn.image.hitArea = drawHitArea(this.sitOutNextHandOn)
                    this.sitOutNextBigBlindOn.image.hitArea = drawHitArea(this.sitOutNextBigBlindOn)

                    

      //onclick
       this.foldToAnyBet.image.onclick =  self.events.onButtonClick
        this.sitOutNextHand.image.onclick = self.events.onButtonClick
          this.sitOutNextBigBlind.image.onclick  = self.events.onButtonClick
           //define on versions
                  this.foldToAnyBetOn.image.onclick  = self.events.onButtonClick
                  this.sitOutNextHandOn.image.onclick = self.events.onButtonClick
                    this.sitOutNextBigBlindOn.image.onclick = self.events.onButtonClick

         



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

      //---filled seats------

      _.each(_.range(this.seats.length), function(i) {
          var x = self.images.seats[i].seat.position.x
          var y = self.images.seats[i].seat.position.y
          var width = self.images.seats[i].seat.size.x
          var height = self.images.seats[i].seat.size.y
          self.images.seats[i].seat.image = new createjs.Shape()
self.images.seats[i].seat.image.drawSeat = function(borderColor, fillColor, middleDividerColor){
    self.images.seats[i].seat.image.graphics.clear()
    self.images.seats[i].seat.image.snapToPixel = true
self.images.seats[i].seat.image.graphics.setStrokeStyle(2,'square').beginStroke(borderColor).beginFill(fillColor).drawRect(x, y, width, height)
            self.images.seats[i].seat.image.graphics.setStrokeStyle(1).beginStroke(middleDividerColor).moveTo(x,y+height/2).lineTo(x+width,y+height/2)
          self.images.seats[i].seat.image.parentOfImageObject = self.images.seats[i].seat
          self.images.seats[i].seat.image.borderColor = borderColor
          self.images.seats[i].seat.image.fillColor = fillColor
          self.images.seats[i].seat.image.middleDividerColor = middleDividerColor
}
})


  //=================-seat images=========================================
   
for(var i =0;i<this.seats.length;i++){

this.seats[i].seat.image.drawSeat('#FFFFFF','#000000', '#FFFFFF')

    //--------------------empty seats and text----------------- 
         this.seats[i].openSeat = new this.Item(this.seats[i].seat.position.x, this.seats[i].seat.position.y,this.seats[i].seat.size.x,this.seats[i].seat.size.y,self.gameState.containerImageIndexes.button)
          this.seats[i].disabledSeat = new this.Item(this.seats[i].seat.position.x, this.seats[i].seat.position.y,this.seats[i].seat.size.x,this.seats[i].seat.size.y,self.gameState.containerImageIndexes.button)


         this.seats[i].action = new this.Item(this.seats[i].seat.position.x, this.seats[i].seat.position.y,this.seats[i].seat.size.x,this.seats[i].seat.size.y/2,self.gameState.containerImageIndexes.button)
         this.seats[i].countdown = new this.Item(this.seats[i].seat.position.x, this.seats[i].seat.position.y,this.seats[i].seat.size.x,this.seats[i].seat.size.y/2,self.gameState.containerImageIndexes.button)
         this.seats[i].winner = new this.Item(this.seats[i].seat.position.x, this.seats[i].seat.position.y,this.seats[i].seat.size.x,this.seats[i].seat.size.y/2,self.gameState.containerImageIndexes.button)

       
         this.seats[i].playerName = new this.Item(this.seats[i].seat.position.x, this.seats[i].seat.position.y,this.seats[i].seat.size.x,this.seats[i].seat.size.y/2,self.gameState.containerImageIndexes.button)
         this.seats[i].status = new this.Item(this.seats[i].seat.position.x, this.seats[i].seat.position.y+this.seats[i].seat.size.y/2,this.seats[i].seat.size.x,this.seats[i].seat.size.y/2,self.gameState.containerImageIndexes.button)

     //------------------hole cards-----------------------------
            var middleOfSeat = this.seats[i].seat.position.x +this.seats[i].seat.size.x/2
            var card0X = middleOfSeat - cardWidth - spaceBetweenHoleCards/2
            var cardY = this.seats[i].seat.position.y - cardHeight*shownCardY
            var card1X = middleOfSeat  + spaceBetweenHoleCards/2

            this.seats[i].hiddenCard0 = new this.Item(card0X, cardY, cardWidth, cardHeight,1)
            this.seats[i].hiddenCard1 = new this.Item(card1X, cardY, cardWidth, cardHeight,1)

            this.seats[i].shownCard0 = new this.Item(card0X, cardY, cardWidth, cardHeight,1)
            this.seats[i].shownCard1 = new this.Item(card1X, cardY, cardWidth, cardHeight,1)



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
             this.itemAsBitmap(this.seats[i].hiddenCard0, this.sources.cardImageFolder+this.sources.hiddenCardFileName)
            this.itemAsBitmap(this.seats[i].hiddenCard1, this.sources.cardImageFolder+this.sources.hiddenCardFileName)


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
        

       //----------------------dealer button----Player's bets----------------------------------

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
       
        this.seats[i].firstChip = new this.Item(this.seats[i].seat.position.x+bottomChipOffsetX,this.seats[i].seat.position.y+bottomChipOffsetY,chipDiameter,chipDiameter,self.gameState.containerImageIndexes.chips)
        this.seats[i].secondColumnChip = new this.Item( this.seats[i].firstChip.position.x+chipDiameter+self.imageData.distanceBetweenChipColumns,this.seats[i].firstChip.position.y,chipDiameter,chipDiameter,self.gameState.containerImageIndexes.chips)

        
        //determine location of lower left most chip
        var bottomLeftChipX = this.seats[i].firstChip.position.x
        var bottomLeftChipY = this.seats[i].firstChip.position.y
        var betX = bottomLeftChipX - betTextWidth
        var betY = bottomLeftChipY + this.seats[i].firstChip.size.y - betTextHeight  
        //bet size
        this.seats[i].bet = new this.Item(betX,betY,betTextWidth,betTextHeight,self.gameState.containerImageIndexes.chips)
   
      //    var dealerButtonX = this.seats[i].seat.position.x+bottomRowSeatDealerButtonX
   //     var dealerButtonY = this.seats[i].seat.position.y+bottomRowSeatDealerButtonY
   //place dealer button opposite side than firstChip
   var distanceChipFromLeftSideX = this.seats[i].firstChip.position.x - this.seats[i].seat.position.x
 
   var dealerButtonRightX = this.seats[i].seat.position.x + this.seats[i].seat.size.x - distanceChipFromLeftSideX
  var dealerButtonX = dealerButtonRightX - dealerButtonWidth
  var dealerButtonY = this.seats[i].firstChip.position.y+this.seats[i].firstChip.size.y - dealerButtonHeight

        this.seats[i].dealerButton = new this.Item(dealerButtonX,dealerButtonY,dealerButtonWidth,dealerButtonHeight,self.gameState.containerImageIndexes.chips)

   
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

             // -----------------player's chat -----------------

             _.each(_.range(this.seats.length), function(i) {

        var chatX =  self.images.seats[i].seat.position.x +self.images.seats[i].seat.size.x/2 - chatBoxWidth/2  
        var chatY = self.images.seats[i].seat.position.y - absoluteabsoluteChatDistanceFromSeatY
   self.images.seats[i].chat = new self.images.Item(chatX, chatY, chatBoxWidth, chatBoxHeight, self.gameState.containerImageIndexes.chat)
   
  
   self.images.seats[i].chat.image = new createjs.Shape()

   //----------function to redraw chat box anytime with a new width
self.images.seats[i].chat.image.drawChat = function(width){

    //make sure width is <= maxWidth
    if(width == undefined){var width = self.images.seats[i].chat.size.x}
   else if(width>self.images.seats[i].chat.size.x){width = self.images.seats[i].chat.size.x}
   //clear previous graphics
   self.images.seats[i].chat.image.graphics.clear()
   //define parent
self.images.seats[i].chat.image.parentOfImageObject = self.images.seats[i].chat
//get new X coordinates of chat box
var x = self.images.seats[i].seat.position.x + self.images.seats[i].seat.size.x/2 - width/2
var y = self.images.seats[i].chat.position.y
    self.images.seats[i].chat.image.snapToPixel = true
self.images.seats[i].chat.image.graphics.setStrokeStyle(1,'round').beginStroke(chatBoxBorderColor).beginFill('#000000')
.drawRoundRect(x, y, width, self.images.seats[i].chat.size.y,  self.images.seats[i].chat.size.y*.20)

self.images.seats[i].chat.image.alpha = self.imageData.chatBoxAlpha
}

//player chat text
 self.images.seats[i].chat.text = new createjs.Text('', '10px Arial', '#FFFFFF')
self.images.seats[i].chat.text.x=self.images.seats[i].chat.position.x +  self.images.seats[i].chat.size.x/2 
 self.images.seats[i].chat.text.y= self.images.seats[i].chat.position.y
 self.images.seats[i].chat.text.baseline = 'top'
 self.images.seats[i].chat.text.textAlign = 'center'
 self.images.seats[i].chat.text.lineWidth = self.images.seats[i].chat.size.x*.92
 self.images.seats[i].chat.text.maxWidth = self.images.seats[i].chat.size.x*.85

 })

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

        this.fold.image.onClick = self.events.onButtonClick
        this.call.image.onClick  = self.events.onButtonClick
        this.check.image.onClick = self.events.onButtonClick
         this.raise.image.onClick  = self.events.onButtonClick
         this.bet.image.onClick  = self.events.onButtonClick

        //-----------------bet slider-----------------------------
              this.betSlider.horizontal = new this.Item (horizontalBetSliderX,canvasHeight-horizontalBetSliderOffsetBottom-horizontalBetSliderHeight,horizontalBetSliderWidth,horizontalBetSliderHeight,self.gameState.containerImageIndexes.button)
              var verticalY = this.betSlider.horizontal.position.y+this.betSlider.horizontal.size.y/2-verticalBetSliderHeight/2
      this.betSlider.vertical = new this.Item(this.betSlider.horizontal.position.x,verticalY,verticalBetSliderWidth,verticalBetSliderHeight,self.gameState.containerImageIndexes.button)
var betSizeX = this.betSlider.horizontal.position.x+this.betSlider.horizontal.size.x + distanceBetweenBetSizeAndHorizontalSlider
var betSizeY = this.betSlider.horizontal.position.y+this.betSlider.horizontal.size.y/2-betSizeHeight/2
      this.betSlider.betSize = new this.Item(betSizeX,betSizeY,betSizeWidth,betSizeWidth,self.gameState.containerImageIndexes.button)

      //  this.itemAsRectangle(this.betSlider.horizontal, 'black')
      this.itemAsBitmap(this.betSlider.horizontal, this.sources.horizontalSlider)
        this.itemAsBitmap(this.betSlider.vertical, this.sources.verticalSlider)
      //  this.itemAsRectangle(this.betSlider.vertical, 'blue')
        this.addItemText(this.betSlider.betSize, 0, '14px Arial', '#FFFFFF')

  //------------------------------community cards---------------------------
        this.community[0] = new this.Item(canvasWidth/2-cardWidth/2-cardWidth*2-distanceBetweenCommunityCards*2,communityY,cardWidth, cardHeight,self.gameState.containerImageIndexes.button)
        this.community[1] = new this.Item(canvasWidth/2-cardWidth/2-cardWidth-distanceBetweenCommunityCards,communityY,cardWidth, cardHeight,self.gameState.containerImageIndexes.button)
        this.community[2] = new this.Item(canvasWidth/2-cardWidth/2,communityY,cardWidth, cardHeight,self.gameState.containerImageIndexes.button)
        this.community[3] = new this.Item(canvasWidth/2+cardWidth/2+distanceBetweenCommunityCards,communityY,cardWidth, cardHeight,self.gameState.containerImageIndexes.button)
        this.community[4] = new this.Item(canvasWidth/2+cardWidth/2+cardWidth+2*distanceBetweenCommunityCards,communityY,cardWidth, cardHeight,self.gameState.containerImageIndexes.button)

  //------------------card spawn location---------------------------------

           this.startingCard = new this.Item(canvasWidth/2-this.community[0].size.x/2, this.community[0].position.y+this.community[0].size.y+40 , cardWidth, cardHeight, self.gameState.containerImageIndexes.cardAnimation)


        //--------------upper left side button---------------------
        this.stand = new this.Item(0,0,actionButtonWidth,actionButtonHeight/2,self.gameState.containerImageIndexes.button, ['stand'])
         this.itemAsRectangle(this.stand, 'black')
 this.addItemText(this.stand,'stand up','10px Arial','white')
 this.stand.image.onClick = self.events.onButtonClick
 //upper right side Buttons
 //this.cashierButton = new this.Item(canvasWidth-cashierButtonWidth, canvasHeight-cashierButtonHeight, cashierButtonWidth, cashierButtonHeight, self.gameState.containerImageIndexes.button)
// this.itemAsBitmap(this.cashierButton, this.sources.cashierButton)
 //this.cashierButton.image.onMouseOver = self.events.cashierButtonMouseOver

 this.cashierButton = new this.Item(canvasWidth-80,0, cashierButtonWidth, cashierButtonHeight, self.gameState.containerImageIndexes.button)
  
  var cashierButtonSpriteData = {

     images: [this.sources.cashierButtonSprite],
     frames:{
         width: 80,
         height:31
     },
     animations: {
         mouseOut:0,
         mouseOver: 1,
         mouseDown: 2
     }
}

var spriteSheet = new createjs.SpriteSheet(cashierButtonSpriteData)
this.cashierButton.bitmapAnimation = new createjs.BitmapAnimation(spriteSheet)
this.cashierButton.bitmapAnimation.x = this.cashierButton.position.x
this.cashierButton.bitmapAnimation.y = this.cashierButton.position.y
// this.cashierButton.bitmapAnimation.gotoAndStop(0)
this.cashierButton.button = new createjs.ButtonHelper(this.cashierButton.bitmapAnimation, 'mouseOut', 'mouseOver', 'mouseDown', false)
//this.cashierButton.button.initialize()


 //------------upper right view lobby--------------
 this.viewLobby = new this.Item(canvasWidth - viewLobbyWidth, 0, viewLobbyWidth, viewLobbyHeight, self.gameState.containerImageIndexes.button)
   this.itemAsBitmap(this.viewLobby, this.sources.viewLobby)
   //define shape for hit area of  viewLobby
   var viewLobbyHit = new createjs.Shape()
   var topY = viewLobbyHitAreaTopOffset
   var bottomY = this.viewLobby.size.y - viewLobbyHitAreaBottomOffset

viewLobbyHit.graphics.beginFill('white').setStrokeStyle(2).beginStroke('#000000')
.moveTo(viewLobbyHitAreaUpperLeftOffsetX, topY)
.lineTo(viewLobbyHitAreaLowerLeftOffsetX, bottomY)
.lineTo(this.viewLobby.size.x-viewLobbyHitAreaRightOffset, bottomY)
.lineTo(this.viewLobby.size.x-viewLobbyHitAreaRightOffset, topY)
.lineTo(viewLobbyHitAreaUpperLeftOffsetX, topY)
this.viewLobby.image.hitArea = viewLobbyHit
this.viewLobby.image.onClick = self.events.viewLobbyClick

//-------------------------upper left Get Chips-------
 this.getChips = new this.Item(0, 0, getChipsWidth, getChipsHeight, self.gameState.containerImageIndexes.button, ['get_add_chips_info'])
 this.itemAsBitmap(this.getChips, this.sources.getChips)

  //define shape of hit area
    var getChipsHit = new createjs.Shape()

getChipsHit.graphics.beginFill('#000000')
.moveTo(getChipsHitAreaLeftOffset, getChipsHitAreaTopOffset)
.lineTo(getChipsHitAreaLeftOffset, this.getChips.size.y-getChipsHitAreaBottomOffset)
.lineTo(this.getChips.size.x-getChipsHitAreaLowerRightOffset, this.getChips.size.y-getChipsHitAreaBottomOffset)
.lineTo(this.getChips.size.x-getChipsHitAreaUpperRightOffset, getChipsHitAreaTopOffset)
.lineTo(getChipsHitAreaLeftOffset, getChipsHitAreaTopOffset)
//    this.containers[13].addChild(getChipsHit)
  this.getChips.image.hitArea = getChipsHit
   this.getChips.image.onClick = self.events.onButtonClick

   //--------------upper right exit Table--------------
 this.exitTable = new this.Item(canvasWidth - exitTableWidth, viewLobbyHeight, exitTableWidth, exitTableHeight, self.gameState.containerImageIndexes.button)
   this.itemAsBitmap(this.exitTable, this.sources.exitTable)
   //define shape of hit area

   var exitTableHit = new createjs.Shape(new createjs.Graphics()
.beginFill('#000000')
.moveTo(this.exitTable.size.x-exitTableHitAreaRightOffset, exitTableHitAreaTopOffset)
.lineTo(this.exitTable.size.x-exitTableHitAreaRightOffset, this.exitTable.size.y - exitTableHitAreaBottomOffset)
.lineTo(exitTableHitAreaLowerLeftOffsetX, this.exitTable.size.y - exitTableHitAreaBottomOffset)
.lineTo(exitTableHitAreaUpperLeftOffsetX, exitTableHitAreaTopOffset)
.closePath())
// .lineTo(this.exitTable.position.x+ this.exitTable.size.x-exitTableHitAreaRightOffset, topY)

 this.exitTable.image.hitArea = exitTableHit
this.exitTable.image.onClick = self.events.exitTableClick

        //----------------not in hand action buttons------------------
        this.sitIn = new this.Item(205,419,actionButtonWidth,actionButtonHeight,self.gameState.containerImageIndexes.button, ['sit_in'])
        this.rebuy = new this.Item(205,419,actionButtonWidth,actionButtonHeight,self.gameState.containerImageIndexes.button, ['get_add_chips_info'])

         this.itemAsRectangle(this.sitIn,'black')
this.addItemText(this.sitIn,'Deal Me In','10px Arial','white')

 this.itemAsRectangle(this.rebuy,'black')
this.addItemText(this.rebuy,'Get Chips','10px Arial','white')
this.sitIn.image.onClick = self.events.onButtonClick
this.rebuy.image.onClick  = self.events.onButtonClick

//========================4 color deck sprite sheet=============================

var fourColorDeckData = {

     images: [this.sources.fourColorDeck],
     frames: {width:37, height:45}

}

this.fourColorSprite = new createjs.SpriteSheet(fourColorDeckData)

//======================CASHIER=======================================

 var cashierImageContainerIndex = self.gameState.containerImageIndexes.cashier

 //declare size variables
        var cashierWindowWidth = 298
        var cashierWindowHeight = 360
        
        var textLeftOffset = 13  //distance from left of first column of text of gray cashier area
        var textTopOffset = 4   // distance from top of gray area to first row of text
        var textRightOffset = 136 //distance from left side of second column to right side of gray cashier area

        var textHeight = 13
        var distanceBetweenTextY = 5
        var sizeAndFont = '12px arial'
        var textColor = '#000000'

         var outerTopHeight = 31
        var outerBottomHeight = 8
        var outerSideWidth = 8

        var columns = 2
        var rows = 10

        var cashierWindowX = canvasWidth/2 - cashierWindowWidth/2
        var cashierWindowY = canvasHeight/2 - cashierWindowHeight/2
        
        
        var closeWindowWidth = 31
        var closeWindowHeight = 20
        var closeWindowY = cashierWindowY +1 
        var closeWindowX = cashierWindowX + cashierWindowWidth - closeWindowWidth- 7

        var innerCashierX = cashierWindowX+outerSideWidth
        var innerCashierY = cashierWindowY+outerTopHeight
        var innerCashierWidth = cashierWindowWidth-2*outerSideWidth -2
        var innerCashierHeight = cashierWindowHeight-outerBottomHeight-outerTopHeight

        var textX = innerCashierX + textLeftOffset

        var textBoxOffsetLeft = 135
        var textBoxOffsetRight = 23 //distance from right of textbox to edge of gray
        var textBoxToTextHeightRatio = 1.8
        var distanceFromGrayBoxTopToFirstTextBox = 15
        var textBoxHeight = textHeight*textBoxToTextHeightRatio
        var textBoxWidth = innerCashierWidth -  textBoxOffsetRight -  textBoxOffsetLeft 
       var  distanceBetweenTextBoxY = textBoxToTextHeightRatio*distanceBetweenTextY

        var radioOffsetLeft = 19.5 //distance to innerCashierX
        var radioWidth = 13
        var radioHeight = radioWidth
        var distanceFromRadioToText = 6

        var grayBoxOffsetTop = 151
        var htmlTextWidth = textBoxOffsetLeft- radioWidth - distanceFromRadioToText - radioOffsetLeft


        var grayBoxOffsetSide = 11 //distance from gray box to end of gray background
        var grayBoxOffsetTop = 150
        var grayBoxOffsetBottom = 49
        
        this.cashier.window = new this.Item(cashierWindowX,cashierWindowY,cashierWindowWidth,cashierWindowHeight,cashierImageContainerIndex)
        this.itemAsBitmap(this.cashier.window, this.sources.cashierBackground)
  
        //define for location of column and row for easier future editing
        var textColumnX = []
        var textColumnWidth = []
        var textRowY = []
        

        for (var i = 0;i<rows;i++){
            textRowY.push(cashierWindowY+outerTopHeight+textTopOffset +i*(textHeight + distanceBetweenTextY))
        }
 for (var i = 0;i<columns;i++){
     //push columnX
     if(i%columns ==0){
            textColumnX.push(cashierWindowX+outerSideWidth+textLeftOffset)
            }
          else   if(i%columns == 1){
            textColumnX.push(cashierWindowX+cashierWindowWidth-outerSideWidth-textRightOffset)
            }
            
        }
           //push width
        for (var i = 0;i<columns;i++){
     
           if(i%columns ==0){
            textColumnWidth.push(textColumnX[(i+1)%columns]-textColumnX[i])
            }
          else   if(i%columns == 1){
            textColumnX.push(cashierWindowX+cashierWindowWidth-outerSideWidth-textColumnX[i])
            }
            }

        //define LOCATIONS of text items [column, row]
        var cashierItems = {}
        cashierItems.currency = {name: 'currency', location: [0,0]}
        cashierItems.blinds = {name: 'blinds', location: [1,0]}
     //   cashierItems.gameType = {name:'gameType' ,location: [0,1], text: 'Game Type:'}
     //   cashierItems.gameTypeValue = {name: 'gameTypeValue',location: [1,1]}
        cashierItems.tableName ={name: 'tableName' ,location: [0,1], text: 'Table Name:'}
        cashierItems.tableNameValue ={name: 'tableNameValue', location: [1,1]}
        cashierItems.tableMin = {name:'tableMin' , location: [0,2], text: 'Table Minimum:'}
        cashierItems.tableMinValue ={name: 'tableMinValue' ,location: [1,2]}
        cashierItems.tableMax ={name: 'tableMax' ,location: [0,3], text: 'Table Maximum:'}
        cashierItems.tableMaxValue ={name: 'tableMaxValue', location: [1,3]}
        cashierItems.playerMin ={name: 'playerMin' ,location: [0,4],  text: 'Minimum Add-On:'}
        cashierItems.playerMinValue ={name:  'playerMinValue',location: [1,4]}
  //     cashierItems.playerMax = {name: 'playerMax',location: [0,6],  text: 'Maximum Add-On:'}
   //     cashierItems.playerMaxValue ={name:  'playerMaxValue',location: [1,6]}
                 cashierItems.accountBalance ={name: 'accountBalance' ,location: [0,5],  text: 'Available Balance:'}
          cashierItems.accountBalanceValue ={name: 'accountBalanceValue' ,location: [1,5]}
        cashierItems.autoRebuy ={name: 'autoRebuy',location:  [0,6],  text: 'Auto-Rebuy:'}
        cashierItems.autoRebuyValue ={name: 'autoRebuyValue' ,location: [1,6]}

        var rowsUsed = 7

        // pokerTableWrapper and canvas to absolute (won't wrk in css)
        $("#pokerTableWrapper").css('position', 'absolute')
         $("#pokerTableWrapper").children().css('position', 'absolute')

        

        //use jquery to position divs to appropriate locations

        //use jquery to set appropriate sizes of text boxes
       $("#cashier input[type='text']").css('width', textBoxWidth+'px')
       $("#cashier input[type='text']").css('height', textBoxHeight+'px')

       //set all inputs to position absolute
      $("#cashier").css(
      {
      'position': 'absolute'
      
      })

      //set text size and font
        $("#cashier").children().css({
            'position':'absolute',
            'font':sizeAndFont,
        'margin-left':'0px',
        'margin-top': '0px',
       'margin-bottom':'0px',
           'margin-right':'0px',
           'padding':'0px',
           'text-align':'left'
          
  
   
           })

           //customize radio buttons
           $("#cashier input[type='radio']").css({
               'background':'rgb(233,233,233)',
    'background-image':'img/radio_button_bg.jpg',
    'background-repeat': 'repeat',
    '-webkit-backface-visibility': 'hidden'
           })

           //set width of text
 $("#cashier p").css({
     'max-width': htmlTextWidth+'px',
     'height': textBoxHeight+'px',
     'white-space': 'nowrap'

     })
           
        //position first row of html elements below last row of text
        var radioX = innerCashierX + radioOffsetLeft
 var maxTextBoxY = innerCashierY + grayBoxOffsetTop + distanceFromGrayBoxTopToFirstTextBox
var textBoxX = innerCashierX + textBoxOffsetLeft
var maxRadioY = maxTextBoxY + textBoxHeight/2 - radioHeight/2
var textX = radioX + radioWidth+distanceFromRadioToText

//position max radio
     $('#maxRadio').css('left', radioX+'px')
       $('#maxRadio').css('top', maxRadioY+'px')
       
       //position max text 
         $('#maxText').css('left', textX+'px')
       $('#maxText').css('top', maxRadioY+'px')

        //position max textbox
                $('#maxAmount').css('left', textBoxX+'px')
        $('#maxAmount').css('top', maxTextBoxY+'px')

        var otherTextBoxY = maxTextBoxY + textBoxHeight + distanceBetweenTextBoxY
        var otherRadioY = otherTextBoxY + textBoxHeight/2 - radioHeight/2

        //position other amount radio
         $('#otherAmountRadio').css('left', radioX+'px')
        $('#otherAmountRadio').css('top', otherRadioY+'px')

         //position other amount text
         $('#otherAmountText').css('left', textX+'px')
       $('#otherAmountText').css('top', otherRadioY+'px')
        
        //position other amount textbox
                $('#otherAmount').css('left', textBoxX+'px')
        $('#otherAmount').css('top', otherTextBoxY+'px')

         var autoRebuyTextBoxY = otherTextBoxY + textBoxHeight + distanceBetweenTextBoxY
        var autoRebuyRadioY = autoRebuyTextBoxY + textBoxHeight/2 - radioHeight/2

        //position autorebuy radio
         $('#autoRebuyRadio').css('left', radioX+'px')
        $('#autoRebuyRadio').css('top', autoRebuyRadioY+'px')

         //position autorebuyText
         $('#autoRebuyText').css('left', textX+'px')
       $('#autoRebuyText').css('top', autoRebuyRadioY+'px')
        
        //postion autorebuy textbox
                $('#autoRebuyAmount').css('left', textBoxX+'px')
        $('#autoRebuyAmount').css('top', autoRebuyTextBoxY+'px')




        //iterate through cashierItems to create all texts
        for(var i in cashierItems){
            if(_.isArray(cashierItems[i].location)){
                this.cashier[cashierItems[i].name] = new this.Item (textColumnX[cashierItems[i].location[0]],textRowY[cashierItems[i].location[1]], textColumnWidth[0],textHeight,cashierImageContainerIndex)
                if(cashierItems[i].text){var text = cashierItems[i].text}
                else{text =''}
                    this.cashier[cashierItems[i].name].text = new createjs.Text(text, sizeAndFont, textColor)
this.cashier[cashierItems[i].name].text.x = this.cashier[cashierItems[i].name].position.x
this.cashier[cashierItems[i].name].text.y=this.cashier[cashierItems[i].name].position.y + 1
this.cashier[cashierItems[i].name].text.baseline = 'top'
this.cashier[cashierItems[i].name].text.textAlign = 'left'
this.cashier[cashierItems[i].name].text.maxWidth = this.cashier[cashierItems[i].name].size.x*.9
            }
        }

        //create Item for gray box (even tho no image or text)
        var grayBoxX = cashierWindowX + outerSideWidth + grayBoxOffsetSide
        var grayBoxY = cashierWindowY + outerTopHeight + grayBoxOffsetTop
        var grayBoxWidth = cashierWindowWidth -  2*outerSideWidth - 2*grayBoxOffsetSide 
        var grayBoxHeight = cashierWindowY + cashierWindowHeight - outerBottomHeight - grayBoxOffsetBottom - grayBoxY
        this.cashier.grayBox = new this.Item(grayBoxX, grayBoxY, grayBoxWidth, grayBoxHeight, cashierImageContainerIndex)

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

         this.cashier.closeWindow =  new this.Item (closeWindowX,closeWindowY, closeWindowWidth,closeWindowHeight,cashierImageContainerIndex) 
       this.itemAsBitmap(this.cashier.closeWindow, this.sources.cashierCloseX)
       this.cashier.closeWindow.image.onClick = self.hideCashier


   // =============================================SOUNDS========================================

    createjs.Sound.registerSound("sounds/deal_card.swf", "dealCard")
            createjs.Sound.registerSound("sounds/player_checks.swf", "check")

}

        this.setBackground = function(){    
        this.images.background = new this.images.Item(0,0,9999,9999,this.gameState.containerImageIndexes.background)
        this.images.itemAsBitmap(this.images.background, this.images.sources.background)
this.displayChildren(this.images.background)
    }

    this.images.setDefaultEvents = function(){

        //mouse events for changing bet sizes
         this.betSlider.vertical.image.onPress = self.events.betSliderVerticalMouseDown
         this.betSlider.horizontal.image.onPress = self.events.horizontalSliderMouseDown

        //mouse events for clicking on empty seats
             for (var i = 0; i < this.seats.length; i = i + 1){
         this.seats[i].openSeat.image.onClick = self.events.onButtonClick
        }

        this.stand.image.onPress = self.events.buttonMouseDown
        this.stand.image.onClick = self.events.onButtonClick

        self.stage.onPress = self.events.unFocusTableChatBox

    }

    this.images.setDefaultMessages = function(){
        
        for (var i = 0; i < this.seats.length; i = i + 1){
          this.seats[i].openSeat.messages = ['sit',i]
        }
    }
    
    this.createAllItems = function(){
        this.setBackground()
        this.images.setDefaults()
       this.images.setDefaultEvents()
       this.images.setDefaultMessages()
      this.displayTableChatBox()
    }
     

    //does not update a player's stack size
    this.playerPutsChipsInPot =function(seatNumber,betSize, stackSize){
        
         this.images.seats[seatNumber].bet.text.text = betSize
         if(stackSize && stackSize <=0){stackSize = 'All In'}
         this.images.seats[seatNumber].status.text.text = stackSize

           this.displayChildren(this.images.seats[seatNumber].bet)

    }

    this.removeAllBets  = function(){

    for (var i=0;i<this.images.seats.length;i=i+1){
         this.hideBet(i)
        }
    }

    //rotates positions of players seats and their hole cards n times clockwise
    this.images.rotateSeats = function (n){

    }

    this.displayTableChatBox = function (){

$('#chat').css({
 'display'   : 'inline'
})


    }

    this.disableTableChatBox = function(){
         $('#chat').attr("readonly", true)
    }

    this.enableTableChatBox = function(){
        
        $('#chat').attr("readonly", false)
    }

    this.hideTableChatBox = function(){

 $('#chat').attr("display", none)

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
    }

    this.hideBet = function (seatNumber){
   
            this.hideChildren(this.images.seats[seatNumber].bet)
            for(var i = 0;i<this.images.seats[seatNumber].chips.length;i++){
                this.hideChildren(this.images.seats[seatNumber].chips[i])
                
            }
            this.images.seats[seatNumber].chips = []

    }

   //this.images.seats[i] is parent for players bets, this.images.pots[i] is parent for pots
    this.displayChipStack = function(chipAmount,parentOfChipArray, initialX, initialY, distanceBetweenColumns){
        //remove previous chips
        this.hideChildren(parentOfChipArray.chips)
        //reset chip array from memory
        parentOfChipArray.chips = []
        var x = initialX
        var y = initialY
        var chipIncrementY = this.images.pots[0].secondChip.position.y-this.images.pots[0].firstChip.position.y
        var totalChips = 0
        if(_.isNull(distanceBetweenColumns)||_.isUndefined(distanceBetweenColumns)){
            if(!_.isNull(parentOfChipArray.secondColumnChip.position.x) && !_.isUndefined(parentOfChipArray.secondColumnChip.position.x)&&!_.isNull(parentOfChipArray.firstChip.position.x)&&!_.isUndefined(parentOfChipArray.firstChip.position.x))
            {
                    var distanceBetweenColumns = parentOfChipArray.secondColumnChip.position.x-parentOfChipArray.firstChip.position.x}
                    }

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
            
            this.displayChip('1k',x,y, parentOfChipArray)
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

    this.addChildToContainer = function (child, containerIndex){
        
        this.images.containers[containerIndex].addChild(child)

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

 //get Width of a line of text from its parent Item, returns [width, fontSize]
 this.getTextWidthAndFontSize = function (parentOfTextObject, fontSize){
     if(parentOfTextObject instanceof this.images.Item){
         if(!fontSize){
           var pIndex =   parentOfTextObject.text.font.indexOf('p')
           var PIndex =  parentOfTextObject.text.font.indexOf('P')
           if(pIndex>=PIndex){var pLocation = pIndex}
           else if(pIndex<PIndex){var pLocation = pIndex}
           var fontSize = parentOfTextObject.text.font.substring(0,pLocation)
         }
     }
     var context = this.stage.canvas.getContext('2d')
     context.font = parentOfTextObject.text.font
     var textData = context.measureText(parentOfTextObject.text.text)
     return [textData.width, fontSize]
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
    self.addChildToContainer(self.images.community[i].image, self.images.community[i].position.z)
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
                           self.displayShownCard(holeCardArray[1], self.images.seats[playerArray[playerArrayNumber]].shownCard1)  
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
      //  this.hideChildren(this.images.stand)
         this.hideChildren(this.images.rebuy)
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
this.addChildToContainer(parentOfImageObject.image, parentOfImageObject.position.z)
            this.stage.update()
            }
    }
    
    this.displayText = function (parentOfTextObject){
        if(parentOfTextObject.text){
            this.addChildToContainer(parentOfTextObject.text, parentOfTextObject.position.z+1)
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

 this.hideAllActionButtons =function(){
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

 this.winners = function (pots, players){
     // player is array, so players[i].win = array[amountWon, amountWon]
      var animationTime = 800
      var timeBetweenAnimations = 400
      var timeAtEnd = 700
        var ticks = 40
        var chipStacks = []
        for(var i = 0;i<players.length;i++)
        {
            chipStacks.push([])
        }
        var callbackNumber = 0
        //push animateImages into an array
       // we want to end up with an array of these for each pot: [seatNumber, amount]
       var potWinners = []
       var temporaryStacks = []
    var potIntoChipAnimationArray = []
    var callbacks = []
    var finalArray = []
   var chipsInFrontOfPlayer =[]
    for(var i =0;i<self.images.seats.length;i++){
    chipsInFrontOfPlayer.push(0)}
       for(var i=0;i<pots.length;i++){
           //increase the length of data array to match number of pots
          potWinners.push([])
          //increase the length of animation array to match number of pots
           potIntoChipAnimationArray.push([])
           for(var n=0;n<players.length;n++){
              var winnings =  players[n].win[i]
              if(amountWon>0){potWinners[i].push({seat:players[n].seat, amountWon: winnings, id:temporaryStacks.length })}
               temporaryStacks.push([])
           }
       }

       //now we create arrays of functions for animations FROM pot TO player
        _.each(_.range(potWinners), function(potNumber) {
            var callID = 0
            //skip pot if empty
            if(!_.isEmpty(potWinners[potNumber])){
                callbacks.push({callback:{}})
                //iterate through all the data of winners in  potWinners[potNumber]
                _.each(potWinners[potNumber], function(i) {
                    //calculate distance each trip will travel based on bottom chip
                var animationDistanceX = self.images.seats[potWinners[potNumber][i].seat].firstChip.position.x - self.images.pots[potNumber].firstChip.position.x 
                var animationDistanceY = self.images.seats[potWinners[potNumber][i].seat].firstChip.position.y - self.images.pots[potNumber].firstChip.position.y 
                //calculate distance between first and second chip column
                var columnDistance = self.images.seats[potWinners[potNumber][i].seat].secondColumnChip.position.x - self.images.seats[potWinners[potNumber][i].seat].firstChip.position.x 

                //display chips in pot
                self.displayChipStack(potWinners[potNumber][i.amountWon], temporaryStacks[potWinners[potNumber][i].id], self.images.pots[potNumber].firstChip.position.x, self.images.pots[potNumber].firstChip.position.y, columnDistance)
                //iterate through chipstack to push animations of each chip into an array
                _.each(_.range(temporaryStacks[potWinners[potNumber][i].id].chips), function(n){

potIntoChipAnimationArray[potNumber].push(function(callback){
      self.animateImage(temporaryStacks[potWinners[potNumber][i].id].chips[n].position.x, temporaryStacks[potWinners[potNumber][i].id].chips[n].position.y, temporaryStacks[potWinners[potNumber][i].id].chips[n].position.x +animationDistanceX, temporaryStacks[potWinners[potNumber][i].id].chips[n].position.y+ animationDistanceY, function(){callback(null, callID)})
     
                }) 

                callID++
                
                })

                })
                callbackNumber++
    }
    })

    var errorNumber = 0
    _.each(_.range(potIntoChipAnimationArray), function(potNumber){
        if(!_isEmpty(potNumber)){

        finalArray.push(

           function(next){
               //remove chip images from pot
               self.hideChildren(self.images.pots[potNumber].chips)
               self.hideChildren(self.images.pots[potNumber].potSize)
    async.parallel(chipIntoPotAnimationArray[potNumber], function(err, results){next(null, errorNumber)})
})
errorNumber++
 finalArray.push(function(next){

     _.each(potWinners[potNumber], function(i) {
         //define seatNumber
         var seatNumber = potWinners[potNumber][i].seat
         //update how many chips a player has
         chipsInFrontOfPlayer[seatNumber] = potWinners[potNumber][i].amountWon + chipsInFrontOfPlayer[seatNumber]
    self.displayChipStack(chipsInFrontOfPlayer[seatNumber], self.images.seats[seatNumber], self.images.seats[seatNumber].chips.firstChip.position.x, self.images.seats[seatNumber].chips.firstChip.position.y)
   
    self.images.seats[seatNumber].betSize =  chipsInFrontOfPlayer[seatNumber]
    //remove temporary animated chipstack
    self.hideChildren(temporaryStacks[potWinners[potNumber][i].id].chips)

var wait = setTimeout(function(){
    
    next(null, errorNumber)

}, timeBetweenAnimations)

})
 })
    errorNumber++

 }})

 async.series([finalArray])
 }

    this.displayopenSeats = function(openSeats){
        
for (var i = 0; i < openSeats.length; i = i + 1)
        {this.displayImage(this.images.seats[openSeats[i]].openSeat)
        this.displayText(this.images.seats[openSeats[i]].openSeat)}
    }

    this.displayInHandOptions = function(){
        
        this.displayChildren(this.images.foldToAnyBet)
        this.displayChildren(this.images.sitOutNextHand)
         this.displayChildren(this.images.sitOutNextBigBlind)
    }

    this.hideSeatedOptions = function(){
        this.hideChildren(this.images.foldToAnyBet)
         this.hideChildren(this.images.sitOutNextHand)
          this.hideChildren(this.images.sitOutNextBigBlind)
          this.hideChildren(this.images.getChips)
          this.hideChildren(this.images.rebuy)
          this.hideChildren(this.images.sitIn)
this.hideAllActionButtons()
    }

    this.displayBetSlider =function(minBet, maxBet, minIncrement){
       
        this.gameState.minBet = minBet
        this.gameState.maxBet = maxBet
        this.gameState.minIncrement = minIncrement

 //reset slider to original position and color
 this.images.betSlider.vertical.image.x =  this.images.betSlider.vertical.position.x
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
            
              if((this.gameState.userSeatNumber == false) || _.isNull(this.gameState.userSeatNumber)||_.isUndefined(this.gameState.userSeatNumber)){
                this.hideChildren(this.images.seats[seatNumber].disabledSeat)
            this.displayChildren(this.images.seats[seatNumber].openSeat)

            }
          else if(_.isNumber(this.gameState.userSeatNumber)) {
                
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

              if((this.gameState.userSeatNumber == false) || _.isNull(this.gameState.userSeatNumber)||_.isUndefined(this.gameState.userSeatNumber)){
                this.hideChildren(this.images.seats[seatNumber].disabledSeat)
            this.displayChildren(this.images.seats[seatNumber].openSeat)

            }
          else if(_.isNumber(this.gameState.userSeatNumber)) {
                
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

    this.playerToAct =function(seatNumber){

        //function that will convert hex to RGB
    var hexToRGB =     function(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    })

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null
}

//-function for extracting RGB  from a colorString
  var extractRGB = function(color){
      //check if fill color is in rgb format
           if(color.charAt(0) == ('r'||'R')){
               var colorsArray = []
               colorsArray = color.replace(/[^\d,]/g, '').split(',')
               red = parseInt(colorsArray[0])
               green = parseInt(colorsArray[1])
               blue = parseInt(colorsArray[2])
               
           }
           //check if fill color is in hexadecimal format
           else if(color.charAt(0)=='#'){
               var colorsObject = hexToRGB(color)
                red  = parseInt(colorsObject.r)
                green = parseInt(colorsObject.g)
               blue = parseInt(colorsObject.b)
             
           }
        return[red, green, blue]   
}

//function for converting [r,g,b] array to:  rgb(r,g,b) format
var rgbArrayToString = function(rgbArray){
    
        colorString = 'rgb('+rgbArray[0]+','+rgbArray[1]+','+rgbArray[2]+')'
        return colorString
}

        var timeToChangeColors = 2000
        var ticksPerColorChange = 35
        var interval = timeToChangeColors/ticksPerColorChange
        var lastTick = ticksPerColorChange-1
         var tick = 0
         var originalFillColor = self.images.seats[seatNumber].seat.image.fillColor
         var targetFillColorsArray = [[255,0,0],[0,0,0]]
         var lastCompletedFillColorCounter = -1


         self.gameState.seats[seatNumber].toAct = true

//-----------start swapping colors until toAct becomes false----------------
              var countdown = setInterval(function() {
                 //get RGBA fill color of seat
           var currentFillColor =  self.images.seats[seatNumber].seat.image.fillColor
          var red; var green; var blue
          var previousTargetRed; var previousTargetGreen; var previousTargetBlue
          var targetRed; var targetGreen; var targetBlue
         var redIncreasePerTick; var greenIncreasePerTick; var blueIncreasePerTick
         var nextRed; var nextGreen; var nextBlue
         
//===================extract RGB values from current fill color ==================
var currentColors = extractRGB(currentFillColor)
red = currentColors[0]
green = currentColors[1]
blue = currentColors[2]

//==============previous fill colorRGB exraction===================

//use original fill color as last fill color if havent reached first "target color"
if(lastCompletedFillColorCounter == -1){

   var lastColors = extractRGB(originalFillColor)
   previousTargetRed = lastColors[0]
   previousTargetGreen = lastColors[1]
   previousTargetBlue = lastColors[2]
}

//use last fill color of iteration as last fill color
else{
    var previousArrayNumber = lastCompletedFillColorCounter%targetFillColorsArray.length
    var lastColorString = rgbArrayToString(targetFillColorsArray[previousArrayNumber])
    var lastColors = extractRGB(lastColorString)
    previousTargetRed = lastColors[0]
   previousTargetGreen = lastColors[1]
   previousTargetBlue = lastColors[2]
   }
//================Target fill color RGB extraction =======================
var targetArrayNumber = (lastCompletedFillColorCounter+1)%targetFillColorsArray.length
var targetColorString = rgbArrayToString(targetFillColorsArray[targetArrayNumber])
var targetColors =     extractRGB(targetColorString)
    targetRed = targetColors[0]
    targetGreen = targetColors[1]
    targetBlue = targetColors[2]
  
    //calculate difference per tick per tick of each color
     redIncreasePerTick = (targetRed-previousTargetRed)/ticksPerColorChange
     greenIncreasePerTick = (targetGreen-previousTargetGreen)/ticksPerColorChange 
     blueIncreasePerTick = (targetBlue-previousTargetBlue)/ticksPerColorChange

     //calculate next RGB colors
nextRed = parseInt(red + redIncreasePerTick)
nextGreen = parseInt(green + greenIncreasePerTick)
nextBlue = parseInt(blue + blueIncreasePerTick)
//if target color has been reached, increase lastCompletedFillColorCounter
var nextCounter = lastCompletedFillColorCounter+1
    if(redIncreasePerTick < 0){
        if(nextRed<=targetRed){ lastCompletedFillColorCounter = nextCounter}
    }
    if(redIncreasePerTick > 0){
        if(nextRed>=targetRed){ lastCompletedFillColorCounter = nextCounter}
    }
   if(greenIncreasePerTick < 0){
        if(nextGreen<=targetGreen){lastCompletedFillColorCounter = nextCounter}
    }
    if(greenIncreasePerTick > 0){
        if(nextGreen>=targetGreen){ lastCompletedFillColorCounter = nextCounter}
    }
   if(blueIncreasePerTick < 0){
        if(nextBlue<=targetBlue){ lastCompletedFillColorCounter = nextCounter}
    }
    if(blueIncreasePerTick > 0){
        if(nextBlue>=targetBlue){ lastCompletedFillColorCounter = nextCounter}
    }

//make sure next colors do notgo higher or lower than 255/0
    if(nextRed>255){nextRed = 255}
    if(nextGreen>255){nextGreen = 255}
    if(nextBlue >255){nextBlue = 255}
     if(nextRed<0){nextRed = 0}
    if(nextGreen<0){nextGreen = 0}
    if(nextBlue <0){nextBlue = 0}

    //concatanate to create new fill color
    newFillColor = rgbArrayToString([nextRed, nextGreen, nextBlue])

    self.images.seats[seatNumber].seat.image.drawSeat(self.images.seats[seatNumber].seat.image.borderColor, newFillColor, self.images.seats[seatNumber].seat.image.middleDividerColor)
    self.stage.update()
    
                if (self.gameState.seats[seatNumber].toAct==false)
                  {
                      clearInterval(countdown)
                     self.images.seats[seatNumber].seat.image.drawSeat(self.images.seats[seatNumber].seat.image.borderColor, originalFillColor, self.images.seats[seatNumber].seat.image.middleDividerColor)
                      }
        },interval)

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

      if(buttonText){
          if(parentOfImageObject.text && parentOfImageObject.text.text){parentOfImageObject.text.text = buttonText}}
      if(messages){parentOfImageObject.messages = messages}
      if(parentOfImageObject.button && parentOfImageObject.bitmapAnimation && parentOfImageObject.button instanceof createjs.ButtonHelper){
          this.addChildToContainer(parentOfImageObject.bitmapAnimation, parentOfImageObject.position.z)
          parentOfImageObject.bitmapAnimation.gotoAndStop(0)
      }
    else if( parentOfImageObject.image){  
    if(parentOfImageObject.onClick == null){
    parentOfImageObject.image.onClick = self.events.onButtonClick
      parentOfImageObject.image.onPress = self.events.buttonMouseDown
      }
     this.displayChildren(parentOfImageObject)
     }
 
    }

    this.hideButton = function (parentOfImageObject, messages){
        this.hideChildren(parentOfImageObject)
        if(messages){parentOfImageObject.messages = messages}
        // parentOfImageObject.image.onClick = null
    }
    
    this.hideCashier = function(){

        //enable TableChatBox
        if($('#chat').attr("readonly") == true||'readonly'){
            self.gameState.tableChatBox.display = false
       self.enableTableChatBox()
       }

                $('#cashier').css('display','none')

                self.restoreActiveContainers(self.gameState.cashier.activeContainers)
        self.gameState.cashier.display = false

                 $('#maxRadio').prop('checked', false)
          $('#autoRebuyRadio').prop('checked', false)
          $('#otherAmountRadio').prop('checked', false)
          
          $("#otherAmount").val('')
           $('#autoRebuyAmount').val('')
           $('#maxAmount').val('')
           //hide cashier children
           self.hideChildren(self.images.cashier)

    }

    this.hideMessageBox = function(){

        self.hideChildren(self.images.messageBox[self.gameState.messageBox.messageBoxImageContainerIndex])
        if(self.gameState.messageBox.messageBoxImageContainerIndex == self.gameState.containerImageIndexes.initialMessageBox){     
            
        if(self.gameState.cashier.display === true){
            $('#cashier').css('display','inline')
        }

        //enable tableChatBox if necessary
      else  if(self.gameState.tableChatBox.display == true){ self.enableTableChatBox()}

        }

self.restoreActiveContainers(   self.gameState.messageBox.activeContainers[self.gameState.messageBox.messageBoxImageContainerIndex])
        self.gameState.messageBox.messageBoxImageContainerIndex = self.gameState.messageBox.messageBoxImageContainerIndex -2 
    }


    this.displayMessageBox = function(messageString, messageInfo){
       var messageBoxImageContainerIndex = this.gameState.containerImageIndexes.initialMessageBox

           for(var i= this.gameState.containerImageIndexes.initialMessageBox;i<self.images.containers.length;i++){
           if(self.images.containers[i] && self.images.containers[i].isVisible() == false){
                messageBoxImageContainerIndex = i
                i=self.images.containers.length
           }
        }

        self.images.messageBox[messageBoxImageContainerIndex] = {}

        //check if this is the first(bottom) messagebox displayed
        if(messageBoxImageContainerIndex == this.gameState.containerImageIndexes.initialMessageBox){
       //hide html cashier(if visible)
       if( $('#maxRadio').is(':visible')){
           console.log('cashier being hidden')
       self.gameState.cashier.display = true
       $('#cashier').css('display', 'none')
       }
       else{self.gameState.cashier.display = false}
       
       //check if tableChatBox is readonly
      if($('#chat').attr("readonly") == true){}
      else{
       this.gameState.tableChatBox.display = true
       this.disableTableChatBox()
       }
       }


       //set current messageBox as top messageBoxImagContainerIndex
        self.gameState.messageBox.messageBoxImageContainerIndex = messageBoxImageContainerIndex

        //store active containers for retreival later
        self.gameState.messageBox.activeContainers[messageBoxImageContainerIndex] = self.storeActiveContainers()
        var messageBoxWindowWidth = 516
        var messageBoxWindowHeight = 199
        //declare size variables
  
        var closeXWidth = 31
        var closeXHeight = 20
        var closeXTopOffset = 1
        var closeXRightOffset = 7

         var outerTopHeight = 31
                var outerBottomHeight = 8
        var outerSideWidth = 8

        var asdf = document.getElementById('canvas')
        var stageWidth = asdf.width
        var stageHeight = asdf.height
        var messageBoxWindowX = stageWidth/2 - messageBoxWindowWidth/2
        var messageBoxWindowY = stageHeight/2 - messageBoxWindowHeight/2
        

        var innerMessageBoxX = messageBoxWindowX+outerSideWidth
        var innerMessageBoxY = messageBoxWindowY+outerTopHeight
        var innerMessageBoxWidth = messageBoxWindowWidth-2*outerSideWidth 
        var innerMessageBoxHeight = messageBoxWindowHeight-outerBottomHeight-outerTopHeight

        var textHeight = 30
        var textLeftOffset = 10
        var textTopOffset = 10
        var textX = innerMessageBoxX + textLeftOffset

        var buttonWidth = 50
        var buttonHeight = 22

        var distanceBetweenButtons = 30
        var buttonButtomOffset = 15 //distance from end of gray area to bottom of button
        var buttonY = messageBoxWindowY + messageBoxWindowHeight - outerBottomHeight - buttonButtomOffset - buttonHeight

         //-------------------set defaults---------------------------
         //set default font sizes and colors
       if(_.isNull(messageInfo.title)||_.isUndefined(messageInfo.title)||!(_.isString(messageInfo.title)||!_.isNumber(messageInfo.title))){messageInfo.title = 'Error'}
       if(_.isNull(messageInfo.titleSizeAndFont)||_.isUndefined(messageInfo.titleSizeAndFont)){messageInfo.titleSizeAndFont = '18px Arial'}
       if(_.isNull(messageInfo.titleColor)||_.isUndefined(messageInfo.titleColor)){ messageInfo.titleColor = '#000000'}
       if(_.isNull(messageInfo.sizeAndFont)||_.isUndefined(messageInfo.sizeAndFont)){messageInfo.messageSizeAndFont = '13px Arial'}
    if(_.isNull(messageInfo.messageColor)||_.isUndefined(messageInfo.messageColor)){ messageInfo.messageColor = '#000000'}
    if(_.isNull(messageInfo.buttonSizeAndFont)||_.isUndefined(messageInfo.buttonSizeAndFont)){messageInfo.buttonSizeAndFont = '13px Arial'}
     if(_.isNull(messageInfo.buttonTextColor)||_.isUndefined(messageInfo.buttonTextColor)){ messageInfo.buttonTextColor = '#000000'}
    if(_.isNull(messageInfo.buttonBackgroundColor)||_.isUndefined(messageInfo.buttonBackgroundColor)){ messageInfo.buttonBackgroundColor = '#0000FF'}
    if(_.isNull(messageInfo.okayText)||_.isUndefined(messageInfo.Text)){ messageInfo.okayText = 'OK'}
    if(_.isNull(messageInfo.cancelText)||_.isUndefined(messageInfo.cancelText)){ messageInfo.cancelText = 'Cancel'}



       //set button locations
    if(messageInfo.cancel != true){
        var okayX = stageWidth/2 - buttonWidth/2
        }
        else{
     var okayX =    stageWidth/2 - distanceBetweenButtons/2 - buttonWidth    
     var cancelX =  stageWidth/2 + distanceBetweenButtons/2 
        }
  
        //background bitmap
        self.images.messageBox[messageBoxImageContainerIndex].window = new self.images.Item(messageBoxWindowX,messageBoxWindowY,messageBoxWindowWidth,messageBoxWindowHeight,messageBoxImageContainerIndex)
        self.images.itemAsBitmap(self.images.messageBox[messageBoxImageContainerIndex].window, self.images.sources.messageBoxBackground)
        
        //title
        self.images.messageBox[messageBoxImageContainerIndex].windowTitle = new self.images.Item (messageBoxWindowX,messageBoxWindowY, messageBoxWindowWidth,outerTopHeight,messageBoxImageContainerIndex)
         self.images.addItemText(self.images.messageBox[messageBoxImageContainerIndex].windowTitle, messageInfo.title, messageInfo.titleSizeAndFont, messageInfo.titleColor)

         //message
        self.images.messageBox[messageBoxImageContainerIndex].message = new self.images.Item (textX,innerMessageBoxY+textTopOffset, innerMessageBoxWidth -textLeftOffset*2 ,textHeight,messageBoxImageContainerIndex)
        self.images.addItemText(self.images.messageBox[messageBoxImageContainerIndex].message, messageString, messageInfo.messageSizeAndFont, messageInfo.messageColor)

   //OK button
        self.images.messageBox[messageBoxImageContainerIndex].okay =  new self.images.Item (okayX,buttonY, buttonWidth,buttonHeight,messageBoxImageContainerIndex) 
        self.images.itemAsRectangle( self.images.messageBox[messageBoxImageContainerIndex].okay, messageInfo.buttonBackgroundColor )
        self.images.addItemText( self.images.messageBox[messageBoxImageContainerIndex].okay, messageInfo.okayText, messageInfo.buttonSizeAndFont,  messageInfo.buttonTextColor)
            //asign messages if exists
            if(messageInfo.okayMessages){    
            self.images.messageBox[messageBoxImageContainerIndex].okay.messages = messageInfo.okayMessages}
                //assign event if assigned
               
       if(messageInfo.okayEvent){
           self.images.messageBox[messageBoxImageContainerIndex].okay.image.onClick = messageInfo.okayEvent
           }
      else{
            self.images.messageBox[messageBoxImageContainerIndex].okay.image.onClick = self.events.onButtonClick
        self.images.messageBox[messageBoxImageContainerIndex].okay.image.onClick = self.hideMessageBox
        }
//cancel button
        if(messageInfo.cancel){
        self.images.messageBox[messageBoxImageContainerIndex].cancel =  new self.images.Item (cancelX,buttonY, buttonWidth,buttonHeight,messageBoxImageContainerIndex) 
        self.images.itemAsRectangle( self.images.messageBox[messageBoxImageContainerIndex].cancel, messageInfo.buttonBackgroundColor )
        self.images.addItemText( self.images.messageBox[messageBoxImageContainerIndex].cancel, messageInfo.cancelText, messageInfo.buttonSizeAndFont,  messageInfo.buttonTextColor)
        //add message to cancel if available
        if(messageInfo.cancelMessages){
          self.images.messageBox[messageBoxImageContainerIndex].cancel.messages = messageInfo.cancelMessages
          }
          //add cancel event if availble
           if(messageInfo.cancelEvent){
               self.images.messageBox[messageBoxImageContainerIndex].okay.image.onClick = messageInfo.cancelEvent
               }
       else{  
        self.images.messageBox[messageBoxImageContainerIndex].cancel.image.onClick = self.hideMessageBox
        }
       }
        //add closeX Image
        var closeX =messageBoxWindowX+messageBoxWindowWidth- closeXRightOffset- closeXWidth
        var closeY =  messageBoxWindowY+ closeXTopOffset
         self.images.messageBox[messageBoxImageContainerIndex].closeWindow =  new self.images.Item (closeX, closeY,closeXWidth,closeXHeight,messageBoxImageContainerIndex) 
       self.images.itemAsBitmap(self.images.messageBox[messageBoxImageContainerIndex].closeWindow, self.images.sources.messageBoxCloseX)
        self.images.messageBox[messageBoxImageContainerIndex].closeWindow.image.onClick = self.hideMessageBox

        //disable mouse events for all containers under the messageBox
        for(var i = 0; i<messageBoxImageContainerIndex;i++){
            self.images.containers[i].mouseEnabled = false
        }

                self.displayChildren(self.images.messageBox[messageBoxImageContainerIndex])
              
    }


    this.displayCashier = function(info)
    {
        

      var cashierImageContainerIndex = this.gameState.containerImageIndexes.cashier


      //disable tableChatBox

      if($('#tableChatBox').attr("readonly") == true){}
      else{
       this.gameState.tableChatBox.display = true
       this.disableTableChatBox()
       }


        this.gameState.cashier.min = info.min
        this.gameState.cashier.max = info.max
        this.gameState.cashier.balance = info.balance
        this.gameState.cashier.table_name = info.table_name
        this.gameState.cashier.small_blind = info.small_blind
        this.gameState.cashier.big_blind = info.big_blind
        this.gameState.cashier.currency = info.currency
        //set defaults
        if(_.isUndefined(info.currency_per_chip)||_.isNull(info.currency_per_chip)){info.currency_per_chip = 1}
        if(_.isUndefined(info.currency)||_.isNull(info.currency)){info.currency = 'Chips'}

       this.images.cashier.blinds.text.text = info.currency_per_chip*info.small_blind+'/'+info.currency_per_chip*info.big_blind

         this.images.cashier.tableNameValue.text.text = info.table_name

        this.images.cashier.tableMinValue.text.text = info.currency_per_chip*info.table_min

        this.images.cashier.tableMaxValue.text.text = info.currency_per_chip*info.table_max

        this.images.cashier.playerMinValue.text.text = info.currency_per_chip*info.min

       this.images.cashier.accountBalanceValue.text.text = info.currency_per_chip*info.balance

       this.images.cashier.currency.text.text = info.currency+':'

       //set initial values of text boxes
             $("#otherAmount").val('')
           $('#autoRebuyAmount').val('')
       $("#maxAmount").val(info.max)
        $("#maxAmount").attr("readonly", true)

//check radio buttons when textbox is focused

    $("#otherAmount").focus(function() {
                 $('#maxRadio').prop('checked', false)
          $('#autoRebuyRadio').prop('checked', false)
          $('#otherAmountRadio').prop('checked', true)
          //do nothing if amount to add is acceptable
          if(typeof parseFloat($("#otherAmount").val()) == 'number' &&  parseFloat($("#otherAmount").val()) >=self.gameState.cashier.min){}
          else{
              
          $("#otherAmount").val(self.gameState.cashier.min)

          //select text on clicking
           $("#otherAmount").one('mouseup', function(event){
        event.preventDefault();
       }).select()
          }
        })

            $("#autoRebuyAmount").focus(function() {
        
         $('#maxRadio').prop('checked', false)
          $('#otherAmountRadio').prop('checked', false)
          $('#autoRebuyRadio').prop('checked', true)
          //do nothing if autorebuy is acceptable
           if(typeof parseFloat($("#autoRebuyAmount").val()) == 'number' &&  parseFloat($("#autoRebuyAmount").val()) >=info.table_min){}
          else{
          $("#autoRebuyAmount").val(info.table_min)
          //select text on clicking
           $("#autoRebuyAmount").one('mouseup', function(event){
        event.preventDefault();
       }).select()
          }
        })
        

          $("#maxAmount").focus(function() {
        
         $('#maxRadio').prop('checked', true)
          $('#otherAmountRadio').prop('checked', false)
          $('#autoRebuyRadio').prop('checked', false)
        })

//display textboxes for adding chips
          var htmlcashier = document.getElementById('cashier')
    htmlcashier.style.display = 'inline'

      
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
    
this.streetEnds = function(potSize){
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
    self.displayChipStack(parseFloat(self.images.pots[0].potSize.text.text), self.images.pots[0], self.images.pots[0].firstChip.position.x, self.images.pots[0].firstChip.position.y)
    self.removeAllBets()
    next(null, 2)
}
  ])

}


   this.displayInitialTableState=function(tableState){

                 //display static items
         this.displayChildren(this.images.getChips)
         this.displayChildren(this.images.viewLobby)
         this.displayChildren(this.images.exitTable)
        
         //get table_state if not passed as parameter
        if(tableState){table_state = tableState}
        else{var table_state = $('#server_values').data('table_state')
        //console.log(table_state)
        }
        //remove extra seats
        for (var i = 9;i>=table_state.max_players;i=i-1){
            this.images.seats[i] = null
            this.gameState.seats[i] = null
        }
        
        //comunity cards
        this.displayAllCommunity(table_state.community)
        
                //display seats and assign userSeatNumber
         for (var i = 0;i< table_state.seats.length;i++) { 
          //assign userSeatNumber if player is user
         if(table_state.seats[i].is_you == true){ 
         this.gameState.userSeatNumber = table_state.seats[i].seat 
         //iterate through players array to get the index of user
         for(var n=0;n<table_state.players.length;n++){
             if(table_state.players[n].seat == this.gameState.userSeatNumber)
         var userPlayerArrayIndex = n
         }

      //   self.displayChildren(self.images.stand)

//======================display user's flag settings=====================================
         //display foldToAnyBetButton depending on user's flag
         if(table_state.seats[i].flags){
              //check if user is holding cards
         if(!_.isUndefined(userPlayerArrayIndex)&&table_state.players[userPlayerArrayIndex].hand){
         if(table_state.seats[i].flags.check ==true && table_state.seats[i].flags.fold == true){
        
         
             self.displayChildren(self.images.foldToAnyBetOn)}
             else{ self.displayChildren(self.images.foldToAnyBet)}
             }

             //display sitout next hand depending on user's flag
              if(table_state.seats[i].flags.sitting_out == true){
             self.displayChildren(self.images.sitOutNextHandOn)}
             else{self.displayChildren(self.images.sitOutNextHand)}

          
                  //check if user is sitting in
                  if(table_state.seats[i].sitting_out == true){
                       //either display rebuy OR sitin if user is sitting out
             if(table_state.seats[i].chips == 0){
                 self.displayChildren(self.images.rebuy)}
                 else{ self.displayChildren(self.images.sitIn)}
         }

         //if user is not sitting out
         else{
                    //display sit out next big blind depending on user's flag
              if(table_state.seats[i].flags.post_blind == false){self.displayChildren(self.images.sitOutNextBigBlindOn)}
                    else{self.displayChildren(self.images.sitOutNextBigBlind)}
             }
  
         }
         }

         //non-user seated players
         this.playerSits(table_state.seats[i].seat,table_state.seats[i].username,table_state.seats[i].chips)
        if(table_state.seats[i].sitting_out == true){
            self.images.seats[table_state.seats[i].seat].status.text.text = "Sitting Out"
        }
         }
         


        //display player's cards
         for(var i=0;i<table_state.players.length;i=i+1){
               if(!table_state.players[i].hand){
                   this.displayHiddenCards(table_state.players[i].seat)
                   }
              
                   else if(table_state.players[i].hand) {
        this.displayHoleCards(table_state.players[i].hand, table_state.players[i].seat)
        }
        }

        //pot
        if(table_state.pot&&table_state.pot>0){this.updatePotSize(table_state.pot)}

         //current bets
         for (var i=0;i<table_state.players.length;i=i+1) { 
         this.playerPutsChipsInPot(table_state.players[i].seat,table_state.players[i].current_bet, table_state.players[i].chips)
         this.displayChipStack(table_state.players[i].current_bet, self.images.seats[table_state.players[i].seat], self.images.seats[table_state.players[i].seat].firstChip.position.x, self.images.seats[table_state.players[i].seat].firstChip.position.y)
         }

          //empty seats
         for (var i = 0; i<table_state.max_players;i++){    this.displayCorrectSeatMessage(i)    }

         
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
       self.streetEnds(potSize)
    })

    //error received
       socket.on('error', function(errorString){
           var messageInfo = {}
          errorString
           messageInfo.okay = true
            self.displayMessageBox(errorString, messageInfo)
                
})
        
 //player is refunded chips
       socket.on('player_gets_refund', function(player){
           var stackSize = player.chips
           var betSize = player.current_bet
           var seatNumber = player.seat

          self.playerPutsChipsInPot(seatNumber, betSize, stackSize)
           self.displayChipStack(betSize, self.images.seats[seatNumber], self.images.seats[seatNumber].firstChip.position.x, self.images.seats[seatNumber].firstChip.position.y)
                
})


    //community cards are dealt
       socket.on('community_dealt', function(community){

      //      self.removeAllBets()
            self.dealCommunity(community)
       //     self.displayAllCommunity(community)
                
})

socket.on('hands_dealt', function(players, tableInfo){
    //show dealer button
    self.images.dealerButton.image.x = self.images.seats[tableInfo.dealer].dealerButton.position.x
     self.images.dealerButton.image.y = self.images.seats[tableInfo.dealer].dealerButton.position.y
     self.displayChildren(self.images.dealerButton)
     console.log(self.images.dealerButton)
     console.log(self.images.dealerButton.image.isVisible())
    //deal cards
    var playerArray = []
    for(var i = 0; i<players.length;i++){playerArray.push(players[i].seat)}

    if(self.gameState.holeCards) { 
    self.dealHoleCards(tableInfo.small_blind_seat,playerArray, self.gameState.holeCards)
    self.displayInHandOptions()
    }
    else{self.dealHoleCards(playerArray[0],playerArray)}
    self.gameState.holeCards = null
})


//hand dealt to user
       socket.on('hole_cards_dealt', function(hand){
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
            self.hideChildren(self.images.foldToAnyBet)
            self.hideChildren(self.images.foldToAnyBetOn)

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
             self.gameState.seats[player.seat].toAct = false
})

//user to act 
 socket.on('act_prompt', function(actions, timeout){

     self.startCountdown(self.gameState.userSeatNumber,Math.round(timeout/1000))
self.playerToAct(self.gameState.userSeatNumber)
     for (var i = 0; i < actions.length; i++){
     if (typeof actions[i].fold !== 'undefined'){
         self.displayButton(self.images.fold, false, ['act','fold'])
        }
       else if (actions[i].check !== undefined){
         self.displayButton(self.images.check,false,['act','check'])
         }
      else   if (actions[i].call){
             self.images.call.text.text = 'Call '+actions[i].call
         self.displayButton(self.images.call,false,['act','call',actions[i].call])
         }
       else  if (actions[i].raise){
         self.displayButton(self.images.raise,'raise to '+actions[i].raise[0],['act','raise', actions[i].raise[0]])
         self.displayBetSlider(actions[i].raise[0], actions[i].raise[1], 1)
         }
      else if (actions[i].bet){
         self.displayButton(self.images.bet,'bet '+actions[i].bet[0] ,['act','bet',actions[i].bet[0]])
         self.displayBetSlider(actions[i].bet[0], actions[i].bet[1], 1)
         }
         }
})

//player to act (not the user)
 socket.on('player_to_act', function(player, timeout){
    var timeToCountDown = 3000
     self.playerToAct(player.seat)

     //do a countdown when time is low for non-user players
     if(player.seat != self.gameState.userSeatNumber){
     createjs.Tween.get(self.images.seats[player.seat].countdown)
     .wait(timeout-timeToCountDown)
    .call(self.startCountdown,[player.seat,Math.round(timeToCountDown/1000)],self)
     }
})

//player to act (not the user)
 socket.on('user_chats', function(chatInfo){
     //perform animation only if string is longer than 0 and is not purely spaces
  if (/\S/.test(chatInfo.message)){

  //remove previous tweens that may be running:
  createjs.Tween.removeTweens(self.images.seats[chatInfo.seat].chat.image)
  createjs.Tween.removeTweens(self.images.seats[chatInfo.seat].chat.text)

     self.images.seats[chatInfo.seat].chat.text.text = chatInfo.message
     originalImageAlpha = self.imageData.chatBoxAlpha

     var textShortened = false
     var width = self.getTextWidthAndFontSize(self.images.seats[chatInfo.seat].chat)[0]

     //loop to start excising end offscreenBuffering String if t
     if(width>self.images.seats[chatInfo.seat].chat.text.maxWidth){
    while(width>self.images.seats[chatInfo.seat].chat.text.maxWidth-3){
        //remove last character of text
        self.images.seats[chatInfo.seat].chat.text.text = self.images.seats[chatInfo.seat].chat.text.text.substring(0,self.images.seats[chatInfo.seat].chat.text.text.length-1) 
        width = self.getTextWidthAndFontSize(self.images.seats[chatInfo.seat].chat)[0]
   textShortened = true
    }
    }
    //add elipses .... to end of text if text was shortened
    if(textShortened == true){
        self.images.seats[chatInfo.seat].chat.text.text = self.images.seats[chatInfo.seat].chat.text.text + '...'
        width = self.getTextWidthAndFontSize(self.images.seats[chatInfo.seat].chat)[0]
    }
    //determind ratio of chat.text to chat.image
   var imageToTextWidthRatio =  self.images.seats[chatInfo.seat].chat.size.x/self.images.seats[chatInfo.seat].chat.text.maxWidth

    //determine width of tableChatBox
    var chatBoxWidth = imageToTextWidthRatio*width+2.5

    
    //draw new chatBox and set alpha to original alpha
    self.images.seats[chatInfo.seat].chat.image.drawChat(chatBoxWidth) // drawChat function resets alpha automatically
self.images.seats[chatInfo.seat].chat.text.alpha = 1

//display chat image and text
     self.displayChildren(self.images.seats[chatInfo.seat].chat)
     
      //tween image
     createjs.Tween.get(self.images.seats[chatInfo.seat].chat.image,{loop:false, override:true})
     .to({alpha:originalImageAlpha})
    .to({alpha:0}, 10000)
    .call(self.hideImage,[self.images.seats[chatInfo.seat].chat], self)
    .to({alpha:originalImageAlpha})

    //tween text
     createjs.Tween.get(self.images.seats[chatInfo.seat].chat.text,{loop:false, override:true})
     .to({alpha:1})
    .to({alpha:0}, 10000)
    .call(self.hideText,[self.images.seats[chatInfo.seat].chat], self)
    .to({alpha:1})
    }

})
//player sits in
       socket.on('player_sits_in', function(player){
           self.images.seats[player.seat].status.text.text = player.chips
  
        if(player.seat == self.gameState.userSeatNumber){
            self.hideChildren(self.images.sitIn)
            self.hideChildren(self.images.rebuy)
            self.hideChildren(self.images.sitOutNextHandOn)
            self.displayChildren(self.images.sitOutNextHand)
           
            
}
        self.stage.update()
})

//player sits out
       socket.on('player_sits_out', function(player){
           self.images.seats[player.seat].status.text.text = 'Sitting Out'
  
        if(player.seat == self.gameState.userSeatNumber){
            self.hideChildren(self.images.sitOutNextHand)
            self.displayChildren(self.images.sitOutNextHandOn)
            self.hideChildren(self.images.sitOutNextBigBlind)
            self.hideChildren(self.images.sitOutNextBigBlindOn)
            if(player.chips == 0){
                self.displayChildren(self.images.rebuy)
            }
            else{
            self.displayChildren(self.images.sitIn)
            }
}
        self.stage.update()
})


//player sits, checks if player is the user
       socket.on('player_sits', function(player, is_you){
         self.playerSits(player.seat, player.username, player.chips)
        if(is_you == true){
            self.gameState.userSeatNumber = player.seat
            socket.emit('get_add_chips_info')
      //      self.displayChildren(self.images.stand, false, ['stand'])
            self.displayChildren(self.images.getChips)
     //   self.displayChildren(self.images.stand)

        //refresh open seats to disabled seats
        for (var i = 0;i<self.images.seats.length;i++){self.displayCorrectSeatMessage(i) }
        }

})

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
  )
  
  //player sets a flag
       socket.on('player_sets_flag', function(player){
        console.log(player)
        
        }
  )


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
            if(player.chips>0){self.hideChildren(self.images.rebuy)
            if (player.sitting_out == true){self.displayChildren(self.images.sitIn)}
            }
        }
        self.stage.update()
 }  );   


//round ends, all hole cards are shown
       socket.on('winners', function(players){
        

         //  self.winners()




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
     
    holdemCanvas.createAllItems()
   holdemCanvas.receiveTableState()
     console.log(document.getElementById('chatDiv'))
      console.log(document.getElementById('cashierDiv'))

    })
 /*
     tick=function(event) {
         if(holdemCanvas.gameState.countdownOn) {
       
    // console.log(createjs.Ticker.getMeasuredFPS())
 holdemCanvas.countdown()
    }
}
 
createjs.Ticker.addEventListener("tick", tick)
createjs.Ticker.setInterval(1000)
    
*/
