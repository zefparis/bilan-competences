"use client"

import { Briefcase, User, Shield, HelpCircle, RefreshCcw, LayoutDashboard, FileText, CheckCircle2 } from "lucide-react"
import { Document, Page, PDFDownloadLink, Text, View } from "@react-pdf/renderer"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"

type CognitiveAnalysis = {
  archetype: {
    name: string
    description: string
    workEnvironment: string
  }
  dynamics: {
    dominant: string
    secondary: string | null
    detailLevel: string
  }
  traits: string[]
  strengths: string[]
  blindSpots: string[]
  evolutionLever: string
  strategicSynthesis: string
}

type Summary = {
  assessmentId: string
  user: {
    email: string
    firstName: string | null
    lastName: string | null
    title: string | null
    bio: string | null
    image: string | null
  } | null
  lifePath: {
    id: string
    events: Array<{
      id: string
      year: number
      title: string
      type: string
      sentiment: number
      description?: string | null
    }>
  } | null
  experiences: Array<{
    id: string
    title: string
    company: string
    startDate: string
    endDate?: string | null
    skills: string
  }>
  values: Array<{
    id: string
    valueName: string
    order: number
    gapScore?: number | null
  }>
  riasecResult: {
    id: string
    scoreR: number
    scoreI: number
    scoreA: number
    scoreS: number
    scoreE: number
    scoreC: number
    topCode: string
  } | null
  cognitiveAnalysis: CognitiveAnalysis | null
  cognitiveInsights: Array<{
    id: string
    insight_type: "strength" | "challenge" | "career" | "learning"
    title: string
    description: string
    priority: number
  }>
}

const fetchUserData = async () => {
  const res = await fetch("/api/assessment/summary", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  })

  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new Error(body?.message || `Erreur ${res.status}`)
  }

  return (await res.json()) as Summary
}

