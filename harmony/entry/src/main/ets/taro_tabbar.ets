import type Taro from "./npm/@tarojs/taro/types"
import type { PageInstance, TaroAny, TaroElement, TaroObject, TaroNode, TaroViewElement, TFunc } from "./npm/@tarojs/runtime"
import type common from "@ohos.app.ability.common"


import router from "@ohos.router"
import { TaroView } from "./npm/@tarojs/components"
import { getSystemInfoSync } from "./npm/@tarojs/taro"
import { eventCenter, bindFn, callFn, convertNumber2VP, Current, document, initHarmonyElement, ObjectAssign, window } from "./npm/@tarojs/runtime"
import { createLazyChildren } from "./render"
import page0, { config as config0 } from './pages/index/index_taro_comp'
import page1, { config as config1 } from './pages/profile/index_taro_comp'
const createComponent = [page0, page1]
const config = [config0, config1]

interface ITabBarItem extends Taro.TabBarItem {
  key?: number
  badgeText?: string
  showRedDot?: boolean
}

const sysInfo: TaroAny = getSystemInfoSync()
@Entry
@Component
struct Index {
  scroller: Scroller[] = [new Scroller(), new Scroller()]
  page?: PageInstance
  onReady?: TaroAny
  @State pageList: PageInstance[] = []
  @State node: (TaroElement | null)[] = [null, null]
  @State layerNode: (TaroElement | null)[] = [null, null]
  @State navigationBarHomeBtn: boolean = true
  @State navigationBarLoading: boolean[] = [false, false]
  @State navigationBarBackgroundColor: string[] = [config0.navigationBarBackgroundColor, config1.navigationBarBackgroundColor]
  @State navigationBarTextStyle: string[] = [config0.navigationBarTextStyle, config1.navigationBarTextStyle]
  @State navigationBarTitleText: string[] = [config0.navigationBarTitleText, config1.navigationBarTitleText]
  @State pageBackgroundColor: string[] = [config0.backgroundColor, config1.backgroundColor]
  @State pageBackgroundContentColor: string[] = [config0.backgroundColorContent, config1.backgroundColorContent]
  @StorageLink("__TARO_PAGE_STACK") pageStack: router.RouterState[] = []
  @StorageProp("__TARO_ENTRY_PAGE_PATH") entryPagePath: string = ""
  @State appConfig: Taro.AppConfig = window.__taroAppConfig || {}
  @State tabBarList: ITabBarItem[] = this.appConfig.tabBar?.list || []
  @State isTabBarShow: boolean = true
  @State tabBar: Partial<Taro.TabBar> = this.appConfig.tabBar || {}
  @State tabBarColor: string = this.tabBar.color || "#7A7E83"
  @State tabBarSelectedColor: string = this.tabBar.selectedColor || "#3CC51F"
  @State tabBarBackgroundColor: string = this.tabBar.backgroundColor || "#FFFFFF"
  @State tabBarBorderStyle: "white" | "black" = this.tabBar.borderStyle || "black"
  @State tabBarPosition: "top" | "bottom" = this.tabBar.position || "bottom"
  @State tabBarWithImage: boolean = this.tabBarList.every(e => !!e.iconPath)
  @State tabBarAnimationDuration: number = 400
  @State tabBarCurrentIndex: number = 0
  private tabBarController: TabsController = new TabsController()

  getPageState () {
    const state = router.getState()
    state.path ||= 'taro_tabbar'
    if (state.path.endsWith('/')) {
    state.path += 'index'
    }
    return state
  }

  aboutToAppear () {
    const state = this.getPageState()
    if (this.pageStack.length >= state.index) {
      this.pageStack.length = state.index - 1
    }
    this.pageStack.push(state)
    const params = router.getParams() as Record<string, string> || {}
    let index: TaroAny = params.$page
      ? this.tabBarList.findIndex(e => e.pagePath === params.$page)
      : this.tabBarList.findIndex(e => e.pagePath === this.entryPagePath)
    index = index >= 0 ? index : 0
    this.handlePageAppear(index)
    this.setTabBarCurrentIndex(index)
    this.bindTabBarEvent()
  }

