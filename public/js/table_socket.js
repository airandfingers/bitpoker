
      
   holdemCanvas.images.activateButton =  function (messages, parentOfImageObject){
    $(document).mousedown(function(e) {
    if((e.offsetX >=parentOfImageObject.bitmap.x && e.offsetX <= parentOfImageObject.bitmap.x + parentOfImageObject.size.x) &&
       (e.offsetY >=parentOfImageObject.bitmap.y && e.offsetY <= parentOfImageObject.bitmap.y + parentOfImageObject.size.y)) {
        console.log(socket, messages);
        socket.emit.apply(socket, messages);
    }
});
}

//hands are dealt
       socket.on('hands_dealt', function(active_seats, hand){
           for(var i=0;i<active_seats.length;i=i+1){
               if(i !== holdemCanvas.userSeatNumber){
                   holdemCanvas.images.displayImage(holdemCanvas.images.seats[i].hiddenCard0)
        holdemCanvas.images.displayImage(holdemCanvas.images.seats[i].hiddenCard1)
                   }
                   else if(i === holdemCanvas.userSeatNumber){
        holdemCanvas.images.displayShownCard(hand[0], holdemCanvas.images.seats[i].shownCard0)
                   holdemCanvas.images.displayShownCard(hand[1], holdemCanvas.images.seats[i].shownCard1)}
        }
        
     
});

//player to act
       socket.on('player_to_act', function(seat_num, timeout){
           for(var i=0;i<active_seats.length;i=i+1){
               if(i !== holdemCanvas.userSeatNumber){
                   holdemCanvas.images.displayImage(holdemCanvas.images.seats[i].hiddenCard0)
        holdemCanvas.images.displayImage(holdemCanvas.images.seats[i].hiddenCard1)
                   }
                   else if(i === holdemCanvas.userSeatNumber){
        holdemCanvas.images.displayShownCard(hand[0], holdemCanvas.images.seats[i].shownCard0)
                   holdemCanvas.images.displayShownCard(hand[1], holdemCanvas.images.seats[i].shownCard1)}
        }
        
     
});


//player acts
       socket.on('player_acts', function(player, action, num_chips, pot,seat_num,stack_size){
               if(i !== holdemCanvas.userSeatNumber){
                   holdemCanvas.images.displayImage(holdemCanvas.images.seats[i].hiddenCard0)
        holdemCanvas.images.displayImage(holdemCanvas.images.seats[i].hiddenCard1)
                   }
                   else if(i === holdemCanvas.userSeatNumber){
        holdemCanvas.images.displayShownCard(hand[0], holdemCanvas.images.seats[i].shownCard0)
                   holdemCanvas.images.displayShownCard(hand[1], holdemCanvas.images.seats[i].shownCard1)
                   }
        switch(action){
        case 'fold':
            if(holdemCanvas.stage.contains(holdemCanvas.images.seats[seat_num].hiddenCard0.bitmap)){
                holdemCanvas.stage.removeChild(holdemCanvas.images.seats[seat_num].hiddenCard0.bitmap)
                 holdemCanvas.stage.removeChild(holdemCanvas.images.seats[seat_num].hiddenCard1.bitmap)
            }
            else if(holdemCanvas.stage.contains(holdemCanvas.images.seats[seat_num].shownCard0.bitmap)){
                holdemCanvas.stage.removeChild(holdemCanvas.images.seats[seat_num].shownnCard0.bitmap)
                 holdemCanvas.stage.removeChild(holdemCanvas.images.seats[seat_num].shownCard1.bitmap)
            }
            break;

            case 'check':
            break;

            case'bet':
            holdemCanvas.images.playerPutsChipsInPot(seat_num,chips)
            holdemCanvas.images.playerSits(seat_num, player, stack_size)
            holdemCanvas.images.displayPot(pot)
            break;

            case'call':
            holdemCanvas.images.playerPutsChipsInPot(seat_num,chips)
            holdemCanvas.images.playerSits(seat_num, player, stack_size)
            holdemCanvas.images.displayPot(pot)

            case 'raise':
            holdemCanvas.images.playerSits(seat_num, player, stack_size)
            holdemCanvas.images.displayPot(pot)
            break;
        }
        
        holdemCanvas.stage.update()
     
});


    //receive/deal community cards
       socket.on('community_dealt', function(community_cards){
        holdemCanvas.images.displayAllCommunity(community_cards)
     
});
 

