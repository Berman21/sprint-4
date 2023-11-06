
import { PieChart } from './PieChart';
import { BarChart } from './BarChart';
import { OrderList } from './OrderList';
import { StayChart } from './StayChart';

import { useSelector } from 'react-redux';
import { loadOrders, updateOrder, loadReserveStats, updateReserveStats } from '../store/order.actions';
import { orderService } from '../services/order.service.local';
import { Fragment, useEffect, useState } from 'react';

import userIcon from '../assets/img/user.svg'
import { DoughnutChart } from './DoughnutChart';
import { DashboardNav } from './DashboardNav';
import { SOCKET_EVENT_ADD_ORDER, socketService } from '../services/socket.service';
import { showUserMsg } from '../services/event-bus.service';

export function Dashboard() {

    const orders = useSelector((storeState) => storeState.orderModule.orders)
    const reserveStats = useSelector((storeState) => storeState.orderModule.stats)

    useEffect(() => {
        loadOrders()
        socketService.on(SOCKET_EVENT_ADD_ORDER, (order) => {
            loadOrders()
            showUserMsg('New order arrived')
        })

        loadReserveStats()
        return () => {
            socketService.off(SOCKET_EVENT_ADD_ORDER, (order) => {
                loadOrders()
            })
        }
    }, [])

    async function onChangeStatus(order, status) {
        order.status = status
        updateOrder(order)
        // updateReserveStats()
    }

    // if (!reserveStats) return <div>Loading...</div>
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
                        <DoughnutChart reserveStats={reserveStats} />
                        <BarChart />
                    </div>

                </div>

            </section>
        </Fragment>
    )
}
