import React, { useState, useEffect} from "react";
import { Search, User } from "lucide-react";
import { Helmet } from "react-helmet";


const Students: React.FC = () => {
    useEffect(() => {
    document.title = "Student Directory";
  }, []);

  // Data for students only
  const people = [
    { name: "Jessa Morales", role: "Web Development Intern", department: "Web Development", type: "Student" },
    { name: "Oliver Reyes", role: "UI/UX Intern", department: "Web Development", type: "Student" },
    { name: "Hannah Lim", role: "Software Engineering Intern", department: "Software Engineering", type: "Student" },
    { name: "Ivan Castillo", role: "QA Intern", department: "Software Engineering", type: "Student" },
    { name: "Lara Gutierrez", role: "IT Support Intern", department: "Technical Support", type: "Student" },
    { name: "Sean Villareal", role: "Helpdesk Intern", department: "Technical Support", type: "Student" },
    { name: "Nicole Dela Rosa", role: "Cybersecurity Intern", department: "Cybersecurity", type: "Student" },
    { name: "Kenneth Morales", role: "SOC Intern", department: "Cybersecurity", type: "Student" },
    { name: "Jasmine Ortega", role: "Data Analytics Intern", department: "Data Analytics", type: "Student" },
    { name: "Toni Herrera", role: "Data Science Intern", department: "Data Analytics", type: "Student" },
  ];

  // 🔍 Search state
  const [query, setQuery] = useState("");
  const [filterBy, setFilterBy] = useState<"all" | "department" | "role">("all");

  // 🔎 Filter logic
  const filteredPeople = people.filter((person) => {
    const q = query.toLowerCase();

    if (filterBy === "department") {
      return person.department.toLowerCase().includes(q);
    }
    if (filterBy === "role") {
      return person.role.toLowerCase().includes(q);
    }
    // default: search across all fields
    return (
      person.name.toLowerCase().includes(q) ||
      person.role.toLowerCase().includes(q) ||
      person.department.toLowerCase().includes(q)
    );
  });

  <Helmet>
  <title>STUEM DIRECTORY</title>
  </Helmet>

  return (
    <div className="p-6">
      {/* Top section: welcome + search */}
      <div className="flex justify-between mb-6">
        {/* Left side */}
        <div>
          <h2 className="text-xl font-semibold text-maroon dark:text-blue-400">
            Student Directory
          </h2>
          <p className="text-gray-600 dark:text-green-300">
            List of all students
          </p>
        </div>

        {/* Right side, search + filters */}
        <div className="w-1/3 flex flex-col gap-3">
          {/* Search bar with icon */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by department, role, or type..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 
                         rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
                         bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Filter buttons below search bar */}
          <div className="flex justify-center gap-2 mt-0">
            <button
              onClick={() => setFilterBy("role")}
              className={`px-3 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-md 
                          text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 
                          ${filterBy === "role" ? "bg-blue-100 dark:bg-blue-900" : ""}`}
            >
              Role
            </button>
            <button
              onClick={() => setFilterBy("department")}
              className={`px-3 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-md 
                          text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 
                          ${filterBy === "department" ? "bg-blue-100 dark:bg-blue-900" : ""}`}
            >
              Department
            </button>
          </div>
        </div>
      </div>

      {/* Grid of student cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPeople.length > 0 ? (
          filteredPeople.map((person, index) => {
            const bgColors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-pink-500", "bg-yellow-500"];
            const bgColor = bgColors[index % bgColors.length];

            return (
              <div
                key={index}
                className="flex items-center gap-4 p-4 border rounded-lg shadow-sm 
                           bg-gray dark:bg-gray-800 
                           text-gray-900 dark:text-gray-100 
                           transform transition duration-300 ease-in-out 
                           hover:scale-105 hover:shadow-md"
              >
                {/* Profile icon */}
                <div
                  className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full ${bgColor}`}
                >
                  <User className="w-6 h-6 text-white" />
                </div>

                {/* Info */}
                <div>
                  <h3 className="text-lg font-semibold dark:text-white">{person.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-white">
                    {person.role} — {person.department}
                  </p>
                  <span className="text-xs font-medium text-green-800 dark:text-green-200">
                    {person.type}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">No matches found</p>
        )}
      </div>
    </div>
  );
};

export default Students;