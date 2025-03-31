require("dotenv").config();
const {S3Client,GetObjectCommand,PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand} = require ("@aws-sdk/client-s3");
const { getSignedUrl } =require ("@aws-sdk/s3-request-presigner");
// hum ek user bnayenge aur ye us user ke behalf pe api calls kregaa

// console.log("AWS_ACCESS_KEY_ID:", process.env.AWS_ACCESS_KEY_ID ? "Loaded" : "Not Loaded");
// console.log("AWS_SECRET_ACCESS_KEY:", process.env.AWS_SECRET_ACCESS_KEY ? "Loaded" : "Not Loaded");

const s3Client=new S3Client({
    region:"eu-north-1",
credentials:{
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
   
},
});
// ye function basically hume ek url dega jis se hum us chij ko user kr ske 
async function getObjectUrl(key){
    const command=new GetObjectCommand({
        Bucket:"mybucket22192",
        Key:key,
    });
    const url=await getSignedUrl(s3Client,command);
    return url;
}

// put object
// 1.hum apne user ko bolenge ki aap ek video select kro
// 2.hum uska meta data apne server me bhej denge 
// 3.us metadata ke basis pe hmara server saari functionalities ko perform kregaa (autentication& authorization .etc)
// 4.phir hmko return me ek pre-signed url de dega
// 5.us signed url me sb kuch specify kr denge like uska storage path ,file type
// 6. hmara user phir aone videos ko us url pe upload kr dega (s3 bucket me)


async function putObject(fileName,contentType) {
    const command=new PutObjectCommand({
        Bucket:"mybucket22192",
        Key:`/uploads/user-uploads/${fileName}`,
        ContentType:contentType,
    });
    const url =await getSignedUrl(s3Client,command);
    return url;
}
async function listObjects() {
    const command=new ListObjectsV2Command({
        Bucket:"mybucket22192",
Key:'/',
    })
    const result=await s3Client.send(command);
    console.log(result)
}
async function init() {
    // getting /viewing objects from bucket
    console.log(await getObjectUrl("/uploads/user-uploads/image1.jpg"))
    // storing objects in the bucket
    console.log(await putObject("image1.jpg","image/jpg"));
    // listing/directory struture of all the objects in the bucket
    await listObjects();
    // deleting objects from bucket
    const command2=new DeleteObjectCommand({
        Bucket:"mybucket22192",
        Key:'/uploads/user-uploads/image1.jpg',

    })
    await s3Client.send(command2);
}
init();










