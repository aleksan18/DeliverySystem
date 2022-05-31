/**
 * Generates a string with length 4 with characters or numbers from `[a-z],[A-Z],[0-9]
 * @returns  A semi-randomly generated string
 */
const generator = ()=>(Math.random().toString(36)+'00000000000000000').substring(2,6);



module.exports ={
    generator
}