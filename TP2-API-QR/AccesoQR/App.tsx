import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  Animated,
  Easing,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { Camera, CameraView, BarcodeScanningResult } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";

type ScanEntry = {
  id: string;
  value: string;
  type: string;
  at: string;
};

const STORAGE_KEY = "@scan_history_v2";

export default function App() {
  const [input, setInput] = useState<string>("Hola mundo");
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scannerVisible, setScannerVisible] = useState(false);
  const [scannedValue, setScannedValue] = useState<string | null>(null);
  const [loadingPerm, setLoadingPerm] = useState(false);
  const [history, setHistory] = useState<ScanEntry[]>([]);
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setHistory(JSON.parse(raw));
      } catch (e) {
        console.warn("Error leyendo historial", e);
      }
    })();
  }, []);

  const requestCameraPermission = async (): Promise<boolean> => {
    try {
      setLoadingPerm(true);
      const { status } = await Camera.requestCameraPermissionsAsync();
      const granted = status === "granted";
      setHasPermission(granted);
      setLoadingPerm(false);
      return granted;
    } catch (e) {
      setHasPermission(false);
      setLoadingPerm(false);
      return false;
    }
  };

  const startLineAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 200,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const openScanner = async () => {
    if (hasPermission !== true) {
      const granted = await requestCameraPermission();
      if (!granted) {
        Alert.alert(
          "Permiso de cámara",
          "No se concedió permiso de cámara. Activá la cámara en configuración."
        );
        return;
      }
    }
    setScannerVisible(true);
    startLineAnimation();
  };

  const closeScanner = () => {
    setScannerVisible(false);
    translateY.stopAnimation();
  };

  const handleBarCodeScanned = async (result: BarcodeScanningResult) => {
    const { data, type } = result;
    if (!data) return;

    setScannedValue(data);
    setScannerVisible(false);

    const newEntry: ScanEntry = {
      id: Date.now().toString(),
      value: data,
      type: type || "UNKNOWN",
      at: new Date().toISOString(),
    };
    const newHistory = [newEntry, ...history].slice(0, 100);
    setHistory(newHistory);

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
  };

  const copyScanned = async () => {
    if (!scannedValue) return;
    await Clipboard.setStringAsync(scannedValue);
    Alert.alert("Copiado", "Valor copiado al portapapeles.");
  };

  const parsePAY = (value: string) => {
    if (!value.startsWith("PAY:")) return null;
    const parts = value.slice(4).split("|");
    if (parts.length !== 3) return null;
    const [id, monto, currency] = parts;
    const montoNum = Number(monto);
    if (Number.isNaN(montoNum) || currency !== "ARS") return null;
    return { id, monto: montoNum, currency };
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>QR + Scanner</Text>

      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Texto para codificar"
      />

      <View style={styles.qrWrap}>
        <QRCode value={input || " "} size={180} />
      </View>

      <View style={styles.row}>
        <Button title="Escanear" onPress={openScanner} />
        <View style={{ width: 12 }} />
        <Button title="Borrar último" onPress={() => setScannedValue(null)} />
      </View>

      {scannedValue && (
        <View style={styles.section}>
          <Text style={styles.label}>Último escaneado:</Text>
          <Text style={styles.value}>{scannedValue}</Text>

          {parsePAY(scannedValue) && (
            <View style={styles.payBox}>
              <Text>Pago válido:</Text>
              <Text>ID: {parsePAY(scannedValue)?.id}</Text>
              <Text>
                Monto: {parsePAY(scannedValue)?.monto}{" "}
                {parsePAY(scannedValue)?.currency}
              </Text>
            </View>
          )}

          <Button title="Copiar" onPress={copyScanned} />
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.label}>Historial</Text>
        <FlatList
          data={history}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <View style={styles.histItem}>
              <Text numberOfLines={1}>{item.value}</Text>
              <Text style={styles.histDate}>
                {new Date(item.at).toLocaleString()}
              </Text>
            </View>
          )}
        />
      </View>

      {scannerVisible && (
        <View style={styles.scannerOverlay}>
          {loadingPerm ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <>
              <CameraView
                style={StyleSheet.absoluteFillObject}
                facing="back"
                onBarcodeScanned={handleBarCodeScanned}
                barcodeScannerSettings={{
                  barcodeTypes: ["qr", "pdf417"],
                }}
              />
              <View style={styles.scanFrame}>
                <Animated.View
                  style={[styles.scanLine, { transform: [{ translateY }] }]}
                />
              </View>
              <View style={styles.scanBottom}>
                <Button
                  title="Cerrar"
                  onPress={closeScanner}
                  color={Platform.OS === "ios" ? "#fff" : undefined}
                />
              </View>
            </>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 40 : 60,
    backgroundColor: "#f4f6f8",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    color: "#222",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
    fontSize: 16,
    marginBottom: 16,
  },
  qrWrap: {
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  section: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 14,
  },
  label: {
    fontWeight: "700",
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  value: {
    fontSize: 15,
    color: "#555",
  },
  payBox: {
    marginTop: 8,
    padding: 10,
    backgroundColor: "#e0f7fa",
    borderRadius: 8,
  },
  histItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  histDate: {
    fontSize: 12,
    color: "#999",
  },
  scannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  scanFrame: {
    width: 260,
    height: 260,
    borderWidth: 3,
    borderColor: "#00e676",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    overflow: "hidden",
  },
  scanLine: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 3,
    backgroundColor: "#ff1744",
  },
  scanBottom: {
    position: "absolute",
    bottom: 40,
  },
});


