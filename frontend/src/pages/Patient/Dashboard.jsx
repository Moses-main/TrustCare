// src/pages/Patient/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import Card from "../../components/Common/Card";

// import ".App.css";
const PatientDashboard = () => {
  const recent = [
    { id: "REC-002", title: "Lab Result", date: "2025-08-10" },
    { id: "REC-001", title: "Consultation", date: "2025-08-01" },
  ];

  const appointments = [
    { id: 1, date: "2025-08-20 09:00", with: "Dr. Ada", type: "Consultation" },
    { id: 2, date: "2025-08-25 11:00", with: "LabX", type: "Blood Test" },
  ];
  const careTeam = [
    { name: "Dr. Ada", role: "Primary Physician" },
    { name: "LabX", role: "Diagnostics" },
  ];
  const bills = [
    { id: "INV-002", amount: "$60.00", status: "Pending" },
    { id: "INV-001", amount: "$120.00", status: "Paid" },
  ];
  const notifications = [
    { id: 1, title: "Access Granted", date: "2025-08-11" },
    { id: 2, title: "New Record Added", date: "2025-08-10" },
  ];

  return (
    <div className="container">
      <h2>Patient Dashboard</h2>

      <div className="grid grid-responsive" style={{ marginTop: 16 }}>
        <Card title="Quick Actions">
          <div className="grid" style={{ gap: 10 }}>
            <Link to="/records">View Records</Link>
            <Link to="/access-management">Manage Access</Link>
            <Link to="/appointments">View Appointments</Link>
            <Link to="/medications">Medications</Link>
          </div>
        </Card>

        <Card
          title="Recent Records"
          action={
            <Link to="/records" style={{ fontSize: 14 }}>
              View all
            </Link>
          }
        >
          <div className="grid" style={{ gap: 10 }}>
            {recent.map((r) => (
              <div
                key={r.id}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>{r.title}</span>
                <span className="muted">{r.date}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card
          title="Upcoming Appointments"
          action={
            <Link to="/appointments" style={{ fontSize: 14 }}>
              Manage
            </Link>
          }
        >
          <div className="grid" style={{ gap: 10 }}>
            {appointments.map((a) => (
              <div
                key={a.id}
                style={{
                  border: "1px dashed var(--border)",
                  borderRadius: 10,
                  padding: 12,
                }}
              >
                <strong>{a.type}</strong>
                <div className="muted" style={{ fontSize: 14 }}>
                  {a.date} • With {a.with}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card
          title="Billing"
          action={
            <Link to="/invoices" style={{ fontSize: 14 }}>
              Invoices
            </Link>
          }
        >
          <div className="grid" style={{ gap: 10 }}>
            {bills.map((b) => (
              <div
                key={b.id}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>
                  <strong>{b.id}</strong>
                </span>
                <span className="muted">
                  {b.amount} • {b.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card
          title="Care Team"
          action={
            <Link to="/care-team" style={{ fontSize: 14 }}>
              View
            </Link>
          }
        >
          <div className="grid" style={{ gap: 8 }}>
            {careTeam.map((m, i) => (
              <div
                key={i}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>{m.name}</span>
                <span className="muted">{m.role}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card
          title="Notifications"
          action={
            <Link to="/notifications" style={{ fontSize: 14 }}>
              Open
            </Link>
          }
        >
          <div className="grid" style={{ gap: 8 }}>
            {notifications.map((n) => (
              <div
                key={n.id}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>{n.title}</span>
                <span className="muted">{n.date}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Health Summary">
          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 12,
            }}
          >
            <div
              style={{
                border: "1px dashed var(--border)",
                borderRadius: 10,
                padding: 12,
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 700 }}>72 bpm</div>
              <div className="muted" style={{ fontSize: 14 }}>
                Resting HR
              </div>
            </div>
            <div
              style={{
                border: "1px dashed var(--border)",
                borderRadius: 10,
                padding: 12,
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 700 }}>8,420</div>
              <div className="muted" style={{ fontSize: 14 }}>
                Steps Today
              </div>
            </div>
            <div
              style={{
                border: "1px dashed var(--border)",
                borderRadius: 10,
                padding: 12,
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 700 }}>7h 15m</div>
              <div className="muted" style={{ fontSize: 14 }}>
                Sleep Last Night
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PatientDashboard;
