import rickAndMortyService from "../services/rick-and-morty.service.js";

class RickAndMortyController {


    async getCharCounter(req, res){
        try {
            const result = await  rickAndMortyService.challengefullResponse();
            res.json(result);
        } catch (error) {
            console.log(error); 
        }
    }

}

export default new RickAndMortyController();

