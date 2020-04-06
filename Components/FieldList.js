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
        sort: state.sort,
        sortDirect: state.sortDirect
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateSort: (sort, sortDirect) =>
            dispatch({
                type: "UPDATE_SORT",
                sort: sort,
                sortDirect: sortDirect
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

    const mergedItems2 = fieldData2.items.map(item2 => {
        const item1 = fieldData.items.find(
            item1 => item1.field_id === item2.id
        );
        return {
            ...item1,
            ...item2
        };
    });

    const sortFields = mergedItems2.sort(function(a, b) {
        switch (props.sort) {
            case 0: //Имя
                if (
                    (a.title > b.title && props.sortDirect) ||
                    (a.title < b.title && !props.sortDirect)
                )
                    return 1;
                if (
                    (a.title < b.title && props.sortDirect) ||
                    (a.title > b.title && !props.sortDirect)
                )
                    return -1;
                return 0;
            case 1: //NDVI
                if (
                    (a.avg > b.avg && props.sortDirect) ||
                    (a.avg < b.avg && !props.sortDirect)
                )
                    return 1;
                if (
                    (a.avg < b.avg && props.sortDirect) ||
                    (a.avg > b.avg && !props.sortDirect)
                )
                    return -1;
                return 0;
            case 2: //Урожайность
                if (
                    (a.crops[0].yield_value > b.crops[0].yield_value &&
                        props.sortDirect) ||
                    (a.crops[0].yield_value < b.crops[0].yield_value &&
                        !props.sortDirect)
                )
                    return 1;
                if (
                    (a.crops[0].yield_value < b.crops[0].yield_value &&
                        props.sortDirect) ||
                    (a.crops[0].yield_value > b.crops[0].yield_value &&
                        !props.sortDirect)
                )
                    return -1;
                return 0;

            case 3: //Дата сева
                if (
                    (a.crops[0].sowing_date > b.crops[0].sowing_date &&
                        props.sortDirect) ||
                    (a.crops[0].sowing_date < b.crops[0].sowing_date &&
                        !props.sortDirect)
                )
                    return 1;
                if (
                    (a.crops[0].sowing_date < b.crops[0].sowing_date &&
                        props.sortDirect) ||
                    (a.crops[0].sowing_date > b.crops[0].sowing_date &&
                        !props.sortDirect)
                )
                    return -1;
                return 0;
            case 4: //Дата уборки
                if (
                    (a.crops[0].harvest_date > b.crops[0].harvest_date &&
                        props.sortDirect) ||
                    (a.crops[0].harvest_date < b.crops[0].harvest_date &&
                        !props.sortDirect)
                )
                    return 1;
                if (
                    (a.crops[0].harvest_date < b.crops[0].harvest_date &&
                        props.sortDirect) ||
                    (a.crops[0].harvest_date > b.crops[0].harvest_date &&
                        !props.sortDirect)
                )
                    return -1;
                return 0;
                return 0;
            case 5: //Культура
                if (
                    (a.crops[0].crop > b.crops[0].crop && props.sortDirect) ||
                    (a.crops[0].crop < b.crops[0].crop && !props.sortDirect)
                )
                    return 1;
                if (
                    (a.crops[0].crop < b.crops[0].crop && props.sortDirect) ||
                    (a.crops[0].crop > b.crops[0].crop && !props.sortDirect)
                )
                    return -1;
                return 0;
        }
    });

    let formatter = new Intl.DateTimeFormat("ru", {
        month: "short",
        day: "numeric"
    });

    const [sortVisible, setSortVisible] = useState(false);
    const [localSort, setLocalSort] = useState(props.sort);
    const [localSortDirect, setLocalSortDirect] = useState(props.sortDirect);

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
                setLocalSortDirect={setLocalSortDirect}
                localSortDirect={localSortDirect}
                onTouchOutside={() => {
                    setSortVisible(false);
                }}
                close={() => {
                    setSortVisible(false);
                    setLocalSortDirect(props.sortDirect);
                }}
                save={() => {
                    setSortVisible(false),
                        props.updateSort(localSort, localSortDirect);
                }}
            ></Sort>
            <Divider />
            {mergedItems2.map((field, index) => {
                return (
                    <OneField
                        key={index}
                        sort={props.sort}
                        img={field.ndvi}
                        name={field.title}
                        ha={field.area}
                        crop={
                            field.crops[0]
                                ? field.crops[0].crop
                                : "Без культуры"
                        }
                        avg={field.avg}
                        yield_value={
                            field.crops[0] && field.crops[0].yield_value != null
                                ? `${field.crops[0].yield_value} т/га`
                                : "Не указано"
                        }
                        sowing_date={
                            field.crops[0]
                                ? `${formatter.format(
                                      new Date(field.crops[0].sowing_date)
                                  )}`
                                : ""
                        }
                        harvest_date={
                            field.crops[0]
                                ? `${formatter.format(
                                      new Date(field.crops[0].harvest_date)
                                  )}`
                                : ""
                        }
                        delta={field.delta}
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
