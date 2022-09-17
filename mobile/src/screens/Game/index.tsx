import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from "@react-navigation/native"
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { GameParams } from '../../@types/navigation';
import { Entypo } from '@expo/vector-icons'


import logoImg from '../../assets/logo-nlw-esports.png'

import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';
import { Duocard, DuoCardProps } from '../../components/Duocard';

import { styles } from './styles';
import { THEME } from '../../theme';


export function Game() {

    const navigation = useNavigation();
    const route = useRoute();
    const game = route.params as GameParams;

    function handleGoBack() {
        navigation.goBack();
    }

    const [duos, setDuos] = useState<DuoCardProps[]>([]);

    useEffect(() => {
        fetch(`http://192.168.0.124:3333/games/${game.id}/ads`)
            .then(response => response.json())
            .then(data => setDuos(data))
    }, [])

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack}>
                        <Entypo
                            name="chevron-thin-left"
                            color={THEME.COLORS.CAPTION_300}
                            size={20}
                        />
                    </TouchableOpacity>

                    <Image
                        source={logoImg}
                        style={styles.logo}
                    />

                    <View style={styles.right} />
                </View>

                <Image
                    source={{ uri: game.bannerUrl }}
                    style={styles.cover}
                    resizeMode="cover"
                />

                <Heading
                    title={game.title}
                    subtitle="Conecte-se e comece a jogar!"
                />

                <FlatList
                    data={duos}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Duocard
                            data={item}
                            onConnect={() => { }}
                        />
                    )}
                    horizontal
                    style={styles.containerList}
                    contentContainerStyle={duos.length > 0 ? styles.contentList : { flex: 1, alignItems: 'center', justifyContent: 'center' }}
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <Text style={styles.emptyListText}>
                            Ainda não há anúncios publicados.
                        </Text>
                    )}
                />
            </SafeAreaView>
        </Background>
    );
}