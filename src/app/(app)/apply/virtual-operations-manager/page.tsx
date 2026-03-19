'use client'
import { useState, useRef } from 'react'
import { validateEmail } from '@/lib/validate-email'

export default function ApplyOpsManagerPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    years_experience: '',
    bilingual: '',
    availability_start: '',
    references: [
      { name: '', phone: '' },
      { name: '', phone: '' },
      { name: '', phone: '' },
    ],
    notes: ''
  })
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const resumeInputRef = useRef<HTMLInputElement>(null)
  const photoInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const [emailSuggestion, setEmailSuggestion] = useState('')

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length <= 3) return cleaned
    if (cleaned.length <= 6) return '(' + cleaned.slice(0, 3) + ') ' + cleaned.slice(3)
    return '(' + cleaned.slice(0, 3) + ') ' + cleaned.slice(3, 6) + '-' + cleaned.slice(6, 10)
  }

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Please select a JPEG, PNG, or WebP image for your photo. / Por favor seleccione una imagen JPEG, PNG o WebP.')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Photo must be under 10MB. / La foto debe ser menor de 10MB.')
      return
    }
    setPhotoFile(file)
    setPhotoPreview(URL.createObjectURL(file))
    setError('')
  }

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!['video/mp4', 'video/quicktime', 'video/webm', 'video/x-m4v'].includes(file.type)) {
      setError('Please select a video file (MP4, MOV, or WebM). / Por favor seleccione un archivo de video (MP4, MOV o WebM).')
      return
    }
    if (file.size > 100 * 1024 * 1024) {
      setError('Video must be under 100MB. / El video debe ser menor de 100MB.')
      return
    }
    setVideoFile(file)
    setError('')
  }

  const handleResumeSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowed.includes(file.type)) {
      setError('Please select a PDF or Word document for your resume. / Por favor seleccione un documento PDF o Word.')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Resume must be under 10MB. / El currículum debe ser menor de 10MB.')
      return
    }
    setResumeFile(file)
    setError('')
  }

  const uploadFile = async (file: File, type: string): Promise<string | null> => {
    const data = new FormData()
    data.append('file', file)
    data.append('type', type)
    const res = await fetch('/api/management-applications/upload', { method: 'POST', body: data })
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}))
      setError(errData.error || `Failed to upload ${type}. / Error al subir ${type}.`)
      return null
    }
    const json = await res.json()
    return json.url
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!photoFile) {
      setError('Please upload a photo of yourself. / Por favor suba una foto suya.')
      return
    }
    if (!videoFile) {
      setError('Please upload a selfie video introducing yourself. Applications without a video will not be reviewed. / Por favor suba un video de presentación. Las solicitudes sin video no serán revisadas.')
      return
    }
    if (!resumeFile) {
      setError('Please upload your resume. / Por favor suba su currículum.')
      return
    }
    if (form.email) {
      const emailCheck = validateEmail(form.email)
      if (!emailCheck.valid) {
        if (emailCheck.suggestion) {
          setEmailSuggestion(emailCheck.suggestion)
          setError(`Did you mean ${emailCheck.suggestion}? / ¿Quiso decir ${emailCheck.suggestion}?`)
        } else {
          setError(emailCheck.error || 'Please enter a valid email. / Por favor ingrese un correo válido.')
        }
        return
      }
    }
    setLoading(true)
    setError('')

    try {
      // Upload all files
      const photo_url = await uploadFile(photoFile, 'photo')
      if (!photo_url) { setLoading(false); return }

      const video_url = await uploadFile(videoFile, 'video')
      if (!video_url) { setLoading(false); return }

      const resume_url = await uploadFile(resumeFile, 'resume')
      if (!resume_url) { setLoading(false); return }

      const res = await fetch('/api/management-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          position: 'virtual-operations-manager',
          photo_url,
          video_url,
          resume_url,
        })
      })

      if (res.ok) {
        setDone(true)
      } else {
        const data = await res.json()
        setError(data.error || 'Something went wrong. / Algo salió mal.')
      }
    } catch {
      setError('Something went wrong. Please try again. / Algo salió mal. Por favor intente de nuevo.')
    }
    setLoading(false)
  }

  if (done) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="bg-[#D4540A] px-6 py-4">
          <h1 className="text-white text-xl font-bold">The Florida Maid</h1>
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center max-w-sm">
            <div className="text-5xl mb-4">&#10003;</div>
            <h2 className="text-2xl font-bold text-[#D4540A] mb-2">Application Received! / ¡Solicitud Recibida!</h2>
            <p className="text-gray-600">Thanks, {form.name.split(' ')[0]}. We&apos;ll review your application for the Operations Manager (Virtual) position and reach out soon.</p>
            <p className="text-gray-500 text-sm mt-2 italic">Gracias, {form.name.split(' ')[0]}. Revisaremos su solicitud para el puesto de Gerente de Operaciones (Virtual) y nos comunicaremos pronto.</p>
            <p className="text-gray-500 text-sm mt-4">Questions? / ¿Preguntas? (833) 352-6243</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#D4540A] px-6 py-4">
        <h1 className="text-white text-xl font-bold">The Florida Maid</h1>
        <p className="text-gray-400 text-sm">Operations Manager (Virtual) Application</p>
        <p className="text-gray-500 text-xs italic">Solicitud de Gerente de Operaciones (Virtual)</p>
      </div>

      <div className="max-w-lg mx-auto p-4 pt-6">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
          <div>
            <h2 className="text-xl font-bold text-[#D4540A]">Apply for Operations Manager (Virtual)</h2>
            <p className="text-gray-400 text-sm italic">Solicite el Puesto de Gerente de Operaciones (Virtual)</p>
            <p className="text-gray-500 text-sm mt-1">Work From Home | Part-Time to Start | 7 Days/Week | $500/wk + 10% Revenue to Start</p>
            <p className="text-gray-400 text-xs italic">Trabajo Desde Casa | Medio Tiempo para Empezar | 7 Días/Semana | $500/sem + 10% de Ingresos</p>
            <p className="text-gray-400 text-xs mt-2">All fields marked with * are required. / Todos los campos marcados con * son obligatorios.</p>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-[#D4540A] mb-1">Full Name / Nombre Completo *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[#D4540A] text-base"
              placeholder="Your full name / Su nombre completo"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-[#D4540A] mb-1">Phone / Teléfono *</label>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: formatPhone(e.target.value) })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[#D4540A] text-base"
              placeholder="(212) 555-1234"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#D4540A] mb-1">Email / Correo Electrónico *</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => { setForm({ ...form, email: e.target.value }); setEmailSuggestion('') }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[#D4540A] text-base"
              placeholder="your@email.com / su@correo.com"
            />
            {emailSuggestion && (
              <button type="button" onClick={() => { setForm({ ...form, email: emailSuggestion }); setEmailSuggestion(''); setError('') }} className="mt-1 text-sm text-[#D4540A] hover:underline">
                Use {emailSuggestion}?
              </button>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-[#D4540A] mb-1">Your Location / Su Ubicación *</label>
            <input
              type="text"
              required
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[#D4540A] text-base"
              placeholder="City, State / Ciudad, Estado"
            />
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-[#D4540A] mb-1">Photo of Yourself / Foto Suya *</label>
            <p className="text-xs text-gray-500 mb-2">Clear, professional headshot. JPEG, PNG, or WebP, under 10MB.</p>
            <p className="text-xs text-gray-400 italic mb-2">Foto clara y profesional. JPEG, PNG o WebP, menor de 10MB.</p>
            <div className="flex items-center gap-4">
              {photoPreview ? (
                <img src={photoPreview} alt="Preview" className="w-20 h-20 rounded-full object-cover border-2 border-gray-300 flex-shrink-0" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center flex-shrink-0">
                  <span className="text-gray-400 text-sm">Photo</span>
                </div>
              )}
              <button
                type="button"
                onClick={() => photoInputRef.current?.click()}
                className="px-4 py-2 border border-gray-300 rounded-lg text-[#D4540A] text-sm hover:bg-gray-50"
              >
                {photoPreview ? 'Change Photo / Cambiar Foto' : 'Upload Photo / Subir Foto'}
              </button>
              <input
                ref={photoInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handlePhotoSelect}
                className="hidden"
              />
            </div>
          </div>

          {/* Selfie Video Upload */}
          <div>
            <label className="block text-sm font-medium text-[#D4540A] mb-1">Selfie Video Introduction / Video de Presentación *</label>
            <p className="text-xs text-gray-500 mb-1">Record a 60&ndash;90 second selfie video. Tell us who you are, why this role fits you, and why we can trust you to own operations independently. If you are bilingual, speak in both English and Spanish. MP4, MOV, or WebM, under 100MB.</p>
            <p className="text-xs text-gray-400 italic mb-2">Grabe un video selfie de 60&ndash;90 segundos. Díganos quién es, por qué este puesto es para usted, y por qué podemos confiar en que manejará las operaciones de forma independiente. Si es bilingüe, hable en inglés y español. MP4, MOV o WebM, menor de 100MB.</p>
            <div className="flex items-center gap-4">
              {videoFile ? (
                <div className="flex items-center gap-2 bg-[#FDE68A]/20 px-3 py-2 rounded-lg flex-1 min-w-0">
                  <span className="text-[#D4540A] text-sm truncate">{videoFile.name}</span>
                  <span className="text-[#D4540A]/50 text-xs flex-shrink-0">({(videoFile.size / 1024 / 1024).toFixed(1)}MB)</span>
                </div>
              ) : null}
              <button
                type="button"
                onClick={() => videoInputRef.current?.click()}
                className="px-4 py-2 border border-gray-300 rounded-lg text-[#D4540A] text-sm hover:bg-gray-50 flex-shrink-0"
              >
                {videoFile ? 'Change Video / Cambiar Video' : 'Upload Selfie Video / Subir Video'}
              </button>
              <input
                ref={videoInputRef}
                type="file"
                accept="video/mp4,video/quicktime,video/webm,video/x-m4v"
                onChange={handleVideoSelect}
                className="hidden"
              />
            </div>
            <p className="text-xs text-red-500 mt-1 font-medium">Applications without a selfie video will not be reviewed. / Las solicitudes sin video no serán revisadas.</p>
          </div>

          {/* Years of Experience */}
          <div>
            <label className="block text-sm font-medium text-[#D4540A] mb-1">Years of Experience / Años de Experiencia *</label>
            <select
              required
              value={form.years_experience}
              onChange={(e) => setForm({ ...form, years_experience: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[#D4540A] text-base"
            >
              <option value="">Select... / Seleccionar...</option>
              <option value="less-than-1">Less than 1 year / Menos de 1 año</option>
              <option value="1-2 years">1-2 years / 1-2 años</option>
              <option value="3-5 years">3-5 years / 3-5 años</option>
              <option value="5-10 years">5-10 years / 5-10 años</option>
              <option value="10+ years">10+ years / 10+ años</option>
            </select>
          </div>

          {/* Bilingual */}
          <div>
            <label className="block text-sm font-medium text-[#D4540A] mb-1">Bilingual Proficiency / Nivel Bilingüe (English &amp; Spanish) *</label>
            <select
              required
              value={form.bilingual}
              onChange={(e) => setForm({ ...form, bilingual: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[#D4540A] text-base"
            >
              <option value="">Select... / Seleccionar...</option>
              <option value="fluent-both">Fluent in both / Fluido en ambos</option>
              <option value="conversational-spanish">Conversational Spanish / Español conversacional</option>
              <option value="basic-spanish">Basic Spanish / Español básico</option>
              <option value="english-only">English only / Solo inglés</option>
            </select>
          </div>

          {/* Availability to Start */}
          <div>
            <label className="block text-sm font-medium text-[#D4540A] mb-1">Availability to Start / Disponibilidad para Comenzar *</label>
            <select
              required
              value={form.availability_start}
              onChange={(e) => setForm({ ...form, availability_start: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[#D4540A] text-base"
            >
              <option value="">Select... / Seleccionar...</option>
              <option value="immediately">Immediately / Inmediatamente</option>
              <option value="1-week">Within 1 week / En 1 semana</option>
              <option value="2-weeks">Within 2 weeks / En 2 semanas</option>
              <option value="1-month">Within 1 month / En 1 mes</option>
            </select>
          </div>

          {/* Resume Upload */}
          <div>
            <label className="block text-sm font-medium text-[#D4540A] mb-1">Resume / Currículum *</label>
            <p className="text-xs text-gray-500 mb-2">PDF or Word document, under 10MB / Documento PDF o Word, menor de 10MB</p>
            <div className="flex items-center gap-4">
              {resumeFile ? (
                <div className="flex items-center gap-2 bg-[#FDE68A]/20 px-3 py-2 rounded-lg flex-1 min-w-0">
                  <span className="text-[#D4540A] text-sm truncate">{resumeFile.name}</span>
                  <span className="text-[#D4540A]/50 text-xs flex-shrink-0">({(resumeFile.size / 1024 / 1024).toFixed(1)}MB)</span>
                </div>
              ) : null}
              <button
                type="button"
                onClick={() => resumeInputRef.current?.click()}
                className="px-4 py-2 border border-gray-300 rounded-lg text-[#D4540A] text-sm hover:bg-gray-50 flex-shrink-0"
              >
                {resumeFile ? 'Change / Cambiar' : 'Upload Resume / Subir Currículum'}
              </button>
              <input
                ref={resumeInputRef}
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleResumeSelect}
                className="hidden"
              />
            </div>
          </div>

          {/* References */}
          <div>
            <label className="block text-sm font-medium text-[#D4540A] mb-1">Professional References / Referencias Profesionales *</label>
            <p className="text-xs text-gray-500 mb-3">Please provide 3 professional references / Por favor proporcione 3 referencias profesionales</p>
            {form.references.map((ref, i) => (
              <div key={i} className="flex gap-3 mb-3">
                <input
                  type="text"
                  required
                  value={ref.name}
                  onChange={(e) => {
                    const updated = [...form.references]
                    updated[i] = { ...updated[i], name: e.target.value }
                    setForm({ ...form, references: updated })
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-[#D4540A] text-base"
                  placeholder={`Name / Nombre #${i + 1}`}
                />
                <input
                  type="tel"
                  required
                  value={ref.phone}
                  onChange={(e) => {
                    const updated = [...form.references]
                    updated[i] = { ...updated[i], phone: formatPhone(e.target.value) }
                    setForm({ ...form, references: updated })
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-[#D4540A] text-base"
                  placeholder={`Phone / Teléfono #${i + 1}`}
                />
              </div>
            ))}
          </div>

          {/* Anything Else */}
          <div>
            <label className="block text-sm font-medium text-[#D4540A] mb-1">Anything else we should know? / ¿Algo más que debamos saber?</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[#D4540A] text-base"
              rows={3}
              placeholder="Any additional information... / Cualquier información adicional..."
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm bg-red-50 px-4 py-3 rounded-lg">{error}</p>
          )}

          <div className="my-5 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <label className="flex items-start gap-3 cursor-pointer text-[13px] leading-relaxed text-gray-600">
              <input type="checkbox" name="sms_consent" required className="mt-1 min-w-[18px] min-h-[18px]" />
              <span>
                By checking this box, I consent to receive transactional text messages from <strong>The Florida Maid</strong> regarding my application status and related communications. Reply STOP to opt out. Reply HELP for help. Msg frequency may vary. Msg &amp; data rates may apply.
                <br /><br />
                Al marcar esta casilla, doy mi consentimiento para recibir mensajes de texto de <strong>The Florida Maid</strong> sobre el estado de mi solicitud y comunicaciones relacionadas. Responda STOP para cancelar. Responda HELP para ayuda.
                <br /><br />
                <a href="https://www.thefloridamaid.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#D4540A] hover:underline">Privacy Policy</a> | <a href="https://www.thefloridamaid.com/terms-conditions" target="_blank" rel="noopener noreferrer" className="text-[#D4540A] hover:underline">Terms &amp; Conditions</a>
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#D4540A] text-white rounded-lg text-lg font-semibold hover:bg-[#D4540A]/90 disabled:opacity-50"
          >
            {loading ? 'Submitting... / Enviando...' : 'Submit Application / Enviar Solicitud'}
          </button>

          <p className="text-xs text-gray-400 text-center">
            Questions? / ¿Preguntas? (833) 352-6243
          </p>
        </form>
      </div>
    </div>
  )
}
