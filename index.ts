import type KernelConctract from './app/Http/Kernel'
import './autoload'
import app from './bootstrap/app'

const Kernel: KernelConctract = app.make('Kernel')
Kernel.startServer(8000)
