// miniprogram/pages/searchMusic/searchMusic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
    this.setData({
      viewPageNumber: 15
    })
    let that = this;
    let val  = e.detail.value;
    let getPicUrl = function (albumid) {
      albumid = String(albumid);
      let resultAlbumid = ""
      for (let i = albumid.length - 2; i < albumid.length; i++) {
        resultAlbumid += albumid[i]
      }
      resultAlbumid = Number(resultAlbumid);
      albumid = Number(albumid);
      return `https://imgcache.qq.com/music/photo/album_300/${resultAlbumid}/300_albumpic_${albumid}_0.jpg`
    }
    wx.request({
      url: `https://yangyuxingblog.cn/testYun/phpServ/music.php?&q=${val}&start=0&count=15`,
      success(res) {
        let data = res.data.musics;
        console.log(data);
        let simpleData = [];
        let title = [];//标题名字
        let rating = [];//豆瓣评分
        let media = [];//介质如CD 黑胶
        let pubdate = [];//出版时间
        let singer = [];//表演者
        for (let i = 0 ; i < data.length; i++) {
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
            version: data[i].attrs.version
          })
        }
        console.log(simpleData) 
        that.setData({
          simpleData: simpleData
        })
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
    let onView = function (pageNumber) {
      if (pageNumber) {
        console.log("Ok")
      } else {
        console.log("No");
      }
    }
    onView(this.data.viewPageNumber)
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