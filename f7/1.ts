export enum Action {
    DAY_EARLIER,
    DAY_LATER,
    HOUR_EARLIER,
    HOUR_LATER,
}

export type Meeting = {
    title: string;
    date: Date;
    duration: number;
    participants?: Array<string>;
}

export const move = (meeting: Meeting, action: Action): Meeting => {
    switch (action) {
        case Action.DAY_EARLIER:
            meeting.date.setDate(meeting.date.getDate() - 1);
            return meeting;
        case Action.DAY_LATER:
            meeting.date.setDate(meeting.date.getDate() + 1);
            return meeting;
        case Action.HOUR_EARLIER:
            if (meeting.date.getHours() <= 9)
                meeting.date.setDate(meeting.date.getDate() - 1);
            else meeting.date.setHours(meeting.date.getHours() - 1);
            return meeting;
        case Action.HOUR_LATER:
            if (meeting.date.getHours() >= 19)
                meeting.date.setDate(meeting.date.getDate() + 1);
            else meeting.date.setHours(meeting.date.getHours() + 1);
            return meeting;
    }
};

const meeting: Array<Meeting> = [
    { title: "Spotkanie1", date: new Date("2019-02-05T12:00:00"), duration: 1 },
    { title: "Spotkanie2", date: new Date("2019-02-05T12:00:00"), duration: 2 },
    { title: "Spotkanie3", date: new Date("2019-02-05T12:00:00"), duration: 3 },
];
const actions: Array<Action> = [
    Action.DAY_EARLIER,
    Action.DAY_LATER,
    Action.HOUR_EARLIER,
];

for (const [i, el] of meeting.entries()) {
    move(el, actions[i]);
}
