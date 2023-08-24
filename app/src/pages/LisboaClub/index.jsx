import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { Container, TextInput } from '../../styles';
import theme from '../../styles/theme';
import Servicos from '../../components/Servicos/index';
import { updateForm } from '../../store/modules/salao/actions';

export default function LisboaClub() {
	const navigation = useNavigation();
	const dispatch = useDispatch();

	const { cliente } = useSelector((state) => state.clienteReducer);

	const firstName = cliente.nome.split(' ')[0];

	const { salao, servicosSalao, form } = useSelector(
		(state) => state.salaoReducer
	);

	const { servicos } = servicosSalao;

	const finalServicos =
		form.inputFiltro?.length > 0
			? servicos.filter((servico) => {
					const nome = servico.nome.toLowerCase();
					const filtro = form.inputFiltro.toLowerCase().trim().split(' ');
					return filtro.every((palavra) => nome.includes(palavra));
			  })
			: servicos;

	return (
		<>
			<TouchableOpacity
				style={styles.buttonVoltar}
				onPress={() => navigation.goBack()}
			>
				<Icon name='chevron-left' size={45} color={theme.colors.primary} />
			</TouchableOpacity>
			<Text style={styles.textTitle}>Lisboa Club</Text>
			<Text style={styles.textBemVindo}>
				Olá, {firstName}!{'\n'}O Lisboa Club foi criado com a intenção de
				facilitar o seu cuidado com o visual e garantir um valor mais acessível
				para os nossos clientes.
			</Text>
			<Container style={styles.container}>
				<Container
					hasPadding
					direction='column'
					style={{ position: 'absolute' }}
				>
					<TextInput
						style={styles.input}
						placeholder='Pesquisar serviço Club'
						onChangeText={(text) => dispatch(updateForm({ inputFiltro: text }))}
						onFocus={() => dispatch(updateForm({ inputFiltroFoco: true }))}
						onblur={() => dispatch(updateForm({ inputFiltroFoco: false }))}
					/>
					<Servicos servicos={finalServicos} currentPage='LisboaClub'/>
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
		marginTop: 20,
		marginBottom: 20,
		backgroundColor: '#00000000',
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
