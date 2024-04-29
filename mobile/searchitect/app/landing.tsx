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

                <Text style={
                    {
                        color: 'white',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        padding:30,
                        fontSize:25
                    }}>
                        Browse as a guest
                    </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Search..."
                    placeholderTextColor={'white'}
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
        backgroundColor: 'black',
    },
    row: {
        position: 'absolute',
        top: 20,
        // right: 20,
        // left:20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        width: "100%",
    },
    input: {
        width: 300,
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
    },
    button: {
        // backgroundColor: "pink",
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "white",
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
