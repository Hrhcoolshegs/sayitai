import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Testimonial } from '../types';

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: 'Finally, I can confidently say my international clients\' names correctly the first time.',
    author: "Adebimpe Ayeni",
    title: "Sales Manager"
  },
  {
    id: 2,
    quote: 'As someone with a constantly mispronounced name, I wish everyone used this.',
    author: "Oluwasindara Aderibigbe",
    title: "Product Designer"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-[#080812] relative">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-[#8A4FFF]/10 to-[#4FB0FF]/10 dark:from-[#9F6AFF]/10 dark:to-[#52C5FF]/10 blur-3xl -bottom-20 left-1/4"></div>
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
            What People Say
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white dark:bg-[#0F0F24] rounded-xl p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow duration-300 border border-transparent hover:border-[#B49AFF]/20 dark:hover:border-[#C2ACFF]/20 relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -5 }}
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-[#B49AFF]/30 dark:text-[#C2ACFF]/30" />
              <p className="text-lg mb-6 text-[#484D7A] dark:text-[#D7DAFF] relative z-10">
                {testimonial.quote}
              </p>
              <div className="flex items-center">
                <div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#8A4FFF] to-[#4FB0FF] dark:from-[#9F6AFF] dark:to-[#52C5FF]"></div>
                </div>
                <div className="ml-4">
                  <p className="font-medium text-[#1A1A2E] dark:text-[#F0F0FF]">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-[#6E7191] dark:text-[#B4B8D2]">
                    {testimonial.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;