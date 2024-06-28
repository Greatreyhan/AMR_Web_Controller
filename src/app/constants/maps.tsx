const wall = [
    ['#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#'],
    ['#','-','-','-','#','#','#','#','#','#','#','-','-','-','#','#','#','#','#','#','#','-','-','-','#','#','#','#','#','#','#','-','-','-','#','#','#','#','#','#','#','-','-','-','#'],
    ['#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#'],
    ['#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#'],
    ['#','-','-','-','#','-','-','-','-','-','#','-','-','-','#','-','-','-','-','-','#','-','-','-','#','-','-','-','-','-','#','-','-','-','#','-','-','-','-','-','#','-','-','-','#'],
    ['#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#'],
    ['#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#'],
    ['#','-','-','-','#','#','#','#','#','#','#','-','-','-','#','#','#','#','#','#','#','-','-','-','#','#','#','#','#','#','#','-','-','-','#','#','#','#','#','#','#','-','-','-','#'],
    ['#','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#'],
    ['#','-','-','-','#','#','#','#','#','#','#','-','-','-','#','#','#','#','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','#','#','#','#','-','-','-','#'],
    ['#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#'],
    ['#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#'],
    ['#','-','-','-','#','-','-','-','-','-','#','-','-','-','#','-','-','-','-','-','#','-','-','-','-','-','-','-','-','-','-','-','-','-','#','-','-','-','-','-','#','-','-','-','#'],
    ['#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#'],
    ['#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#'],
    ['#','-','-','-','#','#','#','#','#','#','#','-','-','-','#','#','#','#','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','#','#','#','#','-','-','-','#'],
    ['#','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#'],
    ['#','-','-','-','#','#','#','#','#','#','#','-','-','-','#','#','#','#','#','#','#','-','-','-','#','#','#','#','#','#','#','-','-','-','#','#','#','#','#','#','#','-','-','-','#'],
    ['#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#'],
    ['#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#'],
    ['#','-','-','-','#','-','-','-','-','-','#','-','-','-','#','-','-','-','-','-','#','-','-','-','#','-','-','-','-','-','#','-','-','-','#','-','-','-','-','-','#','-','-','-','#'],
    ['#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#'],
    ['#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#'],
    ['#','-','-','-','#','#','#','#','#','#','#','-','-','-','#','#','#','#','#','#','#','-','-','-','#','#','#','#','#','#','#','-','-','-','#','#','#','#','#','#','#','-','-','-','#'],    
    ['#','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#'],
    ['#','-','-','-','#','#','#','#','#','#','#','-','-','-','#','#','#','#','#','#','#','-','-','-','#','#','#','#','#','#','#','-','-','-','#','#','#','#','#','#','#','-','-','-','#'],
    ['#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#'],
    ['#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#'],
    ['#','-','-','-','#','-','-','-','-','-','#','-','-','-','#','-','-','-','-','-','#','-','-','-','#','-','-','-','-','-','#','-','-','-','#','-','-','-','-','-','#','-','-','-','#'],
    ['#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#'],
    ['#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#'],
    ['#','-','-','-','#','#','#','#','#','#','#','-','-','-','#','#','#','#','#','#','#','-','-','-','#','#','#','#','#','#','#','-','-','-','#','#','#','#','#','#','#','-','-','-','#'],   
    ['#','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#'],
    ['#','-','-','-','#','#','#','#','#','#','#','-','-','-','#','#','#','#','#','#','#','-','-','-','#','#','#','#','#','#','#','-','-','-','#','#','#','#','#','#','#','-','-','-','#'],
    ['#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#'],
    ['#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#'],
    ['#','-','-','-','#','-','-','-','-','-','#','-','-','-','#','-','-','-','-','-','#','-','-','-','#','-','-','-','-','-','#','-','-','-','#','-','-','-','-','-','#','-','-','-','#'],
    ['#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#'],
    ['#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#','#','#','-','#','#','#','-','-','-','#'],
    ['#','-','-','-','#','#','#','#','#','#','#','-','-','-','#','#','#','#','#','#','#','-','-','-','#','#','#','#','#','#','#','-','-','-','#','#','#','#','#','#','#','-','-','-','#'], 
    ['#','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#'],
    ['#','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#'],
    ['#','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#'],
    ['#','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#'],
    ['#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#'],
];


