class BaseResult {

    constructor({exercice_name, time, in_time, results = []}){
        this.exercice_name = exercice_name;
        this.time = time;
        this.in_time = in_time;
        this.results = results; 
    }
}

export default BaseResult;