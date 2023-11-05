
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

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

async function save(stay) {
    var savedStay
    if (stay._id) {
        savedStay = await httpService.put(STORAGE_KEY, stay)
    } else {
        savedStay = await httpService.post(STORAGE_KEY, stay)
    }
    return savedStay
}

function getEmptyOrder() {
    return {
        hostId: 'u102',
        buyer: {
            _id: 'u101',
            fullname: 'User 1',
        },
        // startDate: 'Select',
        // endDate: 'Select',
        guests: {
            adults: 1,
            children: 0,
            infants: 0,
            pets: 0
        },
        status: 'pending'
    }
}
