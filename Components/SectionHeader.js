import React from "react";
import { StyleSheet, Text, View } from "react-native";

function SectionHeader(props) {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{props.title}</Text>
            </View>
        </View>
    );
}

export default SectionHeader;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxHeight: 60,
        minHeight: 60,
        width: "100%",
        backgroundColor: "#Fff",
        justifyContent: "center"
    },
    textContainer: {
        flex: 1,
        justifyContent: "center",
        marginLeft: 15,
        borderBottomColor: "#CED4D8",
        borderBottomWidth: 0.5
    },
    title: {
        fontSize: 17,
        color: "#222",
        fontWeight: "600",
        lineHeight: 22,
        borderBottomColor: "blue",
        borderBottomWidth: 1
    }
});
