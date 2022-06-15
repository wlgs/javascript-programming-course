import { Action, Meeting, move } from '../1';

describe('move', function () {
  it('HOUR EARLIER', function () {
    let date: Date = new Date("2019-02-05T12:00:00");
    let testMeeting: Meeting = { title: 'Spotkanie1', date: date, duration: 1 };
    let movedMeeting: Meeting = move(testMeeting, Action.HOUR_EARLIER);
    expect(movedMeeting.date.getHours()).toBe(11);
  });

  it('HOUR LATER', function () {
    let date: Date = new Date("2019-02-05T12:00:00");
    let testMeeting: Meeting = { title: 'Spotkanie1', date: date, duration: 1 };
    let movedMeeting: Meeting = move(testMeeting, Action.HOUR_LATER);
    expect(movedMeeting.date.getHours()).toBe(13);
  });

  it('DAY LATER', function () {
    let date: Date = new Date("2019-02-05T12:00:00");
    let testMeeting: Meeting = { title: 'Spotkanie1', date: date, duration: 1 };
    let movedMeeting: Meeting = move(testMeeting, Action.DAY_LATER);
    expect(movedMeeting.date.getDay()).toBe(3);
  });

  it('DAY EARLIER', function () {
    let date: Date = new Date("2019-02-05T12:00:00");
    let testMeeting: Meeting = { title: 'Spotkanie1', date: date, duration: 1 };
    let movedMeeting: Meeting = move(testMeeting, Action.DAY_EARLIER);
    expect(movedMeeting.date.getDay()).toBe(1);
  });
});