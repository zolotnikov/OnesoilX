import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import TabNavigator from "./TabNavigator";

const initialState = {
    fieldsBottomSheet: {
        dockHeight: 220,
        sheetExpandedTopOffset: 54,
        sheetDarknessAlpha: 0.7,
        containerStyle: { flex: 1 }
    },
    sort: 0,
    sortDirect: true,
    isGroup: true,
    scrollValue: 0
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_SORT":
            return {
                fieldsBottomSheet: {
                    dockHeight: 220,
                    sheetExpandedTopOffset: 54,
                    sheetDarknessAlpha: 0.7,
                    mainViewDownScale: 0.9,
                    containerStyle: { flex: 1 }
                },
                sort: action.sort,
                sortDirect: action.sortDirect,
                isGroup: action.isGroup,
                scrollValue: state.scrollValue
            };
        case "UPDATE_SORT_BUTTON":
            return {
                fieldsBottomSheet: state.fieldsBottomSheet,
                sort: state.sort,
                sortDirect: state.sortDirect,
                isGroup: state.isGroup,
                scrollValue: action.scrollValue
            };
        default:
            return state;
    }
};

const store = createStore(reducer);

const App = () => {
    return (
        <Provider store={store}>
            <TabNavigator />
        </Provider>
    );
};

export default App;
