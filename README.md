# FocusRiteBingo
<b>A web based bingo game</b>

<h3><b>Central Game Server:</b><h3></br>
<b>Technology:</b> Node.js and Express.js.</br>
<b>Functionality:</b> Acts as the nerve center, managing player connections, game states, and number generation.</br>
<b>Benefits:</b> Efficient, event-driven environment suitable for real-time applications, enhanced by Express.js for routing and middleware.

<h3><b>Player Clients:</b><h3></br>
<b>Technology:</b> React</br>
<b>Functionality:</b> Provides a responsive and interactive user interface for players to join games, view Bingo cards, and interact in real time.</br>
<b>Benefits:</b> Enables the creation of dynamic SPAs with efficient rendering and state management.

<h3><b>Database:</b></h3></br>
<b>Technology:</b> MongoDB.</br>
<b>Functionality:</b> Stores game data, player profiles, ongoing games, and historical data.</br>
<b>Benefits:</b> Excels in handling flexible, JSON-like document data, offering scalability and high performance.

<h3><b>Bingo Card Generator:</b></h3></br>
<b>Location:</b> Server-side.</br>
<b>Functionality:</b> Generates unique Bingo cards for each player.</br>
<b></b>Benefits:</b> Leverages JavaScript's array and randomization capabilities for efficient and scalable card generation.

<h3><b>Random Number Generator:</b></h3></br>>
<b></b>Location:</b> Server-side.</br>
<b>Functionality:</b> Responsible for calling out Bingo numbers in a random and unbiased manner.</br>
<b>Benefits:</b> Ensures true randomness and game integrity using various libraries and algorithms.

<h3><b>Real-Time Updates:</b></h3>
<b>Technology:</b> WebSockets (Socket.IO).</br>
<b>Functionality:</b> Enables low-latency communication between the server and clients for real-time game state updates.</br>
<b>Benefits:</b> Ideal for transmitting changes like called numbers and card updates, ensuring synchronous gameplay.

<h3><b>Bingo Declaration System:</b></h3>
<b>Location:</b> Integrated with the server.</br>
<b>Functionality:</b> Manages players declaring 'Bingo!' and verifies their claims.</br>
<b>Benefits:</b> Ensures real-time interaction and prompt, accurate winner announcement.
