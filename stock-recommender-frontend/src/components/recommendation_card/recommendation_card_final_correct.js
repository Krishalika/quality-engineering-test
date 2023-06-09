import React,{useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import './recommendation_card.css'
// import { Tooltip, Button } from '@material-ui/core';
import { Tooltip } from 'react-tooltip';



const RecommendationCard = (props) => {
   const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  //start error handling

  // const [errorMessage, setErrorMessage] = useState('');
  // const [recommendation, setRecommendation] = useState(null);

  // useEffect(() => {
  //   fetch(`/api/${props.id}`)
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error(response.status === 404 ? 'ID not found' : 'API request failed');
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       setRecommendation(data);
  //     })
  //     .catch(error => {
  //       setErrorMessage(error.message);
  //     });
  // }, []);

  // if (errorMessage) {
  //   return <div>Error: {errorMessage}</div>;
  // }

  // if (!recommendation) {
  //   return <div>Loading...</div>;
  // }


  //end error handling



   console.log(props);
   const i=props.i;
   const prediction = parseFloat(props.recommendation[i].prediction);
  //  console.log(prediction);

   let fillColor;
  let borderColor;
  let Rel_msg;
  

  if (prediction < 0.4) {
    fillColor = '#FC6077';
    borderColor = '#FC6077';
    const relavance = 'Relavance is Low';
    Rel_msg = relavance;
    console.log('lower 0.4');
  } else if (prediction >= 0.4 && prediction < 0.6) {
    fillColor = '#EABC20';
    borderColor = '#EABC20';
    const relavance = 'Relavance is Medium';
    Rel_msg = relavance;
    console.log('medium');
  } else {
    fillColor = '#30C88C';
    borderColor = '#30C88C';
    const relavance = 'Relavance is High';
    Rel_msg = relavance;
    console.log('high');
  }


  const divStyle_1 = {
    borderColor: borderColor,
  };

  const divStyle_2 = {
   backgroundColor: fillColor,
 };

   return(
      <div>
         <div className='recomContainerBeforCollapse'>
            <div className='symbol'>
               {props.recommendation[i].symbol}
            </div>
            <div className='name'>
               {props.recommendation[i].name}
            </div>

            
        
            <div className="my_div_1" style={divStyle_1} data-tooltip-id="my-tooltip" data-tooltip-content={Rel_msg}>
               
                  <div className="my_div_2" style={divStyle_2} >
                  </div>
               
            </div>
            <Tooltip id="my-tooltip" />
      


         </div>
    </div>







   );
   };

RecommendationCard.propTypes = {};

RecommendationCard.defaultProps = {};

export default RecommendationCard;
