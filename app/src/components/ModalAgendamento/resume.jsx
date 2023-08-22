import React from 'react';
import { useSelector } from 'react-redux';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import theme from '../../styles/theme';
import { EXPO_PUBLIC_BUCKET_URL } from '@env'

export default function Resume({ servico }) {
	const { club } = useSelector((state) => state.salaoReducer);

	return (
		<View style={styles.mainContainer}>
			<Image
				source={{
					uri: `${EXPO_PUBLIC_BUCKET_URL}${servico?.arquivos[0]?.caminho}`,
				}}
				style={styles.imageContainer}
			/>
			<View style={styles.infoContainer}>
				<Text style={styles.title}>
					{club ? `${servico?.nome}\nclub` : servico?.nome}
				</Text>
				<Text small style={styles.subtitle}>
					Adicionais: xxxxxxxx{'\n'}
				</Text>
				<Text small style={styles.subtitle}>
					Total R$ {servico?.valor}
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	mainContainer: {
		marginStart: 25,
		marginTop: '5%',
		alignItems: 'center',
		flexDirection: 'row',
	},
	imageContainer: {
		width: 120,
		height: 120,
		borderRadius: 100,
	},
	infoContainer: {
		marginStart: 25,
		justifyContent: 'center',
		flexDirection: 'column',
	},
	title: {
		fontSize: 30,
		fontWeight: 900,
		color: theme.colors.primary,
	},
	subtitle: {
		color: theme.colors.muted,
		fontWeight: '200',
		opacity: 0.7,
	},
});
