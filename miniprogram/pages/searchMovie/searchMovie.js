// miniprogram/pages/searchMovie/searchMovie.js
import testDate from "test.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexNumber: 1,
    buttonText: ['Top1-50', 'Top51-100', 'Top101-150', 'Top151-200', 'Top201-250'],
    buttonDataStart: [0, 50, 100, 150, 200],
    buttonClass: ['view-button-group-button-ok', 'view-button-group-button-no','view-button-group-button-no',
      'view-button-group-button-no', 'view-button-group-button-no']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  moiveMessage: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../movieMessage/movieMessage?id=${id}`,
    })
  },
  returnButtonClassArray: function (start) {
    let index;
    let buttonClassArray = this.data.buttonClass;
    let returnArray = [];
    switch(start) {
      case 0: 
        index = 0;
        break;
      case 50: 
        index = 1;
        break;
      case 100:
        index = 2;
        break;
      case 150:
        index = 3;
        break;
      case 200:
        index = 4;
        break;  
    }
    for (let i = 0; i < buttonClassArray.length; i++) {
      if (i === index) {
        returnArray.push("view-button-group-button-ok");
      }else {
        returnArray.push("view-button-group-button-no");
      }
    }
    this.setData({
      buttonClass: returnArray
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
  viewTo250Movie: function (e) {
    let startNumber = Number(e.target.dataset.start);
    let that = this;
    this.returnButtonClassArray(startNumber);
    wx.showToast({
      title: '',
      icon: 'loading',
      duration: 2000
    })
    wx.request({
     url: `https://yangyuxingblog.cn/testYun/phpServ/test.php?state=b&start=${startNumber}&count=50`,
      header: {
        "Content-Type": "'application/xml"
      },
      success(res) {
        let data = res.data.subjects;
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
          indexNumber: startNumber+1,
          imgSrc: imgSrc,
        })
      }
    })
  },
  
  onLoad: function (options) {
    let that = this;
    let onLoadRequest = function () {
      wx.showToast({
        title: '',
        icon: 'loading',
        duration: 2000
      })
      wx.request({
        url: `https://yangyuxingblog.cn/testYun/phpServ/test.php?state=b&start=0&count=50`,
        header: {
          "Content-Type": "'application/xml"
        },
        success(res) {
          let data = res.data.subjects;
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
            imgSrc.push(that.returnMoiveRatingImgSrcArray(data[i].rating.average));
          }
          that.setData({
            data: data,
            casts: casts,
            imgSrc: imgSrc,
          })
        }
      })
    }
    onLoadRequest()
    
    /*let testRequest = function () {
      let data = new testDate().list1.subjects;
      let casts = [];
      let imgSrc = [];
      let duration = [];
      for (let i = 0; i < data.length; i++) {
        let array = [];
        for (let k = 0; k < data[i].casts.length; k++) {
          array.push(data[i].casts[k].name);
        }
        casts.push({
          cast: array
        })
        imgSrc.push(that.returnMoiveRatingImgSrcArray(data[i].rating.average));
        duration.push(data[i].durations[0]);
      }
      that.returnMoiveRatingImgSrcArray()
      that.setData({
        data: data,
        casts: casts,
        imgSrc: imgSrc,
        duration: duration
      })     
    }
    testRequest()*/
    
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