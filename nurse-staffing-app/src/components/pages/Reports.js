import React, { useState } from 'react';

const mockData = {
  staff: [
    { id: 1, name: 'Jhon Wick', designation: 'RN I', jobsCompleted: 8 },
    { id: 2, name: 'Sam Jackson', designation: 'RN II', jobsCompleted: 10 },
    // More mock staff data...
  ],
  students: [
    { id: 1, name: 'Emily Wilson', status: 'Active', assignments: 5 },
    { id: 2, name: 'Sam Jackson', status: 'Completed', assignments: 8 },
    // More mock student data...
  ],
  jobs: [
    { id: 1, title: 'Morning Route 5', status: 'Active', assignedStaff: 'Jhon Wick' },
    { id: 2, title: 'Afternoon Route 4', status: 'Completed', assignedStaff: 'Sam Jackson' },
    // More mock job data...
  ],
};

function Reports() {
  const [reportType, setReportType] = useState('staff');
  const [reportData, setReportData] = useState([]);

  const handleGenerateReport = () => {
    // Generate the report based on the selected type
    setReportData(mockData[reportType]);
  };

  const handleExportCSV = () => {
    const csvData = reportData.map((row) => Object.values(row).join(',')).join('\n');
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `${reportType}-report.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div>
      <h1>Generate Reports</h1>
      <p>Select the type of report you want to generate:</p>
      <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
        <option value="staff">Staff Report</option>
        <option value="students">Student Report</option>
        <option value="jobs">Job Report</option>
      </select>
      <button onClick={handleGenerateReport}>Generate Report</button>

      {reportData.length > 0 && (
        <div>
          <h2>{`${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report`}</h2>
          <table border="1">
            <thead>
              <tr>
                {Object.keys(reportData[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reportData.map((item) => (
                <tr key={item.id}>
                  {Object.values(item).map((value, index) => (
                    <td key={index}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleExportCSV}>Export as CSV</button>
        </div>
      )}
    </div>
  );
}

export default Reports;
