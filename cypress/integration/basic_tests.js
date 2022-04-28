import "cypress-react-selector"

const host = Cypress.env("CYPRESSHOST") ?? "localhost"

describe("Basic tests", () => {
  it("Can visist localhost", () => {
    cy.visit(`http://${host}:3000/`)
  })
  it("Finds the progressBar", () => {
    cy.waitForReact()
    cy.react("ProgressBar")
  })

  describe("Hardware Form", () => {
    it("Renders the hardware form correctly", () => {
      cy.waitForReact()
      cy.get("[data-cy=playbookNext]").click()
      cy.get("[data-cy=slackIntroNext]").click()
      cy.get("[data-cy=slackJoinNext]").click()

      cy.get("[data-cy=HardwareContactForm]").should("be.visible")
    })

    it("It gives me some options to choose computer in Select Hardware", () => {
      cy.get("[data-cy=macBtn]").click()
      cy.get("[data-cy=menuItem]").its("length").should("be.gt", 1)
    })

    it("Collects correct input data from hardware inputform", () => {
      cy.get("[data-cy=macBtn]").click({ force: true })
      cy.get("[data-cy=menuItem]").eq(1).click()
      cy.getReact("HardwareContactForm")
        .getProps("hardwareChoices.Computer")
        .should("eq", 'Macbook Pro 16"')
      cy.get("[data-cy=hardwareSubmit]").click()
    })
  })

  describe("Profile Info", () => {
    it("Renders the profile info form", () => {
      cy.get("[data-cy=ProfileContactForm]").should("be.visible")
      cy.get("[data-cy=nameInput]").should("be.visible")
    })

    it("Collects correct input data from form", () => {
      let name = "Janne"
      let phone = "07012345678"
      let address = "Drottninggatan 37"
      let zip = "33333"
      let clearingNumber = "9999"
      let accountNumber = "4443332"
      let city = "Älmhult"

      cy.get("[data-cy=nameInput]").type(name)
      cy.get("[data-cy=phoneInput]").type(phone)
      cy.get("[data-cy=addressInput]").type(address)
      cy.get("[data-cy=zipInput]").type(zip)
      cy.get("[data-cy=cityInput]").type(city)
      cy.get("[data-cy=clearingInput]").type(clearingNumber)
      cy.get("[data-cy=accountInput]").type(accountNumber)

      cy.getReact("ProfileContactForm")
        .getProps("profileInfo.Name")
        .should("eq", name)
      // Bug in cypress ignores last letter of last input(account number) if i dont write more like under here.
      cy.get("[data-cy=nameInput]").type(name)
      cy.getReact("ProfileContactForm")
        .getProps("profileInfo.Phone")
        .should("eq", phone)
      cy.getReact("ProfileContactForm")
        .getProps("profileInfo.LineOne")
        .should("eq", address)
      cy.getReact("ProfileContactForm")
        .getProps("profileInfo.Zip")
        .should("eq", zip)
      cy.getReact("ProfileContactForm")
        .getProps("profileInfo.City")
        .should("eq", city)
      cy.getReact("ProfileContactForm")
        .getProps("profileInfo.Clearing")
        .should("eq", clearingNumber)
      cy.getReact("ProfileContactForm")
        .getProps("profileInfo.Account")
        .should("eq", accountNumber)

      cy.get("[data-cy=personalSubmit]").click()
    })
  })

  describe("Ice Contact Form", () => {
    it("Renders the ICE form", () => {
      cy.get("[data-cy=IceContactForm]").should("be.visible")
      cy.get("[data-cy=iceName]").should("be.visible")
    })

    it("Collects correct input from form", () => {
      let name = "Janne"
      let relation = "My cat"
      let number = "07012345678"

      cy.get("[data-cy=iceName]").type(name)
      cy.get("[data-cy=iceRelation]").type(relation)
      cy.get("[data-cy=iceNumber]").type(number)

      cy.getReact("IceContactForm")
        .getProps("iceContact.name")
        .should("eq", name)
      // Bug in cypress ignores last letter of last input(number) if i dont write more like under here.
      cy.get("[data-cy=iceName]").type(name)
      cy.getReact("IceContactForm")
        .getProps("iceContact.relation")
        .should("eq", relation)
      cy.getReact("IceContactForm")
        .getProps("iceContact.phone")
        .should("eq", number)

      cy.get("[data-cy=iceSubmit]").click()
      cy.get("[data-cy=linkedinNext]").click()
    })
  })
  describe("Github Form", () => {
    it("Renders Github form", () => {
      cy.get("[data-cy=githubForm]").should("be.visible")
      cy.get("[data-cy=githubName]").should("be.visible")
    })

    it("Skips to next step", () => {
      cy.get("[data-cy=githubSkip]").click()
      cy.get("[data-cy=toolsNext]").click()
    })
  })
})
