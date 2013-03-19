

  /*
 holdemCanvas.images.displayCurrentTableState=function(players, seats, dealer, active_seats, hand, community, pot, bets){
        
        holdemCanvas.displayAllCommunity(community)
        holdemCanvas.displayPot(pot)

        //display seats
         for (var i in seats) { 
         holdemCanvas.playerSits(i,seats[i].player,seats[i].player.chips)}

        //display cards
         for(var i=0;i<active_seats.length;i=i+1){
               if(i !== holdemCanvas.gameState.userSeatNumber){
                   holdemCanvas.displayImage(holdemCanvas.images.seats[i].hiddenCard0)
        holdemCanvas.displayImage(holdemCanvas.images.seats[i].hiddenCard1)
                   }
                   else if(i === holdemCanvas.gameState.userSeatNumber){
        holdemCanvas.displayShownCard(hand[0], holdemCanvas.images.seats[i].shownCard0)
                   holdemCanvas.displayShownCard(hand[1], holdemCanvas.images.seats[i].shownCard1)}
        }
        
        //display player's current bets

        for (var i in bets){
            holdemCanvas.playerPutsChipsInPot(bets[i],bets[i].NumChips)
        } 
    }
    
  

    holdemCanvas.activateButton =  function (parentOfImageObject, messages){
if(messages){parentOfImageObject.messages = messages}
        parentOfImageObject.images.Onclick = holdemCanvas.images.onButtonClick
    }

    holdemCanvas.deactivateButton = function (parentOfImageObject, messages){
        if(messages){parentOfImageObject.messages = messages}
        parentOfImageObject.images.Onclick = null
    }
    */
