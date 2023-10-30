import starSvg from '../assets/img/star.svg'

export function ReviewsModal({ stay }) {
    return (
        <section className="modal-reviews-container">
            <section className='modal-reviews-score'>
                <img src={starSvg} />
            </section>

        </section>
    )
}