import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export default function StartExamPage() {
  const navigate = useNavigate();
  const handleStartExam = () => {
    navigate('/exam');
  };
  return (
    <div className='min-h-screen flex flex-col justify-between bg-white text-black px-4 py-6 md:px-12 md:py-8 font-poppins lg:px-24'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        {/* Greeting */}
        <div className='text-gray-600 font-medium text-base md:text-lg'>
          <span className='text-black'>@username</span>
        </div>

        {/* Right controls */}
        <div className='flex items-center gap-4'>
          <p className='text-sm md:text-base'>
            Time allowed:{' '}
            <span className='text-red-600 font-semibold'>40:00</span>
          </p>
          <button className='flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded'>
            Logout <FiLogOut />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex flex-col justify-center items-center flex-1 text-center'>
        <p className='text-lg md:text-xl lg:text-2xl font-semibold mb-8'>
          When You're ready click "Start exam" button
        </p>

        <button
          onClick={handleStartExam}
          className='bg-green-500 hover:bg-green-600 transition-colors duration-300 text-white font-semibold px-6 py-3 rounded text-base md:text-lg flex items-center gap-2'
        >
          Start exam <span>→</span>
        </button>
      </div>
    </div>
  );
}