  aboutToDisappear () {
    this.pageList?.forEach(item => {
    callFn(item?.onUnload, this)
    })
    this.removeTabBarEvent()
  }

  handlePageAppear (index = this.tabBarCurrentIndex) {
    if (config[index].navigationStyle === 'custom') {
      Current.contextPromise
        .then((context: common.BaseContext) => {
          const win = window.__ohos.getLastWindow(context)
          win.then(mainWindow => {
            mainWindow.setFullScreen(true)
            mainWindow.setSystemBarEnable(["status", "navigation"])
        })
      })
    }

    const params = router.getParams() as Record<string, string> || {}
    this.pageList ||= []
    if (!this.pageList[index]) {
      this.pageList[index] = createComponent[index]()
      this.page = this.pageList[index]
      callFn(this.page?.onLoad, this, params, (instance: TaroElement) => {
        this.node[index] = instance
      })
      callFn(this.page?.onReady, this, params)
    }

  }

  onPageShow () {
    this.bindPageEvent()
    const state = this.getPageState()
    if (this.pageStack[this.pageStack.length - 1].path !== state.path) {
      this.pageStack.length = state.index
      this.pageStack[state.index - 1] = state
    }
    this.handleSwitchTab({ params: router.getParams() || {} })
    this.pageList?.forEach(item => {
      callFn(item?.onShow, this)
    })
  }

  onPageHide () {
    this.removePageEvent()
    this.pageList?.forEach(item => {
      callFn(item?.onHide, this)
    })
  }

  handleNavigationStyle = (option: TaroObject) => {
    if (option.title) this.navigationBarTitleText[this.tabBarCurrentIndex] = option.title
    if (option.backgroundColor) this.navigationBarBackgroundColor[this.tabBarCurrentIndex] = option.backgroundColor || '#000000'
    if (option.frontColor) this.navigationBarTextStyle[this.tabBarCurrentIndex] = option.frontColor || 'white'
    if (typeof option.loading === 'boolean') this.navigationBarLoading[this.tabBarCurrentIndex] = option.loading
  }

  handlePageStyle = (option: TaroObject) => {
    if (option.backgroundColor) this.pageBackgroundColor[this.tabBarCurrentIndex] = option.backgroundColor || '#FFFFFF'
    if (option.backgroundColorContext) this.pageBackgroundContentColor[this.tabBarCurrentIndex] = option.backgroundColorContext || '#FFFFFF'
  }

  bindPageEvent () {
    eventCenter?.on('__taroNavigationStyle', this.handleNavigationStyle)
    eventCenter?.on('__taroPageStyle', this.handlePageStyle)
  }

  removePageEvent () {
    eventCenter?.off('__taroNavigationStyle', this.handleNavigationStyle)
    eventCenter?.off('__taroPageStyle', this.handlePageStyle)
  }

  @Builder
  renderTitle () {
    Flex({
      direction: FlexDirection.Row,
      justifyContent: FlexAlign.Start,
      alignItems: ItemAlign.Center,
    }) {
      Text(this.navigationBarTitleText[this.tabBarCurrentIndex] || 'Taro App')
        .margin({ left: convertNumber2VP(40 / 7.5, 'vw') })
        .fontSize(convertNumber2VP(32 / 7.5, 'vw'))
        .fontColor((this.navigationBarTextStyle[this.tabBarCurrentIndex] || 'black') !== 'black' ? Color.White : Color.Black)
      if (this.navigationBarLoading[this.tabBarCurrentIndex]) {
        LoadingProgress()
          .margin({ left: convertNumber2VP(10 / 7.5, 'vw') })
          .height(convertNumber2VP(40 / 7.5, 'vw'))
          .width(convertNumber2VP(40 / 7.5, 'vw'))
          .color((this.navigationBarTextStyle[this.tabBarCurrentIndex] || 'black') !== 'black' ? Color.White : Color.Black)
      }
    }
    .height('100%')
    .width('100%')
    .backgroundColor(this.navigationBarBackgroundColor[this.tabBarCurrentIndex] || '#fff')
    .padding({
      top: px2vp(sysInfo.safeArea?.top || 0),
    })
    .zIndex(1)
  }

