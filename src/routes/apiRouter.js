import {Router} from 'express';
import rickAndMortyController from '../controllers/rick-and-morty.controller.js';


const router = Router();

router.get('/', rickAndMortyController.getCharCounter);

export default router;