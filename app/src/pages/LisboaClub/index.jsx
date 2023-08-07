import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { Container, TextInput } from '../../styles';
import theme from '../../styles/theme';
import Servicos from '../../components/Servicos/index';

export default function LisboaClub() {
	const navigation = useNavigation();

	const { cliente } = useSelector((state) => state.clienteReducer);

  const firstName = cliente.nome.split(' ')[0];

	return (
		<>
			<TouchableOpacity
				style={styles.buttonVoltar}
				onPress={() => navigation.goBack()}
			>
				<Icon name='chevron-left' size={45} color={theme.colors.primary} />
			</TouchableOpacity>
			<Text style={styles.textTitle}>Lisboa Club</Text>
			<Text style={styles.textBemVindo}>Olá, {firstName}!{'\n'}
      O Lisboa Club foi criado com a intenção de facilitar o seu cuidado com o visual e garantir um valor mais acessível para os nossos clientes.</Text>
			<Container style={styles.container}>
				<Container
					hasPadding
					direction='column'
					style={{ position: 'absolute' }}
				>
					<TextInput placeholder='Pesquisar serviço Club' />
					<Servicos currentPage='LisboaClub'/>
				</Container>
			</Container>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		display: 'flex',
		flexDirection: 'column',
	},
	textTitle: {
		fontSize: 80,
		color: theme.colors.purple,
		textAlign: 'center',
		marginBottom: 20,
		fontFamily: 'GreatVibes_400Regular',
	},
	textBemVindo: {
		color: theme.colors.primary,
		fontSize: 35,
		fontFamily: 'Ubuntu_400Regular',
		margin: 20,
	},
	textServicos: {
		color: theme.colors.primary,
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	input: {
		backgroundColor: '#fff',
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 15,
		marginBottom: 20,
		borderWidth: 1,
		borderColor: theme.colors.primary,
		fontSize: 16,
	},
	buttonVoltar: {
		flexDirection: 'row',
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'flex-start',
	},
	textVoltar: {
		color: theme.colors.primary,
		fontSize: 18,
		marginLeft: 10,
	},
});
