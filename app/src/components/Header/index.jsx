import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableOpacity,
	Linking,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { Cover, GradientView, Container, TextInput } from '../../styles';
import theme from '../../styles/theme';
import Servicos from '../Servicos';
import InfosSalao from '../InfosSalao';
import { updateForm } from '../../store/modules/salao/actions';

export default function Header() {
	const navigation = useNavigation();
	const dispatch = useDispatch();

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
			<Cover
				source={{ uri: salao?.capa }}
				width={110}
				height={300}
				opacity={0.7}
				zIndex={0}
			>
				<GradientView colors={['#21232F33', '#5451D1']}></GradientView>
			</Cover>
			<Image
				source={{ uri: salao?.foto }}
				style={{
					width: 200,
					height: 200,
					borderRadius: 100,
					top: 200,
					zIndex: 999,
					position: 'absolute',
					resizeMode: 'contain',
					alignSelf: 'center',
				}}
			/>
			<View>
				<Cover
					source={{ uri: salao?.images?.[0] }}
					width={110}
					height={300}
					opacity={0.5}
					zIndex={0}
				>
					<GradientView colors={['#fff', '#fff']}></GradientView>
				</Cover>
				<Text style={styles.textBarbearia}>BARBEARIA LISBOA</Text>
				<Text style={styles.textAgendeSeuHorario}>
					AGENDE SEU HORÁRIO ONLINE
				</Text>
				<Text style={styles.textChamada}>
					Já é membro do Lisboa Club?{'\n'}
					Agende aqui
				</Text>
				<TouchableOpacity style={styles.buttonAgendamento}>
					<Text style={styles.textAgendamento}>AGENDE JÁ </Text>
					<Icon name='calendar-blank' size={25} color='#fff' />
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.buttonLisboa}
					onPress={() => navigation.navigate('LisboaClub')}
				>
					<Text style={styles.textLisboa}>LISBOA CLUB </Text>
					<Icon name='crown' size={25} color={theme.colors.yellow} />
				</TouchableOpacity>
			</View>

			<TouchableOpacity
				onPress={() =>
					Linking.openURL(
						'https://wa.me/5503182667330?text=Olá, gostaria de fazer parte do Lisboa Club!'
					)
				}
			>
				<Cover
					source={{ uri: salao?.images?.[1] }}
					width={100}
					height={300}
					zIndex={0}
				></Cover>
			</TouchableOpacity>
			<Container>
				<Cover
					source={{ uri: salao?.images?.[2] }}
					width={100}
					height={1000}
					zIndex={0}
					opacity={0.6}
				>
					<GradientView colors={['#fff', '#fff']}></GradientView>
				</Cover>
				<Container
					hasPadding
					direction='column'
					style={{ position: 'absolute' }}
				>
					<Text style={styles.textServicos}>Serviços({servicos?.length})</Text>
					<TextInput
						placeholder='Pesquisar serviço'
						onChangeText={(text) => dispatch(updateForm({ inputFiltro: text }))}
						onFocus={() => dispatch(updateForm({ inputFiltroFoco: true }))}
						onblur={() => dispatch(updateForm({ inputFiltroFoco: false }))}
					/>
					<Servicos servicos={finalServicos} />
				</Container>
			</Container>
			<InfosSalao />
		</>
	);
}

const styles = StyleSheet.create({
	buttonAgendamento: {
		display: 'flex',
		flexDirection: 'row',
		backgroundColor: '#29335c',
		padding: 10,
		borderRadius: 50,
		width: 200,
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 999,
		position: 'absolute',
		marginTop: 220,
		marginStart: 30,
	},
	textAgendamento: {
		color: '#fff',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 20,
	},
	buttonLisboa: {
		display: 'flex',
		flexDirection: 'row',
		backgroundColor: theme.colors.purple,
		padding: 10,
		borderRadius: 50,
		width: 200,
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 999,
		position: 'absolute',
		marginTop: 220,
		marginStart: 290,
	},
	textLisboa: {
		color: theme.colors.yellow,
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 20,
	},
	textBarbearia: {
		position: 'absolute',
		color: theme.colors.primary,
		textAlign: 'center',
		fontWeight: '900',
		fontSize: 30,
		marginTop: 100,
		alignSelf: 'center',
	},
	textAgendeSeuHorario: {
		position: 'absolute',
		color: theme.colors.yellow,
		textAlign: 'center',
		fontWeight: '900',
		fontSize: 22,
		marginTop: 140,
		alignSelf: 'center',
	},
	textChamada: {
		position: 'absolute',
		color: theme.colors.purple,
		textAlign: 'center',
		fontWeight: '600',
		fontSize: 18,
		marginTop: 170,
		marginStart: 280,
	},
	textServicos: {
		color: theme.colors.primary,
		fontWeight: '900',
		fontSize: 30,
		alignSelf: 'center',
		padding: 20,
		marginTop: 30,
	},
});
