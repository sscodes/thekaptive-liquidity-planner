import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { Dispatch, SetStateAction, forwardRef, useState } from 'react';
import { SketchPicker } from 'react-color';
import './ColourPicker.css';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const ColourPicker = ({
  showColourPickerModal,
  setShowColourPickerModal,
  setColour,
  setBackground,
}: {
  showColourPickerModal: boolean;
  setShowColourPickerModal: Dispatch<SetStateAction<boolean>>;
  setColour: Dispatch<SetStateAction<string>>;
  setBackground: Dispatch<SetStateAction<string>>;
}) => {
  const [colour1, setColour1] = useState('black');
  const [colour2, setColour2] = useState('gray');

  const setColours = () => {
    setColour(colour1);
    setBackground(colour2);
    setShowColourPickerModal(false);
  };

  return (
    <Dialog
      open={showColourPickerModal}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setShowColourPickerModal(false)}
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
