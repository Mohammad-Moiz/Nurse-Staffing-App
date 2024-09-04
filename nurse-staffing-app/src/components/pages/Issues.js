import React from 'react';

const issues = [
  { id: 1, description: 'Issue 1 description', status: 'Open', date: '12 Jun' },
  { id: 2, description: 'Issue 2 description', status: 'Resolved', date: '12 Jun' },
  // More issue data...
];

function Issues() {
  return (
    <div>
      <h1>Issues</h1>
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>{issue.description} - {issue.status} - {issue.date}</li>
        ))}
      </ul>
    </div>
  );
}

export default Issues;
