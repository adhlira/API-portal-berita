describe("Route Logout Testing", () => {
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

  it("Should user logout", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:4000/logout",
      headers: {
        Authorization: `${Token}`,
      },
    }).then((response) => {
      expect(response.status).eq(200);
      expect(response.body).to.have.property("message");
    });
  });
});
