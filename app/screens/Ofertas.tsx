import { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { apiGet } from "../services/api";

type Produto = {
  id: string;
  nome: string;
  plataforma: string;
  receita: number;
  roi: number | null;
  status: string;
};

export default function Ofertas() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    apiGet<Produto[]>("/produtos")
      .then(setProdutos)
      .catch(() => setErro("Erro ao carregar produtos"));
  }, []);

  if (erro) return <View style={styles.center}><Text>{erro}</Text></View>;
  if (!produtos.length) return <View style={styles.center}><Text>Carregando...</Text></View>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Ofertas</Text>
      {produtos.map(p => (
        <View key={p.id} style={styles.card}>
          <Text><strong>{p.nome}</strong></Text>
          <Text>Plataforma: {p.plataforma}</Text>
          <Text>Receita: R$ {p.receita}</Text>
          <Text>ROI: {p.roi ?? "—"}</Text>
          <Text>Status: {p.status}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  card: { padding: 12, borderWidth: 1, borderRadius: 8, marginBottom: 10 }
});
