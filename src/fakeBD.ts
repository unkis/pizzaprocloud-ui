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
            key: 2,
            article: 2,
            quantity: 10,
            productName: 'Test5',
            price: 60,
            mwst: '19',
            children: [
                {
                    key: 21,
                    parentArticle: 2,
                    article: 21,
                    productName: 'Test6',
                    price: 60,
                    mwst: '19',
                },
                {
                    key: 22,
                    mwst: '19',
                    parentArticle: 2,
                    article: 22,
                    productName: 'Test7',
                    price: 60,
                },
                {
                    key: 23,
                    parentArticle: 2,
                    article: 23,
                    mwst: '19',
                    productName: 'Test8',
                    price: 60,
                },
            ],
        },
        {
            key: 3,
            article: 3,
            quantity: 10,
            productName: 'Test9',
            price: 60,
            mwst: '19',
            children: [
                {
                    key: 31,
                    parentArticle: 3,
                    article: 31,
                    productName: 'Test10',
                    price: 60,
                    mwst: '19',
                },
                {
                    key: 32,
                    mwst: '19',
                    parentArticle: 3,
                    article: 32,
                    productName: 'Test11',
                    price: 60,
                },
                {
                    key: 33,
                    parentArticle: 3,
                    article: 33,
                    mwst: '19',
                    productName: 'Test12',
                    price: 60,
                },
            ],
        },
        {
            key: 1,
            article: 1,
            quantity: 10,
            productName: 'Test1 ghjkhbjnkvbnkm vhjk vbjnkmlgvbhjnkml yvgbhjnkm vytbnjk vbhnjkmltybuniml vbynu vytbunio',
            price: 60,
            mwst: '7',
            children: [
                {
                    key: 12,

                    parentArticle: 1,
                    article: 12,
                    productName: 'Test3',
                    price: 60,
                    mwst: '7'
                },
                {
                    key: 13,

                    parentArticle: 1,
                    article: 13,
                    productName: 'Test4',
                    price: 60,
                    mwst: '7'
                },
                {
                    key: 11,
                    parentArticle: 1,
                    article: 11,
                    productName: 'Test2',
                    price: 60,
                    mwst: '7'
                },
            ],
        },
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
    const res = fakeBD.products.map((product) => {
        const { article, productName, children } = product;
        const productChildren = children.filter(({ productName }) => productName.toString().toLowerCase().includes(searchString.toLowerCase()));
        if (productChildren.length !== 0) {
            return { ...product, children: productChildren };
        }
        const isProduct = article.toString().toLowerCase().includes(searchString.toLowerCase()) || productName.toString().toLowerCase().includes(searchString.toLowerCase());
        if (isProduct) {
            return product;
        } else {
            return null;
        }
    }).filter(Boolean);
    return res;
}
export default fakeBD;
