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
    function Table () {
self  = this
            this.events = {}
  this.imageData = {
      maxChipsPerColumn:5,
      distanceBetweenChipColumns:4,
      chatBoxAlpha:0.75,
      maxChipColumns:3,
      numberOfPlayersSet:false
  }

 this.sessionPreferences = {

      changeUserSeatViewTo:{value:false, updateValue: function(newValue){
this.value  = newValue
self.changeUserSeatView(this.value)
        } 
      },

tableChatFull:{

        defaultItemsToHideFalseHidesItem:{
                  hideDealerMessages:{value:true},
                  hideDealerMessagesOn: {value:false},
                  hidePlayerMessages:{value:true},
                  hidePlayerMessagesOn: {value:false},
                  hideObserverMessages:{value:true},
                  hideObserverMessagesOn: {value:false},
                  disableTouchScroll:{value:true},
                  disableTouchScrollOn:{value:false}

  }//default items to hide

}//table chat full

  }//session preferences declaration


  this.permanentPreferences = {
      

      bigBlindsPerHorizontalSliderTick :{value: 0.5},
      bigBlindsPerMouseScroll:{value: 0.5},
      timePerHorizontalSliderTick: {value:500},
      animate: {value:true},
      playerChatMaxLines:{value:3},


      chatTextColor: {value:'#000000',  updateValue: function(newValue){
this.value = newValue
        for(var i = 0 ;i<self.images.seats.length;i++){
self.images.seats[i].chat.text.color = this.value}//iterate thorugh this.images.seats

self.updateStages(self.images.seats[i].chat.position.z.stage)
      }//onchange function

    },
      

      tableChatFull:{
    // scrollBarType :   {value:'mCustomScrollbar'},
        chatMessageFontSize: {value:11 , updateValue: function(newValue){
this.value  = newValue
self.jQueryObjects.tableChatFullParagraph.css('font-size', this.value)

 
        } 

          },
        chatMessageFontColor: {value:'white', updateValue: function(newValue){

this.value  = newValue
self.jQueryObjects.tableChatFullParagraph.css('color', this.value)

        } 
           },

        windowColor: {value:'black'  },

        windowAlpha:{value: 0.4 , updateValue: function(newValue){

this.value = newValue
self.images.tableChatFull.window.alpha = this.value

         }//windowAlpha.updateValue
      }

  }//permanent preferences . tableChatFull

}//permanent preferences

this.performance = {}
this.performance.numCanvasClears = 0

        this.gameState = {}
        this.gameState.defaulttimeToActInMS = 15000
        this.gameState.numSeats = 10
        this.gameState.tableChatFull = {
          log:[],
          lastDisplayedLogIDNumber:null,
          currentlyDisplayingDealerMessages:null,
          currentlyDisplayingPlayerMessages:null,
          currentlyDisplayingObserverMessages:null,
scrollToBasedOnHiddenPixelsAtTopOfChatMessageText:99999999,
mouseDown:false
        }

        this.gameState.betSize = new Number
        this.gameState.displaySize = 'normal'
        this.gameState.secondsToAct
        this.gameState.userSeatNumber = false
        this.gameState.seats = []

        for(var i = 0;i<this.gameState.numSeats;i++){
             this.gameState.seats[i]= {}
             this.gameState.seats[i].displayMessageType = 'openSeat'
             this.gameState.seats[i].toAct = false
             this.gameState.seats[i].preActions = {}
             this.gameState.seats[i].preActions.once = {}
            this.gameState.seats[i].preActions.street = {}
             this.gameState.seats[i].preActions.hand = {}
             this.gameState.seats[i].flags = {}
         //     this.gameState.seats[i].originalSeatNumber = i
       //        this.gameState.seats[i].rotatedSeatNumber = i
       //         this.gameState.seats[i].nonRotatedSeatNumber = i
        }
        this.gameState.cashier = {}
        this.gameState.tableChatBox = {}
        this.gameState.messageBox = {}
        this.gameState.messageBox.activeStages = []

        var staticItems=0
        var holeCards=staticItems+1
        var buttons=holeCards+1
        var middleTableItemsAndAnimations=buttons+1
        var playerBubbleChat = middleTableItemsAndAnimations+1
        var chatBox=playerBubbleChat+1

        var tableChatFull=chatBox+1
        
        var cashier=tableChatFull+1
        var messageBox=cashier+1
        var loadingContainers=messageBox+1

        //initialize stages will iterate thorugh this list
        //ONLY CONTAINER :0 will be used
        this.gameState.zPositionData = { 
          containersPerCashier:3,
tableChatFullTotalContainers: 5,
  containersPerMessageBox:3,
numContainers:55
        }
            
           this.gameState.zPositionData.background={stage:staticItems,container:0, numContainers:2, stageOptions:{
mouseEnabled : false,
enableDOMEvents : false,
mouseOverFrequency:0,//disabled mousever
touchEnabled:false
            }//stage options
          }//background property,
            this.gameState.zPositionData.table={stage:staticItems,container:1}
            this.gameState.zPositionData.holeCards={stage:holeCards,container:0, newCanvas:true, numContainers:2,stageOptions:this.gameState.zPositionData.background.stageOptions}
            this.gameState.zPositionData.button={stage:buttons,container:0,numContainers:3,stageOptions:{
mouseEnabled : true,
enableDOMEvents : true,
touchEnabled:true,
mouseMoveOutside:true
}
            }//button

            this.gameState.zPositionData.playerBubbleChat={stage:playerBubbleChat, container:0, numContainers:2, stageOptions:this.gameState.zPositionData.background.stageOptions}
            this.gameState.zPositionData.communityCards={stage:middleTableItemsAndAnimations,container:0, numContainers:5,stageOptions:this.gameState.zPositionData.background.stageOptions}
            this.gameState.zPositionData.chips={stage:middleTableItemsAndAnimations,container:1}
            this.gameState.zPositionData.cardAnimation={stage:middleTableItemsAndAnimations,container:2}
            
            this.gameState.zPositionData.chat={stage:chatBox,container:0, numContainers:1,stageOptions:this.gameState.zPositionData.background.stageOptions}
             this.gameState.zPositionData.cashier={stage:cashier,container:0, canvasHidden:true,numContainers:2, newCanvas:true,stageOptions:this.gameState.zPositionData.button.stageOptions}
            
            this.gameState.zPositionData.initialMessageBox={stage:messageBox,container:0, canvasHidden:true, numContainers:32, newCanvas:true ,stageOptions:this.gameState.zPositionData.button.stageOptions}
            this.gameState.zPositionData.finalMessageBox={stage:messageBox,container:29}
          

            this.gameState.zPositionData.loadingBackground= {stage:loadingContainers,container:0, numContainers:3, newCanvas:true,stageOptions:this.gameState.zPositionData.background.stageOptions}
            this.gameState.zPositionData.loadingAnimation={stage:loadingContainers,container:1}
            
            this.gameState.zPositionData.tableChatFull={stage:tableChatFull,container:0,canvasHidden:true, newCanvas:true ,numContainers:4, stageOptions:this.gameState.zPositionData.button.stageOptions}
    
this.gameState.zPositionData.tableChatFullButton={stage:tableChatFull,container:3}
this.gameState.zPositionData.tableChatFullText={stage:tableChatFull,container:1}

        this.jQueryObjects = {}
this.jQueryObjects.canvasDiv = $('#pokerCanvasDiv')
this.jQueryObjects.tableChatFullDiv = $('#tableChatFullTextDiv')
this.jQueryObjects.tableChatFullParagraph = $('#tableChatFullText')
this.jQueryObjects.chatBoxInput = $('#chat')
this.jQueryObjects.cashierForm = $('#cashier')


        //define basic data for each stage
        this.gameState.stageData = []

this.arrayOfParentsOfStageAndOfContainerArray = []
        this.images = {}


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
            background: 'img/gray_bg.jpg',
            table: 'img/table.png',
     //       fourColorDeck: 'img/sheet4color.png',
            dealerButton: 'img/dealer_button_red.png',
            verticalSlider: 'img/raise_slider.png',
            horizontalSlider: 'img/small_slider_bg.png',
            cashierBackground: 'img/cashier_background.png',
            cashierCloseX: 'img/cashier_close_window_x.jpg',
            cashierButton: 'img/cashier.png',
            cashierButtonOver: 'img/cashier_over.png',
            cashierButtonPress: 'img/cashier_press.png',
            cashierButtonSprite: 'img/cashier_button_sprite.png',
            getChips: 'img/get_chips.png',
            showTableChatFull: 'img/show_chat.png',
            hideTableChatFull: 'img/hide_chat.png',
         //   viewLobby: 'img/view_lobby.png',
            standUp: 'img/stand_up.png',
            exitTable: 'img/exit_table.png',
            messageBoxBackground: 'img/message_box.png',
            messageBoxCloseX:'img/message_box_close_window_x.jpg',
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
            if(this.gameState.displaySize == 'mobile'){this.images.sources.cardImageFolder = 'img/fourcolordeck/resize/'}
            else {this.images.sources.cardImageFolder = 'img/fourcolordeck/'}

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
            this.images.messageBox= []

            for(var i = 0;i<=this.gameState.zPositionData.finalMessageBox;i++){
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
            for (var i = 0;i<this.gameState.numSeats;i=i+1){
        this.images.seats[i] = {}
        this.images.seats[i].nonRotatedSeatNumber = i
        this.images.seats[i].originalSeatNumber = i
        this.images.seats[i].rotatedSeatNumber = i
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
this.images.Item = function (x,y,width,height, zIndexOrStageAndContainerObject,options){
     this.position = {}
this.position.x = Math.floor(x)
this.position.y = Math.floor(y)
this.position.z = {}
if(!_.isObject(zIndexOrStageAndContainerObject)){throw 'z data not given for Item constructor'}
if(_.isObject(zIndexOrStageAndContainerObject)){this.position.z = zIndexOrStageAndContainerObject}
  //if number just keep ticking until you find the right id
  else if(_.isNumber(zIndexOrStageAndContainerObject)&&zIndexOrStageAndContainerObject>=0){
for(var i = 0;i<=zIndexOrStageAndContainerObject;i++){

//find stage number
for(var stageNumber = 0;stageNumber<self.arrayOfParentsOfStageAndOfContainerArray.length;stageNumber++){
  //if isnt correct stage, increment i by total number of containers in that stage
if((i+self.arrayOfParentsOfStageAndOfContainerArray[stageNumber].containers.length)<zIndexOrStageAndContainerObject){
  i=i+self.arrayOfParentsOfStageAndOfContainerArray[stageNumber].containers.length
}
 //if stageNumber is correct, assign the value
  else{
    this.position.z.stage = stageNumber
this.position.z.container = zIndexOrStageAndContainerObject - i
  }


}//iteration through stages


  }//outer for loop 1 container at a time increase
}//if zIndexOrStageAndContainerObject is a number

this.size = {}
this.size.x = width
this.size.y = height
if(options){
  if(options.messages){this.messages = options.messages}
    if(options.otherMessages){this.otherMessages = options.otherMessages}

}//if options
this.drawRoundedRectangle = function(fillColor){
this.image.graphics.beginFill(fillColor).drawRoundRect(0, 0, this.size.x, this.size.y,this.size.y*.1)
           
            }

}

 this.images.itemAsBitmap = function (item,imageSource){
    var tempImage= new Image()
    tempImage.src = imageSource
    item.image = new createjs.Bitmap(tempImage)
     self.positionItemImage(   item, {update:false})
    item.image.parentOfImageObject = item
    item.bitmapSource = imageSource
    if(item.messages){
        item.image.onClick = self.events.onButtonClick
    }
            }

            this.images.cardAsBitmap = function(item,cardText){
                 var cardImage = new Image()
                 if(_.isString(cardText)){
         var imageSource = this.sources.cardImageFolder+cardText+'.png'}
         else{var imageSource = this.sources.cardImageFolder+hiddenCardFileName+'.png'}

      this.itemAsBitmap(item,imageSource)

            }
    
            //actually a rectangle with rounded edges
             this.images.itemAsRectangle = function (item,fillColor){
 item.image = new createjs.Shape()
  self.positionItemImage(item,{update:false})
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

              var x = outerStrokeWidth/2; var y = outerStrokeWidth/2
              var width = parent.size.x - outerStrokeWidth;  var height = parent.size.y - outerStrokeWidth

              parent.image.graphics.clear() //clear previous graphics on the shape
      /*        parent.image.x = 0 //reset previous transformations of the image
              parent.image.y = 0
              */
              parent.image.alpha = 1
   parent.image.snapToPixel = true

//draw border
 parent.image.graphics.setStrokeStyle(outerStrokeWidth,'square').beginStroke(borderColor)
 .beginFill(fillColor).drawRect(x, y, width, height)

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

    parent.image.graphics.setStrokeStyle(middleDividerStrokeWidth).beginStroke(middleDividerColor)
  // .moveTo(x+outerStrokeWidth/2,y+height/2).lineTo(x+width-outerStrokeWidth/2,y+height/2)
            
          parent.image.borderColor = borderColor
          parent.image.fillColor = fillColor
           parent.image.middleDividerColor = middleDividerColor
            parent.image.outerStrokeWidth = outerStrokeWidth
             parent.image.middleDividerStrokeWidth = middleDividerStrokeWidth

               self.positionItemImage(parent, {update:false})

               //set stage upToDate status
               var stage = parent.position.z.stage
               var container = parent.position.z.container
              if(self.arrayOfParentsOfStageAndOfContainerArray[stage].containers[container].contains(parent.image)){
                self.arrayOfParentsOfStageAndOfContainerArray[stage].upToDate = false
              }
return stage
      }

            //for example: (parentOfImageObject, fold, "13px Arial", "#100D08")
            this.images.addItemText = function(parentOfImageObject,text,sizeAndFont,color){
                
                parentOfImageObject.text = new createjs.Text(text, sizeAndFont, color)
parentOfImageObject.text.x=parentOfImageObject.position.x + parentOfImageObject.size.x/2 
parentOfImageObject.text.y=parentOfImageObject.position.y + 2
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
  event.target.graphics.beginFill('red').drawRoundRect(0, 0, event.target.parentOfImageObject.size.x, event.target.parentOfImageObject.size.y,event.target.parentOfImageObject.size.y*.15)
  event.target.parentOfImageObject.text.y = event.target.parentOfImageObject.text.y + 2
     self.updateStages(event.target.parentOfImageObject.position.z.stage)
     event.onMouseUp = function(event){
         event.target.graphics.clear()       
        event.target.graphics.beginFill(event.target.parentOfImageObject.fillColor).drawRoundRect(0, 0, event.target.parentOfImageObject.size.x, event.target.parentOfImageObject.size.y,event.target.parentOfImageObject.size.y*.15); 
event.target.parentOfImageObject.text.y = event.target.parentOfImageObject.text.y - 2 
    self.updateStages(event.target.parentOfImageObject.position.z.stage)
     }
     }
     }
      
  this.events.onButtonClick = function(event){
console.log('button clicked')
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


    }

    this.events.cashierButtonMouseOut = function(event){
        
        var cashierDefaultImage = new Image(self.images.sources.cashierButton)

        self.images.cashierButton.image.image = cashierOverImage


    }

    this.events.cashierButtonMouseDown = function(event){
        
        var cashierDownImage = new Image(self.images.sources.cashierButtonPress)

        self.images.cashierButton.image.image = cashierOverImage


        onMouseUp = function(event){
            
        }

    }
    */
this.events.showTableChatFullOnClick = function(){
console.log('show clicked')
self.displayTableChatFull()
$('#chatForm').blur()
self.jQueryObjects.tableChatFullParagraph.blur()
}

this.events.hideTableChatFullOnClick = function(){

  console.log('hide')
self.hideTableChatFull()
}

this.moveTableChatFullMessageText = function(movementObject){
console.log('moveTableChatFullMessageText called')
var velocityTo0InMiliseconds = 1000


  //if movement is not specified, reposition message text at very bottom
  if(!movementObject || !_.isNumber(movementObject.magnitude)){
    
 //self.jQueryObjects.tableChatFullDiv.scrollTop(scroll[0].getContentSize().h)

//console.log(scroll[0].getScrollTop())

//$("#tableChatFullTextDiv").scrollTop(scroll[0].getScrollTop()*2)

if(self.permanentPreferences.tableChatFull.scrollBarType && self.permanentPreferences.tableChatFull.scrollBarType.value == 'mCustomScrollbar'){
console.log('using mcustomsrollbar function to scroll to bottom, then update')
//show so that scroll bar can be initialized
 //$("#tableChatFullTextDiv").css('display','inline')

self.jQueryObjects.tableChatFullDiv.mCustomScrollbar('scrollTo','bottom')
self.jQueryObjects.tableChatFullDiv.mCustomScrollbar('update')
// $("#tableChatFullTextDiv").css('display','none')

}//if mCustomScrollbar is used

else{//if not mcustomscrollbar
  console.log('scrolling to bottom with nicescroll')
  var scroll = self.jQueryObjects.tableChatFullDiv.getNiceScroll()
if(scroll[0].getContentSize().h != self.jQueryObjects.tableChatFullDiv.height()){
 self.jQueryObjects.tableChatFullDiv.scrollTop(scroll[0].getContentSize().h*1.5)
scroll[0].resize()
}

}//if not mcustomscrollbar

/*
self.jQueryObjects.tableChatFullDiv.trigger("mousewheel",  {intDelta:0, deltaX:1, deltaY:0}) 
self.jQueryObjects.tableChatFullDiv.trigger("DOMMouseScroll", [0]) 
*/

//self.jQueryObjects.tableChatFullDiv.scrollTo(scroll[0].getScrollTop(),0,{axis:'y'})

//scroll[0].setScrollTop(scroll[0].getScrollTop())
// setScrollHandleToMinimum()
}
  else{
if(!movementObject.positionUnit){movementObject.positionUnit = 'pixels'}
  if(!movementObject.relativity){movementObject.relativity = 'absolute'}
if(!movementObject.magnitude){movementObject.magnitude = 0}

if(movementObject.positionUnit == 'pixels'){}

if (movementObject.resize === true){
  if(self.permanentPreferences.tableChatFull.scrollBarType && self.permanentPreferences.tableChatFull.scrollBarType.value == 'mCustomScrollbar'){
console.log('calling update function of mcustomscrollbar')
self.jQueryObjects.tableChatFullDiv.mCustomScrollbar('update')

}//if mCustomScrollBar

//if not using mCustomSCrollbar
else{
var scroll = self.jQueryObjects.tableChatFullDiv.getNiceScroll()
  scroll[0].resize()
}

}//if movementObject.resize == true

}//if movementObject exists
}


this.events.tableChatFullChatMessageTextMouseDown = function(e){

self.gameState.tableChatFull.mouseDown = true

console.log('tablechatfull text clicked')

var initialRawX = e.rawX
var initialRawY = e.rawY
/*
e.onMouseMove = function(event){

var yMovement = event.rawY - initialRawY
self.images.tableChatFull.chatMessageText.text.y = self.images.tableChatFull.chatMessageText.position.y + yMovement
self.images.tableChatFull.chatMessageText.parentOfStage.stage.update()
}//mouse move event

e.onMouseUp = function(event){

var yMovement = event.rawY - initialRawY
self.images.tableChatFull.chatMessageText.text.y = self.images.tableChatFull.chatMessageText.position.y + yMovement
self.images.tableChatFull.chatMessageText.parentOfStage.stage.update()
self.gameState.tableChatFull.mouseDown = false
}//mouse up event
*/
/*
e.onMouseMove = function(event){

var yMovement = event.rawY - initialRawY
self.images.tableChatFull.chatMessageText.text.y = self.images.tableChatFull.chatMessageText.position.y + yMovement
self.images.tableChatFull.chatMessageText.parentOfStage.stage.update()
}//mouse move event

e.onMouseUp = function(event){
self.gameState.tableChatFull.mouseDown = false
var yMovement = event.rawY - initialRawY
self.images.tableChatFull.chatMessageText.text.y = self.images.tableChatFull.chatMessageText.position.y + yMovement
self.images.tableChatFull.chatMessageText.parentOfStage.stage.update()
}//mouse up event
*/


}

this.events.disableTouchScrollClicked = function(){
console.log('disableTouchScrollClicked')
//change user preferences
self.sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.disableTouchScroll.value = false
self.sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.disableTouchScrollOn.value = true

/*
console.log(self.jQueryObjects.tableChatFullDiv.getNiceScroll())

self.jQueryObjects.tableChatFullDiv.getNiceScroll()[0].istouchcapable = false
*/
//save preference on server
self.saveSessionPreferences()
self.updateTableChatFullDisplay({update:true})
}

this.events.disableTouchScrollOnClicked = function(){
console.log('disableTouchScrollClicked')
//change user preferences
self.sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.disableTouchScroll.value = true
self.sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.disableTouchScrollOn.value = false
/*
console.log(self.jQueryObjects.tableChatFullDiv.getNiceScroll())
self.jQueryObjects.tableChatFullDiv.getNiceScroll()[0].istouchcapable = true
*/
self.updateTableChatFullDisplay({update:true})
}


this.events.hideDealerMessagesClicked = function(){
  self.getPermanentPreferences()
console.log('hideDealerMessagesClicked')
//change user preferences
self.sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hideDealerMessages.value = false
self.sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hideDealerMessagesOn.value = true
//save preference on server
self.saveSessionPreferences()

self.updateTableChatFullDisplay({update:true})
}


this.events.hideDealerMessagesOnClicked = function(){
console.log('hideDealerMessagesOnClicked')
//change user preferences
self.sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hideDealerMessages.value = true
self.sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hideDealerMessagesOn.value = false

//save preference on server
self.saveSessionPreferences()

self.updateTableChatFullDisplay({update:true}) 
}

this.events.hidePlayerMessagesClicked = function(){
  console.log('hidePlayerMessagesClicked')
self.sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hidePlayerMessages.value = false
self.sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hidePlayerMessagesOn.value = true


//save preference on server
self.saveSessionPreferences()

self.updateTableChatFullDisplay({update:true})

}
this.events.hidePlayerMessagesOnClicked = function(){
   console.log('hidePlayerMessagesOnClicked')
self.sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hidePlayerMessages.value = true
self.sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hidePlayerMessagesOn.value = false

//save preference on server
self.saveSessionPreferences()

self.updateTableChatFullDisplay({update:true})
}
this.events.hideObserverMessagesClicked = function(){
   console.log('hideObserverMessagesClicked')
self.sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hideObserverMessages.value = false
self.sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hideObserverMessagesOn.value = true
//save preference on server
self.saveSessionPreferences()
self.updateTableChatFullDisplay({update:true})
}
this.events.hideObserverMessagesOnClicked = function(){

self.sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hideObserverMessages.value = true
self.sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hideObserverMessagesOn.value = false
//save preference on server
self.saveSessionPreferences()
self.updateTableChatFullDisplay({update:true})
}


this.events.rotateSeatsIfNeededAndConfirm = function(){

if(self.permanentPreferences.alwaysRotate === true){}
//  console.log(self.sessionPreferences)
//console.log(self.images.seats[self.gameState.userSeatNumber])
   if(self.images.seats[self.gameState.userSeatNumber].rotatedSeatNumber  !== self.sessionPreferences.changeUserSeatViewTo.value && self.images.seats[self.gameState.userSeatNumber].rotatedSeatNumber !== 0){ // if user is seated at normal seat there is no need for popup
      
console.log('changing userseat view')
      
            var messageInfo = {}    
              messageInfo.title = 'Seat Viewpoint Changed'
            messageInfo.okayText = 'OK, this is fine'
            messageInfo.cancelText = 'Change view'
            messageInfo.cancel = true
 messageInfo.okayEvent = function(){
  self.hideMessageBox()
  self.sessionPreferences.changeUserSeatViewTo.value = self.images.seats[self.gameState.userSeatNumber].rotatedSeatNumber
self.saveSessionPreferences()
}
 messageInfo.cancelEvent = function (){
  console.log('cancel event called')

  if(self.images.seats[self.gameState.userSeatNumber].rotatedSeatNumber  !== self.gameState.userSeatNumber ){
    self.changeUserSeatView(self.gameState.userSeatNumber )}
    else{self.changeUserSeatView(self.sessionPreferences.changeUserSeatViewTo.value)}


//self.hideMessageBox()
}
 var messageString = 'Your table viewpoint has been changed so that you appear at the bottom middle.  Your position relative to other players remains the same. Click '+messageInfo.cancelText+ ' to change your view back.'  
     self.displayMessageBox(messageString, messageInfo)

         }//message box popup
}

    this.events.exitTableClick = function(event){
      console.log('exittable clicked')
       var  messageInfo = {}
       messageInfo.title = 'Leave Table?'
       messageInfo.cancel = true
       messageInfo.okayEvent = function(){
       // self.events.exit()
 socket.emit('stand')
        window.location.href = '/lobby'
        self.hideMessageBox()
      }
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
      var change = numScrolls*self.permanentPreferences.bigBlindsPerMouseScroll.value*self.gameState.bigBlind
          var betValue  = parseFloat($('#betSize').val())
    var isBetValueValid = ( !isNaN(betValue)) && _.isNumber(betValue) 
     if(isBetValueValid == true){ var newBet = change+betValue} //use current value
      else{var newBet = change + self.gameState.betSize} //use previous known value if current value is invalid
//console.log(newBet+'before rounding')
        //round the new  bet
      newBet = self.returnRoundedDownBetSize(newBet)
   //   console.log(newBet+'after rounding')
        self.adjustBetDisplay(newBet)
    }

     this.events.betSliderHorizontalMouseDown = function(event){

        var minX = self.images.betSlider.horizontal.position.x
         var maxX = self.images.betSlider.horizontal.position.x + self.images.betSlider.horizontal.size.x-self.images.betSlider.vertical.size.x
       
         var pixelsPerTick = self.gameState.bigBlind*self.permanentPreferences.bigBlindsPerHorizontalSliderTick.value/(self.gameState.maxBet-self.gameState.minBet)*(maxX-minX)
          

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
.wait(self.permanentPreferences.timePerHorizontalSliderTick.value)
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
this.initialize = function(){

this.initializeStagesAndCanvasCallThisFirst()
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

    //push card back
imageSourceArray.push({src:this.images.sources.cardImageFolder+this.images.sources.hiddenCardFileName, id: resourceID})



    //console.log(imageSourceArray)
    //define dimensions of preloading screen
    var introScreen = {}
    console.log(this.arrayOfParentsOfStageAndOfContainerArray)
    var canvasWidth = this.arrayOfParentsOfStageAndOfContainerArray[0].stage.canvas.width
    var canvasHeight = this.arrayOfParentsOfStageAndOfContainerArray[0].stage.canvas.height
    var titleSizeAndFont = '20px Arial'
     var titleHeight = 35
     var titleAndPreloadBarDistanceY = 50
     var titleText = 'Loading resources...'
     var titleColor = '#000000'
     var statusSizeAndFont = '15px arial'
     var statusHeight = 20
     var statusColor = '#000000'
    var preloadBarY  = canvasHeight/2
    var preloadBarWidth = canvasWidth*.65
    var preloadBarHeight = 30
    var preloadBarBorderColor = 'rgb(0,0,255)'
    var preloadBarProgressColor = '#000000'
    var preloadBarUnfinishedColor = 'rgb(150,150,150)'
    var introScreenBackgroundColor = "blue"

    introScreen.background = new this.images.Item(0, 0, canvasWidth, canvasHeight, this.gameState.zPositionData.loadingBackground)
    introScreen.background.image = new createjs.Shape()
    introScreen.background.image.graphics.beginFill(introScreenBackgroundColor)
    .drawRect(introScreen.background.position.x, introScreen.background.position.y,  introScreen.background.size.x, introScreen.background.size.y)

    introScreen.preloadBar = new this.images.Item(canvasWidth/2 - preloadBarWidth/2, preloadBarY, preloadBarWidth, preloadBarHeight, this.gameState.zPositionData.loadingAnimation)
    introScreen.title = new this.images.Item(0, preloadBarY-titleAndPreloadBarDistanceY-titleHeight, canvasWidth, titleHeight,this.gameState.zPositionData.loadingAnimation)
     introScreen.status = new this.images.Item(introScreen.preloadBar.position.x, introScreen.preloadBar.position.y - statusHeight, canvasWidth-introScreen.preloadBar.x, statusHeight,this.gameState.zPositionData.loadingAnimation)
  

     //define function for drawing the loading bar graphic
     introScreen.preloadBar.image  = new createjs.Shape()
     introScreen.preloadBar.drawBar = function (progressRatio){
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

var stage = introScreen.preloadBar.position.z.stage
var container = introScreen.preloadBar.position.z.container
//if image is on the stage, we need to set the stage upToDate variable to false
if(self.arrayOfParentsOfStageAndOfContainerArray[stage].containers[container].contains(introScreen.preloadBar.image))
{
  self.arrayOfParentsOfStageAndOfContainerArray[stage].upToDate = false
}
return stage
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
var titleX = canvasWidth*.25
var titleY = canvasHeight*.75
this.images.imageLoading.title = new this.images.Item(titleX, titleY, canvasWidth -titleX, titleHeight,this.gameState.zPositionData.loadingAnimation)
this.images.imageLoading.title.text = new createjs.Text(titleText, titleSizeAndFont, titleColor)
this.images.imageLoading.title.text.x= this.images.imageLoading.title.position.x
 this.images.imageLoading.title.text.y= this.images.imageLoading.title.position.y + 1
 this.images.imageLoading.title.text.baseline = 'top'
 this.images.imageLoading.title.text.textAlign = 'left'
 this.images.imageLoading.title.text.textColor = titleColor


 //add imageLoading
 
    var displayPreloadScreen  = function(){
        //add images and text to containers 
      console.log(introScreen)
self.displayChildren(introScreen,{update:false})        

    }

    var totalSources = imageSourceArray.length+soundSourceArray.length+flashSoundSourceArray.length
 //define image.onload functions
    function handleLoad(src, id, onComplete){
        loadedFiles++
        introScreen.status.text.text = src + ' loaded'
        introScreen.preloadBar.drawBar(loadedFiles/totalSources)
        console.log(src +' loaded file id: '+id+' totalLoaded: '+loadedFiles +' of '+totalSources)
        if (id == imageSourceArray[imageSourceArray.length-1].id){
            console.log("last image loaded")
        }
         else if(id == soundSourceArray[soundSourceArray.length-1].id){
          console.log('last non-flash sound loaded')
        }
       
        self.updateStages(introScreen.status.position.z.stage)
         if(onComplete){onComplete()}
    }
    function handleLoadError(src,id, onComplete){
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

        self.updateStages(introScreen.status.position.z.stage)
        if(onComplete){onComplete()}
    }


 var  preloadImages = function (imageArray, onComplete){
  var loadedImages = 0
  var increaseCounter = function(){
    loadedImages++
console.log('loaded '+ loadedImages+' images out of a total of '+imageArray.length + ' images')
  }
    var newImages=[]
    //iterate through imageArray to preload images
    _.each(_.range(imageArray.length), function(i){
        newImages[i]=new Image()
        if(typeof imageArray[i] == 'string'){newImages[i].src=imageArray[i]}
        else if (typeof imageArray[i] == 'object'){newImages[i].src=imageArray[i].src}
        
        newImages[i].onload=function(){handleLoad(newImages[i].src, imageArray[i].id, increaseCounter)}
        newImages[i].onerror=function(){handleLoadError(newImages[i].src, imageArray[i].id, increaseCounter) }

        //on last iteration call onComplete function

    })
//periodicaly checkto see if its completed
var checkIfCompleted = setInterval (function(){
if(loadedImages >= imageArray.length){
  console.log('calling onComplete function')
  onComplete()
  clearInterval(checkIfCompleted)
}
},25)

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
      self.displayChildren(self.images.imageLoading.title,{update:false})
        self.createAllItems()
        
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
   //prevent document scorlling
  // $(document).bind('DOMMouseScroll mousewheelscroll',function(e){e.preventDefault()})
 $('#iframe, iframe').bind('mousewheel',function(e){
console.log(e)
  e.preventDefault()})
//========================IMAGE STATIC VARIABLES ==============================
 var canvasWidth = self.arrayOfParentsOfStageAndOfContainerArray[self.gameState.zPositionData.background.stage].stage.canvas.width
     var canvasHeight = self.arrayOfParentsOfStageAndOfContainerArray[self.gameState.zPositionData.background.stage].stage.canvas.height
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

            var checkBoxButtonWidth = 100
            var checkBoxButtonHeight = 13
            var checkBoxButtonDistanceFromChat = 20
            var checkBoxButtonOffSetLeft = 2
           var  checkBoxButtonDistanceY = 3
           var checkBoxButtonCheckBoxWidth = checkBoxButtonHeight
           var checkBoxButtonDistanceFromBoxToText = 5
           var checkBoxButtonDistanceFromEdgeToInteriorHitAreaY = 1
           var checkBoxButtonSizeAndFont = '10px arial'
           var checkBoxButtonTextColor = '#FFFFFF'

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
            var htmlTableChatBorderSize = self.jQueryObjects.chatBoxInput.css('border').substring(0,self.jQueryObjects.chatBoxInput.css('border').indexOf('p'))
            var htmlTableChatBoxHeight = 20
            var htmlTableChatBoxReminderTextColor = 'rgb(160,0,0) '

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
            var initialChatBoxHeight = seatHeight/2.3

            var absoluteChatDistanceFromSeatY = seatHeight/4
             var chatBoxBorderColor = '#FFFFFF'
             var chatBoxFontSize = 10

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
            var standUpWidth = 169
            var standUpHeight = 26
            var standUpHitAreaUpperLeftOffsetX  = 10 //distance from left of standUp image and mouse events
            var standUpHitAreaLowerLeftOffsetX = 37
            var standUpHitAreaTopOffset  = 3 // distance from top of standUp image and mouse event clicks
            var standUpHitAreaBottomOffset  = 3 
            var standUpHitAreaRightOffset  = 2  // distance from rightside of image and hit area

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

            var tableX = 0

            var tableY = 15

            var disabledButtonOverlayAlpha = 0.43

            //dealerButton
           this.dealerButton = new this.Item(0,0,dealerButtonWidth, dealerButtonHeight,self.gameState.zPositionData.chips)
            this.itemAsBitmap(this.dealerButton, this.sources.dealerButton)

            //---------pot-------------------
             this.pots[0].firstChip = new this.Item(canvasWidth/2-cardWidth/2-cardWidth,communityY+potDistanceToCommunity,chipDiameter,chipDiameter,self.gameState.zPositionData.chips)
              this.pots[0].secondChip = new this.Item(this.pots[0].firstChip.position.x,this.pots[0].firstChip.position.y-distanceBetweenChipsY,chipDiameter,chipDiameter,self.gameState.zPositionData.chips)
              this.pots[0].secondColumnChip = new this.Item(this.pots[0].firstChip.position.x+chipDiameter+self.imageData.distanceBetweenChipColumns,this.pots[0].firstChip.position.y,chipDiameter,chipDiameter,self.gameState.zPositionData.chips)
           
              var totalPotWidth = (this.pots[0].secondColumnChip.position.x-this.pots[0].firstChip.position.x)*(self.imageData.maxChipColumns-1)+chipDiameter

            this.pots[0].potSize = new this.Item(this.pots[0].firstChip.position.x, this.pots[0].firstChip.position.y+potHeight,potWidth,potHeight,self.gameState.zPositionData.chips)
             this.addItemText(this.pots[0].potSize, '',potSizeAndFont, potTextColor)
                       
              var distanceBetweenPots = (this.pots[0].secondColumnChip.position.x-this.pots[0].firstChip.position.x)*(self.imageData.maxChipColumns)
           var distanceBetweenChipsInColumn =  this.pots[0].firstChip.position.y - this.pots[0].secondChip.position.y
           var chipColumnHeight = chipDiameter +(self.imageData.maxChipsPerColumn-1)*distanceBetweenChipsInColumn


                        this.totalPotSize  = new this.Item(this.pots[0].firstChip.position.x, this.pots[0].firstChip.position.y+chipDiameter-chipColumnHeight-potHeight*2,potWidth,potHeight,self.gameState.zPositionData.chips)
             this.addItemText( this.totalPotSize, '',potSizeAndFont, potTextColor)
            

              for(var i=1;i<this.seats.length-1;i++){

             this.pots[i].firstChip = new this.Item( this.pots[0].firstChip.position.x+i*distanceBetweenPots, this.pots[0].firstChip.position.y ,chipDiameter,chipDiameter,self.gameState.zPositionData.chips)
              this.pots[i].secondChip = new this.Item(this.pots[0].secondChip.position.x+i*distanceBetweenPots,this.pots[0].secondChip.position.y,chipDiameter,chipDiameter,self.gameState.zPositionData.chips)
              this.pots[i].secondColumnChip = new this.Item(this.pots[0].secondColumnChip.position.x+i*distanceBetweenPots,this.pots[0].secondColumnChip.position.y,chipDiameter,chipDiameter,self.gameState.zPositionData.chips)

                   this.pots[i].potSize = new this.Item(this.pots[0].potSize.position.x+i*distanceBetweenPots,this.pots[0].potSize.position.y,potWidth,potHeight,self.gameState.zPositionData.chips)
             this.addItemText(this.pots[i].potSize, '',potSizeAndFont, potTextColor)
              }

              //---------------------player chat input---------------
              this.htmlTableChatBox = new this.Item(htmlTableChatBoxLeftOffset,canvasHeight - htmlTableChatBoxBottomOffset-htmlTableChatBoxHeight-htmlTableChatBorderSize*2,htmlTableChatBoxWidth,htmlTableChatBoxHeight,self.gameState.zPositionData.button)
var defaultMessage = 'Type here to chat'
self.jQueryObjects.chatBoxInput.val(defaultMessage)
self.jQueryObjects.chatBoxInput.css('color', htmlTableChatBoxReminderTextColor)

//remove reminder text when clicked
self.jQueryObjects.chatBoxInput.focus(function(){
    if(self.jQueryObjects.chatBoxInput.val() == defaultMessage){
    self.jQueryObjects.chatBoxInput.val('')
self.jQueryObjects.chatBoxInput.css('color', self.permanentPreferences.chatTextColor.value)}
})

//redisplay reminder text ONLY if text value is only spaces or nothing
self.jQueryObjects.chatBoxInput.focusout(function(){
    if (/\S/.test(self.jQueryObjects.chatBoxInput.val())){}
   else{
   self.jQueryObjects.chatBoxInput.val('Type here to chat')
self.jQueryObjects.chatBoxInput.css('color', htmlTableChatBoxReminderTextColor)
 }
})

//set z-index of chatDiv
var chatBoxStageParent = self.arrayOfParentsOfStageAndOfContainerArray[self.images.htmlTableChatBox.position.z.stage]
var chatBoxStageCanvasZIndex = $(chatBoxStageParent.stage.canvas).css('z-index')
$('#chatDiv').css('z-index', parseInt(chatBoxStageCanvasZIndex)+1)

self.jQueryObjects.chatBoxInput.css({
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
 self.jQueryObjects.chatBoxInput.keypress(function(event){
      var keycode = (event.keyCode ? event.keyCode : event.which)
    if(keycode == '13') {    
        socket.emit('chat', $("#chat").val())
        $("#chat").val('')
        self.jQueryObjects.chatBoxInput.focus()
        }
    })

           //--------standard pre-action buttons---------------------
          this.foldToAnyBet = new  this.Item(checkBoxButtonOffSetLeft,this.htmlTableChatBox.position.y-  checkBoxButtonDistanceFromChat - 3*checkBoxButtonHeight-2*checkBoxButtonDistanceY,checkBoxButtonWidth,checkBoxButtonHeight,self.gameState.zPositionData.button, {messages:['set_flag','check',true], otherMessages:['set_flag','fold',true]})
          this.sitOutNextHand = new  this.Item(checkBoxButtonOffSetLeft,this.htmlTableChatBox.position.y -  checkBoxButtonDistanceFromChat- 2*checkBoxButtonHeight - checkBoxButtonDistanceY,checkBoxButtonWidth,checkBoxButtonHeight,self.gameState.zPositionData.button, {messages:['sit_out']})
        this.sitOutNextBlind =  new this.Item(checkBoxButtonOffSetLeft,this.htmlTableChatBox.position.y-  checkBoxButtonDistanceFromChat- checkBoxButtonHeight,checkBoxButtonWidth,checkBoxButtonHeight,self.gameState.zPositionData.button, {messages:['set_flag', 'post_blind', false]})
               
               
                //define on versions
                  this.foldToAnyBetOn =  new this.Item(this.foldToAnyBet.position.x,this.foldToAnyBet.position.y, this.foldToAnyBet.size.x,this.foldToAnyBet.size.y,self.gameState.zPositionData.button, {messages:['set_flag','fold',false], otherMessages :['set_flag','check',false]})
                   
          this.sitOutNextHandOn = new  this.Item(this.sitOutNextHand.position.x,this.sitOutNextHand.position.y, this.sitOutNextHand.size.x,this.sitOutNextHand.size.y,self.gameState.zPositionData.button,{messages: ['sit_in']})
        this.sitOutNextBlindOn = new  this.Item(this.sitOutNextBlind.position.x,this.sitOutNextBlind.position.y, this.sitOutNextBlind.size.x,this.sitOutNextBlind.size.y,self.gameState.zPositionData.button, {messages:['set_flag', 'post_blind', true]})
        
        this.itemAsBitmap(this.foldToAnyBet, this.sources.checkBox)
this.itemAsBitmap(this.sitOutNextHand, this.sources.checkBox)
this.itemAsBitmap(this.sitOutNextBlind, this.sources.checkBox)

        this.itemAsBitmap(this.foldToAnyBetOn, this.sources.checkBoxChecked)
this.itemAsBitmap(this.sitOutNextHandOn, this.sources.checkBoxChecked)
this.itemAsBitmap(this.sitOutNextBlindOn, this.sources.checkBoxChecked)

  //hitAreas for buttons
      
      var drawCheckBoxButtonHitSquareAndAdjustItemWidth = function(item){
          //get width of text
        var textWidth =   self.getTextWidthAndFontSize(item)[0]
        var totalWidth = checkBoxButtonCheckBoxWidth + checkBoxButtonDistanceFromBoxToText + textWidth
        item.size.x = totalWidth
        //draw rectangular shape
        var hitSquare = new createjs.Shape()
        hitSquare.graphics.beginFill('#FFFFFF').beginStroke(0)
        .drawRect(0, checkBoxButtonDistanceFromEdgeToInteriorHitAreaY, totalWidth, item.size.y - checkBoxButtonDistanceFromEdgeToInteriorHitAreaY)
        return hitSquare
      }

//function for creating text from all fast
    var addCheckBoxButtonText = function(parentOfImageObject, text, options){
                parentOfImageObject.text = new createjs.Text(text, checkBoxButtonSizeAndFont, checkBoxButtonTextColor)
parentOfImageObject.text.x=parentOfImageObject.position.x + checkBoxButtonCheckBoxWidth + checkBoxButtonDistanceFromBoxToText
parentOfImageObject.text.y=parentOfImageObject.position.y + 1
parentOfImageObject.text.baseline = 'top'
parentOfImageObject.text.textAlign = 'left'
parentOfImageObject.textColor = checkBoxButtonTextColor

var hit = drawCheckBoxButtonHitSquareAndAdjustItemWidth(parentOfImageObject)
parentOfImageObject.text.hitArea  = hit
parentOfImageObject.image.hitArea  = hit

}
//off state
      addCheckBoxButtonText( this.foldToAnyBet, 'Auto check/fold' )
      addCheckBoxButtonText(this.sitOutNextHand, 'Sit out next hand')
      addCheckBoxButtonText (  this.sitOutNextBlind,'Sit out next blind' )
      
      //on state
      addCheckBoxButtonText( this.foldToAnyBetOn, 'Auto check/fold' )
      addCheckBoxButtonText(this.sitOutNextHandOn, 'Sit out next hand')
      addCheckBoxButtonText (  this.sitOutNextBlindOn,'Sit out next blind' )

   


      //onclick
       this.foldToAnyBet.image.onclick =  self.events.onButtonClick
        this.sitOutNextHand.image.onclick = self.events.onButtonClick
          this.sitOutNextBlind.image.onclick  = self.events.onButtonClick
           //define on versions
                  this.foldToAnyBetOn.image.onclick  = self.events.onButtonClick
                  this.sitOutNextHandOn.image.onclick = self.events.onButtonClick
                    this.sitOutNextBlindOn.image.onclick = self.events.onButtonClick


           //----------------------seats-------------------------------
           this.seats[0].seat = new this.Item(thirdColumnX,fourthRowY,seatWidth,seatHeight,self.gameState.zPositionData.button)
           this.seats[1].seat = new this.Item(secondColumnX,fourthRowY,seatWidth,seatHeight,self.gameState.zPositionData.button)
           this.seats[2].seat = new this.Item(firstColumnX,thirdRowY,seatWidth,seatHeight,self.gameState.zPositionData.button)
           this.seats[3].seat = new this.Item(firstColumnX,secondRowY,seatWidth,seatHeight,self.gameState.zPositionData.button)
           this.seats[4].seat = new this.Item(secondColumnX,firstRowY,seatWidth,seatHeight,self.gameState.zPositionData.button)
           this.seats[5].seat = new this.Item(thirdColumnX,firstRowY,seatWidth,seatHeight,self.gameState.zPositionData.button)
           this.seats[6].seat = new this.Item(fourthColumnX,firstRowY,seatWidth,seatHeight,self.gameState.zPositionData.button)
            this.seats[7].seat = new this.Item(fifthColumnX,secondRowY,seatWidth,seatHeight,self.gameState.zPositionData.button)
             this.seats[8].seat = new this.Item(fifthColumnX,thirdRowY,seatWidth,seatHeight,self.gameState.zPositionData.button)
     this.seats[9].seat = new this.Item(fourthColumnX,fourthRowY,seatWidth,seatHeight,self.gameState.zPositionData.button)

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
         this.seats[i].openSeat = new this.Item(this.seats[i].seat.position.x, this.seats[i].seat.position.y,this.seats[i].seat.size.x,this.seats[i].seat.size.y,self.gameState.zPositionData.button)
          this.seats[i].disabledSeat = new this.Item(this.seats[i].seat.position.x, this.seats[i].seat.position.y,this.seats[i].seat.size.x,this.seats[i].seat.size.y,self.gameState.zPositionData.button)


         this.seats[i].action = new this.Item(this.seats[i].seat.position.x, this.seats[i].seat.position.y,this.seats[i].seat.size.x,this.seats[i].seat.size.y/2,self.gameState.zPositionData.button)
         this.seats[i].countdown = new this.Item(this.seats[i].seat.position.x, this.seats[i].seat.position.y,this.seats[i].seat.size.x,this.seats[i].seat.size.y/2,self.gameState.zPositionData.button)
         this.seats[i].winner = new this.Item(this.seats[i].seat.position.x, this.seats[i].seat.position.y,this.seats[i].seat.size.x,this.seats[i].seat.size.y/2,self.gameState.zPositionData.button)

       
         this.seats[i].playerName = new this.Item(this.seats[i].seat.position.x, this.seats[i].seat.position.y,this.seats[i].seat.size.x,this.seats[i].seat.size.y/2,self.gameState.zPositionData.button)
         this.seats[i].status = new this.Item(this.seats[i].seat.position.x, this.seats[i].seat.position.y+this.seats[i].seat.size.y/2,this.seats[i].seat.size.x,this.seats[i].seat.size.y/2,self.gameState.zPositionData.button)

     //------------------hole cards-----------------------------
            var middleOfSeat = this.seats[i].seat.position.x +this.seats[i].seat.size.x/2
            var card0X = middleOfSeat - cardWidth - spaceBetweenHoleCards/2
            var cardY = this.seats[i].seat.position.y - cardHeight*shownCardY
            var card1X = middleOfSeat  + spaceBetweenHoleCards/2

            this.seats[i].hiddenCard0 = new this.Item(card0X, cardY, cardWidth, cardHeight,self.gameState.zPositionData.holeCards)
            this.seats[i].hiddenCard1 = new this.Item(card1X, cardY, cardWidth, cardHeight,self.gameState.zPositionData.holeCards)

            this.seats[i].shownCard0 = new this.Item(card0X, cardY, cardWidth, cardHeight,self.gameState.zPositionData.holeCards)
            this.seats[i].shownCard1 = new this.Item(card1X, cardY, cardWidth, cardHeight,self.gameState.zPositionData.holeCards)

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

var seatLocationMarginOfError = 1.1
    //check if seat is on top
    if(this.seats[i].seat.position.y < firstRowY + seatLocationMarginOfError && this.seats[i].seat.position.y > firstRowY - seatLocationMarginOfError){
        
        var dealerButtonX = this.seats[i].seat.position.x+topRowSeatDealerButtonX
        var dealerButtonY = this.seats[i].seat.position.y+topRowSeatDealerButtonY

        this.seats[i].dealerButton = new this.Item(dealerButtonX,dealerButtonY,dealerButtonWidth,dealerButtonHeight,self.gameState.zPositionData.chips)

        this.seats[i].firstChip = new this.Item(this.seats[i].seat.position.x+topChipOffsetX,this.seats[i].seat.position.y+topChipOffsetY,chipDiameter,chipDiameter,self.gameState.zPositionData.chips)

         this.seats[i].secondColumnChip = new this.Item( this.seats[i].firstChip.position.x-chipDiameter-self.imageData.distanceBetweenChipColumns,this.seats[i].firstChip.position.y,chipDiameter,chipDiameter,self.gameState.zPositionData.chips)

        
        //determine location of theoretical upper right most chip
        var distanceBetweenChipsY = this.pots[0].secondChip.position.y-this.pots[0].firstChip.position.y
        var upperRightChipX = this.seats[i].firstChip.position.x
        var upperRightChipY = this.seats[i].firstChip.position.y+distanceBetweenChipsY*(self.imageData.maxChipsPerColumn-1)
        var betX = upperRightChipX+betTextWidth+absoluteDistanceBetweenBetTextAndChipImages
        var betY = upperRightChipY
        //bet size
        this.seats[i].bet = new this.Item(betX,betY,betTextWidth,betTextHeight,self.gameState.zPositionData.chips)
    }
    else if(this.seats[i].seat.position.x < firstColumnX + seatLocationMarginOfError && this.seats[i].seat.position.x > firstColumnX - seatLocationMarginOfError){
        
        var dealerButtonX = this.seats[i].seat.position.x+leftColumnSeatDealerButtonX
        var dealerButtonY = this.seats[i].seat.position.y+leftColumnSeatDealerButtonY

        this.seats[i].dealerButton = new this.Item(dealerButtonX,dealerButtonY,dealerButtonWidth,dealerButtonHeight,self.gameState.zPositionData.chips)

        this.seats[i].firstChip = new this.Item(this.seats[i].seat.position.x+leftChipOffsetX,this.seats[i].seat.position.y+leftChipOffsetY,chipDiameter,chipDiameter,self.gameState.zPositionData.chips)
       this.seats[i].secondColumnChip = new this.Item( this.seats[i].firstChip.position.x+chipDiameter+self.imageData.distanceBetweenChipColumns,this.seats[i].firstChip.position.y,chipDiameter,chipDiameter,self.gameState.zPositionData.chips)

       
        //determine location of upperleft
        var distanceBetweenChipsY = this.pots[0].secondChip.position.y-this.pots[0].firstChip.position.y
        var upperLeftChipX = this.seats[i].firstChip.position.x
        var upperLeftChipY = this.seats[i].firstChip.position.y
        var betX = upperLeftChipX
        var betY = this.seats[i].firstChip.position.y+distanceBetweenChipsY*(self.imageData.maxChipsPerColumn-1) - betTextHeight-absoluteDistanceBetweenBetTextAndChipImages
        //bet size
        this.seats[i].bet = new this.Item(betX,betY,betTextWidth,betTextHeight,self.gameState.zPositionData.chips)
    }

    else if(this.seats[i].seat.position.y < fourthRowY + seatLocationMarginOfError && this.seats[i].seat.position.y > fourthRowY - seatLocationMarginOfError){
       
        this.seats[i].firstChip = new this.Item(this.seats[i].seat.position.x+bottomChipOffsetX,this.seats[i].seat.position.y+bottomChipOffsetY,chipDiameter,chipDiameter,self.gameState.zPositionData.chips)
        this.seats[i].secondColumnChip = new this.Item( this.seats[i].firstChip.position.x+chipDiameter+self.imageData.distanceBetweenChipColumns,this.seats[i].firstChip.position.y,chipDiameter,chipDiameter,self.gameState.zPositionData.chips)

        
        //determine location of lower left most chip
        var bottomLeftChipX = this.seats[i].firstChip.position.x
        var bottomLeftChipY = this.seats[i].firstChip.position.y
        var betX = bottomLeftChipX - betTextWidth - absoluteDistanceBetweenBetTextAndChipImages
        var betY = bottomLeftChipY
          
          var dealerButtonX = this.seats[i].seat.position.x+bottomRowSeatDealerButtonX
       var dealerButtonY = this.seats[i].seat.position.y+bottomRowSeatDealerButtonY



        this.seats[i].dealerButton = new this.Item(dealerButtonX,dealerButtonY,dealerButtonWidth,dealerButtonHeight,self.gameState.zPositionData.chips)
 //bet size
        this.seats[i].bet = new this.Item(betX,betY,betTextWidth,betTextHeight,self.gameState.zPositionData.chips)

   
    }
        else if(this.seats[i].seat.position.x < fifthColumnX + seatLocationMarginOfError && this.seats[i].seat.position.x > fifthColumnX - seatLocationMarginOfError){
        
        var dealerButtonX = this.seats[i].seat.position.x+rightColumnSeatDealerButtonX
        var dealerButtonY = this.seats[i].seat.position.y+rightColumnSeatDealerButtonY

        this.seats[i].dealerButton = new this.Item(dealerButtonX,dealerButtonY,dealerButtonWidth,dealerButtonHeight,self.gameState.zPositionData.chips)

        this.seats[i].firstChip = new this.Item(this.seats[i].seat.position.x+rightChipOffsetX,this.seats[i].seat.position.y+rightChipOffsetY,chipDiameter,chipDiameter,self.gameState.zPositionData.chips)
        this.seats[i].secondColumnChip = new this.Item( this.seats[i].firstChip.position.x-chipDiameter-self.imageData.distanceBetweenChipColumns,this.seats[i].firstChip.position.y,chipDiameter,chipDiameter,self.gameState.zPositionData.chips)
 
         
         //determine location bottom right most chip
        var bottomRightChipX = this.seats[i].firstChip.position.x
        var bottomRightChipY = this.seats[i].firstChip.position.y
        var betX = bottomRightChipX 
        var betY = bottomRightChipY  +chipDiameter + betTextHeight  
        //bet size
        this.seats[i].bet = new this.Item(betX,betY,betTextWidth,betTextHeight,self.gameState.zPositionData.chips)
    }

    //add second chip (same for all seats relative to first chip)
    var distanceBetweenChipsY = this.pots[0].secondChip.position.y-this.pots[0].firstChip.position.y
    this.seats[i].secondChip = new this.Item(this.seats[i].firstChip.position.x, this.seats[i].firstChip.position.y+distanceBetweenChipsY,chipDiameter,chipDiameter,self.gameState.zPositionData.chips)
    
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
        var chatY = self.images.seats[i].seat.position.y - absoluteChatDistanceFromSeatY
   self.images.seats[i].chat = new self.images.Item(chatX, chatY, chatBoxWidth, initialChatBoxHeight, self.gameState.zPositionData.playerBubbleChat)
   
   self.images.seats[i].chat.image = new createjs.Shape()

   //----------function to redraw chat box anytime with a new width
self.images.seats[i].chat.image.drawChat = function(width,numLines){

    //make sure width is <= maxWidth
    if(width == undefined){var width = self.images.seats[i].chat.size.x}
   else if(width>self.images.seats[i].chat.size.x){width = self.images.seats[i].chat.size.x}
   //clear previous graphics
   self.images.seats[i].chat.image.graphics.clear()
   //define parent
self.images.seats[i].chat.image.parentOfImageObject = self.images.seats[i].chat

//get new relative X coordinates of chat box
var x =   (self.images.seats[i].chat.size.x - width)/2
var y = 0
    self.images.seats[i].chat.image.snapToPixel = true
self.images.seats[i].chat.image.graphics.setStrokeStyle(1,'round').beginStroke(chatBoxBorderColor).beginFill('#000000')
.drawRoundRect(x, y - (numLines-1)*(chatBoxFontSize+1), width, self.images.seats[i].chat.size.y+(numLines-1)*(chatBoxFontSize+1),  self.images.seats[i].chat.size.y*.16)

self.images.seats[i].chat.image.alpha = self.imageData.chatBoxAlpha

//position image
 self.positionItemImage(self.images.seats[i].chat, {update:false})

}//end drawchat function

//player chat text
 self.images.seats[i].chat.text = new createjs.Text('', chatBoxFontSize+ 'px Arial', '#FFFFFF')
self.images.seats[i].chat.text.x=self.images.seats[i].chat.position.x +  self.images.seats[i].chat.size.x/2 
 self.images.seats[i].chat.text.y= self.images.seats[i].chat.position.y
 self.images.seats[i].chat.text.baseline = 'top'
 self.images.seats[i].chat.text.textAlign = 'center'
 self.images.seats[i].chat.text.lineWidth =   self.images.seats[i].chat.size.x*.85

 // self.images.seats[i].chat.text.lineHeight = chatBoxFontSize+1
 // self.images.seats[i].chat.text.maxWidth = self.images.seats[i].chat.size.x*.85



 })

//assing parentOfItem to all Items in self.images.seats
 _.each(_.range(this.seats.length), function(seatNumber) {
_.each(self.images.seats[seatNumber], function(value, index, element){

self.images.seats[seatNumber][index].parentOfItem = self.images.seats[seatNumber]

})//iteration through self.images.seats[seatNumber]

})//iteration through self.images.seats

 //============================END OF SEATS ARRAY DECLARATION===============


         //---------------action buttons------------------
      this.fold = new this.Item(actionButtonLeftX,actionButtonY,actionButtonWidth,actionButtonHeight,self.gameState.zPositionData.button, {messages:['act','fold']})
      this.call = new this.Item(actionButtonLeftX+actionButtonWidth+distanceBetweenActionButtons,actionButtonY,actionButtonWidth,actionButtonHeight,self.gameState.zPositionData.button, {messages:['act','call']})
      this.check = new this.Item(actionButtonLeftX+actionButtonWidth+distanceBetweenActionButtons,actionButtonY,actionButtonWidth,actionButtonHeight,self.gameState.zPositionData.button, {messages:['act','check']})
      this.raise = new this.Item(this.check.position.x +actionButtonWidth+distanceBetweenActionButtons,actionButtonY,actionButtonWidth,actionButtonHeight,self.gameState.zPositionData.button,{messages:['act','raise']})
      this.bet = new this.Item(this.check.position.x +actionButtonWidth+distanceBetweenActionButtons,actionButtonY,actionButtonWidth,actionButtonHeight,self.gameState.zPositionData.button,{messages: ['act','bet']})

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
              this.betSlider.horizontal = new this.Item (this.fold.position.x,canvasHeight-horizontalBetSliderOffsetBottom-horizontalBetSliderHeight,horizontalBetSliderWidth,horizontalBetSliderHeight,self.gameState.zPositionData.button)
              var verticalY = this.betSlider.horizontal.position.y+this.betSlider.horizontal.size.y/2-verticalBetSliderHeight/2
      this.betSlider.vertical = new this.Item(this.betSlider.horizontal.position.x,verticalY,verticalBetSliderWidth,verticalBetSliderHeight,self.gameState.zPositionData.button)
var betSizeX = this.betSlider.horizontal.position.x+this.betSlider.horizontal.size.x + distanceBetweenBetSizeAndHorizontalSlider
var betSizeY = this.betSlider.horizontal.position.y+this.betSlider.horizontal.size.y/2-betSizeHeight/2
      this.betSlider.betSize = new this.Item(betSizeX,betSizeY,betSizeWidth,betSizeHeight,self.gameState.zPositionData.button)

      this.itemAsBitmap(this.betSlider.horizontal, this.sources.horizontalSlider)
        this.itemAsBitmap(this.betSlider.vertical, this.sources.verticalSlider)
this.betSlider.betSize.image = document.getElementById('betSize')

self.updateBetSize('')

//set z-index of betsizediv
var betSizeStageParent = self.arrayOfParentsOfStageAndOfContainerArray[self.images.betSlider.vertical.position.z.stage]
var betSizeStageCanvasZIndex = $(betSizeStageParent.stage.canvas).css('z-index')
$('#betSizeDiv').css('z-index', parseInt(betSizeStageCanvasZIndex)+1)

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
        this.community[0] = new this.Item(canvasWidth/2-cardWidth/2-cardWidth*2-distanceBetweenCommunityCards*2,communityY,cardWidth, cardHeight,self.gameState.zPositionData.communityCards)
        this.community[1] = new this.Item(canvasWidth/2-cardWidth/2-cardWidth-distanceBetweenCommunityCards,communityY,cardWidth, cardHeight,self.gameState.zPositionData.communityCards)
        this.community[2] = new this.Item(canvasWidth/2-cardWidth/2,communityY,cardWidth, cardHeight,self.gameState.zPositionData.communityCards)
        this.community[3] = new this.Item(canvasWidth/2+cardWidth/2+distanceBetweenCommunityCards,communityY,cardWidth, cardHeight,self.gameState.zPositionData.communityCards)
        this.community[4] = new this.Item(canvasWidth/2+cardWidth/2+cardWidth+2*distanceBetweenCommunityCards,communityY,cardWidth, cardHeight,self.gameState.zPositionData.communityCards)

  //------------------card spawn location---------------------------------

           this.startingCard = new this.Item(canvasWidth/2-this.community[0].size.x/2, this.community[0].position.y+this.community[0].size.y+40 , cardWidth, cardHeight, self.gameState.zPositionData.cardAnimation)


       

 this.cashierButton = new this.Item(canvasWidth-80,0, cashierButtonWidth, cashierButtonHeight, self.gameState.zPositionData.button)
  
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

  //--------------upper right side button---------------------
        this.standUp = new this.Item(canvasWidth - standUpWidth,0,standUpWidth,standUpHeight,self.gameState.zPositionData.button,{ messages:['stand']})
           this.itemAsBitmap(this.standUp, this.sources.standUp)
   //define shape for hit area of  stand
   var standUpHit = new createjs.Shape()
   var topY = standUpHitAreaTopOffset
   var bottomY = this.standUp.size.y - standUpHitAreaBottomOffset

standUpHit.graphics.beginFill('#000000').setStrokeStyle(0)
.moveTo(standUpHitAreaUpperLeftOffsetX, topY)
.lineTo(standUpHitAreaLowerLeftOffsetX, bottomY)
.lineTo(this.standUp.size.x-standUpHitAreaRightOffset, bottomY)
.lineTo(this.standUp.size.x-standUpHitAreaRightOffset, topY)
.lineTo(standUpHitAreaUpperLeftOffsetX, topY)
this.standUp.image.hitArea = standUpHit

//disable overlay

   this.standUpDisabledShape = new this.Item(this.standUp.position.x + standUpHitAreaUpperLeftOffsetX,this.standUp.position.y+topY,this.standUp.size.x - standUpHitAreaUpperLeftOffsetX - standUpHitAreaRightOffset,this.standUp.size.y - topY - bottomY,{container:self.gameState.zPositionData.button.container, stage:self.gameState.zPositionData.button.stage +1}) 
   this.standUpDisabledShape.image = standUpHit.clone(true)
   this.standUpDisabledShape.image.x =  this.standUp.position.x 
   this.standUpDisabledShape.image.y = this.standUp.position.y
this.standUpDisabledShape.image.alpha = disabledButtonOverlayAlpha

//-------------------------upper left Get Chips-------
 this.getChips = new this.Item(0, 0, getChipsWidth, getChipsHeight, self.gameState.zPositionData.button, {messages:['get_add_chips_info']})
 this.itemAsBitmap(this.getChips, this.sources.getChips)


  //define shape of hit area
var getChipsHitTopLeft = {x:getChipsHitAreaLeftOffset,y:getChipsHitAreaTopOffset}
var getChipsHitBottomLeft = {x: getChipsHitTopLeft.x, y: this.getChips.size.y-getChipsHitAreaBottomOffset}
var getChipsHitTopRight = {x:this.getChips.size.x-getChipsHitAreaUpperRightOffset,y:getChipsHitAreaTopOffset}
var getChipsHitBottomRight = {x:this.getChips.size.x-getChipsHitAreaLowerRightOffset,y:getChipsHitBottomLeft.y}

    var getChipsHit = new createjs.Shape()

getChipsHit.graphics.beginFill('#000000').beginStroke(0)
.moveTo(getChipsHitTopLeft.x, getChipsHitTopLeft.y)
.lineTo(getChipsHitBottomLeft.x, getChipsHitBottomLeft.y)
.lineTo(getChipsHitBottomRight.x, getChipsHitBottomRight.y)
.lineTo(getChipsHitTopRight.x, getChipsHitTopRight.y)
.closePath
  this.getChips.image.hitArea = getChipsHit


   this.getChipsDisabledShape = new this.Item(getChipsHitTopLeft.x,getChipsHitTopLeft.y,getChipsHitTopRight.x-getChipsHitTopLeft.x,getChipsHitBottomRight.y-getChipsHitTopLeft.y,{container:self.gameState.zPositionData.button.container, stage:self.gameState.zPositionData.button.stage +1}) 
   this.getChipsDisabledShape.image = getChipsHit
this.getChipsDisabledShape.image.alpha = disabledButtonOverlayAlpha
   //--------------upper right exit Table--------------
 this.exitTable = new this.Item(canvasWidth - exitTableWidth, standUpHeight, exitTableWidth, exitTableHeight, self.gameState.zPositionData.button)
   this.itemAsBitmap(this.exitTable, this.sources.exitTable)
   //define shape of hit area

   var exitTableHit = new createjs.Shape()
   exitTableHit.graphics.beginStroke(0).beginFill('#000000')
.moveTo(this.exitTable.size.x-exitTableHitAreaRightOffset, exitTableHitAreaTopOffset)
.lineTo(this.exitTable.size.x-exitTableHitAreaRightOffset, this.exitTable.size.y - exitTableHitAreaBottomOffset)
.lineTo(exitTableHitAreaLowerLeftOffsetX, this.exitTable.size.y - exitTableHitAreaBottomOffset)
.lineTo(exitTableHitAreaUpperLeftOffsetX, exitTableHitAreaTopOffset)
.lineTo(this.exitTable.size.x-exitTableHitAreaRightOffset, exitTableHitAreaTopOffset)
//.closePath()

 this.exitTable.image.hitArea = exitTableHit
this.exitTable.image.onClick = self.events.exitTableClick

        //----------------not in hand action buttons------------------
        this.sitIn = new this.Item(actionButtonLeftX,actionButtonY,actionButtonWidth,actionButtonHeight,self.gameState.zPositionData.button, {messages:['sit_in']})
        this.rebuy = new this.Item(actionButtonLeftX,actionButtonY,actionButtonWidth,actionButtonHeight,self.gameState.zPositionData.button, {messages:['get_add_chips_info']})

         this.itemAsRectangle(this.sitIn,'black')
this.addItemText(this.sitIn,'Deal Me In','10px Arial','white')

 this.itemAsRectangle(this.rebuy,'black')
this.addItemText(this.rebuy,'Get Chips','10px Arial','white')
this.sitIn.image.onClick = self.events.onButtonClick
this.rebuy.image.onClick  = self.events.onButtonClick

//-------------------------currency display--------------------------
var currencyDisplayX = canvasWidth/2 - currencyDisplayWidth/2

this.currencyDisplay = new this.Item(currencyDisplayX, currencyDisplayTopOffset, currencyDisplayWidth, currencyDisplayHeight, self.gameState.zPositionData.button)
this.addItemText(this.currencyDisplay, '', currencyDisplaySizeAndFont, currencyDisplayColor)
//========================4 color deck sprite sheet=============================

var fourColorDeckData = {

     images: [this.sources.fourColorDeck],
     frames: {width:37, height:45}

}
/*
this.fourColorSprite = new createjs.SpriteSheet(fourColorDeckData)

*/

//=====================MESSAGE BOX=======MESSAGEBOX================================

var containersPerMessageBox = self.gameState.zPositionData.containersPerMessageBox
var messageBoxStageNumber = self.gameState.zPositionData.initialMessageBox.stage

//initialize items
  for(var messageBoxImageContainerIndex = self.gameState.zPositionData.initialMessageBox.container; messageBoxImageContainerIndex <= self.gameState.zPositionData.finalMessageBox.container - containersPerMessageBox;messageBoxImageContainerIndex=messageBoxImageContainerIndex+containersPerMessageBox){

//create empty objects
for(var n = messageBoxImageContainerIndex;n< messageBoxImageContainerIndex+containersPerMessageBox;n++){
  self.images.messageBox[n]={}
}
        //background bitmap 
        self.images.messageBox[messageBoxImageContainerIndex].window = new self.images.Item(0,0,0,0,{stage:messageBoxStageNumber, container: messageBoxImageContainerIndex})
        self.images.itemAsBitmap(self.images.messageBox[messageBoxImageContainerIndex].window, self.images.sources.messageBoxBackground)
        
    //add closeX Image
         self.images.messageBox[messageBoxImageContainerIndex].closeWindow =  new self.images.Item (0, 0,0,0,{stage:messageBoxStageNumber, container: messageBoxImageContainerIndex}) 
       self.images.itemAsBitmap(self.images.messageBox[messageBoxImageContainerIndex].closeWindow, self.images.sources.messageBoxCloseX)
       
}
//hide messageBoxCanvas
$(self.arrayOfParentsOfStageAndOfContainerArray[ this.messageBox[0].window.position.z.stage].stage.canvas).css('display','none')

//table image

this.table = new this.Item(tableX,tableY, canvasWidth,canvasHeight, self.gameState.zPositionData.table)
this.itemAsBitmap(this.table, this.sources.table)


//======================CASHIER=======================================

 var cashierImageContainerIndex = self.gameState.zPositionData.cashier.container
var cashierStageNumber = self.gameState.zPositionData.cashier.stage
var cashierWindowContainer = 0
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
        
        this.cashier.window = new this.Item(cashierWindowX,cashierWindowY,cashierWindowWidth,cashierWindowHeight,{stage:cashierStageNumber,container:cashierWindowContainer})
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
//hide cashierCanvas
$(self.arrayOfParentsOfStageAndOfContainerArray[ self.images.cashier.window.position.z.stage].stage.canvas).css('display','none')



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

//set z-index of cashier to 1 above z index of canvas
var cashierParentOfStage = self.arrayOfParentsOfStageAndOfContainerArray[self.images.cashier.window.position.z.stage]
var cashierStageCanvasZIndex = parseInt($(cashierParentOfStage.stage.canvas).css('z-index'))

   $('#cashierDiv').css('z-index', parseInt(cashierStageCanvasZIndex)+1)

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
                this.cashier[cashierItems[i].name] = new this.Item (textColumnX[cashierItems[i].location[0]],textRowY[cashierItems[i].location[1]], textColumnWidth[0],textHeight,{stage:cashierStageNumber,container:  cashierImageContainerIndex})
                if(cashierItems[i].text){var text = cashierItems[i].text}
                else{var text =''}
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
        this.cashier.grayBox = new this.Item(grayBoxX, grayBoxY, grayBoxWidth, grayBoxHeight, {stage:cashierStageNumber, container:cashierImageContainerIndex})

// location of html textboxes for adding chips
     this.cashier.addChipsTextBox = new this.Item (textX,this.cashier.accountBalance.position.y +25, innerCashierWidth,25,{stage:cashierStageNumber, container:cashierImageContainerIndex})

      this.cashier.addChips =  new this.Item (cashierWindowX + 10,cashierWindowY+cashierWindowHeight-40, 50,25,{stage:cashierStageNumber, container:cashierImageContainerIndex}) 
        this.itemAsRectangle( this.cashier.addChips, '#0000FF')
        this.addItemText( this.cashier.addChips, 'add chips', '13px arial', '#FFFFFF')
        this.cashier.addChips.image.onClick = self.events.onAddChipsClick

        this.cashier.cancel =  new this.Item (cashierWindowX + 100,cashierWindowY+cashierWindowHeight-40, 50,25,{stage:cashierStageNumber, container:cashierImageContainerIndex}) 
        this.itemAsRectangle( this.cashier.cancel, '#0000FF')
        this.addItemText( this.cashier.cancel, 'cancel', '13px arial', '#FFFFFF')
        this.cashier.cancel.image.onClick = self.hideCashier

         this.cashier.closeWindow =  new this.Item (closeWindowX,closeWindowY, closeWindowWidth,closeWindowHeight,{stage:cashierStageNumber, container:cashierImageContainerIndex}) 
       this.itemAsBitmap(this.cashier.closeWindow, this.sources.cashierCloseX)
       this.cashier.closeWindow.image.onClick = self.hideCashier


   // =============================================SOUNDS========================================
 
//showTableChatFull button
var showTableChatFullWidth = 112
var showTableChatFullHeight =  34
var showTableChatFullOffsetY = -6
var showTableChatFullHitAreaOffsetLeft= 1
var showTableChatFullHitAreaOffsetTop = 1
var showTableChatFullHitAreaOffsetBottom = 7
var showTableChatFullHitAreaOffsetTopRight =2
var showTableChatFullHitAreaOffsetBottomRight = 27

this.showTableChatFull = new this.Item(this.getChips.position.x, this.getChips.position.y+this.getChips.size.y+showTableChatFullOffsetY, showTableChatFullWidth, showTableChatFullHeight, self.gameState.zPositionData.button )
this.itemAsBitmap(this.showTableChatFull, this.sources.showTableChatFull)
this.showTableChatFull.image.onClick = self.events.showTableChatFullOnClick

this.hideTableChatFull = new this.Item(this.getChips.position.x, this.getChips.position.y+this.getChips.size.y+showTableChatFullOffsetY, showTableChatFullWidth, showTableChatFullHeight, self.gameState.zPositionData.button )
this.itemAsBitmap(this.hideTableChatFull, this.sources.hideTableChatFull)
this.hideTableChatFull.image.onClick = self.events.hideTableChatFullOnClick

//define shape of hit area
    var showTableChatFullHitArea = new createjs.Shape()

showTableChatFullHitArea.graphics.beginStroke(0).beginFill('#000000')
.moveTo(showTableChatFullHitAreaOffsetLeft, showTableChatFullHitAreaOffsetTop)
.lineTo(showTableChatFullHitAreaOffsetLeft, showTableChatFullHeight-showTableChatFullHitAreaOffsetBottom)
.lineTo(showTableChatFullWidth-showTableChatFullHitAreaOffsetBottomRight, showTableChatFullHeight-showTableChatFullHitAreaOffsetBottom)
.lineTo(showTableChatFullWidth-showTableChatFullHitAreaOffsetTopRight, showTableChatFullHitAreaOffsetTop)
.lineTo(showTableChatFullHitAreaOffsetLeft, showTableChatFullHitAreaOffsetTop)


  this.showTableChatFull.image.hitArea = showTableChatFullHitArea
  this.hideTableChatFull.image.hitArea = showTableChatFullHitArea



     //------------------------------TABLE CHAT POPUP----------------------------
//define table chat popup constants
  var tableChatFullLeftOffset = 5
var tableChatFullTopOffsetFromHideChat = 4
var tableChatFullBottomOffsetFromFoldToAnyBetButton = 5
var tableChatFullRightOffsetFromMiddleSeat = 10


  this.tableChatFull = {} // define object everyting within is inside the new canvas

//DIMENSIONS of popup
var tableChatFullStageX = tableChatFullLeftOffset
var tableChatFullStageY = tableChatFullTopOffsetFromHideChat + this.hideTableChatFull.position.y+this.hideTableChatFull.size.y
var tableChatFullStageWidth = this.seats[0].seat.position.x-tableChatFullStageX - tableChatFullRightOffsetFromMiddleSeat
var tableChatFullStageHeight = this.foldToAnyBet.position.y - tableChatFullBottomOffsetFromFoldToAnyBetButton - tableChatFullStageY

//create stageelement
this.tableChatFull.htmlStageElement = new this.Item(tableChatFullStageX, tableChatFullStageY, tableChatFullStageWidth, tableChatFullStageHeight,self.gameState.zPositionData.tableChatFull
  )
//console.log('tablechatfullhtml element')
//console.log(this.tableChatFull.htmlStageElement)

//console.log(self.arrayOfParentsOfStageAndOfContainerArray[ this.tableChatFull.htmlStageElement.position.z.stage])
var tableChatFullStageCanvas =  self.arrayOfParentsOfStageAndOfContainerArray[ this.tableChatFull.htmlStageElement.position.z.stage].stage.canvas

   $(tableChatFullStageCanvas).attr({
      'width': this.tableChatFull.htmlStageElement.size.x+'px',
'height': this.tableChatFull.htmlStageElement.size.y+'px'
  })
        $(tableChatFullStageCanvas).css({
'display':'none',
               'left':this.tableChatFull.htmlStageElement.position.x+'px',
    'top':this.tableChatFull.htmlStageElement.position.y +'px',
  //  'z-index':1
           })

var tableChatFullWindowBackgroundColor = self.permanentPreferences.tableChatFull.windowColor.value
var tableChatFullWindowBorderColor = '#000000'
var tableChatFullWindowBorderWidth = 1
var tableChatFullWindowAlpha = self.permanentPreferences.tableChatFull.windowAlpha.value
var tableChatFullRoundedRectCornerSizeRatioOfHeight = 0.05

  this.tableChatFull.window = new this.Item(0, 0, tableChatFullStageWidth, tableChatFullStageHeight,self.gameState.zPositionData.tableChatFull)
  this.tableChatFull.window.image = new createjs.Shape()
this.tableChatFull.window.image.graphics.beginFill(tableChatFullWindowBackgroundColor)
.setStrokeStyle(tableChatFullWindowBorderWidth,'round').beginStroke(tableChatFullWindowBorderColor)
.drawRoundRect(this.tableChatFull.window.position.x, this.tableChatFull.window.position.y, this.tableChatFull.window.size.x, this.tableChatFull.window.size.y, tableChatFullRoundedRectCornerSizeRatioOfHeight*this.tableChatFull.window.size.y)
this.tableChatFull.window.image.alpha = tableChatFullWindowAlpha

var hideDealerMessagesOffsetLeft =  this.tableChatFull.htmlStageElement.size.x*.05 //checkBoxButtonOffSetLeft
var hideDealerMessagesOffsetRight =  hideDealerMessagesOffsetLeft//checkBoxButtonOffSetLeft
var hideDealerMessagesOffsetTop =  checkBoxButtonDistanceY

this.tableChatFull.hideDealerMessages = new this.Item(hideDealerMessagesOffsetLeft, hideDealerMessagesOffsetTop, this.tableChatFull.window.size.x - checkBoxButtonOffSetLeft*2, checkBoxButtonHeight,self.gameState.zPositionData.tableChatFullText)
this.itemAsBitmap(this.tableChatFull.hideDealerMessages, this.sources.checkBox)
addCheckBoxButtonText(this.tableChatFull.hideDealerMessages, 'Hide dealer messages')
this.tableChatFull.hideDealerMessages.image.onClick = self.events.hideDealerMessagesClicked

this.tableChatFull.hideDealerMessagesOn = new this.Item(hideDealerMessagesOffsetLeft, this.tableChatFull.hideDealerMessages.position.y, this.tableChatFull.hideDealerMessages.size.x, checkBoxButtonHeight,self.gameState.zPositionData.tableChatFullText)
this.itemAsBitmap(this.tableChatFull.hideDealerMessagesOn, this.sources.checkBoxChecked)
addCheckBoxButtonText(this.tableChatFull.hideDealerMessagesOn, 'Hide dealer messages')
this.tableChatFull.hideDealerMessagesOn.image.onClick = self.events.hideDealerMessagesOnClicked

this.tableChatFull.hidePlayerMessages = new this.Item(hideDealerMessagesOffsetLeft, hideDealerMessagesOffsetTop*2+checkBoxButtonHeight, this.tableChatFull.hideDealerMessages.size.x, checkBoxButtonHeight,self.gameState.zPositionData.tableChatFullText)
this.itemAsBitmap(this.tableChatFull.hidePlayerMessages, this.sources.checkBox)
addCheckBoxButtonText(this.tableChatFull.hidePlayerMessages, 'Hide player messages')
this.tableChatFull.hidePlayerMessages.image.onClick = self.events.hidePlayerMessagesClicked

this.tableChatFull.hidePlayerMessagesOn = new this.Item(hideDealerMessagesOffsetLeft, this.tableChatFull.hidePlayerMessages.position.y, this.tableChatFull.hideDealerMessages.size.x, checkBoxButtonHeight,self.gameState.zPositionData.tableChatFullText)
this.itemAsBitmap(this.tableChatFull.hidePlayerMessagesOn, this.sources.checkBoxChecked)
addCheckBoxButtonText(this.tableChatFull.hidePlayerMessagesOn, 'Hide player messages')
this.tableChatFull.hidePlayerMessagesOn.image.onClick = self.events.hidePlayerMessagesOnClicked

this.tableChatFull.hideObserverMessages = new this.Item(hideDealerMessagesOffsetLeft, checkBoxButtonDistanceY*3+checkBoxButtonHeight*2, this.tableChatFull.hideDealerMessages.size.x, checkBoxButtonHeight,self.gameState.zPositionData.tableChatFullText)
this.itemAsBitmap(this.tableChatFull.hideObserverMessages, this.sources.checkBox)
addCheckBoxButtonText(this.tableChatFull.hideObserverMessages, 'Hide observer messages')
this.tableChatFull.hideObserverMessages.image.onClick = self.events.hideObserverMessagesClicked

this.tableChatFull.hideObserverMessagesOn = new this.Item(hideDealerMessagesOffsetLeft, this.tableChatFull.hideObserverMessages.position.y, this.tableChatFull.hideDealerMessages.size.x, checkBoxButtonHeight,self.gameState.zPositionData.tableChatFullText)
this.itemAsBitmap(this.tableChatFull.hideObserverMessagesOn, this.sources.checkBoxChecked)
addCheckBoxButtonText(this.tableChatFull.hideObserverMessagesOn, 'Hide observer messages')
this.tableChatFull.hideObserverMessagesOn.image.onClick = self.events.hideObserverMessagesOnClicked



var longestLeftSideCheckBoxAndTextItemWidth = this.tableChatFull.hideObserverMessages.size.x
if(this.tableChatFull.hidePlayerMessages.size.x > longestLeftSideCheckBoxAndTextItemWidth){longestLeftSideCheckBoxAndTextItemWidth = this.tableChatFull.hidePlayerMessages.size.x }
if(this.tableChatFull.hideDealerMessages.size.x > longestLeftSideCheckBoxAndTextItemWidth){longestLeftSideCheckBoxAndTextItemWidth = this.tableChatFull.hidePlayerMessages.size.x }

var rightSideCheckBoxX = this.tableChatFull.hideDealerMessages.position.x + longestLeftSideCheckBoxAndTextItemWidth + hideDealerMessagesOffsetRight
var rightSideCheckBoxY = this.tableChatFull.hideDealerMessages.position.y

this.tableChatFull.disableTouchScroll = new this.Item(rightSideCheckBoxX, rightSideCheckBoxY, 0, checkBoxButtonHeight,self.gameState.zPositionData.tableChatFullText)
this.itemAsBitmap(this.tableChatFull.disableTouchScroll, this.sources.checkBox)
addCheckBoxButtonText(this.tableChatFull.disableTouchScroll, 'Disable touch scroll')
this.tableChatFull.disableTouchScroll.image.onClick = self.events.disableTouchScrollClicked

this.tableChatFull.disableTouchScrollOn = new this.Item(this.tableChatFull.disableTouchScroll.position.x, this.tableChatFull.disableTouchScroll.position.y, this.tableChatFull.disableTouchScroll.size.x, checkBoxButtonHeight,self.gameState.zPositionData.tableChatFullText)
this.itemAsBitmap(this.tableChatFull.disableTouchScrollOn, this.sources.checkBoxChecked)
addCheckBoxButtonText(this.tableChatFull.disableTouchScrollOn, 'Disable touch scroll')
this.tableChatFull.disableTouchScrollOn.image.onClick = self.events.disableTouchScrollOnClicked

//chat message text

var htmlChatStageElementTextOffsetLeft = checkBoxButtonOffSetLeft - 1
var htmlChatStageElementTextOffsetRight = checkBoxButtonOffSetLeft - 1
var htmlChatStageElementTextOffsetTopFromLastButton = 3
var htmlChatStageElementTextOffsetBottom = this.tableChatFull.window.size.y*tableChatFullRoundedRectCornerSizeRatioOfHeight

var htmlChatStageElementX = this.tableChatFull.htmlStageElement.position.x + htmlChatStageElementTextOffsetLeft
var htmlChatStageElementY = this.tableChatFull.htmlStageElement.position.y + this.tableChatFull.hideObserverMessages.position.y+this.tableChatFull.hideObserverMessages.size.y + htmlChatStageElementTextOffsetTopFromLastButton 
var htmlChatStageElementWidth = this.tableChatFull.htmlStageElement.size.x -htmlChatStageElementTextOffsetLeft-htmlChatStageElementTextOffsetRight
var htmlChatStageElementHeight = this.tableChatFull.htmlStageElement.size.y - htmlChatStageElementTextOffsetBottom -(htmlChatStageElementY-this.tableChatFull.htmlStageElement.position.y) 



this.tableChatFull.htmlChatStageElement = new this.Item(htmlChatStageElementX, htmlChatStageElementY, htmlChatStageElementWidth ,htmlChatStageElementHeight, self.gameState.zPositionData.tableChatFull)
var tableChatFullParentOfStage = self.arrayOfParentsOfStageAndOfContainerArray[ this.tableChatFull.htmlChatStageElement.position.z.stage]
var tableChatFullStageCanvasZIndex = $(tableChatFullParentOfStage.stage.canvas).css('z-index')
 
        self.jQueryObjects.tableChatFullDiv.css({
                    '-webkit-touch-callout': 'none',
'-webkit-user-select': 'none',
'-khtml-user-select': 'none',
'-moz-user-select': 'none',
'-ms-user-select': 'none',
'user-select': 'none',
          'display':'none',
               'left':this.tableChatFull.htmlChatStageElement.position.x+'px',
    'top':this.tableChatFull.htmlChatStageElement.position.y +'px',
 'width': this.tableChatFull.htmlChatStageElement.size.x+'px',
'height': this.tableChatFull.htmlChatStageElement.size.y+'px',
'z-index':parseInt(tableChatFullStageCanvasZIndex)+1
           })




var scrollBarInnerWidth = 2
var scrollBarBorderWidth = 1
var scrollBarTotalWidth = scrollBarInnerWidth + 2*scrollBarBorderWidth

var chatMessageOffsetLeft = 0
var chatMessageOffsetRight = 0//scrollBarTotalWidth
var chatMessageOffsetTop = 0
var chatMessageOffsetBottom =  chatMessageOffsetTop



this.tableChatFull.chatMessageText = new this.Item(chatMessageOffsetLeft, chatMessageOffsetTop, htmlChatStageElementWidth -  chatMessageOffsetLeft - chatMessageOffsetRight,htmlChatStageElementHeight  - chatMessageOffsetTop - chatMessageOffsetBottom, self.gameState.zPositionData.tableChatFullText)

var chatMessageFontSize = self.permanentPreferences.tableChatFull.chatMessageFontSize.value
var chatMessageFont = 'arial'
var chatMessageFontColor = self.permanentPreferences.tableChatFull.chatMessageFontColor.value

//create create js text display object
//this.tableChatFull.chatMessageText.text = new createjs.DOMElement(document.getElementById('tableChatFullTextDiv'))
this.tableChatFull.chatMessageText.text = document.getElementById('tableChatFullTextDiv')


/*this.tableChatFull.chatMessageText.text.x=this.tableChatFull.chatMessageText.position.x
this.tableChatFull.chatMessageText.text.y=this.tableChatFull.chatMessageText.position.y
*/



 // $("#tableChatFullTextDiv").niceScroll("#tableChatFullTextDiv",{cursorcolor:"#0F0",boxzoom:true});
 var messageTextScrollBarNiceScrollOptions = {
cursorwidth:3,
cursorborderwidth:scrollBarBorderWidth+'px solid #FFF',
enablescrollonselection:false,
horizrailenabled:false,
//boxzoom:true, 
//enablemousewheel:false,
hwacceleration:false,
bouncescroll:false,
cursoropacitymax:self.permanentPreferences.tableChatFull.windowAlpha.value, 
autohidemode:false,

touchbehavior :true,
zindex: parseInt(tableChatFullStageCanvasZIndex)+1,
background:'transparent'

}




 var mCustomScrollbarOptions = {

  // contentTouchScroll: true,
  theme: 'light',
 updateOnContentResize: true,
 scrollButtons:{
          enable:true
        },
 callbacks:{
    onScrollStart: function(){
      console.log('scrolling started')
    }
},
  set_height: this.tableChatFull.htmlChatStageElement.size.y,
  horizontalScroll: false
}



if(self.permanentPreferences.tableChatFull.scrollBarType && self.permanentPreferences.tableChatFull.scrollBarType.value == 'mCustomScrollbar'){
console.log('creating mCustomScrollbar')
//show so that scroll bar can be initialized
 //$("#tableChatFullTextDiv").css('display','inline')

self.jQueryObjects.tableChatFullDiv.mCustomScrollbar(mCustomScrollbarOptions)
// $("#tableChatFullTextDiv").css('display','none')

}

else{

 $("#tableChatFullTextDiv").niceScroll(messageTextScrollBarNiceScrollOptions)




}

//scrollBarObject.css('overflow','hidden')
//scrollBarObject.css('z-index','-1')
/*
self.jQueryObjects.tableChatFullDiv.hover(function() {
    $(document).bind('mousewheel DOMMouseScroll',function(e){ 
        e.preventDefault()
    });
}, function() {
    $(document).unbind('mousewheel DOMMouseScroll');
});
*/
 
var stopWheel = function(e){
  console.log(e)
 //  if(!e){ /* IE7, IE8, Chrome, Safari */ 
 //       e = window.event; 
//    }
    if(e.preventDefault) { /* Chrome, Safari, Firefox */ 
        e.preventDefault(); 
    } 
    e.returnValue = false; /* IE7, IE8 */
}


 
 //  self.jQueryObjects.tableChatFullParagraph.attr({  })
 

        self.jQueryObjects.tableChatFullParagraph.css({
               'width': this.tableChatFull.chatMessageText.size.x+'px',
'height': this.tableChatFull.chatMessageText.size.y+'px',
          'font': chatMessageFont,
          'font-size':chatMessageFontSize + 'px',
          'color': chatMessageFontColor ,

'text-overflow': 'auto',
//'bottom':'-'+(parseFloat(this.tableChatFull.chatMessageText.position.y) + parseFloat(this.tableChatFull.chatMessageText.size.y))+'px',
    'top': this.tableChatFull.chatMessageText.position.y+'px',
       'left':this.tableChatFull.chatMessageText.position.x+'px',

  //  'z-index':1
           })

/*
this.tableChatFull.chatMessageText.text = new createjs.Text('', toString(chatMessageFontSize) + ' '+chatMessageFont, chatMessageFontColor)
this.tableChatFull.chatMessageText.text.x=this.tableChatFull.chatMessageText.position.x
this.tableChatFull.chatMessageText.text.y=this.tableChatFull.chatMessageText.position.y
this.tableChatFull.chatMessageText.text.baseline = 'top'
this.tableChatFull.chatMessageText.text.textAlign = 'left'
this.tableChatFull.chatMessageText.text.lineWidth = this.tableChatFull.chatMessageText.size.x*.9
this.tableChatFull.chatMessageText.text.maxWidth = this.tableChatFull.chatMessageText.size.x*.9
*/

//hit area or tableChatFull.chatMessageText
/*
var tableChatFullHitArea = new createjs.Shape()
tableChatFullHitArea.graphics.beginStroke('#FFFFFF').beginFill('#FFFFFF')
.drawRect(0, 0, this.tableChatFull.chatMessageText.size.x, this.tableChatFull.chatMessageText.size.y)
this.tableChatFull.chatMessageText.text.hitArea = tableChatFullHitArea
*/
//this.tableChatFull.chatMessageText.text.htmlElement.onMouseDown = self.events.tableChatFullChatMessageTextMouseDown

//self.jQueryObjects.tableChatFullParagraph.mousedown(function(event){self.events.tableChatFullChatMessageTextMouseDown(event)})​


console.log(this.tableChatFull.chatMessageText)
//this.tableChatFull.hide = new this.Item(tableChatFullX, tableChatFullY, tableChatFullWidth, tableChatFullHeight,self.gameState.zPositionData.tableChatFullButton)
       
        //postion canvas element textbox
 



/*
//---------------------------------------report bug-----------------------------------------------------

this.reportBug = new this.Item(0, this.getChips.size.y, 165,30,self.gameState.zPositionData.holeCards)


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
*/

console.log('all createjs images have been created')

} //end set Defaults

//options.stageNumber, if on existing number, will push the existing number up 1
this.createStage = function (options){
//console.log('creating a stage with the following options')
//console.log(options)

//this functions sets the stage's settings after it's been created
var initializeStageSettings = function (options){
  if(!options){var options = {}}
  if(!options.stageOptions){options.stageOptions = {}}

    if(!_.isNumber(options.stage)){var stageNumber = self.arrayOfParentsOfStageAndOfContainerArray.length-1}
else{var stageNumber = options.stage}
var stageOptions = options.stageOptions

 self.arrayOfParentsOfStageAndOfContainerArray[stageNumber].stage.autoClear=false
  self.arrayOfParentsOfStageAndOfContainerArray[stageNumber].stage.snapToPixel = false
 self.arrayOfParentsOfStageAndOfContainerArray[stageNumber].stage.snapToPixelEnabled = false
//set stage options
if(stageOptions){
//  console.log(stageOptions)
  if(stageOptions.touchEnabled === true){
        createjs.Touch.enable(self.arrayOfParentsOfStageAndOfContainerArray[stageNumber].stage)
      }
        if(!_.isNull(stageOptions.mouseEnabled) &&!_.isUndefined(stageOptions.mouseEnabled)){
        self.arrayOfParentsOfStageAndOfContainerArray[stageNumber].stage.mouseEnabled = stageOptions.mouseEnabled
      }
        if(!_.isNull(stageOptions.mouseMoveOutside) &&!_.isUndefined(stageOptions.mouseMoveOutside)){
        self.arrayOfParentsOfStageAndOfContainerArray[stageNumber].stage.mouseMoveOutside = stageOptions.mouseMoveOutside
      }
 if(_.isNumber(stageOptions.mouseOverFrequency)){
          self.arrayOfParentsOfStageAndOfContainerArray[stageNumber].stage.enableMouseOver(stageOptions.mouseOverFrequency)
      }
        if(!_.isNull(stageOptions.enableDOMEvents)  && !_.isUndefined(stageOptions.enableDOMEvents)){
        self.arrayOfParentsOfStageAndOfContainerArray[stageNumber].stage.enableDOMEvents(stageOptions.enableDOMEvents)
      }


}//if stageOptions

if(options.canvasHidden === true){
$(self.arrayOfParentsOfStageAndOfContainerArray[stageNumber].stage.canvas).css('display','none')
}

//create containers and add them to stage
if(_.isNumber(options.numContainers)){
  var numContainers = options.numContainers
if(!_.isArray(self.arrayOfParentsOfStageAndOfContainerArray[stageNumber].containers)) {
  self.arrayOfParentsOfStageAndOfContainerArray[stageNumber].containers =  []}

    for(var i  =0;i<numContainers;i++){
 self.arrayOfParentsOfStageAndOfContainerArray[stageNumber].containers[i] = new createjs.Container()
 self.arrayOfParentsOfStageAndOfContainerArray[stageNumber].stage.addChild(self.arrayOfParentsOfStageAndOfContainerArray[stageNumber].containers[i])
    }

}//if stageOptions.numContainers is specified create contianers
}



if(!options){var options = {}}
  //set default stage as last one if not listed
if(!_.isNumber(options.stage)){options.stage = this.arrayOfParentsOfStageAndOfContainerArray.length}


if(options.stage === 0 || this.arrayOfParentsOfStageAndOfContainerArray.length == 0){
  var previousCanvasIDNumber = 0
    var newCanvasIDNumber = 0

}//if first canvas, assign 0

else{

  //find previous canvas
  for(var i = options.stage-1;i>=0;i--){
if(!_.isEmpty(this.arrayOfParentsOfStageAndOfContainerArray[i])){
var previousStageNumber = i;i = -9999}
  }
 // console.log('currently creating stage number '+ options.stage + ', previous stage number is '+ previousStageNumber)
  var previousCanvasID = this.arrayOfParentsOfStageAndOfContainerArray[previousStageNumber].stage.canvas.id
var previousCanvasIDNumber = parseFloat(previousCanvasID.replace('canvas',''))

  //check if stage is on top of all other existing stagse
if(options.stage>this.arrayOfParentsOfStageAndOfContainerArray.length-1){
var newCanvasIDNumber = previousCanvasIDNumber + 1//increment from previous canvas
}//if stage is "toppest" stage

else { //if stage is in the middle
    var nextCanvasID = this.arrayOfParentsOfStageAndOfContainerArray[options.stage].stage.canvas.id
  var nextCanvasIDNumber = parseFloat( nextCanvasID.replace('canvas',''))
var newCanvasIDNumber = (previousCanvasIDNumber + nextCanvasIDNumber )/2//increment from previous canvas
}//if stage is in the "middle"

}//if NOT the first canvas

//console.log('canvas id number determined to be :'+newCanvasIDNumber)
//if we want to create a new canvas and use NEW canvasID number
if(options.newCanvas === true || options.stage === 0){
var newCanvasID = 'canvas'+newCanvasIDNumber
//defaults
var canvasWidth = 690
var canvasHeight = 480
var canvasClass = 'pokerCanvasClass'
var zIndexesPerCanvas = 10
var initialZIndex = 3

self.jQueryObjects.canvasDiv.append('<canvas id = '+'\''+newCanvasID+'\''+ 'class = '+ '\''+canvasClass+ '\''+' width='+'\''+canvasWidth+'\''+' height=' +'\''+canvasHeight+'\''+'></canvas>')

//console.log('created canvas with canvas id of: '+newCanvasID)
//set proper z-index
$('#'+newCanvasID).css('z-index',parseInt(newCanvasIDNumber*zIndexesPerCanvas)+initialZIndex)
}//if we want to create a new canvas

else{ //here we want to use previous canvasID number
  var newCanvasID = 'canvas'+previousCanvasIDNumber
}//if we DONT want to create a new canvas

//console.log('creating stage number '+options.stage)
//creating the new stage
self.arrayOfParentsOfStageAndOfContainerArray.splice(options.stage, 0, {})
self.arrayOfParentsOfStageAndOfContainerArray[options.stage].upToDate = true
self.arrayOfParentsOfStageAndOfContainerArray[options.stage].nickName = options.nickName
var canvas = document.getElementById(newCanvasID)
        self.arrayOfParentsOfStageAndOfContainerArray[options.stage].stage = new createjs.Stage(canvas)

//IN THE FUTURE WE WANT TO INCREASE THE FUTURE CANVAS/STAGES DATA TO WE CAN ADD IT HERE
initializeStageSettings(options)
}



this.initializeStagesAndCanvasCallThisFirst = function(){
var zPositionData = this.gameState.zPositionData
//console.log(zPositionData)
var stageData = []

//parse zPositionData to get data for stages =====>put in stageData
  _.each(zPositionData, function(element,index,list) {

    if(zPositionData[index].container === 0){
stageData[zPositionData[index].stage] = zPositionData[index]
stageData[zPositionData[index].stage].nickName = index
}//check if zpositiondata.container = 0

  }, this)//end iteration through zpositiondata

  //this is a sample of what the basic data will look like after its parsed
  /*
        this.gameState.stageData[this.gameState.zPositionData.background.stage] = {numContainers:3,nickName:'background'}

*/


//iterate through data to create stages
  var canvasNumber = 0
  console.log(stageData)
_.each(_.range (stageData.length), function(stageIteration){

 self.createStage (stageData[stageIteration])

})

}


        this.setBackground = function(){    
          var canvasHeight = this.arrayOfParentsOfStageAndOfContainerArray[this.gameState.zPositionData.background.stage].stage.canvas.height
          var canvasWidth = this.arrayOfParentsOfStageAndOfContainerArray[this.gameState.zPositionData.background.stage].stage.canvas.width
        this.images.background = new this.images.Item(0,0,canvasWidth,canvasHeight,this.gameState.zPositionData.background)
        this.images.itemAsBitmap(this.images.background, this.images.sources.background)
this.displayChildren(this.images.background)
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

    }

    this.images.setDefaultEvents = function(){

        //mouse events for changing bet sizes
         this.betSlider.vertical.image.onPress = self.events.betSliderVerticalMouseDown
         this.betSlider.horizontal.image.onPress = self.events.betSliderHorizontalMouseDown

        //mouse events for clicking on empty seats
             for (var i = 0; i < this.seats.length; i = i + 1){
         this.seats[i].openSeat.image.onClick = function(event){
          //clear the message array
if(_.isArray(event.target.parentOfImageObject.messages)){event.target.parentOfImageObject.messages.splice(0)}//splice if arry
else{event.target.parentOfImageObject.messages = []}//declare new array if not already an array


event.target.parentOfImageObject.messages.push('sit',event.target.parentOfImageObject.parentOfItem.rotatedSeatNumber)
          self.events.onButtonClick(event)
        }//openSeat.image.onClick event
        }


    //    self.stage.onPress = self.events.onStagePress

    }

    this.images.setDefaultMessages = function(){
        
    }
    
    this.createAllItems = function(){
        this.setBackground()
        this.images.setDefaults()

     this.receiveTableState()

       this.images.setDefaultEvents()
       this.images.setDefaultMessages()
      this.displayTableChatBox()
      console.log('this.create all items finished')
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

    this.hideAllBets = function(options){
      if(!options){var options = {}}
        var update = options.update
options.update = false

var stagesToUpdate = []

    for (var i=0;i<this.images.seats.length;i=i+1){
      stagesToUpdate.push(   this.hideBet(i, options) )
        }

options.update = update
if(update !== false){this.updateStages(stagesToUpdate)}
else{ return stagesToUpdate}
    }

    //rotates positions of players seats and their hole cards n times clockwise
    this.images.rotateSeats = function (n){

    }

    this.displayTableChatBox = function (){
self.jQueryObjects.chatBoxInput.css({
 'display'   : 'inline'
})
    }

    this.positionItemImage = function (item, options) {

if(_.isObject(item.image)){
  item.image.x = item.position.x
  item.image.y = item.position.y
}
/*
if(_.isObject(item.text)){
  item.text.x = item.position.x
  item.text.y = item.position.y
}
*/

if(!_.isObject(options)){return}
if(options.update !== false){this.updateStages(item.position.z.stage)}
   
    }

  //define function to get width of string
     this.getStringWidth = function(string, font){
     var context = self.arrayOfParentsOfStageAndOfContainerArray[0].stage.canvas.getContext('2d')
     context.font = font
     var textData = context.measureText(string)
     return textData.width
     }

    this.disableTableChatBox = function(){ self.jQueryObjects.chatBoxInput.attr("readonly", true)   }

    this.enableTableChatBox = function(){self.jQueryObjects.chatBoxInput.attr("readonly", false) }

    this.hideTableChatBox = function(){ self.jQueryObjects.chatBoxInput.attr("display", none) }


this.getSeatImageIndex  = function (seatNum, seatNumberVariableName){
  if(!_.isString(seatNumberVariableName)){var seatNumberVariableName = 'originalSeatNumber'}
  for(var i = 0;i<self.images.seats.length;i++){
    if(self.images.seats[i][seatNumberVariableName] == seatNum){return i}
  }
}

 this.copyItemDisplayObjectLocationData = function(item){
var itemCopyWithOnlyLocationData = {}
if(item.image){
itemCopyWithOnlyLocationData.image = {}
  itemCopyWithOnlyLocationData.image.x = item.image.x
  itemCopyWithOnlyLocationData.image.y = item.image.y
}
if(item.text){
itemCopyWithOnlyLocationData.text={}
  itemCopyWithOnlyLocationData.text.x = item.text.x
  itemCopyWithOnlyLocationData.text.y = item.text.y
}

if(item instanceof self.images.Item){
  itemCopyWithOnlyLocationData.position = {}
  itemCopyWithOnlyLocationData.size = {}
itemCopyWithOnlyLocationData.position.x = item.position.x
itemCopyWithOnlyLocationData.position.y = item.position.y
itemCopyWithOnlyLocationData.size.x = item.size.x
itemCopyWithOnlyLocationData.size.y = item.size.y
}

return itemCopyWithOnlyLocationData

}

this.setDisplayObjectLocationsInItemAEqualToOnesInItemB = function(itemA, itemB){

if(itemA.image&&itemB.image){ itemA.image.x = itemB.image.x;itemA.image.y = itemB.image.y}

if(itemA.text&&itemB.text){itemA.text.x = itemB.text.x; itemA.text.y = itemB.text.y}

itemA.position.x = itemB.position.x
itemA.position.y = itemB.position.y
itemA.size.x = itemB.size.x
itemA.size.y = itemB.size.y

}

this.changeUserSeatView = function(seatNumberToRotateTo){
  console.log('changing userseat view to seatNumberToRotateTo '+seatNumberToRotateTo)
/*if(self.permanentPreferences.changeUserSeatViewTo.value == ['bottom','middle']){}
  else{return 'change view when seated setting is off'}*/
 if(!_.isNumber(seatNumberToRotateTo)){var seatNumberToRotateTo = 0}
if(seatNumberToRotateTo > this.gameState.numSeats){ return 'seatNumber too high, invalid'}

console.log('rotating to seat: '+seatNumberToRotateTo)
 console.log(this.images.seats)

var clockWiseRotationNumberBasedOnUnRotatedPosition
var temporaryArrayOfNonrotatedSeats = []
//make remporary array equal to seats.length
for(var i = 0;i<this.gameState.numSeats;i++){temporaryArrayOfNonrotatedSeats.push({})}
//determine where to seat the user (if seats have been previously rotated)
if(!_.isNumber(self.gameState.userSeatNumber)){clockWiseRotationNumberBasedOnUnRotatedPosition = this.gameState.numSeats - this.images.seats[0].rotatedSeatNumber}
  else if(seatNumberToRotateTo>=self.gameState.userSeatNumber){clockWiseRotationNumberBasedOnUnRotatedPosition = seatNumberToRotateTo-self.gameState.userSeatNumber}
    else{clockWiseRotationNumberBasedOnUnRotatedPosition = this.gameState.numSeats - self.gameState.userSeatNumber + seatNumberToRotateTo }

if(clockWiseRotationNumberBasedOnUnRotatedPosition === this.images.seats[0].rotatedSeatNumber){
//console.log('no rotation')
  return 'no rotation'}

//iterate through seats to get image location data
for(var i = 0;i<this.gameState.numSeats;i++){

  _.each(this.images.seats[i], function(element,index,list) {
 // for (var item in this.images.seats[i]) {

    if(self.images.seats[i][index] instanceof self.images.Item){
//console.log('coping index of '+i+' which has a rotatedSeatNumber of '+self.images.seats[i].rotatedSeatNumber)
temporaryArrayOfNonrotatedSeats[self.images.seats[i].rotatedSeatNumber][index] =  self.copyItemDisplayObjectLocationData(self.images.seats[i][index])

}//check if this.images.seats[i][item] is really item

  }, this)//end iteration through this.images.seats[i]
}//end iteration through this.images.seats


//console.log(temporaryArrayOfNonrotatedSeats)
//iterate through seats to swap image location data
 // console.log('beginning iteration through this.images.seats')
for(var i = 0;i<this.gameState.numSeats;i++){
this.images.seats[i].rotatedSeatNumber = (i+clockWiseRotationNumberBasedOnUnRotatedPosition)%this.gameState.numSeats
//for (var itemA in this.images.seats[i]) {

//console.log('beginning iteration through this.image.seats number'+ i)
  _.each(this.images.seats[i], function(element,index,list){
//console.log(index)
    if(self.images.seats[i][index] instanceof self.images.Item){
//console.log(this.images.seats[i])
self.setDisplayObjectLocationsInItemAEqualToOnesInItemB(this.images.seats[i][index], temporaryArrayOfNonrotatedSeats[(i+clockWiseRotationNumberBasedOnUnRotatedPosition)%this.gameState.numSeats][index])
  //end iteration through this.images.seats[i][item]
}//check if this.images.seats[i][item] is really item

  }, this)//end iteration through this.images.seats[i]

}//end iteration through this.images.seats


this.updateStages(this.images.seats[0].seat.position.z.stage)

}

    this.setNumberOfSeats = function (numSeats){

    //    if(this.images.seats.length != 10){return 'seat number already fixed'}
//if(this.gameState.numSeats == numSeats){return 'seat number already fixed'}

//====================================DECLARE USEFUL PRIVATE FUNCTIONS========================================



var disableSeat = function(seatNum, seatNumberVariableName){

  if(!_.isString(seatNumberVariableName)){var  seatArrayIndex = seatNum }

    //if variableType is specified
    else{ var seatArrayIndex = self.getSeatImageIndex (seatNum, seatNumberVariableName)}
/*
console.log('disabling seat with index of' +seatArrayIndex)
console.log(self.images.seats[self.images.seats.length-1].rotatedSeatNumber)
console.log(self.images.seats[self.images.seats.length-1].nonRotatedSeatNumber)
*/
//set rotated and nonrotated values to false
self.images.seats[seatArrayIndex].rotatedSeatNumber = false
self.images.seats[seatArrayIndex].nonRotatedSeatNumber = false

//push to end of Array
//self.images.seats.push( self.images.seats.splice( self.images.seats[seatArrayIndex],1)[0])
self.images.seats.move(seatArrayIndex, 1, self.images.seats.length-1)
/*
console.log(self.images.seats[self.images.seats.length-1].rotatedSeatNumber)
console.log(self.images.seats[self.images.seats.length-1].nonRotatedSeatNumber)
*/
}

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

        }//center topAndBottomSeats function

        var centerSeat2And8 = function(){
          console.log('centering seat 2 and 8')
                          var sideYDistance = (self.images.seats[2].seat.position.y - self.images.seats[3].seat.position.y)/2 


                          //adjust seat 2
             for(var i in self.images.seats[2]){
                 if(self.images.seats[2][i] instanceof self.images.Item){
                   self.images.seats[2][i].position.y =  self.images.seats[2][i].position.y - sideYDistance
                   if(self.images.seats[2][i].image){self.images.seats[2][i].image.y = self.images.seats[2][i].position.y }
               if(self.images.seats[2][i].text){self.images.seats[2][i].text.y = self.images.seats[2][i].position.y}


                self.setDisplayObjectLocationsInItemAEqualToOnesInItemB(self.images.seats[8][i], self.images.seats[2][i])


               }//iterate through self.images.seats[2][index]
              }//iterate through self.images.seats[2]
              //adjust seat 8
         /*           for(var i in self.images.seats[8]){
                    if(self.images.seats[8][i] instanceof self.images.Item){
                        
   self.images.seats[8][i].position.y =  self.images.seats[8][i].position.y - sideYDistance
                   if(self.images.seats[8][i].image){
                      self.images.seats[8][i].image.y = self.images.seats[8][i].image.y - sideYDistance
                   }
              if(self.images.seats[8][i].text){self.images.seats[8][i].text.y = self.images.seats[8][i].text.y - sideYDistance}
       }//iterate through self.images.seats[8][index]
               }//iterate through self.images.seats[8] */
               }  //center seat 2 and 8 function

//================================ACTION PART OF FUNCTION======================================

//undo any seat rotation
if(this.images.seats[0].rotatedSeatNumber !== this.images.seats[0].nonRotatedSeatNumber){
self.changeUserSeatView()}

//check to see if seatNumber has been changed before
if(this.imageData.numberOfPlayersSet !== true){
//if true we need to store the positions of all seat items
//create blank array to store data
this.imageData.originalSeatLocations = []
for(var seatNum = 0;seatNum<this.images.seats.length;seatNum++){
this.imageData.originalSeatLocations.push(this.copyItemDisplayObjectLocationData(this.images.seats[seatNum]))
}

}//if this is the first seatNumber change we made

//we need to set our location equal to the original
else{ 
  //first  set original seats (that have been taken out due to number of seats changing) back in place

for (var originalSeatNumber = 0;originalSeatNumber<this.images.seats.length;originalSeatNumber++){

//take out original seat and push to end of array
    this.images.seats.push(this.images.seats.splice(this.getSeatImageIndex(originalSeatNumber, 'originalSeatNumber'),1))

}//iterate through this.images.seats.length after increasing originalSeatNumber

//now set data equal to original
for(var seatNum = 0;seatNum<this.images.seats.length;seatNum++){
this.setDisplayObjectLocationsInItemAEqualToOnesInItemB(this.images.seats[seatNum], this.imageData.originalSeatLocations[seatNum])
}

}//if this is not the first seat number change

//=================================================================================================
//===NOW OUR SEATS ARRAY SHOULD BE EQUIVALENT TO OUR ORIGINAL SEAT ARRAY

//update number of seats
this.gameState.numSeats = numSeats

        
        if(numSeats == 9){
          disableSeat(5)

            } // remove top middle seat
    else    if(numSeats == 8){
       centerBottomAndTopSeats()
       disableSeat(5)
       disableSeat(0)
               }
     else   if(numSeats == 7){
        disableSeat(9)
         disableSeat(5)
       disableSeat(1)

            }
      else      if(numSeats == 6){
             //    set y positions of side to between top and bottom of before
 
               //move seat 2 up to the new position
                //move seat 8 up to the new position
          centerSeat2And8()
 disableSeat(7)
  disableSeat(5)
   disableSeat(3)
    disableSeat(0)


            }
          else  if(numSeats == 5){
              centerSeat2And8()
             disableSeat(9)
              disableSeat(7)
              disableSeat(6)
               disableSeat(3)
                disableSeat(1)


          }

          else if(numSeats == 4){
            centerSeat2And8()
             disableSeat(9)
              disableSeat(7)
                disableSeat(6)
                disableSeat(4)
                 disableSeat(3)
                  disableSeat(1)

          }
          
          else if(numSeats == 3){ 
             disableSeat(9)
                  disableSeat(8)
                   disableSeat(6)
                    disableSeat(5)
                     disableSeat(4)
                      disableSeat(2)
                       disableSeat(1)
                       
          }

          else if(numSeats == 2){
                centerSeat2And8()
                 disableSeat(9)
                  disableSeat(7)
                   disableSeat(6)
                    disableSeat(5)
                     disableSeat(4)
                      disableSeat(3)
                       disableSeat(1)
                        disableSeat(0)
                                                              
          }
          
  /*      
 for(var i =0; i<10;i++){
  console.log('index is '+i)
      console.log(     this.images.seats[i].nonRotatedSeatNumber )
      console.log(       this.images.seats[i].rotatedSeatNumber)
         //   this.images.seats[i].openSeat.messages = ['sit', i]
          }    
          */   

          //update numbers
          for(var i =0; i<this.gameState.numSeats;i++){
            this.images.seats[i].nonRotatedSeatNumber = i
            this.images.seats[i].rotatedSeatNumber = i
         //   this.images.seats[i].openSeat.messages = ['sit', i]
          }  

//console.log(this.images.seats)
//make sure new positions arenot stored again
this.imageData.numberOfPlayersSet = true
    }

    this.displayShownCard = function (cardText,parentOfImageObject, options){
        
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
     
     return(       this.displayChildren(parentOfImageObject, options) )
    }

        this.displayHoleCards = function (hand,seatNumber, options){
          if(!options){var options = {}}
            var update  = options.update
          options.update = false

var stagesToUpdate = []
               //check for and remove face down card images
         if(this.arrayOfParentsOfStageAndOfContainerArray[this.images.seats[seatNumber].hiddenCard0.position.z.stage].stage.contains(this.images.seats[seatNumber].hiddenCard0.image)){
            this.hideChildren(this.images.seats[seatNumber].hiddenCard0, options)
            this.hideChildren(this.images.seats[seatNumber].hiddenCard1, options)
            }

        this.displayShownCard(hand[0], this.images.seats[seatNumber].shownCard0, options)
        this.displayShownCard(hand[1], this.images.seats[seatNumber].shownCard1, options)

if(options.update !== false){this.updateStages(stagesToUpdate)}
return stagesToUpdate
    }

    this.hideHoleCards = function (seatNumber, options){
        
var itemsToHide = []
itemsToHide.push ( this.images.seats[seatNumber].hiddenCard0)
itemsToHide.push ( this.images.seats[seatNumber].hiddenCard1)
itemsToHide.push ( this.images.seats[seatNumber].shownCard0)
itemsToHide.push ( this.images.seats[seatNumber].shownCard1)

     return  this.hideChildren(itemsToHide, options)


    }

//if potsize is number will not display chips
    this.updatePotSize = function (potSize, options){
var newTotalPotSize = false

if(typeof potSize == 'object'){console.log(potSize.length)}
      //if potNumber is specified, we only update that 1 potSize
        if(options && _.isNumber(options.potNumber)){
     //     console.log('updating pot size based on one specific pot number')
          if(_.isArray[potSize]){var specificPotSize = potSize[options.potNumber]}
            else{var specificPotSize = potSize}
          this.images.pots[potNumber].text.text  = specificPotSize
 this.displayChipStack(parseFloat(specificPotSize), this.images.pots[options.potNumber], this.images.pots[options.potNumber].firstChip.position.x, this.images.pots[options.potNumber].firstChip.position.y,{update:false})
    
            }//if potNumber is specified

//if potSize is a number (representing total pot) or is a aray of length 1 (representing total pot)
//we want to update and display only the total pot
        else if (_.isNumber(potSize)){
console.log('updating only the total pot size text')
          newTotalPotSize = potSize
        }
         else if(_.isArray(potSize) && potSize.length == 1){ 
   //       console.log('updating potsize based on array of length 1')
          newTotalPotSize = potSize[0]
this.images.pots[0].potSize.text.text = newTotalPotSize
self.displayChipStack(parseFloat(newTotalPotSize), self.images.pots[0], self.images.pots[0].firstChip.position.x, self.images.pots[0].firstChip.position.y, {update:false})
        }
                       

       else  if(_.isArray(potSize)&&potSize.length>1){
    //    console.log('updating potsize display and there are split pot')
          var aggregatedPotSize = 0
          for(var i = 0;i<potSize.length;i++){

aggregatedPotSize = aggregatedPotSize + parseFloat(potSize[i])
//redraw chipstack ONLY if value is different from before
if(parseFloat(potSize[i]) != parseFloat(this.images.pots[i].potSize.text.text)){
this.images.pots[i].potSize.text.text = potSize[i]
self.displayChipStack(parseFloat(potSize[i]), self.images.pots[i], self.images.pots[i].firstChip.position.x, self.images.pots[i].firstChip.position.y, {update:false})
  }
   this.displayChildren(this.images.pots[i].potSize, options)
//   this.displayChildren(this.images.pots[i].chips, options)
 }//end loop throuh potSize array
 //display total PotSize
              newTotalPotSize =   aggregatedPotSize
 }

 if(_.isNumber(newTotalPotSize)) {
  this.images.totalPotSize.text.text = 'Pot: '+newTotalPotSize
         this.displayChildren(this.images.totalPotSize, options)
       }
         

if(!options || options.update !== false){this.updateStages(this.images.totalPotSize.position.z.stage)}
    }

    this.playerSits = function(seatNumber, playerName, chips, options){

        this.gameState.seats[seatNumber].displayMessageType = 'seat'
        this.images.seats[seatNumber].playerName.text.text =  playerName
        if(_.isNumber(chips) && chips>0){
        this.images.seats[seatNumber].status.text.text =  chips
        }
        else if( chips == 0){
             this.images.seats[seatNumber].status.text.text =  'adding chips'
        }
       
      var stagesToUpdate =   this.displayCorrectSeatMessage(seatNumber, options)
      return stagesToUpdate
    }

    this.hideBet = function (seatNumber, options){
   var stagesToUpdate = []
      stagesToUpdate.push(      this.hideChildren(this.images.seats[seatNumber].bet, options) )
             stagesToUpdate.push(          this.hideChildren(this.images.seats[seatNumber].chips, options)     )
            
        //    this.images.seats[seatNumber].chips.splice(0, this.images.seats[seatNumber].chips.length)
           
  while (this.images.seats[seatNumber].chips.length > 0) {this.images.seats[seatNumber].chips.pop()}

return stagesToUpdate
    }

    this.addChildToContainer = function (child, containerIndex, options){
 //     console.log('adding child to stage ')
 //     console.log(options)
        if(options){
          
          if(_.isNumber(options.stageNumber)){var stageNumber = options.stageNumber}//if options does not exist
   
}//if options
      else{var stageNumber= child.parentOfImageObject.position.z.stage}

 

        this.arrayOfParentsOfStageAndOfContainerArray[stageNumber].containers[containerIndex].addChild(child)

    }



   //this.images.seats[i] is parent for players bets, this.images.pots[i] is parent for pots
    this.displayChipStack = function(chipAmount,parentOfChipArray, initialX, initialY, options){
        //remove previous chips
        this.hideChildren(parentOfChipArray.chips, {update:false})
        if(!_.isArray(parentOfChipArray.chips)){parentOfChipArray.chips = []}
        //reset chip array from memory
   else{ while(parentOfChipArray.chips.length>0) {parentOfChipArray.chips.pop()}}
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
            this.displayChip('10k',x,y, parentOfChipArray, {update:false})
            y =y+chipIncrementY
            chipAmount = chipAmount -10000
        }
           else if(chipAmount>=5000){
            this.displayChip('5k',x,y, parentOfChipArray, {update:false})
            y =y+chipIncrementY
            chipAmount = chipAmount -5000
        }
        else     if(chipAmount>=1000){
            
            this.displayChip('1k',x,y, parentOfChipArray, {update:false})
            y =y+chipIncrementY
            chipAmount = chipAmount -1000
        }
              else    if(chipAmount>=500){
            
            this.displayChip(500,x,y, parentOfChipArray, {update:false})
            y =y+chipIncrementY
            chipAmount = chipAmount -500
        }
           else    if(chipAmount>=100){
            
            this.displayChip(100,x,y, parentOfChipArray, {update:false})
            y =y+chipIncrementY
            chipAmount = chipAmount -100
        }
        else if(chipAmount>=50){
            
            this.displayChip(50,x,y, parentOfChipArray, {update:false})
            y =y+chipIncrementY
            chipAmount = chipAmount -50
        }
      else  if(chipAmount>=25){
            
             this.displayChip(25,x,y, parentOfChipArray, {update:false})
            y =y+chipIncrementY
            chipAmount = chipAmount -25

        }
      else   if(chipAmount >=5){
             this.displayChip(5,x,y, parentOfChipArray, {update:false})
            y =y+chipIncrementY
            chipAmount = chipAmount -5
        }
      else   if(chipAmount >=1){
             this.displayChip(10,x,y, parentOfChipArray, {update:false})
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
if(!options || (options.update !== false && options.hidden !== true)){
  if(_.isArray(parentOfChipArray.chips)&&parentOfChipArray.chips.length>0 && parentOfChipArray.chips[0] instanceof this.images.Item){
    this.updateStages(parentOfChipArray.chips[0].position.z.stage)}
}

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
       parentOfChipArray.chips.push(new this.images.Item(x,y,diameter,diameter,this.gameState.zPositionData.chips))
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
    this.hideText(parentOfChipArray.chips[i], {update:false})
    parentOfChipArray.chips[i].text = null
    }
}
 if(options && options.hidden == true){}
  else{this.displayChildren(parentOfChipArray.chips, {update:false})}


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
            self.updateStages(parentOfImageObject.position.z.stage)

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
    self.updateStages(parentOfImageObject.position.z.stage)
clearInterval(imageAnimation)
             if(  performOnEnd){ performOnEnd()}
                }//if last tick

            else{tick++}
}, interval)

 }

 //get Width of a line of text from its parent Item, returns [width, fontSize]
 this.getTextWidthAndFontSize = function (parentOfTextObject, fontSize){
     if(parentOfTextObject instanceof this.images.Item){
         if(!fontSize){
           var pIndex =   parentOfTextObject.text.font.indexOf('p')
           var PIndex =  parentOfTextObject.text.font.indexOf('P')
           if(pIndex>=PIndex){var pLocation = PIndex}
           else if(pIndex<PIndex){var pLocation = pIndex}
           var fontSize = parentOfTextObject.text.font.substring(0,pLocation)
         }//if no font size
     }
     var context = this.arrayOfParentsOfStageAndOfContainerArray[0].stage.canvas.getContext('2d')
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
    var animatedCard = new this.images.Item(initialX, initialY, this.images.community[0].size.x, this.images.community[0].size.y, this.gameState.zPositionData.cardAnimation)
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
    var animatedCard = new this.images.Item(initialX, initialY, this.images.community[0].size.x, this.images.community[0].size.y, this.gameState.zPositionData.cardAnimation)
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
    var animatedCard = new self.images.Item(initialX, initialY, self.images.community[0].size.x, self.images.community[0].size.y, self.gameState.zPositionData.cardAnimation)
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
    self.displayChildren(self.images.community[i],{update:false})
      }
      //update stage to display face up cards
      self.updateStages(self.images.community[i].position.z.stage)
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
            
                    animatedCards0[cardsDealt] = new self.images.Item(initialX, initialY, self.images.community[0].size.x, self.images.community[0].size.y, self.gameState.zPositionData.cardAnimation)
          self.images.itemAsBitmap(animatedCards0[cardsDealt], self.images.seats[playerArray[playerArrayNumber]].hiddenCard0.bitmapSource)
           self.animateImage(initialX,initialY,animationTime, lastTick+1,  animatedCards0[cardsDealt], self.images.seats[playerArray[playerArrayNumber]].hiddenCard0.position.x,self.images.seats[playerArray[playerArrayNumber]].hiddenCard0.position.y, function(){
               callback(null, callBackNumber)
               
               })
          }

          else if(cardsDealt>playerArrayNumber){
          animatedCards1[cardsDealt] = new self.images.Item(initialX, initialY, self.images.community[0].size.x, self.images.community[0].size.y, self.gameState.zPositionData.cardAnimation)
          self.images.itemAsBitmap(animatedCards1[cardsDealt], self.images.seats[playerArray[playerArrayNumber]].hiddenCard0.bitmapSource) 
               self.animateImage(initialX,initialY,animationTime, lastTick+1, animatedCards1[cardsDealt], self.images.seats[playerArray[playerArrayNumber]].hiddenCard1.position.x,self.images.seats[playerArray[playerArrayNumber]].hiddenCard1.position.y, function(){
                   callback(null, callBackNumber)
                   
                 
                   })
              
 }
 
 })
                
 callBackNumber ++
        asyncArray.push( function(callback){

                       if(_.isNumber(self.gameState.userSeatNumber) && playerArray[playerArrayNumber] == self.gameState.userSeatNumber && holeCardArray){  
                       
                       if(cardsDealt==playerArrayNumber){
                        self.hideChildren(animatedCards0[cardsDealt]) //hide temporarily animated image
                       self.displayShownCard(holeCardArray[0], self.images.seats[playerArray[playerArrayNumber]].shownCard0)  
                     }
                       else if (cardsDealt>playerArrayNumber){
                        self.hideChildren(animatedCards1[cardsDealt]) //hide temporarily animated image
                           self.displayShownCard(holeCardArray[1], self.images.seats[playerArray[playerArrayNumber]].shownCard1)  
                       }
          
                       }//if player being dealt to is user AND holecardarrayexists
                    else{ 
                    if(cardsDealt==playerArrayNumber){ 
                      self.hideChildren(animatedCards0[cardsDealt]) //hide temporarily animated image

                      self.displayChildren(self.images.seats[playerArray[playerArrayNumber]].hiddenCard0)
                    }
                       else if (cardsDealt>playerArrayNumber){
  self.hideChildren(animatedCards1[cardsDealt]) //hide temporarily animated image

                        self.displayChildren(self.images.seats[playerArray[playerArrayNumber]].hiddenCard1)
                      }
}//if not dealing face up card to user
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

    if(self.arrayOfParentsOfStageAndOfContainerArray[self.images.bet.position.z.stage].stage.contains(self.images.bet.text)){
        self.images.bet.text.text = 'Bet '+betSize
        }
    
    else if(self.getParentOfStageObject(self.images.raise).stage.contains(self.images.raise.text)){
        self.images.raise.text.text = 'Raise to '+betSize
    }
}//if not all in
self.images.betSlider.vertical.image.x = newX //adjust vertical slider location
//adjust messages
self.images.bet.messages = ['act','bet',betSize]
self.images.raise.messages = ['act','raise',betSize]
self.updateBetSize(betSize)
this.updateStages(self.images.betSlider.vertical.position.z.stage)
         }

   this.displayAllCommunity = function(communityArray, options){
var stagesToUpdate = []
    for (var i = 0; i < communityArray.length; i = i + 1) {

    if ( _.isString(communityArray[i]) && communityArray[i].length >= 2) {
  stagesToUpdate.push(    this.displayShownCard(communityArray[i], this.images.community[i], options) )}
    }

return stagesToUpdate
    }

    this.getParentOfStageObject  = function(item){
      if(item instanceof this.images.Item){
var parentOfStage = this.arrayOfParentsOfStageAndOfContainerArray[item.position.z.stage]
return parentOfStage
}

    }

