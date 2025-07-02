import { test } from '@playwright/test'
import { OrderDto } from './dto/order-dto'
import { LoginDto } from './dto/loginDto'

const loginURL = 'https://backend.tallinn-learning.ee/login/student'
const orderURL = 'https://backend.tallinn-learning.ee/orders'
const STATUS_OPEN = 'OPEN'
const TEST_CUSTOMER_NAME = 'Regina'
const TEST_CUSTOMER_PHONE = '123456789'

test('Authorization and order creation test', async ({ request }) => {
  const loginDto = new LoginDto(process.env.USER, process.env.PASSWORD)
  const apiResponse = await request.post(loginURL, {
    data: loginDto,
  })
  const jwt = await apiResponse.text()

  const orderDto = new OrderDto(STATUS_OPEN, 0, TEST_CUSTOMER_NAME, TEST_CUSTOMER_PHONE, 'no')
  const apiOrderResponse = await request.post(orderURL, {
    data: orderDto,
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
  console.log(apiOrderResponse.status())
  const orderJsonResponse = await apiOrderResponse.json()
  console.log('Order created:', orderJsonResponse)
})
test('Authorization and order deletion test', async ({ request }) => {
  const loginDto = new LoginDto(process.env.USER, process.env.PASSWORD)
  const apiResponse = await request.post(loginURL, {
    data: loginDto,
  })
  const jwt = await apiResponse.text()
  const orderDto = new OrderDto(STATUS_OPEN, 0, TEST_CUSTOMER_NAME, TEST_CUSTOMER_PHONE, 'no')
  const apiOrderResponse = await request.post(orderURL, {
    data: orderDto,
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
  const orderJsonResponse = await apiOrderResponse.json()
  const orderId = orderJsonResponse.id
  console.log('order id  received:', orderId)

  const deleteResponse = await request.delete(`${orderURL}/${orderId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
  console.log('Delete status:', deleteResponse.status())
})
test('Authorization and order search test', async ({ request }) => {
  const loginDto = new LoginDto(process.env.USER,process.env.PASSWORD)
  const apiResponse = await request.post(loginURL, {
    data: loginDto,
  })
  const jwt = await apiResponse.text()
  const orderDto = new OrderDto(STATUS_OPEN, 0, TEST_CUSTOMER_NAME, TEST_CUSTOMER_PHONE, 'no')
  const apiOrderResponse = await request.post(orderURL, {
    data: orderDto,
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
  const orderJsonResponse = await apiOrderResponse.json()
  const orderId = orderJsonResponse.id
  console.log('Order id  received:', orderId)

  const getOrderResponse = await request.get(`${orderURL}/${orderId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
  console.log('Get order status:', getOrderResponse.status())
  const getJsonResponse = await getOrderResponse.json()
  console.log('Order fetched:', getJsonResponse)
})
