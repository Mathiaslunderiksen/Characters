const service = {};



service.getCharacters = async () => {
try {
        
    const response = await fetch('../data/list.json')
    const characters = await response.json();
    return characters;


    } catch (error) {
        console.error('Error fetching or parsing data:', error);
        }

}

export default service;