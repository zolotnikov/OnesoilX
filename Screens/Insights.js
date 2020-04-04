import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Chart from "../Components/Chart";
import Chart2 from "../Components/Chart2";

export default Insights = () => {
    return (
        <View style={styles.container}>
            <Chart />
            <Chart2 />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: "#fff"
    }
});
