import React from 'react';
import Select from 'react-select';
import "./FormComponent.css";

const FormComponent = ({
  form,
  streams,
  districts,
  handleFormChange,
  handleDistrictChange,
  handleSubmit,
  loading,
}) => {
  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="form">
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={(e) => handleFormChange('name', e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Z-Score:</label>
        <input
          type="number"
          name="zScore"
          step="0.0001"
          value={form.zScore}
          onChange={(e) => handleFormChange('zScore', e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Threshold (%): <span className="optional">To get courses above Z-score (Use 40 if unsure)</span></label>
        <input
          type="number"
          name="threshold"
          step="5"
          value={form.threshold}
          onChange={(e) => handleFormChange('threshold', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>District:</label>
        <Select
          classNamePrefix="react-select"
          options={districts}
          value={form.district}
          onChange={handleDistrictChange}
          placeholder="Select District"
          isClearable
          isSearchable
          menuPortalTarget={document.body}
          styles={{
            menuPortal: base => ({ ...base, zIndex: 9999 }),
            control: (provided) => ({
              ...provided,
              borderColor: '#ccc',
              '&:hover': { borderColor: '#45a049' },
              '&--is-focused': { borderColor: '#45a049' }
            }),
          }}
        />
      </div>
      <div className="form-group">
        <label>Stream:</label>
        <select
          name="stream"
          value={form.stream}
          onChange={(e) => handleFormChange('stream', e.target.value)}
          required
        >
          <option value="">Select Stream</option>
          {streams.map((str) => (
            <option key={str} value={str}>{str}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="submit-btn" disabled={loading}>
        {loading ? 'Fetching...' : 'Get Courses'}
      </button>
    </form>
  );
};

export default FormComponent;
