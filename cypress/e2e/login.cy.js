describe("Route Login", () => {
  it("Should user can login", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:4000/login",
      body: {
        email: "adhli212@gmail.com",
        password: "password01",
      },
    }).then((response) => {
      expect(response.status).eq(200);
      expect(response.body).to.have.property("token");
    });
  });

  it("Should user can't login", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:4000/login",
      failOnStatusCode: false,
      body: {
        email: "adhli212@gmail.com",
        password: "password02",
      },
    }).then((response) => {
      expect(response.status).eq(400);
      expect(response.body).to.have.property("message");
    });
  });
});
