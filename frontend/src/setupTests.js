import { mount,render,shallow,configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetch from 'jest-fetch-mock'
import 'jest-localstorage-mock'


configure({ adapter: new Adapter() });

global.mount            = mount;
global.render           = render;
global.shallow          = shallow;
global.fetch            = fetch;

