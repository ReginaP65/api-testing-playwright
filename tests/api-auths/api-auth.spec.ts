import { expect, test } from '@playwright/test'
import { LoginDto } from '../dto/loginDto'
import { StatusCodes } from 'http-status-codes'

const authURL = 'https://backend.tallinn-learning.ee/login/student'

test('login to a student with incorrect credentials', async ({ request }) => {
  const loginData = new LoginDto('string123', 'string123')
  const response = await request.post(authURL, {
    data: loginData,
  })
  expect.soft(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('login to a student returns jwt', async ({ request }) => {
  const loginData = LoginDto.createLoginWithCorrectData()
  const response = await request.post(authURL, {
    data: loginData,
  })
  const responseBody = await response.text()
  console.log('response body:', responseBody)

  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody).toBeDefined()

  const jwtRegex = /^eyJhb[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/
  expect.soft(responseBody).toMatch(jwtRegex)
})
test('login with incorrect HTTP method (GET)', async ({ request }) => {
  //const loginData = LoginDto.createLoginWithCorrectData()
  const response = await request.get(authURL, {})
  expect.soft(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
})
test('login with incorrect body structure', async ({ request }) => {
  const invalidBody = LoginDto.createLoginWithIncorrectData()
  const response = await request.post(authURL, {
    data: invalidBody,
  })
  expect.soft(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})
