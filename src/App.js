import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import FormComponent from './FormComponent';
import Notice from './Notice';
import CourseList from './CourseList';
import { districts, streams } from './data';
import './App.css';
import CreatorButton from './CreatorButton';

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
  const [loading, setLoading] = useState(false);
  const [showNotice, setShowNotice] = useState({ english: false, sinhala: false });

  const titleRef = useRef(null);
  const appRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(titleRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1 });
    gsap.fromTo(appRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 });
  }, []);

  const handleFormChange = (field, value) => {
    setForm((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleDistrictChange = (district) => {
    setForm((prevState) => ({ ...prevState, district }));
  };

  const fetchCourses = (zScore, threshold, district, stream) => {
    let streamData;
    switch (stream) {
      case 'Arts':
        streamData = require('./data/Arts.json');
        break;
      case 'Bio':
        streamData = require('./data/Bio.json');
        break;
      case 'Maths':
        streamData = require('./data/Maths.json');
        break;
      case 'Commerce':
        streamData = require('./data/Commerce.json');
        break;
      case 'Tech':
        streamData = require('./data/Tech.json');
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

      const allData = require('./data/All.json');
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

  const handleSubmit = () => {
    const { valid, message } = validateForm();
    if (!valid) {
      alert(message);
      return;
    }

    setLoading(true);
    const randomDuration = Math.floor(Math.random() * 1001) + 500;
    setTimeout(() => {
      fetchCourses(form.zScore, form.threshold, form.district, form.stream);
      setLoading(false);
    }, randomDuration);
  };

  const validateForm = () => {
    const { name, zScore, threshold, district, stream } = form;
    if (!name || !zScore || !district || !stream) {
      return { valid: false, message: 'Please fill out all required fields.' };
    }

    if (isNaN(parseFloat(zScore))) {
      return { valid: false, message: 'Please enter a valid Z-Score.' };
    }

    if (parseFloat(threshold) < 0) {
      return { valid: false, message: 'Please enter a valid percentage threshold.' };
    }

    return { valid: true };
  };

  const { name, threshold, zScore, stream } = form;
  const { selectedStreamCourses, commonCourses, extraCourses } = courses;

  // Calculate the multiplied value
  const parsedZScore = parseFloat(zScore);
  const parsedThreshold = parseFloat(threshold);
  const multipliedValue = parsedThreshold/100 * parsedZScore + parsedZScore;

  return (
    <div className="App" ref={appRef}>
      <div className="container frosted-glass">
        <h1 ref={titleRef}>Z2Uni</h1>
        <h3>Your ZScore, Your Future. Let's find your dream together.</h3>

        <FormComponent
          form={form}
          streams={streams}
          districts={districts}
          handleFormChange={handleFormChange}
          handleDistrictChange={handleDistrictChange}
          handleSubmit={handleSubmit}
          loading={loading}
        />

        <Notice showNotice={showNotice} setShowNotice={setShowNotice} /> 

        {loading && <div className="loading">Loading...</div>}

        {!loading && name && <h2>Available Courses for {name}:</h2>}
        
        <CourseList
          label={`Extra Courses (Up to Z-Score of ${multipliedValue} from ${parsedThreshold}% threshold):`}
          courses={extraCourses}
        />

        <CourseList
          label={`${stream} Related Courses:`}
          courses={selectedStreamCourses}
        />

        <CourseList
          label="Common Courses:"
          courses={commonCourses}
        />

        {!loading && selectedStreamCourses.length === 0 && commonCourses.length === 0 && (
          <p>No courses available for the selected criteria.</p>
        )}
      </div>
      <CreatorButton />
    </div>
  );
};

export default App;