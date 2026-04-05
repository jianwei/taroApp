// @author Claude Code (claude-sonnet-4-6)

import { View, Text } from '@tarojs/components'
import { AtButton, AtList, AtListItem, AtToast, AtCard } from 'taro-ui'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store'
import { login, logout } from '@/store/slices/userSlice'
import { getPlatformName } from '@/utils/platform'
import './index.scss'

export default function Index() {
  const [toastOpen, setToastOpen] = useState(false)
  const [toastText, setToastText] = useState('')
  const dispatch = useAppDispatch()
  const { isLogin, userInfo, loading } = useAppSelector((state) => state.user)
  const { systemInfo, networkStatus } = useAppSelector((state) => state.common)

  const handleLogin = async () => {
    try {
      await dispatch(login()).unwrap()
      setToastText('登录成功')
      setToastOpen(true)
    } catch (error) {
      setToastText('登录失败')
      setToastOpen(true)
    }
  }

  const handleLogout = () => {
    dispatch(logout())
    setToastText('已退出登录')
    setToastOpen(true)
  }

  return (
    <View className='index-page'>
      <View className='header'>
        <Text className='title'>Taro 4 跨端应用</Text>
        <Text className='subtitle'>支持微信小程序、H5、APP、鸿蒙</Text>
      </View>

      <AtCard title='系统信息'>
        <AtList>
          <AtListItem title='当前平台' extraText={getPlatformName()} />
          <AtListItem title='网络状态' extraText={networkStatus === 'online' ? '在线' : '离线'} />
          {systemInfo && (
            <>
              <AtListItem title='设备型号' extraText={systemInfo.model || '-'} />
              <AtListItem title='系统版本' extraText={systemInfo.system || '-'} />
            </>
          )}
        </AtList>
      </AtCard>

      {isLogin && userInfo && (
        <AtCard title='用户信息' className='content'>
          <AtList>
            <AtListItem title='昵称' extraText={userInfo.nickname || '-'} />
            <AtListItem title='手机号' extraText={userInfo.phone || '-'} />
          </AtList>
        </AtCard>
      )}

      <View className='actions'>
        {isLogin ? (
          <AtButton type='secondary' onClick={handleLogout}>
            退出登录
          </AtButton>
        ) : (
          <AtButton type='primary' loading={loading} onClick={handleLogin}>
            微信登录
          </AtButton>
        )}
      </View>

      <AtToast
        isOpened={toastOpen}
        text={toastText}
        onClose={() => setToastOpen(false)}
      />
    </View>
  )
}
