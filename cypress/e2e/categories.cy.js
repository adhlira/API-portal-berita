describe("Route Categories Role Admin Testing", () => {
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

  it.skip("Should Successfully create new data", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:4000/categories",
      headers: {
        Authorization: `${Token}`,
      },
      body: {
        name: "Fashion",
      },
    }).then((response) => {
      expect(response.status).eq(200);
      expect(response.body).to.have.property("message");
    });
  });

  it("Should throw error for empty required field", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:4000/categories",
      headers: {
        Authorization: `${Token}`,
      },
      body: {
        name: "",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).eq(400);
      expect(response.body).to.have.property("message");
    });
  });

  it("Should throw error when category name is already exist", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:4000/categories",
      headers: {
        Authorization: `${Token}`,
      },
      body: {
        name: "Fashion",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).eq(400);
      expect(response.body).to.have.property("message");
    });
  });
});
