import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

type NotificationProps = {
    message: string;
    duration?: number; // Duration in milliseconds (default: 3000ms)
    onHide?: () => void; // Callback when notification hides
};

const Notification: React.FC<NotificationProps> = ({ message, duration = 3000, onHide }) => {
    const [fadeAnim] = useState(new Animated.Value(0)); // Animation value

    useEffect(() => {
        // Fade in the notification
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();

        // Automatically hide the notification after the specified duration
        const timer = setTimeout(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start(() => {
                if (onHide) onHide(); // Call onHide callback if provided
            });
        }, duration);

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, [fadeAnim, duration, onHide]);

    return (
        <Animated.View style={[styles.notification, { opacity: fadeAnim }]}>
            <Text style={styles.notificationText}>{message}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    notification: {
        position: 'absolute',
        top: 50,
        left: 10,
        right: 10,
        backgroundColor: '#4caf50',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000, // Ensure it stays above other UI elements
    },
    notificationText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Notification;
