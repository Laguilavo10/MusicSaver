const setEnv = () => {
  const fs = require('fs')
  const writeFile = fs.writeFile
  const targetPath = './src/environments/environment.ts'
  // const colors = require('colors')
  console.log('hola1')
  require('dotenv').config(
    // {
    // path: '.env'
    // }
  )
  console.log('hola2')
  console.log(process.env)
  const envConfigFile = `export const environment = {
  production: true,
  api: '${process.env['API']}',
  spotifyClientId: '${process.env['SPOTIFY_CLIENT_ID']}',
  redirectUri: '${process.env['REDIRECT_URI']}',
  spotifyApiUrl: '${process.env['SPOTIFY_API_URL']}',
};
`
  console.log(
    // colors.magenta(
      'The file `environment.ts` will be written with the following content: \n'
  //   )
  )
  writeFile(targetPath, envConfigFile, (err: unknown) => {
    if (err) {
      console.error(err)
      throw err
    } else {
      console.log(
        // colors.magenta(
          `Angular environment.ts file generated correctly at ${targetPath} \n`
        // )
      )
    }
  })
}

setEnv()
