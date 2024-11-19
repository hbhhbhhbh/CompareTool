// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    motto: 'Hello World',
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
    goodsList: [
      { myid: 1, title: "商品A", per_value: 0, total_price:0, cnt: 1, value: 0 },
    ]
  },
  onDeleteGoods(e) {
    
    const id = e.detail.myid; // 获取子组件返回的编号
    console.log(id);
    const updatedList = this.data.goodsList.filter(item => item.myid !== id); // 删除对应的商品
    console.log(this.data.goodsList);
    this.setData({
      goodsList: updatedList
    });
    console.log(this.data.goodsList);
    console.log(`删除了商品ID: ${id}`);
  },
  onAddButtonTap() {
    const newId = this.data.goodsList.length > 0 ? this.data.goodsList[this.data.goodsList.length - 1].myid + 1 : 1;
    console.log("new: "+Number(newId));
    const newGoods = {
      myid:newId,
      title: `商品${String.fromCharCode(65 + this.data.goodsList.length)}`,
      per_value: 0,
      total_price: 0,
      cnt: 1,
      value: 0
    };

    this.setData({
      goodsList: [...this.data.goodsList, newGoods]
    });
    console.log("新增商品:", newGoods);
  },
  onUpdateGoods(e) {
    const { myid, per_value } = e.detail; // 获取子组件返回的 id 和 per_value

    const updatedList = this.data.goodsList.map(item => {
      if (item.myid === myid) {
        return { ...item, per_value }; // 更新 per_value
      }
      return item;
    });

    this.setData({
      goodsList: updatedList
    });

    this.sortGoodsList(); // 更新后重新排序
  },

  // 排序 goodsList
  sortGoodsList() {
    const sortedList = [...this.data.goodsList].sort((a, b) => b.per_value - a.per_value); // 按 per_value 降序排序

    this.setData({
      goodsList: sortedList
    });
    console.log("排序后的商品列表:", sortedList);
  },
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    const { nickName } = this.data.userInfo
    this.setData({
      "userInfo.avatarUrl": avatarUrl,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
  onInputChange(e) {
    const nickName = e.detail.value
    const { avatarUrl } = this.data.userInfo
    this.setData({
      "userInfo.nickName": nickName,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
})
