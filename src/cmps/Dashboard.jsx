
import { PieChart } from './PieChart';
import { BarChart } from './BarChart';
import { OrderList } from './OrderList';

import { useSelector } from 'react-redux';
import { loadOrders } from '../store/order.actions';
import { useEffect } from 'react';


export function Dashboard() {

    const orders = useSelector((storeState) => storeState.orderModule.orders)

    useEffect(() => {
        loadOrders()
    }, [])

    return (
        <section>

            {/* <PieChart />
            <BarChart /> */}

            <h1>{orders.length} reservations</h1>
            <OrderList orders={orders} />

        </section>
    )
}
