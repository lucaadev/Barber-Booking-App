import React, { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	Alert,
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/core';
import { TextInputMask } from 'react-native-masked-text';

import { useDispatch, useSelector } from 'react-redux';

import api from '../../../../app/src/services/api';

import { updateCliente } from '../../store/modules/cliente/actions';
import { getSalao } from '../../store/modules/salao/actions';

import infos from '../../../src/consts';

export default function SignIn() {
	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useDispatch();
	const Navigation = useNavigation();

	const { cliente } = useSelector((state) => state.clienteReducer);

	const setCliente = (key, value) => {
		dispatch(updateCliente({ cliente: { ...cliente, [key]: value } }));
	};

	const submitLogin = async () => {
		try {
			setIsLoading(true);
			if (cliente.telefone === '') {
				Alert.alert(
					'Campo vazio',
					'Preencha o campo telefone!',
					[
						{
							text: 'Ok',
						},
					],
					{ cancelable: true }
				);
			} else if (cliente.telefone.length < 14) {
				Alert.alert(
					'Telefone inválido.',
					'Preencha o campo telefone corretamente!',
					[
						{
							text: 'Ok',
						},
					],
					{ cancelable: true }
				);
			} else {
				const response = await api.post('/login', {
					telefone: cliente.telefone,
				});

				dispatch(
					updateCliente({
						cliente: {
							...cliente,
							id: response.data.id,
							nome: response.data.nome,
							token: response.data.token,
						}
					}),
					dispatch(getSalao())
				);
				Navigation.navigate('Home');
			}
		} catch (error) {
			if (error.response.status === 502) {
				Alert.alert(
					'Erro no servidor',
					`No momento nosso servidor está fora do ar,
tente novamente mais tarde.`,
					[
						{
							text: 'Ok',
						},
					],
					{ cancelable: true }
				);
			} else {
				Alert.alert(
					'Usuário não cadastrado',
					'Esse telefone não está cadastrado, deseja cadastrar?',
					[
						{
							text: 'Sim',
							onPress: () => Navigation.navigate('Register'),
						},
						{
							text: 'Não',
							style: 'cancel',
						},
					],
					{ cancelable: true }
				);
			}
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		setCliente('telefone', '');
	}, []);

	return (
		<View style={styles.container}>
			<Image
				source={require('../../../assets/fundo-login.jpg')}
				style={{
					width: '100%',
					height: '100%',
					opacity: 0.2,
					position: 'absolute',
				}}
				resizeMode='cover'
			/>
			<Animatable.Image
				animation={'fadeIn'}
				delay={500}
				source={{ uri: infos.logo }}
				style={{
					borderRadius: 100,
					width: 200,
					height: 200,
					top: '15%',
					marginBottom: '65%',
					alignSelf: 'center',
				}}
				resizeMode='contain'
			/>
			<Animatable.View style={styles.containerForm} animation='fadeInUpBig'>
				<Animatable.View
					style={styles.containerHeader}
					animation='fadeInLeftBig'
				>
					<Text style={styles.bemVindo}>Bem-vindo(a)!</Text>
				</Animatable.View>
				<Text style={styles.title}>Telefone</Text>
				<TextInputMask
					style={styles.input}
					type={'custom'}
					options={{
						mask: '(99)99999-9999',
					}}
					placeholder='Digite seu telefone'
					keyboardType='numeric'
					maxLength={14}
					value={cliente.telefone}
					onChangeText={(text) => setCliente('telefone', text)}
				/>
				<TouchableOpacity
					style={styles.buttonSignIn}
					onPress={() => submitLogin()}
					disabled={isLoading}
				>
					{isLoading ? (
						<ActivityIndicator color='#29335c' />
					) : (
						<Text style={styles.textSingIn}>Entrar</Text>
					)}
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.buttonRegister}
					onPress={() => Navigation.navigate('Register')}
				>
					<Text style={styles.textRegister}>
						Ainda não cortou com a gente? Cadastre-se aqui.
					</Text>
				</TouchableOpacity>
			</Animatable.View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	containerHeader: {
		marginTop: '5%',
		marginBottom: '5%',
	},
	containerForm: {
		flex: 1,
		elevation: 15,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: -2 },
		shadowOpacity: 1,
		backgroundColor: '#fff',
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		paddingStart: '5%',
		paddingEnd: '5%',
	},
	bemVindo: {
		fontSize: 28,
		fontFamily: 'Ubuntu_700Bold',
		color: '#29335c',
	},
	title: {
		fontSize: 22,
		marginTop: '5%',
		fontFamily: 'Ubuntu_700Bold',
		color: '#29335c',
	},
	input: {
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#29335c',
		marginBottom: '10%',
		fontFamily: 'Ubuntu_400Regular',
	},
	buttonSignIn: {
		width: '100%',
		padding: 20,
		backgroundColor: '#FDB02F',
		borderRadius: 10,
		marginBottom: '2%',
	},
	buttonRegister: {
		marginTop: '8%',
		alignSelf: 'center',
	},
	textSingIn: {
		color: '#29335c',
		textAlign: 'center',
		fontSize: 20,
		fontFamily: 'Ubuntu_700Bold',
	},
	textRegister: {
		color: '#29335c',
		textAlign: 'center',
		fontSize: 16,
		opacity: 0.5,
		fontFamily: 'Ubuntu_400Regular',
	},
	errorText: {
		color: '#f00',
		textAlign: 'center',
		fontSize: 16,
		opacity: 0.5,
		position: 'absolute',
		fontFamily: 'Ubuntu_400Regular',
	},
});
