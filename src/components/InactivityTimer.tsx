import { motion, AnimatePresence } from 'framer-motion';

interface InactivityTimerProps {
  remainingTime: number;
  show: boolean;
  totalTime?: number;
}

const InactivityTimer = ({ remainingTime, show, totalTime = 60000 }: InactivityTimerProps) => {
  // Calculate progress percentage (0-100)
  const progress = (remainingTime / totalTime) * 100;

  // Circle parameters
  const size = 48;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate stroke offset based on remaining time
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Determine color based on remaining time
  const getColor = () => {
    if (remainingTime <= 15000) return '#EF4444'; // red-500
    if (remainingTime <= 30000) return '#F97316'; // orange-500
    return '#3B82F6'; // blue-500
  };

  const color = getColor();

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center"
        >
          <svg
            width={size}
            height={size}
            className="transform -rotate-90"
          >
            {/* Background circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#E5E7EB"
              strokeWidth={strokeWidth}
              fill="none"
        />

            {/* Progress circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{
                transition: 'stroke-dashoffset 0.1s linear, stroke 0.3s ease',
              }}
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InactivityTimer;
