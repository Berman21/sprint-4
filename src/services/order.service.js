
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'order'

export const orderService = {
    query,
    save,
    getEmptyOrder,
    getReservationStats,
}
window.cs = orderService

async function getReservationStats() {
    let statsCount = [0, 0, 0]
    let orders = await storageService.query(STORAGE_KEY)
    orders.map(order => {
        if (order.status === 'pending') statsCount[0]++
        else if (order.status === 'approved') statsCount[1]++
        else statsCount[2]++
    })
    return statsCount
}

async function query(filterBy = {}) {
    console.log(filterBy);
    return httpService.get(STORAGE_KEY, filterBy)
}

async function save(order) {
    var savedOrder
    if (order._id) {
        // socketService.emit('new-order', order)
        savedOrder = await httpService.put(STORAGE_KEY, order)
    } else {
        savedOrder = await httpService.post(STORAGE_KEY, order)
    }
    console.log('savedOrder', savedOrder,);
    return savedOrder
}

function getEmptyOrder() {
    return {
        // hostId: '',
        // buyerId: '',
        buyer: {
            _id: 'u101',
            fullname: 'User 1',
        },
        guests: {
            adults: 1,
            children: 0,
            infants: 0,
            pets: 0
        },
        status: 'pending'
    }
}
