export function ReviewPreview({ stay }) {
  return (
    <div className='stay-review-list'>
      {stay.reviews.map((review, idx) => {
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
              <p>{review.txt}</p>
            </article>
          </section>
        )
      })}
    </div>
  )
}
