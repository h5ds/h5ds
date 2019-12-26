import './utils/pubsub';
import H5dsEditor from './H5dsEditor';
import { mountValue } from 'h5ds-mount-plugin';
import { getInitData, renderIn } from './config';

const enums = { ...renderIn };

mountValue('editor', { H5dsEditor,  getInitData, enums });

export default H5dsEditor;
