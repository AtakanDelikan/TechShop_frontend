import React from "react";

function ProjectOverview() {
  return (
    <>
      <div className="container py-5">
        <h2 className="mb-4">🔐 Demo Access & Authentication</h2>
        <p>
          This project includes role-based authentication and authorization.
        </p>
        <ul className="list-group list-group-flush mb-3">
          <li className="list-group-item">
            ✔️ Login / Register with roles: Admin or Customer
          </li>
          <li className="list-group-item">
            🔒 Role-based access control (admin tools restricted)
          </li>
          <li className="list-group-item">
            🧪 <strong>Demo credentials:</strong>
            <br />
            <code>Username: admin</code>
            <br />
            <code>Password: 12345</code>
          </li>
        </ul>
        <p className="text-muted">
          Or feel free to register a new user and explore the platform as a
          customer or admin.
        </p>
        <p>
          💳 Stripe integration is enabled. You can test payments using a demo
          card like <code>4242 4242 4242 4242</code>.
        </p>
      </div>

      <div className="container py-5">
        <h2 className="mb-4">🚀 Project Overview</h2>
        <p>
          This is a full-featured e-commerce web application developed as a
          portfolio project using <strong>ASP.NET Core</strong> (backend),{" "}
          <strong>SQL Server</strong> (database), and{" "}
          <strong>React + TypeScript</strong> (frontend).
        </p>
        <ul className="list-group list-group-flush my-3">
          <li className="list-group-item">
            🛍️ Dynamic product filtering and search
          </li>
          <li className="list-group-item">
            📦 CSV bulk import for products and categories
          </li>
          <li className="list-group-item">
            📈 Sales analytics dashboard with charts
          </li>
          <li className="list-group-item">
            🧩 Dynamic category and attribute management
          </li>
          <li className="list-group-item">
            🎯 Admin tools and responsive design
          </li>
          <li className="list-group-item">
            🔑 Authentication and Authorization
          </li>
          <li className="list-group-item">
            🛒 Shopping Cart and Payment with Stripe
          </li>
        </ul>
        <p>For more detailed information visit my GitHub repos:</p>
        <ul className="list-group list-group-flush my-3">
          <li className="list-group-item">
            🛠️ Backend:{" "}
            <a href="https://github.com/AtakanDelikan/TechShop_frontend">
              https://github.com/AtakanDelikan/TechShop_frontend
            </a>
          </li>
          <li className="list-group-item">
            ⚛️ Frontend:{" "}
            <a href="https://github.com/AtakanDelikan/TechShop_API">
              https://github.com/AtakanDelikan/TechShop_API
            </a>
          </li>
        </ul>
      </div>

      <div className="container py-5">
        <h2 className="mb-4">⚙️ Tech Stack</h2>
        <div className="row text-center">
          {[
            "ASP.NET Core",
            "Entity Framework Core",
            "SQL Server",
            "React",
            "TypeScript",
            "Bootstrap",
            "Material UI",
            "Recharts",
          ].map((tech, idx) => (
            <div key={idx} className="col-md-3 mb-3">
              <div className="border p-3 rounded shadow-sm bg-light">
                {tech}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProjectOverview;
