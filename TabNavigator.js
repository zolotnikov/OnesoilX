import React from "react";
// import { createStackNavigator } from "react-navigation-stack";
// import { createBottomTabNavigator } from "react-navigation-tabs";
// import { createAppContainer } from "react-navigation";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Fields from "./Screens/Fields";
import Notes from "./Screens/Notes";
import Insights from "./Screens/Insights";
import Profile from "./Screens/Profile";
import * as Icons from "./Components/Icons";

const HomeStack = createStackNavigator();
const NotesStack = createStackNavigator();
const AddNoteStack = createStackNavigator();
const InsightStack = createStackNavigator();
const ProfileStack = createStackNavigator();

function HomeStackScreen() {
    return (
        <HomeStack.Navigator headerMode="none" mode="modal">
            <HomeStack.Screen name="Fields" component={Fields} />
        </HomeStack.Navigator>
    );
}
function NotesStackScreen() {
    return (
        <NotesStack.Navigator>
            <HomeStack.Screen name="Notes" component={Notes} />
        </NotesStack.Navigator>
    );
}
function AddNoteStackScreen() {
    return (
        <AddNoteStack.Navigator>
            <HomeStack.Screen name="AddNote" component={AddNote} />
        </AddNoteStack.Navigator>
    );
}
function InsightStackScreen() {
    return (
        <InsightStack.Navigator>
            <InsightStack.Screen name="Insight" component={Insights} />
        </InsightStack.Navigator>
    );
}
function ProfileStackScreen() {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen name="Profile" component={Profile} />
        </ProfileStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

function TabNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: activeColor,
                    inactiveTintColor: inactiveColor
                }}
            >
                <Tab.Screen
                    name="Fields"
                    component={HomeStackScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Icons.Fields
                                color={focused ? activeColor : inactiveColor}
                            />
                        )
                    }}
                />
                <Tab.Screen
                    name="Notes"
                    component={NotesStackScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Icons.Notes
                                color={focused ? activeColor : inactiveColor}
                            />
                        )
                    }}
                />
                <Tab.Screen
                    name=" "
                    component={AddNoteStackScreen}
                    // options={{
                    //     tabBarIcon: ({ focused }) => (
                    //         <Icons.Fields
                    //             color={focused ? activeColor : inactiveColor}
                    //         />
                    //     )
                    // }}
                />
                <Tab.Screen
                    name="Insights"
                    component={InsightStackScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Icons.Insights
                                color={focused ? activeColor : inactiveColor}
                            />
                        )
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileStackScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Icons.Profile
                                color={focused ? activeColor : inactiveColor}
                            />
                        )
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const activeColor = "#222222";
const inactiveColor = "#A5B2BC";

export default TabNavigator;
