// @author Claude Code (kimi-k2.5)

import { Component, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import './app.scss'

console.log('[app.tsx] Loading app.tsx')
console.log('[app.tsx] store import:', store)

class App extends Component<PropsWithChildren> {
  componentDidMount() {
    console.log('[app.tsx] App mounted, store:', store)
  }

  componentDidShow() {
    console.log('App Show')
  }

  componentDidHide() {
    console.log('App Hide')
  }

  render() {
    console.log('[app.tsx] Rendering App, store:', store)
    if (!store) {
      console.error('[app.tsx] store is undefined!')
      return <>{this.props.children}</>
    }
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
