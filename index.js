'use strict'

const express = require('express');
const bodyParser = require('body-parser');
var request = require('request');
const app = express();
var encoding = require("encoding");



app.set('port', (process.env.PORT || 5000)) 
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})
var Token = process.env.TOKEN;
//var WebDF = process.env.WebDF;

var access_token = 'Bearer {'+Token+'}'
var name = "";

app.get('/', (req, res) => {
  res.end("ok")
})



app.post('/webhook', (req, res) => {

    var data = req.body; 
console.log('-----ปริ้นทั้งหมด-----' + JSON.stringify(data));
    
//console.log('++++'+JSON.stringify(req.body.events));
    
    var sende_r = req.body.events[0].source.userId
    var reToken = req.body.events[0].replyToken
    
    var data = req.body; 
    
    if (req.body.events[0].type == "message") { 
    if (req.body.events[0].message.type == "text") {
     
     var tex_t = req.body.events[0].message.text
     
        //profile(reToken, sende_r); 
     
     postToDialogflow(req);

     }
        
     }else if (req.body.events[0].type == "beacon") {  
     if (req.body.events[0].beacon.type == "enter") {   
        
     var beacon_id = req.body.events[0].beacon.hwid  
       //  if(beacon_1 == "0133a0751f"){
       //  profile(reToken, sende_r);    
       //  }else if(beacon_1 == "0133a0751f"){
       //  profile(reToken, sende_r);    
       //  } 
       profile(reToken, sende_r, beacon_id);  
       console.log("---enter---" + sende_r+"-------"+beacon_id);  
     }
 }
 
 
 })
 
 
 /////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////


function data_enter(sende_r, beacon_id) {


   var checktime = "https://script.google.com/macros/s/AKfycbx5rSDe_Q63snoj2XN0R-cV-aDLjWsgOG61nxe_/exec?userId="+sende_r+"&beaconid="+beacon_id;
 request(checktime, function (error, response, body) {

})


}





// เช็คโปรไฟล์
/////////////////////////////////////////////////////////////////////////

function profile(reToken,sende_r, beacon_id) {

    var headers = {
       'Authorization' : access_token
}
    

var options = {
    url: 'https://api.line.me/v2/bot/profile/'+sende_r,
    method: 'GET',
    headers: headers,
    }

 request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        name = info.displayName;
       
      
        
          if(beacon_id == "014b58a63f"){
         var msg = {
           "type": "text",
           "text": "เมืองทราบ"+" " +name +" " + "ว.10 หจก.หลิมศิริวงษ์พาณิชย์ (ปั๊มหลิมศิริวงศ์)"
          
                   
          }; 
        reply(reToken, msg, sende_r, beacon_id);    
         }else if(beacon_id == "014b5bacd7"){
         var msg = {
           "type": "text",
           "text": "เมืองทราบ"+" " +name +" " + "ว.10 ร้านทองเซ่งเฮงล้ง"
          }; 
        reply(reToken, msg, sende_r, beacon_id);   
         }else if(beacon_id == "014b611b9b"){
         var msg = {
           "type": "text",
           "text": "สวัสดีคุณ"+" " +name +" " + "ว.10 ร้านทองวิไล"
          }; 
        reply(reToken, msg, sende_r, beacon_id);   
         }else if(beacon_id == "014b61b4bb"){
         var msg = {
           "type": "text",
           "text": "สวัสดีคุณ"+" " +name +" " + "ว.10 สนามกีฬากลางจังหวัดพิจิตร"
          }; 
        reply(reToken, msg, sende_r, beacon_id);   
         }else if(beacon_id == "014b64fe43"){
         var msg = {
           "type": "text",
           "text": "สวัสดีคุณ"+" " +name +" " + "ว.10 สหแสงชัย"
          }; 
        reply(reToken, msg, sende_r, beacon_id);   
         }else if(beacon_id == "014b667011"){
         var msg = {
           "type": "text",
           "text": "สวัสดีคุณ"+" " +name +" " + "ว.10 สถานีรถไฟพิจิตร"
          }; 
        reply(reToken, msg, sende_r, beacon_id);   
         }else if(beacon_id == "014b678737"){
         var msg = {
           "type": "text",
           "text": "สวัสดีคุณ"+" " +name +" " + "ว.10 ร้าน ต.รวมกิจ"
          }; 
        reply(reToken, msg, sende_r, beacon_id);   
         }else if(beacon_id == "014b6f44f6"){
         var msg = {
           "type": "text",
           "text": "สวัสดีคุณ"+" " +name +" " + "ว.10 ตลาดร่วมเจริญสะพานขาว"
          }; 
        reply(reToken, msg, sende_r, beacon_id);   
         }else if(beacon_id == "014b733d54"){
         var msg = {
           "type": "text",
           "text": "สวัสดีคุณ"+" " +name +" " + "ว.10 ตลาดใหม่สระหลวง"
          }; 
        reply(reToken, msg, sende_r, beacon_id);   
         }else if(beacon_id == "014b7388e7"){
         var msg = {
           "type": "text",
           "text": "สวัสดีคุณ"+" " +name +" " + "ว.10 สถานีขนส่งผู้โดยสารจังหวัดพิจิตร"
          }; 
        reply(reToken, msg, sende_r, beacon_id);   
         }
         
        
        
        
    }
 })


}

//////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////


function reply(reToken, msg, sende_r, beacon_id) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': access_token
    }
    let body = JSON.stringify({
        replyToken: reToken,
        messages: [msg]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }
)
    console.log("---data_enter---" + sende_r+"-------"+beacon_id);
data_enter(sende_r, beacon_id);
}

const postToDialogflow = req => {
    
  var WebDF = "https://bots.dialogflow.com/line/9c6a1598-acdd-4693-929d-29ccb36a541f/webhook";
  req.headers.host = "bots.dialogflow.com";
  return request({
    method: "POST",
    uri: WebDF ,
    headers: req.headers,
    body: JSON.stringify(req.body)
    
  });
 
};

