class BaseResult {

    constructor({exercice_name, time, in_time, result = []}){
        this.exercice_name = exercice_name;
        this.time = time;
        this.in_time = in_time;
        this.result = result; 
    }
}

export default BaseResult;