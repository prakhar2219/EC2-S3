require("dotenv").config();
const {S3Client,GetObjectCommand} = require ("@aws-sdk/client-s3");
const { getSignedUrl } =require ("@aws-sdk/s3-request-presigner");
// hum ek user bnayenge aur ye us user ke behalf pe api calls kregaa

// console.log("AWS_ACCESS_KEY_ID:", process.env.AWS_ACCESS_KEY_ID ? "Loaded" : "Not Loaded");
// console.log("AWS_SECRET_ACCESS_KEY:", process.env.AWS_SECRET_ACCESS_KEY ? "Loaded" : "Not Loaded");

const s3Client=new S3Client({
    region:"ap-south-1",
credentials:{
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
   
},
});
// ye function basically hume ek url dega jis se hum us chij ko user kr ske 
async function getObjectUrl(key){
    const command=new GetObjectCommand({
        Bucket:"connect.node2219",
        Key:key,
    });
    const url=await getSignedUrl(s3Client,command);
    return url;
}
async function init() {
    console.log(await getObjectUrl("IMG-20240702-WA0028.jpg"))
}
init();








