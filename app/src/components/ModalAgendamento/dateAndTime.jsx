import React from 'react';
import { Text, TouchableOpacity, FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import moment from 'moment/min/moment-with-locales';
import { Container } from '../../styles';
import theme from '../../styles/theme';
import { updateAgendamento } from '../../store/modules/salao/actions';
import selectAgendamento from '../../utils/selectAgendamento';

moment.locale('pt-br');

export default function dateAndTime({
	agenda,
	dataSelecionada,
	horaSelecionada,
	horariosDisponiveis,
}) {
	const dispatch = useDispatch();

	const uniqueKeysSet = new Set();
	const uniqueDates = [];

	agenda.forEach((item) => {
		const date = Object.keys(item)[0];
		const professionals = Object.keys(item[date]);
		professionals.forEach((professionalId) => {
			const uniqueKey = `${date}-${professionalId}`;
			uniqueKeysSet.add(uniqueKey);
		});

		if (!uniqueDates.includes(date)) {
			uniqueDates.push(date);
		}
	});

	const uniqueKeys = Array.from(uniqueKeysSet);

	const setAgendamento = (date, time = false) => {
		const { horariosDisponiveis } = selectAgendamento.selectAgendamento(
			agenda,
			time ? dataSelecionada : date
		);
		let data = !time
			? `${date}T${horariosDisponiveis[0][0]}`
			: `${dataSelecionada}T${date}`;

		dispatch(updateAgendamento({ data }));
	};

	return (
		<>
			<Container direction='column'>
				<Text
					style={{
						fontSize: 25,
						fontWeight: 900,
						marginStart: 25,
						marginTop: '5%',
						position: 'absolute',
						color: theme.colors.primary,
					}}
				>
					Escolha a data do agendamento:
				</Text>
				<FlatList
					style={{ marginTop: 60 }}
					data={agenda}
					horizontal
					showsHorizontalScrollIndicator={false}
					renderItem={({ item }) => {
						const date = moment(Object.keys(item)[0]);
						const dateISO = moment(date).format('YYYY-MM-DD');
						const selected = dateISO === dataSelecionada;
						return (
							<TouchableOpacity
								key={dateISO}
								style={{
									width: 110,
									height: 140,
									borderWidth: 3,
									borderColor: '#29335c',
									borderRadius: 30,
									marginTop: 20,
									marginStart: 25,
									direction: 'column',
									alignSelf: 'center',
									alignItems: 'center',
									justifyContent: 'space-evenly',
									backgroundColor: selected ? theme.colors.primary : '#fff',
								}}
								onPress={() => setAgendamento(dateISO)}
							>
								<Text
									small
									style={{
										color: selected ? '#fff' : undefined,
										fontSize: 20,
										marginTop: 10,
									}}
								>
									{selectAgendamento.diasDaSemana[date.day()]}
								</Text>
								<Text
									small
									style={{
										color: selected ? '#fff' : undefined,
										fontSize: 60,
										fontWeight: 'bold',
									}}
								>
									{date.format('DD')}
								</Text>
								<Text
									small
									style={{
										color: selected ? '#fff' : undefined,
										fontSize: 20,
										marginBottom: 10,
									}}
								>
									{date.format('MMMM')}
								</Text>
							</TouchableOpacity>
						);
					}}
					keyExtractor={(_item, index) => uniqueKeys[index]}
				/>
				<Text
					style={{
						fontSize: 25,
						fontWeight: 900,
						marginStart: 25,
						marginTop: '10%',
						color: theme.colors.primary,
					}}
				>
					Que horas?
				</Text>
				<FlatList
					data={horariosDisponiveis}
					horizontal
					showsHorizontalScrollIndicator={false}
					renderItem={({ item }) => (
						<Container direction='column' wrap='wrap'>
							{item.map((time) => {
								const isLunchTime = time >= '12:00' && time <= '13:00';
								const selected = time === horaSelecionada;
								if (isLunchTime) {
									return null;
								}
								return (
									<TouchableOpacity
										key={time}
										style={{
											width: 150,
											height: 35,
											marginTop: 20,
											marginBottom: 10,
											marginStart: 25,
											marginEnd: 10,
											backgroundColor: selected ? '#29335c' : '#fff',
											borderRadius: 30,
											justifyContent: 'center',
											alignItems: 'center',
											borderColor: '#29335c',
											borderWidth: 3,
										}}
										onPress={() => setAgendamento(time, true)}
									>
										<Text
											small
											style={{
												color: selected ? '#fff' : undefined,
												fontSize: 25,
											}}
										>
											{time}
										</Text>
									</TouchableOpacity>
								);
							})}
						</Container>
					)}
					keyExtractor={(_item, index) => uniqueKeys[index]}
				/>
			</Container>
		</>
	);
}
