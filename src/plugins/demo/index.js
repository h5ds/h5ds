import { Editor, icon } from './Editor';
import { LayerComp, config, scripts } from './Layer';

import { LayerJSON } from './LayerJSON';
import Modal from './Modal';
import { mountPlugin } from 'h5ds-mount-plugin';

mountPlugin({ Editor, LayerJSON, LayerComp, scripts, config, icon, Modal });

export { Editor, LayerJSON, LayerComp, scripts, config, icon, Modal };
