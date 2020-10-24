const chalk = require('chalk');
const an = require('chalk-animation');

const s = chalk.blue.bold
const e = chalk.bgRed.bold

export const success = mssg => console.log(s(mssg))
export const error = mssg => console.log(e(mssg))

export const rainbow = mssg => setTimeout(() => an.rainbow(mssg).start(), 100)
export const radar = mssg => setTimeout(() => an.radar(mssg).start(), 100)

