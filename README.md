# CodexPlayground

A full-stack application featuring a Microsoft C# Web API with OpenAPI support and an Angular 21 web application.

## Architecture

- **Backend**: ASP.NET Core 10.0 Web API with OpenAPI/Swagger support
- **Frontend**: Angular 21 single-page application
- **API Documentation**: Swagger UI for interactive API testing

## Features

### Backend (CodexApi)
- RESTful API with minimal API endpoints
- OpenAPI/Swagger documentation and UI
- CORS configured for Angular app
- Sample endpoints:
  - Weather forecast API
  - Items CRUD operations (Create, Read, Update, Delete)

### Frontend (CodexApp)
- Modern Angular 21 application
- HTTP client service for API communication
- Responsive UI with CSS styling
- Real-time interaction with backend API
- Weather forecast display
- Items management interface

## Prerequisites

- [.NET 10.0 SDK](https://dotnet.microsoft.com/download)
- [Node.js 20.x or later](https://nodejs.org/)
- [Angular CLI 21](https://angular.io/cli)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/GrantHoward/CodexPlayground.git
cd CodexPlayground
```

### 2. Run the Backend API

```bash
cd CodexApi
dotnet restore
dotnet run --urls "http://localhost:5000"
```

The API will start on `http://localhost:5000`

**Access Swagger UI**: Navigate to `http://localhost:5000/swagger` in your browser to view and test the API endpoints.

### 3. Run the Frontend Application

Open a new terminal window:

```bash
cd CodexApp
npm install
npm start
```

The Angular app will start on `http://localhost:4200`

### 4. Access the Application

Open your browser and navigate to `http://localhost:4200`

## API Endpoints

### Weather Forecast
- `GET /weatherforecast` - Get weather forecast data

### Items Management
- `GET /api/items` - Get all items
- `GET /api/items/{id}` - Get item by ID
- `POST /api/items` - Create new item
- `PUT /api/items/{id}` - Update existing item
- `DELETE /api/items/{id}` - Delete item

## Project Structure

```
CodexPlayground/
├── CodexApi/              # ASP.NET Core Web API
│   ├── Program.cs         # API configuration and endpoints
│   ├── CodexApi.csproj    # Project file
│   └── Properties/        # Launch settings
├── CodexApp/              # Angular 21 application
│   ├── src/
│   │   ├── app/          # Application components
│   │   │   ├── services/ # API service
│   │   │   ├── app.ts    # Main component
│   │   │   └── app.html  # Main template
│   │   └── main.ts       # Application entry point
│   └── package.json      # NPM dependencies
└── CodexPlayground.sln   # Solution file

```

## Development

### Build the API
```bash
cd CodexApi
dotnet build
```

### Build the Angular App
```bash
cd CodexApp
npm run build
```

The production build will be in `CodexApp/dist/CodexApp/`

## Technologies Used

- **Backend**
  - ASP.NET Core 10.0
  - Microsoft.AspNetCore.OpenApi
  - Swashbuckle.AspNetCore (Swagger)
  
- **Frontend**
  - Angular 21
  - TypeScript
  - RxJS
  - Angular HttpClient

## License

This is a sandbox project for learning and experimentation.
