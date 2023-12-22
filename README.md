# FocusRiteBingo
<h2>A web based bingo game built using REACT</h2>

<h4>Central Game Server:<h4>
<b>Technology:</b> Node.js and Express.js.</br>
<b>Functionality:</b> Acts as the nerve center, managing player connections, game states, and number generation.</br>
<b>Benefits:</b> Efficient, event-driven environment suitable for real-time applications, enhanced by Express.js for routing and middleware.

<h4>Player Clients:<h4>
<b>Technology:</b> React</br>
<b>Functionality:</b> Provides a responsive and interactive user interface for players to join games, view Bingo cards, and interact in real time.</br>
<b>Benefits:</b> Enables the creation of dynamic SPAs with efficient rendering and state management.

<h4>Database:</h4>
<b>Technology:</b> MongoDB.</br>
<b>Functionality:</b> Stores game data, player profiles, ongoing games, and historical data.</br>
<b>Benefits:</b> Excels in handling flexible, JSON-like document data, offering scalability and high performance.

<h4>Bingo Card Generator:</h4>
<b>Location:</b> Server-side.</br>
<b>Functionality:</b> Generates unique Bingo cards for each player.</br>
<b>Benefits:</b> Leverages JavaScript's array and randomization capabilities for efficient and scalable card generation.

<h4>Random Number Generator:</h4>
<b></b>Location:</b> Server-side.</br>
<b>Functionality:</b> Responsible for calling out Bingo numbers in a random and unbiased manner.</br>
<b>Benefits:</b> Ensures true randomness and game integrity using various libraries and algorithms.

<h4>Real-Time Updates:</h4>
<b>Technology:</b> WebSockets (Socket.IO).</br>
<b>Functionality:</b> Enables low-latency communication between the server and clients for real-time game state updates.</br>
<b>Benefits:</b> Ideal for transmitting changes like called numbers and card updates, ensuring synchronous gameplay.

<h4>Bingo Declaration System:</h4>
<b>Location:</b> Integrated with the server.</br>
<b>Functionality:</b> Manages players declaring 'Bingo!' and verifies their claims.</br>
<b>Benefits:</b> Ensures real-time interaction and prompt, accurate winner announcement.


<h2>Prerequisites</h2>

Install MongoDB
Download the MongoDB Community Server:

Go to the MongoDB Download Center https://www.mongodb.com/try/download/community.
Select the "Windows" tab.
Choose the latest version.
Click "Download".

<h4>Application setup</h4>

<h5>Clone REPO to your local machine</h5>

<b>Setup Server</b>
Open application server project in visual studio.</br>
Open a terminal and navigate to server folder.</br>
Type <b>npm install</b> - This will restore all pakages</br>
Type <b>nodemon app.js</b> - This will start the server and connect to your local instance of MongoDB installed previously</br>
</br>
<b>Setup Client<b>
Open application client project in visual studio.</br>
Open a terminal and navigate to client folder.</br>
Type <b>npm install</b> - This will restore all pakages</br>
Type <b>npm run start</b> - This will start the client in your browser</br>
</br>
<h2>Game Play</h2>
Once the client loads you will be presented with the bingo game board.  A bingo card will automatically be generate.</br>
<ul>
<li>1. Click New game - A new game will be created in mongoDB.</li>
<li>2. The Join Game button will then become active.  Click join game and register your name and email.</li>
<li>3. Once at least one player has joined the start game button will become active.  After clicking the start button the Join Game button will become inactive. (multiple players can join until the start game button is clicked).</li>
<li>4. Once the game has started the mchat box will become active allowing you to send messages to the room.</li>
<li>5. After clicking start game the initial number will be displayed.  The call next number button will then become active.  Continue to click the button to generate new numbers up to a maximum of 75.</li>
<li>6. If a called number is on your bingo card select that number by clicking on i.t</li>
<li>7. Once you have filled your card the Declare Bingo button will become active.  Click Declare Bingo to inform the room that you have won.</li>
</ul>
</br>
<b>NOTE:  All actions, eg, New Game, Start Game, Join Game, Call Number, Declare Bingo and Messages will be broadcast to the room by socket IO.  A message will be displayed for each action above your bingo card.</b>





