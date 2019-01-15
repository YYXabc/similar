// miniprogram/pages/music/music.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    test:[1,2,3,4,5]
  },
  onJumpSearchPage: function () {
    wx.navigateTo({
      url: '../searchMusic/searchMusic',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let getMusicJSON = function() {
      let getPicUrl = function(albumid) {
        albumid = String(albumid);
        let resultAlbumid = ""
        for (let i = albumid.length -2; i < albumid.length; i++) {
          resultAlbumid += albumid[i]
        }
        resultAlbumid = Number(resultAlbumid);
        albumid = Number(albumid);
        return `https://imgcache.qq.com/music/photo/album_300/${resultAlbumid}/300_albumpic_${albumid}_0.jpg`
      }
      wx.request({
        url: 'https://yangyuxingblog.cn/testYun/phpServ/music2.php',
        success(res) {
          let idArray = []
          let titleArray = [];
          let picArray = [];
          let authorArray = [];
          let list = res.data.songlist;
          for (let i = 0; i < list.length; i++) {
            idArray.push(list[i].data.songid);
            titleArray.push(list[i].data.songname);
            authorArray.push(list[i].data.singer[0].name);
            picArray.push(getPicUrl(list[i].data.albumid));
          }
          
          that.setData({
            titleArray: titleArray,
            picArray: picArray,
            authorArray: authorArray
          })
        }
      })
    }

    getMusicJSON()
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