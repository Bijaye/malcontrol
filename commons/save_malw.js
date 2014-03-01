var mongoose = require('mongoose');
var _malware = require('../schemas/malware');
var malwareMODEL = _malware.mongoose.model('malware', _malware.Malware); 


exports.saveMalwareToDB  = function(plinkToReport, ptimestamp, pip, pcompositscore, pscraped_source, pcountry, pcity, pregion, pll, pdesc, pmd5, pname){
  //no malware into DB 
  var alerts = undefined;
  var ids = undefined;

  if (undefined != pcompositscore && null != pcompositscore){
    var p =pcompositscore.split("/");
    if (p.length > 0){
      alerts = p[0];
      ids = p[1];
    }
  }
  var tm = new malwareMODEL({
    //_id: new _malware.mongoose.Types.ObjectId,
      timestamp: ptimestamp,
      ip: pip,
      linkToReport: plinkToReport,
      alerts: alerts, 
      ids: ids, 
      scraped_source: pscraped_source,
      country: pcountry,
      city: pcity,
      region: pregion,
      ll: pll,
      desc: pdesc,
      md5: pmd5,
      name: pname,
      modified: new Date()
  });//tm
  malwareMODEL.findOneAndUpdate({md5: pmd5},tm.toObject(),{upsert: true},function(err){
    if(err) console.log("[-] Error in saving on DB: " + err);
  });
}//savemalwaretodb