this.updateBetSize = function(betSize){
 $('#betSize').val(betSize)
 self.gameState.betSize = betSize
}
 
    //parameter is parent of the actual Image object
    this.displayImage = function (parentOfImageObject, options){
 if(!_.isObject(options)){var optionsWithCondom = {}}
    else{var optionsWithCondom = _.clone(options)}

if(!_.isNumber(optionsWithCondom.stageNumber)){
  optionsWithCondom.stageNumber = parentOfImageObject.position.z.stage
}
if(optionsWithCondom.container){
  var container = optionsWithCondom.container
}//if options.conainer

  else {
var container = parentOfImageObject.position.z.container
}//if no optoins.container specified


        if(parentOfImageObject.image){
//if html element
         if(_.isString(parentOfImageObject.image.innerHTML)){$(parentOfImageObject.image).css('display','inline')}
        
         else if (this.arrayOfParentsOfStageAndOfContainerArray[optionsWithCondom.stageNumber].containers[container].contains(parentOfImageObject.image) !==true){
this.addChildToContainer(parentOfImageObject.image, container, optionsWithCondom)
this.arrayOfParentsOfStageAndOfContainerArray[optionsWithCondom.stageNumber].upToDate = false
var changedWithoutUpdate = optionsWithCondom.stageNumber
        } //if easeljs object
        
            }//if image exists

              if((optionsWithCondom.update !== false && this.arrayOfParentsOfStageAndOfContainerArray[optionsWithCondom.stageNumber].upToDate !== true)||optionsWithCondom.update===true){
        this.updateStages(options.stageNumber)  
        
        var changedWithoutUpdate = false
}
return changedWithoutUpdate   
    }
    
    this.displayText = function (parentOfTextObject, options){
  if(!_.isObject(options)){var optionsWithCondom = {}}
    else{var optionsWithCondom = _.clone(options)}
if(!_.isNumber(options.stageNumber)){
  optionsWithCondom.stageNumber = parentOfTextObject.position.z.stage
}
if(options.container){
  var container = optionsWithCondom.container
}//if options.conainer

  else {
var container = parentOfTextObject.position.z.container
}//if no optoins.container specified

                               if(parentOfTextObject.text){

        // if html element
         if(_.isString(parentOfTextObject.text.innerHTML)){$(parentOfTextObject.text).css('display','inline')}
        
//if easeljs
      else if(this.arrayOfParentsOfStageAndOfContainerArray[optionsWithCondom.stageNumber].containers[container+1].contains(parentOfTextObject.text) !==true)   {
this.addChildToContainer(parentOfTextObject.text, container+1, optionsWithCondom)
this.arrayOfParentsOfStageAndOfContainerArray[optionsWithCondom.stageNumber].upToDate = false
var    changedWithoutUpdate  = optionsWithCondom.stageNumber
        } //if easeljs object
     
}//if .text exists

  if((optionsWithCondom.update !== false && this.arrayOfParentsOfStageAndOfContainerArray[optionsWithCondom.stageNumber].upToDate  !== true)||optionsWithCondom.update===true){
        this.updateStages(optionsWithCondom.stageNumber)   
   var    changedWithoutUpdate  =false
}
return changedWithoutUpdate   
    }

