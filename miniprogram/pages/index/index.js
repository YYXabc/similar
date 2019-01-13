//index.js
import testData from "test.js";
const app = getApp()
Page({
  data:{

  },
  moiveMessage: function(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../movieMessage/movieMessage?id=${id}`,
    })
  },
  onJumpSerachPage: function() {
    wx.navigateTo({
      url: '../searchMovie/searchMovie',
    })
  },
  onJumpSerachPage2: function () {
    wx.navigateTo({
      url: '../searchMovie2/searchMovie2',
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
  onLoad: function() {
    let that = this;
    /*let testFunction = function () {//模拟请求减少调用次数
      let test = new testData()
      let test1 = function () {
        let data = test.list1.subjects
        let picArray = [];
        let titleArray = [];
        let verageScoreArray = [];
        let imgSrc = []
        for (let i = 0; i < data.length; i++) {
          picArray.push(data[i].images.small);
          titleArray.push(data[i].title);
          verageScoreArray.push(data[i].rating.average);
          imgSrc.push(that.returnMoiveRatingImgSrcArray(data[i].rating.average))
        }
        that.setData ({
          picArray_b: picArray,
          titleArray_b: titleArray,
          verageScoreArray_b: verageScoreArray,
          imgSrc_b: imgSrc
        })
      }
      let test2 = function () {
        let data = test.list2.subjects
        let picArray = [];
        let titleArray = [];
        let verageScoreArray = [];
        let imgSrc = []
        for (let i = 0; i < data.length; i++) {
          picArray.push(data[i].images.small);
          titleArray.push(data[i].title);
          verageScoreArray.push(data[i].rating.average);
          imgSrc.push(that.returnMoiveRatingImgSrcArray(data[i].rating.average))
        }
        that.setData({
          picArray_a: picArray,
          titleArray_a: titleArray,
          verageScoreArray_a: verageScoreArray,
          imgSrc_a: imgSrc
        })
      }      
      test1()
      test2()
    }
    testFunction()*/
    let getShowMovie = function () {
      wx.request({
        url: 'https://yangyuxingblog.cn/testYun/phpServ/test.php?state=a',
        header:{
          "Content-Type": "'application/xml"
        },
        success(res) {
          let data = res.data.subjects;
          let picArray = [];
          let titleArray = [];
          let verageScoreArray = [];
          let imgSrc = [];
          let idArray = []
          for (let i = 0; i < data.length; i++) {
            picArray.push(data[i].images.small);
            titleArray.push(data[i].title);
            verageScoreArray.push(data[i].rating.average);
            imgSrc.push(that.returnMoiveRatingImgSrcArray(data[i].rating.average))
            idArray.push(data[i].id)
          }
          that.setData ({
            picArray_a: picArray,
            titleArray_a: titleArray,
            verageScoreArray_a: verageScoreArray,
            imgSrc_a: imgSrc,
            idArray_a: idArray
          })
        }
      })
    }
    let getTop250Movie = function () {
      wx.request({
        url: 'https://yangyuxingblog.cn/testYun/phpServ/test.php?state=b',
        header: {
          "Content-Type": "'application/xml"
        },
        success(res) {
          let data = res.data.subjects;
          let picArray = [];
          let titleArray = [];
          let verageScoreArray = [];
          let imgSrc = [];
          let idArray = []
          for (let i = 0; i < data.length; i++) {
            picArray.push(data[i].images.small);
            titleArray.push(data[i].title);
            verageScoreArray.push(data[i].rating.average);
            imgSrc.push(that.returnMoiveRatingImgSrcArray(data[i].rating.average))
            idArray.push(data[i].id)
          }
          that.setData({
            picArray_b: picArray,
            titleArray_b: titleArray,
            verageScoreArray_b: verageScoreArray,
            imgSrc_b: imgSrc,
            idArray_b: idArray
          })
        }
      })
    }
    getTop250Movie()
    getShowMovie()
  }

 
})
