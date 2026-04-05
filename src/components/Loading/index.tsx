// @author Claude Code (claude-sonnet-4-6)

import { View } from '@tarojs/components'
import { AtActivityIndicator } from 'taro-ui'
import './index.scss'

interface LoadingProps {
  text?: string
  size?: number
  color?: string
}

export default function Loading({
  text = '加载中...',
  size = 32,
  color = '#6190e8',
}: LoadingProps) {
  return (
    <View className='loading-component'>
      <AtActivityIndicator size={size} color={color} />
      {text && <View className='loading-text'>{text}</View>}
    </View>
  )
}
