import { Dayjs } from "dayjs";
import faker from '@faker-js/faker';

export type Task = {
    num: number;
    key: number;
    project: string;
    category: string;
    task: string;
    // start: Dayjs;
    // end: Dayjs;
}

const range = (len: number) => {
    const arr = []
    for (let i = 0; i < len; i++) {
        arr.push(i)
    }
    return arr
}
