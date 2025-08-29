"use client"

import { useState, useEffect } from 'react'
import { Brain, Trophy, Star, Users, Clock, CheckCircle, XCircle, Award, Leaf, BookOpen, Target, BarChart3 } from 'lucide-react'

export default function EducationPage() {
  const [currentScreen, setCurrentScreen] = useState('welcome') // welcome, nameInput, quiz, result, leaderboard, scores
  const [playerName, setPlayerName] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState([])
  const [timeLeft, setTimeLeft] = useState(30)
  const [nameError, setNameError] = useState('')
  const [leaderboard, setLeaderboard] = useState([
    { id: 1, name: "Eco Warrior", score: 95, time: "2:30", date: "2024-06-01" },
    { id: 2, name: "Green Hero", score: 90, time: "2:45", date: "2024-06-01" },
    { id: 3, name: "Nature Lover", score: 85, time: "3:10", date: "2024-06-01" },
    { id: 4, name: "Earth Guardian", score: 80, time: "3:25", date: "2024-06-01" },
    { id: 5, name: "Climate Fighter", score: 75, time: "3:40", date: "2024-06-01" }
  ])
  const [playerScores, setPlayerScores] = useState([])

  const questions = [
    {
      question: "Berapa lama waktu yang dibutuhkan botol plastik untuk terurai di alam?",
      options: ["10-20 tahun", "50-100 tahun", "450-1000 tahun", "100-200 tahun"],
      correct: 2,
      explanation: "Botol plastik membutuhkan waktu 450-1000 tahun untuk terurai sepenuhnya di alam."
    },
    {
      question: "Manakah dari berikut ini yang BUKAN termasuk sampah organik?",
      options: ["Kulit pisang", "Sisa nasi", "Botol kaca", "Daun kering"],
      correct: 2,
      explanation: "Botol kaca bukan sampah organik, melainkan sampah anorganik yang dapat didaur ulang."
    },
    {
      question: "Apa manfaat utama dari kompos bagi tanaman?",
      options: ["Membunuh hama", "Menyuburkan tanah", "Mengusir serangga", "Mempercepat pertumbuhan"],
      correct: 1,
      explanation: "Kompos berfungsi sebagai pupuk alami yang menyuburkan tanah dan menyediakan nutrisi untuk tanaman."
    },
    {
      question: "Berapa persen sampah organik dari total sampah yang dihasilkan rumah tangga?",
      options: ["30-40%", "50-60%", "20-30%", "70-80%"],
      correct: 1,
      explanation: "Sekitar 50-60% dari total sampah rumah tangga adalah sampah organik."
    },
    {
      question: "Apa yang terjadi jika sampah organik tidak dikelola dengan baik?",
      options: ["Menghasilkan gas metana", "Mencemari air tanah", "Menarik hama dan penyakit", "Semua jawaban benar"],
      correct: 3,
      explanation: "Sampah organik yang tidak dikelola dengan baik dapat menyebabkan semua masalah tersebut."
    },
    {
      question: "Manakah cara terbaik untuk mengurangi sampah organik di rumah?",
      options: ["Membakar sampah", "Membuat kompos", "Membuang ke sungai", "Menimbun dalam tanah"],
      correct: 1,
      explanation: "Membuat kompos adalah cara terbaik untuk mengelola sampah organik karena ramah lingkungan dan bermanfaat."
    },
    {
      question: "Berapa lama waktu yang dibutuhkan untuk membuat kompos?",
      options: ["1-2 minggu", "2-3 bulan", "6-12 bulan", "1-2 tahun"],
      correct: 1,
      explanation: "Proses pengomposan biasanya membutuhkan waktu 2-3 bulan untuk menghasilkan kompos yang matang."
    },
    {
      question: "Apa yang dimaksud dengan 3R dalam pengelolaan sampah?",
      options: ["Reduce, Reuse, Recycle", "Read, Run, Rest", "Red, Round, Right", "Rich, Rare, Real"],
      correct: 0,
      explanation: "3R adalah prinsip Reduce (mengurangi), Reuse (menggunakan kembali), dan Recycle (mendaur ulang)."
    },
    {
      question: "Manakah gas rumah kaca yang dihasilkan dari sampah organik?",
      options: ["Oksigen", "Nitrogen", "Metana", "Argon"],
      correct: 2,
      explanation: "Sampah organik yang membusuk menghasilkan gas metana (CH4) yang merupakan gas rumah kaca."
    },
    {
      question: "Apa manfaat ekonomi dari pengelolaan sampah organik yang baik?",
      options: ["Mengurangi biaya pengangkutan", "Menghasilkan pupuk gratis", "Mengurangi pembelian pupuk kimia", "Semua benar"],
      correct: 3,
      explanation: "Pengelolaan sampah organik memberikan berbagai manfaat ekonomi termasuk semua yang disebutkan."
    }
  ]

  // Validate name input
  const validateName = (name) => {
    if (!name.trim()) {
      return 'Nama tidak boleh kosong'
    }
    if (name.trim().length < 2) {
      return 'Nama minimal 2 karakter'
    }
    if (name.trim().length > 20) {
      return 'Nama maksimal 20 karakter'
    }
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
      return 'Nama hanya boleh berisi huruf dan spasi'
    }
    return ''
  }

  // Timer untuk kuis
  useEffect(() => {
    if (currentScreen === 'quiz' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && currentScreen === 'quiz') {
      handleNextQuestion()
    }
  }, [timeLeft, currentScreen])

  const handleNameChange = (e) => {
    const value = e.target.value
    setPlayerName(value)
    if (nameError) {
      const error = validateName(value)
      setNameError(error)
    }
  }

  const startQuiz = () => {
    const error = validateName(playerName)
    if (error) {
      setNameError(error)
      return
    }
    
    setNameError('')
    setCurrentScreen('quiz')
    setCurrentQuestion(0)
    setScore(0)
    setAnswers([])
    setTimeLeft(30)
  }

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    const isCorrect = selectedAnswer === questions[currentQuestion].correct
    const newAnswers = [...answers, {
      question: currentQuestion,
      selected: selectedAnswer,
      correct: questions[currentQuestion].correct,
      isCorrect
    }]
    
    setAnswers(newAnswers)
    if (isCorrect) setScore(score + 10)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setTimeLeft(30)
    } else {
      // Kuis selesai
      const finalScore = isCorrect ? score + 10 : score
      const currentDate = new Date().toISOString().split('T')[0]
      const totalTime = questions.length * 30 - (timeLeft + (questions.length - 1 - currentQuestion) * 30)
      
      const newEntry = {
        id: Date.now(),
        name: playerName.trim(),
        score: finalScore,
        time: `${Math.floor(totalTime / 60)}:${(totalTime % 60).toString().padStart(2, '0')}`,
        date: currentDate
      }
      
      // Simpan ke playerScores
      const newPlayerScore = {
        ...newEntry,
        questions: questions.length,
        correctAnswers: newAnswers.filter(a => a.isCorrect).length
      }
      setPlayerScores(prev => [...prev, newPlayerScore])
      
      // Perbarui leaderboard
      const newLeaderboard = [...leaderboard, newEntry]
        .sort((a, b) => b.score - a.score || new Date(b.date) - new Date(a.date))
        .slice(0, 10)
      
      setLeaderboard(newLeaderboard)
      setCurrentScreen('result')
    }
  }

  const resetQuiz = () => {
    setCurrentScreen('welcome')
    setPlayerName('')
    setSelectedAnswer(null)
    setCurrentQuestion(0)
    setScore(0)
    setAnswers([])
    setTimeLeft(30)
    setNameError('')
  }

  const WelcomeScreen = () => (
    <div className="text-center space-y-8 opacity-0 translate-y-5 animate-[fadeInUp_0.5s_ease-out_forwards]">
      <div className="space-y-6">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto scale-0 animate-[scaleIn_0.5s_ease-out_0.2s_forwards] shadow-2xl">
            <Brain className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
            <Leaf className="w-4 h-4 text-green-800" />
          </div>
        </div>
        <div className="space-y-3">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Kuis Edukasi Lingkungan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            🌱 Uji pengetahuan Anda tentang lingkungan dan pengelolaan sampah organik! 
            <br />Kuis interaktif dengan 10 pertanyaan menarik dan waktu 30 detik per soal.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <Target className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">10 Pertanyaan</h3>
          <p className="text-gray-600 leading-relaxed">Soal pilihan ganda yang menarik tentang lingkungan dan sustainability</p>
        </div>
        <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <Clock className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">30 Detik</h3>
          <p className="text-gray-600 leading-relaxed">Waktu terbatas untuk setiap pertanyaan menambah tantangan</p>
        </div>
        <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Skor & Ranking</h3>
          <p className="text-gray-600 leading-relaxed">Lihat peringkat Anda di leaderboard global dan riwayat permainan</p>
        </div>
      </div>

      <div className="pt-4">
        <button
          onClick={() => setCurrentScreen('nameInput')}
          className="group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-12 py-4 rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 relative overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-3">
            <Star className="w-6 h-6" />
            Mulai Kuis Sekarang
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>
      </div>
    </div>
  )

  const NameInputScreen = () => (
    <div className="max-w-lg mx-auto text-center space-y-8 opacity-0 translate-x-12 animate-[slideInRight_0.5s_ease-out_forwards]">
      <div className="space-y-4">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
          <Users className="w-10 h-10 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Siapa Nama Anda?</h2>
          <p className="text-gray-600 text-lg">Nama akan ditampilkan di leaderboard global</p>
        </div>
      </div>
      
      <div className="bg-white p-8 rounded-2xl shadow-xl space-y-6">
        <div className="space-y-3">
          <input
            type="text"
            value={playerName}
            onChange={handleNameChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                startQuiz()
              }
            }}
            onBlur={() => {
              if (playerName) {
                const error = validateName(playerName)
                setNameError(error)
              }
            }}
            placeholder="Masukkan nama Anda..."
            className={`w-full px-6 py-4 border-2 rounded-xl focus:outline-none text-center text-lg font-medium transition-all duration-300 ${
              nameError 
                ? 'border-red-300 focus:border-red-500 bg-red-50 text-red-900 placeholder-red-400' 
                : 'border-gray-200 focus:border-green-500 focus:bg-green-50 text-gray-900 placeholder-gray-400'
            }`}
            maxLength={20}
            autoFocus
          />
          {nameError && (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
              <XCircle className="w-4 h-4 flex-shrink-0" />
              <span>{nameError}</span>
            </div>
          )}
          {!nameError && playerName && (
            <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 p-3 rounded-lg">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <span>Nama terlihat bagus! Siap untuk memulai?</span>
            </div>
          )}
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={() => {
              setCurrentScreen('welcome')
              setNameError('')
              setPlayerName('')
            }}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
          >
            ← Kembali
          </button>
          <button
            onClick={startQuiz}
            disabled={!playerName.trim() || nameError}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 disabled:hover:scale-100 shadow-lg disabled:shadow-none"
          >
            Mulai Kuis! 🚀
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-xl">
        💡 <strong>Tips:</strong> Gunakan nama yang mudah diingat dan tidak mengandung karakter khusus
      </div>
    </div>
  )

  const QuizScreen = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Halo, {playerName}! 👋</h3>
            <p className="text-gray-600">Soal {currentQuestion + 1} dari {questions.length}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">{score}</div>
          <div className="text-sm text-gray-600 font-medium">Skor</div>
        </div>
      </div>

      {/* Timer */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-600 font-medium">Waktu tersisa</span>
          <span className={`text-2xl font-bold transition-all duration-300 ${
            timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-green-600'
          }`}>
            {timeLeft}s
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className={`h-3 rounded-full transition-all duration-300 ${
              timeLeft <= 10 ? 'bg-gradient-to-r from-red-400 to-red-600' : 'bg-gradient-to-r from-green-400 to-emerald-600'
            }`}
            style={{ 
              width: `${(timeLeft / 30) * 100}%`,
              transition: 'width 1s linear'
            }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 leading-relaxed">
          {questions[currentQuestion].question}
        </h2>
        
        <div className="space-y-4">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full p-6 text-left rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group ${
                selectedAnswer === index
                  ? 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg'
                  : 'border-gray-200 hover:border-green-300 hover:bg-green-50 bg-white shadow-sm hover:shadow-lg'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  selectedAnswer === index 
                    ? 'border-green-500 bg-green-500 shadow-lg' 
                    : 'border-gray-300 group-hover:border-green-400'
                }`}>
                  {selectedAnswer === index ? (
                    <CheckCircle className="w-5 h-5 text-white" />
                  ) : (
                    <div className="w-3 h-3 rounded-full bg-gray-300 group-hover:bg-green-400 transition-colors"></div>
                  )}
                </div>
                <span className="text-gray-700 text-lg font-medium">{option}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 disabled:hover:scale-100 shadow-lg disabled:shadow-none"
          >
            {currentQuestion === questions.length - 1 ? 'Selesai 🎉' : 'Lanjut →'}
          </button>
        </div>
      </div>
    </div>
  )

  const ResultScreen = () => {
    const percentage = (score / (questions.length * 10)) * 100
    const grade = percentage >= 80 ? 'A' : percentage >= 70 ? 'B' : percentage >= 60 ? 'C' : 'D'
    const currentDate = new Date().toISOString().split('T')[0]
    const latestEntry = leaderboard.find(
      (entry) => entry.name === playerName && entry.score === score && entry.date === currentDate
    )
    const rank = latestEntry
      ? leaderboard.findIndex((entry) => entry.id === latestEntry.id) + 1
      : 'N/A'

    return (
      <div className="max-w-3xl mx-auto text-center space-y-8 opacity-0 scale-90 animate-[scaleInFade_0.5s_ease-out_forwards]">
        <div className="space-y-6">
          <div className={`w-28 h-28 rounded-full flex items-center justify-center mx-auto scale-0 animate-[scaleIn_0.5s_ease-out_0.2s_forwards] shadow-2xl ${
            percentage >= 70 ? 'bg-gradient-to-br from-green-400 to-emerald-600' : 'bg-gradient-to-br from-orange-400 to-red-500'
          }`}>
            {percentage >= 70 ? (
              <Trophy className="w-14 h-14 text-white" />
            ) : (
              <Award className="w-14 h-14 text-white" />
            )}
          </div>

          <div className="space-y-3">
            <h2 className="text-4xl font-bold text-gray-800">🎉 Kuis Selesai!</h2>
            <p className="text-xl text-gray-600">
              Selamat <span className="font-bold text-green-600">{playerName}</span>, ini adalah hasil Anda:
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-4xl font-bold text-green-600 mb-1">{score}</div>
              <div className="text-sm text-gray-600 font-medium">Skor Total</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-4xl font-bold text-blue-600 mb-1">{percentage.toFixed(0)}%</div>
              <div className="text-sm text-gray-600 font-medium">Persentase</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <div className="text-4xl font-bold text-purple-600 mb-1">{grade}</div>
              <div className="text-sm text-gray-600 font-medium">Grade</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-xl">
              <div className="text-4xl font-bold text-orange-600 mb-1">{rank === 'N/A' ? 'N/A' : `#${rank}`}</div>
              <div className="text-sm text-gray-600 font-medium">Peringkat</div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Ringkasan Jawaban:</h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2 max-w-2xl mx-auto">
              {answers.map((answer, index) => (
                <div key={index} className="text-center">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-1 ${
                    answer.isCorrect ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {answer.isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500" />
                    )}
                  </div>
                  <span className="text-xs text-gray-600">{index + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setCurrentScreen('leaderboard')}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg"
          >
            🏆 Lihat Peringkat
          </button>
          <button
            onClick={() => setCurrentScreen('scores')}
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg"
          >
            📈 Riwayat Skor
          </button>
          <button
            onClick={resetQuiz}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg"
          >
            🔄 Main Lagi
          </button>
        </div>
      </div>
    )
  }

  const ScoresScreen = () => (
    <div className="max-w-4xl mx-auto space-y-6 opacity-0 translate-y-5 animate-[fadeInUp_0.5s_ease-out_forwards]">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
          <BookOpen className="w-10 h-10 text-white" />
        </div>
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-2">📈 Riwayat Skor Anda</h2>
          <p className="text-lg text-gray-600">Semua hasil kuis yang pernah Anda mainkan</p>
        </div>
      </div>

      {playerScores.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl shadow-xl text-center border border-gray-100">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-600 mb-3">Belum Ada Riwayat</h3>
          <p className="text-gray-500 mb-8 text-lg">Mainkan kuis untuk melihat riwayat skor Anda</p>
          <button
            onClick={resetQuiz}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg"
          >
            🚀 Mulai Kuis Sekarang
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6">
            <h3 className="text-white font-bold text-xl flex items-center gap-3">
              <BarChart3 className="w-6 h-6" />
              Riwayat Permainan Anda
            </h3>
          </div>
          
          <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
            {playerScores.slice().reverse().map((entry, index) => (
              <div
                key={entry.id}
                className={`p-6 opacity-0 -translate-x-5 animate-[slideInLeft_0.5s_ease-out_${index * 100}ms_forwards] hover:bg-gray-50 transition-colors`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center font-bold text-white text-xl shadow-lg ${
                      entry.score >= 80 ? 'bg-gradient-to-br from-green-400 to-emerald-600' :
                      entry.score >= 60 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                      'bg-gradient-to-br from-red-400 to-red-600'
                    }`}>
                      {entry.score}
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-900">{entry.name}</div>
                      <div className="text-gray-600 flex items-center gap-4 mt-1">
                        <span className="flex items-center gap-1">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          {entry.correctAnswers} dari {entry.questions} benar
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-blue-500" />
                          {entry.time}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">{entry.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-purple-600">{entry.score}</div>
                    <div className="text-lg text-gray-600 font-medium">
                      {Math.round((entry.correctAnswers / entry.questions) * 100)}%
                    </div>
                    <div className={`text-sm font-medium px-3 py-1 rounded-full mt-2 ${
                      entry.score >= 80 ? 'bg-green-100 text-green-700' :
                      entry.score >= 60 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {entry.score >= 80 ? 'Excellent' : entry.score >= 60 ? 'Good' : 'Needs Practice'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-4 justify-center">
        <button
          onClick={() => setCurrentScreen('leaderboard')}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg"
        >
          🏆 Lihat Peringkat
        </button>
        <button
          onClick={resetQuiz}
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg"
        >
          🔄 Main Lagi
        </button>
      </div>
    </div>
  )

  const LeaderboardScreen = () => (
    <div className="max-w-4xl mx-auto space-y-6 opacity-0 translate-y-5 animate-[fadeInUp_0.5s_ease-out_forwards]">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
          <BarChart3 className="w-10 h-10 text-white" />
        </div>
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-2">🏆 Papan Peringkat</h2>
          <p className="text-lg text-gray-600">Top 10 pemain dengan skor tertinggi</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6">
          <h3 className="text-white font-bold text-xl flex items-center gap-3">
            <Trophy className="w-6 h-6" />
            Leaderboard Global
          </h3>
        </div>
        
        <div className="divide-y divide-gray-100">
          {leaderboard.map((entry, index) => (
            <div
              key={entry.id}
              className={`p-6 flex items-center justify-between opacity-0 -translate-x-5 animate-[slideInLeft_0.5s_ease-out_${index * 100}ms_forwards] transition-colors ${
                entry.name === playerName ? 'bg-green-50 border-l-4 border-green-500' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-6">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg ${
                  index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' :
                  index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white' :
                  index === 2 ? 'bg-gradient-to-br from-orange-400 to-red-500 text-white' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {index < 3 ? (
                    <Trophy className="w-8 h-8" />
                  ) : (
                    index + 1
                  )}
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    {entry.name}
                    {entry.name === playerName && (
                      <span className="bg-green-100 text-green-700 text-sm px-2 py-1 rounded-full font-medium">
                        Anda
                      </span>
                    )}
                  </div>
                  <div className="text-gray-600 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Waktu: {entry.time}
                  </div>
                  <div className="text-sm text-gray-500">{entry.date}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600">{entry.score}</div>
                <div className="text-sm text-gray-600 font-medium">poin</div>
                {index < 3 && (
                  <div className={`text-xs font-bold px-2 py-1 rounded-full mt-1 ${
                    index === 0 ? 'bg-yellow-100 text-yellow-700' :
                    index === 1 ? 'bg-gray-100 text-gray-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {index === 0 ? '🥇 GOLD' : index === 1 ? '🥈 SILVER' : '🥉 BRONZE'}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setCurrentScreen('scores')}
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg"
          >
            📈 Riwayat Skor
          </button>
          <button
            onClick={resetQuiz}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg"
          >
            🔄 Main Lagi
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <style jsx global>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          
          @keyframes scaleInFade {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}</style>
        
        {currentScreen === 'welcome' && <WelcomeScreen />}
        {currentScreen === 'nameInput' && <NameInputScreen />}
        {currentScreen === 'quiz' && <QuizScreen />}
        {currentScreen === 'result' && <ResultScreen />}
        {currentScreen === 'leaderboard' && <LeaderboardScreen />}
        {currentScreen === 'scores' && <ScoresScreen />}
      </div>
    </div>
  )
}