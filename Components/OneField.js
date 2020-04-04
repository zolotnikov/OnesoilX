import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default OneField = props => {
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
                    <Text style={styles.name}>Поле {props.name} </Text>
                    <Text style={styles.ha}>
                        {props.crop ? props.crop : "Без культуры"} —{" "}
                        {props.ha.toFixed(2)} га
                    </Text>
                </View>
                <View style={styles.values}>
                    <Text style={styles.value}>{props.value.toFixed(2)}</Text>
                    <View
                        style={{
                            alignSelf: "flex-end",
                            paddingHorizontal: 5,
                            paddingVertical: 4,
                            borderRadius: 4,
                            backgroundColor:
                                props.subvalue > 0
                                    ? "#E9F7EF"
                                    : props.subvalue < 0
                                    ? "#FAE6E5"
                                    : "#F2F6F8"
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 12,
                                lineHeight: 14,
                                fontWeight: "500",
                                color:
                                    props.subvalue > 0
                                        ? "#27AE60"
                                        : props.subvalue < 0
                                        ? "#FF3B30"
                                        : "#A5B2BC"
                            }}
                        >
                            {props.subvalue > 0 ? "+" : ""}
                            {props.subvalue.toFixed(2)}
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
