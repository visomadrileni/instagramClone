const gm = require('gm') //npm i gm
const { readdirSync, unlinkSync } = require('fs')

/**
 * For processing the image
 *
 * @param {Object} options
 * @param {String} options.srcFile
 * @param {Number} options.width
 * @param {Number} options.height
 * @param {String} options.destFile
 */
export const ProcessImage = options => {
  return new Promise((resolve, reject) => {
    let { srcFile, width, height, destFile } = options
    gm(srcFile)
      .resize(width, height)  // resize and remove EXIF profile data(information about your camera, and potentially where the picture was taken (GPS coordinates))
      .gravity('center') // gravity forces the text to be centered within the image
      .quality(100)
      .write(destFile, err => err ? reject(err) : resolve('Processed!!'))
   })
}

/**
 * For deleting all the contents of any folder
 * @param {String} folder
 */
export const DeleteAllOfFolder = folder => {
  let files = readdirSync(folder)
  files.map(file => { unlinkSync(`${folder}/${file}`) })  //delete a file using unlink() or unlinkSync() 
  return 'Deleted!!'
}