  setTabBarCurrentIndex = (index: number) => {
    this.tabBarCurrentIndex = index
    this.page = this.pageList[index]
  }

  updateTabBarKey = (index = 0, odd: TaroAny = {}) => {
    const obj: TaroAny = this.tabBarList[index]
    if (Object.keys(obj).every(key => odd[key] === obj[key])) return

    const idx: TaroAny = obj.key || index
    const len = this.tabBarList.length
    obj.key = (Math.floor(idx / len) + 1) * len + index
  }

  handleSwitchTab = (option: TaroObject) => {
    const index = this.tabBarList.findIndex(e => e.pagePath === option.params.$page)
    if (index >= 0 && this.tabBarCurrentIndex !== index) {
      this.page?.onHide?.()
      this.setTabBarCurrentIndex(index)
    }
  }

  handleSetTabBarBadge = (option: TaroObject) => {
    const list = [...this.tabBarList]
    if (!!list[option.index]) {
      const obj = list[option.index]
      const odd: ITabBarItem = ObjectAssign(obj)
      obj.showRedDot = false
      obj.badgeText = option.text
      this.updateTabBarKey(option.index, odd)
    }
    this.tabBarList = list
  }

  handleRemoveTabBarBadge = (option: TaroObject) => {
    const list = [...this.tabBarList]
    if (!!list[option.index]) {
      const obj = list[option.index]
      const odd: ITabBarItem = ObjectAssign(obj)
      obj.badgeText = undefined
      this.updateTabBarKey(option.index, odd)
    }
    this.tabBarList = list
  }

  handleShowTabBarRedDot = (option: TaroObject) => {
    const list = [...this.tabBarList]
    if (!!list[option.index]) {
      const obj = list[option.index]
      const odd: ITabBarItem = ObjectAssign(obj)
      obj.badgeText = undefined
      obj.showRedDot = true
      this.updateTabBarKey(option.index, odd)
    }
    this.tabBarList = list
  }

  handleHideTabBarRedDot = (option: TaroObject) => {
    const list = [...this.tabBarList]
    if (!!list[option.index]) {
      const obj = list[option.index]
      const odd: ITabBarItem = ObjectAssign(obj)
      obj.showRedDot = false
      this.updateTabBarKey(option.index, odd)
    }
    this.tabBarList = list
  }

  handleShowTabBar = (option: TaroObject) => {
    if (option.animation) {
      animateTo({
        duration: this.tabBarAnimationDuration,
        tempo: 1,
        playMode: PlayMode.Normal,
        iterations: 1,
      }, () => {
        this.isTabBarShow = true
      })
    } else {
      this.isTabBarShow = true
    }
  }

  handleHideTabBar = (option: TaroObject) => {
    if (option.animation) {
      animateTo({
        duration: this.tabBarAnimationDuration,
        tempo: 1,
        playMode: PlayMode.Normal,
        iterations: 1,
      }, () => {
        this.isTabBarShow = false
      })
    } else {
      this.isTabBarShow = false
    }
  }

  handleSetTabBarStyle = (option: TaroObject) => {
    if (option.backgroundColor) this.tabBarBackgroundColor = option.backgroundColor
    if (option.borderStyle) this.tabBarBorderStyle = option.borderStyle
    if (option.color) this.tabBarColor = option.color
    if (option.selectedColor) this.tabBarSelectedColor = option.selectedColor
  }

