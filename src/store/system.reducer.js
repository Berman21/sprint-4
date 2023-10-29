export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const CLOSE_EXPANDED_HEADER = 'CLOSE_EXPANDED_HEADER'
export const OPEN_EXPANDED_HEADER = 'OPEN_EXPANDED_HEADER'
export const OPEN_EXPANDED_HEADER_MODAL = 'OPEN_EXPANDED_HEADER_MODAL'
export const CLOSE_EXPANDED_HEADER_MODAL = 'CLOSE_EXPANDED_HEADER_MODAL'
export const SET_FOCUSED_MODAL = 'SET_FOCUSED_MODAL'
export const REMOVE_FOCUSED_MODAL = 'REMOVE_FOCUSED_MODAL'

export const SET_APP_MODAL_LOGIN = 'SET_APP_MODAL_LOGIN'
export const SET_APP_MODAL_ABOUT = 'SET_APP_MODAL_ABOUT'
export const SET_APP_MODAL_AMENITIES = 'SET_APP_MODAL_AMENITIES'
export const CLOSE_APP_MODAL = 'CLOSE_APP_MODAL'
const initialState = {
  isLoading: false,
  isFilterExpanded: false,
  isExpandedModalOpen: false,
  appModal: false,
  isFocusedModal: false,
}

export function systemReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_START:
      return { ...state, isLoading: true }
    case LOADING_DONE:
      return { ...state, isLoading: false }
    case SET_FOCUSED_MODAL:
      return { ...state, isFocusedModal: true }
    case REMOVE_FOCUSED_MODAL:
      return { ...state, isFocusedModal: false }
    case CLOSE_EXPANDED_HEADER:
      return { ...state, isFilterExpanded: false }
    case OPEN_EXPANDED_HEADER:
      return { ...state, isFilterExpanded: true }
    case OPEN_EXPANDED_HEADER_MODAL:
      return { ...state, isExpandedModalOpen: true }
    case CLOSE_EXPANDED_HEADER_MODAL:
      return { ...state, isExpandedModalOpen: false }
    case CLOSE_APP_MODAL:
      return { ...state, appModal: false }
    case SET_APP_MODAL_LOGIN:
      return { ...state, appModal: SET_APP_MODAL_LOGIN }
    case SET_APP_MODAL_ABOUT:
      return { ...state, appModal: SET_APP_MODAL_ABOUT }
    case SET_APP_MODAL_AMENITIES:
      return { ...state, appModal: SET_APP_MODAL_AMENITIES }
    default:
      return state
  }
}
