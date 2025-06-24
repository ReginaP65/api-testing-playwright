import { expect, test } from '@playwright/test'

import { StatusCodes } from 'http-status-codes'
import { OrderDto } from './dto/order-dto'

const baseURL = 'https://backend.tallinn-learning.ee/test-orders'
const STATUS_OPEN = 'OPEN'
const TEST_CUSTOMER_NAME = 'MikkTesting'
const CUSTOMER_PHONE = '55456'

test('get order with correct id should receive code 200', async ({ request }) => {
  // Build and send a GET request to the server
  const apiResponse = await request.get(baseURL + '/2')
  // Log the response status, body and headers
  console.log('response body:', await apiResponse.json())
  console.log('response headers:', apiResponse.headers())
  // Check if the response status is 200
  expect(apiResponse.status()).toBe(200)
})

test('get order with incorrect id should receive code 400', async ({ request }) => {
  // Build and send a GET request to the server
  const apiResponse = await request.get(baseURL + '/11')
  // Log the response status, body and headers
  console.log('response body:', await apiResponse.json())
  console.log('response headers:', apiResponse.headers())
  // Check if the response status is 400
  expect(apiResponse.status()).toBe(400)
})

test('post order with correct status should receive code 200', async ({ request }) => {
  const requestBody = new OrderDto(STATUS_OPEN, 0, TEST_CUSTOMER_NAME, CUSTOMER_PHONE, 'no')

  // Send a POST request to the server
  const rawResponse = await request.post(baseURL, {
    data: requestBody,
  })
  // Log the response status and body
  console.log('response status:', rawResponse.status())
  console.log('response body:', await rawResponse.json())
  const responseBody = await rawResponse.json()
  //status code
  expect.soft(rawResponse.status()).toBe(StatusCodes.OK)
  //assertions
  expect.soft(responseBody.status).toBe(STATUS_OPEN)
  expect.soft(responseBody.customerName).toBe(TEST_CUSTOMER_NAME)
  expect.soft(responseBody.customerPhone).toBe(CUSTOMER_PHONE)
})

test('post order with incorrect status should receive code 400', async ({ request }) => {
  const requestBody = new OrderDto('BLOCKED', 0, 'Mikk', '55456', 'no')
  // Send a POST request to the server
  const response = await request.post(baseURL, {
    data: requestBody,
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})
