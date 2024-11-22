import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, FlatList } from 'react-native';
import axios from 'axios';

export default function DetailScreen({ route }) {
    const { id } = route.params;
    const [anime, setAnime] = useState(null);
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnimeDetails = async () => {
            try {
                // Fetch anime details
                const animeResponse = await axios.get(`https://api.jikan.moe/v4/anime/${id}/full`);
                setAnime(animeResponse.data.data);

                // Wait 1 second before making the second request to respect API rate limiting
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Fetch characters
                const charactersResponse = await axios.get(`https://api.jikan.moe/v4/anime/${id}/characters`);
                setCharacters(charactersResponse.data.data);

                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchAnimeDetails();
    }, [id]);

    const renderCharacter = ({ item }) => (
        <View style={styles.characterCard}>
            <Image
                source={{ uri: item.character.images.jpg.image_url }}
                style={styles.characterImage}
                resizeMode="cover"
            />
            <View style={styles.characterInfo}>
                <Text style={styles.characterName} numberOfLines={2}>
                    {item.character.name}
                </Text>
                <Text style={styles.characterRole}>
                    {item.role}
                </Text>
            </View>
        </View>
    );

    if (loading) {
        return <Text style={styles.loading}>Loading Details...</Text>;
    }

    if (!anime) {
        return <Text>No anime details found</Text>;
    }

    return (
        <ScrollView style={styles.container}>
            <Image
                source={{ uri: anime.images.jpg.large_image_url }}
                style={styles.image}
                resizeMode="cover"
            />
            <Text style={styles.title}>{anime.title}</Text>

            <View style={styles.detailContainer}>
                <Text style={styles.sectionTitle}>Synopsis</Text>
                <Text style={styles.synopsis}>{anime.synopsis}</Text>

                <Text style={styles.sectionTitle}>Details</Text>
                <Text style={styles.detailText}>Type: {anime.type}</Text>
                <Text style={styles.detailText}>Episodes: {anime.episodes}</Text>
                <Text style={styles.detailText}>Status: {anime.status}</Text>
                <Text style={styles.detailText}>Rating: {anime.rating}</Text>
                <Text style={styles.detailText}>Score: {anime.score}</Text>

                <Text style={styles.sectionTitle}>Characters</Text>
                {characters.length > 0 ? (
                    <FlatList
                        data={characters}
                        renderItem={renderCharacter}
                        keyExtractor={(item) => item.character.mal_id.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={styles.characterList}
                    />
                ) : (
                    <Text style={styles.noCharacters}>No character information available</Text>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    image: {
        width: '100%',
        height: 300
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 10,
        color: '#333'
    },
    detailContainer: {
        padding: 10
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 10,
        color: '#333'
    },
    synopsis: {
        textAlign: 'justify',
        marginBottom: 10,
        lineHeight: 20,
        color: '#666'
    },
    detailText: {
        fontSize: 14,
        marginBottom: 5,
        color: '#666'
    },
    loading: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16
    },
    characterList: {
        marginTop: 10,
        marginBottom: 20
    },
    characterCard: {
        width: 120,
        marginRight: 15,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1
    },
    characterImage: {
        width: '100%',
        height: 160,
        backgroundColor: '#ddd'
    },
    characterInfo: {
        padding: 8
    },
    characterName: {
        fontSize: 13,
        fontWeight: 'bold',
        marginBottom: 2,
        color: '#333'
    },
    characterRole: {
        fontSize: 11,
        color: '#666'
    },
    noCharacters: {
        textAlign: 'center',
        color: '#666',
        fontStyle: 'italic',
        marginTop: 10
    }
});