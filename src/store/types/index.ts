import {
  IAuthor,
  IFamilyMemeber,
  IOUTBank,
  IOUTBill,
  IOUTOrder,
  IUser,
} from '@/typings'

export interface IPage {
  error: boolean
  pageNum: number
  loading: boolean
  refreshing: boolean
  finished: boolean
  isEmpty: boolean
}

export interface IContState {
  userInfo: IUser
}

export interface IPendingState {
  userInfo: IUser
}

export type IWarrentState = IAuthor

export interface ICardState {
  targetUrl: string
}

export interface IFamilyState {
  placeHolder: boolean
  families: IFamilyMemeber[]
  familSize: string
  familyLimit: string
  creditUserId: string
}

export interface IOrderState extends IPage {
  order: IOUTOrder[]
}

export interface IBillState extends IPage {
  bills: IOUTBill[]
}

export interface IBankState {
  banks: IOUTBank[]
  hosips: IHos[]
}

export interface RootState {
  errorState: boolean
  errPlaceHolder: string
  loading: boolean
}

export interface ISetState {
  first: string
}

export interface IFamilyPara {
  creditUserId: string
}

export interface IHos {
  name: string
}

export interface IGlobalState extends RootState {
  interModule: IContState
  cardModule: ICardState
  orderModule: IOrderState
  billModule: IBillState
  familyModule: IFamilyState
  setModule: ISetState
}
