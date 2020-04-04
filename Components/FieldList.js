import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Animated,
    Easing
} from "react-native";
import Search from "./Search";
import OneField from "./OneField";
import Divider from "./Divider";
import * as fieldData from "../fields.json";
import * as fieldData2 from "../fields2.json";
import Sort from "./Sort";
import { connect } from "react-redux";

function mapStateToProps(state) {
    return {
        sort: state.sort
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateSort: sort =>
            dispatch({
                type: "UPDATE_SORT",
                sort: sort
            })
    };
}

function FieldList(props) {
    const mergedItems = fieldData.items.map(item1 => {
        const item2 = fieldData2.items.find(
            item2 => item2.id === item1.field_id
        );
        return {
            ...item1,
            ...item2
        };
    });

    const data = mergedItems.sort(function(a, b) {
        return b.avg - a.avg;
    });

    const [sortVisible, setSortVisible] = useState(false);
    const [localSort, setLocalSort] = useState(props.sort);

    return (
        <View style={styles.container}>
            <Search />
            <TouchableOpacity
                title="Открыть"
                onPress={() => setSortVisible(true)}
            >
                <Text style={styles.sortButton}>
                    Сортировка по индексу вегетации
                </Text>
            </TouchableOpacity>
            <Sort
                visible={sortVisible}
                setLocalSort={setLocalSort}
                onTouchOutside={() => {
                    setSortVisible(false);
                }}
                close={() => {
                    setSortVisible(false);
                }}
                save={() => {
                    setSortVisible(false), props.updateSort(localSort);
                }}
            ></Sort>
            <Divider />
            {mergedItems.map((field, index) => {
                return (
                    <OneField
                        key={index}
                        img={field.ndvi}
                        name={field.id}
                        ha={field.area}
                        crop={field.title}
                        value={field.avg}
                        subvalue={field.delta}
                    />
                );
            })}
        </View>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldList);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: "100%",
        backgroundColor: "#fff",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.08,
        shadowColor: "black",
        shadowRadius: 2
    },
    sortButton: {
        fontSize: 14,
        color: "#007AFF",
        fontWeight: "600",
        lineHeight: 20,
        marginLeft: 15,
        marginBottom: 10
    }
});
