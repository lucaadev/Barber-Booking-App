import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Container, GradientView } from '../../styles';
import theme from '../../styles/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { updateClub } from '../../store/modules/salao/actions';

export default function ModalHeader({ handleSnap }) {
	const dispatch = useDispatch();

	return (
		<View style={styles.headerContainer}>
			<GradientView
				colors={[theme.colors.dark, theme.colors.purple]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 0 }}
			>
				<Container>
					<TouchableOpacity
						style={styles.button}
						onPress={() => {
							dispatch(updateClub(false));
							handleSnap(0);
						}}
					>
						<Icon name='chevron-left' size={30} color={theme.colors.white} />
						<View style={{ marginLeft: '10%' }}>
							<Text
								style={{
									color: theme.colors.white,
									fontSize: 20,
									marginBottom: 5,
								}}
							>
								Finalizar Agendamento
							</Text>
							<Text
								small
								style={{
									color: theme.colors.white,
									fontWeight: '200',
									opacity: 0.8,
								}}
							>
								Escolha o profissional, o horário e o especialista.
							</Text>
						</View>
					</TouchableOpacity>
				</Container>
			</GradientView>
		</View>
	);
}

const styles = StyleSheet.create({
	headerContainer: {
		width: '100%',
		height: 80,
		zIndex: 2,
	},
	button: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 10,
		padding: 10,
		paddingStart: '8%',
		paddingEnd: '35%',
	},
});
