import { APIResponse, expect, test } from '@playwright/test'
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
  // const loginData= new LoginDto('reginape','whs4s5qbYbfT2n')
  const loginData = LoginDto.createLoginWithCorrectData()
  const response = await request.post(authURL, {
    data: loginData,
  })
  const responseBody = await response.text()
  console.log('response body:', responseBody)
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody).toBeDefined()
})
