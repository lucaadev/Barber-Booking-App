import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { Container } from '../../styles';
import {
	updateAgendamento,
	filterAgenda,
	updateClub,
} from '../../store/modules/salao/actions';

export default function Servicos(props) {
	const Navigation = useNavigation();

	const dispatch = useDispatch();

	const servicos = props.servicos;

	const isLisboaClubPage = props.currentPage === 'LisboaClub';

	const breakTitleIntoTwoLines = (title) => {
		const maxLength = 15;
		if (title.length > maxLength) {
			return `${title.substring(0, maxLength)}\n${title.substring(maxLength)}`;
		}
		return title;
	};

	return (
		<Container direction='column'>
			{servicos?.map((servico, index) => (
				<TouchableOpacity
					key={index}
					style={styles.buttonServico}
					onPress={() => {
						dispatch(updateAgendamento({ servicoId: servico._id }));
						dispatch(filterAgenda());
						isLisboaClubPage
							? dispatch(updateClub(true)) && Navigation.navigate('Home')
							: null;
					}}
				>
					<List.Item
						key={index}
						title={
							<View style={styles.titleContainer}>
								<Text style={styles.title}>
									{isLisboaClubPage
										? breakTitleIntoTwoLines(servico.nome + ' Club')
										: breakTitleIntoTwoLines(servico.nome)}
									{'\n'}
								</Text>
							</View>
						}
						description={
							<View style={styles.descriptionContainer}>
								<Text style={styles.description}>
									{isLisboaClubPage
										? moment(servico.duracao).format('HH:mm')
										: `R$ ${servico.valor} • ${moment(servico.duracao).format(
												'HH:mm'
										  )}`}
								</Text>
							</View>
						}
						left={() => (
							<Image
								source={{
									uri: `https://barbearia-lisboa-dev.s3.amazonaws.com/${servico?.arquivos[0]?.caminho}`,
								}}
								style={styles.imageServico}
							/>
						)}
						right={() => (
							<TouchableOpacity
								style={styles.buttonAgendamento}
								onPress={() => {
									dispatch(updateAgendamento({ servicoId: servico._id }));
									dispatch(filterAgenda());
									isLisboaClubPage
										? dispatch(updateClub(true)) && Navigation.navigate('Home')
										: null;
								}}
							>
								<Text style={styles.buttonText}>Agendar</Text>
								<Icon name='calendar-blank' size={25} color='#fff' />
							</TouchableOpacity>
						)}
					/>
				</TouchableOpacity>
			))}
		</Container>
	);
}

const styles = StyleSheet.create({
	imageServico: {
		width: 90,
		height: 90,
		borderRadius: 100,
	},
	buttonServico: {
		display: 'flex',
		alignItems: 'stretch',
		backgroundColor: '#transparent',
		paddingTop: 20,
		width: '90%',
		alignSelf: 'center',
		marginBottom: 10,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#29335c',
	},
	description: {
		fontSize: 15,
		fontWeight: '200',
		color: '#29335c',
	},
	titleContainer: {
		marginBottom: 5,
	},
	descriptionContainer: {
		marginTop: 5,
	},
	buttonAgendamento: {
		display: 'flex',
		flexDirection: 'row',
		marginTop: '4%',
		backgroundColor: '#29335c',
		padding: 10,
		borderRadius: 50,
		width: 200,
		height: 60,
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
	buttonText: {
		color: '#fff',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 20,
	},
});
