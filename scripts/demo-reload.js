import shell from 'shelljs';

shell.exec('yarn run build');

shell.rm('-rf', 'demo/node_modules');

shell.cd('demo');

shell.exec('yarn');

shell.exec('yarn run dev');