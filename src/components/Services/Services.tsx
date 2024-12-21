import React from 'react';
import { Code2, Layout, Database, Globe, Server, Shield } from 'lucide-react';
import { ServiceCard } from './ServiceCard';

const services = [
  {
    title: 'Web Development',
    description: 'Building responsive and performant web applications using modern technologies.',
    Icon: Code2
  },
  {
    title: 'UI/UX Design',
    description: 'Creating intuitive and beautiful user interfaces with great user experience.',
    Icon: Layout
  },
  {
    title: 'Database Design',
    description: 'Designing efficient and scalable database architectures.',
    Icon: Database
  },
  {
    title: 'API Development',
    description: 'Building robust and secure RESTful APIs for your applications.',
    Icon: Globe
  },
  {
    title: 'Backend Development',
    description: 'Developing scalable server-side applications and microservices.',
    Icon: Server
  },
  {
    title: 'Security Consulting',
    description: 'Implementing best practices for web application security.',
    Icon: Shield
  }
];

export function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}