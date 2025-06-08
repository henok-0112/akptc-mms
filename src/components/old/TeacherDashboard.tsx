import { useState } from "react";
import useScreenSize from "../../hooks/useScreenSize";
import { PiStudentFill, PiExamFill } from "react-icons/pi";

function TeacherDashboard() {
  const { isMobile, isTablet, isDesktop } = useScreenSize();

  if (isMobile) return <TeacherMobileLayout />;
  if (isTablet) return <TeacherTabletLayout />;
  if (isDesktop) return <TeacherDesktopLayout />;

  return <p className="text-black font-poppins">Loading...</p>;
}

const buttons = [
  { icon: PiStudentFill, label: "Students", value: "Students" },
  { icon: PiExamFill, label: "Exams", value: "Exams" },
];

function TeacherMobileLayout() {
  return <TeacherLayout sidebarWidth="w-[70px]" iconOnly />;
}

function TeacherTabletLayout() {
  return <TeacherLayout sidebarWidth="w-[200px]" />;
}

function TeacherDesktopLayout() {
  return <TeacherLayout sidebarWidth="w-[250px]" />;
}

function TeacherLayout({
  sidebarWidth,
  iconOnly = false,
}: {
  sidebarWidth: string;
  iconOnly?: boolean;
}) {
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [activeTab, setActiveTab] = useState("Students");

  const [questionType, setQuestionType] = useState("multiple");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState({ A: "", B: "", C: "", D: "" });
  const [correctOption, setCorrectOption] = useState("");
  const [savedQuestions, setSavedQuestions] = useState<
    {
      question: string;
      options: { A: string; B: string; C?: string; D?: string };
      correctOption: string;
      type: string;
    }[]
  >([]);

  const [students, setStudents] = useState<
    {
      id: string;
      studentName: string;
      departmentId: string;
      streamId: string;
      studentCollegeId: string;
    }[]
  >([]);

  const [studentForm, setStudentForm] = useState({
    id: "",
    studentName: "",
    departmentId: "",
    streamId: "",
    studentCollegeId: "",
  });

  const handleAddQuestion = () => {
    if (!question || !options.A || !options.B || !correctOption) {
      triggerToast("Please fill required fields!");
      return;
    }

    const newQuestion = {
      question,
      options,
      correctOption,
      type: questionType,
    };
    setSavedQuestions((prev) => [...prev, newQuestion]);

    setQuestion("");
    setOptions({ A: "", B: "", C: "", D: "" });
    setCorrectOption("");

    triggerToast("Question added successfully!");
  };

  const handleAddStudent = () => {
    const { id, studentName, departmentId, streamId, studentCollegeId } =
      studentForm;
    if (
      !id ||
      !studentName ||
      !departmentId ||
      !streamId ||
      !studentCollegeId
    ) {
      triggerToast("Please fill all student fields!");
      return;
    }

    setStudents((prev) => [...prev, studentForm]);
    setStudentForm({
      id: "",
      studentName: "",
      departmentId: "",
      streamId: "",
      studentCollegeId: "",
    });

    triggerToast("Student added successfully!");
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="max-h-screen flex bg-white font-poppins">
      {/* Sidebar */}
      <aside
        className={`group min-h-screen p-4 py-7 flex flex-col gap-6 bg-green-800 ${sidebarWidth} transition-all duration-300`}
      >
        {buttons.map((e, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(e.value)}
            className={`flex items-center gap-3 border border-white cursor-pointer rounded-sm p-2 hover:bg-green-700 text-white transition-colors duration-200 ${
              activeTab === e.value ? "bg-green-700" : ""
            }`}
          >
            <span className="text-xl">
              <e.icon />
            </span>
            {!iconOnly && (
              <span className="font-poppins whitespace-nowrap text-sm">
                {e.label}
              </span>
            )}
            {iconOnly && (
              <span className="hidden group-hover:inline whitespace-nowrap text-sm">
                {e.label}
              </span>
            )}
          </button>
        ))}
      </aside>

      {/* Main */}
      <main className="flex-1 p-4 overflow-y-auto text-black">
        {showToast && (
          <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50 transition-opacity duration-300">
            {toastMessage}
          </div>
        )}

        {activeTab === "Students" && (
          <div>
            <h1 className="text-xl font-bold text-gray-800">Create Student</h1>
            <div className="grid gap-4 mt-4">
              {[
                "id",
                "studentName",
                "departmentId",
                "streamId",
                "studentCollegeId",
              ].map((field) => (
                <input
                  key={field}
                  type="text"
                  placeholder={`Enter ${field}`}
                  value={studentForm[field as keyof typeof studentForm]}
                  onChange={(e) =>
                    setStudentForm((prev) => ({
                      ...prev,
                      [field]: e.target.value,
                    }))
                  }
                  className="border p-2 rounded w-full"
                />
              ))}
              <button
                onClick={handleAddStudent}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Add Student
              </button>
            </div>

            {/* Student Table */}
            <div className="mt-6">
              <h2 className="font-semibold mb-2">Created Students:</h2>
              <div className="overflow-x-auto">
                <table className="w-full border text-sm text-left">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 border">ID</th>
                      <th className="p-2 border">Name</th>
                      <th className="p-2 border">Department ID</th>
                      <th className="p-2 border">Stream ID</th>
                      <th className="p-2 border">College ID</th>
                      <th className="p-2 border">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((s, i) => (
                      <tr key={i} className="border-t">
                        <td className="p-2 border">{s.id}</td>
                        <td className="p-2 border">{s.studentName}</td>
                        <td className="p-2 border">{s.departmentId}</td>
                        <td className="p-2 border">{s.streamId}</td>
                        <td className="p-2 border">{s.studentCollegeId}</td>
                        <td className="p-2 border text-blue-600">
                          <button className="mr-2 hover:underline">
                            Update
                          </button>
                          <button
                            onClick={() =>
                              setStudents((prev) =>
                                prev.filter((_, index) => index !== i)
                              )
                            }
                            className="text-red-500 hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Exams" && (
          <div>
            <h1 className="text-xl font-bold text-gray-800">Create Question</h1>
            <div className="mt-4">
              <label className="block mb-1 font-semibold">Question Type:</label>
              <select
                className="border p-2 rounded w-full"
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value)}
              >
                <option value="multiple">Multiple Choice</option>
                <option value="boolean">True / False</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Enter question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="border p-2 rounded w-full mt-4"
            />
            <input
              type="text"
              placeholder="Option A"
              value={options.A}
              onChange={(e) => setOptions({ ...options, A: e.target.value })}
              className="border p-2 rounded w-full mt-2"
            />
            <input
              type="text"
              placeholder="Option B"
              value={options.B}
              onChange={(e) => setOptions({ ...options, B: e.target.value })}
              className="border p-2 rounded w-full mt-2"
            />
            {questionType === "multiple" && (
              <>
                <input
                  type="text"
                  placeholder="Option C"
                  value={options.C}
                  onChange={(e) =>
                    setOptions({ ...options, C: e.target.value })
                  }
                  className="border p-2 rounded w-full mt-2"
                />
                <input
                  type="text"
                  placeholder="Option D"
                  value={options.D}
                  onChange={(e) =>
                    setOptions({ ...options, D: e.target.value })
                  }
                  className="border p-2 rounded w-full mt-2"
                />
              </>
            )}
            <input
              type="text"
              placeholder="Correct option (A, B, C, D)"
              value={correctOption}
              onChange={(e) => setCorrectOption(e.target.value.toUpperCase())}
              className="border p-2 rounded w-full mt-2"
            />
            <button
              onClick={handleAddQuestion}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Add Question
            </button>

            <div className="mt-6">
              <h2 className="font-semibold mb-2">Saved Questions:</h2>
              {savedQuestions.map((q, index) => (
                <div
                  key={index}
                  className="border rounded p-3 mb-3 shadow-sm bg-gray-50"
                >
                  <p className="font-semibold">
                    {index + 1}. {q.question}
                  </p>
                  <ul className="ml-4 text-gray-700">
                    {Object.entries(q.options).map(
                      ([key, value]) =>
                        value && (
                          <li key={key}>
                            <strong>{key}.</strong> {value}
                          </li>
                        )
                    )}
                  </ul>
                  <p className="text-green-700 mt-1 font-medium">
                    Correct: {q.correctOption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default TeacherDashboard;
