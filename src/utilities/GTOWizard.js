fetch(
	'https://api.gtowizard.com/v4/solutions/spot-solution/?gametype=Cash6m500zGeneral&depth=40&stacks=&preflop_actions=R2-F-C-C&flop_actions=&turn_actions=&river_actions=&board=',
	{
		headers: {
			accept: 'application/json, text/plain, */*',
			'accept-language': 'es-ES,es;q=0.9',
			authorization:
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ5NjY2NTg1LCJpYXQiOjE3NDk1OTY3NzMsImp0aSI6IjU3ZWYxOWY5NjFlMjQ1NDFiZjA4NDFjMjM0MDhmODE0IiwicHVibGljX2lkIjoiYWNjXzcwbnMxem00d3QiLCJlbWFpbCI6Im1hcmNlbG8uZ3JhZWZAZ21haWwuY29tIn0.oxFsVhuvZgmwHSrI2jnSqBOeMcN21dJNXhgPpZBjzCA',
			gwclientid: '47ef749f-37d4-4ca6-a844-140493c242ff',
			'sec-ch-ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
			'sec-ch-ua-mobile': '?0',
			'sec-ch-ua-platform': '"macOS"',
			'sec-fetch-dest': 'empty',
			'sec-fetch-mode': 'cors',
			'sec-fetch-site': 'same-site'
		},
		referrer: 'https://app.gtowizard.com/',
		referrerPolicy: 'strict-origin-when-cross-origin',
		body: null,
		method: 'GET',
		mode: 'cors',
		credentials: 'include'
	}
);
