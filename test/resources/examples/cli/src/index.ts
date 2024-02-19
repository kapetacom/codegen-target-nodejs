import { program } from 'commander';
import packageData from '../package.json';

program.name('cli').version(packageData.version);

program
    .command('hello')
    .description('Say hello')
    .action(() => {
        console.log('Hello, world!');
    });

// Catch all command to show a custom message for unknown commands
program.command('*', { hidden: true }).action(() => {});
// Event listener for unknown commands
program.on('command:*', function (operands) {
    console.error(`Error: Unknown command '${operands[0]}'.`);
    console.log('See --help for a list of available commands.');
    process.exit(1);
});

program.showHelpAfterError();

program.parse(process.argv);
