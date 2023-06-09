import React, { useState } from 'react';
import './search.css';
import RecommendationCard from '../recommendation_card/recommendation_card';

const Search = () => {
  const [cdsAccountID, setCdsAccountID] = useState('');
  const [responseData, setResponseData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitted(true);

    try {
      const response = await fetch(`http://localhost:8000/api/${cdsAccountID}`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const jsonData = await response.json();
      setResponseData(jsonData);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
      setResponseData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="outerContainer">
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setCdsAccountID(e.target.value)}
          value={cdsAccountID}
          placeholder="Enter the CDS Account ID"
        />
        <button type="submit">Submit</button>
      </form>

      {submitted && loading && <div>Loading...</div>}

      {submitted && !loading && errorMessage && <div>Error: {errorMessage}</div>}

      {submitted && !loading && !errorMessage && responseData.length > 0 && (
        <div className="CombinedContainer">
          <div className="rec_1">
            <RecommendationCard recommendation={responseData[0]} />
          </div>
          <div className="rec_2">
            <RecommendationCard recommendation={responseData[1]} />
          </div>
          <div className="rec_3">
            <RecommendationCard recommendation={responseData[2]} />
          </div>
          <div className="rec_4">
            <RecommendationCard recommendation={responseData[3]} />
          </div>
          <div className="rec_5">
            <RecommendationCard recommendation={responseData[4]} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
