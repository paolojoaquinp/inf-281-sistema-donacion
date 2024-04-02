import { motion } from 'framer-motion';

const MotionPage = ({ children }) => (
  <motion.div
    initial="initial"
    animate="animate"
    exit={{ opacity: 0 }}
    variants={{
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    }}
  >
    {children}
  </motion.div>
);

export default MotionPage;