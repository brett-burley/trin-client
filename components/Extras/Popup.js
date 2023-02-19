import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Overlay, Icon, SocialIcon } from '@rneui/themed';
import useMode from '../../hooks/useMode'


export default function Popup()
{
  const { getMode } = useMode(); 
  const mode = getMode();
  const [current, setCurrent] = useState(mode);

  useEffect(() => {
    if(mode !== current) {
      setCurrent(true)
      setTimeout(() => setCurrent(mode), 1800);
    }
  }, [mode]);
 
  const visible = current === true;

  return (
    <Overlay 
      isVisible={visible} 
      backdropStyle={sty.backdrop}
      overlayStyle={sty.overlay}
      onBackdropPress={toggleOverlay}
    >
      <Text style={sty.textPrimary}>
        {`Switching to ${mode} mode`}
      </Text>

      <LoadingSpinner show={visible} />
    </Overlay>
  );


  function toggleOverlay()
  {
    setVisible(!visible);
  };
};


function LoadingSpinner({ show })
{ 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(show) {
      setTimeout(() => setLoading(false), 1200);
    }

    return () => setLoading(true);
  },[show])

  return (
    <SocialIcon
      type='check'
      iconType='font-awesome'
      loading={loading}
      raised={false}
    />
  );
}

const sty = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  overlay: {
    backgroundColor: '#37A4FA',
    padding: 30,
    alignItems: 'center',
  },
  textPrimary: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 25,
    color: '#FFF',
  },
});
