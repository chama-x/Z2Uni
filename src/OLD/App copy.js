import React, { useEffect, useRef, useState } from 'react';
import artsData from '../data/Arts.json';
import bioData from '../data/Bio.json';
import mathsData from '../data/Maths.json';
import commerceData from '../data/Commerce.json';
import techData from '../data/Tech.json';
import allData from '../data/All.json';
import Select from 'react-select';
import { gsap } from 'gsap';
import './App.css';

const streams = ['Arts', 'Bio', 'Maths', 'Commerce', 'Tech'];
const districts = ['කොළඹ', 'ගම්පහ', 'කළුතර', 'මහනුවර', 'මාතර'].map(dist => ({ value: dist, label: dist }));

const App = () => {
  const [form, setForm] = useState({
    name: '',
    zScore: '',
    threshold: '',
    district: null,
    stream: ''
  });

  const [courses, setCourses] = useState({
    selectedStreamCourses: [],
    commonCourses: [],
    extraCourses: []
  });

  const [showCreator, setShowCreator] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(titleRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1 });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDistrictChange = (district) => {
    setForm((prevState) => ({ ...prevState, district }));
  };

  const validateForm = () => {
    const { name, zScore, threshold, district, stream } = form;
    if (!name || !zScore || !district || !stream) {
      return { valid: false, message: 'Please fill out all required fields.' };
    }

    if (isNaN(parseFloat(zScore))) {
      return { valid: false, message: 'Please enter a valid Z-Score.' };
    }

    if ( parseFloat(threshold) < 0) {
      return { valid: false, message: 'Please enter a valid percentage threshold.' };
    }

    return { valid: true };
  };

  const fetchCourses = () => {
    const { zScore, threshold, district, stream } = form;

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
      const parsedZScore = parseFloat(zScore);
      const parsedThreshold = parseFloat(threshold);
      const upperLimit = parsedZScore * (1 + parsedThreshold / 100);

      const filteredStreamData = streamData
        .filter(course => course.score !== null && course.District === district.value)
        .sort((a, b) => b.score - a.score);

      const filteredAllData = allData
        .filter(course => course.score !== null && course.District === district.value)
        .sort((a, b) => b.score - a.score);

      setCourses({
        selectedStreamCourses: filteredStreamData.filter(course => course.score <= parsedZScore),
        commonCourses: filteredAllData.filter(course => course.score <= parsedZScore),
        extraCourses: filteredStreamData.concat(filteredAllData).filter(course => course.score > parsedZScore && course.score <= upperLimit)
      });
    } catch (error) {
      console.error('Error filtering courses:', error);
      alert('An error occurred while fetching courses. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { valid, message } = validateForm();
    if (!valid) {
      alert(message);
      return;
    }

    setLoading(true);
    const randomDuration = Math.floor(Math.random() * 3001) + 2000; // Random duration between 2000ms and 5000ms
    setTimeout(() => {
      fetchCourses();
      setLoading(false);
    }, randomDuration);
  };

  const { name, zScore, threshold, district, stream } = form;
  const { selectedStreamCourses, commonCourses, extraCourses } = courses;

  return (
    <div className="App">
      <div className="container">
        <h1 ref={titleRef}>Z2Uni</h1>
        <h3>Your Score, Your Future. Let's find your dream together.</h3>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={name} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Z-Score:</label>
            <input type="number" name="zScore" step="0.0001" value={zScore} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Threshold (%):</label>
            <input type="number" name="threshold" step="5" value={threshold} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>District:</label>
            <Select
              options={districts}
              value={district}
              onChange={handleDistrictChange}
              placeholder="Select District"
              isClearable
              isSearchable
              menuPortalTarget={document.body} // to prevent dropdown from breaking the layout
              styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} // Ensure it appears above other content
            />
          </div>
          <div className="form-group">
            <label>Stream:</label>
            <select name="stream" value={stream} onChange={handleInputChange} required>
              <option value="">Select Stream</option>
              {streams.map((str) => (
                <option key={str} value={str}>{str}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>{loading ? 'Fetching...' : 'Get Courses'}</button>
        </form>

        {loading && <div className="loading">Loading...</div>}

        {!loading && name && <h2>Available Courses for {name}:</h2>}

        {extraCourses.length > 0 && (
          <div>
            <h3>Extra Courses (Within {threshold}% of your Z-Score):</h3>
            <ul className="course-list extra-courses">
              {extraCourses.map((course, index) => (
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
                >
                  {course.course_name}
                  <div className="course-score">Z-Score: {course.score}</div>
                  <div className="tags">
                    {course.aptitude_test && <span className="dot green-dot" title="Has an aptitude test"></span>}
                    {course.island_wide_talent_base && <span className="dot blue-dot" title="Selects from island-wide talent base"></span>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h3>{`${stream} Related Courses:`}</h3>
          <ul className="course-list">
            {selectedStreamCourses.map((course, index) => (
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
              >
                {course.course_name}
                <div className="course-score">Z-Score: {course.score}</div>
                <div className="tags">
                  {course.aptitude_test && <span className="dot green-dot" title="Has an aptitude test"></span>}
                  {course.island_wide_talent_base && <span className="dot blue-dot" title="Selects from island-wide talent base"></span>}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Common Courses:</h3>
          <ul className="course-list">
            {commonCourses.map((course, index) => (
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
              >
                {course.course_name}
                <div className="course-score">Z-Score: {course.score}</div>
                <div className="tags">
                  {course.aptitude_test && <span className="dot green-dot" title="Has an aptitude test"></span>}
                  {course.island_wide_talent_base && <span className="dot blue-dot" title="Selects from island-wide talent base"></span>}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {!loading && selectedStreamCourses.length === 0 && commonCourses.length === 0 && <p>No courses available for the selected criteria.</p>}
      </div>
      <button onClick={() => setShowCreator(!showCreator)} className="creator-btn">Created by</button>
      {showCreator && (
        <div className="creator-info">
          Chamath Thiwanka, BICT (Honours) University of Sri Jayewardenepura
        </div>
      )}
      <br />
      <button onClick={() => setShowInfo(!showInfo)} className="info-btn">Info</button>
      {showInfo && (
        <div className="info-hint">
          <p><span className="tag blue-tag">Aptitude test required</span></p>
          <p><span className="tag green-tag">Island-wide talent base</span></p>
          <p><span className="tag gradient-tag">Both criteria met</span></p>
        </div>
      )}
    </div>
  );
};

export default App;