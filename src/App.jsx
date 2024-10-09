import { useState } from 'react';
import './App.css';

const students = [
  { lastName: 'Alcaide', firstName: 'Zar', course: 'IT', birthdate: '2001/08/08' },
  { lastName: 'Reyes', firstName: 'Wayne', course: 'CS', birthdate: '1998/01/31' },
  { lastName: 'De Vera', firstName: 'May', course: 'IS', birthdate: '2003/09/22' },
  { lastName: 'Veneraion', firstName: 'Ace', course: 'DS', birthdate: '2000/09/10' },
];

const calculateAge = (birthdate) => {
  const today = new Date();
  const birthDate = new Date(birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

function App() {
  const [query, setQuery] = useState('');
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');

  const filteredStudents = students.filter((student) => {
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
    const isNameMatch = fullName.includes(query.toLowerCase()) || 
                        student.course.toLowerCase().includes(query.toLowerCase()) || 
                        calculateAge(student.birthdate).toString().includes(query);
    const isWithinDateRange = 
      (!minDate || new Date(student.birthdate) >= new Date(minDate)) && 
      (!maxDate || new Date(student.birthdate) <= new Date(maxDate));
    return isNameMatch && isWithinDateRange;
  });

  return (
    <div className="App">
      <h1>Student Data Table</h1>

      {/* Search Input */}
      <label>Search:</label>
      <input
        type="text"
        placeholder=""
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Date Range Inputs */}
      <div>
        <label>Birthdate:</label>
        <input 
          type="date" 
          value={minDate} 
          onChange={(e) => setMinDate(e.target.value)} 
        />
        <label> to </label>
        {/*<label>Max Date: </label>*/}
        <input 
          type="date" 
          value={maxDate} 
          onChange={(e) => setMaxDate(e.target.value)} 
        />
      </div>

      {/* Data Table */}
      <table>
        <thead>
          <tr>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Course</th>
            <th>Birthdate</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={index}>
              <td>{student.lastName}</td>
              <td>{student.firstName}</td>
              <td>{student.course}</td>
              <td>{student.birthdate}</td>
              <td>{calculateAge(student.birthdate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
