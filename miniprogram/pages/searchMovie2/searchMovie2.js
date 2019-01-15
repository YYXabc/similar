// miniprogram/pages/searchMovie2/searchMovie2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isData: false
  },
  moiveMessage: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../movieMessage/movieMessage?id=${id}`,
    })
  },
  returnMoiveRatingImgSrcArray: function (average) {
    let number = Math.round(average);
    let src = {
      r10: "../../images/r10.png",
      r9: "../../images/r9.png",
      r8: "../../images/r8.png",
      r7: "../../images/r7.png",
      r6: "../../images/r6.png",
      r5: "../../images/r5.png",
      r4: "../../images/r4.png",
      r3: "../../images/r3.png",
      r2: "../../images/r2.png",
      r1: "../../images/r1.png",
      r0: "../../images/r0.png",
    }
    number = `r${number}`;

    return src[number];
  },
  onSearch: function (e) {
    let that = this;
    let val = e.detail.value;
    wx.showToast({
      title: '',
      icon: 'loading',
      duration: 2000
    })
    wx.request({
      url: `https://yangyuxingblog.cn/testYun/phpServ/test.php?state=c&q=${val}&start=0&count=20`,
      header: {
        "Content-Type": "'application/xml"
      },
      success(res) {
        let data = res.data.subjects;
        if (res.data.total) {
          let casts = [];
          let imgSrc = [];
          for (let i = 0; i < data.length; i++) {
            let array = [];
            for (let k = 0; k < data[i].casts.length; k++) {
              array.push(data[i].casts[k].name);
            }
            casts.push({
              cast: array
            })
            imgSrc.push(that.returnMoiveRatingImgSrcArray(data[i].rating.average))
          }
          that.setData({
            data: data,
            casts: casts,
            imgSrc: imgSrc,
            isData: false
          })
        }else {
          that.setData({
            isData: true,
            data: [],
            casts: [],
            imgSrc: [],
            val: val
          })
        }

      }  
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})