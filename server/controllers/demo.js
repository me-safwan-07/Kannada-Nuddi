const data = [
    {
        name: 'ahmed',
        age: 35,
        city: 'cairo'
    },
    {
        name: 'mohamed',
        age: 28,
        city: 'alexandria'
    },
    {
        name: 'ali',
        age: 32,
        city: 'cairo'
    },
    {
        name: 'safwan',
        age: 30,
        city: 'cairo'
    },
    {
        name: 'amrin',
        age: 25,
        city: 'alexandria'
    }
];


export const demodata = (req, res,  next) => {
    res.status(200).json(data);
    next();
}