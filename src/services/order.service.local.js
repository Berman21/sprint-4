
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'order'
_createOrders()

export const orderService = {
    query,
    getById,
    save,
    remove,
    getEmptyOrder,
    addOrderMsg
}
window.cs = orderService


function _createOrders() {
    let orders = utilService.loadFromStorage(STORAGE_KEY)
    if (!orders || !orders.length) {
        orders = [
            {
                _id: utilService.makeId(),
                hostId: 'u102',
                buyer: {
                    _id: 'u101',
                    fullname: 'Mira',
                },
                totalPrice: utilService.getRandomIntInclusive(50, 550),
                startDate: '06/09/2023',
                endDate: '14/09/2023',
                guests: {
                    adults: 1,
                    children: 2,
                },
                stay: {
                    _id: 'h102',
                    name: 'Smoky Mountain Retreat',
                    price: 80.0,
                },
                msgs: [],
                status: 'pending', // approved, rejected
            },
            {
                _id: utilService.makeId(),
                hostId: 'u102',
                buyer: {
                    _id: 'u102',
                    fullname: 'Trent',
                },
                totalPrice: utilService.getRandomIntInclusive(50, 550),
                startDate: '20/07/2023',
                endDate: '02/08/2023',
                guests: {
                    adults: 1,
                    children: 2,
                },
                stay: {
                    _id: 'h103',
                    name: 'Cherry Treesort',
                    price: 80.0,
                },
                msgs: [],
                status: 'pending', // approved, rejected
            },
            {
                _id: utilService.makeId(),
                hostId: 'u102',
                buyer: {
                    _id: 'u103',
                    fullname: 'Nick',
                },
                totalPrice: utilService.getRandomIntInclusive(50, 550),
                startDate: '01/01/2024',
                endDate: '10/01/2024',
                guests: {
                    adults: 1,
                    children: 2,
                },
                stay: {
                    _id: 'h104',
                    name: 'Thimble Rock Point',
                    price: 80.0,
                },
                msgs: [],
                status: 'pending', // approved, rejected
            },
            {
                _id: utilService.makeId(),
                hostId: 'u102',
                buyer: {
                    _id: 'u104',
                    fullname: 'Mark',
                },
                totalPrice: utilService.getRandomIntInclusive(50, 550),
                startDate: '30/11/2022',
                endDate: '06/12/2022',
                guests: {
                    adults: 1,
                    children: 2,
                },
                stay: {
                    _id: 'h105',
                    name: 'Beachfront Home',
                    price: 80.0,
                },
                msgs: [],
                status: 'pending', // approved, rejected
            },
            {
                _id: utilService.makeId(),
                hostId: 'u102',
                buyer: {
                    _id: 'u105',
                    fullname: 'Sean',
                },
                totalPrice: utilService.getRandomIntInclusive(50, 550),
                startDate: '20/02/2023',
                endDate: '28/02/2023',
                guests: {
                    adults: 1,
                    children: 2,
                },
                stay: {
                    _id: 'h106',
                    name: 'Alpine Zen Estate',
                    price: 80.0,
                },
                msgs: [],
                status: 'pending', // approved, rejected
            },
            {
                _id: utilService.makeId(),
                hostId: 'u102',
                buyer: {
                    _id: 'u106',
                    fullname: 'Kinnettles',
                },
                totalPrice: utilService.getRandomIntInclusive(50, 550),
                startDate: '10/05/2023',
                endDate: '20/05/2023',
                guests: {
                    adults: 1,
                    children: 2,
                },
                stay: {
                    _id: 'h107',
                    name: 'Kinnettles Mansion',
                    price: 80.0,
                },
                msgs: [],
                status: 'pending', // approved, rejected
            },
        ]
        utilService.saveToStorage(STORAGE_KEY, orders)
    }
}


async function query(filterBy = { txt: '', price: 0 }) {
    var orders = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        orders = orders.filter(order => regex.test(order.vendor) || regex.test(order.description))
    }
    if (filterBy.price) {
        orders = orders.filter(order => order.price <= filterBy.price)
    }
    return orders
}

function getById(orderId) {
    return storageService.get(STORAGE_KEY, orderId)
}

async function remove(orderId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, orderId)
}

async function save(order) {
    var savedOrder
    if (order._id) {
        savedOrder = await storageService.put(STORAGE_KEY, order)
    } else {
        // Later, owner is set by the backend
        order.owner = userService.getLoggedinUser()
        savedOrder = await storageService.post(STORAGE_KEY, order)
    }
    return savedOrder
}

async function addOrderMsg(orderId, txt) {
    // Later, this is all done by the backend
    const order = await getById(orderId)
    if (!order.msgs) order.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    order.msgs.push(msg)
    await storageService.put(STORAGE_KEY, order)

    return msg
}

function getEmptyOrder() {
    return {
        hostId: 'u102',
        buyer: {
            _id: 'u101',
            fullname: 'User 1',
        },
        startDate: 'Select',
        endDate: 'Select',
        guests: {
            adults: 1,
            children: 0,
            infants:0,
            pets:0
        },
        stay: {
            _id: 'h102',
            name: 'House Of Uncle My',
            price: 80.0,
        }
    }
}


// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




