import { create } from 'zustand';
import {
  ColourPickerModalStore,
  ColourPickerTypeStore,
  DataTypeStore,
  RowsType,
} from '../Types/Types';

export const useDataStore = create<DataTypeStore>((set) => ({
  data: undefined,
  setData: (req: RowsType) => {
    set(() => ({
      data: req,
    }));
  },
}));

export const useColourPickerModalStore = create<ColourPickerModalStore>(
  (set) => ({
    visible: false,
    setShow: () => {
      set(() => ({
        visible: true,
      }));
    },
    setHide: () => {
      set(() => ({
        visible: false,
      }));
    },
  })
);

export const useColourPicker = create<ColourPickerTypeStore>((set) => ({
  colour: '#000',
  background: 'gray',
  setColour: (req: string) => {
    set(() => ({
      colour: req,
    }));
  },
  setBackground: (req: string) => {
    set(() => ({
      background: req,
    }));
  },
}));
