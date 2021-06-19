import { mocked } from 'ts-jest/utils'
import fetch from 'node-fetch'
import { jsonSuccessResponse } from '../mocks/mapBoxJsonResponse'
import MapBoxService from '../services/mapbox'

jest.mock('node-fetch')

describe('Fetch coordinates from mapbox module', () => {
  it('Get address coordinates', async () => {
    //GIVEN
    const address = 'Tv 3 # 51-49'
    const response = {
      size: 0,
      timeout: 0,
      buffer: 0,
      textConverted: 0,
      json(): Promise<any> {
        return Promise.resolve(jsonSuccessResponse)
      },
    } as any
    //WHEN
    mocked(fetch).mockImplementation(() => Promise.resolve(response))

    //THEN
    const coordinatesReceived = await MapBoxService.getCoordinateFromAddress(address)
    expect(coordinatesReceived).not.toBe(null)
    expect(coordinatesReceived).toBe(jsonSuccessResponse)
  })
})
