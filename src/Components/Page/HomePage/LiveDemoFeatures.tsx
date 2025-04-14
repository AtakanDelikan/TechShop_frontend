import React from "react";

function LiveDemoFeatures() {
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

export default LiveDemoFeatures;
