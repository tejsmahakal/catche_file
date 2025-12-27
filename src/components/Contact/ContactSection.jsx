import React from "react";
import ContactHeader from "../../pages/ContactSection/ContactHeader";
import FAQContactSection from "../../pages/ContactSection/FAQContactSection";
import BackgroundSignIn from "../../assets/SignIn/BackgroundSignIn.jpg";
import ContactHighlights from "../../pages/ContactSection/ContactHighlights";

 const ContactSection = () => {
  const faqs = [
    {
      question: "How quickly can I expect a response?",
      answer:
        "We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call our support hotline for immediate assistance.",
    },
    {
      question: "What information should I include in my inquiry?",
      answer:
        "Please provide your full name, registered email address, and a detailed description of your question or concern. If it’s a technical issue, include screenshots and the steps to reproduce the problem.",
    },
    {
      question: "Can I schedule a call with your team?",
      answer:
        "Yes! Premium and Elite members can schedule one-on-one consultations with our relationship advisors. Contact us through the form above to book an appointment.",
    },
    {
      question: "Do you offer support in multiple languages?",
      answer:
        "Currently, we offer support in English, Spanish, Hindi, and Mandarin. Select your preferred language when filling out the contact form.",
    },
    {
      question: "How can I provide feedback about the service?",
      answer:
        "We love hearing from you! You can send feedback through our contact form by selecting 'Feedback & Suggestions' as the category, or email us directly at feedback@matrimony.com.",
    },
    {
      question: "What if I need to report a profile or concern?",
      answer:
        "User safety is our priority. Select 'Report an issue' in the contact form, or use the report button on any profile. Our moderation team reviews all reports within 2–4 hours.",
    },
    {
      question: "What if I need to report a profile or concern?",
      answer:
        "User safety is our priority. Select 'Report an issue' in the contact form, or use the report button on any profile. Our moderation team reviews all reports within 2–4 hours.",
    },
    {
      question: "Can I visit your office in person?",
      answer:
        "Yes, we welcome visits to any of our office locations. However, we recommend scheduling an appointment in advance to ensure our team is available to assist you.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Absolutely. All communications through our contact form are encrypted and handled confidentially. We never share your information with third parties without your explicit consent.",
    },
  ];


  return (
    <div
      className="relative min-h-screen font-[Inter] overflow-hidden"
      style={{
        backgroundImage: `url(${BackgroundSignIn})`,
        backgroundSize: "120%", // zoom
       backgroundPosition: "left -279px top -950px",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* dark effect on the right */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-black/40 to-black/80 z-0"></div>

      {/* Content sits above the background */}
      <div className="relative z-10">
    
        <ContactHeader />

        <ContactHighlights />

        {/* FAQ component */}
        <div className="max-w-8xl mx-auto px-6">
          <FAQContactSection faqs={faqs} />
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
