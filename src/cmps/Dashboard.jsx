
import { PieChart } from './PieChart';
import { BarChart } from './BarChart';
import { OrderList } from './OrderList';

import { useSelector } from 'react-redux';
import { loadOrders, updateOrder } from '../store/order.actions';
import { useEffect } from 'react';


export function Dashboard() {

    const orders = useSelector((storeState) => storeState.orderModule.orders)

    useEffect(() => {
        loadOrders()
    }, [])

    function onChangeStatus(order, status) {
        order.status = status
        updateOrder(order)
    }

    return (
        <section>

            {/* <PieChart />
            <BarChart /> */}

            <h1>{orders.length} reservations</h1>
            <OrderList orders={orders} onChangeStatus={onChangeStatus} />

        </section>
    )
}
