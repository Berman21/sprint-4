
import userIcon from '../assets/img/user.svg'

export function OrderPreview({ order, onChangeStatus }) {

    return (
        <section className="order-preview border-bottom">
            <div>
                <img className='user-icon' src={userIcon} />
                <p>{order.buyer.fullname}</p>
            </div>
            <p>{order.startDate}</p>
            <p>{order.endDate}</p>
            <p>{order.stay.name}</p>
            <p>₪{order.totalPrice}</p>

            <p className={order.status}>{order.status}</p>

            <div>
                <button className='approve-btn' onClick={() => onChangeStatus(order, 'approve')}>Approve</button>
                <button className='reject-btn' onClick={() => onChangeStatus(order, 'reject')}>Reject</button>
            </div>

        </section>
    )
}