//player to act (not necessarily the user)
 socket.on('act_prompt', function(fold, check, call, raise, bet, seat_num){

     if (fold){
         holdemCanvas.images.displayImage(holdemCanvas.images.fold)
         holdemCanvas.images.activateButton(holdemCanvas.images.fold)
        }
        if (check){
         holdemCanvas.images.displayImage(holdemCanvas.images.check)
         holdemCanvas.images.activateButton(holdemCanvas.images.check)
         }
         if (call){
         holdemCanvas.images.displayImage(holdemCanvas.images.call)
         holdemCanvas.images.activateButton(holdemCanvas.images.call)
         }
         if (raise){
         holdemCanvas.images.displayImage(holdemCanvas.images.raise)
         holdemCanvas.images.activateButton(holdemCanvas.images.raise)
         }
         if (bet){
         holdemCanvas.images.displayImage(holdemCanvas.images.bet)
         holdemCanvas.images.activateButton(holdemCanvas.images.bet)
         }

});

//receive hole cards
       socket.on('hands_dealt', function(active_seats, hand_cards){
        holdemCanvas.images.displayFaceUpCard(hand_cards[1],holdemCanvas.images.seats[userSeatNumber])
     holdemCanvas.images.displayFaceUpCard(hand_cards[2],holdemCanvas.images.seats[userSeatNumber])
});


//player sits, checks if player is the user
       socket.on('player_sits', function(player, seat_num, is_you){
        console.log('player_sits', player, seat_num, is_you);
        holdemCanvas.images.playerSits(seat_num, player, 0)
        if(is_you){
            holdemCanvas.userSeatNumber = seat_num
            holdemCanvas.images.displaySideButton('stand up', holdemCanvas.images.leftSideButtons[1])
            holdemCanvas.images.activateButton (['stand'], holdemCanvas.images.leftSideButtons[1])
}});



//player stands, checks if player is the user
       socket.on('player_stands', function(player, seat_num, is_you){
        console.log('player_stands', player, seat_num, is_you);
        holdemCanvas.images.seats[seat_num].image.src = holdemCanvas.images.sources.seat
                 holdemCanvas.images.displayImage(holdemCanvas.images.seats[seat_num])
        holdemCanvas.images.activateButton(holdemCanvas.images.seats[seat_num])
        if(is_you){
            delete holdemCanvas.userSeatNumber
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
});


//player adds chips to his stack
       socket.on('player_rebuys', function(player, num_chips){
        holdemCanvas.images.playerSits(seat_num, player, num_chips)
        }
  );

  


//player adds chips to his stack
       socket.on('table_state', function(player, seats, dealer, active_seats, hand, community, pot, bets ){
        holdemCanvas.images.displayCurrentTableState(player, seats, dealer, active_seats, hand, community, pot, bets)
        }
  );

 holdemCanvas.images.displayCurrentTableState=function(player, seats, dealer, active_seats, hand, community, pot, bets){
        

        holdemCanvas.images.displayAllCommunity(community)
        holdemCanvas.images.displayPot(pot)

        //display seats
         for (var i in seats) { 
         holdemCanvas.images.playerSits(i,seats[i].player,0)}

        //display cards
         for(var i=0;i<active_seats.length;i=i+1){
               if(i !== holdemCanvas.userSeatNumber){
                   holdemCanvas.images.displayImage(holdemCanvas.images.seats[i].hiddenCard0)
        holdemCanvas.images.displayImage(holdemCanvas.images.seats[i].hiddenCard1)
                   }
                   else if(i === holdemCanvas.userSeatNumber){
        holdemCanvas.images.displayShownCard(hand[0], holdemCanvas.images.seats[i].shownCard0)
                   holdemCanvas.images.displayShownCard(hand[1], holdemCanvas.images.seats[i].shownCard1)}
        }
        
        //display player's current bets

        for (var i in bets){
            holdemCanvas.images.playerPutsChipsInPot(bets[i],bets[i].NumChips)
        } 
    }
    
    jQuery(window).load(function ()
    {
 
    })
