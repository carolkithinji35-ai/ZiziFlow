import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Easing,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts, Poppins_600SemiBold } from "@expo-google-fonts/poppins";

const CowLogo = ({ size = 120, color = "#F5F0EC" }) => {
    const stroke = 6;
    const headSize = size * 0.72;
    const earSize = size * 0.18;
    const eyeSize = size * 0.06;

    return (
        <View
            style={{
                width: size,
                height: size,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <View
                style={{
                    width: headSize,
                    height: headSize,
                    borderRadius: headSize / 2,
                    borderWidth: stroke,
                    borderColor: color,
                    backgroundColor: "transparent",
                    position: "relative",
                }}
            >
                <View
                    style={{
                        width: earSize,
                        height: earSize,
                        borderRadius: earSize / 2,
                        borderWidth: stroke,
                        borderColor: color,
                        position: "absolute",
                        left: headSize * 0.11,
                        top: -earSize * 0.4,
                        backgroundColor: "transparent",
                    }}
                />
                <View
                    style={{
                        width: earSize,
                        height: earSize,
                        borderRadius: earSize / 2,
                        borderWidth: stroke,
                        borderColor: color,
                        position: "absolute",
                        right: headSize * 0.11,
                        top: -earSize * 0.4,
                        backgroundColor: "transparent",
                    }}
                />
                <View
                    style={{
                        width: eyeSize,
                        height: eyeSize,
                        borderRadius: eyeSize / 2,
                        backgroundColor: color,
                        position: "absolute",
                        left: headSize * 0.27,
                        top: headSize * 0.34,
                    }}
                />
                <View
                    style={{
                        width: eyeSize,
                        height: eyeSize,
                        borderRadius: eyeSize / 2,
                        backgroundColor: color,
                        position: "absolute",
                        right: headSize * 0.27,
                        top: headSize * 0.34,
                    }}
                />
                <View
                    style={{
                        width: headSize * 0.24,
                        height: headSize * 0.16,
                        borderRadius: headSize * 0.14,
                        borderWidth: stroke,
                        borderColor: color,
                        position: "absolute",
                        left: headSize * 0.38,
                        bottom: headSize * 0.1,
                        backgroundColor: "transparent",
                    }}
                />
                <View
                    style={{
                        width: headSize * 0.18,
                        height: headSize * 0.1,
                        borderRadius: headSize * 0.08,
                        backgroundColor: color,
                        position: "absolute",
                        left: headSize * 0.41,
                        bottom: headSize * 0.11,
                    }}
                />
            </View>
        </View>
    );
};

export default function App() {
    const [fontsLoaded] = useFonts({
        Poppins_600SemiBold,
    });

    const [isSplashVisible, setIsSplashVisible] = useState(true);
    const splashOpacity = useRef(new Animated.Value(1)).current;
    const splashScale = useRef(new Animated.Value(1)).current;
    const welcomeOpacity = useRef(new Animated.Value(0)).current;
    const welcomeTranslateY = useRef(new Animated.Value(18)).current;

    useEffect(() => {
        if (!fontsLoaded) {
            return;
        }

        const splashTimer = setTimeout(() => {
            Animated.parallel([
                Animated.timing(splashOpacity, {
                    toValue: 0,
                    duration: 500,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: true,
                }),
                Animated.timing(splashScale, {
                    toValue: 0.92,
                    duration: 500,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: true,
                }),
                Animated.timing(welcomeOpacity, {
                    toValue: 1,
                    duration: 700,
                    delay: 120,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: true,
                }),
                Animated.timing(welcomeTranslateY, {
                    toValue: 0,
                    duration: 700,
                    delay: 120,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: true,
                }),
            ]).start(() => setIsSplashVisible(false));
        }, 1900);

        return () => clearTimeout(splashTimer);
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return <View style={styles.loader} />;
    }

    return (
        <View style={styles.appShell}>
            <StatusBar style="light" />

            <View style={styles.deviceFrame}>
                <Animated.View
                    pointerEvents={isSplashVisible ? "auto" : "none"}
                    style={[
                        styles.screen,
                        styles.splashScreen,
                        {
                            opacity: splashOpacity,
                            transform: [{ scale: splashScale }],
                        },
                    ]}
                >
                    <View style={styles.splashGlow} />
                    <View style={styles.brandWrap}>
                        <CowLogo size={120} />
                        <Text style={styles.wordmark}>ZiziFlow</Text>
                    </View>

                    <View style={styles.splashTextWrap}>
                        <Text style={styles.splashLine}>Know your herd</Text>
                        <Text style={styles.splashLine}>Grow your farm</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.primaryButton}
                        activeOpacity={0.9}
                    >
                        <Text style={styles.primaryButtonText}>
                            Get Started
                        </Text>
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View
                    pointerEvents={isSplashVisible ? "none" : "auto"}
                    style={[
                        styles.screen,
                        styles.welcomeScreen,
                        {
                            opacity: welcomeOpacity,
                            transform: [{ translateY: welcomeTranslateY }],
                        },
                    ]}
                >
                    <View style={styles.topBar}>
                        <View style={styles.logoBadge}>
                            <CowLogo size={28} />
                        </View>
                        <Text style={styles.topBarText}>ZiziFlo</Text>
                        <View style={styles.navCircle} />
                    </View>

                    <View style={styles.formPanel}>
                        <Text style={styles.heading}>Let’s grow together.</Text>

                        <View style={styles.fieldBlock}>
                            <Text style={styles.label}>Full name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Armina"
                                placeholderTextColor="#7E8D88"
                                value=""
                            />
                        </View>

                        <View style={styles.fieldBlock}>
                            <Text style={styles.label}>Phone number</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="+254 712 345 678"
                                placeholderTextColor="#7E8D88"
                                keyboardType="phone-pad"
                                value=""
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.primaryButton}
                            activeOpacity={0.9}
                        >
                            <Text style={styles.primaryButtonText}>
                                Create account
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.googleButton}
                            activeOpacity={0.9}
                        >
                            <View style={styles.googleMark} />
                            <Text style={styles.googleText}>
                                Sign in with Google
                            </Text>
                        </TouchableOpacity>

                        <Text style={styles.bottomText}>
                            Already have an account? Sign in
                        </Text>
                    </View>
                </Animated.View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    appShell: {
        flex: 1,
        backgroundColor: "#EFE7E1",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 18,
    },
    loader: {
        flex: 1,
        backgroundColor: "#0D453B",
    },
    deviceFrame: {
        width: "100%",
        maxWidth: 420,
        height: 760,
        borderRadius: 34,
        backgroundColor: "#0D453B",
        overflow: "hidden",
        shadowColor: "#072D26",
        shadowOpacity: 0.22,
        shadowRadius: 24,
        shadowOffset: { width: 0, height: 18 },
        elevation: 10,
        position: "relative",
    },
    screen: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#0D453B",
    },
    splashScreen: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 28,
        paddingBottom: 34,
    },
    splashGlow: {
        position: "absolute",
        width: 320,
        height: 320,
        borderRadius: 160,
        backgroundColor: "rgba(255,255,255,0.04)",
        top: 180,
    },
    brandWrap: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },
    wordmark: {
        marginTop: 18,
        color: "#F4F4F1",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 28,
        letterSpacing: 0.2,
    },
    splashTextWrap: {
        marginTop: 18,
        alignItems: "center",
    },
    splashLine: {
        color: "#F4F4F1",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 16,
        lineHeight: 24,
        opacity: 0.92,
    },
    primaryButton: {
        width: "72%",
        height: 54,
        borderRadius: 16,
        backgroundColor: "#F4F4F1",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 42,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
        elevation: 4,
    },
    primaryButtonText: {
        color: "#0D453B",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 16,
    },
    welcomeScreen: {
        backgroundColor: "#F5F0EC",
    },
    topBar: {
        height: 92,
        backgroundColor: "#0D453B",
        borderBottomLeftRadius: 26,
        borderBottomRightRadius: 26,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 22,
        paddingTop: 20,
    },
    logoBadge: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: "rgba(255,255,255,0.12)",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 4,
    },
    topBarText: {
        color: "#F7F5F4",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 18,
        marginLeft: -26,
    },
    navCircle: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: "rgba(255,255,255,0.18)",
    },
    formPanel: {
        backgroundColor: "#F5F0EC",
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        marginTop: -20,
        paddingHorizontal: 22,
        paddingTop: 26,
        paddingBottom: 28,
        flex: 1,
    },
    heading: {
        color: "#0F1F1C",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 28,
        lineHeight: 38,
        marginBottom: 24,
    },
    fieldBlock: {
        marginBottom: 18,
    },
    label: {
        color: "#4E5F5B",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 12,
        marginBottom: 8,
    },
    input: {
        width: "100%",
        height: 52,
        borderRadius: 14,
        backgroundColor: "#F6F5F3",
        borderWidth: 1,
        borderColor: "#D8D9D5",
        paddingHorizontal: 16,
        color: "#17352E",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 15,
    },
    googleButton: {
        marginTop: 18,
        width: "100%",
        height: 52,
        backgroundColor: "#E7F1EE",
        borderRadius: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    googleMark: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: "#4F8EF7",
        marginRight: 10,
    },
    googleText: {
        color: "#1A3F37",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 15,
    },
    bottomText: {
        textAlign: "center",
        marginTop: 18,
        color: "#4F5B58",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 13,
    },
});
