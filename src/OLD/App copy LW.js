import React, { useState } from 'react';
import artsData from '../data/Arts.json';
import bioData from '../data/Bio.json';
import mathsData from '../data/Maths.json';
import commerceData from '../data/Commerce.json';
import techData from '../data/Tech.json';
import allData from '../data/All.json';
import Select from 'react-select';
import './App.css';

const App = () => {
  const [name, setName] = useState('');
  const [zScore, setZScore] = useState('');
  const [district, setDistrict] = useState(null);
  const [stream, setStream] = useState('');
  const [courses, setCourses] = useState([]);
  const [showCreator, setShowCreator] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const streams = ['Arts', 'Bio', 'Maths', 'Commerce', 'Tech'];
  const districts = ['කොළඹ', 'ගම්පහ', 'කළුතර', 'මහනුවර', 'මාතර'].map(dist => ({ value: dist, label: dist }));

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!district || !district.value) {
      alert('Please select a district');
      return;
    }

    const parsedZScore = parseFloat(zScore);
    if (isNaN(parsedZScore)) {
      alert('Please enter a valid Z-Score');
      return;
    }

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

    try {
      const filteredStreamData = streamData
        .filter(course => course.score !== null && course.score <= parsedZScore && course.District === district.value)
        .sort((a, b) => b.score - a.score);

      const filteredAllData = allData
        .filter(course => course.score !== null && course.score <= parsedZScore && course.District === district.value)
        .sort((a, b) => b.score - a.score);

      const combinedCourses = [...filteredStreamData, ...filteredAllData];

      if (combinedCourses.length === 0) {
        alert('No courses found matching your criteria');
      }

      setCourses(combinedCourses);
    } catch (error) {
      console.error('Error filtering courses:', error);
      alert('An error occurred while fetching courses. Please try again.');
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Student Courses App</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Z-Score:</label>
            <input type="number" step="0.0001" value={zScore} onChange={(e) => setZScore(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>District:</label>
            <Select
              options={districts}
              value={district}
              onChange={setDistrict}
              placeholder="Select District"
              isClearable
              isSearchable
            />
          </div>
          <div className="form-group">
            <label>Stream:</label>
            <select value={stream} onChange={(e) => setStream(e.target.value)} required>
              <option value="">Select Stream</option>
              {streams.map((str) => (
                <option key={str} value={str}>{str}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="submit-btn">Get Courses</button>
        </form>
        <button onClick={() => setShowCreator(!showCreator)} className="creator-btn">Created by</button>
        {showCreator && (
          <div className="creator-info">
            Chamath Thiwanka, BICT (Honours) University of Sri Jayewardenepura
          </div>
        )}
        <h2>{name ? `Available Courses for ${name}:` : 'Available Courses:'}</h2>
        <button onClick={() => setShowInfo(!showInfo)} className="info-btn">Info</button>
        {showInfo && (
          <div className="info-hint">
            <p><span className="tag blue-tag">Aptitude test required</span></p>
            <p><span className="tag green-tag">Island-wide talent base</span></p>
            <p><span className="tag gradient-tag">Both criteria met</span></p>
          </div>
        )}
        <ul className="course-list">
          {courses.map((course, index) => (
            <li
              key={index}
              className={`course-item ${
                course.aptitude_test && course.island_wide_talent_base
                  ? 'gradient-tag'
                  : course.aptitude_test
                  ? 'blue-tag'
                  : course.island_wide_talent_base
                  ? 'green-tag'
                  : ''
              }`}
              title={`Z-Score: ${course.score}`}
            >
              {course.course_name} (Z-Score: {course.score})
              <div className="tags">
                {course.aptitude_test && <span className="dot green-dot" title="Has an aptitude test"></span>}
                {course.island_wide_talent_base && <span className="dot blue-dot" title="Selects from island-wide talent base"></span>}
              </div>
            </li>
          ))}
        </ul>
        {courses.length === 0 && <p>No courses available for the selected criteria.</p>}
      </div>
    </div>
  );
};

export default App;
