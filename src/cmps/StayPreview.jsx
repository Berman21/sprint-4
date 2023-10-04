import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export function StayPreview({ stay }) {
  const navigate = useNavigate()

  function onStay(stayId) {
    return navigate(`/stay/${stayId}`)
  }

  return (
    <section className='stay-preview' onClick={() => onStay(stay._id)}>
      <img src={stay.imgUrls[0]} />
      <div className='stay-loc'>
        {stay.loc.city}, {stay.loc.country}
      </div>
      <div className='stay-price'>
        ${stay.price} <span>total</span>
      </div>
      {/* <Link className="stay-details" to={`/stay/${stay._id}`}>Details</Link> */}
    </section>
  )
}
