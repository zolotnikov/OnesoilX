import React, { useState, useRef, useEffect } from "react";
import { View } from "react-native";
import DockingBottomSheet from "../Components/BottomSheet";
import Map from "../Components/Map";
import FieldList from "../Components/FieldList";
import { connect } from "react-redux";

function mapStateToProps(state) {
    return { fieldsBottomSheet: state.fieldsBottomSheet };
}

const Fields = props => {
    const [bottomSheet, setBottomSheet] = useState(props.fieldsBottomSheet);

    const bottomSheetRef = useRef(null);

    useEffect(() => {
        setBottomSheet(props.fieldsBottomSheet);
    });

    // const fieldCardHeandler = () => {
    //     if (props.action == "openFieldList") {
    //         bottomSheetRef.current.dockBottomSheet();
    //     } else {
    //         bottomSheetRef.current.expandBottomSheet();
    //     }
    // };

    return (
        <View style={{ flex: 1, backgroundColor: "#EEE" }}>
            <DockingBottomSheet
                ref={bottomSheetRef}
                containerStyle={bottomSheet.containerStyle}
                dockHeight={bottomSheet.dockHeight}
                sheetExpandedTopOffset={bottomSheet.sheetExpandedTopOffset}
                sheetDarknessAlpha={bottomSheet.sheetDarknessAlpha}
                mainViewDownScale={bottomSheet.mainViewDownScale}
                mainContentView={() => <Map />}
                bottomSheetContentView={() => (
                    <FieldList navigation={props.navigation} />
                )}
            />
        </View>
    );
};

export default connect(mapStateToProps)(Fields);
