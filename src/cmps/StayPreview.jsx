import { Link } from "react-router-dom"

export function StayPreview({ stay }) {
  return (
    <section className='stay-preview'>
      <img src={stay.imgUrls[0]} />
      {stay.loc.city}, {stay.loc.country}
      {stay.price}
      <Link className="stay-details" to={`/stay/${stay._id}`}>Details</Link>
    </section>
  )
}
