import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Mail, Shield, FileUp, Clock } from 'lucide-react';

const DocumentationPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "What types of files can I upload?",
      answer: "Supported formats include PDF, DOCX, ZIP, PNG, JPG, and more."
    },
    {
      question: "How long is the download link valid?",
      answer: "By default, links remain active for 24 before expiry."
    },
    {
      question: "Can I track if my file was downloaded?",
      answer: "Currently, tracking is not available, but it may be introduced in future updates."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Introduction */}
      <section className="space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">File Sharing Platform</h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Welcome to ShareNest! This platform allows users to upload a file, provide the recipient's email, 
          add a custom message, and share the file securely. Additionally, a shareable link is generated, which can be sent 
          to anyone for easy file access.
        </p>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 space-y-4">
            <FileUp className="h-8 w-8 text-[#ce3f21]" />
            <h3 className="text-xl font-semibold">File Upload</h3>
            <p className="text-gray-600">Upload files from your device with ease and security.</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 space-y-4">
            <Mail className="h-8 w-8 text-[#ce3f21]" />
            <h3 className="text-xl font-semibold">Share Through Email</h3>
            <p className="text-gray-600">Share files link via email with custom messages.</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 space-y-4">
            <Shield className="h-8 w-8 text-[#ce3f21]" />
            <h3 className="text-xl font-semibold">Secure Storage</h3>
            <p className="text-gray-600">All files are encrypted and stored securely.</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 space-y-4">
            <Clock className="h-8 w-8 text-[#ce3f21]" />
            <h3 className="text-xl font-semibold">Auto Expiry</h3>
            <p className="text-gray-600">Files automatically expire for enhanced security.</p>
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="bg-gray-50 rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-semibold">How to Use</h2>
        <div className="space-y-4">
          {[
            { step: 1, title: "Upload a File", description: "Click on the Upload File button and select a file from your device." },
            { step: 2, title: "Enter Recipient Details", description: "Enter the recipient's email and add an optional message." },
            { step: 3, title: "Share the File", description: "Click Send to email the file or copy the generated link." },
            { step: 4, title: "Downloading a Shared File", description: "The recipient clicks the link and downloads the file." }
          ].map((item) => (
            <div key={item.step} className="flex items-start">
              <div className="flex-shrink-0 bg-[#ce3f21] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
                {item.step}
              </div>
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="space-y-4 pb-10">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-lg bg-white"
          >
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-150"
              onClick={() => toggleFaq(index)}
            >
              <span className="font-semibold">{faq.question}</span>
              {openFaq === index ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            {openFaq === index && (
              <div className="px-6 py-4 border-t">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Contact Support */}
      {/* <section className="bg-gray-50 rounded-lg p-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
        <p className="text-gray-600">
          For any issues or queries, please reach out to{' '}
          <a href="mailto:[Your Support Email]" className="text-blue-500 hover:text-blue-600 font-semibold">
            [Your Support Email]
          </a>{' '}
          or visit our{' '}
          <a href="#" className="text-blue-500 hover:text-blue-600 font-semibold">
            Help Center
          </a>
          .
        </p>
      </section> */}
    </div>
  );
};

export default DocumentationPage;