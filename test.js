const algorithm = require ('./src/algorithm')

const nodeProfile = algorithm.getNodePostProfiles
({ 'nodeSeq': { 'Q9DR80_9BETC': 'IGDLKCTT.VSINDVDTGVPSISTDTVDVTNGLGTYYVLDRVYLNTTLLLNGYYPTSGST',
                'E5RPZ2_9BETC': 'VGDVKCTT.IGVNDFNSGAPVISTETVDVTNGLGTYYVLDRVYLNTTLLLNGYYPTSGAN',
                'SPIKE_CVHN2': 'IGDFNCTN.SFINDYNKTIPRISEDVVDVSLGLGTYYVLNRVYLNTTLLFTGYFPKSGAN',
                'Q98341_9BETC': 'IGDFRCINLVNTDTSNASAPSVSTEVVDVSKGIGTYYVLDRVYLNATLLLTGYYPVDGSN',
                'Q98339_9BETC': 'IGDFRCIQLVNSNGANVSAPSISTETVDVSQGLGTYYVLDRVYLNATLLLTGYYPVDGSK' },
   'branchList': [['root', 'Q9DR80_9BETC', 0.15084],
                  ['root', 'node1', 0],
                  ['node1', 'E5RPZ2_9BETC', 0.19369],
                  ['node1', 'node2', 0.15833],
                  ['node2', 'SPIKE_CVHN2', 0.26651],
                  ['node2', 'node3', 0.41031],
                  ['node3', 'Q98341_9BETC', 0.07174],
                  ['node3', 'Q98339_9BETC', 0.18547]] })

console.log (JSON.stringify (nodeProfile, null, 2))
