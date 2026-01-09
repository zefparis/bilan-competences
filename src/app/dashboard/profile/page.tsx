"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ModulePageHeader } from "@/components/module-page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Mail, Shield, Calendar, Save, Loader2, Briefcase, Lock, Fingerprint, Settings, Linkedin, Github, Globe, Sparkles, Upload, ImageIcon, CheckCircle, AlertCircle, ArrowRight, FileText } from "lucide-react"
import Link from "next/link"

type UserProfile = {
  id: string
  email: string
  name: string | null
  firstName: string | null
  lastName: string | null
  image: string | null
  title: string | null
  bio: string | null
  skills: string | null
  linkedin: string | null
  github: string | null
  portfolio: string | null
  city: string | null
  postalCode: string | null
  department: string | null
  role: string
  createdAt: string
  hasPaid?: boolean
  paidAt?: string | null
  cognitiveProfile?: {
    profile_code: string
    dominant_cognition: string
  } | null
  assessments?: Array<{
    riasecResult?: {
      topCode: string
    } | null
  }>
}

type FormData = {
  firstName: string
  lastName: string
  name: string
  image: string
  title: string
  bio: string
  skills: string
  linkedin: string
  github: string
  portfolio: string
  city: string
  postalCode: string
  department: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" })
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const router = useRouter()
  
  const { register, handleSubmit, reset } = useForm<FormData>()

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/user/profile")
        if (!res.ok) {
          if (res.status === 401) {
            router.push("/auth/signin")
            return
          }
          throw new Error("Erreur lors de la récupération du profil")
        }
        const data = await res.json()
        setUser(data)
        reset({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          name: data.name || "",
          image: data.image || "",
          title: data.title || "",
          bio: data.bio || "",
          skills: data.skills || "",
          linkedin: data.linkedin || "",
          github: data.github || "",
          portfolio: data.portfolio || "",
          city: data.city || "",
          postalCode: data.postalCode || "",
          department: data.department || "",
        })
      } catch (error) {
        console.error(error)
        toast.error("Impossible de charger le profil")
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [reset, router])

  const onSubmit = async (data: FormData) => {
    setSaving(true)
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error("Erreur lors de la mise à jour")

      const updatedUser = await res.json()
      setUser(updatedUser)
      toast.success("Profil mis à jour avec succès")
    } catch (error) {
      console.error(error)
      toast.error("Erreur lors de la mise à jour du profil")
    } finally {
      setSaving(false)
    }
  }

  const onChangePassword = async (e?: React.FormEvent | React.MouseEvent) => {
    e?.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Les nouveaux mots de passe ne correspondent pas")
      return
    }

    setPasswordLoading(true)
    try {
      const res = await fetch("/api/user/profile/security", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Erreur lors de la mise à jour")

      toast.success("Mot de passe mis à jour avec succès")
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
    } catch (error) {
      console.error(error)
      toast.error(error instanceof Error ? error.message : "Erreur lors de la mise à jour")
    } finally {
      setPasswordLoading(false)
    }
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("[CLIENT] ========== Avatar Upload START ==========")
    const file = e.target.files?.[0]
    console.log("[CLIENT] File selected:", file ? `${file.name} (${file.size} bytes, ${file.type})` : "null")
    
    if (!file) {
      console.log("[CLIENT] No file selected, aborting")
      return
    }

    // Validate file type
    console.log("[CLIENT] Validating file type...")
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      console.error("[CLIENT] Invalid file type:", file.type)
      toast.error("Type de fichier non autorisé. Utilisez JPG, PNG, GIF ou WebP.")
      return
    }
    console.log("[CLIENT] ✅ File type valid")

    // Validate file size (max 5MB)
    console.log("[CLIENT] Validating file size...")
    if (file.size > 5 * 1024 * 1024) {
      console.error("[CLIENT] File too large:", file.size)
      toast.error("Fichier trop volumineux. Maximum 5 Mo.")
      return
    }
    console.log("[CLIENT] ✅ File size valid")

    // Show preview
    console.log("[CLIENT] Creating preview...")
    const reader = new FileReader()
    reader.onload = (event) => {
      setAvatarPreview(event.target?.result as string)
      console.log("[CLIENT] ✅ Preview created")
    }
    reader.readAsDataURL(file)

    // Upload file
    setUploadingAvatar(true)
    try {
      console.log("[CLIENT] Creating FormData...")
      const formData = new FormData()
      formData.append("file", file)
      console.log("[CLIENT] ✅ FormData created")

      console.log("[CLIENT] Sending request to /api/upload/avatar...")
      const res = await fetch("/api/upload/avatar", {
        method: "POST",
        body: formData,
      })
      console.log("[CLIENT] Response received:", res.status, res.statusText)

      if (!res.ok) {
        const data = await res.json()
        console.error("[CLIENT] ❌ Upload failed:", data)
        throw new Error(data.error || "Erreur lors de l'upload")
      }

      const responseData = await res.json()
      console.log("[CLIENT] ✅ Upload successful:", responseData)
      const { url } = responseData
      console.log("[CLIENT] Image URL:", url)
      
      // Update profile with new image URL
      console.log("[CLIENT] Updating profile with new image URL...")
      const updateRes = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: url }),
      })
      console.log("[CLIENT] Profile update response:", updateRes.status, updateRes.statusText)

      if (!updateRes.ok) {
        const updateData = await updateRes.json()
        console.error("[CLIENT] ❌ Profile update failed:", updateData)
        throw new Error("Erreur lors de la mise à jour du profil")
      }

      const updatedUser = await updateRes.json()
      console.log("[CLIENT] ✅ Profile updated:", updatedUser)
      setUser(updatedUser)
      reset({ ...updatedUser, image: url })
      toast.success("Photo de profil mise à jour")
      console.log("[CLIENT] ========== Avatar Upload SUCCESS ==========")
    } catch (error) {
      console.error("[CLIENT] ========== Avatar Upload ERROR ==========")
      console.error("[CLIENT] Error:", error)
      console.error("[CLIENT] Error type:", error instanceof Error ? error.constructor.name : typeof error)
      console.error("[CLIENT] Error message:", error instanceof Error ? error.message : String(error))
      toast.error(error instanceof Error ? error.message : "Erreur lors de l'upload")
      setAvatarPreview(null)
    } finally {
      setUploadingAvatar(false)
      console.log("[CLIENT] Upload process finished")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <ModulePageHeader
        title="Mon Profil"
        description="Gérez vos informations personnelles et vos préférences de compte."
      />

      {/* Statut du bilan */}
      {user?.hasPaid ? (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Bilan complet activé</p>
                <p className="text-sm text-muted-foreground">
                  Accès illimité à tous les modules et à votre synthèse stratégique
                </p>
              </div>
            </div>
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="gap-2">
                Consulter mon rapport
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-muted/50 border-border">
          <CardContent className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Accès limité</p>
                <p className="text-sm text-muted-foreground">
                  Votre analyse est en cours. Le bilan complet sera accessible après validation.
                </p>
              </div>
            </div>
            <Link href="/pricing">
              <Button size="sm" className="gap-2">
                Débloquer mon bilan — 49 €
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Section Mon Rapport PERSPECTA */}
      {user?.hasPaid && (
        <Card>
          <CardHeader>
            <CardTitle>Mon Rapport PERSPECTA</CardTitle>
            <CardDescription>
              Consultez votre bilan cognitif professionnel complet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">Rapport généré</p>
                  <p className="text-sm text-muted-foreground">
                    Le {new Date().toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <Link href="/dashboard/report">
                  <Button>
                    <FileText className="w-4 h-4 mr-2" />
                    Consulter
                  </Button>
                </Link>
              </div>

              <p className="text-xs text-muted-foreground">
                💡 Vous pouvez consulter votre rapport autant de fois que vous le souhaitez.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Résumé du compte (Sidebar) */}
        <Card className="md:col-span-1 bg-card/50 border-primary/20 backdrop-blur-sm h-fit">
          <CardHeader className="text-center">
            <div className="mx-auto w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4 border-2 border-primary/20 overflow-hidden">
              {user?.image ? (
                <img src={user.image} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User className="h-12 w-12 text-primary" />
              )}
            </div>
            <CardTitle>{user?.firstName || user?.name || "Utilisateur"} {user?.lastName || ""}</CardTitle>
            <CardDescription className="text-primary font-medium">{user?.title || "Explorateur de Talents"}</CardDescription>
            <CardDescription className="flex items-center justify-center gap-2 mt-1">
              <Mail className="h-3 w-3" />
              {user?.email}
            </CardDescription>
            <div className="flex justify-center mt-4">
              <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/20">
                {user?.role}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-4 border-t border-primary/10">
            {user?.bio && (
              <div className="text-sm text-muted-foreground italic border-l-2 border-primary/30 pl-3 py-1">
                "{user.bio}"
              </div>
            )}

            {user?.skills && (
              <div className="space-y-2">
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Compétences</h4>
                <div className="flex flex-wrap gap-1">
                  {user.skills.split(',').map((skill, i) => (
                    <Badge key={i} variant="outline" className="text-[10px] border-primary/10 bg-primary/5">
                      {skill.trim()}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Réseaux & Liens</h4>
              <div className="flex gap-2">
                {user?.linkedin && (
                  <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-background border border-primary/10 hover:border-primary/40 text-muted-foreground hover:text-primary transition-colors">
                    <Linkedin className="h-4 w-4" />
                  </a>
                )}
                {user?.github && (
                  <a href={user.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-background border border-primary/10 hover:border-primary/40 text-muted-foreground hover:text-primary transition-colors">
                    <Github className="h-4 w-4" />
                  </a>
                )}
                {user?.portfolio && (
                  <a href={user.portfolio} target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-background border border-primary/10 hover:border-primary/40 text-muted-foreground hover:text-primary transition-colors">
                    <Globe className="h-4 w-4" />
                  </a>
                )}
                {!user?.linkedin && !user?.github && !user?.portfolio && (
                  <span className="text-xs text-muted-foreground italic">Aucun lien configuré</span>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-primary/10 space-y-2">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span>Membre depuis {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '...'}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <Fingerprint className="h-3.5 w-3.5" />
                <span>ID: {user?.id.substring(0, 8)}...</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content (Tabs) */}
        <div className="md:col-span-2">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-background/50 border border-primary/10">
              <TabsTrigger value="general" className="data-[state=active]:bg-primary/10">
                <User className="h-4 w-4 mr-2" />
                Général
              </TabsTrigger>
              <TabsTrigger value="pro" className="data-[state=active]:bg-primary/10">
                <Briefcase className="h-4 w-4 mr-2" />
                Professionnel
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-primary/10">
                <Lock className="h-4 w-4 mr-2" />
                Sécurité
              </TabsTrigger>
              <TabsTrigger value="preferences" className="data-[state=active]:bg-primary/10">
                <Settings className="h-4 w-4 mr-2" />
                Préférences
              </TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit(onSubmit)}>
              <TabsContent value="general" className="mt-6 space-y-6">
                <Card className="bg-card/50 border-primary/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Informations Personnelles</CardTitle>
                    <CardDescription>Vos informations de base pour le compte.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input
                          id="firstName"
                          {...register("firstName")}
                          className="bg-background/50 border-primary/20 focus:border-primary transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom</Label>
                        <Input
                          id="lastName"
                          {...register("lastName")}
                          className="bg-background/50 border-primary/20 focus:border-primary transition-colors"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom d'affichage</Label>
                      <Input
                        id="name"
                        {...register("name")}
                        className="bg-background/50 border-primary/20 focus:border-primary transition-colors"
                        placeholder="Ex: Benjamin"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Photo de profil</Label>
                      <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20 rounded-full overflow-hidden bg-muted border-2 border-primary/20">
                          {(avatarPreview || user?.image) ? (
                            <img 
                              src={avatarPreview || user?.image || ""} 
                              alt="Avatar" 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <User className="w-8 h-8 text-muted-foreground" />
                            </div>
                          )}
                          {uploadingAvatar && (
                            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                              <Loader2 className="w-6 h-6 animate-spin text-primary" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 space-y-2">
                          <label 
                            htmlFor="avatar-upload" 
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md border border-primary/30 bg-background hover:bg-primary/10 cursor-pointer transition-colors"
                          >
                            <Upload className="w-4 h-4" />
                            {uploadingAvatar ? "Upload en cours..." : "Choisir une image"}
                          </label>
                          <input
                            id="avatar-upload"
                            type="file"
                            accept="image/jpeg,image/png,image/gif,image/webp"
                            onChange={handleAvatarUpload}
                            disabled={uploadingAvatar}
                            className="hidden"
                          />
                          <p className="text-xs text-muted-foreground">
                            JPG, PNG, GIF ou WebP. Max 5 Mo.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pro" className="mt-6 space-y-6">
                {/* Résumé des accomplissements */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <Card className="bg-primary/5 border-primary/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Profil RIASEC</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-primary">
                        {user?.assessments?.[0]?.riasecResult?.topCode || "À compléter"}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-emerald-500/5 border-emerald-500/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Code Cognitif</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-emerald-500">
                        {user?.cognitiveProfile?.profile_code ? user.cognitiveProfile.profile_code.split('|')[0] : "À compléter"}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-card/50 border-primary/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Détails Professionnels</CardTitle>
                    <CardDescription>Ces informations apparaîtront dans votre synthèse.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Ville</Label>
                      <Input
                        id="city"
                        {...register("city")}
                        className="bg-background/50 border-primary/20 focus:border-primary transition-colors"
                        placeholder="Ex: Montpellier"
                      />
                      <p className="text-xs text-muted-foreground">
                        📍 Utilisé pour filtrer les formations et offres d'emploi près de chez vous
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Code postal</Label>
                        <Input
                          id="postalCode"
                          {...register("postalCode")}
                          className="bg-background/50 border-primary/20 focus:border-primary transition-colors"
                          placeholder="Ex: 34000"
                          maxLength={5}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Département</Label>
                        <Input
                          id="department"
                          {...register("department")}
                          className="bg-background/50 border-primary/20 focus:border-primary transition-colors"
                          placeholder="Ex: Hérault"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">Titre Professionnel</Label>
                      <Input
                        id="title"
                        {...register("title")}
                        className="bg-background/50 border-primary/20 focus:border-primary transition-colors"
                        placeholder="Ex: Chef de Projet, Développeur..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio / Objectif</Label>
                      <textarea
                        id="bio"
                        {...register("bio")}
                        className="w-full min-h-[120px] rounded-md border border-primary/20 bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                        placeholder="Dites-en un peu plus sur votre parcours ou vos aspirations..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="skills" className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                        Compétences clés (séparées par des virgules)
                      </Label>
                      <Input
                        id="skills"
                        {...register("skills")}
                        className="bg-background/50 border-primary/20 focus:border-primary transition-colors"
                        placeholder="Ex: Management, React, Stratégie, Design Thinking..."
                      />
                    </div>

                    <div className="pt-4 space-y-4 border-t border-primary/10">
                      <h4 className="text-sm font-semibold flex items-center gap-2">
                        <Globe className="h-4 w-4 text-primary" />
                        Présence en ligne
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="linkedin" className="flex items-center gap-2">
                            <Linkedin className="h-3 w-3" />
                            LinkedIn
                          </Label>
                          <Input
                            id="linkedin"
                            {...register("linkedin")}
                            className="bg-background/50 border-primary/20"
                            placeholder="https://linkedin.com/in/..."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="github" className="flex items-center gap-2">
                            <Github className="h-3 w-3" />
                            GitHub
                          </Label>
                          <Input
                            id="github"
                            {...register("github")}
                            className="bg-background/50 border-primary/20"
                            placeholder="https://github.com/..."
                          />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="portfolio" className="flex items-center gap-2">
                            <Globe className="h-3 w-3" />
                            Portfolio / Site web
                          </Label>
                          <Input
                            id="portfolio"
                            {...register("portfolio")}
                            className="bg-background/50 border-primary/20"
                            placeholder="https://..."
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="mt-6 space-y-6">
                <Card className="bg-card/50 border-primary/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Changer le mot de passe</CardTitle>
                    <CardDescription>Assurez-vous d'utiliser un mot de passe complexe pour votre sécurité.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                          className="bg-background/50 border-primary/20"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                          <Input
                            id="newPassword"
                            type="password"
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                            className="bg-background/50 border-primary/20"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                            className="bg-background/50 border-primary/20"
                            required
                          />
                        </div>
                      </div>
                      <div className="pt-4 flex justify-end">
                        <Button 
                          type="button" 
                          onClick={onChangePassword}
                          disabled={passwordLoading} 
                          variant="outline" 
                          className="border-primary/30 hover:bg-primary/10"
                        >
                          {passwordLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lock className="mr-2 h-4 w-4" />}
                          Mettre à jour le mot de passe
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-primary/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Sécurité du compte</CardTitle>
                    <CardDescription>Informations sur l'état de sécurité de votre compte.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm flex items-center gap-3">
                      <Shield className="h-5 w-5" />
                      <span>Votre compte est actuellement sécurisé par authentification Credentials.</span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences" className="mt-6 space-y-6">
                <Card className="bg-card/50 border-primary/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Préférences d'Affichage</CardTitle>
                    <CardDescription>Personnalisez votre interface utilisateur.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Thème de l'interface</Label>
                        <p className="text-xs text-muted-foreground italic">Sélectionnez votre mode d'affichage préféré.</p>
                      </div>
                      <div className="flex bg-background/50 p-1 rounded-md border border-primary/10">
                        <Button variant="ghost" size="sm" className="h-8 text-xs bg-primary/10 text-primary">Sombre (Cyber)</Button>
                        <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground" disabled>Clair</Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                      <div className="space-y-0.5">
                        <Label>Langue</Label>
                        <p className="text-xs text-muted-foreground italic">Langue utilisée dans l'application et les rapports.</p>
                      </div>
                      <Badge variant="outline" className="border-primary/30">Français (FR)</Badge>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                      <div className="space-y-0.5">
                        <Label>Notifications</Label>
                        <p className="text-xs text-muted-foreground italic">Recevoir des alertes sur votre progression.</p>
                      </div>
                      <Badge variant="outline" className="text-muted-foreground opacity-50">Désactivé</Badge>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <div className="mt-6 flex justify-end">
                <Button type="submit" disabled={saving} className="min-w-[150px] shadow-[0_0_15px_rgba(var(--primary),0.3)] hover:shadow-[0_0_20px_rgba(var(--primary),0.5)] transition-all">
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enregistrement...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Enregistrer les modifications
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
