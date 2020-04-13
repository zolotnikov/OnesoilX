import React, { useState, useEffect } from "react";
import Modal, { ModalContent } from "react-native-modals";
import { View, StyleSheet, Switch, Text } from "react-native";
import Header from "./Header";
import Divider from "./Divider";
import Radiogroup from "./Radiogroup";
import { connect } from "react-redux";

function mapStateToProps(state) {
    return {
        sort: state.sort,
        sortDirect: state.sortDirect,
        isGroup: state.isGroup
    };
}

const Sort = props => {
    return (
        <View style={styles.container}>
            <Modal.BottomModal
                height={500}
                visible={props.visible}
                onTouchOutside={props.onTouchOutside}
            >
                <ModalContent style={{ marginHorizontal: -18, marginTop: -24 }}>
                    <View style={styles.wrapper}>
                        <Header
                            title="Настройки списка"
                            close={props.close}
                            save={props.save}
                        ></Header>
                        <Divider />
                        <View style={styles.grouping}>
                            <Text style={styles.groupTitle}>
                                Группировка по культурам
                            </Text>
                            <Switch
                                value={props.localGroup}
                                onValueChange={props.setLocalGroup}
                            />
                        </View>
                        <Divider />
                        <Radiogroup
                            sort={props.sort}
                            localGroup={props.localGroup}
                            setSort={props.setLocalSort}
                            localSortDirect={props.localSortDirect}
                            setLocalSortDirect={props.setLocalSortDirect}
                        />
                    </View>
                </ModalContent>
            </Modal.BottomModal>
        </View>
    );
};

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
    wrapper: {
        flex: 1,
        minHeight: 500
    },
    grouping: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        maxHeight: 52,
        paddingHorizontal: 15
    },
    groupTitle: {
        color: "#222",
        fontSize: 16
    }
});

export default connect(mapStateToProps)(Sort);
