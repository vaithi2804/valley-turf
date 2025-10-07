import {
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
  RespondToAuthChallengeCommand,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
  GetUserCommand,
} from "@aws-sdk/client-cognito-identity-provider"

const REGION = "ap-south-1"
const USER_POOL_ID = "ap-south-1_i72dfF6nY"
const CLIENT_ID = "7mm65vuvft9i1shbajchs5oi8m"

const client = new CognitoIdentityProviderClient({ region: REGION })

export interface CognitoUser {
  email: string
  name: string
  phone: string
  role: "user" | "admin"
}

export const cognitoAuth = {
  // Sign up is handled by Lambda - this is just for reference
  async signUp(name: string, email: string, phone: string, password: string) {
    // This will be called via Lambda endpoint
    return { success: true }
  },

  // Confirm sign up with OTP
  async confirmSignUp(email: string, code: string) {
    const command = new ConfirmSignUpCommand({
      ClientId: CLIENT_ID,
      Username: email,
      ConfirmationCode: code,
    })

    await client.send(command)
    return { success: true }
  },

  // Sign in
  async signIn(email: string, password: string) {
    const command = new InitiateAuthCommand({
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: CLIENT_ID,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    })

    const response = await client.send(command)

    // Check if password change is required
    if (response.ChallengeName === "NEW_PASSWORD_REQUIRED") {
      return {
        challengeName: "NEW_PASSWORD_REQUIRED",
        session: response.Session,
        email,
      }
    }

    return {
      accessToken: response.AuthenticationResult?.AccessToken,
      idToken: response.AuthenticationResult?.IdToken,
      refreshToken: response.AuthenticationResult?.RefreshToken,
    }
  },

  // Respond to new password challenge
  async respondToNewPasswordChallenge(email: string, newPassword: string, session: string) {
    const command = new RespondToAuthChallengeCommand({
      ClientId: CLIENT_ID,
      ChallengeName: "NEW_PASSWORD_REQUIRED",
      Session: session,
      ChallengeResponses: {
        USERNAME: email,
        NEW_PASSWORD: newPassword,
      },
    })

    const response = await client.send(command)

    return {
      accessToken: response.AuthenticationResult?.AccessToken,
      idToken: response.AuthenticationResult?.IdToken,
      refreshToken: response.AuthenticationResult?.RefreshToken,
    }
  },

  // Forgot password - initiate
  async forgotPassword(email: string) {
    const command = new ForgotPasswordCommand({
      ClientId: CLIENT_ID,
      Username: email,
    })

    await client.send(command)
    return { success: true }
  },

  // Confirm forgot password with OTP
  async confirmForgotPassword(email: string, code: string, newPassword: string) {
    const command = new ConfirmForgotPasswordCommand({
      ClientId: CLIENT_ID,
      Username: email,
      ConfirmationCode: code,
      Password: newPassword,
    })

    await client.send(command)
    return { success: true }
  },

  // Get user details from token
  async getUserFromToken(accessToken: string): Promise<CognitoUser> {
    const command = new GetUserCommand({
      AccessToken: accessToken,
    })

    const response = await client.send(command)

    const attributes = response.UserAttributes || []
    const email = attributes.find((attr) => attr.Name === "email")?.Value || ""
    const name = attributes.find((attr) => attr.Name === "name")?.Value || ""
    const phone = attributes.find((attr) => attr.Name === "phone_number")?.Value || ""
    const role = (attributes.find((attr) => attr.Name === "custom:role")?.Value as "user" | "admin") || "user"

    return { email, name, phone, role }
  },
}
