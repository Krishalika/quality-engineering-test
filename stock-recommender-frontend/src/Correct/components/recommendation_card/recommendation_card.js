import React from 'react';
import PropTypes from 'prop-types';
import './recommendation_card.css';
import { Tooltip } from 'react-tooltip';

const RecommendationCard = ({ recommendation }) => {
  const { symbol, name, prediction } = recommendation;

  let fillColor;
  let borderColor;
  let relevance;

  if (prediction < 0.4) {
    fillColor = '#FC6077';
    borderColor = '#FC6077';
    relevance = 'Relevance is Low';
  } else if (prediction >= 0.4 && prediction < 0.6) {
    fillColor = '#EABC20';
    borderColor = '#EABC20';
    relevance = 'Relevance is Medium';
  } else {
    fillColor = '#30C88C';
    borderColor = '#30C88C';
    relevance = 'Relevance is High';
  }

  const divStyle_1 = {
    borderColor: borderColor,
  };

  const divStyle_2 = {
    backgroundColor: fillColor,
  };

  return (
    <div className="recomContainerBeforCollapse">
      <div className="symbol">{symbol}</div>
      <div className="name">{name}</div>

      <div
        className="my_div_1"
        style={divStyle_1}
        data-tooltip-id="my-tooltip"
        data-tooltip-content={relevance}
      >
        <div className="my_div_2" style={divStyle_2}></div>
      </div>
      <Tooltip id="my-tooltip" />
    </div>
  );
};

RecommendationCard.propTypes = {
  recommendation: PropTypes.object.isRequired,
};

export default RecommendationCard;
