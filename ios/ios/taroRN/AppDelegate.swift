// @author Claude Code (kimi-k2.5)

import UIKit
import React

@main
class AppDelegate: UIResponder, UIApplicationDelegate, RCTBridgeDelegate {
  var window: UIWindow?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    let bridge = RCTBridge(delegate: self, launchOptions: launchOptions)!

    let rootView = RCTRootView(
      bridge: bridge,
      moduleName: "taroApp",
      initialProperties: nil
    )

    let rootViewController = UIViewController()
    rootViewController.view = rootView

    let window = UIWindow(frame: UIScreen.main.bounds)
    window.rootViewController = rootViewController
    self.window = window
    window.makeKeyAndVisible()

    return true
  }

  @objc func sourceURL(for bridge: RCTBridge) -> URL? {
    return URL(string: "http://localhost:8081/index.bundle?platform=ios")
  }
}
