import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import {
    VictoryBar,
    VictoryChart,
    VictoryTheme,
    VictoryGroup
} from "victory-native";
import * as fieldData from "../fields.json";
import { ArrowRight } from "./Icons";

const screen = Dimensions.get("screen");

export default Chart2 = () => {
    const data = fieldData.items.sort(function(a, b) {
        return a.max - b.max;
    });

    const [hint, sethint] = useState({
        visivble: false,
        current: 0,
        expected: 0,
        relative: 0,
        img:
            "https://nitrogen-api.dev.onesoil.ai/files/fields/fields_users_seasons_ndvi/S2A/34UFC/2019-12-18/665168_0.png"
    });

    const whiteStroke = (screen.width - 30) / data.length / 4;
    const barPadding = 15 + screen.width / data.length / 2;

    // useEffect(() => {
    //     console.log(hint);
    // });

    return (
        <View style={styles.container}>
            <View style={styles.hint}>
                <Image
                    style={styles.fieldImage}
                    source={{ uri: hint.img }}
                ></Image>
                <View style={styles.valueAndCaption}>
                    <Text style={styles.caption}>Current{"\n"}vegetation</Text>
                    <Text style={styles.value}>{hint.current}</Text>
                </View>
                <View style={styles.valueAndCaption}>
                    <Text style={styles.caption}>Expected{"\n"}vegetation</Text>
                    <Text style={styles.value}>{hint.expected}</Text>
                </View>
                <View style={styles.valueAndCaption}>
                    <Text style={styles.caption}>Relative{"\n"}vegetation</Text>
                    <Text
                        style={{
                            color: hint.textColor,
                            fontSize: 20,
                            fontWeight: "500",
                            lineHeight: 24,
                            marginTop: 5
                        }}
                    >
                        {Math.floor(hint.relative)}%
                    </Text>
                </View>
                <View style={{ marginRight: 7 }}>
                    <ArrowRight />
                </View>
            </View>

            <VictoryGroup
                width={screen.width}
                height={110 + whiteStroke}
                padding={{ top: 0, left: barPadding, right: barPadding }}
                events={[
                    {
                        childName: ["pointer", "bar"],
                        target: "data",
                        eventHandlers: {
                            onPressIn: () => {
                                return [
                                    {
                                        childName: "pointer",
                                        target: "data",
                                        eventKey: "all",
                                        mutation: props => {
                                            return {
                                                style: Object.assign(
                                                    {},
                                                    props.style,
                                                    { fill: "transparent" }
                                                )
                                            };
                                        }
                                    },
                                    {
                                        childName: "pointer",
                                        target: "data",
                                        mutation: props => {
                                            return {
                                                style: Object.assign(
                                                    {},
                                                    props.style,
                                                    { fill: "#A5B2BC" }
                                                )
                                            };
                                        }
                                    },
                                    {
                                        target: "data",
                                        mutation: props => {
                                            return sethint({
                                                visivble: true,
                                                current: `${props.datum.max.toFixed(
                                                    2
                                                )}`,
                                                img: `${props.datum.ndvi}`,
                                                // current: `${props.datum.current}`,
                                                expected: "0.30",
                                                relative: `${(props.datum.max /
                                                    0.3) *
                                                    100}`,
                                                // img: `${props.datum.img}`,
                                                textColor: `${
                                                    props.datum.max > 0.39
                                                        ? "#27AE60"
                                                        : props.datum.max < 0.28
                                                        ? "#FF3B30"
                                                        : "#F1C640"
                                                }`
                                            });
                                        }
                                    }
                                ];
                            }
                        }
                    }
                ]}
            >
                <VictoryBar
                    name="pointer"
                    style={{
                        data: {
                            fill: "transparent"
                        }
                    }}
                    alignment="middle"
                    padding={{ left: 20, right: 10 }}
                    data={data}
                    // x="quarter"
                    y={"status"}
                    barWidth={1}
                />
                <VictoryBar
                    name="bar"
                    style={{
                        data: {
                            fill: ({ datum }) => {
                                if (datum.max > 0.39) {
                                    return "#27AE60";
                                } else {
                                    if (datum.max < 0.28) {
                                        return "#FF3B30";
                                    } else {
                                        return "#F1C640";
                                    }
                                }
                            },
                            stroke: "#fff",
                            strokeWidth: whiteStroke
                        }
                    }}
                    cornerRadius={screen.width / data.length / 2}
                    alignment="middle"
                    data={data}
                    // x="quarter"
                    y="max"
                    // y0="min"
                    // barWidth={1}
                    barWidth={screen.width / data.length}
                />
            </VictoryGroup>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },

    hint: {
        flexDirection: "row",
        backgroundColor: "#F2F6F8",
        height: 77,
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center"
    },

    valueAndCaption: {
        flex: 1,
        padding: 10
    },

    caption: {
        fontSize: 12,
        fontWeight: "400",
        color: "#A5B2BC",
        lineHeight: 14
    },

    value: {
        flex: 1,
        fontSize: 20,
        fontWeight: "500",
        color: "#222",
        lineHeight: 24,
        marginTop: 5
    },

    fieldImage: {
        marginLeft: 15,
        flex: 1,
        maxWidth: 57,
        height: 57
    }
});
