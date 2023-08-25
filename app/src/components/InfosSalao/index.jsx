import React from 'react'
import { View, Text, Image, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import { Cover, GradientView, } from '../../styles';

import { EXPO_PUBLIC_LOGO } from '@env';

export default function index() {

  const { salao } = useSelector((state) => state.salaoReducer);

  return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				position: 'relative',
				top: 0,
				left: 0,
				right: 0,
				zIndex: 1,
				alignItems: 'center',
			}}
		>
			<Cover
				source={{ uri: salao?.images?.[0] }}
				width={110}
				height={600}
				opacity={0.5}
				zIndex={0}
			>
				<GradientView colors={['#fff', '#fff']}></GradientView>
			</Cover>
			<View
				style={{
					position: 'absolute',
					zIndex: 999,
					alignItems: 'center',
				}}
			>
				<Text
					style={{
						fontSize: 60,
						fontWeight: 'bold',
						color: '#29335c',
						textAlign: 'center',
						position: 'relative',
						marginBottom: 20,
					}}
				>
					Localização
				</Text>
				<Image
					source={{ uri: EXPO_PUBLIC_LOGO }}
					style={{
						width: 200,
						height: 200,
						borderRadius: 200,
						zIndex: 999,
						position: 'relative',
						resizeMode: 'contain',
						alignSelf: 'center',
						marginBottom: 20,
					}}
				/>
				<Text
					style={{
						fontSize: 35,
						fontWeight: 'bold',
						color: '#29335c',
						textAlign: 'center',
						position: 'relative',
						marginBottom: 20,
					}}
				>
					BARBEARIA LISBOA
				</Text>
				<Text
					style={{
						fontSize: 25,
						fontWeight: '400',
						color: '#29335c',
						textAlign: 'center',
						position: 'relative',
						marginBottom: 20,
					}}
				>
					Rua Dom Bosco,02 - Centro {'\n'}Cachoeira do Campo - MG
				</Text>
				<TouchableOpacity
					onPress={() =>
						Linking.openURL(
							'https://wa.me/5503182667330?text=Olá, gostaria de conhecer a barbearia Lisboa!'
						)
					}
				>
					<Text
						style={{
							fontSize: 30,
							fontWeight: 'bold',
							color: '#29335c',
							textAlign: 'center',
							position: 'relative',
						}}
					>
						(31) 98266-7330
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}