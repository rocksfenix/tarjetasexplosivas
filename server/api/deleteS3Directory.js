import S3 from '../services/S3'

async function deleteS3Directory (bucket, dir) {
  const listParams = {
    Bucket: bucket,
    Prefix: dir
  }

  const listedObjects = await S3.listObjectsV2(listParams).promise()

  // console.log(dir, listedObjects)

  if (listedObjects.Contents.length === 0) return

  const deleteParams = {
    Bucket: bucket,
    Delete: { Objects: [] }
  }

  listedObjects.Contents.forEach(({ Key }) => {
    deleteParams.Delete.Objects.push({ Key })
  })

  await S3.deleteObjects(deleteParams).promise()

  if (listedObjects.IsTruncated) await deleteS3Directory(bucket, dir)
}

export default deleteS3Directory
