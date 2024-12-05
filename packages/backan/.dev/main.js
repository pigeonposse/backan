import { paths } from '@backan/config/core'
import {
	joinPath,
	copyDir,
} from '@dovenv/core/utils'

copyDir( {
	input  : joinPath( paths.coreDir, 'dist' ),
	output : joinPath( paths.libDir, 'dist' ),
} )
