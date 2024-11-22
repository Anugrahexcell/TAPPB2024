import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import axios from 'axios';

export default function DetailScreenManga({ route }) {
    const { id } = route.params;
    const [mangaDetail, setMangaDetail] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://api.jikan.moe/v4/manga/${id}`)
            .then(response => {
                setMangaDetail(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.loadingText}>Loading manga details...</Text>
            </View>
        );
    }

    if (!mangaDetail) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Failed to load manga details</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <Image
                    source={{ uri: mangaDetail.images.jpg.large_image_url }}
                    style={styles.image}
                    resizeMode="cover"
                />
                <Text style={styles.title}>{mangaDetail.title}</Text>
                {mangaDetail.title_english && (
                    <Text style={styles.englishTitle}>{mangaDetail.title_english}</Text>
                )}
            </View>

            <View style={styles.infoContainer}>
                <View style={styles.statsRow}>
                    <InfoBox label="Score" value={mangaDetail.score || 'N/A'} />
                    <InfoBox label="Rank" value={`#${mangaDetail.rank || 'N/A'}`} />
                    <InfoBox label="Popularity" value={`#${mangaDetail.popularity || 'N/A'}`} />
                </View>

                <View style={styles.detailSection}>
                    <DetailItem label="Status" value={mangaDetail.status} />
                    <DetailItem label="Chapters" value={mangaDetail.chapters || 'Ongoing'} />
                    <DetailItem label="Volumes" value={mangaDetail.volumes || 'N/A'} />
                    <DetailItem
                        label="Genres"
                        value={mangaDetail.genres.map(genre => genre.name).join(', ')}
                    />
                    <DetailItem
                        label="Authors"
                        value={mangaDetail.authors.map(author => author.name).join(', ')}
                    />
                    <DetailItem
                        label="Published"
                        value={`${mangaDetail.published.from ? new Date(mangaDetail.published.from).getFullYear() : 'N/A'} - ${
                            mangaDetail.published.to ? new Date(mangaDetail.published.to).getFullYear() : 'Ongoing'
                        }`}
                    />
                </View>

                <View style={styles.synopsisContainer}>
                    <Text style={styles.sectionTitle}>Synopsis</Text>
                    <Text style={styles.synopsis}>{mangaDetail.synopsis}</Text>
                </View>

                {mangaDetail.background && (
                    <View style={styles.backgroundContainer}>
                        <Text style={styles.sectionTitle}>Background</Text>
                        <Text style={styles.background}>{mangaDetail.background}</Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

const InfoBox = ({ label, value }) => (
    <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
    </View>
);

const DetailItem = ({ label, value }) => (
    <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>{label}:</Text>
        <Text style={styles.detailValue}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
    },
    headerContainer: {
        alignItems: 'center',
        padding: 15,
    },
    image: {
        width: 200,
        height: 300,
        borderRadius: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
    },
    englishTitle: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
        marginTop: 5,
    },
    infoContainer: {
        padding: 15,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    infoBox: {
        alignItems: 'center',
        flex: 1,
    },
    infoLabel: {
        fontSize: 14,
        color: '#666',
    },
    infoValue: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    detailSection: {
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    detailItem: {
        flexDirection: 'row',
        paddingVertical: 5,
    },
    detailLabel: {
        width: 80,
        fontSize: 14,
        fontWeight: 'bold',
    },
    detailValue: {
        flex: 1,
        fontSize: 14,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    synopsisContainer: {
        marginBottom: 20,
    },
    synopsis: {
        fontSize: 14,
        lineHeight: 20,
        color: '#333',
    },
    backgroundContainer: {
        marginBottom: 20,
    },
    background: {
        fontSize: 14,
        lineHeight: 20,
        color: '#333',
    },
});