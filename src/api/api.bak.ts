import { post as POST } from './http'
import { IResponse } from './type'

interface WristbandQrParams {
  wristbandQr: string
}

const detail: (
  bodyParams: WristbandQrParams
) => Promise<IResponse<WristbandQrParams>> = (
  bodyParams: WristbandQrParams
): Promise<IResponse<WristbandQrParams>> =>
  POST<IResponse<WristbandQrParams>>(
    '/flowRate/v1.0/getFlowRateDetailByW',
    bodyParams
  )
export { detail }