//returns stagesToUpdateArray
    this.displayChildren = function(parentOrGrandparent, options){
//      console.log('display children called')
  //    console.log(options)
        if (!options){var options = {}}
          var update = options.update//store our update preference now
        options.update = false//we are not going to update until the end
var stagesToUpdateArray = []

        //check if input is parent
        if(parentOrGrandparent instanceof this.images.Item){
        stagesToUpdateArray.push(    this.displayImage(parentOrGrandparent, options) )
       stagesToUpdateArray.push(   this.displayText(parentOrGrandparent, options))
        }//if parameter is an Item



        else if(_.isArray(parentOrGrandparent)){//if array
            for(var i =0;i<parentOrGrandparent.length;i++){
                    if(parentOrGrandparent[i] instanceof this.images.Item){
        stagesToUpdateArray.push(     this.displayImage(parentOrGrandparent[i], options) )
      stagesToUpdateArray.push(    this.displayText(parentOrGrandparent[i], options) )
        }

            }

        }//if parameter is array

                //input is grandparent object
        else if (_.isObject(parentOrGrandparent)){
            for(var i in parentOrGrandparent){
    if(parentOrGrandparent[i] instanceof this.images.Item){
 stagesToUpdateArray.push(    this.displayImage(parentOrGrandparent[i], options))
  stagesToUpdateArray.push(     this.displayText(parentOrGrandparent[i], options) )
        }
            }

        }//if parameter is non-Item object

        //udpate if not false
if(update !== false){
options.update = update
this.updateStages(stagesToUpdateArray, options)
}//if update was not specified as false

//return if not updated so we can update later
else {return stagesToUpdateArray}

}

 this.displayHiddenCards =function(seatNumber, options){
  var stagesToUpdate = []
  stagesToUpdate.push(   this.displayChildren(this.images.seats[seatNumber].hiddenCard0, options) )
  stagesToUpdate.push(    this.displayChildren(this.images.seats[seatNumber].hiddenCard1, options) )

  return stagesToUpdate

 }
    this.hideText = function(parentOfTextObject, options){
 if(!_.isObject(options)){var optionsWithCondom = {}}
    else{var optionsWithCondom = _.clone(options)}

if( !_.isNumber(optionsWithCondom.stageNumber)){
  var stageNumber = parentOfTextObject.position.z.stage
}//if options.parentofstage
else{
  var stageNumber = optionsWithCondom.stageNumber 
}//if no options.parentOfStage
if(_.isNumber(optionsWithCondom.container)){
  var container = optionsWithCondom.container
}//if options.conainer

  else {
var container = parentOfTextObject.position.z.container
}//if no optoins.container specified

        if(parentOfTextObject.text) {

 // if html element
         if(_.isString(parentOfTextObject.text.innerHTML)){$(parentOfTextObject.text).css('display','none')}
//if easeljs
      else  if(this.arrayOfParentsOfStageAndOfContainerArray[stageNumber].containers[container+1].contains(parentOfTextObject.text))  {

            self.arrayOfParentsOfStageAndOfContainerArray[stageNumber].containers[container+1].removeChild(parentOfTextObject.text)
this.arrayOfParentsOfStageAndOfContainerArray[stageNumber].upToDate = false
var changedWithoutUpdate = stageNumber
          }
        
        }//if text object
                      if((optionsWithCondom.update !== false && this.arrayOfParentsOfStageAndOfContainerArray[stageNumber].upToDate  !== true)||optionsWithCondom.update===true){
        this.updateStages(stageNumber)  
        var changedWithoutUpdate = false   
}
return changedWithoutUpdate
        }

 
 this.hideImage = function(parentOfImageObject, options){
 if(!_.isObject(options)){var optionsWithCondom = {}}
    else{var optionsWithCondom = _.clone(options)}

if( !_.isNumber(optionsWithCondom.stageNumber)){
  var stageNumber = parentOfImageObject.position.z.stage
}//if options.parentofstage
else{
  var stageNumber = optionsWithCondom.stageNumber 
}//if no options.parentOfStage
if(_.isNumber(optionsWithCondom.container)){
  var container = optionsWithCondom.container
}//if options.conainer

  else {
var container = parentOfImageObject.position.z.container
}//if no optoins.container specified

        if(parentOfImageObject.image) {
 // if html element
         if(_.isString(parentOfImageObject.image.innerHTML)){$(parentOfImageObject.image).css('display','none')}
//if easeljs
      else  if(self.arrayOfParentsOfStageAndOfContainerArray[stageNumber].containers[container].contains(parentOfImageObject.image))  {
        self.arrayOfParentsOfStageAndOfContainerArray[stageNumber].containers[container].removeChild(parentOfImageObject.image)
this.arrayOfParentsOfStageAndOfContainerArray[stageNumber].upToDate = false
var changedWithoutUpdate = stageNumber
      }

          }//if image object

                        if((optionsWithCondom.update !== false && this.arrayOfParentsOfStageAndOfContainerArray[stageNumber].upToDate  !== true)||optionsWithCondom.update===true){
        this.updateStages(stageNumber)     
        var changedWithoutUpdate = false
}
return changedWithoutUpdate
        }

 this.playerSitsOut =function(seatNumber, options){
            
         if(this.images.seats[seatNumber].status.text.text !== "Sitting Out"){
          this.images.seats[seatNumber].status.text.text = "Sitting Out"
        if (options && options.update === false){return this.images.seats[seatNumber].status.position.z.stage }
  else(this.updateStages(this.images.seats[seatNumber].status.position.z.stage ))
         }


        }

 this.hideChildren = function(parentOrGrandparent, options){
       if (!options){var options = {}}
          var update = options.update//store our update preference now
        options.update = false//we are not going to update until the end
var stagesToUpdateArray = []

             //check if input is parent
        if(parentOrGrandparent instanceof this.images.Item){
     stagesToUpdateArray.push(       this.hideImage(parentOrGrandparent, options))
       stagesToUpdateArray.push(         this.hideText(parentOrGrandparent, options))
        }


               else if(_.isArray(parentOrGrandparent)){
       
            for(var i =0;i<parentOrGrandparent.length;i++){
                    if(parentOrGrandparent[i] instanceof this.images.Item){

     stagesToUpdateArray.push(              this.hideImage(parentOrGrandparent[i], options))
      stagesToUpdateArray.push(          this.hideText(parentOrGrandparent[i], options))
        }

            }

        }


        else if(_.isObject(parentOrGrandparent)){
            for(var i in parentOrGrandparent){
    if(parentOrGrandparent[i] instanceof this.images.Item){
      stagesToUpdateArray.push(             this.hideImage(parentOrGrandparent[i], options))
      stagesToUpdateArray.push(          this.hideText(parentOrGrandparent[i], options))
        }
            }

        }
          

        //udpate if not false
if(update !== false){
  options.update = update
this.updateStages(stagesToUpdateArray, options)
}//if update was not specified as false

//return if not updated so we can update later
else {return stagesToUpdateArray}


 }

 this.hideAllActionButtons =function(options){
      if(!options){var options = {}}
        var update = options.update
      options.update = false


var stagesToUpdateArray = []
stagesToUpdateArray.push(this.hideChildren(this.images.fold, options))
stagesToUpdateArray.push(this.hideChildren(this.images.call, options))
stagesToUpdateArray.push(this.hideChildren(this.images.check, options))
stagesToUpdateArray.push(this.hideChildren(this.images.raise, options))
stagesToUpdateArray.push(this.hideChildren(this.images.bet, options))
stagesToUpdateArray.push(this.hideChildren(this.images.betSlider, options))
stagesToUpdateArray = _.flatten(stagesToUpdateArray)

if(update !== false){this.updateStages(stagesToUpdateArray)}
  else{return stagesToUpdateArray}
$('#betSize').css('display','none')
     

 }



 this.roundEnds = function(options){
     if(!options){var options ={}}
      var update = options.update
      options.update = false

var stagesToUpdate = []

     //hide community cards
     
stagesToUpdate.push(this.hideChildren(this.images.community[i]))

     //hide players' hands
       for(var i=0; i<this.images.seats.length;i++){ 
        this.hideChildren(this.images.seats[i].hiddenCard0, {update:false})
        this.hideChildren(this.images.seats[i].hiddenCard1, {update:false})
        this.hideChildren(this.images.seats[i].shownCard0, {update:false})
        this.hideChildren(this.images.seats[i].shownCard1, {update:false})
     }
stagesToUpdate.push(this.images.seats[0].hiddenCard0.position.z.stage)
stagesToUpdate.push(this.images.seats[0].shownCard0.position.z.stage)

     //remove all player's bets
    stagesToUpdate.push(    self.hideAllBets(options) )
        //hide the pot
    stagesToUpdate.push(     self.hideChildren(self.images.totalPotSize, {update:false}) )//main pot
        //side pots
         for(var i=0; i<this.images.pots.length;i++){
    stagesToUpdate.push(     self.hideChildren(self.images.pots[i].potSize, {update:false}) )
   stagesToUpdate.push(      self.hideChildren(self.images.pots[i].chips, {update:false}))
 }

options.update = update
if(update !== false){this.updateStages(stagesToUpdate)}
  else{return stagesToUpdate}

        //unbind scroll wheel events
         $(this.arrayOfParentsOfStageAndOfContainerArray[this.images.betSlider.vertical.position.z.stage].stage.canvas, '#betSize').unbind('mousewheel')
        $('#betSizeDiv').unbind('mousewheel')
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
if(self.arrayOfParentsOfStageAndOfContainerArray[self.images.seats[seatNumber].chips[0].position.z.stage].stage.contains(self.images.seats[seatNumber].chips[0].image)) {
  console.log(self.images.seats[seatNumber].chips)
}
        //remove temporary animated chipstack
        self.hideChildren(temporaryStacks[potWinners[potNumber][i].temporaryStackNumber].chips)
            console.log('finished hiding temporary stack number '+potWinners[potNumber][i].temporaryStackNumber)

//self.stage.update()
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
  console.log('setting player number '+players[i].seat)
if(i == players.length-1){next(null, errorNumber)}
}

}
)//end push

 async.series(finalArray, function(err, results){
  self.updateStages(self.images.seats[0].status.position.z.stage)
    console.log('winners async series completed with the following errors next line and results 2nd line')
  console.log(err)
  console.log(results)


 })
 
 }

