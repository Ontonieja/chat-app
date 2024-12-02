<h1>Chat App</h1>  

This app is a chat platform for real-time messaging and media sharing.

<h2>Design 🎨</h2> 

![github-design](https://github.com/user-attachments/assets/3087b389-07f2-4f9a-a8f0-518e462fcde8)

<h2>Technologies Used</h2>
<b>Frontend:</b> React, Vite, TailwindCSS<br>
<b>Backend: </b> Node.js, Express.js, Socket.io<br>
<b>Database: </b> PostgreSQL with Prisma ORM<br>
<b>Contanerization: </b> Docker<br>
<b>Cloud Services: </b> AWS S3 for file storage<br>

<h2>Installation</h2>

<h3>Local Setup</h3>

<h4>1. Clone repository</h4>

 ```bash
   git clone https://github.com/Ontonieja/chat-app.git
   cd chat-app
```

<h4>2. Install dependencies for server and client</h4>

 ```bash
  cd server && yarn install
  cd ../client && yarn install
```
<h4>3. Run Prisma migration and seed the database:</h4>

 ```bash
cd server
npx prisma migrate dev
npx prisma db seed
```

<h4>4. Start the backend</h4>

 ```bash
yarn dev
```

<h4>5. Start the backend</h4>

 ```bash
cd ../client && yarn dev
```

<h3>Docker Setup</h3>

<h4>1. Clone repository</h4>

 ```bash
   git clone https://github.com/Ontonieja/chat-app.git
   cd chat-app
```

<h4>2. Build and start containers</h4>

 ```bash
  docker-compose up --build
```

<h3>3. Acces the app</h3>
<ul>
  <li>Frontend: http://localhost:4000</li>
  <li>Backend: http://localhost:3000</li>
</ul>

<h2>License </h2>
<a href="https://choosealicense.com/licenses/mit/">MIT</a>
