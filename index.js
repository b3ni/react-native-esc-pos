import { DeviceEventEmitter, NativeModules } from 'react-native';

const { LayoutBuilder } = NativeModules;

const EscPos = {
  ...NativeModules.EscPos,
  addListener(eventName, cb) {
    let event;

    switch (eventName) {
      case 'bluetoothStateChanged':
        EscPos.initBluetoothConnectionListener();
        event = DeviceEventEmitter.addListener('bluetoothStateChanged', cb);
        break;

      case 'bluetoothDeviceFound':
        event = DeviceEventEmitter.addListener('bluetoothDeviceFound', cb);
        break;

      default:
        throw new Error(`${eventName} is not a valid event name.`);
    }

    return event;
  },
  // TODO: What is the best way to add optional arguments to @ReactMethod? overloading doesn seem to be working??
  connect(address, port) {
    if (!port) {
      return NativeModules.EscPos.connectBluetoothPrinter(address);
    } else {
      return NativeModules.EscPos.connectNetworkPrinter(address, port);
    }
  }
};

export { EscPos, LayoutBuilder };
export default EscPos;
