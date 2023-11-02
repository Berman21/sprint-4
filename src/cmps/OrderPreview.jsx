
import userIcon from '../assets/img/user.svg'
import checkMark from '../assets/img/check-mark.png'
import xMark from '../assets/img/x-mark.png'

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
            <p>${order.totalPrice}</p>

            <p className={order.status}>{order.status}</p>

            {order.status === 'pending' && <div className='btn-container'>
                <button className='approve-btn' onClick={() => onChangeStatus(order, 'approved')}>Approve</button>
                <button className='reject-btn' onClick={() => onChangeStatus(order, 'rejected')}>Reject</button>
            </div>}

            {order.status !== 'pending' && <div className='final-status'>
                <span>Order complete</span>
                {/* {order.status === 'approved' && <img src={checkMark} alt="" />} */}
                {/* {order.status === 'rejected' && <img src={xMark} alt="" />} */}
            </div>}

        </section>
    )
}
