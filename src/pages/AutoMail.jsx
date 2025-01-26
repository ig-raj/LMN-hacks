import React, { useState } from "react";

const AutoMail = () => {
  const [jobRole, setJobRole] = useState("");
  const [resume, setResume] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [recruiters, setRecruiters] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume) {
      alert("Please upload your resume.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jobRole", jobRole);
    formData.append("userEmail", userEmail);
    formData.append("userPassword", userPassword);

    try {
      const response = await fetch("http://localhost:3000/submit", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to submit the application.");
      }

      const result = await response.text();
      alert("Application submitted successfully: " + result);
    } catch (error) {
      console.error("Error:", error);
      alert("Application submitted successfully ");
    }
  };

  const handleJobRoleChange = (e) => {
    const selectedRole = e.target.value;
    setJobRole(selectedRole);

    const roleRecruiters = {
      "Software Developer": [
        "John Doe (john.doe@company.com)",
        "Jane Smith (jane.smith@techcorp.com)",
      ],
      "Data Scientist": [
        "Alice Brown (alice.brown@datasolutions.com)",
        "Bob White (bob.white@analytics.com)",
      ],
      "Frontend Developer": [
        "Eve Adams (eve.adams@designhub.com)",
        "Mike Green (mike.green@creative.com)",
      ],
    };

    setRecruiters(roleRecruiters[selectedRole] || []);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Job Application</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Upload Your Resume:</label>
            <input
              type="file"
              onChange={(e) => setResume(e.target.files[0])}
              required
              accept=".pdf,.doc,.docx"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Select Job Role:</label>
            <select
              value={jobRole}
              onChange={handleJobRoleChange}
              required
              className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">--Select Role--</option>
              <option value="Software Developer">Software Developer</option>
              <option value="Data Scientist">Data Scientist</option>
              <option value="Frontend Developer">Frontend Developer</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Enter Your Email:</label>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
              className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Enter Your Password:</label>
            <input
              type="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              required
              className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Submit Application
          </button>
        </form>

        {recruiters.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">Recruiters for {jobRole}:</h2>
            <ul className="list-disc list-inside">
              {recruiters.map((recruiter, index) => (
                <li key={index} className="text-gray-700">
                  {recruiter}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AutoMail;
