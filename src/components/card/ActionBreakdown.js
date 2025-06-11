import React from 'react';
import './index.scss';

const ActionBreakdown = ({ children, actions, ...props }) => {
	const colorLabels = {
		allIn: 'Allin',
		raise: 'Raise',
		call: 'Call',
		fold: 'Fold'
	};

	return (
		<div className="rtc_graph_legend no-scroll-track" {...props}>
			<h2 className="title">{children}</h2>
			{['allIn', 'raise', 'call', 'fold'].map((actionKey, i) => {
				const percentage = actions[actionKey] || 0;
				const bet = actions[`${actionKey}Bet`] || ''; // optional

				return (
					<div key={i} className="rtc_graph_legend_item" data-tst={`rtc_action_${i}`}>
						<span>
							{colorLabels[actionKey]} <span className="htc_graph_legend_item_bet">{bet}</span>
						</span>
						<span>{percentage}</span>
					</div>
				);
			})}
		</div>
	);
};

export default ActionBreakdown;
