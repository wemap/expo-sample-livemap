import {  StyleSheet, Pressable, Text } from 'react-native';

import { LivemapWebview, LivemapWebviewRef } from '@/components/LivemapWeview';
import { useEffect, useRef } from 'react';

export default function HomeScreen() {
  const livemapWebviewRef = useRef<LivemapWebviewRef>(null);
  
  const navigateToPinpoint = (pinpointId: number) => {
    livemapWebviewRef.current?.navigateToPinpoint(pinpointId);
  };

  const setCenter = (center: {latitude: number; longitude: number;}) => {
    livemapWebviewRef.current?.setCenter(center);
  };

  const centerTo = (center: {latitude: number; longitude: number;}, zoom: number) => {
    livemapWebviewRef.current?.centerTo(center, zoom);
  };

  useEffect(() => {
    setTimeout(() => {
      // setCenter({latitude: 48.856614, longitude: 2.352222});
      
      centerTo({latitude: 48.856614, longitude: 2.352222}, 15);
      
      // navigateToPinpoint(PINPOINT_ID);
    }, 1000);
  }, []);

  return (<>
    <LivemapWebview
      ref={livemapWebviewRef}
      style={styles.livemap}
      emmid={28350} />
  </>
  );
}

const styles = StyleSheet.create({
  livemap: {
    flex: 1,
  },
});
