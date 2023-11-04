
import { PieChart } from './PieChart';
import { BarChart } from './BarChart';
import { OrderList } from './OrderList';
import { StayChart } from './StayChart';

import { useSelector } from 'react-redux';
import { loadOrders, updateOrder } from '../store/order.actions';
import { Fragment, useEffect } from 'react';

import userIcon from '../assets/img/user.svg'
import { DoughnutChart } from './DoughnutChart';
import { DashboardNav } from './DashboardNav';

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
        <Fragment>
            <section className='dashboard'>

                {/* <div className='dashboard-nav'>
                    <h1>Home</h1>
                </div> */}

                <div className='dashboard-header flex space-between'>
                    <h1>Dashboard</h1>
                    <img src={userIcon} />
                </div>
                <DashboardNav />
                <div className='dashboard-container full'>

                    {/* <p className='order-count'>{orders.length} reservations</p> */}
                    <div>
                        {/* <StayChart /> */}
                        <OrderList orders={orders} onChangeStatus={onChangeStatus} />
                    </div>

                    <div>
                        {/* <PieChart /> */}
                        <DoughnutChart />
                        <BarChart />
                    </div>

                </div>

            </section>
        </Fragment>
    )
}
