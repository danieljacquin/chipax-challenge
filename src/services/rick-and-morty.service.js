import axios from 'axios';
import BaseResult from '../model/base-result.model.js';
import { apiUrl } from '../utils/apiUrl.js';
import getNumberRepetedCharacters from '../utils/get-number-repered-characters.js';
import { timeFormat } from '../utils/time-format.js';

class RickAndMortyService {


    async challengefullResponse() {
        const fullResponse = await  Promise.all([
            this.chartCounter(),
            this.episodeLocations()
        ])

        return fullResponse;
    }

    async chartCounter() {

        const initialTime = Date.now();

        const [locations, episodes, characters] = await Promise.all([
            this.getAllDataFromEndpoint('location', 'name', 'l'),
            this.getAllDataFromEndpoint('episode', 'name', 'e'),
            this.getAllDataFromEndpoint('character', 'name', 'c')
        ]);


        const numberRepetedLocations = getNumberRepetedCharacters(locations, 'L');
        const numberRepetedEpisodes = getNumberRepetedCharacters(episodes, 'e');
        const numberRepetedCharacters = getNumberRepetedCharacters(characters, 'C');

        const finalTime = Date.now() - initialTime;
        const format = timeFormat(finalTime);

        return new BaseResult(
            {
                exercice_name: 'chartCounter',
                time: format[0],
                in_time: format[1] < 3.000,
                results: [
                    {
                        char: "l",
                        count: numberRepetedLocations,
                        resource: "location"
                    },
                    {
                        char: "e",
                        count: numberRepetedEpisodes,
                        resource: "episode"
                    },
                    {
                        char: "c",
                        count: numberRepetedCharacters,
                        resource: "character"
                    }
                ]
            }
        )

    }

    async episodeLocations() {
        const initialTime = Date.now();

        const [characters, episodes] = await Promise.all([
            this.getAllDataFromEndpoint("character"),
            this.getAllDataFromEndpoint("episode")
        ])


        let results = [];
        for (const item of episodes) {

            let episode = {
                name: item.name,
                episode: item.episode,
            };
            let locations = [];
            for (const character of characters) {
                if (item.characters.includes(character.url)) {
                    if (!locations.includes(character.origin.name)) {
                        locations.push(character.origin.name);
                    }
                }
            }
            episode.locations = locations;
            results.push(episode);
        }

        const finalTime = Date.now() - initialTime;
        const format = timeFormat(finalTime);

        return new BaseResult(
            {
                exercice_name: 'Episode locations',
                time: format[0],
                in_time: format[1] < 3.000,
                results
            }
        )

    }

    async getAllDataFromEndpoint(resource = "", filter = "", char = "") {

        const requests = [];

        const resourceFirstPage = await axios.get(`${apiUrl}${resource}${filter && "/?"}${filter}${char && "="}${char}`);
        const pages = resourceFirstPage.data.info.pages;

        for (let index = 2; index <= pages; index++) {
            requests.push(axios.get(`${apiUrl}${resource}/?page=${index}${filter && "&"}${filter}${char && "="}${char}`));
        }

        const recourseRemainingPages = await Promise.all(requests);

        const recourseRemainingPagesOrginized = recourseRemainingPages.map(item => {
            return item.data.results;
        })

        return [...resourceFirstPage.data.results, ...recourseRemainingPagesOrginized.flat()]

    }

}

export default new RickAndMortyService();