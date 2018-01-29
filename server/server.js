const express =require("express");
const app = express();
const axios = require('axios');
const router =express.Router();


router.get("/getRecommend",(req,res)=>{
  res.setHeader('Access-Control-Allow-Origin',"*");
  axios.get('https://m.zhanqi.tv/api/static/v2.1/index/banner.json',{
    header:{
      host:'m.zhanqi.tv',
      refresh:'https://m.zhanqi.tv/'
    },
  }).then((data)=>{
    res.json(data.data)
  })
})


router.get("/getVideo",(req,res)=>{
  res.setHeader('Access-Control-Allow-Origin',"*");
  axios.get('https://m.zhanqi.tv/api/static/live.index/recommend-apps.json',{
    header:{
      host:'m.zhanqi.tv',
      refresh:'https://m.zhanqi.tv/'
    },
  }).then((data)=>{
    res.json(data.data)
  })
})

router.get("/getLive",(req,res)=>{
  res.setHeader('Access-Control-Allow-Origin',"*");
  axios.get('https://m.zhanqi.tv/api/static/live.hots/20-1.json',{
    header:{
      host:'m.zhanqi.tv',
      refresh:'https://m.zhanqi.tv/'
    },
  }).then((data)=>{
    res.json(data.data)
  })
})


router.get("/getPlaydetail",(req,res)=>{
  res.setHeader('Access-Control-Allow-Origin',"*");
  axios.get('https://m.zhanqi.tv/api/static/v2.1/room/domain/'+(req.query.id)+'.json',{
    header:{
      host:'m.zhanqi.tv',
      refresh:'https://m.zhanqi.tv/'
    },
    params:req.query
  }).then((data)=>{
    res.json(data.data)
  })
})

router.get("/getNewvideo",(req,res)=>{
  res.setHeader('Access-Control-Allow-Origin',"*");
  axios.get('https://m.zhanqi.tv/api/static/v2.2/video/'+(req.query.id)+'/4/1/new.json',{
    header:{
      host:'m.zhanqi.tv',
      refresh:'https://m.zhanqi.tv/'
    },
    params:req.query
  }).then((data)=>{
    res.json(data.data)
  })
})

router.get("/getNowplay",(req,res)=>{
  res.setHeader('Access-Control-Allow-Origin',"*");
  axios.get('https://m.zhanqi.tv/api/static/live.hots/20-'+(req.query.page)+'.json',{
    header:{
      host:'m.zhanqi.tv',
      refresh:'https://m.zhanqi.tv/'
    },
    params:req.query
  }).then((data)=>{
    res.json(data.data)
  })
})

router.get("/getGame",(req,res)=>{
  res.setHeader('Access-Control-Allow-Origin',"*");
  axios.get('https://m.zhanqi.tv/api/static/game.lists/100-1.json',{
    header:{
      host:'m.zhanqi.tv',
      refresh:'https://m.zhanqi.tv/'
    },
  }).then((data)=>{
    res.json(data.data)
  })
})

router.get("/getSearch",(req,res)=>{
  res.setHeader('Access-Control-Allow-Origin',"*");
  axios.get('https://m.zhanqi.tv/api/touch/search?'+(req.query.a)+'&'+(req.query.page)+'$'+(req.query.nums)+'&'+(req.query.t),{
    header:{
      host:'m.zhanqi.tv',
      refresh:'https://m.zhanqi.tv/'
    },
    params:req.query
  }).then((data)=>{
    res.json(data.data)
  })
})

router.get("/getgameVideo",(req,res)=>{
  res.setHeader('Access-Control-Allow-Origin',"*");
  axios.get('https://m.zhanqi.tv/api/static/game.lives/'+(req.query.id)+'/20-'+(req.query.page)+'.json',{
    header:{
      host:'m.zhanqi.tv',
      refresh:'https://m.zhanqi.tv/'
    },
    params:req.query
  }).then((data)=>{
    res.json(data.data)
  })
})



app.use('/api',router);

app.listen(9999)
