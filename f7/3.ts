// <reference path="lib.d.ts"/>
// import * as LIB from "lib"

import { Action, Meeting, move } from "./1"
const meetings: Array<Meeting> = [
    { title: "Spotkanie1", date: new Date("2019-02-05T12:00:00"), duration: 1 },
    { title: "Spotkanie2", date: new Date("2019-02-05T12:00:00"), duration: 2 },
    { title: "Spotkanie3", date: new Date("2019-02-05T12:00:00"), duration: 3 },
];

const parse = (arr: Array<string>): Array<Action> => {
    const resArr: Array<Action> = [];
    for (let el of arr){
        switch(el){
            case 'd-':
                resArr.push(Action.DAY_EARLIER);
                break;
            case 'd+':
                resArr.push(Action.DAY_LATER);
                break;
            case 'h-':
                resArr.push(Action.HOUR_EARLIER);
                break;
            case 'h+':
                resArr.push(Action.HOUR_LATER);
                break;
            
        }
    }
    return resArr;
}

const printMeetings = (meetings: Array<Meeting>) => {
    for (const meeting of meetings) {
        let endDate = new Date(meeting.date);
        endDate.setHours(endDate.getHours() + meeting.duration);
        console.log(meeting.title + ', ' + meeting.date + ' -> ' + endDate);
    }
}

printMeetings(meetings);
console.log('---')
const input = ['h+', 'h-', 'd+'];
const parsedInput = parse(input);
for (const [i, action] of parsedInput.entries()){
    move(meetings[i], action);
}
printMeetings(meetings);