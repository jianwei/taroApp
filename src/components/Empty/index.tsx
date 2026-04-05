// @author Claude Code (claude-sonnet-4-6)

import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './index.scss'

interface EmptyProps {
  title?: string
  description?: string
  buttonText?: string
  onButtonClick?: () => void
}

export default function Empty({
  title = '暂无数据',
  description,
  buttonText,
  onButtonClick,
}: EmptyProps) {
  return (
    <View className='empty-component'>
      <View className='empty-icon'>📦</View>
      <View className='empty-title'>{title}</View>
      {description && <View className='empty-desc'>{description}</View>}
      {buttonText && (
        <AtButton type='primary' size='small' onClick={onButtonClick}>
          {buttonText}
        </AtButton>
      )}
    </View>
  )
}