  handleSetTabBarItem = (option: TaroObject) => {
    const list = [...this.tabBarList]
    if (!!list[option.index]) {
      const obj = list[option.index]
      const odd: ITabBarItem = ObjectAssign(obj)
      if (option.iconPath) {
        obj.iconPath = option.iconPath
        this.tabBarWithImage = true
      }
      if (option.selectedIconPath) obj.selectedIconPath = option.selectedIconPath
      if (option.text) obj.text = option.text
      this.updateTabBarKey(option.index, odd)
    }
    this.tabBarList = list
  }

  bindTabBarEvent () {
    eventCenter.on('__taroSwitchTab', this.handleSwitchTab)
    eventCenter.on('__taroSetTabBarBadge', this.handleSetTabBarBadge)
    eventCenter.on('__taroRemoveTabBarBadge', this.handleRemoveTabBarBadge)
    eventCenter.on('__taroShowTabBarRedDotHandler', this.handleShowTabBarRedDot)
    eventCenter.on('__taroHideTabBarRedDotHandler', this.handleHideTabBarRedDot)
    eventCenter.on('__taroShowTabBar', this.handleShowTabBar)
    eventCenter.on('__taroHideTabBar', this.handleHideTabBar)
    eventCenter.on('__taroSetTabBarStyle', this.handleSetTabBarStyle)
    eventCenter.on('__taroSetTabBarItem', this.handleSetTabBarItem)
  }

  removeTabBarEvent () {
    eventCenter.off('__taroSwitchTab', this.handleSwitchTab)
    eventCenter.off('__taroSetTabBarBadge', this.handleSetTabBarBadge)
    eventCenter.off('__taroRemoveTabBarBadge', this.handleRemoveTabBarBadge)
    eventCenter.off('__taroShowTabBarRedDotHandler', this.handleShowTabBarRedDot)
    eventCenter.off('__taroHideTabBarRedDotHandler', this.handleHideTabBarRedDot)
    eventCenter.off('__taroShowTabBar', this.handleShowTabBar)
    eventCenter.off('__taroHideTabBar', this.handleHideTabBar)
    eventCenter.off('__taroSetTabBarStyle', this.handleSetTabBarStyle)
    eventCenter.off('__taroSetTabBarItem', this.handleSetTabBarItem)
  }

  @Builder
  renderTabBarInnerBuilder (index: number, item: ITabBarItem) {
    Column() {
      if (this.tabBarWithImage) {
        Image(this.tabBarCurrentIndex === index && item.selectedIconPath || item.iconPath)
          .width(24)
          .height(24)
          .objectFit(ImageFit.Contain)
        Text(item.text)
          .fontColor(this.tabBarCurrentIndex === index ? this.tabBarSelectedColor : this.tabBarColor)
          .fontSize(10)
          .fontWeight(this.tabBarCurrentIndex === index ? 500 : 400)
          .lineHeight(14)
          .maxLines(1)
          .textOverflow({ overflow: TextOverflow.Ellipsis })
          .margin({ top: 7, bottom: 7 })
      } else {
        Text(item.text)
          .fontColor(this.tabBarCurrentIndex === index ? this.tabBarSelectedColor : this.tabBarColor)
          .fontSize(16)
          .fontWeight(this.tabBarCurrentIndex === index ? 500 : 400)
          .lineHeight(22)
          .maxLines(1)
          .textOverflow({ overflow: TextOverflow.Ellipsis })
          .margin({ top: 17, bottom: 7 })
      }
    }
  }

  @Builder
  renderTabItemBuilder (index: number, item: ITabBarItem) {
    Column() {
      if (!!item.badgeText || item.showRedDot) {
        Badge({
          value: item.badgeText || "",
          position: BadgePosition.RightTop,
          style: {
            badgeSize: !!item.badgeText ? 16 : 6,
            badgeColor: Color.Red,
          }
        }) {
          this.renderTabBarInnerBuilder(index, item)
        }
      } else {
        this.renderTabBarInnerBuilder(index, item)
      }
    }
    .margin({ top: 4 })
    .width("100%").height("100%")
    .justifyContent(FlexAlign.SpaceEvenly)
  }

