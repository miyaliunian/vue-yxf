import { post as POST } from './http'
import {
  IResponse,
  IURLParams,
  IURLQuantum,
  IULStuc,
  IUser,
  IContract,
  IINOrder,
  IOUTOrder,
  IINFamily,
  IADDFamily,
  IREMOVEFamily,
  APICODE,
  IFirstYxfIN,
  IINUNSign,
  IINTBill,
  IOUTBill,
  IToken,
  IOUTSIGN,
  IOUTFamilies,
  IAuthor,
} from '../typings'

// 判断授权状态
const authorization = (
  bodyParams: IULStuc<IToken>
): Promise<IResponse<IAuthor>> => {
  bodyParams.apiCode = APICODE.AUTHORIZATION
  return POST<IResponse<IAuthor>>(``, bodyParams)
}

// 更新授权状态
const saveAuthorization = (
  bodyParams: IULStuc<IToken>
): Promise<IResponse<IAuthor>> => {
  bodyParams.apiCode = APICODE.SAVEAUTHORIZATION
  return POST<IResponse<IAuthor>>(``, bodyParams)
}

// 第三方换取Token
const converToken = (
  bodyParams: IULStuc<IToken>
): Promise<IResponse<IURLParams>> => {
  bodyParams.apiCode = APICODE.CREDITPAYPERSONINFO
  return POST<IResponse<IURLParams>>(``, bodyParams)
}

// 签约状态
const contractStatus = (
  bodyParams: IULStuc<IURLParams>
): Promise<IResponse<IUser>> => {
  bodyParams.apiCode = APICODE.CEDITUSER
  return POST<IResponse<IUser>>(``, bodyParams)
}

// 签约信息
const contractInfo = (
  bodyParams: IULStuc<IURLQuantum>
): Promise<IResponse<IContract>> => {
  bodyParams.apiCode = APICODE.CONTRACTAMOUNT
  return POST<IResponse<IContract>>(``, bodyParams)
}

// 查账还款
const checkBill = (
  bodyParams: IULStuc<IURLQuantum>
): Promise<IResponse<IOUTBill>> => {
  bodyParams.apiCode = APICODE.REPAY
  return POST<IResponse>(``, bodyParams)
}

// 订单
const order = (
  bodyParams: IULStuc<IINOrder>
): Promise<IResponse<IOUTOrder[]>> => {
  bodyParams.apiCode = APICODE.PAYMENTORDER
  return POST<IResponse<IOUTOrder[]>>(``, bodyParams)
}

// 情亲付
const family = (
  bodyParams: IULStuc<IINFamily>
): Promise<IResponse<IOUTFamilies>> => {
  bodyParams.apiCode = APICODE.FAMILYLIST
  return POST<IResponse<IOUTFamilies>>(``, bodyParams)
}

// 情亲付-新增
const familyADD = (bodyParams: IULStuc<IADDFamily>): Promise<IResponse> => {
  bodyParams.apiCode = APICODE.FAMILYAUTHORIZE
  return POST<IResponse>(``, bodyParams)
}

// 还款记录
const bills = (bodyParams: IULStuc<IINTBill>): Promise<IResponse<IOUTBill>> => {
  bodyParams.apiCode = APICODE.BILLREPAYLIST
  return POST<IResponse>(``, bodyParams)
}

// 情亲付-解绑
const familyRemove = (
  bodyParams: IULStuc<IREMOVEFamily>
): Promise<IResponse> => {
  bodyParams.apiCode = APICODE.FAMILYUNAUTHORIZE
  return POST<IResponse>(``, bodyParams)
}

// 签约 - 医院列表
const banks = (bodyParams: IULStuc): Promise<IResponse> => {
  bodyParams.apiCode = APICODE.BANK
  return POST<IResponse>(``, bodyParams)
}

// 设置 - 优先使用信用付
const setYxf = (bodyParams: IULStuc<IFirstYxfIN>): Promise<IResponse> => {
  bodyParams.apiCode = APICODE.FIRSTYXF
  return POST<IResponse>(``, bodyParams)
}
// 设置 - 解约
const unCredit = (bodyParams: IULStuc<IINUNSign>): Promise<IResponse> => {
  bodyParams.apiCode = APICODE.UNSIGN
  return POST<IResponse>(``, bodyParams)
}

// 同意协议并签约
const creditSign = (
  bodyParams: IULStuc<IURLQuantum>
): Promise<IResponse<IOUTSIGN>> => {
  bodyParams.apiCode = APICODE.SIGN
  return POST<IResponse>(``, bodyParams)
}

export default {
  authorization,
  saveAuthorization,
  converToken,
  contractStatus,
  contractInfo,
  checkBill,
  order,
  family,
  familyADD,
  familyRemove,
  banks,
  setYxf,
  unCredit,
  bills,
  creditSign,
}
