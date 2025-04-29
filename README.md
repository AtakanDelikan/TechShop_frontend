# 🛒 TechShop Frontend (React + TypeScript)

This is the frontend application of a full-stack e-commerce platform built with **React**, **TypeScript**, and **Bootstrap 5**. It allows users to browse, filter, and purchase products. Admins can manage the product catalog and perform bulk data imports via the backend dashboard.

> 👉 [Backend Repository](https://github.com/AtakanDelikan/TechShop_API)

---

## 🔗 Live Demo

- 🌍 **Live Site**: [Hosted on Azure](https://zealous-tree-0f2a87203.6.azurestaticapps.net/)
- 👤 **Demo Credentials**:
  - **Admin**: `admin / 12345`
  - Or register as a customer or admin

---

## 🧠 Overview

This frontend client communicates with a .NET backend through REST APIs. It supports dynamic filtering, user authentication, Stripe payments, admin-only features, and a clean responsive design.

---

## 🧰 Tech Stack

| Role           | Technology                   |
| -------------- | ---------------------------- |
| Frontend       | React 18 + TypeScript        |
| Styling        | Bootstrap 5, Material UI     |
| Routing        | React Router DOM             |
| HTTP Client    | RTK Query                    |
| State Handling | Redux                        |
| Charts         | Recharts                     |
| Icons          | Bootstrap Icons              |
| Auth           | JWT (stored in localStorage) |
| Payments       | Stripe test integration      |

---

## ✨ Features

### 🛍 User Features

- Browse categories and products
- Search by keyword
- Filter products by category-specific attributes
- Add/remove items from cart
- View product details, rating, and price
- Add review for products
- Secure checkout with Stripe test card

### 🔐 Authentication

- Register and login as **Admin** or **Customer**
- Role-based protected routes
- Session stored via token in `localStorage`

### 🧮 Admin Features

- Bulk CSV import for:
  - Categories
  - Category Attributes
  - Products
- Manage catalog
- View sales analytics from backend dashboard

### 💳 Stripe Integration

- Use Stripe’s demo card for test checkout:
  - **Card Number**: `4242 4242 4242 4242`
  - **Date**: Any future expiry
  - **CVC**: Any 3 digits

---

## 🗂 Folder Structure

```bash
src/
├── Apis/               # API request functions
├── Components/         # Reusable components (navbar, cards, etc.)
├── Container/App.tsx   # Main application component
├── Helper/             # Various helper functions (input, notification, etc.)
├── HOC/                # Higher-order components
├── Interfaces/         # Typescript interfaces
├── Pages/              # Page-level views (Home, Cart, Admin)
├── Storage/            # Redux storage
└── Utility/            # Various static definitions
```
