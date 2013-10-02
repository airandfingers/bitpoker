 //  $("#chat_table").css('display','none')
//   $("#chat_table").css('top','1000px')
     /* function onKeyDown(event) {
event.preventDefault() } 

window.onKeydown = onKeyDown
*/


   
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

  //============PREFERENCES================
this.sessionPreferences = {



displaySize:{value:'desktop', updateValue:function(newValue){
 // console.log(self.permanentPreferences.sourceObjects.value)
this.value = newValue
            if(self.sessionPreferences.displaySize == 'mobile'){
              if(!_.isObject(self.permanentPreferences.sourceObjects.value.mobileCards)){self.permanentPreferences.sourceObjects.value.mobileCards = {}}
              self.images.sources.cardImageFolder = self.images.sources.mobileCardFolder
self.permanentPreferences.sourceObjects.value.cardObjectParent = self.permanentPreferences.sourceObjects.value.mobileCards
            }
            else {
              if(!_.isObject(self.permanentPreferences.sourceObjects.value.desktopCards)){self.permanentPreferences.sourceObjects.value.desktopCards = {}}
              self.images.sources.cardImageFolder = self.images.sources.desktopCardFolder
self.permanentPreferences.sourceObjects.value.cardObjectParent = self.permanentPreferences.sourceObjects.value.desktopCards
            }
//redraw table//update card sizes here
}//change value function
},
      changeUserSeatViewTo:{value:false, updateValue: function(newValue){
this.value  = newValue

if(self.gameState.itemsCreated === true){
self.changeUserSeatView(this.value)}
        } 
      },

tableChatFull:{
      tableChatFullScrollBarPositionTrueForBottomOrUpperInvisiblePixels:{value: true, updateValue:function(newValue){
this.value = newValue
if(self.gameState.itemsCreated === true){
var movementObject = {}
movementObject.magnitude = newValue
self.moveTableChatFullMessageText(movementObject)
}
}//updateValue function
},//tableChatFullScrollBarPositionTrueForBottomOrUpperInvisiblePixels
        defaultItemsToHideFalseHidesItem:{
                  hideDealerMessages:{value:true, updateValue: function(newValue, options){
this.value = newValue
if(self.gameState.itemsCreated === true){
self.updateTableChatFullDisplay(options)}
                  }//hideDealerMessages.updateValue function
                },//hideDealerMessages
                  hideDealerMessagesOn: {value:false, updateValue: function(newValue, options){
this.value = newValue
if(self.gameState.itemsCreated === true){
self.updateTableChatFullDisplay(options)}
                  }//hideDealerMessagesOn.updateValue function
                },//hideDealerMessagesOn
                  hidePlayerMessages:{value:true, updateValue: function(newValue, options){
this.value = newValue
if(self.gameState.itemsCreated === true){
self.updateTableChatFullDisplay(options)}
                  }//hidePlayerMessages.updateValue function
                },//hidePlayerMessages
                  hidePlayerMessagesOn: {value:false, updateValue: function(newValue, options){
this.value = newValue
if(self.gameState.itemsCreated === true){
self.updateTableChatFullDisplay(options)}
                  }//hidePlayerMessagesOn.updateValue function
                },//hidePlayerMessagesOn
                  hideObserverMessages:{value:true, updateValue: function(newValue, options){
this.value = newValue
if(self.gameState.itemsCreated === true){
self.updateTableChatFullDisplay(options)}
                  }//hideObserverMessages.updateValue function
                },//hideObserverMessages
                  hideObserverMessagesOn: {value:false, updateValue: function(newValue, options){
this.value = newValue
if(self.gameState.itemsCreated === true){
self.updateTableChatFullDisplay(options)}
                  }//hideObserverMessagesOn.updateValue function
                },//hideObserverMessagesOn
                  disableTouchScroll:{value:true, updateValue: function(newValue, options){
this.value = newValue
if(self.gameState.itemsCreated === true){
self.updateTableChatFullDisplay(options)}
                  }//disableTouchScroll.updateValue function
                },//disableTouchScroll
                  disableTouchScrollOn:{value:false, updateValue: function(newValue, options){
this.value = newValue
if(self.gameState.itemsCreated === true){
self.updateTableChatFullDisplay(options)}
                  }//disableTouchScrollOn.updateValue function
                }//disableTouchScrollOn

  }//default items to hide

}//table chat full

  }//session preferences declaration


  this.permanentPreferences = {

      confirmSeatRotation:{value:true},

defaultFontType :{value:'Lucida Sans'},

        sourceObjects:{value:parent.sourceObjects, updateValue:function(newValue){
var newerValue = newValue
if(!_.isObject(newValue)){
  console.log('permanent preferences creating new parent.sourceObjects = {}')
  if(!_.isObject(parent.sourceObjects)){parent.sourceObjects = {}}
var newerValue = parent.sourceObjects
}
  this.value = newerValue
        }//updateValue function
      },//sourceObjects

      bigBlindsPerHorizontalSliderTick :{value: 0.5},
      bigBlindsPerMouseScroll:{value: 0.5},
      timePerHorizontalSliderTick: {value:500},
      animate: {value:true},
      playerChatMaxLines:{value:3},


      chatTextColor: {value:'#FFFFFF',  updateValue: function(newValue){
this.value = newValue
if(self.gameState.itemsCreated === true){
var stagesToUpdate = []
        for(var i = 0 ;i<self.images.seats.length;i++){
stagesToUpdate.push ( self.itemChanged(self.images.seats[i].chat.text.color = this.value))}//iterate thorugh this.images.seats

self.updateStages(stagesToUpdate)
}//if items have been created
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
if(self.gameState.itemsCreated === true){
self.updateStages  (self.itemChanged (self.images.tableChatFull.window.alpha = this.value))
}
         }//windowAlpha.updateValue
      }

  }//permanent preferences . tableChatFull

}//permanent preferences


 

this.performance = {}
this.performance.numCanvasClears = 0

        this.gameState = {}

        this.gameState.itemsCreated = false
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

