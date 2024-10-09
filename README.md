# Mapbox Routes Manager - Frontend
Welcome to the Mapbox Routes Manager Frontend! This React application serves as the frontend interface for managing routes on a Mapbox map. The frontend provides an intuitive UI to visualize, create, edit, and delete routes with multiple waypoints.

## 🛠️ Tech Stack
- **React**: A popular JavaScript library for building user interfaces, leveraging components and hooks for a modern development experience.
- **TypeScript**: A strongly typed superset of JavaScript that adds static types, making the code more robust and maintainable.
- **Mapbox GL JS**: A powerful library for displaying interactive maps and adding various controls and overlays.
- **PNPM**: A fast and disk space-efficient package manager for Node.js projects, used here for managing frontend dependencies.

## 🚀 Getting Started
### Prerequisites
Before starting the frontend application, ensure you have the following installed:

- **Node.js**: LTS version or above.

- **PNPM**: A fast package manager for JavaScript. Install it globally if you don't have it:

```
npm install -g pnpm
```

### Step 1: Install Dependencies
Navigate to the root directory of the frontend and run:

```
pnpm install
```
This command installs all necessary dependencies listed in the package.json file.

### Step 2: Check the Backend Base URL
The frontend communicates with the backend at a specific URL. Ensure that http://localhost:3000 is set as the base URL for the backend in the frontend application.

1. Open the frontend directory.

2. Go to the file src/components/map.tsx.

3. Check the value of API_URL:
```
const API_URL = 'http://localhost:3000';
```
If the backend is running on a different port or URL, update API_URL with the correct backend address.

### Step 3: Start the Frontend Application
Run the following command to start the frontend server:

```
pnpm run dev
````

### Step 4: Access the Frontend Application
Once the server is running, you can access the frontend application at:

```
http://localhost:5173
```
If the application starts successfully, you should see the Mapbox map and the initial routes displayed on the screen.

## 🎨 Features
### 1. Fetching the Mapbox Access Token
The frontend does not store the Mapbox token directly.
The application makes an HTTP request to the backend at the endpoint GET /mapbox-token to retrieve the token dynamically. This ensures that the token is securely managed on the server side.

### 2. Default Routes Display
The application displays two default routes on the map upon initial loading. These routes serve as a demonstration of the application's capabilities.

### 3. Add New Route
Click on the "Add new route" button to add a new route.
The user can set the route's name and add multiple waypoints.
After saving, the user is redirected to the route list page.

### 4. Edit Existing Route
By clicking on the pencil icon next to an existing route, the user can edit the waypoints of that route.
Changes made to waypoints are automatically saved.

### 5. Delete Route
On the route list page, the user can delete an existing route by clicking on the trash icon button.
A confirmation dialog will be shown before the route is permanently deleted.

## 🔧 Development & Customization
For development purposes, use the following scripts:

### Install dependencies
```
pnpm install
```

### Run the development server
```
pnpm run dev
```

### Environment Variables
The frontend fetches the Mapbox access token dynamically from the backend, so there is no need to set the token in environment variables. Ensure that the API_URL is correctly pointing to the backend server to retrieve the token.

If necessary, you can update the backend URL directly in the frontend code at src/components/map.tsx:


```
const API_URL = 'http://localhost:3000';
```

## 🔍 Troubleshooting
- Mapbox Token Errors: Ensure that the backend server is running and responding to the GET /mapbox-token request.
- Connection Issues: Make sure the backend server is accessible at the URL specified in API_URL.
- CORS Errors: If you encounter Cross-Origin Resource Sharing (CORS) issues, check your backend configuration to allow requests from the frontend's origin.