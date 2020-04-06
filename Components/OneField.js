import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default OneField = props => {
    let value = "";
    let subvalue = "";
    let subvalueBG = "transparent";
    let subvalueColor = "transparent";

    switch (props.sort) {
        case 0: //Имя
            value = "";
            subvalue = "";
            break;
        case 1: //NDVI
            value = props.avg.toFixed(2);
            subvalue = `${props.delta > 0 ? "+" : ""}${props.delta.toFixed(2)}`;
            subvalueBG =
                props.delta > 0
                    ? "#E9F7EF"
                    : props.delta < 0
                    ? "#FAE6E5"
                    : "#F2F6F8";
            subvalueColor =
                props.delta > 0
                    ? "#27AE60"
                    : props.delta < 0
                    ? "#FF3B30"
                    : "#A5B2BC";
            break;
        case 2: //Урожайность
            value = props.yield_value;

            break;
        case 3: //Дата сева
            value = props.sowing_date;
            subvalue = "BBCH00";
            subvalueBG = "#F2F6F8";
            subvalueColor = "#A5B2BC";
            break;
        case 4: //Дата уборки
            value = props.harvest_date;
            subvalue = props.yield_value;
            subvalueBG = "#F2F6F8";
            subvalueColor = "#A5B2BC";
            break;
        case 5: //Культура
            value = "";
            break;
    }

    useEffect(() => {
        // console.warn(`value: ${value}`);
    });

    return (
        <View style={styles.container}>
            <Image
                style={styles.img}
                source={{
                    uri: props.img
                }}
            />
            <View style={styles.textPart}>
                <View style={styles.nameHa}>
                    <Text style={styles.name}>{props.name} </Text>
                    <Text style={styles.ha}>
                        {props.crop ? props.crop : "Без культуры"} —{" "}
                        {props.ha.toFixed(2)} га
                    </Text>
                </View>
                <View style={styles.values}>
                    <Text style={styles.value}>{value}</Text>
                    <View
                        style={{
                            alignSelf: "flex-end",
                            paddingHorizontal: 5,
                            paddingVertical: 4,
                            borderRadius: 4,
                            backgroundColor: subvalueBG
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 12,
                                lineHeight: 14,
                                fontWeight: "500",
                                color: subvalueColor
                            }}
                        >
                            {subvalue}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",

        width: "100%",
        marginLeft: 15
    },
    img: {
        height: 46,
        width: 46,
        marginRight: 15
    },

    textPart: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: "#CED4D8",
        borderBottomWidth: 0.5,
        minHeight: 66,
        maxHeight: 66
    },

    name: {
        color: "#222",
        fontSize: 16,
        lineHeight: 22
    },
    ha: {
        fontSize: 14,
        color: "#A5B2BC",
        lineHeight: 20
    },
    values: {
        flex: 1,
        marginRight: 30
    },
    value: {
        color: "#222",
        fontSize: 16,
        alignSelf: "flex-end",
        lineHeight: 22
    },
    subvalueContainer: {
        alignSelf: "flex-end",
        paddingHorizontal: 5,
        paddingVertical: 4,
        borderRadius: 4
    },
    subvalue: {
        fontSize: 12,
        lineHeight: 14,
        fontWeight: "500"
    }
});
