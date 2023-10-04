export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const CLOSE_EXPANDED_HEADER = 'CLOSE_EXPANDED_HEADER'
export const OPEN_EXPANDED_HEADER = 'OPEN_EXPANDED_HEADER'
export const OPEN_EXPANDED_HEADER_MODAL = 'OPEN_EXPANDED_HEADER_MODAL'
export const CLOSE_EXPANDED_HEADER_MODAL = 'CLOSE_EXPANDED_HEADER_MODAL'

const initialState = {
  isLoading: false,
  isFilterExpanded: false,
  isExpandedModalOpen: false,
}

export function systemReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_START:
      return { ...state, isLoading: true }
    case LOADING_DONE:
      return { ...state, isLoading: false }
    case CLOSE_EXPANDED_HEADER:
      return { ...state, isFilterExpanded: false }
    case OPEN_EXPANDED_HEADER:
      return { ...state, isFilterExpanded: true }
    case OPEN_EXPANDED_HEADER_MODAL:
      return { ...state, isExpandedModalOpen: true }
    case CLOSE_EXPANDED_HEADER_MODAL:
      return { ...state, isExpandedModalOpen: false }
    default:
      return state
  }
}
