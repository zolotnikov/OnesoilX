import React from "react";
import { StyleSheet, Text, View, Button, Animated, Easing } from "react-native";

export default Divider = () => {
    return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
    divider: {
        flex: 1,
        minHeight: 12,
        maxHeight: 12,
        width: "100%",
        borderTopColor: "#CED4D8",
        borderTopWidth: 0.5,
        backgroundColor: "#F2F6F8"
    }
});
