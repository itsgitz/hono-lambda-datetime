import { Hono } from 'hono'
import { handle } from 'hono/aws-lambda'
import { formatInTimeZone } from 'date-fns-tz'
import {compareAsc} from 'date-fns'

const app = new Hono()
//const expectedDate = '2024-09-23T23:00:00.000Z'
const expectedDate = '2024-09-23T09:00:00.000Z'

function generateTimestampNow() {
  return new Date().toISOString()
}

app.get('/', async (c) => {
  const disableMeetingAt = formatInTimeZone(expectedDate, 'Asia/Makassar', 'MMMM d, yyyy HH:mm')
  const dateNow = generateTimestampNow()
  const dateNowTz = formatInTimeZone(dateNow, 'Asia/Makassar', 'MMMM d, yyyy HH:mm')

  const isDisabled = (new Date(dateNowTz) > new Date(disableMeetingAt))

  return c.json({
    dateNow,
    dateNowTz,
    disableMeetingAt,
    isDisabled,
    message: 'anggit adalah lambda'
  })
})

export const handler = handle(app)
