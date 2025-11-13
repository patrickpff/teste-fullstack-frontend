# Teste Fullstack Frontend

This repository contains the **frontend** for the Fullstack Challenge.  
It was developed using **Angular 17** and communicates with the backend API built in **Laravel** (see [teste-fullstack-backend](https://github.com/patrickpff/teste-fullstack-backend)).

The application includes authentication with **HTTP-only cookies**, route protection, and full CRUD operations for entities.

> 🧩 Challenge reference: [Teste Full Stack](https://github.com/gerfinanceirosolucoes/teste-full-stack)

---

## 🚀 Technologies

- **Angular 17**
- **TypeScript**
- **RxJS**
- **Angular Router**
- **Reactive Forms**
- **Custom CSS styling (no external UI frameworks)**

---

## 📦 Project Setup

Clone this repository and install dependencies:

```bash
git clone https://github.com/yourusername/teste-fullstack-frontend.git
cd teste-fullstack-frontend
npm install
```
---
## 🧠 Environment Configuration

Before running the application, create the environment configuration file:

```bash
src/environments/environment.development.ts
```
Add your backend API URL:

```
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api' // or the backend URL
};
```

If you are using Docker-Laravel for the backend, make sure the API is reachable from your frontend environment (for example, http://localhost:8000/api).

🧩 Running the Application

To start the development server:

```
npm start
```

Then open http://localhost:4200 in your browser.

--- 

## 🔐 Authentication (via Cookies)

This application uses cookie-based authentication instead of localStorage or sessionStorage.

After login, the backend sends secure HTTP-only cookies containing the access and refresh tokens.

All subsequent API requests automatically include those cookies (withCredentials: true).

The frontend checks authentication state using the /user endpoint and guards routes accordingly.

Make sure your backend is configured to allow credentials and CORS properly:

```
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_origins' => ['http://localhost:4200'],
'supports_credentials' => true,
```
---

## 🐳 Integration with Docker-Laravel Backend

If you are running the backend using **[Docker-Laravel](https://github.com/patrickpff/docker-laravel)** — a custom Docker environment maintained by the author — it is already preconfigured to work seamlessly with this frontend.

If you are using a different Docker setup or local server, make sure your backend exposes port 80 or 8000, and update your environment file accordingly:

```
apiUrl: 'http://localhost/api'
```
The frontend will then communicate with the Laravel backend seamlessly using cookies.

---
## 📄 License

This project is part of a coding challenge and is shared for educational purposes.

--- 
Made with ❤️ to demonstrate secure fullstack development using Angular 17 and Laravel, with authentication handled exclusively through HTTP-only cookies.