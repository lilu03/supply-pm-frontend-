<p>
  <img width="120" src="src/assets/logo-inmobi.png">
</p>
<p align="center">
  <a href="https://vue3js.cn/docs/zh/">
    <img src="https://img.shields.io/badge/vue-2.6.10-%234fc08d.svg" alt="vue">
  </a>
  <a href="https://2x.antdv.com/docs/vue/introduce-cn/">
    <img src="https://img.shields.io/badge/element%20ui-v2.13.2-%231890ff.svg" alt="element-ui">
  </a>
  <a href="https://www.tslang.cn/">
    <img src="https://img.shields.io/badge/vue%20admin%20element%20-%234fc08d.svg" alt="vue-admin-element">
  </a>
</p>


# 项目介绍
suppl-pm，内部运营系统，主要面向PM、OPS以及财务人员，包括广告位相关运营、OPS审核以及财务相关报表，相当于之前的cosmos系统。



# 技术栈
- vue
- vuex
- vue-router
- vue-admin-element
- element-ui
- axios

# 项目运行
## 安装依赖

`npm install`

## 本地运行
`npm run dev`

## 开发环境测试账号

| 账号 | 权限 | 密码 |
| ------ | ------ | ------ |
| lubie.zhao@inmobi.com | <ul><li>普通账号权限</li><li>审核</li><li>财务</li></ul> | Publisher123 |
| ci.test@inmobi.com | <ul><li>普通账号权限</li></ul> |  Publisher123 |
| andy.yan@inmobi.com | <ul><li>普通账号权限</li></ul> |  admin123456 |

*注：账号权限：[用户体系权限文档](http://10.14.41.77:8090/jade_guo/supply-frontend-pm/-/wikis/%E7%94%A8%E6%88%B7%E4%BD%93%E7%B3%BB%E6%9D%83%E9%99%90%E6%96%87%E6%A1%A3%EF%BC%88%E5%8C%85%E6%8B%AC%E6%8E%A5%E5%8F%A3%EF%BC%89)*

## 项目部署

Jenkins部署： http://10.14.41.74:8090/login

+ qa部署：直接合并到qa分支即可

`supply > qa-supply-frontend-pm`


+ prod部署：打tag，选择当前tag进行部署


`supply > prod-supply-frontend-pm`


*注：账号开通，请联系运维人员*

# 相关文档

[原型](https://org.modao.cc/app/ebd8f56bec8f65cf9356006874e2eeada28dcfca?simulator_type=device&sticky#screen=skcmsywloxzkzm9)

[设计稿](https://lanhuapp.com/web/#/item/project/board?type=share_mark&pid=26f767ad-f2d1-40e3-bb9e-e693ed825f3f&activeSectionId=&teamId=c8f8a1c2-6c20-4ccb-9a4d-13bbd2edab27&param=75d336af-30a6-4866-b919-3b8e8a9ce1d6)

[PM部署及账号相关信息](http://10.14.41.77:8090/jade_guo/supply-frontend-pm/-/wikis/PM%E9%83%A8%E7%BD%B2%E5%8F%8A%E8%B4%A6%E5%8F%B7%E7%9B%B8%E5%85%B3%E4%BF%A1%E6%81%AF)

[用户体系权限文档](http://10.14.41.77:8090/jade_guo/supply-frontend-pm/-/wikis/%E7%94%A8%E6%88%B7%E4%BD%93%E7%B3%BB%E6%9D%83%E9%99%90%E6%96%87%E6%A1%A3%EF%BC%88%E5%8C%85%E6%8B%AC%E6%8E%A5%E5%8F%A3%EF%BC%89)

[财务管理模块](http://10.14.41.77:8090/jade_guo/supply-frontend-pm/-/wikis/%E8%B4%A2%E5%8A%A1%E7%AE%A1%E7%90%86%E6%A8%A1%E5%9D%97%E7%9B%B8%E5%85%B3%E6%96%87%E6%A1%A3)