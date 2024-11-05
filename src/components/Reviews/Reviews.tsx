import ScoreProductPartial from '../ListProductShow/ScoreProductPartial';
import BarReviews from './BarReviews';
import Comment from './Comment';
import './Reviews.css';

const Reviews = ({reviews}: {reviews: reviews[]}) => {
  const Scores = reviews.map((review) => review.score);
  const valueReviews = Scores.reduce( (acc, now) => acc + now, 0)/reviews.length;

  return (
    <div className='reviews-container'>
        <h2>Comentários</h2>
        <div className="reviews-infos-container">
            <div className="reviews-infos">
                <h1>{valueReviews.toString()}</h1>
                <ScoreProductPartial score={valueReviews}/>
                <p>( {reviews.length} Reviews )</p>
            </div>
            <div className="reviews-infos-graphics-container">
                <BarReviews number={5} Scores={Scores} total={reviews.length}/>
                <BarReviews number={4} Scores={Scores} total={reviews.length}/>
                <BarReviews number={3} Scores={Scores} total={reviews.length}/>
                <BarReviews number={2} Scores={Scores} total={reviews.length}/>
                <BarReviews number={1} Scores={Scores} total={reviews.length}/>
            </div>
        </div>
        {reviews.map((review) => 
          (<Comment key={review.id} review={review} />)
        )}
    </div>
  )
}

export default Reviews;