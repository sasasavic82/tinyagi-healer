import * as dotenv from 'dotenv';
dotenv.config();

import { tinyAgiHeal } from "./tinyagi";


export const healer = async (fn: Function, tries: number, args: any[]): Promise<Function> => {
    try {
        return fn(...args);
    } catch(e: any) {
        console.log("Encountered error: ", e.message);
        if(tries <= 0)
            throw Error("No more tries left.");

        console.log(`Healing... ${tries} tries left.`);

        let _healResponse = await tinyAgiHeal({
            code: fn.toString(),
            error: e.stack.toString()
        });;

        tries--;

        return healer(
            new Function(..._healResponse.arguments, _healResponse.function), tries, args)
    }
}


 const bubbleSort = (arr: number[]): number[] => {
    let len = arr.length;
    for (let i = len-1; i>=0; i--){
        for(let j = 1; j<=i; j++){
            if(arr[j-1]>arr[j]){
                let temp = arr[j-1];
                arr[j-1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    throw Error("Silly error.")
    return arr;
}

const someFunction = (a: number, b: number, c: number, d: number, e: number, f: number): number => {
    let val = (a + b + c + d + e + f) - 4.5;
    val = val / 0;
    if(isNaN(val))
        throw Error("Wtf...")
    return val
}


healer(bubbleSort, 3, [[10,20,30,40,50]]).then(console.log).catch(console.error);


