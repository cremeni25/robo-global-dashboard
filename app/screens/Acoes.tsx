import { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { apiGet } from "../services/api";

type EscalaStatus = {
  pode_pausar: boolean;
  pode_liberar_escala: boolean;
  pode_travar: boolean;
  mensagem: string;
};

export default function Acoes() {
  const [status, setStatus] = useState<EscalaStatus | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    apiGet<EscalaStatus>("/escala")
      .then(setStatus)
      .catch(() => setErro("Erro ao carregar estado das ações"));
  }, []);

  const confirmar = (acao: string) => {
    Alert.alert(
      "Confirmação",
      `Deseja executar: ${acao}?`,
      [{ text: "Cancelar" }, { text: "Confirmar", onPress: () => {} }]
    );
  };

  if (erro) return <View style={styles.center}><Text>{erro}</Text></View>;
  if (!status) return <View style={styles.center}><Text>Carregando...</Text></View>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ações Humanas</Text>
      <Text style={styles.msg}>{status.mensagem}</Text>

      <Button
        title="Pausar Oferta"
        disabled={!status.pode_pausar}
        onPress={() => confirmar("Pausar Oferta")}
      />
      <Button
        title="Liberar Escala"
        disabled={!status.pode_liberar_escala}
        onPress={() => confirmar("Liberar Escala")}
      />
      <Button
        title="Travar Tudo"
        disabled={!status.pode_travar}
        onPress={() => confirmar("Travar Tudo")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  msg: { marginBottom: 16 }
});
