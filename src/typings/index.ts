import { IHos } from '@/store/types'

export interface IResponse<T = any> {
  code: number | string
  data: T
  success: boolean
  message: string
}

export interface IToken {
  token: string
}

export interface IURLParams {
  creditUserId?: string
  name: string
  idno: string
  tele?: string
}

export interface IAuthor {
  authorization: string
}

export interface IURLQuantum {
  creditUserId?: string
  name?: string
  idno?: string
  tele?: string
  payType?: string
  firstYxf?: boolean
}

export interface IINOrder {
  payUserId: string
  orderType: string
  pageNum: number
  pageSize: number
}

export type IINFamily = IURLQuantum

export interface IFamilyMemeber {
  id: string
  idno: string
  mobileNo: string
  name: string
}

export interface IOUTFamilies {
  familyList: IFamilyMemeber[]
  familySize: string
  familyLimit: string
}

export interface IADDFamily extends IURLQuantum {
  name: string
  idno: string
  certType: string
  mobileNo: string
}

// export type IINUNSign = IADDFamily

export interface IINUNSign {
  token: string
  creditUserId: string
  name: string
  idno: string
}

export interface IREMOVEFamily extends IURLQuantum {
  familyUserId: string
}

export interface IOUTBank {
  payName: string
  gracePeriod: string
  outLimit: string
  hosLimit: string
  hospitalInfo: IHos[]
}

export interface IOUTOrder {
  id: string
  patientName: string
  hsaOrgName: string
  modifyDate: string
  orderStatus: string
  orderType: string
  totCost: string
  createDate: string
  ownCost: string
}

export interface IINTBill {
  creditUserId: string
  pageNum: number
  pageSize: number
}

export interface IOUTBill {
  repayDate: string
  repayAmount: string
}

export interface IPageOUTOrder {
  data: IOUTOrder[]
  pageNum: number
  lastPage: number
}

export interface IPageOUTBill {
  data: IOUTBill[]
  pageNum: number
  lastPage: number
}

export interface IULStuc<T = unknown> {
  appId: string
  chartset: string
  apiCode: string
  timestamp: string
  version: string
  data: T
}

export interface IOUTSIGN {
  creditH5Url: string
}

export interface IOUTBill {
  creditH5Url: string
}

export interface IUser extends IURLParams {
  creditLimit?: string
  currentCreditLimit?: string
  outLimit?: string
  hosLimit?: string
  outCurrentCreditLimit: string
  hosCurrentCreditLimit: string
  businessType?: string
  signChannel?: string
  signStatus: string
  outCreditLimit: string
  firstYxf: string
  idType?: string
}

export interface IContract extends IURLParams {
  outCurrentCreditLimit: string
  hosCurrentCreditLimit: string
  outCreditLimit: string
  name: string
  firstYxf: string
}

export interface IFirstYxfIN {
  creditUserId: string
  firstXyf: string
}

export enum APICODE {
  AUTHORIZATION = 'homepage.queryAuthorization', // 判断授权状态
  SAVEAUTHORIZATION = 'homepage.saveAuthorization', // 更新授权状态
  CREDITPAYPERSONINFO = 'homepage.creditPayPersonInfo', // token换取本地参数
  CEDITUSER = 'homepage.creditUser', // 签约状态查询
  CONTRACTAMOUNT = 'homepage.contractAmount', // 签约额度
  XYFUNSIGN = 'xyf.unsign',
  REPAY = 'homepage.repay',
  PAYMENTORDER = 'homepage.paymentOrder',
  FAMILYLIST = 'homepage.familyList',
  UNAUTHORIZE = 'homepage.unauthorize',
  FAMILYAUTHORIZE = 'homepage.familyAuthorize',
  FAMILYUNAUTHORIZE = 'family.unauthorize',
  BANK = 'homepage.bank',
  FIRSTYXF = 'homepage.firstYxf',
  UNSIGN = 'xyf.unsign',
  BILLREPAYLIST = 'bill.repay.list',
  SIGN = 'homepage.sign',
}

export enum EPage {
  whole = 'WholePerInfoPage',
  divide = 'DividePerInfoPage',
}
