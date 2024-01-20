const BASE_URL = "http://localhost:5173/cyc.ly";

let url = "";
let oldDistance = "";

describe("Testy Cycly", () => {
  before(() => {
    cy.clearLocalStorageSnapshot();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("Wszystko jest widoczne", () => {
    cy.visit(BASE_URL);

    // sprawdzenie czy widoczna jest strona główna
    cy.get("[data-cy=main-header]")
      .should("be.visible")
      .should("have.text", "Cycly - Create your own unique path");
    cy.get("[data-cy=main-sub-header]")
      .should("be.visible")
      .should("have.text", "Chart Your Course, Embrace Uniqueness");
    cy.get("[data-cy=main-button]").should("be.visible");

    // sprawdzenie czy widoczny jest formualrz
    cy.visit(BASE_URL + "/generate-route");

    cy.get("[name=lat]").should("be.visible");
    cy.get("[name=lon]").should("be.visible");
    cy.get("[name=distance]").should("be.visible");
    cy.get("[role=combobox]").should("be.visible");
    cy.get("button[type=submit]").should("be.visible");

    // sprawdzenie czy pusta lista jest widoczna
    cy.visit(BASE_URL + "/routes");
    cy.contains("Generate More").should("be.visible");
    cy.get("[data-cy=list-title]")
      .should("be.visible")
      .should("have.text", "Favorite routes");
  });

  it("Przechodzi z głównej strony do strony z formularzem", () => {
    cy.visit(BASE_URL);

    cy.get("[data-cy=main-button]").click();

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/cyc.ly/generate-route");
    });
  });

  it("Wypełnia formularz i zwraca poprawny kod", () => {
    // Nasłuchujemy na żądanie POST do endpointu /routes/
    cy.intercept("POST", "http://localhost:8000/routes/").as("route");
    // Wypełniamy formularz
    cy.visit(BASE_URL + "/generate-route", {
      // Ustawienie odpowiednich współrzędnych geograficznych
      onBeforeLoad({ navigator }) {
        const latitude = 18.6746;
        const longitude = 50.291;
        cy.stub(navigator.geolocation, "getCurrentPosition").callsArgWith(0, {
          coords: { latitude, longitude },
        });
      },
    });

    cy.get("[role=combobox]")
      .click({ force: true })
      .get("li[role=option]")
      .first()
      .click({ force: true });
    cy.get("[name=distance]").clear().type("15");

    cy.get("button[type=submit]").click();

    // Sprawdzamy, czy żądanie zostało wysłane
    cy.wait("@route").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });

    // Sprawdzamy, czy użytkownik został przekierowany na stronę z podglądem trasy
    cy.location().should((loc) => {
      expect(loc.pathname).contain("/cyc.ly/preview");
      // "url" zapisanie wygenerowanej trasy do zmiennej
      url = loc.pathname;
    });
  });

  it("Tworzenie nowej trasy", () => {
    // "url" to link do wygenerowanej trasy
    cy.visit("http://localhost:5173" + url);

    // Nasłuchujemy na żądanie POST do endpointu /routes/
    cy.intercept("POST", "http://localhost:8000/routes/").as("route");

    // Zapisanie obecnego dystansu do zmiennej
    cy.get("[data-cy=distance]").then(($distance) => {
      oldDistance = $distance.text();
    });

    // "url" to link do wygenerowanej trasy
    cy.visit("http://localhost:5173" + url);

    cy.contains("Regenerate").click();

    cy.wait("@route").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });

    // Sprawdzenie czy nowa trasa ma inny dystans (trasy powinny być różne)
    cy.get("[data-cy=distance]").should("not.have.text", oldDistance);
  });

  it("Polubienie trasy", () => {
    // "url" to link do wygenerowanej trasy
    cy.visit("http://localhost:5173" + url);

    cy.contains("Like").click();

    cy.visit("http://localhost:5173/cyc.ly/routes");

    // Sprawdzamy, czy trasa została dodana do ulubionych
    cy.get("[data-cy=route-card").should("have.length", 1);
  });

  it("Usunięcie z ulubionych", () => {
    cy.visit("http://localhost:5173/cyc.ly/routes");

    cy.get("[data-cy=route-card").first().contains("Delete").click();

    cy.get("[data-cy=route-card").should("have.length", 0);
  });

  // it("export do gpx", () => {
  //   cy.wait(1000);
  //   cy.visit("http://localhost:5173" + url);

  //   cy.contains("Export").click();

  //   cy.visit("http://localhost:5173/cyc.ly/routes");

  //   cy.contains("Select").should("have.length", 1);
  // });
});
