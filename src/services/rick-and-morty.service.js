import axios from 'axios';
import BaseResult from '../model/base-result.model.js';
import { apiUrl } from '../utils/apiUrl.js';
import { timeFormat } from '../utils/time-format.js';

class RickAndMortyService {

    async chartCounter() {

        const initialTime = Date.now();

        const [locations, episodes, characters] = await Promise.all([
            this.getAllDataFromEndpoint('location', 'name', 'l'),
            this.getAllDataFromEndpoint('episode', 'name', 'e'),
            this.getAllDataFromEndpoint('character', 'name', 'c')
        ]);


        const numberRepetedLocations = this.getNumberRepetedCharacters(locations, 'L');
        const numberRepetedEpisodes = this.getNumberRepetedCharacters(episodes, 'e');
        const numberRepetedCharacters = this.getNumberRepetedCharacters(characters, 'C');

        const finalTime = Date.now() - initialTime;
        const format =  timeFormat(finalTime);

        return new BaseResult(
            {
                exercice_name: 'chartCounter',
                time: format[0],
                in_time: format[1] < 3.000,
                result: [
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
    

    async getAllDataFromEndpoint(resource, filter, char) {

        const requests = [];

        const resourceFirstPage = await axios.get(`${apiUrl}${resource}/?${filter}=${char}`);
        const pages = resourceFirstPage.data.info.pages;

        for (let index = 2; index <= pages; index++) {
            requests.push(axios.get(`${apiUrl}${resource}/?page=${index}&${filter}=${char}`));
        }

        const recourseRemainingPages = await Promise.all(requests);
        const recourseRemainingPagesOrginized = recourseRemainingPages.map(item => {
            return item.data.results;
        })

        return [...resourceFirstPage.data.results, ...recourseRemainingPagesOrginized.flat()]

    }

    getNumberRepetedCharacters(data, character) {

        let charactersNumber = 0;
        let newregex = new RegExp("[" + character + "]", "gi")

        for (const item of data) {
            charactersNumber += item.name?.match(newregex).length;
        }

        return charactersNumber;
    }

}

export default new RickAndMortyService();