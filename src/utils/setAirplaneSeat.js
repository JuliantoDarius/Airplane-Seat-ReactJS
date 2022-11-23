const MAX_ROW = 5;
const MAX_COL = 9;
const DIVIDER_COL = 3;

const allSeats = [];

for (let row = 1; row <= MAX_ROW; row++) {
    const perOneRowSeat = [];
    for (let col = 1; col <= MAX_COL; col++) {
        perOneRowSeat.push([row, col]);
    }
    allSeats.push(perOneRowSeat);
}

const seatCol = allSeats[0].map((seat) => seat[1]);
const windowCol = [Math.min(...seatCol), Math.max(...seatCol)];
const aisleCol = seatCol.filter(
    (col) => col % DIVIDER_COL === 0 && !windowCol.includes(col)
);

for (let col = 1; col <= seatCol.length; col++) {
    if (col % DIVIDER_COL === 0 && col !== seatCol.length)
        aisleCol.push(col + 1);
}

export const getSeats = () => {
    const divided = [];

    for (const row of allSeats) {
        let groupSeat = [];
        for (const seat of row) {
            groupSeat.push(seat);
            if (seat[1] % DIVIDER_COL === 0) {
                divided.push(groupSeat);
                groupSeat = [];
            }
        }
    }
    return divided;
};
export const isAisleCol = (col) => aisleCol.includes(col);
export const isWindowCol = (col) => windowCol.includes(col);
