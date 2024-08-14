import { ONE_DAY_IN_MS } from "../constants/time.constants.js";

export const getMSbyDay = (numDays) => {
    return numDays * ONE_DAY_IN_MS;
};
