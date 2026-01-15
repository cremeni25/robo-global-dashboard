import { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { apiGet } from "../services/api";

type LogItem = {
  id: string;
  tipo: string;
  mensagem: string;
  criado_em: string;
};

export default function Logs() {
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    apiGet<LogItem[]>("/analise")
      .then(setLogs)
      .catch(() => setErro("Erro ao carregar logs"));
  }, []);

  if (erro) return <View style={styles.center}><Text>{erro}</Text></View>;
  if (!logs.length) return <View style={styles.center}><Text>Carregando...</Text></View>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Logs / Histórico</Text>
      {logs.map(l => (
        <View key={l.id} style={styles.card}>
          <Text>Tipo: {l.tipo}</Text>
          <Text>{l.mensagem}</Text>
          <Text style={styles.date}>{new Date(l.criado_em).toLocaleString()}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  card: { padding: 12, borderWidth: 1, borderRadius: 8, marginBottom: 10 },
  date: { marginTop: 6, fontSize: 12, opacity: 0.7 }
});
