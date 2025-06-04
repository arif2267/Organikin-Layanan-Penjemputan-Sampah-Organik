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

  // Memuat leaderboard dari localStorage saat komponen dimuat
  useEffect(() => {
    const savedLeaderboard = localStorage.getItem('leaderboard')
    if (savedLeaderboard) {
      setLeaderboard(JSON.parse(savedLeaderboard))
    }
  }, [])

  // Menyimpan leaderboard ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard))
  }, [leaderboard])

  // Timer untuk kuis
  useEffect(() => {
    if (currentScreen === 'quiz' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && currentScreen === 'quiz') {
      handleNextQuestion()
    }
  }, [timeLeft, currentScreen])

  const startQuiz = () => {
    if (playerName.trim()) {
      setCurrentScreen('quiz')
      setCurrentQuestion(0)
      setScore(0)
      setAnswers([])
      setTimeLeft(30)
    }
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
        name: playerName,
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
  }

  const WelcomeScreen = () => (
    <div className="text-center space-y-8 opacity-0 translate-y-5 animate-[fadeInUp_0.5s_ease-out_forwards]">
      <div className="space-y-4">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto scale-0 animate-[scaleIn_0.5s_ease-out_0.2s_forwards]">
          <Brain className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800">Kuis Edukasi Lingkungan</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Uji pengetahuan Anda tentang lingkungan dan pengelolaan sampah organik! 
          Kuis ini terdiri dari 10 pertanyaan dengan waktu 30 detik per soal.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <Target className="w-8 h-8 text-blue-500 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-800 mb-2">10 Pertanyaan</h3>
          <p className="text-sm text-gray-600">Soal pilihan ganda tentang lingkungan</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <Clock className="w-8 h-8 text-orange-500 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-800 mb-2">30 Detik</h3>
          <p className="text-sm text-gray-600">Waktu untuk setiap pertanyaan</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-800 mb-2">Skor & Ranking</h3>
          <p className="text-sm text-gray-600">Lihat peringkat Anda di leaderboard</p>
        </div>
      </div>

      <button
        onClick={() => setCurrentScreen('nameInput')}
        className="bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:scale-105 active:scale-95 transition-transform"
      >
        Mulai Kuis
      </button>
    </div>
  )

  const NameInputScreen = () => (
    <div className="max-w-md mx-auto text-center space-y-6 opacity-0 translate-x-12 animate-[slideInRight_0.5s_ease-out_forwards]">
      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
        <Users className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800">Masukkan Nama Anda</h2>
      <p className="text-gray-600">Nama akan ditampilkan di leaderboard</p>
      
      <div className="space-y-4">
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && playerName.trim()) {
              startQuiz()
            }
          }}
          placeholder="Masukkan nama Anda"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-center text-lg text-gray-900"
          maxLength={20}
          autoFocus
        />
        <div className="flex gap-3">
          <button
            onClick={() => setCurrentScreen('welcome')}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition-colors"
          >
            Kembali
          </button>
          <button
            onClick={startQuiz}
            disabled={!playerName.trim()}
            className="flex-1 bg-green-600 hover:bg-green-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Mulai Kuis
          </button>
        </div>
      </div>
    </div>
  )

  const QuizScreen = () => (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Halo, {playerName}!</h3>
            <p className="text-sm text-gray-600">Soal {currentQuestion + 1} dari {questions.length}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">{score}</div>
          <div className="text-sm text-gray-600">Skor</div>
        </div>
      </div>

      {/* Timer */}
      <div className="bg-white p-4 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Waktu tersisa</span>
          <span className={`text-lg font-bold transition-colors duration-300 ${timeLeft <= 10 ? 'text-red-500' : 'text-green-600'}`}>
            {timeLeft}s
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-colors duration-300 ${timeLeft <= 10 ? 'bg-red-500' : 'bg-green-500'}`}
            style={{ 
              width: `${(timeLeft / 30) * 100}%`,
              transition: 'width 1s linear'
            }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {questions[currentQuestion].question}
        </h2>
        
        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all hover:scale-[1.02] active:scale-[0.98] ${
                selectedAnswer === index
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswer === index ? 'border-green-500 bg-green-500' : 'border-gray-300'
                }`}>
                  {selectedAnswer === index && <CheckCircle className="w-4 h-4 text-white" />}
                </div>
                <span className="text-gray-700">{option}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            className="bg-green-600 hover:bg-green-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            {currentQuestion === questions.length - 1 ? 'Selesai' : 'Lanjut'}
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
      <div className="max-w-2xl mx-auto text-center space-y-8 opacity-0 scale-90 animate-[scaleInFade_0.5s_ease-out_forwards]">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto scale-0 animate-[scaleIn_0.5s_ease-out_0.2s_forwards] ${
          percentage >= 70 ? 'bg-green-500' : 'bg-orange-500'
        }`}>
          {percentage >= 70 ? (
            <Trophy className="w-12 h-12 text-white" />
          ) : (
            <Award className="w-12 h-12 text-white" />
          )}
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Kuis Selesai!</h2>
          <p className="text-lg text-gray-600">Selamat <span className="text-gray-900">{playerName}</span>, ini adalah hasil Anda:</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{score}</div>
              <div className="text-sm text-gray-600">Skor Total</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{percentage.toFixed(0)}%</div>
              <div className="text-sm text-gray-600">Persentase</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{grade}</div>
              <div className="text-sm text-gray-600">Grade</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{rank === 'N/A' ? 'N/A' : `#${rank}`}</div>
              <div className="text-sm text-gray-600">Peringkat</div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold text-gray-800 mb-4">Ringkasan Jawaban:</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {answers.map((answer, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded bg-gray-50">
                  <span className="text-sm text-gray-600">Soal {index + 1}</span>
                  {answer.isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setCurrentScreen('leaderboard')}
            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Lihat Peringkat
          </button>
          <button
            onClick={() => setCurrentScreen('scores')}
            className="flex-1 bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Riwayat Skor
          </button>
          <button
            onClick={resetQuiz}
            className="flex-1 bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Main Lagi
          </button>
        </div>
      </div>
    )
  }

  const ScoresScreen = () => (
    <div className="max-w-4xl mx-auto space-y-6 opacity-0 translate-y-5 animate-[fadeInUp_0.5s_ease-out_forwards]">
      <div className="text-center">
        <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Riwayat Skor Anda</h2>
        <p className="text-gray-600">Semua hasil kuis yang pernah Anda mainkan</p>
      </div>

      {playerScores.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Belum Ada Riwayat</h3>
          <p className="text-gray-500 mb-4">Mainkan kuis untuk melihat riwayat skor Anda</p>
          <button
            onClick={resetQuiz}
            className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Mulai Kuis
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4">
            <h3 className="text-white font-semibold text-lg">Riwayat Permainan</h3>
          </div>
          
          <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {playerScores.slice().reverse().map((entry, index) => (
              <div
                key={entry.id}
                className={`p-4 opacity-0 -translate-x-5 animate-[slideInLeft_0.5s_ease-out_${index * 100}ms_forwards]`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                      entry.score >= 80 ? 'bg-green-500' :
                      entry.score >= 60 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}>
                      {entry.score}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{entry.name}</div>
                      <div className="text-sm text-gray-600">
                        {entry.correctAnswers} dari {entry.questions} benar • Waktu: {entry.time}
                      </div>
                      <div className="text-xs text-gray-500">{entry.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-600">{entry.score}</div>
                    <div className="text-sm text-gray-600">
                      {Math.round((entry.correctAnswers / entry.questions) * 100)}%
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
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Lihat Peringkat
        </button>
        <button
          onClick={resetQuiz}
          className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Main Lagi
        </button>
      </div>
    </div>
  )

  const LeaderboardScreen = () => (
    <div className="max-w-4xl mx-auto space-y-6 opacity-0 translate-y-5 animate-[fadeInUp_0.5s_ease-out_forwards]">
      <div className="text-center">
        <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <BarChart3 className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Papan Peringkat</h2>
        <p className="text-gray-600">Top 10 pemain dengan skor tertinggi</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4">
          <h3 className="text-white font-semibold text-lg">Leaderboard Global</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {leaderboard.map((entry, index) => (
            <div
              key={entry.id}
              className={`p-4 flex items-center justify-between opacity-0 -translate-x-5 animate-[slideInLeft_0.5s_ease-out_${index * 100}ms_forwards] ${
                entry.name === playerName ? 'bg-green-50 border-l-4 border-green-500' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  index === 0 ? 'bg-yellow-500 text-white' :
                  index === 1 ? 'bg-gray-400 text-white' :
                  index === 2 ? 'bg-orange-500 text-white' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {index < 3 ? (
                    <Trophy className="w-5 h-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{entry.name}</div>
                  <div className="text-sm text-gray-600">Waktu: {entry.time}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-green-600">{entry.score}</div>
                <div className="text-sm text-gray-600">poin</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setCurrentScreen('scores')}
            className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Riwayat Skor
          </button>
          <button
            onClick={resetQuiz}
            className="bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Main Lagi
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