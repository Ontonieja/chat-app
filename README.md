<h1>Chat App</h1>  

This app is a chat platform for real-time messaging and media sharing. I developed it to deepen my understanding of how socket.io works and strengthen my skills in building full-stack REST APIs. 

<h2>🚀 Design </h2> 

![github-design](https://github.com/user-attachments/assets/3087b389-07f2-4f9a-a8f0-518e462fcde8)

<h2>🛠️ Technologies Used</h2>
<b>Frontend:</b> React, Vite, TailwindCSS<br>
<b>Backend: </b> Node.js, Express.js, Socket.io<br>
<b>Database: </b> PostgreSQL with Prisma ORM<br>
<b>Contanerization: </b> Docker<br>
<b>Cloud Services: </b> AWS S3 for file storage<br>

<h2>🔧 Installation</h2>

<h3>Local Setup</h3>

<h4>1. Clone repository</h4>

 ```bash
   git clone https://github.com/Ontonieja/chat-app.git
```

<h4>2. Create .env files for both the server and the client</h4>

- For the server, create `server/.env` and add required variables. If you plan to use AWS S3 for file storage configure additional AWS variables:
```bash
PORT = 3000
JWT_SECRET="80d46978439610258e39e7425b29c075721c8734c82cb99b0ebdd64816be6355f80d93070de9bd43372e4b1393722554d17103daaca5dbf975d2237067d016198c2da9dfbc5813335d5c5b7803a79856f6191ead0ddc8cfdcb9310d405090718731501bc25b7de0c3859665876f6cfd668f1a41f6873873f7716de837a521651"
DATABASE_URL="postgresql://<yourusername>:<yourpassword>@postgres_db:5432/<databasename>?schema=public"
AWS_BUCKET_URL=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
BUCKET=
```
 - For the client, create client/.env and add necessary variable
```bash
VITE_NODE_SERVER_URL="http://localhost:3000/"
```

<h4>3. Install dependencies for server and client</h4>

```bash
cd server && yarn install
```
```bash
cd ../client && yarn install
```
<h4>4. Run Prisma migration and seed the database:</h4>

 ```bash
cd ../server
npx prisma migrate dev
npx prisma db seed
```

<h4>5. Start the backend</h4>

 ```bash
 yarn dev
```

<h4>6. Start the client</h4>

 ```bash
cd ../client && yarn dev
```

<h3>Docker Setup</h3>

<h4>1. Set up environment variables</h4>
Create .env files for the server and the client, similar to the Local Setup instructions above. Adjust only server .env DATABASE_URL variable. 

```bash
DATABASE_URL="postgresql://user:password@postgres_db:5432/chat_app?schema=public"
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

<h2>📄 License </h2>
<a href="https://choosealicense.com/licenses/mit/">MIT</a>
