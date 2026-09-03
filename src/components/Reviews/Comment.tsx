import ScoreProductPartial from '../ListProductShow/ScoreProductPartial';
// import useFetch from '../../hooks/useFetch';
import CommetMockup from '../../utils/Mockup/CommetMockup';

const Comment = ({review}: {review: reviews}) => {
  // const user = useFetch<User>(`/usuarios/${review.address}`);
  const user = CommetMockup.filter((comment) => comment.id === review.address);
  
  return (
      <div className="flex gap-4 py-2">
            <div className="h-[70px] w-[70px] rounded-lg bg-cover bg-no-repeat bg-center" style={{backgroundImage: `url(${user[0].photo})`}}></div>
            <div className='flex flex-col justify-around flex-1'>
              <div className="flex items-center gap-2">
                <h2 className="text-[1.1rem] font-semibold text-brand-dark">{user[0].name}</h2>
                <ScoreProductPartial score={review.score} className='w-fit h-8' style={{ transform: 'scale(1.3) translateX(0.8rem)' }} />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-fit text-[0.6rem] font-medium px-2 py-[0.2rem] text-white rounded-[0.7rem] bg-linear-to-l from-brand-dark to-brand">{review.status}</div>
                <p className='text-[0.7rem] text-primary leading-[0.8rem]'>{new Date(review.date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}</p>
              </div>
              <p className='text-[0.9rem] text-primary leading-[1.2rem] mt-1'>{review.message}</p>
            </div>
      </div>
  )
}

export default Comment;