this.checkIfTableChatFullMessageTextShouldBeScrolledAfterChangingText = function(){

console.log('checking if messageText is at bottom' )


//calculate total height of text
/*
console.log('total height ' + scroll[0].getContentSize().h)
console.log('pixels invisible above paragraph element' +  scroll[0].getScrollTop())
console.log('height of paragraph element ' + self.jQueryObjects.tableChatFullParagraph.height())
*/
if(self.permanentPreferences.tableChatFull.scrollBarType && self.permanentPreferences.tableChatFull.scrollBarType.value == 'mCustomScrollbar'){
//console.log('creating mCustomScrollbar')
//show so that scroll bar can be initialized

//self.jQueryObjects.tableChatFullDiv.mCustomScrollbar(mCustomScrollbarOptions)
console.log('assinging isAtBottom is true because i dontk now how to do it on mcustomscrollbar')
var isAtBottom = true//( scroll[0].getContentSize().h - scroll[0].getScrollTop() ===  self.jQueryObjects.tableChatFullParagraph.height())
}//if we using mCustomScrollBar

else{//if we don't want to use mCustomScrollbar
  var scroll = self.jQueryObjects.tableChatFullDiv.getNiceScroll()//grab niceScroll instance on the scroll div
console.log('content size = '+scroll[0].getContentSize().h +' upper scroll value = '+scroll[0].getScrollTop()+' height of visible paragraph = '+(self.jQueryObjects.tableChatFullParagraph.outerHeight(true)+1))
var isAtBottom = ( scroll[0].getContentSize().h - scroll[0].getScrollTop() <=  parseFloat(self.jQueryObjects.tableChatFullParagraph.outerHeight(true))+1)
}
console.log('var isAtBottom = ' + isAtBottom)
return isAtBottom

}

