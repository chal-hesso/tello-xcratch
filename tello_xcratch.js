class TelloExpert {
    getInfo() {
        return {
            id: 'telloExpert',
            name: 'Tello Control',
            blocks: [
                { opcode: 'takeoff', blockType: 'command', text: '離陸' },
                { opcode: 'land', blockType: 'command', text: '着陸' },
                { opcode: 'move', blockType: 'command', text: '[dir]へ [dist]cm進む',
                  arguments: {
                    dir: { type: 'string', menu: 'direction', defaultValue: 'forward' },
                    dist: { type: 'number', defaultValue: 20 }
                  }
                },
                { opcode: 'rotate', blockType: 'command', text: '[rotDir]へ [angle]度回転',
                  arguments: {
                    rotDir: { type: 'string', menu: 'rotation', defaultValue: 'cw' },
                    angle: { type: 'number', defaultValue: 90 }
                  }
                },
                { opcode: 'flip', blockType: 'command', text: '[flipDir]へ宙返り',
                  arguments: { flipDir: { type: 'string', menu: 'flipMenu', defaultValue: 'f' } }
                }
            ],
            menus: {
                direction: { items: [{text:'前',value:'forward'},{text:'後',value:'back'},{text:'左',value:'left'},{text:'右',value:'right'}] },
                rotation: { items: [{text:'右(時計回り)',value:'cw'},{text:'左(反時計)',value:'ccw'}] },
                flipMenu: { items: [{text:'前',value:'f'},{text:'後',value:'b'},{text:'左',value:'l'},{text:'右',value:'r'}] }
            }
        };
    }
    takeoff() { fetch('http://localhost:8001/command').then(() => fetch('http://localhost:8001/takeoff')); }
    land() { fetch('http://localhost:8001/land'); }
    move(args) { fetch(`http://localhost:8001/${args.dir} ${args.dist}`); }
    rotate(args) { fetch(`http://localhost:8001/${args.rotDir} ${args.angle}`); }
    flip(args) { fetch(`http://localhost:8001/flip ${args.flipDir}`); }
}
Scratch.extensions.register(new TelloExpert());