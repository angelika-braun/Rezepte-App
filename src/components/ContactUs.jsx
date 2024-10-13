import { useState } from "react";
import "./ContactUs.css"

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false); // Zustand für die Erfolgsnachricht

  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log(`"Formular was sent: "
    ${name}
    ${email}
    ${message}
    `);
    setName("");
    setEmail("");
    setMessage("");
    setSubmitted(true); 
  };

  return (
    <div className="contactContainer">
      <h2>Contact us</h2>
      <form onSubmit={handleSubmit}>
        <div className="labelbox">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} 
            required
          />
        </div>
        <div className="labelbox">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
        </div>
        <div className="labelbox">
          <label>Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)} 
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {submitted && <p className="successMessage">The form was sent successfully!</p>}
    </div>
  );
};

export default ContactUs;
