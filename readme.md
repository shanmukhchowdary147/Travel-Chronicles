# Travel Chronicles

Travel Chronicles is a travel journal app that allows users to document their trips, adventures, family vacations, or any kind of journeys by writing personal diaries and uploading pictures. Users have the option to make their journals public, enabling others to read about their experiences and discover new places.

## Features

- **Personal Travel Diaries**: Users can write detailed journals about their trips and adventures.
- **Photo Uploads**: Enhance entries with photos from the trips.
- **Public and Private Entries**: Choose to make journals public or keep them private.
- **Discover New Places**: Explore public journals written by other users.
- **Intuitive UI**: Simple and user-friendly interface, designed with modular CSS.
- **Security**: Travel Chronicles employs HTTP-only cookies to store JSON Web Tokens (JWT), enhancing security by preventing access through client-side JavaScript, thus mitigating XSS vulnerabilities.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Styling**: Module CSS

## Installation

To get a local copy up and running, follow these steps:

### Prerequisites

- Node.js and npm installed
- Create MongoDB Atlas account and set up a cluster

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/shanmukhchowdary147/Travel-Chronicles.git
   cd Travel-Chronicles
   ```

2. Install dependencies for the backend:

   ```bash
   cd server
   npm install
   ```

3. Create a `.env` file in the `server` directory and add the following environment variables:

   ```env
   PORT=5500
   MONGODB_URI=<your_mongodb_uri>
   JWT_SECRET=<your_jwt_secret>
   ```

4. Create a `.env` file in the `client` directory and add the following environment variables:

   ```env
   REACT_APP_SERVER_BASE_URL=http://localhost:5500/api
   REACT_APP_CLOUDINARY_AUTH_URL=https://api.cloudinary.com/v1_1/<cloud_name>
   ```

5. Install dependencies for the frontend:

   ```bash
   cd ../client
   npm install
   ```

### Running the Application

1. Start the backend server:

   ```bash
   cd server
   npm start
   ```

2. Start the frontend development server:

   ```bash
   cd ../client
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000` to see the app in action.
