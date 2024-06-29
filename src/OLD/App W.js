import React, { useState } from 'react';
import artsData from '../data/Arts.json';
import bioData from '../data/Bio.json';
import mathsData from '../data/Maths.json';
import commerceData from '../data/Commerce.json';
import techData from '../data/Tech.json';
import allData from '../data/All.json';

const App = () => {
  const [name, setName] = useState('');
  const [zScore, setZScore] = useState('');
  const [district, setDistrict] = useState('');
  const [stream, setStream] = useState('');
  const [courses, setCourses] = useState([]);

  const streams = ['Arts', 'Bio', 'Maths', 'Commerce', 'Tech'];
  const districts = ['කොළඹ', 'ගම්පහ', 'කළුතර', 'මහනුවර', 'මාතර']; // Add other districts as needed

  const handleSubmit = (e) => {
    e.preventDefault();
    let streamData;
    switch (stream) {
      case 'Arts':
        streamData = artsData;
        break;
      case 'Bio':
        streamData = bioData;
        break;
      case 'Maths':
        streamData = mathsData;
        break;
      case 'Commerce':
        streamData = commerceData;
        break;
      case 'Tech':
        streamData = techData;
        break;
      default:
        streamData = [];
    }

    const filteredStreamData = streamData.filter(course => course.score <= parseFloat(zScore) && course.District === district);
    const filteredAllData = allData.filter(course => course.score <= parseFloat(zScore) && course.District === district);

    setCourses([...filteredStreamData, ...filteredAllData]);
  };

  return (
    <div className="App">
      <h1>Student Courses App</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Z-Score:</label>
          <input type="number" step="0.0001" value={zScore} onChange={(e) => setZScore(e.target.value)} required />
        </div>
        <div>
          <label>District:</label>
          <select value={district} onChange={(e) => setDistrict(e.target.value)} required>
            <option value="">Select District</option>
            {districts.map((dist) => (
              <option key={dist} value={dist}>{dist}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Stream:</label>
          <select value={stream} onChange={(e) => setStream(e.target.value)} required>
            <option value="">Select Stream</option>
            {streams.map((str) => (
              <option key={str} value={str}>{str}</option>
            ))}
          </select>
        </div>
        <button type="submit">Get Courses</button>
      </form>
      <h2>Available Courses:</h2>
      <ul>
        {courses.map((course, index) => (
          <li key={index}>
            <p>Course Name: {course.course_name}</p>
            <p>Aptitude Test: {course.aptitude_test ? 'Yes' : 'No'}</p>
            <p>Island Wide Talent Base: {course.island_wide_talent_base ? 'Yes' : 'No'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