this.displayBubbleChat = function(chatInfo){

self.images.seats[chatInfo.seat].chat.text.text = ''
//trim front and trailing whitespace from chat message
chatInfo.message = chatInfo.message.replace(/^\s+|\s+$/g,'')
     //perform animation only if string is longer than 0 and is not purely spaces
  if (/\S/.test(chatInfo.message)){

  //remove previous tweens that may be running:
  createjs.Tween.removeTweens(self.images.seats[chatInfo.seat].chat.image)
//  createjs.Tween.removeTweens(self.images.seats[chatInfo.seat].chat.text)

var messageToAdd

     originalImageAlpha = self.imageData.chatBoxAlpha
var numLines = 1
     var textShortened = false
var finished = false
var currentLine = 0
var needElipses = false
var largestTextWidth = 0
var wasTrimmed = false
var numAddedChars = 0
var chatFont = self.images.seats[chatInfo.seat].chat.text.font

var ifSymbolRegex = /^[\.,-\/#!$%\^&\*;:{}=\-_`~()]+$/

while(finished == false){

     wasTrimmed  = false //reset wasTrimmed variable
  //set messagetoadd equal to whatever is currently added to the chat text
messageToAdd = chatInfo.message.substring(self.images.seats[chatInfo.seat].chat.text.text.length-numAddedChars,chatInfo.message.length)
     //loop to start excising end  String to single line

 var keepTrimming = true
     while(keepTrimming === true && self.getStringWidth(messageToAdd, chatFont)>self.images.seats[chatInfo.seat].chat.text.lineWidth){
     
var lastRemovedChar = messageToAdd.charAt(messageToAdd.length-1) //store last character
messageToAdd = messageToAdd.substring(0,messageToAdd.length-1) //remove last character from string

//check if length is shorter than the new bounds
 if(self.getStringWidth(messageToAdd, chatFont)<=self.images.seats[chatInfo.seat].chat.text.lineWidth){
  //exit out of while loop
var keepTrimming = false
if(lastRemovedChar === ' '){ // check if the char we just removed is a space
//we can add the character back into the string as it will now wrap properly
messageToAdd = messageToAdd + lastRemovedChar
}//if lastremoved chat is a space

if(messageToAdd.charAt(messageToAdd.length-1) === ' '){ // check if last char of messageToAdd is a space
//we can do nothing because string will wrap automatically to next line
wasTrimmed = true
}//if last char of messageToAdd is a space

else if(messageToAdd.charAt(messageToAdd.length-2) === ' '){// check if last char of messageToAdd is a space
//trim last char
messageToAdd = messageToAdd.substring(0,messageToAdd.length-1)
wasTrimmed = true

}//if second to last char of messageToAdd is a space, but last char is not a space

// check if lastremovedchar is a symbol, or last in messagetoadd
else if(ifSymbolRegex.test(lastRemovedChar) || ifSymbolRegex.test(messageToAdd.charAt(messageToAdd.length-1))){

  //so we want to trim last character and replace it with hyphen and space, to wrap to next line
messageToAdd = messageToAdd + ' '
numAddedChars = numAddedChars +1
wasTrimmed = true
}//if if last char in messagetoadd, or lastremoved char is a symbol

else {// last char is not a symbol
  
  //so we want to trim last character 
messageToAdd = messageToAdd.substring(0,messageToAdd.length-1)
wasTrimmed = true
//see what to replace last char with
if(ifSymbolRegex.test(messageToAdd.charAt(messageToAdd.length-1))){//check if new last is a symbol
messageToAdd = messageToAdd + ' ' //replace with space
numAddedChars = numAddedChars +1
}//check if new lastchar is a symbol

//see what to replace last char with
else{//new last char is NOT a symbol
messageToAdd = messageToAdd + '- ' //replace with hyphen and space
numAddedChars = numAddedChars +2
}//check if new lastchar is NOT symbol


}//if second to last char of messageToAdd is a space, but last char is not a space

 }// if messageToAdd is shorter or equal length to the line length


    }//loop through message to add

//}//loop thorugh entire text object to add text until end

  //append messageToAdd to the end of seats
self.images.seats[chatInfo.seat].chat.text.text = self.images.seats[chatInfo.seat].chat.text.text + messageToAdd

    //increase lines
if(wasTrimmed == true){

  if(numLines < self.permanentPreferences.playerChatMaxLines.value){
//increase lin counter
   numLines++
  currentLine++
}//if not on last line allowed
   


  else{//determine if elipses are needed
finished = true
// if message is finished elipses not needed
 if(self.images.seats[chatInfo.seat].chat.text.text.length-numAddedChars == chatInfo.message.length){ }
  else{needElipses = true}
  
  
}

}//if message was trimmed

else{ //if message was not trimmed
  finished = true
}//if message not trimmed
  }//continue looping until last line, finished must = true for loop to continue



if(needElipses == true){    //add elipses .... to end of text if text was shortened

self.images.seats[chatInfo.seat].chat.text.text=self.images.seats[chatInfo.seat].chat.text.text.substring(0,self.images.seats[chatInfo.seat].chat.text.text.length-4)
        self.images.seats[chatInfo.seat].chat.text.text = self.images.seats[chatInfo.seat].chat.text.text + '...'
    }//if needElipses = true


    //determine ratio of chat.text to chat.image
   var imageToTextWidthRatio =  self.images.seats[chatInfo.seat].chat.size.x/self.images.seats[chatInfo.seat].chat.text.lineWidth

    //determine width of tableChatBox
    if(numLines > 1)  {largestTextWidth = self.images.seats[chatInfo.seat].chat.text.lineWidth}
      else{largestTextWidth = self.getStringWidth(self.images.seats[chatInfo.seat].chat.text.text, chatFont)}

        //assign width of chat graphic
     var chatBoxWidth = imageToTextWidthRatio*largestTextWidth+1

     console.log('drawing chat widh Width of '+ chatBoxWidth)

    //draw new chatBox and set alpha to original alpha
    self.images.seats[chatInfo.seat].chat.image.drawChat(chatBoxWidth, numLines) // drawChat function resets alpha automatically

self.images.seats[chatInfo.seat].chat.text.alpha = 1
//set chat text to correct Y positoin
self.images.seats[chatInfo.seat].chat.text.y = self.images.seats[chatInfo.seat].chat.position.y - (numLines-1)*self.images.seats[chatInfo.seat].chat.text.getMeasuredLineHeight()
//display chat image and text
console.log(self.images.seats[chatInfo.seat].chat)
    self.displayChildren(self.images.seats[chatInfo.seat].chat)
     console.log(self.images.seats[chatInfo.seat].chat.text.text)
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

  }//playerChats function

this.appendTableChatFullMessageText = function(textString, options){

var isAtBottom = this.checkIfTableChatFullMessageTextShouldBeScrolledAfterChangingText() 

self.jQueryObjects.tableChatFullParagraph.append('<br>'+ textString)

if(isAtBottom == true && self.gameState.tableChatFull.mouseDown != true && options && options.moveTable !== false){ self.moveTableChatFullMessageText()}
else if(options && options.moveTable == true){self.moveTableChatFullMessageText()}
}

this.updateTableChatFullMessageTextFromCurrentOrAdditionalData = function(chatInfo, options){

//current preferences
var isDisplayingDealerMessages = this.gameState.tableChatFull.currentlyDisplayingDealerMessages
var isDisplayingPlayerMessages =  this.gameState.tableChatFull.currentlyDisplayingPlayerMessages
var isDisplayingObserverMessages = this.gameState.tableChatFull.currentlyDisplayingObserverMessages

  //target preferences
var shouldDisplayDealerMessages
 var shouldDisplayPlayerMessages
var shouldDisplayObserverMessages

if(self.sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hideDealerMessagesOn.value === false){ shouldDisplayDealerMessages = true}
  else{ shouldDisplayDealerMessages = false}
    if(self.sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hidePlayerMessagesOn.value === false){ shouldDisplayPlayerMessages = true}
  else{ shouldDisplayPlayerMessages = false}
    if(self.sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hideObserverMessagesOn.value === false){ shouldDisplayObserverMessages = true}
  else{ shouldDisplayObserverMessages = false}


//console.log(shouldDisplayDealerMessages +''+ shouldDisplayPlayerMessages +''+ shouldDisplayObserverMessages)

//console.log(isDisplayingDealerMessages+''+isDisplayingPlayerMessages+''+isDisplayingObserverMessages)

var needToUpdate = (isDisplayingDealerMessages !==  shouldDisplayDealerMessages) || (isDisplayingPlayerMessages !== shouldDisplayPlayerMessages) || (isDisplayingObserverMessages !== shouldDisplayObserverMessages)

var scrollDownAtEnd = this.checkIfTableChatFullMessageTextShouldBeScrolledAfterChangingText()
console.log('needToUpdate = '+needToUpdate)
//update existing display
if(needToUpdate === true || (options && options.update === true)){

//get the top line of text to preserve position

////*****************************DONT KNOW HOW TO DO THIS YET< WILL JUST SCROLL TO BOTTOM INSTEAD FOR NOW

self.gameState.tableChatFull.fullTextString = ''  //reset textstring

var displayCurrentLog 

//format of log is ['dealer',messageString, timeStampString]
for(var i = 0;i<self.gameState.tableChatFull.log.length;i++){

//skip appending messages if its of a type we dont want to display
if(self.gameState.tableChatFull.log[i][0] === 'dealer'){displayCurrentLog = shouldDisplayDealerMessages }
else if(self.gameState.tableChatFull.log[i][0] === 'observer'){displayCurrentLog = shouldDisplayObserverMessages}
  else {displayCurrentLog = shouldDisplayPlayerMessages}
   
   if(displayCurrentLog === true) {//we WANT to display the message

//add a line break if this is not the first line in the string
if(self.gameState.tableChatFull.fullTextString.length>0){self.gameState.tableChatFull.fullTextString = self.gameState.tableChatFull.fullTextString + '<br>'}

//add tablechatfull.log[i] to string
self.gameState.tableChatFull.fullTextString = self.gameState.tableChatFull.fullTextString + self.gameState.tableChatFull.log[i][1]

}//if we want to display this index of tableChatFull.log
}//iterate through tableChatFull.log

self.jQueryObjects.tableChatFullParagraph.html(self.gameState.tableChatFull.fullTextString)//add

this.gameState.tableChatFull.currentlyDisplayingDealerMessages = shouldDisplayDealerMessages
this.gameState.tableChatFull.currentlyDisplayingPlayerMessages = shouldDisplayPlayerMessages
this.gameState.tableChatFull.currentlyDisplayingObserverMessages = shouldDisplayObserverMessages

}//if needToUpdate  === true, this means a type of message needs to be shown or hidden


if(chatInfo && chatInfo.chatSourceType && chatInfo.message){
this.gameState.tableChatFull.log.push([chatInfo.chatSourceType, chatInfo.message])
//if timeStampString add it to the array
if(chatInfo.timeStampString){
  this.gameState.tableChatFull.log[this.gameState.tableChatFull.log.length-1].push(chatInfo.timeStampString)
}

this.appendTableChatFullMessageText(chatInfo.message, {moveTable:false})

}//if we want to append a message at the end

if(scrollDownAtEnd === true){this.moveTableChatFullMessageText({resize:true})}
  else{this.moveTableChatFullMessageText({magnitude:0, resize:true})}

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

    this.hideSeatedOptions = function(options){
      if(!options){var options = {}}
        var update = options.update
      options.update = false
var stagesToUpdate = []

this.images.standUp.image.onClick = null
this.images.getChips.image.onClick = null
stagesToUpdate.push( this.displayChildren (this.images.standUpDisabledShape, options))
stagesToUpdate.push(this.displayChildren (this.images.getChipsDisabledShape, options))

stagesToUpdate.push(this.hideChildren(self.images.sitOutNextHandOn , options))
stagesToUpdate.push(this.hideChildren(self.images.sitOutNextHand, options))
stagesToUpdate.push(this.hideChildren(self.images.sitOutNextBlind, options))
stagesToUpdate.push(this.hideChildren(self.images.sitOutNextBlindOn, options ))
stagesToUpdate.push(this.hideChildren(self.images.foldToAnyBet , options))
stagesToUpdate.push(this.hideChildren(self.images.foldToAnyBetOn, options))

    stagesToUpdate.push(  self.hideChildren(self.images.rebuy, options))
   stagesToUpdate.push(   self.hideChildren(self.images.sitIn, options))

stagesToUpdate.push(this.hideAllActionButtons(options))

if(update === false){return stagesToUpdate}
  else{this.updateStages(stagesToUpdate)}
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
//$('#betSize').css('display','inline')

//scroll wheel

    $(this.getParentOfStageObject(this.images.betSlider.vertical).stage.canvas).bind('mousewheel', function(event,delta, deltaX, deltaY) {

//console.log(event, delta, deltaX, deltaY)
//wheelScrolls = event.originalEvent.wheelDelta/120
self.events.wheelScroll(deltaY)
        })
    $('#betSizeDiv').bind('mousewheel', function(event,delta, deltaX, deltaY) {
//console.log(event, delta, deltaX, deltaY)
//wheelScrolls = event.originalEvent.wheelDelta/120
self.events.wheelScroll(deltaY)
        })

   
    /*
     $(this.getParentOfStageObject(this.images.betSlider.vertical).stage.canvas).bind('DOMMouseScroll', function(event, delta, deltaX, deltaY) {
      
wheelScrolls = event.originalEvent.wheelDelta/120
self.events.wheelScroll(wheelScrolls)
        })
*/
    }
this.playerChats = function(chatInfo){

this.gameState.tableChatFull.log.push(chatInfo)
//this.images.tableChatFull.chatMessageText
}

    this.displayCorrectSeatMessage = function(seatNumber, options){
      if(!options){var options = {}}
        var update = options.update
      options.update = false
var stagesToUpdate = []




        switch (this.gameState.seats[seatNumber].displayMessageType){

            case 'seat':
   stagesToUpdate.push(         this.displayChildren(this.images.seats[seatNumber].seat, options))
    stagesToUpdate.push(             this.displayChildren(this.images.seats[seatNumber].status, options))
   stagesToUpdate.push(              this.displayChildren(this.images.seats[seatNumber].playerName, options))
   stagesToUpdate.push(              this.hideText(this.images.seats[seatNumber].action, options))
    stagesToUpdate.push(             this.hideText(this.images.seats[seatNumber].winner, options))
    stagesToUpdate.push(             this.hideText(this.images.seats[seatNumber].countdown, options))
      stagesToUpdate.push(            this.hideChildren(this.images.seats[seatNumber].openSeat, options))
      stagesToUpdate.push(            this.hideChildren(this.images.seats[seatNumber].disabledSeat, options))
            break;

            case 'countdown':
     stagesToUpdate.push(              this.displayChildren(this.images.seats[seatNumber].seat, options))
     //make sure player is toAct
     if(self.gameState.seats[seatNumber].toAct === true){
        stagesToUpdate.push(             this.displayText(this.images.seats[seatNumber].countdown, options))
 stagesToUpdate.push(           this.hideChildren(this.images.seats[seatNumber].playerName, options))
      }
        else{
   stagesToUpdate.push(              this.displayChildren(this.images.seats[seatNumber].playerName, options))
   stagesToUpdate.push(             this.hideText(this.images.seats[seatNumber].countdown, options))
        }
     stagesToUpdate.push(            this.displayChildren(this.images.seats[seatNumber].status, options))     
     stagesToUpdate.push(            this.hideText(this.images.seats[seatNumber].action, options))
     stagesToUpdate.push(            this.hideText(this.images.seats[seatNumber].winner, options))
     stagesToUpdate.push(             this.hideChildren(this.images.seats[seatNumber].openSeat, options))
      stagesToUpdate.push(            this.hideChildren(this.images.seats[seatNumber].disabledSeat, options))
            break;

            case 'action':
     stagesToUpdate.push(             this.displayChildren(this.images.seats[seatNumber].seat, options))
    stagesToUpdate.push(              this.displayText(this.images.seats[seatNumber].action, options))
    stagesToUpdate.push(             this.displayChildren(this.images.seats[seatNumber].status, options))

       stagesToUpdate.push(          this.hideChildren(this.images.seats[seatNumber].playerName, options))
       stagesToUpdate.push(          this.hideText(this.images.seats[seatNumber].winner, options))
       stagesToUpdate.push(          this.hideText(this.images.seats[seatNumber].seat, options))
      stagesToUpdate.push(           this.hideText(this.images.seats[seatNumber].countdown, options))
      stagesToUpdate.push(           this.hideChildren(this.images.seats[seatNumber].openSeat, options))
       stagesToUpdate.push(           this.hideChildren(this.images.seats[seatNumber].disabledSeat, options))
            break;

            case 'winner':
      stagesToUpdate.push(             this.displayChildren(this.images.seats[seatNumber].seat, options))
      stagesToUpdate.push(           this.displayChildren(this.images.seats[seatNumber].status, options))
      stagesToUpdate.push(          this.displayChildren(this.images.seats[seatNumber].winner, options))

   stagesToUpdate.push(             this.hideChildren(this.images.seats[seatNumber].playerName, options))
    stagesToUpdate.push(             this.hideText(this.images.seats[seatNumber].action, options))
    stagesToUpdate.push(             this.hideText(this.images.seats[seatNumber].countdown, options))
    stagesToUpdate.push(             this.hideChildren(this.images.seats[seatNumber].openSeat, options))
     stagesToUpdate.push(            this.hideChildren(this.images.seats[seatNumber].disabledSeat, options))
            break;

            case 'openSeat':
            
                     if(_.isNumber(this.gameState.userSeatNumber)) {
                
      stagesToUpdate.push(               this.hideChildren(this.images.seats[seatNumber].openSeat, options))
      stagesToUpdate.push(               this.displayChildren(this.images.seats[seatNumber].disabledSeat, options))
            }

         else     if((this.gameState.userSeatNumber == false) || _.isNull(this.gameState.userSeatNumber)||_.isUndefined(this.gameState.userSeatNumber)){
     
      stagesToUpdate.push(               this.hideChildren(this.images.seats[seatNumber].disabledSeat, options))
       stagesToUpdate.push(          this.displayChildren(this.images.seats[seatNumber].openSeat, options))

            }

            
      stagesToUpdate.push(             this.hideChildren(this.images.seats[seatNumber].seat, options))
      stagesToUpdate.push(           this.hideChildren(this.images.seats[seatNumber].status, options))
      stagesToUpdate.push(           this.hideChildren(this.images.seats[seatNumber].playerName, options))
      stagesToUpdate.push(           this.hideText(this.images.seats[seatNumber].action, options))
      stagesToUpdate.push(           this.hideText(this.images.seats[seatNumber].winner, options))
     stagesToUpdate.push(            this.hideText(this.images.seats[seatNumber].countdown, options))
            break;

            default:

             if(_.isNumber(this.gameState.userSeatNumber)) {
                
       stagesToUpdate.push(              this.hideChildren(this.images.seats[seatNumber].openSeat, options))
      stagesToUpdate.push(               this.displayChildren(this.images.seats[seatNumber].disabledSeat, options))
            }
        
      else {
      stagesToUpdate.push(               this.hideChildren(this.images.seats[seatNumber].disabledSeat, options))
     stagesToUpdate.push(            this.displayChildren(this.images.seats[seatNumber].openSeat, options))

            }
      
            
     stagesToUpdate.push(              this.hideChildren(this.images.seats[seatNumber].seat, options))
    stagesToUpdate.push(             this.hideChildren(this.images.seats[seatNumber].status, options))
    stagesToUpdate.push(             this.hideChildren(this.images.seats[seatNumber].playerName, options))
     stagesToUpdate.push(            this.hideText(this.images.seats[seatNumber].action, options))
     stagesToUpdate.push(            this.hideText(this.images.seats[seatNumber].winner, options))
     stagesToUpdate.push(            this.hideText(this.images.seats[seatNumber].countdown, options))
            break;

            

        }




if(update === false){return stagesToUpdate}
  else{this.updateStages(stagesToUpdate)}

    }


    this.playerActs =function(seatNumber, actionText, fadeTimeInSeconds){
         //if player is current user, hide action buttons
        if(seatNumber === self.gameState.userSeatNumber){this.hideAllActionButtons(this.gameState.userSeatNumber)}
        this.gameState.seats[seatNumber].displayMessageType = 'action'

        self.images.seats[seatNumber].action.text.text = actionText

       

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
                self.updateStages(self.images.seats[seatNumber].action.position.z.stage)
                }
            else{
                self.images.seats[seatNumber].action.text.alpha = alpha
            self.images.seats[seatNumber].action.text.text = actionText
            self.updateStages(self.images.seats[seatNumber].action.position.z.stage)
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
        if(_.isNumber(fadeTimeInSeconds)){alpha = fadeTimeInSeconds}
        else{alpha = 2.5}


      var declareWinner =   setInterval(function() {
var stagesToUpdate = []
          if(self.gameState.seats[seatNumber].displayMessageType != 'winner'||alpha<=0)
          {
                if(self.gameState.seats[seatNumber].displayMessageType === 'winner'){self.gameState.seats[seatNumber].displayMessageType = 'seat'}
                
                clearInterval(declareWinner)
            }
            
            else if(alpha>1){
                self.images.seats[seatNumber].winner.text.alpha = 1
                self.images.seats[seatNumber].winner.text.text = 'Wins '+chipsWon
           stagesToUpdate.push(self.images.seats[seatNumber].winner.position.z.stage)
                }
            else{
                self.images.seats[seatNumber].winner.text.alpha = alpha
            self.images.seats[seatNumber].winner.text.text = 'Wins '+chipsWon
             stagesToUpdate.push(self.images.seats[seatNumber].winner.position.z.stage)
            }
            
            alpha = alpha - interval/1000
 stagesToUpdate.push(self.displayCorrectSeatMessage(seatNumber, {update:false}))
 self.updateStages(stagesToUpdate)

}, interval)

    }

    this.playerToAct =function(seatNumber, timeoutInMS){
      self.gameState.seats[seatNumber].timeToActInMS = timeoutInMS
         self.gameState.seats[seatNumber].toAct = true
self.gameState.seats[seatNumber].displayMessageType = 'countdown'

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
        var ticksPerColorChange = 15
        var interval = timeToChangeColors/ticksPerColorChange
        var lastTick = ticksPerColorChange-1
         var tick = 0
         var originalFillColor = self.images.seats[seatNumber].seat.image.fillColor
         var targetFillColorsArray = [[255,0,0],[0,0,0]]
         var lastCompletedFillColorCounter = -1


 //================DO STUFF BELOW====================================
 //console.log('starting countdown function with an interval of '+ interval)
 //console.log(self.playerToAct.caller)
//-----------start swapping colors until toAct becomes false----------------
              var countdown = setInterval(function() {
var stagesToUpdate = []

                 //get RGBA fill color of seat
           var currentFillColor =  self.images.seats[seatNumber].seat.image.fillColor
          var red;                var green;                var blue
          var previousTargetRed;  var previousTargetGreen;  var previousTargetBlue
          var targetRed;          var targetGreen;          var targetBlue
          var redIncreasePerTick; var greenIncreasePerTick; var blueIncreasePerTick
          var nextRed;            var nextGreen;            var nextBlue
         
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
//console.log('current time left to act = ' + self.gameState.seats[seatNumber].timeToActInMS)
//console.log('original time to act = ' + timeoutInMS)

//check if we want to end our interval
                if (self.gameState.seats[seatNumber].toAct === false)
                  {
                      clearInterval(countdown)
           stagesToUpdate.push( self.images.drawSeat(self.images.seats[seatNumber].seat, originalBorderColor, originalFillColor, originalMiddleDividerColor) )
           if(self.gameState.seats[seatNumber].displayMessageType == 'countdown'){self.gameState.seats[seatNumber].displayMessageType = 'seat'}
                      }
else{
//UPDATE GRAPHIC AROUND THE TABLE SEAT
 stagesToUpdate.push(  self.images.drawSeat(self.images.seats[seatNumber].seat, toActBorderColor, newFillColor, toActMiddleDividerColor, {borderFillRatio: self.gameState.seats[seatNumber].timeToActInMS/timeoutInMS, newFillColor:toActTimeLeftBorderColor}) )
    
    //================COUNTDOWN TEXT START================================================================

var countDownText = 'Time: '+ Math.ceil(self.gameState.seats[seatNumber].timeToActInMS/1000)

   if ( self.gameState.seats[seatNumber].timeToActInMS>= 0){
       if( self.images.seats[seatNumber].countdown.text.text !== countDownText){
        self.images.seats[seatNumber].countdown.text.text =  countDownText
        var countDownTextStage = self.images.seats[seatNumber].countdown.position.z.stage
var countdownTextContainer = self.images.seats[seatNumber].countdown.position.z.container

        if(self.arrayOfParentsOfStageAndOfContainerArray[countDownTextStage].containers[countdownTextContainer].contains(self.images.seats[seatNumber].countdown.text)){
                self.arrayOfParentsOfStageAndOfContainerArray[countDownTextStage].upToDate = false
        stagesToUpdate.push(countDownTextStage)
      }//if countdown text is on the stage

       }//if we need to change countdown text cuz its different
   }//if time to act is 0 or higher
     
     //==============================================================COUNT DOWN TEXT END================================================
        
         }//if we did NOT clear the countdown

//update stages as necessary
                   stagesToUpdate.push(   self.displayCorrectSeatMessage(seatNumber, {update:false}) )
                      self.updateStages(stagesToUpdate)

                      //decrement time to act
                      self.gameState.seats[seatNumber].timeToActInMS = self.gameState.seats[seatNumber].timeToActInMS - interval
        },interval)

    }



    /*

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
         self.updateStages(self.images.seats[seatNumber].countdown.position.z.stage)
   }

   else{
        if(self.gameState.seats[seatNumber].displayMessageType == 'countdown'){self.gameState.seats[seatNumber].displayMessageType = 'seat'}
        clearInterval(countdown)
       }
       
     self.displayCorrectSeatMessage(seatNumber)
   
}, interval)

}

*/
this.updateTableChatFullDisplay = function(displayOrHideChildrenOptions){
if(!displayOrHideChildrenOptions){var displayOrHideChildrenOptions = {}}
  var update = displayOrHideChildrenOptions.update
displayOrHideChildrenOptions.update = false

var stagesToUpdate = []

//hide items that should be hidden by default
_.each(self.sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem,function(value, index, list){
//console.log(index)
//console.log(value)
if(self.sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem[index].value === false){
stagesToUpdate.push(  self.hideChildren(self.images.tableChatFull[index], displayOrHideChildrenOptions) )
  console.log('hiding' + index)
}
else{stagesToUpdate.push(  self.displayChildren(self.images.tableChatFull[index], displayOrHideChildrenOptions) )}

})//end loop through self.sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem

//update text
this.updateTableChatFullMessageTextFromCurrentOrAdditionalData()
//console.log('finished adding to stages for tableChatFull display, now showing which stages should be updated')
//console.log(stagesToUpdate)

if(update !== false){this.updateStages(stagesToUpdate)}
else{return stagesToUpdate}
}


this.displayTableChatFull = function(hideOrDisplayChildrenOptions){
    if(!hideOrDisplayChildrenOptions){var hideOrDisplayChildrenOptions = {}}
        var update = hideOrDisplayChildrenOptions.update
        hideOrDisplayChildrenOptions.update = false


        var stagesToUpdate = []

//update what is showing and what isnt from current preferences

if(this.sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hideDealerMessages.value === false){
  this.gameState.tableChatFull.currentlyDisplayingDealerMessages = false
}
else{this.gameState.tableChatFull.currentlyDisplayingDealerMessages = true}

  if(this.sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hidePlayerMessages.value === false){
  this.gameState.tableChatFull.currentlyDisplayingPlayerMessages = false
}
else{this.gameState.tableChatFull.currentlyDisplayingPlayerMessages = true}

  if(this.sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hideObserverMessages.value === false){
  this.gameState.tableChatFull.scurrentlyDisplayingObserverMessages = false
}
else{this.gameState.tableChatFull.currentlyDisplayingObserverMessages = true}

stagesToUpdate.push(this.displayChildren(this.images.hideTableChatFull,hideOrDisplayChildrenOptions))
stagesToUpdate.push(this.hideChildren(this.images.showTableChatFull,hideOrDisplayChildrenOptions))
stagesToUpdate.push(this.displayChildren(this.images.tableChatFull, hideOrDisplayChildrenOptions))
//stagesToUpdate.push(this.displayChildren(this.images.tableChatFull.chatMessageText,hideOrDisplayChildrenOptions))

stagesToUpdate.push( this.updateTableChatFullDisplay(hideOrDisplayChildrenOptions) )


var tableChatFullCanvas = self.arrayOfParentsOfStageAndOfContainerArray[ this.images.tableChatFull.htmlStageElement.position.z.stage].stage.canvas

$(tableChatFullCanvas).css('display','inline')
self.jQueryObjects.tableChatFullParagraph.css('display','inline ')

if(update !== false){
  this.updateStages(stagesToUpdate)}
  else{return stagesToUpdate}



//console.log(this.images.tableChatFull.stage.contains(this.images.tableChatFull.window.image))
//console.log(this.images.tableChatFull.window.image.isVisible())
}


this.hideTableChatFull = function(options){
if(!options){var options = {}}
  var update = options.update
options.update = false

var stagesToUpdate = []

console.log('calling hideTableChatFull')
 stagesToUpdate.push(this.displayChildren(this.images.showTableChatFull,options))
stagesToUpdate.push(this.hideChildren(this.images.hideTableChatFull,options))
stagesToUpdate.push(this.hideChildren(this.images.tableChatFull, options))

var tableChatFullCanvas = self.arrayOfParentsOfStageAndOfContainerArray[ this.images.tableChatFull.htmlStageElement.position.z.stage].stage.canvas

$(tableChatFullCanvas).css('display','none')
self.jQueryObjects.tableChatFullParagraph.css('display','none')
if(update!== false){this.updateStages(stagesToUpdate)}
  else{stagesToUpdate}
}

/*
this.displayTableChatFull = function(){
//update what is showing and what isnt from current preferences

if(this.sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hideDealerMessages.value === false){
  this.gameState.tableChatFull.currentlyDisplayingDealerMessages = false
}
else{this.gameState.tableChatFull.currentlyDisplayingDealerMessages = true}

  if(this.sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hidePlayerMessages.value === false){
  this.gameState.tableChatFull.currentlyDisplayingPlayerMessages = false
}
else{this.gameState.tableChatFull.currentlyDisplayingPlayerMessages = true}

  if(this.sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hideObserverMessages.value === false){
  this.gameState.tableChatFull.scurrentlyDisplayingObserverMessages = false
}
else{this.gameState.tableChatFull.currentlyDisplayingObserverMessages = true}

this.displayChildren(this.images.hideTableChatFull,{update:false})
this.hideChildren(this.images.showTableChatFull,{update:false})
this.displayChildren(this.images.tableChatFull, { update:false})
this.displayChildren(this.images.tableChatFull.chatMessageText,{update:false})
console.log('getting ready to update stages')


this.updateTableChatFullDisplay({update:false})

//console.log(this.images.tableChatFull)
this.updateStages(this.images.hideTableChatFull.position.z.stage)
this.updateStages(this.images.tableChatFull.htmlStageElement.position.z.stage)

var tableChatFullCanvas = self.arrayOfParentsOfStageAndOfContainerArray[ this.images.tableChatFull.htmlStageElement.position.z.stage].stage.canvas

$(tableChatFullCanvas).css('display','inline')
self.jQueryObjects.tableChatFullParagraph.css('display','inline ')
//console.log(this.images.tableChatFull)
//console.log(this.images.tableChatFull.stage.contains(this.images.tableChatFull.window.image))
//console.log(this.images.tableChatFull.window.image.isVisible())
}

*/

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
    
    this.hideCashier = function(hideOrDisplayChildrenOptions){
      if(!hideOrDisplayChildrenOptions){var hideOrDisplayChildrenOptions = {}}
        var update = hideOrDisplayChildrenOptions.update
        hideOrDisplayChildrenOptions.update = false

        var stagesToUpdate = []
//hide cashierCanvas
$(self.arrayOfParentsOfStageAndOfContainerArray[self.images.cashier.window.position.z.stage].stage.canvas).css('display','none')


        //enable TableChatBox
        if(self.jQueryObjects.chatBoxInput.attr("readonly") == true||'readonly'){
            self.gameState.tableChatBox.display = false
       self.enableTableChatBox()
       }

                self.jQueryObjects.cashierForm.css('display','none')

                self.restoreActiveStages(self.gameState.cashier.activeStages)
        self.gameState.cashier.display = false

                 $('#maxRadio').prop('checked', false)
          $('#autoRebuyRadio').prop('checked', false)
          $('#otherAmountRadio').prop('checked', false)
          
          $("#otherAmount").val('')
           $('#autoRebuyAmount').val('')
           $('#maxAmount').val('')
           //hide cashier children
     stagesToUpdate.push(      self.hideChildren(self.images.cashier, hideOrDisplayChildrenOptions))

     if(update !== false){self.updateStages(stagesToUpdate)}
      else{return stagesToUpdate}

    }

    this.hideMessageBox = function(hideOrDisplayChildrenOptions){
      if(!hideOrDisplayChildrenOptions){var hideOrDisplayChildrenOptions = {}}
        var update = hideOrDisplayChildrenOptions.update
        hideOrDisplayChildrenOptions.update = false

        var stagesToUpdate = []



var messageBoxStageNumber = self.images.messageBox[self.gameState.messageBox.messageBoxImageContainerIndex].window.position.z.stage



console.log(self.gameState.messageBox.messageBoxImageContainerIndex)
        
        if(self.gameState.messageBox.messageBoxImageContainerIndex === self.gameState.zPositionData.initialMessageBox.container){     

        if(self.gameState.cashier.display === true){
            this.jQueryObjects.cashierForm.css('display','inline')
        }

        //enable tableChatBox if necessary
      else  if(self.gameState.tableChatBox.display == true){ self.enableTableChatBox()}

        }

//console.log(self.images.messageBox[self.gameState.messageBox.messageBoxImageContainerIndex])

stagesToUpdate.push(      self.hideChildren(self.images.messageBox[self.gameState.messageBox.messageBoxImageContainerIndex], hideOrDisplayChildrenOptions))

      //if  bottom message box
if(self.gameState.messageBox.messageBoxImageContainerIndex === self.gameState.zPositionData.initialMessageBox.container){     
      
//restore previous onclick events
self.restoreActiveStages(   self.gameState.messageBox.activeStages[self.gameState.messageBox.messageBoxImageContainerIndex])

//hide messageBoxCanvas
$(self.arrayOfParentsOfStageAndOfContainerArray[ messageBoxStageNumber].stage.canvas).css('display','none')}

//store new active message box container variable
        self.gameState.messageBox.messageBoxImageContainerIndex = self.gameState.messageBox.messageBoxImageContainerIndex - self.gameState.zPositionData.containersPerMessageBox
   
if(update !== false){this.updateStages(stagesToUpdate)}
      else{return stagesToUpdate}


    }


    this.displayMessageBox = function(messageString, messageInfo, hideOrDisplayChildrenOptions){
      if(!hideOrDisplayChildrenOptions){var hideOrDisplayChildrenOptions = {}}
        var update = hideOrDisplayChildrenOptions.update
        hideOrDisplayChildrenOptions.update = false

        var stagesToUpdate = []

      var messageBoxStageNumber = this.images.messageBox[0].window.position.z.stage
       var messageBoxImageContainerIndex = this.images.messageBox[0].window.position.z.container
var initialContainer = messageBoxImageContainerIndex
var incrementOfContainersPerMessageBox = this.gameState.zPositionData.containersPerMessageBox

          for(var i= initialContainer;i<this.arrayOfParentsOfStageAndOfContainerArray[messageBoxStageNumber].containers.length-incrementOfContainersPerMessageBox;i++){
           if(this.arrayOfParentsOfStageAndOfContainerArray[messageBoxStageNumber].containers[i] && this.arrayOfParentsOfStageAndOfContainerArray[messageBoxStageNumber].containers[i].isVisible() == false){
                messageBoxImageContainerIndex = i
                i=this.arrayOfParentsOfStageAndOfContainerArray[messageBoxStageNumber].containers.length
           }
        }
console.log(messageBoxImageContainerIndex)


/*
        //check if this is the first(bottom) messagebox displayed
        if(messageBoxImageContainerIndex == this.gameState.zPositionData.initialMessageBox){
       //hide html cashier(if visible)
       if( $('#maxRadio').is(':visible')){
          
       self.gameState.cashier.display = true
       this.jQueryObjects.cashierForm.css('display', 'none')
       }
       else{self.gameState.cashier.display = false}
       
       //check if tableChatBox is readonly
      if(self.jQueryObjects.chatBoxInput.attr("readonly") == true){}
      else{
       this.gameState.tableChatBox.display = true
       this.disableTableChatBox()
       }
       }
*/

       //set current messageBox as top messageBoxImagContainerIndex
        self.gameState.messageBox.messageBoxImageContainerIndex = messageBoxImageContainerIndex

        //store active containers for retreival later
        self.gameState.messageBox.activeStages[messageBoxImageContainerIndex] = self.storeActiveStages()
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

        var htmlCanvas = this.arrayOfParentsOfStageAndOfContainerArray[messageBoxStageNumber].stage.canvas
        var stageWidth = htmlCanvas.width
        var stageHeight = htmlCanvas.height
        var messageBoxWindowX = Math.floor(stageWidth/2 - messageBoxWindowWidth/2)
        var messageBoxWindowY = Math.floor(stageHeight/2 - messageBoxWindowHeight/2)
        

        var innerMessageBoxX = messageBoxWindowX+outerSideWidth
        var innerMessageBoxY = messageBoxWindowY+outerTopHeight
        var innerMessageBoxWidth = messageBoxWindowWidth-2*outerSideWidth 
        var innerMessageBoxHeight = messageBoxWindowHeight-outerBottomHeight-outerTopHeight

        var textHeight = 30
        var textLeftOffset = 7
        var textTopOffset = 10
        var textX = innerMessageBoxX + textLeftOffset

//button width is defined in default
        var defaultMinimumButtonWidth = 50
        
        var buttonHeight = 22
        var defaultRatioOfTextWidthToButtonWidth = 0.9 //this is default, this may change

        var defaultDistanceBetweenButtons = 30
        var buttonButtomOffset = 15 //distance from end of gray area to bottom of button
        var buttonY = messageBoxWindowY + messageBoxWindowHeight - outerBottomHeight - buttonButtomOffset - buttonHeight

var backgroundContainer = 0
var textContainer = 1
var buttonContainer = 2

         //-------------------set defaults---------------------------
         if(_.isNull(messageInfo)||_.isUndefined(messageInfo)){messageInfo = {}}
         //set default font sizes and colors
       if(_.isNull(messageInfo.title)||_.isUndefined(messageInfo.title)||!(_.isString(messageInfo.title)||!_.isNumber(messageInfo.title))){messageInfo.title = ''}
       if(_.isNull(messageInfo.titleSizeAndFont)||_.isUndefined(messageInfo.titleSizeAndFont)){messageInfo.titleSizeAndFont = '18px Arial'}
       if(_.isNull(messageInfo.titleColor)||_.isUndefined(messageInfo.titleColor)){ messageInfo.titleColor = '#000000'}
       if(_.isNull(messageInfo.sizeAndFont)||_.isUndefined(messageInfo.sizeAndFont)){messageInfo.messageSizeAndFont = '13px Arial'}
    if(_.isNull(messageInfo.messageColor)||_.isUndefined(messageInfo.messageColor)){ messageInfo.messageColor = '#000000'}
    if(_.isNull(messageInfo.buttonSizeAndFont)||_.isUndefined(messageInfo.buttonSizeAndFont)){messageInfo.buttonSizeAndFont = '13px Arial'}
     if(_.isNull(messageInfo.buttonTextColor)||_.isUndefined(messageInfo.buttonTextColor)){ messageInfo.buttonTextColor = '#FFFFFF'}
    if(_.isNull(messageInfo.buttonBackgroundColor)||_.isUndefined(messageInfo.buttonBackgroundColor)){ messageInfo.buttonBackgroundColor = '#0000FF'}
    if(_.isNull(messageInfo.okayText)||_.isUndefined(messageInfo.okayText)){ messageInfo.okayText = 'OK'}
    if(_.isNull(messageInfo.cancelText)||_.isUndefined(messageInfo.cancelText)){ messageInfo.cancelText = 'Cancel'}

      //set default button size
    if(!_.isNumber(messageInfo.ratioOfTextWidthToButtonWidth)){messageInfo.ratioOfTextWidthToButtonWidth = defaultRatioOfTextWidthToButtonWidth }    
if(!_.isNumber(messageInfo.minimumButtonWidth)){messageInfo.minimumButtonWidth = defaultMinimumButtonWidth }    

if(_.isNull(messageInfo.sameSizeButtons)||_.isUndefined(messageInfo.sameSizeButtons)){ messageInfo.sameSizeButtons = true}


    if(!_.isNumber(messageInfo.okayWidth)){
      //divide text width by ratio to get button width
      console.log('calculating width of okay /cancel buttons')
      console.log(messageInfo.okayText)
      
      messageInfo.okayWidth = this.getStringWidth(messageInfo.okayText, messageInfo.buttonSizeAndFont)/messageInfo.ratioOfTextWidthToButtonWidth}
if(messageInfo.okayWidth<messageInfo.minimumButtonWidth){messageInfo.okayWidth = messageInfo.minimumButtonWidth}
      if(!_.isNumber(messageInfo.cancelWidth)){
      //divide text width by ratio to get button width
      messageInfo.cancelWidth = this.getStringWidth(messageInfo.cancelText, messageInfo.buttonSizeAndFont)/messageInfo.ratioOfTextWidthToButtonWidth}
if(messageInfo.cancelWidth<messageInfo.minimumButtonWidth){messageInfo.cancelWidth = messageInfo.minimumButtonWidth}
 
//if same size buttons are true, then we want to use the biggest button size
if(messageInfo.sameSizeButtons === true){

  if( messageInfo.cancelWidth<messageInfo.okayWidth){ messageInfo.cancelWidth =  messageInfo.okayWidth}
    else{ messageInfo.okayWidth =  messageInfo.cancelWidth}
}
//define distance between buttons
  if(!_.isNumber(messageInfo.distanceBetweenButtons)){messageInfo.distanceBetweenButtons = defaultDistanceBetweenButtons }    

       //set button locations
    if(messageInfo.cancel !== true){
        var okayX = stageWidth/2 - messageInfo.okayWidth/2
        }
        else{
     var okayX =    stageWidth/2 - messageInfo.distanceBetweenButtons/2 - messageInfo.okayWidth    
     var cancelX =  stageWidth/2 + messageInfo.distanceBetweenButtons/2 
        }
  
        //background bitmap and closeX image are in the this.setDefaults() function
        //set proper x, y, width, and height of background and closeX image

        self.images.messageBox[messageBoxImageContainerIndex].window.position.x = messageBoxWindowX
        self.images.messageBox[messageBoxImageContainerIndex].window.position.y = messageBoxWindowY
        self.images.messageBox[messageBoxImageContainerIndex].window.size.x = messageBoxWindowWidth
        self.images.messageBox[messageBoxImageContainerIndex].window.size.y = messageBoxWindowHeight
   self.positionItemImage(     self.images.messageBox[messageBoxImageContainerIndex].window, {update:false})
        

    //add closeX Image
            var closeX =messageBoxWindowX+messageBoxWindowWidth- closeXRightOffset- closeXWidth
        var closeY =  messageBoxWindowY+ closeXTopOffset 
    self.images.messageBox[messageBoxImageContainerIndex].closeWindow.position.x = closeX
      self.images.messageBox[messageBoxImageContainerIndex].closeWindow.position.y = closeY
        self.images.messageBox[messageBoxImageContainerIndex].closeWindow.size.x = closeXWidth
        self.images.messageBox[messageBoxImageContainerIndex].closeWindow.size.y = closeXHeight
        self.positionItemImage(    self.images.messageBox[messageBoxImageContainerIndex].closeWindow, {update:false})

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
        self.images.messageBox[messageBoxImageContainerIndex].windowTitle = new self.images.Item (messageBoxWindowX,messageBoxWindowY, messageBoxWindowWidth,outerTopHeight,{stage:messageBoxStageNumber,container:messageBoxImageContainerIndex+textContainer})
         self.images.addItemText(self.images.messageBox[messageBoxImageContainerIndex].windowTitle, messageInfo.title, messageInfo.titleSizeAndFont, messageInfo.titleColor)

         //message
        self.images.messageBox[messageBoxImageContainerIndex].message = new self.images.Item (textX,innerMessageBoxY+textTopOffset, innerMessageBoxWidth -textLeftOffset*2 ,textHeight,{stage:messageBoxStageNumber,container:messageBoxImageContainerIndex+textContainer})
        self.images.addItemText(self.images.messageBox[messageBoxImageContainerIndex].message, messageString, messageInfo.messageSizeAndFont, messageInfo.messageColor)
        self.images.messageBox[messageBoxImageContainerIndex].message.text.lineWidth = self.images.messageBox[messageBoxImageContainerIndex].message.size.x*.9
 self.images.messageBox[messageBoxImageContainerIndex].message.text.maxWidth = null

   //OK button
        self.images.messageBox[messageBoxImageContainerIndex].okay =  new self.images.Item (okayX,buttonY, messageInfo.okayWidth,buttonHeight,{stage:messageBoxStageNumber, container: messageBoxImageContainerIndex+buttonContainer}) 
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
        self.images.messageBox[messageBoxImageContainerIndex].cancel =  new self.images.Item (cancelX,buttonY, messageInfo.cancelWidth,buttonHeight,{stage:messageBoxStageNumber, container: messageBoxImageContainerIndex+buttonContainer}) 
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
            self.arrayOfParentsOfStageAndOfContainerArray[messageBoxStageNumber].containers[i].mouseEnabled = false
        }

           stagesToUpdate.push(   self.displayChildren(self.images.messageBox[messageBoxImageContainerIndex], hideOrDisplayChildrenOptions))


//display messageBoxCanvas
$(this.arrayOfParentsOfStageAndOfContainerArray[ messageBoxStageNumber].stage.canvas).css('display','inline')

if(update !== false){this.updateStages(stagesToUpdate)}
      else{return stagesToUpdate}

    }


    this.displayCashier = function(info, hideOrDisplayChildrenOptions){
    if(!hideOrDisplayChildrenOptions){var hideOrDisplayChildrenOptions = {}}
        var update = hideOrDisplayChildrenOptions.update
        hideOrDisplayChildrenOptions.update = false

        var stagesToUpdate = []

      var cashierImageContainerIndex = this.images.cashier.window.position.z.container

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



self.gameState.cashier.activeStages = this.storeActiveStages()
var cashierStageNumber = this.images.cashier.window.position.z.stage

        for(var i = 0; i<cashierStageNumber;i++){
            this.arrayOfParentsOfStageAndOfContainerArray[i].mouseEnabled = false
        }

        console.log(this.images.cashier)
           stagesToUpdate.push(     this.displayChildren(this.images.cashier, hideOrDisplayChildrenOptions) )

//display cashierCanvas
$(this.arrayOfParentsOfStageAndOfContainerArray[ this.images.cashier.window.position.z.stage].stage.canvas).css('display','inline')

if(update !== false){this.updateStages(stagesToUpdate)}
  else{return stagesToUpdate}


}



this.storeActiveStages = function(){
  
   var activeStages = []
    for (var i = 0; i<this.arrayOfParentsOfStageAndOfContainerArray.length;i++){
        
        if(this.arrayOfParentsOfStageAndOfContainerArray[i].stage.mouseEnabled == true){
            activeStages.push(i)

        }
       
    }
    return activeStages}

this.restoreActiveStages=function(activeStageArray){

//disable mouse events for all stages
    for(var i = 0;i<this.arrayOfParentsOfStageAndOfContainerArray.length;i++){
        this.arrayOfParentsOfStageAndOfContainerArray[i].stage.mouseEnabled = false
    }

    //activate mouse events for active stages
    for(var i = 0;i<activeStageArray.length;i++){
        this.arrayOfParentsOfStageAndOfContainerArray[activeStageArray[i]].stage.mouseEnabled = true
    }
}
    
this.streetEnds = function(potSizes){


        //unbind scroll wheel events
         $(this.arrayOfParentsOfStageAndOfContainerArray[this.images.betSlider.vertical.position.z.stage].stage.canvas).unbind('mousewheel')
$('#betSizeDiv').unbind('mousewheel')
      var animationTime = 200
        var ticks = 6
        var chipIntoPotAnimationArray = []
var callBackNumber = 0

var chipMoveSound = createjs.Sound.createInstance(this.images.sources.moveChipsSound)

        //push animateImages into an array
        _.each(_.range(self.images.seats.length), function(seatNumber) {
if(self.images.seats[seatNumber].chips.length>0){ 
  console.log('playernumber:'+seatNumber+'size:'+self.images.seats[seatNumber].chips.length)
}
if(self.images.pots[seatNumber] && self.images.pots[seatNumber].chips && self.images.pots[seatNumber].chips.length>0){ 
  console.log('potnumber:'+seatNumber+'size:'+self.images.pots[seatNumber].chips.length)
}
            if(self.images.seats[seatNumber].chips && _.isArray( self.images.seats[seatNumber].chips) && self.images.seats[seatNumber].chips.length>=1  && self.images.seats[seatNumber].chips[0].image && self.arrayOfParentsOfStageAndOfContainerArray[self.images.seats[seatNumber].chips[0].position.z.stage].stage.contains(self.images.seats[seatNumber].chips[0].image) )
            {
                console.log('preparing animation')
                
                var animationDistanceX = self.images.pots[0].firstChip.position.x -  self.images.seats[seatNumber].firstChip.position.x
                var animationDistanceY = self.images.pots[0].firstChip.position.y  - self.images.seats[seatNumber].firstChip.position.y

                 _.each(_.range(self.images.seats[seatNumber].chips.length), function(n)
                 {
/*
if(n == 0){var endOfAnimationFunction = function(){
console.log('calling callback function of first chip in the array of player '+seatNumber)
  }}
  else{var endOfAnimationFunction = function(){}}
*/
chipIntoPotAnimationArray.push(function(callback){

  self.hideText(self.images.seats[seatNumber].bet)
      self.animateImage(self.images.seats[seatNumber].chips[n].position.x, self.images.seats[seatNumber].chips[n].position.y, animationTime, ticks, self.images.seats[seatNumber].chips[n], self.images.seats[seatNumber].chips[n].position.x + animationDistanceX, self.images.seats[seatNumber].chips[n].position.y+ animationDistanceY, function(){console.log('completed animation of player'+seatNumber+' chipstack and chip number '+n);callback(null, callBackNumber)})

                })    //push function into chipIntoPotAnimationArray
                callBackNumber++      
                })//end iteration through each chip in the chipstack
                }//make sure player has bet images in front of him
                })//iterate through each seat
 

async.series([
function(next){
  if(chipIntoPotAnimationArray.length>0){chipMoveSound.play()}
    async.parallel(chipIntoPotAnimationArray, function(err, results){
      console.log(results)
if(results.length = callBackNumber){
console.log('parallel all chips from players moving into pot completed')
      next(null, 1)}
      else{console.log('error of chipintopot parellel animation is equal to');console.log(err)}

    })
},

function(next){
  
  //update pot sizes and remove bets
   self.hideAllBets({update:false}) 

    self.updatePotSize(potSizes)
    /*
for(var i = 0;i<self.images.seats.length;i++){
  if(self.images.seats[i].chips.length>0){ 
  console.log('playernumber:'+i+'size:'+self.images.seats[i].chips.length)
}
console.log(self.images.pots)
if(self.images.pots[i] && self.images.pots[i].chips && self.images.pots[i].chips.length>0){ 
  console.log('potnumber:'+i+'size:'+self.images.pots[i].chips.length)
}
}
*/
    //play second sound if chips need to be split into side pots
    if(potSizes.length>1){chipMoveSound.play() }
 
      next(null, 2)
}
  ])
}



this.updateUserOptionsBasedOnFlagsAndPreactions = function(options){
if(!options){var options = {}}
  var update = options.update
options.update = false
var stagesToUpdate = [] 

if(!_.isNumber(self.gameState.userSeatNumber)){

stagesToUpdate.push( this.hideSeatedOptions() )

  return 'display updated based on non seated player'}

else{//if player is seated

//enable basic seatedoptions
   this.images.getChips.image.onClick = self.events.onButtonClick
     this.images.standUp.image.onClick = self.events.onButtonClick
  stagesToUpdate.push(        this.hideChildren(this.images.getChipsDisabledShape,options) )
stagesToUpdate.push(  this.hideChildren(this.images.standUpDisabledShape,options))


//var userSeatIndex = this.getSeatImageIndex(self.gameState.userSeatNumber, 'rotatedSeatNumber')


var user = self.gameState.seats[self.gameState.userSeatNumber]
var flags = self.gameState.seats[self.gameState.userSeatNumber].flags
var preActionStreet = self.gameState.seats[self.gameState.userSeatNumber].preActions.street
var preActionHand = self.gameState.seats[self.gameState.userSeatNumber].preActions.hand
var preActionOnce = self.gameState.seats[self.gameState.userSeatNumber].preActions.once

             //display sitout next hand depending on user's flag
              if(flags.pending_sit_out == true){
stagesToUpdate.push( self.hideChildren(self.images.sitOutNextBlind,options))
stagesToUpdate.push( self.hideChildren(self.images.sitOutNextBlindOn,options))
stagesToUpdate.push( self.hideChildren(self.images.sitOutNextHand,options))
        stagesToUpdate.push(        self.displayChildren(self.images.sitOutNextHandOn,options))
              }
             else if (self.gameState.seats[self.gameState.userSeatNumber].sitting_out != true){
          stagesToUpdate.push(     self.hideChildren(self.images.sitOutNextHandOn,options))
          stagesToUpdate.push(     self.displayChildren(self.images.sitOutNextHand,options))
            }

                  //check if user is sitting out
                  if(user.sitting_out == true){
        stagesToUpdate.push(             self.hideChildren(self.images.sitOutNextBlind,options))
stagesToUpdate.push( self.hideChildren(self.images.sitOutNextBlindOn,options))
stagesToUpdate.push( self.hideChildren(self.images.foldToAnyBet,options))
stagesToUpdate.push( self.hideChildren(self.images.foldToAnyBetOn,options))
              stagesToUpdate.push(       this.playerSitsOut(self.gameState.userSeatNumber,options))
              stagesToUpdate.push(       self.hideChildren(self.images.sitOutNextHand,options))
              stagesToUpdate.push(        self.displayChildren(self.images.sitOutNextHandOn,options))
                       //either display rebuy OR sitin if user is sitting out
             if(user.notEnoughChips == true){
        stagesToUpdate.push(       self.hideChildren(self.images.sitIn,options))
        stagesToUpdate.push(       self.displayChildren(self.images.rebuy,options))
}
                 else{ 
       stagesToUpdate.push(            self.hideChildren(self.images.rebuy,options))
        stagesToUpdate.push(           self.displayChildren(self.images.sitIn,options))
                }
}//user.sitting_out == true

         //if user is not sitting out
         else{
    stagesToUpdate.push(       self.hideChildren(self.images.sitIn,options))
     stagesToUpdate.push(      self.hideChildren(self.images.rebuy,options))
                            //display sit out next big blind depending on user's flag
              if(flags.post_blind == false){
stagesToUpdate.push( self.hideChildren(self.images.sitOutNextBlind,options))
       stagesToUpdate.push(          self.displayChildren(self.images.sitOutNextBlindOn,options))
              }
                    else{
                  stagesToUpdate.push(     self.hideChildren(self.images.sitOutNextBlindOn,options))
                 stagesToUpdate.push(      self.displayChildren(self.images.sitOutNextBlind,options))
                    }
  //check if user is holding cards to display fold toAnyBet
             if(this.arrayOfParentsOfStageAndOfContainerArray[self.images.seats[self.gameState.userSeatNumber].shownCard0.position.z.stage].stage.contains(self.images.seats[self.gameState.userSeatNumber].shownCard0.image)){
                        //fold to any bet button on or off
                        if(preActionHand.check == true && preActionHand.fold == true){
stagesToUpdate.push( self.hideChildren(self.images.foldToAnyBet,options))
                    stagesToUpdate.push(       self.displayChildren(self.images.foldToAnyBetOn,options))
                        }
             else{ 
          stagesToUpdate.push(     self.hideChildren(self.images.foldToAnyBetOn,options))
          stagesToUpdate.push(     self.displayChildren(self.images.foldToAnyBet,options))
            }
         }//end check if user is holding cards

} //end check if useris not sitting out

}//if seated players

//console.log('updateUserOptionsBasedOnFlagsAndPreactions stages to update: ')
//console.log(stagesToUpdate)

if(update === false){return stagesToUpdate}
  else{this.updateStages(stagesToUpdate)}
}

this.getPermanentPreferences = function() {

//var permanentPreferences = $.getJSON('/preferences/1')

$.getJSON('/preferences/1', function(response) { 

  console.log(response); 
  if(_.isObject(response)){
self.updatePreference(self.permanentPreferences, response.permanentPreferences)
}
});
// response.data will probably be the preferences Object

//console.log(permanentPreferences)
//console.log('permanet')

//console.log($('#server_values')[0].dataset)
//console.log($('#server_values').data('table_1'))
$//('#server_values')[0].dataset.table_state_url
//.data('x').. I forget the specifics, 
//but take a look at #server_values, and if it has data-table_name, then replace "x" with "table_name".

//return permanentPreferences
}

this.saveSessionPreferences = function(){

    socket.emit('set_flag', 'sessionPreferences', this.sessionPreferences)

}

this.savePermanentPreferences = function(){

    socket.emit('set_preference', 'permanentpreferences', this.permanentPreferences)

}


this.initializeServerPreferenceObjects = function (currentPreferenceObject, createObjectFunction, options){
console.log('initializeserver peference called')
// socket.emit('set_flag','sessionPreferences',currentPreferenceObject)
return null


if(!options){var options = {}}

  if(!_.isNumber(options.maxDepth)){options.maxDepth = 3}
if (!_.isString(options.currentObjectString)){options.currentObjectString = ''}


 /* if(options && options.currentObjectString){var serverObjectString = options.currentObjectString +'.' serverObjectIndex}
socket.emit('set_preferences', options.currentObjectString)




$.getJSON('/preferences/TABLE_NAME')
You should be able to get the name of the table (e.g. table_1) from $('#server_values').data('x').. I forget the specifics, but take a look at #server_values, and if it has data-table_name, then replace "x" with "table_name".
You could also probably pull this from the URL.. let me know if you need more help
*/


if(options.maxDepth>=0){//check  to make suer we should continue looking

  _.each (currentPreferenceObject, function(element,index,list) {
    console.log(index)
//do nothing if new value is undefined
  if(_.isObject( currentPreferenceObject[index])){
    if(_.isUndefined(currentPreferenceObject[index].value) && _.isUndefined(currentPreferenceObject[index].updateValue)){

      if(options.currentObjectString.length === 0){
        console.log('0 length objectstring triggered')
        console.log('objectstring: '+options.currentObjectString+' index: '+index)
createObjectFunction(index, options)
self.initializeServerPreferenceObjects(currentPreferenceObject[index],createObjectFunction,{currentObjectString: index,maxDepth:options.maxDepth-1})

      }//if object string is empty

      else{//if we have an objeect string not empty
         console.log('non 0 length objectstring triggered')
        console.log('objectstring: '+options.currentObjectString+' index: '+index)
createObjectFunction(options.currentObjectString+'.'+index, options)
self.initializeServerPreferenceObjects(currentPreferenceObject[index],createObjectFunction,{currentObjectString: options.currentObjectString+'.'+index,maxDepth:options.maxDepth-1})
}// if object string is not equal to 0
}
}//if( currentPreferenceObject[index] is Object
})//iterate thorugh currentPreferenceObject
  }//check if we are at max depth



}

this.updatePreference = function(currentPreferenceObject, newPreferenceObject, options){

if(!options){var options = {}}

  if(!_.isNumber(options.maxDepth)){options.maxDepth = 4}
options.maxDepth--
if(options.maxDepth>=0){//check  to make suer we should continue looking

  _.each (newPreferenceObject, function(element,index,list) {
//do nothing if new value is undefined
  if(!_.isUndefined( newPreferenceObject[index] )){

    //check to make sure current preference object exists, create if it doesnt
if (!_.isObject(currentPreferenceObject[index])){currentPreferenceObject[index] = {}}

//check if newpreference[index]is object and .value is denied
 if( _.isObject(newPreferenceObject[index]) && !_.isUndefined(newPreferenceObject[index].value)){

  var newValue = newPreferenceObject[index].value
//console.log('newValue as '+index+'.value = '+ newValue)
}

    //check if index is value itself by virtue of not being an object
  else if (!_.isObject(newPreferenceObject[index])){
    var newValue = newPreferenceObject[index]
//console.log('newValue as non-object '+index+' = '+ newValue)
  }

//check to make sure new value exists, and that new value is differnent from old
if(!_.isUndefined(newValue) && newValue !== currentPreferenceObject[index].value){


  //check to make sure updateValue function exists
  if(_.isFunction(currentPreferenceObject[index].updateValue)){
        currentPreferenceObject[index].updateValue(newValue)
  }//if updateValue function exists

//if not we manually change value
else if (!_.isUndefined(newPreferenceObject[index].value)){currentPreferenceObject[index].value = newValue}

}//if new and current preference are not equal and if new preference exists

     //if neither updateValue nor value exist, we conclude this is another preference object and call this function again
else{self.updatePreference(currentPreferenceObject[index],newPreferenceObject[index], options )}

}//make sure newPreference[index] is not undefined
})//iterate through new preference object

}//check if we are at max depth or not
}


this.updateLocalGameDataBasedOnServerPlayerObject = function(player){
  if(player.is_you == true){self.gameState.userSeatNumber = player.seat}
    //updated local based on flags
if(_.isObject(player.flags)){
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

this.updateStages = function(stageNumberLeaveBlankForAll, options){

//=======================define private functions=================================
var getStageFamilyArray = function(stageNumber, options){
  var stageFamilyArray = []
var canvasID = self.arrayOfParentsOfStageAndOfContainerArray[stageNumber].stage.canvas.id
//determine which stages share the same canvas with specified stagenumber
for(var i  = 0;i<self.arrayOfParentsOfStageAndOfContainerArray.length;i++){
  if(self.arrayOfParentsOfStageAndOfContainerArray[i].stage.canvas.id === canvasID){stageFamilyArray.push(i)}
}
return stageFamilyArray
}//get stageFamilyArray function

var setStagesUpToDateValueFromArrayFalseByDefault = function(stages, options){
  if(!options){var options = {}}
    if(options.upToDate !== true && options.uptoDate !== false){options.upToDate = false}
if(_.isNumber(stages)){  self.arrayOfParentsOfStageAndOfContainerArray[stages].upToDate = options.upToDate}
  if(_.isArray(stages)){
    for(var i = 0;i<stages.length;i++){ self.arrayOfParentsOfStageAndOfContainerArray[stages[i]].upToDate = options.upToDate}
  }

}

var updateStagesFromArray = function(stageArray, options){

if(!options){var options = {}}
if(stageArray.length == 0){
  return
// console.log('no stages found to update'+ stageNumberLeaveBlankForAll)
}

var sortfunction = function(x, y){return (x - y) }//causes an array to be sorted numerically and ascending
//sort array to make sure we display objects in the right order of Z
stageArray.sort(sortfunction)
 // console.log(stageArray)

var canvasesCleared = []
var stagesUpdated = []
var currentCanvasID = null
for(var i  = 0;i<stageArray.length;i++){

  //check if new canvas, if it is clear it
 if( self.arrayOfParentsOfStageAndOfContainerArray[stageArray[i]].stage.canvas.id !== currentCanvasID && options.clear !== false){
  currentCanvasID = self.arrayOfParentsOfStageAndOfContainerArray[stageArray[i]].stage.canvas.id
  canvasesCleared.push(currentCanvasID)
  self.arrayOfParentsOfStageAndOfContainerArray[stageArray[i]].stage.clear()
  self.performance.numCanvasClears++
 
  setStagesUpToDateValueFromArrayFalseByDefault(getStageFamilyArray(stageArray[i]))
}//if new canvas

  //make sure stage is not upToDate
if(self.arrayOfParentsOfStageAndOfContainerArray[stageArray[i]].upToDate !== true || options.forceUpdate === true){
stagesUpdated.push(stageArray[i])
  self.arrayOfParentsOfStageAndOfContainerArray[stageArray[i]].stage.update()
  self.arrayOfParentsOfStageAndOfContainerArray[stageArray[i]].upToDate = true
}//check to make sure stage is NOT up to date

}//iterate through array

if(canvasesCleared.length + stagesUpdated.length >0 && self.performance.numCanvasClears %50 === 0){
var logString = 'canvases cleared: '+canvasesCleared.toString()+', total cleared: '+self.performance.numCanvasClears+ ', stages updated: '+stagesUpdated.toString()
 console.log(logString)
}

}//updateStagesFromArray function

//=============================START ACTION PART OF: updateStages FUNCTION==============================

if(!options){var options  = {}}

  if(_.isNumber(stageNumberLeaveBlankForAll)){ //if given number as parameter

  if(this.arrayOfParentsOfStageAndOfContainerArray[stageNumberLeaveBlankForAll].upToDate !== true || options.forceUpdate === true) {
    var stagesToUpdate = getStageFamilyArray(stageNumberLeaveBlankForAll)
    updateStagesFromArray(stagesToUpdate)

}//if stage is NOT uptodate and options.update !== true
  }//if a stage number is specified as a number
 

else if(_.isArray(stageNumberLeaveBlankForAll)){ // if passed parameter as ARRAY
if(stageNumberLeaveBlankForAll.length === 0){return 'updatestages passed 0 length array as parameter'}

//flatten array
stageNumberLeaveBlankForAll = _.flatten(stageNumberLeaveBlankForAll)

//remove any non number values from array
stageNumberLeaveBlankForAll = _.without(stageNumberLeaveBlankForAll ,null, undefined, false, true, {})
//remove repeats from the array
stageNumberLeaveBlankForAll = _.uniq(stageNumberLeaveBlankForAll)

var lengthOfArray = stageNumberLeaveBlankForAll.length
//iterate through array
for(var i = 0;i<lengthOfArray;i++){
  //here we get the family of stages for each member of the stage array, then concat + uniquize with our array
stageNumberLeaveBlankForAll.push (getStageFamilyArray(stageNumberLeaveBlankForAll[i]))
}//stageNumberLeaveBlankForAll iteration

//flatten array cuz its now nested
stageNumberLeaveBlankForAll = _.flatten(stageNumberLeaveBlankForAll)
//uniqize the rray
stageNumberLeaveBlankForAll = _.uniq(stageNumberLeaveBlankForAll)
//sorting the array wilbe done automatically in the updateStagesFromArray function

updateStagesFromArray(stageNumberLeaveBlankForAll)

}//if parameter is array

  else{//if we want to update All stages
console.log('updating all stages')
var allStages = []
for(var i = 0;i<this.arrayOfParentsOfStageAndOfContainerArray.length;i++){allStages.push(i)}
 updateStagesFromArray( allStages)
}//if no stage number specified

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
this.updateStages(this.images.imageLoading.title.position.z.stage)
function tick(event){
  
    //update loading images graphic evert 3 ticks
    if(numTicks%ticksPerAnimation == 0){
        
        self.images.imageLoading.title.text.text = self.images.imageLoading.title.text.text+ '.'
    }


       var updateLoadedSeats = function(){
           
           for(var i =0; i<table_state.max_players;i++){
               if(seatsLoaded[i] != true){
                var stageNumber = self.images.seats[i].seat.position.z.stage
                var container = self.images.seats[i].seat.position.z.container
               if(self.arrayOfParentsOfStageAndOfContainerArray[stageNumber].containers[container].contains(self.images.seats[i].seat.image) || self.arrayOfParentsOfStageAndOfContainerArray[stageNumber].containers[container].contains(self.images.seats[i].disabledSeat.image) || self.arrayOfParentsOfStageAndOfContainerArray[stageNumber].containers[container].contains(self.images.seats[i].openSeat.image))
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
      //  createjs.Ticker.setPaused(true)
                      createjs.Ticker.removeEventListener("tick", tick)
                      //remove all loadingContainers from the stage and remove all children from them
               var parentOfLoadingStage =       self.arrayOfParentsOfStageAndOfContainerArray[self.gameState.zPositionData.loadingBackground.stage]
               parentOfLoadingStage.stage.removeAllChildren()
               self.updateStages(self.gameState.zPositionData.loadingBackground.stage)
              // parentOfLoadingStage.stage.update()
              console.log('loading canvas now')
               $(parentOfLoadingStage.stage.canvas).css('display','none')
       }
       console.log('increasing tick')
       numTicks ++
}//end tick function

                 //display static items

    this.displayChildren(this.images.getChips)
                 this.displayChildren(this.images.table)
         this.displayChildren(this.images.showTableChatFull)
         this.displayChildren(this.images.standUp)
         this.displayChildren(this.images.exitTable)

//remove extra S
         this.images.currencyDisplay.text.text = '1 chip is equal to ' + table_state.currency_per_chip + ' ' + table_state.currency
if(table_state.currency_per_chip == 1 && table_state.currency.charAt(table_state.currency.length-1)=='s'||'S'){
  this.images.currencyDisplay.text.text = this.images.currencyDisplay.text.text.substring(0,this.images.currencyDisplay.text.text.length-1)
}


this.displayChildren(this.images.currencyDisplay)

        //remove extra seats
        this.setNumberOfSeats(table_state.max_players)

        //comunity cards
        this.displayAllCommunity(table_state.community)

//assign session and permanent preferencee if they exist
 for (var i = 0;i< table_state.seats.length;i++) {
if(table_state.seats[i].is_you == true){
  
  this.gameState.userSeatNumber = table_state.seats[i].seat 

  //grab session preferences
  if(table_state.seats[i].flags && _.isObject(table_state.seats[i].flags.sessionPreferences)){
          var sessionPreferences = table_state.seats[i].flags.sessionPreferences
this.updatePreference(this.sessionPreferences, sessionPreferences)
        }// if session preferences
          //grab permanent preferences
        if( _.isObject(table_state.seats[i].userPreferences)) {  
        var permanentPreferences = table_state.seats[i].userPreferences
this.updatePreference(this.permanentPreferences, permanentPreferences)
      } //if permanent preferences
      i = 9999
     
      this.initializeServerPreferenceObjects(this.sessionPreferences, function (serverString, options){  self.saveSessionPreferences( serverString, {})    })
  }//if seated player is user
 }
console.log(this.sessionPreferences)
                //display seats and assign userSeatNumber
         for (var i = 0;i< table_state.seats.length;i++) {
          self.playerSits(table_state.seats[i].seat, table_state.seats[i].username, table_state.seats[i].chips)
          //update local data
          self.updateLocalGameDataBasedOnServerPlayerObject(table_state.seats[i])
          //assign userSeatNumber if player is user
         if(table_state.seats[i].is_you == true){
         
         //store session_preferences for later parsing if there
         self.events.rotateSeatsIfNeededAndConfirm()
         console.log('calling display seated options')
 // this.updateUserOptionsBasedOnFlagsAndPreactions()
}//table_state.seats[i].is_you == true

else{ //if not user

if(table_state.seats[i].sitting_out == true){
self.playerSitsOut(table_state.seats[i].seat)
}//check if non-user is sitting out
}//perform if not user

}
if(!_.isNumber(this.gameState.userSeatNumber)){this.displayChildren(this.images.getChipsDisabledShape)}
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

//update user options
       

         //set game data
     self.gameState.bigBlind = table_state.big_blind
     self.gameState.minIncrement = table_state.min_increment
     self.gameState.cashier.currency = table_state.currency
     self.gameState.cashier.currency_per_chip =  table_state.currency_per_chip

//display buttons/table stuf
this.updateUserOptionsBasedOnFlagsAndPreactions()

//update message log for table chat popup

for(var i = 0;i<table_state.messages.length;i++){

this.gameState.tableChatFull.log.push(['dealer', table_state.messages[i]])
this.updateTableChatFullMessageTextFromCurrentOrAdditionalData(null, {update:true})
}




    }
    
  //---------------------SOCKET CODE------------------------
    this.receiveTableState = function(){
      console.log('receiveTableState called')
   socket.once('table_state', function(table_state){
             console.log('one time table_state message received')
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
//show hand number
    

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
    else{self.dealHoleCards(tableInfo.small_blind_seat,playerArray)}
    self.gameState.holeCards = null
})


//flag is set
       socket.on('flag_set', function(flag, value){
 console.log($('#server_values').data('table_state'))

 //var userSeatIndex = self.getSeatImageIndex(self.gameState.userSeatNumber, 'rotatedSeatNumber')
   
           switch (flag){

case 'pending_sit_out':
self.gameState.seats[self.gameState.userSeatNumber].flags.pending_sit_out = value

           break;

           case 'post_blind':
           self.gameState.seats[self.gameState.userSeatNumber].flags.post_blind = value

break;

case 'fold':
self.gameState.seats[self.gameState.userSeatNumber].preActions.hand.fold = value

break;

case 'check':
self.gameState.seats[self.gameState.userSeatNumber].preActions.hand.check = value

break;

default:
if(flag.indexOf('sessionPreferences') === 0){
  console.log('session preference flag received')
}
else{
console.log('display flags of player number '+self.gameState.userSeatNumber)
console.log((flag.indexOf('sessionPreferences') === 0))
console.log(self.gameState.seats[self.gameState.userSeatNumber].flags)

self.gameState.seats[self.gameState.userSeatNumber].flags[flag] = value
}//if not session preference

}
self.updateUserOptionsBasedOnFlagsAndPreactions()
     })


//hand dealt to user
       socket.on('hole_cards_dealt', function(hand){
         self.gameState.holeCards = hand
     })


//player acts
       socket.on('player_acts', function(player, action, pot){

        self.playerActs(player.seat, action, 2)
    //display updated potsize if necessary
        if(pot&&action!=='check'){self.updatePotSize(pot)}

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
         $(self.arrayOfParentsOfStageAndOfContainerArray[self.images.betSlider.vertical.position.z.stage].stage.canvas).unbind('mousewheel')
$('#betSizeDiv').unbind('mousewheel')
            }
})

//user to act 
 socket.on('act_prompt', function(actions, timeout){

self.playerToAct(self.gameState.userSeatNumber, timeout)
   //  self.startCountdown(self.gameState.userSeatNumber,Math.round(timeout/1000))

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

self.gameState.seats[seatNumber].timeToActInMS = time

})

//hands turned face up
 socket.on('hands_shown', function(players){


           for(var i =0;i<players.length;i++){
         self.hideHoleCards(players[i].seat)
        self.displayHoleCards(players[i].hand, players[i].seat)
        }
        

})

//dealer message
 socket.on('game_event', function(messageString, timeStampString){

//update tableChatFull popup
var chatObjectForInternalFunctionUse = {}
chatObjectForInternalFunctionUse.chatSourceType = 'dealer'
chatObjectForInternalFunctionUse.message = messageString
chatObjectForInternalFunctionUse.timeStampString = timeStampString
self.updateTableChatFullMessageTextFromCurrentOrAdditionalData(chatObjectForInternalFunctionUse)

})

//player to act (not the user)
 socket.on('player_to_act', function(player, timeout){
    var timeToCountDown = 3000

//if user = player, do not initiate to act function, as act_prompt will be sent instead
    if(player.seat != self.gameState.userSeatNumber){self.playerToAct(player.seat, timeout)}

/*
var delayedCountDown = function(){
if( self.gameState.seats[player.seat].toAct == true){self.startCountdown(player.seat, Math.round(timeToCountDown/1000))}
}
     //do a countdown when time is low for non-user players
     if(player.seat != self.gameState.userSeatNumber){
     createjs.Tween.get(self.images.seats[player.seat].countdown, {override:true, loop:false})
     .wait(timeout-timeToCountDown)
    .call(delayedCountDown)
     }
     */
})

//notification received
 socket.on('notification', function(notificationString){
  if(notificationString == "You will sit out as soon as the hand is over."){return null}
   var chatInfo  = {}
   chatInfo.seat = self.gameState.userSeatNumber
chatInfo.message = notificationString

  self.displayBubbleChat(chatInfo)

})


//player to act (not the user)
 socket.on('user_chats', function(chatInfo){

//remove all leading and trailing whitespace from message
  chatInfo.message = chatInfo.message.replace(/^\s+|\s+$/g,'')

if (/\S/.test(chatInfo.message)){//make sure chatInfo.message is not empty


if(_.isNull(chatInfo.seat)||_.isUndefined(chatInfo.seat)){ // if no seat, then observer chat
console.log('observer chatted')
//update tableChatFull popup
var chatObjectForInternalFunctionUse = {}
chatObjectForInternalFunctionUse.chatSourceType = 'observer'
chatObjectForInternalFunctionUse.message = chatInfo.sender+' (obs) says: '+chatInfo.message

self.updateTableChatFullMessageTextFromCurrentOrAdditionalData(chatObjectForInternalFunctionUse)
}

else{//if player (seated) chat
console.log('seated player chatted')
//update tableChatFull popup
var chatObjectForInternalFunctionUse = {}
chatObjectForInternalFunctionUse.chatSourceType = 'player'
chatObjectForInternalFunctionUse.message = chatInfo.sender+' says: '+chatInfo.message

self.updateTableChatFullMessageTextFromCurrentOrAdditionalData(chatObjectForInternalFunctionUse)


  self.displayBubbleChat(chatInfo)

}//if player chat
}//check to make sure chatInfo.message is NOT empty



})


//player sits in
       socket.on('player_sits_in', function(player){
           self.images.seats[player.seat].status.text.text = player.chips

        if(player.seat == self.gameState.userSeatNumber){
          self.updateLocalGameDataBasedOnServerPlayerObject(player) 
            self.updateUserOptionsBasedOnFlagsAndPreactions()
}
        self.updateStages(self.images.seats[player.seat].status.position.z.stage)
})

//player sits out
       socket.on('player_sits_out', function(player){
           self.images.seats[player.seat].status.text.text = 'Sitting Out'
   self.updateStages(self.images.seats[player.seat].status.position.z.stage)
        if(player.seat == self.gameState.userSeatNumber){
       self.updateLocalGameDataBasedOnServerPlayerObject(player) 
self.updateUserOptionsBasedOnFlagsAndPreactions()
}
       
})


//player sits, checks if player is the user
       socket.on('player_sits', function(player, is_you){
       
        if(is_you == true){
            self.gameState.userSeatNumber = player.seat

      self.events.rotateSeatsIfNeededAndConfirm()
            socket.emit('get_add_chips_info')
            self.updateUserOptionsBasedOnFlagsAndPreactions()
      //      self.displayChildren(self.images.stand, false, ['stand'])

     //   self.displayChildren(self.images.stand)

        for (var i = 0;i<self.gameState.numSeats;i++){
            self.displayCorrectSeatMessage(i) }
        }
  self.playerSits(player.seat, player.username, player.chips)


})

//player stands, checks if player is the user
       socket.on('player_stands', function(player, seatNumber, is_you){

        if(is_you){
            self.gameState.userSeatNumber = false
            self.hideSeatedOptions()
            self.changeUserSeatView()
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
var options = {}
options.update = false

var stagesToUpdate = []


           if(is_you == true){player.seat = self.gameState.userSeatNumber}
      if(player.sitting_out == true){  
        //this playerSitsOutfunction wil automatically make ure not to update if not necessary
        stagesToUpdate.push(self.playerSitsOut(player.seat, options))  
      }
           else if(player.chips>0){
            if(self.images.seats[player.seat].status.text.text+''!== player.chips+''){
                self.images.seats[player.seat].status.text.text = player.chips
                stagesToUpdate.push(self.images.seats[player.seat].status.position.z.stage)
              }
           }//if player out of chips


        if(is_you){
      stagesToUpdate.push(      self.hideCashier(options) )
            if(player.chips>0){stagesToUpdate.push( self.hideChildren(self.images.rebuy, options))
            if (player.sitting_out == true){stagesToUpdate.push(self.displayChildren(self.images.sitIn, options))}
            }
        }

        self.updateStages(stagesToUpdate)
 }  ) 




//round ends, all hole cards are shown
       socket.on('winners', function(players){

         self.winners(players)
   

})

//reset table
socket.on('reset_table', function(players){
var options = {}
options.update = false

var stagesToUpdate = []

     stagesToUpdate.push(    self.roundEnds() )
 for(var i = 0;i<self.images.seats.length;i++){
  self.gameState.seats[i].preActions.street = {}
   self.gameState.seats[i].preActions.hand = {}
stagesToUpdate.push(    self.hideChildren(self.images.seats[i].hiddenCard0,options))
 stagesToUpdate.push(  self.hideChildren(self.images.seats[i].hiddenCard1,options))
 stagesToUpdate.push(  self.hideChildren(self.images.seats[i].shownCard0,options))
 stagesToUpdate.push(  self.hideChildren(self.images.seats[i].shownCard1,options))
}
stagesToUpdate.push(self.hideChildren(self.images.community,options))
stagesToUpdate.push( self.updateUserOptionsBasedOnFlagsAndPreactions(options))

self.updateStages(stagesToUpdate)
})
    }

   }

    //---------------END SOCKET CODE----------------------------

jQuery(document).ready(function(){

})


jQuery(window).load(function (){
  console.log('window load function claled')
  /*
self.jQueryObjects.tableChatFullDiv.mCustomScrollbar('destroy')
self.jQueryObjects.tableChatFullDiv.mCustomScrollbar()
*/
 //   holdemCanvas.createAllItems()

 console.log($('#server_values').data('table_state'))
    holdemCanvas = new Table()
    holdemCanvas.updatePreference(holdemCanvas.permanentPreferences, holdemCanvas.getPermanentPreferences())

   holdemCanvas.initialize()

      console.log(document)
console.log(holdemCanvas.images.seats)
    })
 
    
