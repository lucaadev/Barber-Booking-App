import React, { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	Alert,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { TextInputMask } from 'react-native-masked-text';

import { useDispatch, useSelector } from 'react-redux';

import api from '../../../../app/src/services/api';

import { updateCliente } from '../../store/modules/cliente/actions';
import consts from '../../consts';

export default function Register() {
	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useDispatch();
	const Navigation = useNavigation();

	const { cliente } = useSelector((state) => state.clienteReducer);

	const setCliente = (key, value) => {
		dispatch(updateCliente({ cliente: { ...cliente, [key]: value } }));
	};

	const handleRegister = async () => {
		try {
			setIsLoading(true);
			if (cliente.telefone === '' || cliente.nome === '') {
				Alert.alert(
					'Campo(s) vazio(s)',
					'Preencha todos os campos',
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
				const response = await api.post('/cliente', {
					salaoId: consts.salaoId,
					cliente: {
						nome: cliente.nome,
						telefone: cliente.telefone,
					},
				});

        if(response.data === 'Conta atualizada com sucesso.' ) {
          Alert.alert(
						'Sucesso',
						response.data,
						[
							{
								text: 'Ok',
							},
						],
						{ cancelable: true }
					);
        } else {
          Alert.alert(
            'Sucesso',
            response.data,
            [
              {
                text: 'Ok',
              },
            ],
            { cancelable: true }
          );
        }
				Navigation.goBack();
			}
		} catch (error) {
			Alert.alert(
				'Erro ao cadastrar',
				'Você já possui cadastro, deseja fazer login?',
				[
					{
						text: 'Sim',
						onPress: () => Navigation.goBack(),
					},
					{
						text: 'Não',
						style: 'cancel',
					},
				],
				{ cancelable: true }
			);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		setCliente('telefone', '');
		setCliente('nome', '');
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Crie ou Atualize sua conta</Text>
			<Text style={styles.label}>Nome</Text>
			<TextInput
				style={styles.input}
				placeholder='Digite seu nome'
				value={cliente.nome}
				onChangeText={(text) => setCliente('nome', text)}
			/>
			<Text style={styles.label}>Telefone</Text>
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
				style={styles.button}
				onPress={handleRegister}
				disabled={isLoading}
			>
				{isLoading ? (
					<ActivityIndicator color='#29335c' />
				) : (
					<Text style={styles.textSingIn}>Registrar</Text>
				)}
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.button}
				onPress={() => Navigation.goBack()}
			>
				<Text style={styles.textSingIn}>Voltar</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingHorizontal: '5%',
		paddingTop: '10%',
	},
	title: {
		fontSize: 22,
		fontFamily: 'Ubuntu_700Bold',
		color: '#29335c',
		marginBottom: '5%',
	},
	label: {
		fontSize: 16,
		fontFamily: 'Ubuntu_400Regular',
		color: '#29335c',
		marginBottom: '2%',
	},
	input: {
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#29335c',
		marginBottom: '5%',
		fontFamily: 'Ubuntu_400Regular',
	},
	button: {
		backgroundColor: '#FDB02F',
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 10,
		marginBottom: '2%',
	},
	textSingIn: {
		color: '#29335c',
		textAlign: 'center',
		fontSize: 16,
		fontFamily: 'Ubuntu_700Bold',
	},
});