this.gameState.act = {}
 this.gameState.street = {}
    this.gameState.once = {}
        this.gameState.hand = {}

        this.gameState.seats = []

        for(var i = 0;i<this.gameState.numSeats;i++){
             this.gameState.seats[i]= {}
             this.gameState.seats[i].displayMessageType = 'openSeat'
             this.gameState.seats[i].toAct = false
               this.gameState.seats[i].inHand = false
               this.gameState.seats[i].act = {}
             this.gameState.seats[i].once = {}
            this.gameState.seats[i].street = {}
             this.gameState.seats[i].hand = {}
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
        var holeCardsAndButtons=staticItems+1
        var middleTableItemsAndAnimations=holeCardsAndButtons+1
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
            this.gameState.zPositionData.holeCards={stage:holeCardsAndButtons,container:0, newCanvas:true, numContainers:5,stageOptions:{
mouseEnabled : true,
enableDOMEvents : true,
touchEnabled:true,
mouseOverFrequency:30
//,disableContextMenu:true
}
}
            this.gameState.zPositionData.button={stage:holeCardsAndButtons,container:2}//button

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

this.images.sourceObjects = {}
this.images.sourceObjects.mobileCards = {}
this.images.sourceObjects.desktopCards = {}
this.images.sourceObjects.cardObjectParent = {}
          this.images.sources = {
       //     call: 'img/call.jpg',
       //     check: 'img/check.jpg',
       //     raise: 'img/raise.jpg',
            cardBackFileNameWithoutExtension: 'back',
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
chips:{
                red:'img/chips/red_chip.png',
                black: 'img/chips/black_chip.png',
                10: 'img/chips/10.png'
              },//chips
mobileCardFolder: 'img/fourcolordeck/resize/',
desktopCardFolder: 'img/fourcolordeck/'

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
        this.images.seats[i].hiddenCards = []
         this.images.seats[i].shownCards = []
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

 this.images.itemAsBitmap = function (item,source, options){
  //console.log(this.itemAsBitmap.caller)
if(!options){var options = {}}
  var stagesToUpdate = []

  if(_.isString(source)){
    var tempImage= new Image()
    tempImage.src = source
 item.image = new createjs.Bitmap(tempImage)
  }//if source is string

else if(_.isObject(source)){
 // console.log(source)
//if already an Image instance, just use it

//creating new createJS bitmap based on Image object
  item.image = new createjs.Bitmap(source)

  //update width and height of parent if necessary
 if(source.width > item.size.x){item.size.x = source.width}
  if(source.height > item.size.y){item.size.y = source.height}
}//if image source is an Image object

else{
console.log('itemAsBitmap passed non source paramater');console.log(source instanceof parent.window.Image);console.log(source);throw '';

}
  self.positionItemImage(   item, {update:false}) 

    item.image.parentOfImageObject = item
    item.bitmapSource = source
    if(item.messages){
        item.image.onClick = self.events.onButtonClick
    }
 stagesToUpdate.push(  self.itemChanged(item))
    if(options.update !== false){self.updateStages(stagesToUpdate)}
      else{return stagesToUpdate}

            }

            this.images.cardAsBitmap = function(item,card, options){
             /*   var cardImage = new Image()
                 
                 if(_.isString(cardText)){
         var imageSource = this.sources.cardImageFolder+cardText+'.png'}
         else{var imageSource = this.sources.cardImageFolder+cardBackFileNameWithoutExtension+'.png'}

*/
//console.log('calling card as bitmap')

if(!options){var options = {}}
  var stagesToUpdate = []

 if(self.sessionPreferences.displaySize.value !== 'mobile'){var sourceParent = self.permanentPreferences.sourceObjects.value.cardObjectParent   }
      else{var sourceParent = self.permanentPreferences.sourceObjects.value.cardObjectParent }

        if(card instanceof Image){var source = card}
 else if(_.isString(card)){
   
var source  = sourceParent[card]}
else{
  var source = sourceParent.cardBack
}
//console.log(source)
//console.log(sourceParent)
  //else{throw 'invalid parameter passed to create a card'}

    stagesToUpdate.push(  this.itemAsBitmap(item,source, options))

    if(options.update !== false){self.updateStages(stagesToUpdate)}
      else{return stagesToUpdate}
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
          if(parent.image instanceof createjs.Shape === false){
                   parent.image = new createjs.Shape()
              parent.image.parentOfImageObject = parent
          }


          if(options && options.outerStrokeWidth){var outerStrokeWidth = options.outerStrokeWidth}
            else{var outerStrokeWidth = 2}
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
 parent.image.graphics.setStrokeStyle(outerStrokeWidth,'round').beginStroke(borderColor)
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

            //for example: (parentOfImageObject, fold, "13px " + self.permanentPreferences.defaultFontType.value, "#100D08")
            this.images.addItemText = function(parentOfImageObject,text,sizeAndFont,color, options){
                if(!options){var options = {}}
                parentOfImageObject.text = new createjs.Text(text, sizeAndFont, color)

if(options.textAlign === 'left'){
parentOfImageObject.text.x=parentOfImageObject.position.x
parentOfImageObject.text.textAlign = options.textAlign

}//if left align
else{//center align by default
parentOfImageObject.text.x=parentOfImageObject.position.x + parentOfImageObject.size.x/2 
  parentOfImageObject.text.textAlign = 'center'
}//align center by default

parentOfImageObject.text.y=parentOfImageObject.position.y + 2
parentOfImageObject.text.baseline = 'top'

parentOfImageObject.text.maxWidth = parentOfImageObject.size.x*.9
parentOfImageObject.textColor = color

//assign option variables to text
_.each(options, function(value, index, list){
if(!_.isObject(value) && !_.isUndefined(value) && !_.isFunction(parentOfImageObject.text[index])){parentOfImageObject.text[index] = value}
})//iterate through options



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
  // console.log('button clicked')
        if(event.target.parentOfImageObject.messages)(socket.emit.apply(socket, event.target.parentOfImageObject.messages))
        if(event.target.parentOfImageObject.otherMessages){socket.emit.apply(socket, event.target.parentOfImageObject.otherMessages)}
    }
  
    this.events.foldToAnyBetClick = function(event){
        self.setPreactionData('hand', 'check', true)
         self.setPreactionData('hand', 'fold', true)
         self.updateUserOptionsBasedOnFlagsAndPreactions()
     //   socket.emit('set flag','fold',true)
      //  socket.emit('set flag','check',true)

    }

    this.events.foldToAnyBetOnClick = function (event){
      console.log('this.events.foldToAnyBetOnClick called')
                self.setPreactionData('hand', 'check', false)
         self.setPreactionData('hand', 'fold', false)
 self.updateUserOptionsBasedOnFlagsAndPreactions()
     //   socket.emit('set flag','fold',false)
     //   socket.emit('set flag','check',false)

    }

this.events.cashierTextFieldFocused = function(event){

//select the text when highlighted
           $(event.target).one('mouseup', function(e){e.preventDefault()}).select()
          

}


this.events.cashierInputSelected = function(event){

//console.log(event)
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
     //     console.log(textField)
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

this.events.mouseDownClickAndDrag = function(event, options){
 // if(event.type !== 'mousedown'){return}

//console.log('mousedownclick and drag called')
//console.log(event)

if(!options){var options = {}}
//var update = options.update
//options.update = false
//set defaults
  var defaultOptions = { }
  defaultOptions.permanent = false
if(event.target.parentOfImageObject instanceof self.images.Item){defaultOptions.animationTarget = event.target.parentOfImageObject}
_.defaults(options, defaultOptions)//assign defaults

var initialX = event.stageX;var initialY = event.stageY

event.onMouseMove = function(e){
 // console.log(e)
  var moveX = e.stageX - initialX; var moveY = e.stageY -initialY
   initialX = initialX + moveX; initialY = initialY + moveY

 self.setImageItemPositionAndTextBasedOnImageChange(options.animationTarget, moveX  ,moveY , options)
}


}



this.events.seatMouseEvent = function(event, options){

//  console.log('seatmouse event called')
  if(!options){var options = {}}
    var defaults = {}
  if(_.isObject(event.target.parentOfImageObject)&& _.isObject(event.target.parentOfImageObject.seatObjectAncestor)){
    defaults.seatObject =  event.target.parentOfImageObject.seatObjectAncestor
defaults.seatNum =  defaults.seatObject.nonRotatedSeatNumber
defaults.animationTime = 600
  }

options = _.defaults(options, defaults)


//console.log(event)
var animationTime = options.animationTime
var seatObject =  options.seatObject //event.target.parentOfImageObject.seatObjectAncestor
var seatNum =    options.seatNum   //seatObject.nonRotatedSeatNumber
var getHoleCardAnimationArray  = function(){return self.gameState.seats[seatNum].hand.holeCardsPopupAnimation} //this will be an array of hole cards
var animationBottomY = seatObject.seat.position.y
var animationTopY = seatObject.hiddenCards[0].position.y
var animationDistanceY = animationTopY - animationBottomY
if(animationDistanceY<0){animationDistanceY = animationDistanceY*-1}
  var animationSpeed  = animationDistanceY/animationTime
var seatBottomY = seatObject.seat.position.y + seatObject.seat.size.y

var displayedAnimationArray = false

var getAnimationDirection = function(){return self.gameState.seats[seatNum].hand.holeCardAnimationDirection}
var setAnimationDirection = function(direction){self.gameState.seats[seatNum].hand.holeCardAnimationDirection = direction}
var killCheckingFunction= function(){
  if(self.gameState.seats[seatNum].checkingForFoldedHoleCardAnimation){
//    console.log('clearing intterval')
  clearInterval( self.gameState.seats[seatNum].checkingForFoldedHoleCardAnimation )}
}
var getPreviousCheckingFunctionEvent = function(){
return  self.gameState.seats[seatNum].hand.checkingForFoldedHoleCardAnimationEvent 
}
var storeEvent = function(){
event.options = options
  self.gameState.seats[seatNum].hand.checkingForFoldedHoleCardAnimationEvent = event}

var setCorrectEventAndOptions = function(){
//  console.log('determinging which event to use')
//determine if we need to kill previous checking function
var useCurrentEvent = false
//check if mosue is over Seat
var previousEvent = getPreviousCheckingFunctionEvent()
//console.log(event)
//console.log(previousEvent)
if(!_.isObject(previousEvent)){return false}
var isSeatMouseEvent = event.target.id === seatObject.seat.image.id
//console.log('isSeatMouseEvent' + isSeatMouseEvent)
var isPreviousEventSeatMouseEvent = previousEvent.target.id === previousEvent.options.seatObject.seat.image.id
//console.log('isPreviousEventSeatMouseEvent' + isPreviousEventSeatMouseEvent)
var areBothEventsSameTarget = event.target.id === previousEvent.target.id
//console.log('areBothEventsSameTarget' + areBothEventsSameTarget)
var areBothEventsRelatedToTheSameSeat = seatNum === previousEvent.options.seatNum
//console.log('areBothEventsRelatedToTheSameSeat' + areBothEventsRelatedToTheSameSeat)


if(areBothEventsSameTarget === true 
  || event.type === previousEvent.type
|| areBothEventsRelatedToTheSameSeat === false
|| (event.type !== 'mouseover' && event.type !== 'mouseout')
||(previousEvent.type !== 'mouseover' && previousEvent.type !== 'mouseout')
||(isPreviousEventSeatMouseEvent === true && isSeatMouseEvent === true)
  ){useCurrentEvent = true}
else if(event.type === 'mouseover') {useCurrentEvent = true}
  else{useCurrentEvent = false}


if(useCurrentEvent === false){
//console.log('using previous event')
  event = previousEvent
  options = previousEvent.options

}
}

setCorrectEventAndOptions()
//console.log('using event:')
//console.log(event)

  storeEvent()
killCheckingFunction()
if(event.type === 'mouseover'){
  animateUp()
  keepChecking()//in case when player folds cursor is currently over
  }//if mouseover

  else if(event.type === 'mouseout'){
  animateDown()
  }//if mouseout

event.onMouseMove = function (event){
  console.log('onmousemove called')
animateUp()

}//event.onMouseMove

event.onMouseDown = function(event){

}//event.onMouseDown

       event.onMouseUp=function(event){
       }//event.onMouseUp

       event.onMouseOut = function(event){
console.log('mouseout')
       }// event.onMouseOut


function keepChecking(){
  killCheckingFunction()
  //store current event


var interval = 80

var isSeatMouseEvent = event.target.id === seatObject.seat.image.id

 self.gameState.seats[seatNum].checkingForFoldedHoleCardAnimation = setInterval(function(){
console.log('animation direction is: '+getAnimationDirection())
  //if animation is at top or round has been ended
if(getAnimationDirection() ===('bottom' || 'up' || 'down') ){killCheckingFunction()}
else{
console.log('checking to see if we should animate')
if(shouldAnimate() === true){//if we want to animate
  //check if target is card or seat
  if(isSeatMouseEvent === true){
      console.log('shouldanimate = true, eventtype is: '+event.type+' isseatmouseevent = '+isSeatMouseEvent)
    killCheckingFunction()
self.events.seatMouseEvent(event, options)
}

}

else{//if shouldAnimate() != true
  console.log('shouldAnimate = false, ending hole card popup animations')
  console.log('eventtype is: '+event.type+' isseatmouseevent = '+isSeatMouseEvent)
endAnimations()
//if event type is NOT mouseover of seat object, then we want to cancel the interval
if( (event.type !== 'mouseover') || (isSeatMouseEvent !== true) ){killCheckingFunction()}
}//if shouldAnimate() != true

}

}, interval);

}//keep checking function

/*
for(var i = 0;i< getHoleCardAnimationArray().length;i++){
getHoleCardAnimationArray()[i].image.addEventListener('tick', function(){
if(shouldAnimate() === false){endAnimations()}
}//tick function
)//addEventlistener
}
*/
       function animateUp(){
var animationInfoArray = []
//prepare animation information
if(getAnimationDirection() === 'top'){return false}
  if(getAnimationDirection() === 'up'){return false}
  if(!_.isArray(getHoleCardAnimationArray())){console.log('animateup stopped cuz no cards');return false}
      console.log('animating up '+ getAnimationDirection())
    setAnimationDirection('up')

  var holeCardAnimationArray = getHoleCardAnimationArray()
_.each(_.range(holeCardAnimationArray.length),function(cardNumber){

animationInfoArray[cardNumber] = { //animation info
item:holeCardAnimationArray[cardNumber],
finalY:animationTopY,
onTick:onAnimationTick,
animationTime:(holeCardAnimationArray[cardNumber].image.y - animationBottomY)/animationSpeed,
onEnd:function(){keepChecking();setAnimationDirection('top')},
onStart: function(animationInfo){
  displayedAnimationArray = holeCardAnimationArray
cropCardImages()
self.displayChildren(animationInfo.item)}
}//animationInfos
})//iterate thorugh animationInfoArray

//animate the images
_.each(_.range(holeCardAnimationArray.length),function(cardNumber){

self.animateImage(animationInfoArray[cardNumber])

})//iterate thorugh animationInfoArray


       }// function showFoldedCards

function animateDown(){

var animationInfoArray = []
if(getAnimationDirection() !== 'top' && getAnimationDirection() !== 'up'){return false}
  if(!_.isArray(getHoleCardAnimationArray())){return false}
  //prepare animation information
setAnimationDirection('down')
console.log('animating down')
  var holeCardAnimationArray = getHoleCardAnimationArray()
_.each(_.range(holeCardAnimationArray.length),function(cardNumber){

animationInfoArray[cardNumber] = { //animation info
item:holeCardAnimationArray[cardNumber],
finalY:animationBottomY,
onTick:onAnimationTick,
animationTime:(animationTopY - holeCardAnimationArray[cardNumber].image.y)/animationSpeed,
onEnd:function(animationInfo, imageTween, textTween){
  setAnimationDirection('bottom')
self.hideChildren(animationInfo.item)},
onStart: function(){
  displayedAnimationArray = holeCardAnimationArray
  cropCardImages()}//onStart function
}//animationInfo
})//iterate thorugh animationInfoArray


//animate the images
_.each(_.range(holeCardAnimationArray.length),function(cardNumber){

self.animateImage(animationInfoArray[cardNumber])

})//iterate thorugh animationInfoArray


}//function hideFoldedCards

function endAnimations(){
  self.hideChildren(displayedAnimationArray)
  setAnimationDirection(false)
}//function endAnimations

function shouldAnimate(){

//if in hand
if(self.gameState.seats[seatNum].inHand !== false){return false}
  //if seat is users
  if(seatObject.rotatedSeatNumber === self.gameState.userSeatNumber){
  if ( !(_.isArray(self.gameState.holeCards)&&self.gameState.holeCards.length >0 ) ){return false}//if hovered seat is users
 }
    //if not user
else if(!_.isObject(seatObject.shownCards[0].image) 
  || self.isItemAddedToStage(seatObject.shownCards[0])
 || !_.isObject(seatObject.shownCards[1].image) 
 || self.isItemAddedToStage(seatObject.shownCards[1])
 || !_.isObject(seatObject.hiddenCards[0].image) 
 || self.isItemAddedToStage(seatObject.hiddenCards[0])
 || !_.isObject(seatObject.hiddenCards[1].image) 
 || self.isItemAddedToStage(seatObject.hiddenCards[1])
 ){return false}//if not user

if (!_.isArray(getHoleCardAnimationArray() || getHoleCardAnimationArray().length===0 ) ){return false}

return true
}//shouldAnimate function

function onAnimationTick (animationInfo, imageTween, textTween){

if(shouldAnimate()=== false){
imageTween.removeTweens(imageTween.target)
textTween.removeTweens(textTween.target)
  endAnimations()
}//if we DONT want to animate

else{//make sure we cut off the card so it doesnt go below the seat image
 cropCardImages()
}

}//on animationTick



function cropCardImages (){
  //console.log('cropping seat images')
  self.adjustHoleCardImageSourceRectangle(getHoleCardAnimationArray(), {seatNumber:seatNum})
}

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
//console.log('show clicked')
self.displayTableChatFull()

$('#chatForm').blur()
self.jQueryObjects.tableChatFullParagraph.blur()
}

this.events.hideTableChatFullOnClick = function(){
 //  console.log('hide clicked')

self.hideTableChatFull()
}

this.moveTableChatFullMessageText = function(movementObject, options){
//console.log('moveTableChatFullMessageText called')
var velocityTo0InMiliseconds = 1000
if(!movementObject){var movementObject = {}}
  var defaults = {}
defaults.relativeUnit = 'pixels'
defaults.relativity = 'top'
//defaults.magnitude  = 0


  //if movement is not specified, reposition message text at very bottom
  if(!_.isNumber(movementObject.magnitude)){
    
 //self.jQueryObjects.tableChatFullDiv.scrollTop(scroll[0].getContentSize().h)

//console.log(scroll[0].getScrollTop())

//$("#tableChatFullTextDiv").scrollTop(scroll[0].getScrollTop()*2)

if(self.permanentPreferences.tableChatFull.scrollBarType && self.permanentPreferences.tableChatFull.scrollBarType.value == 'mCustomScrollbar'){
console.log('using mcustomsrollbar function to scroll to bottom, then update')
//show so that scroll bar can be initialized
 //$("#tableChatFullTextDiv").css('display','inline')

self.jQueryObjects.tableChatFullDiv.mCustomScrollbar('scrollTo','bottom')
 movementObject.resize = true
//self.jQueryObjects.tableChatFullDiv.mCustomScrollbar('update')
// $("#tableChatFullTextDiv").css('display','none')

}//if mCustomScrollbar is used

else{//if not mcustomscrollbar
 // console.log('scrolling to bottom with nicescroll')
  var scroll = self.jQueryObjects.tableChatFullDiv.getNiceScroll()
  if(!_.isObject(scroll[0])){console.log(scroll)}
if(scroll[0].getContentSize().h != self.jQueryObjects.tableChatFullDiv.height()){
 self.jQueryObjects.tableChatFullDiv.scrollTop(scroll[0].getContentSize().h*1.5)
 movementObject.resize = true
//scroll[0].resize()
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


if(movementObject.positionUnit == 'pixels'){}
if(_.isNumber(movementObject.magnitude)){
if(self.permanentPreferences.tableChatFull.scrollBarType && self.permanentPreferences.tableChatFull.scrollBarType.value == 'mCustomScrollbar'){

}//if mcustomscrollbar

else{//if nicescroll
var scroll = self.jQueryObjects.tableChatFullDiv.getNiceScroll()
  scroll[0].scrollTop(self.sessionPreferences.tableChatFull.tableChatFullScrollBarPositionTrueForBottomOrUpperInvisiblePixels.value)
  movementObject.resize = true
}//if not mcustomscrollbar

}//if magnitude is a  number


}//if magnitude not a number

//resize if necessary
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
self.updateTableChatFullDisplay()
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
self.saveSessionPreferences()
self.updateTableChatFullDisplay()
}


this.events.hideDealerMessagesClicked = function(){
  self.getPermanentPreferences()
console.log('hideDealerMessagesClicked')
//change user preferences
self.sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hideDealerMessages.value = false
self.sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hideDealerMessagesOn.value = true
//save preference on server
self.saveSessionPreferences()

self.updateTableChatFullDisplay()
}


this.events.hideDealerMessagesOnClicked = function(){
console.log('hideDealerMessagesOnClicked')
//change user preferences
self.sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hideDealerMessages.value = true
self.sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hideDealerMessagesOn.value = false

//save preference on server
self.saveSessionPreferences()

self.updateTableChatFullDisplay() 
}

this.events.hidePlayerMessagesClicked = function(){
  console.log('hidePlayerMessagesClicked')
self.sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hidePlayerMessages.value = false
self.sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hidePlayerMessagesOn.value = true


//save preference on server
self.saveSessionPreferences()

self.updateTableChatFullDisplay()

}
this.events.hidePlayerMessagesOnClicked = function(){
   console.log('hidePlayerMessagesOnClicked')
self.sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hidePlayerMessages.value = true
self.sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hidePlayerMessagesOn.value = false

//save preference on server
self.saveSessionPreferences()

self.updateTableChatFullDisplay()
}
this.events.hideObserverMessagesClicked = function(){
   console.log('hideObserverMessagesClicked')
self.sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hideObserverMessages.value = false
self.sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hideObserverMessagesOn.value = true
//save preference on server
self.saveSessionPreferences()
self.updateTableChatFullDisplay()
}
this.events.hideObserverMessagesOnClicked = function(){

self.sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hideObserverMessages.value = true
self.sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hideObserverMessagesOn.value = false
//save preference on server
self.saveSessionPreferences()
self.updateTableChatFullDisplay()
}


this.events.rotateSeatsIfNeededAndConfirm = function(){

if(self.permanentPreferences.alwaysRotate === true){}
//  console.log(self.sessionPreferences)
//console.log(self.images.seats[self.gameState.userSeatNumber])

//check if preference is to sit at "absolute steat" or 0
var preferenceSeat = self.sessionPreferences.changeUserSeatViewTo.value
if( _.isNumber(preferenceSeat) && ( preferenceSeat === 0 || preferenceSeat === self.gameState.userSeatNumber)){
  console.log('rotating without confirming due to current preference:');console.log(self.sessionPreferences.changeUserSeatViewTo)
  self.changeUserSeatView(preferenceSeat)
}//if user has a specific seat we rotate to
  else if( self.gameState.userSeatNumber !== 0){  //rotate to seat 0
//console.log('changing userseat view')

      self.changeUserSeatView() //rotate seats first

//confirm the choice if the preference requires it
        if(self.permanentPreferences.confirmSeatRotation.value === true) {   
          var messageInfo = {}    
                       messageInfo.title = 'Seat Viewpoint Changed'
                     messageInfo.okayText = 'OK, this is fine'
                     messageInfo.cancelText = 'Change view'
                     messageInfo.cancel = true
                     messageInfo.checkBox = true
          messageInfo.okayEvent = function(e, checkBoxStatus){
     
           if(checkBoxStatus === 'checked'){
            self.permanentPreferences.confirmSeatRotation.value = false}
            else if(checkBoxStatus === 'unchecked'){
            self.permanentPreferences.confirmSeatRotation.value = true}

               self.hideMessageBox()//hide message box
           self.sessionPreferences.changeUserSeatViewTo.value = self.images.seats[self.gameState.userSeatNumber].rotatedSeatNumber
         console.log('setting seat view preference to '+ self.sessionPreferences.changeUserSeatViewTo.value)
         self.saveSessionPreferences()
         }
          messageInfo.cancelEvent = function (){
           if(self.images.seats[self.gameState.userSeatNumber].rotatedSeatNumber !== self.gameState.userSeatNumber ){
             self.changeUserSeatView(self.gameState.userSeatNumber )}
             else{self.changeUserSeatView()}
            // else{self.changeUserSeatView(self.sessionPreferences.changeUserSeatViewTo.value)}
         
         //self.hideMessageBox()
         }
          var messageString = 'Your table viewpoint has been changed so that you appear at the bottom middle.  Your position relative to other players remains the same. Click '+messageInfo.cancelText+ ' to change your view back.'  
              self.displayMessageBox(messageString, messageInfo)
         }//if we want to display popup, display it
         }//rotate seat to display user as seat 0, then check if we need to confirm the change with the user
}

this.events.userStands = function(){

self.setPreactionData('hand', 'check', true)
self.setPreactionData('hand', 'fold', true)

socket.emit('stand')

}

    this.events.exitTableClick = function(event){
      console.log('exittable clicked')
      console.log(event)
       var  messageInfo = {}
       messageInfo.title = 'Leave Table?'
       messageInfo.cancel = true
       messageInfo.okayEvent = function(){
self.events.userStands()
      self.events.exit()
      }
        self.displayMessageBox("Are you sure you want to leave?",messageInfo)

    }

     this.events.viewLobbyClick = function(event){

         var lobbyName = "Lobby"
         window.open('/lobby', lobbyName, 'width=800,height=770 ,left=200,top=200,location=0,toolbar=no,menubar=no,titlebar=no,directories=no,scrollbars=yes');
    //     window.open('/lobby')

    }

    this.events.exit = function(event){
        self.hideMessageBox()
        if (_.isObject(parent.iframes)) {
          console.log('Close iframe');
          parent.iframes.closeIframe($('#server_values').data('table_name'))
        }
        else {
          console.log('Close window instead');
          var win = window.open('', '_self')
          win.close()
        }
    }

    this.events.onDisabledSeatClick = function(e){
       console.log(e)
  
      //if right click
if(e.nativeEvent.button !== 2){return}//make sure its a right click
//e.nativeEvent.preventDefault()
   

      var seatObject = e.target.parentOfImageObject.seatObjectAncestor
var rotatedSeatNumber = seatObject.rotatedSeatNumber
var nonRotatedSeatNumber  = seatObject.nonRotatedSeatNumber
var seatStageNumber = seatObject.seat.position.z.stage
var seatStage = self.arrayOfParentsOfStageAndOfContainerArray[seatStageNumber]
var buttonContainer = seatStage.containers.length-2
var buttonStageNumber = seatStageNumber
var buttonContainer = buttonContainer

var buttonWidth = self.images.seats[0].seat.size.x*0.85
var buttonHeight = 16
var buttonFontSize = 10
var buttonFont = self.permanentPreferences.defaultFontType.value

//------------------------CREATE SHOW ME HERE OPTION--------------------------
var showMeHere = new self.images.Item(0,0,buttonWidth, buttonHeight, {stage:buttonStageNumber, container: buttonContainer})
 showMeHere.image = new createjs.Shape()
 showMeHere.image.graphics.setStrokeStyle(1,'round').beginStroke('black')
 .beginFill('#C8C8C8').drawRect(0, 0, buttonWidth, buttonHeight)

 self.images.addItemText(showMeHere, 'Show Me Here', buttonFontSize+'px '+ buttonFont, 'black' )

showMeHere.image.onClick = function(e){
self.hideChildren(showMeHere)
self.changeUserSeatView(rotatedSeatNumber)
}

var displayShowMeHere = function(){
  var stagesToUpdate = []
stagesToUpdate.push(self.setImageItemPositionAndTextBasedOnImageChange(showMeHere, e.stageX, e.stageY))
stagesToUpdate.push(self.displayChildren(showMeHere,{update:false}))
self.updateStages(stagesToUpdate)
console.log('displayshowmehere finished')
}

var hideShowMeHere = function(){self.hideChildren(showMeHere)}



displayShowMeHere()

$(window).one('contextmenu.hideShowMeHere click.hideShowMeHere', function(event){
  event.preventDefault()
$(window).on(
  'contextmenu.hideShowMeHere click.hideShowMeHere', function(event) { 
 //   if(triggered === false){triggered = true;return}
  console.log('click.hideShowMeHere event fired')
  hideShowMeHere()
  $(window).off( 'click.hideShowMeHere contextmenu.hideShowMeHere') 
}//click.hideShowMeHereFunction contextmenu.hideShowMeHereFunction
)
} )


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

if(parent.imagesLoaded === true || parent.imagesLoading === true){return}

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

           imageSourceArray.push({src: this.images.sources[i], id:resourceID, name: i, sourceObjectParent: this.images.sourceObjects})
           resourceID++
    }//end check if this.images.sources[i] = image

    else if(isFlashSoundSource(this.images.sources[i])){
           flashSoundSourceArray.push({src: this.images.sources[i], id:resourceID, name: i})
           resourceID++
    }//end check if this.images.sources[i] = flashSound

    else if(isSoundSource(this.images.sources[i])){
           soundSourceArray.push({src: this.images.sources[i], id:resourceID, name: i})
           resourceID++
    }//end check if this.images.sources[i] = sound

  }//end check if this.images.sources[i] = string
    else if (_.isObject(this.images.sources[i])){
      this.images.sourceObjects[i] = {}
        for(var n in this.images.sources[i]){
            if(_.isString(this.images.sources[i][n])){
                imageSourceArray.push({src: this.images.sources[i][n], id:resourceID, name: n, sourceObjectParent: this.images.sourceObjects[i]})
                resourceID++
            }
        }//end iteration through this.images.sources[i]
      }//end check if this.images.sources[i] is object
      
    }//end iteration through this.images.sources

//define object for card image to stay
this.images.sourceObjects.desktopCards = {}
this.images.sourceObjects.mobileCards = {}
var desktopCards = this.images.sourceObjects.desktopCards
var mobileCards = this.images.sourceObjects.mobileCards

 //push card back mobile and desktop
imageSourceArray.push({src:this.images.sources.desktopCardFolder+this.images.sources.cardBackFileNameWithoutExtension+'.png', id: resourceID, name: 'cardBack', sourceObjectParent: desktopCards})
imageSourceArray.push({src:this.images.sources.mobileCardFolder+this.images.sources.cardBackFileNameWithoutExtension+'.png', id: resourceID, name: 'cardBack', sourceObjectParent: mobileCards})

//push individual cards
    for(var i = 2;i<=14;i++){
        var cardRank
           if(i==10){cardRank = 't'}
      else  if(i==11){cardRank = 'j'}
     else   if(i==12){cardRank = 'q'}
else if(i==13){cardRank = 'k'}
    else    if(i==14){cardRank = 'a'}
    else{cardRank = i}
        imageSourceArray.push({src: this.images.sources.desktopCardFolder+cardRank+'c.png', id: resourceID, name: cardRank+'c', sourceObjectParent: desktopCards})
      resourceID++
        imageSourceArray.push({src:this.images.sources.desktopCardFolder+cardRank+'d.png', id: resourceID, name: cardRank+'d', sourceObjectParent: desktopCards})
        resourceID++
        imageSourceArray.push({src:this.images.sources.desktopCardFolder+cardRank+'h.png', id: resourceID, name: cardRank+'h', sourceObjectParent: desktopCards})
        resourceID++
        imageSourceArray.push({src:this.images.sources.desktopCardFolder+cardRank+'s.png', id: resourceID, name: cardRank+'s', sourceObjectParent: desktopCards})
        resourceID++
       imageSourceArray.push({src: this.images.sources.mobileCardFolder+cardRank+'c.png', id: resourceID, name: cardRank+'c', sourceObjectParent: mobileCards})
      resourceID++
        imageSourceArray.push({src:this.images.sources.mobileCardFolder+cardRank+'d.png', id: resourceID, name: cardRank+'d', sourceObjectParent: mobileCards})
        resourceID++
        imageSourceArray.push({src:this.images.sources.mobileCardFolder+cardRank+'h.png', id: resourceID, name: cardRank+'h', sourceObjectParent: mobileCards})
        resourceID++
        imageSourceArray.push({src:this.images.sources.mobileCardFolder+cardRank+'s.png', id: resourceID, name: cardRank+'s', sourceObjectParent: mobileCards})
        resourceID++
    }

   

console.log(imageSourceArray)

    //console.log(imageSourceArray)
    //define dimensions of preloading screen
    var introScreen = {}
   // console.log(this.arrayOfParentsOfStageAndOfContainerArray)
    var canvasWidth = this.arrayOfParentsOfStageAndOfContainerArray[0].stage.canvas.width
    var canvasHeight = this.arrayOfParentsOfStageAndOfContainerArray[0].stage.canvas.height
    var titleSizeAndFont = '20px ' + self.permanentPreferences.defaultFontType.value
     var titleHeight = 35
     var titleAndPreloadBarDistanceY = 50
     var titleText = 'Loading resources...'
     var titleColor = '#000000'
     var statusSizeAndFont = '15px ' + self.permanentPreferences.defaultFontType.value
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
var titleSizeAndFont = '30px ' + self.permanentPreferences.defaultFontType.value
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
    //  console.log(introScreen)
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
 //   var newImages=[]
    //iterate through imageArray to preload images
    _.each(_.range(imageArray.length), function(i){
   //   console.log(imageArray[i].sourceObjectParent)
    //  if(!_.isObject(imageArray[i].sourceObjectParent)){imageArray[i].sourceObjectParent = self.permanentPreferences.sourceObjects.value}
      imageArray[i].sourceObjectParent[imageArray[i].name] = new Image()
      var newImageObject = imageArray[i].sourceObjectParent[imageArray[i].name]

  if(typeof imageArray[i] == 'string'){newImageObject.src=imageArray[i]}
        else if (typeof imageArray[i] == 'object'){newImageObject.src=imageArray[i].src}
        
       newImageObject.onload=function(){handleLoad(newImageObject.src, imageArray[i].id, increaseCounter)}
        newImageObject.onerror=function(){handleLoadError(newImageObject.src, imageArray[i].id, increaseCounter) }

        //on last iteration call onComplete function

      /*
        newImages[i]=new Image()
        if(typeof imageArray[i] == 'string'){newImages[i].src=imageArray[i]}
        else if (typeof imageArray[i] == 'object'){newImages[i].src=imageArray[i].src}
        
        newImages[i].onload=function(){handleLoad(newImages[i].src, imageArray[i].id, increaseCounter)}
        newImages[i].onerror=function(){handleLoadError(newImages[i].src, imageArray[i].id, increaseCounter) }

        //on last iteration call onComplete function
        */


    })
//periodicaly checkto see if its completed
var checkIfCompleted = setInterval (function(){
if(loadedImages >= imageArray.length){
 // console.log('calling onComplete function')
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

//-----------functions below this line ---------------------
this.initializeParent = function(){


this.initializeStagesAndCanvasCallThisFirst()


 var totalSources = 0
    var imageSourceArray = []
    var soundSourceArray = []
    var flashSoundSourceArray = []

    var resourceID = 0
   var loadedFiles=0
   var errorFiles = 0
   var errorSrcArray = []


var stage = this.gameState.zPositionData.loadingBackground.stage

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


  var desktopCards
  var mobileCards 

var createPreloadArray = function(){  


//push items to preload into arrays
      for(var i in self.images.sources){
         if(_.isString(self.images.sources[i])){
  
          if(isImageSource(self.images.sources[i])){
  
             imageSourceArray.push({src: self.images.sources[i], id:resourceID, name: i, sourceObjectParent: self.permanentPreferences.sourceObjects.value})
             resourceID++
      }//end check if this.images.sources[i] = image
  
      else if(isFlashSoundSource(self.images.sources[i])){
             flashSoundSourceArray.push({src: self.images.sources[i], id:resourceID, name: i})
             resourceID++
      }//end check if this.images.sources[i] = flashSound
  
      else if(isSoundSource(self.images.sources[i])){
             soundSourceArray.push({src: self.images.sources[i], id:resourceID, name: i})
             resourceID++
      }//end check if this.images.sources[i] = sound
  
    }//end check if this.images.sources[i] = string
      else if (_.isObject(self.images.sources[i])){

        self.permanentPreferences.sourceObjects.value[i] = {}
          for(var n in self.images.sources[i]){
              if(_.isString(self.images.sources[i][n])){
                  imageSourceArray.push({src: self.images.sources[i][n], id:resourceID, name: n, sourceObjectParent: self.permanentPreferences.sourceObjects.value[i]})
                  resourceID++
              }
          }//end iteration through this.images.sources[i]
        }//end check if this.images.sources[i] is object
        
      }//end iteration through this.images.sources
  
  //define object for card image to stay
  self.permanentPreferences.sourceObjects.value.desktopCards = {}
  self.permanentPreferences.sourceObjects.value.mobileCards = {}
  var desktopCards = self.permanentPreferences.sourceObjects.value.desktopCards
  var mobileCards = self.permanentPreferences.sourceObjects.value.mobileCards
  
   //push card back mobile and desktop
  imageSourceArray.push({src:self.images.sources.desktopCardFolder+self.images.sources.cardBackFileNameWithoutExtension+'.png', id: resourceID, name: 'cardBack', sourceObjectParent: desktopCards})
  imageSourceArray.push({src:self.images.sources.mobileCardFolder+self.images.sources.cardBackFileNameWithoutExtension+'.png', id: resourceID, name: 'cardBack', sourceObjectParent: mobileCards})
  

  //push individual cards
      for(var i = 2;i<=14;i++){
          var cardRank
             if(i==10){cardRank = 't'}
        else  if(i==11){cardRank = 'j'}
       else   if(i==12){cardRank = 'q'}
  else if(i==13){cardRank = 'k'}
      else    if(i==14){cardRank = 'a'}
      else{cardRank = i}
          imageSourceArray.push({src: self.images.sources.desktopCardFolder+cardRank+'c.png', id: resourceID, name: cardRank+'c', sourceObjectParent: desktopCards})
        resourceID++
          imageSourceArray.push({src:self.images.sources.desktopCardFolder+cardRank+'d.png', id: resourceID, name: cardRank+'d', sourceObjectParent: desktopCards})
          resourceID++
          imageSourceArray.push({src:self.images.sources.desktopCardFolder+cardRank+'h.png', id: resourceID, name: cardRank+'h', sourceObjectParent: desktopCards})
          resourceID++
          imageSourceArray.push({src:self.images.sources.desktopCardFolder+cardRank+'s.png', id: resourceID, name: cardRank+'s', sourceObjectParent: desktopCards})
          resourceID++
         imageSourceArray.push({src: self.images.sources.mobileCardFolder+cardRank+'c.png', id: resourceID, name: cardRank+'c', sourceObjectParent: mobileCards})
        resourceID++
          imageSourceArray.push({src:self.images.sources.mobileCardFolder+cardRank+'d.png', id: resourceID, name: cardRank+'d', sourceObjectParent: mobileCards})
          resourceID++
          imageSourceArray.push({src:self.images.sources.mobileCardFolder+cardRank+'h.png', id: resourceID, name: cardRank+'h', sourceObjectParent: mobileCards})
          resourceID++
          imageSourceArray.push({src:self.images.sources.mobileCardFolder+cardRank+'s.png', id: resourceID, name: cardRank+'s', sourceObjectParent: mobileCards})
          resourceID++
      }//push card


  totalSources = imageSourceArray.length+soundSourceArray.length+flashSoundSourceArray.length

  }//create preloadArray function
   

console.log(imageSourceArray)

    //console.log(imageSourceArray)
    //define dimensions of preloading screen
    var introScreen = {}
   // console.log(this.arrayOfParentsOfStageAndOfContainerArray)
    var canvasWidth = this.arrayOfParentsOfStageAndOfContainerArray[0].stage.canvas.width
    var canvasHeight = this.arrayOfParentsOfStageAndOfContainerArray[0].stage.canvas.height
    var titleSizeAndFont = '20px ' + self.permanentPreferences.defaultFontType.value
     var titleHeight = 35
     var titleAndPreloadBarDistanceY = 50
     var titleText = 'Loading resources...'
     var titleColor = '#000000'
     var statusSizeAndFont = '15px ' + self.permanentPreferences.defaultFontType.value
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

if(!_.isNumber(progressRatio)||_.isNaN(progressRatio)){var progressRatio = 0}

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


//if image is on the stage, we need to set the stage upToDate variable to false
return self.itemChanged(introScreen.preloadBar)
 
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
var titleSizeAndFont = '30px ' + self.permanentPreferences.defaultFontType.value
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
    //  console.log(introScreen)
self.displayChildren(introScreen,{update:false})        

    }


 //define image.onload functions
    function handleLoad(src, id, onEnd){
        loadedFiles++
 //       introScreen.status.text.text = src + ' loaded'
  //      introScreen.preloadBar.drawBar(loadedFiles/totalSources)
       parent.loadingScreen.status = src + ' loaded'
       parent.loadingScreen.progressRatio = loadedFiles/totalSources
        console.log(src +' loaded file id: '+id+' totalLoaded: '+loadedFiles +' of '+totalSources)
      console.log(parent.loadingScreen.progressRatio)
        if (id == imageSourceArray[imageSourceArray.length-1].id){
            console.log("last image loaded")
        }
         else if(id == soundSourceArray[soundSourceArray.length-1].id){
          console.log('last non-flash sound loaded')
        }
       
    //    self.updateStages(introScreen.status.position.z.stage)
         if(onEnd){onEnd()}
    }
    function handleLoadError(src,id, onEnd){
        loadedFiles++
        errorFiles++
        errorSrcArray.push(src)
       // introScreen.status.text.text = src + ' loaded'
       parent.loadingScreen.status = src + ' loaded'
       parent.loadingScreen.progressRatio = loadedFiles/totalSources
         console.log(src + ' error loading file id: '+id+' totalLoaded: '+loadedFiles +' of '+totalSources)
         console.log(parent.loadingScreen.progressRatio)
     //   introScreen.preloadBar.drawBar(loadedFiles/totalSources)
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

    //    self.updateStages(stage)
      if(onEnd){onEnd()}
    }


 var  preloadImages = function (imageArray){
  var loadedImages = 0
  var increaseCounter = function(){
    loadedImages++
console.log('loaded '+ loadedImages+' images out of a total of '+imageArray.length + ' images')
  }
 //   var newImages=[]
    //iterate through imageArray to preload images
    _.each(_.range(imageArray.length), function(i){
  //    console.log(imageArray[i])
    //  if(!_.isObject(imageArray[i].sourceObjectParent)){imageArray[i].sourceObjectParent = self.permanentPreferences.sourceObjects.value}
      imageArray[i].sourceObjectParent[imageArray[i].name] = new Image()
      var newImageObject = imageArray[i].sourceObjectParent[imageArray[i].name]

  if(typeof imageArray[i] == 'string'){newImageObject.src=imageArray[i]}
        else if (typeof imageArray[i] == 'object'){newImageObject.src=imageArray[i].src}
        
       newImageObject.onload=function(){handleLoad(newImageObject.src, imageArray[i].id, increaseCounter)}
        newImageObject.onerror=function(){handleLoadError(newImageObject.src, imageArray[i].id, increaseCounter) }

        //on last iteration call onComplete function

      /*
        newImages[i]=new Image()
        if(typeof imageArray[i] == 'string'){newImages[i].src=imageArray[i]}
        else if (typeof imageArray[i] == 'object'){newImages[i].src=imageArray[i].src}
        
        newImages[i].onload=function(){handleLoad(newImages[i].src, imageArray[i].id, increaseCounter)}
        newImages[i].onerror=function(){handleLoadError(newImages[i].src, imageArray[i].id, increaseCounter) }

        //on last iteration call onComplete function
        */


    })

}

 function onComplete (){
  console.log('onComplete called in initialize');console.log(parent)
     parent.loaded = true
      self.displayChildren(self.images.imageLoading.title,{update:false})
        self.createAllItems()
        } 

function checkIfCompleted(e){
 // console.log(e)
//CHECK IF COMPLETED
//if(loadedImages >= imageArray.length){
  if(parent.loadingScreen.progressRatio >= 1 || parent.loaded === true){
    console.log('loading has been completed');console.log(parent);console.log(self.permanentPreferences.sourceObjects.value);console.log(parent.sourceObjects)
  onComplete()
createjs.Ticker.removeEventListener(e.type, checkIfCompleted)
}
//UPDATE DISPLAY IF NOT COMPLETED
else{
  introScreen.preloadBar.drawBar(parent.loadingScreen.progressRatio)
   introScreen.status.text.text = parent.loadingScreen.status
   self.itemChanged(introScreen.status)
   self.updateStages()
}


  }//check if completed

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

//ACTION

console.log('we are going to check whether to perform load from this page, or use other page load');console.log(parent)
if(parent.loaded === true || parent.loading === true){console.log('other frame to load our images');console.log(self.permanentPreferences.sourceObjects.value);console.log(parent.sourceObjects)}
  else{
    console.log('loading from this page')
  //  parent.sourceObjects = {}
    parent.loading = true
parent.loadingScreen = {}
parent.loadingScreen.progressRatio = 0
parent.loadingScreen.status = ''


createPreloadArray()
          preloadSounds(flashSoundSourceArray, soundSourceArray)
    preloadImages(imageSourceArray)
  }

    displayPreloadScreen()
//add event listener to stage to see if it is done
   createjs.Ticker.addEventListener('tick', checkIfCompleted)

}//initialize on parent object function



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

            //-----------------checkbox buttons---------------
var checkBoxButtonSource = self.permanentPreferences.sourceObjects.value.checkBox
var checkBoxButtonCheckedSource = self.permanentPreferences.sourceObjects.value.checkBoxChecked
            var checkBoxButtonWidth = 100
      checkBoxButtonHeight = checkBoxButtonSource.height    //  var checkBoxButtonHeight = 13
            var checkBoxButtonDistanceFromChat = 8
            var checkBoxButtonOffSetLeft = 2
           var  checkBoxButtonDistanceY = 3
           var checkBoxButtonCheckBoxWidth = checkBoxButtonHeight
           var checkBoxButtonDistanceFromBoxToText = 5
           var checkBoxButtonDistanceFromEdgeToInteriorHitAreaY = 1
           var checkBoxButtonSizeAndFont = '10px ' + self.permanentPreferences.defaultFontType.value
           var checkBoxButtonTextColor = '#FFFFFF'

            var actionButtonWidth = 80
            var actionButtonHeight = 25
            var actionButtonLeftX = 160
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
var currencyDisplayTopOffset = 0
var currencyDisplaySizeAndFont = '16px ' + self.permanentPreferences.defaultFontType.value
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

            var potHeight = 14
            var potWidth = 85
            var potSizeAndFont = '14px ' + self.permanentPreferences.defaultFontType.value
            var potTextColor = '#FFFFFF'

            var potDistanceToCommunity = -25

           var chipSource = self.permanentPreferences.sourceObjects.value.chips['10']
         var chipDiameter = chipSource.width  // var chipDiameter = 20
       // var chipDiameter = 20
            var distanceBetweenChipsY = 3

            var betTextHeight = 11
            var betTextWidth =  20
            var absoluteDistanceBetweenBetTextAndChipImages = 0

            var htmlTableChatBoxLeftOffset = checkBoxButtonOffSetLeft
            var htmlTableChatBoxBottomOffset = 8
            var htmlTableChatBoxWidth = 140
            var htmlTableChatBorderSize = self.jQueryObjects.chatBoxInput.css('border').substring(0,self.jQueryObjects.chatBoxInput.css('border').indexOf('p'))
            var htmlTableChatBoxHeight = 20
            var htmlTableChatBoxReminderTextColor = 'rgb(160,0,0) '

            var verticalBetSliderWidth = 6
            var verticalBetSliderHeight = 13            
            var horizontalBetSliderWidth = 125
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

            var cashierButtonSource =  self.permanentPreferences.sourceObjects.value.cashierButton
           var cashierButtonWidth = 132
           var cashierButtonHeight = 52


//distance between upper buttons
var distanceBetweenUpperButtonHitAreasY = 3


            //define dimensions for upper right and upper left buttons

                   //---------------stand up----------
            var standUpSource = self.permanentPreferences.sourceObjects.value.standUp
          var standUpWidth =   standUpSource.width          //   var standUpWidth = 158
               var standUpHeight = standUpSource.height            //   var standUpHeight = 26
            var standUpHitAreaUpperLeftOffsetX  = 6 //distance from left of standUp image and mouse events
            var standUpHitAreaLowerLeftOffsetX = 37
            var standUpHitAreaTopOffset  = 1 // distance from top of standUp image and mouse event clicks
            var standUpHitAreaBottomOffset  = 3 
            var standUpHitAreaRightOffset  = 1  // distance from rightside of image and hit area

       //---------------exit table----------
     var exitTableSource = self.permanentPreferences.sourceObjects.value.exitTable 
                var exitTableWidth =   exitTableSource.width                  //  var exitTableWidth = 135
               var exitTableHeight = exitTableSource.height                     //  var exitTableHeight = 32

             var exitTableHitAreaUpperLeftOffsetX  = 18 //distance from left of ExitTable image and mouse events
            var exitTableHitAreaLowerLeftOffsetX = 49
            var exitTableHitAreaTopOffset  = 1 // distance from top of ExitTable image and mouse event clicks
             var exitTableHitAreaBottomOffset  = 9
            var exitTableHitAreaRightOffset  = 1  // distance from ExitTable of image and hit area
            
            //---------------get chips----------
             var getChipsSource = self.permanentPreferences.sourceObjects.value.getChips 
                var getChipsWidth =   getChipsSource.width                  //   var getChipsWidth = 149
               var getChipsHeight = getChipsSource.height                     //  var getChipsHeight = 41

             var getChipsHitAreaLeftOffset  = 1 //distance from left of getChips image and mouse events
            var getChipsHitAreaTopOffset  = 1 // distance from top of getChips image and mouse event clicks
             var getChipsHitAreaBottomOffset  = 10
            var getChipsHitAreaUpperRightOffset  = 9
            var getChipsHitAreaLowerRightOffset  = 38

//show/hidde table chat full buttons
     var showTableChatFullSource = self.permanentPreferences.sourceObjects.value.showTableChatFull 
                var showTableChatFullWidth =   showTableChatFullSource.width                  //   var showTableChatFullWidth = 112
               var showTableChatFullHeight = showTableChatFullSource.height                     //  var var showTableChatFullHeight =  31
                  
var showTableChatFullHitAreaOffsetLeft= 1
var showTableChatFullHitAreaOffsetTop = 1
var showTableChatFullHitAreaOffsetBottom = 7
var showTableChatFullHitAreaOffsetTopRight =5
var showTableChatFullHitAreaOffsetBottomRight = 27


            var openSeatOuterStrokeWidth = 1.5

            var tableX = 0
            var tableY = 15

            var disabledButtonOverlayAlpha = 0.43


  //------------------------------community cards---------------------------
        this.community[0] = new this.Item(canvasWidth/2-cardWidth/2-cardWidth*2-distanceBetweenCommunityCards*2,communityY,cardWidth, cardHeight,self.gameState.zPositionData.communityCards)
        this.community[1] = new this.Item(canvasWidth/2-cardWidth/2-cardWidth-distanceBetweenCommunityCards,communityY,cardWidth, cardHeight,self.gameState.zPositionData.communityCards)
        this.community[2] = new this.Item(canvasWidth/2-cardWidth/2,communityY,cardWidth, cardHeight,self.gameState.zPositionData.communityCards)
        this.community[3] = new this.Item(canvasWidth/2+cardWidth/2+distanceBetweenCommunityCards,communityY,cardWidth, cardHeight,self.gameState.zPositionData.communityCards)
        this.community[4] = new this.Item(canvasWidth/2+cardWidth/2+cardWidth+2*distanceBetweenCommunityCards,communityY,cardWidth, cardHeight,self.gameState.zPositionData.communityCards)

  //------------------card spawn location---------------------------------

           this.startingCard = new this.Item(canvasWidth, canvasHeight, cardWidth, cardHeight, self.gameState.zPositionData.cardAnimation)


            //------------------------------------dealerButton------------------------------------
           this.dealerButton = new this.Item(0,0,dealerButtonWidth, dealerButtonHeight,self.gameState.zPositionData.chips)
            this.itemAsBitmap(this.dealerButton, self.permanentPreferences.sourceObjects.value.dealerButton)


var createPotItems = function(potNumber, firstChipX, firstChipY, options){
  if(!options){var options = {}}
var distanceY = distanceBetweenChipsY
 var maxPotWidth = (distanceX)*(self.imageData.maxChipColumns-1)+chipDiameter
var distanceX = self.imageData.distanceBetweenChipColumns + chipDiameter;
if(options.columnDirection === 'left'){distanceX = distanceX*-1}


  self.images.pots[potNumber].firstChip = new self.images.Item(firstChipX, firstChipY ,chipDiameter,chipDiameter,self.gameState.zPositionData.chips)
              self.images.pots[potNumber].secondChip = new self.images.Item(firstChipX,firstChipY - distanceY,chipDiameter,chipDiameter,self.gameState.zPositionData.chips)
              self.images.pots[potNumber].secondColumnChip = new self.images.Item(firstChipX+distanceX,firstChipY,chipDiameter,chipDiameter,self.gameState.zPositionData.chips)

if(options.columnDirection !== 'left'){
                   self.images.pots[potNumber].potSize = new self.images.Item(firstChipX,firstChipY+chipDiameter,betSizeWidth,potHeight,self.gameState.zPositionData.chips)
                 }

                   else{
                    self.images.pots[potNumber].potSize = new self.images.Item(firstChipX + chipDiameter - betSizeWidth,firstChipY+chipDiameter,betSizeWidth,potHeight,self.gameState.zPositionData.chips) 
                  }//if we want to go left
             self.images.addItemText(self.images.pots[potNumber].potSize, '' ,potSizeAndFont, potTextColor, {textAlign:'left'})
self.images.pots[potNumber].potSize.text.maxWidth = 999999
console.log('created pot items for pot number: '+potNumber);console.log(self.images.pots[potNumber])
}


            //---------pots-------------------
    var pot0X = canvasWidth/2-cardWidth/2-cardWidth; var pot0Y = communityY - potHeight - chipDiameter

createPotItems(0, pot0X, pot0Y)

   /*         this.pots[0].firstChip = new this.Item(canvasWidth/2-cardWidth/2-cardWidth,communityY+potDistanceToCommunity,chipDiameter,chipDiameter,self.gameState.zPositionData.chips)
              this.pots[0].secondChip = new this.Item(this.pots[0].firstChip.position.x,this.pots[0].firstChip.position.y-distanceBetweenChipsY,chipDiameter,chipDiameter,self.gameState.zPositionData.chips)
              this.pots[0].secondColumnChip = new this.Item(this.pots[0].firstChip.position.x+chipDiameter+self.imageData.distanceBetweenChipColumns,this.pots[0].firstChip.position.y,chipDiameter,chipDiameter,self.gameState.zPositionData.chips)
           
 

            this.pots[0].potSize = new this.Item(this.pots[0].firstChip.position.x, this.pots[0].firstChip.position.y+potHeight,potWidth,potHeight,self.gameState.zPositionData.chips)
             this.addItemText(this.pots[0].potSize, 0,potSizeAndFont, potTextColor)
       */                


                                    var totalPotWidth = (this.pots[0].secondColumnChip.position.x-this.pots[0].firstChip.position.x)*(self.imageData.maxChipColumns-1)+chipDiameter
              var distanceBetweenPots = self.imageData.maxChipColumns
           var distanceBetweenChipsInColumn =  this.pots[0].firstChip.position.y - this.pots[0].secondChip.position.y
           var chipColumnHeight = chipDiameter +(self.imageData.maxChipsPerColumn-1)*distanceBetweenChipsInColumn
           var maxChipColumnHeight = (self.imageData.maxChipsPerColumn - 1)*(this.pots[0].secondChip.position.x-this.pots[0].firstChip.position.x) + chipDiameter
           var maxTotalPotHeight = maxChipColumnHeight + potHeight

                  
           this.totalPotSize  = new this.Item(this.pots[0].firstChip.position.x, this.pots[0].firstChip.position.y+chipDiameter-chipColumnHeight-potHeight*2,potWidth,potHeight,self.gameState.zPositionData.chips)
             this.addItemText( this.totalPotSize, '',potSizeAndFont, potTextColor)
            this.totalPotSize.text.maxWidth = null

var pot1X = pot0X + totalPotWidth + distanceBetweenPots;var pot1Y = pot0Y
createPotItems(1, pot1X, pot1Y)

var pot2X = self.images.community[4].position.x + self.images.community[4].size.x + 1; var pot2Y = pot1Y + potHeight
createPotItems(2, pot2X, pot2Y)

var pot3X = pot2X; var pot3Y = pot2Y + maxTotalPotHeight*1.5
createPotItems(3, pot3X, pot3Y)

var pot4X = pot1X ; var pot4Y = self.images.community[4].position.y + self.images.community[4].size.y + maxChipColumnHeight
createPotItems(4, pot4X, pot4Y)

var pot5X = pot0X; var pot5Y = pot4Y
createPotItems(5, pot5X, pot5Y)

var pot6X =  self.images.community[0].position.x  - chipDiameter; var pot6Y = pot3Y
createPotItems(6, pot6X, pot6Y, {columnDirection:'left'})

var pot7X = pot6X; var pot7Y = pot2Y
createPotItems(7, pot7X, pot7Y, {columnDirection:'left'})

var pot8X = canvasWidth/2 - totalPotWidth/2; var pot8Y =  this.totalPotSize.position.y - maxTotalPotHeight
createPotItems(8, pot8X, pot8Y)


/*
              for(var i=1;i<this.seats.length-1;i++){

             this.pots[i].firstChip = new this.Item( this.pots[0].firstChip.position.x+i*distanceBetweenPots, this.pots[0].firstChip.position.y ,chipDiameter,chipDiameter,self.gameState.zPositionData.chips)
              this.pots[i].secondChip = new this.Item(this.pots[0].secondChip.position.x+i*distanceBetweenPots,this.pots[0].secondChip.position.y,chipDiameter,chipDiameter,self.gameState.zPositionData.chips)
              this.pots[i].secondColumnChip = new this.Item(this.pots[0].secondColumnChip.position.x+i*distanceBetweenPots,this.pots[0].secondColumnChip.position.y,chipDiameter,chipDiameter,self.gameState.zPositionData.chips)

                   this.pots[i].potSize = new this.Item(this.pots[0].potSize.position.x+i*distanceBetweenPots,this.pots[0].potSize.position.y,potWidth,potHeight,self.gameState.zPositionData.chips)
             this.addItemText(this.pots[i].potSize, 0,potSizeAndFont, potTextColor)
              }

*/

           


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
        
        this.itemAsBitmap(this.foldToAnyBet, self.permanentPreferences.sourceObjects.value.checkBox)
this.itemAsBitmap(this.sitOutNextHand, self.permanentPreferences.sourceObjects.value.checkBox)
this.itemAsBitmap(this.sitOutNextBlind, self.permanentPreferences.sourceObjects.value.checkBox)

        this.itemAsBitmap(this.foldToAnyBetOn, self.permanentPreferences.sourceObjects.value.checkBoxChecked)
this.itemAsBitmap(this.sitOutNextHandOn, self.permanentPreferences.sourceObjects.value.checkBoxChecked)
this.itemAsBitmap(this.sitOutNextBlindOn, self.permanentPreferences.sourceObjects.value.checkBoxChecked)

  //hitAreas for buttons
      

      self.images.drawCheckBoxButtonHitSquareAndAdjustItemWidth = function(item){
          //get width of text
        var textWidth =   self.getTextWidthAndFontSize(item)[0]
        var totalWidth = checkBoxButtonCheckBoxWidth + checkBoxButtonDistanceFromBoxToText + textWidth
        item.size.x = totalWidth
        var textHeight = item.text.getMeasuredHeight()
        if(textHeight > checkBoxButtonHeight){var height = textHeight}
          else{var height = checkBoxButtonHeight}
            item.size.y = textHeight
        //draw rectangular shape
        var hitSquare = new createjs.Shape()
        hitSquare.graphics.beginFill('#FFFFFF').beginStroke(0)
        .drawRect(0, checkBoxButtonDistanceFromEdgeToInteriorHitAreaY, totalWidth, item.size.y - checkBoxButtonDistanceFromEdgeToInteriorHitAreaY)
        return hitSquare
      }

//function for creating text from all fast
    self.images.addCheckBoxButtonText = function(item, text, options){
if(!options){var options = {}}
  update = options.update
options.update = false

      var stagesToUpdate = []
         if(item.text instanceof createjs.Text === false)  {item.text = new createjs.Text(text, checkBoxButtonSizeAndFont, checkBoxButtonTextColor)}
          

          else{
//check if we need to update stage possibly
if(item.text.text !== text 
  || item.font !== checkBoxButtonSizeAndFont
  ||item.color !== checkBoxButtonTextColor
||item.text.x!==item.position.x + checkBoxButtonCheckBoxWidth + checkBoxButtonDistanceFromBoxToText
||item.text.y!==item.position.y + 1
||item.text.baseline !== 'top'
||item.text.textAlign !== 'left'){
  stagesToUpdate.push(self.itemChanged(item))}

            item.text.text = text
item.font = checkBoxButtonSizeAndFont
item.color = checkBoxButtonTextColor
          }

item.text.x=item.position.x + checkBoxButtonCheckBoxWidth + checkBoxButtonDistanceFromBoxToText
item.text.y=item.position.y + 1
item.text.baseline = 'top'
item.text.textAlign = 'left'
item.textColor = checkBoxButtonTextColor

var hit = self.images.drawCheckBoxButtonHitSquareAndAdjustItemWidth(item)
item.text.hitArea  = hit
item.image.hitArea  = hit

options.update = update
if(update !== false){self.updateStages(stagesToUpdate)}
else{return stagesToUpdate}
}

self.images.itemsAsCheckBoxes = function(uncheckedItem,checkedItem, text, options){
  self.images.itemAsBitmap(uncheckedItem, checkBoxButtonSource)
self.images.addCheckBoxButtonText(uncheckedItem, text, options)

  self.images.itemAsBitmap(checkedItem, checkBoxButtonCheckedSource)
self.images.addCheckBoxButtonText(checkedItem, text, options)
}

//off state
      self.images.addCheckBoxButtonText( this.foldToAnyBet, 'Auto check/fold' )
      self.images.addCheckBoxButtonText(this.sitOutNextHand, 'Sit out next hand')
      self.images.addCheckBoxButtonText (  this.sitOutNextBlind,'Sit out next blind' )
      
      //on state
      self.images.addCheckBoxButtonText( this.foldToAnyBetOn, 'Auto check/fold' )
      self.images.addCheckBoxButtonText(this.sitOutNextHandOn, 'Sit out next hand')
      self.images.addCheckBoxButtonText (  this.sitOutNextBlindOn,'Sit out next blind' )

   


      //onclick
       this.foldToAnyBet.image.onClick =    self.events.foldToAnyBetClick          //self.events.onButtonClick
        this.sitOutNextHand.image.onClick = self.events.onButtonClick
          this.sitOutNextBlind.image.onClick  = self.events.onButtonClick
           //onclick for  on versions
                  this.foldToAnyBetOn.image.onClick  =        self.events.foldToAnyBetOnClick     //self.events.onButtonClick
                  this.sitOutNextHandOn.image.onClick = self.events.onButtonClick
                    this.sitOutNextBlindOn.image.onClick = self.events.onButtonClick


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

//draw seated seat image
self.images.drawSeat(this.seats[i].seat, '#000000','#000000', '#7d7d7d')

//mouseover events
this.seats[i].seat.image.onMouseOver = self.events.seatMouseEvent
this.seats[i].seat.image.onMouseOut = self.events.seatMouseEvent


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
             
             this.seats[i].hiddenCards = []
            this.seats[i].hiddenCards[0] = new this.Item(card0X, cardY, cardWidth, cardHeight,self.gameState.zPositionData.holeCards)
            this.seats[i].hiddenCards[1]  = new this.Item(card1X, cardY, cardWidth, cardHeight,self.gameState.zPositionData.holeCards)
 this.seats[i].shownCards =[]
            this.seats[i].shownCards[0] = new this.Item(card0X, cardY, cardWidth, cardHeight,self.gameState.zPositionData.holeCards)
            this.seats[i].shownCards[1] = new this.Item(card1X, cardY, cardWidth, cardHeight,self.gameState.zPositionData.holeCards)

            //Empty Seats
            var openSeatFill = '#000000'
            var openSeatMiddle = openSeatMiddle
            var openSeatBorder = '#FFFFFF'

self.images.drawSeat(this.seats[i].openSeat, openSeatBorder, openSeatFill, openSeatMiddle, {outerStrokeWidth: openSeatOuterStrokeWidth})
this.seats[i].openSeat.image.parentOfImageObject = this.seats[i].openSeat  

                this.seats[i].openSeat.text = new createjs.Text('Open Seat', '15px ' + self.permanentPreferences.defaultFontType.value, "#FFFFFF")
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

//openSeat onclick event

self.images.seats[i].disabledSeat.image.addEventListener('click', self.events.onDisabledSeatClick)


/*
            this.seats[i].disabledSeat.image = new createjs.Shape()
this.seats[i].disabledSeat.image.snapToPixel = true
this.seats[i].disabledSeat.image.graphics.setStrokeStyle(1,'square').beginStroke("#544E4F").beginFill('black').drawRect(this.seats[i].disabledSeat.position.x, this.seats[i].disabledSeat.position.y, this.seats[i].disabledSeat.size.x, this.seats[i].disabledSeat.size.y)
         this.seats[i].disabledSeat.image.parentOfImageObject = this.seats[i].disabledSeat       
         */

//console.log(self.permanentPreferences.sourceObjects.value)
            //hole cards
            if(self.sessionPreferences.displaySize.value !== 'mobile'){
     //        this.itemAsBitmap(this.seats[i].hiddenCards[0],  self.permanentPreferences.sourceObjects.value.cardObjectParent.cardBack)
    //        this.itemAsBitmap(this.seats[i].hiddenCards[1], self.permanentPreferences.sourceObjects.value.cardObjectParent.cardBack)
}
else{
 //    this.itemAsBitmap(this.seats[i].hiddenCards[0],  self.permanentPreferences.sourceObjects.value.cardObjectParent.cardBack)
  //          this.itemAsBitmap(this.seats[i].hiddenCards[1], self.permanentPreferences.sourceObjects.value.cardObjectParent.cardBack)
}

this.cardAsBitmap(this.seats[i].hiddenCards[0],  null)
this.cardAsBitmap(this.seats[i].hiddenCards[1],  null)

         //   this.itemAsRectangle(this.seats[i].shownCards[0], "#00FFFF")
          //  this.itemAsRectangle(this.seats[i].shownCards[1], "#00FFFF")
            this.addItemText(this.seats[i].shownCards[0],'','12px ' + self.permanentPreferences.defaultFontType.value,'#000000')
            this.addItemText(this.seats[i].shownCards[1],'','12px ' + self.permanentPreferences.defaultFontType.value,'#000000')
            //player name
            this.addItemText(this.seats[i].playerName,'','11px ' + self.permanentPreferences.defaultFontType.value,'#FFFFFF' )
            //player's status
            this.addItemText(this.seats[i].status,'','11px ' + self.permanentPreferences.defaultFontType.value,'#FFFFFF' )
            //action
            this.addItemText(this.seats[i].action,'','11px ' + self.permanentPreferences.defaultFontType.value,'#FFFFFF')
            //countdown
            this.addItemText(this.seats[i].countdown,'','11px ' + self.permanentPreferences.defaultFontType.value,'#FFFFFF')
            //winner
             this.addItemText(this.seats[i].winner,'','11px ' + self.permanentPreferences.defaultFontType.value,'#FFFFFF')
        

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

        var betX = upperRightChipX+absoluteDistanceBetweenBetTextAndChipImages
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
        var distanceBetweenChipsY = this.pots[0].secondChip.position.y - this.pots[0].firstChip.position.y
        var upperLeftChipX = this.seats[i].firstChip.position.x
        var upperLeftChipY = this.seats[i].firstChip.position.y - distanceBetweenChipsY*(self.imageData.maxChipsPerColumn-1)

        var betX = upperLeftChipX - betTextWidth - absoluteDistanceBetweenBetTextAndChipImages
        var betY = upperLeftChipY - betTextHeight - absoluteDistanceBetweenBetTextAndChipImages
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
        var betX = bottomRightChipX - betTextWidth
        var betY = bottomRightChipY  + chipDiameter + absoluteDistanceBetweenBetTextAndChipImages 
        //bet size
        this.seats[i].bet = new this.Item(betX,betY,betTextWidth,betTextHeight,self.gameState.zPositionData.chips)
    }

    //add second chip (same for all seats relative to first chip)
    var distanceBetweenChipsY = this.pots[0].secondChip.position.y-this.pots[0].firstChip.position.y
    this.seats[i].secondChip = new this.Item(this.seats[i].firstChip.position.x, this.seats[i].firstChip.position.y+distanceBetweenChipsY,chipDiameter,chipDiameter,self.gameState.zPositionData.chips)
    
    // bet size text
     this.addItemText(this.seats[i].bet,'', "12px " + self.permanentPreferences.defaultFontType.value, "#FFFFFF", {textAlign:'left'})
     this.seats[i].bet.text.maxWidth = null
   
    if(this.seats[i].dealerButton instanceof this.Item){
     this.itemAsBitmap(this.seats[i].dealerButton, self.permanentPreferences.sourceObjects.value.dealerButton)
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
 self.images.seats[i].chat.text = new createjs.Text('', chatBoxFontSize+ 'px ' + self.permanentPreferences.defaultFontType.value, self.permanentPreferences.chatTextColor.value)
self.images.seats[i].chat.text.x=self.images.seats[i].chat.position.x +  self.images.seats[i].chat.size.x/2 
 self.images.seats[i].chat.text.y= self.images.seats[i].chat.position.y
 self.images.seats[i].chat.text.baseline = 'top'
 self.images.seats[i].chat.text.textAlign = 'center'
 self.images.seats[i].chat.text.lineWidth =   self.images.seats[i].chat.size.x*.85

 // self.images.seats[i].chat.text.lineHeight = chatBoxFontSize+1
 // self.images.seats[i].chat.text.maxWidth = self.images.seats[i].chat.size.x*.85



 })

//assing seatObjectAncestor to all Items in self.images.seats
 _.each(_.range(this.seats.length), function(seatNumber) {
_.each(self.images.seats[seatNumber], function(value, index, element){
  
  //check if array if array we iterate through that 
if(_.isArray(self.images.seats[seatNumber][index])){
  //iterate through self.images.seats[seatNumber][index]
for(var i = 0;i<self.images.seats[seatNumber][index].length;i++){
  self.images.seats[seatNumber][index][i].seatObjectAncestor = self.images.seats[seatNumber]}

}//if index is array

//if object
else if(_.isObject(self.images.seats[seatNumber][index])){
self.images.seats[seatNumber][index].seatObjectAncestor = self.images.seats[seatNumber]}//if object


})//iteration through self.images.seats[seatNumber]

})//iteration through self.images.seats

 //============================END OF SEATS ARRAY DECLARATION===============


var actionButtonOffsetBottom = 8
var actionButtonY = canvasHeight-actionButtonOffsetBottom - actionButtonHeight
var actionButtonHeight = 24
         //---------------action buttons------------------
         /*
      this.fold = new this.Item(actionButtonLeftX,actionButtonY,actionButtonWidth,actionButtonHeight,self.gameState.zPositionData.button, {messages:['act','fold']})
      this.call = new this.Item(actionButtonLeftX+actionButtonWidth+distanceBetweenActionButtons,actionButtonY,actionButtonWidth,actionButtonHeight,self.gameState.zPositionData.button, {messages:['act','call']})
      this.check = new this.Item(actionButtonLeftX+actionButtonWidth+distanceBetweenActionButtons,actionButtonY,actionButtonWidth,actionButtonHeight,self.gameState.zPositionData.button, {messages:['act','check']})
      this.raise = new this.Item(this.check.position.x +actionButtonWidth+distanceBetweenActionButtons,actionButtonY,actionButtonWidth,actionButtonHeight,self.gameState.zPositionData.button,{messages:['act','raise']})
      this.bet = new this.Item(this.check.position.x +actionButtonWidth+distanceBetweenActionButtons,actionButtonY,actionButtonWidth,actionButtonHeight,self.gameState.zPositionData.button,{messages: ['act','bet']})
*/
   this.fold = new this.Item(actionButtonLeftX,actionButtonY,actionButtonWidth,actionButtonHeight,self.gameState.zPositionData.button, {messages:['act','fold']})
      this.call = new this.Item(actionButtonLeftX+actionButtonWidth+distanceBetweenActionButtons,actionButtonY,actionButtonWidth,actionButtonHeight,self.gameState.zPositionData.button, {messages:['act','call']})
      this.check = new this.Item(actionButtonLeftX+actionButtonWidth+distanceBetweenActionButtons,actionButtonY,actionButtonWidth,actionButtonHeight,self.gameState.zPositionData.button, {messages:['act','check']})
      this.raise = new this.Item(this.check.position.x +actionButtonWidth+distanceBetweenActionButtons,actionButtonY,actionButtonWidth,actionButtonHeight,self.gameState.zPositionData.button,{messages:['act','raise']})
      this.bet = new this.Item(this.check.position.x +actionButtonWidth+distanceBetweenActionButtons,actionButtonY,actionButtonWidth,actionButtonHeight,self.gameState.zPositionData.button,{messages: ['act','bet']})


        this.itemAsRectangle(this.fold,  'red')
        this.addItemText(this.fold, 'fold','12px ' + self.permanentPreferences.defaultFontType.value,'#000000')
        this.itemAsRectangle(this.call, 'red')
        this.addItemText(this.call, 'call','12px ' + self.permanentPreferences.defaultFontType.value,'#000000')
        this.itemAsRectangle(this.check, 'red')
        this.addItemText(this.check, 'check','12px ' + self.permanentPreferences.defaultFontType.value,'#000000')
        this.itemAsRectangle(this.raise, 'red')
        this.addItemText(this.raise, 'raise', '12px ' + self.permanentPreferences.defaultFontType.value,'#000000')
        this.itemAsRectangle(this.bet, 'red')
        this.addItemText(this.bet, 'bet','12px ' + self.permanentPreferences.defaultFontType.value,'#000000')

        this.fold.image.onClick = self.events.onButtonClick
        this.call.image.onClick  = self.events.onButtonClick
        this.check.image.onClick = self.events.onButtonClick
         this.raise.image.onClick  = self.events.onButtonClick
         this.bet.image.onClick  = self.events.onButtonClick
         

        //-----------------bet slider-----------------------------
        /*
              this.betSlider.horizontal = new this.Item (this.fold.position.x,canvasHeight-horizontalBetSliderOffsetBottom-horizontalBetSliderHeight,horizontalBetSliderWidth,horizontalBetSliderHeight,self.gameState.zPositionData.button)
              var verticalY = this.betSlider.horizontal.position.y+this.betSlider.horizontal.size.y/2-verticalBetSliderHeight/2
      this.betSlider.vertical = new this.Item(this.betSlider.horizontal.position.x,verticalY,verticalBetSliderWidth,verticalBetSliderHeight,self.gameState.zPositionData.button)
var betSizeX = this.betSlider.horizontal.position.x+this.betSlider.horizontal.size.x + distanceBetweenBetSizeAndHorizontalSlider
var betSizeY = this.betSlider.horizontal.position.y+this.betSlider.horizontal.size.y/2-betSizeHeight/2
      this.betSlider.betSize = new this.Item(betSizeX,betSizeY,betSizeWidth,betSizeHeight,self.gameState.zPositionData.button)
*/

var betSliderX = this.bet.position.x + this.bet.size.x + distanceBetweenActionButtons
var betSliderMiddleY = actionButtonY + actionButtonHeight/2
   this.betSlider.horizontal = new this.Item (betSliderX,betSliderMiddleY-horizontalBetSliderHeight/2,horizontalBetSliderWidth,horizontalBetSliderHeight,self.gameState.zPositionData.button)
              var verticalY = this.betSlider.horizontal.position.y+this.betSlider.horizontal.size.y/2-verticalBetSliderHeight/2
      this.betSlider.vertical = new this.Item(this.betSlider.horizontal.position.x,verticalY,verticalBetSliderWidth,verticalBetSliderHeight,self.gameState.zPositionData.button)
var betSizeX = this.betSlider.horizontal.position.x+this.betSlider.horizontal.size.x + distanceBetweenBetSizeAndHorizontalSlider
var betSizeY = this.betSlider.horizontal.position.y+this.betSlider.horizontal.size.y/2-betSizeHeight/2
      this.betSlider.betSize = new this.Item(betSizeX,betSizeY,betSizeWidth,betSizeHeight,self.gameState.zPositionData.button)


      this.itemAsBitmap(this.betSlider.horizontal, self.permanentPreferences.sourceObjects.value.horizontalSlider)
        this.itemAsBitmap(this.betSlider.vertical, self.permanentPreferences.sourceObjects.value.verticalSlider)
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

 $('#betSizeDiv').bind('mousewheel', function(event,delta, deltaX, deltaY) {
//console.log(event, delta, deltaX, deltaY)
//wheelScrolls = event.originalEvent.wheelDelta/120
self.events.wheelScroll(deltaY)
        })



$('#betSize').css({
 'position' :  'absolute',
 'left'  : this.betSlider.betSize.position.x + 'px',
'top'  : this.betSlider.betSize.position.y + 'px',
'width' : this.betSlider.betSize.size.x + 'px',
'height' : this.betSlider.betSize.size.y +'px',
'padding': '0px',
'margin':'0px'
})





       

 this.cashierButton = new this.Item(canvasWidth-80,0, cashierButtonWidth, cashierButtonHeight, self.gameState.zPositionData.button)
  
  var cashierButtonSpriteData = {

     images: [self.permanentPreferences.sourceObjects.value.cashierButtonSprite],
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
           this.itemAsBitmap(this.standUp, self.permanentPreferences.sourceObjects.value.standUp)
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
 this.itemAsBitmap(this.getChips, getChipsSource)


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
var exitTableOffsetY = distanceBetweenUpperButtonHitAreasY - exitTableHitAreaTopOffset - standUpHitAreaBottomOffset

 this.exitTable = new this.Item(canvasWidth - exitTableWidth, standUpHeight, exitTableWidth, exitTableHeight, self.gameState.zPositionData.button)
   this.itemAsBitmap(this.exitTable, self.permanentPreferences.sourceObjects.value.exitTable)
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
this.addItemText(this.sitIn,'Deal Me In','10px ' + self.permanentPreferences.defaultFontType.value,'white')

 this.itemAsRectangle(this.rebuy,'black')
this.addItemText(this.rebuy,'Get Chips','10px ' + self.permanentPreferences.defaultFontType.value,'white')
this.sitIn.image.onClick = self.events.onButtonClick
this.rebuy.image.onClick  = self.events.onButtonClick

//-------------------------currency display--------------------------
var currencyDisplayX = canvasWidth/2 - currencyDisplayWidth/2

this.currencyDisplay = new this.Item(currencyDisplayX, currencyDisplayTopOffset, currencyDisplayWidth, currencyDisplayHeight, self.gameState.zPositionData.background)
this.addItemText(this.currencyDisplay, '', currencyDisplaySizeAndFont, currencyDisplayColor)
//========================4 color deck sprite sheet=============================

var fourColorDeckData = {

     images: [self.permanentPreferences.sourceObjects.value.fourColorDeck],
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
        self.images.itemAsBitmap(self.images.messageBox[messageBoxImageContainerIndex].window, self.permanentPreferences.sourceObjects.value.messageBoxBackground)
        
    //add closeX Image
         self.images.messageBox[messageBoxImageContainerIndex].closeWindow =  new self.images.Item (0, 0,0,0,{stage:messageBoxStageNumber, container: messageBoxImageContainerIndex}) 
       self.images.itemAsBitmap(self.images.messageBox[messageBoxImageContainerIndex].closeWindow, self.permanentPreferences.sourceObjects.value.messageBoxCloseX)
       
}
//hide messageBoxCanvas
$(self.arrayOfParentsOfStageAndOfContainerArray[ this.messageBox[0].window.position.z.stage].stage.canvas).css('display','none')

//table image

this.table = new this.Item(tableX,tableY, canvasWidth,canvasHeight, self.gameState.zPositionData.table)
this.itemAsBitmap(this.table, self.permanentPreferences.sourceObjects.value.table)


//======================CASHIER=======================================
self.images.createCashier = function(){
 var cashierImageContainerIndex = self.gameState.zPositionData.cashier.container
var cashierStageNumber = self.gameState.zPositionData.cashier.stage
var cashierWindowContainer = 0
 //declare size variables

    var cashierWindowSource = self.permanentPreferences.sourceObjects.value.cashierBackground
            var cashierWindowWidth = cashierWindowSource.width //    var cashierWindowWidth = 298
             var cashierWindowHeight = cashierWindowSource.height     //         var cashierWindowHeight = 360
    
  
        
        var textLeftOffset = 13  //distance from left of first column of text of gray cashier area
        var textTopOffset = 4   // distance from top of gray area to first row of text
        var textRightOffset = 136 //distance from left side of second column to right side of gray cashier area

        var textHeight = 13
        var distanceBetweenTextY = 5
        var sizeAndFont = '12px ' + self.permanentPreferences.defaultFontType.value
        var textColor = '#000000'

         var outerTopHeight = 31
        var outerBottomHeight = 8
        var outerSideWidth = 8

        var columns = 2
        var rows = 10

        var cashierWindowX = canvasWidth/2 - cashierWindowWidth/2
        var cashierWindowY = canvasHeight/2 - cashierWindowHeight/2
        
   var closeWindowSource = self.permanentPreferences.sourceObjects.value.cashierCloseX
          var closeWindowWidth = closeWindowSource.width //var closeWindowWidth = 31
        var closeWindowHeight = closeWindowSource.height     //   var closeWindowHeight = 20

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
        var grayBoxOffsetTop = 150 //from inner cashier
        var grayBoxOffsetBottom = 49 //from inner cashier

        this.cashier.window = new this.Item(cashierWindowX,cashierWindowY,cashierWindowWidth,cashierWindowHeight,{stage:cashierStageNumber,container:cashierWindowContainer})
        this.itemAsBitmap(this.cashier.window, self.permanentPreferences.sourceObjects.value.cashierBackground)
        var clickAndDragHitArea = new createjs.Rectangle(this.cashier.window.position.x, this.cashier.window.y, cashierWindowWidth, outerTopHeight)
     //   this.cashier.window.hitArea = clickAndDragHitArea
      this.cashier.window.image.removeAllEventListeners()
     /*    this.cashier.window.image.onMouseDown = function(e){
          var options = {animationTarget:self.images.cashier}
                  self.event.mouseDownClickAndDrag(e,options)
                }
                */

          this.cashier.window.image.addEventListener('mousedown',function(e){
          var options = {animationTarget:self.images.cashier}
                  self.events.mouseDownClickAndDrag(e,options)
                }
                )
   
  
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



           //customize radio buttons
           $("#cashier input[type='radio']").css({
               'background':'rgb(233,233,233)',
    'background-image':'img/radio_button_bg.jpg',
    'background-repeat': 'repeat',
    '-webkit-backface-visibility': 'hidden'
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


        //use jquery to position divs to appropriate locations
   $('#cashierDiv').css({
    'z-index': parseInt(cashierStageCanvasZIndex)+1,
    'width': cashierParentOfStage.stage.canvas.width,
     'height': cashierParentOfStage.stage.canvas.height,
     'left':0,
     'top':0,
  //   'visibility':'hidden',
  //   'overflow':'hidden'
       })//cashierDiv css

    //  $('#cashierDiv').prop('pointer-events','none')

        //use jquery to set appropriate sizes of text boxes
       $("#cashier input[type='text']").css('width', textBoxWidth+'px')
       $("#cashier input[type='text']").css('height', textBoxHeight+'px')


      //set text size and font
        $("#cashier").children().children().css({
            'font':sizeAndFont
           })


           //set width of text
 $("#cashier p").css({
     'max-width': htmlTextWidth+'px',
     'height': textBoxHeight+'px',
     'white-space': 'nowrap'

     })


//assign item
this.cashier.maxRadio = new this.Item(radioX, maxRadioY, radioWidth, radioHeight, {stage:cashierStageNumber,container:  cashierImageContainerIndex})
this.cashier.maxRadio.image = $('#maxRadio')[0]
//position max radio
     $('#maxRadio').css('left', radioX+'px')
       $('#maxRadio').css('top', maxRadioY+'px')
      
      //assign item
this.cashier.maxText = new this.Item(textX, maxRadioY, htmlTextWidth, textBoxHeight, {stage:cashierStageNumber,container:  cashierImageContainerIndex})
this.cashier.maxText.image = $('#maxText')[0] 
       //position max text 
         $('#maxText').css('left', textX+'px')
       $('#maxText').css('top', maxRadioY+'px')

      //assign item
this.cashier.maxAmount = new this.Item(textBoxX, maxTextBoxY, textBoxWidth, textBoxHeight, {stage:cashierStageNumber,container:  cashierImageContainerIndex})
this.cashier.maxAmount.image = $('#maxAmount')[0] 
        //position max textbox
                $('#maxAmount').css('left', textBoxX+'px')
        $('#maxAmount').css('top', maxTextBoxY+'px')

        var otherTextBoxY = maxTextBoxY + textBoxHeight + distanceBetweenTextBoxY
        var otherRadioY = otherTextBoxY + textBoxHeight/2 - radioHeight/2

//assign item
this.cashier.otherAmountRadio = new this.Item(radioX, otherRadioY, radioWidth, radioHeight, {stage:cashierStageNumber,container:  cashierImageContainerIndex})
this.cashier.otherAmountRadio.image = $('#otherAmountRadio')[0]
        //position other amount radio
         $('#otherAmountRadio').css('left', radioX+'px')
        $('#otherAmountRadio').css('top', otherRadioY+'px')

            //assign item
this.cashier.otherAmountText = new this.Item(textX, otherRadioY, htmlTextWidth, textBoxHeight, {stage:cashierStageNumber,container:  cashierImageContainerIndex})
this.cashier.otherAmountText.image = $('#otherAmountText')[0] 
         //position other amount text
         $('#otherAmountText').css('left', textX+'px')
       $('#otherAmountText').css('top', otherRadioY+'px')
       
       //assign item
this.cashier.otherAmount = new this.Item(textBoxX, otherTextBoxY, textBoxWidth, textBoxHeight, {stage:cashierStageNumber,container:  cashierImageContainerIndex})
this.cashier.otherAmount.image = $('#otherAmount')[0] 
        //position other amount textbox
                $('#otherAmount').css('left', textBoxX+'px')
        $('#otherAmount').css('top', otherTextBoxY+'px')

         var autoRebuyTextBoxY = otherTextBoxY + textBoxHeight + distanceBetweenTextBoxY
        var autoRebuyRadioY = autoRebuyTextBoxY + textBoxHeight/2 - radioHeight/2

//assign item
this.cashier.autoRebuyRadio = new this.Item(radioX, autoRebuyRadioY, radioWidth, radioHeight, {stage:cashierStageNumber,container:  cashierImageContainerIndex})
this.cashier.autoRebuyRadio.image = $('#autoRebuyRadio')[0]
        //position autorebuy radio
         $('#autoRebuyRadio').css('left', radioX+'px')
        $('#autoRebuyRadio').css('top', autoRebuyRadioY+'px')

            //assign item
this.cashier.autoRebuyText = new this.Item(textX, autoRebuyRadioY, htmlTextWidth, textBoxHeight, {stage:cashierStageNumber,container:  cashierImageContainerIndex})
this.cashier.autoRebuyText.image = $('#autoRebuyText')[0] 
         //position autorebuyText
         $('#autoRebuyText').css('left', textX+'px')
       $('#autoRebuyText').css('top', autoRebuyRadioY+'px')
        
               //assign item
this.cashier.autoRebuyAmount = new this.Item(textBoxX, autoRebuyTextBoxY, textBoxWidth, textBoxHeight, {stage:cashierStageNumber,container:  cashierImageContainerIndex})
this.cashier.autoRebuyAmount.image = $('#autoRebuyAmount')[0] 
        //postion autorebuy textbox
                $('#autoRebuyAmount').css('left', textBoxX+'px')
        $('#autoRebuyAmount').css('top', autoRebuyTextBoxY+'px')



//click events

    $("#otherAmountDiv").children().unbind()
    $("#otherAmountDiv").children().mousedown(function(event) {
      self.events.cashierInputSelected(event)
        })

$("#autoRebuyDiv").children().unbind()
            $("#autoRebuyDiv").children().mousedown(function(event) {
                 self.events.cashierInputSelected(event)
        })

        $("#maxDiv").children().unbind()
          $("#maxDiv").children().mousedown(function(event) {
self.events.cashierInputSelected(event)
        })

          $('#cashierDiv').find("input[type = 'text']").unbind()
          $('#cashierDiv').find("input[type = 'text']").focus(function(event){
            self.events.onCashierTextFieldFocus(event)
          })


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

var addChipsText = 'add chips'
var cancelText = 'cancel'
var cashierButtonTextSizeAndFont = '13px ' + self.permanentPreferences.defaultFontType.value
var cashierButtonHeight = 21
var cashierButtonTextColor = 'white'
var cashierButtonColor = 'blue'
var cashierRatioOfTextWidthToButtonWidth = 0.83
//var cashierWindowYOffsetFromInnerCashier = 15 //calculated using middle of bottom of grayox and bottom of innercahiser
var distanceBetweenCashierButtons = innerCashierWidth / 5.4

//calculate button width
var addChipsWidth = self.getStringWidth(addChipsText, cashierButtonTextSizeAndFont)/cashierRatioOfTextWidthToButtonWidth
var cancelWidth = self.getStringWidth(cancelText, cashierButtonTextSizeAndFont)/cashierRatioOfTextWidthToButtonWidth
if (addChipsWidth>=cancelWidth){
var cashierButtonWidth= addChipsWidth}
else{var cashierButtonWidth=cancelWidth} 

var addChipsX =  cashierWindowX  + cashierWindowWidth/2 - distanceBetweenCashierButtons/2 - cashierButtonWidth
var cancelX = cashierWindowX  + cashierWindowWidth/2 + distanceBetweenCashierButtons/2

var innerCashierBottomY = innerCashierY + innerCashierHeight
var cashierButtonY = innerCashierBottomY - grayBoxOffsetBottom/2 - cashierButtonHeight/2


     this.cashier.addChipsTextBox = new this.Item (textX,this.cashier.accountBalance.position.y +25, innerCashierWidth,25,{stage:cashierStageNumber, container:cashierImageContainerIndex})

      this.cashier.addChips =  new this.Item (addChipsX,cashierButtonY, cashierButtonWidth,cashierButtonHeight,{stage:cashierStageNumber, container:cashierImageContainerIndex}) 
        this.itemAsRectangle( this.cashier.addChips, cashierButtonColor)
        this.addItemText( this.cashier.addChips, addChipsText,cashierButtonTextSizeAndFont , cashierButtonTextColor)
        this.cashier.addChips.image.onClick = self.events.onAddChipsClick

        this.cashier.cancel =  new this.Item (cancelX,cashierButtonY, cashierButtonWidth,cashierButtonHeight,{stage:cashierStageNumber, container:cashierImageContainerIndex}) 
        this.itemAsRectangle( this.cashier.cancel, cashierButtonColor)
        this.addItemText( this.cashier.cancel, cancelText, cashierButtonTextSizeAndFont, cashierButtonTextColor)
        this.cashier.cancel.image.onClick = self.hideCashier

         this.cashier.closeWindow =  new this.Item (closeWindowX,closeWindowY, closeWindowWidth,closeWindowHeight,{stage:cashierStageNumber, container:cashierImageContainerIndex}) 
       this.itemAsBitmap(this.cashier.closeWindow, self.permanentPreferences.sourceObjects.value.cashierCloseX)
       this.cashier.closeWindow.image.onClick = self.hideCashier

      }

      self.images.createCashier()


   // =============================================SOUNDS========================================
 
//showTableChatFull button
var showTableChatFullOffsetY = distanceBetweenUpperButtonHitAreasY - showTableChatFullHitAreaOffsetTop - getChipsHitAreaBottomOffset

this.showTableChatFull = new this.Item(this.getChips.position.x, this.getChips.position.y+this.getChips.size.y+showTableChatFullOffsetY, showTableChatFullWidth, showTableChatFullHeight, self.gameState.zPositionData.button )
this.itemAsBitmap(this.showTableChatFull, showTableChatFullSource)
this.showTableChatFull.image.onClick = self.events.showTableChatFullOnClick

this.hideTableChatFull = new this.Item(this.getChips.position.x, this.getChips.position.y+this.getChips.size.y+showTableChatFullOffsetY, showTableChatFullWidth, showTableChatFullHeight, self.gameState.zPositionData.button )
this.itemAsBitmap(this.hideTableChatFull, self.permanentPreferences.sourceObjects.value.hideTableChatFull)
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
this.itemAsBitmap(this.tableChatFull.hideDealerMessages, self.permanentPreferences.sourceObjects.value.checkBox)
self.images.addCheckBoxButtonText(this.tableChatFull.hideDealerMessages, 'Hide dealer messages')
this.tableChatFull.hideDealerMessages.image.onClick = self.events.hideDealerMessagesClicked

this.tableChatFull.hideDealerMessagesOn = new this.Item(hideDealerMessagesOffsetLeft, this.tableChatFull.hideDealerMessages.position.y, this.tableChatFull.hideDealerMessages.size.x, checkBoxButtonHeight,self.gameState.zPositionData.tableChatFullText)
this.itemAsBitmap(this.tableChatFull.hideDealerMessagesOn, self.permanentPreferences.sourceObjects.value.checkBoxChecked)
self.images.addCheckBoxButtonText(this.tableChatFull.hideDealerMessagesOn, 'Hide dealer messages')
this.tableChatFull.hideDealerMessagesOn.image.onClick = self.events.hideDealerMessagesOnClicked

this.tableChatFull.hidePlayerMessages = new this.Item(hideDealerMessagesOffsetLeft, hideDealerMessagesOffsetTop*2+checkBoxButtonHeight, this.tableChatFull.hideDealerMessages.size.x, checkBoxButtonHeight,self.gameState.zPositionData.tableChatFullText)
this.itemAsBitmap(this.tableChatFull.hidePlayerMessages, self.permanentPreferences.sourceObjects.value.checkBox)
self.images.addCheckBoxButtonText(this.tableChatFull.hidePlayerMessages, 'Hide player messages')
this.tableChatFull.hidePlayerMessages.image.onClick = self.events.hidePlayerMessagesClicked

this.tableChatFull.hidePlayerMessagesOn = new this.Item(hideDealerMessagesOffsetLeft, this.tableChatFull.hidePlayerMessages.position.y, this.tableChatFull.hideDealerMessages.size.x, checkBoxButtonHeight,self.gameState.zPositionData.tableChatFullText)
this.itemAsBitmap(this.tableChatFull.hidePlayerMessagesOn, self.permanentPreferences.sourceObjects.value.checkBoxChecked)
self.images.addCheckBoxButtonText(this.tableChatFull.hidePlayerMessagesOn, 'Hide player messages')
this.tableChatFull.hidePlayerMessagesOn.image.onClick = self.events.hidePlayerMessagesOnClicked

this.tableChatFull.hideObserverMessages = new this.Item(hideDealerMessagesOffsetLeft, checkBoxButtonDistanceY*3+checkBoxButtonHeight*2, this.tableChatFull.hideDealerMessages.size.x, checkBoxButtonHeight,self.gameState.zPositionData.tableChatFullText)
this.itemAsBitmap(this.tableChatFull.hideObserverMessages, self.permanentPreferences.sourceObjects.value.checkBox)
self.images.addCheckBoxButtonText(this.tableChatFull.hideObserverMessages, 'Hide observer messages')
this.tableChatFull.hideObserverMessages.image.onClick = self.events.hideObserverMessagesClicked

this.tableChatFull.hideObserverMessagesOn = new this.Item(hideDealerMessagesOffsetLeft, this.tableChatFull.hideObserverMessages.position.y, this.tableChatFull.hideDealerMessages.size.x, checkBoxButtonHeight,self.gameState.zPositionData.tableChatFullText)
this.itemAsBitmap(this.tableChatFull.hideObserverMessagesOn, self.permanentPreferences.sourceObjects.value.checkBoxChecked)
self.images.addCheckBoxButtonText(this.tableChatFull.hideObserverMessagesOn, 'Hide observer messages')
this.tableChatFull.hideObserverMessagesOn.image.onClick = self.events.hideObserverMessagesOnClicked



var longestLeftSideCheckBoxAndTextItemWidth = this.tableChatFull.hideObserverMessages.size.x
if(this.tableChatFull.hidePlayerMessages.size.x > longestLeftSideCheckBoxAndTextItemWidth){longestLeftSideCheckBoxAndTextItemWidth = this.tableChatFull.hidePlayerMessages.size.x }
if(this.tableChatFull.hideDealerMessages.size.x > longestLeftSideCheckBoxAndTextItemWidth){longestLeftSideCheckBoxAndTextItemWidth = this.tableChatFull.hidePlayerMessages.size.x }

var rightSideCheckBoxX = this.tableChatFull.hideDealerMessages.position.x + longestLeftSideCheckBoxAndTextItemWidth + hideDealerMessagesOffsetRight
var rightSideCheckBoxY = this.tableChatFull.hideDealerMessages.position.y

this.tableChatFull.disableTouchScroll = new this.Item(rightSideCheckBoxX, rightSideCheckBoxY, 0, checkBoxButtonHeight,self.gameState.zPositionData.tableChatFullText)
this.itemAsBitmap(this.tableChatFull.disableTouchScroll, self.permanentPreferences.sourceObjects.value.checkBox)
self.images.addCheckBoxButtonText(this.tableChatFull.disableTouchScroll, 'Disable touch scroll')
this.tableChatFull.disableTouchScroll.image.onClick = self.events.disableTouchScrollClicked

this.tableChatFull.disableTouchScrollOn = new this.Item(this.tableChatFull.disableTouchScroll.position.x, this.tableChatFull.disableTouchScroll.position.y, this.tableChatFull.disableTouchScroll.size.x, checkBoxButtonHeight,self.gameState.zPositionData.tableChatFullText)
this.itemAsBitmap(this.tableChatFull.disableTouchScrollOn, self.permanentPreferences.sourceObjects.value.checkBoxChecked)
self.images.addCheckBoxButtonText(this.tableChatFull.disableTouchScrollOn, 'Disable touch scroll')
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
var chatMessageFont = 'Lucida Sans'
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


   this.reportBug.text = new createjs.Text('click to report bugs via email to: CryptoPoker@gmail.com', '13px ' + self.permanentPreferences.defaultFontType.value ,'white')
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

//create faux chip array
for (var i = 0 ; i <  this.seats.length; i++) {
  self.displayChipStack ( 99999999999999, this.seats[i], {hidden:true,chipArrayName:'referenceChips'})
}

self.createPreactionOptionItems()

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
 self.arrayOfParentsOfStageAndOfContainerArray[stageNumber].stage.mouseMoveOutside = true
self.arrayOfParentsOfStageAndOfContainerArray[stageNumber].stage.tickOnUpdate = false

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

if(stageOptions.disableContextMenu = true){

$(self.arrayOfParentsOfStageAndOfContainerArray[stageNumber].stage.canvas).on('contextmenu', function(e){e.preventDefault()})

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
var canvasWidth = $('#iframeSize')[0].width
var canvasHeight = $('#iframeSize')[0].height
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
 // console.log(stageData)
_.each(_.range (stageData.length), function(stageIteration){

 self.createStage (stageData[stageIteration])

})

}


        this.setBackground = function(){    
          var canvasHeight = this.arrayOfParentsOfStageAndOfContainerArray[this.gameState.zPositionData.background.stage].stage.canvas.height
          var canvasWidth = this.arrayOfParentsOfStageAndOfContainerArray[this.gameState.zPositionData.background.stage].stage.canvas.width
        this.images.background = new this.images.Item(0,0,canvasWidth,canvasHeight,this.gameState.zPositionData.background)
        this.images.itemAsBitmap(this.images.background, self.permanentPreferences.sourceObjects.value.background)
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


event.target.parentOfImageObject.messages.push('sit',event.target.parentOfImageObject.seatObjectAncestor.rotatedSeatNumber)
          self.events.onButtonClick(event)
        }//openSeat.image.onClick event
        }


    //    self.stage.onPress = self.events.onStagePress

    }

    this.images.setDefaultMessages = function(){
        
    }
    
    this.createAllItems = function(){

//self.sessionPreferences.displaySize.updateValue(self.sessionPreferences.displaySize.value)

      this.updatePreference(this.sessionPreferences, this.sessionPreferences,{updateEqualValues:true})
        this.setBackground()
        this.images.setDefaults()

     this.receiveTableState()


       this.images.setDefaultEvents()
       this.images.setDefaultMessages()
       this.gameState.itemsCreated = true
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
    this.playerPutsChipsInPot =function(seatNumber, betSize, stackSize, options){
        if(!options){var options = {}}
          var update = options.update
        options.update = false
        options.displayChipStackSize = true
        var stagesToUpdate = []
  self.gameState.seats[seatNumber].inHand = true

stagesToUpdate.push(  this.displayChipStack(betSize, this.images.seats[seatNumber], options ) )

//ASSIGN BETSIZE

/*
        if(parseFloat(betSize)>0){
          if(parseFloat(this.images.seats[seatNumber].bet.text.text) !== parseFloat(betSize)){//check to make sure changed
         this.images.seats[seatNumber].bet.text.text = betSize
      stagesToUpdate.push(   this.itemChanged(this.images.seats[seatNumber].bet) )
}//check to make sure changed
stagesToUpdate.push( this.displayChildren(this.images.seats[seatNumber].bet, options))
       }
        else{
betSize = ''
          if(this.images.seats[seatNumber].bet.text.text !== ''){//check to make sure changed
         this.images.seats[seatNumber].bet.text.text = betSize
      stagesToUpdate.push(   this.itemChanged(this.images.seats[seatNumber].bet) )
}//check to make sure changed

 stagesToUpdate.push(this.hideChildren(this.images.seats[seatNumber].bet, options))
       }
*/




        if(!_.isNull(stackSize) && !_.isUndefined(stackSize) && stackSize <=0 ){stackSize = 'All In'}
        //change betsize graphic value
          if(this.images.seats[seatNumber].status.text.text !== stackSize){//check to make sure changed
         this.images.seats[seatNumber].status.text.text = stackSize
   stagesToUpdate.push(      this.itemChanged(this.images.seats[seatNumber].bet) )
}//check to make ure changed
         


options.update = update
          if(update !== false){ 
this.updateStages(stagesToUpdate)
          }
else{ return stagesToUpdate}

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

//create copy for popup animation after player folds
this.createHoleCardCopyIfNeeded = function (playerNumber) {
console.log('createholecardcopyif needed called for player: '+playerNumber+' user is number '+self.gameState.userSeatNumber)
console.log(self.gameState.holeCards)

var popupAlpha = 0.6

if(_.isArray(self.gameState.seats[playerNumber].hand.holeCardsPopupAnimation)  ){
  self.gameState.seats[playerNumber].hand.holeCardsPopupAnimation.length = 0}
  else{
self.gameState.seats[playerNumber].hand.holeCardsPopupAnimation = []}

var animationArray = self.gameState.seats[playerNumber].hand.holeCardsPopupAnimation
var holeCardArray = this.images.seats[playerNumber].shownCards
var shouldCopyHoleCards = false
var holeCardSources = []

//if player = user
if(self.gameState.userSeatNumber === playerNumber
 && _.isArray(self.gameState.holeCards)
 && self.gameState.holeCards.length>0){
  console.log('creating user hole card copy')
shouldCopyHoleCards = true
holeCardSources = self.gameState.holeCards
}//if user

else if (shouldCopyHoleCards === false) {//if not user
console.log('checking to see if we should create hole card copy for non-user, or user that loaded late')
//check whether we should create hole cards or not

for(var i = 0;i<holeCardArray.length;i++){//iterate through hole cards check if visible

 if(self.isItemAddedToStage(holeCardArray[i]) !== true){
console.log('card '+i+'is not added to stage')
  shouldCopyHoleCards = false}
  else{
      holeCardSources[i] = holeCardArray[i].image.imageSource
  }
}//iterate through hole cards check if visible
}//if not user

console.log('copy hole cards is '+ shouldCopyHoleCards)
//if not displaying then return false
if(shouldCopyHoleCards !== true){return false}

//copy the holecards
for(var i = 0;i<holeCardArray.length;i++){

animationArray[i] = new this.images.Item(0,0,0,0,{stage:0,container:0})
self.images.cardAsBitmap( animationArray[i], holeCardSources[i])
self.setItemLocationsInItemAEqualToOnesInItemB(animationArray[i], holeCardArray[i])

  animationArray[i].image.y  = this.images.seats[playerNumber].seat.position.y
animationArray[i].image.alpha = popupAlpha

var options = {
  seatNum:playerNumber,
  seatObject:self.images.seats[playerNumber]
}
  animationArray[i].image.onMouseOver =function(event){
    console.log('animatedCard moused OVER')
  //  self.events.seatMouseEvent(event, options)
   self.images.seats[playerNumber].seat.image.onMouseOver(event, options)}
    animationArray[i].image.onMouseOut = function(event){
  console.log('animatedCard moused OUT')
      self.images.seats[playerNumber].seat.image.onMouseOut(event, options)
}

if(animationArray[i].text){
  animationArray[i].text.y  =( this.images.seats[playerNumber].seat.text.y - this.images.seats[playerNumber].seat.image.y) + this.images.seats[playerNumber].seat.position.y
animationArray[i].text.alpha  = popupAlpha }

}
self.hideChildren(animationArray)
//console.log('hole cards copied of player '+ playerNumber)
//console.log(animationArray)

}


    this.displayTableChatBox = function (){
self.jQueryObjects.chatBoxInput.css({
 'display'   : 'inline'
})
    }

this.activateTicker = function(FPS,onTick){
if(!_.isNumber(FPS)){var FPS = 15}
createjs.Ticker.setFPS(FPS)
  createjs.Ticker.addEventListener('tick', handleTick)

 function handleTick(event) {
     // Actions carried out each frame
     if(_.isFunction(onTick)){
      onTick()}
   //  console.log(event)
     if (!event.paused) {
         // Actions carried out when the Ticker is not pfaused.
       //  self.updateStages(null, {forceUpdate:true})
       self.updateStages()
     }
 }

}

this.disableTicker = function(){

createjs.Ticker.setFPS(12)
  createjs.Ticker.removeEventListener('tick')

 function handleTick(event) {
     // Actions carried out each frame
     if(onTick){onTick()}
     console.log(event)
     if (!event.paused) {
         // Actions carried out when the Ticker is not paused.
         self.updateStages()
     }
 }

}




    this.positionItemImage = function (item, options) {
if(!options){var options = {}}
  var stagesToUpdate = []

if(_.isObject(item.image)){
  item.image.x = item.position.x
  item.image.y = item.position.y
}



stagesToUpdate.push(this.itemChanged(item))

if(options.update !== false){this.updateStages(stagesToUpdate)}
  else{return stagesToUpdate}

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

 this.copyItemLocationData = function(item){
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
/*
if(item instanceof self.images.Item){
  itemCopyWithOnlyLocationData.position = {}
  itemCopyWithOnlyLocationData.size = {}
itemCopyWithOnlyLocationData.position.x = item.position.x
itemCopyWithOnlyLocationData.position.y = item.position.y
itemCopyWithOnlyLocationData.position.z = {}
itemCopyWithOnlyLocationData.position.z.stage = item.position.z.stage
itemCopyWithOnlyLocationData.position.z.container  = item.position.z.container
itemCopyWithOnlyLocationData.size.x = item.size.x
itemCopyWithOnlyLocationData.size.y = item.size.y
}
*/

if(item.size){
itemCopyWithOnlyLocationData.size={}
itemCopyWithOnlyLocationData.size.x = item.size.x
itemCopyWithOnlyLocationData.size.y = item.size.y
}

if(item.position){
itemCopyWithOnlyLocationData.position={}
  itemCopyWithOnlyLocationData.position.x = item.position.x
  itemCopyWithOnlyLocationData.position.y = item.position.y

if(item.position.z){
itemCopyWithOnlyLocationData.position.z={}
itemCopyWithOnlyLocationData.position.z.stage = item.position.z.stage
itemCopyWithOnlyLocationData.position.z.container  = item.position.z.container
}//if item.position.z

}//if item.position




return itemCopyWithOnlyLocationData

}

this.setItemLocationsInItemAEqualToOnesInItemB = function(itemA, itemB){

if(!_.isObject(itemA) || !_.isObject(itemB)){return}

if(itemA.image&&itemB.image){ itemA.image.x = itemB.image.x;itemA.image.y = itemB.image.y}

if(itemA.text&&itemB.text){itemA.text.x = itemB.text.x; itemA.text.y = itemB.text.y}

if(_.isObject(itemB.position)){
  if(!_.isObject(itemA.position)){itemA.position = {}}//make empty object if doesnt exist in itemA
itemA.position.x = itemB.position.x
itemA.position.y = itemB.position.y
//z position
if(_.isObject(itemB.position.z)){
  if(!_.isObject(itemA.position.z)){itemA.position.z = {}}//make empty object if doesnt exist in itemA
    itemA.position.z.stage =  itemB.position.z.stage
   itemA.position.z.container =  itemB.position.z.container
  }//z position
}//position
if(_.isObject(itemB.size)){
  if(!_.isObject(itemA.size)){itemA.size = {}}//make empty object if doesnt exist in itemA
itemA.size.x = itemB.size.x
itemA.size.y = itemB.size.y
}//size
}


this.copySeatObjectItemLocationData = function(seatObject){
 var seatObjectCopy =  {}
this.iterateThroughObjectAndPerformOnAllObjectsOrObjectsInArray(seatObject, function(value, indexes){

//if array do nothing
if(_.isArray(value)){seatObjectCopy[indexes[0]] = [];return}
else{
if (indexes.length === 1){
seatObjectCopy[indexes[0]] = self.copyItemLocationData(value)
}
else if (indexes.length === 2){
  seatObjectCopy[indexes[0]][indexes[1]] = self.copyItemLocationData(value)
}
}

}//performIfObject 
)

/*
  _.each(seatObject, function(value,index,list) {

    if(value instanceof self.images.Item){
seatObjectCopy[index] =  self.copyItemLocationData(value)
}//check if this.images.seats[i][item] is  item

else if (_.isArray(value)){
  //create matching array in temporary stack
seatObjectCopy[index] = []
_.each(_.range(value.length),function(arrayIndex){//iterate through array
  if(value[arrayIndex] instanceof self.images.Item){//make sure its item
  seatObjectCopy[index][arrayIndex] = self.copyItemLocationData(value[arrayIndex])
  }//check to make sure value[arrayIndex] is item
})//iterate through value

}//if is array

  })//end iteration through this.images.seats[i]
   */
return seatObjectCopy
}

this.setSeatObjectLocationsInSeatObjectAEqualToOnesInSeatObjectB = function(seatObjectA, seatObjectB){
this.iterateThroughObjectAndPerformOnAllObjectsOrObjectsInArray(seatObjectB, function(value, indexes){
//if array do nothing
if(_.isArray(value)){
  //make array if it isnt an array already
if(!_.isArray(seatObjectA[indexes[0]]) ){
console.log('seatObjectA with following indexes is not an array');console.log(indexes)
console.log('seatObjectA.index0 value = ');console.log(seatObjectA[indexes[0]])
 seatObjectA[indexes[0]] = [];console.log('created an array in seatObjectA named '+indexes[0]) }
}



else if (indexes.length === 1){
self.setItemLocationsInItemAEqualToOnesInItemB(seatObjectA[indexes[0]], value)
}//if indexes.length == 1
else if (indexes.length === 2){

if(_.isUndefined(seatObjectA[indexes[0]][indexes[1]])){console.log(seatObjectA);console.log(indexes);console.log(value)}

//move the chips to the appropriate point useing our referenceChips array
if(indexes[0] === 'chipReference'){
//if we are copying chip (premade) locations, we want to copy them to actual chip stack in addition to reference
self.setItemLocationsInItemAEqualToOnesInItemB(seatObjectA['chips'][indexes[1]],value )
}//if copying from chipReference arrat

else if(indexes[0] === 'chips'){return} //don't copy actual chip image locations

//"perform normal copy"
   self.setItemLocationsInItemAEqualToOnesInItemB(seatObjectA[indexes[0]][indexes[1]], value)

}//if indexes.length == 2
}//performIfObject 
)
/*
 _.each(seatObjectB, function(value,index,list) {
 // for (var item in this.images.seats[i]) {

if (_.isArray(value)){

_.each(_.range(value.length),function(arrayIndex){//iterate through array
  if(_.isObject(value[arrayIndex])){//make sure its item
self.setItemLocationsInItemAEqualToOnesInItemB(seatObjectA[index][arrayIndex], value[arrayIndex])
  }//check to make sure its item
})//iterate through value

}//if is array

  else  if(_.isObject(value)){
//console.log('coping index of '+i+' which has a rotatedSeatNumber of '+self.images.seats[i].rotatedSeatNumber)
self.setItemLocationsInItemAEqualToOnesInItemB(seatObjectA[index], value)
}//check if this.images.seats[i][item] is really item


  })//end iteration through this.images.seats[i]
*/
}

//performIfObject will be passed parmeters [value, index]
this.iterateThroughObjectAndPerformOnAllObjectsOrObjectsInArray = function(seatObject, performIfObject){

_.each(seatObject, function(value,index,list) {
 // for (var item in this.images.seats[i]) {

if (_.isArray(value)){
performIfObject(value, [index])
_.each(_.range(value.length),function(arrayIndex){//iterate through array
  if(_.isObject(value[arrayIndex])){//make sure its item
performIfObject(value[arrayIndex], [index, arrayIndex])
  }//check to make sure its object
})//iterate through value

}//if is array

  else  if(_.isObject(value)){
performIfObject(value, [index])
}


  })//end iteration through this.images.seats[i]

}

//this functions sets the target number to be displayed as if it were seat 0, if no parameter it will default to display user as seat 0
this.changeUserSeatView = function(seatNumberToRotateTo){
 //console.log('current displayed as seat # '+ this.images.seats[self.gameState.userSeatNumber].rotatedSeatNumber +'changing userseat view to '+seatNumberToRotateTo)
/*if(self.permanentPreferences.changeUserSeatViewTo.value == ['bottom','middle']){}
  else{return 'change view when seated setting is off'}*/

 if(!_.isNumber(seatNumberToRotateTo)){var seatNumberToRotateTo = 0}
if(seatNumberToRotateTo > this.gameState.numSeats){ console.log( 'seatNumber too high to rotate to, invalid');return}

console.log('userseatnumber = '+ self.gameState.userSeatNumber+ ' rotating to seat: '+seatNumberToRotateTo + ' current rotatedSeatNumber of seat0 = ' + self.images.seats[0].rotatedSeatNumber)
// console.log(this.images.seats)

var clockWiseRotationNumberBasedOnUnRotatedPosition
var temporaryArrayOfNonrotatedSeats = []
//make remporary array equal to seats.length
for(var i = 0;i<this.gameState.numSeats;i++){temporaryArrayOfNonrotatedSeats.push({})}
//determine where to seat the user (if seats have been previously rotated)
if(!_.isNumber(self.gameState.userSeatNumber)){clockWiseRotationNumberBasedOnUnRotatedPosition = 0}
     else{clockWiseRotationNumberBasedOnUnRotatedPosition = (this.gameState.numSeats  + seatNumberToRotateTo - self.gameState.userSeatNumber)%this.gameState.numSeats}

//else{clockWiseRotationNumberBasedOnUnRotatedPosition = seatNumberToRotateTo}

if(clockWiseRotationNumberBasedOnUnRotatedPosition === (this.images.seats[0].rotatedSeatNumber + this.gameState.numSeats)%this.gameState.numSeats){
console.log('no rotation, clockWiseRotationNumberBasedOnUnRotatedPosition = '+ clockWiseRotationNumberBasedOnUnRotatedPosition)
  return 'no rotation'}

console.log('clockwise rotation based on unrotated position = '+ clockWiseRotationNumberBasedOnUnRotatedPosition)
 var rotatedSeatNumberArray = []
 var nonRotatedSeatNumberArray = []

for(var i = 0;i<this.gameState.numSeats;i++){
rotatedSeatNumberArray.push (self.images.seats[i].rotatedSeatNumber)
nonRotatedSeatNumberArray.push (self.images.seats[i].nonRotatedSeatNumber)
}//end iteration through this.images.seats
console.log('displaying pre-rotation rotatedSeatNumbers, followed by nonRotatedSeatNumbers')
console.log(rotatedSeatNumberArray)
console.log(nonRotatedSeatNumberArray)
rotatedSeatNumberArray.length = 0
nonRotatedSeatNumberArray.length  = 0
//iterate through seats to get and copy image location data
for(var i = 0;i<this.gameState.numSeats;i++){
temporaryArrayOfNonrotatedSeats[self.images.seats[i].rotatedSeatNumber] = self.copySeatObjectItemLocationData(this.images.seats[i])
}//end iteration through this.images.seats


//console.log(temporaryArrayOfNonrotatedSeats)
//iterate through seats to swap image location data
 // console.log('beginning iteration through this.images.seats')
for(var i = 0;i<this.gameState.numSeats;i++){

this.images.seats[i].rotatedSeatNumber = (i+clockWiseRotationNumberBasedOnUnRotatedPosition)%this.gameState.numSeats

self.setSeatObjectLocationsInSeatObjectAEqualToOnesInSeatObjectB(this.images.seats[i],   temporaryArrayOfNonrotatedSeats[(i+clockWiseRotationNumberBasedOnUnRotatedPosition)%this.gameState.numSeats] )

rotatedSeatNumberArray.push (self.images.seats[i].rotatedSeatNumber)
nonRotatedSeatNumberArray.push (self.images.seats[i].nonRotatedSeatNumber)
}//end iteration through this.images.seats
console.log('current rotatedSeatNumber of seat0 = ' + self.images.seats[0].rotatedSeatNumber)

console.log('displaying post-rotation rotatedSeatNumbers, followed by nonRotatedSeatNumbers')
console.log(rotatedSeatNumberArray)
console.log(nonRotatedSeatNumberArray)


this.updateStages([self.itemChanged(this.images.seats[0].seat)], {forceUpdate:true})
self.hideChildren(self.images.seats[0].seat)
self.displayChildren(self.images.seats[0].seat)
}

    this.setNumberOfSeats = function (numSeats){

//console.log('setting number of seats to '+numSeats)
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
self.images.seats.push( self.images.seats.splice( seatArrayIndex,1)[0])
//self.images.seats.move(seatArrayIndex, 1, self.images.seats.length-1)
/*
console.log(self.images.seats[self.images.seats.length-1].rotatedSeatNumber)
console.log(self.images.seats[self.images.seats.length-1].nonRotatedSeatNumber)
*/
}

        var centerBottomAndTopSeats = function(){
            var totalLength = self.images.seats[0].seat.size.x*3+(self.images.seats[0].seat.position.x - self.images.seats[1].seat.position.x - self.images.seats[1].seat.size.x)*2
            var absoluteDistanceX = (totalLength - self.images.seats[0].seat.size.x*2)/6

self.iterateThroughObjectAndPerformOnAllObjectsOrObjectsInArray(self.images.seats[1], addAbsoluteDistanceX)
self.iterateThroughObjectAndPerformOnAllObjectsOrObjectsInArray(self.images.seats[4], addAbsoluteDistanceX)
absoluteDistanceX = absoluteDistanceX*-1
self.iterateThroughObjectAndPerformOnAllObjectsOrObjectsInArray(self.images.seats[6], addAbsoluteDistanceX)
self.iterateThroughObjectAndPerformOnAllObjectsOrObjectsInArray(self.images.seats[9], addAbsoluteDistanceX)


function addAbsoluteDistanceX (value, indexes){
 if(value instanceof self.images.Item){
                   value.position.x =  value.position.x + absoluteDistanceX
                   if(value.image){value.image.x = value.image.x + absoluteDistanceX}
               if(value.text){value.text.x = value.text.x + absoluteDistanceX}
             }
}




        }//center topAndBottomSeats function

        var centerSeat2And8 = function(){
                          var sideYDistance = (self.images.seats[2].seat.position.y - self.images.seats[3].seat.position.y)/2 

self.iterateThroughObjectAndPerformOnAllObjectsOrObjectsInArray(self.images.seats[2], performIfObject)
self.iterateThroughObjectAndPerformOnAllObjectsOrObjectsInArray(self.images.seats[8], performIfObject)

 function performIfObject (value, indexes){

if(value instanceof self.images.Item){

self.setImageItemPositionAndTextBasedOnImageChange(value, 0, -sideYDistance , {movementType:'relative',permanent:true})
    //               value.position.y =  value.position.y - sideYDistance
 //                  if(value.image){value.image.y = value.position.y }
    //           if(value.text){value.text.y = value.position.y}
             }//if value insance of Item

 }

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
this.imageData.originalSeatLocations.push(this.copySeatObjectItemLocationData(this.images.seats[seatNum]))
}

}//if this is the first seatNumber change we made

//we need to set our location equal to the original
else{ 
  console.log('changing numseats for (atleast), the second time')
  //first  set original seats (that have been taken out due to number of seats changing) back in place

for (var originalSeatNumber = 0;originalSeatNumber<this.images.seats.length;originalSeatNumber++){

//take out original seat and push to end of array
    this.images.seats.push(this.images.seats.splice(this.getSeatImageIndex(originalSeatNumber, 'originalSeatNumber'),1))

}//iterate through this.images.seats.length after increasing originalSeatNumber

//now set data equal to original
for(var seatNum = 0;seatNum<this.images.seats.length;seatNum++){
this.setSeatObjectLocationsInSeatObjectAEqualToOnesInSeatObjectB(this.images.seats[seatNum], this.imageData.originalSeatLocations[seatNum])
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

    this.displayShownCard = function (cardText, parentOfImageObject, options){
        
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
      if(!options){var options = {}}
        var update = options.update
      options.update = false
var stagesToUpdate = []

   stagesToUpdate.push(   this.images.cardAsBitmap(parentOfImageObject,cardText) )
 stagesToUpdate.push( this.displayChildren(parentOfImageObject, options) )
options.update = update
      if(update!== false){self.updateStages(stagesToUpdate) }
     else{ return stagesToUpdate}

    }

        this.displayHoleCards = function (hand,seatNumber, options){
          self.gameState.seats[seatNumber].inHand = true

          if(!options){var options = {}}
            var update  = options.update
          options.update = false
var stagesToUpdate = []

//remove any lingering images
           stagesToUpdate.push(      this.hideChildren(this.images.seats[seatNumber].shownCards[0], options))
       stagesToUpdate.push(            this.hideChildren(this.images.seats[seatNumber].shownCards[1], options))

//display face up cards
  stagesToUpdate.push(        this.displayShownCard(hand[0], this.images.seats[seatNumber].shownCards[0], options))
      stagesToUpdate.push(         this.displayShownCard(hand[1], this.images.seats[seatNumber].shownCards[1], options))

//remove any facedown images
           stagesToUpdate.push(      this.hideChildren(this.images.seats[seatNumber].hiddenCards[0], options))
       stagesToUpdate.push(            this.hideChildren(this.images.seats[seatNumber].hiddenCards[1], options))

     

options.update = update//reset options.update variable
if(options.update !== false){this.updateStages(stagesToUpdate)}
else{return stagesToUpdate}
    }

    this.hideHoleCards = function (seatNumber, options){
//console.log('hide hole cards called')
var itemsToHide = []

itemsToHide.push ( this.images.seats[seatNumber].hiddenCards)
itemsToHide.push ( this.images.seats[seatNumber].shownCards)
itemsToHide = _.flatten(itemsToHide)

     return  this.hideChildren(itemsToHide, options)


    }

    this.itemChanged = function(item){
if(this.isItemAddedToStage(item)){

this.arrayOfParentsOfStageAndOfContainerArray[item.position.z.stage].upToDate = false
return item.position.z.stage
}


    }

//if potsize is number will not display chips
    this.updatePotSize = function (potSize, options){
var stagesToUpdate = []
var newTotalPotSize = false
if(!options){var options = {}}
var update = options.update
options.update = false
var displayChipStackSize = options.displayChipStackSize
options.displayChipStackSize = true

//check if we should hide all pots
if(!potSize||(_.isArray(potSize) && _.isEmpty(_.compact(potSize)))){
  console.log('we are hiding all pots in teh updatePotSize function')
  for(var i  = 0;i<this.images.pots.length;i++){
    this.images.pots[i].potSize.text.text = 0
   stagesToUpdate.push( this.itemChanged(this.images.pots[i].potSize) )
 stagesToUpdate.push(  this.hideChildren(this.images.pots[i].potSize, options))
 stagesToUpdate.push(    this.hideChildren(this.images.pots[i].chips, options))
stagesToUpdate.push(     this.hideChildren(this.images.totalPotSize, options))

  }

}

      //if potNumber is specified, we only update that 1 potSize
     else   if(_.isNumber(options.potNumber)){
        console.log('updating pot size based on one specific pot number')
          if(_.isArray(potSize)){var specificPotSize = potSize[options.potNumber]}
            else{var specificPotSize = potSize}

              if(parseFloat(specificPotSize) != parseFloat(this.images.pots[potNumber].potSize.text.text) ||  self.isItemAddedToStage(this.images.pots[potNumber].potSize) !==  true){
   /*       this.images.pots[potNumber].potSize.text.text  = specificPotSize
          stagesToUpdate.push(this.displayChildren(this.images.pots[potNumber].potSize, options))
        stagesToUpdate.push(  this. itemChanged(this.images.pots[potNumber].potSize))
        */
stagesToUpdate.push(  this.displayChipStack(parseFloat(specificPotSize), this.images.pots[options.potNumber],  options))
    }
   else {console.log('pot '+options.potNumber+'not redrawn because same value')}
            }//if potNumber is specified

//we want to update and display only the total pot
        else if (_.isNumber(potSize)){
//console.log('updating only the total pot size text')
          newTotalPotSize = potSize
        }//if pot size is a number

     else  if(_.isArray(potSize)&&potSize.length>0){
    //    console.log('updating potsize display and there are split pot')
          var aggregatedPotSize = 0
          for(var i = 0;i<potSize.length;i++){

aggregatedPotSize = aggregatedPotSize + parseFloat(potSize[i])
//redraw chipstack ONLY if value is different from before
if(parseFloat(potSize[i]) != parseFloat(this.images.pots[i].potSize.text.text) ||  self.isItemAddedToStage(this.images.pots[i].potSize) !== true){
  console.log('updating pot size '+i+'with value '+ potSize[i])
  /*
 this.images.pots[i].potSize.text.text = potSize[i]
    stagesToUpdate.push(  this.itemChanged(this.images.pots[i].potSize))
    */
stagesToUpdate.push( this.displayChipStack(parseFloat(potSize[i]), self.images.pots[i], options) )
  }//check if value is different
else {console.log('pot '+i+'not redrawn because same value')}

  stagesToUpdate.push( this.displayChildren(this.images.pots[i].potSize, options) )
//   this.displayChildren(this.images.pots[i].chips, options)
 }//end loop throuh potSize array
 //display total PotSize
              newTotalPotSize =   aggregatedPotSize
 }//if potsize is arra longer than 1




/*
====================USE ThIS CODE IF WE WANT TO NOT SHOW ONLY 1 POT SIZE==================

//update pot0 but not display it, and update total pot size
         else if(_.isArray(potSize) && potSize.length == 1){ 
   //       console.log('updating potsize based on array of length 1')
          newTotalPotSize = potSize[0]
             if(parseFloat( this.images.pots[0].potSize.text.text) != newTotalPotSize){
this.images.pots[0].potSize.text.text = newTotalPotSize
 stagesToUpdate.push(  this. itemChanged( this.images.pots[0].potSize))
stagesToUpdate.push( self.displayChipStack(parseFloat(newTotalPotSize), self.images.pots[0], self.images.pots[0].firstChip.position.x, self.images.pots[0].firstChip.position.y, options))
        }
        else{  console.log('pot '+0+'not redrawn because same value')}
        }//if parater is 1 length array
                       

       else  if(_.isArray(potSize)&&potSize.length>1){
    //    console.log('updating potsize display and there are split pot')
          var aggregatedPotSize = 0
          for(var i = 0;i<potSize.length;i++){

aggregatedPotSize = aggregatedPotSize + parseFloat(potSize[i])
//redraw chipstack ONLY if value is different from before
if(parseFloat(potSize[i]) != parseFloat(this.images.pots[i].potSize.text.text)){
  console.log('updating pot size '+i+'with value '+ potSize[i])
 this.images.pots[i].potSize.text.text = potSize[i]
    stagesToUpdate.push(  this.itemChanged(this.images.pots[i].potSize))
stagesToUpdate.push( this.displayChipStack(parseFloat(potSize[i]), self.images.pots[i], self.images.pots[i].firstChip.position.x, self.images.pots[i].firstChip.position.y, options) )
  }//check if value is different
else {console.log('pot '+i+'not redrawn because same value')}

  stagesToUpdate.push( this.displayChildren(this.images.pots[i].potSize, options) )
//   this.displayChildren(this.images.pots[i].chips, options)
 }//end loop throuh potSize array
 //display total PotSize
              newTotalPotSize =   aggregatedPotSize
 }//if potsize is arra longer than 1
 */

 if(_.isNumber(newTotalPotSize)) {
  var newTotalPotSizeText = 'Total: '+newTotalPotSize
  if(newTotalPotSizeText != this.images.totalPotSize.text.text ){
  this.images.totalPotSize.text.text = newTotalPotSizeText
  stagesToUpdate.push(this.itemChanged( this.images.totalPotSize))
    }//if different
          stagesToUpdate.push(   this.displayChildren(this.images.totalPotSize, options) )
       }
         
  options.update = update
options.displayChipStackSize = displayChipStackSize
if(update !== false){
 // console.log('updating alot of stages'+stagesToUpdate)

  this.updateStages(stagesToUpdate)}

else {return stagesToUpdate}
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
    this.displayChipStack = function(chipAmount,parentOfChipArray, originalOptions){
      var totalChipAmount = chipAmount
   //   console.log('displaychipstack function called with chipamount = '+chipAmount)
      chipAmount = parseFloat(chipAmount)
      if(!_.isNumber(chipAmount) || _.isNaN(chipAmount)){console.log('displayChipStack called with invalid chipAmount');return}

      if(!_.isObject(originalOptions)){var options = {}}
else{var options = _.clone(originalOptions)}
        var update = options.update
      options.update = false
      var stagesToUpdate = []

        var defaultOptions = {}
      defaultOptions.chipArrayName = 'chips'

console.log('displaychipStack called, parentOfChipArray is:');console.log(parentOfChipArray)

//default initial x and y
      if(parentOfChipArray.firstChip instanceof this.images.Item){
       defaultOptions.initialX = parentOfChipArray.firstChip.position.x
        defaultOptions.initialY = parentOfChipArray.firstChip.position.y}

//default distance between chip columns
 if(parentOfChipArray.secondColumnChip instanceof this.images.Item && parentOfChipArray.firstChip instanceof this.images.Item){ 
       defaultOptions.distanceBetweenColumns = parentOfChipArray.secondColumnChip.position.x - parentOfChipArray.firstChip.position.x 
    }
                    else{  
                       defaultOptions.distanceBetweenColumns = this.images.pots[0].secondColumnChip.position.x - this.images.pots[0].firstChip.position.x 
                    }

  //get item to displaychipstacksize

if(parentOfChipArray.potSize instanceof this.images.Item){defaultOptions.chipStackSizeItem = parentOfChipArray.potSize }
  else if(parentOfChipArray.bet instanceof this.images.Item){defaultOptions.chipStackSizeItem = parentOfChipArray.bet }


//assign defaults
      _.defaults(options, defaultOptions) 

console.log('options =');console.log(options)

var initialX = options.initialX; var initialY = options.initialY
var distanceBetweenColumns = options.distanceBetweenColumns 

var chipArray = parentOfChipArray[options.chipArrayName]

//console.log('display chipst ack called, with the following options:');console.log(options)

        if(!_.isArray(parentOfChipArray[options.chipArrayName])){parentOfChipArray[options.chipArrayName] = []}
         
        //reset chip array from memory, adding to oldArray
   else{ //if parentOfChipArray.chips is an Array
     var oldArray = []
    while(parentOfChipArray[options.chipArrayName].length>0) {
    oldArray.push(parentOfChipArray[options.chipArrayName].pop())
  }//while loop 
   }//if parentOfChipArray.chips is an Array
        var x = initialX
        var y = initialY
        var chipIncrementY = this.images.pots[0].secondChip.position.y-this.images.pots[0].firstChip.position.y
        var totalChips = 0
        var columnCounter = 1

        while(chipAmount>=1){
            if(chipAmount>=10000){
     stagesToUpdate.push(       this.displayChip('10k',x,y, parentOfChipArray, options) )
            y =y+chipIncrementY
            chipAmount = chipAmount -10000
        }
           else if(chipAmount>=5000){
     stagesToUpdate.push(           this.displayChip('5k',x,y, parentOfChipArray, options))
            y =y+chipIncrementY
            chipAmount = chipAmount -5000
        }
        else     if(chipAmount>=1000){
            
      stagesToUpdate.push(          this.displayChip('1k',x,y, parentOfChipArray, options))
            y =y+chipIncrementY
            chipAmount = chipAmount -1000
        }
              else    if(chipAmount>=500){
            
       stagesToUpdate.push(         this.displayChip(500,x,y, parentOfChipArray, options))
            y =y+chipIncrementY
            chipAmount = chipAmount -500
        }
           else    if(chipAmount>=100){
            
         stagesToUpdate.push(       this.displayChip(100,x,y, parentOfChipArray, options))
            y =y+chipIncrementY
            chipAmount = chipAmount -100
        }
        else if(chipAmount>=50){
            
          stagesToUpdate.push(      this.displayChip(50,x,y, parentOfChipArray, options))
            y =y+chipIncrementY
            chipAmount = chipAmount -50
        }
      else  if(chipAmount>=25){
            
         stagesToUpdate.push(        this.displayChip(25,x,y, parentOfChipArray, options))
            y =y+chipIncrementY
            chipAmount = chipAmount -25

        }
      else   if(chipAmount >=10){
           stagesToUpdate.push(      this.displayChip(10,x,y, parentOfChipArray, options))
            y =y+chipIncrementY
            chipAmount = chipAmount -1
        }
      else   if(chipAmount >=5){
           stagesToUpdate.push(      this.displayChip(5,x,y, parentOfChipArray, options))
            y =y+chipIncrementY
            chipAmount = chipAmount -5
        }
      else   if(chipAmount >=1){
           stagesToUpdate.push(      this.displayChip(1,x,y, parentOfChipArray, options))
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

//now determine whether we want to add amount
if( options.displayChipStackSize !== false && _.isArray(chipArray) && chipArray.length>0 && options.chipStackSizeItem instanceof this.images.Item && _.isObject(options.chipStackSizeItem.text)){

var sizeItem = options.chipStackSizeItem
sizeItem.text.text = totalChipAmount
/*
console.log('displaying size item')
console.log(sizeItem)
console.log('displaying getbounds function')
console.log(sizeItem.text.getBounds)
var sizeBounds = sizeItem.text.getBounds()
var measuredSizeWidth = sizeBounds.width
var measuredSizeHeight = sizeBounds.height
*/
var measuredSizeWidth = sizeItem.text.getMeasuredWidth()
var measuredSizeHeight = sizeItem.text.getMeasuredHeight()

var chipDiameter = self.images.pots[0].firstChip.size.x

//we are going to get the maximum bounding box for the chip stack
var chipStackMaxWidth = Math.abs(options.distanceBetweenColumns*(self.imageData.maxChipColumns-1))+chipDiameter
var chipStackMaxHeight = (self.imageData.maxChipsPerColumn-1)*(self.images.pots[0].secondChip.position.x - self.images.pots[0].firstChip.position.x) + chipDiameter

var maxLeftX; var maxRightX ; var actualLeftX; var actualRightX;
var maxTopY = options.initialY + chipDiameter - chipStackMaxHeight;var maxBottomY = options.initialY + chipDiameter;



//determine whether we are building chip colums left or right
if(distanceBetweenColumns > 0){var chipDirection = 'right'}
  else{ var chipDirection = 'left'}

var actualTopY = options.initialY
//get actualTopY value
for(var i = 0;i<chipArray.length;i++){
if( chipArray[i].position.y  <  actualTopY){ actualTopY = chipArray[i].position.y }
}

if(chipDirection === 'right'){
maxLeftX = options.initialX
 maxRightX = maxLeftX + chipStackMaxWidth
 actualLeftX = maxLeftX
 actualRightX = chipArray[chipArray.length-1].position.x + chipArray[chipArray.length-1].size.x
}//if chips building to right

else{
 // console.log('chip direction is ' + chipDirection)
  //console.log('chipstack max width = '+ chipStackMaxWidth)
 maxRightX = options.initialX + chipDiameter
 maxLeftX  = maxRightX- chipStackMaxWidth
    actualRightX = maxRightX 
    actualLeftX = chipArray[chipArray.length-1].position.x
}//if chips going to left


//determine intended positioning of size item
if(sizeItem.position.x >= maxRightX ){ var sizeLatitudePositioning = 'right'}
else if( sizeItem.position.x + sizeItem.size.x <= maxLeftX){ console.log('maxLEfftX = '+maxLeftX);var sizeLatitudePositioning = 'left'}

if(sizeItem.position.y >= maxBottomY ){ var sizeLongitudePositioning = 'bottom'}
else if( sizeItem.position.y + measuredSizeHeight <= actualTopY){ var sizeLongitudePositioning = 'top'}


//if positioning is right we position X directly to the right of our item ad keep y the same
if(sizeLatitudePositioning === 'right'){
stagesToUpdate.push (self.setImageItemPositionAndTextBasedOnImageChange(sizeItem, actualRightX, sizeItem.position.y, options))
}
//if left we do on left keeping y the same
else if(sizeLatitudePositioning === 'left'){
stagesToUpdate.push (self.setImageItemPositionAndTextBasedOnImageChange(sizeItem, actualLeftX - measuredSizeWidth, sizeItem.position.y, options))
}
else {//if not left or right

  //--------------------ADJUST LEFT/RIGHT BASED ON PERCENTAGE OF MAXIMUM---------------------------------------
  if(chipDirection === 'right'){
   var sizePositionToItemPositionRatio =  (sizeItem.position.x - actualLeftX)/chipStackMaxWidth
 var sizeItemX = sizePositionToItemPositionRatio*(actualRightX - actualLeftX) + actualLeftX 
 }
   else{
    console.log('adjusting betSize text based on chipDirection left'); 
 var sizePositionToItemPositionRatio =  (actualRightX - sizeItem.position.x - sizeItem.size.x)/chipStackMaxWidth
 var sizeItemX = actualRightX - sizePositionToItemPositionRatio*(actualRightX - actualLeftX) - measuredSizeWidth

 console.log ('ratio = '+sizePositionToItemPositionRatio)
   }//chip columns go from right to left


  if(sizeLongitudePositioning === 'bottom'){//--------------check if bottom-----------------------
stagesToUpdate.push (self.setImageItemPositionAndTextBasedOnImageChange(sizeItem, sizeItemX, maxBottomY, options))
}//if bottom

//adjust if top
else if(sizeLongitudePositioning === 'top'){//--------------check if top-----------------------

stagesToUpdate.push (self.setImageItemPositionAndTextBasedOnImageChange(sizeItem, sizeItemX, actualTopY - measuredSizeHeight, options))
}//if top

else{stagesToUpdate.push (self.setImageItemPositionAndTextBasedOnImageChange(sizeItem, sizeItemX, sizeItem.position.y, options))}


}//if neither left nor right justification
stagesToUpdate.push (self.displayChildren(sizeItem, options))

console.log('adjusted size item based on '+ sizeLatitudePositioning + ' '+sizeLongitudePositioning)
}//if we want to display chipStackSizeItem


   //     console.log('displayChipStack has finished')
if(update !== false && options.hidden !== true){
  if(_.isArray(parentOfChipArray[options.chipArrayName])&&parentOfChipArray[options.chipArrayName].length>0 && parentOfChipArray[options.chipArrayName][0] instanceof this.images.Item){
this.hideChildren(  oldArray, options)
 this.updateStages(stagesToUpdate)
  }
    options.update = update
}
else if(options.hidden === true){
  options.update = update
   return oldArray
}

else if(update === false) {
//console.log('returning'+stagesToUpdate)
  stagesToUpdate.push(  this.hideChildren(  oldArray, options) )
 options.update = update
  return stagesToUpdate}


    }



    //this.images.seats[i] is parent for players bets, this.images.pots[i] is parent for pots
    this.displayChip = function(chipValue, x, y, parentOfChipArray, options){
// console.log('displayChip function called with chipvalue = '+chipValue)
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
      else  if(chipValue == 10){
           chipColor = 'orange'
       } 
      else  if(chipValue == 5){
           chipColor = '#F52887'
       }
     else {
           chipColor = 'blue'
       }


if( chipColor == 'orange'){
var chipImageSource = self.permanentPreferences.sourceObjects.value.chips['10']
}
  else   if(chipColor == 'red'){
           var chipImageSource = self.permanentPreferences.sourceObjects.value.chips.red
       }
       else if(chipColor == 'black'){
            var chipImageSource = self.permanentPreferences.sourceObjects.value.chips.black

       }
       else{ var chipImageSource = self.permanentPreferences.sourceObjects.value.chips.black}


       parentOfChipArray[options.chipArrayName].push(new this.images.Item(x,y,diameter,diameter,this.gameState.zPositionData.chips))
        this.images.itemAsBitmap(parentOfChipArray[options.chipArrayName][parentOfChipArray[options.chipArrayName].length-1], chipImageSource) 
 
parentOfChipArray[options.chipArrayName][parentOfChipArray[options.chipArrayName].length-1].text =  new createjs.Text(chipValue, '7px ' + self.permanentPreferences.defaultFontType.value, 'white')
parentOfChipArray[options.chipArrayName][parentOfChipArray[options.chipArrayName].length-1].text.x = parentOfChipArray[options.chipArrayName][parentOfChipArray[options.chipArrayName].length-1].position.x + parentOfChipArray[options.chipArrayName][parentOfChipArray[options.chipArrayName].length-1].size.x/2
parentOfChipArray[options.chipArrayName][parentOfChipArray[options.chipArrayName].length-1].text.y = parentOfChipArray[options.chipArrayName][parentOfChipArray[options.chipArrayName].length-1].position.y+4.5
parentOfChipArray[options.chipArrayName][parentOfChipArray[options.chipArrayName].length-1].text.baseline = 'top'
parentOfChipArray[options.chipArrayName][parentOfChipArray[options.chipArrayName].length-1].text.textAlign = 'center'
parentOfChipArray[options.chipArrayName][parentOfChipArray[options.chipArrayName].length-1].text.maxWidth = parentOfChipArray[options.chipArrayName][parentOfChipArray[options.chipArrayName].length-1].size.x*.8

//remove previous text instances UNLESS last one in the column
for(var i   = 0; i<parentOfChipArray[options.chipArrayName].length-1;i++){

    if(i == 0 || (i+1)%this.imageData.maxChipsPerColumn != 0){
    this.hideText(parentOfChipArray[options.chipArrayName][i], {update:false})
    parentOfChipArray[options.chipArrayName][i].text = null
    }
}
 if(options && options.hidden === true){}
  else{
//console.log('displaying a chip')
    return (this.displayChildren(parentOfChipArray[options.chipArrayName], options) )}


 }

//initialX, initialY, time, numTicks, item, finalX, finalY, onEnd, onTick
 this.animateImage = function(animationInfo){

if(!animationInfo || !animationInfo.item){return }

var defaults = {}
//declare defaults
defaults.movementType = 'absolute'
defaults.maxDepth = 1

_.defaults(animationInfo, defaults)

var stagesToUpdate = []
var outOfDateItems = []
var endedItems = []
var numAnimations = 0
var allTweens = []

animationInfo.animatedItems = []

if( animationInfo.maxDepth > 0  && (_.isArray(animationInfo.item) ||   (animationInfo.item instanceof this.images.Item  === false && _.isObject(animationInfo.item))  )  ){

var items = animationInfo.item
  var movementType = animationInfo.movementType
animationInfo.movementType = 'relative'
animationInfo.maxDepth = animationInfo.maxDepth  - 1

//iterate through parameter and move all images within the array/object

var animationAsyncParallelArray = []
_.each(items, function(value, index, list){
animationInfo.item = value
  if(animationInfo.item instanceof self.images.Item && (animationInfo.item.image || animationInfo.item.text) ){
    var animationID = numAnimations
    var info = _.clone(animationInfo)
animationAsyncParallelArray.push(animateOneItem(info, animationID))
}//if legitimate item to animate

})//iterate through item

animationInfo.maxDepth = animationInfo.maxDepth+1
animationInfo.movementType  = movementType
}//if array or collection of items

else {
  animateOneItem(animationInfo, 0)
}

//start all tweens
for(var i  = 0;i<allTweens.length;i++){allTweens[i].setPaused(false)}

function animateOneItem (animationInfo, animationID){

numAnimations++
animationInfo.animatedItems[animationID] = animationInfo.item

//assign defaults
var defaults = {}
if(animationInfo.item.image){
 defaults = _.defaults (defaults, getDefaultPositionsBasedOnDisplayObject(animationInfo.item.image, animationInfo) )
}

else if(animationInfo.item.text){
 defaults = _.defaults (defaults, getDefaultPositionsBasedOnDisplayObject(animationInfo.item.text, animationInfo))
}

defaults.numTicks = 10
defaults.time = 300
defaults.update = false
defaults.onEnd = function(animationInfo, animationInstance){
 // console.log('hiding animated item by default')
 // self.hideChildren(animationInfo.item)
//self.updateStages(animationInfo.item.position.z.stage)
}
defaults.onStart = function(animationInfo){
self.displayChildren(animationInfo.item)
}
defaults.onTick = function(animationInfo, animationInstance){}
/*
defaults.onTick = function(animationInfo, setIntervalFunction){
self.updateStages(animationInfo.item.position.z.stage)
}
*/

//assign defaults ot animationInfo
animationInfo = _.defaults(animationInfo, defaults)


            var fractionDistancePerTick = 1/animationInfo.numTicks
            var lastTick =animationInfo.numTicks -1 
           var   interval = animationInfo.time/animationInfo.numTicks
     
     if(animationInfo.movementType === 'relative'){
   //   console.log('relative movement animation called')
                         var totalDistanceX = animationInfo.finalX
                          var totalDistanceY =  animationInfo.finalY}
                          else{ var totalDistanceX = animationInfo.finalX - animationInfo.initialX
                          var totalDistanceY = animationInfo.finalY - animationInfo.initialY}

                   var distancePerTickX =  totalDistanceX*fractionDistancePerTick
                   var distancePerTickY = totalDistanceY*fractionDistancePerTick

//console.log('animate one item with following info called:' );console.log(animationInfo)

 if (_.isNumber(self.setImageItemPositionAndTextBasedOnImageChange(animationInfo.item, animationInfo.initialX, animationInfo.initialY, animationInfo)))
 {outOfDateItems[animationID] = animationInfo.item}

endedItems[animationID]  = false

if(_.isFunction(animationInfo.onStart)){
(animationInfo.onStart(animationInfo))}

                //   var tick = 0

var imageUpToDate = true
var textUpToDate = true


var imageEnded = false
var textEnded = false



//image animation
if(animationInfo.item.image){
  var imageTween =  createjs.Tween.get(animationInfo.item.image, {/*onChange:onChange,*/ override:true, paused:true})
         imageTween.to({x:animationInfo.item.image.x+totalDistanceX, y:animationInfo.item.image.y+totalDistanceY}, animationInfo.time)
         .addEventListener("change", imageChanged)
        imageTween.call(endImage,[animationInfo, imageTween, textTween],this)
  }//image animation

//text animation
if(animationInfo.item.text){
  var textTween =  createjs.Tween.get(animationInfo.item.text, {/*onChange:onChange,*/ override:true, paused:true})
  
         textTween.to({x:animationInfo.item.text.x+totalDistanceX, y:animationInfo.item.text.y+totalDistanceY}, animationInfo.time)
         .addEventListener("change", textChanged)
       textTween.call(endText,[animationInfo, imageTween, textTween], this)
  }//text animation

if(imageTween){allTweens.push( imageTween)}
if(textTween){allTweens.push(textTween)}


function imageChanged(tweenInstance){
imageUpToDate = false
onChange()
}

function textChanged (tweenInstance){
textUpToDate = false
onChange()
}



function  onChange (event){
  if( (animationInfo.item.image && imageUpToDate === true) ||   (animationInfo.item.text && textUpToDate === true)){return}

if(checkIfAllTasksCompletedResetsArrayIfItIs(outOfDateItems) ){
      for(var i = 0;i<animationInfo.animatedItems.length;i++){self.itemChanged(animationInfo.animatedItems[i])}
if(_.isFunction(animationInfo.onTick)){animationInfo.onTick(animationInfo, imageTween, textTween)}
  //set up to date as true
  textUpToDate = true
imageUpToDate = true
//console.log(event)

}//check if all other tasks completed
}


function  endImage (animationInfo, imageTween, textTween){
  imageEnded = true
onEnd(animationInfo, imageTween, textTween)
}
function endText(animationInfo, imageTween, textTween){
  textEnded = true
onEnd(animationInfo, imageTween, textTween)
}


function onEnd (animationInfo, imageTween, textTween){
  //check if actually ended
   if( (animationInfo.item.image && imageEnded === false) ||  (animationInfo.item.text && textEnded === false) ){return}
    if(checkIfAllTasksCompletedResetsArrayIfItIs(endedItems)){
      for(var i = 0;i<animationInfo.animatedItems.length;i++){self.itemChanged(animationInfo.animatedItems[i])}

      animationInfo.onEnd(animationInfo, imageTween, textTween)
  }//if all items ended
}

function checkIfAllTasksCompletedResetsArrayIfItIs(array){
 // console.log('checkIfAllTasksCompletedResetsArrayIfItIs called')
//console.log(array)
array[animationID]  = animationInfo.item 
//CHECK FOR ALL non-false values
for(var i = 0;i<array.length;i++){
  if(array[i] === false && endedItems[i] === false){return false}
}


//IF ALL TRUE RESET TO ALL FALSE
for(var i = 0;i<array.length;i++){array[i] === false}

  //RETURN TRUE if false not returned yet
return true
}







}//animate single item


function getDefaultPositionsBasedOnDisplayObject(imageOrText, animationInfo){
  if(!_.isObject(imageOrText)){return {}}
var defaultPositions  =  {}

//console.log('animationInfo = ');console.log(animationInfo)
//console.log('imageOrText=  ');console.log(imageOrText)

  var currentPosition =  getDisplayObjectPosition(imageOrText)


//INITIAL POSITIONS
     if(animationInfo.movementType === 'relative'){
   //   console.log('setting default initial positions for animationInfo with movementType relative')
        defaultPositions.initialX = 0
  defaultPositions.initialY = 0
}//if relative movement type
  else{//if absolute movement type
  //  console.log('setting default initial positions to ')
  //  console.log(currentPosition)
         defaultPositions.initialX = currentPosition.x
             defaultPositions.initialY     =  currentPosition.y
  }
 
  //FINAL POSITIONS

  //check if we have a specified final position
  var finalXAbsolute = animationInfo.item.position.x;var finalYAbsolute = animationInfo.item.position.y
      defaultPositions.finalX = finalXAbsolute
    defaultPositions.finalY = finalYAbsolute

  if(animationInfo.movementType === 'relative'){
      if(_.isNumber(animationInfo.initialX) && !_.isNan(animationInfo.initialX)){
  defaultPositions.finalX = finalXAbsolute - animationInfo.initialX
    }
          if(_.isNumber(animationInfo.initialY) && !_.isNan(animationInfo.initialY)){
  defaultPositions.finalY = finalYAbsolute  - animationInfo.initialY 
    }
  }//relative movement type


  return defaultPositions
}//getDefaultPositionsBasedOnDisplayObject


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

this.setImageItemPositionAndTextBasedOnImageChange = function(item, imageX, imageY, options){

  if (!options){var options = {}}
var update = options.update
options.update = false

//declare defaults
var defaultOptions = {}
defaultOptions.movementType = 'absolute'
defaultOptions.maxDepth = 1

_.defaults(options, defaultOptions) //assign defaults

var stagesToUpdate = []

if( options.maxDepth > 0  && (_.isArray(item) ||   (item instanceof this.images.Item  === false && _.isObject(item))  )  ){

  var movementType = options.movementType
options.movementType = 'relative'
options.maxDepth = options.maxDepth  - 1

//iterate through parameter and move all images within the array/object
_.each(item, function(value, index, list){
 // console.log(value)
 // console.log(index)
moveItem(value, imageX, imageY)
})//iterate through item

options.maxDepth = options.maxDepth+1
options.movementType  = movementType
}//if array or collection of items

else {moveItem(item, imageX, imageY)}

function moveItem (item, imageX, imageY){

if(item instanceof self.images.Item){//if NOT an array or collection of Items

if(item.image ){
  var previousImageLocation = getDisplayObjectPosition(item.image)
if(_.isUndefined(previousImageLocation)){console.log(item)}
}//if image
if(item.text ){
var previousTextLocation = getDisplayObjectPosition(item.text)

}//if text


if(!_.isNumber(imageX)){imageX = item.position.x}
  else if( options.movementType === 'relative'){
    if(item.image){imageX = previousImageLocation.x + imageX}
      else if (item.text){imageX = previousTextLocation.x+imageX}
  }//if relative position

  if(!_.isNumber(imageY)){imageY = item.position.y}
  else if( options.movementType === 'relative'){

     if(item.image){imageY = previousImageLocation.y + imageY}
       else if (item.text){imageY = previousTextLocation.y+imageY}
   }//if relative position


    var textX = imageX
  var textY = imageY

//change position data if permanet is true
if(options.permanent === true){item.position.x = imageX;item.position.y = imageY}

//console.log('settin image position to '+imageX+', '+imageY)

//IMAGE
if(item.image ){
  setDisplayObjectPosition(item.image, imageX, imageY)

var imageDeltaX = imageX - previousImageLocation.x
var imageDeltaY = imageY - previousImageLocation.y

if(imageDeltaX !== 0 || imageDeltaY !== 0){stagesToUpdate.push(self.itemChanged(item))}

}

//TEXT
if(item.text ){
//check if image was moved
if(_.isNumber(imageDeltaX) || _.isNumber(imageDeltaY)){
  textX = previousTextLocation.x + imageDeltaX
textY = previousTextLocation.y + imageDeltaY
}
     setDisplayObjectPosition(item.text, textX, textY)

var textDeltaX = textX - previousTextLocation.x
var textDeltaY = textY - previousTextLocation.y
if(textDeltaX !== 0 || textDeltaY !== 0){stagesToUpdate.push(self.itemChanged(item))}

}


}//if NOT array/object of items

}//function move Items

options.update = update
if(options.update !== false){this.updateStages(stagesToUpdate)}
  else{return stagesToUpdate}



}


var setDisplayObjectPosition = function(imageOrText, x,y){
if(!_.isElement(imageOrText)){
  imageOrText.x = x
  imageOrText.y  = y
}
else{
    $(imageOrText).css('left',x )
 $(imageOrText).css('top', y)
}
}//function to set displayobject position

var getDisplayObjectPosition = function(imageOrText){
if(!_.isElement(imageOrText)){
//  console.log('getting location of nonelement displayobejct posiion')
var location =  {x:imageOrText.x, y:imageOrText.y}
}
else{ var location = {x:  parseFloat($(imageOrText).css('left')), y: parseFloat($(imageOrText).css('top'))}}
//console.log(imageOrText);console.log(location)

if(_.isNaN(location.x) || _.isNaN(location.y)){console.log(imageOrText);throw 'nan of get displayobecjt position '}
return location

}//get display object position function
 //must include false or undefined slots for already dealt cards
 this.dealCommunity = function (communityArray){
     //initialX, initialY, time, numTicks, item, finalX, finalY, onEnd, onTick, 
     
     var dealCardAnimationTime = 300
var spreadFlopAnimationTime = 200
     fractionDistancePerTick = .02
     var lastTick = 1/fractionDistancePerTick -1 
     var   interval = fractionDistancePerTick*dealCardAnimationTime
var initialX = this.images.startingCard.position.x
     var initialY = this.images.startingCard.position.y
var stagesToUpdate = []

  //create TEMPORARY face down card to animate
    var animatedCard = new this.images.Item(initialX, initialY, this.images.community[0].size.x, this.images.community[0].size.y, this.gameState.zPositionData.cardAnimation)
  stagesToUpdate.push( this.images.cardAsBitmap(animatedCard, null) )

     //play deal sound
     var communitySound = createjs.Sound.createInstance(this.images.sources.dealCommunity)
     communitySound.play()

var initialAnimationInfo = {}
//calculated variables
initialAnimationInfo.numTicks = lastTick + 1
       initialAnimationInfo.item = animatedCard
       initialAnimationInfo.onTick = null
        initialAnimationInfo.time = dealCardAnimationTime
          initialAnimationInfo.onStart = function(info){
       stagesToUpdate.push(     self.displayChildren(info.item) )
            self.updateStages(stagesToUpdate)
            stagesToUpdate.length = 0

          }
//initialAnimationInfo.onEnd = function(){callback(null, 1)}

     //river animation
if(communityArray.length ==5){

//assign end value for initial animation
initialAnimationInfo.finalX =  self.images.community[4].position.x 
initialAnimationInfo.finalY = self.images.community[4].position.y

//end of function function
initialAnimationInfo.onEnd  = function(){
  stagesToUpdate.push(     self.displayShownCard(communityArray[4], self.images.community[4]) )
     stagesToUpdate.push(  self.hideChildren(animatedCard,{update:false}) )
     self.updateStages(stagesToUpdate)
     stagesToUpdate.length = 0
}

  self.animateImage(initialAnimationInfo)
}//river animation

//turn animation
else if(communityArray.length == 4){

//assign end value for initial animation
initialAnimationInfo.finalX =  self.images.community[3].position.x 
initialAnimationInfo.finalY = self.images.community[3].position.y


//end of function function
initialAnimationInfo.onEnd  = function(){
    stagesToUpdate.push(    self.displayShownCard(communityArray[3],self.images.community[3]))
    stagesToUpdate.push(    self.hideChildren(animatedCard,{update:false}))
       self.updateStages(stagesToUpdate)
       stagesToUpdate.length = 0
}
     
        self.animateImage(initialAnimationInfo)
    
     
}//turn animation

//flop animation
else if(communityArray.length == 3){


//assign end value for initial animation
initialAnimationInfo.finalX =  self.images.community[0].position.x 
initialAnimationInfo.finalY = self.images.community[0].position.y

      async.series([

        function(callback){  
          //callback for async series
initialAnimationInfo.onEnd = function(){callback(null, 1)}

        self.animateImage(initialAnimationInfo)

 },

    function(callback){
        //turn cards face up on community [0] position
         for(var i =0;i<=2;i++){
    self.images.cardAsBitmap(self.images.community[i],communityArray[i])
    self.images.community[i].image.x = self.images.community[0].position.x
 stagesToUpdate.push(   self.displayChildren(self.images.community[i],{update:false}))
      }
     
      //hide facedown animated card
    stagesToUpdate.push(    self.hideChildren(animatedCard,{update:false}) )
       //update stage to display face up cards
      self.updateStages( stagesToUpdate)

 //move cards from community[0] position to final destinations
 var community1Animation = {
 initialX: self.images.community[0].position.x,
 initialY: self.images.community[0].position.y,
 numTicks : lastTick+1,
 finalX: self.images.community[1].position.x,
 finalY: self.images.community[1].position.y,
 item: self.images.community[1],
time: spreadFlopAnimationTime,
onEnd: function(){}
}
var community2Animation = _.clone(community1Animation)
community2Animation.finalX= self.images.community[2].position.x
community2Animation.finalY=self.images.community[2].position.y
community2Animation.item=self.images.community[2]
     self.animateImage(community1Animation)    
     self.animateImage(community2Animation)      
    }   
    ])
    
}

}
 
this.queueExpirationFunction = function(expirationTrigger, actionFunction, options){
if(!options){var options = {}}

//if seat number is specified we push the function intot eh player's thing though normally it wont matter
  if(_.isNumber(options.expirationPlayerNumber)){var expirationObject = this.gameState.seats[options.expirationPlayerNumber][expirationTrigger]}
else{var expirationObject = this.gameState[expirationTrigger]}

//if array we just push
if(_.isArray(expirationObject.onEnd)){expirationObject.onEnd.push(actionFunction)}
else if(_.isFunction(expirationObject.onEnd)){//if function we turn it into array and preserve original functionn
  expirationObject.onEnd = [expirationObject.onEnd, actionFunction]}
  else{expirationObject.onEnd = [actionFunction]}//if nothing we create new array and put in action function
}

this.setPreactionData = function(expirationType, actionType, value, options) {

if(!options){var options = {}}
if(!_.isNumber(options.playerNumber)){
if(!_.isNumber(this.gameState.userSeatNumber)){console.log( 'shouldnt be able to set preaction data but did');return}
  var playerNumber = this.gameState.userSeatNumber
}
else{var playerNumber = options.playerNumber}

var gameStateSeatObject = this.gameState.seats[playerNumber]
var preactionOptions = self.getPreactionOptionValues()

var expirationTypesToSet = []
var otherActionTypesToSet = []
var otherActionValue = false
var serverActionsSet = []

//if value is false we start that type of action from a clean slate, clearing everything
if(value === false || value === null || _.isUndefined(value)){
  value = false
expirationTypesToSet.push('act', 'street', 'once','hand')
}

else if(expirationType === 'act'){
 expirationTypesToSet.push('act')
}
else if(expirationType === 'street'){
  expirationTypesToSet.push('act','street')
}
else if(expirationType === 'once'){
  expirationTypesToSet.push('act','street','once')
}
else if(expirationType === 'hand'){
    expirationTypesToSet.push('act', 'street', 'once','hand')
}
else{expirationTypesToSet.push(expirationType)}

if(options.clientLogic === true){
//we change other values if we are adding a preaction, but not if we are taking one away
if(value === true || _.isNumber(value)){
if(actionType === 'call' ){
  otherActionTypesToSet.push('fold', 'raise', 'bet', 'call_any')
 //     if(preactionOptions.check !== true){ otherActionTypesToSet.push('check')}
}
else if(actionType === 'call_any' ){
  otherActionTypesToSet.push('fold', 'raise', 'bet', 'call')
 //     if(preactionOptions.check !== true){ otherActionTypesToSet.push('check')}
}
else if (actionType === 'fold'){
  otherActionTypesToSet.push('call', 'raise', 'bet', 'call_any')
}
else if (actionType === 'raise' || actionType === 'bet'){
  otherActionTypesToSet.push('call', 'fold', 'check', 'call_any')
}
}//if value is not false
setValue(expirationTypesToSet, otherActionTypesToSet, otherActionValue)

}//if we want to perform clientside Logic


setValue(expirationTypesToSet, actionType, value)

console.log('setPreactionData for ' +actionType +' and '+expirationType+' and value of:'+value+'completed')
console.log(gameStateSeatObject[expirationType][actionType])


function setValue(expirationTypes, actionTypes, value){

  if (_.isString(expirationTypes)) {
    //if action type is string we have straighforward answer
if(_.isString(actionTypes)){
 if(_.indexOf(serverActionsSet, actionTypes) === -1 && options.server !== false)    {socket.emit('set_flag',actionTypes, value);serverActionsSet.push(actionTypes)}
if(options.local !== false) {gameStateSeatObject[expirationTypes][actionTypes] = value}
 }//if actionTypes is a string
   else if(_.isArray(actionTypes)){// if actionType is array
      //change appropriate value(s)
for(var i = 0;i<actionTypes.length;i++){setValue(expirationTypes, actionTypes[i],value)}
}//if actionTypes is array
}//if expirationType is a string

else if(_.isArray(expirationTypes)){// if expirationType is an array
  //change appropriate value(s)
for(var i = 0;i<expirationTypes.length;i++){setValue(expirationTypes[i], actionTypes, value)}
}//if expirationTypes is an array


}//function setValue
}

 //returns once value, then street, then hand
this.getPreactionData = function(actionType, checkFunction){

var seat = self.gameState.userSeatNumber

if(!_.isFunction(checkFunction)){var checkFunction = function(value){
var preactionOptionData = self.getPreactionOptionValues()

//if turn has not been dealt
if(self.isItemAddedToStage(self.images.community[3])){
var minimumNumberValue = self.gameState.bigBlind
}//turn not dealt
else{//if turn dealt
  var minimumNumberValue = self.gameState.bigBlind/2
}//if turn dealt

if(!preactionOptionData || _.isEmpty(preactionOptionData)){}
else{//if preactionOptionData exists
  /*
if(actionType === 'raise' ){
  if(preactionOptionData.check === true){console.log('attempted to retreive raise preaction data when raise option should not be available'); return false}
   }
   else if(actionType === 'bet'){
    if(preactionOptionData.check === false){console.log('attempted to retreive bet preaction data when bet option should not be available'); return false}
   }
*/
    if( actionType === 'call'){
if(preactionOptionData.check === false){minimumNumberValue = preactionOptionData.call}
   }
   else if( actionType === 'check' ||actionType === 'call_any'||actionType === 'fold' ){minimumNumberValue = NaN  }
}// preaction optiondata exists
  if(value === true || (_.isNumber(value) && value >= minimumNumberValue )){return true}}
}//assign default checkFunction


//check in flags
var streetValue = self.gameState.seats[seat].street[actionType]
var onceValue = self.gameState.seats[seat].once[actionType]
var handValue = self.gameState.seats[seat].hand[actionType]

if(!_.isUndefined(streetValue)&&!_.isNaN(streetValue)&&checkFunction(streetValue)){var data = {action:actionType, value:streetValue, expiration:'street'}}
else  if(!_.isUndefined(onceValue)&&!_.isNaN(onceValue)&&checkFunction(onceValue)){var data = {action:actionType, value:onceValue, expiration:'once'}}
else if(!_.isUndefined(handValue)&&!_.isNaN(handValue)&&checkFunction(handValue)){var data = {action:actionType, value:handValue,expiration: 'hand'}}
  else{
//console.log('getPreactionDAta for '+actionType+ ' returned false')
    return false}

//maybe do this later, not sure if it should be done yet
/*
//check if value is number, if so we want to grab the highest number and return it
if(_.isNumber(data.streetValue)){

}
*/
//console.log('getPreactionDAta for '+actionType+' returning:')
//console.log(data)
return data
}

this.getHighBet = function(){

    return Math.max.apply( Math, this.getCurrentBetSizes() )

  if(_.isNumber(this.gameState.hand.highBet)){return this.gameState.highBet}
    else { 
      return Math.max.apply( Math, this.getCurrentBetSizes() )
    }
}


this.images.createPairOfCheckBoxOptionDisplayObject = function (text, onClickUnchecked, onClickChecked){
//console.log('createPreactionOptionDisplayObject called')
var height = self.images.foldToAnyBet.size.y
    var preactionItem = new self.images.Item(0, 0,0, height, self.gameState.zPositionData.button)
    var preactionItemOn = new self.images.Item(0, 0, 0, height,  self.gameState.zPositionData.button)

self.images.itemAsBitmap(preactionItem, self.permanentPreferences.sourceObjects.value.checkBox )
self.images.itemAsBitmap(preactionItemOn, self.permanentPreferences.sourceObjects.value.checkBoxChecked)

      self.images.addCheckBoxButtonText(preactionItem, text)
      self.images.addCheckBoxButtonText(preactionItemOn, text)

if(_.isFunction(onClickUnchecked)) {
  preactionItem.image.onClick = function(event){
   onClickUnchecked(event, preactionItem, preactionItemOn)
    self.hideChildren(preactionItem,{update:false});self.displayChildren(preactionItemOn)}
  }
   if(_.isFunction(onClickChecked)) { 
     preactionItemOn.image.onClick = function(event){
      onClickChecked(event, preactionItemOn, preactionItem)
      self.hideChildren(preactionItemOn,{update:false});self.displayChildren(preactionItem)}
}
return{unchecked: preactionItem, checked: preactionItemOn }

}


this.createPreactionOptionItems = function(){

self.images.preactions = {}
var callPreactionItems =  self.images.createPairOfCheckBoxOptionDisplayObject ('Call')
var checkPreactionItems =  self.images.createPairOfCheckBoxOptionDisplayObject ('Check')
var allInPreactionItems =  self.images.createPairOfCheckBoxOptionDisplayObject ('All-In')
var foldPreactionItems =  self.images.createPairOfCheckBoxOptionDisplayObject ('Fold')
var callAnyPreactionItems = self.images.createPairOfCheckBoxOptionDisplayObject ('Call Any Bet')

//create items
self.images.preactions.callUnchecked = callPreactionItems.unchecked
self.images.preactions.callChecked = callPreactionItems.checked

self.images.preactions.checkUnchecked = checkPreactionItems.unchecked
self.images.preactions.checkChecked = checkPreactionItems.checked

self.images.preactions.allInUnchecked = allInPreactionItems.unchecked
self.images.preactions.allInChecked = allInPreactionItems.checked

self.images.preactions.foldUnchecked = foldPreactionItems.unchecked
self.images.preactions.foldChecked = foldPreactionItems.checked

self.images.preactions.callAnyUnchecked = callAnyPreactionItems.unchecked
self.images.preactions.callAnyChecked = callAnyPreactionItems.checked

//ASSIGN ONCLICK FUNCTIONS

//==================assign onClick functions========================

//CALL
self.images.preactions.callUnchecked.image.onClick = function(){
self.setPreactionData('street', 'call', self.getPreactionOptionValues().call)
        self.updateUserOptionsBasedOnFlagsAndPreactions()
}
self.images.preactions.callChecked.image.onClick = function(){
      self.setPreactionData('hand', 'call', false)
        self.updateUserOptionsBasedOnFlagsAndPreactions()
}
//CHECK
self.images.preactions.checkUnchecked.image.onClick = function(){
    self.setPreactionData('hand', 'check',  self.getPreactionOptionValues().check)
        self.updateUserOptionsBasedOnFlagsAndPreactions()
}
self.images.preactions.checkChecked.image.onClick = function(){
    self.setPreactionData('hand', 'check', false, seat)
        self.updateUserOptionsBasedOnFlagsAndPreactions()
}
//ALL-IN
self.images.preactions.allInUnchecked.image.onClick = function(){
  var allIn = self.getPreactionOptionValues().allIn
  self.setPreactionData('hand', 'raise',allIn)
    self.setPreactionData('hand', 'bet', allIn)

        self.updateUserOptionsBasedOnFlagsAndPreactions()
}
self.images.preactions.allInChecked.image.onClick = function(){
 
        self.setPreactionData('hand', 'raise',false)
    self.setPreactionData('hand', 'bet', false)
        self.updateUserOptionsBasedOnFlagsAndPreactions()
}
//FOLD
self.images.preactions.foldUnchecked.image.onClick = function(){
    self.setPreactionData('hand', 'fold', self.getPreactionOptionValues().fold)
        self.updateUserOptionsBasedOnFlagsAndPreactions()
}
self.images.preactions.foldChecked.image.onClick = function(){
   self.setPreactionData('hand', 'fold', false)
        self.updateUserOptionsBasedOnFlagsAndPreactions()
}

//CALL ANY
self.images.preactions.callAnyUnchecked.image.onClick = function(){
    self.setPreactionData('hand', 'call', self.getPreactionOptionValues().callAny)
        self.updateUserOptionsBasedOnFlagsAndPreactions()
}
self.images.preactions.callAnyChecked.image.onClick = function(){
   self.setPreactionData('hand', 'call', false)
        self.updateUserOptionsBasedOnFlagsAndPreactions()
}


}

this.getPreactionOptionValues = function (){
  var getGameStateSeatObject = function(){return self.gameState.seats[self.gameState.userSeatNumber]}
var isHighBetNonUser = function() {return    self.getCurrentBetSizes().splice(self.gamestate.userSeatNumber,1).indexOf(self.getHighBet()) !== -1}
var getUserStackSize = function(){return self.getCurrentStackSizes()[self.gameState.userSeatNumber]}
var getUserBet = function(){return self.getCurrentBetSizes()[self.gameState.userSeatNumber]}
   var highBet = self.getHighBet();var userBet = getUserBet(); var userStackSize = getUserStackSize();var gameStateSeatObject = getGameStateSeatObject()

var allIn = false
var call = false
var call_any = false
var fold = false
var check = false
var raise = false
var bet  = false

if(userStackSize === 0 || gameStateSeatObject.toAct !== false && gameStateSeatObject.inHand !== true ){return false}//display no options if user is all in
  else{
    allIn = userStackSize + userBet //display all in option, disable later if not needed
  //display fold option
   fold = true
call_any = true

if(highBet>userBet){

  if(highBet - userBet>=userStackSize){//if we need to put our whole stack in to call
//display call option
     call = userStackSize
     //disable  all-in option
     allIn = false
  }//if facing all-in bet
else{//if we do not need to go all in to call
  call = highBet-userBet
}//if not facing all-in bet

}
else if (highBet === userBet){
  //display check option
  check = true
}//if at least one highbet value is a non-user and is equal to user bet

}//if conditions are appropriate

return {check:check, allIn:allIn, fold:fold, call:call, raise:raise, bet:bet}
}


this.updatePreactionOptionDisplayBasedOnLocalData = function(options){
if(!options){var options = {}}
  var update = options.update
options.update = false
var stagesToUpdate = []

seat =  this.gameState.userSeatNumber
var currentStackSizes = this.getCurrentStackSizes()

  //we need to hide if we are to act
if(!_.isNumber(seat) ||  this.gameState.seats[seat].toAct === true 
  || this.gameState.seats[seat].inHand !== true 
|| currentStackSizes[seat] <= 0 
||  _.without(currentStackSizes, 0).length <=1 ){
 // console.log('hiding options')
stagesToUpdate.push(this.hideChildren (this.images.preactions), options)
}
else{


var preactionBackgroundX = this.images.fold.position.x
var preactionBackgroundY = this.images.fold.position.y
var preactionBackgroundWidth = this.images.betSlider.betSize.position.x + this.images.betSlider.betSize.size.x - this.images.fold.position.x
var preactionBackgroundHeight = this.images.fold.size.y

var numPreactionsDisplayed = 0

var preactionButtonHeight = this.images.foldToAnyBet.size.y
var preactionButtonOffsetLeft = this.images.foldToAnyBet.position.x
var preactionButtonOffsetTop = 2
var preactionButtonOffsetBottom = 2
var distanceBetweenPreactionButtonsX = 35
var distanceBetweenPreactionButtonsY = 3


var numPreactionsPerColumn = 2
var preactionsZPosition = this.images.foldToAnyBet.position.z


//store items to add later
var itemsToDisplay = []

//UNCHECKED ITEMS
var preactionUncheckedItemArray = []
//get last itme convenience
var getLastUncheckedItem  = function(){return preactionUncheckedItemArray[preactionUncheckedItemArray.length-1]}

//function to display latest item; returns stage we need to update
var displayLastUncheckedItem = function(){itemsToDisplay.push ( getLastUncheckedItem() )}

 //CHECKED ITEMS
var preactionCheckedItemArray = []
//function to get last item (convenient)
var getLastCheckedItem  = function(){return preactionCheckedItemArray[preactionCheckedItemArray.length-1]}
//function to display latest item; returns stage we need to update
var displayLastCheckedItem = function(){itemsToDisplay.push (getLastCheckedItem() )}

var preactionOptions = this.getPreactionOptionValues()
console.log('displaying preactionOptionValues')
console.log(preactionOptions)

if(preactionOptions.check === true){
//console.log('displaying check preaction option')
 stagesToUpdate.push (addPreactionText(this.images.preactions.checkUnchecked, this.images.preactions.checkChecked, 'check'))

if(this.getPreactionData('check')){displayLastCheckedItem()}
  else{displayLastUncheckedItem()}

}

if(preactionOptions.fold === true){
//  console.log('displaying call preaction option')
 stagesToUpdate.push ( addPreactionText(this.images.preactions.foldUnchecked, this.images.preactions.foldChecked, 'fold'))

if(this.getPreactionData('fold')){displayLastCheckedItem()}
  else{displayLastUncheckedItem()}

}

if(_.isNumber(preactionOptions.call)){
//console.log('displaying call preaction option')

  if(preactionOptions.call >= currentStackSizes[seat]){var callAmount = 'All-In'}
    else{var callAmount = preactionOptions.call}
   stagesToUpdate.push ( addPreactionText(this.images.preactions.callUnchecked, this.images.preactions.callChecked, 'call '+callAmount))


var checkIfCallIsValid = function(value){ if(_.isNumber(value)&&value === preactionOptions.call){return true}}
if(this.getPreactionData('call', checkIfCallIsValid)){displayLastCheckedItem()}
  else{displayLastUncheckedItem()}

}

if(_.isNumber(preactionOptions.allIn)){
//console.log('displaying allin preaction option')
stagesToUpdate.push (    addPreactionText(this.images.preactions.allInUnchecked, this.images.preactions.allInChecked, 'All-In'))

  var raiseValid = false
  var betValid = false
  var checkIfRaiseOrBetIsValid = function(value){if(_.isNumber(value)&&value>=preactionOptions.allIn){return true}}
if(this.getPreactionData('raise', checkIfRaiseOrBetIsValid)){raiseValid = true}
if(this.getPreactionData('bet', checkIfRaiseOrBetIsValid)){betValid = true}
  //if bet on table, we only need raise to be true to display all in
if(this.getHighBet() <= 0) {raiseValid  = true}
  else {betValid  = true}
console.log('raise valid = ' +raiseValid+ ' , betVAlid = '+betValid)
if(raiseValid === true && betValid === true){displayLastCheckedItem()}
  else{displayLastUncheckedItem()}

}

if(preactionOptions.call_any === true){
//console.log('displaying call_any preaction option')
stagesToUpdate.push (    addPreactionText(this.images.preactions.callAnyUnchecked, this.images.preactions.callAnyChecked, 'Call Any'))

  var checkIfCallAnyIsValid = function(value){if(value===true){return true}}
if(this.getPreactionData('call_any', checkIfCallAnyIsValid)){displayLastCheckedItem()}
  else{displayLastUncheckedItem()}

}


//set locations
stagesToUpdate.push(setLocationDataOfPreactionItems())

//remove any previous options 
stagesToUpdate.push( this.hideChildren(this.images.preactions, options ) )
  //display ones that need to be displayed
  console.log('displaying the following items:')
  console.log(itemsToDisplay)
 stagesToUpdate.push(  this.displayChildren(itemsToDisplay,options) )




}//if player is NOT toAct

options.update = update
if(update !== false){this.updateStages(stagesToUpdate)}
else{return stagesToUpdate}



function addPreactionText (uncheckedItem, checkedItem, text){
var stagesToUpdate = []
stagesToUpdate.push ( self.images.addCheckBoxButtonText(uncheckedItem, text))
stagesToUpdate .push (self.images.addCheckBoxButtonText(checkedItem, text))

  preactionUncheckedItemArray.push(uncheckedItem)
preactionCheckedItemArray.push(checkedItem)

return stagesToUpdate
}


function setLocationDataOfPreactionItems (){
setAllItemWidths()
var stagesToUpdate = []

var columnNumber = 0
var rowNumber = 0
for(var i= 0;i<preactionUncheckedItemArray.length;i++){
  if (i !== 0 && (i % numPreactionsPerColumn === 0)){  //if we will go to next columns
rowNumber = 0
columnNumber++
  }//check if we get to the next column
var newX = getX(columnNumber)
var newY = getY(rowNumber)
stagesToUpdate.push( self.setImageItemPositionAndTextBasedOnImageChange (preactionUncheckedItemArray[i], newX, newY,{permanent:true}) )
 stagesToUpdate.push( self.setImageItemPositionAndTextBasedOnImageChange (preactionCheckedItemArray[i], newX, newY,{permanent:true}))
rowNumber++
}

return stagesToUpdate

 function setAllItemWidths (){

var longestWidth = 0
//iterate downwards, then when we reach bottom of column, we go to next column
 for (var i = 0; i< preactionUncheckedItemArray.length;i++){
  if ( i % numPreactionsPerColumn ===0){  //if we will go to next columns
longestWidth = 0
  }//check if we get to the next column

  //if new value is longer than previous, update previous highest
if( longestWidth<preactionUncheckedItemArray[i].size.x){longestWidth = preactionUncheckedItemArray[i].size.x}
  //if new value is shorter, then we set the new value equal to longest so all values in each column have same width
  else{preactionUncheckedItemArray[i].size.x = longestWidth;preactionCheckedItemArray[i].size.x = longestWidth}

 }//iterate through preaction item array

 }//function set all itemWidths

function getX (column){
var totalItemWidth = 0
 for (var i = 0; i< column;i++){var totalItemWidth = totalItemWidth+preactionUncheckedItemArray[i*numPreactionsPerColumn].size.x }

var x = column*distanceBetweenPreactionButtonsX + preactionButtonOffsetLeft + preactionBackgroundX + totalItemWidth
return x
}//function getX

function getY (row){
var y = row*preactionUncheckedItemArray[0].size.y+ row*distanceBetweenPreactionButtonsY + preactionButtonOffsetTop + preactionBackgroundY
return y
}//function getY

}//function setItemLocations for preactions

}



this.clearExpirationData = function(expirationType, playerNumber, options){

//clear table data
var tableExpirationObject = self.gameState
clearExpirationObject(tableExpirationObject)



  if(!_.isNumber(playerNumber)){
    if( _.isNumber(this.gameState.userSeatNumber)){var playerNumber = this.gameState.userSeatNumber}
      else{throw 'no player number'}
    }//if playerNumber not given

if(_.isNumber(playerNumber)){
var playerSeatObject = self.gameState.seats[playerNumber]
clearExpirationObject(playerSeatObject)

}


function clearExpirationObject (gameStateObject){

//make sure we have valid property
  if(!_.isObject(gameStateObject[expirationType])){return}

      //save refence
  var onEnd = gameStateObject[expirationType].onEnd

  //clear data
  gameStateObject[expirationType] = {}

    //run onClear for street
      if(_.isArray(onEnd)){
      for (var index = 0;index<onEnd.length;index++){onEnd[index]()}    
    }//if onEnd is array
  else if(_.isFunction(onEnd)){onEnd()}


}

}

 this.dealHoleCards = function(smallBlindSeatNumber, playerArray, holeCardArray){
     
     var initialX = this.images.startingCard.position.x
     var initialY = this.images.startingCard.position.y
     var animationTime = 340
            var fractionDistancePerTick = .05
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

        if(cardsDealt==playerArrayNumber){
          //define temporary animated cardback
            animatedCards0[cardsDealt] = new self.images.Item(initialX, initialY, self.images.community[0].size.x, self.images.community[0].size.y, self.gameState.zPositionData.cardAnimation)
          self.images.cardAsBitmap(animatedCards0[cardsDealt], null)
  

    asyncArray.push(function(callback){
  //animation data
var dealCard0AnimationInfo = {
            time: animationTime,
            ticks: lastTick+1,
            item: animatedCards0[cardsDealt],
            finalX:self.images.seats[playerArray[playerArrayNumber]].hiddenCards[0].position.x,
            finalY: self.images.seats[playerArray[playerArrayNumber]].hiddenCards[0].position.y,
            onEnd: function(){callback(null, callBackNumber)},
            onTick:null
        //    onStart:function(animationInfo){self.displayChildren(animationInfo.item)}
          }//animation data
                 dealHoleCardSound.play() //play sound
           self.animateImage(dealCard0AnimationInfo)
         })//push to syncArray
          }//if dealing first hole card

          else if(cardsDealt>playerArrayNumber){
          animatedCards1[cardsDealt] = new self.images.Item(initialX, initialY, self.images.community[0].size.x, self.images.community[0].size.y, self.gameState.zPositionData.cardAnimation)
          self.images.cardAsBitmap(animatedCards1[cardsDealt], null) 
               
   asyncArray.push(function(callback){
    //animationdata
     var dealCard1AnimationInfo = {
            time: animationTime,
            ticks: lastTick+1,
            item: animatedCards1[cardsDealt],
            finalX:self.images.seats[playerArray[playerArrayNumber]].hiddenCards[1].position.x,
            finalY: self.images.seats[playerArray[playerArrayNumber]].hiddenCards[1].position.y,
            onEnd: function(){callback(null, callBackNumber)},
            onTick:null
          }//animation data
      dealHoleCardSound.play() //play sound
               self.animateImage(dealCard1AnimationInfo)
             } )//push to asyncArray
                   
                   }//if dealing second hole card

                
 callBackNumber ++

        asyncArray.push( function(callback){

                       if(_.isNumber(self.gameState.userSeatNumber) && playerArray[playerArrayNumber] == self.gameState.userSeatNumber && holeCardArray){  
                       
                       if(cardsDealt==playerArrayNumber){
                        self.hideChildren(animatedCards0[cardsDealt]) //hide temporarily animated image
                       self.displayShownCard(holeCardArray[0], self.images.seats[playerArray[playerArrayNumber]].shownCards[0])  
                     }
                       else if (cardsDealt>playerArrayNumber){
                        self.hideChildren(animatedCards1[cardsDealt]) //hide temporarily animated image
                           self.displayShownCard(holeCardArray[1], self.images.seats[playerArray[playerArrayNumber]].shownCards[1])  
                       }
          
                       }//if player being dealt to is user AND holecardarrayexists
                    else{ 
                    if(cardsDealt==playerArrayNumber){ 
                      self.hideChildren(animatedCards0[cardsDealt]) //hide temporarily animated image

                      self.displayChildren(self.images.seats[playerArray[playerArrayNumber]].hiddenCards[0])
                    }
                       else if (cardsDealt>playerArrayNumber){
  self.hideChildren(animatedCards1[cardsDealt]) //hide temporarily animated image

                        self.displayChildren(self.images.seats[playerArray[playerArrayNumber]].hiddenCards[1])
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
        for (var i=0;i<this.gameState.numSeats;i++){
            
        this.displayCorrectSeatMessage(i)
        }
    }

//this function prevents card imagefrom protruding past the bottom of the seat
this.adjustHoleCardImageSourceRectangle = function(holeCards, options){
  if(!options){var options = {}}
    var stagesToUpdate  = []
  var cardArray
  var userIndiviualSeatNumbers = false

if(_.isArray(holeCards)){cardArray = holeCards}
else if(_.isNumber(holeCards)){cardArray = _.flatten(this.images.seats[holeCards].hiddenCards, this.images.seats[holeCards].shownCards)}
else if(holeCards instanceof this.images.Item){cardArray = [holeCards]}
  else{throw 'adjusthole cards source rectangle given insufficient parameter'}


//check if it is protruding
for(var i = 0;i<cardArray.length;i++){
if( _.isNumber(options.seatNumber)){var seatNum = options.seatNumber}
 else {var seatNum = this.images.seats[cardArray[i].seatObjectAncestor.nonRotatedSeatNumber]}
  var distanceFromCardTopToSeatBottom =  this.images.seats[seatNum].seat.position.y + this.images.seats[seatNum].seat.size.y  -   cardArray[i].image.y
if(cardArray[i].size.y > distanceFromCardTopToSeatBottom){
  //check if last iteration
 cardArray[i].image.sourceRect = createRectangle(cardArray[i], cardArray[i+1], distanceFromCardTopToSeatBottom)
 stagesToUpdate.push(this.itemChanged(cardArray[i]))
}

if(options.update !== false){this.updateStages(stagesToUpdate)}
  else{return stagesToUpdate}
}

function createRectangle(currentCard, nextCard, height){
  var currentX = currentCard.image.x
  if(nextCard instanceof self.images.Item){var width = nextCard.image.x - currentX}
    else{var width = currentCard.size.x}
//console.log('sourceRect width: '+width+' height: '+height)
  var rectangle = new createjs.Rectangle(0,0,width, height)
  return rectangle
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
         if(_.isElement(parentOfImageObject.image)){$(parentOfImageObject.image).css('display','inline')}
        
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
     self.gameState.seats[seatNumber].inHand = true
  stagesToUpdate.push(   this.displayChildren(this.images.seats[seatNumber].hiddenCards[0], options) )
  stagesToUpdate.push(    this.displayChildren(this.images.seats[seatNumber].hiddenCards[1], options) )

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
            var stagesToUpdate = []
            self.gameState.seats[seatNumber].sitting_out = true
         if(this.images.seats[seatNumber].status.text.text !== "Sitting Out"){
          this.images.seats[seatNumber].status.text.text = "Sitting Out"
          stagesToUpdate.push(this.itemChanged(this.images.seats[seatNumber].status))
        if (options && options.update === false){return stagesToUpdate }
  else(this.updateStages(stagesToUpdate ))
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

//reset hole cards data
if(_.isArray(this.gameState.holeCards)) {this.gameState.holeCards.length  = 0}
  else {this.gameState.holeCards = null}
     //hide community cards
     
stagesToUpdate.push(this.hideChildren(this.images.community[i]))

     //hide players' hands
       for(var i=0; i<this.images.seats.length;i++){ 
        this.hideChildren(this.images.seats[i].hiddenCards, {update:false})
        this.hideChildren(this.images.seats[i].shownCards, {update:false})
        //reset data
               this.images.seats[i].shownCards[0].image = null
       this.images.seats[i].shownCards[1].image = null
        this.gameState.seats[i].inHand = false
     }
stagesToUpdate.push(this.images.seats[0].hiddenCards[0].position.z.stage)
stagesToUpdate.push(this.images.seats[0].shownCards[0].position.z.stage)

     //remove all player's bets
    stagesToUpdate.push(    self.hideAllBets(options) )
        //hide the pot
    stagesToUpdate.push(     self.hideChildren(self.images.totalPotSize, {update:false}) )//main pot
   
        //side pots
 stagesToUpdate.push(    self.updatePotSize())

        //unbind scroll wheel events
         $(this.arrayOfParentsOfStageAndOfContainerArray[this.images.betSlider.vertical.position.z.stage].stage.canvas, '#betSize').unbind('mousewheel')
        $('#betSizeDiv').unbind('mousewheel')

options.update = update
if(update !== false){this.updateStages(stagesToUpdate)}
  else{return stagesToUpdate}


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
      var chipAnimationTime = 700
      var timeBetweenAnimations = 1500
      var timeAtEnd = 700
        var ticks = 33
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
   
  var chipMoveSound = createjs.Sound.createInstance(this.images.sources.moveChipsSound)

console.log('current pot sizes = ')
console.log(this.getCurrentPotSizes())


//------------------------CHECK IF WE SHOULD DO A PREFLOP WINNERS MESSAGE-------------------------------
if (this.getCurrentPotSizes()[0] === 0){

var betSizes = this.getCurrentBetSizes() 
//determine winner
var preflopWinner = players[0].seat 
var preflopWinAmount = 0


var masterSeriesArray = []
var asyncLoserToWinnerParallelAnimationArray = []
var asyncLoserToWinnerParallelAnimationArrayCallBackNumber = 0
var betSizesToHide = []

_.each(betSizes, function(value, seatNumber, list){
preflopWinAmount  = preflopWinAmount + betSizes[seatNumber]
//if not winner and has stack in front of him
  if(betSizes[seatNumber] >0 && seatNumber !== preflopWinner){
    console.log('animating from '+ seatNumber+ ' to '+preflopWinner)
var loserToWinnerStack =  getAnimatePlayersStackToWinnersStackFunction(seatNumber, preflopWinner)
var callbackNumber  = asyncLoserToWinnerParallelAnimationArrayCallBackNumber
  asyncLoserToWinnerParallelAnimationArray.push( 
    function(callback){ 
      loserToWinnerStack( function(){callback(null, callbackNumber)}/*onEnd function*/ )
  } //a single asyncLoserToWinnerParallelAnimation function
    )//push into asyncLoserToWinnerParallelAnimationArray
  asyncLoserToWinnerParallelAnimationArrayCallBackNumber++
  betSizesToHide.push(self.images.seats[seatNumber].bet)
  }//if not winner and has stack in front of him

//if preflop winner hide the bet size
//else if(seatNumber !== preflopWinner ){betSizesToHide.push(self.images.seats[seatNumber].bet)}

})//iterate through stackSizes to push animations from loser to winner

asyncLoserToWinnerParallelAnimationArrayPlaySoundAndHideBetSizeTextCallbackNumber = asyncLoserToWinnerParallelAnimationArrayCallBackNumber
asyncLoserToWinnerParallelAnimationArray.push(function(callback){
chipMoveSound.play()
self.hideChildren(betSizesToHide,{update:false})
callback(null, asyncLoserToWinnerParallelAnimationArrayPlaySoundAndHideBetSizeTextCallbackNumber)
}//function to push
)//push chipmoveSound and hide bet size text
asyncLoserToWinnerParallelAnimationArrayCallBackNumber++

var asyncLoserToWinnerParallelAnimationArrayFinishedFunction  = function(err, results){

if(//!_.isUndefined(err)||!_.isNull(err)||err||(_.isObject(err)&&!_.isEmpty(err)) 
  err){
  console.log('preflop winners message has error');console.log(err)
}//if error with array
else{//if no errors array

if(results.length !== asyncLoserToWinnerParallelAnimationArrayCallBackNumber){console.log('preflop winners message results array incorrect');console.log(results)}
else {
  //check to make sure value is correct
  for(var i = 0;i<results.length;i++){
    if(results[i] !== i){console.log('result value incorrect');console.log(results);throw 'error'}
  }//correct value

  //PERFORM AT END
  var stagesToUpdate = []

stagesToUpdate.push(self.hideAllBets())
stagesToUpdate.push(self.playerPutsChipsInPot(preflopWinner, preflopWinAmount, players[0].chips, {update:false}))
self.updateStages(stagesToUpdate)
}//results array correct length

}// no error with array

}//after parallel array is completed


async.parallel (asyncLoserToWinnerParallelAnimationArray, asyncLoserToWinnerParallelAnimationArrayFinishedFunction)


  return //no need for full winners
}//preflop winners animation




       //now we create arrays of functions for animations FROM pot TO player
        _.each(_.range(potWinners.length), function(potNumber) {
         
            var callID = 0
            //skip pot if empty
            if(!_.isEmpty(potWinners[potNumber])){

                //iterate through all the data of winners in  potWinners[potNumber]
                _.each(_.range(potWinners[potNumber].length), function(inversePotNumber) {
                  var i = potWinners[potNumber].length-1-inversePotNumber
                    //calculate distance each trip will travel based on bottom chip

                var animationDistanceX = self.images.seats[potWinners[potNumber][i].seat].firstChip.position.x - self.images.pots[potNumber].firstChip.position.x 
                var animationDistanceY = self.images.seats[potWinners[potNumber][i].seat].firstChip.position.y - self.images.pots[potNumber].firstChip.position.y 
                //calculate distance between first and second chip column
                var columnDistance = self.images.seats[potWinners[potNumber][i].seat].secondColumnChip.position.x - self.images.seats[potWinners[potNumber][i].seat].firstChip.position.x 

  //create each separate player's chip winnings in the pot, but do not display yet
  var splitPotIntoChipWinningsDisplayChipstackInfo = {
    initialX:self.images.pots[potNumber].firstChip.position.x,
    initialY:self.images.pots[potNumber].firstChip.position.y,
    hidden:true
  }
self.displayChipStack(potWinners[potNumber][i].amountWon, temporaryStacks[potWinners[potNumber][i].temporaryStackNumber],splitPotIntoChipWinningsDisplayChipstackInfo)
               
               var tempNumber = callID
  potIntoChipAnimationArray[potNumber].push(function(callback){
                self.displayChildren(temporaryStacks[potWinners[potNumber][i].temporaryStackNumber].chips)
        //        console.log('displaying the chips of player '+ potWinners[potNumber][i].seat)
                callback(null, tempNumber)
       })//push display chipstack function
  callID++

var chipIntoPotTempCallbackNumber = callID
              //animate chipstacks to the players  
var potIntoChipAnimationFunction = getAnimateChipStackFunction(temporaryStacks[potWinners[potNumber][i].temporaryStackNumber].chips, 
  animationDistanceX, animationDistanceY)

  potIntoChipAnimationArray[potNumber].push(function(callback){
   potIntoChipAnimationFunction(function(){callback(null, chipIntoPotTempCallbackNumber)})  
       })//push function
                callID++
              

//push chip move sound function
var chipMoveSoundCallBacknumber = callbackNumber
potIntoChipAnimationArray[potNumber].push(function(callback){chipMoveSound.play();callback(null, chipMoveSoundCallBacknumber)})
callbackNumber++

                })//iterate thorugh potWinners[potNumber]
                callbackNumber++


    }//if potWinners is not empty
    })//iterate through potWinners array

    var errorNumber = 0
    _.each(_.range(potIntoChipAnimationArray.length), function(inversePotNumber){
var potNumber = potIntoChipAnimationArray.length - 1 - inversePotNumber
      var tempNumber = errorNumber
        if(!_.isEmpty(potIntoChipAnimationArray[potNumber])){

        finalArray.push(function(next){
               //remove chip images from pot
               self.hideChildren(self.images.pots[potNumber].chips)
               self.hideChildren(self.images.pots[potNumber].potSize)
    async.parallel(potIntoChipAnimationArray[potNumber], function(err, results){
      
    //  console.log('pot into chip animation array finished with error then results')
   //   console.log(err)
//console.log(results)
next(null, tempNumber)
    }//asyn paraellel end function

      )//push into async.parallel

})//push into finalArray

errorNumber++
var tempASDF = errorNumber

 finalArray.push(function(next){
 // console.log('preparing to iterate through ')
 // console.log(potWinners[potNumber])
var stagesWeWantToUpdateAfter = []
     _.each(_.range(potWinners[potNumber].length), function(i) {
         //define seatNumber

         var seatNumber = potWinners[potNumber][i].seat
         //update how many chips a player has
         chipsInFrontOfPlayer[seatNumber] = potWinners[potNumber][i].amountWon + chipsInFrontOfPlayer[seatNumber]
     //    console.log('drawing chips next to player' +seatNumber +' seat')

     //     console.log('chips = ' + chipsInFrontOfPlayer[seatNumber]+  ' at '+ self.images.seats[seatNumber].firstChip.position.x+', '+ self.images.seats[seatNumber].firstChip.position.y)
     //     console.log(seatNumber)
             //find end stack size (in case there is a staggered delay)
var maxStackSize = false
for(var z = 0;z<players.length;z++){
  if(players[z].seat === seatNumber){maxStackSize = players[z].chips}
}

var currentStackSize = self.getCurrentStackSizes()[seatNumber]
var newStackSize = currentStackSize + potWinners[potNumber][i].amountWon
//console.log('seatnumber is '+seatNumber)
//console.log('newstacksize is ' +newStackSize)
//console.log('currentStackSize is ' +currentStackSize)
//console.log('maxStackSize is ' +maxStackSize)
//make sure new stacksize isnt higher than max
if(newStackSize>maxStackSize){newStackSize = maxStackSize}


    //    self.images.seats[seatNumber].bet.text.text =  chipsInFrontOfPlayer[seatNumber]
//stagesWeWantToUpdateAfter.push(self.itemChanged(self.images.seats[seatNumber].bet))
   stagesWeWantToUpdateAfter.push(   self.playerPutsChipsInPot(seatNumber,chipsInFrontOfPlayer[seatNumber], newStackSize, {update:false}))

  stagesWeWantToUpdateAfter.push(  self.displayChildren(self.images.seats[seatNumber].bet, {update:false}) )
if(self.arrayOfParentsOfStageAndOfContainerArray[self.images.seats[seatNumber].chips[0].position.z.stage].stage.contains(self.images.seats[seatNumber].chips[0].image)) {
//  console.log(self.images.seats[seatNumber].chips)
}
        //remove temporary animated chipstack
     stagesWeWantToUpdateAfter.push(   self.hideChildren(temporaryStacks[potWinners[potNumber][i].temporaryStackNumber].chips,{update:false}) )
 //           console.log('finished hiding temporary stack number '+potWinners[potNumber][i].temporaryStackNumber)

})//loop through potWinners[potNumber]

self.updateStages(stagesWeWantToUpdateAfter)
console.log('start waiting after pot number '+potNumber)
var wait = setTimeout(function(){
 //   console.log('callback function called')
    next(null, tempASDF)

}, timeBetweenAnimations) //end timeout function


})//push into final array

    errorNumber++

 }// end check if pot is empty
})

var finalChipUpdateCallbackNumbr = errorNumber
//update player stack sizes
finalArray.push(function(next){
for(var i = 0;i<players.length;i++){
self.playerPutsChipsInPot(players[i].seat,  chipsInFrontOfPlayer[players[i].seat],  players[i].chips )
//  console.log('setting player number '+players[i].seat)
if(i == players.length-1){next(null, finalChipUpdateCallbackNumbr)}
}

errorNumber++
}
)//end push

 async.series(finalArray, function(err, results){
 // self.updateStages([])
 //   console.log('winners async series completed with the following errors next line and results 2nd line')
 // console.log(err)
 // console.log(results)


 })
 

function getAnimateChipStackFunction (chipArray, distanceX, distanceY){

var loserToWinnerStackAnimationInfo = {

    item: chipArray,
    finalX:distanceX,
    finalY: distanceY,
    numTicks: ticks,
    onTick:null,
   time: chipAnimationTime

}//animationInfo

var animationFunction = function(onEnd){
loserToWinnerStackAnimationInfo.onEnd = onEnd
self.animateImage(loserToWinnerStackAnimationInfo)
}//animationFunction to return

return animationFunction

}//generic get chip animationFunction

//DECLARE USEFUL FUNCTION TO ANIMATE CHIPS WITH
function getAnimatePlayersStackToWinnersStackFunction (loser, winner){

var animationDistanceX = self.images.seats[winner].firstChip.position.x - self.images.seats[loser].firstChip.position.x
var animationDistanceY = self.images.seats[winner].firstChip.position.y -  self.images.seats[loser].firstChip.position.y
var animationFunction = getAnimateChipStackFunction (self.images.seats[loser].chips, animationDistanceX, animationDistanceY)

return animationFunction
}//useful loser to winner chip animation Function


 }



this.checkIfTableChatFullMessageTextShouldBeScrolledAfterChangingText = function(){

//console.log('checking if messageText is at bottom' )


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
//console.log('content size = '+scroll[0].getContentSize().h +' upper scroll value = '+scroll[0].getScrollTop()+' height of visible paragraph = '+(self.jQueryObjects.tableChatFullParagraph.outerHeight(true)+1))
var isAtBottom = ( scroll[0].getContentSize().h - scroll[0].getScrollTop() <=  parseFloat(self.jQueryObjects.tableChatFullParagraph.outerHeight(true))+1)
}
//console.log('var isAtBottom = ' + isAtBottom)
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
//console.log(self.images.seats[chatInfo.seat].chat)
    self.displayChildren(self.images.seats[chatInfo.seat].chat)
  //   console.log(self.images.seats[chatInfo.seat].chat.text.text)
      //tween image
    var imageTween =  createjs.Tween.get(self.images.seats[chatInfo.seat].chat.image,{loop:false, override:true, paused:true})
     imageTween.to({alpha:originalImageAlpha})
    .to({alpha:0}, 10000)
    .call(self.hideImage,[self.images.seats[chatInfo.seat].chat], self)
    .to({alpha:originalImageAlpha})

    //tween text
  var textTween =    createjs.Tween.get(self.images.seats[chatInfo.seat].chat.text,{loop:false, override:true, paused:true})
     textTween.to({alpha:1})
    .to({alpha:0}, 10000)
    .call(self.hideText,[self.images.seats[chatInfo.seat].chat], self)
    .to({alpha:1})
//unpause
imageTween.setPaused(false)
textTween.setPaused(false)

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
//console.log('needToUpdate = '+needToUpdate)
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


    this.displayInHandOptions = function(options){
              if(!options){var options = {}}
        var update = options.update
      options.update = false
var stagesToUpdate = []

    stagesToUpdate.push(    this.displayChildren(this.images.foldToAnyBet, options))
    stagesToUpdate.push(    this.displayChildren(this.images.sitOutNextHand, options))
     stagesToUpdate.push(    this.displayChildren(this.images.sitOutNextBlind, options))

         options.update = update
if(update === false){return stagesToUpdate}
  else{this.updateStages(stagesToUpdate)}
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

options.update = update
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
   

   
    /*
     $(this.getParentOfStageObject(this.images.betSlider.vertical).stage.canvas).bind('DOMMouseScroll', function(event, delta, deltaX, deltaY) {
      
wheelScrolls = event.originalEvent.wheelDelta/120
self.events.wheelScroll(wheelScrolls)
        })
*/
    }


    this.displayCorrectSeatMessage = function(seatNumber, options){

if(!_.isNumber(this.images.seats[seatNumber].nonRotatedSeatNumber)){
  console.log('correct seat message not displaying of seat # '+seatNumber)
   return}

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



options.update = update
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
        var ticksPerColorChange = 20
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
             

        stagesToUpdate.push(self.itemChanged(self.images.seats[seatNumber].countdown))

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
 // console.log('hiding' + index)
}
else{stagesToUpdate.push(  self.displayChildren(self.images.tableChatFull[index], displayOrHideChildrenOptions) )}

})//end loop through self.sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem

//update text
this.updateTableChatFullMessageTextFromCurrentOrAdditionalData()
//console.log('finished adding to stages for tableChatFull display, now showing which stages should be updated')
//console.log(stagesToUpdate)

displayOrHideChildrenOptions.update  = update
if(update !== false){this.updateStages(stagesToUpdate)}
else{return stagesToUpdate}
}


this.displayTableChatFull = function(hideOrDisplayChildrenOptions){
    if(!hideOrDisplayChildrenOptions){var hideOrDisplayChildrenOptions = {}}
        var update = hideOrDisplayChildrenOptions.update
        hideOrDisplayChildrenOptions.update = false

        var stagesToUpdate = []
/*
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
  this.gameState.tableChatFull.currentlyDisplayingObserverMessages = false
}
else{this.gameState.tableChatFull.currentlyDisplayingObserverMessages = true}
*/

stagesToUpdate.push(this.displayChildren(this.images.hideTableChatFull,hideOrDisplayChildrenOptions))
stagesToUpdate.push(this.hideChildren(this.images.showTableChatFull,hideOrDisplayChildrenOptions))
stagesToUpdate.push(this.displayChildren(this.images.tableChatFull, hideOrDisplayChildrenOptions))
//stagesToUpdate.push(this.displayChildren(this.images.tableChatFull.chatMessageText,hideOrDisplayChildrenOptions))

stagesToUpdate.push( this.updateTableChatFullDisplay(hideOrDisplayChildrenOptions) )

var tableChatFullCanvas = self.arrayOfParentsOfStageAndOfContainerArray[ this.images.tableChatFull.htmlStageElement.position.z.stage].stage.canvas

$(tableChatFullCanvas).css('display','inline')
self.jQueryObjects.tableChatFullParagraph.css('display','inline ')

//restore scrollbar position
 var scrollInfo ={magnitude: self.sessionPreferences.tableChatFull.tableChatFullScrollBarPositionTrueForBottomOrUpperInvisiblePixels.value}
self.moveTableChatFullMessageText(scrollInfo)
self.sessionPreferences.tableChatFull.tableChatFullScrollBarPositionTrueForBottomOrUpperInvisiblePixels.updateValue(self.sessionPreferences.tableChatFull.tableChatFullScrollBarPositionTrueForBottomOrUpperInvisiblePixels.value)

hideOrDisplayChildrenOptions.update = update
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
//set preference (scroll bar location)
 var positionValue
 if(self.checkIfTableChatFullMessageTextShouldBeScrolledAfterChangingText() === true){
   positionValue = true
 }
 else{
  var scroll = self.jQueryObjects.tableChatFullDiv.getNiceScroll()
   positionValue  = scroll[0].getScrollTop()
}
  this.sessionPreferences.tableChatFull.tableChatFullScrollBarPositionTrueForBottomOrUpperInvisiblePixels.value = positionValue


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



//console.log(self.gameState.messageBox.messageBoxImageContainerIndex)
        
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
        } //loop through this.arrayOfParentsOfStageAndOfContainerArray[messageBoxStageNumber].containers
//console.log(messageBoxImageContainerIndex)


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

        var messageBoxWindowSource = self.permanentPreferences.sourceObjects.value.messageBoxBackground
     var messageBoxWindowWidth = messageBoxWindowSource.width  //  var messageBoxWindowWidth = 516
  var messageBoxWindowHeight = messageBoxWindowSource.height   //   var messageBoxWindowHeight = 199
        //declare size variables
  

   var closeXSource = self.permanentPreferences.sourceObjects.value.messageBoxCloseX
 var closeXWidth = closeXSource.width // var closeXWidth = 31
   var closeXHeight = closeXSource.height   //  var closeXHeight = 20
       
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

var maxDistanceFromButtonsToCheckOption = 10

var backgroundContainer = 0
var textContainer = 1
var buttonContainer = 2


//SET MORE DEFAULTS

var defaults = {}
defaults.checkBox = false
defaults.checkBoxText = 'Dont show this message again.'
//defaults.checkBoxCheckedEvent = function(){}
//defaults.checkBoxUncheckedEvent = function(){}

_.defaults(messageInfo, defaults)

         //-------------------set defaults---------------------------
         if(_.isNull(messageInfo)||_.isUndefined(messageInfo)){messageInfo = {}}
         //set default font sizes and colors
       if(_.isNull(messageInfo.title)||_.isUndefined(messageInfo.title)||!(_.isString(messageInfo.title)||!_.isNumber(messageInfo.title))){messageInfo.title = ''}
       if(_.isNull(messageInfo.titleSizeAndFont)||_.isUndefined(messageInfo.titleSizeAndFont)){messageInfo.titleSizeAndFont = '18px ' + self.permanentPreferences.defaultFontType.value}
       if(_.isNull(messageInfo.titleColor)||_.isUndefined(messageInfo.titleColor)){ messageInfo.titleColor = '#000000'}
       if(_.isNull(messageInfo.sizeAndFont)||_.isUndefined(messageInfo.sizeAndFont)){messageInfo.messageSizeAndFont = '13px ' + self.permanentPreferences.defaultFontType.value}
    if(_.isNull(messageInfo.messageColor)||_.isUndefined(messageInfo.messageColor)){ messageInfo.messageColor = '#000000'}
    if(_.isNull(messageInfo.buttonSizeAndFont)||_.isUndefined(messageInfo.buttonSizeAndFont)){messageInfo.buttonSizeAndFont = '13px ' + self.permanentPreferences.defaultFontType.value}
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
     // console.log('calculating width of okay /cancel buttons')
 //     console.log(messageInfo.okayText)
      
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
    if(messageInfo.cancel !== true){ var okayX = stageWidth/2 - messageInfo.okayWidth/2}//ok in middle if no cancel button
        else{//if cancel button, then we want to center the two buttons
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

   //MAKE WINDOW DRAGGABLE
                  self.images.messageBox[messageBoxImageContainerIndex].window.image.addEventListener('mousedown',function(e){
          var options = {animationTarget:self.images.messageBox[messageBoxImageContainerIndex]}
                  self.events.mouseDownClickAndDrag(e,options)
                }
                )

    //add closeX Image
            var closeX =messageBoxWindowX+messageBoxWindowWidth - closeXRightOffset - closeXWidth
        var closeY =  messageBoxWindowY+ closeXTopOffset 
    self.images.messageBox[messageBoxImageContainerIndex].closeWindow.position.x = closeX
      self.images.messageBox[messageBoxImageContainerIndex].closeWindow.position.y = closeY
        self.images.messageBox[messageBoxImageContainerIndex].closeWindow.size.x = closeXWidth
        self.images.messageBox[messageBoxImageContainerIndex].closeWindow.size.y = closeXHeight
        self.positionItemImage( self.images.messageBox[messageBoxImageContainerIndex].closeWindow, {update:false})

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
            if(messageInfo.okayMessages){  self.images.messageBox[messageBoxImageContainerIndex].okay.messages = messageInfo.okayMessages}
                //assign event if assigned

       if(messageInfo.okayEvent){
        //check if is a string submitted via server
          if(_.isString(messageInfo.okayEvent) ){ var okayEvent = eval(messageInfo.okayEvent) }
            // or if its a function
          else if (_.isFunction(messageInfo.okayEvent)){ var okayEvent =   messageInfo.okayEvent }
           }//end check if messageInfo.okayEvent exists

         //set default okayEvent
      if(!_.isFunction(okayEvent)){ var  okayEvent = function(e) { self.events.onButtonClick(e);  self.hideMessageBox()} }

      //assign okay.image.onClick
                    self.images.messageBox[messageBoxImageContainerIndex].okay.image.onClick = function(e){

if(self.images.messageBox[messageBoxImageContainerIndex].checkBoxUnchecked && self.isItemAddedToStage(self.images.messageBox[messageBoxImageContainerIndex].checkBoxUnchecked))
{
  var checkBoxStatus = 'unchecked'
}
  else if(self.images.messageBox[messageBoxImageContainerIndex].checkBoxChecked && self.isItemAddedToStage(self.images.messageBox[messageBoxImageContainerIndex].checkBoxChecked) )
  {
  var checkBoxStatus = 'checked'
}
                      okayEvent(e, checkBoxStatus)
                    }//okay.image.onClick
  
//cancel button
        if(messageInfo.cancel){
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


//--------------------checkbox option------------------------------
if(messageInfo.checkBox){

   self.images.messageBox[messageBoxImageContainerIndex].checkBoxUnchecked = new self.images.Item(0,0,0,0,{stage:messageBoxStageNumber,container:messageBoxImageContainerIndex + buttonContainer})
 self.images.messageBox[messageBoxImageContainerIndex].checkBoxChecked = new self.images.Item(0,0,0,0,{stage:messageBoxStageNumber,container:messageBoxImageContainerIndex + buttonContainer})
self.images.itemsAsCheckBoxes(   self.images.messageBox[messageBoxImageContainerIndex].checkBoxUnchecked,  self.images.messageBox[messageBoxImageContainerIndex].checkBoxChecked, messageInfo.checkBoxText)


//center the checkbox button (X)
var checkBoxWidth = self.images.messageBox[messageBoxImageContainerIndex].checkBoxUnchecked.size.x
var checkBoxX = messageBoxWindowX + messageBoxWindowWidth/2 - checkBoxWidth/2

//get checkBoxY function
var getCheckBoxY = function(){
  //first check for the bottom of the messageBoxText
var messageBoxMessage = self.images.messageBox[messageBoxImageContainerIndex].message
var messageBoxTextBottom = getDisplayObjectPosition(messageBoxMessage.text)  + messageBoxMessage.text.getMeasuredHeight()

var defaultCheckBoxY = self.images.messageBox[messageBoxImageContainerIndex].okay.position.y - maxDistanceFromButtonsToCheckOption -  self.images.messageBox[messageBoxImageContainerIndex].checkBoxUnchecked.size.y

//in this case everything is fine and we do nothing
if(defaultCheckBoxY - messageBoxTextBottom >= maxDistanceFromButtonsToCheckOption){}

//in this case we dont need to resize our message but we ned to move the checkbox closer to the ok/cancel buttons
else if(defaultCheckBoxY - messageBoxTextBottom >= maxDistanceFromButtonsToCheckOption * -1 ){
  var distanceFromButtonsToMessageBottom = self.images.messageBox[messageBoxImageContainerIndex].okay.position.y - messageBoxTextBottom
 var distanceFromCheckBoxToMessageBottomAndButtons =   (distanceFromButtonsToMessageBottom - self.images.messageBox[messageBoxImageContainerIndex].checkBoxUnchecked.size.y)/2
var checkBoxY = self.images.messageBox[messageBoxImageContainerIndex].okay.position.y - distanceFromCheckBoxToMessageBottomAndButtons
}//if message is a bit long and we need to tweak
//in this case message runs too long to display the check box, we must reduce the height of the message
else if(defaultCheckBoxY - messageBoxTextBottom < maxDistanceFromButtonsToCheckOption * -1 ){
//function to reduce size of messageBoxText
//var checkBoxY = getCheckBoxY()
}//if message is too long and we need to resize

if(_.isNumber(checkBoxY) && !_.isNaN(checkBoxY)){return checkBoxY}
  else{return defaultCheckBoxY}

}//getCheckBoxY function

var checkBoxY = getCheckBoxY()
  self.setImageItemPositionAndTextBasedOnImageChange(  self.images.messageBox[messageBoxImageContainerIndex].checkBoxUnchecked, checkBoxX, checkBoxY )
  self.setImageItemPositionAndTextBasedOnImageChange(  self.images.messageBox[messageBoxImageContainerIndex].checkBoxChecked,  checkBoxX, checkBoxY)

//assign onClick functions
 self.images.messageBox[messageBoxImageContainerIndex].checkBoxUnchecked.image.onClick = function(e){
if(_.isFunction(messageInfo.checkBoxUncheckedEvent)){messageInfo.checkBoxUncheckedEvent(e)}
   else if(_.isString(messageInfo.checkBoxUncheckedEvent) ){   eval(messageInfo.checkBoxUncheckedEvent)(e)}
console.log('unchecked mesagebox checkbox clicked')
 var stagesToUpdate = [] 
 stagesToUpdate.push (self.hideChildren(self.images.messageBox[messageBoxImageContainerIndex].checkBoxUnchecked, {update:false} ) )
 stagesToUpdate.push (self.displayChildren(self.images.messageBox[messageBoxImageContainerIndex].checkBoxChecked, {update:false}) )
 self.updateStages(stagesToUpdate)

 }//unchecked.image.onClick
self.images.messageBox[messageBoxImageContainerIndex].checkBoxChecked.image.onClick = function(e){
if(_.isFunction(messageInfo.checkBoxCheckedEvent)){messageInfo.checkBoxCheckedEvent(e)}
  else if(_.isString(messageInfo.checkBoxCheckedEvent) ){  eval(messageInfo.checkBoxCheckedEvent)(e)}

 var stagesToUpdate = [ self.hideChildren(self.images.messageBox[messageBoxImageContainerIndex].checkBoxChecked, {update:false}), self.displayChildren(self.images.messageBox[messageBoxImageContainerIndex].checkBoxUnchecked, {update:false})]
 self.updateStages(stagesToUpdate)
}//checked.image.onClick

}//if we want to display check Box

//if we not displaying textBox
else{
  self.images.messageBox[messageBoxImageContainerIndex].checkBoxUnchecked = null
    self.images.messageBox[messageBoxImageContainerIndex].checkBoxChecked = null
}

           stagesToUpdate.push(self.displayChildren(self.images.messageBox[messageBoxImageContainerIndex], hideOrDisplayChildrenOptions))
stagesToUpdate.push(self.hideChildren(  self.images.messageBox[messageBoxImageContainerIndex].checkBoxChecked, hideOrDisplayChildrenOptions))


//display messageBoxCanvas
$(this.arrayOfParentsOfStageAndOfContainerArray[messageBoxStageNumber].stage.canvas).css('display','inline')

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

       //clear all initial values of text boxes
        $('#maxRadio').prop('checked', false)
         $('#autoRebuyRadio').prop('checked', false)
          $('#otherAmountRadio').prop('checked', false)
             $("#otherAmount").val('')
           $('#autoRebuyAmount').val('')
       $("#maxAmount").val(this.gameState.cashier.max)
        $("#maxAmount").attr("readonly", true)

//displayMin Amount as auto feature
  $('#otherAmountRadio').prop('checked', true)
  $("#otherAmount").val(self.gameState.cashier.min)

//display textboxes for adding chips
          var htmlcashier = document.getElementById('cashier')
    htmlcashier.style.display = 'inline'
document.getElementById('cashierDiv').style.display = 'inline'


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

this.isPreference = function (preference){

if(_.isObject(preference) && (!_.isUndefined(preference.value)  || _.isFunction (preference.updateValue) ) ){return true}
  else{ return false}

}

this.isItemAddedToStage = function(item){
var result = false

if(!item){}
 // console.log('checking if item is added to stage')
//console.log(item)
else if(item.image){
  if(_.isElement(item.image)){//if html element
    result = false
  if($(item.image).css('display') !== 'none'){ return true}
     
  }
  else if (this.arrayOfParentsOfStageAndOfContainerArray[item.position.z.stage].containers[item.position.z.container].contains(item.image)){
    result = true
  }
}

else if(item.text){
  //  console.log('is item added to stage called item has no image and is checking text now')
//  console.log(item)
  if(_.isElement(item.text)){//if html element
   // console.log('item.text is an element')
    result = false
    if($(item.text).css('display') !== 'none'){  }

      }
  else if (this.arrayOfParentsOfStageAndOfContainerArray[item.position.z.stage].containers[item.position.z.container+1].contains(item.text)){
 //   console.log('non element text added to stage returning true')
    result =  true
  }
  else{'item.text is not added to stage and is not an element'}
//console.log(result)
}


return result
}

this.getCurrentStackSizes = function(){
var stackSizes = []

for(var i = 0;i<this.gameState.numSeats;i++){
  //fetch stack size
var size = parseInt(this.images.seats[i].status.text.text)
//check if stackSize is string format, if so stack size  = 0
if( _.isNaN(size) ){size = 0} 
  //if stack is number
else if(_.isNumber(size) ){
if(size<0){size = 0}//if stacksize is negative ,reset it to 0
}//if stack size is a number
else{size = 0}

//push stack size to array
stackSizes.push(size)
}

//console.log('getCurrentStackSizes called and user stackSize = '+ stackSizes[this.gameState.userSeatNumber] + this.gameState.userSeatNumber)
return stackSizes
}

this.getCurrentPotSizes = function(){
 var potSizes = []
var numPots = 1
 //check how many pots are displayed
for(var i =0;i<this.gameState.numSeats-1;i++){
  var potSizeItem = this.images.pots[i].potSize
  var potSize = parseFloat(potSizeItem.text.text)
  if(_.isNaN(potSize)||!_.isNumber(potSize)){potSize = 0}
//console.log('pot nuber '+i +' added to stage = ' +this.isItemAddedToStage(potSizeItem) )
  if(i === 0 || (potSize > 0 && this.isItemAddedToStage(potSizeItem))){
potSizes.push(potSize)
}//if potSize is displayed
else{i=999}//if not exit loop

}//iterate through pots

/*
 //get displayed pot values
if(numPots === 1){
   console.log(this.images.totalPotSize.text)
  console.log(this.images.totalPotSize.text.text)
  potSizes.push(parseFloat(this.images.totalPotSize.text.text.replace(/[^\d.-]/g, '')))

}//if only main pots

else {//if we have side pots
*/
/*
for(var i =0;i<numPots;i++){
  var size = this.images.pots[i].potSize.text.text
  if(_.isNumber(size)){}
   else if(_.isString(size)){ size =  parseFloat(size.replace(/[^\d.-]/g, ''))     }
potSizes.push(size)
}
*/
/*
}//if we have side pots
*/
console.log('get current potsizes called = ');console.log(potSizes)
return potSizes
}


this.getCurrentBetSizes = function(){
 var betSizes = []
for(var i =0;i<this.gameState.numSeats;i++){
  var betSizeItem = this.images.seats[i].bet

  if(this.isItemAddedToStage(betSizeItem)){
betSizes.push(parseFloat(betSizeItem.text.text))
}//if betSize is displayed

//if bet size is displaed check if player has cards in front of him

else if(this.isItemAddedToStage(this.images.seats[i].hiddenCards[0])||this.isItemAddedToStage(this.images.seats[i].shownCards[0])) {
betSizes.push(0)}//if not push 0

else{betSizes.push(false)}//else we push null
}
return betSizes
}

    this.newStreetEnds = function(potSizes){
 var animationTime = 350
        var ticks = 30
var chipMoveSound = createjs.Sound.createInstance(this.images.sources.moveChipsSound)

//unbind scroll wheel events
         $(this.arrayOfParentsOfStageAndOfContainerArray[this.images.betSlider.vertical.position.z.stage].stage.canvas).unbind('mousewheel')
$('#betSizeDiv').unbind('mousewheel')

//master async.series array:
//CREATE ARRAYS FOR ASYNC FUNCTIONS:

var masterSeriesArray = []
var masterCallbackNumber = 0

var asyncParallelChipIntoPotFunctionArray = []
var chipIntoPotCallbackNumber = 0

var updateDisplay = []

//useful function variables:
var stagesToUpdate = []
var allTemporaryItems = []




//end function for async parallel 
var asyncParallelFinishedMasterSeriesCallbackNumber = masterCallbackNumber

//add async parallel function to masterSeriesArray
masterSeriesArray.push(function(masterCallback){
  async.parallel(asyncParallelChipIntoPotFunctionArray, function(err, results){
  if(results.length===chipIntoPotCallbackNumber){
console.log('parallel chips to pot animations finished successfully')
masterCallback(null, asyncParallelFinishedMasterSeriesCallbackNumber)
}//if successfully completed
else{
  console.log('parallel chips to pot animations resulted in errors')
  console.log(err)
}//if not successful
}
)//async.parellel function call
})//push into masterSeriesArray

masterCallbackNumber++

//add cleanup function to masterSeriesArray
var cleanupCallbackNumber  = masterCallbackNumber
masterSeriesArray.push(function(masterCallback){
    cleanup()
    masterCallback(null, cleanupCallbackNumber)
  }
  )

masterCallbackNumber++

//=================finished defining masterSeriesArray ===================================

//get current betSize and potSize data
var currentPots = this.getCurrentPotSizes()
if(currentPots.length>potSizes.length){throw 'current potsizes exceed street_ends message potSize length'}
var currentBets = this.getCurrentBetSizes()
//console.log('currentBets'+currentBets)
//console.log('currentPots '+currentPots)
//calculate variables from data
var currentBetsSortedWithoutSeats = _.without(currentBets, null, undefined, false, true, 0 ).sort(function(x, y){return (x - y) })
var uniqueBets = _.uniq(currentBetsSortedWithoutSeats, true)
//console.log('unique bets:'+uniqueBets)




//determine CHANGE in pot sizes, we hae an array deltaPotSizes
var deltaPotSizes = []
for(var i = 0;i<potSizes.length;i++){
if(_.isNumber(currentPots[i])){deltaPotSizes[i] = potSizes[i] - currentPots[i]}
  else{deltaPotSizes[i] = potSizes[i]}
}

var numPotsToFeed = _.compact(deltaPotSizes).length
var numUniqueBets = _.compact(uniqueBets).length
var firstPotToFeed = potSizes.length - numPotsToFeed
//console.log('displaying changes in pot sizes')
//console.log(deltaPotSizes)
//console.log(_.compact(deltaPotSizes))
//console.log('numpots to feed = '+numPotsToFeed)
if(_.compact(deltaPotSizes).length !== numUniqueBets){
console.log('potSizes = ');console.log(potSizes)
console.log('current pots = ');console.log(currentPots)
console.log('unique bets = ');console.log(uniqueBets)
console.log('deltaPotSizes = ');console.log(deltaPotSizes)
  console.log( 'numUniqueBets not the same as number of pot sizes changed')}


//create triplets of {seatNumber, numChips, potNumber} for user with animations
var splitChipstacksData = []
for(var i = uniqueBets.length - 1 ;i>=0;i--){
  if(i === 0){var chipStackContribution = uniqueBets[i]}
    else{var chipStackContribution = uniqueBets[i] - uniqueBets[i-1]}

//DETERMINE potNumber
    if (i < numUniqueBets - numPotsToFeed){var potNum = potSizes.length - numPotsToFeed}
//console.log('chipstack cotribution is '+chipStackContribution)
else{ var potNum  = potSizes.length - numPotsToFeed + i - numUniqueBets + numPotsToFeed}
for(var seat = 0;seat<currentBets.length;seat++){
 // console.log('seat'+i+'currentbet '+ currentBets[seat])
  //check currentBet array value to see if it is equal or greater than the contribution amount
  if(_.isNumber(currentBets[seat]) && currentBets[seat] >= chipStackContribution){
 //   console.log('pushing to splitChipstacksData')
    splitChipstacksData.push({seatNumber:seat, numChips:chipStackContribution, potNumber: potNum })
  }//check to make sure value in current bets is higher than contribution and is a number
}//iterate through currentBets


}//iterate once for each number of pots to feed


//stacks to animate to a certain potNumber
var temporaryChipstacksToPotNumberIndexIsPotNumber  = []
for(var i = 0;i<potSizes.length;i++){
  temporaryChipstacksToPotNumberIndexIsPotNumber.push([])
}

//split each players stack
//console.log('displaying chipstackdata')
//console.log(splitChipstacksData)
_.each(_.range(splitChipstacksData.length), function(i) {

   var potNumber = splitChipstacksData[i].potNumber
   temporaryChipstacksToPotNumberIndexIsPotNumber[potNumber].push({chips:[]})

   var splitChipStackInfo = {
initialX: self.images.seats[splitChipstacksData[i].seatNumber].firstChip.position.x, 
initialY: self.images.seats[splitChipstacksData[i].seatNumber].firstChip.position.y, 
hidden:true, 
update:false
   }
stagesToUpdate.push(self.displayChipStack(parseFloat(splitChipstacksData[i].numChips), temporaryChipstacksToPotNumberIndexIsPotNumber[potNumber][temporaryChipstacksToPotNumberIndexIsPotNumber[potNumber].length-1],  splitChipStackInfo))
 

  })//iterate thorugh splitChipstacksData

//add toStage and remove betSizes
stagesToUpdate.push( this.hideAllBets({update:false}) )

console.log('displaying array of array of chip parents')
console.log(temporaryChipstacksToPotNumberIndexIsPotNumber)
for(var i = 0;i<temporaryChipstacksToPotNumberIndexIsPotNumber.length;i++){
  for(var n = 0;n<temporaryChipstacksToPotNumberIndexIsPotNumber[i].length;n++){
    stagesToUpdate.push(self.displayChildren(temporaryChipstacksToPotNumberIndexIsPotNumber[i][n].chips,{update:false}))
  }//iterate through temporaryChipstacksToPotNumberIndexIsPotNumber[i]
}//iterate through temporaryChipstacksToPotNumberIndexIsPotNumber
/*
for(var i = 0;i<oldPlayerStacks.length;i++){
stagesToUpdate.push(  this.hideChildren(oldPlayerStacks[i]), {update:false}   )
}
*/
//updatePotSizes in advance (but do not add them to stage)
//this.updatePotSize(potSizes,{hidden:true,update:false})

//=========================create PARALLEL array: asyncParallelChipIntoPotFunctionArray===========================
//animate temporary stacks to their target pots


_.each(_.range(temporaryChipstacksToPotNumberIndexIsPotNumber.length), function(potNumber) {
//iterate through temporaryChipstacksToPotNumberIndexIsPotNumber[potNumber]
_.each(_.range(temporaryChipstacksToPotNumberIndexIsPotNumber[potNumber].length), function(stackNumber) {
var chipArray = temporaryChipstacksToPotNumberIndexIsPotNumber[potNumber][stackNumber].chips
  if(_.isArray(chipArray) && chipArray.length>0){
  //define how far each chip is going to move
var deltaX = self.images.pots[potNumber].firstChip.position.x - temporaryChipstacksToPotNumberIndexIsPotNumber[potNumber][stackNumber].chips[0].image.x
var deltaY = self.images.pots[potNumber].firstChip.position.y - temporaryChipstacksToPotNumberIndexIsPotNumber[potNumber][stackNumber].chips[0].image.y

//iterate through temporaryChipstacksToPotNumberIndexIsPotNumber[potNumber][stackNumber].chips
_.each(_.range(temporaryChipstacksToPotNumberIndexIsPotNumber[potNumber][stackNumber].chips.length), function(n) {
var item = temporaryChipstacksToPotNumberIndexIsPotNumber[potNumber][stackNumber].chips[n]
allTemporaryItems.push(item)
//push function into array

var tempCallBackNumber0 = chipIntoPotCallbackNumber
asyncParallelChipIntoPotFunctionArray.push(function(callback){
var animationData = {//define animation variables
  time:animationTime,
  numTicks:ticks,
  item: item,
  finalX :deltaX + item.image.x,
finalY : deltaY+item.image.y,
  onEnd:function(animationInfo, tweenInstance){
self.hideChildren(animationInfo.item,{update:false})
    callback(null, tempCallBackNumber0)},
    onStart:function(){}
}

self.animateImage(animationData)

})//push function into array
chipIntoPotCallbackNumber++
 })//iterate through temporaryChipstacksToPotNumberIndexIsPotNumber[potNumber][stackNumber].chips

}//check to make sure chip array exists
  })//iterate through temporaryChipstacksToPotNumberIndexIsPotNumber[potNumber]

  })//iterate thorugh temporaryChipstacksToPotNumberIndexIsPotNumber

//push functino that removes betSize text and original chipStacks
var tempCallBackNumber1 = chipIntoPotCallbackNumber
asyncParallelChipIntoPotFunctionArray.push(function(callback){
  if(numPotsToFeed >0){chipMoveSound.play()}//play sound only if we are raking in chips
  self.updateStages(stagesToUpdate)
  stagesToUpdate.length = 0
callback(null, tempCallBackNumber1)
})
chipIntoPotCallbackNumber++

   //=====================asyncParallelChipIntoPotFunctionArray completed=====================================

function cleanup(){
  console.log('street ends cleanup function called')
self.updatePotSize(potSizes)//we want to update this one because 
stagesToUpdate.push(self.hideChildren(allTemporaryItems,{update:false}))

self.updateStages(stagesToUpdate)
}

self.updateStages(stagesToUpdate)
stagesToUpdate.length  = 0
async.series(masterSeriesArray)

    }


this.streetEnds = function(potSizes){


 //unbind scroll wheel events
         $(this.arrayOfParentsOfStageAndOfContainerArray[this.images.betSlider.vertical.position.z.stage].stage.canvas).unbind('mousewheel')
//$('#betSizeDiv').unbind('mousewheel')

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
  self.hideText(self.images.seats[seatNumber].bet,{update:false})
  var animationInfo = {}
  animationInfo.item =  self.images.seats[seatNumber].chips[n]
  animationInfo.finalX = self.images.seats[seatNumber].chips[n].position.x + animationDistanceX
  animationInfo.finalY = self.images.seats[seatNumber].chips[n].position.y+ animationDistanceY
  animationInfo.numTicks = ticks
  animationInfo.time = animationTime
  animationInfo.onEnd = function(){
    console.log('completed animation of player'+seatNumber+' chipstack and chip number '+n);
    callback(null, callBackNumber)

  }


      self.animateImage(animationInfo)

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


  stagesToUpdate.push(   self.updatePreactionOptionDisplayBasedOnLocalData(options) )

if(!_.isNumber(self.gameState.userSeatNumber)){

stagesToUpdate.push( this.hideSeatedOptions(options) )

  return 'display updated based on non seated player'}

else{  //if player is seated

//enable basic seatedoptions
   this.images.getChips.image.onClick = self.events.onButtonClick
     this.images.standUp.image.onClick = this.events.userStands
  stagesToUpdate.push(        this.hideChildren(this.images.getChipsDisabledShape,options) )
stagesToUpdate.push(  this.hideChildren(this.images.standUpDisabledShape,options))


//var userSeatIndex = this.getSeatImageIndex(self.gameState.userSeatNumber, 'rotatedSeatNumber')


var user = self.gameState.seats[self.gameState.userSeatNumber]
var flags = self.gameState.seats[self.gameState.userSeatNumber].flags
var preactionsAct = self.gameState.seats[self.gameState.userSeatNumber].act
var preactionStreet = self.gameState.seats[self.gameState.userSeatNumber].street
var preactionOnce = self.gameState.seats[self.gameState.userSeatNumber].once
var preactionHand = self.gameState.seats[self.gameState.userSeatNumber].hand
var preactionOptionData = self.getPreactionOptionValues()




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
             //display sitout next hand depending on user's flag
             console.log('checking for flags.pending_sit_out == '+flags.pending_sit_out)
              if(flags.pending_sit_out == true){
stagesToUpdate.push( self.hideChildren(self.images.sitOutNextBlind,options))
stagesToUpdate.push( self.hideChildren(self.images.sitOutNextBlindOn,options))
stagesToUpdate.push( self.hideChildren(self.images.sitOutNextHand,options))
        stagesToUpdate.push(        self.displayChildren(self.images.sitOutNextHandOn,options))
              }//if pending_sit_out == trues

else{//if user is not pending sit out, and not sitting out
  stagesToUpdate.push( self.hideChildren(self.images.sitOutNextHandOn,options))
        stagesToUpdate.push(   self.displayChildren(self.images.sitOutNextHand,options))
                            //display sit out next big blind depending on user's flag
              if(flags.post_blind == false){
stagesToUpdate.push( self.hideChildren(self.images.sitOutNextBlind,options))
       stagesToUpdate.push(          self.displayChildren(self.images.sitOutNextBlindOn,options))
              }
                    else{
                  stagesToUpdate.push(     self.hideChildren(self.images.sitOutNextBlindOn,options))
                 stagesToUpdate.push(      self.displayChildren(self.images.sitOutNextBlind,options))
                    }
}//if user is not pending sit out, and not sitting out

  //check if user is involved in hand
             if(this.gameState.seats[self.gameState.userSeatNumber].inHand === true){
                        //fold to any bet button on or off
                        if(this.getPreactionData('fold') ){
if( (preactionOptionData && preactionOptionData.check === false) || this.getPreactionData('check') ){
stagesToUpdate.push( self.hideChildren(self.images.foldToAnyBet,options))
stagesToUpdate.push( self.displayChildren(self.images.foldToAnyBetOn,options))
}
}//if fold preaction enabled

             else{ 
          stagesToUpdate.push(     self.hideChildren(self.images.foldToAnyBetOn,options))
          stagesToUpdate.push(     self.displayChildren(self.images.foldToAnyBet,options))
            }




 }//end check if user is holding cards

} //end check if user is not sitting out

}//if player is seated




//console.log('updateUserOptionsBasedOnFlagsAndPreactions stages to update: ')
//console.log(stagesToUpdate)
options.update = update
if(update === false){return stagesToUpdate}
  else{this.updateStages(stagesToUpdate)}
}

this.getPermanentPreferences = function() {

//var permanentPreferences = $.getJSON('/preferences/1')

$.getJSON('/preferences/1', function(response) { 
console.log('get permanent preferences called, response is: ')
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
//console.log('user seat preference view is:')
//console.log(self.sessionPreferences.changeUserSeatViewTo.value)
    socket.emit('set_flag', 'sessionPreferences', this.sessionPreferences)
console.log(this.sessionPreferences)
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
if(options.maxDepth>=0){//check  to make suer we should continue looking

  _.each (newPreferenceObject, function(element,index,list) {

//do nothing if new value is undefined
  if(!_.isUndefined( newPreferenceObject[index] )){

    //check to make sure current preference object exists, create if it doesnt
if (!_.isObject(currentPreferenceObject[index])){currentPreferenceObject[index] = {}}

//check if newpreference[index]is object and .value is defined
 if( self.isPreference(newPreferenceObject[index])){
//console.log(index + 'is new preference object with value on next line')
  var newValue = newPreferenceObject[index].value
//console.log('newValue as '+index+'.value = '+ newValue)
}

    //check if index is value itself by virtue of not being an object
  else if (!_.isObject(newPreferenceObject[index])){
    var newValue = newPreferenceObject[index]
//console.log('newValue as non-object '+index+' = '+ newValue)
  }

       //if neither updateValue nor value exist, we conclude this is another preference object and call this function again
else if (_.isObject(newPreferenceObject[index])){
  var depth = options.maxDepth
  options.maxDepth =  options.maxDepth-1
 //     console.log('iterating through new non-preference object index: '+index)
  self.updatePreference(currentPreferenceObject[index],newPreferenceObject[index], options )
  options.maxDepth = depth
}


//console.log(newValue)

//check to make sure new value exists, and that new value is differnent from old
if(!_.isUndefined(newValue) && newValue !== currentPreferenceObject[index].value || options.updateEqualValues === true){
//console.log('updating value of curret preference of index '+index +'with old value on next line:')
//console.log (currentPreferenceObject[index].value)
  //check to make sure updateValue function exists
  if(_.isFunction(currentPreferenceObject[index].updateValue)){
        currentPreferenceObject[index].updateValue(newValue, options)
  }//if updateValue function exists

//if not we manually change value
else if (!_.isUndefined(newPreferenceObject[index].value)){currentPreferenceObject[index].value = newValue}
//console.log(index + ' is current object preference that has been changed to: (shown on next line)')
//console.log (currentPreferenceObject[index].value)
}//if new and current preference are not equal and if new preference exists


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

var setPreactionDataOptions = {server:false}

if(!_.isUndefined(flags.check)){
  this.setPreactionData('hand', 'bet', flags.check, setPreactionDataOptions)
}
if(!_.isUndefined(flags.call)){
  this.setPreactionData('hand', 'bet', flags.call, setPreactionDataOptions)
}
if(!_.isUndefined(flags.fold)){
this.setPreactionData('hand', 'bet', flags.fold,setPreactionDataOptions)
}
if(!_.isUndefined(flags.raise)){
this.setPreactionData('hand', 'bet', flags.raise, setPreactionDataOptions)
}
if(!_.isUndefined(flags.bet)){
  this.setPreactionData('hand', 'bet', flags.bet, setPreactionDataOptions)
}

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
 //console.log(stageArray)

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

if(canvasesCleared.length + stagesUpdated.length >0/* && self.performance.numCanvasClears %10 === 0*/){
var logString = 'canvases cleared: '+canvasesCleared.toString()+', total cleared: '+self.performance.numCanvasClears+ ', stages updated: '+stagesUpdated.toString()
// console.log(logString)
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

var wantToUpdate = []

//flatten array
stageNumberLeaveBlankForAll = _.flatten(stageNumberLeaveBlankForAll)

//remove any non number values from array
stageNumberLeaveBlankForAll = _.without(stageNumberLeaveBlankForAll ,null, undefined, false, true, {})
//remove repeats from the array
stageNumberLeaveBlankForAll = _.uniq(stageNumberLeaveBlankForAll)

//iterate through array
for(var i = 0;i<stageNumberLeaveBlankForAll.length;i++){
  //here we get the family of stages for each member of the stage array, then concat + uniquize with our array

if(_.isObject(self.arrayOfParentsOfStageAndOfContainerArray[stageNumberLeaveBlankForAll[i]]) ){//make sure stage is there
  //check if update == true
  if(self.arrayOfParentsOfStageAndOfContainerArray[stageNumberLeaveBlankForAll[i]].upToDate !== true || options.forceUpdate === true ){
wantToUpdate.push (getStageFamilyArray(stageNumberLeaveBlankForAll[i]))
}
}//check stage is object

}//stageNumberLeaveBlankForAll iteration

//flatten array cuz its now nested
wantToUpdate = _.flatten(wantToUpdate)
//uniqize the rray
wantToUpdate = _.uniq(wantToUpdate)
//sorting the array wilbe done automatically in the updateStagesFromArray function

updateStagesFromArray(wantToUpdate)

}//if parameter is array

  else{//if we want to update All stages
//console.log('updating all stages')
var allStages = []
for(var i = 0;i<this.arrayOfParentsOfStageAndOfContainerArray.length;i++){allStages.push(i)}
 this.updateStages( allStages, options)
}//if no stage number specified

}

this.animateDealerButton = function(seatNumber, time){
console.log('animatedealerbuton called')
if(!_.isNumber(seatNumber) || _.isNaN(seatNumber)){
  console.log('dealer button first chip item')
console.log(self.images.pots[0].firstChip)
var finalX = self.images.pots[0].firstChip.position.x
var finalY =self.images.pots[0].firstChip.position.y
}
else{
  console.log('setanumber '+seatNumber+' dealer button item')
  console.log( self.images.seats[seatNumber].dealerButton)
  var finalX = self.images.seats[seatNumber].dealerButton.position.x
var finalY = self.images.seats[seatNumber].dealerButton.position.y
}

var animationInfo = {
item:self.images.dealerButton,
finalX:finalX,
finalY:finalY,
time:time
}
           
           self.animateImage(animationInfo)

}

   this.displayInitialTableState=function(table_state){

var showTable = false
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
     //  if(checkSeatsLoaded() ==true){
      if(showTable === true){
      //  createjs.Ticker.setPaused(true)
                      createjs.Ticker.removeEventListener("tick", tick)
                      //remove all loadingContainers from the stage and remove all children from them
               var parentOfLoadingStage =       self.arrayOfParentsOfStageAndOfContainerArray[self.gameState.zPositionData.loadingBackground.stage]
               parentOfLoadingStage.stage.removeAllChildren()
               self.updateStages(self.gameState.zPositionData.loadingBackground.stage)
              // parentOfLoadingStage.stage.update()
              console.log('loading canvas now')
               $(parentOfLoadingStage.stage.canvas).css('display','none')

               self.activateTicker(50)
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
//console.log(this.sessionPreferences)
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

    if(table_state.stage_name !==  'waiting' && table_state.stage_name !== 'blinding'){
        //display player's cards
         for(var i=0;i<table_state.players.length;i=i+1){
               if(!table_state.players[i].hand || table_state.players[i].hand.length == 0){this.displayHiddenCards(table_state.players[i].seat) }
              
                   else if(table_state.players[i].hand) {
                    this.displayHoleCards(table_state.players[i].hand, table_state.players[i].seat)
        }
        }//iteration through table_state.players

}//check stage is appropriate to give people hole cards

        //pot

var potSizes = []
         for (var i=0;i<table_state.pots.length;i++) {
potSizes[i] = table_state.pots[i].value
          }

        if(_.isArray(potSizes)&&potSizes.length>0){this.updatePotSize(potSizes)}

         //current bets
         for (var i=0;i<table_state.players.length;i=i+1) { 
         this.playerPutsChipsInPot(table_state.players[i].seat,table_state.players[i].current_bet, table_state.players[i].chips)


         this.displayChipStack(table_state.players[i].current_bet, self.images.seats[table_state.players[i].seat])
         }

//inHand options


          //empty seats
         for (var i = 0; i<table_state.max_players;i++){  this.displayCorrectSeatMessage(i)    }

//update user options
       

         //set game data
     self.gameState.bigBlind = table_state.big_blind
     self.gameState.minIncrement = table_state.min_increment
     self.gameState.cashier.currency = table_state.currency
     self.gameState.cashier.currency_per_chip =  table_state.currency_per_chip

//display buttons/table stuff
this.updateUserOptionsBasedOnFlagsAndPreactions()

//update message log for table chat popup

for(var i = 0;i<table_state.messages.length;i++){

this.gameState.tableChatFull.log.push(['dealer', table_state.messages[i]])
this.updateTableChatFullMessageTextFromCurrentOrAdditionalData(null, {update:true})
}


//dealer_button

if(table_state.stage_name === 'waiting'){var dealerPosition = null}
else{var dealerPosition = table_state.dealer}
self.animateDealerButton(dealerPosition,  24)


//TEST FOR POT SIZE
//self.playerPutsChipsInPot(6, 799, 500)
//self.updatePotSize([1,2,3,4,5,6, 7, 8, 9])
 //self.updatePotSize([1,10000,20000,30000,40000,50000, 60000, 70000, 80000])
// console.log('dealer button item = ')
 //console.log(self.images.dealerButton)
 //console.log(self.isItemAddedToStage(self.images.showTableChatFull))
 //self.adjustHoleCardImageSourceRectangle(self.images.background, {seatNumber:4})
 
 //self.images.showTableChatFull.image.sourceRect = new createjs.Rectangle(0,0,30,30)
 //self.updateStages(0, {forceUpdate:true})

showTable = true
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
      self.clearExpirationData('street', i)
        }

 self.newStreetEnds(potSizes)
 //      self.streetEnds(potSizes)

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
       socket.on('player_gets_refund', function(player, betSize, totalPotSize){
           var stackSize = player.chips
           var betSize = betSize
           var seatNumber = player.seat

var stagesToUpdate = []
   stagesToUpdate  .push   (  self.playerPutsChipsInPot(seatNumber, betSize, stackSize))
      //     self.displayChipStack(betSize, self.images.seats[seatNumber])
        stagesToUpdate.push    (    self.updatePotSize(totalPotSize))

        self.updateStages(stagesToUpdate)

})


    //community cards are dealt
       socket.on('community_dealt', function(community){


            self.dealCommunity(community)
                
})

        //dealer_chip is moved
       socket.on('dealer_chip', function(seatNumber){

self.animateDealerButton(seatNumber, 350)

})

socket.on('hands_dealt', function(players, tableInfo){
//show hand number
    

    //show dealer button
  //  self.images.dealerButton.image.x = self.images.seats[tableInfo.dealer].dealerButton.position.x
   //  self.images.dealerButton.image.y = self.images.seats[tableInfo.dealer].dealerButton.position.y
     self.displayChildren(self.images.dealerButton)

    //deal cards
    var playerArray = []
    for(var i = 0; i<players.length;i++){playerArray.push(players[i].seat)}

    if(self.gameState.holeCards) { 
    self.dealHoleCards(tableInfo.small_blind_seat,playerArray, self.gameState.holeCards)
    self.displayInHandOptions()
    }
    else{self.dealHoleCards(tableInfo.small_blind_seat,playerArray)}
  //  self.gameState.holeCards = null
})

//pending_sit_out
socket.on('pending_sit_out', function(value){

if(!_.isNumber( self.gameState.userSeatNumber)){return}
self.gameState.seats[self.gameState.userSeatNumber].flags['pending_sit_out'] = value
self.updateUserOptionsBasedOnFlagsAndPreactions()


})


//flag is set
       socket.on('flag_set', function(flag, value){
 //console.log($('#server_values').data('table_state'))

 //var userSeatIndex = self.getSeatImageIndex(self.gameState.userSeatNumber, 'rotatedSeatNumber')
   
           switch (flag){

case 'pending_sit_out':
self.gameState.seats[self.gameState.userSeatNumber].flags.pending_sit_out = value

/*
           break;

           case 'post_blind':
           self.gameState.seats[self.gameState.userSeatNumber].flags.post_blind = value

break;
*/


default:
if(flag.indexOf('sessionPreferences') !== -1){
 // console.log('session preference flag received')
 self.updatePreference(self.sessionPreferences, value)
}
else{
//console.log('display flags of player number '+self.gameState.userSeatNumber)
//console.log((flag.indexOf('sessionPreferences') === 0))
//console.log(self.gameState.seats[self.gameState.userSeatNumber].flags)

self.gameState.seats[self.gameState.userSeatNumber].flags[flag] = value
self.setPreactionData('hand',flag,value, {server:false}) 
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

var seatNum = player.seat
//clear on act data
self.clearExpirationData('act', seatNum)
        self.playerActs(seatNum, action.toUpperCase(), 1.2)
        
    //display updated potsize if necessary
        if(pot&&action!=='check'){self.updatePotSize(pot)}

        switch(action.toLowerCase()){
        case 'fold':
        //create hole cards copies for future animations:
       self.createHoleCardCopyIfNeeded(seatNum)
        var foldSound = createjs.Sound.createInstance(self.images.sources.foldSound)
            foldSound.play()
        self.hideHoleCards(seatNum)
      //  self.hideBet(seatNum)
        self.gameState.seats[seatNum].inHand = false
        if(player.seat == self.gameState.userSeatNumber){
            self.hideChildren(self.images.foldToAnyBet)
            self.hideChildren(self.images.foldToAnyBetOn)
            }
            break;

            case 'check':
            var checkSound = createjs.Sound.createInstance(self.images.sources.checkSound)
            checkSound.play()
               self.gameState.seats[seatNum].inHand = true
            break;

            case'bet':
            var betSound = createjs.Sound.createInstance(self.images.sources.betSound)
            betSound.play()
        //    self.displayChipStack(player.current_bet, self.images.seats[player.seat], self.images.seats[player.seat].firstChip.position.x,self.images.seats[player.seat].firstChip.position.y )
            self.playerPutsChipsInPot(seatNum, player.current_bet, player.chips)
               self.gameState.seats[seatNum].inHand = true
            break;

            case'call':
              var betSound = createjs.Sound.createInstance(self.images.sources.betSound)
            betSound.play()
      //       self.displayChipStack(player.current_bet, self.images.seats[player.seat], self.images.seats[player.seat].firstChip.position.x,self.images.seats[player.seat].firstChip.position.y )
            self.playerPutsChipsInPot(seatNum,player.current_bet, player.chips)
               self.gameState.seats[seatNum].inHand = true
             break;

            case 'raise':
              var betSound = createjs.Sound.createInstance(self.images.sources.betSound)
            betSound.play()
       //      self.displayChipStack(player.current_bet, self.images.seats[player.seat], self.images.seats[player.seat].firstChip.position.x,self.images.seats[player.seat].firstChip.position.y )
            self.playerPutsChipsInPot(seatNum,player.current_bet, player.chips)
               self.gameState.seats[seatNum].inHand = true
            break;

            case'post_blind':
              var betSound = createjs.Sound.createInstance(self.images.sources.betSound)
            betSound.play()
      //      self.displayChipStack(player.current_bet, self.images.seats[player.seat], self.images.seats[player.seat].firstChip.position.x,self.images.seats[player.seat].firstChip.position.y )
            self.playerPutsChipsInPot(seatNum,player.current_bet, player.chips)
              self.gameState.seats[seatNum].inHand = true
            break;

        }
             self.gameState.seats[seatNum].toAct = false
             //clear once for user
             if(seatNum === self.gameState.userSeatNumber){
              self.gameState.seats[self.gameState.userSeatNumber].once = {}
        //unbind scroll wheel events
         $(self.arrayOfParentsOfStageAndOfContainerArray[self.images.betSlider.vertical.position.z.stage].stage.canvas).unbind('mousewheel')
//$('#betSizeDiv').unbind('mousewheel')
            }

          self.updateUserOptionsBasedOnFlagsAndPreactions() 
})

//user to act 
 socket.on('act_prompt', function(actions, timeout){

console.log('act prompt received')
console.log(actions)

self.playerToAct(self.gameState.userSeatNumber, timeout)
self.updateUserOptionsBasedOnFlagsAndPreactions()

   //  self.startCountdown(self.gameState.userSeatNumber,Math.round(timeout/1000))


/*

//check for valid preactions
for (var i = 0; i < actions.length; i++){
     if (actions[i].fold !== undefined){
      //check to see if we have a preaction if we do just act
      if(self.getPreactionData('fold')){socket.emit('act', 'fold')}
        }
       else if (actions[i].check !== undefined){
        if(self.getPreactionData('check')){socket.emit('act', 'check')}
         }
      else   if (actions[i].call){
var checkIfCallIsValid = function(value){if(_.isNumber(value)&&value===actions[i].call){return true}}
if(self.getPreactionData('call', checkIfCallIsValid)){socket.emit('act', 'call',actions[i].call);return}
         }
       else  if (actions[i].raise){
var checkIfRaiseIsValid = function(value){if(_.isNumber(value)&&value>=actions[i].raise[0]){return true}}
var raisePreactionData = self.getPreactionData('raise', checkIfRaiseIsValid)
if(raisePreactionData){socket.emit('act', 'raise',raisePreactionData.value);return}
         }
      else if (actions[i].bet){
var checkIfRaiseIsValid = function(value){if(_.isNumber(value)&&value>=actions[i].bet[0]){return true}}
var betPreactionData = self.getPreactionData('bet', checkIfRaiseIsValid)
if(betPreactionData){socket.emit('act', 'bet',betPreactionData.value);return}
         }
         }

*/

//display bet slider
     for (var i = 0; i < actions.length; i++){
     if (actions[i].fold !== undefined){
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
var onClick = self.images.raise.onClick
self.images.raise.onClick = function(event){
self.setPreactionData('hand', 'fold', false)
self.setPreactionData('hand', 'check', false)
  onClick(event)
}

         self.displayBetSlider(actions[i].raise[0], actions[i].raise[1], 1)
         }
      else if (actions[i].bet){
         self.displayButton(self.images.bet,'bet '+actions[i].bet[0] ,['act','bet',actions[i].bet[0]])

         var onClick = self.images.raise.onClick
self.images.bet.onClick = function(event){
self.setPreactionData('hand', 'fold', false)
self.setPreactionData('hand', 'check', false)
  onClick(event)
}
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
  if(notificationString == "You will sit out as soon as the hand is over."){return null} //check if sit out
  else  if( notificationString.indexOf('chips as soon as the hand is over') !== -1){self.hideCashier()}//check if chips added
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
        var stagesToUpdate = []
        self.gameState.seats[player.seat].flags.pending_sit_out = false
          self.gameState.seats[player.seat].sitting_out = false

           self.images.seats[player.seat].status.text.text = player.chips
stagesToUpdate.push(self.itemChanged( self.images.seats[player.seat].status))
        if(player.seat == self.gameState.userSeatNumber){
          self.updateLocalGameDataBasedOnServerPlayerObject(player) 
}
 stagesToUpdate.push(     self.updateUserOptionsBasedOnFlagsAndPreactions({update:false}))
        self.updateStages(stagesToUpdate)
})

//player sits out
       socket.on('player_sits_out', function(player){
var stagesToUpdate = []

     stagesToUpdate.push(    self.playerSitsOut(player.seat) )
/*
        if(self.images.seats[player.seat].status.text.text !== 'Sitting Out' ){
      stagesToUpdate .push(    self.images.seats[player.seat].status.text.text = 'Sitting Out')
     stagesToUpdate.push(     self.itemChanged( self.images.seats[player.seat].status.text) )
       }
*/
        if(player.seat == self.gameState.userSeatNumber){
     stagesToUpdate .push(    self.updateLocalGameDataBasedOnServerPlayerObject(player, {update:false}) )
  stagesToUpdate .push(self.updateUserOptionsBasedOnFlagsAndPreactions({update:false}))
}
          self.updateStages(self.images.seats[player.seat].status.position.z.stage)
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

for(var i = 0;i<self.gameState.seats.length;i++){
  self.gameState.seats[i].inHand = false
  self.gameState.seats[i].toAct = false
}
self.updateUserOptionsBasedOnFlagsAndPreactions()
         self.winners(players)
   

})

//reset table
socket.on('reset_table', function(players){
var options = {}
options.update = false

var stagesToUpdate = []

     stagesToUpdate.push(    self.roundEnds() )
 for(var i = 0;i<self.images.seats.length;i++){
   self.clearExpirationData('act', i)
 self.clearExpirationData('street', i)
self.clearExpirationData('once', i)
self.clearExpirationData('hand', i)

stagesToUpdate.push(    self.hideChildren(self.images.seats[i].hiddenCards,options))
 stagesToUpdate.push(  self.hideChildren(self.images.seats[i].shownCards,options))
}
stagesToUpdate.push(self.hideChildren(self.images.community,options))
stagesToUpdate.push( self.updateUserOptionsBasedOnFlagsAndPreactions(options))

self.updateStages(stagesToUpdate)
})

    }//this.activateSockets

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

 //console.log($('#server_values').data('table_state'))
    holdemCanvas = new Table()
    holdemCanvas.updatePreference(holdemCanvas.permanentPreferences, holdemCanvas.getPermanentPreferences())
    holdemCanvas.updatePreference(holdemCanvas.permanentPreferences, holdemCanvas.permanentPreferences, {updateEqualValues:true})

   holdemCanvas.initializeParent()

      console.log(document)
      
    // console.log(holdemCanvas.images.sources)
    // console.log(holdemCanvas.images.sourceObjects)
//console.log(holdemCanvas.images.seats)
    })
 
    
