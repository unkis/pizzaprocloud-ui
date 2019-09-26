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
    products: [
        {
            id: 1,
            article: '1',
            productName: 'Pizza Margherita',
            price: 10.00,
            tax: '19',
            type: 'product'
        },
        {
            id: 2,
            article: '1k',
            productName: 'Pizza Margherita klein',
            price: 5.0,
            tax: '19',
            type: 'product'
        },
        {
            id: 3,
            article: '105',
            productName: 'Salat Capri',
            price: 10.00,
            tax: '7',
            type: 'product'
        },
        {
            id: 4,
            article: '105g',
            productName: 'Salat capri groß',
            price: 15.00,
            tax: '7',
            type: 'product'
        },
        {
            id: 5,
            productName: 'Ananas',
            price: 1.00,
            tax: '19',
            type: 'addition'
        },
        {
            id: 6,
            productName: 'Salami',
            price: 0.50,
            tax: '19',
            type: 'addition'
        },
        {
            id: 7,
            productName: 'kl. Tomaten',
            price: 0.50,
            tax: '19',
            type: 'addition'
        },
        {
            id: 8,
            productName: 'ohne Zwiebeln',
            price: 0.00,
            tax: '19',
            type: 'addition'
        },
        {
            id: 9,
            productName: 'extra Käse',
            price: 1.00,
            tax: '7',
            type: 'addition'
        },
        {
            id: 10,
            productName: 'extra Käse gross',
            price: 1.50,
            tax: '7',
            type: 'addition'
        }
    ]

};
export const auth = (login: string, password: string) => {
    if (login === 'test' && password === 'test') {
        return { role: 'admin' };
    }
    return null;
}

export const searchProducts: any = (searchString: string) => {
    if (searchString === '') {
        return fakeBD.products.slice(0, 10);
    }
    searchString = searchString.toLowerCase();
    const res = fakeBD.products.filter((product) => {
        const { article, productName } = product;
        const isProduct = (article && article.toLowerCase().includes(searchString.toLowerCase())) || productName.toLowerCase().includes(searchString.toLowerCase());
        return isProduct;
    });
    return res;
}
export default fakeBD;
