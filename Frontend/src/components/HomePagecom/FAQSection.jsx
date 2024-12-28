import React from "react";

const faqs = [
  {
    question: "How do I apply for jobs?",
    answer: "Sign up, browse jobs, and apply with one click.",
  },
  {
    question: "Is this platform free?",
    answer: "Yes, job seekers can use it completely free.",
  },
  {
    question: "How do I contact recruiters?",
    answer: "Once matched, you can connect directly.",
  },
];

const FAQSection = () => {
  return (
    <div className="bg-gray-100 py-16 px-6 md:px-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Frequently Asked <span className="text-[#F83002]">Questions</span>
      </h2>
      <div className="space-y-8">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold">{faq.question}</h3>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
