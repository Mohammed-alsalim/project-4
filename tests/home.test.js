import Home from "../pages";

import "isomorphic-fetch";

import "@testing-library/jest-dom";
import { screen, render, act } from "@testing-library/react";

import { rest } from "msw"; 
import { setupServer } from "msw/node"; 

const TEST_URL = 'https://mocked-dog-image.com/mock-dog.jpg'; 

const server = setupServer(
  rest.get('https://dog.ceo/api/breeds/image/random', (req, res, ctx) => {
    return res(
      ctx.json({
        status: 'success',
        message: TEST_URL, 
      })
    );
  })
);


beforeAll(() => {
  server.listen();
});


afterAll(() => {
  server.close();
});


test("home loads an image on mount", async () => {

  await act(async () => {
    render(<Home />);
  });

  const dogImage = screen.getByTestId("dog-image");

  expect(dogImage).toBeInTheDocument();

  expect(dogImage.src).toBe(TEST_URL);
});

test("home loads title", async () => {

    await act(async () => {
      render(<Home />);
    });
  
    const title = screen.getByText("Welcome to Dinder");
  
    expect(title).toBeInTheDocument();
  });


  test("like and nope buttons", async () => {
 
    await act(async () => {
      render(<Home />);
    });

    const like = screen.getByText("Like");
    const nope = screen.getByText("Nope");
  
    expect(like).toBeInTheDocument();
    expect(nope).toBeInTheDocument();
  });
