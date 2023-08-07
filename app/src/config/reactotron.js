import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { reactotronRedux } from 'reactotron-redux';

const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure()
  .useReactNative()
  .use(reactotronRedux())
  .connect();

  console.tron = Reactotron.log;

export default reactotron;