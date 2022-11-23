import { useMemo, useState, useRef, useEffect } from "react";
import { getSeats, isAisleCol, isWindowCol } from "./utils/setAirplaneSeat.js";

function App() {
    // * -1 = User has not inserted passengers number yet or reseted
    const [passengersLeft, setPassengersLeft] = useState(-1);
    const [passengerSeats, setPassengerSeats] = useState([]);
    const seats = useMemo(getSeats, []);
    const inputPassengers = useRef();

    useEffect(() => {
        if (passengersLeft > 0 || passengersLeft < 0) return;
        const occupiedSeats = [...passengerSeats];
        occupiedSeats.sort((next, current) => {
            const comparedRow = next[0] - current[0];
            const comparedCol = next[1] - current[1];

            const isNextAisle = isAisleCol(next[1]);
            const isNextWindow = isWindowCol(next[1]);
            const isCurrentAisle = isAisleCol(current[1]);
            const isCurrentWindow = isWindowCol(current[1]);

            if (comparedRow < 0) return -1;
            if (comparedRow < 0 && comparedCol < 0) return -1;
            if (comparedRow < 0 && comparedCol > 0) return 1;
            if (comparedRow === 0 && comparedCol < 0) return -1;
            if (comparedRow === 0 && comparedCol > 0) return 1;
            return 1;
        });

        const formattedSeats = occupiedSeats.filter((seat) =>
            isAisleCol(seat[1])
        );
        formattedSeats.push(
            ...occupiedSeats.filter((seat) => isWindowCol(seat[1]))
        );
        formattedSeats.push(...occupiedSeats);
        const removeDuplicate = [...new Set(formattedSeats)];
        setPassengerSeats(removeDuplicate);
    }, [passengersLeft]);

    const handleSeatClick = (seat) => {
        if (passengersLeft <= 0 || passengerSeats.includes(seat)) return;
        setPassengerSeats((prev) => [...prev, seat]);
        setPassengersLeft((prev) => prev - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setPassengersLeft(inputPassengers?.current?.value);
    };

    const handleReset = () => {
        setPassengersLeft(-1);
        setPassengerSeats([]);
    };

    return (
        <main className="grid place-items-center gap-y-10 mt-20">
            {passengersLeft >= 0 && (
                <h1 className="text-3xl text-white font-semibold">
                    Passenger(s) Left: {passengersLeft}
                </h1>
            )}
            <div className="w-fit h-full bg-teal-800 grid grid-cols-3 place-items-center gap-x-10 gap-y-6">
                {seats.map((groupSeat) => {
                    return (
                        <ul className="flex text-white gap-x-3">
                            {groupSeat.map((seat) => {
                                const column = seat[1];
                                let seatBG = isWindowCol(column)
                                    ? "bg-yellow-600"
                                    : isAisleCol(column)
                                    ? "bg-blue-500"
                                    : "bg-red-400";
                                seatBG =
                                    passengersLeft === 0
                                        ? passengerSeats.includes(seat)
                                            ? "bg-emerald-400 text-black font-semibold"
                                            : seatBG
                                        : seatBG;

                                return (
                                    <li>
                                        <span
                                            className={`grid place-items-center w-[42px] h-[33px] text-center cursor-pointer rounded ${seatBG}`}
                                            onClick={() =>
                                                handleSeatClick(seat)
                                            }
                                        >
                                            {passengersLeft < 0 ||
                                            !passengerSeats.includes(seat)
                                                ? seat
                                                      .toString()
                                                      .replaceAll(",", ", ")
                                                : passengersLeft > 0
                                                ? "occupied"
                                                : passengerSeats.findIndex(
                                                      (item) => item === seat
                                                  ) + 1}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    );
                })}
            </div>

            {passengersLeft < 0 ? (
                <form
                    className="grid place-items-center gap-y-4"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="number"
                        className="w-44 px-2 py-1.5 outline-none focus:ring-2 ring-emerald-400 rounded placeholder:text-slate-700"
                        min={1}
                        max={45}
                        placeholder="Maximum capacity: 45"
                        ref={inputPassengers}
                    />
                    <input
                        type="submit"
                        className="w-44 px-4 py-1.5 bg-emerald-400 hover:bg-emerald-500 transition-colors duration-300 rounded-md cursor-pointer"
                        value="Add Passenger(s)"
                    />
                </form>
            ) : (
                <button
                    type="button"
                    className="w-44 px-4 py-1.5 bg-emerald-400 hover:bg-emerald-500 transition-colors duration-300 rounded-md cursor-pointer"
                    onClick={handleReset}
                >
                    Reset
                </button>
            )}
        </main>
    );
}

export default App;
