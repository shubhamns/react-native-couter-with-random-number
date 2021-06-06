import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

const App: () => Node = () => {
  const [isActive, setIsActive] = useState(true);
  const [counter, setCounter] = useState(0);
  const [second, setSecond] = useState(5);
  const [words, setWords] = useState([
    'mom',
    'tree',
    'pig',
    'fish',
    'cat',
    'dog',
  ]);
  const [randomWord, setRandomWord] = useState('');

  useEffect(() => {
    let intervalId;
    if (second > 0) {
      if (isActive) {
        intervalId = setInterval(() => {
          let divisor_for_minutes = second % (60 * 60);
          let divisor_for_seconds = divisor_for_minutes % 60;
          let computedSecond = Math.ceil(divisor_for_seconds);
          setSecond(computedSecond);
          setSecond(sec => sec - 1);
          setCounter(counter => counter + 1);
        }, 1000);
      }
    }
    return () => clearInterval(intervalId);
  }, [isActive, counter]);

  useEffect(() => {
    handleRandomWord();
    return () => {};
  }, []);

  const resetTimer = () => {
    setIsActive(true);
    setCounter(0);
    setSecond(5);
  };

  const handleRandomWord = () => {
    let word = words[Math.floor(Math.random() * words.length)];
    if (randomWord === word) {
      handleRandomWord();
    } else {
      setRandomWord(word);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <View style={styles.circle}>
            <Text style={styles.counter}>{second}</Text>
          </View>
          <TouchableOpacity onPress={resetTimer} style={styles.button}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>

        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.random}>{randomWord}</Text>
          <TouchableOpacity
            onPress={handleRandomWord}
            disabled={second > 0 ? false : true}
            style={[
              styles.button,
              {backgroundColor: second > 0 ? '#0099cc' : '#cccccc'},
            ]}>
            <Text style={styles.buttonText}>Click</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    borderWidth: 1,
    borderColor: '#696969',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  counter: {
    fontSize: 32,
    color: '#000000',
    fontWeight: '500',
  },
  random: {
    fontSize: 32,
    color: '#000000',
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: 15,
  },
  button: {
    width: 120,
    height: 40,
    paddingTop: 7,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#ff5c5c',
  },
  buttonText: {
    fontSize: 20,
    color: '#ffffff',
  },
});

export default App;
