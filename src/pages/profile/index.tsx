// @author Claude Code (claude-sonnet-4-6)

import { View, Text } from '@tarojs/components'
import { AtList, AtListItem, AtAvatar } from 'taro-ui'
import { useAppSelector } from '@/store'
import { formatPhone } from '@/utils/format'
import './index.scss'

export default function Profile() {
  const { isLogin, userInfo } = useAppSelector((state) => state.user)

  return (
    <View className='profile-page'>
      <View className='user-card'>
        <View className='avatar'>
          {userInfo?.avatar ? (
            <AtAvatar circle image={userInfo.avatar} size='large' />
          ) : (
            <Text>👤</Text>
          )}
        </View>
        <View className='nickname'>
          {isLogin ? userInfo?.nickname || '用户' : '未登录'}
        </View>
        {isLogin && userInfo?.phone && (
          <View className='phone'>{formatPhone(userInfo.phone)}</View>
        )}
      </View>

      <View className='menu-list'>
        <AtList>
          <AtListItem title='我的订单' arrow='right' iconInfo={{ size: 25, color: '#6190e8', value: 'shopping-bag' }} />
          <AtListItem title='收货地址' arrow='right' iconInfo={{ size: 25, color: '#6190e8', value: 'map-pin' }} />
          <AtListItem title='设置' arrow='right' iconInfo={{ size: 25, color: '#6190e8', value: 'settings' }} />
        </AtList>
      </View>

      <View className='version'>版本 1.0.0</View>
    </View>
  )
}
