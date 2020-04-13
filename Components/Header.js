import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";

function Header(props) {
    return (
        <View style={styles.container}>
            <Button title="Отмена" onPress={props.close}></Button>
            <Text style={styles.title}>{props.title}</Text>
            <Button title="Сохранить" onPress={props.save}></Button>
        </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        maxHeight: 60,
        width: "100%",
        backgroundColor: "#F9F9F9",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 6
    },
    title: {
        fontSize: 17,
        color: "#222",
        fontWeight: "600",
        lineHeight: 22
    }
});
