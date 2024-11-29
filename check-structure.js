import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

function checkProjectStructure() {
    console.log('Checking project structure...\n');
    
    // Check server directory
    if (!existsSync('server')) {
        console.error('❌ server/ directory not found at project root');
        return;
    }
    console.log('✅ server/ directory exists');

    // Check server/tsconfig.json
    const tsconfigPath = join('server', 'tsconfig.json');
    if (!existsSync(tsconfigPath)) {
        console.error('❌ server/tsconfig.json not found');
        return;
    }
    console.log('✅ server/tsconfig.json exists');

    // Check server/index.ts
    const indexPath = join('server', 'index.ts');
    if (!existsSync(indexPath)) {
        console.error('❌ server/index.ts not found');
        return;
    }
    console.log('✅ server/index.ts exists');

    // Check package.json
    if (!existsSync('package.json')) {
        console.error('❌ package.json not found at project root');
        return;
    }
    console.log('✅ package.json exists');

    // Verify package.json build scripts
    try {
        const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
        const scripts = packageJson.scripts || {};
        
        if (!scripts['build:server']) {
            console.error('❌ build:server script not found in package.json');
            return;
        }
        console.log('✅ build:server script exists in package.json');

        if (!scripts['build']) {
            console.error('❌ build script not found in package.json');
            return;
        }
        console.log('✅ build script exists in package.json');

    } catch (error) {
        console.error('❌ Error reading package.json:', error.message);
        return;
    }

    console.log('\n✨ All required files and directories are present!');
}

checkProjectStructure(); 