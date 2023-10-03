import { StayPreview } from './StayPreview'

export function StayList({ stays }) {
  return (
    <ul className='stays-list clean-list'>
      {stays.map((stay) => (
        <li className='stay' key={stay._id}>
          <StayPreview stay={stay} />
        </li>
      ))}
    </ul>
  )
}
