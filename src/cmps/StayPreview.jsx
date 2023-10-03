export function StayPreview({ stay }) {
  return (
    <section className='stay-preview'>
      {stay.loc.city}, {stay.loc.country}
      {stay.price}
    </section>
  )
}
