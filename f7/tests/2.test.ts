import { Meeting } from '../1';
import { Timetable } from '../2'


describe('put', () => {
    it('correctly puts meeting', () => {
        const timetable: Timetable = new Timetable();
        let date: Date = new Date("2019-02-05T12:00:00");
        let testMeeting: Meeting = { title: 'Spotkanie1', date: date, duration: 1 };

        timetable.put(testMeeting);
        expect(timetable.meetings.length).toBeGreaterThan(0);
    })

});

describe('get', () => {
    it('correctly gets meeting', () => {
        const timetable: Timetable = new Timetable();
        let date: Date = new Date("2019-02-05T12:00:00");
        let testMeeting: Meeting = { title: 'Spotkanie1', date: date, duration: 1 };
        timetable.put(testMeeting);
        let retrievedMeeting = timetable.get(date);
        expect(retrievedMeeting).not.toBeNull();
    })

});

describe('busy', () => {
    it('date is busy', () => {
        const timetable: Timetable = new Timetable();
        let date: Date = new Date("2019-02-05T12:00:00");
        let testMeeting: Meeting = { title: 'Spotkanie1', date: date, duration: 1 };
        timetable.put(testMeeting);
        expect(timetable.busy(date)).toBeTruthy();
    })
    it('date is not busy', () => {
        const timetable: Timetable = new Timetable();
        let date: Date = new Date("2019-02-05T12:00:00");
        let testMeeting: Meeting = { title: 'Spotkanie1', date: date, duration: 1 };

        timetable.put(testMeeting);
        let date2: Date = new Date("2023-02-05T12:00:00")
        expect(timetable.busy(date2)).toBeFalsy();
    })
});
