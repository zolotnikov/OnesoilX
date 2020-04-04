import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import TabNavigator from "./TabNavigator";

const initialState = {
    fieldsBottomSheet: {
        dockHeight: 160,
        sheetExpandedTopOffset: 54,
        sheetDarknessAlpha: 0.7,
        mainViewDownScale: 0.9,
        containerStyle: { flex: 1 }
    },
    sort: 0,
    sortDirect: true,
    isGroup: true
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_SORT":
            return {
                fieldsBottomSheet: {
                    dockHeight: 160,
                    sheetExpandedTopOffset: 54,
                    sheetDarknessAlpha: 0.7,
                    mainViewDownScale: 0.9,
                    containerStyle: { flex: 1 }
                },
                sort: action.sort,
                sortDirect: true,
                isGroup: true
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
