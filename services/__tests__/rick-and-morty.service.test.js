import rickAndMortyService from "../rick-and-morty.service"

test('try if char counter meets performance', async() => {
    const charCounter = await rickAndMortyService.chartCounter();
    expect(charCounter.in_time).toBe(true)
});

test('try if episode locations meets performance', async() => {
    const episodeLocations = await rickAndMortyService.episodeLocations();
    expect(episodeLocations.in_time).toBe(true)
});