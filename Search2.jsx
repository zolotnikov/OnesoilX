import React, { useRef, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { SearchIcon } from "./Icons";

export default function Search(props) {
    const {
        onFocus,
        onFilter,
        onClose,
        inputValue,
        onInput,
        isSearching,
        panelPosition
    } = props;

    const inputEl = useRef(null);

    useEffect(() => {
        if (panelPosition === 54)
            inputEl.current && setTimeout(inputEl.current.focus(), 1000);
    }, [isSearching]);

    return (
        <View //All
            style={{
                position: "static",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                height: "auto",
                background: "#fff",
                width: "100%",
                padding: "15px"
            }}
        >
            <View //Input + SearchIcon
                style={{
                    position: "static",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
            >
                {isSearching ? (
                    <TextInput //Input
                        style={{
                            borderRadius: "10px",
                            width: "100%",
                            border: "none",
                            height: "36px",
                            background: "#E9EDF0",
                            paddingLeft: "30px",
                            outline: "none",
                            fontSize: "17px",
                            color: "#222"
                        }}
                        ref={inputEl}
                        type="text"
                        placeholder="Поиск поля или места"
                        value={inputValue}
                        onInput={onInput}
                    />
                ) : (
                    <View //Fake Input
                        style={{
                            position: "static",
                            display: "grid",
                            gridTemplateColumns: "30px, auto",
                            justifyContent: "start",
                            borderRadius: "10px",
                            width: "100%",
                            border: "none",
                            height: "36px",
                            background: "#E9EDF0",
                            paddingLeft: "30px",
                            outline: "none",
                            fontSize: "17px",
                            color: "#a9a9a9"
                        }}
                        onTap={onFocus}
                        onInput={onInput}
                    >
                        <Text>Поиск поля или места</Text>
                    </View>
                )}
                <View //SearchIcon
                    style={{
                        display: "flex",
                        position: "absolute",
                        width: "24px",
                        height: "24px",
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: "4px",
                        background: "transparent"
                    }}
                >
                    <SearchIcon />
                </View>
            </View>
            <Button //CancelButton
                onTap={onClose}
                whileTap={{ opacity: 0.5 }}
                visible={isSearching}
                size={36}
                style={{
                    marginLeft: "10px",
                    position: "static",
                    background: "",
                    width: "auto",
                    fontSize: "17px",
                    color: "#007AFF"
                }}
            >
                Отменить
            </Button>
        </View>
    );
}

Search.defaultProps = {
    TextInputValue: ""
};
