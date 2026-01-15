import { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { apiGet } from "../services/api";

type DecisaoData = {
  decisao: string;
  motivo: string;
  impacto_financeiro: string;
  escala: string;
};

export default function Decisao() {
  const [data, setData] = useState<DecisaoData | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    apiGet<DecisaoData>("/decisao")
      .then(setData)
      .catch(() => setErro("Erro ao carregar decisão"));
  }, []);

  if (erro) return <View style={styles.center}><Text>{erro}</Text></View>;
  if (!data) return <View style={styles.center}><Text>Carregando...</Text></View>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Decisão do Robô</Text>
      <Text>Decisão: {data.decisao}</Text>
      <Text>Motivo: {data.motivo}</Text>
      <Text>Impacto financeiro: {data.impacto_financeiro}</Text>
      <Text>Escala: {data.escala}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 12 }
});
