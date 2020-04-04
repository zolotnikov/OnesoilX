import React, { useRef, useEffect } from "react";
import { View, TextInput, Button } from "react-native";
import { SearchIcon } from "./Icons";

export default function Search(props) {
    const { onClose, inputValue, onInput, isSearching, panelPosition } = props;

    const inputEl = useRef(null);

    useEffect(() => {
        if (panelPosition === 54)
            inputEl.current && setTimeout(inputEl.current.focus(), 1000);
    }, [isSearching]);

    return (
        <View //All
            style={{
                flex: 1,
                maxHeight: 36,
                flexDirection: "row",
                display: "flex",
                alignItems: "flex-start",
                width: "100%",
                paddingLeft: 15,
                paddingRight: 15,
                marginTop: 15,
                marginBottom: 10
            }}
        >
            <View //Input + SearchIcon
                style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "center",
                    width: "100%",
                    alignItems: "flex-start",
                    justifyContent: "space-between"
                }}
            >
                <TextInput //Input
                    style={{
                        width: "100%",
                        height: 36,
                        backgroundColor: "#E9EDF0",
                        paddingLeft: 30,
                        fontSize: 17,
                        borderRadius: 10,
                        color: "#222"
                    }}
                    ref={inputEl}
                    type="text"
                    placeholder="Поиск поля или места"
                    value={inputValue}
                    onInput={onInput}
                />

                <View //SearchIcon
                    style={{
                        position: "absolute",
                        top: 6,
                        width: 24,
                        height: 24,
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: 4,
                        background: "transparent"
                    }}
                >
                    <SearchIcon />
                </View>
            </View>
            {isSearching2 && (
                <Button //CancelButton
                    title="Отменить"
                    onTap={onClose}
                    whileTap={{ opacity: 0.5 }}
                    visible={isSearching}
                    style={{
                        flex: 1,
                        width: 36,
                        marginLeft: 10,
                        fontSize: 17,
                        color: "#007AFF"
                    }}
                ></Button>
            )}
        </View>
    );
}

const isSearching2 = false;

Search.defaultProps = {
    TextInputValue: ""
};
