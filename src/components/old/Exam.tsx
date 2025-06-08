import { useState, useEffect } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';

interface Question {
  id: number;
  text: string;
  choices: string[];
  correctAnswer: number;
}

const ExamLayout = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(3000);
  const [examCompleted, setExamCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      text: '1. Assistant Vice President',
      choices: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'],
      correctAnswer: 1,
    },
    {
      id: 2,
      text: '2. What is React?',
      choices: ['A library', 'A framework', 'A language', 'An OS'],
      correctAnswer: 0,
    },
    {
      id: 3,
      text: '3. What is Tailwind?',
      choices: [
        'A CSS framework',
        'A JS library',
        'A build tool',
        'A package manager',
      ],
      correctAnswer: 0,
    },
    {
      id: 4,
      text: '4. Question 4',
      choices: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 2,
    },
    {
      id: 5,
      text: '5. Last Question',
      choices: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
      correctAnswer: 3,
    },
  ];

  useEffect(() => {
    if (timeRemaining > 0 && !examCompleted) {
      const timerId = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else if (timeRemaining === 0 && !examCompleted) {
      setExamCompleted(true);
      evaluateExam();
    }
  }, [timeRemaining, examCompleted]);

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0'
    )}`;
  };

  const handleAnswerChange = (choiceIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = choiceIndex;
    setAnswers(newAnswers);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setExamCompleted(true);
      evaluateExam();
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const evaluateExam = () => {
    let correctAnswers = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) correctAnswers++;
    });
    setScore(correctAnswers);
  };

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
    setCurrentQuestionIndex(index);
    if (sidebarOpen) setSidebarOpen(false); // Auto close on mobile
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className='flex flex-col md:flex-row min-h-screen bg-gray-50'>
      {/* Mobile sidebar toggle */}
      <div className='md:hidden p-4 bg-green-600 text-white flex justify-between items-center'>
        <h2 className='text-lg font-bold'>Questions</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`bg-green-600 text-white p-4 md:block w-full md:w-64 transition-all ${
          sidebarOpen ? 'block' : 'hidden md:block'
        }`}
      >
        <input
          type='text'
          placeholder='Search Questions...'
          className='w-full p-2 mb-4 text-black rounded outline-none'
        />
        <div className='space-y-2'>
          {questions.map((question, index) => (
            <div key={question.id}>
              <div
                className={`py-2 px-2 rounded cursor-pointer hover:bg-green-700 ${
                  currentQuestionIndex === index ? 'bg-green-700' : ''
                }`}
                onClick={() => toggleQuestion(index)}
              >
                {question.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <main className='flex-1 p-4'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6'>
          <div className='text-xl font-semibold text-gray-800'>
            Akaki Polytechnic Collage Exam System
          </div>
          <div className='flex mt-4 sm:mt-0'>
            <button className='bg-red-500 text-white px-4 py-2 rounded'>
              Logout 🚪
            </button>
          </div>
        </div>

        <div className='mb-2 space-y-1 text-sm'>
          <div>Student: Abebe Belachew</div>
          <div>Exam: Test 1</div>
          <div>Course: Connecting Hardware Peripherals</div>
          <div>Department: ICT | Stream: WDDBA | Prepared By: T. Astemari</div>
        </div>

        <div className='flex justify-between items-center my-4'>
          <div className='text-sm text-gray-700'>
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
          <div className='text-lg font-semibold text-green-700'>
            ⏱ {formatTime(timeRemaining)}
          </div>
        </div>

        <div className='bg-white rounded shadow p-4'>
          {examCompleted ? (
            <div>
              <h2 className='text-xl font-semibold mb-4'>
                Your Score: {score} / {questions.length}
              </h2>
              {questions.map((q, i) => (
                <div key={q.id} className='mb-3'>
                  <p className='font-medium'>{q.text}</p>
                  {q.choices.map((choice, j) => (
                    <div key={j} className='ml-4 text-sm'>
                      <input
                        type='radio'
                        id={`q${i}-c${j}`}
                        checked={answers[i] === j}
                        disabled
                      />
                      <label
                        htmlFor={`q${i}-c${j}`}
                        className={`ml-2 ${
                          j === q.correctAnswer
                            ? 'text-green-600'
                            : answers[i] === j
                            ? 'text-red-500'
                            : ''
                        }`}
                      >
                        {choice}
                      </label>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p className='text-lg font-medium mb-3'>{currentQuestion.text}</p>
              {currentQuestion.choices.map((choice, index) => (
                <div key={index} className='mb-2'>
                  <input
                    type='radio'
                    id={`choice${index}`}
                    name={`question${currentQuestionIndex}`}
                    checked={answers[currentQuestionIndex] === index}
                    onChange={() => handleAnswerChange(index)}
                  />
                  <label htmlFor={`choice${index}`} className='ml-2'>
                    {choice}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Nav Buttons */}
        {!examCompleted && (
          <div className='flex justify-between mt-6'>
            <button
              className='bg-green-100 text-green-700 px-4 py-2 rounded'
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              &lt; Prev
            </button>
            <button
              className='bg-blue-500 text-white px-4 py-2 rounded'
              onClick={goToNextQuestion}
            >
              {currentQuestionIndex === questions.length - 1
                ? 'Finish'
                : 'Next >'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ExamLayout;
