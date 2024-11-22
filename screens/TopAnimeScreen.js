import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import axios from 'axios';

export default function TopAnimeScreen() {
    const [topAnime, setTopAnime] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://api.jikan.moe/v4/top/anime')
            .then(response => {
                setTopAnime(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    const renderTopAnimeItem = ({ item, index }) => (
        <View style={styles.item}>
            <Text style={styles.rank}>#{index + 1}</Text>
            <Image
                source={{ uri: item.images.jpg.small_image_url }}
                style={styles.image}
            />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text>Score: {item.score}</Text>
            </View>
        </View>
    );

    if (loading) {
        return <Text style={styles.loading}>Loading Top Anime...</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Top Anime</Text>
            <FlatList
                data={topAnime}
                keyExtractor={(item) => item.mal_id.toString()}
                renderItem={renderTopAnimeItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10
    },
    item: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#f0f0f0',
        marginBottom: 10,
        borderRadius: 5,
        alignItems: 'center'
    },
    rank: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10
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
    loading: {
        textAlign: 'center',
        marginTop: 20
    }
});