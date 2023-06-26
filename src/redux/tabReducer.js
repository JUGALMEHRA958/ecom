// tabReducer.js
const initialState = {
    selectedTab: 'products' // initial selected tab
  };
  
  const tabReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_SELECTED_TAB':
        return { ...state, selectedTab: action.payload };
      default:
        return state;
    }
  };
  
  export default tabReducer;
  