const wall = [
    ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
    ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
    ['-','-','-','-','-','-','#','#','#','#','#','#','#','#','#','#','-','-','-','-'],
    ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#','-','-','-','-'],
    ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#','-','-','-','-'],
    ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#','-','-','-','-'],
    ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#','-','-','-','-'],
    ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#','-','-','-','-'],
    ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#','-','-','-','-'],
    ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#','-','-','-','-'],
    ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#','-','-','-','-'],
    ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#','-','-','-','-'],
    ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#','-','-','-','-'],
    ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#','-','-','-','-'],
    ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','#','-','-','-','-'],
    ['-','-','-','-','-','-','#','#','#','#','#','#','#','#','#','#','-','-','-','-'],
    ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
    ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
    ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
    ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
];


const mrmap = [
    ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-',],
    ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-',],
    ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-',],
    ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-',],
    ['-','-','-','-','#','-','-','-','-','-','#','#','#','#','-','-','-','-','-','-',],
    ['-','-','-','-','#','#','-','-','-','#','#','-','-','#','#','-','-','-','-','-',],
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

export const maps:any = {
    wall,
    mrmap,
    something
}