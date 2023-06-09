import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import './search.css';
// import '../../css/bootstrap.css';

import RecommendationCard from '../recommendation_card/recommendation_card';
import Dropdown from '../dropdown/dropdown';

// import { SearchWrapper } from './search.styled';

const Search = () => {
   const [cdsAccountID, setCdsAccountID] = useState('');
   const [responseData, setResponseData] = useState([]);
   const [responseDataTest, setResponseDataTest] = useState([]);
   const [error, setError] = useState('');
   const [errorTest, setErrorTest] = useState('');
   const [loading, setLoading] = useState(false);
   const [submitted, setSubmitted] = useState(false);

  

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setSubmitted(true);

      try {
         const response = await fetch(`http://localhost:8000/api/${cdsAccountID}`);
         const responseTest = await fetch(`http://localhost:8000/api/test/${cdsAccountID}`);

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
         if (responseTest.ok) {
            const jsonData = await responseTest.json();
            setResponseDataTest(jsonData);
            setErrorTest('');
         } else {
           const errorData = await responseTest.json();
           setErrorTest(errorData.error);
           setResponseDataTest([]);
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

      const valuesTest = Array.from({ length: responseDataTest.length }, (_, index) => {
         return index + 1;
      });

    return(
      <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>

      <div className='outerContainer'>
         {/* <div className='innerContainer'> */}
         <form onSubmit = {handleSubmit}>
            <input onChange = {(e) => setCdsAccountID(e.target.value)} value = {cdsAccountID} placeholder='Enter the CDS Account ID'></input>
            <button type = 'submit'>Submit</button>
         </form>
      </div>



      {submitted && loading && <div >         
         Loading...</div>}

      {submitted && !loading && error && 
            <div className='errorContainer'>
              <p>{error}</p>
            </div>}

      {submitted && !loading && !error && responseData.length > 0 && (
         <div style={{marginBottom: '40px'}}>

            <div className='CombinedContainer' style={{border: '2px solid #2A85FF', boxShadow: '0px 4px 4px 7px rgba(42, 133, 255, 0.25)'}}>
               <div>
<div className='ContainerText'>RECOMMENDATIONS</div>
               <hr className='custom-line'/>
               </div>
               <div className='scroll-bar'>
                  <div className='rec rec_1'><RecommendationCard recommendation= {responseData} i={0} isRecommendationCard={true}/></div>
                  <div className='rec rec_2'><RecommendationCard recommendation= {responseData} i={1} isRecommendationCard={true}/></div>
                  <div className='rec rec_3'><RecommendationCard recommendation= {responseData} i={2} isRecommendationCard={true}/></div>
                  <div className='rec rec_4'><RecommendationCard recommendation= {responseData} i={3} isRecommendationCard={true}/></div>
                  <div className='rec rec_5'><RecommendationCard recommendation= {responseData} i={4} isRecommendationCard={true}/></div>
                  <div className='rec rec_1'><RecommendationCard recommendation= {responseData} i={5} isRecommendationCard={true} /></div>
                  <div className='rec rec_2'><RecommendationCard recommendation= {responseData} i={6} isRecommendationCard={true}/></div>
                  <div className='rec rec_3'><RecommendationCard recommendation= {responseData} i={7} isRecommendationCard={true}/></div>
                  <div className='rec rec_4'><RecommendationCard recommendation= {responseData} i={8} isRecommendationCard={true}/></div>
                  <div className='rec rec_5'><RecommendationCard recommendation= {responseData} i={9} isRecommendationCard={true}/></div>
               </div>
            </div>

            {responseDataTest.length > 0 && (
               <div className='CombinedContainer'>
                  <div className='ContainerText'>REAL PURCHASES</div>
                  <hr className='custom-line'/>
                  <div className="grid-container">
                  
                     {valuesTest.map((item, index) => (
                        <div key={index}>
                           <div className='rec rec_1'><RecommendationCard recommendation= {responseDataTest} i={item-1} isRecommendationCard={false}/></div>
                        </div>
                     ))}
                  </div> 
               </div>
            )}
            
         </div>
      )}
   </div>
   );
};

Search.propTypes = {};

Search.defaultProps = {};

export default Search;
