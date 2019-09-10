const fakeBD = {
    customers: [
        {
            customerNumber: 1
        },
        {
            customerNumber: 2
        },
        {
            customerNumber: 3
        },
        {
            customerNumber: 33,
            phoneNumber: 89821251216,
            deliveryCost: '2,50',
            name: 'Дмитрий',
            street: 'Уличная',
            houseNumber: '16',
            plz: '123456',
            city: 'Москва',
        },
        {
            customerNumber: 333
        }
    ],

};
export const auth = (login: string, password: string) => {
    if (login === 'test' && password === 'test') {
        return { role: 'admin' };
    }
    return null;
}

export default fakeBD;
