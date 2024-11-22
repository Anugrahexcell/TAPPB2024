import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';

export default function MangaScreen({ navigation }) {
    const [mangaList, setMangaList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://api.jikan.moe/v4/manga')
            .then(response => {
                setMangaList(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    const renderMangaItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('MangaDetail', {
                id: item.mal_id,
                title: item.title
            })}
        >
            <Image
                source={{ uri: item.images.jpg.small_image_url }}
                style={styles.image}
            />
            <View style={styles.textContainer}>
                <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.author}>
                    {item.authors?.map(author => author.name).join(', ') || 'Unknown Author'}
                </Text>
                <Text style={styles.genre}>
                    {item.genres?.map(g => g.name).join(', ')}
                </Text>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return <Text style={styles.loading}>Loading Manga...</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Manga List</Text>
            <FlatList
                data={mangaList}
                keyExtractor={(item) => item.mal_id.toString()}
                renderItem={renderMangaItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff'
    },
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
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1
    },
    image: {
        width: 50,
        height: 75,
        marginRight: 10,
        borderRadius: 3
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 2
    },
    author: {
        fontSize: 13,
        color: '#666',
        marginBottom: 2
    },
    genre: {
        color: 'gray',
        fontSize: 12
    },
    loading: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16
    }
});