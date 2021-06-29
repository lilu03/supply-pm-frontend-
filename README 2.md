# PM app/placement接口列表
模块|接口链接|接口类型|接口描述
:-:|:------|:-----:|:-------
应用管理|/venus/pm/app/|-|公共URL
应用管理|management|GET|分页查询, 查询条件: idOrName, page, size
应用管理|find|GET|查询单条, 查询条件: id
应用管理|updateAdPool|POST|请求体中json格式的应用对象, 其中id,appId,status,adPoolList字段不能为空

广告位管理|/venus/pm/placement/|-|公共URL
广告位管理|management|GET|分页查询, 查询条件: idOrName, page, size
广告位管理|find|GET|查询单条, 查询条件: id
广告位管理|updateAdPool|POST|请求体中json格式的应用对象, 其中id,adPoolList,duration,isStaticWifi,isStaticNonWifi,isVideoWifi,isVideoNonWifi,isSecure,soundOn,skipDelay,pubExpectation,revShareType 字段不能为空


# PM app/placement接口列表
模块|接口链接|接口类型|接口描述
:-:|:------|:-----:|:-------
应用管理|/venus/pm/app/|-|公共URL
应用管理|management|GET|分页查询, 查询条件: idOrName, page, size, status = 1 为待审核 写死就行
应用管理|find|GET|查询单条, 查询条件: id
应用管理|updateAdPool|POST|请求体中json格式的应用对象, 其中id,appId,status,adPoolList字段不能为空

广告位管理|/venus/pm/placement/|-|公共URL
广告位管理|management|GET|分页查询, 查询条件: idOrName, page, size
广告位管理|find|GET|查询单条, 查询条件: id
广告位管理|updateAdPool|POST|请求体中json格式的应用对象, 其中id,adPoolList,duration,isStaticWifi,isStaticNonWifi,isVideoWifi,isVideoNonWifi,isSecure,soundOn,skipDelay,pubExpectation,revShareType 字段不能为空

广告位In/ex|uploadInclusionFile|POST|上传Inclusion CSV
广告位In/ex|uploadExclusionFile|POST|上传Exclusion CSV
                    广告位In/ex|downloadInclusionFile|GET|下载Inclusion CSV
广告位In/ex|downloadExclusionFile|GET|下载Exclusion CSV
                    广告位In/ex|findInclusionByPlacementId|GET|查询Inclusion信息 placementId（白名单下面的）
广告位In/ex|findExclusionByPlacementId|GET|查询Exclusion信息 placementId
                    广告位In/ex|findAdvertiserByAccountIds|POST|批量查询广告主信息 AccountIds
                广告位In/ex|createInclusion|POST|批量增加Inclusion    placementId [id,id]
广告位In/ex|createExclusion|POST|批量增加Exclusion
                广告位In/ex|delInclusion|POST|批量移除Inclusion
广告位In/ex|delExclusion|POST|批量移除Exclusion

广告位管理|findReviewing|GET|查询待审批的单条信息, 查询条件: id
广告位管理|reviewPass|GET|审批通过, 参数: id
广告位管理|reviewReject|GET|审批驳回, 参数: id, rejectCode, rejectComm
字典管理|getRejectCode|GET|获取驳回状态码