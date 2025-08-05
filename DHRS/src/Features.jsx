import React from 'react'
import './Features.css'

const Features = () => {
  return (
    <div className="features-container">
      <div className="features1">
        <h3>Personal Health Record Overview</h3>
        <p>
          The medical history timeline gives you a chronological view of every{" "}
          <br />
          medical event, diagnosis, and treatment—helping you and your care{" "}
          <br /> team spot trends and understand your health journey at a
          glance.
        </p>
        <p>
          Health metrics dashboard delivers real-time graphs of your vitals,{" "}
          <br /> lab results, and wellness trends, making it easy to track your{" "}
          <br /> most important numbers and stay proactive with your health.
        </p>
        <p>
          Easily review all your medical documents, prescriptions, imaging
          results, <br />and discharge summaries in the document library. Medication
          tracker <br /> and allergy alerts ensure critical info is accessible when
          it’s needed most..
        </p>
      </div>
      <div className="features1">
        <h3>Access Permission Management</h3>
        <p>
          Granular provider access lets you control who can view your data, with
          time- <br />based grants for temporary care and emergency contacts for
          critical moments. <br /> Stay in command with templates for common healthcare
          visits, and maintain <br /> transparency with an audit trail showing exactly
          who accessed your records.
        </p>
        <p>
          Permission management means you decide, every step of the way, <br /> who can
          see what, for how long, and under what circumstances. <br /> Your privacy is
          protected by design, with full visibility and control.
        </p>
        <p>
          Read and set permissions quickly with intuitive controls—switch <br />
          providers’ access on or off, configure alerts, and adjust settings <br /> for
          different medical scenarios to keep your information secure.
        </p>
      </div>
      <div className="features1">
        <h3>Provider Communication Interface</h3>
        <p>
          Send and receive messages securely with your care team and healthcare <br />
          providers—completely HIPAA-compliant. Start appointment requests or <br />
          share records for additional medical opinions directly from your
          dashboard.
        </p>
        <p>
          Easily connect with all specialists involved in your care, review each
          provider’s <br /> role, and collaborate for better outcomes with intuitive,
          real-time messaging tools.
        </p>
        <p>
          Feel confident scheduling consultations and sharing your <br /> health
          details only with those you choose. Every provider <br /> interaction is
          protected, private, and visible to you at a glance.
        </p>
      </div>
      <div className="features1">
        <h3>Appointment Scheduling</h3>
        <p>
          Book and manage all your medical appointments with an integrated
          calendar <br /> linked to provider availability across the network. Stay
          organized with <br /> automated reminders so you never miss a visit or a
          scheduled medication.
        </p>
        <p>
          Review your appointment history, upcoming schedules, and <br /> connect
          directly with your care team through telemedicine <br /> for convenient,
          secure video visits—anytime you need care.
        </p>
        <p>
          Sync all your healthcare commitments in one place, making your health <br />
          management seamless, stress-free, and always under your control.
        </p>
      </div>
      <div className="features1">
        <h3>Health Data Visualization</h3>
        <p>
          Explore interactive charts and trend graphs that show your vital
          signs, lab <br /> results, and well-being patterns over time—powered by
          advanced analytics.
        </p>
        <p>
          Gain AI-backed insights and compare your stats to population <br />
          benchmarks with anonymized data. Generate customized health reports <br /> or
          export your results for outside consultations and personal use.
        </p>
        <p>
          All visualizations are easy to navigate and designed <br /> to support
          proactive, informed health decisions.
        </p>
      </div>
    </div>
  );
}

export default Features