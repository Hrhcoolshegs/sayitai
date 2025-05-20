import React from 'react';
import { motion } from 'framer-motion';
import { TextCursor as Cursor, MousePointerClick, Volume2, Users } from 'lucide-react';

const steps = [
  {
    icon: <Cursor className="w-8 h-8 text-[#4FD9E4] dark:text-[#5FEAF5]" />,
    title: "Highlight any name",
    description: "Just select any name, anywhere on the web"
  },
  {
    icon: <MousePointerClick className="w-8 h-8 text-[#B49AFF] dark:text-[#C2ACFF]" />,
    title: "Click the subtle dot",
    description: "A small indicator appears next to the highlighted text"
  },
  {
    icon: <Volume2 className="w-8 h-8 text-[#FFB6A3] dark:text-[#FFC6B3]" />,
    title: "Hear correct pronunciation",
    description: "Get instant audio pronunciation with phonetic spelling"
  },
  {
    icon: <Users className="w-8 h-8 text-[#8A4FFF] dark:text-[#9F6AFF]" />,
    title: "Build connections",
    description: "Show respect by saying names correctly the first time"
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-[#080812] relative">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-[#FF7D6A]/10 to-[#FFDE83]/10 dark:from-[#FF8E7A]/10 dark:to-[#FFE893]/10 blur-3xl -bottom-20 -right-20"></div>
      </div>
      
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1A1A2E] dark:text-[#F0F0FF]">
            How It Works
          </h2>
          <p className="text-lg text-[#484D7A] dark:text-[#D7DAFF] max-w-xl mx-auto">
            Getting the perfect pronunciation is just a highlight away
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-[#0F0F24] rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-transparent hover:border-[#B49AFF]/20 dark:hover:border-[#C2ACFF]/20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-[#1A1A2E] dark:text-[#F0F0FF]">{step.title}</h3>
              <p className="text-[#6E7191] dark:text-[#B4B8D2]">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;