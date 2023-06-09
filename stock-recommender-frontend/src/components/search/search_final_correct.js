import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import './search.css';
import RecommendationCard from '../recommendation_card/recommendation_card';
import Dropdown from '../dropdown/dropdown';

// import { SearchWrapper } from './search.styled';

const Search = () => {
   const [cdsAccountID, setCdsAccountID] = useState('');
   const [responseData, setResponseData] = useState([]);
   const [error, setError] = useState('');
   const [loading, setLoading] = useState(false);
   const [submitted, setSubmitted] = useState(false);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setSubmitted(true);

      try {
         const response = await fetch(`http://localhost:8000/api/${cdsAccountID}`);
         if (response.ok) {
           const jsonData = await response.json();
           console.log(jsonData);
           setResponseData(jsonData);
           setError('');
           setSubmitted(true);
         } else {
           const errorData = await response.json();
           setError(errorData.error);
           setResponseData([]);
           setSubmitted(true); // Keep submitted as true to display the error message
         }
       } catch (error) {
         setError('Error fetching data');
         console.error('Error fetching data:', error);
         setSubmitted(true); // Keep submitted as true to display the error message
       }
       finally {
         setLoading(false);
       }
   
       console.log(`Form submitted, ${cdsAccountID}`);
     };

    return(
      <div>

<div className='outerContainer'>
            {/* <div className='innerContainer'> */}
               <form onSubmit = {handleSubmit}>
                  <input onChange = {(e) => setCdsAccountID(e.target.value)} value = {cdsAccountID} placeholder='Enter the CDS Account ID'></input>
                  <button type = 'submit'>Submit</button>
               </form>
               </div>


      {/* {!submitted && (
         <div className='outerContainer'>
               <form onSubmit = {handleSubmit}>
                  <input onChange = {(e) => setCdsAccountID(e.target.value)} value = {cdsAccountID} placeholder='Enter the CDS Account ID'></input>
                  <button type = 'submit'>Submit</button>
               </form>
               </div>
               )} */}

      {submitted && loading && <div >
         {/* <div className='outerContainer'>
               <form onSubmit = {handleSubmit}>
                  <input onChange = {(e) => setCdsAccountID(e.target.value)} value = {cdsAccountID} placeholder='Enter the CDS Account ID'></input>
                  <button type = 'submit'>Submit</button>
               </form>
               </div> */}
         
         Loading...</div>}

      {submitted && !loading && error && 
            <div className='errorContainer'>
              <p>{error}</p>
            </div>}

      {submitted && !loading && !error && responseData.length > 0 && (
         <div>
         {/* <div className='outerContainer'>
            <form onSubmit = {handleSubmit}>
               <input onChange = {(e) => setCdsAccountID(e.target.value)} value = {cdsAccountID} placeholder='Enter the CDS Account ID'></input>
               <button type = 'submit'>Submit</button>
            </form>
            </div> */}


      <div className='CombinedContainer'>
         {/* <h2>Submitted Successfully!</h2> */}
         <div className='rec_1'><RecommendationCard recommendation= {responseData} i={0} /></div>
         <div className='rec_2'><RecommendationCard recommendation= {responseData} i={1}/></div>
         <div className='rec_3'><RecommendationCard recommendation= {responseData} i={2}/></div>
         <div className='rec_4'><RecommendationCard recommendation= {responseData} i={3}/></div>
         <div className='rec_5'><RecommendationCard recommendation= {responseData} i={4}/></div>
         
         
         
      </div>
      </div>
      )}

               

         </div>
        
         


      
    );
};

Search.propTypes = {};

Search.defaultProps = {};

export default Search;
