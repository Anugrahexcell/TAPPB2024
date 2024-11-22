import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://api.jikan.moe/v4/anime')
            .then(response => {
                setAnimeList(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    const renderAnimeItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Detail', { id: item.mal_id })}
        >
            <Image
                source={{ uri: item.images.jpg.small_image_url }}
                style={styles.image}
            />
            <View style={styles.textContainer}>
                <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.genre}>{item.genres.map(g => g.name).join(', ')}</Text>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return <Text style={styles.loading}>Loading Anime...</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Anime List</Text>
            <FlatList
                data={animeList}
                keyExtractor={(item) => item.mal_id.toString()}
                renderItem={renderAnimeItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
    item: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#f0f0f0',
        marginBottom: 10,
        borderRadius: 5
    },
    image: {
        width: 50,
        height: 75,
        marginRight: 10
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    genre: {
        color: 'gray',
        fontSize: 12
    },
    loading: {
        textAlign: 'center',
        marginTop: 20
    }
});