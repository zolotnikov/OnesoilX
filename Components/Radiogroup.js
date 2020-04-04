import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { CheckIcon } from "./Icons";
import { connect } from "react-redux";

function mapStateToProps(state) {
    return {
        sort: state.sort,
        sortDirect: state.sortDirect,
        isGroup: state.isGroup
    };
}

const Radiogroup = props => {
    const { togle, setSort, localSortDirect, setLocalSortDirect } = props;
    const [active, setActive] = React.useState({
        id: props.sort
    });

    useEffect(() => {
        console.warn(active);
    });

    return (
        <View
            style={{
                flex: 1,
                width: "100%"
            }}
        >
            {options.items.map(option => {
                return (
                    <TouchableOpacity
                        key={option.id}
                        visible={
                            option.name === "Культуре" && togle == true
                                ? false
                                : true
                        }
                        style={styles.container}
                        onPress={() => {
                            if (option.id == active.id) {
                                setLocalSortDirect(!localSortDirect);
                            } else {
                                setActive({ id: option.id });
                                setSort(option.id);
                            }
                        }}
                    >
                        <View
                            style={[
                                styles.icon,
                                active.id === option.id
                                    ? styles.Visible
                                    : styles.Invisible
                            ]}
                        >
                            <CheckIcon />
                        </View>
                        <View style={styles.optionContainer}>
                            <Text style={styles.option}>{option.name}</Text>
                        </View>
                        <View style={styles.sortContainer}>
                            <View
                                style={[
                                    styles.sortBG,
                                    active.id === option.id
                                        ? styles.Visible
                                        : styles.Invisible
                                ]}
                            >
                                <Text style={styles.sort}>
                                    {localSortDirect
                                        ? `${option.sort}`
                                        : `${option.sortAlt}`}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "auto",
        maxHeight: 52,
        paddingLeft: 15,
        backgroundColor: "#fff"
    },
    icon: {
        flex: 1,
        maxWidth: 20,
        height: 20,
        marginRight: 15,
        alignItems: "center",
        justifyContent: "center"
    },
    optionContainer: {
        flex: 1,
        paddingTop: 15,
        borderBottomColor: "#CED4D8",
        borderBottomWidth: 0.5,
        backgroundColor: "transparent"
    },
    option: {
        flex: 1,
        width: "100%",
        color: "#222",
        fontSize: 16
    },
    sortContainer: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "center",
        height: 52,
        borderBottomColor: "#CED4D8",
        borderBottomWidth: 0.5,
        paddingRight: 15
    },
    sortBG: {
        backgroundColor: "#E9EDF0",
        borderRadius: 4
    },
    Visible: { opacity: 1 },
    Invisible: { opacity: 0 },
    sort: {
        fontWeight: "600",
        color: "#007AFF",
        fontSize: 12,
        lineHeight: 14,
        height: "auto",
        width: "auto",
        paddingHorizontal: 5,
        paddingVertical: 4
    }
});

const options = {
    items: [
        {
            id: 0,
            name: "По названию",
            sort: "A → Б",
            sortAlt: "Б → А"
        },
        {
            id: 1,
            name: "Дате сева",
            sort: "Сначала ранняя",
            sortAlt: "Сначала поздняя"
        },
        {
            id: 2,
            name: "Индексу вегетации",
            sort: "Сначала низкий",
            sortAlt: "Сначала высокий"
        },
        {
            id: 3,
            name: "Однородности поля",
            sort: "Сначала низкая",
            sortAlt: "Сначала высокая"
        },
        {
            id: 4,
            name: "Культуре",
            sort: "A → Б",
            sortAlt: "Б → А"
        }
    ]
};

export default connect(mapStateToProps)(Radiogroup);
// export default Radiogroup;
