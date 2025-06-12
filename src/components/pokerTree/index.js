// src/components/PokerTree.jsx
import React, { useCallback } from 'react';
import ReactFlow, { Background, Controls, MiniMap, useNodesState, useEdgesState, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
	{
		id: '1',
		position: { x: 0, y: 0 },
		data: { label: 'Hero OR a 2bb (BTN)' },
		type: 'default'
	},
	{
		id: '2',
		position: { x: -150, y: 150 },
		data: { label: 'Villano foldea (30%)' }
	},
	{
		id: '3',
		position: { x: 0, y: 150 },
		data: { label: 'Villano paga (50%)' }
	},
	{
		id: '4',
		position: { x: 150, y: 150 },
		data: { label: 'Villano 3-bet (20%)' }
	}
];

const initialEdges = [
	{ id: 'e1-2', source: '1', target: '2', label: 'Fold' },
	{ id: 'e1-3', source: '1', target: '3', label: 'Call' },
	{ id: 'e1-4', source: '1', target: '4', label: '3-bet' }
];

export default function PokerTree() {
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
	const onConnect = useCallback(params => setEdges(eds => addEdge(params, eds)), []);

	return (
		<div style={{ width: '100%', height: '80vh' }}>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				fitView
			>
				<MiniMap />
				<Controls />
				<Background />
			</ReactFlow>
		</div>
	);
}
