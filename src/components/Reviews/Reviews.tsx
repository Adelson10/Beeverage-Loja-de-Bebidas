import BarReviews from './BarReviews';
import Comment from './Comment';

const Reviews = ({reviews}: {reviews: reviews[]}) => {
  const Scores = reviews.map((review) => review.score);
  const valueReviews = Scores.reduce( (acc, now) => acc + now, 0)/reviews.length;

  return (
    <div className='flex flex-row gap-8'>
        <div>
          <h2 className='text-[1.2rem] text-brand-dark font-semibold'>Comentários</h2>
          <div className="flex items-center justify-center gap-8 max-[750px]:gap-4">
              <div className="flex flex-col gap-[0.7rem]">
                  <h1 className="text-[4rem] font-semibold text-secundary leading-[3.2rem] text-center">{valueReviews ? valueReviews.toFixed(1).toString() : 0}</h1>
                  <p className="text-[0.9rem] font-normal text-center text-primary">{`( ${reviews.length} Reviews )`}</p>
              </div>
              <div className="max-[750px]:w-full">
                  <BarReviews number={5} Scores={Scores} total={reviews.length}/>
                  <BarReviews number={4} Scores={Scores} total={reviews.length}/>
                  <BarReviews number={3} Scores={Scores} total={reviews.length}/>
                  <BarReviews number={2} Scores={Scores} total={reviews.length}/>
                  <BarReviews number={1} Scores={Scores} total={reviews.length}/>
              </div>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          {reviews.map((review) =>
            (<Comment key={review.id} review={review} />)
          )}
        </div>
    </div>
  )
}

export default Reviews;