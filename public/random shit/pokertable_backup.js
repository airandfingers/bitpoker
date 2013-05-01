/*var cashierImageContainerIndex = self.gameState.containerImageIndexes.cashier


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
        */

  
 
/*
      this.images.cashier.horizontalSlider = new this.images.Item (this.images.cashier.addChips.position.x,this.images.cashier.addChips.position.y-25,cashierWindowWidth-30,1,4)
      this.images.cashier.verticalSlider = new this.images.Item(this.images.cashier.horizontalSlider.position.x,this.images.cashier.horizontalSlider.position.y-10,5,20,4)
      this.images.cashier.addChipsAmount = new this.images.Item(this.images.cashier.horizontalSlider.position.x+this.images.cashier.horizontalSlider.size.x/2,this.images.cashier.horizontalSlider.position.y-35,35,30,4)
              this.images.itemAsRectangle(this.images.cashier.horizontalSlider, 'black')
        this.images.itemAsRectangle(this.images.cashier.verticalSlider, 'blue')
        this.images.addItemText(this.images.cashier.addChipsAmount, '0', '14px Arial', 'black')



        this.images.cashier.verticalSlider.image.onPress = self.events.addChipsSliderVerticalMouseDown


        ////////////////drawing chip with a createjs shape

          parentOfChipArray.chips[parentOfChipArray.chips.length-1].image = new createjs.Shape()
 parentOfChipArray.chips[parentOfChipArray.chips.length-1].image.graphics.beginStroke(chipColor).beginFill('gray').drawCircle(x+diameter/2, y+diameter/2, diameter/2)

parentOfChipArray.chips[parentOfChipArray.chips.length-1].text =  new createjs.Text(chipValue, '8px Arial', 'white')
parentOfChipArray.chips[parentOfChipArray.chips.length-1].text.x = parentOfChipArray.chips[parentOfChipArray.chips.length-1].position.x + parentOfChipArray.chips[parentOfChipArray.chips.length-1].size.x/2
parentOfChipArray.chips[parentOfChipArray.chips.length-1].text.y = parentOfChipArray.chips[parentOfChipArray.chips.length-1].position.y+6
parentOfChipArray.chips[parentOfChipArray.chips.length-1].text.baseline = 'top'
parentOfChipArray.chips[parentOfChipArray.chips.length-1].text.textAlign = 'center'
parentOfChipArray.chips[parentOfChipArray.chips.length-1].text.maxWidth = parentOfChipArray.chips[parentOfChipArray.chips.length-1].size.x*.8

------------------------
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
*/