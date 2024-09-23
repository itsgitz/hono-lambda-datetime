import { Hono } from 'hono'
import { handle } from 'hono/aws-lambda'
import { formatInTimeZone } from 'date-fns-tz'

const app = new Hono()
const expectedDate = '2024-09-23T23:00:00.000Z'

function generateTimestampNow() {
  return new Date().toISOString()
}

app.get('/', async (c) => {
  const disableMeetingAt = formatInTimeZone(expectedDate, 'Asia/Makassar', 'MMMM d, yyyy HH:mm')
  const dateTime = generateTimestampNow()
  const dateTimeTz = formatInTimeZone(dateTime, 'Asia/Makassar', 'MMMM d, yyyy HH:mm')

  return c.json({
    dateTime,
    dateTimeTz,
    disableMeetingAt,
    message: 'anggit adalah lambda'
  })
})

export const handler = handle(app)
