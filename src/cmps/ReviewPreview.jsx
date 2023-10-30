import { LongTxt } from "./LongTxt"
import starSvg from '../assets/img/star.svg'
import rightArrow from '../assets/img/right-arrow.svg'
import { SET_APP_MODAL_REVIEWS } from "../store/system.reducer";

export function ReviewPreview({ stay, handleShowMore }) {

  const firstSixReviews = stay.reviews.slice(0, 6)
  return (
    <div className="stay-review-container">
      <section className="stay-review-header">
        <img src={starSvg} />
        <p>5.0 · {stay.reviews.length} reviews</p>
      </section>
      {/* <section className="review-score-list">
        {reviewCategories.map((category, index) => (
          <section className="review-score-preview" key={index}>
            <div className="review-score-name">{category}</div>
            <section className="review-score">
              <section className="score-bar-container">
                <div className="score-bar"></div>
              </section>
              <span className="review-score-average"></span>
            </section>
          </section>
        ))}
      </section> */}
      <div className='stay-review-list'>
        {firstSixReviews.map((review, idx) => {
          const reviewDate = new Date(review.at)

          const month = reviewDate.toLocaleString('default', { month: 'long' })
          const year = reviewDate.getFullYear()

          return (
            <section className='stay-review-preview' key={idx}>

              <article className="review-user">
                <section className="review-img-container">
                  <img src={review.by.imgUrl} />
                </section>
                <section className="review-user-details">
                  <h3>{review.by.fullname}</h3>
                  <span>{`${month} ${year}`}</span>
                </section>
              </article>
              <article className="review-content">
                <LongTxt img={rightArrow} txt={review.txt} length='179' />
              </article>
            </section>
          )
        })}
      </div>
      <button onClick={() => handleShowMore(SET_APP_MODAL_REVIEWS)} >Show all {stay.reviews.length} reviews</button>
    </div>
  )
}
