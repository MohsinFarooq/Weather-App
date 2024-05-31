describe("Check weather for a city that exists", () => {
  it("should display the weather for a city named SRINAGAR", () => {
    getWeatherForCity("SRINAGAR", true);
  });
});

describe("Check weather for a city that does not exist", () => {
  it("should display 404 error message for a city name Test", () => {
    getWeatherForCity("Test", false);
  });
});

function getWeatherForCity(city, shouldFindWeatherInfo) {
  cy.visit("http://127.0.0.1:5500/");
  cy.get("#location-input").clear().type("SRINAGAR");
  cy.get("#search-button").click();
  if (shouldFindWeatherInfo) {
    cy.get(".temprature").should("not.be.empty");
  } else {
    cy.get(".not-found-error").should("not.be.empty");
  }
}
