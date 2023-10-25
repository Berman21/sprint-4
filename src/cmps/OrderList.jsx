import { OrderPreview } from './OrderPreview'

export function OrderList({ orders, onChangeStatus }) {

    if (!orders) return <div>Loading...</div>
    return (
        <section>

            <article className="order-list border-bottom">
                <p>Guest</p>
                <p>Check-in</p>
                <p>Checkout</p>
                <p>Listing</p>
                <p>Total Price</p>
                <p>Status</p>
                <p>To do</p>
            </article>

            <ul className='clean-list'>
                {orders.map((order) => (
                    <li className='order' key={order._id}>
                        <OrderPreview order={order} onChangeStatus={onChangeStatus} />
                    </li>
                ))}
            </ul>
        </section>
    )
}
