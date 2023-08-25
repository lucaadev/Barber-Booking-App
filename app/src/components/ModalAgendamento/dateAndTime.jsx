import React, { memo } from 'react';
import { Text, TouchableOpacity, FlatList, View } from 'react-native';
import { useDispatch } from 'react-redux';
import moment from 'moment/min/moment-with-locales';
import { Container } from '../../styles';
import theme from '../../styles/theme';
import { updateAgendamento } from '../../store/modules/salao/actions';
import selectAgendamento from '../../utils/selectAgendamento';

moment.locale('pt-br');

const DateItem = memo(({ date, dateISO, selected, setAgendamento, index }) => {
	return (
		<TouchableOpacity
			key={index}
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
});

const TimeItem = memo(
	({ subarray, subarrayIndex, horaSelecionada, setAgendamento }) => (
		<Container direction='column' wrap='wrap'>
			{subarray.map((time, timeIndex) => {
				const selected = time === horaSelecionada;
				const uniqueKey = `${subarrayIndex}-${timeIndex}`;
				return (
					<TouchableOpacity
						key={uniqueKey}
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
	)
);

const DateAndTime = memo(
	({ agenda, dataSelecionada, horaSelecionada, horariosDisponiveis }) => {
		const dispatch = useDispatch();

		let wrongHours = [];

		const now = moment();

		const currentDate = now.isSame(dataSelecionada, 'day');

		if (currentDate) {
			const currentHour = now.format('HH:mm');
			horariosDisponiveis.forEach((item) => {
				item.forEach((time) => {
					if (time < currentHour) {
						wrongHours.push(time);
					}
				});
			});
		}

		horariosDisponiveis.map((item) => {
			return item.map((time) => {
				if (time > '19:20' || (time >= '12:00' && time < '13:00')) {
					wrongHours.push(time);
				} else {
					return null;
				}

				wrongHours = wrongHours.filter((item) => item !== null);
			});
		});

		const filteredHours = horariosDisponiveis.map((item) => {
			return item.filter((time) => !wrongHours.includes(time));
		});

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
						renderItem={({ item, index }) => (
							<DateItem
								index={index}
								date={moment(Object.keys(item)[0])}
								dateISO={moment(moment(Object.keys(item)[0])).format(
									'YYYY-MM-DD'
								)}
								selected={
									moment(moment(Object.keys(item)[0])).format('YYYY-MM-DD') ===
									dataSelecionada
								}
								setAgendamento={setAgendamento}
							/>
						)}
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
						data={filteredHours}
						horizontal
						showsHorizontalScrollIndicator={false}
						ListEmptyComponent={() => (
							<View>
								<Text
									style={{
										fontSize: 15,
										fontWeight: 400,
										marginStart: 25,
										marginTop: 20,
										color: theme.colors.primary,
									}}
								>
									Puxa, não há horários disponíveis para a data escolhida.
								</Text>
							</View>
						)}
						renderItem={({ item: subarray, index: subarrayIndex }) => (
							<TimeItem
								subarray={subarray}
								subarrayIndex={subarrayIndex}
								horaSelecionada={horaSelecionada}
								setAgendamento={setAgendamento}
							/>
						)}
						keyExtractor={(_item, index) => index.toString()}
					/>
				</Container>
			</>
		);
	}
);

export default DateAndTime;
