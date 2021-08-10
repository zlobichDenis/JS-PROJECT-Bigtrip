const pointsOfDestination = [
    {
        'description': 'some desc',
        'name': 'Amsterdam',
        'picture': [{
                'picture': `http://picsum.photos/248/152?r=${Math.random()}`, 
                'description': 'Some desc',
            }],
    },
    {
        'description': 'some desc',
        'name': 'London',
        'picture': [{
                'picture': `http://picsum.photos/248/152?r=${Math.random()}`, 
                'description': 'Some desc',
            }],
    },
    {
        'description': 'some desc',
        'name': 'Paris',
        'picture': [{
                'picture': `http://picsum.photos/248/152?r=${Math.random()}`, 
                'description': 'Some desc',
            }],
    },
    {
        'description': 'some desc',
        'name': 'Moscow',
        'picture': [{
                'picture': `http://picsum.photos/248/152?r=${Math.random()}`, 
                'description': 'Some desc',
            }],
    },
];

const offers = [
    {
        'type': 'taxi',
        'offers': [
            {
                "title": "Upgrade to a business class",
                "price": 120,
            }, 
            {
                "title": "Choose the radio station",
                "price": 60,
            },
            {
                'title': 'Order Uber',
                'price': 20,
            }
        ],
    },{
        'type': 'flight',
        'offers': [
            {
                "title": "Upgrade to a business class",
                "price": 120,
            }, 
            {
                "title": "Chose seats",
                "price": 5,
            },
            {
                'title': 'add meal',
                'price': 15,
            },
            {
                'title': 'add luggage',
                'price': 30,
            }
        ],
    },{
        'type': 'train',
        'offers': [
            {
                "title": "Upgrade to a business class",
                "price": 120,
            }, 
            {
                "title": "Chose seats",
                "price": 5,
            },
        ],
    }, {
        'type': 'ship',
        'offers': [
            {
                "title": "Upgrade to a business class",
                "price": 120,
            }, 
            {
                "title": "Chose seats",
                "price": 5,
            },
        ],
    },{
        'type': 'bus',
        'offers': [
            {
                "title": "Upgrade to a business class",
                "price": 120,
            }, 
            {
                "title": "Chose seats",
                "price": 5,
            },
            {
                "title": "Choose the radio station",
                "price": 60,
            },
        ],
    }, {
        'type': 'transport',
        'offers': [
            {
                "title": "Upgrade to a business class",
                "price": 120,
            }, 
            {
                "title": "Chose seats",
                "price": 5,
            },
            {
                "title": "Choose the radio station",
                "price": 60,
            },
        ],
    }, {
        'type': 'drive',
        'offers': [
            {
                "title": "Rent a car",
                "price": 200,
            }, 
        ],
    },  {
        'type': 'check-in',
        'offers': [
            {
                "title": "Add breakfest",
                "price": 50,
            }
        ],
    },  {
        'type': 'sightseeing',
        'offers': [
            {
                "title": "Book tickets",
                "price": 40,
            }, 
            {
                "title": "Lunch in city",
                "price": 30,
            }
        ],
    },  {
        'type': 'restaurant',
        'offers': [
            {
                "title": "Breakfest",
                "price": 120,
            }, 
            {
                "title": "Lunch",
                "price": 60,
            }
        ],
    }, 
];

export {pointsOfDestination, offers};