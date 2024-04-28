import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, TextInput, Pressable } from "react-native";
import LoginScreen from "./auth/login";
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";

const Landing = () => {
    console.log("Landing run");
    const router = useRouter();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);


    const [searchText, setSearchText] = useState("")

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.container}>
                <View style={styles.row}>
                    {/* Logo */}
                    <Image style={styles.image} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />

                    {/* Buttons */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button}
                            onPress={() => {
                                router.replace("auth/login")
                            }}
                        >
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}
                                onPress={() => {
                                    router.replace("auth/register")
                                }}
                            >Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <TextInput
                    style={styles.input}
                    placeholder="SEARCH"
                    value={searchText}
                    onChangeText={setSearchText}
                />
                {/* <Pressable style={styles.loginButton} onPress={()=>{}}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </Pressable> */}

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        width: "100%",
    },
    button: {
        // backgroundColor: "pink",
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "black",
        fontWeight: "bold",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        flex: 1,
    },
    image: {
        width: 50,
        height: 50,
    }
});

export default Landing;
