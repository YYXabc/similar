// miniprogram/pages/searchMusic/searchMusic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isData: false
  },
  getButtonClassArray: function(allArray, currentNumber) {
    let arr = []
    for (let i = 0; i < allArray.length; i++) {
      if (allArray[i] === currentNumber) {
        arr.push("button-group-ok")
      } else {
        arr.push("button-group-no");
      }
    }
    this.setData({
      buttonClassArray: arr
    })
  },
  goTop: function () {  // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
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
  viewButton: function(e) {
    let pageNumber = Number(e.currentTarget.dataset.number);
    let val = this.data.val;
    let that = this;
    if(!isNaN(pageNumber)){
      let start;
      let count = 15;
      if (pageNumber === 1) {
        start = 0;
      } else {
        start = (pageNumber - 1) * 15;
      }
      wx.request({
        url: `https://yangyuxingblog.cn/testYun/phpServ/music.php?&q=${val}&start=${start}&count=${count}`,
        success(res) {
          let data = res.data.musics;
          let simpleData = [];
          for (let i = 0; i < data.length; i++) {
            simpleData.push({
              title: `${data[i].title} ${data[i].alt_title}`,//标题名字,
              image: data[i].image,//专辑封面
              numRaters: data[i].rating.numRaters,
              rating: data[i].rating.average,//豆瓣评分
              ratingSrc: that.returnMoiveRatingImgSrcArray(data[i].rating.average),//评分图片
              media: data[i].attrs.media,//介质如CD 黑胶
              pubdate: data[i].attrs.pubdate,//出版时间
              publisher: data[i].attrs.publisher,//出版商
              singer: data[i].attrs.singer,//表演者
              version: data[i].attrs.version,
            })
          }
          that.goTop();
          that.setData({
            simpleData: simpleData,
            pageNumber: that.getPageButtonNumber(res.data.total,pageNumber),
            val: val
          })
          that.getButtonClassArray(that.data.pageNumber, pageNumber)
        }
      })
    }
  },
  getPageButtonNumber: function (total, currentNumber){
    total = Math.ceil(Number(total)/15);
    let arr = [];
    if (total > 5) {
      if (currentNumber <= 4) {
        return [1, 2, 3, 4, 5, "...", total] 
      }
      else if (currentNumber + 4 > total) {//是最后4页
        return [1, "...", total-4, total-3, total-2, total-1, total] 
      }
      else{
        return[1,"...", currentNumber-1, currentNumber, currentNumber + 1, "...", total];
      }
    }else {
      for (let i = 1; i <= total; i++) {
        arr.push(i);
      }
      if (arr.length !== 1) {
        return arr;
      }
    }
  },
  onSearch: function (e) {
    let that = this;
    let val  = e.detail.value;
    wx.showToast({
      title: '',
      icon: 'loading',
      duration: 1500
    })
    wx.request({
      url: `https://yangyuxingblog.cn/testYun/phpServ/music.php?&q=${val}&start=0&count=15`,
      success(res) {
        if (res.data.count) {
          let data = res.data.musics;
          let simpleData = [];
          for (let i = 0; i < data.length; i++) {
            simpleData.push({
              title: `${data[i].title} ${data[i].alt_title}`,//标题名字,
              image: data[i].image,//专辑封面
              numRaters: data[i].rating.numRaters,
              rating: data[i].rating.average,//豆瓣评分
              ratingSrc: that.returnMoiveRatingImgSrcArray(data[i].rating.average),//评分图片
              media: data[i].attrs.media,//介质如CD 黑胶
              pubdate: data[i].attrs.pubdate,//出版时间
              publisher: data[i].attrs.publisher,//出版商
              singer: data[i].attrs.singer,//表演者
              version: data[i].attrs.version,
            })
          }
          that.setData({
            simpleData: simpleData,
            pageNumber: that.getPageButtonNumber(res.data.total, 1),
            val: val,
            isData: false
          })
          that.getButtonClassArray(that.data.pageNumber, 1)
        } else {
          that.setData({
            isData: true,
            simpleData:[],
            pageNumber:[],
            val: val
          })
        }
                  
      }
    })
  },

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