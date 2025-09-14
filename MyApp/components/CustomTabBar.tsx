import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 80;

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    return (
        <View style={styles.container}>
            <Svg
                width={width}
                height={TAB_BAR_HEIGHT}
                style={styles.svg}
            >
                <Path
                    d={`M 0 20 Q 0 0 20 0 L ${width / 2 - 35} 0 Q ${width / 2 - 20} 0 ${width / 2 - 20} 15 Q ${width / 2 - 5} 30 ${width / 2} 30 Q ${width / 2 + 5} 30 ${width / 2 + 20} 15 Q ${width / 2 + 20} 0 ${width / 2 + 35} 0 L ${width - 20} 0 Q ${width} 0 ${width} 20 L ${width} 60 Q ${width} 80 ${width - 20} 80 L 20 80 Q 0 80 0 60 Z`}
                    fill="white"
                    stroke="#e9ecef"
                    strokeWidth="1"
                />
            </Svg>

            <View style={styles.tabContainer}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label = options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const getIcon = () => {
                        switch (route.name) {
                            case 'index':
                                return (
                                    <Ionicons
                                        name={isFocused ? 'home' : 'home-outline'}
                                        size={24}
                                        color={isFocused ? '#1e3a8a' : '#666'}
                                    />
                                );
                            case 'prescription':
                                return (
                                    <Ionicons
                                        name={isFocused ? 'document-text' : 'document-text-outline'}
                                        size={24}
                                        color={isFocused ? '#1e3a8a' : '#666'}
                                    />
                                );
                            default:
                                return null;
                        }
                    };

                    return (
                        <TouchableOpacity
                            key={route.key}
                            onPress={onPress}
                            style={styles.tab}
                        >
                            {getIcon()}
                            <Text style={[
                                styles.tabLabel,
                                { color: isFocused ? '#1e3a8a' : '#666' }
                            ]}>
                                {label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <TouchableOpacity style={styles.scanButton}>
                <Ionicons name="scan" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: TAB_BAR_HEIGHT,
    },
    svg: {
        position: 'absolute',
        bottom: 0,
    },
    tabContainer: {
        flexDirection: 'row',
        height: TAB_BAR_HEIGHT,
        paddingBottom: 20,
        paddingTop: 10,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
        marginHorizontal: 10,
    },
    tabLabel: {
        fontSize: 12,
        marginTop: 4,
        fontWeight: '500',
    },
    scanButton: {
        position: 'absolute',
        top: -10,
        left: width / 2 - 28,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#1e3a8a',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
    },
});
