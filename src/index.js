import Log from './log';
import Calc from './calc';
import img from './react.png';

const log = new Log();
const calc = new Calc();

log.log(calc.add(1, 2, 3));
