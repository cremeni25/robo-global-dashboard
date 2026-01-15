import { useEffect, useState } from "react";
import { View, Text, Button, ScrollView, StyleSheet } from "react-native";
import { apiGet } from "../services/api";

type StatusData = {
  status: string;
  ultima_decisao: string;
  regra_ouro: string;
};

type CapitalData = {
  capital_total: number;
  capital_em_risco: number;
  capital_disponivel: number;
  receita_acumulada: number;
};

export default function EstadoCapital() {
  const [status, setStatus] = useState<StatusData | null>(null);
  const [capital, setCapital] = useState<CapitalData | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      apiGet<StatusData>("/status"),
      apiGet<CapitalData>("/capital"),
    ])
      .then(([s, c]) => {
        setStatus(s);
        setCapital(c);
      })
      .catch(() => setErro("Erro ao carregar dados do robô"));
  }, []);

  if (erro) {
    return <View style={styles.center}><Text>{erro}</Text></View>;
  }

  if (!status || !capital) {
    return <View style={styles.center}><Text>Carregando...</Text></View>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Estado do Robô</Text>
      <Text>Status: {status.status}</Text>
      <Text>Última decisão: {status.ultima_decisao}</Text>
      <Text>Regra de Ouro: {status.regra_ouro}</Text>

      <Text style={styles.title}>Capital</Text>
      <Text>Total: R$ {capital.capital_total}</Text>
      <Text>Em risco: R$ {capital.capital_em_risco}</Text>
      <Text>Disponível: R$ {capital.capital_disponivel}</Text>
      <Text>Receita acumulada: R$ {capital.receita_acumulada}</Text>

      <Text style={styles.title}>Ações Humanas</Text>
      <Button title="Pausar Oferta" disabled />
      <Button title="Liberar Escala" disabled />
      <Button title="Travar Tudo" disabled />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { marginTop: 20, fontWeight: "bold", fontSize: 18 },
});
