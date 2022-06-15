import { Action, Meeting, move } from "./1";
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

interface ITimetable{
    meetings: Array<Meeting>,
    canBeTransferredTo(meeting: Meeting,date: Date): boolean,
    busy(date: Date): boolean,
    put(meeting: Meeting): boolean,
    get(date: Date): Meeting | null,
    perform(actions: Array<Action>): void
}

export class Timetable implements ITimetable {
    meetings: Array<Meeting> = [];
    canBeTransferredTo(meeting: Meeting, date: Date): boolean {
        let endDate = new Date(meeting.date);
        endDate.setHours(endDate.getHours() + meeting.duration);
        let range1 = moment.range(meeting.date, endDate);
        for (const el of this.meetings){
            let tmp = el.date;
            tmp.setHours(tmp.getHours() + el.duration);
            let range2 = moment.range(el.date, tmp);
            if (range1.overlaps(range2))
                return false;
        }
        return true;

    }
    busy(date: Date): boolean {
        for (const el of this.meetings){
            let tmp = el.date;
            tmp.setHours(tmp.getHours() + el.duration);
            let range2 = moment.range(el.date, tmp);
            if (range2.contains(date))
                return true;
        }
        return false;
    }
    put(meeting: Meeting): boolean {
        if (!this.busy(meeting.date)){
            this.meetings.push(meeting);
            return true;
        }
        return false;
    }
    get(date: Date): Meeting | null {
        for (const el of this.meetings){
            let tmp = el.date;
            tmp.setHours(tmp.getHours() + el.duration);
            let range2 = moment.range(el.date, tmp);
            if (range2.contains(date))
                return el;
        }
        return null
    }
    perform(actions: Array<Action>): void {
        for (const [i, action] of actions.entries()){
            move(this.meetings[i], action);
        }
    }
}





