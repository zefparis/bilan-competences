"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info, Shield, Heart, Users, ArrowLeft } from "lucide-react"

export default function AccessibilityPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    hasDisability: false,
    disabilityType: "",
    hasRQTH: false,
    rqthNumber: "",
    rqthExpiryDate: "",
    needsWorkstationAdaptation: false,
    needsScheduleFlexibility: false,
    needsRemoteWork: false,
    needsAccessibleTransport: false,
    needsAssistiveTechnology: false,
    otherNeeds: "",
    compensatorySkills: [] as string[],
    preferDisabilityFriendlyCompanies: false,
    interestedInAGEFIPHAid: false,
    shareWithEmployers: false
  })

  useEffect(() => {
    fetch("/api/accessibility")
      .then(res => res.json())
      .then(data => {
        if (data.accessibility) {
          const acc = data.accessibility
          setFormData({
            hasDisability: acc.hasDisability || false,
            disabilityType: acc.disabilityType || "",
            hasRQTH: acc.hasRQTH || false,
            rqthNumber: acc.rqthNumber || "",
            rqthExpiryDate: acc.rqthExpiryDate ? new Date(acc.rqthExpiryDate).toISOString().split('T')[0] : "",
            needsWorkstationAdaptation: acc.needsWorkstationAdaptation || false,
            needsScheduleFlexibility: acc.needsScheduleFlexibility || false,
            needsRemoteWork: acc.needsRemoteWork || false,
            needsAccessibleTransport: acc.needsAccessibleTransport || false,
            needsAssistiveTechnology: acc.needsAssistiveTechnology || false,
            otherNeeds: acc.otherNeeds || "",
            compensatorySkills: acc.compensatorySkills || [],
            preferDisabilityFriendlyCompanies: acc.preferDisabilityFriendlyCompanies || false,
            interestedInAGEFIPHAid: acc.interestedInAGEFIPHAid || false,
            shareWithEmployers: acc.shareWithEmployers || false
          })
        }
      })
      .catch(err => console.error("Error loading accessibility data:", err))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await fetch("/api/accessibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      router.push("/dashboard")
    } catch (error) {
      console.error("Error saving accessibility data:", error)
    } finally {
      setLoading(false)
    }
  }

  const disabilityTypes = [
    { value: "moteur", label: "Moteur (mobilité réduite, paralysie...)" },
    { value: "visuel", label: "Visuel (cécité, malvoyance...)" },
    { value: "auditif", label: "Auditif (surdité, malentendance...)" },
    { value: "cognitif", label: "Cognitif (troubles dys, autisme...)" },
    { value: "psychique", label: "Psychique (bipolarité, dépression...)" },
    { value: "invisible", label: "Invisible (diabète, épilepsie, maladies chroniques...)" },
    { value: "multiple", label: "Polyhandicap" }
  ]

  const compensatorySkillsOptions = [
    "Résilience exceptionnelle",
    "Capacité d'adaptation accrue",
    "Créativité dans la résolution de problèmes",
    "Empathie développée",
    "Organisation rigoureuse",
    "Gestion du stress",
    "Communication claire et directe",
    "Travail en autonomie",
    "Persévérance"
  ]

  return (
    <div className="container max-w-4xl py-8">
      <Button
        variant="ghost"
        onClick={() => router.push("/dashboard")}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour au dashboard
      </Button>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Heart className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold">Accessibilité & Handicap</h1>
        </div>
        <p className="text-muted-foreground">
          Ces informations nous permettent de personnaliser votre recherche d'emploi et de formations accessibles.
          <strong className="block mt-2">Vos données restent strictement confidentielles.</strong>
        </p>
      </div>

      <Alert className="mb-6 border-blue-500 bg-blue-50">
        <Shield className="w-4 h-4" />
        <AlertDescription>
          <strong>Protection des données :</strong> Ces informations ne sont jamais partagées sans votre consentement explicite.
          Elles servent uniquement à améliorer votre matching emploi/formation.
        </AlertDescription>
      </Alert>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Situation de handicap</CardTitle>
            <CardDescription>Cette information est optionnelle et confidentielle</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-base">Êtes-vous en situation de handicap ?</Label>
              <RadioGroup
                value={formData.hasDisability ? "yes" : "no"}
                onValueChange={(value) => setFormData({...formData, hasDisability: value === "yes"})}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label htmlFor="yes" className="font-normal">Oui</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no" className="font-normal">Non</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.hasDisability && (
              <div>
                <Label>Type de handicap (optionnel)</Label>
                <Select 
                  value={formData.disabilityType}
                  onValueChange={(value) => setFormData({...formData, disabilityType: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    {disabilityTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardContent>
        </Card>

        {formData.hasDisability && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Reconnaissance Travailleur Handicapé (RQTH)</CardTitle>
                <CardDescription>
                  La RQTH ouvre droit à des aides financières (AGEFIPH) et à l'obligation d'emploi des 6%
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="hasRQTH"
                    checked={formData.hasRQTH}
                    onCheckedChange={(checked) => setFormData({...formData, hasRQTH: checked as boolean})}
                  />
                  <Label htmlFor="hasRQTH" className="font-normal">
                    J'ai une RQTH en cours de validité
                  </Label>
                </div>

                {formData.hasRQTH && (
                  <>
                    <div>
                      <Label>Numéro RQTH (optionnel)</Label>
                      <Input
                        value={formData.rqthNumber}
                        onChange={(e) => setFormData({...formData, rqthNumber: e.target.value})}
                        placeholder="Ex: 2024-XXXX-XXXX"
                      />
                    </div>

                    <div>
                      <Label>Date d'expiration</Label>
                      <Input
                        type="date"
                        value={formData.rqthExpiryDate}
                        onChange={(e) => setFormData({...formData, rqthExpiryDate: e.target.value})}
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Besoins d'aménagement au travail</CardTitle>
                <CardDescription>Cochez les aménagements nécessaires à votre activité professionnelle</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="workstation"
                    checked={formData.needsWorkstationAdaptation}
                    onCheckedChange={(checked) => setFormData({...formData, needsWorkstationAdaptation: checked as boolean})}
                  />
                  <Label htmlFor="workstation" className="font-normal">
                    Aménagement du poste de travail (matériel ergonomique, bureau adapté...)
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="schedule"
                    checked={formData.needsScheduleFlexibility}
                    onCheckedChange={(checked) => setFormData({...formData, needsScheduleFlexibility: checked as boolean})}
                  />
                  <Label htmlFor="schedule" className="font-normal">
                    Horaires flexibles (mi-temps thérapeutique, pause médicale...)
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remote"
                    checked={formData.needsRemoteWork}
                    onCheckedChange={(checked) => setFormData({...formData, needsRemoteWork: checked as boolean})}
                  />
                  <Label htmlFor="remote" className="font-normal">
                    Télétravail (total ou partiel)
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="transport"
                    checked={formData.needsAccessibleTransport}
                    onCheckedChange={(checked) => setFormData({...formData, needsAccessibleTransport: checked as boolean})}
                  />
                  <Label htmlFor="transport" className="font-normal">
                    Accessibilité transport (proximité transports en commun accessibles PMR)
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="technology"
                    checked={formData.needsAssistiveTechnology}
                    onCheckedChange={(checked) => setFormData({...formData, needsAssistiveTechnology: checked as boolean})}
                  />
                  <Label htmlFor="technology" className="font-normal">
                    Technologies d'assistance (lecteur d'écran, logiciel de reconnaissance vocale...)
                  </Label>
                </div>

                <div className="mt-4">
                  <Label>Autres besoins spécifiques</Label>
                  <Textarea
                    value={formData.otherNeeds}
                    onChange={(e) => setFormData({...formData, otherNeeds: e.target.value})}
                    placeholder="Décrivez tout autre aménagement nécessaire..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compétences développées</CardTitle>
                <CardDescription>
                  Vivre avec un handicap développe souvent des compétences humaines exceptionnelles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {compensatorySkillsOptions.map(skill => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox 
                      id={skill}
                      checked={formData.compensatorySkills.includes(skill)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData({
                            ...formData,
                            compensatorySkills: [...formData.compensatorySkills, skill]
                          })
                        } else {
                          setFormData({
                            ...formData,
                            compensatorySkills: formData.compensatorySkills.filter(s => s !== skill)
                          })
                        }
                      }}
                    />
                    <Label htmlFor={skill} className="font-normal">{skill}</Label>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Préférences de recherche</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="handiFriendly"
                    checked={formData.preferDisabilityFriendlyCompanies}
                    onCheckedChange={(checked) => setFormData({...formData, preferDisabilityFriendlyCompanies: checked as boolean})}
                  />
                  <Label htmlFor="handiFriendly" className="font-normal">
                    Prioriser les entreprises engagées handicap (&gt; 6% de TH)
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="agefiph"
                    checked={formData.interestedInAGEFIPHAid}
                    onCheckedChange={(checked) => setFormData({...formData, interestedInAGEFIPHAid: checked as boolean})}
                  />
                  <Label htmlFor="agefiph" className="font-normal">
                    Je souhaite être informé(e) des aides AGEFIPH disponibles
                  </Label>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Info className="w-4 h-4 text-blue-600" />
                    <Label className="text-sm font-semibold text-blue-900">
                      Aides financières AGEFIPH
                    </Label>
                  </div>
                  <ul className="text-sm text-blue-800 space-y-1 ml-6 list-disc">
                    <li>Aide à l'insertion professionnelle (jusqu'à 4 000€)</li>
                    <li>Aide à la formation (prise en charge totale ou partielle)</li>
                    <li>Aide à l'adaptation du poste de travail (jusqu'à 10 000€)</li>
                    <li>Aide à la création d'entreprise (jusqu'à 6 000€)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-500">
              <CardHeader>
                <CardTitle>Confidentialité et partage</CardTitle>
                <CardDescription className="text-orange-600 font-medium">
                  ⚠️ Attention : cette option impacte la visibilité de vos candidatures
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="share"
                    checked={formData.shareWithEmployers}
                    onCheckedChange={(checked) => setFormData({...formData, shareWithEmployers: checked as boolean})}
                  />
                  <div>
                    <Label htmlFor="share" className="font-normal">
                      J'autorise PERSPECTA à mentionner ma situation de handicap aux employeurs
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Cela peut faciliter l'accès aux entreprises engagées handicap et aux aides AGEFIPH.
                      Vous pouvez modifier ce paramètre à tout moment.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        <div className="flex gap-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => router.push("/dashboard")}
            className="flex-1"
          >
            Retour
          </Button>
          <Button type="submit" disabled={loading} className="flex-1">
            {loading ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </div>

        {!formData.hasDisability && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.push("/dashboard")}
            className="w-full"
          >
            Passer cette étape (module optionnel)
          </Button>
        )}
      </form>

      <Card className="mt-8 border-purple-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            Ressources utiles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <a href="https://www.agefiph.fr" target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:underline">
            → AGEFIPH : Aide financière et accompagnement
          </a>
          <a href="https://www.fiphfp.fr" target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:underline">
            → FIPHFP : Fonds pour l'insertion dans la fonction publique
          </a>
          <a href="https://www.mdph.fr" target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:underline">
            → MDPH : Maison Départementale des Personnes Handicapées
          </a>
          <a href="https://www.cap-emploi.fr" target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:underline">
            → Cap Emploi : Accompagnement personnalisé
          </a>
        </CardContent>
      </Card>
    </div>
  )
}
