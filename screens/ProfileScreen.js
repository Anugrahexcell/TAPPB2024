import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

export default function ProfileScreen({ navigation }) {
    const handleLogout = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileHeader}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/150' }}
                    style={styles.avatar}
                />
                <Text style={styles.username}>JohnDoe</Text>
            </View>

            <View style={styles.infoSection}>
                <Text style={styles.header}>About AnimeWorld</Text>
                <Text>AnimeWorld adalah aplikasi untuk mengeksplorasi berbagai anime terbaru dan terpopuler menggunakan Jikan API.</Text>
            </View>

            <View style={styles.statsSection}>
                <Text style={styles.sectionTitle}>Anime Stats</Text>
                <Text>Anime Watched: 24</Text>
                <Text>Favorite Genre: Shounen</Text>
            </View>

            <Button
                title="Logout"
                onPress={handleLogout}
                color="red"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 20
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 10
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    infoSection: {
        marginBottom: 20
    },
    statsSection: {
        marginBottom: 20
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10
    }
});