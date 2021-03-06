
    //default canvas size is 690x480
    //all numbers are in base 0, including variable names and documentation
    //seat position 0 is top middle and proceeds clockwise
function Table () { 
var self = this


self.jQueryObjects = {}
self.jQueryObjects.pokerTableDiv = $('#pokerTableWrapper')
self.jQueryObjects.canvasDiv = $('#pokerCanvasDiv')
self.jQueryObjects.tableChatFullDiv = $('#tableChatFullTextDiv')
self.jQueryObjects.tableChatFullParagraph = $('#tableChatFullText')
//this.jQueryObjects.chatBoxDiv = $('#chatDiv')
self.jQueryObjects.chatBoxInput = $('#chat')
self.jQueryObjects.cashierForm = $('#cashier')
self.jQueryObjects.backingStoreRatioTester = $('#backingStoreRatioTester')

var devicePixelRatio = window.devicePixelRatio || 1
//var devicePixelRatio = 1 
var backingStorePixelRatio = 1  //var backingStorePixelRatio = null


var viewedCanvasWidth = self.jQueryObjects.canvasDiv.outerWidth(true); var viewedCanvasHeight = self.jQueryObjects.canvasDiv.outerHeight(true)
var technicalCanvasWidth = null ; var technicalCanvasHeight = null;


//var expandedviewedCanvasWidth = viewedCanvasWidth*devicePixelRatio/backingStorePixelRatio




self.isIframe = function(){
  if (_.isArray($('#server_values').data('current_table_names'))){return false}
    else{return true}
}


self.getPlayZoneLandingPage = function(){
 if (self.isIframe()){var page = window.parent}
else{var page = window}
  return page
}

self.getIframeLib = function(){return playZoneLandingPage.iframes}

self.getTableName = function(){return $('#server_values').data('table_name')}

self.getIframe = function(){return $(playZoneLandingPage.document).find('#iframe_'+self.getTableName())[0]}

var playZoneLandingPage =  self.getPlayZoneLandingPage()

if(!_.isObject(playZoneLandingPage.sourceObjects)){playZoneLandingPage.sourceObjects = {}}

            this.events = {}
            this.css = {
noFat: 'noFat'
,unselectable: 'unselectable'
,noTranslate: 'notranslate'
,canvas:'pokerCanvasClass'
,inline:'inline'
,messageBoxButton: 'messageBoxButton'
,bootstrapButton: 'btn'
,noSpin: 'noSpinNumberInputField'
 }

  this.imageData = {
      maxChipsPerColumn:5,
      distanceBetweenChipColumns:4,
      chatBoxAlpha:0.75,
      maxChipColumns:3,
      numberOfPlayersSet:false
      ,defaultDisplayCSS:'inline'
  }

  //============PREFERENCES================
var sessionPreferences = {

displaySize:{value:'desktop', updateValue:function(newValue){
 // console.log(permanentPreferences.sourceObjects.value)
this.value = newValue
            if(sessionPreferences.displaySize == 'mobile'){
              if(!_.isObject(permanentPreferences.sourceObjects.value.mobileCards)){permanentPreferences.sourceObjects.value.mobileCards = {}}
              self.images.sources.cardImageFolder = self.images.sources.mobileCardFolder
permanentPreferences.sourceObjects.value.cardObjectParent = permanentPreferences.sourceObjects.value.mobileCards
            }
            else {
              if(!_.isObject(permanentPreferences.sourceObjects.value.desktopCards)){permanentPreferences.sourceObjects.value.desktopCards = {}}
              self.images.sources.cardImageFolder = self.images.sources.desktopCardFolder
permanentPreferences.sourceObjects.value.cardObjectParent = permanentPreferences.sourceObjects.value.desktopCards
            }
//redraw table//update card sizes here
}//change value function
},//displaySize
      changeUserSeatViewTo:{value:false, updateValue: function(newValue){
       
this.value  = newValue

if(self.gameState.itemsCreated === true){return self.changeUserSeatView(this.value)}

        } 
      },

tableChatFull:{
      tableChatFullScrollBarPositionTrueForBottomOrUpperInvisiblePixels:{value: true, updateValue:function(newValue){
this.value = newValue
if(self.gameState.itemsCreated === true){
var movementObject = {}
movementObject.magnitude = newValue
return self.moveTableChatFullMessageText(movementObject)
}
}//updateValue function
},//tableChatFullScrollBarPositionTrueForBottomOrUpperInvisiblePixels
        defaultItemsToHideFalseHidesItem:{
                  hideDealerMessages:{value:true, updateValue: function(newValue, options){
                    if(!options){var options = {}}
                      var update = options.update
      if((newValue === false || this.value === false) && newValue !== this.value){    options.update = true}
this.value = newValue
if(self.gameState.itemsCreated === true){return self.updateTableChatFullDisplay(null, options)}
                  }//hideDealerMessages.updateValue function
                },//hideDealerMessages
                  hideDealerMessagesOn: {value:false, updateValue: function(newValue, options){
                                        if(!options){var options = {}}
                      var update = options.update
      if((newValue === false || this.value === false) && newValue !== this.value){    options.update = true}
this.value = newValue

if(self.gameState.itemsCreated === true){return self.updateTableChatFullDisplay(options)}
                  }//hideDealerMessagesOn.updateValue function
                },//hideDealerMessagesOn
                  hidePlayerMessages:{value:true, updateValue: function(newValue, options){
                                                            if(!options){var options = {}}
                      var update = options.update
      if((newValue === false || this.value === false) && newValue !== this.value){    options.update = true}

this.value = newValue
if(self.gameState.itemsCreated === true){return self.updateTableChatFullDisplay(options)}
                  }//hidePlayerMessages.updateValue function
                },//hidePlayerMessages
                  hidePlayerMessagesOn: {value:false, updateValue: function(newValue, options){
                                                                                if(!options){var options = {}}
                      var update = options.update
      if((newValue === false || this.value === false) && newValue !== this.value){    options.update = true}
this.value = newValue
if(self.gameState.itemsCreated === true){return self.updateTableChatFullDisplay(options)}
                  }//hidePlayerMessagesOn.updateValue function
                },//hidePlayerMessagesOn
                  hideObserverMessages:{value:true, updateValue: function(newValue, options){
                                                                                if(!options){var options = {}}
                      var update = options.update
      if((newValue === false || this.value === false) && newValue !== this.value){    options.update = true}
this.value = newValue
if(self.gameState.itemsCreated === true){return self.updateTableChatFullDisplay(options)}
                  }//hideObserverMessages.updateValue function
                },//hideObserverMessages
                  hideObserverMessagesOn: {value:false, updateValue: function(newValue, options){
                                                                                if(!options){var options = {}}
                      var update = options.update
      if((newValue === false || this.value === false) && newValue !== this.value){    options.update = true}
this.value = newValue
if(self.gameState.itemsCreated === true){return self.updateTableChatFullDisplay(options)}
                  }//hideObserverMessagesOn.updateValue function
                },//hideObserverMessagesOn
                  popOut:{value:true, updateValue: function(newValue, options){
                                                                                if(!options){var options = {}}
                      var update = options.update
      if((newValue === false || this.value === false) && newValue !== this.value){    options.update = true}
this.value = newValue
if(self.gameState.itemsCreated === true){return self.updateTableChatFullDisplay(options)}
                  }//popOut.updateValue function
                },//popOut
                  popOutOn:{value:false, updateValue: function(newValue, options){
                                                                                if(!options){var options = {}}
                      var update = options.update
      if((newValue === false || this.value === false) && newValue !== this.value){    options.update = true}
this.value = newValue
if(self.gameState.itemsCreated === true){return self.updateTableChatFullDisplay(options)}
                  }//popOutOn.updateValue function
                }//popOutOn

  }//default items to hide

}//table chat full

  }//session preferences declaration


  var permanentPreferences = {

      confirmSeatRotation:{value:true}

//defaultFontType:{value:'Planer_Reg'},
,defaultFontType:{value:'arial'}
//,defaultFontType:{value: 'MonoxilRegularRegular'}

        ,sourceObjects:{value:playZoneLandingPage.sourceObjects, updateValue:function(newValue){
var newerValue = newValue
if(!_.isObject(newValue)){
  console.log('permanent preferences creating new playZoneLandingPage.sourceObjects = {}')
  if(!_.isObject(playZoneLandingPage.sourceObjects)){playZoneLandingPage.sourceObjects = {}}
var newerValue = playZoneLandingPage.sourceObjects
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
stagesToUpdate.push ( self.easelJSDisplayObjectChanged(self.images.seats[i].chat.text.color = this.value))}//iterate thorugh this.images.seats

self.updateStages(stagesToUpdate)
}//if items have been created
      }//onchange function

    },
      

      tableChatFull:{
    // scrollBarType:   {value:'mCustomScrollbar'},
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

        windowColor: {value:'#000000'  },

        windowAlpha:{value: 0.4 , updateValue: function(newValue){

this.value = newValue
if(self.gameState.itemsCreated === true ){
self.updateStages  (self.easelJSDisplayObjectChanged (self.images.tableChatFull.window.alpha = this.value))
}
         }//windowAlpha.updateValue
      }

  }//permanent preferences . tableChatFull

}//permanent preferences


this.performance = {}
this.performance.numCanvasClears = 0

var zPositionData = {
  stages:{}
 // ,divs:{}
  ,canvases:{}
  ,containers:{}
}
zPositionData.stageArray = ['staticItems', 'animatedAndMiddleTableItems', 'tableChatFull', 'cashier', 'initialMessageBox', 'secondMessageBox', 'finalMessageBox', 'loadingScreen']   

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
mouseDown:false,
fullTextString:''
        }

        this.gameState.betSize = new Number
        this.gameState.displaySize = 'normal'
        this.gameState.secondsToAct
        this.gameState.userSeatNumber = false

this.gameState.act = {}
 this.gameState.street = {}
    this.gameState.once = {}
        this.gameState.hand = {}
        this.gameState.permanent = {}

        this.gameState.seats = []

        for(var i = 0;i<this.gameState.numSeats;i++){
             this.gameState.seats[i]= {}
               this.gameState.seats[i].act = {}
             this.gameState.seats[i].once = {}
            this.gameState.seats[i].street = {}
             this.gameState.seats[i].hand = {}
             this.gameState.seats[i].permanent = {displayMessageType:'openSeat'}

//self.setPreactionData('permanent', 'displayMessageType', 'openSeat', {seat:i})
         //     this.gameState.seats[i].originalSeatNumber = i
       //        this.gameState.seats[i].rotatedSeatNumber = i
       //         this.gameState.seats[i].nonRotatedSeatNumber = i
        }
        this.gameState.cashier = {}
        this.gameState.tableChatBox = {}
        this.gameState.messageBox = {}


var startingContainerIndex = -2

var stageNumberData = {}
         stageNumberData.staticItems=0
         stageNumberData.holeCardsAndButtons=stageNumberData.staticItems+1
         stageNumberData.animatedAndMiddleTableItems=stageNumberData.holeCardsAndButtons+1
         stageNumberData.playerBubbleChat = stageNumberData.animatedAndMiddleTableItems+1
         stageNumberData.chatBox=stageNumberData.playerBubbleChat+1

         stageNumberData.tableChatFull=stageNumberData.chatBox+1
        
         stageNumberData.cashier=stageNumberData.tableChatFull+1
         stageNumberData.messageBox=stageNumberData.cashier+1
         stageNumberData.loadingContainers=stageNumberData.messageBox+1

            


function StageInitializationInfo(stageName, stageNumber, containerArray, stageOptions, canvasOptions, divOptions){
var zDataObject = zPositionData
var stageData = zPositionData.stages
var directContainerData = zPositionData.containers
var canvasData = zPositionData.canvases
//var divData = zPositionData.divs

this.name = stageName
this.stageNumber = stageNumber
this.stageOptions = stageOptions
this.canvasOptions = canvasOptions
this.divOptions = divOptions

if(!_.isArray(containerArray)){console.log(stageName)}
this.numContainers = containerArray.length + 1
this.containerArray = containerArray
this.containers = {}

var stageInfo = this



var file1ContainerName = function(name, number){

//if name already exists, we will set it as undefined so we cannot get them confused later
if(_.isObject(directContainerData[name])){ directContainerData[name] = false }

  //if name isnt there, we can file this to get it later
else if (directContainerData[name] !== false) {directContainerData[name] = {container:number,stage:stageNumber}     }


//assign data to the stage data object
stageInfo.containers[name] = number

}

_.each(_.range(startingContainerIndex, containerArray.length), function(containerNumber){

var value = containerArray[containerNumber]

//if spaces split into array
if(_.isString(value) && value.indexOf(' ') !== -1){value = value.split(' ')}

//if its an array whether originally or now, then we call function multiple times
if(_.isArray(value)){ 

_.each(value, function(name, element, newList){ file1ContainerName(name, containerNumber) })

}

//if string we directly do it
else if (_.isString(value)){file1ContainerName(value, containerNumber)}

})//iterate through container


//assign data to outside function object to store it
stageData[stageName] = this
  if(stageOptions.newCanvas === true || stageNumber === 0){canvasData[stageName] = this}


}//Constructor for stage initialization object


self.getZData = function(){return zPositionData}


var getZ = function(containerNameOrNumber, stageNameOrNumber){

var stageObject; 
var stageNumber; var containerNumber

//if container is given and valid all on its own
if(_.isString(containerNameOrNumber) && _.isObject(zPositionData.containers[containerNameOrNumber])){
  var z = zPositionData.containers[containerNameOrNumber]
return z
}

//if only stage is given
else if(!_.isString(stageNameOrNumber) && !_.isNumber(stageNameOrNumber)){

var stageNameOrNumber = containerNameOrNumber; var containerNameOrNumber = 0

}

if(_.isNumber(stageNameOrNumber)){
stageNumber = stageNameOrNumber
var stageName = zPositionData.stageArray[stageNumber]
stageObject = zPositionData.stages[stageName]
}//if stage is number
else if (_.isString(stageNameOrNumber)){
stageObject = zPositionData.stages[stageNameOrNumber]
stageNumber = stageObject.stageNumber
}//if stage is string
else{throw 'incorrect parameter for stage passed on get z: ' + stageNameOrNumber}


if(_.isString(containerNameOrNumber)){
containerNumber =  stageObject.containers[containerNameOrNumber]
}//if container is string

else if (_.isNumber( containerNameOrNumber)){
containerNumber = containerNameOrNumber
}//if container passed as number

//default container to 0
else{  containerNumber = 0}


var z = {stage: stageNumber, container: containerNumber}
if(!_.isNumber(stageNumber)){console.error(stageNameOrNumber);throw''}

return z
}



var createZPositionData = function(){

var stageOptionData = {}
var stageContainers = {}
var canvasOptionData = {}
var divOptionData = {}

var disabledOptions = {
  mouseEnabled : false,
enableDOMEvents : false,
mouseOverFrequency:0,//disabled mousever
touchEnabled:false
,newCanvas:true
}

stageOptionData.staticItems = {
mouseEnabled : true,
enableDOMEvents : true,
touchEnabled:true,
mouseOverFrequency:30
,newCanvas:true
            }//staticItems stage options
stageContainers.staticItems = ['table', 'buttons chat', null, 'holeCards', 'seats', 'betSlider', 'bubbleChat' , null, 'community', 'dealerChip','chips', null, 'chipAnimation', null, 'contextMenu', null]
stageContainers.staticItems[startingContainerIndex] = 'background'
//stageContainers.staticItems[startingContainerIndex+1] = null

stageOptionData.animatedAndMiddleTableItems = _.clone(disabledOptions)
stageOptionData.animatedAndMiddleTableItems.newCanvas = true
stageContainers.animatedAndMiddleTableItems = ['cardAnimation', 'growl-container']
divOptionData.animatedAndMiddleTableItems = {mouseDisabled:true}

stageOptionData.tableChatFull = _.clone(stageOptionData.staticItems)
//stageOptionData.tableChatFull.newCanvas = true
//stageOptionData.tableChatFull.mouseOverFrequency = 0
stageContainers.tableChatFull = ['background text', null,  'buttons', null]
divOptionData.tableChatFull = {hidden : true}
//divOptionData.tableChatFull = {mouseDisabled : true}

stageOptionData.cashier = _.clone(stageOptionData.staticItems)
stageOptionData.cashier.newCanvas = true
stageOptionData.cashier.mouseOverFrequency = 30
stageContainers.cashier = ['background text', null, 'buttons']
divOptionData.cashier = {hidden : true}

stageOptionData.initialMessageBox = _.clone(stageOptionData.staticItems)
stageOptionData.initialMessageBox.newCanvas = true
stageOptionData.initialMessageBox.mouseOverFrequency = 0
stageContainers.initialMessageBox = ['background text', null, 'buttons']
divOptionData.initialMessageBox = {hidden : true}

stageOptionData.secondMessageBox = _.clone(stageOptionData.staticItems)
stageOptionData.secondMessageBox.newCanvas = true
stageOptionData.secondMessageBox.mouseOverFrequency = 0
stageOptionData.secondMessageBox.canvasHidden = true
stageContainers.secondMessageBox = ['background text', null, 'buttons']
divOptionData.secondMessageBox = {hidden : true}

stageOptionData.finalMessageBox = _.clone(stageOptionData.staticItems)
stageOptionData.finalMessageBox.newCanvas = true
stageOptionData.finalMessageBox.mouseOverFrequency = 0
stageOptionData.finalMessageBox.canvasHidden = true
stageContainers.finalMessageBox = ['background text', null, 'buttons']
divOptionData.finalMessageBox = {hidden : true}

stageOptionData.loadingScreen = _.clone(disabledOptions)
  stageOptionData.loadingScreen.newCanvas = true
stageContainers.loadingScreen = ['background text', null, 'animation']
stageContainers.loadingScreen[startingContainerIndex] = 'fill'

var stageOrder = zPositionData.stageArray
_.each(stageOrder, function(stageName, stageNumber, list){

var initializeStage = new StageInitializationInfo(stageName, stageNumber, stageContainers[stageName], stageOptionData[stageName], canvasOptionData[stageName], divOptionData[stageName])

})//iterate through


}//create zpositiondata





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
            cardBackFileNameWithoutExtension: 'back'
            ,cardSpriteFileNameWithoutExtension:'sprite'
            ,loadingBackgroundDefault: 'img/background images/loading/10-max.jpg'
            ,loading2Max:'img/background images/loading/2-max.jpg'
            ,loading4Max:'img/background images/loading/4-max.jpg'
            ,loading10Max:'img/background images/loading/10-max.jpg'
       //     seat: 'img/empty_seat.jpg',
      //      blankSeat : 'img/blank_seat.jpg',
       //     bet: 'img/bet.jpg',
      //      community: 'img/card_back.jpg',
     //       fold: 'img/fold.jpg',
      //      sideButton :'img/side_button.jpg',
         , background: 'img/background images/dark/Map1280x800.jpg'
      //   background:'img/gray_bg.jpg',
          ,  table: 'img/jpoker_table.png',
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
            dealCommunity: 'sound/deal_community.wav'
            ,foldSound: 'sound/fold.wav'
            ,toActAlertSound: 'sound/80921__justinbw__buttonchime02up.wav'
            ,failClickSound:'sound/fail_click.mp3'
,actionButtonClickSound: 'sound/action_button_click.mp3'


,moveChipsSound: 'sound/move_chips.wav'

,chips:{
                red:'img/chips/red_chip.png',
                black: 'img/chips/black_chip.png',
                10: 'img/chips/10.png'
              }//chips
,mobileCardFolder: 'img/fourcolordeck/resize/'
,desktopCardFolder: 'img/fourcolordeck/'

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
        this.images.seats[i].bet={}
        this.images.seats[i].chips = []
        this.images.seats[i].firstChip = {}
        this.images.seats[i].secondChip = {}
        this.images.seats[i].secondColumnChip={}
        this.images.seats[i].messages = []
        this.images.seats[i].hiddenCards = []
         this.images.seats[i].shownCards = []
        this.images.seats[i].dealerButton={}
        
        }//iterating through images.seats
            



//-----------START CONSTRUCTORS----------------
this.images.Item = function (x, y, width, height, zIndexOrStageAndContainerObject, options){
     this.position = {}
this.position.x = x//Math.floor(x)
this.position.y = y//Math.floor(y)
this.position.z = {}
if(!_.isObject(zIndexOrStageAndContainerObject)){throw 'z data not given for Item constructor'}
if(_.isObject(zIndexOrStageAndContainerObject)){this.position.z = zIndexOrStageAndContainerObject}
  //if number just keep ticking until you find the right id
  else if(_.isNumber(zIndexOrStageAndContainerObject)&&zIndexOrStageAndContainerObject>=0){
for(var i = 0;i<=zIndexOrStageAndContainerObject;i++){

//find stage number
for(var stageNumber = 0;stageNumber<self.arrayOfParentsOfStageAndOfContainerArray.length;stageNumber++){
  //if isnt correct stage, increment i by total number of containers in that stage
if((i+self.arrayOfParentsOfStageAndOfContainerArray[stageNumber].containers.length) < zIndexOrStageAndContainerObject){
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
}//if options


this.getOrSetCreateJSEvents = function(whatToDo, childType, eventType, performOnEvent){


  if(!_.isString(childType)){this.createjsEvents = {};this.createjsEvents.image = {};this.createjsEvents.text = {}}
else if(!_.isString(eventType)){this.createjsEvents[childType] = {}}
else if(!_.isUndefined(performOnEvent)){
  //ADD performOnEvent to our array
if(whatToDo === 'set'){
  if(!_.isArray(this.createjsEvents[childType][eventType])){this.createjsEvents[childType][eventType] = [performOnEvent]}
    else{this.createjsEvents[childType][eventType].push(performOnEvent)}
}//set  here we add performOnEvent to our array

//GET LOCATION OF PERFORMONEVENT FUNCTION
else if(whatToDo === 'get' || 'remove'){
var result

if(_.isArray(this.createjsEvents[childType][eventType])){
  //REMOVE DUPLICATES
this.createjsEvents[childType][eventType] = _.uniq(this.createjsEvents[childType][eventType])
var eventResponses = this.createjsEvents[childType][eventType]

  var result = _.indexOf(eventResponses, performOnEvent)
 if(result == -1) {result = false}


if(_.isNumber(result) && whatToDo === 'remove'){eventResponses[result] = null;console.log('removed 1 function wtih off function')}

}//if is array

return result

}//if we are getting and/or removing the function

}//if all are defined
  else{
if(_.isArray(this.createjsEvents[childType][eventType])){
  //REMOVE DUPLICATES
this.createjsEvents[childType][eventType] = _.uniq(this.createjsEvents[childType][eventType])}
if(whatToDo === 'set'){ if(_.isArray(this.createjsEvents[childType][eventType])){this.createjsEvents[childType][eventType].length = 0} }
   else if(whatToDo === 'get'){return this.createjsEvents[childType][eventType]} 
    else if(whatToDo === 'function'){

var item = this
return function(e){
  var eventResponses = item.createjsEvents[childType][eventType]
if(_.isArray(eventResponses)){
_.each(eventResponses, function(value, element){
  if(_.isFunction(value)){value(e)}
})//iterate through array of functions
}//if is an array
}//function to return


    }//if we want to grab our array in function form
  }//if we have childType, eventType, but NO performOnEvent function

}//getOrSetCreateJSEvents

this.getOrSetCreateJSEvents()

this.drawRoundedRectangle = function(fillColor){this.image.graphics.beginFill(fillColor).drawRoundRect(0, 0, this.size.x, this.size.y,this.size.y*.1)         }

}//ITEM constructor

this.images.Item.prototype.removeChild = function(imageOrText, options){
  var stagesToUpdate = []
  if(!options){var options = {}}
    var item = this

var removeChild = function(textOrImageString){



if(!item[textOrImageString]){return}
console.log('removechild removing object of type = ' + textOrImageString)


if(_.isElement(item[textOrImageString])){

  $(item[textOrImageString]).remove()
console.log('child of type = ' + textOrImageString + ' removed')

  var child = item[textOrImageString]
item[textOrImageString] = null

//if(_.isElement(child)){console.log(item);throw''} //check if element is still there throw error if it is


}
else if(item[textOrImageString] instanceof createjs.DisplayObject){

if(textOrImageString === 'text'){stagesToUpdate.push (self.hideText(item, {update:false}))}
  else if(textOrImageString === 'image'){
console.log('REMOVING EASELJS CHILD IMAGE')
    stagesToUpdate.push (self.hideImage(item, {update:false}))   }
    else{throw 'incorrect parameter passed to eliminate '+ textOrImage}

}

item[textOrImageString] = null

}//eliminate function

if(imageOrText === 'text' || imageOrText === 'image'){removeChild(imageOrText)}
  else{
    removeChild('text')
    removeChild('image')
  }


if(options.update !== false) {self.updateStages(stagesToUpdate)}
  else{return stagesToUpdate}

}

this.images.Item.prototype.addBootstrapButton = function (buttonText, bootstrapButtonOptions){
//options
//size, position, css, attr

//CREATE EMPTY OBJECTS AS NECESSARY
if(!bootstrapButtonOptions){var bootstrapButtonOptions = {}}
  var options = _.clone(bootstrapButtonOptions)
    if(_.isObject(options.css )){options.css = _.clone(options.css)}
      else{options.css = {}}
  if(_.isObject(options.attr)){options.attr = _.clone(options.attr)}
    else{options.attr = {}}
    if(!options.class){options.class = ''}
    options.update = false

//DEFAULT OPTIONS
var defaultOptions = {disableContextMenu:true}
options = _.defaults(options, defaultOptions)

//DEFAULT ATTRIBUTES
var defaultAttr = {  'data-loading-text': buttonText  ,'type':'button'}
options.attr = _.defaults(options.attr, defaultAttr)

//DEFAULT CSS
var defaultCSS = {  'text-align':'center'}
var newButton = $('<button>').addClass(self.css.unselectable + ' ' + self.css.bootstrapButton)

newButton.html(buttonText)

this.addElement(newButton[0], 'image', options)
//newButton.css(options.css)

}//addBootstrapButton 


 

this.images.Item.prototype.updateChildLocationAndSize = function(options){

  if(!options){var options = {}}
var positionOptions = _.clone(options)
var defaultOptions = {size:true}
positionOptions = _.defaults(positionOptions, defaultOptions)


var asdf = self.positionItemImage(this, positionOptions)
return asdf
}

this.images.Item.prototype.updateImageLocationAndSize = function(options){
  if(!options){var options = {}}
var positionOptions = _.clone(options)
var defaultOptions = {size:true}
positionOptions = _.defaults(positionOptions, defaultOptions)

var asdf = this.positionChild('image', positionOptions)
return asdf
}

var isImage = function(src){
  if(_.isObject(src) && src.src){return true}
    else{return false}
}


this.images.Item.prototype.addBitmap = function(source, options){
   var stagesToUpdate = []

var addItemBitmap = function (item, source, options){
if(!options){var options = {}}
  else{var options = _.clone(options)}

if(options.size !== false && _.isUndefined(options.maxSize)){options.maxSize = 'child'}
  var update = options.update
options.update = false
if(!_.isFunction(options.callback)){options.callback = options.onload }
  options.onload = function(img){
      console.log('bitmap loaded through string image onload called')
     return stagesToUpdate.push(restOfFunction(img))
       }

var restOfFunction = function(source){

if(options.html != true){
 var bitmap = new createjs.Bitmap(source)
if(options.sourceRect instanceof createjs.Rectangle){bitmap.sourceRect = options.sourceRect}
  else if(options.sourceRect){console.warn('source rectangle not appropriate Rectangle instance for addBitmap')}

 //THIS sets the created bitmap as child, and will increase parent size as necessary to match child's
 stagesToUpdate.push( item.adoptChild(bitmap, 'image', options) )
 stagesToUpdate.push( item.positionChild('image', options) )
}//easeljs type of image

else{//html version of image

var bitmap = $('<img />')
bitmap.addClass(self.css.noFat)
bitmap.addClass(self.css.unselectable)
if(!_.isObject(options.attr)){options.attr = {}}
  if(!_.isObject(options.css)){options.css = {}}
    if(!_.isString(options.class)){options.class = ''}
      options.class = options.class
  options.attr.src = source.src

item.addElement(bitmap[0], 'image', options)
}//html version

 stagesToUpdate.push( self.easelJSDisplayObjectChanged(item))
 options.update = update

if(_.isFunction(options.callback)){stagesToUpdate.push(options.callback(source))}
    if(options.update !== false){self.updateStages(stagesToUpdate)}
      else{return stagesToUpdate }
   
}//rest of function

  if(_.isString(source)){
    options.update = undefined
    var tempImage = self.saveImageToParent(source, options)

    //FINISH the rest of the function AFTER image has loaded from the SRC
  }//if source is string

else if(isImage(source)){
  var tempImage = source
if(tempImage.complete){restOfFunction(tempImage)} //if image loaded we synchronously create the image object
else{ //if asynchronous load
  console.log('addbitmap passed image object that has not finished loading as parameter')
  console.log(source)
var imageLoad = imagesLoaded(tempImage)
options.update = undefined
imageLoad.on('done', function(instance){restOfFunction(tempImage)})
} //if it is still loading we make it an onload event
}//if image source is an Image object

if(!isImage(tempImage)){
console.log('itemAsBitmap passed non source paramater');console.log(source instanceof playZoneLandingPage.window.Image);console.log(source);throw '';

}

return stagesToUpdate

            }//item as bitmap

  return addItemBitmap(this, source, options)

}

            this.images.cardAsBitmap = function(item, card, options){
             /*   var cardImage = new Image()
                 
                 if(_.isString(cardText)){
         var imageSource = this.sources.cardImageFolder+cardText+'.png'}
         else{var imageSource = this.sources.cardImageFolder+cardBackFileNameWithoutExtension+'.png'}

*/
//console.log('calling card as bitmap')

if(!options){var options = {}}
  var stagesToUpdate = []

 if(sessionPreferences.displaySize.value !== 'mobile'){var sourceParent = permanentPreferences.sourceObjects.value.cardObjectParent   }
      else{var sourceParent = permanentPreferences.sourceObjects.value.cardObjectParent }

        if(_.isObject(card)){var source = card}
          else if(!_.isString(card) || card === ''){var card = 'back'}

  if(_.isString(card)){
  var animationData = sourceParent.spriteSheet.getAnimation(card)
  var frame = sourceParent.spriteSheet.getFrame(animationData.frames[0])
   var source = frame.image
   options.sourceRect = new createjs.Rectangle(frame.rect.x, frame.rect.y, frame.rect.width, frame.rect.height)
//var source  = sourceParent[card]
}

  /*
else{
  var source = sourceParent.cardBack
}
//console.log(source)
//console.log(sourceParent)
  //
*/

    stagesToUpdate.push(  item.addBitmap(source, options))

    if(options.update !== false){self.updateStages(stagesToUpdate)}
      else{return stagesToUpdate}
            }
    
            //actually a rectangle with rounded edges
             this.images.itemAsRectangle = function (item, fillColor){
 var rect = new createjs.Shape()
 item.adoptChild(rect, 'image')
  self.positionItemImage(item, {update:false})
item.drawRoundedRectangle(fillColor)
item.fillColor = fillColor


            }

            //draws a seat
                  this.images.drawSeat = function (parent, borderColor, fillColor, middleDividerColor, seatOptions){
          
          if(!seatOptions){var options = {}}
            else{var options = _.clone(seatOptions)}

          if(parent.image instanceof createjs.Shape != true){
                  var asdfShape = new createjs.Shape()
                   parent.adoptChild( asdfShape, 'image')
          }
else{parent.image.graphics.clear() }//clear previous graphics on the shape


          if(_.isNumber(options.outerStrokeWidth)){var outerStrokeWidth = options.outerStrokeWidth}
            else{var outerStrokeWidth = 2}
if(_.isNumber(options.middleDividerStrokeWidth)){var middleDividerStrokeWidth = options.middleDividerStrokeWidth}
            else{var middleDividerStrokeWidth = 1}



              var x = outerStrokeWidth/2; var y = outerStrokeWidth/2
              var width = parent.size.x - outerStrokeWidth;  var height = parent.size.y - outerStrokeWidth

              
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

parent.image.setBounds(0, 0, parent.size.x, parent.size.y)
/*
parent.image.hitArea = new createjs.Rectangle(0,0, 50,50) //parent.size.x, parent.size.y)//parent.image.getBounds()
console.log(parent)
console.log(parent.image.getBounds())
*/


return self.easelJSDisplayObjectChanged(parent)
      }


this.images.Item.prototype.addText = function( text, sizeAndFont, color, options){


 var addItemText = function(item, text, sizeAndFont, color, textOptions){
                if(!textOptions){var options = {}}
                  else{var options = _.clone(textOptions)}


if(options.html !== true){
   if(item.text instanceof createjs.Text !== true) {item.text = new createjs.Text('', '', '')}

item.text.text = text
item.text.color = color
item.text.font = sizeAndFont

if(options.textAlign === 'left'){
item.text.x = item.position.x
item.text.textAlign = options.textAlign

}//if left align
else{//center align by default
item.text.x = item.position.x + item.size.x/2 
  item.text.textAlign = 'center'
}//align center by default

if(options.centerTextY !== false){
var textHeight = item.text.getMeasuredHeight()
var textY = item.position.y + (item.size.y - textHeight)/2}

else {textY = item.position.y + 1}

if(textY < item.position.y){textY = item.position.y}
item.text.y = textY

item.text.baseline = 'top'

item.text.maxWidth = item.size.x
item.textColor = color

assignObjectPropertiesAsPropertiesOfDisplayObject(item.text, options)

return self.easelJSDisplayObjectChanged(item)
/*
//assign option variables to text
_.each(options, function(value, index, list){
if(!_.isObject(value) && !_.isUndefined(value) && !_.isFunction(item.text[index])){item.text[index] = value}
})//iterate through options
*/
}//make createjs text


else{//if we want to create an HTML text

if(!_.isObject(options.css)){options.css = {}}
  else{options.css = _.clone(options.css)}
  if(_.isUndefined(options.size)){options.size = true}
  if(_.isUndefined(options.position)){options.position = true}

var x = item.position.x; var y = item.position.y
var width = item.size.x; var height = item.size.y;

if(!_.isNumber(options.numLines)){options.numLines = 1}
var lineHeight = (height/options.numLines) + 'px'

var cssDefaults = {
  'line-height': lineHeight
  ,'width':item.size.x
  ,'height':item.size.y
  ,'font':sizeAndFont
  ,'color':color
  ,'text-align':'center'
  ,'pointer-events':'none'
  ,'display':'none'
  ,'font-weight':400
}

options.css = _.defaults(options.css, cssDefaults)
 if(_.isString(options.textAlign)) {options.css['text-align'] = options.textAlign}

var newText = $('<p>').addClass(self.css.unselectable + ' ' + self.css.noFat)
newText.html(text)

 item.addElement(newText[0], 'text', options)

}// make HTML element

            }//var addItemText


return addItemText (this, text, sizeAndFont, color, options)

}

            //for example: (item, fold, "13px " + permanentPreferences.defaultFontType.value, "#100D08")
           

self.images.Item.prototype.addNumberText = function(number, sizeAndFont, color, options){




//edit the getText function to get rid of commas
this.getText = function(){

var baseText = Object.getPrototypeOf(this).getText.call(this)

return accounting.unformat(baseText)

}//this.getText


this.updateText = function(number, options){
  if(!_.isString(number) && !_.isNumber(number)){return}
    


    if(!_.isObject(options)){var options = {}}
      else{var options = _.clone(options)}

var defaults = {

symbol : self.initial_table_state.currency_symbol,
  decimal : ".",
  thousand: ",",
  precision : 0,
  format: "%v%s" //%s is currency symbol, %v is value

}//defaults

if(!defaults.symbol){defaults.symbol = ''}

options = _.defaults(options, defaults)

//format the number if necessary
  if(!_.isNaN(parseInt(number))){var number = accounting.formatMoney(parseInt(number), options)}

return  Object.getPrototypeOf(this).updateText.call(this, number)

}//this.updateText


//create the thing
return Object.getPrototypeOf(this).addText.call (this, number, sizeAndFont, color, options)




}//this.addNumber


//------------END CONSTRUCTORS-------------------
            
//-------------START EVENTS--------------------------
this.events.buttonMouseDown = function(event){
     if(event.target instanceof createjs.Shape) {
         event.target.graphics.clear()
  event.target.graphics.beginFill('red').drawRoundRect(0, 0, event.target.parentItem.size.x, event.target.parentItem.size.y,event.target.parentItem.size.y*.15)
  event.target.parentItem.text.y = event.target.parentItem.text.y + 2
     self.updateStages(event.target.parentItem.position.z.stage)
     event.onMouseUp = function(event){
         event.target.graphics.clear()       
        event.target.graphics.beginFill(event.target.parentItem.fillColor).drawRoundRect(0, 0, event.target.parentItem.size.x, event.target.parentItem.size.y,event.target.parentItem.size.y*.15); 
event.target.parentItem.text.y = event.target.parentItem.text.y - 2 
    self.updateStages(event.target.parentItem.position.z.stage)
     }
     }
     }
      
this.events.onEaselJSChildClick = function(e){

console.log(e)

var item = e.target.parentItem
if(item instanceof self.images.Item != true){return}

  if(e.target.id === item.image.id){var childType = 'image'}
    else if(e.target.id  === item.text.id){var childType = 'text'}
if(!_.isString(childType)){console.log(e);throw''}

//perform left click
if(e.nativeEvent.button != 2){

//console.log(item.getOrSetCreateJSEvents('get', childType, 'click'))
var asdf = item.getOrSetCreateJSEvents('function', childType, 'click')
//console.log(asdf)
asdf(e)
}//LEFT CLICK

//perform right click
else{
  console.log(item.getOrSetCreateJSEvents('get', childType, 'contextmenu'))

  var asdf = item.getOrSetCreateJSEvents('function', childType, 'contextmenu')
//console.log(asdf)
asdf(e)
}//right click


}

  this.events.onButtonClick = function(event){
  // console.log('button clicked')
        if(event.target.parentItem.messages){
          var messages = event.target.parentItem.messages
          //if 1 depth messages array then just do it normally
          if(!_.isArray(messages[0])){  
            /*
            //debug for butotn failure
            if($(event.target).attr('type') == 'button'){
              console.log('element type button onbuttonclick event fired')
              console.log(event)
            }
*/
console.log(messages)
            socket.emit.apply(socket, messages)   
          }
else{//multiple depth array
for(var i = 0;i<messages.length;i++){
  console.log([messages[i]])
 socket.emit.apply(socket, messages[i])
}//iterate through messages array
}//if array is multiple depths
         }//if messages exist

       }
  
    this.events.foldToAnyBetClick = function(event){
        self.setPreactionData('hand', ['check','fold'], true, {server:true})
    }

    this.events.foldToAnyBetOnClick = function (event){
                self.setPreactionData('hand', ['check','fold'], false, {server:true})
    }

this.events.cashierTextFieldFocused = function(event){

//select the text when highlighted
          $(event.target).one('mouseup', function(e){e.preventDefault()}).select()
          
}

this.events.cashier = function(event){

var validate; var keycode; var updateValue; var selectTextBox

  //grab keycode if key event
if(event.type === 'keydown' || event.type === 'keyup'){
var keycode = (event.keyCode ? event.keyCode : event.which)
}


//determine which type of event it is
//console.log('this.events.cashier called')
//console.log(event)

if(!_.isObject(event.originalEvent) || !_.isElement(event.originalEvent.target) || event.target.id === event.originalEvent){var originalEvent = event}
else{var originalEvent = event.originalEvent}

var jQueryTarget = $(originalEvent.target)
var jQueryParentDiv = jQueryTarget.parent()
var jQueryTextBox = jQueryParentDiv.children("input[type='text']")

parentDivID = jQueryParentDiv.attr('id')

  //if escape is pressed hide cashier and return
if(event.type === 'keydown' && keycode === 27){
  self.hideCashier()
jQueryTarget.one('keyup', function(e){return false})
  return false
}

else if(event.type === 'mousedown'){
  var focusTextBox = true
if(parentDivID !== 'autoRebuyDiv'){jQueryParentDiv.children("input[type='radio']").prop('checked', true)}
}

//if focus event we are going to just select the focused text
else if(event.type === 'focus' || event.type === 'mousedown'){selectTextBox = true}

  //if enter keyup, or focusout, we are going to insure that the correct value is done and change accordingly

else if(event.type === 'focusout')                  {validate = true; updateValue = true} 
  else if (event.type === 'keyup' && keycode === 13){validate = true; updateValue = true }
  else if(event.type === 'input')                   {validate = true; updateValue = false}
  else if (event.type === 'keydown' && keycode === 13){// if ENTER key ispressed

//going to disable further keydowns
var preventDefault = function(e){return false}
jQueryTarget.on('keydown.preventDefault', preventDefault)
jQueryTarget.one('keyup', function(e){ 
  jQueryTarget.off('keydown.preventDefault', preventDefault)
})

var shouldSubmit = validateCashierDisplayBasedOnUserInput(false)
if(shouldSubmit === true){
//trigger click events if allowed
if( parentDivID === 'maxDiv' || parentDivID === 'otherAmountDiv'){$(self.images.cashier.addChips.image).trigger('click')}
else{$(self.images.cashier.enableAutoRebuy.image).trigger('click')}
}//if we want to submit

  }//on enter keydown press

  if(validate){
    //if we updated value after validating, we are going to select it also
   if( validateCashierDisplayBasedOnUserInput(updateValue) !== true && updateValue === true){selectTextBox = true}
  }

if(selectTextBox){
if(event.type === 'mousedown'){var preventEventType = 'mouseup'}
  else if ( event.type === 'keydown'){var preventEventType = 'keyup'}
    else{preventEventType = 'mouseup'}
    console.log('preventing one of type: ' + preventEventType)
    //if we need to prevent an event do so
    if(_.isString(preventEventType)){ jQueryTextBox.one(preventEventType, function(e){return false})}
jQueryTextBox.select()
}//if we want to select the contents of our target

if(focusTextBox){jQueryTextBox.trigger('focus')}


}

var validateCashierDisplayBasedOnUserInput = function(updateValue){

var acceptableValues = true

var maxTextBox = $(self.images.cashier.maxAmount.image)
var otherAmountTextBox = $(self.images.cashier.otherAmount.image)
var autoRebuyTextBox = $(self.images.cashier.autoRebuyAmount.image)

var cashierData  = self.gameState.cashier
console.log(cashierData)

var otherAmountValue = parseInt(otherAmountTextBox.val())
//console.log('otherAmountValue = ' + otherAmountValue)

if(_.isNaN(otherAmountValue) || otherAmountValue <  cashierData.min ){
   acceptableValues = false
//  console.log('disabling addchips button')
  $(self.images.cashier.addChips.image).button('loading')
  if(updateValue === true){
//console.log('setting otheramount to '+cashierData.min)
   otherAmountTextBox.val(cashierData.min)}
}
else{
$(self.images.cashier.addChips.image).button('reset')
}
 // else if (otherAmountValue > cashierData.max){otherAmountTextBox.val(cashierData.max)}

var autoRebuyValue = parseInt(autoRebuyTextBox.val())
//console.log('autoRebuyValue = ' + autoRebuyValue)
if(_.isNaN(autoRebuyValue) || autoRebuyValue <  cashierData.table_min){
     acceptableValues = false
//disable button
//  console.log('disabling autorebuy button')
$(self.images.cashier.enableAutoRebuy.image).button('loading')
 if(updateValue === true){  
//console.log('setting autoRebuyValue to '+cashierData.table_min)
  autoRebuyTextBox.val(cashierData.table_min)}
}
else{
$(self.images.cashier.enableAutoRebuy.image).button('reset')
}
//  else if (autoRebuyValue > cashierData.table_max){otherAmountTextBox.val(cashierData.table_max)}

return acceptableValues
}

this.events.cashierInputChanged = function(event){




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

//  console.log('min =  '+ min)
//  console.log(self.gameState.cashier)
//adjust radio buttons appropriately
//check if radio button is already checked
var radioInClickedDiv = $('#'+parentID).find("input[type='radio']")

if(radioInClickedDiv && radioInClickedDiv.prop('checked') === false){
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
       //    textField.select()
        //   alreadySelected = true
          }
     //     console.log(textField)
          if($(event.target).is("input[type='text']")){}
            else if (alreadySelected != true){   textField.select()   }

              //we are going to select no matter what
   // textField.one('mouseup', function(e){e.preventDefault()}).select()
  // $(event.target).one('mouseup', function(e){e.preventDefault()})
  // console.log('selecting text field')
 //  console.log(textField)
   textField.focus()//.select()
        }//end check if parentID exists/not false

}

this.events.onCashierTextFieldFocus = function(event){

  $(event.target).one('mouseup', function(event){event.preventDefault()}).select()

}


    this.events.onAddChipsClick = function(event){

                var info = {}
                info.okay = true
                info.html = true
                info.style = 'qtip-youtube'

        if($('#maxRadio').is(':checked'))
        {
     //     console.log('maxradio checked')
      //    console.log(self.gameState.cashier)
            socket.emit('add_chips', self.gameState.cashier.max, self.initial_table_state.currency)

        }
        else if($('#otherAmountRadio').is(':checked')){
            var amount = $('#otherAmount').val()
            if(isNaN(amount)){

                var message = "amount must be a number"
                messageBoxAPI.display(message,info)
            }
            else{
                
                socket.emit('add_chips',Number(amount), self.initial_table_state.currency)
            }

        }
        else if($('#autoRebuyRadio').is(':checked')){
            var amount = $('#autoRebuy').val()
            if(isNaN(otherAmount)){

                var message = "Amount must be a number"
                messageBoxAPI.display(message, info)
            }
            else{
                
                socket.emit('auto_rebuy',Number(amount), self.initial_table_state.currency)
            }

        }

        else if(!$("input[name='addChipsRadio']:checked").val()){
            var info = {}
                info.okay = true
                var message = "Please select either: max, other amount, or auto-rebuy"
                messageBoxAPI.display(message, info)
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
  defaultOptions.movementType = 'relative'
if(event.target.parentItem instanceof self.images.Item){defaultOptions.animationTarget = event.target.parentItem}
_.defaults(options, defaultOptions)//assign defaults

var initialX = event.stageX;var initialY = event.stageY

event.onMouseMove = function(e){
 // console.log(e)
  var moveX = e.stageX - initialX; var moveY = e.stageY - initialY
   initialX = initialX + moveX; initialY = initialY + moveY

 self.setImageItemPositionAndTextBasedOnImageChange(options.animationTarget, moveX , moveY , options)
}


}



this.events.seatMouseEvent = function(event, options){


//  console.log('seatmouse event called')
  if(!options){var options = {}}
    var defaults = {}
  if(_.isObject(event.target.parentItem)&& _.isObject(event.target.parentItem.seatObjectAncestor)){
    defaults.seatObject =  event.target.parentItem.seatObjectAncestor
defaults.seatNum =  defaults.seatObject.nonRotatedSeatNumber
defaults.animationTime = 600
  }


options = _.defaults(options, defaults)
if(!_.isNumber(options.seatNum)){
  console.log('error');
  console.log(event)
  console.log(options);
  console.log(defaults)
}


//console.log('seat mouse over event called for seat ' + options.seatNum)

//console.log(event)
var animationTime = options.animationTime
var seatObject =  options.seatObject //event.target.parentItem.seatObjectAncestor
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
/*
event.onMouseDown = function(event){

}//event.onMouseDown


       event.onMouseUp=function(event){
       }//event.onMouseUp
       */

       event.onMouseOut = function(event){
console.log('mouseout')
       }// event.onMouseOut


function keepChecking(){
  killCheckingFunction()
  //store current event


var interval = 100

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
)//addEventListener
}
*/
       function animateUp(){
var animationInfoArray = []
//prepare animation information
if(getAnimationDirection() === 'top'){return false}
  if(getAnimationDirection() === 'up'){return false}
        var holeCardAnimationArray = getHoleCardAnimationArray()
  if(!_.isArray(holeCardAnimationArray)){console.log('animateup stopped cuz no cards');return false}
      console.log('animating up '+ getAnimationDirection())
    setAnimationDirection('up')

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
    var holeCardAnimationArray = getHoleCardAnimationArray()
  if(!_.isArray(holeCardAnimationArray)){return false}
  //prepare animation information
setAnimationDirection('down')
console.log('animating down')

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
if(self.getPreactionData('inHand', {seat:options.seatNum}) === true){return false}
  //if seat is users
  if(seatObject.rotatedSeatNumber === self.gameState.userSeatNumber){
  if ( !(_.isArray(self.gameState.holeCards)&&self.gameState.holeCards.length >0 ) ){return false}//if hovered seat is users
 }
    //if not user
else if(!_.isObject(seatObject.shownCards[0].image) 
  || seatObject.shownCards[0].isDisplayed()
 || !_.isObject(seatObject.shownCards[1].image) 
 || seatObject.shownCards[1].isDisplayed()
 || !_.isObject(seatObject.hiddenCards[0].image) 
 || seatObject.hiddenCards[0].isDisplayed()
 || !_.isObject(seatObject.hiddenCards[1].image) 
 || seatObject.hiddenCards[1].isDisplayed()
 ){return false}//if not user

var animationArray = getHoleCardAnimationArray()
if (!_.isArray(animationArray) || animationArray.length === 0 ){return false}

return true
}//shouldAnimate function

function onAnimationTick (animationInfo, imageTween, textTween){

if(shouldAnimate()=== false){
  if(_.isFunction(imageTween.removeTweens   )){
  imageTween.removeTweens(imageTween.target)}
  if(_.isFunction(textTween.removeTweens   )){
  textTween.removeTweens(textTween.target)}
  endAnimations()
}//if we DONT want to animate

else{//make sure we cut off the card so it doesnt go below the seat image
 cropCardImages()
}

}//on animationTick



function cropCardImages (){
  //console.log('cropping seat images')
  self.cropHoleCards(getHoleCardAnimationArray(), {seatNumber:seatNum})
}

}



this.events.showTableChatFullOnClick = function(){
//console.log('show clicked')
self.displayTableChatFull()

$('#chatForm').blur()
self.jQueryObjects.tableChatFullParagraph.blur()
}

this.events.hideTableChatFullOnClick = function(){
   console.log('hide clicked')

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

if(permanentPreferences.tableChatFull.scrollBarType && permanentPreferences.tableChatFull.scrollBarType.value == 'mCustomScrollbar'){
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
  else{ //if magnitude defined


if(movementObject.positionUnit == 'pixels'){}
if(_.isNumber(movementObject.magnitude)){
if(permanentPreferences.tableChatFull.scrollBarType && permanentPreferences.tableChatFull.scrollBarType.value == 'mCustomScrollbar'){

}//if mcustomscrollbar

else{//if nicescroll
var scroll = self.jQueryObjects.tableChatFullDiv.getNiceScroll()
 scroll[0].scrollTop(movementObject.magnitude)
 // scroll[0].scrollTop(sessionPreferences.tableChatFull.tableChatFullScrollBarPositionTrueForBottomOrUpperInvisiblePixels.value)
  movementObject.resize = true
}//if not mcustomscrollbar

}//if magnitude is a  number


}//if magnitude not anumber

//resize if necessary
if (movementObject.resize === true){
  if(permanentPreferences.tableChatFull.scrollBarType && permanentPreferences.tableChatFull.scrollBarType.value == 'mCustomScrollbar'){
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

this.events.popOutClicked = function(){
console.log('popOutClicked')
//change user preferences
sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.popOut.value = false
sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.popOutOn.value = true

/*
console.log(self.jQueryObjects.tableChatFullDiv.getNiceScroll())

self.jQueryObjects.tableChatFullDiv.getNiceScroll()[0].istouchcapable = false
*/
//save preference on server
self.saveSessionPreferences()
self.updateTableChatFullDisplay()
}

this.events.popOutOnClicked = function(){
console.log('popOutClicked')
//change user preferences
sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.popOut.value = true
sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.popOutOn.value = false
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
sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hideDealerMessages.value = false
sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hideDealerMessagesOn.value = true
//save preference on server
self.saveSessionPreferences()

self.updateTableChatFullDisplay()
}


this.events.hideDealerMessagesOnClicked = function(){
console.log('hideDealerMessagesOnClicked')
//change user preferences
sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hideDealerMessages.value = true
sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hideDealerMessagesOn.value = false

//save preference on server
self.saveSessionPreferences()

self.updateTableChatFullDisplay() 
}

this.events.hidePlayerMessagesClicked = function(){
  console.log('hidePlayerMessagesClicked')
sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hidePlayerMessages.value = false
sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hidePlayerMessagesOn.value = true


//save preference on server
self.saveSessionPreferences()

self.updateTableChatFullDisplay()

}
this.events.hidePlayerMessagesOnClicked = function(){
   console.log('hidePlayerMessagesOnClicked')
sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hidePlayerMessages.value = true
sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hidePlayerMessagesOn.value = false

//save preference on server
self.saveSessionPreferences()

self.updateTableChatFullDisplay()
}
this.events.hideObserverMessagesClicked = function(){
   console.log('hideObserverMessagesClicked')
sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hideObserverMessages.value = false
sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hideObserverMessagesOn.value = true
//save preference on server
self.saveSessionPreferences()
self.updateTableChatFullDisplay()
}
this.events.hideObserverMessagesOnClicked = function(){

sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hideObserverMessages.value = true
sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hideObserverMessagesOn.value = false
//save preference on server
self.saveSessionPreferences()
self.updateTableChatFullDisplay()
}


this.events.rotateSeatsIfNeededAndConfirm = function(){

if(!_.isNumber(self.gameState.userSeatNumber)){console.error('rotateSeatsIfNeededAndConfirm called without valid userseatnumber' + self.gameState.userSeatNumber)}

if(permanentPreferences.alwaysRotate === true){}
//  console.log(sessionPreferences)
//console.log(self.images.seats[self.gameState.userSeatNumber])

//check if preference is to sit at "absolute steat" or 0
var preferenceSeat = sessionPreferences.changeUserSeatViewTo.value
if( _.isNumber(preferenceSeat) && ( preferenceSeat === 0 || preferenceSeat === self.gameState.userSeatNumber)){
  console.log('rotating without confirming due to current preference:');console.log(sessionPreferences.changeUserSeatViewTo)
  self.changeUserSeatView(preferenceSeat)
}//if user has a specific seat we rotate to
  else if( self.gameState.userSeatNumber !== 0){  //rotate to seat 0
//console.log('changing userseat view')

      self.changeUserSeatView() //rotate seats first

//confirm the choice if the preference requires it
        if(permanentPreferences.confirmSeatRotation.value === true) {   
          var messageInfo = {}    
          messageInfo.style = 'qtip-youtube'
          messageInfo.html = true
          messageInfo.modal = false
                       messageInfo.title = 'Perspective Changed'
                     messageInfo.okayText = 'OK, this is fine'
                     messageInfo.cancelText = 'Change view'
                     messageInfo.cancel = true
                     messageInfo.checkBox = true

          messageInfo.okayEvent = function(e){
     console.log('ok event called of confirmseatrotation')
     var checked = messageBoxAPI.getStatus(e.target.parentItem.position.z.stage).checkBox

           if(checked === 'checked'){            permanentPreferences.confirmSeatRotation.value = false}
            else if(checked === 'unchecked'){            permanentPreferences.confirmSeatRotation.value = true}

console.log(checked)

               
           sessionPreferences.changeUserSeatViewTo.value = self.images.seats[self.gameState.userSeatNumber].rotatedSeatNumber
         console.log('setting seat view preference to '+ sessionPreferences.changeUserSeatViewTo.value)

         self.savePermanentPreferences()
         self.saveSessionPreferences()

         messageBoxAPI.hide()//hide message box
         }
          messageInfo.cancelEvent = function (){
           if(self.images.seats[self.gameState.userSeatNumber].rotatedSeatNumber !== self.gameState.userSeatNumber ){
             self.changeUserSeatView(self.gameState.userSeatNumber )}
             else{self.changeUserSeatView()}
            // else{self.changeUserSeatView(sessionPreferences.changeUserSeatViewTo.value)}
         
         //messageBoxAPI.hide()
         }
          var messageString = 'You now appear at the bottom middle.  Click '+messageInfo.cancelText + ' to change your view back.  At the table, right click a seat ---> click "Show Me Here" to change your view.'  
              messageBoxAPI.display(messageString, messageInfo)
         }//if we want to display popup, display it


         }//rotate seat to display user as seat 0, then check if we need to confirm the change with the user
}

this.events.userStands = function(){

self.setPreactionData('hand', 'check', true, {server:true})
self.setPreactionData('hand', 'fold', true, {server:true})

socket.emit('stand')

}

    this.events.exitTableClick = function(event){
      //exit immediatley if user is not seated
if(!_.isNumber(self.gameState.userSeatNumber) || self.gameState.itemsCreated != true){self.events.exit();return}

      console.log('exittable clicked')
      if(_.isObject(event)){console.log(event)}

       var  messageInfo = {}
       messageInfo.title = 'Leave Table?'
       messageInfo.cancel = true
       messageInfo.html = true
       messageInfo.modal = true
       messageInfo.style = 'qtip-youtube'
       messageInfo.okayEvent = function(){
self.events.userStands()
      self.events.exit()
      }
        messageBoxAPI.display("Are you sure you want to leave?", messageInfo)

    }



     this.events.viewLobbyClick = function(event){

         var lobbyName = "Lobby"
         window.open('/lobby', lobbyName, 'width=800,height=770 ,left=200,top=200,location=0,toolbar=no,menubar=no,titlebar=no,directories=no,scrollbars=yes');
    //     window.open('/lobby')

    }

    this.events.exit = function(event){
        messageBoxAPI.hide()
        if (_.isObject(playZoneLandingPage.iframes)) {
          console.log('Close iframe');
          playZoneLandingPage.iframes.closeIframe(self.getTableName())
        }
        else {
          console.log('Close window instead');
          var win = window.open('', '_self')
          win.close()
        }
    }

    this.events.onDisabledOrNonUserSeatClick = function(e){
       console.log(e)
       //return if user is not seated
  if(!_.isNumber(self.gameState.userSeatNumber)){return}
      //if right click
if(e.nativeEvent.button !== 2){return}//make sure its a right click
//e.nativeEvent.preventDefault()
         
      var item = e.target.parentItem
      if(!_.isObject(item)){return}
      var seatObject = item.seatObjectAncestor
var rotatedSeatNumber = seatObject.rotatedSeatNumber
var nonRotatedSeatNumber  = seatObject.nonRotatedSeatNumber
//return if user's seat is clicked
if(self.gameState.userSeatNumber === seatObject.nonRotatedSeatNumber){return}

var stageParent = self.getParentOfStageObject(item)




//------------------------CREATE SHOW ME HERE WITH JQUERY-UI-CONTEXTMENU HERE--------------------------
//   https://github.com/mar10/jquery-ui-contextmenu
var rotate = function(){
sessionPreferences.changeUserSeatViewTo.updateValue(rotatedSeatNumber)
self.saveSessionPreferences()
}

var promptUsernameCopy = function(text){

 window.alert ("(Control + C to copy)", text);

}

var selectPlayerText = function(){

var textDisplayItem = seatObject.playerName

var selectElementText = function(el, win) {
    win = win || window;
    var doc = win.document, sel, range;
    if (win.getSelection && doc.createRange) {
        sel = win.getSelection();
        range = doc.createRange();
        range.selectNodeContents(el);
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (doc.body.createTextRange) {
        range = doc.body.createTextRange();
        range.moveToElementText(el);
        range.select();
    }
}//select element text

//if element make selectable 
if(_.isElement(textDisplayItem.text)){


var isUnselectable = $(textDisplayItem.text).hasClass(self.css.unselectable)

if(isUnselectable){$(textDisplayItem.text).removeClass(self.css.unselectable)}
selectElementText(textDisplayItem.text)
if(isUnselectable){

var addUnselectable = setInterval(function(){
if(!$(textDisplayItem.text).hasClass(self.css.unselectable)){ $(textDisplayItem.text).addClass(self.css.unselectable)}
$(textDisplayItem.text).off('focusout.clearAddUnselectable')
},5000)//delay 5 seconds
 
 $(textDisplayItem.text).one('focusout.clearAddUnselectable',function(e){clearInterval(addUnselectable)})

}

}//if element

else if(textDisplayItem.text instanceof createjs.Text){
  promptUsernameCopy(textDisplayItem.getText())
}//if createjstext

}//select playertext

var x = e.stageX+1;var y = e.stageY+1

var menu = [
    {title: "Show Me Here", action: rotate }
]
//push if player is seated
if( seatObject.playerName.isDisplayed()){menu.push({title: "Copy Player Name", action: selectPlayerText})}

var contextmenuOptions = {
    delegate: stageParent.div,
menu:menu
    /*
    ,select: function(event, ui) {
       // alert("select " + ui.cmd + " on " + ui.target.text());
   ui.cmd()
    }//event on select
    */
    
  ,position:{my: 'left+' + x + ' top+'+y , of: stageParent.div, at:'left top'
  , within: stageParent.div, collision:'flipfit' }
   //  ,position:{within: stageParent.div, collision }
  
        ,create:function(event, ui) { //ui is {}
      console.log('contextmenu created')
      console.log(event)
     // console.log(ui)
    }
    ,beforeOpen: function(event, ui) { //ui = {menu:menu, target:this.delegate}
 //     console.log('original beforeOpen called, repositioning showmehere menu')
   //   console.log(event)
   //   console.log(ui)
       ui.menu.appendTo(stageParent.div)
      var css = {
'z-index':getZ('contextMenu','staticItems').container
,'font-size':'11px'
,'font-family':permanentPreferences.defaultFontType.value
,'padding':'0 0 0 0'
      }
      ui.menu.css(css)
      console.log(getDisplayObjectPositionAndSizeData(ui.menu[0], {size:true, position:true, maxSize:true}))
   

//replace before options
$(stageParent.div).off('contextmenubeforeOpen')
$(stageParent.div).on('contextmenubeforeOpen', function(event,ui){
 // console.log('context menu called from regular right click, hiding and not showing it ...SUCCESS')
  $(stageParent.div).contextmenu('close')
  $(stageParent.div).contextmenu('destroy')
  return false
})
    }//beforeOpen
            ,open:function(event, ui) { //ui is {}
      console.log('contextmenu opened')
   //   setDisplayObjectPositionData(ui.menu[0], {x:x,y:y} )
      console.log(getDisplayObjectPositionAndSizeData(ui.menu[0], {size:true, position:true, maxSize:true}))
    }

      ,close: function(event, ui) {
        console.log('contextmenu close event called')
       // alert("select " + ui.cmd + " on " + ui.target.text());
   //$(document).contextmenu('destroy')
    }//event on select
    ,show:false //sets the ANIMATION for showing the menu, does NOT determine whether we will show the menu
,hide:false//sets the ANIMATION for hiding the menu, does NOT determine whether we will hide the menu
}//contextmenuOptions

console.log('removing old contextmenus')
//remove old contextmenu
try {$(document).contextmenu('destroy')}catch(err){}

console.log('creating context menu')
//create new context menu
$(document).contextmenu(contextmenuOptions)

console.log('calling contextmenu open')
//open the context menu
$(document).contextmenu  ("open", $(stageParent.div))

//console the menu
console.log($(document).contextmenu('getMenu'))


/*
//------------------------CREATE SHOW ME HERE WITH JQUERY-MENU (original) HERE--------------------------
var rotate = function(){
sessionPreferences.changeUserSeatViewTo.updateValue(rotatedSeatNumber)
self.saveSessionPreferences()
}

var stageParent = self.getParentOfStageObject(event.target)

$(stageParent.div).menu({
    menus: [        {title: "Show Me Here", cmd: rotate }]
    ,select: function(event, ui) {
       // alert("select " + ui.cmd + " on " + ui.target.text());
   ui.cmd()
    }
        ,blur: function(event, ui) {
       // alert("select " + ui.cmd + " on " + ui.target.text());
   ui.destroy()
    } 
    
    ,create: function(event, ui) {
      console.log('beforeOpen called')
      setDisplayObjectPositionData($(stageParent.div.id + ' > .ui-menu'), {x:e.stageX+1,y:e.stageY+1} )
    }
    ,show:false
});
*/

//------------------------CREATE SHOW ME HERE OPTION--------------------------

/*
var seatStageNumber = seatObject.seat.position.z.stage
var seatStage = self.arrayOfParentsOfStageAndOfContainerArray[seatStageNumber]
var buttonContainer = seatStage.containers.length-2
var buttonStageNumber = seatStageNumber
var buttonContainer = buttonContainer

var buttonWidth = self.images.seats[0].seat.size.x*0.85
var buttonHeight = 16
var buttonFontSize = 10
var buttonFont = permanentPreferences.defaultFontType.value
*/


/*
var showMeHere = new self.images.Item(e.stageX+1,e.stageY+1,buttonWidth, buttonHeight, {stage:buttonStageNumber, container: buttonContainer})
 
var showMeHereImage = new createjs.Shape()
 showMeHere.adoptChild(showMeHereImage, 'image')

 showMeHere.image.graphics.setStrokeStyle(1,'round').beginStroke('black')
 .beginFill('#C8C8C8').drawRect(0, 0, buttonWidth, buttonHeight)

 showMeHere.addText( 'Show Me Here', buttonFontSize+'px '+ buttonFont, 'black' )

showMeHere.on('click', function(e){
self.hideChildren(showMeHere)

})


var displayShowMeHere = function(){
  var stagesToUpdate = []
stagesToUpdate.push(self.setImageItemPositionAndTextBasedOnImageChange(showMeHere, e.stageX + 1, e.stageY + 1))
stagesToUpdate.push(self.displayChildren(showMeHere,{update:false}))
self.updateStages(stagesToUpdate)
console.log('displayshowmehere finished')
}

var hideShowMeHere = function(){
  console.log('hideshow me here for seat:' + nonRotatedSeatNumber)
  self.hideChildren(showMeHere)
}

var jqueryDiv = $(self.getParentOfStageObject(showMeHere).div)
displayShowMeHere()


jqueryDiv.on('mousedown.hideShowMeHere', function(event){
if(isItemDisplayed(showMeHere)){
jqueryDiv.one('mouseup.hideShowMeHere mouseup.hideShowMeHere', function(e) {
  var asdf = {}
  createjs.Tween.get(asdf).wait(0).call(hideShowMeHere)
})

jqueryDiv.off('mousedown.hideShowMeHere')
}
})
*/


    }

//for on table click, to change background image

 this.events.onBackgroundContextMenu = function(e){
       console.log(e)
       //return if user is not seated

      //if right click
//if(e.nativeEvent.button !== 2){return}//make sure its a right click
      
      try{  
        var background = e.target.parentItem
        var stageParent = self.getParentOfStageObject(background) }
        catch(err){return}

var x = e.stageX+1;var y = e.stageY+1


//------------------------CREATE SHOW ME HERE WITH JQUERY-UI-CONTEXTMENU HERE--------------------------
//   https://github.com/mar10/jquery-ui-contextmenu



var menu = []
var addDarkOption = function(fileName, title){
  if(_.isUndefined(title)){var title = menu.length}
  menu.push({title:title,cmd:'img/background images/dark/'+fileName})
}

addDarkOption('Map1280x800.jpg', 'default')
addDarkOption('abstract_black_gradient_desktop_1920x1200_hd-wallpaper-1012937.jpg')
addDarkOption('1280x1024_backround-best-black-and-green-wall-papers-go-wallpaper.jpg')
addDarkOption('51b736384045f25357.jpg')
addDarkOption('abstract-awesome-map-wallpaper-hd.jpg')

addDarkOption('Beautiful-Black-Background.jpg')
addDarkOption('black_background_fabric-wallpaper-1440x960.jpg')
addDarkOption('Black-Background-Leather-600x800.jpg')
addDarkOption('Black-background-set-wood-on-chanconsultants.jpg')
addDarkOption('Black-Desktop-Background-texture world map.jpg')
addDarkOption('grey-gray-black-gradient-30641.jpg')

addDarkOption('wallpapers-room-com-black-background-set-fabric-by-iamfreeman.jpg')
addDarkOption('jpoker_bg_brown.png')
addDarkOption('gray_bg.jpg')

var addGreenOption = function(fileName){menu.push({title:menu.length,cmd:'img/background images/green/'+fileName})}
addGreenOption('1280x1024_Lime-green-windows-vista-1600x1200-wallpapers-download-desktop.jpg')
addGreenOption('digital_abstract_background-wide.jpg')
addGreenOption('green_black_frosted.jpg')
addGreenOption('green-abstract-background.jpg')
addGreenOption('Technical-green-and-black-abstract-background-tron tech style1024x640.jpg')
addGreenOption('background-color-bright-wallpaper-computer-abstract-210463.jpg')



menu.push({title:'Surprise me!'  
  ,cmd:'random'
})

var getRandomSrc = function(){

  var randomMenuIndex = Math.floor(Math.random()*menu.length-1)
  return menu[randomMenuIndex].cmd
}//function that gets random src

var contextmenuOptions = {
    delegate: stageParent.div,
    menu: menu

    ,select: function(event, ui) {

if(ui.cmd === 'random'){ui.cmd = getRandomSrc()}
      self.setBackground(ui.cmd)
    }//event on select
    
  ,position:{my: 'left+' + x + ' top+' + y , of: stageParent.div, at:'left top'
  , within: stageParent.div, collision:'flipfit' }
   //  ,position:{within: stageParent.div, collision }
  
        ,create:function(event, ui) { //ui is {}
      console.log('contextmenu created')
      console.log(event)
     // console.log(ui)
    }
    ,beforeOpen: function(event, ui) { //ui = {menu:menu, target:this.delegate}
      console.log('original beforeOpen called, repositioning showmehere menu')
      console.log(event)
      console.log(ui)
       ui.menu.appendTo(stageParent.div)
      var css = {
'z-index':getZ('contextMenu','staticItems').container
,'font-size':'11px'
,'font-family':permanentPreferences.defaultFontType.value
,'padding':'0 0 0 0'
      }
      ui.menu.css(css)
      console.log(getDisplayObjectPositionAndSizeData(ui.menu[0], {size:true, position:true, maxSize:true}))
   

//replace before options
$(stageParent.div).off('contextmenubeforeOpen')
$(stageParent.div).on('contextmenubeforeOpen', function(event,ui){
  console.log('context menu called from regular right click, hiding and not showing it ...SUCCESS')
  $(stageParent.div).contextmenu('destroy')
  return false
})
    }//beforeOpen
            ,open:function(event, ui) { //ui is {}
      console.log('contextmenu opened')
   //   setDisplayObjectPositionData(ui.menu[0], {x:x,y:y} )
      console.log(getDisplayObjectPositionAndSizeData(ui.menu[0], {size:true, position:true, maxSize:true}))
    }

      ,close: function(event, ui) {
        console.log('bg contextmenu close event triggered')
       // alert("select " + ui.cmd + " on " + ui.target.text());
 //  $(document).contextmenu('destroy')
    }//event on select
    ,show:false //sets the ANIMATION for showing the menu, does NOT determine whether we will show the menu
,hide:false//sets the ANIMATION for hiding the menu, does NOT determine whether we will hide the menu
}//contextmenuOptions

console.log('attempting to remove old context menus')
//remove old contextmenu
try {$(document).contextmenu('destroy')}catch(err){}

console.log('attempting to create new contextmenu')
//create new context menu
$(document).contextmenu(contextmenuOptions)

console.log('calling contextmenu open')
//open the context menu
$(document).contextmenu  ("open", $(stageParent.div))

//console the menu
console.log($(document).contextmenu('getMenu'))



    }


     //===============START BET SLIDER===================

    this.events.wheelScroll = function(numScrolls){
      if(!_.isNumber(numScrolls)){return 'scroll failed'}

      var change = numScrolls*permanentPreferences.bigBlindsPerMouseScroll.value*self.initial_table_state.big_blind
          var betValue  = parseFloat($('#betSize').val())
    var isBetValueValid = !_.isNaN(betValue) && _.isNumber(betValue) 
     if(isBetValueValid == true){ var newBet = change + betValue} //use current value
      else{var newBet = change + self.gameState.betSize} //use previous known value if current value is invalid
//console.log(newBet+'before rounding')
        //round the new  bet
      newBet = self.returnRoundedDownBetSize(newBet)
   //   console.log(newBet+'after rounding')
        self.adjustBetDisplayToInputOfUser(newBet)
    }


     this.events.betSliderHorizontalMouseDown = function(event){
           var adjustBetSize = function (){

   var  unroundedBetAmount = $(self.images.betSlider.slider.image).slider('value')
   var  roundedBet = Math.round(unroundedBetAmount/self.initial_table_state.min_increment)*self.initial_table_state.min_increment

self.adjustBetDisplayToInputOfUser(roundedBet)
         }


         //define function that moves slider one tick left or right according to the event
         var moveSliderOnClick = function (event){
          
  
     }
   }//slider mousedown


     this.events.betSliderChanged = function(event, ui){
 // self.updateBetSize(ui.value)
        self.adjustBetDisplayToInputOfUser(ui.value, {slider:false})

 }

this.events.possibleRaiseOrBetAttemptFromBetSize = function(toggleRaiseAndBetEvents){
console.log('possibleRaiseOrBetAttemptFromBetSize called val = ' + $('#betSize').val())
    var newBetSize  = parseFloat($('#betSize').val())
    var isNumber = ( !isNaN(newBetSize)) && _.isNumber(newBetSize) 
    var roundedBetSize
    //if not a number use last known number and round
    if(isNumber == false ){ 

      roundedBetSize = self.returnRoundedDownBetSize(self.gameState.betSize)}
    else{roundedBetSize =  self.returnRoundedDownBetSize(newBetSize)}

  //insure rounded bet is not less or greater than max or min and set appropriately
    if(roundedBetSize > self.gameState.maxBet){roundedBetSize = self.gameState.maxBet}
        else if(roundedBetSize < self.gameState.minBet){roundedBetSize = self.gameState.minBet}

if(roundedBetSize != newBetSize){
 //make adjustments to bet sliders
        self.adjustBetDisplayToInputOfUser(roundedBetSize)

}
        //disable a bet attempt
       trueOrFalseToggleRaiseAndBet(toggleRaiseAndBetEvents)
        
}

var trueOrFalseToggleRaiseAndBet = function(toggleBoolean){


/*
var elem = $(self.images.betSlider.betSize.image)[0];
var data = jQuery.hasData( elem ) && jQuery._data( elem );
console.log(data.events);
*/

//we will toggle raise and bet abilities on
  if(toggleBoolean === true ){
console.log('trueOrFalseToggleRaiseAndBet called ')
    enableRaiseAndBetEvents()}

//we will disable raise and bet abilities
 else if(toggleBoolean === false ){
console.log('trueOrFalseToggleRaiseAndBet called')
  disableOneRaiseOrBetAttempt()  }


var failSound =  createjs.Sound.createInstance(self.images.sources.failClickSound)
var playFailSound = function(){failSound.play()} //function that plays the failsound



function disableOneRaiseOrBetAttempt (e){

disableNonStaticBetAndRaiseEvents()
  console.log('disableOneRaiseOrBetAttempt called')

//reset initial raise and bet events


//disable click on raise/bet image
//$('#self.images.raise.image.id, #self.images.bet.image.id').prop('disabled', true)
//$('#self.images.raise.image.id, #self.images.bet.image.id').addClass('btn-disabled')
$(self.images.raise.image).add(self.images.bet.image).one('mousedown.disableOneRaiseOrBetClick', disableOneRaiseOrBetClick)

$(self.images.raise.image).add(self.images.bet.image).on('click.preventOneClick', function(e){return false})
$(self.images.raise.image).add(self.images.bet.image).on('mouseup.restoreClick', function(e){
  createjs.Tween.get(this, {override:true}).wait(0).call(enableRaiseAndBetEvents);return false
})

//disable enter on betsize
$(self.images.betSlider.betSize.image).on('keydown.correctRaiseAndBetAmountOnBetSizeEnter', correctRaiseAndBetAmountOnBetSizeEnter)

//correct display on focusout
$(self.images.betSlider.betSize.image).on('focusout', self.events.possibleRaiseOrBetAttemptFromBetSize)


}//disable one raise or bet attempt, via enter or clicking the raise/bet button

function enableRaiseAndBetEvents (){
disableNonStaticBetAndRaiseEvents()
console.log('enableRaiseAndBetEvents called')
//$('#self.images.raise.image.id, #self.images.bet.image.id').removeClass('btn-disabled')
//console.log($('self.images.raise.image, self.images.bet.image'))
//$('#self.images.raise.image.id, #self.images.bet.image.id').prop('disabled', false)
$(self.images.betSlider.betSize.image).one('keydown.raiseOrBetOnBetSizeEnterPress', raiseOrBetOnBetSizeEnterPress)
}

//disables all raise, bet, and betSize events
function disableNonStaticBetAndRaiseEvents () {
$(self.images.betSlider.betSize.image).off('.raiseOrBetOnBetSizeEnterPress  .correctRaiseAndBetAmountOnBetSizeEnter .enableRaiseAndBetEventsOnBetSizeEnter focusout')
$(self.images.raise.image).add(self.images.bet.image).off('mousedown.disableOneRaiseOrBetClick click.preventOneClick mouseup.restoreClick')
}

function correctRaiseAndBetAmountOnBetSizeEnter (e) {
//  console.log(e)
var keycode = (event.keyCode ? event.keyCode : event.which)
  if(keycode === 13) {   //if enter key is pressed
    playFailSound()
    $(self.images.betSlider.betSize.image).one('keyup.enableRaiseAndBetEventsOnBetSizeEnter', enableRaiseAndBetEventsOnBetSizeEnter)
    $(self.images.betSlider.betSize.image).off('.correctRaiseAndBetAmountOnBetSizeEnter')
 //     console.log('correcting bet display/events, event type = ' + event.type)
    self.events.possibleRaiseOrBetAttemptFromBetSize (e)
    return false
}//if enter key was pressed

}

function enableRaiseAndBetEventsOnBetSizeEnter (e){
  console.log('keyup event called');console.log(e)
var keycode = (event.keyCode ? event.keyCode : event.which)
  if(keycode !== 13) {return}    //if enter key is pressed
    console.log('enabling bet/raise, event type = ' + event.type)
    self.events.possibleRaiseOrBetAttemptFromBetSize(true)
}


function raiseOrBetOnBetSizeEnterPress(e){
 var keycode = (event.keyCode ? event.keyCode : event.which)

  if(keycode !== 13) {return}    //if enter key is pressed
console.log('raiseOrBetOnBetSizeEnterPress called due to enter key pressed, event type = '+event.type)

if(self.images.raise.isDisplayed()){
$(self.images.raise.image).trigger('click')
  //e.target = self.images.raise.image;self.events.onButtonClick(e)
}
else if(self.images.bet.isDisplayed()){
$(self.images.bet.image).trigger('click')
  //e.target = self.images.bet.image;self.events.onButtonClick(e)
}
   
}//raiseOrBetOnBetSizeEnterPress


function disableOneRaiseOrBetClick (e){
  console.log('disableOneRaiseOrBetClick called')
  e.preventDefault()
  playFailSound()
  self.events.possibleRaiseOrBetAttemptFromBetSize(e)
 // this.one('focusout.preventRestore', function(e){e.preventDefault()})
//$(this).one('click.preventOneClick', function(e){return false})
//$(this).one('mouseup.restoreClick', function(e){e.preventDefault(); enableRaiseAndBetEvents()})
}//disable raise or bet onclick event once

function disableEnterOnce (e){
 var keycode = (event.keyCode ? event.keyCode : event.which)
       console.log('keydown pressed on betSize, but we are going to disable its effect once')
    if(keycode !== 13) {return}  //make sure keypressed is enter

      e.preventDefault() //prevent raise or bet 
 //   self.events.possibleRaiseOrBetAttemptFromBetSize(e)

    //make function that restores on keyup
     $(self.images.betSlider.betSize.image).one('keyup.restoreEnter', function(e){
enableRaiseAndBetEvents()
 })

}//disableEnterOnce

}//toggle RaiseOrBet


this.events.betSizeChanged = function(event){
  console.log('betsize changed called, val = ' + $('#betSize').val())
    //check if betSize value is different than the old value and is not empty
    var newBetSize = parseFloat($('#betSize').val())
  var hasValue = /\S/.test($('#betSize').val())

    var isNumber = ( !isNaN(newBetSize)) && _.isNumber(newBetSize) 
        var isChanged = newBetSize != self.gameState.betSize

if(hasValue && isNumber && isChanged){  self.adjustBetDisplayToInputOfUser(newBetSize)}//store and adust display if newBetSize is a new number

var roundedDownBetSize = self.returnRoundedDownBetSize(newBetSize)
//if new betsize is not rounded to nearest increment, then set disable raise and bet buttons
  if(roundedDownBetSize != newBetSize || roundedDownBetSize == false){
trueOrFalseToggleRaiseAndBet(false)
  }//if newbet is not appropriate

  //if newbetsize is rounded, enable bet and raise click events
else  if(roundedDownBetSize != false && roundedDownBetSize == newBetSize){
trueOrFalseToggleRaiseAndBet(true)
  }

}



  //=============END BET SLIDER===================

//--------------END EVENTS----------------------------


//returns the Image() instance
self.saveImageToParent = function(imageName, options){
if(!options){var options = {}}
  else{var options = _.clone(options)}

    var defaults = {

parent : permanentPreferences.sourceObjects.value

    }

options = _.defaults(options, defaults)

console.log('saveimagetoparent name: ' + imageName + ', src: ' + options.src)
console.log(options.parent[imageName])

if(_.isObject(options.parent[imageName])/* && imageParent[imageName].src*/){
console.log('saved an image load by fetching from already created image')
if(!isImage(options.parent[imageName])){throw'tried to fetch an object that is not an image'}
var image = options.parent[imageName]

}//if object already here then we do nothing

else{
  options.parent[imageName] = new Image()
      var image = options.parent[imageName]
    }
       
       var imageLoad = imagesLoaded(image)
        //callback functions onload/onerror
        if(_.isFunction(options.onload)){ imageLoad.on('done', function(imageLoaded){ options.onload(imageLoaded.elements[0])})}
        if(_.isFunction(options.onerror)){imageLoad.on('fail', function(imageLoaded){options.onerror(imageLoaded.elements[0])})}
     
     //assign src if necessary
      if(!_.isString(options.src) && !_.isObject(options.src)){
        //check if image is already defined in our sources
if(_.isString(self.images.sources[imageName]) || _.isObject(self.images.sources[imageName])){options.src = self.images.sources[imageName]}
  else{  options.src = imageName  }//if not we just use the image name as the source

      }//if src is not explicitely listed

if(_.isString(options.src) && options.src.indexOf('img') != 0){options.src = 'img/' + options.src}
image.src = options.src

return image
}


//-----------functions below this line ---------------------
this.loadImageSources = function(backgroundLoad){


if(self.isIframe()){
var preferencesRetreived = false
console.log('loadImageSources called from inside iframe')
self.getInitialPermanentPreferences (function(){preferencesRetreived = true})
}

if(backgroundLoad !== true){this.initializeStagesAndCanvasCallThisFirst()}


 var totalSources = 0
    var imageSourceArray = []
    var soundSourceArray = []
    var flashSoundSourceArray = []

    var resourceID = 0
   var loadedFiles=0
   var errorFiles = 0
   var errorSrcArray = []


//var stage = getZ('loadingScreen').stage

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
  
             imageSourceArray.push({src: self.images.sources[i], id:resourceID, name: i, sourceObjectParent: permanentPreferences.sourceObjects.value})
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

        permanentPreferences.sourceObjects.value[i] = {}
          for(var n in self.images.sources[i]){
              if(_.isString(self.images.sources[i][n])){
                  imageSourceArray.push({src: self.images.sources[i][n], id:resourceID, name: n, sourceObjectParent: permanentPreferences.sourceObjects.value[i]})
                  resourceID++
              }
          }//end iteration through this.images.sources[i]
        }//end check if this.images.sources[i] is object
        
      }//end iteration through this.images.sources
  
  //define object for card image to stay
  permanentPreferences.sourceObjects.value.desktopCards = {}
  permanentPreferences.sourceObjects.value.mobileCards = {}
  var desktopCards = permanentPreferences.sourceObjects.value.desktopCards
  var mobileCards = permanentPreferences.sourceObjects.value.mobileCards
  
   //push card back mobile and desktop
 // imageSourceArray.push({src:self.images.sources.desktopCardFolder+self.images.sources.cardBackFileNameWithoutExtension+'.png', id: resourceID, name: 'cardBack', sourceObjectParent: desktopCards})
  imageSourceArray.push({src:self.images.sources.desktopCardFolder+self.images.sources.cardSpriteFileNameWithoutExtension+'.png', id: resourceID, name: self.images.sources.cardSpriteFileNameWithoutExtension, sourceObjectParent: desktopCards})
  
  //imageSourceArray.push({src:self.images.sources.mobileCardFolder+self.images.sources.cardBackFileNameWithoutExtension+'.png', id: resourceID, name: 'cardBack', sourceObjectParent: mobileCards})
  

/*
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

*/
  totalSources = imageSourceArray.length+soundSourceArray.length+flashSoundSourceArray.length

  }//create preloadArray function
   

//console.log(imageSourceArray)

if(backgroundLoad !== true){
    //console.log(imageSourceArray)
    //define dimensions of preloading screen
    var introScreen = {}
   // console.log(this.arrayOfParentsOfStageAndOfContainerArray)
    var titleSizeAndFont = '20px ' + permanentPreferences.defaultFontType.value
     var titleHeight = 24
     var titleAndpreloadFillDistanceY = 50
     var titleText = 'Loading...'
     var titleColor = '#000000'
     var statusSizeAndFont = '15px ' + permanentPreferences.defaultFontType.value
     var statusHeight = 17
     var statusColor = '#000000'
     var preloadFillX = 0
    var preloadFillY  = viewedCanvasHeight
    var preloadEndX = viewedCanvasWidth
    var preloadEndY = viewedCanvasHeight
    var preloadFillWidth = viewedCanvasWidth*.65
    var preloadFillHeight = 30
    var preloadFillBorderColor = '#009933'
    var preloadFillProgressColor = '#009933'
    var preloadFillUnfinishedColor = 'rgb(150,150,150)'
    var introScreenBackgroundColor = "blue"
    var textOffsetX = 8
    var textOffsetY = 4
    var preloadBarHeight = 10
var preloadBarProgressColor = '#3300CC'
var preloadBarUnfinishedColor = '#00FFFF'


var animationZ = getZ('animation','loadingScreen')
var backgroundZ = getZ('background','loadingScreen')

    introScreen.background = new this.images.Item(0, 0, viewedCanvasWidth, viewedCanvasHeight, backgroundZ)
 introScreen.background.addBitmap(self.images.sources.loadingBackgroundDefault, {
  //make image fit our stage
onload:function(image){
var canvas = self.getParentOfStageObject(introScreen.background).stage.canvas
introScreen.background.image.setTransform(0,0, canvas.width/image.width, canvas.height/image.height)
introScreen.background.image.alpha = 0.5
introScreen.background.display()
}
 }//addBitmap options
 )

//new style, diagonal from bottom left

    introScreen.preloadFill = new this.images.Item(preloadFillX, preloadFillY, viewedCanvasWidth, viewedCanvasHeight, getZ('fill','loadingScreen'))
      introScreen.title = new this.images.Item(textOffsetX, textOffsetY, viewedCanvasWidth, titleHeight, animationZ)
     introScreen.preloadBar = new this.images.Item(0, viewedCanvasHeight - preloadBarHeight, viewedCanvasWidth, preloadBarHeight, animationZ)
 introScreen.status = new this.images.Item(textOffsetX, introScreen.preloadBar.position.y - statusHeight - textOffsetY, viewedCanvasWidth, statusHeight, animationZ)
    
 

     //define title text
     introScreen.title.addText( titleText, titleSizeAndFont, titleColor,{

      html:true
,css:{ 'text-align':'left'}

    })
     //define statusText
     introScreen.status.addText('', statusSizeAndFont, statusColor,
     {
html:true
,css:{
'text-align':'left'
//,'color':titleColor
}//status.css options
     }//status options
     )


//preloadBar
  introScreen.preloadBar.image = new createjs.Shape() 
introScreen.preloadBar.drawBar = function (progressRatio, options){
//console.log('drawbar called')
if(!options){var options = {}}

if(!_.isNumber(progressRatio) || _.isNaN(progressRatio)){var progressRatio = 0}
  else if(progressRatio > 1){progressRatio = 1/*;console.error('progress ratio greater than 1')*/}
else if (progressRatio < 0){progressRatio = 0;console.error('progress ratio negative')}

         //where to fill to
         var progressX = (introScreen.preloadBar.size.x*progressRatio) + introScreen.preloadBar.position.x
var endX = introScreen.preloadBar.size.x + introScreen.preloadBar.position.x

         //clear previous graphics
         introScreen.preloadBar.image.graphics.clear()
         //draw progress
         .beginStroke(preloadBarProgressColor).beginFill(preloadBarProgressColor).setStrokeStyle(0)
         .drawRect(introScreen.preloadBar.position.x,introScreen.preloadBar.position.y, progressX - introScreen.preloadBar.position.x, introScreen.preloadBar.size.y)

if(options.unfinished !== false){
//draw unfinished
introScreen.preloadBar.image.graphics.beginStroke(preloadBarUnfinishedColor).beginFill(preloadBarUnfinishedColor).setStrokeStyle(0)
.drawRect(progressX, introScreen.preloadBar.position.y, endX - progressX, introScreen.preloadBar.size.y )
}


this.progressRatio = progressRatio

//if image is on the stage, we need to set the stage upToDate variable to false
if(options.update !== false){self.updateStages(self.easelJSDisplayObjectChanged(introScreen.preloadBar))}
else{return self.easelJSDisplayObjectChanged(introScreen.preloadBar)}
 
     }//preloadBar.drawBar

   introScreen.preloadBar.animate = function(ticksPerCycle, options){

    if(!options){var options = {}}
//default ticks
var defaultTicksPerCycle = 75
if(!_.isNumber(ticksPerCycle) || _.isNaN(ticksPerCycle) || ticksPerCycle <= 0){var ticksPerCycle = defaultTicksPerCycle}


return introScreen.preloadBar.drawBar( (1/ticksPerCycle+introScreen.preloadBar.progressRatio)%1, options)

   }//animate



     //define function for drawing the loading bar graphic
     introScreen.preloadFill.image  = new createjs.Shape()
     introScreen.preloadFill.drawFill = function (progressRatio, options){
//console.log('drawing loading fill ' + progressRatio)
if(!options){var options = {}}

if(!_.isNumber(progressRatio) || _.isNaN(progressRatio)){var progressRatio = 0}
  else if(progressRatio > 1){progressRatio = 1}

         //where to fill to
         var progressX = 2*(introScreen.preloadFill.size.x*progressRatio)+ introScreen.preloadFill.position.x
var progressY = -2*(introScreen.preloadFill.size.y*progressRatio) + introScreen.preloadFill.position.y


         //clear previous graphics
         introScreen.preloadFill.image.graphics.clear()
         //draw outer border
         .beginStroke(preloadFillBorderColor).beginFill(preloadFillProgressColor).setStrokeStyle(1)
         .moveTo(introScreen.preloadFill.position.x, introScreen.preloadFill.position.y)
.lineTo(progressX, introScreen.preloadFill.position.y)
.lineTo(introScreen.preloadFill.position.x,progressY)
.closePath()//.beginFill(preloadFillProgressColor)

this.progressRatio = progressRatio

//if image is on the stage, we need to set the stage upToDate variable to false
if(options.update !== false){self.updateStages(self.easelJSDisplayObjectChanged(introScreen.preloadFill))}
else{return self.easelJSDisplayObjectChanged(introScreen.preloadFill)}
 
     }//preloadFill.drawFill

   introScreen.preloadFill.animate = function(ticksPerCycle, options){

    if(!options){var options = {}}
//default ticks
var defaultTicksPerCycle = 75
if(!_.isNumber(ticksPerCycle) || _.isNaN(ticksPerCycle) || ticksPerCycle <= 0){var ticksPerCycle = defaultTicksPerCycle}

var newProgressRatio = 1/ticksPerCycle+introScreen.preloadFill.progressRatio
if(options.cycle === true){newProgressRatio = newProgressRatio%1}


return introScreen.preloadFill.drawFill( newProgressRatio, options)

   }//animates

     console.log(introScreen.status)
     console.log('gjorb')
     //throw''

 
//create text to show user images are being displayed

self.images.loadingScreen = introScreen

 //add imageLoading
 
    var displayPreloadScreen  = function(options){
        //add images and text to containers 
    //  console.log(introScreen)
return self.displayChildren(introScreen,options)        
    }

}//if we are loading only in background and displaying nothing


function statusStringFromSource (src){  return src + ' downloaded'}


 //define image.onload functions
    function handleLoad(src, id, onEnd){
var stagesToUpdate  =  []
     // var stagesToUpdate = []
        loadedFiles++

       playZoneLandingPage.loadingScreen.status = statusStringFromSource(src)
       playZoneLandingPage.loadingScreen.progressRatio = loadedFiles/totalSources
try{
 //         stagesToUpdate.push(  introScreen.status.updateText(playZoneLandingPage.loadingScreen.status, {update:false}) )
 //    stagesToUpdate.push(   introScreen.preloadFill.drawFill(playZoneLandingPage.loadingScreen.progressRatio, {update:false}))
  // console.log('drawing bar due to completed load, ratio: ' +playZoneLandingPage.loadingScreen.progressRatio)
   self.updateStages(stagesToUpdate)
  // console.log('text = ' + introScreen.status.getText())
 }catch(err){/*console.log('error drawing bar')*/}
        console.log(src +' loaded file id: '+id+' totalLoaded: '+loadedFiles +' of '+totalSources)
      console.log(playZoneLandingPage.loadingScreen.progressRatio)
      
        if (id == imageSourceArray[imageSourceArray.length-1].id){
            console.log("last image loaded")
        }
         else if(id == soundSourceArray[soundSourceArray.length-1].id){
          console.log('last non-flash sound loaded')
        }
       
     
         if(onEnd){onEnd()}
    }
    function handleLoadError(src,id, onEnd){
        loadedFiles++
        errorFiles++
        errorSrcArray.push(src)
          playZoneLandingPage.loadingScreen.status = statusStringFromSource(src)
          playZoneLandingPage.loadingScreen.progressRatio = loadedFiles/totalSources
        try{
  //  stagesToUpdate.push(    introScreen.status.updateText(playZoneLandingPage.loadingScreen.status, {update:false}))
  //    self.updateStages(stagesToUpdate)
    }catch(err){}

         console.log(src + ' error loading file id: '+id+' totalLoaded: '+loadedFiles +' of '+totalSources)
         console.log(playZoneLandingPage.loadingScreen.progressRatio)
     //   introScreen.preloadFill.drawFill(loadedFiles/totalSources)
         if (id == imageSourceArray[imageSourceArray.length-1].id)  {
            console.log('last image loaded')
        }
        else if(id == soundSourceArray[soundSourceArray.length-1].id){
          console.log('last non-flash sound loaded')
        }

        if(loadedFiles >= totalSources){
console.log('load completed with total of '+ errorFiles +' image and sound errors whose sources are in the following array:')
console.log(errorSrcArray)

        }


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
    _.each(imageArray, function(elementValue, i, list){
  //    console.log(imageArray[i])
    //  if(!_.isObject(imageArray[i].sourceObjectParent)){imageArray[i].sourceObjectParent = permanentPreferences.sourceObjects.value}

    var src = imageArray[i].src

  if(_.isObject(src)){var callbackSrc = src.src}
    else{var callbackSrc = src}
       var onload = function(){handleLoad(callbackSrc, imageArray[i].id, increaseCounter)}
        var onerror = function(){handleLoadError(callbackSrc, imageArray[i].id, increaseCounter) }
self.saveImageToParent(imageArray[i].name, {src:src, onload:onload, onerror:onerror,parent:imageArray[i].sourceObjectParent })

    })//iterate through image array

}//preload


 function onComplete (){

//LOAD SPRITES
var fullSizeCardSpriteData = {
"images": ["sprite.png"], "frames": [[2080, 0, 40, 64], [2040, 0, 40, 64], [2000, 0, 40, 64], [1960, 0, 40, 64], [1920, 0, 40, 64], [1880, 0, 40, 64], [1840, 0, 40, 64], [1800, 0, 40, 64], [1760, 0, 40, 64], [1720, 0, 40, 64], [1680, 0, 40, 64], [1640, 0, 40, 64], [1600, 0, 40, 64], [1560, 0, 40, 64], [1520, 0, 40, 64], [1480, 0, 40, 64], [1440, 0, 40, 64], [1400, 0, 40, 64], [1360, 0, 40, 64], [1320, 0, 40, 64], [1280, 0, 40, 64], [1240, 0, 40, 64], [1200, 0, 40, 64], [1160, 0, 40, 64], [1120, 0, 40, 64], [1080, 0, 40, 64], [1040, 0, 40, 64], [1000, 0, 40, 64], [960, 0, 40, 64], [920, 0, 40, 64], [880, 0, 40, 64], [840, 0, 40, 64], [800, 0, 40, 64], [760, 0, 40, 64], [720, 0, 40, 64], [680, 0, 40, 64], [640, 0, 40, 64], [600, 0, 40, 64], [560, 0, 40, 64], [520, 0, 40, 64], [480, 0, 40, 64], [440, 0, 40, 64], [400, 0, 40, 64], [360, 0, 40, 64], [320, 0, 40, 64], [280, 0, 40, 64], [240, 0, 40, 64], [200, 0, 40, 64], [160, 0, 40, 64], [120, 0, 40, 64], [80, 0, 40, 64], [40, 0, 40, 64], [0, 0, 40, 64] ], "animations": {"2c":[0], "2d":[1], "2h":[2], "2s":[3], "3c":[4], "3d":[5], "3h":[6], "3s":[7], "4c":[8], "4d":[9], "4h":[10], "4s":[11], "5c":[12], "5d":[13], "5h":[14], "5s":[15], "6c":[16], "6d":[17], "6h":[18], "6s":[19], "7c":[20], "7d":[21], "7h":[22], "7s":[23], "8c":[24], "8d":[25], "8h":[26], "8s":[27], "9c":[28], "9d":[29], "9h":[30], "9s":[31], "ac":[32], "ad":[33], "ah":[34], "as":[35], "back":[36], "jc":[37], "jd":[38], "jh":[39], "js":[40], "kc":[41], "kd":[42], "kh":[43], "ks":[44], "qc":[45], "qd":[46], "qh":[47], "qs":[48], "tc":[49], "td":[50], "th":[51], "ts":[52] }
}

fullSizeCardSpriteData.images = [permanentPreferences.sourceObjects.value.desktopCards[self.images.sources.cardSpriteFileNameWithoutExtension]]
permanentPreferences.sourceObjects.value.desktopCards.spriteSheet = new createjs.SpriteSheet(fullSizeCardSpriteData)


/*
var mobileSizeCardSpriteData = {
"images": ["sprite.png"], "frames": [[1872, 0, 36, 45], [1836, 0, 36, 45], [1800, 0, 36, 45], [1764, 0, 36, 45], [1728, 0, 36, 45], [1692, 0, 36, 45], [1656, 0, 36, 45], [1620, 0, 36, 45], [1584, 0, 36, 45], [1548, 0, 36, 45], [1512, 0, 36, 45], [1476, 0, 36, 45], [1440, 0, 36, 45], [1404, 0, 36, 45], [1368, 0, 36, 45], [1332, 0, 36, 45], [1296, 0, 36, 45], [1260, 0, 36, 45], [1224, 0, 36, 45], [1188, 0, 36, 45], [1152, 0, 36, 45], [1116, 0, 36, 45], [1080, 0, 36, 45], [1044, 0, 36, 45], [1008, 0, 36, 45], [972, 0, 36, 45], [936, 0, 36, 45], [900, 0, 36, 45], [864, 0, 36, 45], [828, 0, 36, 45], [792, 0, 36, 45], [756, 0, 36, 45], [720, 0, 36, 45], [684, 0, 36, 45], [648, 0, 36, 45], [612, 0, 36, 45], [576, 0, 36, 45], [540, 0, 36, 45], [504, 0, 36, 45], [468, 0, 36, 45], [432, 0, 36, 45], [396, 0, 36, 45], [360, 0, 36, 45], [324, 0, 36, 45], [288, 0, 36, 45], [252, 0, 36, 45], [216, 0, 36, 45], [180, 0, 36, 45], [144, 0, 36, 45], [108, 0, 36, 45], [72, 0, 36, 45], [36, 0, 36, 45], [0, 0, 36, 45] ], "animations": {"2c":[0], "2d":[1], "2h":[2], "2s":[3], "3c":[4], "3d":[5], "3h":[6], "3s":[7], "4c":[8], "4d":[9], "4h":[10], "4s":[11], "5c":[12], "5d":[13], "5h":[14], "5s":[15], "6c":[16], "6d":[17], "6h":[18], "6s":[19], "7c":[20], "7d":[21], "7h":[22], "7s":[23], "8c":[24], "8d":[25], "8h":[26], "8s":[27], "9c":[28], "9d":[29], "9h":[30], "9s":[31], "ac":[32], "ad":[33], "ah":[34], "as":[35], "back":[36], "jc":[37], "jd":[38], "jh":[39], "js":[40], "kc":[41], "kd":[42], "kh":[43], "ks":[44], "qc":[45], "qd":[46], "qh":[47], "qs":[48], "tc":[49], "td":[50], "th":[51], "ts":[52] }
}
mobileSizeCardSpriteData.images = [permanentPreferences.sourceObjects.value.mobileCards[self.images.sources.cardSpriteFileNameWithoutExtension]]

permanentPreferences.sourceObjects.value.mobileCards.spriteSheet = new createjs.SpriteSheet(mobileSizeCardSpriteData)
*/

var stagesToUpdate = []

  console.log('onComplete called in initialize');console.log(parent)

     if(backgroundLoad !== true){
  stagesToUpdate.push( introScreen.status.updateText('preparing images'),{update:false} )
  //  stagesToUpdate.push( introScreen.title.updateText('displaying images '),{update:false} )
     //   stagesToUpdate.push( self.displayChildren(self.images.imageLoading.title,{update:false}) )
       self.updateStages(stagesToUpdate)
stagesToUpdate.length = 0
             self.createAllItems()

           }//if we not just loading in the background

createjs.Ticker.removeEventListener('tick', checkIfCompleted)

        }

function checkIfCompleted(e){

//if(self.isIframe()){console.log('checkIfCompleted called from iframe'+playZoneLandingPage.loadingScreen.progressRatio+playZoneLandingPage.loadingScreen.loaded)}
//else{console.log('checkIfCompleted called from landingpage');return}
  var stagesToUpdate = []
 // console.log(e)
//CHECK IF COMPLETED
//if(loadedImages >= imageArray.length){
   if(playZoneLandingPage.loadingScreen.progressRatio >= 1 || playZoneLandingPage.loadingScreen.loaded === true){

if (preferencesRetreived !== false){onComplete()}

}
//UPDATE DISPLAY IF NOT COMPLETED
else{
   if(!_.isObject(playZoneLandingPage.loadingScreen)){console.log(playZoneLandingPage);throw'loadingscreen not object'}
//  console.log('changing status text to: ' + playZoneLandingPage.loadingScreen.status)
  stagesToUpdate.push(introScreen.status.updateText(playZoneLandingPage.loadingScreen.status, {update:false}))
  //stagesToUpdate.push(introScreen.preloadFill.drawFill(playZoneLandingPage.loadingScreen.progressRatio, {update:false}))



  console.log('updating bar and status')


}

/*
var ticksPerPreloadBarCycle = 75
var progressRatioIncrease = 1/ticksPerPreloadBarCycle
 stagesToUpdate.push(introScreen.preloadBar.drawBar( (introScreen.preloadBar.progressRatio + 1/ticksPerPreloadBarCycle)%1, {update:false}) )
*/
//introScreen.preloadBar.animate({update:false})
   stagesToUpdate.push(displayPreloadScreen({update:false}) )
   self.updateStages(stagesToUpdate)

  }//check if completed

var preloadSounds = function(flashArray, soundArray){

createjs.FlashPlugin.swfPath  = "/js/vendor/" //tell createjs where to find default flash audio
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
 // temp.play()
  handleLoad(flashArray[i].src, flashArray[i].id)
}


}

//ACTION

//console.log('we are going to check whether to perform load from this page, or use other page load');
//console.log(parent)


if(playZoneLandingPage.loadingScreen && (playZoneLandingPage.loadingScreen.loaded === true || playZoneLandingPage.loadingScreen.loading === true)){console.log('other frame to load our images');console.log(permanentPreferences.sourceObjects.value);console.log(playZoneLandingPage.sourceObjects)}
  else{
    console.log('loading from this page')
  //  playZoneLandingPage.sourceObjects = {}
  playZoneLandingPage.loadingScreen = {}
    playZoneLandingPage.loadingScreen.loading = true

playZoneLandingPage.loadingScreen.progressRatio = 0
playZoneLandingPage.loadingScreen.status = ''

createPreloadArray()
          preloadSounds(flashSoundSourceArray, soundSourceArray)
    preloadImages(imageSourceArray)
  }

//if this is the main page (parent of the table iframes), we dont want to display anything at all
  if(backgroundLoad !== true) { 
//add event listener to stage to see if it is done
displayPreloadScreen()
createjs.Ticker.setInterval(30)


  createjs.Ticker.addEventListener('tick', introScreen.preloadFill.animate)
      createjs.Ticker.addEventListener('tick', introScreen.preloadBar.animate)
   createjs.Ticker.addEventListener('tick', checkIfCompleted)


  }

//async.



}//initialize on parent object function



this.images.setDefaults = function(){

//========================IMAGE STATIC VARIABLES ==============================
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
      var checkBoxButtonSource = permanentPreferences.sourceObjects.value.checkBox
    var checkBoxButtonCheckedSource = permanentPreferences.sourceObjects.value.checkBoxChecked
       var checkBoxButtonWidth = 100
     var checkBoxButtonHeight = 13
            var checkBoxButtonDistanceFromChat = 8
            var checkBoxButtonOffSetLeft = 2
           var  checkBoxButtonDistanceY = 3
           var checkBoxButtonCheckBoxWidth = checkBoxButtonHeight
           var checkBoxButtonDistanceFromBoxToText = 5
           var checkBoxButtonDistanceFromEdgeToInteriorHitAreaY = 1
           var checkBoxButtonSizeAndFont = '10px ' + permanentPreferences.defaultFontType.value
           var checkBoxButtonTextColor = '#FFFFFF'

            var actionButtonWidth = 80
            var actionButtonHeight = 30
            var actionButtonLeftX = 160
            var actionButtonY = 419
            var distanceBetweenActionButtons = 19
            var seatWidth = 90
            var seatHeight = 33
            var distanceBetweenSeatsX = 40
            var distanceBetweenSeatsY = 123

            var firstRowY = 77
            var secondRowY = 153
            var thirdRowY = secondRowY + seatHeight + distanceBetweenSeatsY
            var fourthRowY = 371

            var firstColumnX = 10
            var fifthColumnX = viewedCanvasWidth - firstColumnX - seatWidth

            var secondColumnX = viewedCanvasWidth/2 - seatWidth/2 - seatWidth - distanceBetweenSeatsX
            var thirdColumnX = viewedCanvasWidth/2 - seatWidth/2 
            var fourthColumnX = thirdColumnX + seatWidth + distanceBetweenSeatsX

var currencyDisplayWidth = viewedCanvasWidth
var currencyDisplayHeight = 15
var currencyDisplayTopOffset = 0
var currencyDisplaySizeAndFont = '12px ' + permanentPreferences.defaultFontType.value
var currencyDisplayColor = 'white'

            var communityY = 220
            var distanceBetweenCommunityCards = 2

var dealerButtonSource = permanentPreferences.sourceObjects.value.dealerButton
            var dealerButtonWidth = 32
            var dealerButtonHeight = 24

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
            var distanceFromTotalPotSizeToPot0 = 1
            var potSizeAndFont = '14px ' + permanentPreferences.defaultFontType.value
            var potTextColor = '#FFFFFF'

            var potDistanceToCommunity = -25

           var chipSource = permanentPreferences.sourceObjects.value.chips['10']
         var chipDiameter = 20 //chipSource.width  // var chipDiameter = 20
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

          
            var distanceBetweenBetSizeAndHorizontalSlider = 15
            var distanceBetweenBetSizeAndCanvasX = firstColumnX
            var betSizeWidth = viewedCanvasWidth/9.5
            var betSizeHeight = 25

            var verticalBetSliderWidth = 6
            var verticalBetSliderHeight = 13  
     //        var horizontalBetSliderOffsetBottom =  19
            var distanceFromActionButtonToHorizontalBetSliderX = 10          
         //   var horizontalBetSliderWidth =              //used to be manually assigned 125
            var horizontalBetSliderHeight = 7
      //      var horizontalBetSliderX = 215  X value is currently equal to the X value of the FOLD button


            //space between player chat and seat
            var chatBoxWidth = seatWidth*1.4
            var initialChatBoxHeight = seatHeight/2.3

            var absoluteChatDistanceFromSeatY = seatHeight/6
             var chatBoxBorderColor = '#FFFFFF'
             var chatBoxFontSize = 11

            //space between player's cards/seats, and chip images in play, relative to the upper left seat corner
            var bottomChipOffsetX = chipDiameter
            var bottomChipOffsetY = - cardHeight*shownCardY - chipDiameter*1.5
            var leftChipOffsetX =  seatWidth + chipDiameter*1.5
            var leftChipOffsetY = chipDiameter/2
            var topChipOffsetX = seatWidth - chipDiameter
            var topChipOffsetY = seatHeight + chipDiameter*1.5
            var rightChipOffsetX = - chipDiameter*1.5
            var rightChipOffsetY = seatHeight - chipDiameter/2

            //cashier Button width and height

            var cashierButtonSource =  permanentPreferences.sourceObjects.value.cashierButton
           var minCashierButtonTextWidth = 132


//distance between upper buttons
var distanceBetweenUpperButtonHitAreasY = 3

            //define dimensions for upper right and upper left buttons

                   //---------------stand up----------
            var standUpSource = permanentPreferences.sourceObjects.value.standUp
          var standUpWidth =  158
               var standUpHeight = 26
            var standUpHitAreaUpperLeftOffsetX  = 6 //distance from left of standUp image and mouse events
            var standUpHitAreaLowerLeftOffsetX = 37
            var standUpHitAreaTopOffset  = 1 // distance from top of standUp image and mouse event clicks
            var standUpHitAreaBottomOffset  = 3 
            var standUpHitAreaRightOffset  = 1  // distance from rightside of image and hit area

       //---------------exit table----------
     var exitTableSource = permanentPreferences.sourceObjects.value.exitTable 
                var exitTableWidth =  135
               var exitTableHeight = 32

             var exitTableHitAreaUpperLeftOffsetX  = 18 //distance from left of ExitTable image and mouse events
            var exitTableHitAreaLowerLeftOffsetX = 49
            var exitTableHitAreaTopOffset  = 1 // distance from top of ExitTable image and mouse event clicks
             var exitTableHitAreaBottomOffset  = 9
            var exitTableHitAreaRightOffset  = 1  // distance from ExitTable of image and hit area
            
            //---------------get chips----------
             var getChipsSource = permanentPreferences.sourceObjects.value.getChips 
                var getChipsWidth = 149
               var getChipsHeight = 41

             var getChipsHitAreaLeftOffset  = 1 //distance from left of getChips image and mouse events
            var getChipsHitAreaTopOffset  = 1 // distance from top of getChips image and mouse event clicks
             var getChipsHitAreaBottomOffset  = 10
            var getChipsHitAreaUpperRightOffset  = 9
            var getChipsHitAreaLowerRightOffset  = 38

//show/hidde table chat full buttons
     var showTableChatFullSource = permanentPreferences.sourceObjects.value.showTableChatFull 
                var showTableChatFullWidth =   112
               var showTableChatFullHeight =   31
                  
var showTableChatFullHitAreaOffsetLeft= 1
var showTableChatFullHitAreaOffsetTop = 1
var showTableChatFullHitAreaOffsetBottom = 7
var showTableChatFullHitAreaOffsetTopRight =5
var showTableChatFullHitAreaOffsetBottomRight = 27


            var seatOuterStrokeWidth = 1.5

        //    var tableX = 0
            var tableY = 88

            var disabledButtonOverlayAlpha = 0.43


  //------------------------------community cards---------------------------
        this.community[0] = new this.Item(viewedCanvasWidth/2-cardWidth/2-cardWidth*2-distanceBetweenCommunityCards*2,communityY,cardWidth, cardHeight,getZ('community'))
        this.community[1] = new this.Item(viewedCanvasWidth/2-cardWidth/2-cardWidth-distanceBetweenCommunityCards,communityY,cardWidth, cardHeight,getZ('community'))
        this.community[2] = new this.Item(viewedCanvasWidth/2-cardWidth/2,communityY,cardWidth, cardHeight, getZ('community'))
        this.community[3] = new this.Item(viewedCanvasWidth/2+cardWidth/2+distanceBetweenCommunityCards,communityY,cardWidth, cardHeight,getZ('community'))
        this.community[4] = new this.Item(viewedCanvasWidth/2+cardWidth/2+cardWidth+2*distanceBetweenCommunityCards,communityY,cardWidth, cardHeight,getZ('community'))

  //------------------card spawn location---------------------------------

           this.startingCard = new this.Item(viewedCanvasWidth, viewedCanvasHeight, cardWidth, cardHeight, getZ('cardAnimation'))


            //------------------------------------dealerButton------------------------------------
           this.dealerButton = new this.Item(0,0,dealerButtonWidth, dealerButtonHeight,getZ('dealerChip'))
           this.dealerButton.addBitmap( permanentPreferences.sourceObjects.value.dealerButton)

var chipAndPotZ = getZ( 'chips')

var createPotItems = function(potNumber, firstChipX, firstChipY, options){
  if(!options){var options = {}}
var distanceY = distanceBetweenChipsY
 var maxPotWidth = (distanceX)*(self.imageData.maxChipColumns-1)+chipDiameter
var distanceX = self.imageData.distanceBetweenChipColumns + chipDiameter;



if(options.columnDirection === 'left'){distanceX = distanceX*-1}


  self.images.pots[potNumber].firstChip = new self.images.Item(firstChipX, firstChipY ,chipDiameter,chipDiameter,chipAndPotZ)
              self.images.pots[potNumber].secondChip = new self.images.Item(firstChipX,firstChipY - distanceY,chipDiameter,chipDiameter,chipAndPotZ)
              self.images.pots[potNumber].secondColumnChip = new self.images.Item(firstChipX+distanceX,firstChipY,chipDiameter,chipDiameter,chipAndPotZ)

if(options.columnDirection !== 'left'){
                   self.images.pots[potNumber].potSize = new self.images.Item(firstChipX,firstChipY+chipDiameter,betSizeWidth,potHeight,chipAndPotZ)
                 }

                   else{
                    self.images.pots[potNumber].potSize = new self.images.Item(firstChipX + chipDiameter - betSizeWidth,firstChipY+chipDiameter, betSizeWidth, potHeight, chipAndPotZ) 
                  }//if we want to go left
             self.images.pots[potNumber].potSize.addNumberText( '' ,potSizeAndFont, potTextColor, {textAlign:'left'})
self.images.pots[potNumber].potSize.text.maxWidth = 999999
//console.log('created pot items for pot number: '+potNumber);console.log(self.images.pots[potNumber])
}


            //---------pots-------------------
    var pot0X = viewedCanvasWidth/2-cardWidth/2-cardWidth; var pot0Y = communityY - potHeight - chipDiameter

createPotItems(0, pot0X, pot0Y)

   /*         this.pots[0].firstChip = new this.Item(viewedCanvasWidth/2-cardWidth/2-cardWidth,communityY+potDistanceToCommunity,chipDiameter,chipDiameter,getZ('animatedAndMiddleTableItems'))
              this.pots[0].secondChip = new this.Item(this.pots[0].firstChip.position.x,this.pots[0].firstChip.position.y-distanceBetweenChipsY,chipDiameter,chipDiameter,getZ('animatedAndMiddleTableItems'))
              this.pots[0].secondColumnChip = new this.Item(this.pots[0].firstChip.position.x+chipDiameter+self.imageData.distanceBetweenChipColumns,this.pots[0].firstChip.position.y,chipDiameter,chipDiameter,getZ('animatedAndMiddleTableItems'))
           
 

            this.pots[0].potSize = new this.Item(this.pots[0].firstChip.position.x, this.pots[0].firstChip.position.y+potHeight,potWidth,potHeight,getZ('animatedAndMiddleTableItems'))
             this.addText(this.pots[0].potSize, 0,potSizeAndFont, potTextColor)
       */                


                                    var totalPotWidth = (this.pots[0].secondColumnChip.position.x-this.pots[0].firstChip.position.x)*(self.imageData.maxChipColumns-1)+chipDiameter
              var distanceBetweenPots = self.imageData.maxChipColumns
           var distanceBetweenChipsInColumn =  this.pots[0].firstChip.position.y - this.pots[0].secondChip.position.y
           var chipColumnHeight = chipDiameter +(self.imageData.maxChipsPerColumn-1)*distanceBetweenChipsInColumn
           var maxChipColumnHeight = (self.imageData.maxChipsPerColumn - 1)*(this.pots[0].secondChip.position.x-this.pots[0].firstChip.position.x) + chipDiameter
           var maxTotalPotHeight = maxChipColumnHeight + potHeight

                  
           this.totalPotSize  = new this.Item(this.pots[0].firstChip.position.x, this.pots[0].firstChip.position.y+chipDiameter-chipColumnHeight-potHeight - distanceFromTotalPotSizeToPot0,potWidth,potHeight, chipAndPotZ)
          this.totalPotSize.addNumberText( '',potSizeAndFont, potTextColor)
          this.totalPotSize.text.prefix = 'Total: '
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

var pot8X = viewedCanvasWidth/2 - totalPotWidth/2; var pot8Y =  this.totalPotSize.position.y - maxTotalPotHeight
createPotItems(8, pot8X, pot8Y)


/*
              for(var i=1;i<this.seats.length-1;i++){

             this.pots[i].firstChip = new this.Item( this.pots[0].firstChip.position.x+i*distanceBetweenPots, this.pots[0].firstChip.position.y ,chipDiameter,chipDiameter,getZ('animatedAndMiddleTableItems'))
              this.pots[i].secondChip = new this.Item(this.pots[0].secondChip.position.x+i*distanceBetweenPots,this.pots[0].secondChip.position.y,chipDiameter,chipDiameter,getZ('animatedAndMiddleTableItems'))
              this.pots[i].secondColumnChip = new this.Item(this.pots[0].secondColumnChip.position.x+i*distanceBetweenPots,this.pots[0].secondColumnChip.position.y,chipDiameter,chipDiameter,getZ('animatedAndMiddleTableItems'))

                   this.pots[i].potSize = new this.Item(this.pots[0].potSize.position.x+i*distanceBetweenPots,this.pots[0].potSize.position.y,potWidth,potHeight,getZ('animatedAndMiddleTableItems'))
             this.addText(this.pots[i].potSize, 0,potSizeAndFont, potTextColor)
              }

*/

              //---------------------player chat input---------------
              this.htmlTableChatBox = new this.Item(htmlTableChatBoxLeftOffset,viewedCanvasHeight - htmlTableChatBoxBottomOffset-htmlTableChatBoxHeight-htmlTableChatBorderSize*2,htmlTableChatBoxWidth,htmlTableChatBoxHeight, getZ('chat','staticItems'))

//this.htmlTableChatBox.addElement(self.jQueryObjects.chatBoxInput[0], 'image')
 this.htmlTableChatBox.addElement(self.jQueryObjects.chatBoxInput[0], 'image')

var defaultMessage = 'Type here to chat'
self.jQueryObjects.chatBoxInput.val(defaultMessage)
self.jQueryObjects.chatBoxInput.css('color', htmlTableChatBoxReminderTextColor)

//remove reminder text when clicked
self.jQueryObjects.chatBoxInput.focus(function(){
    if(self.jQueryObjects.chatBoxInput.val() == defaultMessage){
    self.jQueryObjects.chatBoxInput.val('')
self.jQueryObjects.chatBoxInput.css('color', permanentPreferences.chatTextColor.value)}
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
//$(chatBoxStageParent.div).append(self.jQueryObjects.chatBoxDiv)

//self.jQueryObjects.chatBoxDiv.css('z-index', parseInt(chatBoxStageCanvasZIndex)+1)

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
    if(keycode == 13) {    
        socket.emit('chat', $("#chat").val())
        $("#chat").val('')
        self.jQueryObjects.chatBoxInput.focus()
        }
    })

  //hitAreas for buttons
      self.images.drawCheckBoxButtonHitSquareAndAdjustItemSize = function(item){
          //get width of text
          var data = item.getChildPositionAndSizeData('text',{maxSize:true})
       //   console.log('drawCheckBoxButtonHitSquareAndAdjustItemSize')
    //      console.log(item)
    //      console.log(data)
        var textWidth =  data.currentWidth
        var totalWidth = checkBoxButtonCheckBoxWidth + checkBoxButtonDistanceFromBoxToText + textWidth
        item.size.x = totalWidth
        var textHeight = data.outerHeight//item.text.getMeasuredHeight()
        if(textHeight > checkBoxButtonHeight){var height = textHeight}
          else{var height = checkBoxButtonHeight}
            item.size.y = height
        //draw rectangular shape
        var hitSquare = new createjs.Shape()
        hitSquare.graphics.beginFill('#FFFFFF').beginStroke(0)
        .drawRect(0, 0, item.size.x, item.size.y)
    //    console.log('drew hitsquare')
    //    console.log(hitSquare)
    if(item.image){item.image.hitArea = hitSquare}

//throw''

        return hitSquare
      }

//function for creating text from all fast
    self.images.addCheckBoxButtonText = function(item, text, textOptions){
if(!textOptions){var options = {}}
  else{var options = _.clone(textOptions)}
  update = options.update
options.update = false
if(options.html !== false){options.html = true}

      var stagesToUpdate = []

      if(options.html === true){//HTML text
options.css = {'text-align': 'left'}
item.addText(text, checkBoxButtonSizeAndFont, checkBoxButtonTextColor, options)
setDisplayObjectPositionData(item.text, {x:item.position.x + checkBoxButtonCheckBoxWidth + checkBoxButtonDistanceFromBoxToText, width: self.getParentOfStageObject(item).stage.canvas.width})

      }//html text

else{//if easeljs text

         if(item.text instanceof createjs.Text !== true)  {
          var text = new createjs.Text(text, checkBoxButtonSizeAndFont, checkBoxButtonTextColor)
item.adoptChild(text, 'text')
        }
          

          else{
//check if we need to update stage possibly
if(item.text.text !== text 
  || item.font !== checkBoxButtonSizeAndFont
  ||item.color !== checkBoxButtonTextColor
||item.text.x!==item.position.x + checkBoxButtonCheckBoxWidth + checkBoxButtonDistanceFromBoxToText
||item.text.y!==item.position.y 
||item.text.baseline !== 'top'
||item.text.textAlign !== 'left'){  stagesToUpdate.push(self.easelJSDisplayObjectChanged(item))}

            item.text.text = text
item.font = checkBoxButtonSizeAndFont
item.color = checkBoxButtonTextColor
          }

item.text.x=item.position.x + checkBoxButtonCheckBoxWidth + checkBoxButtonDistanceFromBoxToText
item.text.y=item.position.y 
item.text.baseline = 'top'
item.text.textAlign = 'left'
item.textColor = checkBoxButtonTextColor


item.text.mouseEnabled = false
item.text.hitArea = hit


//assign options as properties
assignObjectPropertiesAsPropertiesOfDisplayObject(item.text, options)

}//if easeljs text

self.images.drawCheckBoxButtonHitSquareAndAdjustItemSize(item)


options.update = update
if(update !== false){self.updateStages(stagesToUpdate)}
else{return stagesToUpdate}
}

self.images.itemsAsCheckBoxes = function(uncheckedItem,checkedItem, text, checkBoxOptions){
  if(!textOptions) {var options = {}}
    else{var options = _.clone(textOptions)}
      options.html = true

uncheckedItem.addBitmap( checkBoxButtonSource)
self.images.addCheckBoxButtonText(uncheckedItem, text, options)

checkedItem.addBitmap (checkBoxButtonCheckedSource)
self.images.addCheckBoxButtonText(checkedItem, text, options)
}

           //--------standard pre-action buttons---------------------
          this.foldToAnyBet = new  this.Item(checkBoxButtonOffSetLeft,this.htmlTableChatBox.position.y-  checkBoxButtonDistanceFromChat - 3*checkBoxButtonHeight-2*checkBoxButtonDistanceY,checkBoxButtonWidth,checkBoxButtonHeight, getZ('buttons','staticItems'), {messages:[['set_flag','check',true], ['set_flag','fold',true]]})
          this.sitOutNextHand = new  this.Item(checkBoxButtonOffSetLeft,this.htmlTableChatBox.position.y -  checkBoxButtonDistanceFromChat- 2*checkBoxButtonHeight - checkBoxButtonDistanceY,checkBoxButtonWidth,checkBoxButtonHeight, getZ('buttons','staticItems'), {messages:['sit_out']})
        this.sitOutNextBlind =  new this.Item(checkBoxButtonOffSetLeft,this.htmlTableChatBox.position.y-  checkBoxButtonDistanceFromChat- checkBoxButtonHeight,checkBoxButtonWidth,checkBoxButtonHeight, getZ('buttons','staticItems'), {messages:['set_flag', 'post_blind', false]})
               
                //define on versions
                  this.foldToAnyBetOn =  new this.Item(this.foldToAnyBet.position.x,this.foldToAnyBet.position.y, this.foldToAnyBet.size.x,this.foldToAnyBet.size.y,getZ('buttons','staticItems'), {messages:[['set_flag','fold',false], ['set_flag','check',false]]})     
          this.sitOutNextHandOn = new  this.Item(this.sitOutNextHand.position.x,this.sitOutNextHand.position.y, this.sitOutNextHand.size.x,this.sitOutNextHand.size.y,getZ('buttons','staticItems'),{messages: ['sit_in']})
        this.sitOutNextBlindOn = new  this.Item(this.sitOutNextBlind.position.x,this.sitOutNextBlind.position.y, this.sitOutNextBlind.size.x,this.sitOutNextBlind.size.y,getZ('buttons','staticItems'), {messages:['set_flag', 'post_blind', true]})
        
this.foldToAnyBet.addBitmap( permanentPreferences.sourceObjects.value.checkBox)
this.sitOutNextHand.addBitmap( permanentPreferences.sourceObjects.value.checkBox)
this.sitOutNextBlind.addBitmap( permanentPreferences.sourceObjects.value.checkBox)

this.foldToAnyBetOn.addBitmap (permanentPreferences.sourceObjects.value.checkBoxChecked)
this.sitOutNextHandOn.addBitmap(permanentPreferences.sourceObjects.value.checkBoxChecked)
this.sitOutNextBlindOn.addBitmap( permanentPreferences.sourceObjects.value.checkBoxChecked)



      //off state
      self.images.addCheckBoxButtonText (this.foldToAnyBet, 'Auto check/fold')
      self.images.addCheckBoxButtonText (this.sitOutNextHand, 'Sit out next hand')
      self.images.addCheckBoxButtonText (this.sitOutNextBlind,'Sit out next blind')
      
      //on state
      self.images.addCheckBoxButtonText (this.foldToAnyBetOn, 'Auto check/fold')
      self.images.addCheckBoxButtonText (this.sitOutNextHandOn, 'Sit out next hand')
      self.images.addCheckBoxButtonText (this.sitOutNextBlindOn,'Sit out next blind')

  
  var seatZ =  getZ('seats','staticItems')

           //----------------------seats-------------------------------
           this.seats[0].seat = new this.Item(thirdColumnX,fourthRowY,seatWidth,seatHeight, seatZ)
           this.seats[1].seat = new this.Item(secondColumnX,fourthRowY,seatWidth,seatHeight,seatZ)
           this.seats[2].seat = new this.Item(firstColumnX,thirdRowY,seatWidth,seatHeight,seatZ)
           this.seats[3].seat = new this.Item(firstColumnX,secondRowY,seatWidth,seatHeight,seatZ)
           this.seats[4].seat = new this.Item(secondColumnX,firstRowY,seatWidth,seatHeight,seatZ)
           this.seats[5].seat = new this.Item(thirdColumnX,firstRowY,seatWidth,seatHeight,seatZ)
           this.seats[6].seat = new this.Item(fourthColumnX,firstRowY,seatWidth,seatHeight,seatZ)
            this.seats[7].seat = new this.Item(fifthColumnX,secondRowY,seatWidth,seatHeight,seatZ)
             this.seats[8].seat = new this.Item(fifthColumnX,thirdRowY,seatWidth,seatHeight,seatZ)
     this.seats[9].seat = new this.Item(fourthColumnX,fourthRowY,seatWidth,seatHeight,seatZ)

      //---filled seats------
     
           
     
      _.each(_.range(this.seats.length), function(i) {
var playerSeatObject = self.images.seats[i]

          var x = playerSeatObject.seat.position.x
          var y = playerSeatObject.seat.position.y
          var width = playerSeatObject.seat.size.x
          var height = playerSeatObject.seat.size.y
          playerSeatObject.seat.image = new createjs.Shape()
 playerSeatObject.seat.image.parentItem = playerSeatObject.seat



})


  //=====================================seat images=========================================
for(var i =0;i<this.seats.length;i++){

//draw seated seat image
self.images.drawSeat(this.seats[i].seat, '#00008B','#000000', '#7d7d7d',{outerStrokeWidth:1})

//mouseover events
this.seats[i].seat.on('mouseover',  self.events.seatMouseEvent)
this.seats[i].seat.on('mouseout',  self.events.seatMouseEvent)
this.seats[i].seat.on('contextmenu', self.events.onDisabledOrNonUserSeatClick, {cursor:false})

    //--------------------empty seats and text----------------- 
         this.seats[i].openSeat = new this.Item(this.seats[i].seat.position.x, this.seats[i].seat.position.y,this.seats[i].seat.size.x,this.seats[i].seat.size.y,seatZ)
          this.seats[i].disabledSeat = new this.Item(this.seats[i].seat.position.x, this.seats[i].seat.position.y,this.seats[i].seat.size.x,this.seats[i].seat.size.y, seatZ)

var seatTextX =  this.seats[i].seat.position.x + seatOuterStrokeWidth 
var seatTopTextY  = this.seats[i].seat.position.y + seatOuterStrokeWidth
var seatTextWidth = this.seats[i].seat.size.x - seatOuterStrokeWidth*2
var seatTextHeight = (this.seats[i].seat.size.y - seatOuterStrokeWidth*2)/2
var seatBottomTextY = seatTopTextY + seatTextHeight

         this.seats[i].action = new this.Item(seatTextX, seatTopTextY, seatTextWidth, seatTextHeight, seatZ)
         this.seats[i].countdown = new this.Item(seatTextX, seatTopTextY, seatTextWidth, seatTextHeight, seatZ)
         this.seats[i].winner = new this.Item(seatTextX, seatTopTextY, seatTextWidth, seatTextHeight, seatZ)

         this.seats[i].playerName = new this.Item(seatTextX, seatTopTextY, seatTextWidth,seatTextHeight, seatZ)
         this.seats[i].status = new this.Item(seatTextX, seatBottomTextY, seatTextWidth,seatTextHeight, seatZ)
 
 this.seats[i].stackSize = new this.Item(seatTextX, seatBottomTextY, seatTextWidth,seatTextHeight, seatZ)
 this.seats[i].gettingChips = new this.Item(seatTextX, seatBottomTextY, seatTextWidth,seatTextHeight, seatZ)
this.seats[i].sittingOut = new this.Item(seatTextX, seatBottomTextY, seatTextWidth,seatTextHeight, seatZ)

     //------------------hole cards-----------------------------
            var middleOfSeat = this.seats[i].seat.position.x +this.seats[i].seat.size.x/2
            var cardY = this.seats[i].seat.position.y - cardHeight*shownCardY
             var card0X = middleOfSeat - cardWidth - spaceBetweenHoleCards/2
            var card1X = middleOfSeat  + spaceBetweenHoleCards/2
             
             this.seats[i].hiddenCards = []
            this.seats[i].hiddenCards[0] = new this.Item(card0X, cardY, cardWidth, cardHeight,getZ('holeCards'))
            this.seats[i].hiddenCards[1]  = new this.Item(card1X, cardY, cardWidth, cardHeight,getZ('holeCards'))
 this.seats[i].shownCards =[]
            this.seats[i].shownCards[0] = new this.Item(card0X, cardY, cardWidth, cardHeight,getZ('holeCards'))
            this.seats[i].shownCards[1] = new this.Item(card1X, cardY, cardWidth, cardHeight,getZ('holeCards'))

            //Empty Seats
            var openSeatFill = '#000000'
            var openSeatMiddle = openSeatMiddle
            var openSeatBorder = '#FFFFFF'

self.images.drawSeat(this.seats[i].openSeat, openSeatBorder, openSeatFill, openSeatMiddle, {outerStrokeWidth: seatOuterStrokeWidth}) 

                this.seats[i].openSeat.addText('Open Seat', '15px ' + permanentPreferences.defaultFontType.value, "#FFFFFF",
                  {
html:true,
css:{
//,'text-align':'center'
}//css
,size:true
,position:true
                  }//options
                  )



setDisplayObjectPositionData(this.seats[i].openSeat.text, {x:seatTextX, y: seatTopTextY-1, width: seatTextWidth, height:seatTextHeight*2})
//this.seats[i].openSeat.text.lineHeight = seatTextHeight*2
//this.seats[i].openSeat.text.baseline = 'top'
//this.seats[i].openSeat.text.textAlign = 'center'
//this.seats[i].openSeat.text.maxWidth = this.seats[i].openSeat.size.x
//this.seats[i].openSeat.textColor = "#FFFFFF"       

            //disabled Seats
            var disabledBorder = "#544E4F"
            var disabledFill = 'black'
            var disabledMiddle = disabledFill
            self.images.drawSeat (this.seats[i].disabledSeat, disabledBorder, disabledFill, disabledMiddle, {outerStrokeWidth: seatOuterStrokeWidth})
   this.seats[i].disabledSeat.image.parentItem = this.seats[i].disabledSeat     

//openSeat onclick event

self.images.seats[i].disabledSeat.on('contextmenu', self.events.onDisabledOrNonUserSeatClick, {cursor:false})


/*
            this.seats[i].disabledSeat.image = new createjs.Shape()
this.seats[i].disabledSeat.image.snapToPixel = true
this.seats[i].disabledSeat.image.graphics.setStrokeStyle(1,'square').beginStroke("#544E4F").beginFill('black').drawRect(this.seats[i].disabledSeat.position.x, this.seats[i].disabledSeat.position.y, this.seats[i].disabledSeat.size.x, this.seats[i].disabledSeat.size.y)
         this.seats[i].disabledSeat.image.parentItem = this.seats[i].disabledSeat       
         */

//console.log(permanentPreferences.sourceObjects.value)
            //hole cards
            if(sessionPreferences.displaySize.value !== 'mobile'){
     //        this.itemAsBitmap(this.seats[i].hiddenCards[0],  permanentPreferences.sourceObjects.value.cardObjectParent.cardBack)
    //        this.itemAsBitmap(this.seats[i].hiddenCards[1], permanentPreferences.sourceObjects.value.cardObjectParent.cardBack)
}
else{
 //    this.itemAsBitmap(this.seats[i].hiddenCards[0],  permanentPreferences.sourceObjects.value.cardObjectParent.cardBack)
  //          this.itemAsBitmap(this.seats[i].hiddenCards[1], permanentPreferences.sourceObjects.value.cardObjectParent.cardBack)
}

this.cardAsBitmap(this.seats[i].hiddenCards[0],  null)
this.cardAsBitmap(this.seats[i].hiddenCards[1],  null)

         //   this.itemAsRectangle(this.seats[i].shownCards[0], "#00FFFF")
          //  this.itemAsRectangle(this.seats[i].shownCards[1], "#00FFFF")
            this.seats[i].shownCards[0].addText('','12px ' + permanentPreferences.defaultFontType.value,'#000000')
            this.seats[i].shownCards[1].addText('','12px ' + permanentPreferences.defaultFontType.value,'#000000')
            //player name
            this.seats[i].playerName.addText('','11px ' + permanentPreferences.defaultFontType.value,'#FFFFFF' , {html:true, class:self.css.noTranslate} )
            //action
            this.seats[i].action.addText('','11px ' + permanentPreferences.defaultFontType.value,'#FFFFFF')
            //countdown
           this.seats[i].countdown.addText('','11px ' + permanentPreferences.defaultFontType.value,'#FFFFFF')
            //winner
            this.seats[i].winner.addText('','11px ' + permanentPreferences.defaultFontType.value,'#FFFFFF')
        

                    //player's status
            this.seats[i].status.addText('','11px ' + permanentPreferences.defaultFontType.value,'#FFFFFF', {html:true})
            this.seats[i].stackSize.addNumberText('','11px ' + permanentPreferences.defaultFontType.value,'#FFFFFF', {html:true} )

 this.seats[i].gettingChips.addText ('Adding Chips','11px ' + permanentPreferences.defaultFontType.value,'#FFFFFF', {html:true} )
 this.seats[i].sittingOut.addText('Sitting Out','11px ' + permanentPreferences.defaultFontType.value,'#FFFFFF', {html:true} )


       //----------------------dealer button----Player's bets----------------------------------

var seatLocationMarginOfError = 1.1
    //check if seat is on top
    if(this.seats[i].seat.position.y < firstRowY + seatLocationMarginOfError && this.seats[i].seat.position.y > firstRowY - seatLocationMarginOfError){
        
        var dealerButtonX = this.seats[i].seat.position.x+topRowSeatDealerButtonX
        var dealerButtonY = this.seats[i].seat.position.y+topRowSeatDealerButtonY

        this.seats[i].dealerButton = new this.Item(dealerButtonX,dealerButtonY,dealerButtonWidth,dealerButtonHeight,getZ('dealerChip'))

        this.seats[i].firstChip = new this.Item(this.seats[i].seat.position.x+topChipOffsetX,this.seats[i].seat.position.y+topChipOffsetY,chipDiameter,chipDiameter,getZ('chips'))

         this.seats[i].secondColumnChip = new this.Item( this.seats[i].firstChip.position.x-chipDiameter-self.imageData.distanceBetweenChipColumns,this.seats[i].firstChip.position.y,chipDiameter,chipDiameter,getZ('chips'))

        
        //determine location of theoretical upper right most chip
        var distanceBetweenChipsY = this.pots[0].secondChip.position.y - this.pots[0].firstChip.position.y
        var upperRightChipX = this.seats[i].firstChip.position.x
        var upperRightChipY = this.seats[i].firstChip.position.y + distanceBetweenChipsY*(self.imageData.maxChipsPerColumn-1)

        var betX = upperRightChipX + chipDiameter + absoluteDistanceBetweenBetTextAndChipImages
        var betY = upperRightChipY
        //bet size
        this.seats[i].bet = new this.Item(betX, betY, betTextWidth, betTextHeight, getZ( 'chips'))
    }
    else if(this.seats[i].seat.position.x < firstColumnX + seatLocationMarginOfError && this.seats[i].seat.position.x > firstColumnX - seatLocationMarginOfError){
        
        var dealerButtonX = this.seats[i].seat.position.x+leftColumnSeatDealerButtonX
        var dealerButtonY = this.seats[i].seat.position.y+leftColumnSeatDealerButtonY

        this.seats[i].dealerButton = new this.Item(dealerButtonX,dealerButtonY,dealerButtonWidth,dealerButtonHeight,getZ('dealerChip'))

        this.seats[i].firstChip = new this.Item(this.seats[i].seat.position.x+leftChipOffsetX,this.seats[i].seat.position.y+leftChipOffsetY,chipDiameter,chipDiameter,getZ('chips'))
       this.seats[i].secondColumnChip = new this.Item( this.seats[i].firstChip.position.x+chipDiameter+self.imageData.distanceBetweenChipColumns,this.seats[i].firstChip.position.y,chipDiameter,chipDiameter,getZ('chips'))

        //determine location of upperleft
        var distanceBetweenChipsY = this.pots[0].secondChip.position.y - this.pots[0].firstChip.position.y
        var upperLeftChipX = this.seats[i].firstChip.position.x
        var upperLeftChipY = this.seats[i].firstChip.position.y - distanceBetweenChipsY*(self.imageData.maxChipsPerColumn-1)

        var betX = upperLeftChipX - betTextWidth - absoluteDistanceBetweenBetTextAndChipImages
        var betY = upperLeftChipY - betTextHeight - absoluteDistanceBetweenBetTextAndChipImages
        //bet size
        this.seats[i].bet = new this.Item(betX,betY,betTextWidth,betTextHeight,getZ('chips'))
    }

    else if(this.seats[i].seat.position.y < fourthRowY + seatLocationMarginOfError && this.seats[i].seat.position.y > fourthRowY - seatLocationMarginOfError){
       
        this.seats[i].firstChip = new this.Item(this.seats[i].seat.position.x+bottomChipOffsetX,this.seats[i].seat.position.y+bottomChipOffsetY,chipDiameter,chipDiameter,getZ('chips'))
        this.seats[i].secondColumnChip = new this.Item( this.seats[i].firstChip.position.x+chipDiameter+self.imageData.distanceBetweenChipColumns,this.seats[i].firstChip.position.y,chipDiameter,chipDiameter,getZ('chips'))

        
        //determine location of lower left most chip
        var bottomLeftChipX = this.seats[i].firstChip.position.x
        var bottomLeftChipY = this.seats[i].firstChip.position.y
        var betX = bottomLeftChipX - betTextWidth - absoluteDistanceBetweenBetTextAndChipImages
        var betY = bottomLeftChipY
          
          var dealerButtonX = this.seats[i].seat.position.x+bottomRowSeatDealerButtonX
       var dealerButtonY = this.seats[i].seat.position.y+bottomRowSeatDealerButtonY



        this.seats[i].dealerButton = new this.Item(dealerButtonX,dealerButtonY,dealerButtonWidth,dealerButtonHeight,getZ('dealerChip'))
 //bet size
        this.seats[i].bet = new this.Item(betX,betY,betTextWidth,betTextHeight,getZ('chips'))

   
    }
        else if(this.seats[i].seat.position.x < fifthColumnX + seatLocationMarginOfError && this.seats[i].seat.position.x > fifthColumnX - seatLocationMarginOfError){
        
        var dealerButtonX = this.seats[i].seat.position.x+rightColumnSeatDealerButtonX
        var dealerButtonY = this.seats[i].seat.position.y+rightColumnSeatDealerButtonY

        this.seats[i].dealerButton = new this.Item(dealerButtonX,dealerButtonY,dealerButtonWidth,dealerButtonHeight,getZ('dealerChip'))

        this.seats[i].firstChip = new this.Item(this.seats[i].seat.position.x+rightChipOffsetX,this.seats[i].seat.position.y+rightChipOffsetY,chipDiameter,chipDiameter,getZ('chips'))
        this.seats[i].secondColumnChip = new this.Item( this.seats[i].firstChip.position.x-chipDiameter-self.imageData.distanceBetweenChipColumns,this.seats[i].firstChip.position.y,chipDiameter,chipDiameter,getZ( 'chips'))
 
         
         //determine location bottom right most chip
        var bottomRightChipX = this.seats[i].firstChip.position.x
        var bottomRightChipY = this.seats[i].firstChip.position.y
        var betX = bottomRightChipX - betTextWidth
        var betY = bottomRightChipY  + chipDiameter + absoluteDistanceBetweenBetTextAndChipImages 
        //bet size
        this.seats[i].bet = new this.Item(betX,betY,betTextWidth,betTextHeight,getZ( 'chips'))
    }

    //add second chip (same for all seats relative to first chip)
    var distanceBetweenChipsY = this.pots[0].secondChip.position.y-this.pots[0].firstChip.position.y
    this.seats[i].secondChip = new this.Item(this.seats[i].firstChip.position.x, this.seats[i].firstChip.position.y+distanceBetweenChipsY,chipDiameter,chipDiameter,getZ('chips'))
    
    // bet size text
     this.seats[i].bet.addNumberText('', "12px " + permanentPreferences.defaultFontType.value, "#FFFFFF", {textAlign:'left'})
     this.seats[i].bet.text.maxWidth = null
   
    if(this.seats[i].dealerButton instanceof this.Item){
this.seats[i].dealerButton.addBitmap( permanentPreferences.sourceObjects.value.dealerButton)
     }
     else{console.log(i+' is not a seat')}
      }  

             // -----------------player's chat -----------------

             _.each(_.range(this.seats.length), function(i) {
var playerSeatObject = self.images.seats[i]

        var chatX =  playerSeatObject.seat.position.x + playerSeatObject.seat.size.x/2 - chatBoxWidth/2  
        var chatY = playerSeatObject.seat.position.y - absoluteChatDistanceFromSeatY
   playerSeatObject.chat = new self.images.Item(chatX, chatY, chatBoxWidth, initialChatBoxHeight, getZ('bubbleChat'))
   
   playerSeatObject.chat.image = new createjs.Shape()

   //----------function to redraw chat box anytime with a new width
playerSeatObject.chat.image.drawChat = function(width, numLines){

    //make sure width is <= maxWidth
    if(width == undefined){var width = playerSeatObject.chat.size.x}
   else if(width > playerSeatObject.chat.size.x){width = playerSeatObject.chat.size.x}
   //clear previous graphicss
   playerSeatObject.chat.image.graphics.clear()
   //define parent
playerSeatObject.chat.image.parentItem = playerSeatObject.chat

//get new relative X coordinates of chat box
var x =   (playerSeatObject.chat.size.x - width)/2
var y = 0
   playerSeatObject.chat.image.snapToPixel = true
playerSeatObject.chat.image.graphics.setStrokeStyle(1,'round').beginStroke(chatBoxBorderColor).beginFill('#000000')
.drawRoundRect(x, y - (numLines-1)*(chatBoxFontSize+1), width, playerSeatObject.chat.size.y+(numLines-1)*(chatBoxFontSize+1),  playerSeatObject.chat.size.y*.02)

self.images.seats[i].chat.image.alpha = self.imageData.chatBoxAlpha

//position image
 self.positionItemImage(playerSeatObject.chat, {update:false})

}//end drawchat function

//player chat text
 playerSeatObject.chat.text = new createjs.Text('', chatBoxFontSize+ 'px ' + permanentPreferences.defaultFontType.value, permanentPreferences.chatTextColor.value)
playerSeatObject.chat.text.x = playerSeatObject.chat.position.x +  playerSeatObject.chat.size.x/2 
playerSeatObject.chat.text.y = playerSeatObject.chat.position.y
playerSeatObject.chat.text.baseline = 'top'
playerSeatObject.chat.text.textAlign = 'center'
playerSeatObject.chat.text.lineWidth =   playerSeatObject.chat.size.x*.85

 // self.images.seats[i].chat.text.lineHeight = chatBoxFontSize+1
 // self.images.seats[i].chat.text.maxWidth = self.images.seats[i].chat.size.x*.85


//creating bubble chat popover divs
if(!_.isArray(playerSeatObject.bubbleChats)) {playerSeatObject.bubbleChats = []}

var bubbleChatDivWidth = playerSeatObject.chat.size.x*1.1
var bubbleChatDivX = chatX + playerSeatObject.chat.size.x/2 - bubbleChatDivWidth/2
var bubbleChatDivHeight = 55
var bubbleChatDivY = playerSeatObject.chat.position.y + playerSeatObject.chat.size.y - bubbleChatDivHeight


//we are going to create a div on top of each player's seat
if(playerSeatObject.bubbleChats[0] instanceof self.images.Item !== true){
playerSeatObject.bubbleChats[0] = new self.images.Item(bubbleChatDivX, bubbleChatDivY, bubbleChatDivWidth , bubbleChatDivHeight, playerSeatObject.chat.position.z)

var divID = 'originalSeat'+ i + 'BubbleChat0'
//remove previous versions
$('#'+divID).remove()
//get canvas div
var seatDiv = self.arrayOfParentsOfStageAndOfContainerArray[playerSeatObject.seat.position.z.stage].div
//append new item to div
$(seatDiv).append('<div id = \"' + divID + '\"></div>')

playerSeatObject.bubbleChats[0].image = $('#'+divID)[0]
$(playerSeatObject.bubbleChats[0].image).addClass(self.css.noFat + ' ' + self.css.unselectable)

self.positionItemImage(playerSeatObject.bubbleChats[0])

$(playerSeatObject.bubbleChats[0].image).css({
'z-index': 9999
//,'display':'none'
,'pointer-events':'none'
//,'overflow':'hidden'
//,'width': playerSeatObject.chat.size.x
//,'height':playerSeatObject.chat.size.y
  // ,'pointer-events': 'none'
 // ,'background':'#FFFFFF'
})

}//if we want to create images.Item

/*
console.log('player '+ i+' bubble chat, then chat items')
console.log(playerSeatObject.bubbleChats[0])
console.log(playerSeatObject.chat)
*/

 })

//assign seatObjectAncestor to all Items in self.images.seats
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


var maxActionButtonOffsetBottom = 6 
//we are going to position action button between bottom seat and bottom of canvas
var distanceFromBottomOfSeat0ToBottomOfCanvas = viewedCanvasHeight - self.images.seats[0].seat.position.y - self.images.seats[0].seat.size.y
console.log('distance fromseat to bottom = '+distanceFromBottomOfSeat0ToBottomOfCanvas)
var freeSpace = distanceFromBottomOfSeat0ToBottomOfCanvas - actionButtonHeight
console.log(freeSpace)
if(freeSpace < 0){var actionButtonY = viewedCanvasHeight - actionButtonHeight}
else{var actionButtonY = viewedCanvasHeight - distanceFromBottomOfSeat0ToBottomOfCanvas + freeSpace/2}


   this.fold = new this.Item(actionButtonLeftX,actionButtonY,actionButtonWidth,actionButtonHeight,getZ('buttons','staticItems'), {messages:['act','fold']})
      this.call = new this.Item(actionButtonLeftX+actionButtonWidth+distanceBetweenActionButtons,actionButtonY,actionButtonWidth,actionButtonHeight,getZ('buttons','staticItems'), {messages:['act','call']})
      this.check = new this.Item(actionButtonLeftX+actionButtonWidth+distanceBetweenActionButtons,actionButtonY,actionButtonWidth,actionButtonHeight,getZ('buttons','staticItems'), {messages:['act','check']})
      this.raise = new this.Item(this.check.position.x +actionButtonWidth+distanceBetweenActionButtons,actionButtonY,actionButtonWidth,actionButtonHeight,getZ('buttons','staticItems'),{messages:['act','raise']})
      this.bet = new this.Item(this.check.position.x +actionButtonWidth+distanceBetweenActionButtons,actionButtonY,actionButtonWidth,actionButtonHeight,getZ('buttons','staticItems'),{messages: ['act','bet']})

//----------------not in hand action buttons------------------
        this.sitIn = new this.Item(actionButtonLeftX,actionButtonY,actionButtonWidth,actionButtonHeight,getZ('buttons','staticItems'), {messages:['sit_in']})
        this.rebuy = new this.Item(actionButtonLeftX,actionButtonY,actionButtonWidth,actionButtonHeight,getZ('buttons','staticItems'), {messages:['get_add_chips_info']})



//BOOTSTRAP HTML ACT BUTTON IMAGES

//get canvas of stage for action buttons
var actionButtonStageNumber = getZ('buttons','staticItems').stage
var actionButtonDiv = self.arrayOfParentsOfStageAndOfContainerArray[actionButtonStageNumber].div
var actionButtonCanvasElement = self.arrayOfParentsOfStageAndOfContainerArray[actionButtonStageNumber].stage.canvas

//$(actionButtonCanvasElement).append('<button id="fold"  class = "btn actionButton">Fold</button>')
var actionButtonClass = 'actionButton'
var actionButtonCSS = {
      'font-size': '11px ' 
      ,'font': permanentPreferences.defaultFontType.value
      ,'position':'absolute'
      ,'padding-top':'1px'
      ,'padding-bottom': '1px'
      ,'padding-left': '2px'
      ,'padding-right':'2px'
      ,'font-weight':500
}
var actionButtonOptions = {class:actionButtonClass, css:actionButtonCSS, attr:{}}

actionButtonOptions.attr.id = 'sitIn'
this.sitIn.addBootstrapButton('Sit In', actionButtonOptions)

actionButtonOptions.attr.id ='rebuy'
this.rebuy.addBootstrapButton ('Get Chips', actionButtonOptions)

actionButtonOptions.attr.id = 'fold'
          this.fold.addBootstrapButton ('Fold', actionButtonOptions)


          actionButtonOptions.attr.id = 'check'
          this.check.addBootstrapButton ('Check', actionButtonOptions)

actionButtonOptions.css['font-size'] = '11px'

          actionButtonOptions.attr.id = 'call'
          this.call.addBootstrapButton ('Call', actionButtonOptions)

          actionButtonOptions.attr.id = 'raise' 
          this.raise.addBootstrapButton ('Raise', actionButtonOptions)

          actionButtonOptions.attr.id = 'bet'
          this.bet.addBootstrapButton ('Bet', actionButtonOptions)

var actionButtonInnerHeight = this.call.getChildPositionAndSizeData('image', {position:false, maxSize:false, size:true}).contentHeight
$(this.call.image).add(this.raise.image).add(this.bet.image).css('line-height', actionButtonInnerHeight/2 + 'px')

        //-----------------bet slider-----------------------------
        /*
              this.betSlider.horizontal = new this.Item (this.fold.position.x,viewedCanvasHeight-horizontalBetSliderOffsetBottom-horizontalBetSliderHeight,horizontalBetSliderWidth,horizontalBetSliderHeight,getZ('staticItems','buttons'))
              var verticalY = this.betSlider.horizontal.position.y+this.betSlider.horizontal.size.y/2-verticalBetSliderHeight/2
      this.betSlider.vertical = new this.Item(this.betSlider.horizontal.position.x,verticalY,verticalBetSliderWidth,verticalBetSliderHeight,getZ('staticItems','buttons'))
var betSizeX = this.betSlider.horizontal.position.x+this.betSlider.horizontal.size.x + distanceBetweenBetSizeAndHorizontalSlider
var betSizeY = this.betSlider.horizontal.position.y+this.betSlider.horizontal.size.y/2-betSizeHeight/2
      this.betSlider.betSize = new this.Item(betSizeX,betSizeY,betSizeWidth,betSizeHeight,getZ('staticItems','buttons'))
*/


var betSizeX = viewedCanvasWidth - betSizeWidth - distanceBetweenBetSizeAndCanvasX
var betSizeY = self.images.raise.position.y + self.images.raise.size.y/2 - betSizeHeight/2 

//betSIZE
      this.betSlider.betSize = new this.Item(betSizeX, betSizeY, betSizeWidth, betSizeHeight, getZ('betSlider'))
this.betSlider.betSize.addElement(document.getElementById('betSize'), 'image' , {css:{

 'position' :  'absolute'
// 'left'  : this.betSlider.betSize.position.x + 'px',
//'top'  : this.betSlider.betSize.position.y + 'px',
//'width' : this.betSlider.betSize.size.x + 'px',
//'height' : this.betSlider.betSize.size.y +'px',
,'padding': '0px'
,'margin':'0px'
}//options.css


})

//events

self.updateBetSize('')

//set z-index of betsizediv

$("#betSize").numeric({ negative: false }, function() {this.value = ""; /*this.focus();*/ });
//round betSize down when unfocused


//trigger checks for change in betsize values
$('#betSize').on('change input paste focus', function(e){self.events.betSizeChanged()})
$('#betSize').on('contextmenu', function(e){e.preventDefault()})//disable right click
//highlight when clicked
$('#betSize').focus(function(){
               $("#betSize").one('mouseup', function(event){
        event.preventDefault();
       }).select()
})




//JQUERY UI BETSLIDER

var betSliderX = this.bet.position.x + this.bet.size.x + distanceBetweenActionButtons*0.9
var betSliderMiddleY = actionButtonY + actionButtonHeight/2
var betSliderWidth = betSizeX - distanceBetweenActionButtons - betSliderX
var betSliderY = betSliderMiddleY - verticalBetSliderHeight/2

var sliderOptions = {
  /*
change:function(e, ui){

self.events.betSliderChanged(e, ui)

}//when the slider changes
,*/
slide: function(e, ui) {
  self.events.betSliderChanged(e, ui)
    var betSliderHandle =  $('.ui-slider-handle', self.images.betSlider.slider.image)
        betSliderHandle.qtip('option', 'content.text', '' + ui.value)
    }//when user uses mouse to slide the slider

}
var jquerySlider = $('<div>').addClass(self.css.unselectable).css({
 // 'overflow':'visible'
 // ,'margin':'0px'
})
//.slider(sliderOptions)



this.betSlider.slider = new this.Item(betSliderX, betSliderY, betSliderWidth, horizontalBetSliderHeight, getZ('betSlider'))
this.betSlider.slider.addElement(jquerySlider[0], 'image')
//console.log('jquery slider added')
//console.log(this.betSlider.slider)
//console.log($(this.betSlider.slider.image) )

//JQUERY UI BETSLIDER

$(this.betSlider.slider.image).slider(sliderOptions)

//betsliderevents

   var betSliderHandle = $('.ui-slider-handle', jquerySlider)

   //initialize qtip on the handle
betSliderHandle.qtip({
    id: 'betSlider'
    ,content: '' + $(this.betSlider.slider.image).slider('option', 'value')
    ,position: {
        my: 'bottom center',
        at: 'top center',
        container: betSliderHandle 
    }
    ,show:{
      event:'mousedown'
      ,delay:0
    }
    ,hide: {
         event:'mouseup unfocus'
        ,delay: 220
    }
    ,events:{
      //function that updates the content when the qtip is shown
show:function(e, api){
api.set('content.text', '' + $(self.images.betSlider.slider.image).slider('option', 'value'))
}//show event

    }//events
    ,style: {
        widget: true//this applies the themeroller to this qtip
    }
})





  //--------------upper right side button---------------------

var upperButtonTextCSS = {
'font-size':'13px'
,'text-shadow': '0px 2px 1px rgba(0, 0, 0, 1), 0px -2px 1px rgba(0, 0, 0, 1), 2px 0px 1px rgba(0, 0, 0, 1), -2px 0px 1px rgba(0, 0, 0, 1)' //black outline
+', 5px 8px 10px rgba(0, 0, 0, 0.7), 3.5px 5.5px 6px rgba(0, 0, 0, 0.7)'// ', 1px 7px 4px rgba(0, 0, 0, 0.8), 5px 2px 3px rgba(0, 0, 0, 0.7), 4.5px 4.5px 3px rgba(0, 0, 0, 0.7)' //drop shadow
+', 5px 8px 10px rgba(0, 0, 0, 0.7), 3.5px 5.5px 6px rgba(0, 0, 0, 0.7)'

//'3px 4px 2px rgba(50, 50, 50, 0.5), 0 0 0.2px #87F,        0 0 1px #87F, 2px 0 0 #000, 0 2px 0 #000, 0 2px 0 #000, 2px 0 0 #000'
,'text-align':'left'
,'font-weight':700
//,'overflow-y':'auto'
,'pointer-events':'none'
}

var upperButtonFontType = 'Myriad Pro'


        this.standUp = new this.Item(viewedCanvasWidth - standUpWidth,0, standUpWidth, standUpHeight, getZ('buttons','staticItems'))
this.standUp.addBitmap(permanentPreferences.sourceObjects.value.standUp)
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

 var standUpTextLeftOffset = 73; var standUpTextTopOffset = 6; var standUpTextRightOffset = 21; var standUpTextBottomOffset = 9
var standUpTextWidth = standUpWidth - standUpTextLeftOffset - standUpTextRightOffset
var standUpTextHeight = standUpHeight - standUpTextTopOffset - standUpTextBottomOffset

this.standUp.addText('STAND UP', upperButtonFontType, 'white', {html:true, css:upperButtonTextCSS, textAlign:'left'})
setDisplayObjectPositionData(this.standUp.text, {x:standUpTextLeftOffset + this.standUp.position.x
  ,  y: this.standUp.position.y + standUpTextTopOffset
 // ,width:getChipsTextWidth
  , height:standUpTextHeight
}, {update:false})


//disable overlay
   this.standUpDisabledShape = new this.Item(this.standUp.position.x + standUpHitAreaUpperLeftOffsetX,this.standUp.position.y+topY,this.standUp.size.x - standUpHitAreaUpperLeftOffsetX - standUpHitAreaRightOffset,this.standUp.size.y - topY - bottomY,{container:getZ('buttons','staticItems').container+2, stage:getZ('buttons','staticItems').stage}) 
   this.standUpDisabledShape.image = standUpHit.clone(true)
   this.standUpDisabledShape.image.x =  this.standUp.position.x 
   this.standUpDisabledShape.image.y = this.standUp.position.y
this.standUpDisabledShape.image.alpha = disabledButtonOverlayAlpha

//-------------------------upper left Get Chips-------
 this.getChips = new this.Item(0, 0, getChipsWidth, getChipsHeight, getZ('buttons','staticItems'), {messages:['get_add_chips_info']})
this.getChips.addBitmap(getChipsSource)
 var getChipsTextLeftOffset = 37; var getChipsTextTopOffset = 9; var getChipsTextRightOffset = 46; var getChipsTextBottomOffset = 21
var getChipsTextWidth = getChipsWidth - getChipsTextLeftOffset - getChipsTextRightOffset
var getChipsTextHeight = getChipsHeight - getChipsTextTopOffset - getChipsTextBottomOffset


this.getChips.addText('GET CHIPS', upperButtonFontType, 'white', {html:true, css:upperButtonTextCSS, textAlign:'left'})
setDisplayObjectPositionData(this.getChips.text, {x:getChipsTextLeftOffset + this.getChips.position.x - 1
  ,  y: this.getChips.position.y + getChipsTextTopOffset
 // ,width:getChipsTextWidth
  , height:getChipsTextHeight
}, {update:false})


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


   this.getChipsDisabledShape = new this.Item(getChipsHitTopLeft.x,getChipsHitTopLeft.y,getChipsHitTopRight.x-getChipsHitTopLeft.x,getChipsHitBottomRight.y-getChipsHitTopLeft.y,{container:getZ('buttons','staticItems').container+2, stage:getZ('buttons','staticItems').stage}) 
   this.getChipsDisabledShape.image = getChipsHit
this.getChipsDisabledShape.image.alpha = disabledButtonOverlayAlpha
   //--------------upper right exit Table--------------
var exitTableOffsetY = distanceBetweenUpperButtonHitAreasY - exitTableHitAreaTopOffset - standUpHitAreaBottomOffset

 this.exitTable = new this.Item(viewedCanvasWidth - exitTableWidth, standUpHeight, exitTableWidth, exitTableHeight, getZ('buttons','staticItems'))
this.exitTable.addBitmap( permanentPreferences.sourceObjects.value.exitTable)
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
this.exitTable.on('click', self.events.exitTableClick)

        

//-------------------------currency display--------------------------
var currencyDisplayX = viewedCanvasWidth/2 - currencyDisplayWidth/2

this.currencyDisplay = new this.Item(currencyDisplayX, currencyDisplayTopOffset, currencyDisplayWidth, currencyDisplayHeight, getZ('buttons','staticItems'))
this.currencyDisplay.addText('', currencyDisplaySizeAndFont, currencyDisplayColor, {html:true})
this.currencyDisplay.disableMouseEvents({text:true})
//========================4 color deck sprite sheet=============================

var fourColorDeckData = {

     images: [permanentPreferences.sourceObjects.value.fourColorDeck],
     frames: {width:37, height:45}

}

this.currencyDisplay.disableMouseEvents()

/*
this.fourColorSprite = new createjs.SpriteSheet(fourColorDeckData)

*/

//=====================MESSAGE BOX=======MESSAGEBOX================================

self.images.messageBox = []

//setOrGetDisplayStatusOfCanvasDivByStageNumberOrItemTrueDisplaysFalseHidesOtherGets(this.messageBox[0].window.position.z.stage, false)


//table image
this.table = new this.Item(0,tableY, 0,0, getZ('table','staticItems'))
this.table.addBitmap( permanentPreferences.sourceObjects.value.table)
//console.log('table item');console.log(this.table)
var tableX = viewedCanvasWidth/2 - this.table.size.x/2
self.setImageItemPositionAndTextBasedOnImageChange(this.table, tableX, null, {update:false})


//======================CASHIER=======================================
self.images.createCashier = function(){
 var cashierImageContainerIndex = getZ('background','cashier').container
var cashierStageNumber = getZ('background','cashier').stage
var cashierWindowContainer = 0
 //declare size variables

    var cashierWindowSource = permanentPreferences.sourceObjects.value.cashierBackground
            var cashierWindowWidth =  298
             var cashierWindowHeight =  360
    
  
        
        var textLeftOffset = 13  //distance from left of first column of text of gray cashier area
        var textTopOffset = 4   // distance from top of gray area to first row of text
        var textRightOffset = 136 //distance from left side of second column to right side of gray cashier area

        var textHeight = 13
        var distanceBetweenTextY = 5
        var sizeAndFont = '12px ' + permanentPreferences.defaultFontType.value
        var textColor = '#000000'

         var outerTopHeight = 31
        var outerBottomHeight = 8
        var outerSideWidth = 8

        var columns = 2
        var rows = 10

        var cashierWindowX = viewedCanvasWidth/2 - cashierWindowWidth/2
        var cashierWindowY = viewedCanvasHeight/2 - cashierWindowHeight/2
        
   var closeWindowSource = permanentPreferences.sourceObjects.value.cashierCloseX
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
        var htmlTextWidth = textBoxOffsetLeft - radioWidth - distanceFromRadioToText - radioOffsetLeft


        var grayBoxOffsetSide = 11 //distance from gray box to end of gray background
        var grayBoxOffsetTop = 150 //from inner cashier
        var grayBoxOffsetBottom = 49 //from inner cashier

    this.cashier.closeWindow =  new this.Item (closeWindowX, closeWindowY, closeWindowWidth,closeWindowHeight,{stage:cashierStageNumber, container:cashierImageContainerIndex}) 
this.cashier.closeWindow.addBitmap( permanentPreferences.sourceObjects.value.cashierCloseX)
       this.cashier.closeWindow.on('click', self.hideCashier)

        this.cashier.window = new this.Item(cashierWindowX,cashierWindowY,cashierWindowWidth,cashierWindowHeight,{stage:cashierStageNumber,container:cashierWindowContainer})
this.cashier.window.addBitmap( permanentPreferences.sourceObjects.value.cashierBackground)
        var clickAndDragHitArea = new createjs.Rectangle(this.cashier.window.position.x, this.cashier.window.y, cashierWindowWidth, outerTopHeight)
     //   this.cashier.window.hitArea = clickAndDragHitArea
      this.cashier.window.image.removeAllEventListeners()
     /*    this.cashier.window.image.onMouseDown = function(e){
          var options = {animationTarget:self.images.cashier}
                  self.event.mouseDownClickAndDrag(e,options)
                }
                */

          this.cashier.window.on('mousedown',function(e){
                  self.events.mouseDownClickAndDrag(e, {animationTarget:self.images.cashier})
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
//$(self.arrayOfParentsOfStageAndOfContainerArray[ self.images.cashier.window.position.z.stage].stage.canvas).css('display','none')
setOrGetDisplayStatusOfCanvasDivByStageNumberOrItemTrueDisplaysFalseHidesOtherGets(self.images.cashier.window, false)


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


//move cashierdiv to appropriate canvasdiv
$(cashierParentOfStage.div).append($('#cashierDiv')) //
 var stuffToAppend = $('#cashierDiv').find('*').addBack('#cashierDiv')//
//$(cashierParentOfStage.div).append($(cashierParentOfStage.div)) 
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
       $("#cashier input[type='text']").css(        {
        'width': textBoxWidth+'px'
, 'height': textBoxHeight+'px'
      })

       $("#cashier input[type='text']").numeric({ negative: false }, function() {this.value = ""; /*this.focus();*/ });
       $("#cashier input[type='text']").attr(  'autocomplete','off')//disable autocompletion

$("#cashier input[type ='radio']").addClass(self.css.unselectable)//disable autocompletion
$("#cashier p").addClass(self.css.unselectable)//disable autocompletion

      //set text size and font
        $("#cashier").children().children().css({
            'font':sizeAndFont
            ,'margin':0
            ,'padding':0
            ,'display':'none'
           })


           //set width of text
 $("#cashier p").css({
     'max-width': htmlTextWidth+'px',
     'width':htmlTextWidth+'px',
     'height': textBoxHeight+'px',
     'white-space': 'nowrap'
     })


//--------------------------click events--------------------------

//unbind all events
    $("#otherAmountDiv").children().off()
$("#autoRebuyDiv").children().off()
            $("#maxDiv").children().off()
          $('#cashierDiv').find("input[type = 'text']").off()

$('#cashierDiv').on('mousedown keydown keyup', self.events.cashier)
$('#cashierDiv').find("input[type = 'text']").on('focus focusout input paste', self.events.cashier)

var cashierTextBoxNumericOptions = {negative:false}

/*

WAS GOING TO ASSIGN FULL DIVS FOR EVENTS HERE, BUT W/E


var cashierDiv

    $("#otherAmountDiv").css({
'left':radioX
,'top':maxRadioY
,'width':radioWidth + 

    })



$("#autoRebuyDiv").children().css()
            $("#maxDiv").children().css()
*/


//assign item
this.cashier.maxRadio = new this.Item(radioX, maxRadioY, radioWidth, radioHeight, {stage:cashierStageNumber,container:  cashierImageContainerIndex})
this.cashier.maxRadio.addElement($('#maxRadio')[0] , 'image', {position:true})
/*
this.cashier.maxRadio.image = $('#maxRadio')[0]
//position max radio
     $('#maxRadio').css('left', radioX+'px')
       $('#maxRadio').css('top', maxRadioY+'px')
      */

      //assign item
this.cashier.maxText = new this.Item(textX, maxRadioY, htmlTextWidth, textBoxHeight, {stage:cashierStageNumber,container:  cashierImageContainerIndex})
this.cashier.maxText.addElement($('#maxText')[0] , 'text', {position:true})
/*
this.cashier.maxText.image = $('#maxText')[0] 
       //position max text 
         $('#maxText').css('left', textX+'px')
       $('#maxText').css('top', maxRadioY+'px')
*/

      //assign item
this.cashier.maxAmount = new this.Item(textBoxX, maxTextBoxY, textBoxWidth, textBoxHeight, {stage:cashierStageNumber,container:  cashierImageContainerIndex})
this.cashier.maxAmount.addElement($('#maxAmount')[0], 'image', {position:true})
/*this.cashier.maxAmount.image = $('#maxAmount')[0] 
        //position max textbox
                $('#maxAmount').css('left', textBoxX+'px')
        $('#maxAmount').css('top', maxTextBoxY+'px')

*/

        var otherTextBoxY = maxTextBoxY + textBoxHeight + distanceBetweenTextBoxY
        var otherRadioY = otherTextBoxY + textBoxHeight/2 - radioHeight/2



//assign item
this.cashier.otherAmountRadio = new this.Item(radioX, otherRadioY, radioWidth, radioHeight, {stage:cashierStageNumber,container:  cashierImageContainerIndex})
this.cashier.otherAmountRadio.addElement($('#otherAmountRadio')[0] , 'image', {position:true})
/*this.cashier.otherAmountRadio.image = $('#otherAmountRadio')[0]
        //position other amount radio
         $('#otherAmountRadio').css('left', radioX+'px')
        $('#otherAmountRadio').css('top', otherRadioY+'px')
        */

            //assign item
this.cashier.otherAmountText = new this.Item(textX, otherRadioY, htmlTextWidth, textBoxHeight, {stage:cashierStageNumber,container:  cashierImageContainerIndex})
this.cashier.otherAmountText.addElement($('#otherAmountText')[0] , 'text', {position:true})

/*this.cashier.otherAmountText.image = $('#otherAmountText')[0] 
         //position other amount text
         $('#otherAmountText').css('left', textX+'px')
       $('#otherAmountText').css('top', otherRadioY+'px')
     */

       //assign item
this.cashier.otherAmount = new this.Item(textBoxX, otherTextBoxY, textBoxWidth, textBoxHeight, {stage:cashierStageNumber,container:  cashierImageContainerIndex})
this.cashier.otherAmount.addElement($('#otherAmount')[0] , 'image')
/*this.cashier.otherAmount.image = $('#otherAmount')[0] 
        //position other amount textbox
                $(this.cashier.otherAmount.image).css('left', textBoxX+'px')
        $(this.cashier.otherAmount.image).css('top', otherTextBoxY+'px')
*/
         var autoRebuyTextBoxY = otherTextBoxY + textBoxHeight + distanceBetweenTextBoxY
        var autoRebuyRadioY = autoRebuyTextBoxY + textBoxHeight/2 - radioHeight/2


/*

//assign item
this.cashier.autoRebuyRadio = new this.Item(radioX, autoRebuyRadioY, radioWidth, radioHeight, {stage:cashierStageNumber,container:  cashierImageContainerIndex})
this.cashier.autoRebuyRadio.image = $('#autoRebuyRadio')[0]
        //position autorebuy radio
         $(this.cashier.autoRebuyRadio.image).css('left', radioX+'px')
        $(this.cashier.autoRebuyRadio.image).css('top', autoRebuyRadioY+'px')

            //assign item
this.cashier.autoRebuyText = new this.Item(textX, autoRebuyRadioY, htmlTextWidth, textBoxHeight, {stage:cashierStageNumber,container:  cashierImageContainerIndex})
this.cashier.autoRebuyText.image = $('#autoRebuyText')[0] 
         //position autorebuyText
         $('#autoRebuyText').css('left', textX+'px')
       $('#autoRebuyText').css('top', autoRebuyRadioY+'px')


       */
        
               //assign item
this.cashier.autoRebuyAmount = new this.Item(textBoxX, autoRebuyTextBoxY, textBoxWidth, textBoxHeight, {stage:cashierStageNumber,container:  cashierImageContainerIndex})
//this.cashier.autoRebuyAmount.image = $('#autoRebuyAmount')[0] 
this.cashier.autoRebuyAmount.addElement($('#autoRebuyAmount')[0], 'image')
        //postion autorebuy textbox
       //         $('#autoRebuyAmount').css('left', textBoxX+'px')
      //  $('#autoRebuyAmount').css('top', autoRebuyTextBoxY+'px')






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

  this.cashier.addChipsTextBox = new this.Item (textX,this.cashier.accountBalance.position.y +25, innerCashierWidth,25,{stage:cashierStageNumber, container:cashierImageContainerIndex})

// location of html textboxes for adding chips
var addChipsText = 'Add Chips'
var cancelText = 'Cancel'
var enableAutoRebuyText = 'Auto-Rebuy to:'
var disableAutoRebuyText = 'Disable<br>Auto-Rebuy'
var disableAutoRebuyFontSize = 9
var disableAutoRebuyTextSizeAndFont = disableAutoRebuyFontSize + 'px '+ permanentPreferences.defaultFontType.value
var cashierButtonFontSize = 11
var cashierButtonTextSizeAndFont = cashierButtonFontSize +'px ' + permanentPreferences.defaultFontType.value
var cashierButtonHeight = 28
var cashierButtonTextColor = 'white'
var cashierButtonColor = 'blue'
var cashierRatioOfTextWidthToButtonWidth = 0.88
//var cashierWindowYOffsetFromInnerCashier = 15 //calculated using middle of bottom of grayox and bottom of innercahiser
//var distanceBetweenCashierButtons = innerCashierWidth / 9

//options for creating bootstrap buttons
var cashierButtonOptions = {
  class:'cashierButton'
  ,css:{
  'font': cashierButtonTextSizeAndFont
//      , 'color' : cashierButtonTextColor
  }//css
  ,attr:{
  //  'class':self.css.bootstrapButton
  }
  ,onClick :function(e){
  console.log(e)
  }//onClick function
}//end options for creating bootstrap buttons



//enableAutoRebuyTextWidth
/*
//var enableAutoRebuyTextWidth = self.getStringWidth(enableAutoRebuyText, cashierButtonTextSizeAndFont)/cashierRatioOfTextWidthToButtonWidth
if(enableAutoRebuyTextWidth > htmlTextWidth){var enableAutoRebuyWidth = enableAutoRebuyTextWidth}
  else{var enableAutoRebuyWidth = htmlTextWidth }
*/
//set autorebuy equal to the textwidth
    var enableAutoRebuyWidth = htmlTextWidth + radioWidth

this.cashier.enableAutoRebuy = new this.Item (radioX, autoRebuyRadioY + radioHeight/2 - cashierButtonHeight/2, enableAutoRebuyWidth, textBoxHeight, getZ('buttons','cashier')) 
 this.cashier.enableAutoRebuy.addBootstrapButton(enableAutoRebuyText, cashierButtonOptions)

 var cashierButtonSizeData = getDisplayObjectPositionAndSizeData(this.cashier.enableAutoRebuy.image, {position:false})
var cashierButtonExtraWidth = cashierButtonSizeData.extraWidth
var cashierButtonExtraHeight = cashierButtonSizeData.extraHeight
//this.cashier.enableAutoRebuy.size.x = this.cashier.enableAutoRebuy.size.x + cashierButtonExtraWidth
//this.cashier.enableAutoRebuy.size.y = this.cashier.enableAutoRebuy.size.y + cashierButtonExtraHeight
//this.cashier.enableAutoRebuy.positionChild('image',{position:true, size:true})

$(this.cashier.enableAutoRebuy.image).button()

var disableAutoRebuyOptions = {
  class: cashierButtonOptions.class
  ,css:{
  'font': disableAutoRebuyTextSizeAndFont
  ,'line-height': (cashierButtonHeight - cashierButtonExtraHeight)/2 +'px'
 // ,'line-height': '50%'
    //  , 'color' : cashierButtonTextColor

  }//css
  ,attr:{id:'disableAutoRebuy'}
}



//click events
$(this.cashier.enableAutoRebuy.image).off('click')
$(this.cashier.enableAutoRebuy.image).on('click', function(e){
socket.emit('set_flag','autorebuy', parseInt($(self.images.cashier.autoRebuyAmount.image).val() ) )
e.stopPropagation() //stop propagation and other bullshit
})//autorebuy button onclick event

//calculate button width
var addChipsTextWidth = self.getStringWidth(addChipsText, cashierButtonTextSizeAndFont)/cashierRatioOfTextWidthToButtonWidth
var cancelTextWidth = self.getStringWidth(cancelText, cashierButtonTextSizeAndFont)/cashierRatioOfTextWidthToButtonWidth
var disableAutoRebuyTextWidth = self.getStringWidth('Auto-Rebuy', disableAutoRebuyTextSizeAndFont)/cashierRatioOfTextWidthToButtonWidth

if (addChipsTextWidth >= cancelTextWidth){var minCashierButtonTextWidth = addChipsTextWidth}
else{var minCashierButtonTextWidth = cancelTextWidth} 

//get cashierButtonX and Y
var innerCashierBottomY = innerCashierY + innerCashierHeight
var cashierButtonY = innerCashierBottomY - grayBoxOffsetBottom + (grayBoxOffsetBottom - cashierButtonHeight)/2

//create items, and we will change the X and width values later

  this.cashier.disableAutoRebuy =  new this.Item (0, cashierButtonY, disableAutoRebuyTextWidth, cashierButtonHeight, getZ('buttons','cashier') , {messages:['set_flag','autorebuy',false]}) 
 this.cashier.disableAutoRebuy.addBootstrapButton(disableAutoRebuyText, disableAutoRebuyOptions)



      this.cashier.addChips =  new this.Item (0, cashierButtonY, addChipsTextWidth, cashierButtonHeight, getZ('buttons','cashier')) 
 this.cashier.addChips.addBootstrapButton(addChipsText, cashierButtonOptions)
  $(this.cashier.addChips.image).button()
         $(this.cashier.addChips.image).off('click')
        $(this.cashier.addChips.image).on('click', function(e) {self.events.onAddChipsClick(e)})
      
        this.cashier.cancel =  new this.Item (0, cashierButtonY, cancelTextWidth  ,cashierButtonHeight, getZ('buttons','cashier')) 
      this.cashier.cancel.addBootstrapButton(cancelText, cashierButtonOptions)  
      $( this.cashier.cancel.image).off('click')
$( this.cashier.cancel.image).on('click', function(e){self.hideCashier()})

//disable right click on all textboxes
     $( this.cashier.addChips.image).on('contextmenu', function(e){return false})
     $( this.cashier.cancel.image).on('contextmenu', function(e){return false})
     $( this.cashier.disableAutoRebuy.image).on('contextmenu', function(e){return false})

self.images.positionCashierButtons = function(displayDisableAutoRebuy, theseOptions){
console.log('positioncashier buttons called extraWidthFat = ' + cashierButtonExtraWidth)

if(!theseOptions){var options = {}}
  else{var options = _.clone(theseOptions)}
options.size = true
options.update = false

var stagesToUpdate = []
var goingToDisplayDisableAutoRebuy

if(displayDisableAutoRebuy === true || displayDisableAutoRebuy === false){goingToDisplayDisableAutoRebuy = displayDisableAutoRebuy}
else if($(this.cashier.disableAutoRebuy.image).css('display') === 'none'){var disableAutoRebuyDisplayed = false}
 else{var disableAutoRebuyDisplayed = true}

var cashierButtonWidth = minCashierButtonTextWidth + cashierButtonExtraWidth; var addChipsX; var cancelX; 
var disableRebuyWidth = disableAutoRebuyTextWidth + cashierButtonExtraWidth

//get cashierWindow location
var cashierWindowLocation = getDisplayObjectPositionAndSizeData(self.images.cashier.window.image, {size:false})
var cashierOffsetX = cashierWindowLocation.x - self.images.cashier.window.position.x
var cashierOffsetY = cashierWindowLocation.y - self.images.cashier.window.position.y

//console.log('cashierOffsetX = '+cashierOffsetX);console.log('cashierOffsetY = '+cashierOffsetY)

if(goingToDisplayDisableAutoRebuy === true){

//update widthd
if (cashierButtonWidth < disableRebuyWidth){var cashierButtonWidth = disableAutoRebuyTextWidth}

//console.log('dispaying disableautorebuy, buttonwidth = ' + cashierButtonWidth)
//update distance between buttons
var distanceBetweenCashierButtons = (innerCashierWidth - cashierButtonWidth*3)/4

var cancelX = cashierWindowX  + cashierWindowWidth/2 - cashierButtonWidth/2
var addChipsX = cancelX - distanceBetweenCashierButtons - cashierButtonWidth
var disableAutoRebuyX = cancelX + distanceBetweenCashierButtons + cashierButtonWidth

this.cashier.disableAutoRebuy.position.x = disableAutoRebuyX
this.cashier.disableAutoRebuy.size.x = cashierButtonWidth
stagesToUpdate.push (this.cashier.disableAutoRebuy.updateImageLocationAndSize(options))
stagesToUpdate.push(self.displayChildren(this.cashier.disableAutoRebuy, options))
//stagesToUpdate.push(self.displayChildren(this.cashier.disableAutoRebuy, options))

}//if displaying disable auto rebuy option


else{
//console.log('hiding disableautorebuy, buttonwidth = ' + cashierButtonWidth)
stagesToUpdate.push(self.hideChildren(this.cashier.disableAutoRebuy, options))

var distanceBetweenCashierButtons = (innerCashierWidth - minCashierButtonTextWidth*2)/3

var addChipsX =  cashierWindowX  + cashierWindowWidth/2 - distanceBetweenCashierButtons/2 - cashierButtonWidth
var cancelX = cashierWindowX  + cashierWindowWidth/2 + distanceBetweenCashierButtons/2

}//if we gonna NOT display autorebuy option


this.cashier.addChips.position.x = addChipsX
this.cashier.addChips.size.x = cashierButtonWidth
stagesToUpdate.push (this.cashier.addChips.updateImageLocationAndSize(options))

this.cashier.cancel.position.x = cancelX
this.cashier.cancel.size.x = cashierButtonWidth
stagesToUpdate.push (this.cashier.cancel.updateImageLocationAndSize(options))

var cashierButtons = [this.cashier.addChips, this.cashier.cancel, this.cashier.disableAutoRebuy]

stagesToUpdate.push (self.setImageItemPositionAndTextBasedOnImageChange(cashierButtons, cashierOffsetX, cashierOffsetY, {permanent:false, movementType:'relative'}))



if(options.update !== false){self.updateStages(stagesToUpdate)}
else{return stagesToUpdate}

}//reposition button row addChips, cancel, and disableAutoRebuy buttons inside the cashier

self.images.positionCashierButtons(true,{update:false})
      }//self.images.createCashier

      self.images.createCashier()

   // =============================================SOUNDS========================================
 
//showTableChatFull button
var showTableChatFullOffsetY = distanceBetweenUpperButtonHitAreasY - showTableChatFullHitAreaOffsetTop - getChipsHitAreaBottomOffset

this.showTableChatFull = new this.Item(this.getChips.position.x, this.getChips.position.y + this.getChips.size.y + showTableChatFullOffsetY, showTableChatFullWidth, showTableChatFullHeight, getZ('buttons','staticItems') )
this.showTableChatFull.addBitmap(showTableChatFullSource)
this.showTableChatFull.on('click', self.events.showTableChatFullOnClick)

 var showTableChatFullTextLeftOffset = 4; var showTableChatFullTextTopOffset = 6; var standUpTextRightOffset = 30; var showTableChatFullTextBottomOffset = 14
//var showTableChatFullTextWidth = showTableChatFullWidth - showTableChatFullTextLeftOffset - showTableChatFullTextRightOffset
var showTableChatFullTextHeight = showTableChatFullHeight - showTableChatFullTextTopOffset - showTableChatFullTextBottomOffset

this.showTableChatFull.addText('SHOW CHAT', upperButtonFontType, 'white', {html:true, css:upperButtonTextCSS, textAlign:'left'})
setDisplayObjectPositionData(this.showTableChatFull.text, {x:showTableChatFullTextLeftOffset + this.showTableChatFull.position.x
  ,  y: this.showTableChatFull.position.y + showTableChatFullTextTopOffset
 // ,width:getChipsTextWidth
  , height:showTableChatFullTextHeight
}, {update:false})



this.hideTableChatFull = new this.Item(this.getChips.position.x, this.getChips.position.y + this.getChips.size.y + showTableChatFullOffsetY, showTableChatFullWidth, showTableChatFullHeight, getZ('buttons','staticItems') )
this.hideTableChatFull.addBitmap(permanentPreferences.sourceObjects.value.hideTableChatFull)
this.hideTableChatFull.on('click', self.events.hideTableChatFullOnClick)

this.hideTableChatFull.addText('HIDE CHAT', upperButtonFontType, 'white', {html:true, css:upperButtonTextCSS, textAlign:'left'})
setDisplayObjectPositionData(this.hideTableChatFull.text, {x:showTableChatFullTextLeftOffset + this.showTableChatFull.position.x
  ,  y: this.showTableChatFull.position.y + showTableChatFullTextTopOffset
 // ,width:getChipsTextWidth
  , height:showTableChatFullTextHeight
}, {update:false})


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
var tableChatFullDivX = tableChatFullLeftOffset
var tableChatFullDivY = tableChatFullTopOffsetFromHideChat + this.hideTableChatFull.position.y+this.hideTableChatFull.size.y
var tableChatFullStageWidth = this.seats[0].seat.position.x-tableChatFullDivX - tableChatFullRightOffsetFromMiddleSeat
var tableChatFullStageHeight = this.foldToAnyBet.position.y - tableChatFullBottomOffsetFromFoldToAnyBetButton - tableChatFullDivY


//create stageelement
this.tableChatFull.htmlDivElement = new this.Item(tableChatFullDivX, tableChatFullDivY, tableChatFullStageWidth, tableChatFullStageHeight, getZ('background','tableChatFull'))

this.tableChatFull.htmlCanvasElement = new this.Item(0, 0, tableChatFullStageWidth, tableChatFullStageHeight, getZ('background','tableChatFull'))
//console.log('tablechatfullhtml element')
//console.log(this.tableChatFull.htmlCanvasElement)

//console.log(self.arrayOfParentsOfStageAndOfContainerArray[ this.tableChatFull.htmlCanvasElement.position.z.stage])
var tableChatFullStageParent =  self.getParentOfStageObject(this.tableChatFull.htmlCanvasElement)


 $(tableChatFullStageParent.div).css({
               'left':tableChatFullDivX+'px'
    ,'top':tableChatFullDivY +'px'
    ,'float':'left'
     //   ,'width': this.tableChatFull.htmlCanvasElement.size.x+'px',
//'height': this.tableChatFull.htmlCanvasElement.size.y+'px'
,'overflow':'hidden'
,'pointer-events':'visible'
           })

tableChatFullStageParent.resize({width:this.tableChatFull.htmlCanvasElement.size.x+'px',height: this.tableChatFull.htmlCanvasElement.size.y+'px'})

   $(tableChatFullStageParent.stage.canvas).attr({
 //     'width': this.tableChatFull.htmlCanvasElement.size.x+'px',
//'height': this.tableChatFull.htmlCanvasElement.size.y+'px'

  })
   /*
   .css({
  'pointer-events':'auto'
  })
 */



var tableChatFullWindowBackgroundColor = permanentPreferences.tableChatFull.windowColor.value
var tableChatFullWindowBorderColor = '#000000'
var tableChatFullWindowBorderWidth = 1
var tableChatFullWindowAlpha = permanentPreferences.tableChatFull.windowAlpha.value
var tableChatFullRoundedRectCornerSizeRatioOfHeight = 0.05

  this.tableChatFull.window = new this.Item(0, 0, tableChatFullStageWidth, tableChatFullStageHeight, getZ('background','tableChatFull'))
  
  this.tableChatFull.window.drawImage = function(){ //we can use this function to update when we popout the chat box

var canvas = self.getParentOfStageObject(this).stage.canvas

var canvasSize = getDisplayObjectPositionAndSizeData(canvas, {position:false, size:true, maxSize:false})

var width = canvasSize.outerWidth;var height = canvasSize.outerHeight;

if(this.image instanceof createjs.Shape){this.image.graphics.clear()}
else{this.image = new createjs.Shape()}

this.image.graphics.beginFill(tableChatFullWindowBackgroundColor)
.setStrokeStyle(tableChatFullWindowBorderWidth,'round').beginStroke(tableChatFullWindowBorderColor)
.drawRoundRect(this.position.x, this.position.y, width, height, tableChatFullRoundedRectCornerSizeRatioOfHeight*this.size.y)
this.image.alpha = tableChatFullWindowAlpha

  }

  this.tableChatFull.window.drawImage()

var hideDealerMessagesOffsetLeft =  this.tableChatFull.htmlCanvasElement.size.x*.05 //checkBoxButtonOffSetLeft
var hideDealerMessagesOffsetRight =  hideDealerMessagesOffsetLeft//checkBoxButtonOffSetLeft
var hideDealerMessagesOffsetTop =  checkBoxButtonDistanceY

this.tableChatFull.hideDealerMessages = new this.Item(hideDealerMessagesOffsetLeft, hideDealerMessagesOffsetTop, this.tableChatFull.window.size.x - checkBoxButtonOffSetLeft*2, checkBoxButtonHeight, getZ('buttons','tableChatFull'))
this.tableChatFull.hideDealerMessages.addBitmap( permanentPreferences.sourceObjects.value.checkBox)
self.images.addCheckBoxButtonText(this.tableChatFull.hideDealerMessages, 'Hide dealer messages')
this.tableChatFull.hideDealerMessages.on('click', self.events.hideDealerMessagesClicked)

this.tableChatFull.hideDealerMessagesOn = new this.Item(hideDealerMessagesOffsetLeft, this.tableChatFull.hideDealerMessages.position.y, this.tableChatFull.hideDealerMessages.size.x, checkBoxButtonHeight,getZ('buttons','tableChatFull'))
this.tableChatFull.hideDealerMessagesOn.addBitmap( permanentPreferences.sourceObjects.value.checkBoxChecked)
self.images.addCheckBoxButtonText(this.tableChatFull.hideDealerMessagesOn, 'Hide dealer messages')
this.tableChatFull.hideDealerMessagesOn.on('click', self.events.hideDealerMessagesOnClicked)

this.tableChatFull.hidePlayerMessages = new this.Item(hideDealerMessagesOffsetLeft, hideDealerMessagesOffsetTop*2+checkBoxButtonHeight, this.tableChatFull.hideDealerMessages.size.x, checkBoxButtonHeight,getZ('buttons','tableChatFull'))
this.tableChatFull.hidePlayerMessages.addBitmap( permanentPreferences.sourceObjects.value.checkBox)
self.images.addCheckBoxButtonText(this.tableChatFull.hidePlayerMessages, 'Hide player messages')
this.tableChatFull.hidePlayerMessages.on('click', self.events.hidePlayerMessagesClicked)

this.tableChatFull.hidePlayerMessagesOn = new this.Item(hideDealerMessagesOffsetLeft, this.tableChatFull.hidePlayerMessages.position.y, this.tableChatFull.hideDealerMessages.size.x, checkBoxButtonHeight,getZ('buttons','tableChatFull'))
this.tableChatFull.hidePlayerMessagesOn.addBitmap( permanentPreferences.sourceObjects.value.checkBoxChecked)
self.images.addCheckBoxButtonText(this.tableChatFull.hidePlayerMessagesOn, 'Hide player messages')
this.tableChatFull.hidePlayerMessagesOn.on('click', self.events.hidePlayerMessagesOnClicked)

this.tableChatFull.hideObserverMessages = new this.Item(hideDealerMessagesOffsetLeft, checkBoxButtonDistanceY*3+checkBoxButtonHeight*2, this.tableChatFull.hideDealerMessages.size.x, checkBoxButtonHeight,getZ('buttons','tableChatFull'))
this.tableChatFull.hideObserverMessages.addBitmap( permanentPreferences.sourceObjects.value.checkBox)
self.images.addCheckBoxButtonText(this.tableChatFull.hideObserverMessages, 'Hide observer messages')
this.tableChatFull.hideObserverMessages.on('click', self.events.hideObserverMessagesClicked)

this.tableChatFull.hideObserverMessagesOn = new this.Item(hideDealerMessagesOffsetLeft, this.tableChatFull.hideObserverMessages.position.y, this.tableChatFull.hideDealerMessages.size.x, checkBoxButtonHeight,getZ('buttons','tableChatFull'))
this.tableChatFull.hideObserverMessagesOn.addBitmap( permanentPreferences.sourceObjects.value.checkBoxChecked)
self.images.addCheckBoxButtonText(this.tableChatFull.hideObserverMessagesOn, 'Hide observer messages')
this.tableChatFull.hideObserverMessagesOn.on('click', self.events.hideObserverMessagesOnClicked)



var longestLeftSideCheckBoxAndTextItemWidth = this.tableChatFull.hideObserverMessages.size.x
if(this.tableChatFull.hidePlayerMessages.size.x > longestLeftSideCheckBoxAndTextItemWidth){longestLeftSideCheckBoxAndTextItemWidth = this.tableChatFull.hidePlayerMessages.size.x }
if(this.tableChatFull.hideDealerMessages.size.x > longestLeftSideCheckBoxAndTextItemWidth){longestLeftSideCheckBoxAndTextItemWidth = this.tableChatFull.hidePlayerMessages.size.x }

var rightSideCheckBoxX = this.tableChatFull.hideDealerMessages.position.x + longestLeftSideCheckBoxAndTextItemWidth + hideDealerMessagesOffsetRight
var rightSideCheckBoxY = this.tableChatFull.hideDealerMessages.position.y

this.tableChatFull.popOut = new this.Item(rightSideCheckBoxX, rightSideCheckBoxY, 0, checkBoxButtonHeight,getZ('buttons','tableChatFull'))
this.tableChatFull.popOut.addBitmap( permanentPreferences.sourceObjects.value.checkBox)
self.images.addCheckBoxButtonText(this.tableChatFull.popOut, 'Pop-Out')
this.tableChatFull.popOut.on('click', self.events.popOutClicked)

this.tableChatFull.popOutOn = new this.Item(this.tableChatFull.popOut.position.x, this.tableChatFull.popOut.position.y, this.tableChatFull.popOut.size.x, checkBoxButtonHeight,getZ('buttons','tableChatFull'))
this.tableChatFull.popOutOn.addBitmap( permanentPreferences.sourceObjects.value.checkBoxChecked)
self.images.addCheckBoxButtonText(this.tableChatFull.popOutOn, 'Pop-Out')
this.tableChatFull.popOutOn.on('click', self.events.popOutOnClicked)


//chat message text
var chatTextDivTextOffsetLeft = checkBoxButtonOffSetLeft - 1
var chatTextDivTextOffsetRight = checkBoxButtonOffSetLeft - 1
var chatTextDivTextOffsetTopFromLastButton = 3
var chatTextDivTextOffsetBottom = this.tableChatFull.window.size.y*tableChatFullRoundedRectCornerSizeRatioOfHeight

var chatTextDivX = this.tableChatFull.htmlCanvasElement.position.x + chatTextDivTextOffsetLeft
var chatTextDivY = this.tableChatFull.htmlCanvasElement.position.y + this.tableChatFull.hideObserverMessages.position.y+this.tableChatFull.hideObserverMessages.size.y + chatTextDivTextOffsetTopFromLastButton 
//var chatTextDivWidth = this.tableChatFull.htmlCanvasElement.size.x -chatTextDivTextOffsetLeft-chatTextDivTextOffsetRight
//var chatTextDivHeight = this.tableChatFull.htmlCanvasElement.size.y - chatTextDivTextOffsetBottom -(chatTextDivY-this.tableChatFull.htmlCanvasElement.position.y) 

var chatTextDivWidth = this.tableChatFull.htmlCanvasElement.size.x 
var chatTextDivHeight = this.tableChatFull.htmlCanvasElement.size.y - chatTextDivTextOffsetBottom -(chatTextDivY-this.tableChatFull.htmlCanvasElement.position.y) 


this.tableChatFull.chatTextDiv = new this.Item(chatTextDivX, chatTextDivY, chatTextDivWidth ,chatTextDivHeight, getZ('background','tableChatFull'))
this.tableChatFull.chatTextDiv.addElement($('#tableChatFullTextDiv')[0],'image')

/*
this.tableChatFull.chatParagraph = new this.Item(chatTextDivX, chatTextDivY, chatTextDivWidth ,chatTextDivHeight, getZ('background','tableChatFull'))
this.tableChatFull.chatParagraph.addElement = ($('#tableChatFullText')[0],'image')
*/

var tableChatFullParentOfStage = self.arrayOfParentsOfStageAndOfContainerArray[ this.tableChatFull.chatTextDiv.position.z.stage]
var tableChatFullStageCanvasZIndex = $(tableChatFullParentOfStage.stage.canvas).css('z-index')

 $(tableChatFullParentOfStage.div).append(self.jQueryObjects.tableChatFullDiv)


        $(this.tableChatFull.chatTextDiv.image).css({
                    '-webkit-touch-callout': 'none',
'-webkit-user-select': 'none',
'-khtml-user-select': 'none',
'-moz-user-select': 'none',
'-ms-user-select': 'none',
'user-select': 'none'
/*
          'display':'none'
          ,left: this.tableChatFull.chatTextDiv.position.x+'px'
     ,  top:      this.tableChatFull.chatTextDiv.position.y +'px'
 ,'width':           this.tableChatFull.chatTextDiv.size.x+'px'
,'height':            this.tableChatFull.chatTextDiv.size.y+'px'
//,'margin-bottom': chatTextDivTextOffsetBottom + 'px'
//,'margin-right': chatTextDivTextOffsetRight + 'px'
//,'margin-left': chatTextDivTextOffsetLeft + 'px'
//,'margin-top': this.tableChatFull.chatTextDiv.position.y +'px'

,'z-index':parseInt(tableChatFullStageCanvasZIndex)+1
*/
           })


var scrollBarInnerWidth = 2
var scrollBarBorderWidth = 1
var scrollBarTotalWidth = scrollBarInnerWidth + 2*scrollBarBorderWidth

var chatMessageOffsetLeft = 0
var chatMessageOffsetRight = 0//scrollBarTotalWidth
var chatMessageOffsetTop = 0
var chatMessageOffsetBottom =  chatMessageOffsetTop



this.tableChatFull.chatMessageText = new this.Item(chatMessageOffsetLeft, chatMessageOffsetTop, chatTextDivWidth -  chatMessageOffsetLeft - chatMessageOffsetRight,chatTextDivHeight  - chatMessageOffsetTop - chatMessageOffsetBottom, getZ('text','tableChatFull'))

var chatMessageFontSize = permanentPreferences.tableChatFull.chatMessageFontSize.value
var chatMessageFont = 'Lucida Sans'
var chatMessageFontColor = permanentPreferences.tableChatFull.chatMessageFontColor.value

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
cursoropacitymax:permanentPreferences.tableChatFull.windowAlpha.value, 
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
  set_height: this.tableChatFull.chatTextDiv.size.y,
  horizontalScroll: false
}


 // var mCustomScrollbarOptions = {set_height: this.tableChatFull.chatTextDiv.size.y}

if(permanentPreferences.tableChatFull.scrollBarType && permanentPreferences.tableChatFull.scrollBarType.value == 'mCustomScrollbar'){
console.log('creating mCustomScrollbar')
//show so that scroll bar can be initialized
 //$("#tableChatFullTextDiv").css('display','inline')

self.jQueryObjects.tableChatFullDiv.mCustomScrollbar(mCustomScrollbarOptions)
console.log('created')
console.log(self.jQueryObjects.tableChatFullDiv)
// $("#tableChatFullTextDiv").css('display','none')

}

else{

 $("#tableChatFullTextDiv").niceScroll(messageTextScrollBarNiceScrollOptions)




}

 
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
        //       'width': this.tableChatFull.chatMessageText.size.x+'px',
//'height': this.tableChatFull.chatMessageText.size.y+'px',
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


//console.log(this.tableChatFull.chatMessageText)
//this.tableChatFull.hide = new this.Item(tableChatFullX, tableChatFullY, tableChatFullWidth, tableChatFullHeight,getZ('tableChatFull', 'buttons'))
       
        //postion canvas element textbox
 



/*
//---------------------------------------report bug-----------------------------------------------------

this.reportBug = new this.Item(0, this.getChips.size.y, 165,30,self.gameState.zPositionData.nonAnimatedThingsOnTable)


   this.reportBug.text = new createjs.Text('click to report bugs via email to: CryptoPoker@gmail.com', '13px ' + permanentPreferences.defaultFontType.value ,'white')
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

//create growl container

var growlContainerWidth = self.images.standUp.size.x*1.6
var growlContainerY = self.images.standUp.size.y

self.images['growl-container'] = new self.images.Item(viewedCanvasWidth - growlContainerWidth, growlContainerY, growlContainerWidth, 0, getZ('growl-container'))
self.images['growl-container'].addElement($("<div id = 'growl-container'>")[0], 'image', {

css:{
  'pointer-events':'none'
}

})

self.images['growl-container'].display()

//create faux chip array
for (var i = 0 ; i <  this.seats.length; i++) {
  self.displayChipStack ( 99999999999999, this.seats[i], {hidden:true,chipArrayName:'referenceChips'})
}

self.createPreactionOptionItems()

//insert class of noFat to all items that have been custom created by us
//var allnoFatJqueryObject = self.jQueryObjects.pokerTableDiv.find("*")
//console.log(allnoFatJqueryObject)
//allnoFatJqueryObject.addClass(self.css.noFat)

/*
self.jQueryObjects.chatBoxDiv.find("*").removeClass(self.css.noFat)
self.jQueryObjects.chatBoxDiv.removeClass(self.css.noFat)
*/

console.log('all createjs images have been created')


} //end setDefaults

//assign options as properties
var assignObjectPropertiesAsPropertiesOfDisplayObject = function (displayObject, properties){
//console.log('assignObjectPropertiesAsPropertiesOfDisplayObject called display object = ')
//console.log(displayObject)
//console.log(properties)

_.each(properties, function(value, index, list){

if(index === 'update'){}
else if(!_.isUndefined(value)){displayObject[index] = value}

})

}

//options.stageNumber, if on existing number, will push the existing number up 1
this.StageParent = function (options){

var stageParent = this

 // console.log('StageParent called, checking instanceof StageInitializationInfo ' + options instanceof StageInitializationInfo)
 // console.log(options)
//console.log('creating a stage with the following options')
//console.log(options)

//this functions sets the stage's settings after it's been created
var initializeStageSettings = function (options){
  if(!options){var options = {}}
  if(!options.stageOptions){options.stageOptions = {}}

    if(!_.isNumber(options.stageNumber)){var stageNumber = self.arrayOfParentsOfStageAndOfContainerArray.length-1}
else{var stageNumber = options.stageNumber}
var stageOptions = options.stageOptions
if(!options.canvasOptions){options.canvasOptions = {}}
  if(!options.divOptions){options.divOptions = {}}

 stageParent.stage.autoClear=false
  stageParent.stage.snapToPixel = false
 stageParent.stage.snapToPixelEnabled = false
 stageParent.stage.mouseMoveOutside = true
stageParent.stage.tickOnUpdate = false

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

$(stageParent.stage.canvas).on('contextmenu', function(e){return false})

}
}//if stageOptions

if(_.isObject(options.canvasOptions.css) ){
$(stageParent.canvas).css(stageOptions.canvasOptions.css)
  //setOrGetDisplayStatusOfCanvasDivByStageNumberOrItemTrueDisplaysFalseHidesOtherGets(stageNumber, false)
//$(self.arrayOfParentsOfStageAndOfContainerArray[stageNumber].stage.canvas).css('display','none')
}

if(_.isObject(options.canvasOptions.attr) ){
$(stageParent.canvas).attr(stageOptions.canvasOptions.attr)
  //setOrGetDisplayStatusOfCanvasDivByStageNumberOrItemTrueDisplaysFalseHidesOtherGets(stageNumber, false)
//$(self.arrayOfParentsOfStageAndOfContainerArray[stageNumber].stage.canvas).css('display','none')
}

if(options.divOptions.hidden === true) {
setOrGetDisplayStatusOfCanvasDivByStageNumberOrItemTrueDisplaysFalseHidesOtherGets(stageNumber, false)
  //setOrGetDisplayStatusOfCanvasDivByStageNumberOrItemTrueDisplaysFalseHidesOtherGets(stageNumber, false)
//$(self.arrayOfParentsOfStageAndOfContainerArray[stageNumber].stage.canvas).css('display','none')
}

if(options.divOptions.mouseDisabled === true) {
$(stageParent.div).css('pointer-events', 'none')
  //setOrGetDisplayStatusOfCanvasDivByStageNumberOrItemTrueDisplaysFalseHidesOtherGets(stageNumber, false)
//$(self.arrayOfParentsOfStageAndOfContainerArray[stageNumber].stage.canvas).css('display','none')
}
//create containers and add them to stage
if(_.isNumber(options.numContainers)){
  var numContainers = options.numContainers
if(!_.isArray(stageParent.containers)) {
  stageParent.containers =  []}

    for(var i = startingContainerIndex;i < numContainers;i++){
 stageParent.containers[i] = new createjs.Container()
 stageParent.stage.addChild(self.arrayOfParentsOfStageAndOfContainerArray[stageNumber].containers[i])
    }

}//if stageOptions.numContainers is specified create contianers

}//function initializeStageSettings



if(!options){var options = {}}
  //set default stage as last one if not listed
if(!_.isNumber(options.stageNumber)){options.stageNumber = this.arrayOfParentsOfStageAndOfContainerArray.length}


if(options.stageNumber === 0 || self.arrayOfParentsOfStageAndOfContainerArray.length == 0){
  var previousCanvasIDNumber = 0
    var newCanvasIDNumber = 0

}//if first canvas, assign 0

else{

  //find previous canvas
  for(var i = options.stageNumber -1;i>=0;i--){
if(!_.isEmpty(self.arrayOfParentsOfStageAndOfContainerArray[i])){
var previousStageNumber = i;i = -9999}
  }
 // console.log('currently creating stage number '+ options.stageNumber + ', previous stage number is '+ previousStageNumber)
  var previousCanvasID = self.arrayOfParentsOfStageAndOfContainerArray[previousStageNumber].stage.canvas.id
var previousCanvasIDNumber = parseFloat(previousCanvasID.replace('canvas',''))

  //check if stage is on top of all other existing stagse
if(options.stageNumber>self.arrayOfParentsOfStageAndOfContainerArray.length-1){
var newCanvasIDNumber = previousCanvasIDNumber + 1//increment from previous canvas
}//if stage is "toppest" stage

else { //if stage is in the middle
    var nextCanvasID = self.arrayOfParentsOfStageAndOfContainerArray[options.stageNumber].stage.canvas.id
  var nextCanvasIDNumber = parseFloat( nextCanvasID.replace('canvas',''))
var newCanvasIDNumber = (previousCanvasIDNumber + nextCanvasIDNumber )/2//increment from previous canvas
}//if stage is in the "middle"

}//if NOT the first canvas

//console.log('canvas id number determined to be :'+newCanvasIDNumber)
//if we want to create a new canvas and use NEW canvasID number
if(options.stageOptions.newCanvas === true || options.stageNumber === 0){
  var newDivID = 'canvas'+newCanvasIDNumber+'Div'
var newCanvasID = 'canvas'+newCanvasIDNumber

//defaults which were assigned at top
var canvasClass = self.css.canvas
var zIndexesPerDiv = 10

var newParentOfStageDiv = $('<div>')
newParentOfStageDiv.attr('id', newDivID)
self.jQueryObjects.canvasDiv.append(newParentOfStageDiv)

$('#'+newDivID).append('<canvas id = '+'\''+newCanvasID+'\'' + ' width = '+'\''+technicalCanvasWidth+'\''+' height=' +'\''+technicalCanvasHeight+'\''+'></canvas>')

//console.log('created canvas with canvas id of: '+newCanvasID)
//set proper z-index
//$('#'+newCanvasID).css('z-index',parseInt(newCanvasIDNumber*zIndexesPerCanvas)+initialZIndex)
//$('#'+newCanvasID).css('z-index',initialZIndex)
$('#'+newCanvasID).attr({

width:technicalCanvasWidth
,height:technicalCanvasHeight

}).css({
width:viewedCanvasWidth
,height:viewedCanvasHeight
}).addClass(canvasClass + ' ' + self.css.unselectable + ' ' + self.css.noFat)
//$('#'+newCanvasID).css('z-index',0)
$('#'+newDivID).css({
  'z-index': newCanvasIDNumber*zIndexesPerDiv
,'width':viewedCanvasWidth
,'height':viewedCanvasHeight
  }).addClass(self.css.noFat)


}//if we want to create a new canvas

else{ //here we want to use previous canvasID number
  var newCanvasID = 'canvas'+previousCanvasIDNumber
}//if we DONT want to create a new canvas

//console.log('creating stage number '+options.stageNumber)
//creating the new stage

self.arrayOfParentsOfStageAndOfContainerArray.splice(options.stageNumber, 0, this)
this.upToDate = true


this.div = document.getElementById(newDivID)
this.initializationInfo = options

this.stage = new createjs.Stage(newCanvasID)
this.name = options.name
this.stage.name = options.name

//scale the stage
this.stage.scaleX = backingStorePixelRatio/devicePixelRatio
this.stage.scaleY = backingStorePixelRatio/devicePixelRatio
//IN THE FUTURE WE WANT TO INCREASE THE FUTURE CANVAS/STAGES DATA TO WE CAN ADD IT HERE
initializeStageSettings(options)

}//StageParent function

this.StageParent.prototype.resize = function(size, options){
if(!options){var options = {}}
if(_.isNumber(size.width)) {size.width = size.width+'px'}
if(_.isNumber(size.height)){size.height = size.height+'px'}

var getRawNumber = function(str){return parseFloat(str.replace( /^\D+/g, ''))}

var currentDivSize = getDisplayObjectPositionAndSizeData(this.div, {position:false, maxSize:false, size:true})
var currentCanvasSize = getDisplayObjectPositionAndSizeData(this.stage.canvas, {position:false, maxSize:false, size:true})
var currentCanvasTechnicalSize = {outerWidth:this.stage.canvas.width, outerHeight:this.stage.canvas.height}

try{
if(size.width.indexOf('px') != -1){var newWidthRatio = getRawNumber(size.width)/currentDivSize.outerWidth}
  else if(size.width.indexOf('%') != -1){var newWidthRatio = getRawNumber(size.width)/100}
}catch(err){}
try{
if(size.height.indexOf('px') != -1){var newHeightRatio = getRawNumber(size.height)/currentDivSize.outerHeight}
  else if(size.height.indexOf('%') != -1){var newHeightRatio = getRawNumber(size.height)/100}
}catch(err){}
var divCSS = {}

if(_.isNumber(newWidthRatio) && newWidthRatio != 1){divCSS.width = (newWidthRatio*currentDivSize.outerWidth)+ 'px'}
if(_.isNumber(newHeightRatio) && newHeightRatio != 1){divCSS.height = (newHeightRatio*currentDivSize.outerHeight)+ 'px'}

var canvasCSS = {}
var canvasAttr = {}

if(_.isNumber(newWidthRatio) && newWidthRatio != 1){
 canvasCSS.width = (newWidthRatio*currentCanvasSize.outerWidth)+ 'px'
 canvasAttr.width = newWidthRatio*currentCanvasTechnicalSize.outerWidth
}
if(_.isNumber(newHeightRatio) && newHeightRatio != 1){
 canvasCSS.height = (newHeightRatio*currentCanvasSize.outerHeight)+ 'px'
 canvasAttr.height = newHeightRatio*currentCanvasTechnicalSize.outerHeight
}


$(this.div).css(divCSS)
$(this.stage.canvas).css(canvasCSS).attr(canvasAttr)


self.updateStages([])

}//function StageParent.resizeCanvas


this.initializeStagesAndCanvasCallThisFirst = function(){

//assign the backingStorePixelRatio


backingStorePixelRatio = function(){

var context = self.jQueryObjects.backingStoreRatioTester[0].getContext('2d')

return context.webkitBackingStorePixelRatio ||
context.mozBackingStorePixelRatio ||
context.msBackingStorePixelRatio ||
context.oBackingStorePixelRatio ||
context.backingStorePixelRatio || 1

}()//get the ratio that the canvas is styled down to



technicalCanvasWidth = viewedCanvasWidth*backingStorePixelRatio/devicePixelRatio
technicalCanvasHeight = viewedCanvasHeight*backingStorePixelRatio/devicePixelRatio


  createZPositionData()

//console.log('initializeStagesAndCanvasCallThisFirst called')
//console.log(zPositionData)
  _.each(zPositionData.stages, function(value,index,list) {
 //   console.log('preparing to call create stage with folowing options:')
  //  console.log(value)

 var newStage = new self.StageParent (value)

  }, this)//end iteration through zpositiondata




}//initialize stages


        this.setBackground = function(src, options){    

  if(self.images.background instanceof self.images.Item != true){
        self.images.background = new this.images.Item(0, 0, viewedCanvasWidth, viewedCanvasHeight, getZ('background','staticItems'))
      }

var background = self.images.background

//make "text" that holds our real onclick events
if(!_.isObject(background.text)){
var fullStageShape = new createjs.Shape()
fullStageShape.graphics.drawRect(background.position.x, background.position.y, background.size.x, background.size.y)
fullStageShape.setBounds(background.position.x, background.position.y, background.size.x, background.size.y)
fullStageShape.alpha = 0
fullStageShape.hitArea = new createjs.Shape()
fullStageShape.hitArea.graphics.beginFill('#020202').drawRect(background.position.x, background.position.y, background.size.x, background.size.y)


background.adoptChild(fullStageShape, 'text', {maxSize:'parent'})


  self.images.background.on('contextmenu', self.events.onBackgroundContextMenu, {image:false, text:true})
}

if(!src){var src = permanentPreferences.sourceObjects.value.background}

  if(!options){var options = {}}
    else {var options = _.clone(options)}

options.html = true
      options.size = false
    options.update = true
    options.maxSize = 'parent'
    options.onerror = self.setBackground
   options.onload = function(img){
//if(img.complete != true){console.error('onload image called but img.complete = ' + img.complete)}
console.log('adjusting image size of background with transformation')
var scaleX = background.size.x/img.width
var scaleY = background.size.y/img.height

if(_.isNaN(scaleX) || _.isNaN(scaleY)){throw''}
if(background.image instanceof createjs.DisplayObject){background.image.setTransform(0, 0, scaleX, scaleY)}
else if(_.isElement(background.image)){
  $(background.image).css({width:background.size.x+'px', height:background.size.y+'px'})
 // background.image.width = background.size.x;background.image.height = background.size.y
}

background.display(options)
}


  background.addBitmap(src, options)


return background.display(options)



    }

    this.images.setDefaultEvents = function(){

//prevent tabbing because it auto srolls shit
$(window).on('keydown', function(e){

var keyCode = e.keyCode || e.which; 

  if (keyCode == 9) { //if tab key
    e.preventDefault(); 
  } 


})




        //mouse events for changing bet sizes
     //    $(this.betSlider.slider.image).on('mousedown', self.events.betSliderHorizontalMouseDown)

        //mouse events for clicking on empty seats
             for (var i = 0; i < this.seats.length; i = i + 1){
         this.seats[i].openSeat.on('click', function(event){
          //clear the message array
if(_.isArray(event.target.parentItem.messages)){event.target.parentItem.messages.splice(0)}//splice if arry
else{event.target.parentItem.messages = []}//declare new array if not already an array


event.target.parentItem.messages.push('sit',event.target.parentItem.seatObjectAncestor.rotatedSeatNumber)
          self.events.onButtonClick(event)
        })//openSeat.image.onClick event
        }


    //    self.stage.onPress = self.events.onStagePress

if(self.isIframe()){


var setIFrameToTopHandler = function(){
    console.log('trying to run setIFrameToTop @ ');
    console.log(this)
    playZoneLandingPage.iframes.setIFrameToTop(self.getTableName());   
}
/*
$(self.getIframe()).off('mousedown.setToTop')
$(self.getIframe()).on('mousedown.setToTop', setIFrameToTopHandler)
*/
$("body").off("mousedown.triggerIframeSetToTop touchstart.triggerIframeSetToTop")

  $("body").on("mousedown.triggerIframeSetToTop touchstart.triggerIframeSetToTop",setIFrameToTopHandler)
  /* function(e){
//console.log('body mousedown triggered')
console.log(holdemCanvas.getIframe())
$(holdemCanvas.getIframe()).trigger('mousedown.setToTop')

  });
 */


}
    }//set default events

    this.images.setDefaultMessages = function(){
        
    }
    
    this.createAllItems = function(){

//sessionPreferences.displaySize.updateValue(sessionPreferences.displaySize.value)

self.images.loadingScreen.status.updateText('fetching table state ...')
console.log('fetching table state')
this.getTableState()

      this.updatePreference(sessionPreferences, sessionPreferences,{updateEqualValues:true})
       
self.images.loadingScreen.status.updateText('loading table background ...')
console.log('loading table background')
        this.setBackground()
       


self.images.loadingScreen.status.updateText('preparing images ...')
console.log('preparing images')
        this.images.setDefaults()

       this.images.setDefaultEvents()
       this.images.setDefaultMessages()
       this.gameState.itemsCreated = true

      console.log('this.create all items finished')
    }
     
//return betsize that is rounded down or FALSE if betsize is not a number, also checks to make sure betsize is within in and max
this.returnRoundedDownBetSize = function(betSize){

var isNumber =  !_.isNaN(betSize) && _.isNumber(betSize)
    var minIncrement = self.initial_table_state.min_increment


   if(isNumber === false ){return false}


//check to insure betSize is not outside of bounds, return min or max if it is
else if(betSize >= self.gameState.maxBet){return self.gameState.maxBet}
  else if (betSize <=self.gameState.minBet){return self.gameState.minBet}

    //if not a number use last known number and round
 
    else{
      var roundedBetSize = Math.floor(betSize/minIncrement)*minIncrement
        return roundedBetSize
       }


}

    //does not update a player's stack size
    this.playerPutsChipsInPot =function(seatNumber, betSize, stackSize, options){
        if(!options){var options = {}}
          var update = options.update
        options.update = false
        options.displayChipStackSize = true
        var stagesToUpdate = []
    //    self.setPreactionData('hand', 'inHand', {seat:seatNumber})

stagesToUpdate.push(  this.displayChipStack(betSize, this.images.seats[seatNumber], options ) )


        if(!_.isNull(stackSize) && !_.isUndefined(stackSize) && stackSize <=0 ){stackSize = 'All In'}
        //change betsize graphic value
       stagesToUpdate.push(        this.images.seats[seatNumber].status.updateText(stackSize, options) )
        stagesToUpdate.push(        this.images.seats[seatNumber].stackSize.updateText(stackSize, options) )
         


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
 && self.gameState.holeCards.length > 0){
 // console.log('creating user hole card copy')
shouldCopyHoleCards = true
holeCardSources = self.gameState.holeCards
}//if user

else if (shouldCopyHoleCards === false) {//if not user
//console.log('checking to see if we should create hole card copy for non-user, or user that loaded late')
//check whether we should create hole cards or not

for(var i = 0;i<holeCardArray.length;i++){//iterate through hole cards check if visible

 if(holeCardArray[i].isDisplayed() !== true){
//console.log('card '+i+'is not added to stage')
  shouldCopyHoleCards = false}
  else{
      holeCardSources[i] = holeCardArray[i].image.imageSource
  }
}//iterate through hole cards check if visible
}//if not user

//console.log('copy hole cards is '+ shouldCopyHoleCards)
//if not displaying then return false
if(shouldCopyHoleCards !== true){return false}

//copy the holecards
for(var i = 0;i<holeCardArray.length;i++){

animationArray[i] = new this.images.Item(0,0,0,0, self.images.seats[0].hiddenCards[0].position.z)
self.images.cardAsBitmap( animationArray[i], holeCardSources[i])
self.setItemLocationsInItemAEqualToOnesInItemB(animationArray[i], holeCardArray[i])

  animationArray[i].image.y  = this.images.seats[playerNumber].seat.position.y
animationArray[i].image.alpha = popupAlpha

var options = {
  seatNum:playerNumber,
  seatObject:self.images.seats[playerNumber]
}
  animationArray[i].on('mouseover',  function(event){
    console.log('animatedCard moused OVER')
  //  self.events.seatMouseEvent(event, options)
   self.events.seatMouseEvent(event, options)
 })
    animationArray[i].on('mouseout',  function(event){
  console.log('animatedCard moused OUT')
      self.events.seatMouseEvent(event, options)
})

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

}//disable ticker



var editEventsOfItemChild = function(item, onOrOff, eventType, actionFunction, options){
if(!options){var options = {}}

  //console.log('calling editevents editEventsOfItemChild turning: ' + onOrOff)



var getEventTypeFromString = function(eventTypeToParse){
if(_.isString(eventTypeToParse)){
var periodIndex = eventTypeToParse.indexOf('.')
    if(periodIndex != -1){return eventType.substring(0,periodIndex)}
  }

return eventTypeToParse
}//parse type of event from string

//OFF
if(onOrOff === 'off'){

var removeEvent = function(childType){
var child = item[childType]

  if(child instanceof createjs.DisplayObject){
  
//remove all
if(!_.isString(eventType)){

                child.removeAllEventListeners() 

item.getOrSetCreateJSEvents('set', childType) //remove all lasting events
}

else{//if removing a specific type of event
  //REMOVE PERIOD
var event = getEventTypeFromString(eventType)

//get createjs eventtype
if(event === 'contextmenu'){var createjsEvent = 'click'}
  else{var createjsEvent = event}

    //remove SPECIFIC FUNCTION
if(_.isFunction(options.function)){
  var listeners = item.getOrSetCreateJSEvents('remove', childType, event, options.function)
  child.removeEventListener(createjsEvent, options.function)
}//removing a specific function

//remove all events of one type
  else{
item.getOrSetCreateJSEvents('set', childType, event)
if(createjsEvent !== 'click' && createjsEvent !== 'contextmenu'){child.removeAllEventListeners(createjsEvent)}
  }
    }//if eventType is a string, we remove a specific type of event

  }//if easelJS

else if(_.isElement(child)){

if(!_.isString(eventType)){$(child).off()}
  else if(_.isFunction(options.function)){$(child).off(eventType, options.function)}
    else{$(child).off(eventType)}

}//if html child

}//remove event listener from 1 child

//remove events
if(this.image && options.image !== false){removeEvent('image')}
if(this.text && options.text !== false){removeEvent('text')}

}//==============OFF===========


//==============ON===========
else if(onOrOff === 'on'){

var addEventListenerToChild = function(childType){
var child = item[childType]

//EASELJS
if(child instanceof createjs.DisplayObject){

    var event = getEventTypeFromString(eventType) //turns a fancy evet like click.disable, and parses to click

//console.log('assigning to easeljs object event: ' + event)
  if(event === 'click' || event === 'contextmenu'){
  //  console.log('assigning a click event to easeljs object')
  var createjsEvent = 'click'
    var performOnEvent = self.events.onEaselJSChildClick
}//if click/contextmenu
    else{
      var createjsEvent = event
      var performOnEvent = actionFunction
    }

    //REMOVE ALL instances of the function by default, but here we will remove only a specific function if not equal to false
options.function = performOnEvent
  item.off(event, options)

  item.getOrSetCreateJSEvents('set', childType, event, actionFunction)
child.addEventListener(createjsEvent, performOnEvent)

}//if EASELJS


//HTML ELEMENT
else if(_.isElement(child)){
 $(child).off(eventType, actionFunction)
  $(child).on(eventType, actionFunction)
}

if(getEventTypeFromString(eventType) === 'click'){

  //MAKE CURSOR POINTER IF THERE IS A CLICK EVENT
if(_.isUndefined(options.cursor)){options.cursor = 'pointer'}
  item.cursorHover(options)

}//make cursor POINTER on hover

}//add event listener to 1 child




if(_.isObject(item.image) && options.image !== false){

  addEventListenerToChild('image')
if(options.text !== true){options.text = false}//disable text if we are adding click to image by default
}

if(_.isObject(item.text) && options.text !== false){
  addEventListenerToChild('text')
}

}//==============ON===========


}//assign events function



this.images.Item.prototype.off = function(eventType, options){

editEventsOfItemChild(this, 'off', eventType, null,  options)

}//off function for events


self.images.Item.prototype.on = function(eventType, actionFunction, options){

editEventsOfItemChild(this, 'on', eventType, actionFunction, options)

}

self.images.Item.prototype.disableMouseEvents = function(options){

if(!options){var options = {}}

var disableChildMouseEvent = function(child){
if(child instanceof createjs.DisplayObject){child.mouseEnabled = false}
  else if(_.isElement(child)){$(child).css('pointer-events','none')}

}

if(options.text !== false){disableChildMouseEvent(this.text)}
  if(options.image !== false){disableChildMouseEvent(this.image)}

}



self.images.Item.prototype.cursorHover = function(options){

if(!options){var options = {}}

if(options.cursor === false){return}

if(options === 'image'){var childType = 'image'}
  else if(options === 'text'){var childType = 'text'}
else if(options.image){var childType = 'image'}
  else if(options.text){var childType = 'text'}
    else if(_.isObject(this.image)){var childType = 'image'}
      else if(_.isObject(this.text)){var childType = 'text'}

var child = this[childType]

//CREATEJS DISPLAYOBJECT
if(child instanceof createjs.DisplayObject){child.cursor = options.cursor}

//HTML ELEMENT
else if(_.isElement(child)){ $(child).css('cursor', options.cursor)}


}

self.images.Item.prototype.getChildPositionAndSizeData = function(childType, options){


return getDisplayObjectPositionAndSizeData(this[childType], options)


}

self.images.Item.prototype.positionChild = function(childType, options){

if(!options){var options = {}}
  var stagesToUpdate = []

var child = this[childType]

if(_.isObject(child)){

var newLocationData = {}
if(options.position !== false){
  newLocationData.x = this.position.x 
  newLocationData.y = this.position.y
}

if(options.size === true || (childType === 'image' && options.size !== false) ){
 newLocationData.width = this.size.x
newLocationData.height = this.size.y
}


 // console.log('setting display object position through positionitemimage')
stagesToUpdate.push(setDisplayObjectPositionData(child, newLocationData, options ) )

}

//z-index
if(_.isElement(child)){
if(childType === 'text'){var zIndex = this.position.z.container + 1}
  else{ var zIndex = this.position.z.container }

  $(child).css({
    'z-index': zIndex
  })
}//if item.image is an element


if(_.isElement(child) && _.isNumber(newLocationData.x) && _.isNumber(newLocationData.y)){

var location = getDisplayObjectPositionAndSizeData(child, {size:false})


if(location.x > this.position.x + 1.1 || location.x < this.position.x - 1.1){console.log(location);console.log(this);throw 'location not matching'}
  if(location.y > this.position.y+ 1.1 || location.x < this.position.x - 1.1 ){console.log(location);console.log(this);throw 'location not matching'}


}

/*
if(childType === 'image' && _.isElement(child)){
console.log('positioned element image')
console.log(newLocationData)
console.log($(child).css('left'))
console.log($(child).css('top'))

}
*/


if(options.debug){throw''}

if(options.update !== false){self.updateStages(stagesToUpdate)}
  else{return stagesToUpdate}

}



    this.positionItemImage = function (item, options) {
item.positionChild('image',options)
    }

  //define function to get width of string
     this.getStringWidth = function(string, font){
     var context = self.arrayOfParentsOfStageAndOfContainerArray[0].stage.canvas.getContext('2d')
     context.font = font
     var textData = context.measureText(string)
     return textData.width
     }


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
var itemImageLocation = getDisplayObjectPositionAndSizeData(item.image, {size:false})
  itemCopyWithOnlyLocationData.image.x = itemImageLocation.x
  itemCopyWithOnlyLocationData.image.y = itemImageLocation.y
}
if(item.text){
itemCopyWithOnlyLocationData.text={}
var itemTextLocation = getDisplayObjectPositionAndSizeData(item.text, {size:false})
  itemCopyWithOnlyLocationData.text.x = itemTextLocation.x
  itemCopyWithOnlyLocationData.text.y = itemTextLocation.y
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


this.setItemLocationsInItemAEqualToOnesInItemB = function(itemA, itemB, options){
if(!options){var options = {}}
  var movementType = options.movementType
options.movementType = 'relative'
var permanent = options.permanent
options.permanent = true

if(!_.isObject(itemA) || !_.isObject(itemB)){console.log('setItemLocationsInItemAEqualToOnesInItemB not objects');return}
else if(_.isEmpty(itemB)){console.log('setItemLocationsInItemAEqualToOnesInItemB empty itemB');return}
  else if(itemA instanceof self.images.Item !== true){console.log('setItemLocationsInItemAEqualToOnesInItemB itemA not an Item');console.log(itemA)}
var changed = false

if(_.isUndefined(itemB.position)){console.log('itemB position undefined');console.log(itemB)}
if(_.isUndefined(itemA.position)){console.log('itemA position undefined');console.log(itemA)}

if(!itemA.image && !itemB.image && itemA.text && itemB.text && !_.isNaN(parseInt(itemA.text.text) )  ){


}

//if adjusting only text, we adjust the position values separately from the text location values
if(!itemA.image && !itemB.image && _.isObject(itemA.text) && _.isObject(itemB.text)){
// if(!_.isNaN(parseInt(itemA.text.text)) ){ console.log('setitemlocations changing location of text: '+itemA.text.text)}
  //  console.log(itemA);console.log(itemB)
   itemA.position.x = itemB.position.x
itemA.position.y = itemB.position.y
if(_.isString(itemB.position.displayCSS)){itemA.position.displayCSS = itemB.position.displayCSS}

var itemAPosition = getDisplayObjectPositionAndSizeData(itemA.text, {size:false})
var itemBPosition = getDisplayObjectPositionAndSizeData(itemB.text, {size:false})
 var deltaX = itemBPosition.x - itemAPosition.x; 
 var deltaY = itemBPosition.y - itemAPosition.y
 options.permanent = false //not goint to adjust position values with setitem function

}
else {//if adjusting not only text
  var deltaX = itemB.position.x - itemA.position.x; var deltaY = itemB.position.y - itemA.position.y
}
//move our object and all data to the new location
  self.setImageItemPositionAndTextBasedOnImageChange(itemA, deltaX, deltaY, options)

 options.permanent = permanent 
   options.movementType = movementType 
if(options.updateStageStatus === true){
if(options && options.update === true){self.updateStages(self.easelJSDisplayObjectChanged(itemA))}
else{return self.easelJSDisplayObjectChanged(itemA)}
}

}


this.copySeatObjectItemLocationData = function(seatObject){
 var seatObjectCopy =  {}
this.iterateThroughObjectAndPerformOnAllObjectsOrObjectsInArray(seatObject, function(value, indexes){


if (indexes.length === 1){
  //if array make blank array on copy object
  if(_.isArray(value)){seatObjectCopy[indexes[0]] = [];return}
else{seatObjectCopy[indexes[0]] = self.copyItemLocationData(value)}
}
else if (indexes.length === 2){
  seatObjectCopy[indexes[0]][indexes[1]] = self.copyItemLocationData(value)
}


}//performIfObject 
)

return seatObjectCopy
}

this.setSeatObjectLocationsInSeatObjectAEqualToOnesInSeatObjectB = function(seatObjectA, seatObjectB, options){
if(!options){var options = {}}
  var movementType = options.movementType
options.movementType = 'relative'
var permanent = options.permanent
options.permanent = true
var stagesToUpdate = []

//console.log('setSeatObjectLocationsInSeatObjectAEqualToOnesInSeatObjectB called')
//console.log(seatObjectA)
//console.log(seatObjectB)

this.iterateThroughObjectAndPerformOnAllObjectsOrObjectsInArray(seatObjectB, function(value, indexes){

//if empty object do nothing
if(!_.isArray(value)&&_.isEmpty(value)){return}

if(!_.isArray(value)){
if(!value.position){console.log('objectB without position value whose indexes =');console.log(indexes);console.log(seatObjectB)}
}



//if array make blank array in objectA
if(_.isArray(value)){
  //make array if it isnt an array already
if(!_.isArray(seatObjectA[indexes[0]]) ){
//console.log('seatObjectA with following indexes is not an array');console.log(indexes)
//console.log('seatObjectA.index0 value = ');console.log(seatObjectA[indexes[0]])
 seatObjectA[indexes[0]] = [];console.log('created an array in seatObjectA named '+indexes[0]) }
}


else if (indexes.length === 1){
  if(!seatObjectA[indexes[0]].position){console.log('seatObjectA value without position =');console.log(indexes);console.log(seatObjectA)}
if(indexes[0] === 'bet'){'changing bet text location'} 
stagesToUpdate.push(self.setItemLocationsInItemAEqualToOnesInItemB(seatObjectA[indexes[0]], value, options))
}//if indexes.length == 1
else if (indexes.length === 2){

if(indexes[0] === 'chips'){return} //don't copy actual chip image locations, we only use the reference

if( _.isUndefined(seatObjectA[indexes[0]][indexes[1]])){console.log('setseatobjectlocationA value undefined');console.log(seatObjectA);console.log(indexes);console.log(value)}
else if(!seatObjectA[indexes[0]][indexes[1]].position){console.log('seatObjectA value without position =');console.log(indexes);console.log(seatObjectA)}


//move the chips to the appropriate point useing our referenceChips array
if(indexes[0] === 'referenceChips' && _.isObject(seatObjectA['chips'][indexes[1]])){
//if we are copying chip (premade) locations, we want to copy them to actual chip stack in addition to reference
//console.log('changing chips locations from chipReference array: ');console.log(value)
//console.log('pre change position: '+seatObjectA['chips'][indexes[1]].position.x+', '+seatObjectA['chips'][indexes[1]].position.y)
stagesToUpdate.push (self.setItemLocationsInItemAEqualToOnesInItemB(seatObjectA['chips'][indexes[1]], value, options ))
//console.log('post change position: '+seatObjectA['chips'][indexes[1]].position.x+', '+seatObjectA['chips'][indexes[1]].position.y)
}//if copying from chipReference array


//"perform normal copy"
 stagesToUpdate.push  (self.setItemLocationsInItemAEqualToOnesInItemB(seatObjectA[indexes[0]][indexes[1]], value, options))

}//if indexes.length == 2
}//performIfObject 
)

 options.permanent = permanent 
   options.movementType = movementType 
if(options.updateStageStatus === true){
if(options && options.update === true){self.updateStages(stagesToUpdate)}
else{return stagesToUpdate}
}


}

//performIfObject will be passed parmeters [value, index]
this.iterateThroughObjectAndPerformOnAllObjectsOrObjectsInArray = function(seatObject, performIfObject){

_.each(seatObject, function(value,index,list) {
 // for (var item in this.images.seats[i]) {

if (_.isArray(value)){
performIfObject(value, [index])
_.each(_.range(value.length),function(arrayIndex){//iterate through array
  if(_.isObject(value[arrayIndex]) && !_.isArray(value[arrayIndex])){//make sure its item
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
if(!options){var options = {}}

 //console.log('current displayed as seat # '+ this.images.seats[self.gameState.userSeatNumber].rotatedSeatNumber +'changing userseat view to '+seatNumberToRotateTo)
/*if(permanentPreferences.changeUserSeatViewTo.value == ['bottom','middle']){}
  else{return 'change view when seated setting is off'}*/

 if(!_.isNumber(seatNumberToRotateTo)){var seatNumberToRotateTo = 0}
if(seatNumberToRotateTo > this.gameState.numSeats){ console.log( 'seatNumber too high to rotate to, invalid');return}

var stagesToUpdate = []

//console.log('userseatnumber = '+ self.gameState.userSeatNumber+ ' rotating to seat: '+seatNumberToRotateTo + ' current rotatedSeatNumber of seat0 = ' + self.images.seats[0].rotatedSeatNumber)
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

//console.log('clockwise rotation based on unrotated position = '+ clockWiseRotationNumberBasedOnUnRotatedPosition)
 var rotatedSeatNumberArray = []
 var nonRotatedSeatNumberArray = []

for(var i = 0;i<this.gameState.numSeats;i++){
rotatedSeatNumberArray.push (self.images.seats[i].rotatedSeatNumber)
nonRotatedSeatNumberArray.push (self.images.seats[i].nonRotatedSeatNumber)
}//end iteration through this.images.seats
//console.log('displaying pre-rotation rotatedSeatNumbers, followed by nonRotatedSeatNumbers')
//console.log(rotatedSeatNumberArray)
//console.log(nonRotatedSeatNumberArray)
rotatedSeatNumberArray.length = 0
nonRotatedSeatNumberArray.length  = 0
//iterate through seats to get and copy image location data
for(var i = 0;i<this.gameState.numSeats;i++){
temporaryArrayOfNonrotatedSeats[self.images.seats[i].rotatedSeatNumber] = self.copySeatObjectItemLocationData(this.images.seats[i])
}//end iteration through this.images.seats

var seatMessages = []
//console.log(temporaryArrayOfNonrotatedSeats)
//iterate through seats to swap image location data
 // console.log('beginning iteration through this.images.seats')
for(var i = 0;i<this.gameState.numSeats;i++){

this.images.seats[i].rotatedSeatNumber = (i+clockWiseRotationNumberBasedOnUnRotatedPosition)%this.gameState.numSeats

self.setSeatObjectLocationsInSeatObjectAEqualToOnesInSeatObjectB(this.images.seats[i],   temporaryArrayOfNonrotatedSeats[(i+clockWiseRotationNumberBasedOnUnRotatedPosition)%this.gameState.numSeats], {updateStageStatus:false} )
compareSeatObjectAToSeatObjectB(this.images.seats[i], temporaryArrayOfNonrotatedSeats[(i+clockWiseRotationNumberBasedOnUnRotatedPosition)%this.gameState.numSeats])

rotatedSeatNumberArray.push (self.images.seats[i].rotatedSeatNumber)
nonRotatedSeatNumberArray.push (self.images.seats[i].nonRotatedSeatNumber)

//seatMessages.push (self.gameState.seats[i].displayMessageType)
}//end iteration through this.images.seats

//perform check to make sure that the change has been succesfful

function compareSeatObjectAToSeatObjectB (seatObjectA, seatObjectB){

var errorIndex = []
self.iterateThroughObjectAndPerformOnAllObjectsOrObjectsInArray(seatObjectA, function(value, indexes){

if(_.isArray(value) || _.isEmpty(value) ){return}
if(indexes[0] === 'chips'){indexes[0] = 'referenceChips'}

  if (indexes.length === 1){

if(value.position.x !== seatObjectB[indexes[0]].position.x){errorIndex.push(indexes)}
else if(value.position.y !== seatObjectB[indexes[0]].position.y){errorIndex.push(indexes)}

  }
else if(indexes.length === 2){

  if(value.position.x !== seatObjectB[indexes[0]][indexes[1]].position.x){errorIndex.push(indexes)}
else if(value.position.y !== seatObjectB[indexes[0]][indexes[1]].position.y){errorIndex.push(indexes)}
}

})

if(errorIndex.length >0){
console.log('compared seat objects')
console.log(seatObjectA)
console.log(seatObjectB)
  console.log('the following are not equal');console.log(_.flatten(errorIndex))}
}
/*
if (_.isNumber(self.gameState.userSeatNumber)){
self.hideChildren(self.images.seats[self.gameState.userSeatNumber].seat)
}
*/
var seatVisible = []
for(var i = 0;i<this.gameState.numSeats;i++){
seatVisible.push(self.images.seats[i].seat.isDisplayed())
//seatVisible.push(self.images.seats[i].seat.image.isVisible())
}//end iteration through this.images.seats
//console.log('check which seats have the seat displayed ' + seatMessages)
//console.log(seatMessages)
//console.log(seatVisible)

/*
console.log('current rotatedSeatNumber of seat0 = ' + self.images.seats[0].rotatedSeatNumber)

console.log('displaying post-rotation rotatedSeatNumbers, followed by nonRotatedSeatNumbers')
console.log(rotatedSeatNumberArray)
console.log(nonRotatedSeatNumberArray)

*/

 //self.displayCorrectSeatItems(null, {update:false})
 //correct we want to redisplay all chip stacks

 var currentBets = self.getCurrentBetSizes()
 _.each(currentBets, function(value, index, list){

if(self.images.seats[index].bet.isDisplayed()){var displayBetSize = true}
  else{var displayBetSize = false}

if(displayBetSize){
stagesToUpdate.push(self.displayChipStack(value, self.images.seats[index], {displayChipStackSize:true, update:false} ) )
}


 })//iterate through currentbets


 if(_.isNumber(self.gameState.dealer)){self.animateDealerButton(self.gameState.dealer, 4)}
this.updateStages(null, {forceUpdate:true})

//self.hideChildren(self.images.seats[0].seat)
//self.displayChildren(self.images.seats[0].seat)
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
            var distanceX = (totalLength - self.images.seats[0].seat.size.x*2)/6

self.iterateThroughObjectAndPerformOnAllObjectsOrObjectsInArray(self.images.seats[1], addAbsoluteDistanceX)
self.iterateThroughObjectAndPerformOnAllObjectsOrObjectsInArray(self.images.seats[4], addAbsoluteDistanceX)
distanceX = distanceX*-1
self.iterateThroughObjectAndPerformOnAllObjectsOrObjectsInArray(self.images.seats[6], addAbsoluteDistanceX)
self.iterateThroughObjectAndPerformOnAllObjectsOrObjectsInArray(self.images.seats[9], addAbsoluteDistanceX)


function addAbsoluteDistanceX (value, indexes){

 if(value instanceof self.images.Item){
  self.setImageItemPositionAndTextBasedOnImageChange(value, distanceX, 0, {permanent:true, movementType:'relative'})

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
  //first  set original seats (that have been taken outdue to number of seats changing) back in place
for (var originalSeatNumber = 0;originalSeatNumber<this.images.seats.length;originalSeatNumber++){

//take out original seat and push to end of array
    this.images.seats.push(this.images.seats.splice(this.getSeatImageIndex(originalSeatNumber, 'originalSeatNumber'),1)[0])

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

var setOrGetDisplayStatusOfCanvasDivByStageNumberOrItemTrueDisplaysFalseHidesOtherGets = function(stageNumberOrItem, status){

    var stageParent = self.getParentOfStageObject(stageNumberOrItem)
var div = stageParent.div

if(status === true){var display = 'inline'}
  else if (status === false){var display = 'none'}
    else{

var status = $(div).css('display')
if(status === 'none' || status === 'hidden'){return false}
else{return true}

    }//if we are getting

if(!_.isObject(div)){console.log(stageNumberOrItem);throw'display status error'}
$(div).css('display', display)

}

    this.displayShownCard = function (cardText, parentItem, options){
        
      //  parentItem.text.text= cardText
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

      parentItem.bitmapAnimation = new createjs.BitmapAnimation(this.images.fourColorSprite)
      parentItem.bitmapAnimation.x = parentItem.position.x
      parentItem.bitmapAnimation.y = parentItem.position.y

      parentItem.bitmapAnimation.gotoAndStop()

      */
      if(!options){var options = {}}
        var update = options.update
      options.update = false
var stagesToUpdate = []

   stagesToUpdate.push(   this.images.cardAsBitmap(parentItem,cardText) )
 stagesToUpdate.push( this.displayChildren(parentItem, options) )
options.update = update
      if(update!== false){self.updateStages(stagesToUpdate) }
     else{ return stagesToUpdate}

    }

        this.displayHoleCards = function (hand, seatNumber, options){

self.setPreactionData('hand', 'inHand', {seat:seatNumber})
          if(!options){var options = {}}
            var update  = options.update
          options.update = false
var stagesToUpdate = []

//remove any lingering images
           stagesToUpdate.push(      this.hideChildren(this.images.seats[seatNumber].shownCards, options))

//display face up cards
  stagesToUpdate.push(        this.displayShownCard(hand[0], this.images.seats[seatNumber].shownCards[0], options))
      stagesToUpdate.push(         this.displayShownCard(hand[1], this.images.seats[seatNumber].shownCards[1], options))

//remove any facedown images
           stagesToUpdate.push(      this.hideChildren(this.images.seats[seatNumber].hiddenCards, options))     

//mask cards according to location

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

    this.easelJSDisplayObjectChanged = function(item, options){
      if(!options){var options  = {}}
if(item.isAddedToStage()){
if(options.updateStageStatus !== false){this.arrayOfParentsOfStageAndOfContainerArray[item.position.z.stage].upToDate = false}
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
    this.images.pots[i].potSize.updateText('0')
   stagesToUpdate.push( this.easelJSDisplayObjectChanged(this.images.pots[i].potSize) )
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

              if(parseFloat(specificPotSize) != parseFloat(this.images.pots[potNumber].potSize.text.text) ||  sthis.images.pots[potNumber].potSize.isDisplayed() !==  true){
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
if(parseFloat(potSize[i]) != parseFloat(this.images.pots[i].potSize.text.text) ||  this.images.pots[i].potSize.isDisplayed() !== true){
  console.log('updating pot size '+i+'with value '+ potSize[i])
  /*
 this.images.pots[i].potSize.text.text = potSize[i]
    stagesToUpdate.push(  this.easelJSDisplayObjectChanged(this.images.pots[i].potSize))
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
    stagesToUpdate.push(  this.easelJSDisplayObjectChanged(this.images.pots[i].potSize))
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
  var newTotalPotSizeText = newTotalPotSize
  if(newTotalPotSizeText != this.images.totalPotSize.text.text ){
  this.images.totalPotSize.updateText(newTotalPotSizeText)
  stagesToUpdate.push(this.easelJSDisplayObjectChanged( this.images.totalPotSize))
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
var stagesToUpdate = []
if (!options){var options = {}}
var update = options.update
options.update = false  

self.setPreactionData('permanent', 'displayMessageType', 'seat', {seat:seatNumber, server:false})
       stagesToUpdate.push (updateItemText(this.images.seats[seatNumber].playerName, playerName))
       //this.images.seats[seatNumber].playerName.text.text =  playerName
        if(_.isNumber(chips)){
//stagesToUpdate.push (self.images.seats[seatNumber].status.updateText( chips, options))
stagesToUpdate.push (self.images.seats[seatNumber].stackSize.updateText(chips, options))
        }

       
       options.update = update
     stagesToUpdate.push  (this.displayCorrectSeatItems(seatNumber, options))
     if(options.update === false) {return stagesToUpdate}
      else{self.updateStages(stagesToUpdate)}
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
      else{var stageNumber= child.parentItem.position.z.stage}

        this.arrayOfParentsOfStageAndOfContainerArray[stageNumber].containers[containerIndex].addChild(child)

    }



   //this.images.seats[i] is parent for players bets, this.images.pots[i] is parent for pots
    this.displayChipStack = function(chipAmount, parentOfChipArray, originalOptions){
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

//console.log('displaychipStack called, parentOfChipArray is:');console.log(parentOfChipArray)




//default initial x and y
      if(parentOfChipArray.firstChip instanceof this.images.Item){
       defaultOptions.initialX = parentOfChipArray.firstChip.position.x
        defaultOptions.initialY = parentOfChipArray.firstChip.position.y
defaultOptions.z = parentOfChipArray.firstChip.position.z
      }

//default distance between chip columns
 if(parentOfChipArray.secondColumnChip instanceof this.images.Item && parentOfChipArray.firstChip instanceof this.images.Item){ 
       defaultOptions.distanceBetweenColumns = parentOfChipArray.secondColumnChip.position.x - parentOfChipArray.firstChip.position.x 
    defaultOptions.z = parentOfChipArray.secondColumnChip.position.z
    }
                    else{  
                       defaultOptions.distanceBetweenColumns = this.images.pots[0].secondColumnChip.position.x - this.images.pots[0].firstChip.position.x 
                    }

  //get default item to display size of chip stack
if(parentOfChipArray.potSize instanceof this.images.Item){
  defaultOptions.chipStackSizeItem = parentOfChipArray.potSize 
  if(!defaultOptions.z) {defaultOptions.z = defaultOptions.chipStackSizeItem.position.z}
}
  else if(parentOfChipArray.bet instanceof this.images.Item){
    defaultOptions.chipStackSizeItem = parentOfChipArray.bet 
 if(!defaultOptions.z){defaultOptions.z = defaultOptions.chipStackSizeItem.position.z}
  }

//get defaultZ position
if(!_.isObject(defaultOptions.z)){defaultOptions.z = getZ('chipAnimation')}

//assign defaults
      _.defaults(options, defaultOptions) 

//console.log('options =');console.log(options)

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
sizeItem.updateText(totalChipAmount)
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

//position the text to its position
self.setImageItemPositionAndTextBasedOnImageChange(sizeItem)

//determine intended positioning of size item
if(sizeItem.position.x >= maxRightX ){ var sizeLatitudePositioning = 'right'}
else if( sizeItem.position.x + sizeItem.size.x <= maxLeftX){ console.log('maxLEfftX = '+maxLeftX);var sizeLatitudePositioning = 'left'}

if(sizeItem.position.y >= maxBottomY ){ var sizeLongitudePositioning = 'bottom'}
else if( sizeItem.position.y + measuredSizeHeight <= actualTopY){ var sizeLongitudePositioning = 'top'}
  else if (sizeItem.position.y + sizeItem.size.y <= maxTopY){ var sizeLongitudePositioning = 'top'}

if(_.isObject(sizeItem.seatObjectAncestor)){
console.log('we are adjusting the betsize text of seat: '+ sizeItem.seatObjectAncestor.nonRotatedSeatNumber + ', displayed in seat position: '+sizeItem.seatObjectAncestor.rotatedSeatNumber)
console.log('chipDirection is: ' + chipDirection)
console.log('left right positioning: ' + sizeLatitudePositioning)
console.log('bottom top positioning: ' + sizeLongitudePositioning)

}//log bet size text


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

 //console.log ('ratio = '+sizePositionToItemPositionRatio)
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

//console.log('adjusted size item based on '+ sizeLatitudePositioning + ' '+sizeLongitudePositioning)
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
       var chipArray = parentOfChipArray[options.chipArrayName]
       
//get z position
if(chipArray[0] instanceof self.images.Item){var z = chipArray[0].position.z}
else if(_.isObject(options.z)){var z = options.z}
  else if(_.isString(options.z)){var z = getZ(options.z)}
    else{var z = getZ('chipAnimation')}

       //different chip values have different colors
        if(chipValue == 10000000){
           chipColor = '#CC6600'
           chipValue = "10M"
       }
               if(chipValue == 5000000){
           chipColor = '#CC6600'
           chipValue = "5M"
       }
               if(chipValue == 1000000){
           chipColor = '#CC6600'
           chipValue = "1M"
       }
               if(chipValue == 100000){
           chipColor = '#CC6600'
           chipValue = "100k"
       }
               if(chipValue == 10000){
           chipColor = '#CC6600'
           chipValue = "10k"
       }
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
var chipImageSource = permanentPreferences.sourceObjects.value.chips['10']
}
  else   if(chipColor == 'red'){
           var chipImageSource = permanentPreferences.sourceObjects.value.chips.red
       }
       else if(chipColor == 'black'){
            var chipImageSource = permanentPreferences.sourceObjects.value.chips.black

       }
       else{ var chipImageSource = permanentPreferences.sourceObjects.value.chips.black}



       chipArray.push(new this.images.Item(x,y,diameter, diameter, z))
        _.last(chipArray).addBitmap(chipImageSource) 
 
_.last(chipArray).text =  new createjs.Text(chipValue, '7px ' + permanentPreferences.defaultFontType.value, 'white')
_.last(chipArray).text.x = _.last(chipArray).position.x + parentOfChipArray[options.chipArrayName][parentOfChipArray[options.chipArrayName].length-1].size.x/2
_.last(chipArray).text.y = _.last(chipArray).position.y+4.5
_.last(chipArray).text.baseline = 'top'
_.last(chipArray).text.textAlign = 'center'
_.last(chipArray).text.maxWidth = _.last(chipArray).size.x*.8

//remove previous text instances UNLESS last one in the column
for(var i   = 0; i<parentOfChipArray[options.chipArrayName].length-1;i++){

    if(i == 0 || (i+1)%self.imageData.maxChipsPerColumn != 0){
    this.hideText(chipArray[i], {update:false})
    chipArray[i].text = null
    }
}
 if(options && options.hidden === true){}
  else{
//console.log('displaying a chip')
    return (this.displayChildren(chipArray, options) )}


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

animationInfo.maxDepth = animationInfo.maxDepth + 1
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
      for(var i = 0;i<animationInfo.animatedItems.length;i++){self.easelJSDisplayObjectChanged(animationInfo.animatedItems[i])}
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
      for(var i = 0;i<animationInfo.animatedItems.length;i++){self.easelJSDisplayObjectChanged(animationInfo.animatedItems[i])}

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

  var currentPosition =  getDisplayObjectPositionAndSizeData(imageOrText, {size:false})

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


this.setImageItemPositionAndTextBasedOnImageChange = function(item, newX, newY, options){

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
moveItem(value, newX, newY)
})//iterate through item

//restore options that were changed
options.maxDepth = options.maxDepth+1
options.movementType  = movementType
}//if array or collection of items

else {return moveItem(item, newX, newY)}

function moveItem (item, newX, newY){

if(item instanceof self.images.Item){//if NOT an array or collection of Items
var hasImage = false; var hasText = false;

if(options.movementType === 'relative' && _.isObject(item.text) && !item.image && !_.isNaN(parseFloat(item.text.text)))
{
 // console.log(item.text.text + 'going to be moved ' + newX +' to the right and '+ newY + ' down')
}

if(_.isObject(item.image) ){var hasImage = true;  var previousImageLocation = getDisplayObjectPositionAndSizeData(item.image, {size:false})}
  if(_.isObject(item.text) ){var hasText = true;  var previousTextLocation = getDisplayObjectPositionAndSizeData(item.text, {size:false})}

if(!_.isNumber(newX)){
if(hasImage){var deltaX = item.position.x - previousImageLocation.x}
  else if (hasText){var deltaX = item.position.x - previousTextLocation.x}
    else{var deltaX = 0}
}//if no X is given
else{var deltaX = newX}//if parameter is a number

  if(!_.isNumber(newY)){
if(hasImage){var deltaY = item.position.y - previousImageLocation.y}
  else if (hasText){var deltaY = item.position.y - previousTextLocation.y}
    else{var deltaY = 0}
}//if no X is given
else{var deltaY = newY}//if parameter is a number

if( options.movementType === 'relative'){
  if(_.isNumber(newX)){ var  deltaX = newX  }
 if(_.isNumber(newY)){ var deltaY = newY}
}//if relative movement

else{//absolute movement

   if(_.isNumber(newX)){ 
if(hasImage){var deltaX = newX - previousImageLocation.x}
  else if (hasText){var deltaX = newX - previousTextLocation.x}
    else{var deltaX = newX - item.position.x}
     }//if newX is given

  if(_.isNumber(newY)){ 
if(hasImage){var deltaY = newY - previousImageLocation.y}
  else if (hasText){var deltaY = newY - previousTextLocation.y}
    else{var deltaY = newY - item.position.y}
}//if newY is gven
}//if absolute movement

//change position data if permanet is true
if(options.permanent === true){
  if(_.isNumber(newX) && options.movementType !== 'relative'){ item.position.x = newX}
    else{item.position.x = item.position.x + deltaX}
      if(_.isNumber(newY) && options.movementType !== 'relative'){ item.position.y = newY}
    else{item.position.y = item.position.y + deltaY}
}

//check to make sure we are actually changing image. if not return
if(deltaX === 0 && deltaY === 0){return}


//IMAGE
if(hasImage ){
var newImageX = previousImageLocation.x + deltaX
var newImageY = previousImageLocation.y + deltaY

  stagesToUpdate.push (setDisplayObjectPositionData(item.image, {x:newImageX, y:newImageY}))

if(options.updateStageStatus !== false){stagesToUpdate.push(self.easelJSDisplayObjectChanged(item))}

}

//TEXT
if(hasText){

//check if image was moved
  newTextX = previousTextLocation.x + deltaX
newTextY = previousTextLocation.y + deltaY

     setDisplayObjectPositionData(item.text, {x:newTextX, y:newTextY})

if(!hasImage && options.updateStageStatus !== false){stagesToUpdate.push(self.easelJSDisplayObjectChanged(item))}

}


}//if NOT array/object of items
/*
if(hasTExt && !hasIm && !_.isNaN(parseFloat(item.text.text))){
if(!previousTextLocation){console.log(item.text)}
  console.log(item.text.text + ' moved from: '+previousTextLocation.x +', '+ previousTextLocation.y+' moved to: '+textX+', ' + textY)
}*/

}//function move Items




options.update = update
if(options.update !== false){this.updateStages(stagesToUpdate)}
  else{return stagesToUpdate}



}


var setDisplayObjectPositionData = function(imageOrText, positionData, options){
 if(!_.isObject(imageOrText) || !_.isObject(positionData) || _.isEmpty(positionData)){return}
  if(!options){var options  = {}}
//console.log('setDisplayObjectPositionData called')
//console.log(imageOrText)

var x = positionData.x
var y = positionData.y
var newOuterWidth = positionData.width
var newOuterHeight = positionData.height

if(imageOrText instanceof createjs.DisplayObject){

var changed = false

//GET DATA
var position = false;var size = false; var maxSize = false
if(_.isNumber(x) || _.isNumber(y)){position = true}
  if(_.isNumber(newOuterWidth) || _.isNumber(newOuterHeight)){ size = true;maxSize = true}
 var data = getDisplayObjectPositionAndSizeData(imageOrText, {size:size, maxSize:maxSize, position:position})

//ADJUST POSITIONS
if(_.isNumber(x) && x != data.x){imageOrText.x = x;changed = true}
if(_.isNumber(y) && y != data.y){imageOrText.y = y;changed = true}


if(_.isNumber(newOuterWidth) || _.isNumber(newOuterHeight)){

 var maxWidth = data.maxWidth; var maxHeight = data.maxHeight
var currentWidth = data.outerWidth; var currentHeight = data.outerHeight

//GET CURRENT MASKS for current width/heights
var currentMask = imageOrText.mask

if(currentMask instanceof createjs.Rectangle){

 var maskX = currentMask.x
 var maskY = currentMask.y

}//if we have defaults from mask

var restoreWidth = false; var restoreHeight = false
var newWidth; var newHeight;

//WIDTH
if(_.isNumber(newOuterWidth) ){
  //assign default height
  if(_.isNumber(currentHeight)){newHeight = currentHeight}
    else{ newHeight = maxHeight}

if( newOuterWidth < maxWidth){  newWidth = newOuterWidth}
  else{
     newWidth = maxWidth
    restoreWidth = true
  }
}//if width specified

//HEIGHT
if(_.isNumber(newOuterHeight) ){
  //assign default width
if(!_.isNumber(newWidth)){newWidth = currentWidth} 
  if(!_.isNumber(newWidth)){newWidth = maxWidth}
if (newOuterHeight < maxHeight){ newHeight = newOuterHeight}
else{
   newHeight = maxHeight
  restoreHeight = true
}
}//if height specified

if(_.isNumber(maskX)){var x = maskX}
  else{var x = 0}

    if(_.isNumber(maskY)){var y = maskY}
  else{var y = 0}

//if values too high or invalid for both make a null rectangle
if(restoreWidth === true && restoreHeight === true){imageOrText.mask = null}
else if(!_.isNumber(newWidth) && !_.isNumber(newHeight)){}
else if(_.isNumber(newWidth) && _.isNumber(newHeight) && (newWidth != currentWidth || newHeight != currentHeight)){

if(options.scale){imageOrText.scaleX = newWidth/currentWidth;imageOrText.scaleY = newHeight/currentHeight}
 else {imageOrText.mask = new createjs.Rectangle(x, y, newWidth, newHeight)}

}

//updated CHANGED variable
if(newWidth != currentWidth || newHeight != currentHeight){changed = true}

//-------- finish setting width///height


}//if width or height needs to be changed

if(changed === true && imageOrText.parent instanceof createjs.DisplayObject){
var stage = imageOrText.getStage()

if(stage instanceof createjs.Stage){

var canvasID = stage.canvas.id
var canvasNumber = canvasID.replace('canvas', '')

setStageUpdateStatus(parseInt(canvasNumber), false)
  return canvasNumber
}


}//we might return which stage needs to be updated



//if(options.updateStageStatus !== false){return self.easelJSDisplayObjectChanged()}

}//if easeljs DisplayObject


else if (_.isElement(imageOrText)){//if html element
//console.log('display object position set as element')



var cssOptions = {}

if(_.isNumber(x)){cssOptions['left'] = x /*- data.paddingWidth/2 - data.borderWidth/2*/ ; var setPosition = true}
if(_.isNumber(y)){cssOptions['top'] = y /*- data.paddingHeight/2 - data.borderHeight/2*/; var setPosition = true}
if(setPosition){  cssOptions['position'] = 'absolute'}



if(_.isNumber(newOuterWidth) || _.isNumber(newOuterHeight)){

var data = getDisplayObjectPositionAndSizeData(imageOrText, {position:false, size:true})

if(_.isNumber(newOuterWidth)){
  cssOptions['width'] = (newOuterWidth - data.extraWidth) + 'px'
//cssOptions['max-width'] = (newOuterWidth - data.extraWidth) + 'px'
}
if(_.isNumber(newOuterHeight)){
  cssOptions['height'] = (newOuterHeight - data.extraHeight) + 'px'
 // cssOptions['max-height'] = (newOuterHeight - data.extraHeight) + 'px'

//NOW ADJUST LINE HEIGHT

 var oldLineHeight = $(imageOrText).css('line-height')
//MAKE SURE old line height is pixel based
if($(imageOrText).is('p') && _.isString(oldLineHeight) && oldLineHeight.indexOf('px') !== -1){
 
 cssOptions['line-height'] = parseInt(oldLineHeight)*((newOuterHeight - data.extraHeight)/ data.contentHeight) + 'px'

/*
 if($(imageOrText).attr('type') === 'button'){

  console.log('we are going to adjust line-height of button from: ' + oldLineHeight + ' to '+  cssOptions['line-height'])
  console.log(imageOrText)}

}
*/

}//of adjusting height, we also ned to adjust line-height

}//if we need to adjust height

}//if we need to adjust size

    $(imageOrText).css(cssOptions)



if(_.isNumber(x)){
  var left = parseInt($(imageOrText).css('left'))
  if(_.isNaN(left) || left < x - 12 || x > x + 12 /*|| left < 0*/){
    console.log('cssleft =  ' + left + ', assigned x = ' + x)
    console.log(imageOrText)
    console.log(cssOptions)
    throw 'getDisplayObjectPositionAndSizeData failed X'}
}
if(_.isNumber(y)){
  var top = parseInt($(imageOrText).css('top'))
  if(_.isNaN(top) || top < y - 12 || top > y + 12 /*|| top < 0*/){
    console.log('csstop =  ' + top + ', assigned y = ' + y)
    console.log(imageOrText)
    console.log(cssOptions)
    throw'getDisplayObjectPositionAndSizeData failed Y'}

}

}//if html element

}//function to set displayobject position

var getDisplayObjectPositionAndSizeData = function(imageOrText, options){
if(!options){var options = {}}

if(imageOrText instanceof createjs.DisplayObject){

var data =  {}

if(options.position !== false){data.x = imageOrText.x;data.y = imageOrText.y}

if(options.size !== false){
//REPLACE OUTER WIDTH/HEIGHT for current width/heights IF object is masked

var currentBounds; var currentSourceRect

if(imageOrText.mask){ currentBounds = imageOrText.mask}

if(currentBounds instanceof createjs.Rectangle){


}//if we have defaults from mask

else if(currentBounds instanceof createjs.Shape){
//  console.log('getting current bounds of current bounds')
currentBounds = currentBounds.getBounds()

}

if(currentBounds instanceof createjs.Rectangle != true){currentBounds = imageOrText.getBounds()}
  if(currentBounds instanceof createjs.Rectangle != true){
//console.log('manually applying parent size')
//console.log(imageOrText)
//console.log(currentBounds)
currentBounds = {width:imageOrText.parentItem.size.x, height:imageOrText.parentItem.size.y}

  }
  else{
   // console.log('currentbound retreived as rectangle instance')
  }

//DECREASE CURRENT BOUNDS BY SOURCE RECT AMOUNT
if(imageOrText instanceof createjs.Bitmap && imageOrText.sourceRect instanceof createjs.Rectangle)
{
  if(_.isNumber(imageOrText.sourceRect.width) && imageOrText.sourceRect.width < currentBounds.width){
      currentBounds.width = imageOrText.sourceRect.width 
  }
    if(_.isNumber(imageOrText.sourceRect.height) && imageOrText.sourceRect.height < currentBounds.height){
      currentBounds.height = imageOrText.sourceRect.height 
  }
}

//console.log('retreived current bounds for size on getDisplayObjectPositionAndSizeData')
//console.log(currentBounds)

  data.extraWidth=0
  data.paddingWidth=0
  data.marginWidth=0
  data.borderWidth=0
   data.contentWidth=currentBounds.width
   data.outerWidth=currentBounds.width

  data.extraHeight=0
  data.paddingHeight=0
  data.borderHeight=0
  data.marginHeight=0
    data.contentHeight = currentBounds.height
  data.outerHeight=currentBounds.height


}



if(options.maxSize){
//============GET OUTER AND MAX WIDTH/HEIGHTS==========

//RECTANGLE/BITMAP width/heights
if(imageOrText instanceof createjs.Rectangle){

  maxWidth = imageOrText.width; maxHeight = imageOrText.height



}

else if(imageOrText instanceof createjs.Bitmap){
  maxWidth = imageOrText.image.width; maxHeight = imageOrText.image.height
//decrease as necessary if source rect
if(imageOrText.sourceRect instanceof createjs.Rectangle){
  if(_.isNumber(imageOrText.sourceRect.width) && imageOrText.sourceRect.width < maxWidth){
      maxWidth = imageOrText.sourceRect.width 
  }
    if(_.isNumber(imageOrText.sourceRect.height) && imageOrText.sourceRect.height < maxHeight){
      maxHeight = imageOrText.sourceRect.height 
  }

}//if we have a source rectangle

}

//SHAPE width/heights
else if(imageOrText instanceof createjs.Shape){
  //IF PARENT WE USE GIVEN DATA
if(imageOrText.parentItem instanceof self.images.Item){maxWidth = imageOrText.parentItem.size.x; maxHeight = imageOrText.parentItem.size.y}
 //if not parent, we give the default infinite height/width
 else{ maxWidth = self.getParentOfStageObject(0).stage.canvas.width; maxHeight = self.getParentOfStageObject(0).stage.canvas.height}

 }//if non-rectangle shape

 //TEXT width/heights
 else if(imageOrText instanceof createjs.Text){

  maxWidth = self.jQueryObjects.canvasDiv.outerWidth(true)
      maxHeight = self.jQueryObjects.canvasDiv.outerHeight(true)

if(_.isNumber(imageOrText.maxWidth) && imageOrText.maxWidth < maxWidth){maxWidth = imageOrText.maxWidth}
if(_.isNumber(imageOrText.lineWidth) && imageOrText.lineWidth < maxWidth){maxWidth = imageOrText.lineWidth}

 }

 //OTHER DISPAYOBJECT width/heights
 else{//if other type of display object
var bounds = imageOrText.getBounds()
if(bounds instanceof createjs.DisplayObject != true){console.log(imageOrText)}
maxWidth = bounds.width
maxHeight = bounds.height
 }//if other type of display object



  data.maxHeight = maxHeight
   data.maxWidth = maxWidth
}//if options.maxSize


}//if gettin data of EASELJS displayobject

else if (_.isElement(imageOrText)){// var location = {x:  parseFloat($(imageOrText).css('left')), y: parseFloat($(imageOrText).css('top'))}

var data = {}
var element = imageOrText

if(options.position !== false){

data.x = parseFloat($(element).css('left'))
data.y = parseFloat($(element).css('top'))

if(_.isNaN(data.x) || _.isNaN(data.y)){var invalidLocation = true}//check to see if our location is invalid

}

var elementClass = $(element).attr('class')

//CHECK TO SEE IF ITS NON VENDOR
if(_.isString(elementClass) && elementClass.indexOf(self.css.noFat) !== -1){
  data.extraWidth = 0
 // data.outerWidth = 0
//data.contentWidth = 0
  data.extraHeight = 0
 // data.outerHeight = 0
//data.contentHeight = 0
  var foundSize = true
}

if(invalidLocation || (options.size !== false || !foundSize)){
//'DISPLAY' the element in order to do get data on it from jquery functions
var initialDisplay = $(element).css('display')
//console.log('initialDisplay = '+initialDisplay)
//console.log(initialDisplay.length)
var initialPointerEvents = $(element).css('pointer-events')
//var initialX = $(element).css('left')
//var initialY = $(element).css('top')
if(initialDisplay === 'none'){
//move item way off screen
$(element).css({
  'display':'hidden'
  ,'pointer-events':'none'
 // ,'left':-99999
//,'top':-999999

})

//console.log('element display = ' + $(element).css('display') )
}//if we need to 'DISPLAY' the element

//else{console.log(initialDisplay + ' not equal to none')}

data.outerWidth = $(element).outerWidth(true)
data.contentWidth = $(element).width()
data.extraWidth  =  data.outerWidth - data.contentWidth 
//data.paddingWidth = $(element).innerWidth() - data.contentWidth 
//data.marginWidth = data.outerWidth - $(element).outerWidth()

data.outerHeight = $(element).outerHeight(true)
data.contentHeight = $(element).height()
data.extraHeight =  data.outerHeight - data.contentHeight

//get currentHeight/currentWidth
if($(element).is('p')){
var dimensions = $(element).textDimensions($(element).text(), self.jQueryObjects.pokerTableDiv);
data.currentWidth = dimensions.width   + data.outerWidth - data.contentWidth
data.currentHeight = dimensions.height + data.outerHeight - data.contentHeight
//console.log('dimensions of: '+$(element).text() + ', display = ' + $(element).css('display'))
//console.log(dimensions)
}

else{

data.currentWidth = data.outerWidth
data.curentHeight = data.outerHeight

}


//data.paddingHeight = $(element).innerHeight() - data.contentHeight
//data.marginHeight = data.outerHeight - $(element).outerHeight()

if(invalidLocation){
  console.log('nan of get display object element position, using jquery position function')
  console.log($(element) )
  console.log(data)

//  throw 'nanof get display object position'

var location = $(element).position()
console.log(location)
if(_.isNaN(data.x)){data.x = location.left - data.extraWidth/2}
//else if(left !== location.left){console.log(location);console.log(left); throw 'position.left and cssleft dont match'}


if(_.isNaN(data.y)){data.y = location.top  - data.extraHeight/2}
//else if(data.y !== location.top){console.log(location);console.log(top); throw 'position.top and csstop dont match'}


} //if x or y is not a number/or is nan

if(initialDisplay === 'none' || initialPointerEvents !== 'none'){

$(element).css({
  'display': initialDisplay
  ,'pointer-events':initialPointerEvents
 // ,'left':initialX
//,'top':initialY

})


}//restore the element to its original position and visibility

}//if we need to display, then hide the item


if(_.isNaN(data.x) || _.isNaN(data.y) || _.isNaN(data.extraWidth) || _.isNaN(data.extraHeight) 
  || !_.isNumber(data.extraWidth) || !_.isNumber(data.extraHeight)){

console.log('invalidlocation = ' + invalidLocation)
console.log('foundsize = ' + foundSize)
console.log(options)
console.log(data)
console.log(element)
//console.error('failed at getting position data')
throw 'failed at getting position data'
}


//GET MAXSIZE If necessarY
if(options.maxSize){

var maxWidth = $(element).css('max-width')
if(_.isString(maxWidth) && maxWidth.indexOf('px') != -1){data.maxWidth = parseFloat(maxWidth)}
  else{data.maxWidth = self.jQueryObjects.canvasDiv.outerWidth(true)}


var maxHeight = $(element).css('max-height')
if(_.isString(maxHeight) && maxHeight.indexOf('px') != -1){data.maxHeight = parseFloat(maxHeight)}
  else{data.maxHeight = self.jQueryObjects.canvasDiv.outerHeight(true)}
}




}//if element

else if(_.isObject(imageOrText)){

var data =  {
  x:imageOrText.x
  ,y:imageOrText.y
  ,extraWidth:0
  ,paddingWidth:0
  ,marginWidth:0
  ,borderWidth:0
   ,contentWidth:0
  ,outerWidth:0
  ,maxWidth:0
  ,currentWidth:0

  ,extraHeight:0
  ,contentHeight:0
  ,paddingHeight:0
  ,borderHeight:0
  ,marginHeight:0
 ,outerHeight:0
 ,maxHeight:0
 ,currentHeight:0
}

}

else{console.log('getdisplayposition failed due to parameter not a display object');return {}}

if(!_.isObject(data)){
console.log(imageOrText)
console.log(options)
throw ''
}

return data

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
    var animatedCard = new this.images.Item(initialX, initialY, this.images.community[0].size.x, this.images.community[0].size.y, getZ('cardAnimation'))
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
 
 var setFlags = function(flagsObject, callUserOptionUpdateDefaultsToTrue, optionsParameter){
  if(!optionsParameter){var optionsParameter = {}}
    var options = _.clone(optionsParameter)
options.update = false

if(!_.isObject(flagsObject)){console.error(flagsObject);return}

  _.each(flagsObject, function(value, key, list){
 setOneFlagOrPreference(key, value, options)
 
 })//iteration

//console.log('setflags finished for ' + options.seat)
//console.log(self.gameState.seats[options.seat])

options.update = update
 if(callUserOptionUpdateDefaultsToTrue !== false){return self.updateUserOptionsBasedOnFlagsAndPreactions(options)}

 }

var setOneFlagOrPreference = function(flag, value, options){
if(_.isUndefined(value)){return}

var flagOptions = _.clone(options)
var defaults = {server:false}
flagOptions = _.defaults(flagOptions, defaults)

      if(flag.indexOf('sessionPreferences') !== -1){
 // console.log('session preference flag received')
 self.updatePreference(sessionPreferences, value, flagOptions)
}//if session preference

else{//if flag

switch (flag){

case 'check':
case 'fold':
case 'bet' :
case 'raise':
case 'all_in':
case 'call_any':
self.setPreactionData('hand', flag, value, flagOptions) 
break;

case 'call':
if(!_.isNumber(value)){ self.setPreactionData('hand', flag, value, flagOptions) }
else {self.setPreactionData('once', flag, value, flagOptions) }
break;

default:
self.setPreactionData('permanent', flag, value, flagOptions) 
break;

/*
case 'fold' || 'call' || 'raise' || 'bet' || 'check':
self.setPreactionData('hand',flag,value, {server:false}) 
default:
*/

}//switch statement

}// if not preference




}//set 1 flag function



this.queueExpirationFunction = function(expirationTrigger, actionFunction, options){
if(!options){var options = {}}

//if seat number is specified we push the function intot eh player's thing though normally it wont matter
  if(_.isNumber(options.seat)){var expirationObject = this.gameState.seats[options.seat][expirationTrigger]}
else{var expirationObject = this.gameState[expirationTrigger]}

//if array we just push
if(_.isArray(expirationObject.onEnd)){expirationObject.onEnd.push(actionFunction)}
else if(_.isFunction(expirationObject.onEnd)){//if function we turn it into array and preserve original functionn
  expirationObject.onEnd = [expirationObject.onEnd, actionFunction]}
  else{expirationObject.onEnd = [actionFunction]}//if nothing we create new array and put in action function
}

this.setPreactionData = function(expirationType, actionType, value, options) {
if(_.isUndefined(value)){return}
if(!options){var options = {}}
  if(options.seat === 'table'){var gameStateSeatObject = self.gameState}
else if(!_.isNumber(options.seat)) {var gameStateSeatObject = self.gameState.seats[this.gameState.userSeatNumber]}
  else{var gameStateSeatObject = self.gameState.seats[options.seat]}

if(!_.isObject(gameStateSeatObject)){return}


//var preactionOptions = self.getPreactionOptionValues()

var expirationTypesToSet = []
var otherActionTypesToSet = []
var otherActionValue = false


//if value is false we start that type of action from a clean slate, clearing everything
if(value === false || value === null || _.isUndefined(value)){
  value = false
expirationTypesToSet.push('act', 'street', 'once', 'hand', 'permanent')
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
else if(expirationType === 'permanent'){
    expirationTypesToSet.push('act', 'street', 'once','hand', 'permanent')
}
else{expirationTypesToSet.push(expirationType)}

/*
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
setValues(expirationTypesToSet, otherActionTypesToSet, otherActionValue)

}//if we want to perform clientside Logic
*/

setValues(expirationTypesToSet, actionType, value)

/*
console.log('setPreactionData completed for action: ' +actionType +' and expiration: '+expirationType+' and value of: '+value)
console.log(gameStateSeatObject)

console.log(gameStateSeatObject[expirationType][actionType])
*/

function setValues(expirationTypes, actionTypes, values){
var serverActionsSet = []
var flagsObjectToSendToServer =  {}

  if (!_.isArray(actionTypes)) {actionTypes = [actionTypes]}
    if(!_.isArray(expirationTypes)){expirationTypes = [expirationTypes]}
  

for(var i = 0;i<actionTypes.length;i++){
 if(_.isArray(values)){var valueOfFlag = values[i]}
    else{var valueOfFlag = values}

//iterate thorugh expirationTypes
for(var j = 0;j<expirationTypes.length;j++){set1Value(expirationTypes[j], actionTypes[i], valueOfFlag)}  

}//iteration through actionTypes



if(options.server === true){ socket.emit('set_flags', flagsObjectToSendToServer)}

function set1Value (expiration, action, val){

 if(options.server === true && _.indexOf(serverActionsSet, actionTypes) === -1)    {
 // socket.emit('set_flag',actionTypes, values)
  flagsObjectToSendToServer[action] = val
   serverActionsSet.push(action)// push values to make sure we dont send to server
}//sending to server
else if(options.server !== true) {gameStateSeatObject[expiration][action] = val}

}//set1Value function

}//function setValues

}

 //returns once value, then street, then hand
this.getPreactionData = function(actionType, options){

//if(actionType === 'all_in'){console.log('GETTING PREACTION DATA FOR : '+actionType)}

if(!options){var options = {}}
//console.log('GETTING PREACTION DATA CALLED FOR : ' + actionType + 'server = ' + options.server)


if(options.seat === 'table'){}
else if(!_.isNumber(options.seat) || _.isNaN(options.seat)){var seat = self.gameState.userSeatNumber}
else{var seat = options.seat}

if(!_.isNumber(seat)){var gameStateSeatObject = self.gameState}
  else{var gameStateSeatObject = self.gameState.seats[seat]}

    if(!_.isObject(gameStateSeatObject)){return}

if(!_.isFunction(options.checkFunction)){
  var checkFunction = function(value, flagsObject){

if(actionType === 'raise' || actionType === 'bet' || actionType === 'call' 
   || actionType === 'all_in' || actionType === 'call_any')
{

var preactionOptionData = self.getPreactionOptionValues()
var currentBetSizes = preactionOptionData.currentBetSizes
var currentStackSizes = preactionOptionData.currentStackSizes
var maxAllInSizes = preactionOptionData.maxAllInSizes

//MAKE IT SO PREACTION ALWAYS RETURNS FALSE IF THE VALUE IS NOT ALLOWED
  if(!_.isObject(preactionOptionData) || _.isEmpty(preactionOptionData) ){return}
else if( _.isNaN(preactionOptionData[actionType]) || preactionOptionData[actionType] === false ){ return undefined}
else if(!_.isNumber(preactionOptionData[actionType]) && preactionOptionData[actionType] !== true){return undefined}


//call_any does not use numbers
 if(actionType === 'call_any'){
if(flagsObject['call'] === true){return true}
  else{return undefined}
}//if 'call_any' flag

//check for other ways for call to be true if all in
else if(actionType === 'call'){

if(_.isNumber(value) && _.isNumber(preactionOptionData[actionType]) && value >= preactionOptionData[actionType] ){return value}
   
if(preactionOptionData.all_in === false){

if(value === true){return preactionOptionData.call}
  else if(flagsObject['all_in'] === true){return preactionOptionData.call}


}//if facing all in bet
else{//if not facing all in bet

    if(!_.isNumber(value)){return undefined}
}// not facing all in bet

}


    //if 'all_in' flag
else if(actionType === 'all_in'){

//easiest is direct checking
if(value === true){return true}

var userAllIn = preactionOptionData[actionType]
var compactedMaxSizes = _.compact(maxAllInSizes.splice(seat,1))
var allInThreshhold = userAllIn

//get highestNonUserStack
var highestNonUserStack = 0
for(var i = 0;i<compactedMaxSizes.length;i++){
if(compactedMaxSizes[i] > highestNonUserStack){highestNonUserStack = compactedMaxSizes[i] }
}

if(highestNonUserStack < userAllIn){allInThreshhold = userAllIn}


  //console.log('attempting to fetch all-in actiontype')
  if(!_.isNumber(preactionOptionData[actionType])){return undefined}
    else if (preactionOptionData[actionType] < currentBetSizes[seat] + currentStackSizes[seat]){

//console.log(preactionOptionData)
//console.log(currentBetSizes)
//console.log(currentStackSizes)
//console.log('seat = ' + seat)
      throw 'all_in value not the same as calculated from table'
    }


  var raiseFlag  = flagsObject.raise

if(!_.isNumber(raiseFlag)){return undefined}
else if(raiseFlag < allInThreshhold) {return undefined}

var betFlag = flagsObject.bet
var highBet = self.getHighBet()


if(highBet > currentBetSizes[seat] ){
  return true
 }//if NOT the highest bet we need to have just raise (which we checked for above) to qualify for all-in flag

else if(highBet === currentBetSizes[seat]){
  if(!_.isNumber(betFlag)){return}
    else if(betFlag < allInThreshhold){return}
      else{return true}
}//if highbet is the player were checking

}//if checking for all_in flag

   
  else if(value === true){return value}
  else if(_.isNumber(value) && _.isNumber(preactionOptionData[actionType]) && value >= preactionOptionData[actionType] ){return value}
    else {return undefined}

  }//if preaction value is something that has to do with a number, such as raise, bet, or call

else if(_.isUndefined(value)){return value}
 else if(_.isNaN(value)){return value}

//if autorebuy
else if(actionType === 'autorebuy'){
 // console.log('checking autorebuy in preactiondata, value = ' +value)
//  console.log(typeof value)
//  console.log(_.isNumber(value))
 // console.log(value > 0)
if(_.isNumber(value) && value > 0 ){return value}
else{return}
}

else if(actionType === 'toAct'){
if(!_.isNumber(value)){return} 
  else if(value >= 0 && value < self.gameState.numSeats){return value}
else{console.log('toAct = ' + value);throw 'inappropriate number on toAct flag';return}
}

//else if(value === true || _.isNumber(value)){return value}

else{return value}

}//checkFunction

}//assign default checkFunction
else{var checkFunction = options.checkFunction}

//console.log('getPreactionData called for actionType' + actionType)
//console.log(gameStateSeatObject)

//check in flags
var actValue = gameStateSeatObject.act[actionType]
var streetValue = gameStateSeatObject.street[actionType]
var onceValue = gameStateSeatObject.once[actionType]
var handValue = gameStateSeatObject.hand[actionType]
var permanentValue = gameStateSeatObject.permanent[actionType]

/*
if(checkFunction(actValue, gameStateSeatObject.act)){var data = {action:actionType, value:actValue, expiration:'street'}}
 else if(checkFunction(streetValue,  gameStateSeatObject.street)){var data = {action:actionType, value:streetValue, expiration:'street'}}
else  if(checkFunction(onceValue,  gameStateSeatObject.once)){var data = {action:actionType, value:onceValue, expiration:'once'}}
else if(checkFunction(handValue,  gameStateSeatObject.hand)){var data = {action:actionType, value:handValue,expiration: 'hand'}}
 else if(checkFunction(permanentValue,  gameStateSeatObject.permanent)){var data = {action:actionType, value:permanentValue, expiration:'permanent'}}
*/

var actProcessedValue = checkFunction(actValue, gameStateSeatObject.act)
var streetProcessedValue = checkFunction(streetValue, gameStateSeatObject.street)
var onceProcessedValue = checkFunction(onceValue, gameStateSeatObject.once)
var handProcessedValue = checkFunction(handValue, gameStateSeatObject.hand)
var permanentProcessedValue = checkFunction(permanentValue, gameStateSeatObject.permanent)

var useValue = function(val){
  if(_.isUndefined(val) || _.isNull(val) || _.isNaN(val)){return false}
else{return true}
}

var data = []

if(useValue(actProcessedValue)){data.push (actProcessedValue)}
if(useValue(streetProcessedValue)){ data.push (streetProcessedValue)}
if(useValue(onceProcessedValue)){data.push  (onceProcessedValue)}
if(useValue(handProcessedValue)){data.push (handProcessedValue)}
if(useValue(permanentProcessedValue)){data.push (permanentProcessedValue)}

  /*
  if(actionType === 'sitting_out'){
    console.log('sitting out flag: ' + data)
    console.log('seat = ' + seat)
console.log(gameStateSeatObject)
  }
  */

var numberTestArray = _.uniq(_.without(data, true, false))
//check if array has a number, if not do notthing
if(numberTestArray.length === 1){var finalValue = numberTestArray[0]} 
else if(numberTestArray.length > 1){
  //sort array
numberTestArray = numberTestArray.sort(function(a,b){return a-b})
var returnValue =  _.last(numberTestArray)

}//get highest number value

//if no number values present
else{
var finalValue = data[0]
}


if(actionType === 'toAct' && !_.isNumber(finalValue)){
  //console.log('toAct not a number, its  = ' + finalValue)
}

return finalValue
}

var Preference = function(value, options){

if(!options){var options = {}}
this.value = value
this.updateValue = options.updateValue

if(!_.isFunction(this.updateValue)){this.updateValue = function(newValue){
if(_.isUndefined(newValue)){return}
  this.value = newValue
}}

//get can be a function if needed
if(_.isFunction(options.get)){this.get = options.get}
  else{this.get = function(){return this.value}}

if(_.isString(options.path)){this.path = options.path}
  if(_.isString(options.type)){this.type = options.type}

}//Preference constructor


//api with preferences
var PreferencesAPI = function(){

var arrayFromDotString = function(dotString){
if(_.isString(dotString)){var array = dotString.split('.')}
else if(_.isArray(dotString)){var array = dotString}

return array
}//get array from string

var getPreferenceAncestorFromType = function(type){
if(type === 'permanent'){return permanentPreferences}
  else if (type === 'session' || type === 'temporary'){return sessionPreferences}
}

var _preferenceUtils = function(action, type, location, parameters){

if(_.isString(type)){var parentObject = getPreferenceAncestorFromType(type)}
  else{var parentObject = type}
if(!_.isObject(parentObject)){return}

  var locationArray = arrayFromDotString(location)//get array that represents location
if(!_.isArray(locationArray)){return}

var preference = parentObject
var lastValue

_.each(locationArray, function(value, index, list){
  if(index === locationArray.length-1 && action === 'create' || action === 'new'
|| ((action === 'set' || action === 'update') && !isPreference(preference[value]))

  ){ //if last item in location/path array, and we need to create a new preference

var creationOptions = {path:location}
if(_.isString(type)){creationOptions.type = type}

    if(_.isArray(parameters)){ //create preference from parameters of array, using apply prototype
      if(!_.isObject(parameters[1])){parameters[1] = {}}
_.each(creationOptions, function(value, index, list){parameters[1][index] = value})//assign creation options to parameters[1]
      preference[value] = new Preference.apply(self, parameters) 
    }//parameters given as array
      else { preference[value] = new Preference(parameters, creationOptions)      }

        lastValue = value
   }//if last item of array
  if(_.isObject(preference)){preference = preference[value]}
})//iterate through location array



if(!isPreference(preference)){return}
else if(action === 'get'){return preference.get()}
  else if(action === 'set' || action === 'update'){preference.updateValue(paramaters)}


}//_preferenceUtils, all in one function that performs various preference actions



this.isPreference = function(preference){return isPreference(preference)}//function that checks if object is preference

this.get = function(permanentOrSession, dotSeparatedStringLocation, options){

var preferenceValue = _preferenceUtils('get', permanentOrSession, dotSeparatedStringLocation, null, options)
return preferenceValue

}//preferencesAPI.get



this.set = function(permanentOrSession, dotSeparatedStringLocation, parameters, options){

var preference = _preferenceUtils('set', permanentOrSession, dotSeparatedStringLocation, parameters, options)
return preference

}//preferencesAPI.set
this.update = this.set



this.create = function(permanentOrSession, dotSeparatedStringLocation, parameters, options){

var preference = _preferenceUtils('create', permanentOrSession, dotSeparatedStringLocation, parameters, options)
return preference

}//preferencesAPI.set
this.new = this.create


}//preference API

self.preferencesAPI = new PreferencesAPI()


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
    var preactionItem = new self.images.Item(0, 0, 0, height, getZ('buttons','staticItems'))
    var preactionItemOn = new self.images.Item(0, 0, 0, height,  getZ('buttons','staticItems'))

preactionItem.addBitmap (permanentPreferences.sourceObjects.value.checkBox )
preactionItemOn.addBitmap( permanentPreferences.sourceObjects.value.checkBoxChecked)

      self.images.addCheckBoxButtonText(preactionItem, text)
      self.images.addCheckBoxButtonText(preactionItemOn, text)

if(_.isFunction(onClickUnchecked)) {
preactionItem.on('click', function(e){
   onClickUnchecked(event, preactionItem, preactionItemOn)
    self.hideChildren(preactionItem,{update:false})
    self.displayChildren(preactionItemOn)
},{text:false})
}//if unchecked function assigned

   if(_.isFunction(onClickChecked)) { 

    preactionItemOn.on('click', function(e){
      onClickChecked(event, preactionItemOn, preactionItem)
      self.hideChildren(preactionItemOn,{update:false})
      self.displayChildren(preactionItem)
},{text:false})
}//if check function assigned

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

//remove existing event listeners
self.images.preactions.callUnchecked.image.removeAllEventListeners()
self.images.preactions.callChecked.image.removeAllEventListeners()

self.images.preactions.checkUnchecked.image.removeAllEventListeners()
self.images.preactions.checkChecked.image.removeAllEventListeners()

self.images.preactions.allInUnchecked.image.removeAllEventListeners()
self.images.preactions.callUnchecked.image.removeAllEventListeners()

self.images.preactions.foldUnchecked.image.removeAllEventListeners()
self.images.preactions.foldChecked.image.removeAllEventListeners()

self.images.preactions.callAnyUnchecked.image.removeAllEventListeners()
self.images.preactions.callAnyChecked.image.removeAllEventListeners()

//ASSIGN ONCLICK FUNCTIONS
var setPreactionDataOptions = {server:true}

//==================assign onClick functions========================

//CALL


self.images.preactions.callUnchecked.on('click', function(e){

self.setPreactionData('once', 'call', self.getPreactionOptionValues().call, setPreactionDataOptions)

})
self.images.preactions.callChecked.on('click', function(e){

  self.setPreactionData('hand', 'call', false, setPreactionDataOptions)

})

//CHECK
self.images.preactions.checkUnchecked.on('click', function(e){

  self.setPreactionData('hand', 'check',  self.getPreactionOptionValues().check, setPreactionDataOptions)

})
self.images.preactions.checkChecked.on('click', function(e){

    self.setPreactionData('hand', 'check', false, setPreactionDataOptions)

})

//ALL-IN
self.images.preactions.allInUnchecked.on('click', function(e){

/*
  var data = self.getPreactionOptionValues()
  var user = self.gameState.userSeatNumber
  var allInAmount = data.currentStackSizes[user] + data.currentBetSizes[user]
  var callAllInAmount = data.currentStackSizes[user] - data.currentBetSizes[user]
*/
  self.setPreactionData('hand', 'all_in', true, setPreactionDataOptions)

})
self.images.preactions.allInChecked.on('click', function(e){

  self.setPreactionData('hand', 'all_in', false, setPreactionDataOptions)

})

//FOLD
self.images.preactions.foldUnchecked.on('click', function(e){

 //self.setPreactionData('hand', 'fold', self.getPreactionOptionValues().fold, setPreactionDataOptions)
 self.setPreactionData('hand', 'fold', true, setPreactionDataOptions)

})
self.images.preactions.foldChecked.on('click', function(e){

   self.setPreactionData('hand', 'fold', false, setPreactionDataOptions)

})

//CALL ANY
self.images.preactions.callAnyUnchecked.on('click', function(e){

  //  self.setPreactionData('hand', 'call', self.getPreactionOptionValues().call_any, setPreactionDataOptions)
self.setPreactionData('hand', 'call', true, setPreactionDataOptions)

})
self.images.preactions.callAnyChecked.on('click', function(e){

   self.setPreactionData('hand', 'call', false, setPreactionDataOptions)

})

}//create preaction options

this.getPreactionOptionValues = function (){

var userSeat = self.gameState.userSeatNumber
var currentStackSizes = self.getCurrentStackSizes()
var currentBetSizes = self.getCurrentBetSizes()
var highBet = self.getHighBet()
 var gameStateSeatObject = self.gameState.seats[userSeat]
 var justActed =  setJustActedOrPassNullToGetJustActed()

var getMinBet = function(){

if(self.images.community[3].isDisplayed()){var minBet = self.initial_table_state.small_blind}
  else{var minBet = self.initial_table_state.big_blind}

    if(!_.isNumber(minBet) || _.isNaN(minBet)){
      console.log('minbet not a number = '+minBet);
      console.log(self.gameState);
    }

  return minBet

}

var isHighBetNonUser = function() {return currentBetSizes[userSeat] === highBet}
var getUserStackSize = function(){return currentStackSizes[userSeat]}
var getUserBet = function(){return currentBetSizes[userSeat]}
  var getPlayerToAct = function(){

var toAct = self.getPreactionData('toAct', {seat:'table'})
if(!_.isNumber(toAct)){toAct = justActed}

return playerToAct
}//gets the player to act
var getMaximumAllInBetSizes = function(){

if(currentStackSizes.length !== currentBetSizes.length){
console.log(chipStacks)
console.log(betSizes)
  throw 'error'
}//if arrays not the same length

var maxSizes = []

_.each(currentStackSizes, function(value, element, list){
maxSizes[element] = currentStackSizes[element] + currentBetSizes[element]
})//iterate through them

return maxSizes
}

 var highBet = self.getHighBet();var userBet = getUserBet(); var userStackSize = getUserStackSize();
 var playerToAct = getPlayerToAct(); var maxAllInSizes = getMaximumAllInBetSizes(); var minBet = getMinBet()
 var facingAllIn = highBet > userBet && (highBet - userBet) >= userStackSize

//console.log('userBet = '+userBet + ', '+'userStackSize = ' +userStackSize)

var all_in 
var call
var call_any
var fold 
var check  
var raise 
var bet 


//console.log('get preaction values called, preactiondata to act = ')
//console.log(self.getPreactionData('toAct', {seat:'table'}))
//console.log('get preaction values called, preactiondata inhand = ')
//console.log( self.getPreactionData('inHand', {seat:userSeat}))
//console.log('can player act = '+ canPlayerActDefaultsToUser(userSeat))
//console.log('minbet = '+minBet)


if(canPlayerActDefaultsToUser(userSeat) === false){
  console.log('getPreactionOptionValues fail due to player cannot act')
}
else if (self.getPreactionData('toAct',{seat:'table'}) === userSeat ){
    console.log('getPreactionOptionValues fail due to user is to act and so cannot display preaction values')
}
else if(self.getPreactionData('inHand', {seat:userSeat}) !== true){
console.log('getPreactionOptionValues fail due to user not in hand')
}
else if (!_.isNumber(minBet) ){console.log('getPreactionOptionValues fail due to minbet not a number')}
else if(_.compact(currentStackSizes).length === 0){console.log('getPreactionOptionValues fail due to all stacksizes === 0')}
  else{
     all_in = userStackSize + userBet //set to false later if neceesary
  //display fold option
   fold = true
call_any = true

if(highBet > userBet){

  if(highBet - userBet >= userStackSize){//if we need to put our whole stack in to call
//display call option
     call = userStackSize
     all_in = false
     call_any = false
  }//if facing all-in bet
else{//if we do not need to go all in to call
  call =  highBet - userBet
  raise = highBet - userBet + highBet
  if(raise - highBet < minBet){raise = highBet  + minBet}
  if(raise - userBet > userStackSize){raise = userStackSize + userBet}
}//if not facing all-in bet

}
else if (highBet === userBet){
 bet = minBet
if(bet > userStackSize){bet = userStackSize}

  //display check option
  check = true
}//if at least one highbet value is a non-user and is equal to user bet

//CHECK if CALL_ANY is appropriate
//console.log('playerToAct = '+playerToAct)
//console.log('userSeat =  ' + userSeat)

if(_.isNumber(playerToAct) && !_.isNaN(playerToAct)){

var seatNum = playerToAct
var iterations = 0
var highestBetToFace = 0

while(seatNum !== userSeat){
//console.log('checkign seat: '+seatNum)
if(maxAllInSizes[seatNum] > highestBetToFace){highestBetToFace = maxAllInSizes[seatNum]}
iterations++
if(iterations > self.gameState.numSeats){
console.log('numiterations = ' + iterations)
console.log('maxallinsizes = ' + maxAllInSizes)
  throw 'too many iterations on determining call_any'}
  seatNum++
    if(seatNum >= maxAllInSizes.length){seatNum = (seatNum)%maxAllInSizes.length }
}//iterate from player to act until player

if(highestBetToFace > userBet && highestBetToFace > highBet){call_any = true}

}

}//if conditions are appropriate

if(_.isNaN(all_in)){
console.log('all in = nan')
  console.log(userStackSize)
console.log(userBet)
}

var  data = {check:check, all_in:all_in, fold:fold
,call:call, raise:raise, bet:bet, call_any:call_any
,currentStackSizes:currentStackSizes
,currentBetSizes:currentBetSizes
,maxAllInSizes:maxAllInSizes
,userBet:userBet
,highBet:highBet
,userStackSize:userStackSize
}
//console.log('preaction options as follows:')
//console.log(data)
return data
}


this.updatePreactionOptionDisplayBasedOnLocalData = function(options){
if(!options){var options = {}}
  var update = options.update
options.update = false
var stagesToUpdate = []

seat =  self.gameState.userSeatNumber
var currentStackSizes = this.getCurrentStackSizes()
var currentBetSizes = this.getCurrentBetSizes()

/*
console.log('detecginw WHETHER to display preaction options or not')
console.log(self.getPreactionData('toAct',{seat:'table'}))
console.log(self.getPreactionData('inHand', {seat:seat}))

console.log(canPlayerActDefaultsToUser())

console.log(canPlayerActDefaultsToUser())
*/


  //we need to hide if we are to act
if(!_.isNumber(seat) ||   self.getPreactionData('toAct', {seat:'table'}) === seat 
  || self.getPreactionData('inHand', {seat:seat}) !== true 
|| currentStackSizes[seat] <= 0 || canPlayerActDefaultsToUser() === false
 /*||  _.without(currentStackSizes, 0).length <=1 */){
 // console.log('hiding options')
stagesToUpdate.push(self.hideChildren (self.images.preactions), options)
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

  if(preactionOptions.call >= currentStackSizes[seat]){var callText = 'Call All-In'}
    else{var callText = 'Call ' + preactionOptions.call}


if(preactionOptions.check === true){
//console.log('displaying check preaction option')
 stagesToUpdate.push (updatePreactionText(this.images.preactions.checkUnchecked, this.images.preactions.checkChecked, 'Check'))

if(this.getPreactionData('check')){displayLastCheckedItem()}
  else{displayLastUncheckedItem()}

}

if(preactionOptions.fold === true){
//  console.log('displaying call preaction option')
 stagesToUpdate.push ( updatePreactionText(this.images.preactions.foldUnchecked, this.images.preactions.foldChecked, 'Fold'))

if(this.getPreactionData('fold')){displayLastCheckedItem()}
  else{displayLastUncheckedItem()}

}

var all_inFlag = this.getPreactionData('all_in')

if(_.isNumber(preactionOptions.all_in)){
//console.log('displaying allin preaction option')
stagesToUpdate.push ( updatePreactionText(this.images.preactions.allInUnchecked, this.images.preactions.allInChecked, 'All-In'))

  if(all_inFlag){displayLastCheckedItem()}
    else{displayLastUncheckedItem()}

if(_.isNumber(preactionOptions.call)){
//console.log('displaying call preaction option')

   stagesToUpdate.push ( updatePreactionText(this.images.preactions.callUnchecked, this.images.preactions.callChecked, callText))

var checkIfCallIsValid = function(value){ if(_.isNumber(value) && value === preactionOptions.call){return true}}
if(this.getPreactionData('call')){displayLastCheckedItem()}
  else{displayLastUncheckedItem()}

}



if(preactionOptions.call_any === true){
//console.log('displaying call_any preaction option')

stagesToUpdate.push (updatePreactionText(this.images.preactions.callAnyUnchecked, this.images.preactions.callAnyChecked, 'Call Any'))

  var checkIfCallAnyIsValid = function(value){if(value===true){return true}}
if(this.getPreactionData('call_any')){displayLastCheckedItem()}
  else{displayLastUncheckedItem()}

}


}//if we are displaying all_in option

//if NOT displaying all-in option, we want to display ONLY call all-in option
else if (preactionOptions.all_in === false){

   stagesToUpdate.push ( updatePreactionText(this.images.preactions.callUnchecked, this.images.preactions.callChecked, callText))

if(all_inFlag || this.getPreactionData('call')){displayLastCheckedItem()}
else{displayLastUncheckedItem()}

}//if not displaying allin option






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



function updatePreactionText (uncheckedItem, checkedItem, text){
var stagesToUpdate = []
var updateOptions = {update:false}

/*
stagesToUpdate.push ( self.images.addCheckBoxButtonText(uncheckedItem, text))
stagesToUpdate.push (self.images.addCheckBoxButtonText(checkedItem, text))
*/


if(!_.isObject(uncheckedItem.text)){stagesToUpdate.push(self.images.addCheckBoxButtonText(uncheckedItem, text))}
else{
  stagesToUpdate.push (uncheckedItem.updateText(text, updateOptions))
stagesToUpdate.push(self.images.drawCheckBoxButtonHitSquareAndAdjustItemSize(uncheckedItem))
}

if(!_.isObject(checkedItem.text)){stagesToUpdate.push(self.images.addCheckBoxButtonText(checkedItem, text))}
else{
  stagesToUpdate.push (checkedItem.updateText(text, updateOptions))
stagesToUpdate.push(self.images.drawCheckBoxButtonHitSquareAndAdjustItemSize(checkedItem))
}


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



this.clearExpirationData = function(expirationType, seat, options){
if(!options){var options = {}}

if(expirationType !==  'act'){
    this.clearExpirationData('act', seat, options)
if(expirationType !==  'once'){
this.clearExpirationData('once', seat, options)
if(expirationType !==  'street'){
this.clearExpirationData('street', seat, options)
if(expirationType !==  'hand'){
console.log('clear expiration data permanent called for seat: '+seat)
this.clearExpirationData('hand', seat, options)}//if not hand
}//if not street

}//if not once

}//if not act

//clear table data
var tableExpirationObject = self.gameState





if(_.isNumber(seat)){
var playerSeatObject = self.gameState.seats[seat]
if(!_.isEmpty(tableExpirationObject)){clearExpirationObject(playerSeatObject)}
}

  else if(!_.isNumber(seat)){
      if( _.isNumber(this.gameState.userSeatNumber) && seat != 'table'){var seat = this.gameState.userSeatNumber}
    else{if(!_.isEmpty(tableExpirationObject)){clearExpirationObject(tableExpirationObject)}
    }
}//if seat not a number




function clearExpirationObject (gameStateObject){

//make sure we have valid property
  if(!_.isObject(gameStateObject[expirationType])){return}

      //save refence
  var onEnd = gameStateObject[expirationType].onEnd

  //clear data
  gameStateObject[expirationType] = {}

if(options.callExpirationFunctions === true){
    //run onClear for street
      if(_.isArray(onEnd)){
      for (var index = 0;index<onEnd.length;index++){onEnd[index]()}    
    }//if onEnd is array
  else if(_.isFunction(onEnd)){onEnd()}
}

}//clearExpirationObject

}

 this.dealHoleCards = function(smallBlindSeatNumber, playerArray, holeCardArray){
     
var numPlayers = playerArray.length
var totalAnimationTime = 800

 //var animationTime = totalAnimationTime/numPlayers/2
var animationTime = 75

     var initialX = this.images.startingCard.position.x
     var initialY = this.images.startingCard.position.y
    

            var fractionDistancePerTick = .10
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
            animatedCards0[cardsDealt] = new self.images.Item(initialX, initialY, self.images.community[0].size.x, self.images.community[0].size.y, getZ('cardAnimation'))
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
          animatedCards1[cardsDealt] = new self.images.Item(initialX, initialY, self.images.community[0].size.x, self.images.community[0].size.y, getZ('cardAnimation'))
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
          self.setPreactionData('permanent', 'displayMessageType', 'openSeat', {server:false, seat:seatNumber})

      if(seatNumber === this.gameState.userSeatNumber){
          this.hideSeatedOptions()
          this.gameState.userSeatNumber = null
        
        }
        for (var i=0;i<this.gameState.numSeats;i++){
        this.displayCorrectSeatItems(i)
        }

        self.hideChildren(self.images.seats[seatNumber].bubbleChats)
    }

//this function prevents card imagefrom protruding past the bottom of the seat
this.cropHoleCards = function(holeCards, options){

  if(!options){var options = {}}
    var stagesToUpdate  = []
  var cardArray
  var userIndiviualSeatNumbers = false

if(_.isArray(holeCards)){cardArray = holeCards}
else if(_.isNumber(holeCards)){cardArray = _.flatten(this.images.seats[holeCards].hiddenCards, this.images.seats[holeCards].shownCards)}
else if(holeCards instanceof this.images.Item){cardArray = [holeCards]}
  else{console.warn('adjusthole cards source rectangle (mask) given insufficient parameter')}


if( _.isNumber(options.seatNumber)){var seatNum = options.seatNumber}
 else {var seatNum = this.images.seats[cardArray[i].seatObjectAncestor.nonRotatedSeatNumber]}

console.log('crop hole cards called for player ' + seatNum)

//check if it is protruding
for(var i = 0;i<cardArray.length;i++){

  var distanceFromCardTopToSeatBottom =  this.images.seats[seatNum].seat.position.y + this.images.seats[seatNum].seat.size.y  -   cardArray[i].image.y
if(cardArray[i].size.y > distanceFromCardTopToSeatBottom){
  //check if last iteration
 cardArray[i].image.mask = createRectangle(cardArray[i], distanceFromCardTopToSeatBottom)
 stagesToUpdate.push(this.easelJSDisplayObjectChanged(cardArray[i]))
}

}//loop through cards


if(options.update !== false){self.updateStages(stagesToUpdate)}
  else{return stagesToUpdate}

function createRectangle(currentCard, height){
  return new createjs.Rectangle(0, 0, currentCard.size.x, height)
}




}


  this.adjustBetDisplayToInputOfUser = function (betSize, options){
    if(!_.isNumber(betSize) || _.isNaN(betSize)){return false}
    if(!options){var adjustmentOptions = {}}
      else{var adjustmentOptions = _.clone(options)}


        var sliderSize = betSize

console.log('adjustBetDisplayToInputOfUser called: ' + betSize)
//console.log($(self.images.betSlider.slider.image).slider('option','min'))

      var min = $(self.images.betSlider.slider.image).slider('option','min')
      var max = $(self.images.betSlider.slider.image).slider('option','max')

console.log('min = ' + min +', max = '+max   )

      //make sure newX is within the bounds of min and max
      if(betSize >= max){
        sliderSize = max
        self.updateActionButton('bet',   {value:'All-In', hidden:true})
        self.updateActionButton('raise', {value:'All-In', hidden:true})
      }//if all in
      else{
        if(betSize < min){sliderSize = min}

         self.updateActionButton('bet',{value:betSize, hidden:true})
       self.updateActionButton('raise',{value:betSize, hidden:true})

}//if not all in
if(adjustmentOptions.slider !== false){
$(self.images.betSlider.slider.image).slider('value', sliderSize) //adjust vertical slider location
}
if(adjustmentOptions.size !== false){self.updateBetSize(betSize, adjustmentOptions)}

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
else if (_.isNumber(item)){
var parentOfStage = this.arrayOfParentsOfStageAndOfContainerArray[item]
return parentOfStage
}


    }

this.updateBetSize = function(betSize, options){
  if(!options){var options = {}}

    if(options.size !== false){ $('#betSize').val(betSize)}
 self.gameState.betSize = betSize
}
 
    //parameter is parent of the actual Image object
    this.displayImage = function (parentItem, options){
 if(!_.isObject(options)){var optionsWithCondom = {}}
    else{var optionsWithCondom = _.clone(options)}

if(!_.isNumber(optionsWithCondom.stageNumber)){
  optionsWithCondom.stageNumber = parentItem.position.z.stage
}
if(optionsWithCondom.container){
  var container = optionsWithCondom.container
}//if options.conainer

  else {
var container = parentItem.position.z.container
}//if no optoins.container specified


        if(parentItem.image){
//if html element
         if(_.isElement(parentItem.image)){
          //get default css display
          var display = self.imageData.defaultDisplayCSS
          if(_.isString(options.displayCSS)){display  = options.displayCSS}
            else if(_.isString(parentItem.position.displayCSS)){display = parentItem.position.displayCSS}
          $(parentItem.image).css('display', display)
        }
        
         else if (this.arrayOfParentsOfStageAndOfContainerArray[optionsWithCondom.stageNumber].containers[container].contains(parentItem.image) !==true){
this.addChildToContainer(parentItem.image, container, optionsWithCondom)
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
         if(_.isElement(parentOfTextObject.text)){
           //get default css display
          var display = self.imageData.defaultDisplayCSS
          if(_.isString(options.displayCSS)){display  = options.displayCSS}
            else if(_.isString(parentOfTextObject.position.displayCSS)){display = parentOfTextObject.position.displayCSS}

          $(parentOfTextObject.text).css('display', display)

        }
        
//if easeljs
      else if(this.arrayOfParentsOfStageAndOfContainerArray[optionsWithCondom.stageNumber].containers[container+1].contains(parentOfTextObject.text) !==true)   {
this.addChildToContainer(parentOfTextObject.text, container+1, optionsWithCondom)
this.arrayOfParentsOfStageAndOfContainerArray[optionsWithCondom.stageNumber].upToDate = false
var    changedWithoutUpdate  = optionsWithCondom.stageNumber
        } //if easeljs object
     
}//if .text exists

  if((optionsWithCondom.update !== false && this.arrayOfParentsOfStageAndOfContainerArray[optionsWithCondom.stageNumber].upToDate  !== true)||optionsWithCondom.update===true){
        this.updateStages(optionsWithCondom.stageNumber)   
   var    changedWithoutUpdate  = false
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

 this.displayHiddenCards = function(seatNumber, options){
  var stagesToUpdate = []
  self.setPreactionData('hand', 'inHand', true, {seat:seatNumber})
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
         if(_.isElement(parentOfTextObject.text)){
parentOfTextObject.saveDisplayCSS()
          $(parentOfTextObject.text).css('display','none')
        }
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

 
 this.hideImage = function(parentItem, options){
 if(!_.isObject(options)){var optionsWithCondom = {}}
    else{var optionsWithCondom = _.clone(options)}

if( !_.isNumber(optionsWithCondom.stageNumber)){
  var stageNumber = parentItem.position.z.stage
}//if options.parentofstage
else{
  var stageNumber = optionsWithCondom.stageNumber 
}//if no options.parentOfStage
if(_.isNumber(optionsWithCondom.container)){
  var container = optionsWithCondom.container
}//if options.conainer

  else {
var container = parentItem.position.z.container
}//if no optoins.container specified

        if(parentItem.image) {
 // if html element
         if(_.isElement(parentItem.image)){
parentItem.saveDisplayCSS()
          $(parentItem.image).css('display','none')
        }
//if easeljs
      else  if(self.getParentOfStageObject(stageNumber).containers[container].contains(parentItem.image))  {
        self.arrayOfParentsOfStageAndOfContainerArray[stageNumber].containers[container].removeChild(parentItem.image)
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

 this.playerSitsOut = function(seatNumber, options){
            var stagesToUpdate = []
            if(!options){var newOptions = {}}
              else{var newOptions = _.clone(options)}
                newOptions.update = false
              newOptions.seat = seatNumber

            self.setPreactionData('permanent', 'sitting_out', true, newOptions)
            self.setPreactionData('hand', 'inHand', false, newOptions)
  //          stagesToUpdate.push(     this.images.seats[seatNumber].status.updateText("Sitting Out", {update:false})        )
 
 stagesToUpdate.push(self.displayCorrectSeatItems(seatNumber, newOptions))
        if (options && options.update === false){return stagesToUpdate }
  else{this.updateStages(stagesToUpdate )  }


        }


this.images.Item.prototype.hide = function(updateOptions){
if(!updateOptions){var options = {}}
  else{var options = _.clone(updateOptions)}
    var update = options.update
    options.update = false
var stagesToUpdate = []

if(options.text !== false){stagesToUpdate.push  (self.hideText(this, options))    }
if(options.image !== false){stagesToUpdate.push  ( self.hideImage(this, options) )}

if(update !== false){self.updateStages(stagesToUpdate)}
  else{return stagesToUpdate}


}

this.images.Item.prototype.display = function(options){
if(!options){var options = {}}
  if(options.onlyText){return self.displayText(this, options)}
  else if(options.onlyImage){return self.displayImage(this, options)}


else {return self.displayChildren(this, options)}

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
   //            this.images.seats[i].shownCards[0].image = null
    //   this.images.seats[i].shownCards[1].image = null
         self.setPreactionData('hand', 'inHand', false, {seat:i})
     }
stagesToUpdate.push(this.images.seats[0].hiddenCards[0].position.z.stage)
stagesToUpdate.push(this.images.seats[0].shownCards[0].position.z.stage)

     //remove all player's bets
    stagesToUpdate.push(    self.hideAllBets(options) )
        //hide the pot
    stagesToUpdate.push(     self.hideChildren(self.images.totalPotSize, {update:false}) )//main pot
   
        //side pots
 stagesToUpdate.push(    self.updatePotSize(undefined, options))

        //side pots
 stagesToUpdate.push(    self.updateUserOptionsBasedOnFlagsAndPreactions(options))


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
//stagesWeWantToUpdateAfter.push(self.easelJSDisplayObjectChanged(self.images.seats[seatNumber].bet))
   stagesWeWantToUpdateAfter.push(   self.playerPutsChipsInPot(seatNumber, chipsInFrontOfPlayer[seatNumber], newStackSize, {update:false}))

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

if(permanentPreferences.tableChatFull.scrollBarType && permanentPreferences.tableChatFull.scrollBarType.value == 'mCustomScrollbar'){
//console.log('creating mCustomScrollbar')
//show so that scroll bar can be initialized

//self.jQueryObjects.tableChatFullDiv.mCustomScrollbar(mCustomScrollbarOptions)
console.log('assinging isAtBottom is true because i dontk now how to do it on mcustomscrollbar')
var isAtBottom = true//( scroll[0].getContentSize().h - scroll[0].getScrollTop() ===  self.jQueryObjects.tableChatFullParagraph.height())
}//if we using mCustomScrollBar

else{//if we don't want to use mCustomScrollbar
  var scroll = $(self.images.tableChatFull.chatTextDiv.image).getNiceScroll()//grab niceScroll instance on the scroll div
//console.log('content size = '+scroll[0].getContentSize().h +' upper scroll value = '+scroll[0].getScrollTop()+' height of visible paragraph = '+(self.jQueryObjects.tableChatFullParagraph.outerHeight(true)+1))
var isAtBottom = ( scroll[0].getContentSize().h - scroll[0].getScrollTop() <=  parseFloat(self.jQueryObjects.tableChatFullParagraph.outerHeight(true))+1)

  var scroll = self.jQueryObjects.tableChatFullDiv.getNiceScroll()

  //save value
   sessionPreferences.tableChatFull.tableChatFullScrollBarPositionTrueForBottomOrUpperInvisiblePixels.value = scroll[0].getScrollTop()

}
//console.log('var isAtBottom = ' + isAtBottom)
return isAtBottom

}

this.displayBubbleChatPopover = function(chatInfo){

var fontSize  = '13px'


console.log('displayin bubblechat popover')
console.log(chatInfo)

self.images.seats[chatInfo.seat].chat.updateText('')

var playerSeatObject = self.images.seats[chatInfo.seat]

/*

//we are going to create a div on top of each player's seat
if(playerSeatObject.bubbleChatBase instanceof self.images.Item !== true){
playerSeatObject.bubbleChatBase = new self.images.Item(playerSeatObject.seat.position.x, playerSeatObject.seat.position.y, playerSeatObject.seat.size.x , 0, playerSeatObject.chat.position.z)

var divID = 'seat'+chatInfo.seat + 'BubbleChatBase'
var seatDiv = self.arrayOfParentsOfStageAndOfContainerArray[self.images.seats[chatInfo.seat].seat.position.z.stage].div
$(seatDiv).append('<div id = \"' + divID + '\"></div>')

playerSeatObject.bubbleChatBase.image = $('#'+divID)[0]
$(playerSeatObject.bubbleChatBase.image).addClass(self.css.noFat)

console.log(playerSeatObject.bubbleChatBase)
self.positionItemImage(playerSeatObject.bubbleChatBase)


$(playerSeatObject.bubbleChatBase.image).css({
'z-index': 9999
,'width': playerSeatObject.seat.size.x
,'height':playerSeatObject.seat.size.y
  // ,'pointer-events': 'none'
  ,'background':'#FFFFFF'
})


}//if we want to create images.Item

*/

//qtip2 version

var seatDiv = self.arrayOfParentsOfStageAndOfContainerArray[self.images.seats[chatInfo.seat].seat.position.z.stage].div
var qtipID = 'seat'+chatInfo.seat
var qtipJQueryTarget = $(playerSeatObject.bubbleChats[0].image)

var qtipOptions = {
  id:qtipID
  //,overwrite:true
  ,show: {
  ready: true,
show:'manual'
   }//show as soon as its loaded
 ,hide: {
    fixed:true     //will not hide when we mouseover it
  //,delay: 10000
  ,inactive:10000 
  //,event: 'click'
 // ,target: qtipJQueryTarget
  ,leave:false
//,event:'manual'
}//hide
  ,content: {
    text: chatInfo.message
    ,attr:{
//'max-height': self.images.seats[chatInfo.seat].bubbleChats[0].size.y + 'px'
//,'overflow':'hidden'
    }//content.attr
  }//content
,position: {
    my: 'bottom middle' // tooltip position
    ,at: 'bottom middle' // div position
    ,target: qtipJQueryTarget // my target
    ,adjust:{resize:true}
      // adjust:{x:,y:}
 ,  container:  $(playerSeatObject.bubbleChats[0].image)      //$(seatDiv)
 ,viewport: $(window)//$(playerSeatObject.bubbleChats[0].image) //true// //  true //$(window)
  ,adjust:{method:'shift shift' }//position.adjust
  }//position
    ,style:{
      classes: 'qtip-tipsy'
   //   ,width:   self.images.seats[chatInfo.seat].bubbleChats[0].size.x
    // ,height:  self.images.seats[chatInfo.seat].bubbleChats[0].size.y
    //  ,tip:{corner:'right top'}
    }//style
 

 ,events:{
show: function(event, api){
  console.log('show event on qtip called')
 // console.log(event)
  //console.log(api.elements)
  var container = api.elements.tooltip
  var content = api.elements.content

  setCSS()
  api.hide()
  //set appropriate max width and height
//createjs.Tween.get($(elementID), {override:true})
//.wait(1).call(setCSS)

function setCSS (){

var width = playerSeatObject.bubbleChats[0].size.x
var height = playerSeatObject.bubbleChats[0].size.y
console.log('calling set css')

var containerWidthBullshit = container.outerWidth(true) - container.width()
var containerHeightBullshit = container.outerHeight(true) - container.height()

//set total height and width to match width and height
var containerWidth = width - containerWidthBullshit
var containerHeight = height - containerHeightBullshit

//set max width/height of container
container.css({
'max-width':containerWidth + 'px'
,'max-height':containerHeight + 'px'
})

//calculate margin/padding/other bullshit
var contentWidthBullshit = content.outerWidth(true) - content.width()
var contentHeightBullshit = content.outerHeight(true) - content.height()

//set total height and width to match width and height
var contentWidth = width - contentWidthBullshit
var contentHeight = height - contentHeightBullshit

content.css({
'max-width':contentWidth + 'px',
'max-height': contentHeight + 'px',
'overflow':'hidden'
//,'overflow-y':'hidden'
//,'opacity': 0.8
,'font-family':permanentPreferences.defaultFontType.value
,'font-size': fontSize
//,'line-height':1
,'font-weight':300
})

content.addClass(self.css.unselectable)




}//set css function


}//show event
 }//events



  }//qtip options


qtipJQueryTarget.qtip('hide')
qtipJQueryTarget.children('.qtip').remove()


qtipJQueryTarget.qtip('destroy', false)
qtipJQueryTarget.qtip(qtipOptions)


/*
console.log($(playerSeatObject.bubbleChats[0].image)  )
console.log( $('#qtip-'+qtipID))
*/


//$(playerSeatObject.bubbleChats[0].image).toggle(true)


/*
var tooltipOptions = {
title:chatInfo.message
,placement:'top'
//,trigger:'manual hover'
}

$(playerSeatObject.bubbleChatBase.image).tooltip(tooltipOptions)
$(playerSeatObject.bubbleChatBase.image).tooltip('show')
//$(playerSeatObject.bubbleChatBase.image).tooltip('toggle')
console.log($(playerSeatObject.bubbleChatBase.image).tooltip)
console.log($(playerSeatObject.bubbleChatBase.image))
*/



}


this.displayBubbleChat = function(chatInfo){


//trim front and trailing whitespace from chat message
chatInfo.message = chatInfo.message.replace(/^\s+|\s+$/g,'')
     //perform animation only if string is longer than 0 and is not purely spaces
  if (/\S/.test(chatInfo.message)){

    self.images.seats[chatInfo.seat].chat.updateText('')

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
self.images.seats[chatInfo.seat].chat.updateText(self.images.seats[chatInfo.seat].chat.text.text + messageToAdd) 

    //increase lines
if(wasTrimmed == true){

  if(numLines < permanentPreferences.playerChatMaxLines.value){
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
        self.images.seats[chatInfo.seat].chat.updateText(self.images.seats[chatInfo.seat].chat.text.text + '...')
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
    .wait(9500)
    .to({alpha:0}, 500)
    .call(self.hideImage,[self.images.seats[chatInfo.seat].chat], self)
    .to({alpha:originalImageAlpha})

    //tween text
  var textTween =    createjs.Tween.get(self.images.seats[chatInfo.seat].chat.text,{loop:false, override:true, paused:true})
     textTween.to({alpha:1})
     .wait(9500)
    .to({alpha:0}, 500)
    .call(self.hideText,[self.images.seats[chatInfo.seat].chat], self)
    .to({alpha:1})
//unpause
imageTween.setPaused(false)
textTween.setPaused(false)

    }//if message has non space characters


  }//playerChats function

this.appendTableChatFullMessageText = function(messageArray, options){
//  console.log('this.appendTableChatFullMessageText called' + 'messageArray parameter = '+messageArray)
if(!options){var options = {}}

var isAtBottom = this.checkIfTableChatFullMessageTextShouldBeScrolledAfterChangingText() 
var log = self.gameState.tableChatFull.log

if(_.isNumber(messageArray) &&!_.isNaN(messageArray) && messageArray >=0 && messageArray <= log.length-1){

appendTableChatFullMessageInArrayForm(log[messageArray])

}

else  if(!_.isArray(messageArray)){
replaceTableChatFullParagraphText()

for(var i = 0;i<log.length;i++){appendTableChatFullMessageInArrayForm(log[i], false) }

  //replace with full length text
replaceTableChatFullParagraphText(self.gameState.tableChatFull.fullTextString)

}//if messageArray not given, just do the whole thing

else if (_.isArray(messageArray)){//append a single message

log.push(messageArray)
appendTableChatFullMessageInArrayForm(messageArray)

}
else{console.log('append text passed invalid parameter')}
//self.jQueryObjects.tableChatFullParagraph.append('<br>'+ textString)

if(options.update !== false && options.moveTable !== true){
if(isAtBottom === true && self.gameState.tableChatFull.mouseDown != true && options && options.moveTable !== false){ self.moveTableChatFullMessageText()}
else if(options && options.moveTable === true){self.moveTableChatFullMessageText()}
}//if update !== false, or moveTable === true


function appendTableChatFullMessageInArrayForm(messageInArrayForm){
 // console.log('messageInArrayForm = ')
//  console.log(messageInArrayForm)
var displayCurrentLog 

//format of log is ['dealer',messageString, timeStampString]

//skip appending messages if its of a type we dont want to display
if(messageInArrayForm[1] === '' || !_.isString(messageInArrayForm[1])){console.error('returning due to not a real message');return}
if(messageInArrayForm[0] === 'dealer'){displayCurrentLog = sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hideDealerMessages.value}
else if(messageInArrayForm[0] === 'observer'){displayCurrentLog = sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hideObserverMessages.value}
  else if(messageInArrayForm[0] === 'player'){displayCurrentLog = sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hidePlayerMessages.value}
   else{throw 'unknown message type:' + messageInArrayForm}


   if(displayCurrentLog !== false) {//we WANT to display the message

var stringToAppend = ''

//add a line break if this is not the first line in the string
if(self.gameState.tableChatFull.fullTextString.length > 0){stringToAppend = stringToAppend + '<br>'}

//add messageArray[1] to string
stringToAppend = stringToAppend + messageInArrayForm[1]


//update current locally stored data and the paragraph data
appendTableChatFullString(stringToAppend)
}//we are going to display the message

}//append an array

function appendTableChatFullString(textToAppend, updateDefaultsToTrue){

//update current locally stored data and the paragraph data
self.gameState.tableChatFull.fullTextString = self.gameState.tableChatFull.fullTextString + textToAppend
if(updateDefaultsToTrue !== false) {self.jQueryObjects.tableChatFullParagraph.append(textToAppend)}

}//append a string

function replaceTableChatFullParagraphText(fullText){
  if(!_.isString(fullText)){var fullText  = ''}
  //update current locally stored data and the paragraph data
self.gameState.tableChatFull.fullTextString = fullText
self.jQueryObjects.tableChatFullParagraph.html(fullText)
}//replace the text

}




this.updateTableChatFullMessageTextFromCurrentOrAdditionalData = function(chatInfo, options){
if(!options){var options = {}}
var log = self.gameState.tableChatFull.log
//current preferences

var isDisplayingDealerMessages = this.gameState.tableChatFull.currentlyDisplayingDealerMessages
var isDisplayingPlayerMessages =  this.gameState.tableChatFull.currentlyDisplayingPlayerMessages
var isDisplayingObserverMessages = this.gameState.tableChatFull.currentlyDisplayingObserverMessages


  //target preferences
var shouldDisplayDealerMessages
 var shouldDisplayPlayerMessages
var shouldDisplayObserverMessages

if(sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hideDealerMessagesOn.value === false){ shouldDisplayDealerMessages = true}
  else{ shouldDisplayDealerMessages = false}
    if(sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hidePlayerMessagesOn.value === false){ shouldDisplayPlayerMessages = true}
  else{ shouldDisplayPlayerMessages = false}
    if(sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hideObserverMessagesOn.value === false){ shouldDisplayObserverMessages = true}
  else{ shouldDisplayObserverMessages = false}

//console.log('updateTableChatFullMessageTextFromCurrentOrAdditionalData called')
//console.log(shouldDisplayDealerMessages +''+ shouldDisplayPlayerMessages +''+ shouldDisplayObserverMessages)
//console.log(isDisplayingDealerMessages+''+isDisplayingPlayerMessages+''+isDisplayingObserverMessages)

var needToUpdate = (isDisplayingDealerMessages !==  shouldDisplayDealerMessages) || (isDisplayingPlayerMessages !== shouldDisplayPlayerMessages) || (isDisplayingObserverMessages !== shouldDisplayObserverMessages)

var scrollDownAtEnd = this.checkIfTableChatFullMessageTextShouldBeScrolledAfterChangingText()
//console.log('needToUpdate = '+needToUpdate)
//update existing display

//add another message to the array if necessary
 if(chatInfo && chatInfo.chatSourceType && chatInfo.message){
  var pushed = true
log.push([chatInfo.chatSourceType, _.escape(chatInfo.message)])
//if timeStampString add it to the array
if(chatInfo.timeStampString){
  log[log.length-1].push(chatInfo.timeStampString)
}
}//if chatInfo

if(needToUpdate === true || options.update === true){
console.log('re appending the full tablechatfull message text due to needToUpdate =  '+ needToUpdate + ', options.update = ' + options.update)
console.log(shouldDisplayDealerMessages +', '+ shouldDisplayPlayerMessages + ', '+ shouldDisplayObserverMessages)
console.log(isDisplayingDealerMessages+', '+isDisplayingPlayerMessages + ', ' + isDisplayingObserverMessages)

this.gameState.tableChatFull.currentlyDisplayingDealerMessages = shouldDisplayDealerMessages
this.gameState.tableChatFull.currentlyDisplayingPlayerMessages = shouldDisplayPlayerMessages
this.gameState.tableChatFull.currentlyDisplayingObserverMessages = shouldDisplayObserverMessages

this.appendTableChatFullMessageText(null)

//get the top line of text to preserve position

////*****************************DONT KNOW HOW TO DO THIS YET < WILL JUST SCROLL TO BOTTOM INSTEAD FOR NOW




}//if needToUpdate  === true, this means a type of message needs to be shown or hidden


else if(pushed === true){
this.appendTableChatFullMessageText(log.length-1, {moveTable:false})
}//if we want to append a message at the end

if(scrollDownAtEnd === true){this.moveTableChatFullMessageText({resize:true})}
  else{    this.moveTableChatFullMessageText({    magnitude:sessionPreferences.tableChatFull.tableChatFullScrollBarPositionTrueForBottomOrUpperInvisiblePixels.value, resize:true  })
}

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

this.images.standUp.image.removeAllEventListeners() 
this.images.getChips.image.removeAllEventListeners()
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


    this.displayBetSlider = function(minBet, maxBet, options){
       
       if(minBet == maxBet){return} //no need for slider if we have only 1 bet option for raise/bet

var stagesToUpdate = []
if(!options){var options = {}}
  var update = options.update
options.update = false

       //enable raise and bet in case it wasnt before
trueOrFalseToggleRaiseAndBet(true)

        this.gameState.minBet = minBet
        this.gameState.maxBet = maxBet
// this.gameState.minIncrement = minIncrement

console.log('min: '+minBet + ', max: ' + maxBet)

       $( this.images.betSlider.slider.image)
       .slider('option','min', minBet) //set min value
       .slider('option','max', maxBet) //set max value
       .slider('value', minBet) //set slider handle to minimum
.slider('option', 'step', self.initial_table_state.min_increment) //set minincrement

console.log('slider value after set to min = ' + $( this.images.betSlider.slider.image).slider('value'))

var setMin = $( this.images.betSlider.slider.image).slider('option','min')
var setMax = $( this.images.betSlider.slider.image).slider('option','max') 
console.log('slider setMin = '+setMin + ', setMax = ' + setMax )


 stagesToUpdate.push (this.updateBetSize(minBet, options))


//$('#betSize').css('display','inline')

//scroll wheel

    $(self.getParentOfStageObject(self.images.betSlider.slider).div).on('mousewheel.adjustBetSize', function(event, delta, deltaX, deltaY) {
self.events.wheelScroll(deltaY)
        })

    $(window).on('mousewheel.disable', function(e){return false})
   

  //display betSlider 
   stagesToUpdate.push (this.displayChildren(this.images.betSlider, options))

   options.update = update
   if(options.update !== false){self.updateStages(stagesToUpdate)}
    else{return stagesToUpdate}
   
    }//display bet slider


    this.displayCorrectSeatItems = function(seatNumber, options){

var stagesToUpdate = []

if(!_.isNumber(seatNumber) || _.isNaN(seatNumber)){

for(var i = 0;i<this.gameState.numSeats;i++){ stagesToUpdate.push (this.displayCorrectSeatItems(i, options))}

//console.log(stagesToUpdate)
}

else{
      if(!options){var options = {}}
        var update = options.update
      options.update = false

 // console.log('updating displayCorrectSeatItems of seat '+ seatNumber + ' as '+ this.gameState.seats[seatNumber].displayMessageType)
//console.log(self.images.seats[seatNumber].seat.image)

if(self.getPreactionData('sitting_out', {seat:seatNumber}) === true){
  //if getting chips display that
  if(self.getPreactionData('getting_chips',{seat:seatNumber}) === true){ 
             stagesToUpdate.push(this.displayChildren(this.images.seats[seatNumber].gettingChips, options))
stagesToUpdate.push(this.hideChildren(this.images.seats[seatNumber].sittingOut, options))
           }//player is getting_chips
           else{
   stagesToUpdate.push(this.displayChildren(this.images.seats[seatNumber].sittingOut, options))
   stagesToUpdate.push(this.hideChildren(this.images.seats[seatNumber].gettingChips, options))
           }//player not getting_chips
    stagesToUpdate.push(this.hideChildren(this.images.seats[seatNumber].stackSize, options))
   stagesToUpdate.push(this.displayChildren(this.images.seats[seatNumber].seat, options))

   stagesToUpdate.push(  this.displayChildren(this.images.seats[seatNumber].playerName, options))
   stagesToUpdate.push(    this.hideText(this.images.seats[seatNumber].action, options))
    stagesToUpdate.push(    this.hideText(this.images.seats[seatNumber].winner, options))
    stagesToUpdate.push(             this.hideText(this.images.seats[seatNumber].countdown, options))
      stagesToUpdate.push(            this.hideChildren(this.images.seats[seatNumber].openSeat, options))
      stagesToUpdate.push(            this.hideChildren(this.images.seats[seatNumber].disabledSeat, options))
}

else {

     switch (self.getPreactionData('displayMessageType', {seat:seatNumber})){
   
               case 'seat':
                stagesToUpdate.push(this.hideChildren(this.images.seats[seatNumber].gettingChips, options))
      stagesToUpdate.push(         this.displayChildren(this.images.seats[seatNumber].seat, options))
   
      stagesToUpdate.push(              this.displayChildren(this.images.seats[seatNumber].playerName, options))
      stagesToUpdate.push(              this.hideText(this.images.seats[seatNumber].action, options))
       stagesToUpdate.push(             this.hideText(this.images.seats[seatNumber].winner, options))
       stagesToUpdate.push(             this.hideText(this.images.seats[seatNumber].countdown, options))
         stagesToUpdate.push(            this.hideChildren(this.images.seats[seatNumber].openSeat, options))
         stagesToUpdate.push(            this.hideChildren(this.images.seats[seatNumber].disabledSeat, options))
        stagesToUpdate.push(this.displayChildren(this.images.seats[seatNumber].stackSize, options))
   stagesToUpdate.push(this.hideChildren(this.images.seats[seatNumber].sittingOut, options))

               break;
   
   
               case 'countdown':
               stagesToUpdate.push(this.hideChildren(this.images.seats[seatNumber].sittingOut, options))
               stagesToUpdate.push(this.hideChildren(this.images.seats[seatNumber].gettingChips, options))
        stagesToUpdate.push(this.displayChildren(this.images.seats[seatNumber].seat, options))
        //make sure player is toAct
        if(self.getPreactionData('toAct',{seat:'table'}) === seatNumber){
           stagesToUpdate.push(             this.displayText(this.images.seats[seatNumber].countdown, options))
    stagesToUpdate.push(           this.hideChildren(this.images.seats[seatNumber].playerName, options))
         }
           else{
      stagesToUpdate.push(              this.displayChildren(this.images.seats[seatNumber].playerName, options))
      stagesToUpdate.push(             this.hideText(this.images.seats[seatNumber].countdown, options))
           }
        stagesToUpdate.push(this.displayChildren(this.images.seats[seatNumber].stackSize, options))   
        stagesToUpdate.push(            this.hideText(this.images.seats[seatNumber].action, options))
        stagesToUpdate.push(            this.hideText(this.images.seats[seatNumber].winner, options))
        stagesToUpdate.push(             this.hideChildren(this.images.seats[seatNumber].openSeat, options))
         stagesToUpdate.push(            this.hideChildren(this.images.seats[seatNumber].disabledSeat, options))
               break;
   
               case 'action':
               stagesToUpdate.push(this.hideChildren(this.images.seats[seatNumber].sittingOut, options))
                   stagesToUpdate.push(this.hideChildren(this.images.seats[seatNumber].gettingChips, options))
        stagesToUpdate.push(             this.displayChildren(this.images.seats[seatNumber].seat, options))
       stagesToUpdate.push(              this.displayText(this.images.seats[seatNumber].action, options))
      stagesToUpdate.push(this.displayChildren(this.images.seats[seatNumber].stackSize, options))
   
          stagesToUpdate.push(          this.hideChildren(this.images.seats[seatNumber].playerName, options))
          stagesToUpdate.push(          this.hideText(this.images.seats[seatNumber].winner, options))
          stagesToUpdate.push(          this.hideText(this.images.seats[seatNumber].seat, options))
         stagesToUpdate.push(           this.hideText(this.images.seats[seatNumber].countdown, options))
         stagesToUpdate.push(           this.hideChildren(this.images.seats[seatNumber].openSeat, options))
          stagesToUpdate.push(           this.hideChildren(this.images.seats[seatNumber].disabledSeat, options))
               break;
   /*
               case 'winner':
               stagesToUpdate.push(this.hideChildren(this.images.seats[seatNumber].sittingOut, options))
                   stagesToUpdate.push(this.hideChildren(this.images.seats[seatNumber].gettingChips, options))
         stagesToUpdate.push(             this.displayChildren(this.images.seats[seatNumber].seat, options))
         stagesToUpdate.push(this.displayChildren(this.images.seats[seatNumber].stackSize, options))
         stagesToUpdate.push(          this.displayChildren(this.images.seats[seatNumber].winner, options))
   
      stagesToUpdate.push(             this.hideChildren(this.images.seats[seatNumber].playerName, options))
       stagesToUpdate.push(             this.hideText(this.images.seats[seatNumber].action, options))
       stagesToUpdate.push(         this.hideText(this.images.seats[seatNumber].countdown, options))
       stagesToUpdate.push(             this.hideChildren(this.images.seats[seatNumber].openSeat, options))
        stagesToUpdate.push(            this.hideChildren(this.images.seats[seatNumber].disabledSeat, options))
               break;
   */
               default: //also covers the 'openSeat'
   
   stagesToUpdate.push(this.hideChildren(this.images.seats[seatNumber].sittingOut, options))
       stagesToUpdate.push(this.hideChildren(this.images.seats[seatNumber].gettingChips, options))
   
                if(_.isNumber(this.gameState.userSeatNumber)) {
                   
          stagesToUpdate.push(              this.hideChildren(this.images.seats[seatNumber].openSeat, options))
         stagesToUpdate.push(               this.displayChildren(this.images.seats[seatNumber].disabledSeat, options))
               }
           
         else {
         stagesToUpdate.push(               this.hideChildren(this.images.seats[seatNumber].disabledSeat, options))
        stagesToUpdate.push(            this.displayChildren(this.images.seats[seatNumber].openSeat, options))
               }
        stagesToUpdate.push(              this.hideChildren(this.images.seats[seatNumber].seat, options))
       stagesToUpdate.push(             this.hideChildren(this.images.seats[seatNumber].stackSize, options))
       stagesToUpdate.push(             this.hideChildren(this.images.seats[seatNumber].playerName, options))
        stagesToUpdate.push(            this.hideText(this.images.seats[seatNumber].action, options))
        stagesToUpdate.push(            this.hideText(this.images.seats[seatNumber].winner, options))
        stagesToUpdate.push(            this.hideText(this.images.seats[seatNumber].countdown, options))
               break;
          
           }//displayCorrectSeatMessage switch statement
   }//if player is NOT sitting_out
//console.log('is seat added to stage:');console.log(self.isItemAddedToStage(this.images.seats[seatNumber].seat))

}//if a number parameter is given

options.update = update
if(update === false){return stagesToUpdate}
  else{this.updateStages(stagesToUpdate)}

    }

    this.playerActs = function(seatNumber, actionText, displayTime){
         //if player is current user, hide action buttons
        if(seatNumber === self.gameState.userSeatNumber){this.hideAllActionButtons(this.gameState.userSeatNumber)}
self.setPreactionData('permanent', 'displayMessageType', 'action', {server:false, seat:seatNumber})
      
        var interval = 25
        
        if(!displayTime || typeof displayTime != 'number'){var displayTime = 1000}
var fadeAtEndTime = displayTime/8.5


      var playerAction =   setInterval(function() {
var stagesToUpdate = []
var options = {update:false}

var displayMessageType = self.getPreactionData('displayMessageType' , {seat:seatNumber})

          if(displayMessageType !== 'action'|| displayTime <= 0)
          {
                if(displayMessageType === 'action'){self.setPreactionData('permanent', 'displayMessageType', 'seat', {seat:seatNumber, server:false})}
                clearInterval(playerAction)
            }

        else if(displayTime >= fadeAtEndTime){
                      
        stagesToUpdate.push(   self.images.seats[seatNumber].action.updateText(actionText, options) )
                self.images.seats[seatNumber].action.text.alpha = 1
                }
            else{
                self.images.seats[seatNumber].action.text.alpha = displayTime/fadeAtEndTime
           stagesToUpdate.push(   self.images.seats[seatNumber].action.updateText(actionText, options) )
            }
            
            displayTime = displayTime - interval
 //hide other messages on the seat box
       stagesToUpdate.push( self.displayCorrectSeatItems(seatNumber, options) )
       self.updateStages(stagesToUpdate)

}, interval)
    }


    this.playerWins = function(seatNumber, chipsWon, displayTime){

        self.images.seats[seatNumber].winner.updateText('')
self.setPreactionData('permanent', 'displayMessageType', 'winner', {seat:seatNumber, server:false})

           //hide other messages on the seat box


        var interval = 25
        if(!displayTime || typeof displayTime != 'number'){var displayTime = 1000}
var fadeAtEndTime = displayTime/8.5

      var declareWinner =   setInterval(function() {

var displayMessageType = self.getPreactionData('displayMessageType' , {seat:seatNumber})
var stagesToUpdate = []
var options = {update:false, seat:seatNumber, server:false }

          if(displayMessageType != 'winner'||displayTime<=0)
          {
                if(displayMessageType === 'winner'){self.setPreactionData('permanent', 'displayMessageType', 'seat', options)}
                
                clearInterval(declareWinner)
            }
            
            else if(displayTime >= fadeAtEndTime){
              stagesToUpdate.push(self.images.seats[seatNumber].winner.updateText('Wins '+chipsWon, options) )
                self.images.seats[seatNumber].winner.text.alpha = 1
                }
            else{
                self.images.seats[seatNumber].winner.text.alpha = displayTime/fadeAtEndTime
           stagesToUpdate.push(self.images.seats[seatNumber].winner.updateText('Wins '+chipsWon, options) )
            }
            
            displayTime = displayTime - interval //decrement time remaining

 stagesToUpdate.push(self.displayCorrectSeatItems(seatNumber, options))
 self.updateStages(stagesToUpdate)

}, interval)

    }

    this.playerToAct = function(seatNumber, timeoutInMS){

  self.setPreactionData('hand','timeToAct', timeoutInMS,{seat:seatNumber})
      self.setPreactionData('hand','toAct', seatNumber,{seat:'table'})
      if(seatNumber === self.gameState.userSeatNumber){self.setPreactionData('permanent','displayMessageType', 'countdown',{seat:seatNumber})}

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
        var ticksPerColorChange = 40
        var interval = timeToChangeColors/ticksPerColorChange
        var lastTick = ticksPerColorChange-1
         var tick = 0
         var originalFillColor = self.images.seats[seatNumber].seat.image.fillColor
         var targetFillColorsArray = [[255,0,0],[0,0,0]]
         var lastCompletedFillColorCounter = -1


 //================DO STUFF BELOW====================================
 //console.log('starting countdown function with an interval of '+ interval)
 //console.log(self.playerToAct.caller)

 var options = {server:false, seat:seatNumber, update:false}


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
                if (  self.getPreactionData('toAct',{seat:'table'})  !== seatNumber){
                      clearInterval(countdown)
           stagesToUpdate.push( self.images.drawSeat(self.images.seats[seatNumber].seat, originalBorderColor, originalFillColor, originalMiddleDividerColor) )
           if(self.getPreactionData('displayMessageType', options) === 'countdown'){self.setPreactionData('permanent', 'displayMessageType', 'seat', options)}
                      }//if the player to act is NOT this player
else{//if player to act is this player

var remainingTimeToAct = self.getPreactionData('timeToAct', options)

//UPDATE GRAPHIC AROUND THE TABLE SEAT
 stagesToUpdate.push(  self.images.drawSeat(self.images.seats[seatNumber].seat, toActBorderColor, newFillColor, toActMiddleDividerColor, {borderFillRatio: remainingTimeToAct/self.initial_table_state.act_timeout, newFillColor:toActTimeLeftBorderColor}) )
    
    //================COUNTDOWN TEXT START================================================================

var countDownText = 'Time: '+ Math.ceil(remainingTimeToAct/1000)

   if ( remainingTimeToAct >= 0){
     stagesToUpdate.push  (self.images.seats[seatNumber].countdown.updateText(countDownText, options)   )
   }//if time to act is 0 or higher

   else{ stagesToUpdate.push  (self.images.seats[seatNumber].countdown.updateText('0', options)   )}
     
     //==============================================================COUNT DOWN TEXT END================================================
        
         }//if we did NOT clear the countdown because the current play is the one to act


 //decrement time to act
      self.setPreactionData('hand', 'timeToAct', remainingTimeToAct - interval, {seat:seatNumber})
                    
                    //correct posible failed seatitems
                       stagesToUpdate.push(   self.displayCorrectSeatItems(seatNumber, options) )

                      self.updateStages(stagesToUpdate) //update stages as needed

                         },interval)

    }

this.updateTableChatFullDisplay = function(displayOrHideChildrenOptions){
if(!_.isObject(displayOrHideChildrenOptions)){var options = {}}
  else{var options = _.clone(displayOrHideChildrenOptions)}
  var update = options.update
options.update = false

var stagesToUpdate = []
console.log('update tablechatfull display called')
console.log(sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem)

//hide items that should be hidden by default
_.each(sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem,function(value, index, list){
//console.log(index)
//console.log(value)
if(sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem[index].value === false){
stagesToUpdate.push(  self.hideChildren(self.images.tableChatFull[index], options) )
 // console.log('hiding' + index)
}
else{stagesToUpdate.push(  self.displayChildren(self.images.tableChatFull[index], options) )}

})//end loop through sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem

//update text
this.updateTableChatFullMessageTextFromCurrentOrAdditionalData()
//console.log('finished adding to stages for tableChatFull display, now showing which stages should be updated')
//console.log(stagesToUpdate)




//check whether we are going to display
if(options.display !== true){

if(setOrGetDisplayStatusOfCanvasDivByStageNumberOrItemTrueDisplaysFalseHidesOtherGets(self.images.tableChatFull.window) === true){options.display = true}

}

//CHECK IF WE SHOULD POP OUT OR IN
var tableChatFullStageParent = self.getParentOfStageObject (self.images.tableChatFull.window)

//variables for popping out
if(sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.popOut.value === false){
//  displayOrHideChildrenOptions.resize = true

if(options.display === true){
//we are goign to keep the same left distance to edge. right will = left to edge. bottom will = top distance to text
var prependChatBoxTo = tableChatFullStageParent.div
var chatBoxWidth = self.images.tableChatFull.htmlDivElement.size.x - self.images.htmlTableChatBox.position.x*2
var chatBoxTopOffset = newHeight - self.images.htmlTableChatBox.position.y - self.images.htmlTableChatBox.size.y
}//only move the chatbox outside the table if we are displaying the full chat display

//dont move the div if we dont need to
  if($(tableChatFullStageParent.div).parent().is(self.jQueryObjects.canvasDiv) == true 
  ){

var newHeight = self.jQueryObjects.canvasDiv.outerHeight(true) 

var newDivX = 0; var newDivY = 0; 
//set background same
/*
if(self.images.background.image instanceof createjs.DisplayObject){
  var bgURL = self.images.background.image.image.src
}
else{var bgURL = self.images.background.image.src}
*/

var bgColor = 'rgba(0,0,0,0.78)'

var prependTo = self.jQueryObjects.pokerTableDiv
var position = 'relative'

var newTextHeight = self.images.htmlTableChatBox.position.y - chatBoxTopOffset - self.images.tableChatFull.chatTextDiv.position.y

console.log('moving chat outside of the table height = ' + newHeight + ' textheight =  ' + newTextHeight)

var scrollDownAtEnd = self.checkIfTableChatFullMessageTextShouldBeScrolledAfterChangingText()


}//we are moving out tablechatfull
}//table chat full will be moved outside (not sure if it needs to be moved though)

else if (sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.popOut.value !== false
&& $(tableChatFullStageParent.div).parent().is(self.jQueryObjects.canvasDiv) != true
){//variables for popping in

console.log('moving chat inside the table')

var newHeight = self.images.tableChatFull.htmlDivElement.size.y
var newDivX =  self.images.tableChatFull.htmlDivElement.position.x
var newDivY = self.images.tableChatFull.htmlDivElement.position.y
var bgColor = 'transparent'

var prependTo = self.jQueryObjects.canvasDiv
var position = 'absolute'

//restore normal chatboxbehavior
var prependChatBoxTo = self.getParentOfStageObject(self.images.htmlTableChatBox).div

var chatBoxWidth = self.images.htmlTableChatBox.size.x
var chatBoxTopOffset = 0//normal for chattext

var newTextHeight = self.images.tableChatFull.chatTextDiv.size.y
var scrollDownAtEnd = self.checkIfTableChatFullMessageTextShouldBeScrolledAfterChangingText()
}
else{console.log('keeping chat same place as last time ')}

//popin or out html chat box if needed
if(prependChatBoxTo){

setDisplayObjectPositionData(self.images.tableChatFull.chatTextDiv.image,{height:newTextHeight}, {update:false})

setDisplayObjectPositionData(self.images.htmlTableChatBox.image,{width:chatBoxWidth}, {update:false})
//$(self.images.htmlTableChatBox.image).css('width',chatBoxWidth)
$(self.images.htmlTableChatBox.image).prependTo(prependChatBoxTo)


}//if we are NOT displaying this, then we do not want to move the chatBox
else{stagesToUpdate.push(self.images.htmlTableChatBox.restore(options))}


//popin or out tablechatfull if needed
if(prependTo){


$(tableChatFullStageParent.div).css({
  'position':position
,'left':newDivX
,'top':newDivY
//,'height':newHeight
,'background-color':bgColor
//,"background-image": "url(" + bgURL + ")"
})
tableChatFullStageParent.resize({height:newHeight+'px'})
tableChatFullStageParent.resize({height:newHeight+'px'})
$(tableChatFullStageParent.div).prependTo(prependTo)
self.images.tableChatFull.window.drawImage()

//debugger;
self.resizePokerWrapperAndIframe()

}//if we changing our display


//scroll if necessary
if(scrollDownAtEnd){self.moveTableChatFullMessageText()}
else{self.moveTableChatFullMessageText({magnitude:sessionPreferences.tableChatFull.tableChatFullScrollBarPositionTrueForBottomOrUpperInvisiblePixels})}


options.update = update
if(update !== false){self.updateStages(stagesToUpdate)}
else{return stagesToUpdate}
}

self.images.Item.prototype.restore = function(options){

if(!options){var options = {}}
 update = options.update
options.update = false
var stagesToUpdate = []

if(this.text){this.positionChild('text',{position:true})}
  if(this.image){this.positionChild('image',{position:true, text:true})}

stagesToUpdate.push (self.setImageItemPositionAndTextBasedOnImageChange(this, null, null, options))

var div = self.getParentOfStageObject(this).div
var appendChild = function(child, parentElement){
  if(!_.isElement(child)){return}
    $(parentElement).append(child)
}

appendChild(this.text, div);appendChild(this.image, div)

options.update = update
if(options.update !== false){self.updateStages(stagesToUpdate)}
else{return stagesToUpdate}


}//restore function

self.getPokerWrapperDimensions = function(options){
//with flexbox

if(!_.isObject(options)){var options = {}}
 options.manual = true

  if(options.manual !== true){
    //THIS SEEMS TO BE BUGGED
 // var size  = {width:self.jQueryObjects.pokerTableDiv.outerWidth(true),height:self.jQueryObjects.pokerTableDiv.outerHeight(true)}
  //var size = {width: parseFloat(self.jQueryObjects.pokerTableDiv.css('width')), height:parseFloat(self.jQueryObjects.pokerTableDiv.css('height'))}

var cssDisplay = self.jQueryObjects.pokerTableDiv.css('display')
self.jQueryObjects.pokerTableDiv.css('display','inline')
self.jQueryObjects.pokerTableDiv.css('display',cssDisplay)
//self.jQueryObjects.pokerTableDiv.css('width', '100%')
//self.jQueryObjects.pokerTableDiv.css('width', 'inherit')
//self.jQueryObjects.pokerTableDiv.css('width', cssWidth)
  var sizeData = getDisplayObjectPositionAndSizeData(self.jQueryObjects.pokerTableDiv[0], {maxSize:false, size:true, position:false})

var size = {width:sizeData.outerWidth, height:sizeData.outerHeight}

  console.log(size)
  
  return size
  }

  else{//manually calculated


//old style, manually calculated

var size = {}
//size.height = self.getParentOfStageObject(0).stage.canvas.height

//iterate through and find total width
size.width = 0
size.height = 0
 self.jQueryObjects.pokerTableDiv.children().each(function(index, element){
var display = $(this).css('display')
if(display === 'none' || display === 'hidden'){return}
var widthToAdd = $(this).outerWidth(true)
console.log('adding '+widthToAdd)
size.width = size.width + widthToAdd

var newHeight = $(this).outerHeight(true)
if(newHeight > size.height) size.height = newHeight;

})

console.log('manually retreived dimensions of: ' + size.width +', '+size.height)
return size

}
}//get dimensions of the poker wrapper


//will default to correct amount
self.resizePokerWrapperAndIframe = function(originalOptions){

if(!_.isObject(originalOptions)){var options = {}}
  else{var options = _.clone(originalOptions)}

var interiorSize = {}

//function to resize the wrapper
var resizeInterior = function(newSize){setDisplayObjectPositionData(self.jQueryObjects.pokerTableDiv[0], newSize)}

if(!_.isNumber(options.width)){
//options.width = $(window).actual( 'outerWidth', { includeMargin : true })
var sizeData = self.getPokerWrapperDimensions()
options.width = sizeData.width
console.log(options)

}//retreive width

else{interiorSize.width = options.width;self.jQueryObjects.pokerTableDiv.css('width','auto')}

if(!_.isNumber(options.height)){
  if(!sizeData){var sizeData = self.getPokerWrapperDimensions()}
options.height = sizeData.height

//  options.height = $(window).actual( 'outerHeight', { includeMargin : true })
}//get height

else{interiorSize.height = options.height;self.jQueryObjects.pokerTableDiv.css('height','auto')}

console.log('resizing to '+options.width + ' '+options.height)
var w = self.jQueryObjects.pokerTableDiv.width()

//if(options.width != w){debugger;}

//debugger;
resizeInterior(interiorSize)
//debugger;
self.getIframeLib().resizeIFrame(self.getTableName(), options.height, options.width)
//debugger;

self.updateStages()
}

this.displayTableChatFull = function(hideOrDisplayChildrenOptions){
  console.log('display table chat full called')
    if(!hideOrDisplayChildrenOptions){var options = {}}
      else{var options = _.clone(hideOrDisplayChildrenOptions)}

        var update = options.update
        options.update = false

        var stagesToUpdate = []

        var initialSize = self.getPokerWrapperDimensions()
        console.log(initialSize)
/*
//update what is showing and what isnt from current preferences

if(sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hideDealerMessages.value === false){
  this.gameState.tableChatFull.currentlyDisplayingDealerMessages = false
}
else{this.gameState.tableChatFull.currentlyDisplayingDealerMessages = true}

  if(sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hidePlayerMessages.value === false){
  this.gameState.tableChatFull.currentlyDisplayingPlayerMessages = false
}
else{this.gameState.tableChatFull.currentlyDisplayingPlayerMessages = true}

  if(sessionPreferences.tableChatFull.defaultItemsToHideFalseHidesItem.hideObserverMessages.value === false){
  this.gameState.tableChatFull.currentlyDisplayingObserverMessages = false
}
else{this.gameState.tableChatFull.currentlyDisplayingObserverMessages = true}
*/

stagesToUpdate.push(this.displayChildren(this.images.hideTableChatFull,options))
stagesToUpdate.push(this.hideChildren(this.images.showTableChatFull,options))
stagesToUpdate.push(this.displayChildren(this.images.tableChatFull, options))
//stagesToUpdate.push(this.displayChildren(this.images.tableChatFull.chatMessageText,hideOrDisplayChildrenOptions))

options.display = true
stagesToUpdate.push( this.updateTableChatFullDisplay(options) )

var tableChatFullCanvas = self.arrayOfParentsOfStageAndOfContainerArray[ this.images.tableChatFull.htmlCanvasElement.position.z.stage].stage.canvas

setOrGetDisplayStatusOfCanvasDivByStageNumberOrItemTrueDisplaysFalseHidesOtherGets(this.images.tableChatFull.window, true)
//$(tableChatFullCanvas).css('display','inline')
//self.jQueryObjects.tableChatFullParagraph.css('display','inline ')

//restore scrollbar position
 var scrollInfo ={magnitude: sessionPreferences.tableChatFull.tableChatFullScrollBarPositionTrueForBottomOrUpperInvisiblePixels.value}
self.moveTableChatFullMessageText(scrollInfo)
sessionPreferences.tableChatFull.tableChatFullScrollBarPositionTrueForBottomOrUpperInvisiblePixels.updateValue(sessionPreferences.tableChatFull.tableChatFullScrollBarPositionTrueForBottomOrUpperInvisiblePixels.value)

console.log('tablechatfull object = ')
console.log(this.images.tableChatFull)


 var finalSize = self.getPokerWrapperDimensions()
if(initialSize.width != finalSize.width || initialSize.height != finalSize.height){self.resizePokerWrapperAndIframe()}


options.update = update
if(update !== false){  this.updateStages(stagesToUpdate)}
  else{return stagesToUpdate}



//console.log(this.images.tableChatFull.stage.contains(this.images.tableChatFull.window.image))
//console.log(this.images.tableChatFull.window.image.isVisible())
}


this.hideTableChatFull = function(options){
if(!options){var options = {}}
  var update = options.update
options.update = false

var stagesToUpdate = []

 var initialSize = self.getPokerWrapperDimensions()
//console.log('calling hideTableChatFull')
//set preference (scroll bar location)
 var positionValue
 if(self.checkIfTableChatFullMessageTextShouldBeScrolledAfterChangingText() === true){
   positionValue = true
 }
 else{
  if(sessionPreferences.tableChatFull.scrollBarType != 'mCustomScrollbar'){
  var scroll = self.jQueryObjects.tableChatFullDiv.getNiceScroll()
   positionValue  = scroll[0].getScrollTop()
 }
 else{positionValue = 0}
}
  sessionPreferences.tableChatFull.tableChatFullScrollBarPositionTrueForBottomOrUpperInvisiblePixels.value = positionValue


 stagesToUpdate.push(this.displayChildren(this.images.showTableChatFull,options))
stagesToUpdate.push(this.hideChildren(this.images.hideTableChatFull,options))
stagesToUpdate.push(this.hideChildren(this.images.tableChatFull, options))

//restore chatbox
stagesToUpdate.push(self.images.htmlTableChatBox.restore(options))

var tableChatFullCanvas = self.arrayOfParentsOfStageAndOfContainerArray[ this.images.tableChatFull.htmlCanvasElement.position.z.stage].stage.canvas

setOrGetDisplayStatusOfCanvasDivByStageNumberOrItemTrueDisplaysFalseHidesOtherGets(this.images.tableChatFull.window, false)



/*
//change size if needed
 var finalSize = self.getPokerWrapperDimensions()
if(initialSize.width != finalSize.width || initialSize.height != finalSize.height){self.resizePokerWrapperAndIframe(finalSize)}
*/

self.resizePokerWrapperAndIframe()


if(update!== false){this.updateStages(stagesToUpdate)}
  else{stagesToUpdate}
}

this.images.Item.prototype.saveDisplayCSS = function(options){
if(!_.isObject(options)){var options = {}}
if(_.isString(options.display)){var displayCSS = options.display}

if(_.isElement(this.image)){
if(!displayCSS){var displayCSS = $(this.image).css('display')}
if(displayCSS !== 'none' && displayCSS !== 'hidden' && _.isString(displayCSS)){this.position.displayCSS = displayCSS;return}
}

if(_.isElement(this.text)){
if(!displayCSS){var displayCSS = $(this.text).css('display')}
if(displayCSS !== 'none' && displayCSS !== 'hidden' && _.isString(displayCSS)){this.position.displayCSS = displayCSS;return}
}


} 





this.images.Item.prototype.adoptChild = function(child, type, options){
if(!options){var options = {}}
  var stagesToUpdate = []

if(options.overwrite !== false){stagesToUpdate.push(this.removeChild(type))}

this[type] = child
child.parentItem = this
this.getOrSetCreateJSEvents('set', type)//set empty events for the child

if(this.messages && type === 'image'){
 // this.off('click', {function:self.events.onButtonClick})
    this.on('click', self.events.onButtonClick, {image:true, text:false} )
}

if(options.maxSize === 'child'){

var data = this.getChildPositionAndSizeData(type, {position:false, size:true, maxSize:false})

if(this.size.x < data.outerWidth){this.size.x = data.outerWidth}
  if(this.size.y < data.outerHeight){this.size.y = data.outerHeight}

}

else if(options.maxSize === 'parent'){

var data = this.getChildPositionAndSizeData(type, {position:false, size:true, maxSize:false})

var newSize = {}

if(this.size.x > data.outerWidth){newSize.width = this.size.x}
  if(this.size.y > data.outerHeight){newSize.height = this.size.y}

setDisplayObjectPositionData(child, newSize)

}


if(options.update != false){self.updateStages(stagesToUpdate)}
  else{return stagesToUpdate}

}

this.images.Item.prototype.addElement = function(element, textOrImage, functionOptions){
// options: size, position, container
if(!functionOptions){var options = {}}
  else{var options = _.clone(functionOptions)}

    if(_.isObject(options.css )){options.css = _.clone(options.css)}
      else{options.css = {}}
  if(_.isObject(options.attr)){options.attr = _.clone(options.attr)}
    else{options.attr = {}}
    if(!options.class){options.class = ''}
    options.update = false

var parentDiv = self.getParentOfStageObject(this).div
var elementType = $(this).get(0).tagName

if(textOrImage === 'text' || textOrImage === 'image'){var type  = textOrImage}
else if(_.isObject(this.image) && !_.isObject(this.text)){var type = 'text'}
  else if(!this.image && _.isObject(this.text)){var type = 'image'}
else if(elementType === 'p'){var type = 'text'}
  else{var type = 'image'}


if(type === 'text'){var z = this.position.z.container + 1}
  else{var z = this.position.z.container}


//REMOVE PREVIOUS VERSIONS OF SAME ID
if(options.overwrite !== false){

this.removeChild(type)
if(_.isString(options.attr.id)){
var leftoverChild = $('#'+ options.attr.id)
//remove any previous instances of this ID 
if(leftoverChild.length > 0){
console.log('leftover child removed with id = ' + options.attr.id)
  leftoverChild.remove()
}
}//if we assigning an id


}//if we want to remove previous

else{
  console.log('overwrite not = false on add element type = ' + type)
  console.log(element)
  console.log(options)
  throw''
}

//MODIFY DISPLAY CSS
if(_.isString(options.css.display)){
  options.display = options.css.display
this.saveDisplayCSS(options) //THIS SAVES OUR DISPLAY VARIABLE FOR WHEN WE WANT IT
}

  options.css.display = 'none'

$(element).css(options.css).attr(options.attr).addClass(options.class)
//check if element has changed line-height
if($(element).is('p') && _.isString(options.css['line-height']) && !_.isArray(options.css)){
//console.log(options.css)
 // console.log('line-height assigned (with object): '+ options.css['line-height'] + ' , and now = ' + $(element).css('line-height'))
$(element).css('line-height', options.css['line-height'])
//console.log('line-height assigned directly: '+ options.css['line-height'] + ' , and now = ' + $(element).css('line-height'))

}

//$(element)

//if container specified append to it
if(options.container){$(options.container).append(element)}
//check if element is already a descendent of div
else if($(parentDiv).find(element).length < 1){  $(parentDiv).append(element)}

//assign element as child of Item
this.adoptChild(element, type, {size:false, position:false})

//position the child
 this.positionChild(type, options)
/*
 $(element).css(options.css)
 
 if($(element).is('p') && _.isString(options.css['line-height'])){

  console.log('line-height assigned: '+ options.css['line-height'] + ' , and now = ' + $(element).css('line-height'))

}
*/

//************EVENTS***************

//right click
if(options.disableContextMenu === true){  $(element).on('contextmenu.disable', function(e){return false})}

//left click
if(!_.isFunction(options.onClick) && this.messages && type === 'image'){var onClick = self.events.onButtonClick}
  else{var onClick = options.onClick}


if(_.isFunction(onClick)){
$(element).on('click', function(e){
onClick(e)
})
}//onclick function if necessary


}


this.images.Item.prototype.getText = function (){

if(this.text instanceof createjs.Text){var text = this.text.text}
  else if(_.isElement(this.text)){var text =  $(this.text).text()}
    else if(_.isElement(this.image)){var text =  $(this.image).text()}


return text
}

this.images.Item.prototype.updateText = function (text, options){

return updateItemText(this, text, options)

}

var updateItemText = function(item, text, options){
if(!options){var options = {}}
  var stagesToUpdate = []

//console.log('checking updateitem text = '+text)
if(!_.isString(text+'')){console.log('updateitemtext given non text as parameter = '+text);return }



var updateText = function(textObject, newText){
        if(_.isElement(textObject)){  $(textObject).html(newText)}//if html element

           else if(textObject instanceof createjs.Text && textObject.text+'' !== text+''){//if easel js item
 item.text.text = text
 stagesToUpdate.push(self.easelJSDisplayObjectChanged(item))
                }//if two texts are not equal
}//update text private function

        if(_.isElement(item.text) || item.text instanceof createjs.Text){var textObject = item.text        }

       else  if(_.isElement(item.image)){ var textObject = item.image }

if(textObject){
//add prefix/suffix
if(textObject.prefix){var text = textObject.prefix + text}
  if(textObject.suffix){var text = text + textObject.suffix}

updateText(textObject, text)

}//if there is a text object to update

if(options.update !== false){self.updateStages(stagesToUpdate)}
  else{return stagesToUpdate}

}

    //make sure to set buttonText as FALSE if you want to display the default text
  this.updateActionButton =  function (actionTypeOrItem, options){
if(!options){var options = {}}
  var update = options.update
options.update = false
  var stagesToUpdate = []

if(_.isString(actionTypeOrItem)){
  var item = self.images[actionTypeOrItem]

if(_.isString(options.value+'')){ 

if(actionTypeOrItem === 'fold'){var fullText = 'Fold';options.messages = ['act', 'fold']}
             else if(actionTypeOrItem === 'check'){var fullText = 'Check';options.messages = ['act', 'check']}
  else if(actionTypeOrItem === 'call'){var fullText = 'Call<br>'+options.value;options.messages = ['act', 'call', options.value]}
   
  else if(actionTypeOrItem === 'raise'){
    var currentStackSize = self.getCurrentStackSizes()[self.gameState.userSeatNumber] 
    var currentBetSize = self.getCurrentBetSizes()[self.gameState.userSeatNumber]
console.log('update action button called type = raise, currentBetSize = '+currentBetSize)
if(parseFloat(options.value) >= currentStackSize + currentBetSize){  var fullText = 'Raise All-In'}
     else if(_.isNaN(parseFloat(options.value))){var fullText = 'Raise All-In';options.value = currentStackSize + currentBetSize}
        else{var fullText = 'Raise to<br>' + options.value}
            options.messages = ['act', 'raise', options.value]
    }// raise action button
       else if(actionTypeOrItem === 'bet'){
        var currentStackSize = self.getCurrentStackSizes()[self.gameState.userSeatNumber]

if(parseFloat(options.value) >= currentStackSize){var fullText = 'Bet All-In'}
     else if(_.isNaN(parseFloat(options.value))){var fullText = 'Bet All-In'; options.value = currentStackSize}
        else{var fullText = 'Bet<br>' + options.value}
options.messages = ['act', 'bet', options.value]
      }//bet action
       else if(actionTypeOrItem === 'sitIn'){var fullText = 'Sit In'; options.messages = ['sit_in']}
           else if(actionTypeOrItem === 'rebuy'){var fullText = 'Rebuy'; options.messages = ['get_add_chips_info']}

//stagesToUpdate.push(updateItemText(item, fullText, options))
stagesToUpdate.push(item.updateText(fullText, options))

}// if value given as string

else if(_.isString(options.text)){

stagesToUpdate.push(updateItemText(item, options.text, options))

}//if options.text given as string

      }//if passed actionType string as parameter

      //if passed object as parameter
  else if (actionTypeOrItem instanceof self.images.Item){
    var item = actionTypeOrItem
  //if options.text given as string
      if(_.isString(options.text+'')){  stagesToUpdate.push (updateItemText(item, options.text, options))}
else if(_.isString(options.value+'')){  stagesToUpdate.push (updateItemText(item, options.value, options))}
  }//if item as parameter

//if improper parameter passed, return function
else{return}

      if(_.isArray(options.messages)){item.messages = options.messages}


options.update = update
if(options.hidden === true){return}//if hidden, we dont display anything
      stagesToUpdate.push (this.displayChildren(item))
if(options.update !== false){self.updateStages(stagesToUpdate)}
  else{return stagesToUpdate}
    }
    
    this.hideCashier = function(hideOrDisplayChildrenOptions){
      if(!hideOrDisplayChildrenOptions){var hideOrDisplayChildrenOptions = {}}
        var update = hideOrDisplayChildrenOptions.update
        hideOrDisplayChildrenOptions.update = false

        var stagesToUpdate = []
        /*
//hide cashierCanvas
$(self.arrayOfParentsOfStageAndOfContainerArray[self.images.cashier.window.position.z.stage].stage.canvas).css('display','none')
*/

setOrGetDisplayStatusOfCanvasDivByStageNumberOrItemTrueDisplaysFalseHidesOtherGets(self.images.cashier.window, false)


        //enable TableChatBox
        /*
        if(self.jQueryObjects.chatBoxInput.attr("readonly") == true || 'readonly'){
            self.gameState.tableChatBox.display = false
       self.enableTableChatBox()
       }
*/
                self.jQueryObjects.cashierForm.css('display','none')

        self.gameState.cashier.display = false

                 $('#maxRadio').prop('checked', false)
          $('#autoRebuyRadio').prop('checked', false)
          $('#otherAmountRadio').prop('checked', false)
          
          $("#otherAmount").val('')
           $('#autoRebuyAmount').val('')
           $('#maxAmount').val('')
           //hide cashier children
     stagesToUpdate.push(  self.hideChildren(self.images.cashier, hideOrDisplayChildrenOptions))

     if(update !== false){self.updateStages(stagesToUpdate)}
      else{return stagesToUpdate}

    }



var messageBoxAPI = {}
messageBoxAPI.getRawCurrentStageNumber = function(){return self.gameState.messageBox.currentlyHighestDisplayedMessageBoxStageNumber}
messageBoxAPI.getInitialStageNumber = function(){return getZ('background', 'initialMessageBox').stage}
messageBoxAPI.getFinalStageNumber = function(){return getZ('background','finalMessageBox').stage}
messageBoxAPI.getStageNumberIncrement = function(){return getZ('background','secondMessageBox').stage - getZ('background','initialMessageBox').stage }
messageBoxAPI.setCurrent = function(val){

self.gameState.messageBox.currentlyHighestDisplayedMessageBoxStageNumber = val

}

messageBoxAPI.getCurrent = function(){

var current = this.getRawCurrentStageNumber()
var min = this.getInitialStageNumber()
var max = this.getFinalStageNumber()

if(!_.isNumber(current) || _.isNaN(current) || current < min || current > max){return}
  else {return current}


}

messageBoxAPI.getNext = function(){

var current = this.getCurrent()
var min = this.getInitialStageNumber()
var max = this.getFinalStageNumber()

if(!_.isNumber(current) || _.isNaN(current)){return min} 
  else if(current < min){return min}
  else if (current >= max){return}
    else{return current}


}

messageBoxAPI.getPrevious = function(){

var current = this.getCurrent()
var min = this.getInitialStageNumber()
var max = this.getFinalStageNumber()

if(!_.isNumber(current) || _.isNaN(current)){return} 
  else if(current <= min){return}
  else if (current > max + 1){return}
    else{return current - this.getStageNumberIncrement()}

}


messageBoxAPI.decrementCurrent = function(){

var nextVal = this.getCurrent() - this.getStageNumberIncrement()
this.setCurrent(nextVal)

}

messageBoxAPI.incrementCurrent = function (){

  var nextVal = this.getCurrent() + this.getStageNumberIncrement()
this.setCurrent(nextVal)

}

messageBoxAPI.getItemsObject = function(stageNumber){

if(_.isNumber(stageNumber)){}
  else if(stageNumber === 'next'){var stageNumber = this.getNext()}
    else if(stageNumber === 'previous'){var stageNumber = this.getPrevious()}
  else{var stageNumber = this.getCurrent()}
if(!_.isNumber(stageNumber)){return}

if(!_.isObject(self.images.messageBox[stageNumber])){this.deleteMessageBoxItems(stageNumber)}
return self.images.messageBox[stageNumber]
}

messageBoxAPI.deleteMessageBoxItems = function(stageNumber){

//clear 
if(_.isNumber(stageNumber)){}
  else if(stageNumber === 'next'){var stageNumber = this.getNext()}
    else if(stageNumber === 'previous'){var stageNumber = this.getPrevious()}
  else{stageNumber = this.getCurrent()}

    if(!_.isNumber(stageNumber)){return}
console.log('deleting messagebox items stagenumber = ' + stageNumber)

self.hideChildren(self.images.messageBox[stageNumber] )
self.images.messageBox[stageNumber] = {}

var parentOfStage = self.getParentOfStageObject(stageNumber)

//remove any extra elements we have created also
$(parentOfStage.div).children().not(parentOfStage.stage.canvas).remove()

}

messageBoxAPI.display = function(messageString, messageInfo, hideOrDisplayChildrenOptions){

if(!hideOrDisplayChildrenOptions){var hideOrDisplayChildrenOptions = {}}

 return self.displayMessageBox(messageString, messageInfo, hideOrDisplayChildrenOptions)


}

messageBoxAPI.displayModal = function(messageString, messageInfo, hideOrDisplayChildrenOptions){

}

messageBoxAPI.getStatus = function(){

var current = this.getCurrent()
if(!_.isNumber(current)){return}

var status = {}
var items = this.getItemsObject(current)
var div = self.getParentOfStageObject(current)
//check whether checked or unchecked box

//check for easeljs
if( isItemDisplayed(items.checkBoxChecked) === true){status.checkBox = 'checked'}
else if( isItemDisplayed(items.checkBoxUnchecked) === true){status.checkBox = 'unchecked'}

else if(items.htmlCheckBox instanceof self.images.Item){
//check for html
var checkBox = $(items.htmlCheckBox.image)
console.log('found checkBox = ');console.log(checkBox)
 if(checkBox.prop('checked') === true){status.checkBox = 'checked'}
    else if(checkBox.prop('checked') === false){status.checkBox = 'unchecked'}

}

return status

}

messageBoxAPI.hide = function(options){
console.log('messagebox hide called')

var current = this.getCurrent()
if(!_.isNumber(current)){
  console.error('mesagebox hide without a valid current number: ' + current)
return
}

var itemsToHide = this.getItemsObject(current)
setOrGetDisplayStatusOfCanvasDivByStageNumberOrItemTrueDisplaysFalseHidesOtherGets(current, false)
this.decrementCurrent()//reduce current
  return  self.hideChildren(itemsToHide, options)

}

this.displayNotification = function(messageString, options){

if(!_.isObject(options)){var options = {}}
  else{var options = _.clone(options)}

var stagesToUpdate = []

var defaults = {
title:'server message'
  ,timeout:15000
  ,growl:true
  ,style:'qtip-red'
 , persistent:false //makes it so doesnt autohide
}


options = _.defaults(options, defaults)
//*************************DISPLAYING GROWL MESSAGE BOX*****************************************

if(options.growl){

if(options.qtip){

console.log('displaying growl')
  //display thingy
// Create a jGrowl
  //  var container = self.getParentOfStageObject(self.images.seats[0].seat).div
var container = self.images['growl-container'].image

var position = {
  container:$(container)
 ,target:$(container)
 ,my:'top right'
 ,at: 'top right'
,viewport:$(self.getParentOfStageObject(self.images.seats[0].seat).div)
,adjust:{
method:'shift none'
}
}

/*
var target = $(container).find('.qtip:visible:last')


if(target.length < 1){
  position.target = //$(container)
position.my = 'top right'
position.at = 'top right'
}
  else{
    position.target = //$(target)
position.my = 'top right'
position.at = 'bottom right'
  }
  
*/

    $('<div>').qtip({
        content: {
            text: messageString,
            title: {
                text: options.title,
                button: true
            }
        },
        position: position,
        show: {
            event: false,
            ready: true,
            effect: function() {
                $(this).stop(0, 1).animate({ height: 'toggle' }, 400, 'swing');
            },
            delay: 0,
            persistent: options.persistent,
            solo:false
        },
        hide: {
            event: false,
            effect: function(api) {
                $(this).stop(0, 1).animate({ height: 'toggle' }, 400, 'swing');
            }
        },
        style: {
            width: 250,
            tip: false,
            classes:options.style

        },
        events: {
            render: function(event, api) {
                if(!api.options.show.persistent) {
                    $(this).bind('mouseover mouseout', function(e) {

                        clearTimeout(api.timer);
                        if (e.type !== 'mouseover') {
                            api.timer = setTimeout(function() { api.destroy(true) }, options.timeout);
                        }
                    })
                    .triggerHandler('mouseout');
                }
            }//events.render
  ,show: function(event, api){
console.log($(container).find('.qtip').length)
console.log($('.qtip'))
self.updateStages(stagesToUpdate)
        }//events.show
        /*
 ,hide: function(event, api){
api.destroy(true)
        }//events.show
        */
        }//events
      
    });

}//if qtip

else if(options.metro){



}


}//displaying growl

}//display notification

    this.displayMessageBox = function(messageString, messageInfo, hideOrDisplayChildrenOptions){
      console.log('displaymessagebox called')

      if(!hideOrDisplayChildrenOptions){var hideOrDisplayChildrenOptions = {}}
        var update = hideOrDisplayChildrenOptions.update
        hideOrDisplayChildrenOptions.update = false

        var stagesToUpdate = []

var newStageNumber = messageBoxAPI.getNext()
if(!_.isNumber(newStageNumber)){return}//if we can't display anymore dont

messageBoxAPI.incrementCurrent()//increase current
messageBoxAPI.deleteMessageBoxItems()

var messageBoxItems = messageBoxAPI.getItemsObject(newStageNumber)
var div = self.getParentOfStageObject(newStageNumber).div

        var messageBoxWindowSource = permanentPreferences.sourceObjects.value.messageBoxBackground
     var messageBoxWindowWidth = messageBoxWindowSource.width  //  var messageBoxWindowWidth = 516
  var messageBoxWindowHeight = messageBoxWindowSource.height   //   var messageBoxWindowHeight = 199
        //declare size variables
  

   var closeXSource = permanentPreferences.sourceObjects.value.messageBoxCloseX
 var closeXWidth = closeXSource.width // var closeXWidth = 31
   var closeXHeight = closeXSource.height   //  var closeXHeight = 20
       
        var closeXTopOffset = 1
        var closeXRightOffset = 7

         var outerTopHeight = 31
                var outerBottomHeight = 8
        var outerSideWidth = 8

        var htmlCanvas = this.arrayOfParentsOfStageAndOfContainerArray[newStageNumber].stage.canvas
        var stageWidth = htmlCanvas.width
        var stageHeight = htmlCanvas.height
        var messageBoxWindowX = Math.floor(stageWidth/2 - messageBoxWindowWidth/2)
        var messageBoxWindowY = Math.floor(stageHeight/2 - messageBoxWindowHeight/2)
        

        var innerMessageBoxX = messageBoxWindowX+outerSideWidth
        var innerMessageBoxY = messageBoxWindowY+outerTopHeight
        var innerMessageBoxWidth = messageBoxWindowWidth-2*outerSideWidth 
        var innerMessageBoxHeight = messageBoxWindowHeight-outerBottomHeight-outerTopHeight

      //  var textHeight = 30
        var textLeftOffset = 7
        var textTopOffset = 8
        var textBottomOffset = 8
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

         //-------------------set defaults---------------------------
         if(_.isNull(messageInfo)||_.isUndefined(messageInfo)){messageInfo = {}}
         //set default font sizes and colors
       if(_.isNull(messageInfo.title)||_.isUndefined(messageInfo.title)||!(_.isString(messageInfo.title)||!_.isNumber(messageInfo.title))){messageInfo.title = ''}
       if(_.isNull(messageInfo.titleSizeAndFont)||_.isUndefined(messageInfo.titleSizeAndFont)){messageInfo.titleSizeAndFont = '18px ' + permanentPreferences.defaultFontType.value}
       if(_.isNull(messageInfo.titleColor)||_.isUndefined(messageInfo.titleColor)){ messageInfo.titleColor = '#000000'}
       if(_.isNull(messageInfo.sizeAndFont)||_.isUndefined(messageInfo.sizeAndFont)){messageInfo.messageSizeAndFont = '13px ' + permanentPreferences.defaultFontType.value}
    if(_.isNull(messageInfo.messageColor)||_.isUndefined(messageInfo.messageColor)){ messageInfo.messageColor = '#000000'}
    if(_.isNull(messageInfo.buttonSizeAndFont)||_.isUndefined(messageInfo.buttonSizeAndFont)){messageInfo.buttonSizeAndFont = '13px ' + permanentPreferences.defaultFontType.value}
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
     var okayX   =  stageWidth/2 - messageInfo.distanceBetweenButtons/2 - messageInfo.okayWidth    
     var cancelX =  stageWidth/2 + messageInfo.distanceBetweenButtons/2 
        }
  
//SET MORE DEFAULTS

var defaults = {}
defaults.checkBox = false
defaults.checkBoxText = 'Dont show this message again.'
 defaults.checkBoxTextColor = messageInfo.messageColor
defaults.checkBoxFontSize = 10
defaults.checkboxFontType = permanentPreferences.defaultFontType.value
defaults.modal = false
defaults.timeout = 20000

//defaults.checkBoxCheckedEvent = function(){}
//defaults.checkBoxUncheckedEvent = function(){}

_.defaults(messageInfo, defaults)


//**************************************ASSIGN DEFAULT EVENTS*******************:

//OK
   if(_.isString(messageInfo.okayEvent) ){ messageInfo.okayEvent = eval(messageInfo.okayEvent) }
         //set default okayEvent
      if(!_.isFunction(messageInfo.okayEvent)){messageInfo.okayEvent = function(e) { self.events.onButtonClick(e);  messageBoxAPI.hide()} }

//CANCEL
if(_.isString(messageInfo.cancelEvent) ){messageInfo.cancelEvent = eval(messageInfo.cancelEvent)}
       //set default cancelEvent
      if(!_.isFunction(messageInfo.cancelEvent)){messageInfo.cancelEvent = function(e) { self.events.onButtonClick(e);  messageBoxAPI.hide()} }

//CHECKBOX
  if(_.isString(messageInfo.checkBoxUncheckedEvent) ){ messageInfo.checkBoxUncheckedEvent =  eval(messageInfo.checkBoxUncheckedEvent)}
  if(_.isString(messageInfo.checkBoxCheckedEvent) ){ messageInfo.checkBoxCheckedEvent =  eval(messageInfo.checkBoxCheckedEvent)}

//CLOSE X
if(_.isString(messageInfo.closeWindowEvent) ){ messageInfo.closeWindowEvent = eval(messageInfo.closeWindowEvent)      }
 if(!_.isFunction(messageInfo.closeWindowEvent)){messageInfo.closeWindowEvent = function(e) {   self.events.onButtonClick(e);  messageBoxAPI.hide()} }



//===================================CREATE BLANK ITEMS=============================================

var createBlankItems = function(){
        //background bitmap and closeX image are in the this.setDefaults() function
        //set proper x, y, width, and height of background and closeX image

     //background bitmap 
        messageBoxItems.window = new self.images.Item(messageBoxWindowX,messageBoxWindowY,messageBoxWindowWidth,messageBoxWindowHeight, getZ('background',newStageNumber))

 //---------------------------------title---------------------------------
        messageBoxItems.windowTitle = new self.images.Item (messageBoxWindowX,messageBoxWindowY, messageBoxWindowWidth,outerTopHeight,getZ('text',newStageNumber))

         //----------------------------message---------------------------
         var textHeight = innerMessageBoxHeight - textTopOffset - buttonButtomOffset - buttonHeight - textBottomOffset - maxDistanceFromButtonsToCheckOption

        messageBoxItems.message = new self.images.Item (textX,innerMessageBoxY+textTopOffset, innerMessageBoxWidth -textLeftOffset*2 ,textHeight, getZ('text',newStageNumber))
       

    //-----------------------add closeX Image----------------------------------------------
            var closeX = messageBoxWindowX+messageBoxWindowWidth - closeXRightOffset - closeXWidth
        var closeY =  messageBoxWindowY+ closeXTopOffset 

            //add closeX Image
         messageBoxItems.closeWindow =  new self.images.Item (closeX,closeY,closeXWidth,closeXHeight, getZ('background',newStageNumber)) 
//closex messages
if(messageInfo.closeWindowMessages){  messageBoxItems.closeWindow.messages = messageInfo.closeWindowMessages}
     
   //--------------------------------OK button--------------------------------
        messageBoxItems.okay =  new self.images.Item (okayX, buttonY, messageInfo.okayWidth,buttonHeight,getZ('buttons',newStageNumber)) 
          //asign messages if okaymessages exists
            if(messageInfo.okayMessages){  messageBoxItems.okay.messages = messageInfo.okayMessages}

  
//--------------------------------cancel button--------------------------------
        if(messageInfo.cancel){
        messageBoxItems.cancel =  new self.images.Item (cancelX,buttonY, messageInfo.cancelWidth,buttonHeight, getZ('buttons',newStageNumber)) 
     
             //add message to cancel if available
        if(messageInfo.cancelMessages){ messageBoxItems.cancel.messages = messageInfo.cancelMessages }
          
          }//if we are going to display cancel

//--------------------checkbox option------------------------------
if(messageInfo.checkBox){

   messageBoxItems.checkBoxUnchecked = new self.images.Item(0, 0, 0, 0, getZ('buttons',newStageNumber))
 messageBoxItems.checkBoxChecked = new self.images.Item(0, 0, 0, 0, getZ('buttons',newStageNumber))
 messageBoxItems.htmlCheckBox = new self.images.Item(0, 0, 0, 0, getZ('buttons',newStageNumber))

}//if we need checkBox

}//create blank items private function


createBlankItems()




//**************************************************DISPLAY MODAL MESSAGEBOX****************************************
 if(messageInfo.html === true){



console.log('displaying qtip message box')
var additionalContent = []
var onRenderFunctions = []
var onShowFunctions = []


var messageCSS = {'text-align':'center', 'pointer-events':'none'}
if(!_.isString(messageInfo.style)){
  messageCSS['font'] = messageInfo.messageSizeAndFont
 messageCSS['color'] = messageInfo.messageColor
}

var content = $('<p>').addClass(self.css.unselectable).css(messageCSS)

content.html(messageString)
$(div).append(content)

messageBoxItems.message.addElement(content[0], 'text', {position:false, size:false})


//button defaults:
if(messageBoxItems.okay instanceof self.images.Item || messageBoxItems.cancel instanceof self.images.Item){

  var bootstrapOptions = {
    css:{
  'font':messageInfo.buttonSizeAndFont
,'position':'relative'
}//okay button css
,attr:{'class':''}//eliminate default classes and make id
,position:false//prevent bootstrap from positioning
,class:self.css.unselectable
}//bootstrap options

if(!_.isString(messageInfo.style)){

bootstrapOptions.css['color'] =  messageInfo.buttonTextColor
bootstrapOptions.css['background-color'] =  messageInfo.buttonBackgroundColor

}


}//if we are going to display at least one bootstrap button, assign default options so we dont have to do it again


if(messageInfo.checkBox){

//destroy canvas type checkboxes
  messageBoxItems.checkBoxUnchecked = null
  messageBoxItems.checkBoxChecked = null

//get font-size of message, we will use that for checkbox dimensions:
var checkBoxSize = parseInt  ($(messageBoxItems.message.text).css('font-size')) + 1
//var checkBoxSize = 10

//CHECKBOX input (image)
var jqueryCheckBox = $('<input>').attr({
  'type':'checkbox'
  ,'class': self.css.unselectable
}).css({

'width':checkBoxSize
,'height':checkBoxSize

})
jqueryCheckBox.addClass(self.css.unselectable)

//ADD ONCLICK EVENTS
jqueryCheckBox.on('click', function(e){
//unchecked
if(jqueryCheckBox.prop('checked') === true && _.isFunction(messageInfo.checkBoxUncheckedEvent)){
  messageInfo.checkBoxUncheckedEvent(e)
}

//checked
else if(jqueryCheckBox.prop('checked') === false && _.isFunction(messageInfo.checkBoxCheckedEvent) ){
  messageInfo.checkBoxCheckedEvent(e)
}

})

onShowFunctions.push(function(e, api){

jqueryCheckBox.css('display','inline')

})


messageBoxItems.htmlCheckBox.addElement(jqueryCheckBox[0], 'image', {position:false, size:false})
additionalContent.push(jqueryCheckBox)


var checkBoxTextCSS = {
  'text-align':'left'
,'font-size':messageInfo.checkBoxFontSize
,'overflow-x':'hidden'
,'position': 'relative'
,'left' : checkBoxSize + 'px'
,'cursor':'pointer'
}
if(!_.isString(messageInfo.style)){

checkBoxTextCSS.font =  messageInfo.checkboxFontType
checkBoxTextCSS.color =  messageInfo.checkBoxTextColor

}



//TEXT of the checkbox
var jqueryCheckBoxText = $('<p>').css(checkBoxTextCSS).addClass(self.css.unselectable)

jqueryCheckBoxText.html(messageInfo.checkBoxText+'<br>')


//MAKE IT SO CLICKING THE TEXT WILL CHECK THE BOX ALSO
jqueryCheckBoxText.on('click.triggerBox', function(e){
console.log(e)
jqueryCheckBox.trigger('click')

})



messageBoxItems.htmlCheckBox.addElement(jqueryCheckBoxText[0], 'text', {position:false, size:false})
additionalContent.push(jqueryCheckBoxText)
onShowFunctions.push(function(e, api){jqueryCheckBoxText.css('display','inline')})
}//if we are going to display the checkbox

//OK
if(messageBoxItems.okay instanceof self.images.Item){

//recalibrate inner width
bootstrapOptions.css.width = messageBoxItems.okay.size.x + 'px'
bootstrapOptions.css.height = messageBoxItems.okay.size.y + 'px'

//bootstrapOptions.attr.id = self.css.okayButton
bootstrapOptions.onClick = messageInfo.okayEvent
messageBoxItems.okay.addBootstrapButton(messageInfo.okayText, bootstrapOptions)
$(messageBoxItems.okay.image).attr('id', self.css.messageBoxButton)
//increase width and height of item
var okayPositionData = getDisplayObjectPositionAndSizeData(messageBoxItems.okay, {position:false})
messageBoxItems.okay.size.x = messageBoxItems.okay.size.x + okayPositionData.extraWidth
messageBoxItems.okay.size.y = messageBoxItems.okay.size.y + okayPositionData.extraHeight

//THIS IS CALlED LATER AND WE CAN HAVE BUTTONS ON THE SAME LINE
onShowFunctions.push(function(e, api){$(messageBoxItems.okay.image).css('display','inline')})
additionalContent.push(messageBoxItems.okay.image)
}//if displaying OK button

if(messageBoxItems.cancel instanceof self.images.Item){

//recalibrate inner width and height
bootstrapOptions.css.width = messageBoxItems.cancel.size.x + 'px'
bootstrapOptions.css.height = messageBoxItems.cancel.size.y + 'px'

//bootstrapOptions.attr.id = self.css.cancelButton
bootstrapOptions.onClick = messageInfo.cancelEvent
messageBoxItems.cancel.addBootstrapButton(messageInfo.cancelText, bootstrapOptions)
$(messageBoxItems.cancel.image).attr('id', self.css.messageBoxButton)

//increase width and height of item
var cancelPositionData = getDisplayObjectPositionAndSizeData(messageBoxItems.cancel, {position:false})
messageBoxItems.cancel.size.x = messageBoxItems.cancel.size.x + cancelPositionData.extraWidth
messageBoxItems.cancel.size.y = messageBoxItems.cancel.size.y + cancelPositionData.extraHeight

//THIS IS CALlED LATER AND WE CAN HAVE BUTTONS ON THE SAME LINE
onShowFunctions.push(function(e, api){$(messageBoxItems.cancel.image).css('display','inline')})

additionalContent.push(messageBoxItems.cancel.image)
}//if displaying cancel button

//add the content into the jquery item, and then we can load it into the qtip
_.each(additionalContent, function(value, element, list){

content = content.add(value)

})


//create qtip on the div

var messageBoxQtipOptions = {
  overwrite:false
        ,content: {
            text: content
           // ,attr: ''
            ,button:true
           // ,close:true
            ,title: messageInfo.title
        }//content
        ,position: {
            my: 'center', at: 'center'
            ,target: $(div)
          ,container:$(div)
        }//position

        ,show: {
            ready: true
            ,fixed:true
            
            ,modal: {
                on: messageInfo.modal
               ,blur: false
            }//show.modal
          
            
        }//show
        ,hide: false
        ,style: messageInfo.style
        ,events: {
            render: function(event, api) {
              console.log('render event called')

//keep all items within the max width of the main tooltip div
              api.elements.tooltip.find('*').add(api.elements.tooltip).css({
                'max-width': messageBoxWindowWidth*0.72 + 'px'
//,'max-height':'none'
              }).addClass(self.css.unselectable)     
//THIS REMOVES the close tooltip from our close button and any other tooltips inside the box
.removeAttr('title')

//PLACE OVERLAY BELOW EVERYTHING ELSE
if(_.isObject(api.elements.overlay)){
api.elements.overlay.css({
'height':'100%'
,'width':'100%'
 , 'z-index': 0
 ,'position':'absolute'
})
}

                api.elements.tooltip.css({
'max-width': messageBoxWindowWidth + 'px'
//,'max-height':'none'

                })

_.each(onRenderFunctions, function(value, element, list){

value(e, api)

})
                
            }//events.render
            //make sure to DESTROY the messagebox data on hide
            ,hide: function(event, api) { api.destroy();messageBoxAPI.hide(newStageNumber)}//events.hide
            ,show:  function(e, api){

createjs.Tween.get(api.elements.content).wait(0)
.call(function(){
//display div to allow positioning

              //POSITION CANCEL AND OKAY LEFT LOCATIONS
//get innerWidth of content div
var innerContentWidth = api.elements.content.width()
console.log('innerconten width: ' +innerContentWidth)
console.log('distance bettn button: '+messageInfo.distanceBetweenButtons)
console.log(messageBoxItems.okay.size.x)
//if both cancel and OK we position them
if(messageBoxItems.cancel && messageBoxItems.cancel.image && messageBoxItems.okay && messageBoxItems.okay.image){
messageInfo.distanceBetweenButtons
$(messageBoxItems.okay.image).css('left', innerContentWidth/2 - messageInfo.distanceBetweenButtons/2 - messageBoxItems.okay.size.x)
$(messageBoxItems.cancel.image).css('left', innerContentWidth/2 + messageInfo.distanceBetweenButtons/2 - messageBoxItems.okay.size.x)

}
//if only 1 we position in center
else if (messageBoxItems.okay && messageBoxItems.okay.image){var onlyButton = messageBoxItems.okay}
  else if(messageBoxItems.cancel && messageBoxItems.cancel.image){var onlyButton = messageBoxItems.cancel}

if(onlyButton instanceof self.images.Item){

$(onlyButton.image).css('left', innerContentWidth/2 - onlyButton.size.x/2)

}

console.log('displaying messagebox div')
setOrGetDisplayStatusOfCanvasDivByStageNumberOrItemTrueDisplaysFalseHidesOtherGets(newStageNumber, true)
})//delay to adjust x of our bttons


//APPEND OVERLAY TO OUR DIV
if(_.isObject(api.elements.overlay)){$(self.getParentOfStageObject(newStageNumber).div).append(api.elements.overlay)}

//THIS EDITS OUR TITLE CSS
if(_.isObject(api.elements.title)){
var titleCSS = {
  'text-align':'center'
,'font': messageInfo.titleSizeAndFont
,'pointer-events':'none'
}
if(!_.isString(messageInfo.style)){titleCSS.color = messageInfo.titleColor}
api.elements.title.css(titleCSS)
}//if we have a title element

_.each(onShowFunctions, function(value, element, list){

value(e, api)

})

//DISPLAY DIV AT LATEST POSSIBLE MOMENT
setOrGetDisplayStatusOfCanvasDivByStageNumberOrItemTrueDisplaysFalseHidesOtherGets(newStageNumber, true)

 }//events.show
            }//events
            

}//qtip options

$(div).qtip(messageBoxQtipOptions)
//self.displayChildren(messageBoxItems)

console.log('modal completed')




}//IF DISPLAY MODAL MESSAGEBOX

else{
        //background bitmap and closeX image are in the this.setDefaults() function
        //set proper x, y, width, and height of background and closeX image

     //background bitmap 
        messageBoxItems.window = new self.images.Item(messageBoxWindowX,messageBoxWindowY,messageBoxWindowWidth,messageBoxWindowHeight, getZ('background',newStageNumber))
messageBoxItems.window.addBitmap(permanentPreferences.sourceObjects.value.messageBoxBackground, hideOrDisplayChildrenOptions)
        

   //MAKE WINDOW DRAGGABLE
                  messageBoxItems.window.on('mousedown',function(e){
          var options = {animationTarget:messageBoxItems}
                  self.events.mouseDownClickAndDrag(e, options)
                }
                )



 //---------------------------------title---------------------------------
        messageBoxItems.windowTitle = new self.images.Item (messageBoxWindowX,messageBoxWindowY, messageBoxWindowWidth,outerTopHeight,getZ('text',newStageNumber))
         messageBoxItems.windowTitle.addText(messageInfo.title, messageInfo.titleSizeAndFont, messageInfo.titleColor)

         //----------------------------message---------------------------
         var textHeight = innerMessageBoxHeight - textTopOffset - buttonButtomOffset - buttonHeight - textBottomOffset - maxDistanceFromButtonsToCheckOption

        messageBoxItems.message = new self.images.Item (textX,innerMessageBoxY+textTopOffset, innerMessageBoxWidth -textLeftOffset*2 ,textHeight, getZ('text',newStageNumber))
       
var messageTextOptions = {
  centerTextY:false
  ,  lineWidth :messageBoxItems.message.size.x*.9 
,maxWidth : null
}
        messageBoxItems.message.addText( messageString, messageInfo.messageSizeAndFont, messageInfo.messageColor, messageTextOptions)



    //-----------------------add closeX Image----------------------------------------------
            var closeX =  messageBoxWindowX+messageBoxWindowWidth - closeXRightOffset - closeXWidth
        var closeY =  messageBoxWindowY+ closeXTopOffset 

            //add closeX Image
         messageBoxItems.closeWindow =  new self.images.Item (closeX,closeY,closeXWidth,closeXHeight, getZ('background',newStageNumber)) 
messageBoxItems.closeWindow.addBitmap (permanentPreferences.sourceObjects.value.messageBoxCloseX, hideOrDisplayChildrenOptions)


if(messageInfo.closeWindowMessages){ messageBoxItems.closeWindow.messages = messageInfo.closeWindowMessages}
messageBoxItems.closeWindow.on('click', messageInfo.closeWindowEvent)


   //--------------------------------OK button--------------------------------
        messageBoxItems.okay =  new self.images.Item (okayX,buttonY, messageInfo.okayWidth,buttonHeight,getZ('buttons',newStageNumber)) 
        self.images.itemAsRectangle( messageBoxItems.okay, messageInfo.buttonBackgroundColor )
        messageBoxItems.okay.addText(messageInfo.okayText, messageInfo.buttonSizeAndFont,  messageInfo.buttonTextColor)
            //asign messages if okaymessages exists
            if(messageInfo.okayMessages){  messageBoxItems.okay.messages = messageInfo.okayMessages}
                
                //assign event if assigned
messageBoxItems.okay.on('click', messageInfo.okayEvent)
  
//--------------------------------cancel button--------------------------------
        if(messageInfo.cancel){
        messageBoxItems.cancel =  new self.images.Item (cancelX,buttonY, messageInfo.cancelWidth,buttonHeight, getZ('buttons',newStageNumber)) 
        self.images.itemAsRectangle( messageBoxItems.cancel, messageInfo.buttonBackgroundColor )
        messageBoxItems.cancel.addText(messageInfo.cancelText, messageInfo.buttonSizeAndFont,  messageInfo.buttonTextColor)
        //add message to cancel if available
        if(messageInfo.cancelMessages){ messageBoxItems.cancel.messages = messageInfo.cancelMessages  }
messageBoxItems.cancel.on('click', messageInfo.cancelEvent)
}//if displaying cancel button

    else{messageBoxItems.cancel = null}


//--------------------checkbox option------------------------------
if(messageInfo.checkBox){

   messageBoxItems.checkBoxUnchecked = new self.images.Item(0,0,0,0, getZ('buttons',newStageNumber))
 messageBoxItems.checkBoxChecked = new self.images.Item(0,0,0,0, getZ('buttons',newStageNumber ))
//console.log('creating checkBox for messagebox');console.log(messageInfo)
self.images.itemsAsCheckBoxes(messageBoxItems.checkBoxUnchecked,  messageBoxItems.checkBoxChecked, messageInfo.checkBoxText, {color:messageInfo.checkBoxTextColor})


//center the checkbox button (X)
var checkBoxWidth = messageBoxItems.checkBoxUnchecked.size.x
var checkBoxX = messageBoxWindowX + messageBoxWindowWidth/2 - checkBoxWidth/2

//get checkBoxY function
var getCheckBoxY = function(){
  //first check for the bottom of the messageBoxText
var messageBoxMessage = messageBoxItems.message
var messageBoxTextBottom = getDisplayObjectPositionAndSizeData(messageBoxMessage.text, {size:false}).x  + messageBoxMessage.text.getMeasuredHeight()

var defaultCheckBoxY = messageBoxItems.okay.position.y - maxDistanceFromButtonsToCheckOption -  messageBoxItems.checkBoxUnchecked.size.y

//in this case everything is fine and we do nothing
if(defaultCheckBoxY - messageBoxTextBottom >= maxDistanceFromButtonsToCheckOption){}

//in this case we dont need to resize our message but we ned to move the checkbox closer to the ok/cancel buttons
else if(defaultCheckBoxY - messageBoxTextBottom >= maxDistanceFromButtonsToCheckOption * -1 ){
  var distanceFromButtonsToMessageBottom = messageBoxItems.okay.position.y - messageBoxTextBottom
 var distanceFromCheckBoxToMessageBottomAndButtons =   (distanceFromButtonsToMessageBottom - messageBoxItems.checkBoxUnchecked.size.y)/2
var checkBoxY = messageBoxItems.okay.position.y - distanceFromCheckBoxToMessageBottomAndButtons
}//if message is a bit long and we need to tweak
//in this case message runs too long to display the check box, we must reduce the height of the message
else if(defaultCheckBoxY - messageBoxTextBottom < maxDistanceFromButtonsToCheckOption * -1 ){
//function to reduce size of messageBoxText
//var checkBoxY = getCheckBoxY()
}//if message is too long and we need to resize

if(_.isNumber(checkBoxY) && !_.isNaN(checkBoxY)){return checkBoxY}
  else{return defaultCheckBoxY}

}//getCheckBoxY function


//assign Y of checkbox according to messageText
var checkBoxY = getCheckBoxY()
  self.setImageItemPositionAndTextBasedOnImageChange(  messageBoxItems.checkBoxUnchecked, checkBoxX, checkBoxY )
  self.setImageItemPositionAndTextBasedOnImageChange(  messageBoxItems.checkBoxChecked,  checkBoxX, checkBoxY)


//assign onClick functions
 messageBoxItems.checkBoxUnchecked.on('click', function(e){
if(_.isFunction(messageInfo.checkBoxUncheckedEvent)){messageInfo.checkBoxUncheckedEvent(e)}
console.log('unchecked mesagebox checkbox clicked')
 var stagesToUpdate = [] 
 stagesToUpdate.push (self.hideChildren(messageBoxItems.checkBoxUnchecked, {update:false} ) )
 stagesToUpdate.push (self.displayChildren(messageBoxItems.checkBoxChecked, {update:false}) )
 self.updateStages(stagesToUpdate)

 })//unchecked.image.onClick
messageBoxItems.checkBoxChecked.on('click', function(e){
if(_.isFunction(messageInfo.checkBoxCheckedEvent)){messageInfo.checkBoxCheckedEvent(e)}
 var stagesToUpdate = [ self.hideChildren(messageBoxItems.checkBoxChecked, {update:false}), self.displayChildren(messageBoxItems.checkBoxUnchecked, {update:false})]
 self.updateStages(stagesToUpdate)
})//checked.image.onClick

}//if we want to display check Box

//if we not displaying textBox
else{
  messageBoxItems.checkBoxUnchecked = null
    messageBoxItems.checkBoxChecked = null
}


           stagesToUpdate.push(self.displayChildren(messageBoxItems, hideOrDisplayChildrenOptions))
stagesToUpdate.push(self.hideChildren(  messageBoxItems.checkBoxChecked, hideOrDisplayChildrenOptions))

//display messageBoxCanvas
setOrGetDisplayStatusOfCanvasDivByStageNumberOrItemTrueDisplaysFalseHidesOtherGets(newStageNumber, true )
}//if we are displaying the traditional canvas

//display messageBoxCanvas
//setOrGetDisplayStatusOfCanvasDivByStageNumberOrItemTrueDisplaysFalseHidesOtherGets(newStageNumber, true )

messageBoxAPI.setCurrent( newStageNumber)

 hideOrDisplayChildrenOptions.update = update
if(update !== false){this.updateStages(stagesToUpdate)}
      else{return stagesToUpdate}

    }//display messagebox


    this.displayCashier = function(info, hideOrDisplayChildrenOptions){
    if(!hideOrDisplayChildrenOptions){var hideOrDisplayChildrenOptions = {}}
        var update = hideOrDisplayChildrenOptions.update
        hideOrDisplayChildrenOptions.update = false

        var stagesToUpdate = []

      var cashierImageContainerIndex = this.images.cashier.window.position.z.container


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
        
       this.images.cashier.currency.updateText('Blinds:')
       this.images.cashier.blinds.updateText(info.currency_per_chip*info.small_blind+'/'+info.currency_per_chip*info.big_blind + ' '+info.currency)
       
         this.images.cashier.tableNameValue.updateText(info.table_name) 
        this.images.cashier.tableMinValue.text.text = info.currency_per_chip*info.table_min
        this.images.cashier.tableMaxValue.text.text = info.currency_per_chip*info.table_max
        this.images.cashier.playerMinValue.text.text = info.currency_per_chip*info.min
       this.images.cashier.accountBalanceValue.text.text = this.gameState.cashier.balance + ' '+info.currency
if(this.gameState.cashier.balance < this.gameState.cashier.min ){ 
var accountBalanceColor = 'red'
/*
  this.images.cashier.accountBalanceValue.text.text = this.images.cashier.accountBalanceValue.text.text + '//CLICK HERE'

this.images.cashier.accountBalanceValue.on('click', function(e){

//POST route /increase_funbucks_by_100
// window.open('/account', 'Account', 'width=800,height=770 ,left=200,top=200,location=0,toolbar=no,menubar=no,titlebar=no,directories=no,scrollbars=yes')
 
$.post('/increase_funbucks_by_100')
socket.emit('get_add_chips_info')

}, 'text')//onclick for account balance value
*/

}//if acount balance is too low

else{var accountBalanceColor = this.images.cashier.accountBalanceValue.textColor}

  this.images.cashier.accountBalanceValue.text.color = accountBalanceColor
this.images.cashier.accountBalance.text.color = accountBalanceColor
/*
       var autoRebuyFlagValue = self.getPreactionData('autorebuy')
if(_.isObject(autoRebuyFlagValue)){autoRebuyFlagValue = autoRebuyFlagValue.value }
setAutoRebuyValueText (  autoRebuyFlagValue)
*/

       //clear all initial values of text boxes
        $('#maxRadio').prop('checked', false)
         $('#autoRebuyRadio').prop('checked', false)
          $('#otherAmountRadio').prop('checked', false)
             $("#otherAmount").val(self.gameState.cashier.min)
           $('#autoRebuyAmount').val(this.gameState.cashier.table_min)
       $("#maxAmount").val(this.gameState.cashier.max)
        $("#maxAmount").attr("readonly", true)

//displayMin Amount as auto feature
  $('#otherAmountRadio').prop('checked', true)

//display textboxes for adding chips
          var htmlcashier = document.getElementById('cashier')
    htmlcashier.style.display = 'inline'
//document.getElementById('cashierDiv').style.display = 'inline'


var cashierStageNumber = this.images.cashier.window.position.z.stage


        console.log(this.images.cashier)


validateCashierDisplayBasedOnUserInput(true)
           stagesToUpdate.push( this.displayChildren(this.images.cashier, hideOrDisplayChildrenOptions) )
stagesToUpdate.push(self.updateUserOptionsBasedOnFlagsAndPreactions(hideOrDisplayChildrenOptions))

//display cashierCanvas
//$(this.arrayOfParentsOfStageAndOfContainerArray[ this.images.cashier.window.position.z.stage].stage.canvas).css('display','inline')

setOrGetDisplayStatusOfCanvasDivByStageNumberOrItemTrueDisplaysFalseHidesOtherGets(self.images.cashier.window, true)

if(update !== false){this.updateStages(stagesToUpdate)}
  else{return stagesToUpdate}

}


this.isPreference = function (preference){

if(_.isObject(preference) && (!_.isUndefined(preference.value)  || _.isFunction (preference.updateValue) ) ){return true}
  else{ return false}

}

this.images.Item.prototype.isCSSDisplayed = function(){

  if(_.isElement(this.image)){//if html element
    var displayStatus = $(this.image).css('display')
  if(displayStatus !== 'none' && displayStatus !== 'hidden'){return true}
     
  }//check html element

    if(_.isElement(this.text)){//if html element
 var displayStatus = $(this.text).css('display')
  if(displayStatus !== 'none' && displayStatus !== 'hidden'){return true}

      }//check text element
}//check if element is added to stage

this.images.Item.prototype.isDisplayed = function(){
if(this.isCSSDisplayed() === true){return true}
  if(this.isAddedToStage() === true){return true}
    return false

}

var isItemDisplayed = function(item){
  if(item instanceof self.images.Item){return item.isDisplayed()}
}

this.images.Item.prototype.isAddedToStage = function(){

var isItemAddedToStage = function(item){
var result = false

if(item instanceof self.images.Item){
 // console.log('checking if item is added to stage')
//console.log(item)
if(item.image instanceof createjs.DisplayObject 
  && self.getParentOfStageObject(item).containers[item.position.z.container].contains(item.image) === true){
result = true
}

//TEXT
if(result !== true && item.text instanceof createjs.DisplayObject 
  && self.getParentOfStageObject(item).containers[item.position.z.container+1].contains(item.text) === true){
result = true
}

}//make sure parameter is Item

return result
}


return isItemAddedToStage(this)

}


this.getCurrentStackSizes = function(){
var stackSizes = []

for(var i = 0;i<this.gameState.numSeats;i++){
  //fetch stack size
var size =  parseInt(this.images.seats[i].stackSize.getText()) 
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
  if(i === 0 || (potSize > 0 && potSizeItem.isAddedToStage)){
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
//console.log('get current potsizes called = ');console.log(potSizes)
return potSizes
}


this.getCurrentBetSizes = function(){
 var betSizes = []
for(var i =0;i<this.gameState.numSeats;i++){
  var betSizeItem = this.images.seats[i].bet

  if(betSizeItem.isAddedToStage()){
betSizes.push(parseFloat(betSizeItem.getText()))
}//if betSize is displayed

//if bet size is displaed check if player has cards in front of him

else if(this.images.seats[i].hiddenCards[0].isAddedToStage()||this.images.seats[i].shownCards[0].isAddedToStage()) {
betSizes.push(0)}//if not push 0

else{betSizes.push(false)}//else we push null
}
return betSizes
}

    this.streetEnds = function(potSizes){
 var animationTime = 350
        var ticks = 30
var chipMoveSound = createjs.Sound.createInstance(this.images.sources.moveChipsSound)

//unbind scroll wheel events
    $(self.getParentOfStageObject(this.images.betSlider.slider).div).off('mousewheel.adjustBetSize')


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
  console.error('parallel chips to pot animations resulted in errors')
  console.error(err)
  throw''
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
_.each(chipArray, function(chipItem, chipNumber) {
allTemporaryItems.push(chipItem)
//push function into array

var tempCallBackNumber0 = chipIntoPotCallbackNumber
asyncParallelChipIntoPotFunctionArray.push(function(callback){
var animationData = {//define animation variables
  time:animationTime,
  numTicks:ticks,
  item: chipItem,
  finalX :deltaX + chipItem.image.x,
finalY : deltaY+chipItem.image.y,
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
  if(numPotsToFeed > 0){chipMoveSound.play()}//play sound only if we are raking in chips
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



var canPlayerActDefaultsToUser = function(seat){
if(!_.isNumber(seat)){var seat = self.gameState.userSeatNumber}


var currentStackSizes = self.getCurrentStackSizes()
var currentBetSizes = self.getCurrentBetSizes()
var compactedStackSizes = _.compact(currentStackSizes)
//console.log('checking if all in situation')
//console.log(currentStackSizes)
//console.log(compactedStackSizes)

if(!_.isNumber(seat)){return false}
else if(currentStackSizes[self.gameState.userSeatNumber] <= 0){return false}
  else if (compactedStackSizes.length <= 0){return false}
else if(compactedStackSizes.length <= 1  && self.getHighBet() <=  currentBetSizes[self.gameState.userSeatNumber] ){return false}
else {return true}

}//canPlayerActDefaultsToUser

var setAutoRebuyValueText = function(value, options){
if(!options){var options = {}}
var stagesToUpdate = []

if(!_.isNumber(value) || _.isNaN(value)  || value <=0 ){var value = 'disabled' }
stagesToUpdate.push(updateItemText (self.images.cashier.autoRebuyValue, value, options)   )

if(options.update !== false) {self.updateStages(stagesToUpdate)}
  else{return stagesToUpdate}

}

this.updateUserOptionsBasedOnFlagsAndPreactions = function(options){
if(!options){var options = {}}
  var update = options.update
options.update = false
var stagesToUpdate = []

var currentStackSizes = self.getCurrentStackSizes()
  stagesToUpdate.push(   self.updatePreactionOptionDisplayBasedOnLocalData(options) )

if(!_.isNumber(self.gameState.userSeatNumber)){

stagesToUpdate.push( this.hideSeatedOptions(options) )

  console.log  ('updated options based on non seated user. if you are seated at a table you should NOT be seeing this')
}

else{  //if player is seated

//==================CASHIER UPDATES ======================
//update autoRebuyText
var autoRebuyFlagValue = self.getPreactionData('autorebuy')
//console.log('retreived preaction data of autorebuy value = ' + autoRebuyFlagValue)

var displayDisableAutoRebuy = false

//console.log(typeof autoRebuyFlagValue)

//determine whether to display the autorebuy button
if(_.isNumber(autoRebuyFlagValue)){
var displayDisableAutoRebuy = true
}

  //update text 
stagesToUpdate.push(setAutoRebuyValueText(autoRebuyFlagValue, options))
//update button postions of addchips, cancel, and disableautorebuy
stagesToUpdate.push(self.images.positionCashierButtons(displayDisableAutoRebuy, options))

//enable basic seatedoptions
   this.images.getChips.on('click', self.events.onButtonClick)
     this.images.standUp.on('click', self.events.userStands)
     stagesToUpdate.push (this.hideChildren(this.images.getChipsDisabledShape,options) )
stagesToUpdate.push(  this.hideChildren(this.images.standUpDisabledShape,options))


//var gameStateSeatObject = self.gameState.seats[self.gameState.userSeatNumber]
var preactionOptionData = self.getPreactionOptionValues()

                  //check if gameStateSeatObject is sitting out
                  if(self.getPreactionData('sitting_out')){
                    console.log('updating user options based on sitting_out user')
        stagesToUpdate.push(self.hideChildren(self.images.sitOutNextBlind,options))
stagesToUpdate.push( self.hideChildren(self.images.sitOutNextBlindOn,options))
stagesToUpdate.push( self.hideChildren(self.images.foldToAnyBet,options))
stagesToUpdate.push( self.hideChildren(self.images.foldToAnyBetOn,options))
              stagesToUpdate.push(this.playerSitsOut(self.gameState.userSeatNumber,options))
              stagesToUpdate.push(self.hideChildren(self.images.sitOutNextHand,options))
              stagesToUpdate.push(self.displayChildren(self.images.sitOutNextHandOn,options))
                       //either display rebuy OR sitin if user is sitting out
             if(currentStackSizes[self.gameState.userSeatNumber] <= 0){
        stagesToUpdate.push(   self.hideChildren(self.images.sitIn,options))
        stagesToUpdate.push(   self.displayChildren(self.images.rebuy,options))
}
                 else{ 
       stagesToUpdate.push(    self.hideChildren(self.images.rebuy,options))
        stagesToUpdate.push(   self.displayChildren(self.images.sitIn,options))
                }
}//user.sitting_out == true

         //if user is NOT sitting out
         else{
        //   console.log('updating user options based on NOT sitting_out user')
              stagesToUpdate.push(       self.hideChildren(self.images.sitIn,options))
     stagesToUpdate.push(      self.hideChildren(self.images.rebuy,options))
             //display sitout next hand depending on user's flag
           //  console.log('checking for flags.pending_sit_out == '+flags.pending_sit_out)
              if(self.getPreactionData('pending_sit_out')){
stagesToUpdate.push( self.hideChildren(self.images.sitOutNextBlind,options))
stagesToUpdate.push( self.hideChildren(self.images.sitOutNextBlindOn,options))
stagesToUpdate.push( self.hideChildren(self.images.sitOutNextHand,options))
stagesToUpdate.push( self.displayChildren(self.images.sitOutNextHandOn,options))
              }//if pending_sit_out == true

else{//if user is not pending sit out, and not sitting out
  stagesToUpdate.push( self.hideChildren(self.images.sitOutNextHandOn,options))
        stagesToUpdate.push(   self.displayChildren(self.images.sitOutNextHand,options))
                            //display sit out next big blind depending on user's flag
              if(self.getPreactionData('post_blind') === false){
                console.log('displaying sitoutnextblindon')
stagesToUpdate.push( self.hideChildren(self.images.sitOutNextBlind,options))
       stagesToUpdate.push(          self.displayChildren(self.images.sitOutNextBlindOn,options))
              }
                    else{
                  stagesToUpdate.push(     self.hideChildren(self.images.sitOutNextBlindOn,options))
                 stagesToUpdate.push(      self.displayChildren(self.images.sitOutNextBlind,options))
                    }
}//if user is not pending sit out, and not sitting out

  //check if user is involved in hand and players can act
             if(self.getPreactionData('inHand') === true && canPlayerActDefaultsToUser() === true){
    //          if(currentStackSizes[self.gameState.userSeatNumber] > 0){

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
             
             //disable scroll event if user is not to act
if(this.getPreactionData('toAct',{seat:'table'}) !== self.gameState.userSeatNumber){
  
 $(self.getParentOfStageObject(self.images.betSlider.slider).div).off('mousewheel.adjustBetSize')
$(window).off('mousewheel.disable')
}
/*
else{//user is to act
$(window).on('mousewheel.disable', function(e){return false})

   $(this.getParentOfStageObject(this.images.betSlider.slider).div).on('mousewheel.adjustBetSize', function(event,delta, deltaX, deltaY) {
self.events.wheelScroll(deltaY)
        })
}
*/
              /*
              }//if user has chips
              else{//if user is all-in
stagesToUpdate.push(     self.hideChildren(self.images.foldToAnyBetOn,options))
                        stagesToUpdate.push(     self.hideChildren(self.images.foldToAnyBet,options))
              }//if user all in
*/

 }//end check if user is holding cards
else{//user is not in a hand or players are all in

             //disable scroll event
$(self.getParentOfStageObject(self.images.betSlider.slider).div).off('mousewheel.adjustBetSize')

stagesToUpdate.push(     self.hideChildren(self.images.foldToAnyBetOn,options))
 stagesToUpdate.push(     self.hideChildren(self.images.foldToAnyBet,options))

}


} //end check if user is not sitting out

}//if player is seated




//console.log('updateUserOptionsBasedOnFlagsAndPreactions stages to update: ')
//console.log(stagesToUpdate)
options.update = update
if(update === false){return stagesToUpdate}
  else{this.updateStages(stagesToUpdate)}
}

this.getPermanentPreferences = function() {

//return permanentPreferences
}

this.saveSessionPreferences = function(){
//console.log('user seat preference view is:')
//console.log(sessionPreferences.changeUserSeatViewTo.value)
    socket.emit('set_flag', 'sessionPreferences', sessionPreferences)
console.log(sessionPreferences)
}

this.savePermanentPreferences = function(){

    socket.emit('set_preference', 'permanentPreferences', permanentPreferences)

}


this.initializeServerPreferenceObjects = function (currentPreferenceObject, createObjectFunction, options){
console.log('initializeserver peference called')
// socket.emit('set_flag','sessionPreferences',currentPreferenceObject)
return null


if(!options){var options = {}}

  if(!_.isNumber(options.maxDepth)){options.maxDepth = 3}
if (!_.isString(options.currentObjectString)){options.currentObjectString = ''}



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

var setPreactionDataOptions = {server:false, seat:player.seat}

    //updated local based on flags
if(_.isObject(player.flags)){
  var flags = player.flags
  console.log('updateLocalGameDataBasedOnServerPlayerObject')
console.log(flags)

if(!_.isUndefined(flags.pending_sit_out)){
  self.setPreactionData('permanent', 'pending_sit_out', flags.pending_sit_out, setPreactionDataOptions)
   }

  if(!_.isUndefined(flags.post_blind)){
   self.setPreactionData('permanent', 'post_blind', flags.post_blind, setPreactionDataOptions)
}
  if(!_.isUndefined(flags.sitting_out)){
   self.setPreactionData('permanent', 'sitting_out', flags.sitting_out, setPreactionDataOptions)
}

if(!_.isUndefined(flags.check)){
  this.setPreactionData('hand', 'check', flags.check, setPreactionDataOptions)
}
if(!_.isUndefined(flags.call)){
  this.setPreactionData('hand', 'call', flags.call, setPreactionDataOptions)
}
if(!_.isUndefined(flags.fold)){
this.setPreactionData('hand', 'fold', flags.fold,setPreactionDataOptions)
}
if(!_.isUndefined(flags.raise)){
this.setPreactionData('hand', 'raise', flags.raise, setPreactionDataOptions)
}
if(!_.isUndefined(flags.bet)){
  this.setPreactionData('hand', 'bet', flags.bet, setPreactionDataOptions)
}

}//if player.flags
self.gameState.seats[player.seat].sitting_out = player.sitting_out
self.gameState.seats[player.seat].chips = player.chips
self.gameState.seats[player.seat].username = player.username
if(_.isNumber(player.chips) && player.chips > 0){self.gameState.seats[player.seat].notEnoughChips = false}
  else{self.gameState.seats[player.seat].notEnoughChips = true}

}

var setStageUpdateStatus = function(numberOrItem, status){

self.getParentOfStageObject(numberOrItem).upToDate = status

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

//var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame

if(!_.isFunction(window.requestAnimationFrame)) window.requestAnimationFrame = function(){};

//=============================START ACTION PART OF: updateStages FUNCTION==============================

if(!options){var options  = {}}

window.requestAnimationFrame(function(){})//update DOM

  if(_.isNumber(stageNumberLeaveBlankForAll)){ //if given number as parameter

  if(this.arrayOfParentsOfStageAndOfContainerArray[stageNumberLeaveBlankForAll].upToDate !== true || options.forceUpdate === true) {
    var stagesToUpdate = getStageFamilyArray(stageNumberLeaveBlankForAll)
    updateStagesFromArray(stagesToUpdate)

}//if stage is NOT uptodate and options.update !== true
  }//if a stage number is specified as a number
 

else if(_.isArray(stageNumberLeaveBlankForAll)){ // if passed parameter as ARRAY

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
 self.updateStages( allStages, options)
return
}//if no stage number specified

window.requestAnimationFrame(function(){})

}//self.updateStages

this.animateDealerButton = function(seatNumber, time, options){
  if(!options){var options = {}}
//console.log('animatedealerbuton called')
if(!_.isNumber(seatNumber) || _.isNaN(seatNumber)){
//  console.log('dealer button first chip item')
//console.log(self.images.pots[0].firstChip)
var finalX = self.images.pots[0].firstChip.position.x
var finalY =self.images.pots[0].firstChip.position.y
}
else{
 // console.log('setanumber '+seatNumber+' dealer button item')
 // console.log( self.images.seats[seatNumber].dealerButton)
  var finalX = self.images.seats[seatNumber].dealerButton.position.x
var finalY = self.images.seats[seatNumber].dealerButton.position.y
}

if(!time){self.setImageItemPositionAndTextBasedOnImageChange(self.images.dealerButton, finalX, finalY, options)}

else{
var animationInfo = {
item:self.images.dealerButton,
finalX:finalX,
finalY:finalY,
time:time
}
           
           self.animateImage(animationInfo)
         }//we animate if time is given


}

var setJustActedOrPassNullToGetJustActed = function(playerNumber){

if(_.isNumber(playerNumber) && !_.isNaN(playerNumber)){
  self.gameState.street.justActed = playerNumber
  self.setPreactionData('hand','toAct', false, {seat:'table'})
}

else{return self.gameState.street.justActed}


}

var displayLoadingScreen = function(originalOptions){

if(!_.isObject(originalOptions)){var options = {}}
  else{var options = _.clone(originalOptions)}

var stagesToUpdate = []
var update = options.update
options.update = false
loadingScreen = self.images.loadingScreen

if(options.defaults){
var defaults = {

fill:0
,bar:0
,title:'Loading...'
,status:''
,background:1

}

options = _.defaults(options, defaults)
}

 stagesToUpdate.push( self.displayChildren(loadingScreen, options) )

//update options



//FILL
if(_.isNumber(options.fill)){
 stagesToUpdate.push( loadingScreen.preloadFill.drawFill(options.fill, options) )
}
else if(options.fill === false){
 stagesToUpdate.push(loadingScreen.preloadFill.hide() )

}

//BAR
if(_.isNumber(options.bar)){
 stagesToUpdate.push( loadingScreen.preloadBar.drawBar(options.bar, options) )
}
else if(options.bar === false){
 stagesToUpdate.push(loadingScreen.preloadBar.hide() )
}

//TITLE
if(_.isString(options.title)){
 stagesToUpdate.push( loadingScreen.title.updateText(options.title, options) )
}
else if(options.title === false){
 stagesToUpdate.push(loadingScreen.title.hide(options) )

}

//STATUS
if(_.isString(options.status)){
stagesToUpdate.push(  loadingScreen.status.updateText(options.status, options) )
}
else if(options.status === false){
 stagesToUpdate.push(loadingScreen.status.hide(options) )

}

//BACKGROUND
if(_.isNumber(options.background)){
  loadingScreen.background.image.alpha = options.background
  stagesToUpdate.push(self.easelJSDisplayObjectChanged(loadingScreen.background))
}
else if(options.background <= 0){

  loadingScreen.background.image.alpha = 1
  stagesToUpdate.push(self.easelJSDisplayObjectChanged(loadingScreen.background))

}

else if(options.background === false){

  stagesToUpdate.push(self.hideChildren(loadingScreen.background, options))
}


//update and return
options.update = update

if(options.update !== false){self.updateStages(stagesToUpdate)}
if(options.div !== false){setOrGetDisplayStatusOfCanvasDivByStageNumberOrItemTrueDisplaysFalseHidesOtherGets(loadingScreen.status,true)}
  if(options.update === false) {return stagesToUpdate}

}//display preload screen

var hideLoadingScreen = function(options){

if(!_.isObject(options)){var options = {}}

var loadingScreen = self.images.loadingScreen

var setDivAlpha = function(alpha){
var stageParent = self.getParentOfStageObject(self.images.loadingScreen.title)
$(stageParent.div).css('opacity',alpha)
}//adjust alpha

//remove the loading animation no matter what immediately
createjs.Ticker.removeEventListener('tick', self.images.loadingScreen.preloadBar.animate)
createjs.Ticker.removeEventListener('tick', self.images.loadingScreen.preloadFill.animate)

if(options.animate){


var animationTimeToHidePreloadingScreen = options.animate


var hidePreloadingScreenTicks = 100
var ticks = 0
var hide = setInterval(function(){
var stagesToUpdate = []
var showRatio = 1 - ticks/hidePreloadingScreenTicks

stagesToUpdate.push (loadingScreen.preloadFill.drawFill(showRatio), {update:false})
stagesToUpdate.push (setDivAlpha(showRatio))

self.updateStages(stagesToUpdate)

ticks++
if(ticks >= hidePreloadingScreenTicks){
  clearInterval(hide)
finish()
  }//end the animation
},
animationTimeToHidePreloadingScreen/hidePreloadingScreenTicks
)

}//if ANIMATION

else{finish()}//NO ANIMATION


function finish(){
  setOrGetDisplayStatusOfCanvasDivByStageNumberOrItemTrueDisplaysFalseHidesOtherGets(getZ('loadingScreen').stage, false)
            
self.hideChildren(self.images.loadingScreen)


setDivAlpha(1)
self.activateTicker(50)
}//function that oes the actul hiding

}//hideLoadingScreen

   this.displayInitialTableState = function(table_state, options){

if(!_.isObject(options)){var options = {}}
  else{var options = _.clone(options)}

//store initial table state if necessary
if(!_.isObject(this.initial_table_state)){this.initial_table_state = table_state}


var displayOptions = {update:false, server:false}

var animationTimeToHidePreloadingScreen = 600
var hidePreloadingScreenTicks = 80
var showTable = false
 //set up animation variables
 var tickerInterval = 5
var ticksPerAnimation = 1
var numTicks = 0

createjs.Ticker.addEventListener('tick', tick)
createjs.Ticker.setInterval(tickerInterval)
createjs.Ticker.setPaused(false)
       var seatsLoaded = []

self.images.loadingScreen.status.updateText('displaying table state',{update:true})
self.displayChildren(self.images.loadingScreen)
displayLoadingScreen({update:false})

tick()

function tick(){
  var stagesToUpdate  =  []

    //update loading images graphic evert 3 ticks
    if(numTicks%ticksPerAnimation == 0){
        stagesToUpdate.push(self.images.loadingScreen.status.updateText(self.images.loadingScreen.status.getText()+'.'),{update:false})
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

self.updateStages(stagesToUpdate)
       // check if all seats are loaded
     //  if(checkSeatsLoaded() ==true){
      if(showTable === true){

self.resizePokerWrapperAndIframe()
        self.updateStages(null, {forceUpdate:true})
        createjs.Ticker.removeEventListener("tick", tick)
        hideLoadingScreen({animate:550})
      }
       console.log('increasing tick')
       numTicks ++

}//end tick function



                 //display static items

    this.displayChildren(this.images.getChips, displayOptions)
    this.displayChildren(this.images.table, displayOptions)
         this.displayChildren(this.images.showTableChatFull, displayOptions)
         this.displayChildren(this.images.standUp, displayOptions)
         this.displayTableChatBox()
     //    this.displayChildren(this.images.exitTable)

//remove extra S
         this.images.currencyDisplay.updateText('1 chip is equal to ' + table_state.currency_per_chip + ' ' + table_state.currency)
if(table_state.currency_per_chip == 1 && table_state.currency.charAt(table_state.currency.length-1)=='s'){
  var currentText = self.images.currencyDisplay.getText()
  self.images.currencyDisplay.updateText(currentText.substring(0,currentText.length-1) )
}


this.displayChildren(this.images.currencyDisplay, displayOptions)

        //remove extra seats
        this.setNumberOfSeats(table_state.max_players, displayOptions)

        //comunity cards
        this.displayAllCommunity(table_state.community, displayOptions)


//GET USER SEAT NUMBER (if available)
 for (var i = 0;i < table_state.seats.length;i++) {
//  console.log(table_state.seats[i].is_you + ' ' + table_state.seats[i].seat)
if(table_state.seats[i].is_you === true){  
 
  self.gameState.userSeatNumber = table_state.seats[i].seat 
}//if is_you === true

//can also grab permanent preferences if theyre availale here: (implement later)
 //   this.initializeServerPreferenceObjects(sessionPreferences, function (serverString, options){  self.saveSessionPreferences( serverString, {})    })

 }

   console.log('assigned userseat number from table_state of: ' + self.gameState.userSeatNumber)

                //display seats
         for (var i = 0;i< table_state.seats.length;i++) {
          self.playerSits(table_state.seats[i].seat, table_state.seats[i].username, table_state.seats[i].chips, displayOptions)

  setFlags(table_state.seats[i], false, {update:false, server:false, seat:table_state.seats[i].seat})
  if(_.isObject(table_state.seats[i].flags)){
//console.log('table_state calling setFlags ')
//console.log(table_state.seats[i].flags)
    setFlags(table_state.seats[i].flags, false, {update:false, updateEqualValues:true, server:false, seat:table_state.seats[i].seat})  

      }

          //update local data
        //  self.updateLocalGameDataBasedOnServerPlayerObject(table_state.seats[i])
          //assign userSeatNumber if player is user
         if(table_state.seats[i].is_you == true){
         
         //store session_preferences for later parsing if there
    //     self.events.rotateSeatsIfNeededAndConfirm()

         console.log('calling display seated options')
 // this.updateUserOptionsBasedOnFlagsAndPreactions()
}//table_state.seats[i].is_you == true

else{ //if not user

if(table_state.seats[i].sitting_out == true){
self.playerSitsOut(table_state.seats[i].seat, displayOptions)
}//check if non-user is sitting out
}//perform if not user

}//iteration through table_state.seats


if(!_.isNumber(this.gameState.userSeatNumber)){this.displayChildren(this.images.getChipsDisabledShape, displayOptions)}

    if(table_state.stage_name !==  'waiting' && table_state.stage_name !== 'blinding'){
        //display player's cards
         for(var i=0;i<table_state.players.length;i=i+1){
               if(!table_state.players[i].hand || table_state.players[i].hand.length == 0){this.displayHiddenCards(table_state.players[i].seat, displayOptions) }
              
                   else if(table_state.players[i].hand) {
                    this.displayHoleCards(table_state.players[i].hand, table_state.players[i].seat, displayOptions)
        }
        }//iteration through table_state.players

}//check stage is appropriate to give people hole cards

        //pot

var potSizes = []
         for (var i=0;i<table_state.pots.length;i++) {
potSizes[i] = table_state.pots[i].value
          }

        if(_.isArray(potSizes)&&potSizes.length>0){this.updatePotSize(potSizes, displayOptions)}

         //current bets
         for (var i=0;i<table_state.players.length;i=i+1) { 
         this.playerPutsChipsInPot(table_state.players[i].seat,table_state.players[i].current_bet, table_state.players[i].chips, displayOptions)


         this.displayChipStack(table_state.players[i].current_bet, self.images.seats[table_state.players[i].seat], displayOptions)
         }

//inHand options


          //empty seats
         for (var i = 0; i<table_state.max_players;i++){  this.displayCorrectSeatItems(i, displayOptions)    }

//update user options
       

         //set game data
  //   self.gameState.bigBlind = table_state.big_blind
 //    self.gameState.minIncrement = table_state.min_increment
   //  self.gameState.cashier.currency = table_state.currency
    // self.gameState.cashier.currency_per_chip =  table_state.currency_per_chip



//update message log for table chat popup

for(var i = 0;i<table_state.messages.length;i++){
this.gameState.tableChatFull.log.push(['dealer', table_state.messages[i]])
}
this.updateTableChatFullMessageTextFromCurrentOrAdditionalData(null, {update:false})

//dealer_button

if(table_state.stage_name === 'waiting'){var dealerPosition = null}
else{var dealerPosition = table_state.dealer}
  self.gameState.dealer = dealerPosition
self.animateDealerButton(dealerPosition,  0, displayOptions)
self.displayChildren(self.images.dealerButton, {update:false})

//display buttons/table stuff
this.updateUserOptionsBasedOnFlagsAndPreactions(displayOptions)

var loadingUpdateStages = []
loadingUpdateStages.push(self.images.loadingScreen.status.updateText("loading completed ...", {update:false}))//fill 100%
loadingUpdateStages.push(self.images.loadingScreen.preloadFill.drawFill(1, {update:false}))//fill 100%
self.updateStages(loadingUpdateStages)

showTable = true

testFunction(displayOptions)


  if (_.isObject(playZoneLandingPage.iframes) && self.isIframe()) {
    playZoneLandingPage.iframes.setIframeCloseHandler(self.getTableName(), self.events.exitTableClick);
  }


    }
    
var testFunction = function(){
console.log(' calling testfunction')
//console.clear()
//console.log($('#chatDiv')[0])
//console.log(self.jQueryObjects.chatBoxDiv[0])
//self.displayChildren(self.images.fold)

//TEST FOR POT SIZE
for(var i = 0;i<self.gameState.numSeats;i++){

 // self.displayChildren(self.images.seats[i].referenceChips)
//  self.displayChipStack(9999, self.images.seats[i])
}

//self.playerPutsChipsInPot(6, 799, 500)
//self.updatePotSize([1,2,3,4,5,6, 7, 8, 9])
 //self.updatePotSize([1,10000,20000,30000,40000,50000, 60000, 70000, 80000])
// console.log('dealer button item = ')
 //console.log(self.images.dealerButton)
 //self.cropHoleCards(self.images.background, {seatNumber:4})
 
 //self.images.showTableChatFull.image.mask = new createjs.Rectangle(0,0,30,30)
 //self.updateStages(0, {forceUpdate:true})

}

  //---------------------SOCKET CODE------------------------

this.getInitialPermanentPreferences = function(callback){
console.log('getInitialPermanentPreferences')


   socket.once('preferences', function(preferences){
             console.log('preferences received')
 self.updatePreference(permanentPreferences, preferences, {updateEqualValues:true})  


if(_.isFunction(callback)){callback()}
   
    })//receive 'preferences' message


    socket.emit('get_preferences')

    $.getJSON('/preferences', function(data) { 
     self.updatePreference(permanentPreferences, data, {updateEqualValues:true}) 
if(_.isFunction(callback)){callback()}
    })
 
}


    this.getTableState = function(options){
      if(!options){var options = {}}
   socket.once('table_state', self.events.table_state_received)

    socket.emit('get_table_state')
    }
     
self.events.table_state_received = function(table_state){
             console.log('one time table_state message received')
             console.log(table_state)
             //turn off all sockets
            socket.removeAllListeners()
            self.toggleGameSocketsTrueForOn(true)
             self.displayInitialTableState(table_state)
             }


self.events.connect = function(){

self.getTableState()

}


self.events.disconnect = function(){

  console.log('self.events.disconnect called')

//turn off all sockets (dont know how to do this)
socket.removeAllListeners()
console.log('removed all listeners')


socket.on('connecting', function(){

self.images.loadingScreen.title.updateText('RECONNECTING')
self.images.loadingScreen.status.updateText('establishing connection with server...')

})

socket.on('connect', self.events.connect)

//display our loading screen
displayLoadingScreen({

title:'DISCONNECTED'
,status:'contacting server.....'
,fill:0
,background:0.66
,bar:0
})

console.log('animating fill and preloading bar')
createjs.Ticker.addEventListener('tick', self.images.loadingScreen.preloadBar.animate)
createjs.Ticker.addEventListener('tick', self.images.loadingScreen.preloadFill.animate)


}//  self.events.disconnect

   


    this.toggleGameSocketsTrueForOn = function(bool){
     
    //when disconnect we show loading screen
       socket.on('disconnect', self.events.disconnect)

     /*
if(bool === false){

socket.off('street_ends')
socket.off('error')
socket.off('disconnect')
socket.off('player_gets_refund')
socket.off('street_ends')
socket.off('street_ends')
socket.off('street_ends')
socket.off('street_ends')
socket.off('street_ends')
socket.off('street_ends')

}
*/
    socket.on('street_ends', function (potSizes){


        for(var i = 0;i<self.gameState.numSeats;i++){
          /*
          var options = {seat:i, update:false, server:false}
          var displayMessageType = self.getPreactionData('displayMessageType', options)

switch(displayMessageType){
  case 'action':
  case 'seat':
  case 'openSeat':
  case 'disabledSeat':
  break;

  default: self.setPreactionData('permanent','displayMessageType', 'seat', options )
break;

}
*/
 self.clearExpirationData('street', i)
        }
 self.clearExpirationData('street', 'table')
 self.streetEnds(potSizes)

    })

    //error received
       socket.on('error', function(errorString, messageInfo){


           if(messageInfo){}
            else{
           var messageInfo = {}
           messageInfo.okay = true
           messageInfo.html = true
           messageInfo.style = 'qtip-youtube'
            
          }
          messageBoxAPI.display(errorString, messageInfo)
                
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
self.gameState.dealer = seatNumber
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
  self.setPreactionData('permanent','pending_sit_out', value)
self.updateUserOptionsBasedOnFlagsAndPreactions()


})

 socket.on('flags_set', function(flags){
console.log(['flags_set' ,flags])
/*
_.each(flags, function(value, key, list){

setOneFlagOrPreference(key, value, {update:false})

})//iteration
*/

setFlags(flags)

self.updateUserOptionsBasedOnFlagsAndPreactions()



 })//flags_set


//flag is set
       socket.on('flag_set', function(flagName, valueOfFlag){
        console.log(['flag_set',flagName, valueOfFlag])
 //console.log($('#server_values').data('table_state'))

 //var userSeatIndex = self.getSeatImageIndex(self.gameState.userSeatNumber, 'rotatedSeatNumber')
   
setOneFlagOrPreference(flagName, valueOfFlag, {update:false})
self.updateUserOptionsBasedOnFlagsAndPreactions()
     })


//hand dealt to user
       socket.on('hole_cards_dealt', function(hand){
         self.gameState.holeCards = hand
     //    self.setPreactionData('hand', 'holeCards', {seat:self.gameState.userSeatNumber})
     })


//player acts
       socket.on('player_acts', function(player, action, pot){

var seatNum = player.seat
var stagesToUpdate = []
var action = action.toUpperCase()

//clear on act data
self.clearExpirationData('act', seatNum)
self.clearExpirationData('act', 'table')
     if(action != 'SKIP') {self.playerActs(seatNum, action, 1000)}
     //   else{ throw ''}

    //display updated potsize if necessary
        if(pot && action!=='CHECK'){self.updatePotSize(pot)}

        switch(action){
        case 'FOLD':
        //create hole cards copies for future animations:
       self.createHoleCardCopyIfNeeded(seatNum)
        var foldSound = createjs.Sound.createInstance(self.images.sources.foldSound)
            foldSound.play()
        self.hideHoleCards(seatNum)
      //  self.hideBet(seatNum)
        self.setPreactionData('hand', 'inHand', false, {seat:seatNum})
        if(player.seat == self.gameState.userSeatNumber){
            self.hideChildren(self.images.foldToAnyBet)
            self.hideChildren(self.images.foldToAnyBetOn)
            }
            break;

            case 'CHECK':
            var checkSound = createjs.Sound.createInstance(self.images.sources.checkSound)
            checkSound.play()
               self.setPreactionData('hand', 'inHand', true)
            break;

            case'BET':
            case'CALL':
            case 'RAISE':
            case'POST_BLIND':
              var betSound = createjs.Sound.createInstance(self.images.sources.betSound)
            betSound.play()
            self.playerPutsChipsInPot(seatNum,player.current_bet, player.chips)
              self.setPreactionData('hand', 'inHand', true)
            break;

        }
            
             setJustActedOrPassNullToGetJustActed(seatNum)
                 
                 
             //clear once for user
             if(seatNum === self.gameState.userSeatNumber){
              self.clearExpirationData('once', player.seat)
              self.clearExpirationData('once', 'table')
        //unbind scroll wheel events
$(self.getParentOfStageObject(self.images.betSlider.slider).div).off('mousewheel.adjustBetSize')

            }
            else{ 
              self.clearExpirationData('act', seatNum) 
self.clearExpirationData('act', 'table')
            }


stagesToUpdate.push(self.displayCorrectSeatItems(player.seat, {update:false}) )
         stagesToUpdate.push(self.updateUserOptionsBasedOnFlagsAndPreactions({update:false}) )
})

//user to act 
 socket.on('act_prompt', function(actions, timeout){

//console.log('act prompt received')
//console.log(actions)



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

var stagesToUpdate = []

//display bet slider
    _.each (actions, function(value, i, list) {
      var options = {update:false}
     if (actions[i].fold !== undefined){
    //  var options = {messages:['act','fold']}
     stagesToUpdate.push(    self.updateActionButton('fold', options ))
        }
       else if (actions[i].check !== undefined){
    //    var options = {messages:['act','check']}
       stagesToUpdate.push(    self.updateActionButton('check', options))
         }
      else   if (actions[i].call){
        options.value = actions[i].call
       stagesToUpdate.push(    self.updateActionButton('call', options))
         }
       else  if (actions[i].raise){
        options.value = actions[i].raise[0]
       stagesToUpdate.push(    self.updateActionButton('raise',options))
//make sure we are not facing all in when we want to display bet slider
if(actions[i].raise[0] != actions[i].raise[1]){ stagesToUpdate.push( self.displayBetSlider(actions[i].raise[0], actions[i].raise[1]) )}
      
         }
      else if (actions[i].bet){
          options.value =  actions[i].bet[0]
        stagesToUpdate.push(   self.updateActionButton('bet', options))

//make sure we are not facing all in when we want to display bet slider
//if(actions[i].bet[0] != actions[i].bet[1]){ stagesToUpdate.push( self.displayBetSlider(actions[i].bet[0], actions[i].bet[1]) )}
              stagesToUpdate.push(  self.displayBetSlider(actions[i].bet[0], actions[i].bet[1]) )

 }
        
         })//iterate through action choices


//play to_act sound
var promptSound = createjs.Sound.createInstance(self.images.sources.toActAlertSound)
     promptSound.setVolume(0.2)
     promptSound.play()
stagesToUpdate.push( self.playerToAct(self.gameState.userSeatNumber, timeout) )
stagesToUpdate.push(self.updateUserOptionsBasedOnFlagsAndPreactions({update:false}) )
         self.updateStages(stagesToUpdate)
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
chatObjectForInternalFunctionUse.message = _.escape(messageString)
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

  //self.displayBubbleChat(chatInfo)
  self.displayBubbleChatPopover(chatInfo)

})

 //server_message received
 socket.on('server_message', function(notificationString, options){
  
//var options = _.clone(options) || {}

self.displayNotification(notificationString, {growl:true, qtip:true})

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


 //self.displayBubbleChat(chatInfo)
self.displayBubbleChatPopover(chatInfo)
}//if player chat
}//check to make sure chatInfo.message is NOT empty



})


//player sits in
       socket.on('player_sits_in', function(player){
        var stagesToUpdate = []
   //     console.log(['player_sits_in', player])
    //    self.getPreactionData('pending_sit_out')
     //   self.getPreactionData('sitting_out')

self.setPreactionData('permanent', 'sitting_out', false , {server:false, seat:player.seat})
self.setPreactionData('permanent', 'getting_chips', false , {server:false, seat:player.seat})

 //       stagesToUpdate.push  ( self.images.seats[player.seat].status.updateText(player.chips, {update:false}))
stagesToUpdate.push(     self.images.seats[player.seat].stackSize.updateText(player.chips, {update:false})        )

        if(player.seat == self.gameState.userSeatNumber){
          setFlags(player, false, {update:false, server:false, seat:player.seat}) 
}
stagesToUpdate.push(self.displayCorrectSeatItems(player.seat, {update:false}))
 stagesToUpdate.push(self.updateUserOptionsBasedOnFlagsAndPreactions({update:false}))
        self.updateStages(stagesToUpdate)
})

//player sits out
       socket.on('player_sits_out', function(player){
var stagesToUpdate = []
//console.log(['player_sits_out', player])


     stagesToUpdate.push(    self.playerSitsOut(player.seat) )
 stagesToUpdate .push(    setFlags(player, false, {update:false, server:false, seat:player.seat}) )
        if(player.seat == self.gameState.userSeatNumber){
    
  stagesToUpdate .push(self.updateUserOptionsBasedOnFlagsAndPreactions({update:false}))
}//if user

          self.updateStages(stagesToUpdate)
})


//player sits, checks if player is the user
       socket.on('player_sits', function(player, is_you){
    var stagesToUpdate = []

self.clearExpirationData('permanent', player.seat) //this will clear everything else about the player


        if(is_you == true){
           socket.emit('get_add_chips_info')
            self.gameState.userSeatNumber = player.seat
          self.changeUserSeatView (sessionPreferences.changeUserSeatViewTo.value)
   //  stagesToUpdate.push     (    self.events.rotateSeatsIfNeededAndConfirm({update:false}) )
    stagesToUpdate.push     (   self.updateUserOptionsBasedOnFlagsAndPreactions({update:false}))


}//if player is you

 stagesToUpdate.push (    self.playerSits(player.seat, player.username, player.chips))

for (var i = 0;i<self.gameState.numSeats;i++){ stagesToUpdate.push  (self.displayCorrectSeatItems(i, {update:false}) )}

self.updateStages(stagesToUpdate)

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

self.setPreactionData('permanent', 'getting_chips', false, {seat:player.seat, server:false})

           if(is_you === true){player.seat = self.gameState.userSeatNumber}
      if(player.sitting_out === true){  
        //this playerSitsOutfunction wil automatically make ure not to update if not necessary
        stagesToUpdate.push(self.playerSitsOut(player.seat, options))  
      }
if(!_.isUndefined(player.chips)){
      
stagesToUpdate.push(self.images.seats[player.seat].stackSize.updateText(player.chips, options))

           }//if player out of chips


        if(is_you){
      stagesToUpdate.push(  self.hideCashier(options) )
             stagesToUpdate.push(self.updateUserOptionsBasedOnFlagsAndPreactions({update:false}))
        }//if player ===is user

stagesToUpdate.push(self.displayCorrectSeatItems(player.seat, {update:false}))

        self.updateStages(stagesToUpdate)
 }) 


//round ends, all hole cards are shown
       socket.on('winners', function(players){

for(var i = 0;i<self.gameState.seats.length;i++){
  self.clearExpirationData('hand', i)
}
self.clearExpirationData('hand', 'table')
self.updateUserOptionsBasedOnFlagsAndPreactions()
         self.winners(players)
   

})

//reset table
socket.on('reset_table', function(players){
var options = {

  update:false
}

var stagesToUpdate = []

     stagesToUpdate.push(self.roundEnds())
 for(var i = 0;i < self.images.seats.length;i++){
stagesToUpdate.push(    self.hideChildren(self.images.seats[i].hiddenCards,options))
 stagesToUpdate.push(  self.hideChildren(self.images.seats[i].shownCards,options))
}
stagesToUpdate.push(self.hideChildren(self.images.community,options))
stagesToUpdate.push( self.updateUserOptionsBasedOnFlagsAndPreactions(options))

self.updateStages(stagesToUpdate)
})

    }//this.toggleGameSocketsTrueForOn

   }

    //---------------END SOCKET CODE----------------------------

jQuery(document).ready(function(){
  //Calls code in iframes.js to set iframe to top//
  /*
<<<<<<< HEAD

=======
  $("body").on("mousedown", setIFrameToTopHandler);
});

function setIFrameToTopHandler() {
    if (holdemCanvas.isIframe()) {
      console.log('trying to run setIFrameToTop @ ' + $('#server_values').data('table_name'));
      parent.iframes.setIFrameToTop($('#server_values').data('table_name'));         
    }
}
>>>>>>> bobby/master
*/



   holdemCanvas = new Table()



if(holdemCanvas.isIframe()) {
  // we're not in index.ejs
    console.log('this is an iframe')
    
      holdemCanvas.loadImageSources()



}
else{
    // we're in index.ejs

 // $('.iframe').on("mousedown", setIFrameToTopHandler);

      console.log('this is not an iframe')
holdemCanvas.loadImageSources(true)
}


  
});



jQuery(window).load(function (){
  console.log('window load function claled')
  /*
self.jQueryObjects.tableChatFullDiv.mCustomScrollbar('destroy')
self.jQueryObjects.tableChatFullDiv.mCustomScrollbar()
*/
 //   holdemCanvas.createAllItems()

 //console.log($('#server_values').data('table_state'))


      console.log(document)
      
    // console.log(holdemCanvas.images.sources)
    // console.log(holdemCanvas.images.sourceObjects)
//console.log(holdemCanvas.images.seats)
    })
 
    
