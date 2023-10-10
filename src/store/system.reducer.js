export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const CLOSE_EXPANDED_HEADER = 'CLOSE_EXPANDED_HEADER'
export const OPEN_EXPANDED_HEADER = 'OPEN_EXPANDED_HEADER'
export const OPEN_EXPANDED_HEADER_MODAL = 'OPEN_EXPANDED_HEADER_MODAL'
export const CLOSE_EXPANDED_HEADER_MODAL = 'CLOSE_EXPANDED_HEADER_MODAL'
export const SET_MODAL_LOGIN = 'SET_MODAL_LOGIN'
export const SET_MODAL_SIGNUP = 'SET_MODAL_SIGNUP'
export const CLOSE_APP_MODAL = 'CLOSE_APP_MODAL'
export const SET_FOCUSED_MODAL = 'SET_FOCUSED_MODAL'
export const REMOVE_FOCUSED_MODAL = 'REMOVE_FOCUSED_MODAL'
const initialState = {
  isLoading: false,
  isFilterExpanded: false,
  isExpandedModalOpen: false,
  appModal: null,
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
      return { ...state, appModal: null }
    case SET_MODAL_LOGIN:
      return { ...state, appModal: false }
    case SET_MODAL_SIGNUP:
      return { ...state, appModal: false }
    default:
      return state
  }
}
