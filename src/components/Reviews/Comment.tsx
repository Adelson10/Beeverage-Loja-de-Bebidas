import React from 'react'
import ScoreProductPartial from '../ListProductShow/ScoreProductPartial';
import useFetch from '../../hooks/useFetch';

const Comment = ({review}: {review: reviews}) => {
  const user = useFetch<User>(`/usuarios/${review.address}`);
  
  return (
    <div className='reviews-comment-container'>
        <div className="reviews-comment-user-container">
            <div className="reviews-comment-photo-user" style={{backgroundImage: `url(${user.json?.photo})`}}></div>
            <div className='reviews-comment-user'>
              <h2 className="reviews-comment-user-name">{user.json?.name}</h2>
              <p className='reviews-comment-user-date'>{review.date.toString()}</p>
              <div className="reviews-comment-user-status">{review.status}</div>
            </div>
        </div>
        <div className="reviews-comment">
            <ScoreProductPartial score={review.score}/>
            <p>{review.message}</p>
        </div>
    </div>
  )
}

export default Comment;