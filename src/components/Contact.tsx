import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

export function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setStatus('loading');

    try {
      await emailjs.sendForm(
        'service_vq6qwri', // Replace with your EmailJS service ID
        'template_0b8w1of', // Replace with your EmailJS template ID
        form.current,
        'WXlmg_sPF09mVXIht' // Replace with your EmailJS public key
      );

      setStatus('success');
      form.current.reset();
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Get In Touch</h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <span>aliounedime92@gmail.com</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <span>DAKAR , SN</span>
              </div>
            </motion.div>

            <motion.form 
              ref={form}
              className="space-y-4"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="user_name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="user_email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className={`w-full px-6 py-3 rounded-lg text-white font-medium transition-all duration-200 ${
                  status === 'loading' 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
              
              {status === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-100 text-green-700 rounded-lg"
                >
                  Message sent successfully!
                </motion.div>
              )}
              
              {status === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-100 text-red-700 rounded-lg"
                >
                  Failed to send message. Please try again.
                </motion.div>
              )}
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}