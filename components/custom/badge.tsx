import { motion } from 'framer-motion';
import React from 'react';

interface BadgeProps {
    text: string;
    link: string;
  }
  
const Badge: React.FC<BadgeProps> = ({ text, link }) => {
  return (
    <motion.span
      onClick={() => {
        window.location.href = link;
      }}
      whileHover={{ scale: 1.05 }}
      className="bg-[var(--accent)] text-black px-3 py-1 rounded-full cursor-pointer font-roboto-mono"
    >
      {text}
    </motion.span>
  );
};

export default Badge;