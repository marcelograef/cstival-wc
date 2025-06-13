export const RENDER_TABS = [
    {
        label: 'Open Raise',
        layout: 'OR',
        category: 'openraising',
        situation: 'OpenRaise',
        onlyTable: true
    },
    {
        label: 'Respuesta al OR',
        layout: 'ROR',
        category: 'respuesta-or',
        situation: 'ResponseOR',
        onlyTable: true
    },
    {
        label: 'Respuesta 3Bet',
        layout: 'RES3',
        category: 'respuesta-3bet',
        situation: 'Response3Bet',
        onlyTable: true
    },
    {
        label: 'ROL',
        layout: 'ROL',
        category: 'raise-over-limp',
        situation: 'ROL',
        onlyTable: true
    },
    {
        label: 'Push por Stack',
        layout: 'PUSH',
        category: 'push-stack',
        situation: 'PushPositionStack',
        onlyTable: false
    },
    {
        label: 'Calculadora Buy-In',
        layout: 'CALC',
        category: 'CALC',
        situation: 'BuyInCalculator',
        onlyTable: false
    }
];

export const ADMIN_TABS = [
    {
        label: 'Load Range',
        layout: 'LOAD',
        category: 'load-range',
        situation: 'LoadRange',
        onlyTable: false
    }
];

export const STACK_SIZES = [
    { value: '100bb', label: '100bb' },
    { value: '60bb', label: '60bb' },
    { value: '40bb', label: '40bb' },
    { value: '30bb', label: '30bb' },
    { value: '20bb', label: '20bb' },
    { value: '15bb', label: '15bb Push' },
    { value: '10bb', label: '10bb Push' }
];
