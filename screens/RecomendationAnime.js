import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';

export default function RecommendationScreen({ navigation }) {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://api.jikan.moe/v4/recommendations/anime')
            .then(response => {
                setRecommendations(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    const renderRecommendationItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Detail', {
                id: item.entry[0].mal_id,
                title: item.entry[0].title
            })}
        >
            <Image
                source={{ uri: item.entry[0].images.jpg.image_url }}
                style={styles.image}
            />
            <View style={styles.textContainer}>
                <Text style={styles.title} numberOfLines={1}>
                    {item.entry[0].title}
                </Text>
                <Text style={styles.content} numberOfLines={2}>
                    {item.content}
                </Text>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loading}>Loading Recommendations...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Recommended For You</Text>
            <FlatList
                data={recommendations}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderRecommendationItem}
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10
    },
    item: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#f5f5f5',
        marginBottom: 10,
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1
    },
    image: {
        width: 100,
        height: 150,
        borderRadius: 4,
        marginRight: 10
    },
    textContainer: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5
    },
    content: {
        fontSize: 14,
        color: '#666'
    },
    loading: {
        fontSize: 16,
        color: '#666'
    }
});