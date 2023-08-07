import React from 'react';
import {
	Text,
	FlatList,
	TouchableOpacity,
	View,
	ImageBackground,
} from 'react-native';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../../styles/theme';
import { updateAgendamento } from '../../../store/modules/salao/actions';

export default function ColaboradorPicker({
	colaboradores,
	agendamento,
	colaboradoresDia,
	horaSelecionada,
}) {
	const dispatch = useDispatch();

	const colaboradoresDisponiveisId = [];

	for (let colaboradorId of Object.keys(colaboradoresDia)) {
		let horarios = colaboradoresDia[colaboradorId].flat(2);
		if (horarios.includes(horaSelecionada)) {
			colaboradoresDisponiveisId.push(colaboradorId);
		}
	}

	const colaboradoresDisponiveis = colaboradores.filter((colaborador) =>
		colaboradoresDisponiveisId.includes(colaborador._id)
	);

	return (
		<>
			<Text
				style={{
					fontSize: 25,
					fontWeight: 900,
					marginStart: 25,
					marginTop: '10%',
					color: theme.colors.primary,
				}}
			>
				Com quem você deseja agendar?
			</Text>
			<FlatList
				data={colaboradoresDisponiveis}
				horizontal
				showsHorizontalScrollIndicator={false}
				renderItem={({ item }) => {
					const selected = agendamento.colaboradorId === item?._id;
					return (
						<TouchableOpacity
							key={item?._id}
							direction='column'
							style={{
								width: 110,
								height: 150,
								borderRadius: 30,
								marginTop: 30,
								marginStart: 20,
								alignSelf: 'center',
								alignItems: 'center',
								justifyContent: 'space-evenly',
							}}
							onPress={() =>
								dispatch(updateAgendamento({ colaboradorId: item?._id }))
							}
						>
							<View
								style={{
									width: 100,
									height: 100,
									borderRadius: 100,
									borderWidth: 2,
									borderColor: '#29335c',
									alignSelf: 'center',
									alignItems: 'center',
									justifyContent: 'center',
									overflow: 'hidden',
								}}
							>
								<ImageBackground
									source={{ uri: item?.foto }}
									style={{
										width: 100,
										height: 100,
										tintColor: selected ? theme.colors.primary : undefined,
									}}
								>
									<View
										style={{
											width: 100,
											height: 100,
											backgroundColor: selected
												? 'rgba(0, 0, 0, 0.5)'
												: undefined,
											alignItems: 'center',
											justifyContent: 'center',
										}}
									>
										<Icon
											name='check-bold'
											size={selected ? 60 : 0}
											color='#fff'
										/>
									</View>
								</ImageBackground>
							</View>

							<Text
								small
								style={{
									fontSize: 20,
									marginTop: 10,
								}}
							>
								{item?.nome}
							</Text>
						</TouchableOpacity>
					);
				}}
				keyExtractor={(item) => item?._id}
			/>
		</>
	);
}
