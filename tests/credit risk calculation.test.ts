import { expect, test } from '@playwright/test'

import { StatusCodes } from 'http-status-codes'
import { OrderDto } from './dto/risk calculation-dto'
const baseURL = 'https://backend.tallinn-learning.ee/test-orders'

test('post order with valid income >0 should receive code 200', async ({ request }) => {
  const requestBody = new OrderDto(100, 0, 17, 1000, 12)

  const rawResponse = await request.post(baseURL, {
    data: requestBody,
  })
  console.log('response status:', rawResponse.status())
  console.log('response body:', await rawResponse.json())
  expect.soft(rawResponse.status()).toBe(StatusCodes.OK)
})
test('post order with negative income  should receive code 400', async ({ request }) => {
  const requestBody = new OrderDto(-100, 0, 17, 1000, 12)
  const rawResponse = await request.post(baseURL, { data: requestBody})
  console.log('response status:', rawResponse.status())
  console.log('response body:', await rawResponse.json())
  expect.soft(rawResponse.status()).toBe(StatusCodes.BAD_REQUEST)
})
test('post order with negative debt  should receive code 400', async ({ request }) => {
  const requestBody = new OrderDto(100, -1, 17, 1000, 12)
  // Send a POST request to the server
  const rawResponse = await request.post(baseURL, {
    data: requestBody,
  })
  console.log('response status:', rawResponse.status())
  console.log('response body:', await rawResponse.text())
  //status code
  expect.soft(rawResponse.status()).toBe(StatusCodes.BAD_REQUEST)
})
test('post order with positive debt  should receive code 200', async ({ request }) => {
  const requestBody = new OrderDto(100, 1, 17, 1000, 12)
  const rawResponse = await request.post(baseURL, {
    data: requestBody,
  })
  console.log('response status:', rawResponse.status())
  console.log('response body:', await rawResponse.json())
  expect.soft(rawResponse.status()).toBe(StatusCodes.OK)
})
test('post order with age more than 16 should receive code 200', async ({ request }) => {
  const requestBody = new OrderDto(100, 0, 17, 1000, 12)

  const rawResponse = await request.post(baseURL, {
    data: requestBody,
  })
  console.log('response status:', rawResponse.status())
  console.log('response body:', await rawResponse.json())

  expect.soft(rawResponse.status()).toBe(StatusCodes.OK)
})
test('post order with age less then 16 should receive code 400', async ({ request }) => {
  const requestBody = new OrderDto(100, 0, 15, 1000, 12)

  const rawResponse = await request.post(baseURL, {
    data: requestBody,
  })
  console.log('response status:', rawResponse.status())
  console.log('response body:', await rawResponse.json())

  expect.soft(rawResponse.status()).toBe(StatusCodes.BAD_REQUEST)
})
