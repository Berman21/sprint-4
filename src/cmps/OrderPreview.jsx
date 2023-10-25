
import { useState } from 'react'
import userIcon from '../assets/img/user.svg'
import { StatusModal } from './StatusModal'

export function OrderPreview({ order }) {

    const [isDropdownActive, setIsDropdownActive] = useState(false)

    function toggleDropdown(ev) {
        ev.preventDefault()
        setIsDropdownActive((prevDropdown) => !prevDropdown)
    }

    function onChangeStatus(order, status) {

    }

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

            {/* <div onClick={(ev) => toggleDropdown(ev)}> */}
            <button className={order.status} onClick={(ev) => toggleDropdown(ev)}>{order.status}</button>
            {isDropdownActive && <StatusModal setIsDropdownActive={setIsDropdownActive} />}
            {/* </div> */}

        </section>
    )
}
