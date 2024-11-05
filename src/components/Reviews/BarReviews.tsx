import React from 'react'

const BarReviews = ({number, Scores, total} : {number: number, Scores: number[], total: number}) => {    
  function handleNumber(value: number) {
    switch (value) {
        case 5:
            return (Scores.filter( (score) => score === 5 ? true : false ).length / total) * 100;
        case 4:
            return (Scores.filter( (score) => score >= 4 && score < 5 ? true : false ).length / total) * 100;
        case 3:
            return (Scores.filter( (score) => score >= 3 && score < 4 ? true : false ).length / total) * 100;
        case 2:
            return (Scores.filter( (score) => score >= 2 && score < 3 ? true : false ).length / total) * 100;
        case 1:
            return (Scores.filter( (score) => score >= 0 && score < 2 ? true : false ).length / total) * 100;
        default:
            return 0;
    }
  }

  return (
    <div className="reviews-info-graphics">
        <h2>{number.toString()}</h2>
        <div className="line-reviews-container">
            <div className="line-reviews" style={{maxWidth: `${handleNumber(number)}%`}}></div>
        </div>
    </div>
  )
}

export default BarReviews;