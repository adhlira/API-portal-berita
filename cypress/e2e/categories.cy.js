describe("Route Categories Role Admin", () => {
  let Token, category;
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

  it("Should Successfully fetch all data from endpoint", () => {
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

  it("Should Successfully create new data", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:4000/categories",
      headers: {
        Authorization: `${Token}`,
      },
      body: {
        name: "Motor",
      },
    }).then((response) => {
      expect(response.status).eq(200);
      category = response.body.new_category.id;
      console.log(category);
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
        name: "Politics",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).eq(400);
      expect(response.body).to.have.property("message");
    });
  });

  it("Should successfully fetch detail data from endpoint", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:4000/categories/1",
      headers: {
        Authorization: `${Token}`,
      },
    }).then((response) => {
      expect(response.status).eq(200);
      expect(response.body).to.have.property("message");
    });
  });

  it("Should throw error when category id is NaN", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:4000/categories/a",
      headers: {
        Authorization: `${Token}`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).eq(400);
      expect(response.body).to.have.property("message");
    });
  });

  it("Should throw error when category id is not found", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:4000/categories/3",
      headers: {
        Authorization: `${Token}`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).eq(404);
      expect(response.body).to.have.property("message");
    });
  });

  it("Should update data category", () => {
    cy.request({
      method: "PUT",
      url: `http://localhost:4000/categories/${category}`,
      headers: {
        Authorization: `${Token}`,
      },
      body: {
        name: `${category} updated`,
      },
    }).then((response) => {
      expect(response.status).eq(200);
      expect(response.body).to.have.property("message");
    });
  });

  it("Should delete data category", () => {
    cy.request({
      method: "DELETE",
      url: `http://localhost:4000/categories/${category}`,
      headers: {
        Authorization: `${Token}`,
      },
    }).then((response) => {
      expect(response.status).eq(200);
      expect(response.body).to.have.property("message");
    });
  });

  after(() => {
    cy.request({
      method: "POST",
      url: "http://localhost:4000/logout",
      headers: {
        Authorization: `${Token}`,
      },
    });
  });
});

describe("Route Categories Role Visitor", () => {
  let Token;
  before(() => {
    cy.request({
      method: "POST",
      url: "http://localhost:4000/login",
      body: {
        email: "simba@gmail.com",
        password: "password01",
      },
    }).then((response) => {
      expect(response.status).eq(200);
      expect(response.body).to.have.property("token");
      Token = response.body.token;
    });
  });

  it("Should deny access to endpoint GET for visitor role", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:4000/categories",
      headers: {
        Authorization: `${Token}`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).eq(403);
      expect(response.body).to.have.property("message");
    });
  });

  it("Should deny access to endpoint POST for visitor role", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:4000/categories",
      headers: {
        Authorization: `${Token}`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).eq(403);
      expect(response.body).to.have.property("message");
    });
  });

  it("Should deny access to endpoint PUT for visitor role", () => {
    cy.request({
      method: "PUT",
      url: "http://localhost:4000/categories/2",
      body: {
        name: "Sports updated",
      },
      headers: {
        Authorization: `${Token}`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).eq(403);
      expect(response.body).to.have.property("message");
    });
  });

  it("Should deny access to endpoint GET by id for visitor role", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:4000/categories/2",
      headers: {
        Authorization: `${Token}`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).eq(403);
      expect(response.body).to.have.property("message");
    });
  });

  it("Should deny access to endpoint DELETE for visitor role", () => {
    cy.request({
      method: "DELETE",
      url: "http://localhost:4000/categories/2",
      headers: {
        Authorization: `${Token}`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).eq(403);
      expect(response.body).to.have.property("message");
    });
  });

  after(() => {
    cy.request({
      method: "POST",
      url: "http://localhost:4000/logout",
      headers: {
        Authorization: `${Token}`,
      },
    });
  });
});
