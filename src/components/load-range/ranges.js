

export const ranges = {
	'EP|EP': {
		bluff: 'AQ,KJs,ATs',
		call: 'AQs,KQs,QJs,JTs,88+',
		raise: 'AKs+,QQ+,AK',
		info: {
			span01: '+50 BBs',
			span02: 'RESPUESTA A OR 2,5X',
			messages: [
				'Mientras más chicos se hacen los stacks, tenemos MENOS CALL',
				'Con menos de 35 bbs, NO HAY calling range'
			]
		}
	},
	'MP|EP': {
		bluff: 'AQ,KJs,ATs,A5s',
		call: 'AQs,KQs,QJs,JTs,T9s,77+',
		raise: 'AKs+,QQ+,AK',
		info: {
			span01: '+50 BBs',
			span02: 'RESPUESTA A OR 2,5X',
			messages: [
				'Mientras más chicos se hacen los stacks, tenemos MENOS CALL',
				'Con menos de 35 bbs, NO HAY calling range'
			]
		}
	},
	'MP|MP': {
		bluff: 'AQ,KJs,ATs,A5s,98s+,87s+',
		call: 'AQs,KQs,QJs,JTs,T9s,66+',
		raise: 'AKs+,QQ+,AK',
		info: {
			span01: '+50 BBs',
			span02: 'RESPUESTA A OR 2,5X',
			messages: [
				'Mientras más chicos se hacen los stacks, tenemos MENOS CALL',
				'Con menos de 35 bbs, NO HAY calling range'
			]
		}
	},
	'HJ|EP': {
		bluff: 'AQ,KJs,ATs,A5s',
		call: 'AJs+,KQs,QJs,JTs,T9s,98s,66+',
		raise: 'AKs+,QQ+,AK',
		info: {
			span01: '+50 BBs',
			span02: 'RESPUESTA A OR 2,5X',
			messages: ['Mientras más chicos se hacen los stacks, tenemos MENOS CALL y más 3bet']
		}
	},
	'HJ|MP': {
		bluff: 'A5s-,AJ-AT,87s+,76s+,KQ+',
		call: 'ATs+,KTs+,QTs+,JTs,T9s,98s,55+',
		raise: 'AJs+,KQs+,QQ+,AQ+',
		info: {
			span01: '+50 BBs',
			span02: 'RESPUESTA A OR 2,5X',
			messages: ['Mientras más chicos se hacen los stacks, tenemos MENOS CALL y más 3bet']
		}
	},
	'CO|EP': {
		bluff: 'A5-A4s,AJ+',
		call: 'ATs+,KTs+,QTs+,JTs,T9s,98s,66+',
		raise: 'AQs+,QQ+,AK+',
		info: {
			span01: '+50 BBs',
			span02: 'RESPUESTA A OR 2,5X',
			messages: ['Mientras más chicos se hacen los stacks, tenemos MENOS CALL y más 3bet']
		}
	},
	'CO|MP': {
		bluff: 'A5s-A2s,AJ,KQ,87s,76s,65s,54s',
		call: 'ATs+,KTs+,QTs+,JTs,T9s,98s,44+',
		raise: 'AJs+,KQs+,QQ+,AQ+',
		info: {
			span01: '+50 BBs',
			span02: 'RESPUESTA A OR 2,5X',
			messages: ['Mientras más chicos se hacen los stacks, tenemos MENOS CALL y más 3bet']
		}
	},
	'CO|HJ': {
		bluff: 'A9s-A2s,AJ,KQ,76s,65s,54s',
		call: 'ATs+,KTs+,QTs+,JTs,T9s,98s,87s,44+',
		raise: 'AJs+,KQs+,JJ+,AQ+',
		info: {
			span01: '+50 BBs',
			span02: 'RESPUESTA A OR 2,5X',
			messages: ['Mientras más chicos se hacen los stacks, tenemos MENOS CALL y más 3bet']
		}
	},
	'BU|EP': {
		bluff: 'A5s-A2s,AJ+,KQ',
		call: 'ATs+,KTs+,QTs+,J9s+,T9s,98s,87s,76s,22+',
		raise: 'AKs+,QQ+,AK+',
		info: {
			span01: '+50 BBs',
			span02: 'RESPUESTA A OR 2,5X',
			messages: ['Mientras más chicos se hacen los stacks, tenemos MENOS CALL y más 3bet']
		}
	},
	'BU|MP': {
		bluff: 'A9s-A8s,A5s-A2s,65s,54s,AT,KJ',
		call: 'ATs+,KTs+,QTs+,J9s+,T9s,98s,87s,76s,22+,AJ,KQ',
		raise: 'AQs+,JJ+,AQ+',
		info: {
			span01: '+50 BBs',
			span02: 'RESPUESTA A OR 2,5X',
			messages: ['Mientras más chicos se hacen los stacks, tenemos MENOS CALL y más 3bet']
		}
	},
	'BU|HJ': {
		bluff: 'A8s-A2s,86s,75s,65s,54s,AT,KJ',
		call: 'A9s+,K9s+,Q9s+,J9s+,T8s+,97s+,87s,76s,22+,AJ,KQ',
		raise: 'AJs+,JJ+,AQ+',
		info: {
			span01: '+50 BBs',
			span02: 'RESPUESTA A OR 2,5X',
			messages: ['Mientras más chicos se hacen los stacks, tenemos MENOS CALL y más 3bet']
		}
	},
	'BU|CO': {
		bluff: 'A8s-A6s,A3s-A2s,K8s,Q8s,J8s,86s,75s,64s+,54s,43s,A9,KT,QJ',
		call: 'A9s+,A5s-A4s,K9s+,Q9s+,J9s+,T8s+,97s+,87s,76s,22+,AT+,KJ+',
		raise: 'AJs+,JJ+,AQ+',
		info: {
			span01: '+50 BBs',
			span02: 'RESPUESTA A OR 2,5X',
			messages: ['Mientras más chicos se hacen los stacks, tenemos MENOS CALL y más 3bet']
		}
	},
	'SB|EP': {
		bluff: 'A5s,98s,87s',
		call: 'ATs+,KJs+,QJs+,JTs+,T9s+,77+,AQ+',
		raise: 'AKs+,QQ+',
		info: {
			span01: '+50 BBs',
			span02: 'RESPUESTA A OR 2,5X',
			messages: ['Mientras más chicos se hacen los stacks, tenemos MENOS CALL y más 3bet']
		}
	},
	'SB|MP': {
		bluff: 'A5s-A4s,87s,76s,AJ',
		call: 'ATs+,KTs+,QTs+,JTs+,T9s+,98s+,55+,AQ+',
		raise: 'AQs+,QQ+,AK+',
		info: {
			span01: '+50 BBs',
			span02: 'RESPUESTA A OR 2,5X',
			messages: ['Mientras más chicos se hacen los stacks, tenemos MENOS CALL y más 3bet']
		}
	},
	'SB|HJ': {
		bluff: 'A5s-A3s,A9s,76s,65s,54s,AJ',
		call: 'ATs+,KTs+,QTs+,JTs+,T9s+,98s+,87s+,44+,AQ+',
		raise: 'AQs+,QQ+,AK+',
		info: {
			span01: '+50 BBs',
			span02: 'RESPUESTA A OR 2,5X',
			messages: ['Mientras más chicos se hacen los stacks, tenemos MENOS CALL y más 3bet']
		}
	},
	'SB|CO': {
		bluff: 'A9s-A2s,KJs-K9s,QJs-Q9s,J9s+,T9s,98s,87s,76s,99-44,65s,54s,AJ,KQ',
		raise: 'ATs+,KQs+,TT+,AQ+',
		info: {
			span01: '+50 BBs',
			span02: 'RESPUESTA A OR 2,5X',
			messages: ['Mientras más chicos se hacen los stacks, tenemos MENOS CALL y más 3bet']
		}
	},
	'SB|BU': {
		bluff: 'A9s-A2s,KJs-K9s,QJs-Q9s,J9s+,T8s+,97s+,86s+,76s,65s,54s,43s,99-22,65s,54s,AT,KJ,QJ',
		raise: 'ATs+,KJs+,TT+,AJ+,KQ+',
		info: {
			span01: '+50 BBs',
			span02: 'RESPUESTA A OR 2,5X',
			messages: ['Mientras más chicos se hacen los stacks, tenemos MENOS CALL y más 3bet']
		}
	},
	'BB|EP': {
		bluff: '86s,75s+,64s+,54s,43s',
		call: 'AJs-A2s,KQs-K5s,QJs-q7s,JTs-T7s,T9s-T7s,98s-96s,87s,JJ-22,AT+,KT+,QT+,JT+',
		raise: 'AQs+,QQ+',
		info: { span01: '+50 BBs', span02: 'RESPUESTA A OR 2,5X' }
	},
	'BB|MP': {
		bluff: '86s-85s,74s+,64s+,53s+,43s+',
		call: 'AJs-A2s,KQs-K4s,QJs-Q6s,JTs-J6s,T9s-T6s,98s-96s,87s+,TT-22,AT+,KT+,QT+,JT+',
		raise: 'AQs+,JJ+,AK+',
		info: { span01: '+50 BBs', span02: 'RESPUESTA A OR 2,5X' }
	},
	'BB|HJ': {
		bluff: '85s,76s-74s,63s+,53s+,43s+,32s,A9',
		call: 'AJs-A2s,KQs-k2s,QJs-Q4s,JTs-J5s,T9s-T5s,98s-95s,86s+,JJ-22,AT+,KT+,QT+,JT+',
		raise: 'AJs+,KQs+,TT+,AQ+',
		info: { span01: '+50 BBs', span02: 'RESPUESTA A OR 2,5X' }
	},
	'BB|CO': {
		bluff: '85s,75s+,64s+,53s+,43s+,A4o-A3o',
		call: 'A9s-A2s,KTs-k2s,QJs-Q4s,JTs-J5s,T9s-T5s,98s-95s,86s+,42s,32s,JJ-22,A8+,A5,K9+,Q9+,J9+,T9,98',
		raise: 'ATs+,KJs+,QJs+,TT+,AJ+,KQ+',
		info: { span01: '+50 BBs', span02: 'RESPUESTA A OR 2,5X' }
	},
	'BB|BU': {
		bluff: '75s+,65s+,53s+,43s+,A3o-A2o,75,65,K5o-K2o,Q6o-Q5o',
		call: 'ATs-A2s,K9s-K2s,Q9s-Q2s,J9s-J2s,T9s-T2s,98s-92s,87s-82s,76s-72s,65s-62s,54s-52s,43s-42s,32s,JJ-22,ATo-A2o,KJ-K2,QJ-Q7,JT-J6,T9-T6,98-96,87-86,76',
		raise: 'AJs+,KTs+,QTs+,JTs+,99+,AJ+,KQ+',
		info: { span01: '+50 BBs', span02: 'RESPUESTA A OR 2,5X' }
	},
	'BB|SB': {
		bluff: 'J9s,T9s-T8s,98s,87s,76s,65s,54s,A2,K3-K2,Q4-Q2,J5,T5,76-75,65-64,54',
		call: 'ATs-A2s,K9s-K2s,Q9s-Q2s,J9s-J2s,T9s-T2s,98s-92s,87s-82s,76s-72s,65s-62s,54s-52s,43s-42s,32s-32s,JJ-22,AT-A2,KJ-K2,QJ-Q2,JT-J6,T9-T6,98-96,87-86,76',
		raise: 'ATs+,KTs+,QTs+,JTs+,99+,AJ+,KQ+',
		info: { span01: '+50 BBs', span02: 'RESPUESTA A OR 3X' }
	}
};
