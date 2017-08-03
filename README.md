Hello!

Introduction:
This is a memory game created by Huan Ming Liao as part of General Assembly's 
Web Development Immersive pre-work (8/14-11/3 Cohort) in San Francisco. In addition to the original assignment, I also incorporated the bonus challenge (Track User Score) from the pre-work and my own extra features, which mainly includes the following:
- Simplify game state with Start/Reset button
- “Randomized” card placement after each game 
- Check flipped pair by comparing its suit and rank
- Flip card back to facedown if its a no match
- Display live message for matching, no match, or end of game at each state
- Intensify player experience with the added live stopwatch
- Track and display best time record player has achieved
- Increased aesthetic when hover over cards/buttons
Please note: I modified many instructed code from pre-work after I completed the last step of 11.6 unit to accommdate the above changes.

How to play:
When the webpage is first loaded, it displays a simple instructions explaining what the game is. Player can start the game by clicking on the "Start Game" button. Immediately, stopwatch will start on the top right and 16 cards will be randomly generated underneath. There are four pairs of king of heart, king of diamond, queen of heart, and queen of diamond. The objective of the game is to find all four matches as quickly as possible, by flipping two cards at a time. Player can flip a card by left clicking on any of the card back. A yellow box shadow is shown when player hover over that card. After one card is flipped, the card will stay revealed until the player has flipped another card. If they are not a match, a no match message will be display and then they will be flipped back down after one second. The identity of the cards will not change after flipped face down. If they are a match, a complimenting message will be displayed and these two cards will stay revealed. User may now continue to flip another pair of cards at any order. Game ends when user has found all four matches. At that time, timer will stop and player score is displayed. If by any chance, player finished the game sooner that he did in the previous round, the best record will be updated and reflected on the screen. After the game ends, player is welcome to play another round by pressing the “Reset Game” button and “Start Game” button. A new set of randomized cards will be generated and player can play the game with the same rule. 
