import { orderService } from "../services/order.service.local"

export const SET_ORDERS = 'SET_ORDERS'
export const SET_ORDER = 'SET_ORDER'
export const REMOVE_ORDER = 'REMOVE_ORDER'
export const ADD_ORDER = 'ADD_ORDER'
export const UPDATE_ORDER = 'UPDATE_ORDER'
export const ADD_TO_CART = 'ADD_TO_CART'
export const CLEAR_CART = 'CLEAR_CART'
export const UNDO_REMOVE_ORDER = 'UNDO_REMOVE_ORDER'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

const initialState = {
    order: orderService.getEmptyOrder(),
    orders: [],
    cart: [],
    lastRemovedOrder: null
}

export function orderReducer(state = initialState, action) {
    var newState = state
    var order
    var orders
    var cart
    switch (action.type) {
        case SET_ORDER:
            newState = { ...state, order: action.order }
            break
        case SET_ORDERS:
            newState = { ...state, orders: action.orders }
            break
        case REMOVE_ORDER:
            const lastRemovedOrder = state.orders.find(order => order._id === action.orderId)
            orders = state.orders.filter(order => order._id !== action.orderId)
            newState = { ...state, orders, lastRemovedOrder }
            break
        case ADD_ORDER:
            newState = { ...state, orders: [...state.orders, action.order] }
            break
        case UPDATE_ORDER:
            orders = state.orders.map(order => (order._id === action.order._id) ? action.order : order)
            newState = { ...state, orders }
            break
        case ADD_TO_CART:
            newState = { ...state, cart: [...state.cart, action.order] }
            break
        case REMOVE_FROM_CART:
            cart = state.cart.filter(order => order._id !== action.orderId)
            newState = { ...state, cart }
            break
        case CLEAR_CART:
            newState = { ...state, cart: [] }
            break
        case UNDO_REMOVE_ORDER:
            if (state.lastRemovedOrder) {
                newState = { ...state, orders: [...state.orders, state.lastRemovedOrder], lastRemovedOrder: null }
            }
            break
        default:
    }
    return newState
}
