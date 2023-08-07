import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import React from 'react';
import { useNavigation } from '@react-navigation/core';

export default function Welcome() {
  const navigation = useNavigation();
  return (
		<View style={styles.container}>
			<Image
				source={require('../../../assets/corteDeCabelo.jpg')}
				style={{
					width: '100%',
					opacity: 0.3,
					flex: 1,
					marginBottom: 500,
				}}
				resizeMode='cover'
			/>
			<Animatable.View
        style={styles.containerForm}
        animation='fadeInUpBig'
        delay={500}
      >
				<Text
					style={styles.title}
				>
					Estilo, precisão e confiança: {'\n'}
          a barbearia que cuida do seu visual.
				</Text>
				<Text style={styles.subtitle}>
					Faça login para continuar
				</Text>
				<TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
					<Text style={styles.welcomeEnter}>Entrar</Text>
				</TouchableOpacity>
			</Animatable.View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		flex: 1,
		justifyContent: 'center',
	},
	containerLogo: {},
	containerForm: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		height: '50%',
		marginTop: 100,
		justifyContent: 'space-around',
		backgroundColor: '#fff',
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		paddingStart: '5%',
		paddingEnd: '5%',
	},
	title: {
		fontSize: 24,
		textAlign: 'center',
		fontFamily: 'Ubuntu_700Bold',
		marginTop: 28,
		marginBottom: 12,
	},
	subtitle: {
		fontSize: 16,
		fontFamily: 'Ubuntu_400Regular',
		textAlign: 'center',
		opacity: 0.5,
	},
	button: {
		backgroundColor: '#29335c',
		padding: 15,
		borderRadius: 50,
		bottom: 5,
	},
	welcomeEnter: {
		color: '#fff',
		textAlign: 'center',
		fontFamily: 'Ubuntu_700Bold',
		fontSize: 16,
	},
});