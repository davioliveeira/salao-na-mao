const { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } = require( "@aws-sdk/client-s3") 
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const dotenv = require('dotenv');

dotenv.config()

const bucketName = process.env.BUCKET_NAME
const region = process.env.AWS_REGION
const accessKeyId = process.env.IAM_USER_KEY
const secretAccessKey = process.env.IAM_USER_SECRET

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
})

function uploadFile(file, fileName, mimetype) {
  const uploadParams = {
    Bucket: bucketName,
    Body: file.data,
    Key: fileName,
    ContentType: mimetype
  }
  return s3Client.send(new PutObjectCommand(uploadParams));
}
 function deleteFile(fileName) {
  const deleteParams = {
    Bucket: bucketName,
    Key: fileName,
  }

  return s3Client.send(new DeleteObjectCommand(deleteParams));
}

// async function getObjectSignedUrl(key) {
// //   const params = {
// //     Bucket: bucketName,
// //     Key: key
// //   }

//   // https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
//   const command = new GetObjectCommand(params);
//   const seconds = 60
//   const url = await getSignedUrl(s3Client, command, { expiresIn: seconds });

//   return url
// }


module.exports = { uploadFile , deleteFile }