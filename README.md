# E-Commerce Project

A full-stack e-commerce application built with Next.js (Frontend) and Spring Boot (Backend).

## Features

-   **User Authentication**: Secure Login and Registration with JWT.
-   **Product Management**: Admin interface to Add, Edit, and Delete products.
-   **Shopping Cart**: Fully functional cart with quantity management.
-   **Responsive Design**: Modern, responsive UI built with CSS Modules.
-   **Admin Dashboard**: Overview of store statistics and quick actions.
-   **Image Support**: Product images supported via URL.

## Tech Stack

### Frontend
-   **Next.js 14**: React framework for production.
-   **Lucide React**: Icon set.
-   **CSS Modules**: Scoped styling.
-   **Axios**: API requests.

### Backend
-   **Spring Boot**: Java framework for the REST API.
-   **MongoDB**: NoSQL database.
-   **Spring Security**: Authentication and Authorization.

## Getting Started

### Prerequisites
-   Node.js (v18+)
-   Java JDK 17+
-   MongoDB (Running locally or Atlas)

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd E-Commerce
    ```

2.  **Frontend Setup**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
    The frontend will run on `http://localhost:3000`.

3.  **Backend Setup**
    Open the `Ecom` folder in your IDE (IntelliJ/Eclipse) and run the `EcomApplication.java`.
    The backend runs on `http://localhost:8080`.

## Admin Features

To access admin features, ensure your user role is set to `ADMIN` in the database.

-   **Dashboard**: View total products, users, and categories.
-   **Add Product**: Navigate to `/admin/add-product` to list new items.

## Screenshots

<!-- Add your screenshots here -->

### Landing Page
![Landing Page](https://via.placeholder.com/800x400?text=Landing+Page+Screenshot)

### Product Details
![Product Details](https://via.placeholder.com/800x400?text=Product+Details+Screenshot)

### Admin Dashboard
![Admin Dashboard](https://via.placeholder.com/800x400?text=Admin+Dashboard+Screenshot)

### Add Product Page
![Add Product](https://via.placeholder.com/800x400?text=Add+Product+Page+Screenshot)
