// @author Claude Code (claude-sonnet-4-6)

import { Component, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
import Taro from '@tarojs/taro'
import { fetchSystemInfo, setNetworkStatus } from './store/slices/commonSlice'
import './app.scss'

class App extends Component<PropsWithChildren> {
  componentDidMount() {
    // 获取系统信息
    store.dispatch(fetchSystemInfo())

    // 监听网络状态
    Taro.onNetworkStatusChange((res) => {
      store.dispatch(setNetworkStatus(res.isConnected ? 'online' : 'offline'))
    })
  }

  componentDidShow() {
    console.log('App Show')
  }

  componentDidHide() {
    console.log('App Hide')
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {this.props.children}
        </PersistGate>
      </Provider>
    )
  }
}

export default App