export function PDFGenerator() {
  const { data: userData, isLoading, error } = useQuery({
    queryKey: ['userData'],
    queryFn: () => fetchUserData(),
    enabled: true,
  })

  if (isLoading) {
    return <Button disabled>Chargement des données...</Button>
  }

  if (error) {
    const msg = error instanceof Error ? error.message : "Erreur de chargement"
    const isAuth = /401/.test(msg) || /Non authentifié/i.test(msg)
    return (
      <Button variant="destructive" disabled>
        {isAuth ? "Veuillez vous reconnecter" : "Erreur de chargement"}
      </Button>
    )
  }

  if (!userData) {
    return <Button disabled>Aucune donnée disponible</Button>
  }

  const hasAnyData =
    !!userData.riasecResult ||
    !!userData.cognitiveAnalysis ||
    (userData.values?.length ?? 0) > 0 ||
    (userData.experiences?.length ?? 0) > 0 ||
    ((userData.lifePath?.events?.length ?? 0) > 0)

  if (!hasAnyData) {
    return <Button disabled>Aucune donnée disponible</Button>
  }

  const styles: any = {
    page: { padding: 40, fontFamily: "Helvetica" },
    header: { marginBottom: 20, textAlign: "center" },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
    section: { marginBottom: 15 },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: "#3b82f6",
      paddingBottom: 4,
    },
    item: { marginBottom: 4 },
  }

  return (
    <PDFDownloadLink 
      document={
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.header}>
              <Text style={styles.title}>Bilan de Compétences Professionnel</Text>
              {userData.user && (
                <View style={{ marginBottom: 15 }}>
                  <Text style={{ fontSize: 18, color: "#3b82f6", marginBottom: 4 }}>
                    {userData.user.firstName} {userData.user.lastName}
                  </Text>
                  {userData.user.title && (
                    <Text style={{ fontSize: 14, color: "#64748b", marginBottom: 4 }}>
                      {userData.user.title}
                    </Text>
                  )}
                  {userData.user.bio && (
                    <Text style={{ fontSize: 10, color: "#94a3b8", fontStyle: "italic", maxWidth: 400, alignSelf: "center" }}>
                      "{userData.user.bio}"
                    </Text>
                  )}
                </View>
              )}
              <Text style={{ fontSize: 10, color: "#94a3b8" }}>Généré le {new Date().toLocaleDateString()}</Text>
            </View>

            {userData.riasecResult && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Mon profil RIASEC</Text>
                <Text style={styles.item}>Réaliste: {userData.riasecResult.scoreR}</Text>
                <Text style={styles.item}>Investigateur: {userData.riasecResult.scoreI}</Text>
                <Text style={styles.item}>Artistique: {userData.riasecResult.scoreA}</Text>
                <Text style={styles.item}>Social: {userData.riasecResult.scoreS}</Text>
                <Text style={styles.item}>Entreprenant: {userData.riasecResult.scoreE}</Text>
                <Text style={styles.item}>Conventionnel: {userData.riasecResult.scoreC}</Text>
                <Text style={styles.item}>Profil dominant: {userData.riasecResult.topCode}</Text>
              </View>
            )}

            {userData.cognitiveAnalysis && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Mon profil cognitif HCS-U7</Text>
                <Text style={styles.item}>Archétype: {userData.cognitiveAnalysis.archetype.name}</Text>
                <Text style={styles.item}>Dynamique: {userData.cognitiveAnalysis.dynamics.detailLevel}</Text>
                <Text style={{ fontSize: 10, color: "#64748b", marginTop: 4 }}>
                  {userData.cognitiveAnalysis.archetype.description}
                </Text>
              </View>
            )}

            {(userData.cognitiveInsights?.length ?? 0) > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Insights cognitifs</Text>
                {(userData.cognitiveInsights ?? [])
                  .slice(0, 6)
                  .map((insight: any) => (
                    <View key={insight.id} style={{ marginBottom: 8 }}>
                      <Text style={styles.item}>{insight.title}</Text>
                      <Text style={styles.item}>{insight.description}</Text>
                    </View>
                  ))}
              </View>
            )}

            {userData.values?.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Mes valeurs principales</Text>
                {(userData.values ?? [])
                  .slice()
                  .sort((a: any, b: any) => a.order - b.order)
                  .map((value: any, index: number) => (
                    <Text key={value.id} style={styles.item}>
                      {index + 1}. {value.valueName} (Satisfaction: {value.gapScore}/5)
                    </Text>
                  ))}
              </View>
            )}

            {userData.experiences?.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Mes expériences clés</Text>
                {userData.experiences.map((exp: any) => (
                  <View key={exp.id} style={{ marginBottom: 10 }}>
                    <Text style={styles.item}>
                      {exp.title} chez {exp.company} ({new Date(exp.startDate).toLocaleDateString()} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'En cours'})
                    </Text>
                    <Text style={styles.item}>Compétences: {exp.skills}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Mon parcours */}
            {(userData.lifePath?.events?.length ?? 0) > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Mon parcours</Text>
                {(userData.lifePath?.events ?? [])
                  .slice()
                  .sort((a: any, b: any) => a.year - b.year)
                  .map((event: any) => (
                    <Text key={event.id} style={styles.item}>
                      {event.year}: {event.title} ({event.type}) - Sentiment: {event.sentiment > 0 ? '+' : ''}{event.sentiment}
                    </Text>
                  ))}
              </View>
            )}

            {/* Conclusion Professionnelle Section */}
            {userData.cognitiveAnalysis && (
              <View style={[styles.section, { backgroundColor: "#f8fafc", padding: 15, borderRadius: 8, borderLeftWidth: 4, borderLeftColor: "#3b82f6", marginTop: 20 }]}>
                <Text style={[styles.sectionTitle, { borderBottomWidth: 0, color: "#1e293b", marginBottom: 10 }]}>Conclusion Stratégique</Text>
                <Text style={{ fontSize: 12, lineHeight: 1.6, color: "#334155", fontStyle: "italic" }}>
                  {userData.cognitiveAnalysis.strategicSynthesis}
                </Text>
                <View style={{ marginTop: 10 }}>
                  <Text style={{ fontSize: 10, fontWeight: "bold", color: "#3b82f6", marginBottom: 4 }}>ENVIRONNEMENT IDÉAL</Text>
                  <Text style={{ fontSize: 10, color: "#64748b" }}>{userData.cognitiveAnalysis.archetype.workEnvironment}</Text>
                </View>
                <View style={{ marginTop: 8 }}>
                  <Text style={{ fontSize: 10, fontWeight: "bold", color: "#3b82f6", marginBottom: 4 }}>LEVIER D'ÉVOLUTION</Text>
                  <Text style={{ fontSize: 10, color: "#64748b" }}>{userData.cognitiveAnalysis.evolutionLever}</Text>
                </View>
              </View>
            )}
          </Page>
        </Document>
      }
      fileName="bilan-competences.pdf"
    >
      {({ loading }) => (
        <Button disabled={loading}>
          {loading ? "Génération en cours..." : "Télécharger ma synthèse"}
        </Button>
      )}
    </PDFDownloadLink>
  )
}
