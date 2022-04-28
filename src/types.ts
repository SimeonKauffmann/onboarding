import { fetchOnboardingStatus } from "./utils/httpClient"

export type Token = {
  AccessToken: string
  ExpiresAt: string
}

export type User = {
  Email: string
  Id: string
  Name: string
  OfficesRole: any
  ReportOffices: any[]
}

export type IceContact = {
  relation: string
  name: string
  phone: string
  relation2: string
  name2: string
  phone2: string
}

export type HardwareChoices = {
  Phone: string
  Headphones: string
  Keyboard: string
  Mouse: string
  Computer: string
  ComputerColor: string
  NewNumber: string
  CurrentNumber: string
  ClothingSize: string
  PCModel: string
}

export type ProfileInfo = {
  Name: string
  Phone: string
  LineOne: string
  LineTwo: string
  Zip: string
  City: string
  Region: string
  Clearing: string
  Account: string
  Allergies: string
  OtherFoodPref: string
}

export type OnboardingStatus = {
  Employee: {
    Id: string
    Created: string
    Updated: string
    Data: {
      CVList: []
      Email: string
      Name: string
      Office: number
    }
  }
  HasJoinedSlack: boolean
  HasStartedResume: boolean
  RequestedEquipment: []
}
