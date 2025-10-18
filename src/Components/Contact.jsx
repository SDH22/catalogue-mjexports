import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    inquiryType: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      alert('Thank you for your message. We will get back to you within 24 hours!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        inquiryType: 'general'
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="contact-page">
      <div className="page-header">
        <h1>Contact Us</h1>
        <p>Get in touch with our team for inquiries, quotes, and collaborations</p>
      </div>

      <div className="contact-container">
        <div className="contact-content">
          <div className="contact-info">
            <h2>Let's Start a Conversation</h2>
            <p>
              Whether you're looking for custom furniture solutions, bulk orders, 
              or have questions about our products, we're here to help. Our team 
              of specialists is ready to assist you in creating the perfect space.
            </p>
            
            <div className="contact-details">
              <div className="contact-item">
                <h4>Email</h4>
                <p>info@mjexports.com<br />sales@mjexports.com</p>
              </div>
              <div className="contact-item">
                <h4>Phone</h4>
                <p>+1 (555) 123-EXPORT<br />+1 (555) 123-SALES</p>
              </div>
              <div className="contact-item">
                <h4>Global Headquarters</h4>
                <p>123 Design District<br />Furniture City, FC 12345<br />United States</p>
              </div>
              <div className="contact-item">
                <h4>Business Hours</h4>
                <p>Monday - Friday: 8:00 AM - 6:00 PM EST<br />Saturday: 9:00 AM - 2:00 PM EST</p>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="company">Company / Organization</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company name (optional)"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="inquiryType">Inquiry Type</label>
                <select
                  id="inquiryType"
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                >
                  <option value="general">General Inquiry</option>
                  <option value="quote">Request a Quote</option>
                  <option value="custom">Custom Furniture Project</option>
                  <option value="bulk">Bulk Order / Wholesale</option>
                  <option value="collaboration">Design Collaboration</option>
                  <option value="support">Customer Support</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Project Details *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell us about your project, timeline, budget, and any specific requirements..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;