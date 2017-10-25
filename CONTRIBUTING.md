### 如何给本项目贡献代码

1. 克隆本项目
2. 在``app/providers``目录下创建js文件，格式雷同其他文件

- ``this.url``: 代表浏览器要打开的页面
- ``async resolve``: 代表要进行的操作, 返回Promise，如果resolve则表示发送成功，reject表示发送失败。

3. 给这个Provider添加``this.alone = true``属性，调试专用，表示仅运行这个Provider，在commit之前，记得移除这个属性。

4. Commit代码
5. 发起PR