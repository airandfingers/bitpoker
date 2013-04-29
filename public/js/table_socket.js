

  
 
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
*/