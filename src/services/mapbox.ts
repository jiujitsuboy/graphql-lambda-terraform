import fetch from 'node-fetch'

class MapBoxService {
  static url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/[address].json?access_token=pk.eyJ1Ijoiaml1aml0c3Vib3kiLCJhIjoiY2tvZ21pZGRmMGdrejJwbngzNTRla3kzYiJ9.PwbAnNWHysiVkoOu8Wf2pw'

  static async getCoordinateFromAddress(address: string): Promise<string> {
    const endpoint = this.url.replace('[address]', encodeURIComponent(address))
    const resp = await fetch(endpoint)
    const json = await resp.json()
    return json
  }
}

export default MapBoxService
