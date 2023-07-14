import _ from "lodash";
import { createContext, useContext } from "react";

const EventEmitterContext = createContext({ eventEmitter: {} });

export const useEventEmitter = () => useContext(EventEmitterContext);

const EventEmitter = ({ children }) => {
  const eventEmitter = {
    _events: {},
    emit: function (event, data) {
      if (_.isEmpty(this._events[event])) return;
      this._events[event].forEach((callback) => callback(data));
    },
    on: function (event, callback) {
      if (_.isEmpty(this._events[event])) this._events[event] = [];
      this._events[event].push(callback);
      return this._events[event].length - 1;
    },
    unSubscribe: function (event, callbackId) {
      if (_.isEmpty(this._events[event])) return;
      if (this._events[event].length > callbackId) return;
      delete this._events[event][callbackId];
    },
  };
  return (
    <EventEmitterContext.Provider value={{ eventEmitter }}>
      {children}
    </EventEmitterContext.Provider>
  );
};

export default EventEmitter;
