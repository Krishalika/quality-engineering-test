import React,{useState} from 'react';
import PropTypes from 'prop-types';
// import './recommendation_card.css'
import Dropdown from '../dropdown/dropdown';

const RecommendationCard = (props) => {
   const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

   console.log(props);
   const i=props.i;
   const prediction = parseFloat(props.recommendation[i].prediction);
   console.log(prediction);

   let fillColor;
  let borderColor;

  if (prediction < 0.4) {
    fillColor = '#FC6077';
    borderColor = '#FC6077';
    console.log('lower 0.4');
  } else if (prediction >= 0.4 && prediction < 0.6) {
    fillColor = '#EABC20';
    borderColor = '#EABC20';
    console.log('medium');
  } else {
    fillColor = '#30C88C';
    borderColor = '#30C88C';
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
   



      <div className={`expandable-div ${isExpanded ? 'expanded' : ''}`}>
      <button className="expand-button" onClick={toggleExpand}>
        {isExpanded ? 'Collapse' : 'Expand'}
      </button>
      {isExpanded ? (
        <div className="details">
          {/* <p>Detail 1</p>
          <p>Detail 2</p> */}
          <p>Detail 3</p>
          <p>Detail 3</p>
          <p>Detail 3</p>
          <p>Detail 3</p>
          <p>Detail 3</p>
          <p>Detail 3</p>
          <p>Detail 3</p>
          <p>Detail 3</p>
        </div>
      ) : (
        <div className="collapsed-details">
          
          <div className='recomContainerBeforCollapse'>
            <div className='symbol'>
               {props.recommendation[i].symbol}
            </div>
            <div className='name'>
               {props.recommendation[i].name}
            </div>

            <div className="my_div_1" style={divStyle_1}>
               <div className="my_div_2" style={divStyle_2}>
               </div>
            </div>
         </div>

          
        </div>
      )}
    </div>









      {/* <Dropdown/> */}

   </div>


   );
   };

RecommendationCard.propTypes = {};

RecommendationCard.defaultProps = {};

export default RecommendationCard;
