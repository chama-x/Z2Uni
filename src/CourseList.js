import React from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';

const CourseList = ({ label, courses }) => (
  <div className="course-section">
    <h3>{label}</h3>
    <ul className="course-list">
      {courses.map((course, index) => (
        <li key={index} className={`course-item ${getCourseClass(course)}`}>
          {course.course_name}
          <div className="course-score">Z-Score: {course.score}</div>
          <div className="tags">
            {course.aptitude_test && (
              <span
                className="dot green-dot"
                data-tooltip-id={`aptitude-tooltip-${index}`}
                data-tooltip-content="Has an aptitude test"
              ></span>
            )}
            {course.island_wide_talent_base && (
              <span
                className="dot blue-dot"
                data-tooltip-id={`talent-tooltip-${index}`}
                data-tooltip-content="Selects from island-wide talent base"
              ></span>
            )}
          </div>
          {course.aptitude_test && (
            <ReactTooltip id={`aptitude-tooltip-${index}`} place="top" effect="solid" />
          )}
          {course.island_wide_talent_base && (
            <ReactTooltip id={`talent-tooltip-${index}`} place="top" effect="solid" />
          )}
        </li>
      ))}
    </ul>
  </div>
);

const getCourseClass = (course) => {
  if (course.aptitude_test && course.island_wide_talent_base) {
    return 'gradient-tag';
  }
  if (course.aptitude_test) {
    return 'blue-tag';
  }
  if (course.island_wide_talent_base) {
    return 'green-tag';
  }
  return '';
};

export default CourseList;