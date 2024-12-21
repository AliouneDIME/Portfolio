import React from 'react';

interface StatItemProps {
  number: string;
  label: string;
}

function StatItem({ number, label }: StatItemProps) {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-blue-600 mb-2">{number}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
}

export function Stats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 my-12">
      <StatItem number="5+" label="Years Experience" />
      <StatItem number="50+" label="Projects Completed" />
      <StatItem number="30+" label="Happy Clients" />
      <StatItem number="99%" label="Client Satisfaction" />
    </div>
  );
}