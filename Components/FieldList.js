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
import SectionHeader from "./SectionHeader";
import { connect } from "react-redux";
import * as Icons from "./Icons";

function mapStateToProps(state) {
    return {
        sort: state.sort,
        sortDirect: state.sortDirect,
        isGroup: state.isGroup,
        scrollValue: state.scrollValue
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateSort: (sort, sortDirect, isGroup) =>
            dispatch({
                type: "UPDATE_SORT",
                sort: sort,
                sortDirect: sortDirect,
                isGroup: isGroup
            })
    };
}

function FieldList(props) {
    const mergedItems2 = fieldData2.items.map(item2 => {
        const item1 = fieldData.items.find(
            item1 => item1.field_id === item2.id
        );
        return {
            ...item1,
            ...item2
        };
    });

    const crops = [];

    for (var i = 0; i < fieldData2.items.length; i++) {
        crops.push(fieldData2.items[i].crops[0].crop);
    }

    const uniqCrops = Array.from(new Set(crops));

    const sortButtonTitle = {
        0: "названию",
        1: "индексу вегетации",
        2: "урожайности",
        3: "дате сева",
        4: "дате уборки",
        5: "культуре"
    };

    const russianCropName = {
        sunflower: "Подсолнечник",
        maize_grain: "Кукуруза на зерно",
        alfaalfa: "Люцерна",
        wheat_soft_winter: "Пшеница мягкая озимая",
        sugar_beet: "Свёкла сахарная",
        barley_winter: "Ячмень озимый"
    };

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
    const [localGroup, setLocalGroup] = useState(props.isGroup);

    const [animatedScrollValue, setAnimatedScrollValue] = useState(
        new Animated.Value(props.scrollValue)
    );

    useEffect(() => {
        if (props.scrollValue) {
            setAnimatedScrollValue(props.scrollValue);
        }
    });

    return (
        <View style={styles.container}>
            <Search />
            <TouchableOpacity onPress={() => setSortVisible(true)}>
                <Animated.View
                    style={{
                        opacity: animatedScrollValue.interpolate({
                            inputRange: [0, 454],
                            outputRange: [0, 1]
                        }),
                        height: animatedScrollValue.interpolate({
                            inputRange: [0, 454],
                            outputRange: [0, 30]
                        }),
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        paddingBottom: 10
                    }}
                >
                    <Text style={styles.sortButton}>
                        Сортировка по {sortButtonTitle[props.sort]}
                    </Text>
                    <Icons.DropDown />
                </Animated.View>
            </TouchableOpacity>
            <Sort
                visible={sortVisible}
                setLocalSort={setLocalSort}
                setLocalSortDirect={setLocalSortDirect}
                localSortDirect={localSortDirect}
                localGroup={localGroup}
                setLocalGroup={setLocalGroup}
                onTouchOutside={() => {
                    setSortVisible(false);
                }}
                close={() => {
                    setSortVisible(false);
                    setLocalSortDirect(props.sortDirect);
                    setLocalGroup(props.isGroup);
                }}
                save={() => {
                    setSortVisible(false),
                        props.updateSort(
                            localSort,
                            localSortDirect,
                            localGroup
                        );
                }}
            ></Sort>
            <Divider />

            {props.isGroup ? (
                uniqCrops.map((crop, index) => {
                    return (
                        <View key={index}>
                            <SectionHeader
                                title={russianCropName[crop]}
                            ></SectionHeader>
                            {mergedItems2.map((field, index) => {
                                if (field.crops[0].crop === crop)
                                    return (
                                        <OneField
                                            key={index}
                                            sort={props.sort}
                                            img={field.ndvi}
                                            name={field.title}
                                            ha={field.area}
                                            crop=""
                                            avg={field.avg}
                                            yield_value={
                                                field.crops[0] &&
                                                field.crops[0].yield_value !=
                                                    null
                                                    ? `${field.crops[0].yield_value} т/га`
                                                    : "Не указано"
                                            }
                                            sowing_date={
                                                field.crops[0]
                                                    ? `${formatter.format(
                                                          new Date(
                                                              field.crops[0].sowing_date
                                                          )
                                                      )}`
                                                    : ""
                                            }
                                            harvest_date={
                                                field.crops[0]
                                                    ? `${formatter.format(
                                                          new Date(
                                                              field.crops[0].harvest_date
                                                          )
                                                      )}`
                                                    : ""
                                            }
                                            delta={field.delta}
                                        />
                                    );
                            })}
                            <Divider />
                        </View>
                    );
                })
            ) : (
                <View>
                    <SectionHeader title={"Мои поля"}></SectionHeader>
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
                                        ? russianCropName[field.crops[0].crop]
                                        : "Без культуры"
                                }
                                avg={field.avg}
                                yield_value={
                                    field.crops[0] &&
                                    field.crops[0].yield_value != null
                                        ? `${field.crops[0].yield_value} т/га`
                                        : "Не указано"
                                }
                                sowing_date={
                                    field.crops[0]
                                        ? `${formatter.format(
                                              new Date(
                                                  field.crops[0].sowing_date
                                              )
                                          )}`
                                        : ""
                                }
                                harvest_date={
                                    field.crops[0]
                                        ? `${formatter.format(
                                              new Date(
                                                  field.crops[0].harvest_date
                                              )
                                          )}`
                                        : ""
                                }
                                delta={field.delta}
                            />
                        );
                    })}
                    <Divider />
                </View>
            )}
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
        marginRight: 5
    }
});
