# FocusRiteBingo
A web based bingo game

Central Game Server:
Technology: Node.js and Express.js.
Functionality: Acts as the nerve center, managing player connections, game states, and number generation.
Benefits: Efficient, event-driven environment suitable for real-time applications, enhanced by Express.js for routing and middleware.

Player Clients:
Technology: React
Functionality: Provides a responsive and interactive user interface for players to join games, view Bingo cards, and interact in real time.
Benefits: Enables the creation of dynamic SPAs with efficient rendering and state management.

Database:
Technology: MongoDB.
Functionality: Stores game data, player profiles, ongoing games, and historical data.
Benefits: Excels in handling flexible, JSON-like document data, offering scalability and high performance.

Bingo Card Generator:
Location: Server-side.
Functionality: Generates unique Bingo cards for each player.
Benefits: Leverages JavaScript's array and randomization capabilities for efficient and scalable card generation.

Random Number Generator:
Location: Server-side.
Functionality: Responsible for calling out Bingo numbers in a random and unbiased manner.
Benefits: Ensures true randomness and game integrity using various libraries and algorithms.

Real-Time Updates:
Technology: WebSockets (Socket.IO).
Functionality: Enables low-latency communication between the server and clients for real-time game state updates.
Benefits: Ideal for transmitting changes like called numbers and card updates, ensuring synchronous gameplay.

Bingo Declaration System:
Location: Integrated with the server.
Functionality: Manages players declaring 'Bingo!' and verifies their claims.
Benefits: Ensures real-time interaction and prompt, accurate winner announcement.
