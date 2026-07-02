import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleNumberPress = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num));
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
      setWaitingForNewValue(false);
    }
  };

  const handleOperation = (op) => {
    const currentValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      const result = calculateResult(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setOperation(op);
    setWaitingForNewValue(true);
  };

  const calculateResult = (prev, current, op) => {
    switch (op) {
      case '+':
        return prev + current;
      case '-':
        return prev - current;
      case '*':
        return prev * current;
      case '/':
        return prev / current;
      case '%':
        return prev % current;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const currentValue = parseFloat(display);
      const result = calculateResult(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const handleDelete = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const Button = ({ label, onPress, style, textStyle }) => (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.buttonText, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.display}>{display}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        {/* Row 1 */}
        <View style={styles.row}>
          <Button label="C" onPress={handleClear} style={styles.functionButton} />
          <Button label="DEL" onPress={handleDelete} style={styles.functionButton} />
          <Button label="%" onPress={() => handleOperation('%')} style={styles.operationButton} />
          <Button label="÷" onPress={() => handleOperation('/')} style={styles.operationButton} />
        </View>

        {/* Row 2 */}
        <View style={styles.row}>
          <Button label="7" onPress={() => handleNumberPress(7)} />
          <Button label="8" onPress={() => handleNumberPress(8)} />
          <Button label="9" onPress={() => handleNumberPress(9)} />
          <Button label="×" onPress={() => handleOperation('*')} style={styles.operationButton} />
        </View>

        {/* Row 3 */}
        <View style={styles.row}>
          <Button label="4" onPress={() => handleNumberPress(4)} />
          <Button label="5" onPress={() => handleNumberPress(5)} />
          <Button label="6" onPress={() => handleNumberPress(6)} />
          <Button label="−" onPress={() => handleOperation('-')} style={styles.operationButton} />
        </View>

        {/* Row 4 */}
        <View style={styles.row}>
          <Button label="1" onPress={() => handleNumberPress(1)} />
          <Button label="2" onPress={() => handleNumberPress(2)} />
          <Button label="3" onPress={() => handleNumberPress(3)} />
          <Button label="+" onPress={() => handleOperation('+')} style={styles.operationButton} />
        </View>

        {/* Row 5 */}
        <View style={styles.row}>
          <Button label="0" onPress={() => handleNumberPress(0)} style={styles.zeroButton} />
          <Button label="." onPress={handleDecimal} />
          <Button label="=" onPress={handleEquals} style={styles.equalsButton} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  displayContainer: {
    backgroundColor: '#16213e',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    minHeight: 80,
  },
  display: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#00d4ff',
    textAlign: 'right',
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    height: 70,
    borderRadius: 10,
    backgroundColor: '#0f3460',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  operationButton: {
    backgroundColor: '#e94560',
  },
  functionButton: {
    backgroundColor: '#533483',
  },
  equalsButton: {
    backgroundColor: '#00d4ff',
    flex: 2,
  },
  zeroButton: {
    flex: 2,
  },
});
