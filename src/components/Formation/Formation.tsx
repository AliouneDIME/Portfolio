import { EducationCard } from './EducationCard';

const education = [
  {
    institution: 'Ecole Superieure Polytechnique de Dakar (ESP)',
    degree: 'Professional degree in Software Engineering and Operating System',
    period: '2023 - 2024',
    description:
      'Specialized in web development and distributed applications. Conducting research on optimizing the performance of cloud applications and integrating microservices for a scalable architecture.',
    certificateUrl: ''
  },
  {
    institution: 'Ecole Superieure Polytechnique de Dakar (ESP)',
    degree: 'Higher Diploma in Technology',
    period: '2021 - 2023',
    description:
      'Technical support for users and training in system usage and Proficiency in programming languages',
    certificateUrl: ''
  },
  {
    institution: 'Force-N',
    degree: 'Cybersécurité',
    period: '2024',
    description:
      'Completed advanced certification in Cybersecurity Analyst.',
    certificateUrl: 'src/components/Formation/certificates/certificatAnalysteCybersécurité.JPG'
  },
];

export function Formation() {
  return (
    <section id="formation" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary-600 to-secondary-600 text-transparent bg-clip-text">
          Education & Formation
        </h2>
        <div className="max-w-3xl mx-auto">
          {education.map((item, index) => (
            <EducationCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}