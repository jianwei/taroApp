// @author Claude Code (kimi-k2.5)

import { View, Text, Button, StyleSheet, ScrollView } from 'react-native'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { login, logout } from '../../store/slices/userSlice'

export default function Index() {
  const [toastText, setToastText] = useState('')
  const dispatch = useAppDispatch()
  const { isLogin, userInfo, loading } = useAppSelector((state) => state.user)
  const { systemInfo, networkStatus } = useAppSelector((state) => state.common)

  const handleLogin = async () => {
    try {
      await dispatch(login()).unwrap()
      setToastText('登录成功')
    } catch (error) {
      setToastText('登录失败')
    }
  }

  const handleLogout = () => {
    dispatch(logout())
    setToastText('已退出登录')
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Taro 4 跨端应用</Text>
        <Text style={styles.subtitle}>React Native 版本</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>系统信息</Text>
        <View style={styles.list}>
          <View style={styles.listItem}>
            <Text>当前平台</Text>
            <Text style={styles.extra}>iOS</Text>
          </View>
          <View style={styles.listItem}>
            <Text>网络状态</Text>
            <Text style={styles.extra}>{networkStatus === 'online' ? '在线' : '离线'}</Text>
          </View>
          {systemInfo && (
            <>
              <View style={styles.listItem}>
                <Text>设备型号</Text>
                <Text style={styles.extra}>{systemInfo.model || '-'}</Text>
              </View>
              <View style={styles.listItem}>
                <Text>系统版本</Text>
                <Text style={styles.extra}>{systemInfo.system || '-'}</Text>
              </View>
            </>
          )}
        </View>
      </View>

      {isLogin && userInfo && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>用户信息</Text>
          <View style={styles.list}>
            <View style={styles.listItem}>
              <Text>昵称</Text>
              <Text style={styles.extra}>{userInfo.nickname || '-'}</Text>
            </View>
            <View style={styles.listItem}>
              <Text>手机号</Text>
              <Text style={styles.extra}>{userInfo.phone || '-'}</Text>
            </View>
          </View>
        </View>
      )}

      <View style={styles.actions}>
        {isLogin ? (
          <Button title="退出登录" onPress={handleLogout} color="#ff4d4f" />
        ) : (
          <Button title={loading ? '登录中...' : '微信登录'} onPress={handleLogin} disabled={loading} />
        )}
      </View>

      {toastText ? (
        <View style={styles.toast}>
          <Text style={styles.toastText}>{toastText}</Text>
        </View>
      ) : null}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  card: {
    backgroundColor: '#fff',
    margin: 10,
    marginTop: 0,
    padding: 15,
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  list: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  extra: {
    color: '#666',
  },
  actions: {
    margin: 10,
    marginTop: 20,
  },
  toast: {
    position: 'absolute',
    top: 100,
    left: '20%',
    right: '20%',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  toastText: {
    color: '#fff',
    fontSize: 14,
  },
})
