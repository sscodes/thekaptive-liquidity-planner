import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, useState } from 'react';
import { SketchPicker } from 'react-color';
import {
  useColourPicker,
  useColourPickerModalStore,
} from '../../Zustand/Store';
import './ColourPicker.css';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const ColourPicker = () => {
  const [colour1, setColour1] = useState('black');
  const [colour2, setColour2] = useState('gray');

  const { visible, setHide } = useColourPickerModalStore((state) => state);
  const { setColour, setBackground } = useColourPicker((state) => state);

  const setColours = () => {
    setColour(colour1);
    setBackground(colour2);
    setHide();
  };

  return (
    <Dialog
      open={visible}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setHide()}
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogTitle>
        <h2>Set header font & background color</h2>
      </DialogTitle>
      <DialogContent className='colour-pickers-section'>
        <SketchPicker
          color={colour1}
          onChange={(color) => setColour1(color.hex)}
        />
        <SketchPicker
          color={colour2}
          onChangeComplete={(color) => setColour2(color.hex)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={setColours} variant='contained'>
          Set Colour
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ColourPicker;
