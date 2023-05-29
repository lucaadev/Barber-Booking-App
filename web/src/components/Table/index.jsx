import { Table } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;

const tableComponent = ({ data, config, actions, onRowClick, content, loading }) => {
	return (
		<Table
      loading={loading}
			style={{ zIndex: 1, position: 'relative' }}
			onRowClick={onRowClick}
			height={400}
			data={data}
		>
			{config.map((c, index) => (
				<Column
					key={index}
					flexGrow={!c.width ? 1 : 0}
					width={c.width}
					fixed={c.fixed}
				>
					<HeaderCell>{c.label}</HeaderCell>
					{!c.content ? (
						<Cell dataKey={c.key} />
					) : (
						<Cell>{(cliente) => c.content(cliente)}</Cell>
					)}
				</Column>
			))}
			<Column width={130} fixed='right'>
				<HeaderCell>Ações</HeaderCell>
				<Cell>{(item) => actions(item)}</Cell>
			</Column>
		</Table>
	);
};

export default tableComponent;
