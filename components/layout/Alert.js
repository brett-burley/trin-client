import { useEffect, useState } from 'react';
import { Icon, Card, Overlay } from '@rneui/themed';
import { View, Text, StyleSheet } from 'react-native';
import useAlert from '../../hooks/useAlert';


export default function Alert({ children })
{
  const { msg } = useAlert();
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if(msg)
      setVisible(true)
    else
      setVisible(false);
  }, [msg]);

  return (
    <View style={sty.alert}>
      {children}

      <Overlay isVisible={visible} onBackdropPress={() => setVisible(false)}>
        <Card wrapperStyle={sty.card}>
          <Card.Title style={sty.cardTitle}>
            <Icon containerStyle={sty.icon} type="ionicon" name="warning-outline" />
            Uh Oh!
          </Card.Title>
          <Card.Divider />
          <View style={sty.cardBody}>
            <Text style={sty.cardText}>
              {msg}
            </Text>
          </View>
        </Card>
      </Overlay>
    </View>
  );
};

const sty = StyleSheet.create({
  alert: {
    height: '100%',
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 20,
    color: '#ff190c',
  },
  cardText: {
    fontSize: 18,
    margin: 20
  }
});

