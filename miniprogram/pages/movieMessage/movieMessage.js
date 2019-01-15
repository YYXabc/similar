// miniprogram/pages/movieMessage/movieMessage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
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
  showMoiveMessage: function(id) {
    let that = this;
    wx.request({
      url: `https://yangyuxingblog.cn/testYun/phpServ/test.php?state=d&id=${id}`,
      success(res) {
        let data = res.data
        that.setData({
          akaNameArray: data.aka,//别名[]
          rating: data.rating.average,//平均分
          ratins_count: data.ratings_count,//打分人数
          imageSrc: data.images.small,//封面SRC
          genres: data.genres,//剧情信息[]
          casts: data.casts,//演员信息数组[{}]
          countries: data.countries,//国家,
          summary: data.summary,//简介
          title: data.title,//标题
          year: data.year,//年份
          directors: data.directors,//导演信息数组[{}]
          ratingSrc: that.returnMoiveRatingImgSrcArray(data.rating.average),//星星IMG
          collect_count: data.collect_count,//看过人数
          wish_count: data.wish_count//想看人数
        })
      }
    })
  },
  onLoad: function (options) {
    this.showMoiveMessage(options.id)
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