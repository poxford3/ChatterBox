import { View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'react-native-paper';
import { ThemedText } from './ThemedText';

type sendProps = {
  sendTime: (time: number) => void;
}

export default function Stopwatch({ sendTime }: sendProps) {

    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const intervalRef = useRef(0);
    const startTimeRef = useRef(0);

    const handleTimeRequest = () => {
      // console.log('handle inside', time);
      sendTime(time);
    }

    useEffect(() => {
      handleTimeRequest();
    }, [running])

    const startStopwatch = () => {
        startTimeRef.current = Date.now() - time;
        intervalRef.current = window.setInterval(() => {
            setTime(Math.floor((Date.now() - startTimeRef.current)));
        }, 1);
        setRunning(true);
    };

    const pauseStopwatch = () => {
        clearInterval(intervalRef.current);
        setRunning(false);
    };

    const resetStopwatch = () => {
        clearInterval(intervalRef.current);
        setTime(0);
        setRunning(false);
        handleTimeRequest();
        console.log('handle', time);
    };

    const resumeStopwatch = () => {
        startTimeRef.current = Date.now() - time;
        intervalRef.current = window.setInterval(() => {
            setTime(Math.floor(
                (Date.now() - startTimeRef.current)));
        }, 1);
        setRunning(true);
    };

    function formatTime(elapsedTime: number) {

        let hours = String(Math.floor(elapsedTime / (1000 * 60 * 60))).padStart(2, "0");
        let minutes = String(Math.floor(elapsedTime / (1000 * 60) % 60)).padStart(2, "0");
        let seconds = String(Math.floor(elapsedTime / (1000) % 60)).padStart(2, "0");
        let milliseconds = String(Math.floor((elapsedTime % 1000) / 10)).padStart(2, "0");
 
        return `${hours}:${minutes}:${seconds}:${milliseconds}`;
    }

  return (
    <View >
      <ThemedText type='subtitle'>{formatTime(time)}</ThemedText>
      <View style={{flexDirection: 'row', padding: 10, alignItems: 'center', justifyContent: 'space-evenly'}}>
        {running ? null : <Button dark={true} icon={"play"} mode='contained' onPress={time > 0 ? resumeStopwatch : startStopwatch}>{time > 0 ? 'Resume' : 'Start'}</Button>}
        {running ? <Button icon={"pause"} mode='contained' onPress={pauseStopwatch}>Pause</Button> : null}
        {running ? null : <Button icon={"restart"} mode='contained' onPress={resetStopwatch}>Reset</Button>}
      </View>
    </View>
  )
}