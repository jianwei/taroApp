// @ts-nocheck
import { Animation } from './animation'

import type Taro from '../../types'

export const createAnimation = (option: Taro.createAnimation.Option) => {
  return new Animation(option)
}
