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
        createjs.Touch.enable(this.stage)
        this.stage.mouseEnabled = true
        this.stage.mouseMoveOutside =true
        this.stage.enableMouseOver()
            this.events = {}
  this.imageData = {
      maxChipsPerColumn:5,
      distanceBetweenChipColumns:4,
      chatBoxAlpha:0.75,
      maxChipColumns:3
  }
  this.userPreferences = {
      

      bigBlindsPerHorizontalSliderTick : 0.5,
      bigBlindsPerMouseScroll: 3,
      timePerHorizontalSliderTick: 500,
      animate: true,
      chatTextColor: '#FFFFFF'

  }
        this.gameState = {}
        this.gameState.betSize = new Number
        this.gameState.displaySize = 'normal'
        this.gameState.secondsToAct
        this.gameState.userSeatNumber = false
        this.gameState.seats = []

        for(var i = 0;i<maxSeats;i++){
             this.gameState.seats[i]= {}
             this.gameState.seats[i].displayMessageType = 'openSeat'
             this.gameState.seats[i].toAct = false
             this.gameState.seats[i].preActions = {}
             this.gameState.seats[i].preActions.once = {}
            this.gameState.seats[i].preActions.street = {}
             this.gameState.seats[i].preActions.hand = {}
             this.gameState.seats[i].flags = {}
        }
        this.gameState.cashier = {}
        this.gameState.tableChatBox = {}
        this.gameState.messageBox = {}
        this.gameState.messageBox.activeContainers = []
        this.gameState.containerImageIndexes = {
            
           
            background:0,
            holeCards:1,
            chips:5,
            communityCards:4,
            cardAnimation:6,
            button:2,
            chat:7,
             cashier:9,
            initialMessageBox:11,
            containersPerCashier:2,
            containersPerMessageBox:3,
            loadingBackground: 0,
            loadingAnimation: 1

        }

        this.images = {}
        this.images.loadingContainers = []

        this.images.containers = []
        for (var i = 0;i<16;i++){
        this.images.containers[i] = new createjs.Container()
        this.images.loadingContainers[i] = new createjs.Container()
     }

          this.images.sources = {
       //     call: 'img/call.jpg',
       //     check: 'img/check.jpg',
       //     raise: 'img/raise.jpg',
            hiddenCardFileName: 'back.png',
       //     seat: 'img/empty_seat.jpg',
      //      blankSeat : 'img/blank_seat.jpg',
       //     bet: 'img/bet.jpg',
      //      community: 'img/card_back.jpg',
     //       fold: 'img/fold.jpg',
      //      sideButton :'img/side_button.jpg',
            background: 'img/table_background_green.jpg',
     //       fourColorDeck: 'img/sheet4color.png',
            dealerButton: 'img/dealer_button_red.png',
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
            dealHoleCardSound: 'sound/deal_hole_card.wav',
            checkSound: 'sound/check.wav',
            betSound: 'sound/bet.wav',
            shuffleSound: 'sound/shuffle.wav',
            dealCommunity: 'sound/deal_community.wav',
            foldSound: 'sound/fold.wav',

moveChipsSound: 'sound/move_chips.wav',

            chips: {
                red:'img/chips/red_chip.png',
                black: 'img/chips/black_chip.png',
                10: 'img/chips/10.png'
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
            this.images.totalPotSize = {}
   
            this.images.fold = {text:{},messages:[]}
            this.images.call = {text:{},messages:[]}
            this.images.bet = {text:{},messages:[]}
            this.images.raise = {text:{},messages:[]}
            this.images.bet = {text:{},messages:[]}
            this.images.check = {text:{},messages:[]}
            this.images.betSlider ={}
            this.images.cashier  = {}
            this.images.messageBox=[]
            for(var i = 0;i<this.images.containers.length;i++){
              this.images.messageBox.push({})
            }
           

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
this.position.x = Math.floor(x)
this.position.y = Math.floor(y)
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

            //draws a seat
                  this.images.drawSeat = function (parent, borderColor, fillColor, middleDividerColor, options){
          if(parent.image instanceof createjs.Shape){}
          else{
              parent.image = new createjs.Shape()
              parent.image.parentOfImageObject = parent
          }

          if(options && options.outerStrokeWidth){var outerStrokeWidth = options.outerStrokeWidth}
            else{var outerStrokeWidth = 4}
if(options && options.middleDividerStrokeWidth){var middleDividerStrokeWidth = options.middleDividerStrokeWidth}
            else{var middleDividerStrokeWidth = 1}

              var x = parent.position.x + outerStrokeWidth/2; var y = parent.position.y + outerStrokeWidth/2
              var width = parent.size.x - outerStrokeWidth;  var height = parent.size.y - outerStrokeWidth

              parent.image.graphics.clear() //clear previous graphics on the shape
              parent.image.x = 0 //reset previous transformations of the image
              parent.image.y = 0
              parent.image.alpha = 1
   parent.image.snapToPixel = true

//draw border
 parent.image.graphics.setStrokeStyle(outerStrokeWidth,'square').beginStroke(borderColor).beginFill(fillColor).drawRect(x, y, width, height)

//draw filled area for countdown
if(options && options.borderFillRatio && _.isNumber(options.borderFillRatio) && options.borderFillRatio > 0){

//set new color as yellow
if(options && options.newFillColor){var newFillColor = options.newFillColor}
  else{newFillColor = '#FFFF00'}


parent.image.graphics.setStrokeStyle(outerStrokeWidth,'square').beginStroke(newFillColor)

var totalDistance = width*2+height*2
var distanceToFill = options.borderFillRatio*totalDistance

//start at upper left
parent.image.graphics.moveTo(x,y)

//start filling counterclockwise

//left side
if(distanceToFill>=height){
  parent.image.graphics.lineTo(x, y + height)
  distanceToFill = distanceToFill - height
}
else if (distanceToFill>0){

  parent.image.graphics.lineTo(x, y + distanceToFill)
distanceToFill = 0
}

//bottom
if(distanceToFill>=width){

  parent.image.graphics.lineTo(x+width, y+height)
  distanceToFill = distanceToFill - width
}
 else  if (distanceToFill>0){
  parent.image.graphics.lineTo(x + distanceToFill, y+height)
distanceToFill = 0
}

//right
if(distanceToFill>=height){

  parent.image.graphics.lineTo(x+width, y)
  distanceToFill = distanceToFill - height
}
 else if (distanceToFill>0){
  parent.image.graphics.lineTo(x+width, y + height -  distanceToFill)
distanceToFill = 0
}

//top
if(distanceToFill>=width){

  parent.image.graphics.lineTo(x, y)
  distanceToFill = distanceToFill - width
}
 else  if (distanceToFill>0){
  parent.image.graphics.lineTo(x + width - distanceToFill, y)
distanceToFill = 0
}

}//end playerToAct fill

    parent.image.graphics.setStrokeStyle(middleDividerStrokeWidth).beginStroke(middleDividerColor).moveTo(x+outerStrokeWidth/2,y+height/2).lineTo(x+width-outerStrokeWidth/2,y+height/2)
            
          parent.image.borderColor = borderColor
          parent.image.fillColor = fillColor
           parent.image.middleDividerColor = middleDividerColor
            parent.image.outerStrokeWidth = outerStrokeWidth
             parent.image.middleDividerStrokeWidth = middleDividerStrokeWidth

          
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

        if(event.target.parentOfImageObject.messages)(socket.emit.apply(socket, event.target.parentOfImageObject.messages))
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

this.events.cashierTextFieldFocused = function(event){

//select the text when highlighted
           $(event.target).one('mouseup', function(e){e.preventDefault()}).select()
          

}


this.events.cashierInputSelected = function(event){

var min

var allRadios = $(event.target.parentElement.parentElement).find("input[type='radio']")
var parentID = false

if(event.target.parentElement.id == 'otherAmountDiv')
{

  min = self.gameState.cashier.min
parentID = event.target.parentElement.id

}
else if (event.target.parentElement.id == 'autoRebuyDiv')
{

  min = self.gameState.cashier.table_min
parentID = event.target.parentElement.id
}

else if(event.target.parentElement.id == 'maxDiv'){
  min = self.gameState.cashier.max
parentID = event.target.parentElement.id

}

if(parentID){

//adjust radio buttons appropriately
//check if radio button is already checked
var radioInClickedDiv = $('#'+parentID).find("input[type='radio']")

if(radioInClickedDiv && radioInClickedDiv.prop('checked') == false){
allRadios.prop('checked', false)
          radioInClickedDiv.prop('checked', true)
}//end check if otherAmound radio is checked

//check if amount is acceptable
var textField= $(event.target.parentElement).find("input[type='text']")
var alreadySelected = false
          if(typeof parseFloat(textField.val()) == 'number' &&  parseFloat(textField.val()) >= min){}
         //set textfield value to minimum
          else{    
         textField.val(min)
                   //select text on clicking
           textField.select()
           alreadySelected = true
          }
          console.log(textField)
          if($(event.target).is("input[type='text']")){}
            else if (alreadySelected != true){   textField.select()   }

        }//end check if parentID exists/not false

}

this.events.onCashierTextFieldFocus = function(event){

  $(event.target).one('mouseup', function(event){event.preventDefault()}).select()

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
    this.events.onStagePress = function(event){
        
         $(':text').blur()

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

         var lobbyName = "Lobby"
         window.open('/lobby', lobbyName, 'width=800,height=770 ,left=200,top=200,location=0,toolbar=no,menubar=no,titlebar=no,directories=no,scrollbars=yes');
    //     window.open('/lobby')

    }

    this.events.exit = function(event){
        socket.emit('stand')
          var win = window.open('', '_self')
          win.close()
    }

     //===============START BET SLIDER===================

    this.events.wheelScroll = function(numScrolls){
      if(_.isNumber(numScrolls) == false){return 'scroll failed'}
      var change = numScrolls*self.userPreferences.bigBlindsPerMouseScroll*self.gameState.bigBlind
          var betValue  = parseFloat($('#betSize').val())
    var isBetValueValid = ( !isNaN(betValue)) && _.isNumber(betValue) 
     if(isBetValueValid == true){ var newBet = change+betValue} //use current value
      else{var newBet = change + self.gameState.betSize} //use previous known value if current value is invalid
console.log(newBet+'before rounding')
        //round the new  bet
      newBet = self.returnRoundedDownBetSize(newBet)
      console.log(newBet+'after rounding')
        self.adjustBetDisplay(newBet)
    }

     this.events.betSliderHorizontalMouseDown = function(event){

        var minX = self.images.betSlider.horizontal.position.x
         var maxX = self.images.betSlider.horizontal.position.x + self.images.betSlider.horizontal.size.x-self.images.betSlider.vertical.size.x
       
         var pixelsPerTick = self.gameState.bigBlind*self.userPreferences.bigBlindsPerHorizontalSliderTick/(self.gameState.maxBet-self.gameState.minBet)*(maxX-minX)
          

         //takes vertical slider location and proportionaly shows bet size
           var adjustBetSize = function (){

      betSizePercent = (self.images.betSlider.vertical.image.x-minX)/(maxX-minX)
     unroundedBetAmount =  betSizePercent*(self.gameState.maxBet-self.gameState.minBet)+self.gameState.minBet
     roundedBet = Math.round(unroundedBetAmount/self.gameState.minIncrement)*self.gameState.minIncrement

self.adjustBetDisplay(roundedBet)
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

self.adjustBetDisplay(roundedBet)
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

self.adjustBetDisplay(roundedBet)
 }
 }

this.events.betSizeUnfocused = function(event){
console.log('betsizeunfocused called')
    var newBetSize  = parseFloat($('#betSize').val())
    var isNumber = ( !isNaN(newBetSize)) && _.isNumber(newBetSize) 
    var roundedBetSize
    //if not a number use last known number and round
    if(isNumber == false ){ 

      roundedBetSize = self.returnRoundedDownBetSize(self.gameState.betSize)}
    else{roundedBetSize =  self.returnRoundedDownBetSize(newBetSize)}

  //insure rounded bet is not less or greater than max or min and set appropriately
    if(roundedBetSize>self.gameState.maxBet){roundedBetSize = self.gameState.maxBet}
        else if(roundedBetSize<self.gameState.minBet){roundedBetSize = self.gameState.minBet}

if(roundedBetSize!=newBetSize){
 //make adjustments to bet sliders
        self.adjustBetDisplay(roundedBetSize)
}
//set raise and bet onclick events to default
self.images.bet.image.onClick = self.events.onButtonClick
self.images.raise.image.onClick = self.events.onButtonClick

           
}



this.events.betSizeChanged = function(){
  console.log('betsize changed')
    //check if betSize value is different than the old value and is not empty
    var newBetSize = parseFloat($('#betSize').val())
  var hasValue = /\S/.test($('#betSize').val())

    var isNumber = ( !isNaN(newBetSize)) && _.isNumber(newBetSize) 
        var isChanged = newBetSize!=self.gameState.betSize
if(hasValue && isNumber && isChanged){
//if value is different and is a number, store it
  self.adjustBetDisplay(newBetSize)}

//if new betsize is not rounded to nearest increment, then set disable raise and bet buttons
  if(self.returnRoundedDownBetSize(newBetSize) == false || self.returnRoundedDownBetSize(newBetSize) != newBetSize){

console.log('disabling 1 click on raise/bet')
self.images.bet.image.onPress = disableOneClick
self.images.raise.image.onPress = disableOneClick
self.images.bet.image.onClick = null
self.images.raise.image.onClick = null


var disableOneClick = function(event){

  event.onMouseUp = function(event){

    event.target.onClick = self.events.onButtonClick
     event.target.onPress = self.events.buttonMouseDown
  }
}

  }
  //if newbetsize is rounded, enable bet and raise click events
  if(self.returnRoundedDownBetSize(newBetSize) != false && self.returnRoundedDownBetSize(newBetSize) == newBetSize){
    self.images.bet.image.onClick = self.events.onButtonClick
    self.images.raise.image.onClick = self.events.onButtonClick
    self.images.bet.image.onPress = self.events.buttonMouseDown
self.images.raise.image.onPress = self.events.buttonMouseDown
  }
}

  //=============END BET SLIDER===================

//--------------END EVENTS----------------------------


//-----------functions below this line ---------------------
this.initialize= function(){

    var imageSourceArray = []
    var soundSourceArray = []
    var flashSoundSourceArray = []

    var resourceID = 0
   var loadedFiles=0
   var errorFiles = 0
   var errorSrcArray = []

var isImageSource = function(source){
  var sourceEnding = source.substr(source.length-4).toUpperCase()
  if(sourceEnding == '.PNG'){return true}
  else if (sourceEnding == '.JPG'){return true}
    else{return false}
}
var isSoundSource = function(source){
var sourceEnding = source.substr(source.length-4).toUpperCase()
if (sourceEnding == '.MP3'){return true}
  else if(sourceEnding == '.WAV'){return true}
    else{return false}
}

var isFlashSoundSource = function(source){
  var sourceEnding = source.substr(source.length-4).toUpperCase()
if(sourceEnding == '.SWF'){return true}
    else{return false}
}

    //push items to preload into arrays
    for(var i in this.images.sources){
       if(_.isString(this.images.sources[i])){

        if(isImageSource(this.images.sources[i])){
           imageSourceArray.push({src: this.images.sources[i], id:resourceID})
           resourceID++
    }//end check if this.images.sources[i] = image

    else if(isFlashSoundSource(this.images.sources[i])){
           flashSoundSourceArray.push({src: this.images.sources[i], id:resourceID})
           resourceID++
    }//end check if this.images.sources[i] = flashSound
    else if(isSoundSource(this.images.sources[i])){
           soundSourceArray.push({src: this.images.sources[i], id:resourceID})
           resourceID++
    }//end check if this.images.sources[i] = sound
  }//end check if this.images.sources[i] = string
    else if (_.isObject(this.images.sources[i])){
        for(var n in this.images.sources[i]){
            if(_.isString(this.images.sources[i][n])){
                imageSourceArray.push({src: this.images.sources[i][n], id:resourceID})
                resourceID++
            }
        }//end iteration through this.images.sources[i]
      }//end check if this.images.sources[i] is object
      
    }//end iteration through this.images.sources

//push individual cards
    for(var i = 2;i<=14;i++){
        var cardRank
           if(i==10){cardRank = 't'}
      else  if(i==11){cardRank = 'j'}
     else   if(i==12){cardRank = 'q'}
else if(i==13){cardRank = 'k'}
    else    if(i==14){cardRank = 'a'}
    else{cardRank = i}
        imageSourceArray.push({src: this.images.sources.cardImageFolder+cardRank+'c.png', id: resourceID})
      resourceID++
        imageSourceArray.push({src:this.images.sources.cardImageFolder+cardRank+'d.png', id: resourceID})
        resourceID++
        imageSourceArray.push({src:this.images.sources.cardImageFolder+cardRank+'h.png', id: resourceID})
        resourceID++
        imageSourceArray.push({src:this.images.sources.cardImageFolder+cardRank+'s.png', id: resourceID})
        resourceID++
    }




    //console.log(imageSourceArray)
    //define dimensions of preloading screen
    var introScreen = {}
    var titleSizeAndFont = '20px Arial'
     var titleHeight = 35
     var titleAndPreloadBarDistanceY = 50
     var titleText = 'Loading resources...'
     var titleColor = '#000000'
     var statusSizeAndFont = '15px arial'
     var statusHeight = 20
     var statusColor = '#000000'
    var preloadBarY  = $('#canvas').attr('height')/2
    var preloadBarWidth = $('#canvas').attr('width')*.65
    var preloadBarHeight = 30
    var preloadBarBorderColor = 'rgb(0,0,255)'
    var preloadBarProgressColor = '#000000'
    var preloadBarUnfinishedColor = 'rgb(150,150,150)'

    
    introScreen.preloadBar = new this.images.Item($('#canvas').attr('width')/2 - preloadBarWidth/2, preloadBarY, preloadBarWidth, preloadBarHeight, this.gameState.containerImageIndexes.loadingAnimation)
    introScreen.title = new this.images.Item(0, preloadBarY-titleAndPreloadBarDistanceY-titleHeight, $('#canvas').attr('width'), titleHeight,this.gameState.containerImageIndexes.loadingAnimation)
     introScreen.status = new this.images.Item(introScreen.preloadBar.position.x, introScreen.preloadBar.position.y - statusHeight, $('#canvas').attr('width')-introScreen.preloadBar.x, statusHeight,this.gameState.containerImageIndexes.loadingAnimation)
  

     //define function for drawing the loading bar graphic
     introScreen.preloadBar.image  = new createjs.Shape()
     introScreen.preloadBar.drawBar  = function (progressRatio){
         //where to start fill
         var progressX = introScreen.preloadBar.size.x*progressRatio + introScreen.preloadBar.position.x
         // where to end fill
         var unfinishedX 
         //insure fill does not surpass the loading bar
         if(progressX>=introScreen.preloadBar.size.x+ introScreen.preloadBar.position.x){
             progressX = introScreen.preloadBar.size.x+ introScreen.preloadBar.position.x
             unfinishedX = false
             }
       else  if(progressX<= introScreen.preloadBar.position.x){
             progressX = false
             unfinishedX = introScreen.preloadBar.position.x
             }
             //if progress is within bounds, set end of fill to end of bar
             else{unfinishedX = progressX}

         //clear previous graphics
         introScreen.preloadBar.image.graphics.clear()
         //draw outer border
         .beginStroke(preloadBarBorderColor).beginFill(null).setStrokeStyle(1)
         .drawRect(introScreen.preloadBar.position.x, introScreen.preloadBar.position.y, introScreen.preloadBar.size.x, introScreen.preloadBar.size.y)
         //show progress'd ratio
   if(progressX != false){
       introScreen.preloadBar.image.graphics.setStrokeStyle(0).beginFill(preloadBarProgressColor)
       .beginStroke(null).drawRect(introScreen.preloadBar.position.x, introScreen.preloadBar.position.y, progressX - introScreen.preloadBar.position.x, introScreen.preloadBar.size.y)

   }
if(unfinishedX != false && unfinishedX<introScreen.preloadBar.position.x+introScreen.preloadBar.size.x){
       introScreen.preloadBar.image.graphics.setStrokeStyle(0).beginFill(preloadBarUnfinishedColor)
       .beginStroke(null).drawRect(unfinishedX, introScreen.preloadBar.position.y, introScreen.preloadBar.position.x+introScreen.preloadBar.size.x - unfinishedX, introScreen.preloadBar.size.y)

   }
     }

     //define title text
     this.images.addItemText(introScreen.title, titleText, titleSizeAndFont, titleColor)
     //define statusText
     introScreen.status.text = new createjs.Text('', statusSizeAndFont, statusColor)
 introScreen.status.text.x= introScreen.status.position.x
 introScreen.status.text.y= introScreen.status.position.y + 1
 introScreen.status.text.baseline = 'top'
 introScreen.status.text.textAlign = 'left'
 introScreen.status.textColor = titleColor


 
//create text to show user images are being displayed

this.images.imageLoading = {}
var titleHeight = 30
var titleSizeAndFont = '30px Arial'
var titleColor = 'blue'
var titleText = 'Displaying Images ...'
var titleX = $('#canvas').attr('width')*.25
var titleY = $('#canvas').attr('height')*.75
this.images.imageLoading.title = new this.images.Item(titleX, titleY, $('#canvas').attr('width') -titleX, titleHeight,this.gameState.containerImageIndexes.loadingAnimation)
this.images.imageLoading.title.text = new createjs.Text(titleText, titleSizeAndFont, titleColor)
this.images.imageLoading.title.text.x= this.images.imageLoading.title.position.x
 this.images.imageLoading.title.text.y= this.images.imageLoading.title.position.y + 1
 this.images.imageLoading.title.text.baseline = 'top'
 this.images.imageLoading.title.text.textAlign = 'left'
 this.images.imageLoading.title.text.textColor = titleColor


 //add imageLoading
 
    function displayPreloadScreen(){
        //add images and text to containers 
        self.images.loadingContainers[introScreen.title.position.z+1].addChild(introScreen.title.text)
        
        self.images.loadingContainers[introScreen.preloadBar.position.z].addChild(introScreen.preloadBar.image)
        
        self.images.loadingContainers[introScreen.status.position.z+1].addChild(introScreen.status.text)

        //add containers to stage
        for(var i = 0;i<self.images.loadingContainers.length;i++){
            
            self.stage.addChild(self.images.loadingContainers[i])
        }
        

    }

    var totalSources = imageSourceArray.length+soundSourceArray.length+flashSoundSourceArray.length
 //define image.onload functions
    function handleLoad(src, id){
        loadedFiles++
        introScreen.status.text.text = src + ' loaded'
        introScreen.preloadBar.drawBar(loadedFiles/totalSources)
        console.log(src +' loaded file id: '+id+' totalLoaded: '+loadedFiles +' of '+totalSources)
        if (id == imageSourceArray[imageSourceArray.length-1].id){
            console.log("image load completed")
        }
         else if(id == soundSourceArray[soundSourceArray.length-1].id){
          console.log('non-flash sound load completed')
        }
        self.stage.update()
        
    }
    function handleLoadError(src,id){
        loadedFiles++
        errorFiles++
        errorSrcArray.push(src)
        introScreen.status.text.text = src + ' loaded'
         console.log(src + ' error loading file id: '+id+' totalLoaded: '+loadedFiles +' of '+totalSources)
        introScreen.preloadBar.drawBar(loadedFiles/totalSources)
         if (id == imageSourceArray[imageSourceArray.length-1].id)  {
            console.log('last image loaded')
        }
        else if(id == soundSourceArray[soundSourceArray.length-1].id){
          console.log('last non-flash sound loaded')
        }
        if(loadedFiles>=totalSources){
console.log('load completed with total of '+ errorFiles +' image and sound errors whose sources are in the following array:')
console.log(errorSrcArray)
        }
        self.stage.update()
    }


    function preloadImages(imageArray, onComplete){
    var newImages=[]
    //iterate through imageArray to preload images
    _.each(_.range(imageArray.length), function(i){
        newImages[i]=new Image()
        if(typeof imageArray[i] == 'string'){newImages[i].src=imageArray[i]}
        else if (typeof imageArray[i] == 'object'){newImages[i].src=imageArray[i].src}
        
        newImages[i].onload=function(){handleLoad(newImages[i].src, imageArray[i].id)}
        newImages[i].onerror=function(){handleLoadError(newImages[i].src, imageArray[i].id) }
        //on last iteration call onComplete function
        if(i == imageArray.length-1){onComplete()}
    })
  }

var preloadSounds = function(flashArray, soundArray){


createjs.FlashPlugin.BASE_PATH = "js/vendor/" //tell createjs where to find default flash audio
createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin, createjs.FlashPlugin]) //enable soundjs to play .swf files
//createjs.Sound.registerPlugin(createjs.FlashPlugin)

createjs.Sound.addEventListener("fileload", function(event){handleLoad(event.src, event.id)}) // add an event listener for when load is completed
createjs.Sound.addEventListener("error", function(event){handleLoadError(event.src, event.id)}) // add an event listener for when load is completed


//preload other sounds
//soundArray.push({src:'sound/aqua_vitae.mp3', id:999})
createjs.Sound.registerManifest(soundArray)
//createjs.Sound.registerManifest(flashArray)

//load flash sounds with createjs.FlashPlugin

for(var i =0;i<flashArray.length;i++){
  console.log(flashArray[i].src)
  var temp = createjs.Sound.createInstance(flashArray[i].src)
  console.log(temp)
  temp.play()
  handleLoad(flashArray[i].src, flashArray[i].id )
}


}

    displayPreloadScreen()
    preloadImages(imageSourceArray, function(){
        self.createAllItems()
        self.images.loadingContainers[self.images.imageLoading.title.position.z+1].addChild(self.images.imageLoading.title.text)

        } )
    
preloadSounds(flashSoundSourceArray, soundSourceArray)

    






 /*
 
    // must set to false or won't work.  dont know whay...
                var preload = new createjs.LoadQueue(false)
               
  //  preload.addEventListener("complete", handleComplete)
 //    preload.addEventListener("fileload", handleFileLoad)
 // preload.addEventListener("progress", handleProgress)

      preload.onComplete = handleComplete
  //    preload.onFileLoad = handleFileLoad
   //  preload.onProgress = handleProgress
  //  preload.onLoadStart = handleLoadStart
   preload.loadManifest(imageSourceArray)

   var handleLoadStart = function(event){
       
       console.log('load started')
   }
 var handleProgress = function(event){
     console.log(event)
 }

   var handleFileLoad=  function  (event){
       console.log('file loaded')
       console.log(event.item.src)
   }

           function handleComplete(event) {
               console.log('loading completed')
           self.createAllItems()
        }


        */


}


this.images.setDefaults = function(){
    
   
//========================IMAGE STATIC VARIABLES ==============================
 var canvasWidth = document.getElementById('canvas').width
     var canvasHeight = document.getElementById('canvas').height
     //small cards are 37 x 45
     //big cards are 48 x 76
     var cardWidth
     var cardHeight

     if(this.sources.cardImageFolder.indexOf('resize') >= 0){
         cardWidth = 36
       cardHeight = 44

            }
            else{
                cardWidth = 40
                cardHeight = 64
            }

            var spaceBetweenHoleCards = -cardWidth/8

            //percentage of vertical card to show
            var shownCardY = 0.92

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
            var actionButtonLeftX = 205
            var actionButtonY = 419
            var distanceBetweenActionButtons = 20
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

var currencyDisplayWidth = canvasWidth
var currencyDisplayHeight = 15
var currencyDisplayTopOffset = 3
var currencyDisplaySizeAndFont = 'bold 16px Arial'
var currencyDisplayColor = 'white'

            var communityY = 220
            var distanceBetweenCommunityCards = 2

            var dealerButtonWidth = 30
            var dealerButtonHeight = 22

            var topRowSeatDealerButtonX = -dealerButtonWidth/3
            var topRowSeatDealerButtonY = seatHeight+dealerButtonHeight*.1

            var leftColumnSeatDealerButtonX = seatWidth+dealerButtonWidth*.1
            var leftColumnSeatDealerButtonY = 0

            var bottomRowSeatDealerButtonX = seatWidth+dealerButtonWidth/3
            var bottomRowSeatDealerButtonY = -dealerButtonHeight*1.1

            var rightColumnSeatDealerButtonX = -dealerButtonWidth*1.1
            var rightColumnSeatDealerButtonY = 0

            var potHeight = 9
            var potWidth = 100
            var potSizeAndFont = '14px Arial'
            var potTextColor = '#FFFFFF'

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
      //      var horizontalBetSliderX = 215  X value is currently equal to the X value of the FOLD button
            var horizontalBetSliderOffsetBottom =  19
            var distanceBetweenBetSizeAndHorizontalSlider = 15
            var betSizeWidth = 80
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

            var openSeatOuterStrokeWidth = 2

            //dealerButton
           this.dealerButton = new this.Item(0,0,dealerButtonWidth, dealerButtonHeight,self.gameState.containerImageIndexes.chips)
            this.itemAsBitmap(this.dealerButton, this.sources.dealerButton)

            //---------pot-------------------
             this.pots[0].firstChip = new this.Item(canvasWidth/2-cardWidth/2-cardWidth,communityY+potDistanceToCommunity,chipDiameter,chipDiameter,self.gameState.containerImageIndexes.chips)
              this.pots[0].secondChip = new this.Item(this.pots[0].firstChip.position.x,this.pots[0].firstChip.position.y-distanceBetweenChipsY,chipDiameter,chipDiameter,self.gameState.containerImageIndexes.chips)
              this.pots[0].secondColumnChip = new this.Item(this.pots[0].firstChip.position.x+chipDiameter+self.imageData.distanceBetweenChipColumns,this.pots[0].firstChip.position.y,chipDiameter,chipDiameter,self.gameState.containerImageIndexes.chips)
           
              var totalPotWidth = (this.pots[0].secondColumnChip.position.x-this.pots[0].firstChip.position.x)*(self.imageData.maxChipColumns-1)+chipDiameter

            this.pots[0].potSize = new this.Item(this.pots[0].firstChip.position.x, this.pots[0].firstChip.position.y+potHeight,potWidth,potHeight,self.gameState.containerImageIndexes.chips)
             this.addItemText(this.pots[0].potSize, '',potSizeAndFont, potTextColor)
                       
              var distanceBetweenPots = (this.pots[0].secondColumnChip.position.x-this.pots[0].firstChip.position.x)*(self.imageData.maxChipColumns)
           var distanceBetweenChipsInColumn =  this.pots[0].firstChip.position.y - this.pots[0].secondChip.position.y
           var chipColumnHeight = chipDiameter +(self.imageData.maxChipsPerColumn-1)*distanceBetweenChipsInColumn


                        this.totalPotSize  = new this.Item(this.pots[0].firstChip.position.x, this.pots[0].firstChip.position.y+chipDiameter-chipColumnHeight-potHeight*2,potWidth,potHeight,self.gameState.containerImageIndexes.chips)
             this.addItemText( this.totalPotSize, '',potSizeAndFont, potTextColor)
            

              for(var i=1;i<this.seats.length-1;i++){

             this.pots[i].firstChip = new this.Item( this.pots[0].firstChip.position.x+i*distanceBetweenPots, this.pots[0].firstChip.position.y ,chipDiameter,chipDiameter,self.gameState.containerImageIndexes.chips)
              this.pots[i].secondChip = new this.Item(this.pots[0].secondChip.position.x+i*distanceBetweenPots,this.pots[0].secondChip.position.y,chipDiameter,chipDiameter,self.gameState.containerImageIndexes.chips)
              this.pots[i].secondColumnChip = new this.Item(this.pots[0].secondColumnChip.position.x+i*distanceBetweenPots,this.pots[0].secondColumnChip.position.y,chipDiameter,chipDiameter,self.gameState.containerImageIndexes.chips)

                   this.pots[i].potSize = new this.Item(this.pots[0].potSize.position.x+i*distanceBetweenPots,this.pots[0].potSize.position.y,potWidth,potHeight,self.gameState.containerImageIndexes.chips)
             this.addItemText(this.pots[i].potSize, '',potSizeAndFont, potTextColor)
              }

              //---------------------player chat input---------------
              this.htmlTableChatBox = new this.Item(htmlTableChatBoxLeftOffset,canvasHeight - htmlTableChatBoxBottomOffset-htmlTableChatBoxHeight-htmlTableChatBorderSize*2,htmlTableChatBoxWidth,htmlTableChatBoxHeight,self.gameState.containerImageIndexes.button)
var defaultMessage = 'Type here to chat'
$('#chat').val(defaultMessage)
$('#chat').css('color', htmlTableChatBoxReminderTextColor)

//remove reminder text when clicked
$('#chat').focus(function(){
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
        this.sitOutNextBlind =  new this.Item(sideButtonOffSetLeft,this.htmlTableChatBox.position.y-  sideButtonDistanceFromChat- sideButtonHeight,sideButtonWidth,sideButtonHeight,self.gameState.containerImageIndexes.button, ['set_flag', 'post_blind', false])
               
               
                //define on versions
                  this.foldToAnyBetOn =  new this.Item(this.foldToAnyBet.position.x,this.foldToAnyBet.position.y, this.foldToAnyBet.size.x,this.foldToAnyBet.size.y,self.gameState.containerImageIndexes.button, ['set_flag','fold',false])
                   this.foldToAnyBetOn.otherMessages = ['set_flag','check',false]
          this.sitOutNextHandOn = new  this.Item(this.sitOutNextHand.position.x,this.sitOutNextHand.position.y, this.sitOutNextHand.size.x,this.sitOutNextHand.size.y,self.gameState.containerImageIndexes.button, ['sit_in'])
        this.sitOutNextBlindOn = new  this.Item(this.sitOutNextBlind.position.x,this.sitOutNextBlind.position.y, this.sitOutNextBlind.size.x,this.sitOutNextBlind.size.y,self.gameState.containerImageIndexes.button, ['set_flag', 'post_blind', true])
        
        this.itemAsBitmap(this.foldToAnyBet, this.sources.checkBox)
this.itemAsBitmap(this.sitOutNextHand, this.sources.checkBox)
this.itemAsBitmap(this.sitOutNextBlind, this.sources.checkBox)

        this.itemAsBitmap(this.foldToAnyBetOn, this.sources.checkBoxChecked)
this.itemAsBitmap(this.sitOutNextHandOn, this.sources.checkBoxChecked)
this.itemAsBitmap(this.sitOutNextBlindOn, this.sources.checkBoxChecked)
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
      addSideButtonText (  this.sitOutNextBlind,'Sit out next blind' )
      
      //on state
      addSideButtonText( this.foldToAnyBetOn, 'Fold to any bet' )
      addSideButtonText(this.sitOutNextHandOn, 'Sit out next hand')
      addSideButtonText (  this.sitOutNextBlindOn,'Sit out next blind' )

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
          this.sitOutNextBlind.image.hitArea  = drawHitArea(this.sitOutNextBlind)
     
                  this.foldToAnyBetOn.image.hitArea  = drawHitArea(this.foldToAnyBetOn)
                  this.sitOutNextHandOn.image.hitArea = drawHitArea(this.sitOutNextHandOn)
                    this.sitOutNextBlindOn.image.hitArea = drawHitArea(this.sitOutNextBlindOn)

      //onclick
       this.foldToAnyBet.image.onclick =  self.events.onButtonClick
        this.sitOutNextHand.image.onclick = self.events.onButtonClick
          this.sitOutNextBlind.image.onclick  = self.events.onButtonClick
           //define on versions
                  this.foldToAnyBetOn.image.onclick  = self.events.onButtonClick
                  this.sitOutNextHandOn.image.onclick = self.events.onButtonClick
                    this.sitOutNextBlindOn.image.onclick = self.events.onButtonClick


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
 self.images.seats[i].seat.image.parentOfImageObject = self.images.seats[i].seat

})


  //=================-seat images=========================================
for(var i =0;i<this.seats.length;i++){

self.images.drawSeat(this.seats[i].seat, '#000000','#000000', '#7d7d7d')

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

            this.seats[i].hiddenCard0 = new this.Item(card0X, cardY, cardWidth, cardHeight,self.gameState.containerImageIndexes.holeCards)
            this.seats[i].hiddenCard1 = new this.Item(card1X, cardY, cardWidth, cardHeight,self.gameState.containerImageIndexes.holeCards)

            this.seats[i].shownCard0 = new this.Item(card0X, cardY, cardWidth, cardHeight,self.gameState.containerImageIndexes.holeCards)
            this.seats[i].shownCard1 = new this.Item(card1X, cardY, cardWidth, cardHeight,self.gameState.containerImageIndexes.holeCards)

            //Empty Seats
            var openSeatFill = '#000000'
            var openSeatMiddle = openSeatMiddle
            var openSeatBorder = '#FFFFFF'

self.images.drawSeat(this.seats[i].openSeat, openSeatBorder, openSeatFill, openSeatMiddle, {outerStrokeWidth: openSeatOuterStrokeWidth})
this.seats[i].openSeat.image.parentOfImageObject = this.seats[i].openSeat  

                this.seats[i].openSeat.text = new createjs.Text('Open Seat', '15px Arial', "#FFFFFF")
this.seats[i].openSeat.text.x=this.seats[i].openSeat.position.x + this.seats[i].openSeat.size.x/2 
this.seats[i].openSeat.text.y=this.seats[i].openSeat.position.y + 4
this.seats[i].openSeat.text.baseline = 'top'
this.seats[i].openSeat.text.textAlign = 'center'
this.seats[i].openSeat.text.maxWidth = this.seats[i].openSeat.size.x*.9
this.seats[i].openSeat.textColor = "#FFFFFF"       

            //disabled Seats
            var disabledBorder = "#544E4F"
            var disabledFill = 'black'
            var disabledMiddle = disabledFill
            self.images.drawSeat (this.seats[i].disabledSeat, disabledBorder, disabledFill, disabledMiddle, {outerStrokeWidth: openSeatOuterStrokeWidth})
   this.seats[i].disabledSeat.image.parentOfImageObject = this.seats[i].disabledSeat     
/*
            this.seats[i].disabledSeat.image = new createjs.Shape()
this.seats[i].disabledSeat.image.snapToPixel = true
this.seats[i].disabledSeat.image.graphics.setStrokeStyle(1,'square').beginStroke("#544E4F").beginFill('black').drawRect(this.seats[i].disabledSeat.position.x, this.seats[i].disabledSeat.position.y, this.seats[i].disabledSeat.size.x, this.seats[i].disabledSeat.size.y)
         this.seats[i].disabledSeat.image.parentOfImageObject = this.seats[i].disabledSeat       
         */

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

        
        //determine location of theoretical upper right most chip
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
        var betX = bottomLeftChipX - betTextWidth - absoluteDistanceBetweenBetTextAndChipImages
        var betY = bottomLeftChipY
          
          var dealerButtonX = this.seats[i].seat.position.x+bottomRowSeatDealerButtonX
       var dealerButtonY = this.seats[i].seat.position.y+bottomRowSeatDealerButtonY



        this.seats[i].dealerButton = new this.Item(dealerButtonX,dealerButtonY,dealerButtonWidth,dealerButtonHeight,self.gameState.containerImageIndexes.chips)
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
      this.fold = new this.Item(actionButtonLeftX,actionButtonY,actionButtonWidth,actionButtonHeight,self.gameState.containerImageIndexes.button, ['act','fold'])
      this.call = new this.Item(actionButtonLeftX+actionButtonWidth+distanceBetweenActionButtons,actionButtonY,actionButtonWidth,actionButtonHeight,self.gameState.containerImageIndexes.button, ['act','call'])
      this.check = new this.Item(actionButtonLeftX+actionButtonWidth+distanceBetweenActionButtons,actionButtonY,actionButtonWidth,actionButtonHeight,self.gameState.containerImageIndexes.button, ['act','check'])
      this.raise = new this.Item(this.check.position.x +actionButtonWidth+distanceBetweenActionButtons,actionButtonY,actionButtonWidth,actionButtonHeight,self.gameState.containerImageIndexes.button, ['act','raise'])
      this.bet = new this.Item(this.check.position.x +actionButtonWidth+distanceBetweenActionButtons,actionButtonY,actionButtonWidth,actionButtonHeight,self.gameState.containerImageIndexes.button, ['act','bet'])

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
              this.betSlider.horizontal = new this.Item (this.fold.position.x,canvasHeight-horizontalBetSliderOffsetBottom-horizontalBetSliderHeight,horizontalBetSliderWidth,horizontalBetSliderHeight,self.gameState.containerImageIndexes.button)
              var verticalY = this.betSlider.horizontal.position.y+this.betSlider.horizontal.size.y/2-verticalBetSliderHeight/2
      this.betSlider.vertical = new this.Item(this.betSlider.horizontal.position.x,verticalY,verticalBetSliderWidth,verticalBetSliderHeight,self.gameState.containerImageIndexes.button)
var betSizeX = this.betSlider.horizontal.position.x+this.betSlider.horizontal.size.x + distanceBetweenBetSizeAndHorizontalSlider
var betSizeY = this.betSlider.horizontal.position.y+this.betSlider.horizontal.size.y/2-betSizeHeight/2
      this.betSlider.betSize = new this.Item(betSizeX,betSizeY,betSizeWidth,betSizeHeight,self.gameState.containerImageIndexes.button)

      this.itemAsBitmap(this.betSlider.horizontal, this.sources.horizontalSlider)
        this.itemAsBitmap(this.betSlider.vertical, this.sources.verticalSlider)

self.updateBetSize('')

//highlight when clicked
$('#betSize').focus(function(){
               $("#betSize").one('mouseup', function(event){
        event.preventDefault();
       }).select()
})
//round betSize down when unfocused
$('#betSize').focusout(function(event){ self.events.betSizeUnfocused(event)})


//trigger checks for change in betsize values
$('#betSize').change(function(){self.events.betSizeChanged()}) 
$('#betSize').keyup(function(){self.events.betSizeChanged()}) 
$('#betSize').bind('paste', function(e){self.events.betSizeChanged()})
$("#betSize")[0].oninput = function () {
self.events.betSizeChanged()
}





$('#betSize').css({
 'position' :  'absolute',
 'left'  : this.betSlider.betSize.position.x + 'px',
'top'  : this.betSlider.betSize.position.y + 'px',
'width' : this.betSlider.betSize.size.x + 'px',
'height' : this.betSlider.betSize.size.y +'px',
'padding': '0px',
'margin':'0px'
})


  //------------------------------community cards---------------------------
        this.community[0] = new this.Item(canvasWidth/2-cardWidth/2-cardWidth*2-distanceBetweenCommunityCards*2,communityY,cardWidth, cardHeight,self.gameState.containerImageIndexes.communityCards)
        this.community[1] = new this.Item(canvasWidth/2-cardWidth/2-cardWidth-distanceBetweenCommunityCards,communityY,cardWidth, cardHeight,self.gameState.containerImageIndexes.communityCards)
        this.community[2] = new this.Item(canvasWidth/2-cardWidth/2,communityY,cardWidth, cardHeight,self.gameState.containerImageIndexes.communityCards)
        this.community[3] = new this.Item(canvasWidth/2+cardWidth/2+distanceBetweenCommunityCards,communityY,cardWidth, cardHeight,self.gameState.containerImageIndexes.communityCards)
        this.community[4] = new this.Item(canvasWidth/2+cardWidth/2+cardWidth+2*distanceBetweenCommunityCards,communityY,cardWidth, cardHeight,self.gameState.containerImageIndexes.communityCards)

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
/*
var spriteSheet = new createjs.SpriteSheet(cashierButtonSpriteData)
this.cashierButton.bitmapAnimation = new createjs.BitmapAnimation(spriteSheet)
this.cashierButton.bitmapAnimation.x = this.cashierButton.position.x
this.cashierButton.bitmapAnimation.y = this.cashierButton.position.y
// this.cashierButton.bitmapAnimation.gotoAndStop(0)
this.cashierButton.button = new createjs.ButtonHelper(this.cashierButton.bitmapAnimation, 'mouseOut', 'mouseOver', 'mouseDown', false)
//this.cashierButton.button.initialize()
*/

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
        this.sitIn = new this.Item(actionButtonLeftX,actionButtonY,actionButtonWidth,actionButtonHeight,self.gameState.containerImageIndexes.button, ['sit_in'])
        this.rebuy = new this.Item(actionButtonLeftX,actionButtonY,actionButtonWidth,actionButtonHeight,self.gameState.containerImageIndexes.button, ['get_add_chips_info'])

         this.itemAsRectangle(this.sitIn,'black')
this.addItemText(this.sitIn,'Deal Me In','10px Arial','white')

 this.itemAsRectangle(this.rebuy,'black')
this.addItemText(this.rebuy,'Get Chips','10px Arial','white')
this.sitIn.image.onClick = self.events.onButtonClick
this.rebuy.image.onClick  = self.events.onButtonClick

//-------------------------currency display--------------------------
var currencyDisplayX = canvasWidth/2 - currencyDisplayWidth/2

this.currencyDisplay = new this.Item(currencyDisplayX, currencyDisplayTopOffset, currencyDisplayWidth, currencyDisplayHeight, self.gameState.containerImageIndexes.button)
this.addItemText(this.currencyDisplay, '', currencyDisplaySizeAndFont, currencyDisplayColor)
//========================4 color deck sprite sheet=============================

var fourColorDeckData = {

     images: [this.sources.fourColorDeck],
     frames: {width:37, height:45}

}
/*
this.fourColorSprite = new createjs.SpriteSheet(fourColorDeckData)

*/

//=====================MESSAGE BOX=======================================
var containersPerMessageBox = self.gameState.containerImageIndexes.containersPerMessageBox
  for(var messageBoxImageContainerIndex = self.gameState.containerImageIndexes.initialMessageBox; messageBoxImageContainerIndex < this.containers.length-containersPerMessageBox;messageBoxImageContainerIndex=messageBoxImageContainerIndex+containersPerMessageBox){
       

        //background bitmap 
        self.images.messageBox[messageBoxImageContainerIndex].window = new self.images.Item(0,0,0,0,messageBoxImageContainerIndex)
        self.images.itemAsBitmap(self.images.messageBox[messageBoxImageContainerIndex].window, self.images.sources.messageBoxBackground)
        
    //add closeX Image
         self.images.messageBox[messageBoxImageContainerIndex].closeWindow =  new self.images.Item (0, 0,0,0,messageBoxImageContainerIndex) 
       self.images.itemAsBitmap(self.images.messageBox[messageBoxImageContainerIndex].closeWindow, self.images.sources.messageBoxCloseX)
       
}

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

        //use jquery to position divs to appropriate locations

        //use jquery to set appropriate sizes of text boxes
       $("#cashier input[type='text']").css('width', textBoxWidth+'px')
       $("#cashier input[type='text']").css('height', textBoxHeight+'px')


      //set text size and font
        $("#cashier").children().children().css({
            'font':sizeAndFont
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
//---------------------------------------report bug-----------------------------------------------------

this.reportBug = new this.Item(0, this.getChips.size.y, 165,30,self.gameState.containerImageIndexes.holeCards)


   this.reportBug.text = new createjs.Text('click to report bugs via email to: CryptoPoker@gmail.com', '13px arial' ,'white')
this.reportBug.text.x=this.reportBug.position.x
this.reportBug.text.y=this.reportBug.position.y
this.reportBug.text.baseline = 'top'
this.reportBug.text.textAlign = 'left'
this.reportBug.text.lineWidth = this.reportBug.size.x
this.reportBug.text.lineHeight = this.reportBug.size.y/2
this.reportBug.textColor = 'white'


 var reportBugHitArea = new createjs.Shape()
        reportBugHitArea.graphics.beginFill('#FFFFFF').beginStroke(0)
        .drawRect(0, 0, this.reportBug.size.x, this.reportBug.size.y)

console.log(this.reportBug)
        this.reportBug.text.hitArea = reportBugHitArea


this.reportBug.text.onClick = function(event){
popup('mailto:CryptoPoker@gmail.com')

}


}

        this.setBackground = function(){    
          var canvasHeight = document.getElementById('canvas').height
          var canvasWidth = document.getElementById('canvas').width
        this.images.background = new this.images.Item(0,0,canvasWidth,canvasHeight,this.gameState.containerImageIndexes.background)
        this.images.itemAsBitmap(this.images.background, this.images.sources.background)

/*
 var matrix = new createjs.ColorMatrix().adjustHue(-100)
 this.images.background.image.filters = [
  
 new createjs.ColorFilter(0,0,0,1, -50,50,0,0)
  // new createjs.ColorMatrixFilter(matrix)
 ]

 //this.images.background.image.updateCache()

 this.images.background.image.cache(0, 0,canvasWidth-1, canvasHeight-1)


// this.images.background.image.cache(0, 0,canvasWidth, canvasHeight)
this.images.background.image.updateCache()
console.log(this.images.background.image)
console.log(this.images.background.image.isVisible())
*/
this.displayChildren(this.images.background)
    }

    this.images.setDefaultEvents = function(){

        //mouse events for changing bet sizes
         this.betSlider.vertical.image.onPress = self.events.betSliderVerticalMouseDown
         this.betSlider.horizontal.image.onPress = self.events.betSliderHorizontalMouseDown

        //mouse events for clicking on empty seats
             for (var i = 0; i < this.seats.length; i = i + 1){
         this.seats[i].openSeat.image.onClick = self.events.onButtonClick
        }

        this.stand.image.onPress = self.events.buttonMouseDown
        this.stand.image.onClick = self.events.onButtonClick

    //    self.stage.onPress = self.events.onStagePress

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
     
//return betsize that is rounded down or FALSE if betsize is not a number, also checks to make sure betsize is within in and max
this.returnRoundedDownBetSize = function(betSize){


//check to insure betSize is not outside of bounds, return min or max if it is
if(betSize>self.gameState.maxBet){return self.gameState.maxBet}
  else if (betSize<self.gameState.minBet){return self.gameState.minBet}

    var isNumber =  !isNaN(betSize) && _.isNumber(betSize) 
    var roundedBetSize
    //if not a number use last known number and round
    if(isNumber == false ){
 return false    }
    else{
      roundedBetSize = Math.floor(betSize/self.gameState.minIncrement)*self.gameState.minIncrement    }

        return roundedBetSize
}

    //does not update a player's stack size
    this.playerPutsChipsInPot =function(seatNumber,betSize, stackSize){
        
        if(betSize>0){
         this.images.seats[seatNumber].bet.text.text = betSize
 this.displayChildren(this.images.seats[seatNumber].bet)
       }
         else{this.images.seats[seatNumber].bet.text.text = ''
 this.hideChildren(this.images.seats[seatNumber].bet)
       }
         if(!_.isNull(stackSize) && !_.isUndefined(stackSize) && stackSize <=0 ){stackSize = 'All In'}
         this.images.seats[seatNumber].status.text.text = stackSize

          

    }

    this.hideAllBets  = function(){

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

    this.setNumberOfSeats = function (numSeats){
        if(this.images.seats.length != 10){return 'seat number already fixed'}
        var centerBottomAndTopSeats = function(){
            var totalLength = self.images.seats[0].seat.size.x*3+(self.images.seats[0].seat.position.x - self.images.seats[1].seat.position.x - self.images.seats[1].seat.size.x)*2
            var absoluteDistanceX = (totalLength - self.images.seats[0].seat.size.x*2)/6

            
                          //adjust seat 1
             for(var i in self.images.seats[1]){
                 if(self.images.seats[1][i] instanceof self.images.Item){
                   self.images.seats[1][i].position.x =  self.images.seats[1][i].position.x + absoluteDistanceX
                   if(self.images.seats[1][i].image){self.images.seats[1][i].image.x = self.images.seats[1][i].image.x + absoluteDistanceX}
               if(self.images.seats[1][i].text){self.images.seats[1][i].text.x = self.images.seats[1][i].text.x + absoluteDistanceX
               }
               }
              }

                                        //adjust seat 4
             for(var i in self.images.seats[4]){
                 if(self.images.seats[4][i] instanceof self.images.Item){
                   self.images.seats[4][i].position.x =  self.images.seats[4][i].position.x + absoluteDistanceX
                   if(self.images.seats[4][i].image){self.images.seats[4][i].image.x = self.images.seats[4][i].image.x + absoluteDistanceX}
               if(self.images.seats[4][i].text){self.images.seats[4][i].text.x = self.images.seats[4][i].text.x + absoluteDistanceX
               }
               }
              }

                                        //adjust seat 6
             for(var i in self.images.seats[6]){
                 if(self.images.seats[6][i] instanceof self.images.Item){
                   self.images.seats[6][i].position.x =  self.images.seats[6][i].position.x - absoluteDistanceX
                   if(self.images.seats[6][i].image){self.images.seats[6][i].image.x = self.images.seats[6][i].image.x - absoluteDistanceX}
               if(self.images.seats[6][i].text){self.images.seats[6][i].text.x = self.images.seats[6][i].text.x- absoluteDistanceX
               }
               }
              }
              //adjust seat 9
             for(var i in self.images.seats[9]){
                 if(self.images.seats[9][i] instanceof self.images.Item){
                   self.images.seats[9][i].position.x =  self.images.seats[9][i].position.x - absoluteDistanceX
                   if(self.images.seats[9][i].image){self.images.seats[9][i].image.x = self.images.seats[9][i].image.x - absoluteDistanceX}
               if(self.images.seats[9][i].text){self.images.seats[9][i].text.x = self.images.seats[9][i].text.x- absoluteDistanceX
               }
               }
              }

        }

        var centerSeat2And8 = function(){
                          var sideYDistance = (self.images.seats[2].seat.position.y - self.images.seats[3].seat.position.y)/2 

                          //adjust seat 2
             for(var i in self.images.seats[2]){
                 if(self.images.seats[2][i] instanceof self.images.Item){
                   self.images.seats[2][i].position.y =  self.images.seats[2][i].position.y - sideYDistance
                   if(self.images.seats[2][i].image){self.images.seats[2][i].image.y = self.images.seats[2][i].image.y - sideYDistance}
               if(self.images.seats[2][i].text){self.images.seats[2][i].text.y = self.images.seats[2][i].text.y - sideYDistance
               }
               }
              }
              //adjust seat 8
                    for(var i in self.images.seats[8]){
                    if(self.images.seats[8][i] instanceof self.images.Item){
                        
   self.images.seats[8][i].position.y =  self.images.seats[8][i].position.y - sideYDistance
                   if(self.images.seats[8][i].image){
                      self.images.seats[8][i].image.y = self.images.seats[8][i].image.y - sideYDistance
                   }
              if(self.images.seats[8][i].text){self.images.seats[8][i].text.y = self.images.seats[8][i].text.y - sideYDistance}
       }
               }
               }

        
        if(numSeats == 9){
            self.images.seats.splice(5,1)} // remove top middle seat
    else    if(numSeats == 8){
       centerBottomAndTopSeats()
            self.images.seats.splice(5,1)
               self.images.seats.splice(0,1)
               }
     else   if(numSeats == 7){
            self.images.seats.splice(6,1)
            self.images.seats.splice(4,1)
            self.images.seats.splice(0,1)
            }
      else      if(numSeats == 6){
             //    set y positions of side to between top and bottom of before
 
               //move seat 2 up to the new position
                //move seat 8 up to the new position
          centerSeat2And8()

               this.images.seats.splice(7,1)
               this.images.seats.splice(5,1)
               this.images.seats.splice(3,1)
               this.images.seats.splice(0,1)

            }
          else  if(numSeats == 5){
              this.images.seats.splice(5,4)

          }

          else if(numSeats == 4){
              this.images.seats.splice(9,1)
                          this.images.seats.splice(7,1)
                                      this.images.seats.splice(5,1)
                                                  this.images.seats.splice(4,1)
                                                  this.images.seats.splice(2,1)
                                                              this.images.seats.splice(0,1)
          }
          
          else if(numSeats == 3){
              this.images.seats.splice(3,6)
          }

          else if(numSeats == 2){
                centerSeat2And8()
                            this.images.seats.splice(9,1)
                          this.images.seats.splice(7,1)
                           this.images.seats.splice(6,1)
                                      this.images.seats.splice(5,1)
                                                  this.images.seats.splice(4,1)
                                                   this.images.seats.splice(3,1)
                                                   this.images.seats.splice(1,1)
                                                              this.images.seats.splice(0,1)
                                                              
          }
          //update seat messages
       
          for(var i =0; i<this.images.seats.length;i++){
              this.images.seats[i].openSeat.messages = ['sit', i]
          }
             if(this.images.seats.length != numSeats){console.log(this.images.seats)}
            
            //adjust gameState seats array

        for(var i = this.gameState.seats.length;i>=numSeats;i--){
            this.gameState.seats.splice(i,1)
        }

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
        if(!_.isNumber(potNumber)){
            this.images.totalPotSize.text.text = 'Pot: '+potSize
            this.displayChildren(this.images.totalPotSize)
            }
        else{
this.images.pots[potNumber].potSize.text.text = potSize
   this.displayChildren(this.images.pots[potNumber].potSize)
   if(potNumber){

 }
   }
    }

    this.playerSits = function(seatNumber, playerName, chips){

        this.gameState.seats[seatNumber].displayMessageType = 'seat'
        this.images.seats[seatNumber].playerName.text.text =  playerName
        if(_.isNumber(chips) && chips>0){
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
    this.displayChipStack = function(chipAmount,parentOfChipArray, initialX, initialY, options){
        //remove previous chips
        this.hideChildren(parentOfChipArray.chips)
        //reset chip array from memory
        parentOfChipArray.chips = []
        var x = initialX
        var y = initialY
        var chipIncrementY = this.images.pots[0].secondChip.position.y-this.images.pots[0].firstChip.position.y
        var totalChips = 0
        var columnCounter = 1
        var distanceBetweenColumns = false
        if(options){
        if(options.distanceBetweenColumns){ distanceBetweenColumns = options.distanceBetweenColumns }
}//done checking if options

  if(distanceBetweenColumns == false ){

 if(parentOfChipArray.secondColumnChip instanceof this.images.Item && parentOfChipArray.firstChip instanceof this.images.Item){ 
      distanceBetweenColumns = parentOfChipArray.secondColumnChip.position.x-parentOfChipArray.firstChip.position.x 
    }
                    else{  
                      distanceBetweenColumns = this.images.pots[0].secondColumnChip.position.x - this.images.pots[0].firstChip.position.x 
                    }
                    
}//done checking if distanceBetweenColumns doesnt exist

        while(chipAmount>=1){
            if(chipAmount>=10000){
            this.displayChip('10k',x,y, parentOfChipArray, options)
            y =y+chipIncrementY
            chipAmount = chipAmount -10000
        }
           else if(chipAmount>=5000){
            this.displayChip('5k',x,y, parentOfChipArray, options)
            y =y+chipIncrementY
            chipAmount = chipAmount -5000
        }
        else     if(chipAmount>=1000){
            
            this.displayChip('1k',x,y, parentOfChipArray, options)
            y =y+chipIncrementY
            chipAmount = chipAmount -1000
        }
              else    if(chipAmount>=500){
            
            this.displayChip(500,x,y, parentOfChipArray, options)
            y =y+chipIncrementY
            chipAmount = chipAmount -500
        }
           else    if(chipAmount>=100){
            
            this.displayChip(100,x,y, parentOfChipArray, options)
            y =y+chipIncrementY
            chipAmount = chipAmount -100
        }
        else if(chipAmount>=50){
            
            this.displayChip(50,x,y, parentOfChipArray, options)
            y =y+chipIncrementY
            chipAmount = chipAmount -50
        }
      else  if(chipAmount>=25){
            
             this.displayChip(25,x,y, parentOfChipArray, options)
            y =y+chipIncrementY
            chipAmount = chipAmount -25

        }
      else   if(chipAmount >=5){
             this.displayChip(5,x,y, parentOfChipArray, options)
            y =y+chipIncrementY
            chipAmount = chipAmount -5
        }
      else   if(chipAmount >=1){
             this.displayChip(10,x,y, parentOfChipArray, options)
            y =y+chipIncrementY
            chipAmount = chipAmount -1
        }

        totalChips++
        if(totalChips%this.imageData.maxChipsPerColumn==0){
            x=x + distanceBetweenColumns
            y = initialY
            //increase column number counter and exit loop
            columnCounter ++
            if(columnCounter>=this.imageData.maxChipColumns){chipAmount = 0}
        }
        }
    }

    this.addChildToContainer = function (child, containerIndex){
        
        this.images.containers[containerIndex].addChild(child)

    }


    //this.images.seats[i] is parent for players bets, this.images.pots[i] is parent for pots
    this.displayChip = function(chipValue, x, y, parentOfChipArray, options){

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
if( chipValue == 10){
var chipImageSource = this.images.sources.chips['10']
}
  else   if(chipColor == 'red'){
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
 if(options && options.hidden == true){}
  else{this.displayChildren(parentOfChipArray.chips)}
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
     var fractionDistancePerTick = .2
     var lastTick = 1/fractionDistancePerTick -1 
     var   interval = fractionDistancePerTick*animationTime

     //play deal sound
     var communitySound = createjs.Sound.createInstance(this.images.sources.dealCommunity)
     communitySound.play()

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
     var animationTime = 100
            var fractionDistancePerTick = .2
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
var dealHoleCardSound =  createjs.Sound.createInstance(self.images.sources.dealHoleCardSound)
    asyncArray.push(function(callback){

                 dealHoleCardSound.play() //play sound

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

                       if(_.isNumber(self.gameState.userSeatNumber) && playerArray[playerArrayNumber] == self.gameState.userSeatNumber){  
                       
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
      //  this.hideInHandOptions()
      //  this.hideChildren(this.images.stand)
         this.hideChildren(this.images.rebuy)
 this.hideChildren(this.images.sitIn)
    }

  this.adjustBetDisplay = function (betSize){
      var minX = self.images.betSlider.horizontal.position.x
         var maxX = self.images.betSlider.horizontal.position.x + self.images.betSlider.horizontal.size.x-self.images.betSlider.vertical.size.x
      
//determine new X position for vertical slider based on new betSize
     var betSizePercent = (betSize-self.gameState.minBet)/(self.gameState.maxBet-self.gameState.minBet)
      var newX = (maxX-minX)*betSizePercent+minX
      //make sure newX is within the bounds of min and max
      if(newX>=maxX){
        newX = maxX
self.images.bet.text.text = 'Bet All-In'
self.images.raise.text.text = 'Raise All-In'
      }//if all in
      else{
        if(newX<minX){newX = minX}

    if(self.stage.contains(self.images.bet.text)){
        self.images.bet.text.text = 'Bet '+betSize
        }
    
    else if(self.stage.contains(self.images.raise.text)){
        self.images.raise.text.text = 'Raise to '+betSize
    }
}//if not all in
self.images.betSlider.vertical.image.x = newX //adjust vertical slider location
//adjust messages
self.images.bet.messages = ['act','bet',betSize]
self.images.raise.messages = ['act','raise',betSize]
self.updateBetSize(betSize)
self.stage.update()
         }

   this.displayAllCommunity = function(communityArray){

    for (var i = 0; i < communityArray.length; i = i + 1) {

    if (communityArray[i] === '' || communityArray[i] === null) {}
    else{this.displayShownCard(communityArray[i], this.images.community[i])}
    }
    }

this.updateBetSize = function(betSize){
 $('#betSize').val(betSize)
 self.gameState.betSize = betSize
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

    this.displayChildren = function(parentOrGrandparent, options){
        
        //check if input is parent
        if(parentOrGrandparent instanceof this.images.Item){
            this.displayImage(parentOrGrandparent)
         this.displayText(parentOrGrandparent)
        }



        else if(_.isArray(parentOrGrandparent)){
            for(var i =0;i<parentOrGrandparent.length;i++){
                    if(parentOrGrandparent[i] instanceof this.images.Item){
            this.displayImage(parentOrGrandparent[i])
         this.displayText(parentOrGrandparent[i])
        }

            }

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

if(options && options.update == false){}
  else{this.stage.update()}
 }

 this.displayHiddenCards =function(seatNumber){
     this.displayChildren(this.images.seats[seatNumber].hiddenCard0)
     this.displayChildren(this.images.seats[seatNumber].hiddenCard1)

 }
    this.hideText = function(parent){

        if(parent.text && this.stage.contains(parent.text)){
            this.images.containers[parent.position.z+1].removeChild(parent.text)
        this.stage.update()
        }
        }

        this.playerSitsOut =function(seatNumber){
            
            this.images.seats[seatNumber].status.text.text = "Sitting Out"

        }

 
 this.hideImage = function(parentOfImageObject){
      if(parentOfImageObject.image && this.stage.contains(parentOfImageObject.image)){
              this.images.containers[parentOfImageObject.position.z].removeChild(parentOfImageObject.image)
              this.stage.update()
          }
        }

 this.hideChildren = function(parentOrGrandparent, options){

             //check if input is parent
        if(parentOrGrandparent instanceof this.images.Item){
            this.hideImage(parentOrGrandparent)
         this.hideText(parentOrGrandparent)
        }


               else if(_.isArray(parentOrGrandparent)){
       
            for(var i =0;i<parentOrGrandparent.length;i++){
                    if(parentOrGrandparent[i] instanceof this.images.Item){

            this.hideImage(parentOrGrandparent[i])
         this.hideText(parentOrGrandparent[i])
        }

            }

        }


        else if(_.isObject(parentOrGrandparent)){
            for(var i in parentOrGrandparent){
    if(parentOrGrandparent[i] instanceof this.images.Item){
            this.hideImage(parentOrGrandparent[i])
         this.hideText(parentOrGrandparent[i])
        }
            }

        }

        if(options && options.update == false){}
          else{self.stage.update()}
 }

 this.hideAllActionButtons =function(){
this.hideChildren(this.images.fold)
this.hideChildren(this.images.call)
this.hideChildren(this.images.check)
this.hideChildren(this.images.raise)
this.hideChildren(this.images.bet)
this.hideChildren(this.images.betSlider)
$('#betSize').css('display','none')
     

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
        self.hideAllBets()
        //hide the pot
        self.hideChildren(self.images.totalPotSize) //main pot
        //side pots
         for(var i=0; i<this.images.pots.length;i++){
        self.hideChildren(self.images.pots[i].potSize)
        self.hideChildren(self.images.pots[i].chips)}


        //unbind scroll wheel events
         $(document).unbind('mousewheel')
         $(document).unbind('DOMMouseScroll')
 }


 this.winners = function (players) {
//create pots array
var potArrayLength = 0
for(var i = 0;i<players.length;i++){
if(players[i].chips_won.length>potArrayLength){potArrayLength = players[i].chips_won.length}
}
var pots = []
for(var i =0;i<potArrayLength;i++){
  pots.push('placeholder')
}

     // player is array, so players[i].chips_won = array[amountWon, amountWon]
      var chipAnimationTime = 1000
      var timeBetweenAnimations = 3000
      var timeAtEnd = 700
        var ticks = 8
        var chipStacks = []
        for(var i = 0;i<players.length;i++){chipStacks.push([])}
        var callbackNumber = 0
        //push animateImages into an array
       // we want to end up with an array of these for each pot: [seatNumber, amount]
       var potWinners = []
       var temporaryStacks = []
    var potIntoChipAnimationArray = []
    var callbacks = []
    var finalArray = []
    //create empty array for chips in front of each player
   var chipsInFrontOfPlayer =[]
    for(var i =0;i<self.images.seats.length;i++){chipsInFrontOfPlayer.push(0)}

       for(var i=0;i<pots.length;i++){
           //increase the length of data array to match number of pots
          potWinners.push([])
          //increase the length of animation array to match number of pots
           potIntoChipAnimationArray.push([])
           for(var n=0;n<players.length;n++){
              var winnings =  players[n].chips_won[i]
              if(winnings>0){
                temporaryStacks.push([])
                potWinners[i].push({seat:players[n].seat, amountWon: winnings, temporaryStackNumber:temporaryStacks.length - 1 })
                
              }
               
           }
       }
   
       //now we create arrays of functions for animations FROM pot TO player
        _.each(_.range(potWinners.length), function(potNumber) {
            var callID = 0
            //skip pot if empty
            if(!_.isEmpty(potWinners[potNumber])){

                //iterate through all the data of winners in  potWinners[potNumber]
    
                _.each(_.range(potWinners[potNumber].length), function(i) {
                    //calculate distance each trip will travel based on bottom chip

                var animationDistanceX = self.images.seats[potWinners[potNumber][i].seat].firstChip.position.x - self.images.pots[potNumber].firstChip.position.x 
                var animationDistanceY = self.images.seats[potWinners[potNumber][i].seat].firstChip.position.y - self.images.pots[potNumber].firstChip.position.y 
                //calculate distance between first and second chip column
                var columnDistance = self.images.seats[potWinners[potNumber][i].seat].secondColumnChip.position.x - self.images.seats[potWinners[potNumber][i].seat].firstChip.position.x 

  //create each separate player's chip winnings in the pot, but do not display yet
self.displayChipStack(potWinners[potNumber][i].amountWon, temporaryStacks[potWinners[potNumber][i].temporaryStackNumber], self.images.pots[potNumber].firstChip.position.x, self.images.pots[potNumber].firstChip.position.y, { hidden:true})
               
  potIntoChipAnimationArray[potNumber].push(function(callback){
                self.displayChildren(temporaryStacks[potWinners[potNumber][i].temporaryStackNumber].chips)
                console.log('displaying the chips of player '+ potWinners[potNumber][i].seat)
                callback(null, callID)
       })
  callID++

                //iterate through chipstack to push animations of each chip into an array
                _.each(_.range(temporaryStacks[potWinners[potNumber][i].temporaryStackNumber].chips.length), function(n){

potIntoChipAnimationArray[potNumber].push(function(callback){
   //animate chipstacks to the players      

      self.animateImage(temporaryStacks[potWinners[potNumber][i].temporaryStackNumber].chips[n].position.x, temporaryStacks[potWinners[potNumber][i].temporaryStackNumber].chips[n].position.y, chipAnimationTime,ticks, temporaryStacks[potWinners[potNumber][i].temporaryStackNumber].chips[n], temporaryStacks[potWinners[potNumber][i].temporaryStackNumber].chips[n].position.x +animationDistanceX, temporaryStacks[potWinners[potNumber][i].temporaryStackNumber].chips[n].position.y+ animationDistanceY, function(){callback(null, callID)})
  //   console.log('animating the '+ n+'th chip in the  temporary stack number '+potWinners[potNumber][i].temporaryStackNumber)
                }) 

                callID++
                
                })

                })
                callbackNumber++
    }
    })

    var errorNumber = 0
    _.each(_.range(potIntoChipAnimationArray.length), function(potNumber){
        if(!_.isEmpty(potIntoChipAnimationArray[potNumber])){

        finalArray.push(function(next){
               //remove chip images from pot
               self.hideChildren(self.images.pots[potNumber].chips)
               self.hideChildren(self.images.pots[potNumber].potSize)
    async.parallel(potIntoChipAnimationArray[potNumber], function(err, results){next(null, errorNumber)})

})

errorNumber++

 finalArray.push(function(next){

     _.each(_.range(potWinners[potNumber].length), function(i) {
         //define seatNumber

         var seatNumber = potWinners[potNumber][i].seat
         //update how many chips a player has
         chipsInFrontOfPlayer[seatNumber] = potWinners[potNumber][i].amountWon + chipsInFrontOfPlayer[seatNumber]
         console.log('drawing chips next to player' +seatNumber +' seat')

          console.log('chips = ' + chipsInFrontOfPlayer[seatNumber]+  ' at '+ self.images.seats[seatNumber].firstChip.position.x+', '+ self.images.seats[seatNumber].firstChip.position.y)
          console.log(seatNumber)
                     self.images.seats[seatNumber].bet.text.text =  chipsInFrontOfPlayer[seatNumber]
    self.displayChipStack(chipsInFrontOfPlayer[seatNumber], self.images.seats[seatNumber], self.images.seats[seatNumber].firstChip.position.x, self.images.seats[seatNumber].firstChip.position.y)


  //  self.displayChildren(self.images.seats[seatNumber].chips)
    self.displayChildren(self.images.seats[seatNumber].bet)
if(self.stage.contains(self.images.seats[seatNumber].chips[0].image)) {
  console.log(self.images.seats[seatNumber].chips)
}
        //remove temporary animated chipstack
        self.hideChildren(temporaryStacks[potWinners[potNumber][i].temporaryStackNumber].chips)
            console.log('finished hiding temporary stack number '+potWinners[potNumber][i].temporaryStackNumber)

self.stage.update()
})

console.log('start waiting after pot number '+potNumber)
var wait = setTimeout(function(){
    console.log('callback function called')
    next(null, errorNumber)

}, timeBetweenAnimations) //end timeout function


})

    errorNumber++

 }// end check if pot is empty
})

//update player stack sizes
finalArray.push(function(next){
for(var i = 0;i<players.length;i++){

  self.images.seats[players[i].seat].status.text.text = players[i].chips
if(i == players.length-1){next(null, errorNumber)}
}

}
)//end push

 async.series(finalArray, function(err, results){
  self.stage.update()
    console.log('winners async series completed with the following errors next line and results 2nd line')
  console.log(err)
  console.log(results)


 })
 
 }

    this.displayopenSeats = function(openSeats){
        
for (var i = 0; i < openSeats.length; i = i + 1)
        {this.displayImage(this.images.seats[openSeats[i]].openSeat)
        this.displayText(this.images.seats[openSeats[i]].openSeat)}
    }

    this.displayInHandOptions = function(){
        
        this.displayChildren(this.images.foldToAnyBet)
        this.displayChildren(this.images.sitOutNextHand)
         this.displayChildren(this.images.sitOutNextBlind)
    }

    this.hideSeatedOptions = function(){
        this.hideChildren(this.images.foldToAnyBet)
         this.hideChildren(this.images.sitOutNextHand)
          this.hideChildren(this.images.sitOutNextBlind)
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
  this.updateBetSize(minBet)

  //display betSlider 
  this.displayChildren(this.images.betSlider)
$('#betSize').css('display','inline')

//scroll wheel

    $(document).bind('mousewheel', function(event) {

wheelScrolls = event.originalEvent.wheelDelta/120
self.events.wheelScroll(wheelScrolls)
        })
     $(document).bind('DOMMouseScroll', function(event) {
      
wheelScrolls = event.originalEvent.wheelDelta/120
self.events.wheelScroll(wheelScrolls)
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
            
                     if(_.isNumber(this.gameState.userSeatNumber)) {
                
                this.hideChildren(this.images.seats[seatNumber].openSeat)
                this.displayChildren(this.images.seats[seatNumber].disabledSeat)
            }

         else     if((this.gameState.userSeatNumber == false) || _.isNull(this.gameState.userSeatNumber)||_.isUndefined(this.gameState.userSeatNumber)){
     
                this.hideChildren(this.images.seats[seatNumber].disabledSeat)
            this.displayChildren(this.images.seats[seatNumber].openSeat)

            }

            
              this.hideChildren(this.images.seats[seatNumber].seat)
            this.hideChildren(this.images.seats[seatNumber].status)
            this.hideChildren(this.images.seats[seatNumber].playerName)
            this.hideText(this.images.seats[seatNumber].action)
            this.hideText(this.images.seats[seatNumber].winner)
            this.hideText(this.images.seats[seatNumber].countdown)
            break;

            default:

             if(_.isNumber(this.gameState.userSeatNumber)) {
                
                this.hideChildren(this.images.seats[seatNumber].openSeat)
                this.displayChildren(this.images.seats[seatNumber].disabledSeat)
            }
        
      else        if((this.gameState.userSeatNumber == false) || _.isNull(this.gameState.userSeatNumber)||_.isUndefined(this.gameState.userSeatNumber)){
                this.hideChildren(this.images.seats[seatNumber].disabledSeat)
            this.displayChildren(this.images.seats[seatNumber].openSeat)

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


    this.playerActs =function(seatNumber, actionText, fadeTimeInSeconds){
         //if player is current user, hide action buttons
        if(seatNumber === self.gameState.userSeatNumber){this.hideAllActionButtons(this.gameState.userSeatNumber)}
        this.gameState.seats[seatNumber].displayMessageType = 'action'

        self.images.seats[seatNumber].action.text.text = 'actionText'

       

        var interval = 100
        var alpha
        if(fadeTimeInSeconds && typeof fadeTimeInSeconds == 'number'){alpha = fadeTimeInSeconds}
        else{alpha = 2}

      var playerAction =   setInterval(function() {

          if(self.gameState.seats[seatNumber].displayMessageType != 'action'||alpha<=0)
          {
                if(self.gameState.seats[seatNumber].displayMessageType === 'action'){self.gameState.seats[seatNumber].displayMessageType = 'seat'}
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
 //hide other messages on the seat box
        self.displayCorrectSeatMessage(seatNumber)

}, interval)
    }

    this.playerWins =function(seatNumber, chipsWon, fadeTimeInSeconds){
        
        this.gameState.seats[seatNumber].displayMessageType === 'winner'

         self.images.seats[seatNumber].winner.text.text = ''
          //hide other messages on the seat box


         var interval = 100
         var alpha
        if(typeof fadeTimeInSeconds == 'number'){alpha = fadeTimeInSeconds}
        else{alpha = 2.5}


      var declareWinner =   setInterval(function() {

          if(self.gameState.seats[seatNumber].displayMessageType != 'winner'||alpha<=0)
          {
                if(self.gameState.seats[seatNumber].displayMessageType === 'winner'){self.gameState.seats[seatNumber].displayMessageType = 'seat'}
                
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
self.displayCorrectSeatMessage(seatNumber)

}, interval)

    }

    this.playerToAct =function(seatNumber, timeoutInMS){
      self.gameState.seats[seatNumber].timeToAct = timeoutInMS
         self.gameState.seats[seatNumber].toAct = true

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

var originalBorderColor = self.images.seats[0].seat.image.borderColor
var originalMiddleDividerColor = self.images.seats[0].seat.image.middleDividerColor

var toActTimeLeftBorderColor = '#FFFF00'
var toActBorderColor = originalBorderColor
var toActMiddleDividerColor = '#FFFFFF'

        var timeToChangeColors = 3000
        var ticksPerColorChange = 30
        var interval = timeToChangeColors/ticksPerColorChange
        var lastTick = ticksPerColorChange-1
         var tick = 0
         var originalFillColor = self.images.seats[seatNumber].seat.image.fillColor
         var targetFillColorsArray = [[255,0,0],[0,0,0]]
         var lastCompletedFillColorCounter = -1


 
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
console.log('current time left to act = ' + self.gameState.seats[seatNumber].timeToAct)
console.log('original time to act = ' + timeoutInMS)
   self.images.drawSeat(self.images.seats[seatNumber].seat, toActBorderColor, newFillColor, toActMiddleDividerColor, {borderFillRatio: self.gameState.seats[seatNumber].timeToAct/timeoutInMS, newFillColor:toActTimeLeftBorderColor})
    self.stage.update()
    
                if (self.gameState.seats[seatNumber].toAct==false)
                  {
                      clearInterval(countdown)
                     self.images.drawSeat(self.images.seats[seatNumber].seat, originalBorderColor, originalFillColor, originalMiddleDividerColor)
                      }
                      self.gameState.seats[seatNumber].timeToAct = self.gameState.seats[seatNumber].timeToAct - interval
        },interval)

    }



    

 this.startCountdown = function(seatNumber, secondsToAct){
secondsToAct = parseInt(secondsToAct)
     if(self.gameState.seats[seatNumber].toAct == true) {this.gameState.seats[seatNumber].displayMessageType = 'countdown'
         self.images.seats[seatNumber].countdown.text.text = 'Time: '+secondsToAct
     }
                  //hide other messages on the seat box

var interval = 1000
      var countdown = setInterval(function() {

          if(self.gameState.seats[seatNumber].displayMessageType != 'countdown'|| self.gameState.seats[seatNumber].toAct != true){clearInterval(countdown)}

   else if ( secondsToAct>= 0){
        self.images.seats[seatNumber].countdown.text.text = 'Time: '+secondsToAct
       secondsToAct=secondsToAct-1
       self.stage.update()
   }

   else{
        if(self.gameState.seats[seatNumber].displayMessageType == 'countdown'){self.gameState.seats[seatNumber].displayMessageType = 'seat'}
        clearInterval(countdown)
       }
       
     self.displayCorrectSeatMessage(seatNumber)
   
}, interval)

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
    if(parentOfImageObject.image.onClick == null){parentOfImageObject.image.onClick = self.events.onButtonClick }
     if(parentOfImageObject.image.onPress == null){ parentOfImageObject.image.onPress = self.events.buttonMouseDown}
     
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
        self.gameState.messageBox.messageBoxImageContainerIndex = self.gameState.messageBox.messageBoxImageContainerIndex - self.gameState.containerImageIndexes.containersPerMessageBox
    }


    this.displayMessageBox = function(messageString, messageInfo){
       var messageBoxImageContainerIndex = this.gameState.containerImageIndexes.initialMessageBox

           for(var i= this.gameState.containerImageIndexes.initialMessageBox;i<self.images.containers.length;i++){
           if(self.images.containers[i] && self.images.containers[i].isVisible() == false){
                messageBoxImageContainerIndex = i
                i=self.images.containers.length
           }
        }



        //check if this is the first(bottom) messagebox displayed
        if(messageBoxImageContainerIndex == this.gameState.containerImageIndexes.initialMessageBox){
       //hide html cashier(if visible)
       if( $('#maxRadio').is(':visible')){
          
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
        var messageBoxWindowX = Math.floor(stageWidth/2 - messageBoxWindowWidth/2)
        var messageBoxWindowY = Math.floor(stageHeight/2 - messageBoxWindowHeight/2)
        

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
       if(_.isNull(messageInfo.title)||_.isUndefined(messageInfo.title)||!(_.isString(messageInfo.title)||!_.isNumber(messageInfo.title))){messageInfo.title = 'Undefined Error'}
       if(_.isNull(messageInfo.titleSizeAndFont)||_.isUndefined(messageInfo.titleSizeAndFont)){messageInfo.titleSizeAndFont = '18px Arial'}
       if(_.isNull(messageInfo.titleColor)||_.isUndefined(messageInfo.titleColor)){ messageInfo.titleColor = '#000000'}
       if(_.isNull(messageInfo.sizeAndFont)||_.isUndefined(messageInfo.sizeAndFont)){messageInfo.messageSizeAndFont = '13px Arial'}
    if(_.isNull(messageInfo.messageColor)||_.isUndefined(messageInfo.messageColor)){ messageInfo.messageColor = '#000000'}
    if(_.isNull(messageInfo.buttonSizeAndFont)||_.isUndefined(messageInfo.buttonSizeAndFont)){messageInfo.buttonSizeAndFont = '13px Arial'}
     if(_.isNull(messageInfo.buttonTextColor)||_.isUndefined(messageInfo.buttonTextColor)){ messageInfo.buttonTextColor = '#000000'}
    if(_.isNull(messageInfo.buttonBackgroundColor)||_.isUndefined(messageInfo.buttonBackgroundColor)){ messageInfo.buttonBackgroundColor = '#0000FF'}
    if(_.isNull(messageInfo.okayText)||_.isUndefined(messageInfo.okayText)){ messageInfo.okayText = 'OK'}
    if(_.isNull(messageInfo.cancelText)||_.isUndefined(messageInfo.cancelText)){ messageInfo.cancelText = 'Cancel'}



       //set button locations
    if(messageInfo.cancel != true){
        var okayX = stageWidth/2 - buttonWidth/2
        }
        else{
     var okayX =    stageWidth/2 - distanceBetweenButtons/2 - buttonWidth    
     var cancelX =  stageWidth/2 + distanceBetweenButtons/2 
        }
  
        //background bitmap and closeX image are in the this.setDefaults() function
        //set proper x, y, width, and height of background and closeX image

        self.images.messageBox[messageBoxImageContainerIndex].window.position.x = messageBoxWindowX
        self.images.messageBox[messageBoxImageContainerIndex].window.position.y = messageBoxWindowY
        self.images.messageBox[messageBoxImageContainerIndex].window.size.x = messageBoxWindowWidth
        self.images.messageBox[messageBoxImageContainerIndex].window.size.y = messageBoxWindowHeight
        self.images.messageBox[messageBoxImageContainerIndex].window.positionImage()
        

    //add closeX Image
            var closeX =messageBoxWindowX+messageBoxWindowWidth- closeXRightOffset- closeXWidth
        var closeY =  messageBoxWindowY+ closeXTopOffset 
    self.images.messageBox[messageBoxImageContainerIndex].closeWindow.position.x = closeX
      self.images.messageBox[messageBoxImageContainerIndex].closeWindow.position.y = closeY
        self.images.messageBox[messageBoxImageContainerIndex].closeWindow.size.x = closeXWidth
        self.images.messageBox[messageBoxImageContainerIndex].closeWindow.size.y = closeXHeight
        self.images.messageBox[messageBoxImageContainerIndex].closeWindow.positionImage()

if(messageInfo.closeWindowMessages){
  self.images.messageBox[messageBoxImageContainerIndex].closeWindow.messages = messageInfo.closeWindowMessages
}
        if(messageInfo.closeWindowEvent){
          //check if is a string submitted via server
          if(_.isString(messageInfo.closeWindowEvent) ){
            self.images.messageBox[messageBoxImageContainerIndex].closeWindow.image.onClick = eval(messageInfo.closeWindowEvent)
          }
          else{self.images.messageBox[messageBoxImageContainerIndex].closeWindow.image.onClick = messageInfo.closeWindowEvent}
        } //end check if messageInfo.closeWindowEvent exists
        else{
 self.images.messageBox[messageBoxImageContainerIndex].closeWindow.image.onClick = function(event){
  self.events.onButtonClick(event)
  self.hideMessageBox()
}
}




        //title
        self.images.messageBox[messageBoxImageContainerIndex].windowTitle = new self.images.Item (messageBoxWindowX,messageBoxWindowY, messageBoxWindowWidth,outerTopHeight,messageBoxImageContainerIndex+1)
         self.images.addItemText(self.images.messageBox[messageBoxImageContainerIndex].windowTitle, messageInfo.title, messageInfo.titleSizeAndFont, messageInfo.titleColor)

         //message
        self.images.messageBox[messageBoxImageContainerIndex].message = new self.images.Item (textX,innerMessageBoxY+textTopOffset, innerMessageBoxWidth -textLeftOffset*2 ,textHeight,messageBoxImageContainerIndex+1)
        self.images.addItemText(self.images.messageBox[messageBoxImageContainerIndex].message, messageString, messageInfo.messageSizeAndFont, messageInfo.messageColor)
        self.images.messageBox[messageBoxImageContainerIndex].message.text.lineWidth = self.images.messageBox[messageBoxImageContainerIndex].message.size.x*.9
 self.images.messageBox[messageBoxImageContainerIndex].message.text.maxWidth = null

   //OK button
        self.images.messageBox[messageBoxImageContainerIndex].okay =  new self.images.Item (okayX,buttonY, buttonWidth,buttonHeight,messageBoxImageContainerIndex+1) 
        self.images.itemAsRectangle( self.images.messageBox[messageBoxImageContainerIndex].okay, messageInfo.buttonBackgroundColor )
        self.images.addItemText( self.images.messageBox[messageBoxImageContainerIndex].okay, messageInfo.okayText, messageInfo.buttonSizeAndFont,  messageInfo.buttonTextColor)
            //asign messages if okaymessages exists
            if(messageInfo.okayMessages){    
            self.images.messageBox[messageBoxImageContainerIndex].okay.messages = messageInfo.okayMessages}
                //assign event if assigned

       if(messageInfo.okayEvent){
        //check if is a string submitted via server

          if(_.isString(messageInfo.okayEvent) ){

            self.images.messageBox[messageBoxImageContainerIndex].okay.image.onClick = eval(messageInfo.okayEvent)
          }
          else{self.images.messageBox[messageBoxImageContainerIndex].okay.image.onClick = messageInfo.okayEvent}
         
           }//end check if messageInfo.okayEvent exists
      else{
            self.images.messageBox[messageBoxImageContainerIndex].okay.image.onClick = function(event){
              self.events.onButtonClick(event)
      self.hideMessageBox()
        }
      }
//cancel button
        if(messageInfo.cancel && messageInfo.cancel == true){
        self.images.messageBox[messageBoxImageContainerIndex].cancel =  new self.images.Item (cancelX,buttonY, buttonWidth,buttonHeight,messageBoxImageContainerIndex+1) 
        self.images.itemAsRectangle( self.images.messageBox[messageBoxImageContainerIndex].cancel, messageInfo.buttonBackgroundColor )
        self.images.addItemText( self.images.messageBox[messageBoxImageContainerIndex].cancel, messageInfo.cancelText, messageInfo.buttonSizeAndFont,  messageInfo.buttonTextColor)
        //add message to cancel if available
        if(messageInfo.cancelMessages){
          self.images.messageBox[messageBoxImageContainerIndex].cancel.messages = messageInfo.cancelMessages
          }
          //add cancel event if availble
           if(messageInfo.cancelEvent){
             //check if is a string submitted via server
          if(_.isString(messageInfo.cancelEvent) ){
            self.images.messageBox[messageBoxImageContainerIndex].cancel.image.onClick = eval(messageInfo.cancelEvent)
          }
          else{self.images.messageBox[messageBoxImageContainerIndex].cancel.image.onClick = messageInfo.cancelEvent}
             }//end check if messageInfo.cancelEvent exists
       else{  
        self.images.messageBox[messageBoxImageContainerIndex].cancel.image.onClick = function(event){
 self.events.onButtonClick(event)
      self.hideMessageBox()
        }
       }
     }//end checking if messageInfo.cancel is true
       //remove previous instances of cancel if it doesn't exist
    else{self.images.messageBox[messageBoxImageContainerIndex].cancel = null}
        //disable mouse events for all containers under the messageBox
        for(var i = 0; i<messageBoxImageContainerIndex;i++){
            self.images.containers[i].mouseEnabled = false
        }

                self.displayChildren(self.images.messageBox[messageBoxImageContainerIndex])
              console.log( self.images.messageBox[messageBoxImageContainerIndex].closeWindow)
              console.log(self.images.messageBox[messageBoxImageContainerIndex].window)

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


        //set defaults
        if(_.isUndefined(info.currency_per_chip)||_.isNull(info.currency_per_chip)){info.currency_per_chip = 1}
        if(_.isUndefined(info.currency)||_.isNull(info.currency)){info.currency = 'Chips'}
          
          this.gameState.cashier.currency = info.currency
             this.gameState.cashier.min = info.min*info.currency_per_chip
        this.gameState.cashier.max = info.max*info.currency_per_chip
        this.gameState.cashier.balance = info.balance_in_currency
        this.gameState.cashier.table_name = info.table_name
        this.gameState.cashier.small_blind = info.small_blind*info.currency_per_chip
        this.gameState.cashier.big_blind = info.big_blind*info.currency_per_chip
        this.gameState.cashier.table_min = info.table_min*info.currency_per_chip
        

       this.images.cashier.blinds.text.text = info.currency_per_chip*info.small_blind+'/'+info.currency_per_chip*info.big_blind

         this.images.cashier.tableNameValue.text.text = info.table_name

        this.images.cashier.tableMinValue.text.text = info.currency_per_chip*info.table_min

        this.images.cashier.tableMaxValue.text.text = info.currency_per_chip*info.table_max

        this.images.cashier.playerMinValue.text.text = info.currency_per_chip*info.min

       this.images.cashier.accountBalanceValue.text.text = this.gameState.cashier.balance

       this.images.cashier.currency.text.text = info.currency+':'

       //set initial values of text boxes
             $("#otherAmount").val('')
           $('#autoRebuyAmount').val('')
       $("#maxAmount").val(this.gameState.cashier.max)
        $("#maxAmount").attr("readonly", true)

//check radio buttons when textbox is focused

    $("#otherAmountDiv").children().mousedown(function(event) {
      self.events.cashierInputSelected(event)
        })

            $("#autoRebuyDiv").children().mousedown(function(event) {
                 self.events.cashierInputSelected(event)
        })
        
          $("#maxDiv").children().mousedown(function(event) {
self.events.cashierInputSelected(event)
        })

          $('#cashierDiv').find("input[type = 'text']").focus(function(event){
            self.events.onCashierTextFieldFocus(event)
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
    
this.streetEnds = function(potSizes){

        //unbind scroll wheel events
         $(document).unbind('mousewheel')

      var animationTime = 5
        var ticks = 5
        var chipIntoPotAnimationArray = []
        var callBackNumber = 0

var chipMoveSound = createjs.Sound.createInstance(this.images.sources.moveChipsSound)

        //push animateImages into an array
        _.each(_.range(self.images.seats.length), function(seatNumber) {

            if(self.images.seats[seatNumber].chips && Array.isArray( self.images.seats[seatNumber].chips) && self.images.seats[seatNumber].chips[0]  && self.images.seats[seatNumber].chips[0].image && self.stage.contains(self.images.seats[seatNumber].chips[0].image) )
            {
                
                var animationDistanceX = self.images.pots[0].firstChip.position.x -  self.images.seats[seatNumber].firstChip.position.x
                var animationDistanceY = self.images.pots[0].firstChip.position.y  - self.images.seats[seatNumber].firstChip.position.y

                 _.each(_.range(self.images.seats[seatNumber].chips.length), function(n)
                 {

chipIntoPotAnimationArray.push(function(callback){

  self.hideText(self.images.seats[seatNumber].bet)
      self.animateImage(self.images.seats[seatNumber].chips[n].position.x, self.images.seats[seatNumber].chips[n].position.y, animationTime, ticks, self.images.seats[seatNumber].chips[n], self.images.seats[seatNumber].chips[n].position.x + animationDistanceX, self.images.seats[seatNumber].chips[n].position.y+ animationDistanceY, function(){callback(null, callBackNumber)})

                }) 
                })//end iteration through each chip in the chipstack
                }//make sure player has bet images in front of him
                })//iterate through each seat
 

async.series([
function(next){
  if(chipIntoPotAnimationArray.length>0){chipMoveSound.play()}
    async.parallel(chipIntoPotAnimationArray, function(err, results){next(null, 1)})
},

function(next){
  
  //update pot sizes
if(potSizes.length > 1){
                for(var i =0;i<potSizes.length;i++){
                  if(parseFloat(potSizes[i])>0){

    self.displayChipStack(parseFloat(potSizes[i]), self.images.pots[i], self.images.pots[i].firstChip.position.x, self.images.pots[i].firstChip.position.y)
     self.updatePotSize(potSizes[i],i)
   }
    }
    if(chipIntoPotAnimationArray.length>0){chipMoveSound.play()    }
  self.hideAllBets()  
    next(null, 2)
}//end check if potSizes.length>1
//if only 1 pot do not display individual potsizes
else{self.hideChildren(self.images.pots)}
}
  ])
}


this.updateUserOptionsBasedOnFlagsAndPreactions = function(){

if(_.isNull(self.gameState.userSeatNumber) || _.isUndefined(self.gameState.userSeatNumber))
  {return 'cannot update display because there is no userSeatNumber'}
var user = self.gameState.seats[self.gameState.userSeatNumber]
var flags = self.gameState.seats[self.gameState.userSeatNumber].flags
var preActionStreet = self.gameState.seats[self.gameState.userSeatNumber].preActions.street
var preActionHand = self.gameState.seats[self.gameState.userSeatNumber].preActions.hand
var preActionOnce = self.gameState.seats[self.gameState.userSeatNumber].preActions.once
             //display sitout next hand depending on user's flag
              if(flags.pending_sit_out == true){
self.hideChildren(self.images.sitOutNextBlind)
self.hideChildren(self.images.sitOutNextBlindOn)
self.hideChildren(self.images.sitOutNextHand)
                self.displayChildren(self.images.sitOutNextHandOn)
              }
             else if (self.gameState.seats[self.gameState.userSeatNumber].sitting_out != true){
              self.hideChildren(self.images.sitOutNextHandOn)
              self.displayChildren(self.images.sitOutNextHand)
            }

                  //check if user is sitting out
                  if(user.sitting_out == true){
                    self.hideChildren(self.images.sitOutNextBlind)
self.hideChildren(self.images.sitOutNextBlindOn)
self.hideChildren(self.images.foldToAnyBet)
self.hideChildren(self.images.foldToAnyBetOn)
                    this.playerSitsOut(self.gameState.userSeatNumber)
                    self.hideChildren(self.images.sitOutNextHand)
                     self.displayChildren(self.images.sitOutNextHandOn)
                       //either display rebuy OR sitin if user is sitting out
             if(user.notEnoughChips == true){
              self.hideChildren(self.images.sitIn)
              self.displayChildren(self.images.rebuy)
}
                 else{ 
                  self.hideChildren(self.images.rebuy)
                  self.displayChildren(self.images.sitIn)
                }
}//user.sitting_out == true

         //if user is not sitting out
         else{
          self.hideChildren(self.images.sitIn)
          self.hideChildren(self.images.rebuy)
                            //display sit out next big blind depending on user's flag
              if(flags.post_blind == false){
self.hideChildren(self.images.sitOutNextBlind)
                self.displayChildren(self.images.sitOutNextBlindOn)
              }
                    else{
                      self.hideChildren(self.images.sitOutNextBlindOn)
                      self.displayChildren(self.images.sitOutNextBlind)
                    }
  //check if user is holding cards to display fold toAnyBet
             if(self.stage.contains(self.images.seats[self.gameState.userSeatNumber].shownCard0.image)){
                        //fold to any bet button on or off
                        if(preActionHand.check == true && preActionHand.fold == true){
self.hideChildren(self.images.foldToAnyBet)
                          self.displayChildren(self.images.foldToAnyBetOn)
                        }
             else{ 
              self.hideChildren(self.images.foldToAnyBetOn)
              self.displayChildren(self.images.foldToAnyBet)
            }
         }//end check if user is holding cards

} //end check if useris not sitting out
}

this.updateLocalDataBasedOnServerPlayerObject = function(player){
  if(player.is_you == true){self.gameState.userSeatNumber = player.seat}
    //updated local based on flags
if(player.flags){
  var flags = player.flags
self.gameState.seats[player.seat].flags.pending_sit_out = flags.pending_sit_out
self.gameState.seats[player.seat].flags.post_blind = flags.post_blind
self.gameState.seats[player.seat].preActions.hand.check = flags.check
self.gameState.seats[player.seat].preActions.hand.fold = flags.fold
}//if player.flags
self.gameState.seats[player.seat].sitting_out = player.sitting_out
self.gameState.seats[player.seat].chips = player.chips
self.gameState.seats[player.seat].username = player.username
if(_.isNumber(player.chips)&& player.chips>0){self.gameState.seats[player.seat].notEnoughChips = false}
  else{self.gameState.seats[player.seat].notEnoughChips = true}

}

   this.displayInitialTableState=function(table_state){

 //set up animation variables
 var tickerInterval = 5
var ticksPerAnimation = 1
var numTicks = 0
createjs.Ticker.addEventListener('tick', tick)
createjs.Ticker.setInterval(tickerInterval)
createjs.Ticker.setPaused(false)
       var seatsLoaded = []

//add one elipse to the loading text
self.images.imageLoading.title.text.text = self.images.imageLoading.title.text.text+ '.'
this.stage.update()
function tick(event){
  
    //update loading images graphic evert 3 ticks
    if(numTicks%ticksPerAnimation == 0){
        
        self.images.imageLoading.title.text.text = self.images.imageLoading.title.text.text+ '.'
    }


       var updateLoadedSeats = function(){
           
           for(var i =0; i<table_state.max_players;i++){
               if(seatsLoaded[i] != true){
               if(self.images.containers[self.images.seats[i].seat.position.z].contains(self.images.seats[i].seat.image) || self.images.containers[self.images.seats[i].disabledSeat.position.z].contains(self.images.seats[i].disabledSeat.image) || self.images.containers[self.images.seats[i].openSeat.position.z].contains(self.images.seats[i].openSeat.image))
           seatsLoaded[i] = true
           }
           }
       }
       
 //set up function to check whether loading has completed
       var checkSeatsLoaded = function(){
            for(var i =0; i<table_state.max_players;i++){
               if(seatsLoaded[i] != true){return false }
           }
           return true
       }
       //update status on whether seats have loaded
       updateLoadedSeats()

       // check if all seats are loaded
       if(checkSeatsLoaded() ==true){
                      createjs.Ticker.removeEventListener("tick", tick)
                      //remove all loadingContainers from the stage and remove all children from them
                      self.stage.removeAllChildren()
                      //add all containers to the stage
                      for(var i = 0;i<self.images.containers.length;i++){
                      self.stage.addChild(    self.images.containers[i])
           }
           
       }
       self.stage.update()
       numTicks ++
}

                 //display static items
         this.displayChildren(this.images.getChips)
         this.displayChildren(this.images.viewLobby)
         this.displayChildren(this.images.exitTable)

         this.images.currencyDisplay.text.text = '1 chip is equal to ' + table_state.currency_per_chip + ' ' + table_state.currency
this.displayChildren(this.images.currencyDisplay)

this.displayChildren(this.images.reportBug)

        //remove extra seats
        this.setNumberOfSeats(table_state.max_players)

        //comunity cards
        this.displayAllCommunity(table_state.community)
        
                //display seats and assign userSeatNumber
         for (var i = 0;i< table_state.seats.length;i++) {
          self.playerSits(table_state.seats[i].seat, table_state.seats[i].username, table_state.seats[i].chips)
          //update local data
          self.updateLocalDataBasedOnServerPlayerObject(table_state.seats[i])
          //assign userSeatNumber if player is user
         if(table_state.seats[i].is_you == true){
         this.gameState.userSeatNumber = table_state.seats[i].seat 
         self.updateUserOptionsBasedOnFlagsAndPreactions()
}//table_state.seats[i].is_you == true

else{ //if not user
if(table_state.seats[i].sitting_out == true){
self.playerSitsOut(table_state.seats[i].seat)
}//check if non-user is sitting out
}//perform if not user

}
        //display player's cards
         for(var i=0;i<table_state.players.length;i=i+1){
               if(!table_state.players[i].hand || table_state.players[i].hand.length == 0){this.displayHiddenCards(table_state.players[i].seat) }
              
                   else if(table_state.players[i].hand) {
                    this.displayHoleCards(table_state.players[i].hand, table_state.players[i].seat)
        }
        }//iteration through table_state.players

        //pot
        if(table_state.pot&&table_state.pot>0){this.updatePotSize(table_state.pot)}

         //current bets
         for (var i=0;i<table_state.players.length;i=i+1) { 
         this.playerPutsChipsInPot(table_state.players[i].seat,table_state.players[i].current_bet, table_state.players[i].chips)
         this.displayChipStack(table_state.players[i].current_bet, self.images.seats[table_state.players[i].seat], self.images.seats[table_state.players[i].seat].firstChip.position.x, self.images.seats[table_state.players[i].seat].firstChip.position.y)
         }


          //empty seats
         for (var i = 0; i<table_state.max_players;i++){  this.displayCorrectSeatMessage(i)    }

         //set game data
     self.gameState.bigBlind = table_state.big_blind
     self.gameState.minIncrement = table_state.min_increment
     self.gameState.cashier.currency = table_state.currency
     self.gameState.cashier.currency_per_chip =  table_state.currency_per_chip

    }
    
  //---------------------SOCKET CODE------------------------
    this.receiveTableState = function(){
   socket.once('table_state', function(table_state){
             
             self.displayInitialTableState(table_state)
            self.activateSockets()
    })
    socket.emit('get_table_state')
    }
     
    
    this.activateSockets = function(){
     
        

    socket.on('street_ends', function (potSizes){


        for(var i = 0;i<self.images.seats.length;i++){
if(self.gameState.seats[i].displayMessageType == 'action'||'seat'||'openSeat'||'disabledSeat'){}
    else{self.gameState.seats[i].displayMessageType = 'seat'}
//clear preactions for the street
self.gameState.seats[i].preActions.street = {}
        }


       self.streetEnds(potSizes)

    })

    //error received
       socket.on('error', function(errorString, messageInfo){


           if(messageInfo){}
            else{
           var messageInfo = {}
           messageInfo.okay = true
            
          }
          self.displayMessageBox(errorString, messageInfo)
                
})
        
 //player is refunded chips
       socket.on('player_gets_refund', function(player, stackSize, totalPotSize){
           var stackSize = player.chips
           var betSize = player.current_bet
           var seatNumber = player.seat

          self.playerPutsChipsInPot(seatNumber, betSize, stackSize)
           self.displayChipStack(betSize, self.images.seats[seatNumber], self.images.seats[seatNumber].firstChip.position.x, self.images.seats[seatNumber].firstChip.position.y)
                self.updatePotSize(totalPotSize)

})


    //community cards are dealt
       socket.on('community_dealt', function(community){


            self.dealCommunity(community)
                
})

socket.on('hands_dealt', function(players, tableInfo){
    //show dealer button
    self.images.dealerButton.image.x = self.images.seats[tableInfo.dealer].dealerButton.position.x
     self.images.dealerButton.image.y = self.images.seats[tableInfo.dealer].dealerButton.position.y
     self.displayChildren(self.images.dealerButton)

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


//flag is set
       socket.on('flag_set', function(flag, value){
         
           switch (flag){

case 'pending_sit_out':
self.gameState.seats[self.gameState.userSeatNumber].flags.pending_sit_out = value
/*
if(value ==true){
self.hideChildren(self.images.sitOutNextHand)
self.displayChildren(self.images.sitOutNextHandOn)

}
else if(value == false){
    self.hideChildren(self.images.sitOutNextHandOn)
    self.displayChildren(self.images.sitOutNextHand)
}
*/
           break;

           case 'post_blind':
           self.gameState.seats[self.gameState.userSeatNumber].flags.post_blind = value
/*
           if(self.stage.contains(self.images.sitOutNextBlindOn)||self.stage.contains(self.images.sitOutNextBlind)){

           if(value == true){

            self.hideChildren(self.images.sitOutNextBlindOn)
            self.displayChildren(self.images.sitOutNextBlind)
           }
   else    if(value == false){
            self.hideChildren(self.images.sitOutNextBlind)
            self.displayChildren(self.images.sitOutNextBlindOn)
           }
                }
                */
break;

case 'fold':
self.gameState.seats[self.gameState.userSeatNumber].preActions.hand.fold = value
/*
if(self.gameState.seats[self.gameState.userSeatNumber].preActions.street.check == true && self.gameState.seats[self.gameState.userSeatNumber].preActions.street.fold == true && self.stage.contains(self.images.foldToAnyBet))
{
self.hideChildren(self.images.foldToAnyBet)
self.displayChildren(self.images.foldToAnyBetOn)
}
else if(self.stage.contains(self.images.foldToAnyBetOn)){

self.hideChildren(self.images.foldToAnyBetOn)
self.displayChildren(self.images.foldToAnyBet)
}
*/
break;

case 'check':
self.gameState.seats[self.gameState.userSeatNumber].preActions.hand.check = value
/*
if(self.gameState.seats[self.gameState.userSeatNumber].preActions.street.check == true && self.gameState.seats[self.gameState.userSeatNumber].preActions.street.fold == true && self.stage.contains(self.images.foldToAnyBet))
{
self.hideChildren(self.images.foldToAnyBet)
self.displayChildren(self.images.foldToAnyBetOn)
}
else if(self.stage.contains(self.images.foldToAnyBetOn)){

self.hideChildren(self.images.foldToAnyBetOn)
self.displayChildren(self.images.foldToAnyBet)
}
*/
break;

default:
self.gameState.seats[self.gameState.userSeatNumber].flags[flag] = value

}
self.updateUserOptionsBasedOnFlagsAndPreactions()
     })


//hand dealt to user
       socket.on('hole_cards_dealt', function(hand, table_num, hand_num){
         self.gameState.holeCards = hand
         self.reportBug.text.text = 'click to report bugs via email to: CryptoPoker@gmail.com'+'hand# '+hand.hand_num
         self.stage.update()

     })


//player acts
       socket.on('player_acts', function(player, action, pot){

        self.playerActs(player.seat, action, 2)
    //display updated potsize if necessary
        if(pot){self.updatePotSize(pot)}

        switch(action){
        case 'fold':
        var foldSound = createjs.Sound.createInstance(self.images.sources.foldSound)
            foldSound.play()
        self.hideHoleCards(player.seat)
        self.hideBet(player.seat)
        if(player.seat == self.gameState.userSeatNumber){
            self.hideChildren(self.images.foldToAnyBet)
            self.hideChildren(self.images.foldToAnyBetOn)

            }
            break;

            case 'check':
            var checkSound = createjs.Sound.createInstance(self.images.sources.checkSound)
            checkSound.play()
            break;

            case'bet':
            var betSound = createjs.Sound.createInstance(self.images.sources.betSound)
            betSound.play()
            self.displayChipStack(player.current_bet, self.images.seats[player.seat], self.images.seats[player.seat].firstChip.position.x,self.images.seats[player.seat].firstChip.position.y )
            self.playerPutsChipsInPot(player.seat, player.current_bet, player.chips)
            break;

            case'call':
              var betSound = createjs.Sound.createInstance(self.images.sources.betSound)
            betSound.play()
             self.displayChipStack(player.current_bet, self.images.seats[player.seat], self.images.seats[player.seat].firstChip.position.x,self.images.seats[player.seat].firstChip.position.y )
            self.playerPutsChipsInPot(player.seat,player.current_bet, player.chips)
             break;

            case 'raise':
              var betSound = createjs.Sound.createInstance(self.images.sources.betSound)
            betSound.play()
             self.displayChipStack(player.current_bet, self.images.seats[player.seat], self.images.seats[player.seat].firstChip.position.x,self.images.seats[player.seat].firstChip.position.y )
            self.playerPutsChipsInPot(player.seat,player.current_bet, player.chips)
            break;

            case'post_blind':
              var betSound = createjs.Sound.createInstance(self.images.sources.betSound)
            betSound.play()
            self.displayChipStack(player.current_bet, self.images.seats[player.seat], self.images.seats[player.seat].firstChip.position.x,self.images.seats[player.seat].firstChip.position.y )
            self.playerPutsChipsInPot(player.seat,player.current_bet, player.chips)
            break;

        }
             self.gameState.seats[player.seat].toAct = false
             //clear preactions.once for user
             if(player.seat == self.gameState.userSeatNumber){
              self.gameState.seats[self.gameState.userSeatNumber].preActions.once = {}
        //unbind scroll wheel events
         $(document).unbind('mousewheel')
         $(document).unbind('DOMMouseScroll')
            }
})

//user to act 
 socket.on('act_prompt', function(actions, timeout){

self.playerToAct(self.gameState.userSeatNumber, timeout)
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

//hands turned face up
 socket.on('hands_shown', function(players){


           for(var i =0;i<players.length;i++){
         self.hideHoleCards(players[i].seat)
        self.displayHoleCards(players[i].hand, players[i].seat)
        }
        

})

//hands turned face up
 socket.on('update_time_to_act', function(seatNumber, time){

self.gameState.seats[seatNumber].timeToAct = time

})

//player to act (not the user)
 socket.on('player_to_act', function(player, timeout){
    var timeToCountDown = 3000

//if user = player, do not initiate to act function, as act_prompt will be sent instead
    if(player.seat != self.gameState.userSeatNumber){self.playerToAct(player.seat, timeout)}

var delayedCountDown = function(){
if( self.gameState.seats[player.seat].toAct == true){self.startCountdown(player.seat, Math.round(timeToCountDown/1000))}
}
     //do a countdown when time is low for non-user players
     if(player.seat != self.gameState.userSeatNumber){
     createjs.Tween.get(self.images.seats[player.seat].countdown, {override:true, loop:false})
     .wait(timeout-timeToCountDown)
    .call(delayedCountDown)
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
          self.updateLocalDataBasedOnServerPlayerObject(player) 
self.updateUserOptionsBasedOnFlagsAndPreactions()
/*
            self.hideChildren(self.images.sitIn)
            self.hideChildren(self.images.rebuy)
            self.hideChildren(self.images.sitOutNextHandOn)
            self.displayChildren(self.images.sitOutNextHand)
           */
            
}
        self.stage.update()
})

//player sits out
       socket.on('player_sits_out', function(player){
           self.images.seats[player.seat].status.text.text = 'Sitting Out'
   self.stage.update()
        if(player.seat == self.gameState.userSeatNumber){
       self.updateLocalDataBasedOnServerPlayerObject(player) 
self.updateUserOptionsBasedOnFlagsAndPreactions()
/*
            self.hideChildren(self.images.sitOutNextHand)
           
            self.hideChildren(self.images.sitOutNextBlind)
            self.hideChildren(self.images.sitOutNextBlindOn)
            //hide fold to any bet
            self.hideChildren(self.images.foldToAnyBet)
            self.hideChildren(self.images.foldToAnyBetOn)
            if(player.chips == 0){
                self.displayChildren(self.images.rebuy)
            }
            else{
            self.displayChildren(self.images.sitIn)
            }
             self.displayChildren(self.images.sitOutNextHandOn)
             */
}
       
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
        for (var i = 0;i<self.images.seats.length;i++){
            self.displayCorrectSeatMessage(i) }
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
    
        }
  )


//player adds chips to his stack
       socket.on('player_adds_chips', function(player,is_you){
           if(is_you == true){player.seat = self.gameState.userSeatNumber}
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

         self.winners(players)
   

})

//reset table
socket.on('reset_table', function(players){
         self.roundEnds()
 for(var i = 0;i<self.images.seats.length;i++){
  self.gameState.seats[i].preActions.street = {}
   self.gameState.seats[i].preActions.hand = {}
}

})
    }

   }

    //---------------END SOCKET CODE----------------------------

jQuery(document).ready(function(){
    holdemCanvas = new Table(10)
   holdemCanvas.initialize()
})


jQuery(window).load(function (){
     

 //   holdemCanvas.createAllItems()
  holdemCanvas.receiveTableState()

      console.log(document)

    })
 
    
