import { OrderPreview } from './OrderPreview'

export function OrderList({ orders }) {

    return (
        <section>

            <article className="order-list border-bottom">
                <p>Guest</p>
                <p>Check-in</p>
                <p>Checkout</p>
                <p>Listing</p>
                <p>Total Price</p>
                <p>Status</p>
            </article>

            <ul className='clean-list'>
                {orders.map((order) => (
                    <li className='order' key={order._id}>
                        <OrderPreview order={order} />
                    </li>
                ))}
            </ul>
        </section>
    )
}
