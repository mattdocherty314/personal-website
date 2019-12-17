function pageLoad() {
    let startButton = document.getElementById("start");
    startButton.addEventListener("click", main);
}

function main() {
    let progressElement = document.getElementById("progress");
    progressElement.innerHTML = "";
    let outputElement = document.getElementById("output");
    outputElement.innerHTML = "";

    let values = getValues();

    outputElement.innerHTML += `wantGene = '${values["want-gene"]}'\n`;
    outputElement.innerHTML += `${values["num-gen"]} generations\n`;
    outputElement.innerHTML += `${values["num-species"]} species\n`;
    outputElement.innerHTML += `${(1/values["mutate-chance"]).toPrecision(2)}% mutate chance\n`;

    predictTime(values["num-gen"], values["num-species"], values["want-gene"], progressElement);

    window.setTimeout(() => {
        startEvolution(values, progressElement, outputElement);
    }, 1);
}

function customSort(fitnessSpecies) {
    let arraySorted = false;
    while (!arraySorted) {
        swapped = false;
        for (let f = 0; f < fitnessSpecies-2; f++) {
            let speciesAFitness = parseFloat(fitnessSpecies[f].split(":")[1]);
            let speciesBFitness = parseFloat(fitnessSpecies[f+1].split(":")[1]);
            if (speciesAFitness > speciesBFitness) {
                let fitnessSpeciesTEMP = fitnessSpecies[f];
                fitnessSpecies[f] = fitnessSpecies[f+1];
                fitnessSpecies[f+1] = fitnessSpeciesTEMP;
                swapped = true;
            }
        }
        if (!swapped) {
            arraySorted = true;
        }
    }
    return fitnessSpecies;
}

function integerRandom(a, b) {
    return parseInt(Math.random()*(b-a)+a);
}

function getValues() {
    let wantGeneElement = document.getElementById("want-gene");
    let mutateChanceElement = document.getElementById("mutate-chance");
    let numSpeciesElement = document.getElementById("num-species");
    let numGenElement = document.getElementById("num-gen");

    return {
        "want-gene": wantGeneElement.value,
        "mutate-chance": parseInt(mutateChanceElement.value),
        "num-species": parseInt(numSpeciesElement.value),
        "num-gen": parseInt(numGenElement.value)
    }
}

function predictTime(numGen, numSpecies, wantGene, element) {
    let seconds = (numGen * numSpecies * (wantGene.length/20))/2000;
    element.innerHTML += `Estimated Time to Complete: ${seconds} seconds,<br/>`;
    let minutes = seconds/60;
    element.innerHTML += `OR ${minutes} minutes,<br/>`;
    let hours = minutes/60;
    element.innerHTML += `OR ${hours} hours.<br/>`;
}

function startEvolution(values, progress, output) {
    const chromosomes = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
                         'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
                         's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' ',
                         '1', '2', '3', '4', '5', '6', '7', '8', '9',
                         '0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
                         'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q',
                         'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
                         '`', '~', '!', '@', '#', '$', '%', '^', '&',
                         '(', ')', '-', '_', '=', '+', '[', '{', ']',
                         '}', ';', "'", ',', '.'];
    
    let generation = 0;

    let numGen = values["num-gen"];
    let numSpecies = values["num-species"];
    let mutateChance = values["mutate-chance"];
    let wantGene = values["want-gene"];

    let species = generateRandomSpecies(numSpecies, wantGene, chromosomes);

    while (generation < numGen) {
        output.innerHTML += "-------------------------------------------------------------------\n";
        output.innerHTML += `Generation: ${generation}\n`;
        output.innerHTML += "Species:\n(new)\n";
        output.innerHTML += `${species.join(", ")}\n`;

        let speciesFitness = evaluateFitness(species, wantGene);
        
        output.innerHTML += "Fitness:\n";
        output.innerHTML += `${speciesFitness.join(", ")}\n`;

        speciesFitness = customSort(speciesFitness);
        species = removeLowerHalf(speciesFitness, species, wantGene);
        speciesFitness = [];

        species = breedGenes(species);
        species = createMutations(species, mutateChance, chromosomes);

        generation++;
    }
    if (species.indexOf(wantGene) !== -1) {
        progress.innerHTML += "It has been successful!";
    }
}

function generateRandomSpecies(numSpecies, wantGene, chromosomes) {
    species = [];
    for (let s = 0; s < numSpecies; s++) {
        let gene = "";
        for (let g = 0; g < integerRandom(2, (wantGene.length-1)*2); g++) {
            gene += chromosomes[integerRandom(0, chromosomes.length-1)];
        }
        species.push(gene);
    }
    return species;
}

function evaluateFitness(species, wantGene) {
    speciesFitness = []
    for (let s = 0; s < species.length; s++) {
        fitness = 0;
        for (let g = 0; g < wantGene.length; g++) {
            if (g < species[s].length) {
                if (species[s].split("")[g] === wantGene.split("")[g]) {
                    fitness += 10;
                }
                else {
                    fitness -= 0.5;
                }
            }
        }
        fitness -= Math.abs(species[s].length-wantGene.length)*0.2;
        speciesFitness.push(`${s}:${fitness}`);
    }

    return speciesFitness;
}

function removeLowerHalf(fitnessSpecies, species) {
    for (let f = 0; f < parseInt(fitnessSpecies.length/2); f++) {
        speciesNum = parseInt(fitnessSpecies[f].split(":")[0]);
        species[speciesNum] = null;
    }
    species = species.filter((s) => {
        return s != null;
    });
    return species;
}

function breedGenes(species) {
    speciesLength = species.length;
    for (let s = 0; s < speciesLength; s+=2) {
        let randomSlicePos;
        if (species[s].length >= species[s+1].length) {
            randomSlicePos = integerRandom(1, species[s+1].length-1);
        } else {
            randomSlicePos = integerRandom(1, species[s].length-1);
        }
        let A1_geneSpliceTEMP = species[s].slice(0, randomSlicePos);
        let B1_geneSpliceTEMP = species[s+1].slice(0, randomSlicePos);
        let A2_geneSpliceTEMP = species[s].slice(randomSlicePos, species[s].length);
        let B2_geneSpliceTEMP = species[s+1].slice(randomSlicePos, species[s+1].length);

        species.push(A1_geneSpliceTEMP+B2_geneSpliceTEMP);
        species.push(A2_geneSpliceTEMP+B1_geneSpliceTEMP);
    }
    return species;
}

function createMutations(species, mutateChance, chromosomes) {
    for (let s = 0; s < species.length; s++) {
        let checkMutateChance = integerRandom(1, mutateChance);
        if (checkMutateChance === 1) {
            mutateType = integerRandom(1, 8);
            speciesTEMP = species[s].split("");
            if (mutateType === 1 && speciesTEMP.length > 2) {
                speciesTEMP[integerRandom(0, speciesTEMP.length-1)];
            } else if (mutateType === 2) {
                speciesTEMP.push(chromosomes[integerRandom(0, chromosomes.length-1)]);
            } else {
                speciesTEMP[integerRandom(1, speciesTEMP.length)-1] = speciesTEMP[integerRandom(1, speciesTEMP.length)-1];
            }
            species[s] = speciesTEMP.join("");
        }
    }
    return species;
}

window.addEventListener("load", pageLoad);