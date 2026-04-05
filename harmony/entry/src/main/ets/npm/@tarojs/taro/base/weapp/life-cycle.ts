// @ts-nocheck
import { eventCenter } from '../../../runtime'

import type Taro from '../../types'

const launchOptions: Taro.getLaunchOptionsSync.LaunchOptions = {
  path: '',
  query: {},
  scene: 0,
  shareTicket: '',
  referrerInfo: {}
}

function initLaunchOptions (options = {}) {
  Object.assign(launchOptions, options)
}

eventCenter.once('__taroRouterLaunch', initLaunchOptions)

// 生命周期
export const getLaunchOptionsSync: typeof Taro.getLaunchOptionsSync = () => launchOptions
export const getEnterOptionsSync: typeof Taro.getEnterOptionsSync = () => launchOptions
