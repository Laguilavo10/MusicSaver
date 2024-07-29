import { inject, Injectable } from '@angular/core'
import { CryptoUtilsService } from './crypto-utils.service'

interface getAuthTokenProps {
  clientId: string
  redirectUri: string
  scope: string
}

interface getTokenProps {
  code: string
  clientId: string
  redirectUri: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  cryptoService = inject(CryptoUtilsService)
  accessToken = localStorage.getItem('access_token')
  constructor() { }
  
  // The getAccessToken function is responsible for sending a POST request to the Spotify API with the code 
  // received from the authorization process.
  async getAccessToken({ code, clientId, redirectUri }: getTokenProps) {
    if (this.accessToken) {
      return this.accessToken
    }
    const codeVerifier = localStorage.getItem('code_verifier') ?? ''

    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier
      })
    }

    const body = await fetch('https://accounts.spotify.com/api/token', payload)
    const response = await body.json()
    localStorage.setItem('refresh_token', response.refresh_token)
    localStorage.setItem('access_token', response.access_token)
    return response.access_token
  }

  // The CodeVerifier is generated and hashed using the sha256 function from the cryptoUtils file.
  // It works to verify the code received from the Spotify API.
  async getAuthToken({
    clientId,
    redirectUri,
    scope = 'user-read-private user-read-email'
  }: getAuthTokenProps) {
    const codeVerifier = this.cryptoService.generateRandomString(64)
    const hashed = await this.cryptoService.sha256(codeVerifier)
    const codeChallenge = this.cryptoService.base64encode(hashed)

    const authUrl = new URL('https://accounts.spotify.com/authorize')
    window.localStorage.removeItem('code_verifier')
    window.localStorage.setItem('code_verifier', codeVerifier)
    const params = {
      response_type: 'code',
      client_id: clientId,
      scope,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: redirectUri
    }
    authUrl.search = new URLSearchParams(params).toString()
    window.location.href = authUrl.toString()
  }
}
