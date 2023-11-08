import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { SOCKET_EVENT_UPDATE_ORDER, socketService } from "../services/socket.service"
import { useEffect } from "react"
import { AppHeader } from "./AppHeader"


export function MobileTrips({ filterByToEdit, setIsModalActive, setFilterByToEdit, fetchOrderByBuyer, orders }) {
    const loggedInUser = useSelector((storeState) => storeState.userModule.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (!loggedInUser) navigate('/')
        fetchOrderByBuyer()
        socketService.on(SOCKET_EVENT_UPDATE_ORDER, (order) => {
            fetchOrderByBuyer()
        })
        return () => {
            socketService.off(SOCKET_EVENT_UPDATE_ORDER, (order) => {
                fetchOrderByBuyer()
            })
        }
    }, [loggedInUser])

    function handleClick(orderId) {
        navigate(`/stay/${orderId}`)
    }

    if (!orders) return <Loader />
    return (
        <>
            <section className="trips-page-container">
                <AppHeader filterByToEdit={filterByToEdit} setIsModalActive={setIsModalActive} setFilterByToEdit={setFilterByToEdit} />
                <section className="trips-container">
                    <table className="trip-table">
                        <thead>
                            <tr>
                                <th>Destination</th>
                                <th>Host</th>
                                <th>Check-in</th>
                                <th>Check-out</th>
                                <th>Total</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                    </table>
                </section>
            </section >
        </>

    );
}
// <tbody>

//     {orders && orders.map((order, idx) => (
//         <tr key={idx} onClick={() => handleClick(order.stay._id)}>
//             <td className="destination-cell">
//                 <img src={order.stay.imgUrls[0]} alt="Stay Image" />
//                 <div>
//                     <div className="stay-name">{order.stay.name}</div>
//                     <div className="stay-city">{order.stay.city}</div>
//                 </div>
//             </td>
//             <td className="trips-host-name">{order.stay.hostFullname}</td>
//             <td className="trips-start-date">{order.startDate}</td>
//             <td className="trips-end-date">{order.endDate}</td>
//             <td className="trips-price">${order.totalPrice}</td>
//             <td className={order.status}>{order.status}</td>
//         </tr>
//     ))}
// </tbody>