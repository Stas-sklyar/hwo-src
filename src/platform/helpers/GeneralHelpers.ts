
export function NumberRange(from: number, to: number): Number[] {
    let arr: Number[] = [];

    for(let i = from; i <= to; i++) {
        arr.push(i);
    }

    return arr;
}

export function formatAMPM(date: Date): string {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    let strTime:string = `${hours}:${minutes < 10 ? '0': ''}${minutes} ${ampm}`;
    return strTime;
  }

// export function RunSyncronously<T>(action: ((param: void) => Promise<T>), timeout: number = 50000): T | null {
//     let returnResult: T | null = null;
//     let resultRetrieved: boolean = false;
//     let timeoutReached: boolean = false;

//     debugger;

//     let iterations: number = 0;

//     // let waitTimeout = window.setTimeout(() => {
//     //     if (!resultRetrieved) {
//     //         timeoutReached = true;
//     //     }
//     // }, timeout);

//     action().then(result => {
//         debugger;
//         returnResult = result;
//         resultRetrieved = true;
//         if (!timeoutReached) {
//             //window.clearTimeout(waitTimeout);
//         }
//     });

//     while(!(resultRetrieved || timeoutReached)) {
//         iterations++;
//         console.log(iterations);
//     }

// debugger;

//     return returnResult;
// }