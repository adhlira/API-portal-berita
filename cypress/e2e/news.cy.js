describe("Route News Role Admin", () => {
  let Token, user_id, news;
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
      Token = response.body.token;
      user_id = response.body.user.id;
    });
  });

  it("Should successfully fetch data from endpoint", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:4000/news",
      headers: {
        Authorization: `${Token}`,
      },
    }).then((response) => {
      expect(response.status).eq(200);
      expect(response.body).to.have.property("news");
    });
  });

  it("Should successfully create new data", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:4000/news",
      headers: {
        Authorization: `${Token}`,
      },
      body: {
        category_id: 2,
        users_id: user_id,
        title: "Ini adalah judul berita untuk testing",
        body: "Ini adalah isi berita untuk testing",
      },
    }).then((response) => {
      expect(response.status).eq(200);
      expect(response.body).to.have.property("news");
      news = response.body.news.id;
    });
  });

  it("Should successfully fetch data from endpoint", () => {
    cy.request({
      method: "GET",
      url: `http://localhost:4000/news/${news}`,
      headers: {
        Authorization: `${Token}`,
      },
    }).then((response) => {
      expect(response.status).eq(200);
      expect(response.body).to.have.property("news");
    });
  });

  it("Should successfully update data", () => {
    cy.request({
      method: "PUT",
      url: `http://localhost:4000/news/${news}`,
      headers: {
        Authorization: `${Token}`,
      },
      body: {
        body: "Ini adalah isi berita untuk testing updated",
      },
    }).then((response) => {
      expect(response.status).eq(200);
      expect(response.body).to.have.property("news_updated");
    });
  });

  it("Should successfully delete data", () => {
    cy.request({
      method: "DELETE",
      url: `http://localhost:4000/news/${news}`,
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
    }).then((response) => {
      expect(response.status).eq(200);
    });
  });
});

describe("Route News Role Visitor", () => {
  let Tokenvisitor;
  before(() => {
    cy.request({
      method: "POST",
      url: "http://localhost:4000/login",
      body: {
        email: "lily@gmail.com",
        password: "password01",
      },
    }).then((response) => {
      expect(response.status).eq(200);
      Tokenvisitor = response.body.token;
    });
  });

  it("Should successfully fetch list data news from endpoint", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:4000/news",
      headers: {
        Authorization: `${Tokenvisitor}`,
      },
    }).then((response) => {
      expect(response.status).eq(200);
      expect(response.body).to.have.property("news");
    });
  });

  it("Should successfully fetch detail data news from endpoint", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:4000/news/4",
      headers: {
        Authorization: `${Tokenvisitor}`,
      },
    }).then((response) => {
      expect(response.status).eq(200);
      expect(response.body).to.have.property("news");
    });
  });

  it("Should successfully search data from endpoint", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:4000/news/search",
      headers: {
        Authorization: `${Tokenvisitor}`,
      },
      body: {
        title: "cara",
      },
    }).then((response) => {
      expect(response.status).eq(200);
    });
  });

  it("Should deny access to create new data for role visitor", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:4000/news",
      headers: {
        Authorization: `${Tokenvisitor}`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).eq(403);
      expect(response.body).to.have.property("message");
    });
  });

  it("Should deny access to update data for role visitor", () => {
    cy.request({
      method: "PUT",
      url: "http://localhost:4000/news/2",
      headers: {
        Authorization: `${Tokenvisitor}`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).eq(403);
      expect(response.body).to.have.property("message");
    });
  });

  it("Should deny access to delete data for role visitor", () => {
    cy.request({
      method: "DELETE",
      url: "http://localhost:4000/news/1",
      headers: {
        Authorization: `${Tokenvisitor}`,
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
        Authorization: `${Tokenvisitor}`,
      },
    }).then((response) => {
      expect(response.status).eq(200);
    });
  });
});
