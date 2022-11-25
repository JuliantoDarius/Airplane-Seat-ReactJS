import { useMemo } from "react";
import { getSeats, isAisleCol, isWindowCol } from "../utils/setAirplaneSeat.js";
import { BsCheckLg } from "react-icons/bs";

const Seats = (props) => {
    return useMemo(() => {
        const { passengersLeft, passengersSeat, handleSeatClick } = props;
        const seats = getSeats();
        const seatBG = (seat) => {
            const column = seat[1];
            let seatBG = isWindowCol(column)
                ? "bg-window"
                : isAisleCol(column)
                ? "bg-aisle"
                : "bg-middle";

            seatBG =
                passengersLeft === 0 && passengersSeat.includes(seat)
                    ? "booked-seat"
                    : seatBG;
            return seatBG;
        };

        const displaySeat = (seat) => {
            if (passengersLeft < 0 || !passengersSeat.includes(seat))
                return seat.toString().replaceAll(",", ", ");

            if (passengersLeft > 0)
                return (
                    <span className="occupied-seat">
                        <BsCheckLg />
                    </span>
                );

            return passengersSeat.findIndex((item) => item === seat) + 1;
        };

        return (
            <>
                <div className="header-container">
                    {passengersLeft >= 0 ? (
                        <h1>Passenger(s) Left: {passengersLeft}</h1>
                    ) : (
                        <h1>Welcome</h1>
                    )}
                    <ul className="box-container">
                        <li>
                            <span className="aisle-box"></span>
                            <span>Aisle Seat</span>
                        </li>
                        <li>
                            <span className="window-box"></span>
                            <span>Window Seat</span>
                        </li>
                        <li>
                            <span className="middle-box"></span>
                            <span>Middle Seat</span>
                        </li>
                    </ul>
                </div>
                <section className="seats-container">
                    {seats.map((groupSeat, i) => {
                        return (
                            <ul key={i} className="seats-group">
                                {groupSeat.map((seat, i) => {
                                    return (
                                        <li key={i}>
                                            <span
                                                className={`seat ${seatBG(
                                                    seat
                                                )}`}
                                                onClick={() =>
                                                    handleSeatClick(seat)
                                                }
                                            >
                                                {displaySeat(seat)}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        );
                    })}
                </section>
            </>
        );
    }, [props]);
};

export default Seats;
