import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './recommendation_card.css'
// import { Tooltip, Button } from '@material-ui/core';
import { Tooltip } from 'react-tooltip';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {AiFillCaretDown, AiFillCaretUp} from "react-icons/ai";


const RecommendationCard = (props) => {

  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClick = () => {
    console.log('Div clicked');
  };
  

  console.log(props);
  const i = props.i;
  const prediction = parseFloat(props.recommendation[i].prediction);
  const isRecommendationCard = props.isRecommendationCard;
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
  const divStyle = {
    width: isRecommendationCard ? '50%' : '80%',
    margin: isRecommendationCard ? '0 2%' : '2%'
  };

  return (
    <div className='rec'>
      <div className='recomContainerBeforCollapse'>
        <div className='symbol'>
          {isRecommendationCard ? props.recommendation[i].symbol: props.recommendation[i].itemID}
        </div>
        <div className='name' style={divStyle}>
          {isRecommendationCard ? props.recommendation[i].name : props.recommendation[i].businessName}
        </div>
        {isRecommendationCard && (
          <>
          <div style={{paddingBottom:'1px'}}>
            <div className="my_div_1" style={divStyle_1} data-tooltip-id="my-tooltip" data-tooltip-content={Rel_msg}>

            <div className="my_div_2" style={divStyle_2} >
          </div>
          </div>
        </div>

        <div className="expand-btn" onClick={handleExpand}>
          {/* {isExpanded ? 'Collapse' : 'Expand'} */}
          {isExpanded ? <AiFillCaretUp/> : <AiFillCaretDown/>}

            </div><Tooltip id="my-tooltip" /></>
        )}
        




      </div>



      {isExpanded &&
        <div><div className="Gics-code">
          <div className='Gics-Label'>GICS Indutry Group</div>
          <div className='Gics-group'>{props.recommendation[i].gics}</div>
        </div>

        <div className="BuisnessSummary">
        <div className='BuisnessSummary-Label'>Business Summary</div>
        <div className='BuisnessSummary-value'>{props.recommendation[i].buisnesssummary}</div>
        </div>
        </div>
      }

    </div>







  );
};

RecommendationCard.propTypes = {};

RecommendationCard.defaultProps = {};

export default RecommendationCard;
