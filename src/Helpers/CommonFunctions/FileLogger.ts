import moment from 'moment'
import { Platform } from 'react-native'
import RNFS, { ExternalCachesDirectoryPath } from 'react-native-fs'
import { logger, fileAsyncTransport, consoleTransport } from 'react-native-logs'

console.log(moment().format('DD-MM-YYYY'))

export const directoryPath = Platform.OS === 'android' ? RNFS.ExternalCachesDirectoryPath : RNFS.DocumentDirectoryPath

console.log(directoryPath)

const config = {
  severity: 'debug',
  transport: fileAsyncTransport,
  transportOptions: {
    FS: RNFS,
    fileName: `logs_${moment().format('DD-MM-YYYY')}.log`, // Create a new file every day
    filePath: directoryPath + '/logs'
  },
  async: true,
  printLevel: true,
  enabled: true,
  printDate: true,
  dateFormat: 'local'
}

let log = logger.createLogger(config)

export { log }
