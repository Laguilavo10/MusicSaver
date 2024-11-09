const setEnv = () => {
  const fs = require('fs')
  const writeFile = fs.writeFile
  const targetPath = 'src/environments/environment.ts'
  require('dotenv').config()
  const envConfigFile = `export const environment = {
  production: true,
  api: '${process.env['API']}',
  spotifyClientId: '${process.env['SPOTIFY_CLIENT_ID']}',
  redirectUri: '${process.env['REDIRECT_URI']}',
  spotifyApiUrl: '${process.env['SPOTIFY_API_URL']}',
};
`
  console.log(
      'The file `environment.ts` will be written with the following content: \n'
  )
  writeFile(targetPath, envConfigFile, (err: unknown) => {
    if (err) {
      console.error('error: ', err)
      throw err
    } else {
      console.log(
          `Angular environment.ts file generated correctly at ${targetPath} \n`
      )
    }
  })
}

setEnv()