  build () {
    Tabs({
      barPosition: this.tabBarPosition !== 'top' ? BarPosition.End : BarPosition.Start,
      controller: this.tabBarController,
      index: this.tabBarCurrentIndex,
    }) {
      ForEach(this.tabBarList, (item: ITabBarItem, index) => {
        TabContent() {
          Navigation() {
              Scroll(this.scroller[index]) {
                Column() {
                  if (this.node[index]) {
                    TaroView({ node: this.node[index] as TaroViewElement, createLazyChildren: createLazyChildren })
                    if (this.layerNode[index]) {
                      Stack() {
                        createLazyChildren(this.layerNode[index] as TaroElement, 1)
                      }
                      .position({ x: 0, y: 0 })
                      .height('100%')
                      .width('100%')
                      .responseRegion({ x: 0, y: 0, width: 0, height: 0 })
                    }
                  }
                }
                .width('100%')
                .alignItems(HorizontalAlign.Start)
                .constraintSize({
                  minHeight: '100%',
                })
                .onAreaChange((_: Area, area: Area) => {
                  const node: TaroElement | null = this.node[index]
                  if (node) {
                    node._nodeInfo._scroll = area
                  }
                })
              }
              .backgroundColor(this.pageBackgroundContentColor[index] || this.pageBackgroundColor[index] || "#FFFFFF")
              .clip(false)
              .height('100%')
              .scrollBar(typeof config[index].enableScrollBar === 'boolean' ? config[index].enableScrollBar : false)
              .onAreaChange((_: Area, area: Area) => {
                const node: TaroElement | null = this.node[index]
                if (node) {
                  node._nodeInfo._client = area
                }
              })
              .onDidScroll(() => {
                if (!this.page) return

                const offset: TaroObject = this.scroller[index]?.currentOffset()
                callFn(this.page?.onPageScroll, this, {
                  scrollTop: offset.xOffset || 0,
                  scrollLeft: offset.yOffset || 0,
                })
              })
              .onScrollStop(() => {
                if (!this.page) return

                const offset: TaroObject = this.scroller[index]?.currentOffset()
                const distance: number = config[index].onReachBottomDistance || 50
                const clientHeight: number = Number(this.node[index]?._nodeInfo?._client?.height) || 0
                const scrollHeight: number = Number(this.node[index]?._nodeInfo?._scroll?.height) || 0
                if (scrollHeight - clientHeight - offset.yOffset <= distance) {
                  callFn(this.page?.onReachBottom, this)
                }
              })
          }
          .backgroundColor(this.pageBackgroundColor[index] || "#FFFFFF")
          .height('100%')
          .width('100%')
          .title({ builder: this.renderTitle, height: 48 + px2vp(sysInfo.safeArea?.top || 0) })
          .titleMode(NavigationTitleMode.Mini)
          .hideTitleBar(config[index].navigationStyle === 'custom')
          .hideBackButton(true)
        }.tabBar(this.renderTabItemBuilder(index, item))
      }, (item: ITabBarItem, index) => `${item.key || index}`)
    }
    .vertical(false)
    .barMode(BarMode.Fixed)
    .barHeight(this.isTabBarShow ? 56 : 0)
    .animationDuration(this.tabBarAnimationDuration)
    .onChange((index: number) => {
      if (this.tabBarCurrentIndex !== index) {
        callFn(this.page?.onHide, this)
        this.setTabBarCurrentIndex(index)
      }
      this.handlePageAppear()
      callFn(this.page?.onShow, this)
    })
    .backgroundColor(this.tabBarBackgroundColor)
    .padding({
      bottom: px2vp(sysInfo.screenHeight - (sysInfo.safeArea?.bottom || 0)),
    })
  }
}
