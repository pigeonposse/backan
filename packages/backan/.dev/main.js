import {
	copyDir, joinPath, paths, 
} from '@backan/config/core'

copyDir( 
	joinPath( paths.coreDir, 'dist' ), 
	joinPath( paths.libDir, 'dist' ), 
)
