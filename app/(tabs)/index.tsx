import {  StyleSheet, Pressable, Text, Button, ScrollView, SafeAreaView } from 'react-native';

import LivemapWebview, { LivemapWebviewRef, LivemapWebviewProps } from '@wemap/expo-livemap';
import { useEffect, useRef } from 'react';

const pinpoints = [
  {
    id: 1,
    name: 'Wemap Office',
    latitude: 43.609138,
    longitude: 3.884193,
    description: 'Where magic happens',
  },
  {
    id: 2,
    name: 'Effeil Tower',
    latitude: 48.85837,
    longitude: 2.294481,
    description: 'What is that ?',
  },
];

const polyline = [
  {
    latitude: 43.609138,
    longitude: 3.884193,
  },
  {
    latitude: 48.85837,
    longitude: 2.294481,
  },
];

export default function HomeScreen() {
  const livemapWebviewRef = useRef<LivemapWebviewRef>(null);

  const centerTo = () => {
    livemapWebviewRef.current?.centerTo({ latitude: 43.856614, longitude: 2.352222 }, 15);
  };

  const setPinpoints = () => {
    livemapWebviewRef.current?.setPinpoints(pinpoints);
  }

  const setSourceLists = () => {
    livemapWebviewRef.current?.setSourceLists([74878]);
  }

  const drawPolyline = () => {
    livemapWebviewRef.current?.drawPolyline(polyline, { color: '#222222' });
    // .then((id) => {
    //   console.log('Polyline drawn: ' + id);
    //   setTimeout(() => {
    //     console.log('Polyline removed: ' + id);
    //     livemapWebviewRef.current?.removePolyline(id);
    //   }, 8000);
    // });
  }

  const aroundMe = () => {
    livemapWebviewRef.current?.aroundMe();
  }

  const getUserLocation = () => {
    livemapWebviewRef.current?.getUserLocation().then((loc) => {
      console.log('loc received', loc)
    });
  }

  const setFilters = () => {
    livemapWebviewRef.current?.setFilters({
      query: 'arts décoratifs',
      tags: ['monument-historique', 'musee-de-france']
    });
  }

  const setCenter = () => {
    livemapWebviewRef.current?.setCenter({ latitude: 43.856614, longitude: 2.352222 });
  }

  const onContentUpdated = (data: {items: any[]}) => {
    console.log('sample onContentUpdated', data.items.length);
  }

  return (<>
  <SafeAreaView style={styles.buttonContainer}>
    <ScrollView>
      <Pressable
        style={styles.button}
        onPress={() => centerTo()}>
        <Text>Center to</Text>
      </Pressable>
      <Pressable
        style={styles.button}
          onPress={() => getUserLocation()}>
        <Text>Get user location</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => setPinpoints()}>
        <Text>Set Pinpoints</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => setSourceLists()}>
        <Text>Set Source Lists</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => drawPolyline()}>
        <Text>Draw Polyline</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => aroundMe()}>
        <Text>Around Me</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => setFilters()}>
        <Text>Set Filters</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => setCenter()}>
        <Text>Set Center</Text>
      </Pressable>
    </ScrollView>
  </SafeAreaView>
    <LivemapWebview
      onContentUpdated={onContentUpdated}
      ref={livemapWebviewRef}
      style={styles.livemap}
      emmid={25414} />
  </>
  );
}

const styles = StyleSheet.create({
  livemap: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    top: 100,
    maxHeight: 200,
    left: 0,
    zIndex: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: 'grey',
  }
});
