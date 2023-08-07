import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';

import { FlatList } from 'react-native';

import { useDispatch } from 'react-redux';
import { getSalao, allServicos, updateAgendamento } from '../../store/modules/salao/actions';

import Header from '../../components/Header';
import ModalAgendamento from '../../components/ModalAgendamento';

export default function Home() {
	const dispatch = useDispatch();

	const { cliente } = useSelector((state) => state.clienteReducer);

	useEffect(() => {
		dispatch(getSalao());
		dispatch(allServicos());
		dispatch(updateAgendamento({ clienteId: cliente.id }));
	}, []);

	return (
		<>
			<FlatList ListHeaderComponent={Header} />
			<ModalAgendamento />
		</>
	);
}
