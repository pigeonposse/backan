import { paths } from '@backan/config/consts'
import {
	joinPath,
	copyDir,
} from '@dovenv/core/utils'

copyDir( {
	input  : joinPath( paths.coreDir, 'dist' ),
	output : joinPath( paths.libDir, 'dist' ),
} )