const mrmap = [
    ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-',],
    ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-',],
    ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-',],
    ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-',],
    ['-','-','-','-','#','-','-','-','-','-','#','#','#','#','-','-','-','-','-','-',],
    ['-','-','-','-','#','#','#','-','#','#','#','-','-','#','#','-','-','-','-','-',],
    ['-','-','-','-','#','#','#','-','#','#','#','-','-','-','#','-','-','-','-','-',],
    ['-','-','-','-','#','-','#','#','#','-','#','-','-','-','#','-','-','-','-','-',],
    ['-','-','-','-','#','-','-','#','-','-','#','-','-','#','#','-','-','-','-','-',],
    ['-','-','-','-','#','-','-','-','-','-','#','#','#','#','-','-','-','-','-','-',],
    ['-','-','-','-','#','-','-','-','-','-','#','-','#','-','-','-','-','-','-','-',],
    ['-','-','-','-','#','-','-','-','-','-','#','-','#','#','-','-','-','-','-','-',],
    ['-','-','-','-','#','-','-','-','-','-','#','-','-','#','-','-','-','-','-','-',],
    ['-','-','-','-','#','-','-','-','-','-','#','-','-','#','#','-','-','-','-','-',],
    ['-','-','-','-','#','-','-','-','-','-','#','-','-','-','#','-','-','-','-','-',],
    ['-','-','-','-','#','-','-','-','-','-','#','-','-','-','#','-','-','-','-','-',],
    ['-','-','-','-','#','-','-','-','-','-','#','-','-','-','#','-','-','-','-','-',],
    ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-',],
    ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-',],
    ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-',],
]

const something = [
    ['-','-','-','-','-','-','#','-','-','-','-','-','-','-','-','-','#','-','-','-'],
    ['-','-','-','-','-','-','#','-','-','-','-','-','-','-','-','-','#','-','-','-'],
    ['-','-','-','#','-','-','#','-','-','-','-','-','#','-','-','#','#','-','-','-'],
    ['-','-','-','#','-','-','#','-','-','-','-','-','#','-','-','#','-','-','#','-'],
    ['-','-','-','#','-','-','#','#','#','#','#','-','#','-','-','#','-','-','#','-'],
    ['-','-','-','#','-','-','#','-','-','-','-','-','#','-','-','#','-','#','#','-'],
    ['-','-','-','#','-','-','#','-','-','-','-','-','#','-','-','#','-','#','-','-'],
    ['-','-','-','#','-','-','#','-','#','#','#','#','#','-','-','-','-','#','-','-'],
    ['-','-','-','#','-','-','#','-','-','-','-','-','#','#','#','#','#','#','-','-'],
    ['-','-','-','#','-','-','#','-','-','-','-','-','#','-','-','-','-','-','-','-'],
    ['-','-','-','#','-','-','#','-','-','-','-','-','#','-','-','-','-','-','-','-'],
    ['-','-','-','#','-','-','#','#','#','#','#','-','#','-','-','-','-','-','-','-'],
    ['-','-','-','#','-','-','#','-','-','-','-','-','#','-','-','-','-','-','-','-'],
    ['-','-','-','#','-','-','#','-','-','-','-','-','#','#','#','#','#','#','-','-'],
    ['-','-','-','#','-','-','#','-','-','-','-','-','#','-','-','-','#','-','-','-'],
    ['-','-','-','#','-','-','#','-','-','-','-','-','#','-','-','-','#','-','-','-'],
    ['-','-','-','#','-','-','#','-','-','-','-','-','#','-','-','-','#','-','-','-'],
    ['-','-','-','#','-','-','#','-','-','-','-','-','#','-','-','-','#','-','-','-'],
    ['-','-','-','#','-','-','-','-','-','-','-','-','#','-','-','-','#','-','-','-'],
    ['-','-','-','#','-','-','-','-','-','-','-','-','#','-','-','-','-','-','-','-'],
]

const blank = [
    ['#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#'],
    ['#','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#'],
    ['#','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#'],
    ['#','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#'],
    ['#','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#'],
    ['#','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#'],
    ['#','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#'],
    ['#','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#'],
    ['#','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#'],
    ['#','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#'],
    ['#','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#'],
    ['#','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#'],
    ['#','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#'],
    ['#','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#'],
    ['#','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#'],
    ['#','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#'],
    ['#','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#'],
    ['#','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#'],
    ['#','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#'],
    ['#','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#'],
    ['#','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#'],
    ['#','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#'],
    ['#','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#'],
    ['#','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#'],
    ['#','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#'],
    ['#','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#'],
    ['#','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#'],
    ['#','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#'],
    ['#','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#'],
    ['#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#'],
]

export const maps:any = {
    wall,
    mrmap,
    something,
    blank
}