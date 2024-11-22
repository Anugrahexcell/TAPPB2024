import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import all screens
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import TopAnimeScreen from './screens/TopAnimeScreen';
import ProfileScreen from './screens/ProfileScreen';
import MangaScreen from './screens/MangaScreen';
import DetailScreenManga from './screens/DetailScreenManga';
import RecommendationScreen from './screens/RecomendationAnime'; // Import RecommendationScreen

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="AnimeList"
                component={HomeScreen}
                options={{ title: 'Anime List' }}
            />
            <Stack.Screen
                name="Detail"
                component={DetailScreen}
                options={({ route }) => ({
                    title: route.params.title || 'Anime Details'
                })}
            />
        </Stack.Navigator>
    );
}

function MangaStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MangaList"
                component={MangaScreen}
                options={{ title: 'Manga List' }}
            />
            <Stack.Screen
                name="MangaDetail"
                component={DetailScreenManga}
                options={({ route }) => ({
                    title: route.params.title || 'Manga Details',
                    headerTitleStyle: {
                        fontSize: 18,
                    },
                })}
            />
        </Stack.Navigator>
    );
}

function RecommendationStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="RecommendationList"
                component={RecommendationScreen}
                options={{ title: 'Recommendations' }}
            />
            <Stack.Screen
                name="Detail"
                component={DetailScreen}
                options={({ route }) => ({
                    title: route.params.title || 'Anime Details'
                })}
            />
        </Stack.Navigator>
    );
}

function MainTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    switch(route.name) {
                        case 'Home':
                            iconName = focused ? 'home' : 'home-outline';
                            break;
                        case 'Manga':
                            iconName = focused ? 'book' : 'book-outline';
                            break;
                        case 'TopAnime':
                            iconName = focused ? 'trophy' : 'trophy-outline';
                            break;
                        case 'Recommendation':
                            iconName = focused ? 'star' : 'star-outline';
                            break;
                        case 'Profile':
                            iconName = focused ? 'person' : 'person-outline';
                            break;
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeStackNavigator}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Manga"
                component={MangaStackNavigator}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Recommendation"
                component={RecommendationStackNavigator}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="TopAnime"
                component={TopAnimeScreen}
                options={{ title: 'Top Anime' }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ title: 'Profile' }}
            />
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Main"
                    component={MainTabNavigator}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}