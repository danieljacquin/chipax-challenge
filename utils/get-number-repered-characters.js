const getNumberRepetedCharacters =  (data, character) => {

    let charactersNumber = 0;
    let newregex = new RegExp("[" + character + "]", "gi");

    for (const item of data) {
        charactersNumber += item.name?.match(newregex).length;
    }

    return charactersNumber;
}

export default getNumberRepetedCharacters;