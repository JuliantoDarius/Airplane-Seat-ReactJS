import App from "./App";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("test lur", async () => {
    render(<App />);

    const h1 = screen.getByRole("heading");
    expect(h1.textContent).toBe("Welcome");

    const inputPassengers = screen.getByPlaceholderText("Maximum capacity: 45");
    let userInputPassengers = "10";
    const addBtn = screen.getByRole("button", { name: "Add Passenger(s)" });
    userEvent.type(inputPassengers, userInputPassengers);
    userEvent.click(addBtn);
    expect(h1.textContent).toBe(`Passenger(s) Left: ${userInputPassengers}`);

    const seat = screen.getByText("1, 1");
    userEvent.click(seat);
    expect(h1.textContent).toBe(
        `Passenger(s) Left: ${userInputPassengers - 1}`
    );
});
