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
                "isChecked": false,
            }, 
            {
                "title": "Choose the radio station",
                "price": 60,
                "isChecked": true,
            },
            {
                'title': 'Order Uber',
                'price': 20,
                "isChecked": false,
            }
        ],
    },{
        'type': 'flight',
        'offers': [
            {
                "title": "Upgrade to a business class",
                "price": 120,
                "isChecked": false,
            }, 
            {
                "title": "Chose seats",
                "price": 5,
                "isChecked": false,
            },
            {
                'title': 'add meal',
                'price': 15,
                "isChecked": false,
            },
            {
                'title': 'add luggage',
                'price': 30,
                "isChecked": false,
            }
        ],
    },{
        'type': 'train',
        'offers': [
            {
                "title": "Upgrade to a business class",
                "price": 120,
                "isChecked": false,
            }, 
            {
                "title": "Chose seats",
                "price": 5,
                "isChecked": false,
            },
        ],
    }, {
        'type': 'ship',
        'offers': [
            {
                "title": "Upgrade to a business class",
                "price": 120,
                "isChecked": false,
            }, 
            {
                "title": "Chose seats",
                "price": 5,
                "isChecked": false,
            },
        ],
    },{
        'type': 'bus',
        'offers': [
            {
                "title": "Upgrade to a business class",
                "price": 120,
                "isChecked": false,
            }, 
            {
                "title": "Chose seats",
                "price": 5,
                "isChecked": false,
            },
            {
                "title": "Choose the radio station",
                "price": 60,
                "isChecked": false,
            },
        ],
    }, {
        'type': 'transport',
        'offers': [
            {
                "title": "Upgrade to a business class",
                "price": 120,
                "isChecked": false,
            }, 
            {
                "title": "Chose seats",
                "price": 5,
                "isChecked": false,
            },
            {
                "title": "Choose the radio station",
                "price": 60,
                "isChecked": false,
            },
        ],
    }, {
        'type': 'drive',
        'offers': [
            {
                "title": "Rent a car",
                "price": 200,
                "isChecked": false,
            }, 
        ],
    },  {
        'type': 'check-in',
        'offers': [
            {
                "title": "Add breakfest",
                "price": 50,
                "isChecked": false,
            }
        ],
    },  {
        'type': 'sightseeing',
        'offers': [
            {
                "title": "Book tickets",
                "price": 40,
                "isChecked": false,
            }, 
            {
                "title": "Lunch in city",
                "price": 30,
                "isChecked": false,
            }
        ],
    },  {
        'type': 'restaurant',
        'offers': [
            {
                "title": "Breakfest",
                "price": 120,
                "isChecked": false,
            }, 
            {
                "title": "Lunch",
                "price": 60,
                "isChecked": false,
            }
        ],
    }, 
];

export {pointsOfDestination, offers};