    jQuery(window).load(function ()
    {
      
  
//hands are dealt
       socket.on('hands_dealt', function(community, active_seats){
          if(active_seats){ for(var i=0;i<active_seats.length;i=i+1){
               if(i !== holdemCanvas.gameState.userSeatNumber){
        holdemCanvas.displayChildren(holdemCanvas.images.seats[i].hiddenCard0)
        holdemCanvas.displayChildren(holdemCanvas.images.seats[i].hiddenCard1)
        }
        else{
            holdemCanvas.removeAllBets()
            holdemCanvas.displayAllCommunity(community)
            }
                   }
}
        });
        

//hand dealt to user
       socket.on('hand_dealt', function(hand){

                   holdemCanvas.displayShownCard(hand[0],holdemCanvas.images.seats[holdemCanvas.gameState.userSeatNumber].shownCard0)
        holdemCanvas.displayShownCard(hand[1],holdemCanvas.images.seats[holdemCanvas.gameState.userSeatNumber].shownCard1)
                   
        });
     


//player to act
       socket.on('player_to_act', function(seat_num, timeout){
          
     holdemCanvas.startCountdown(seat_num,timeout)
})


//player acts
       socket.on('player_acts', function(player, action, pot){
  /*             if(i !== holdemCanvas.gameState.userSeatNumber){
                   holdemCanvas.displayImage(holdemCanvas.images.seats[i].hiddenCard0)
        holdemCanvas.displayImage(holdemCanvas.images.seats[i].hiddenCard1)
                   }
                   else if(i === holdemCanvas.gameState.userSeatNumber){
        holdemCanvas.displayShownCard(hand[0], holdemCanvas.images.seats[i].shownCard0)
                   holdemCanvas.displayShownCard(hand[1], holdemCanvas.images.seats[i].shownCard1)
                   }
                   */
        switch(action){
        case 'fold':
        if(player.seat !== holdemCanvas.gameState.userSeatNumber){
                   holdemCanvas.hideChildren(holdemCanvas.images.seats[i].hiddenCard0)
        holdemCanvas.hideChildren(holdemCanvas.images.seats[i].hiddenCard1)
                   }
            else{
                holdemCanvas.hideChildren(holdemCanvas.images.seats[seat_num].shownCard0)
            holdemCanvas.hideChildren(holdemCanvas.images.seats[seat_num].shownCard0)
            }
            break;

            case 'check':
            break;

            case'bet':
            holdemCanvas.playerPutsChipsInPot(player.seat,player.current_bet)
            holdemCanvas.playerSits(player.seat, player.user_name, player.chips)
            holdemCanvas.displayPot(pot)
            break;

            case'call':
            holdemCanvas.playerPutsChipsInPot(player.seat,player.current_bet)
             holdemCanvas.playerSits(player.seat, player.user_name, player.chips)
            holdemCanvas.displayPot(pot)

            case 'raise':
            holdemCanvas.playerPutsChipsInPot(player.seat,player.current_bet)
             holdemCanvas.playerSits(player.seat, player.user_name, player.chips)
            holdemCanvas.displayPot(pot)
            break;
        }
        holdemCanvas.playerActs(player.seat, player.action, 2)
        holdemCanvas.stage.update()
     
})


 

//player to act (not necessarily the user)
 socket.on('act_prompt', function(action, timeout){

     if (actions.fold){
         holdemCanvas.displayChildren(holdemCanvas.images.fold)
         holdemCanvas.images.activateButton(holdemCanvas.images.fold,['act','fold'])
        }
        if (actions.check){
         holdemCanvas.displayImage(holdemCanvas.images.check)
         holdemCanvas.images.activateButton(holdemCanvas.images.check,['act','check'])
         }
         if (actions.call){
         holdemCanvas.displayImage(holdemCanvas.images.call)
         holdemCanvas.images.activateButton(holdemCanvas.images.call,['act','call'])
         }
         if (actions.raise){
         holdemCanvas.displayImage(holdemCanvas.images.raise)
         holdemCanvas.images.activateButton(holdemCanvas.images.raise,['act','raise'])
         holdemCanvas.showBetSlider(minBet,maxBet,minIncrement)
         }
         if (actions.bet){
         holdemCanvas.displayImage(holdemCanvas.images.bet)
         holdemCanvas.images.activateButton(holdemCanvas.images.bet,['act','bet'])
         console.log('need minbet and maxbet and minIncrement')
         // holdemCanvas.showBetSlider(minBet,maxBet,minIncrement)
         }
         holdemCanvas.startCountdown(holdemCanvas.gameState.userSeatNumber,Math.round(timeout/1000))

});

//receive hole cards
       socket.on('hands_dealt', function(active_seats, hand_cards){
        holdemCanvas.displayShownCard(hand_cards[1],holdemCanvas.images.seats[gameState.userSeatNumber])
     holdemCanvas.displayShownCard(hand_cards[2],holdemCanvas.images.seats[gameState.userSeatNumber])
});

//player sits, checks if player is the user
       socket.on('player_sits', function(player, is_you){
        console.log('player_sits', player, seat_num, is_you);
        holdemCanvas.playerSits(player.seat, player.name, player.chips)
        if(is_you){
            holdemCanvas.gameState.userSeatNumber = seat_num
            holdemCanvas.displaySideButton('stand up', holdemCanvas.images.leftSideButtons[1])
            holdemCanvas.images.activateButton (['stand'], holdemCanvas.images.leftSideButtons[1])
}});

//player stands, checks if player is the user
       socket.on('player_stands', function(player, seat_num, is_you){
        console.log('player_stands', player, seat_num, is_you)
        if(holdemCanvas.stage.contains(holdemCanvas.images.seats[seat_num].seat.text)){holdemCanvas.stage.removeChild(holdemCanvas.images.seats[seat_num].seat.text)}
        holdemCanvas.stage.update()
        holdemCanvas.images.activateButton(holdemCanvas.images.seats[seat_num])
        if(is_you){
            holdemCanvas.gameState.userSeatNumber = false
}});

   
//round ends, all hole cards are shown
       socket.on('round_ends', function(winner, hands, pot){
           for(var i in hands){
               if(typeof hands[i].card === 'array'){
        holdemCanvas.images.displayFaceUpCard(hands[i].card[0],holdemCanvas.images.seats[i].shownCard0)
        holdemCanvas.images.displayFaceUpCard(hands[i].card[1],holdemCanvas.images.seats[i].shownCard1)
        }
        }
        {
            for(var i in winners){
                {if(typeof winners[i].player === 'string'){
                    holdemCanvas.images.playerSits(winners[i], winners[i].player, pot)
                }}
            }
            
        }
})

//player adds chips to his stack
       socket.on('player_rebuys', function(player,seat_num){
        holdemCanvas.images.playerSits(seat_num, player, player.chips)
        }
  );
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
    })
