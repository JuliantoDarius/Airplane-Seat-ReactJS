import { useRef, useMemo } from "react";

const InputPassengers = (props) => {
    const inputPassengers = useRef();

    return useMemo(() => {
        const { passengersLeft, setPassengersLeft, setPassengersSeat } = props;
        const handleSubmit = (e) => {
            e.preventDefault();
            setPassengersLeft(inputPassengers?.current?.value);
        };

        const handleReset = () => {
            setPassengersLeft(-1);
            setPassengersSeat([]);
        };

        return passengersLeft < 0 ? (
            <form className="form-container" onSubmit={handleSubmit}>
                <input
                    type="number"
                    className="input-passengers"
                    min={1}
                    max={45}
                    placeholder="Maximum capacity: 45"
                    ref={inputPassengers}
                />
                <input
                    type="submit"
                    className="btn-primary"
                    value="Add Passenger(s)"
                />
            </form>
        ) : (
            <button type="button" className="btn-primary" onClick={handleReset}>
                Reset
            </button>
        );
    }, [props]);
};

export default InputPassengers;
