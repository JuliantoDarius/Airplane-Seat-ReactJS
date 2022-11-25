import { useMemo, useState, useEffect } from "react";
import { isAisleCol, isWindowCol } from "./utils/setAirplaneSeat.js";
import Seats from "./components/Seats";
import InputPassengers from "./components/InputPassengers";

function App() {
    // * -1 = User has not inserted passengers number yet or reseted
    const [passengersLeft, setPassengersLeft] = useState(-1);
    const [passengersSeat, setPassengersSeat] = useState([]);

    const seatsProps = useMemo(() => {
        return {
            passengersLeft,
            passengersSeat,
            handleSeatClick(seat) {
                if (passengersLeft <= 0 || passengersSeat.includes(seat))
                    return;
                setPassengersSeat((prev) => [...prev, seat]);
                setPassengersLeft((prev) => prev - 1);
            },
        };
    }, [passengersLeft, passengersSeat]);

    const inputPassengersProps = useMemo(() => {
        return {
            passengersLeft,
            setPassengersLeft,
            setPassengersSeat,
        };
    }, [passengersLeft, setPassengersLeft, setPassengersSeat]);

    useEffect(() => {
        if (passengersLeft > 0 || passengersLeft < 0) return;
        const occupiedSeats = [...passengersSeat];
        occupiedSeats.sort((next, current) => {
            const comparedRow = next[0] - current[0];
            const comparedCol = next[1] - current[1];
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
        setPassengersSeat(removeDuplicate);
        // eslint-disable-next-line
    }, [passengersLeft]);

    return (
        <main>
            <Seats {...seatsProps} />
            <InputPassengers {...inputPassengersProps} />
        </main>
    );
}

export default App;
