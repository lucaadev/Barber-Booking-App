import React, { useEffect } from 'react';
import BottomSheet from 'reanimated-bottom-sheet';
import { useDispatch } from 'react-redux';
import {
	ActivityIndicator,
	ScrollView,
	Dimensions,
	ImageBackground,
	Text,
} from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'react-native-paper';
import ModalHeader from './modalHeader';
import Resume from './resume';
import DateAndTime from './dateAndTime';
import ColaboradorPicker from './Colaboradores';
import { GradientView, Container } from '../../styles';
import theme from '../../styles/theme';
import { updateForm, saveAgendamento } from '../../store/modules/salao/actions';
import selectAgendamento from '../../utils/selectAgendamento';
import moment from 'moment';

export default function ModalAgendamento() {
	const dispatch = useDispatch();

	const { form, agendamento, servicosSalao, agenda, colaboradores, salao, horariosVazios } =
		useSelector((state) => state.salaoReducer);

	const { servicos } = servicosSalao;

	const servico = servicos?.find(
		(servico) => servico._id === agendamento.servicoId
	);

	const dataSelecionada = moment(agendamento.data).format('YYYY-MM-DD');
	const horaSelecionada = moment(agendamento.data).format('HH:mm');

	const { horariosDisponiveis, colaboradoresDia } =
		selectAgendamento.selectAgendamento(
			agenda,
			dataSelecionada,
			agendamento.colaboradorId
		);

	const bottomSheetRef = React.useRef(null);

	useEffect(() => {
		if (form.modalAgendamento !== null) {
			handleSnapTo(form.modalAgendamento);
		}
	}, [form.modalAgendamento]);

	const handleSnapTo = (index) => {
		if (index === 0) {
			bottomSheetRef.current.snapTo(0);
			dispatch(updateForm({ modalAgendamento: null }));
		} else {
			bottomSheetRef.current.snapTo(index);
		}
	};

	return (
		<>
			<BottomSheet
				ref={bottomSheetRef}
				initialSnap={0}
				snapPoints={[
					0,
					Dimensions.get('window').height - 1007,
					Dimensions.get('window').height - 0,
				]}
				enabledGestureInteraction={true}
				renderContent={() => (
					<ScrollView
						style={{
							backgroundColor: 'white',
							height: '100%',
						}}
					>
						<ModalHeader handleSnap={handleSnapTo} />
						<ImageBackground
							source={{ uri: salao?.images?.[2] }}
							style={{
								position: 'absolute',
								width: '100%',
								height: '100%',
								opacity: 0.8,
							}}
							resizeMode='cover'
						>
							<GradientView colors={['#fff', '#fff']}></GradientView>
						</ImageBackground>
						<Resume servico={servico} />
						{agenda.length > 0 && (
							<>
								<DateAndTime
									horariosDisponiveis={horariosDisponiveis}
									servico={servico}
									agenda={agenda}
									dataSelecionada={dataSelecionada}
									horaSelecionada={horaSelecionada}
								/>
								<ColaboradorPicker
									colaboradores={colaboradores}
									agendamento={agendamento}
									servico={servico}
									horaSelecionada={horaSelecionada}
									colaboradoresDia={colaboradoresDia}
									horariosVazios={horariosVazios}
								/>
								<Button
									loading={form.agendamentoLoading}
									disabled={form.agendamentoLoading || horariosVazios}
									mode='contained'
									uppercase={false}
									style={{
										margin: 20,
										borderRadius: 10,
										marginTop: '10%',
										backgroundColor: theme.colors.primary,
										height: 80,
										alignItems: 'center',
										justifyContent: 'center',
									}}
									labelStyle={{
										fontSize: 25,
										fontWeight: 'bold',
										color: '#fff',
										padding: 10,
									}}
									onPress={() => {
										dispatch(saveAgendamento());
									}}
								>
									{form.agendamentoLoading ? (
										<ActivityIndicator color='#29335c' />
									) : (
										<Icon
											name='check'
											size={35}
											color='#fff'
											style={{ marginEnd: 20 }}
										/>
									)}
									Confirmar agendamento
								</Button>
							</>
						)}
						{agenda.length === 0 && (
							<Container
								justify='center'
								align='center'
								haspadding
								height={`${Math.floor(
									Dimensions.get('window').height - 200
								)}px`}
								style={{
									flexDirection: 'column',
								}}
							>
								<ActivityIndicator size='large' color={theme.colors.primary} />
								<Text
									style={{
										fontSize: 45,
										fontWeight: 900,
										marginStart: 25,
										color: theme.colors.primary,
									}}
								>
									Só um instante...
								</Text>
								<Text
									style={{
										fontSize: 20,
										fontWeight: 300,
										marginStart: 25,
										color: theme.colors.primary,
									}}
								>
									Estamos buscando os horários disponíveis
								</Text>
							</Container>
						)}
					</ScrollView>
				)}
				enabledContentGestureInteraction={false}
				enabledInnerScrolling={false}
			/>
		</>
	);
}
