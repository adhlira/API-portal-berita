describe("Route Categories Testing", () => {
  let Token;
  before(() => {
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
      Token = response.body.token;
    });
  });

  it("Should Successfully fetch data from endpoint", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:4000/categories",
      headers: {
        Authorization: `${Token}`,
      },
    }).then((response) => {
      expect(response.status).eq(200);
      expect(response.body).to.have.property("message");
    });
  });
});
