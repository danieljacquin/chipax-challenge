
## Installation
`npm install`

## Running the app
```bas
# production mode
$ npm run start
```

Runs the app in the development mode. Open http://localhost:5000/api/chipax-challenge to view it in the browser.

## Response schema
The response contains the following structure.

```js
[
    {
        "exercice_name": "chartCounter",
        "time": "1s 8ms",
        "in_time": true,
        "results": [
            {
                "char": "l",
                "count": 82,
                "resource": "location"
            },
            {
                "char": "e",
                "count": 88,
                "resource": "episode"
                        },
            {
                "char": "c",
                "count": 494,
                "resource": "character"
            }
        ]
    },
    {
        "exercice_name": "Episode locations",
        "time": "1s 14ms",
        "in_time": true,
        "results": [
            {
                "name": "Pilot",
                "episode": "S01E01",
                "locations": [
                "Earth (C-137)",
                "unknown",
                "Bepis 9",
                "Gromflom Prime",
                "Girvonesk"
                ]
            }
        ]
    }    
]       
```