import React from 'react';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons'
import logoImg from '../../assets/logo.png';
import { useNavigation, useRoute } from '@react-navigation/native'
import * as MailComposer from "expo-mail-composer";
import styles from './styles';

export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute();
    
    const incident = route.params.incident;
    const  message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(incident.value)}`;

    function navigateBack() {
        navigation.goBack();
    }

    function sendMail(params) {
        MailComposer.composeAsync({
            subject: `Hero: ${incident.title}`,
            recipients: [incident.email],
            body: message,
        })
    }

    function sendWhatsapp(params) { 
        Linking.openURL(`whatsapp://send?text=${message}&phone=${incident.whatsapp}`)
    }
        
    return (
        <View style={ styles.container }>
            <View style={ styles.header }>
                <Image source={logoImg} />
                <TouchableOpacity onPress={ navigateBack }>
                    <Feather name="arrow-left" size={28} color="#E82041" />
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, { marginTop:0 }]}>NGO:</Text>
                <Text style={styles.incidentValue}>{incident.name} from {incident.city}/{incident.uf}</Text>

                <Text style={styles.incidentProperty}>INCIDENT:</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>
                
                <Text style={styles.incidentProperty}>VALUE:</Text>
                <Text style={styles.incidentValue}>
                    {Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(incident.value)}
                </Text>

            </View>
            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Save the day!</Text>
                <Text style={styles.heroTitle}>Be the hero of this incident.</Text>
                
                
                <Text style={styles.heroDescription}>Get in touch:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={ sendWhatsapp }>
                        <Text style={styles.actionText}>Whatsapp</Text> 
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={ sendMail }>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}