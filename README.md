## react-native weather clock

### 环境
具体参照(官方文档)[https://reactnative.cn/docs/0.51/getting-started.html#content]    
大体就是:    
*   开发工具：WebStorm
*   android运行模拟器：Android Studio(依赖Java JDK)
*   iOS运行模拟器：Xcode

### demo运行   
android:     
    npm install && npm run android   
    也可在android Studio中打开运行    
ios:     
    npm install && npm run ios    
### 调试
ios:   
1、在IOS模拟器中` ⌘D `，选择`Debug JS Remotely`, 在浏览器中打开`http://localhost:8081/debugger-ui/`, 打开页面控制台，可以看到页面console的日志。    
2、同样，选择`Toggle Inspector`，可以调试选择页面元素，看网络日志等。    
[查看更多信息](https://facebook.github.io/react-native/docs/debugging.html#accessing-the-in-app-developer-menu)    

### 真机运行
android:     
1、确认`adb devices`，若报错，确认android sdk platform-tools 下的adb在环境变量PATH中。    
2、npm run android后，（若BUILD FAILED）在Android Studio中直接运行选择连接机器即可。   