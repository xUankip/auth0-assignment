const bcrypt = require('bcrypt');

const start = async () => {
    const resault = await bcrypt.hashSync('haha',11);
    console.log(resault);
}
start();